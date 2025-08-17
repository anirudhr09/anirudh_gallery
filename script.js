// Image Viewer Gallery - Improved Version
class ImageGallery {
  constructor() {
    this.mediaList = [
      { image: "about.jpg" },
      { image: "aboutDP.jpg" },
      { image: "AnirudhBeach.jpg" },
      { image: "AnirudhBench.jpg", video: "bbvideo.mp4" },
      { image: "Avatar1.png" },
      { image: "bb black.jpg" },
      { image: "bb.jpg" },
      { image: "bb1.jpg" },
      { image: "bb1_cpy.jpg" },
      { image: "bb2.jpg" },
      { image: "bb2_cpy.jpg" },
      { image: "bb3.jpg" },
      { image: "bb4.jpg" },
      { image: "bb5.jpg" },
      { image: "bb6.jpg" },
      { image: "bb7.jpg" },
      { image: "bb8.jpg" },
      { image: "bb9.jpg" },
      { image: "Black_Court.jpg" },
      { image: "BlackBoardSide.png" },
      { image: "BLackFullCourt.jpeg" },
      { image: "DP.jpg" },
      { image: "DP1.jpg" },
      { image: "dp3.jpg" },
      { image: "Profile Pic.jpg" },
      { image: "ss.jpg" },
      { image: "ss1.jpg" },
      { image: "ss3.jpg" },
      { image: "ss4.jpg" },
      { image: "ss5.jpg" },
      { image: "ss6.jpg" },
      { image: "ss7.jpg" },
      { image: "ss8.jpg" }
    ];
    
    this.gallery = document.getElementById("gallery");
    this.modal = null;
    this.currentImageIndex = 0;
    this.currentImageArray = [];
    
    this.init();
  }

  init() {
    this.createModal();
    this.renderGallery();
    this.setupThemeToggle();
    this.setupKeyboardNavigation();
  }

  createModal() {
    this.modal = document.createElement("div");
    this.modal.id = "lightboxModal";
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-label", "Image lightbox");
    this.modal.style.display = "none";
    
    this.modal.innerHTML = `
      <div class="modal-content">
        <button class="close" aria-label="Close lightbox">&times;</button>
        <button class="nav-btn prev" aria-label="Previous image">&#10094;</button>
        <button class="nav-btn next" aria-label="Next image">&#10095;</button>
        <img class="modal-img" alt="" />
        <div class="image-counter"></div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    
    // Setup modal event listeners
    this.modal.querySelector(".close").addEventListener("click", () => this.closeModal());
    this.modal.querySelector(".prev").addEventListener("click", () => this.showPreviousImage());
    this.modal.querySelector(".next").addEventListener("click", () => this.showNextImage());
    
    // Close modal on background click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });
  }

  renderGallery() {
    this.mediaList.forEach((media, mediaIndex) => {
      const container = this.createGalleryItem(media, mediaIndex);
      this.gallery.appendChild(container);
    });
  }

  createGalleryItem(media, mediaIndex) {
    const container = document.createElement("div");
    container.className = "gallery-item";
    container.setAttribute("data-media-index", mediaIndex);

    this.createSingleImageItem(container, media.image, media.video);

    return container;
  }

  createSingleImageItem(container, imageSrc, videoSrc) {
    const img = document.createElement("img");
    img.src = `assets/${imageSrc}`;
    img.alt = imageSrc;
    img.loading = "lazy";

    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    img.addEventListener("error", () => {
      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23ccc'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%23666'%3EImage not found%3C/text%3E%3C/svg%3E";
      img.alt = "Image not found";
    });

    img.addEventListener("click", () => {
      // Get all image sources from the gallery
      const allImages = this.mediaList.map(media => media.image);
      // Find the index of the clicked image
      const imageIndex = allImages.indexOf(imageSrc);
      // Open modal with all images, starting from the clicked image
      this.openModal(allImages, imageIndex);
    });

    container.appendChild(img);

    if (videoSrc) {
      this.addVideoOverlay(container, img, videoSrc);
    }
  }

  addVideoOverlay(container, img, videoSrc) {
    const video = document.createElement("video");
    video.src = `assets/${videoSrc}`;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.style.display = "none";
    video.setAttribute("aria-label", `Video: ${videoSrc}`);

    container.addEventListener("mouseenter", () => {
      video.style.display = "block";
      img.style.opacity = 0;
      video.play().catch(e => console.log("Video autoplay failed:", e));
    });

    container.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
      img.style.opacity = 1;
    });

    container.appendChild(video);
    container.classList.add("has-video");
  }

  openModal(images, startIndex) {
    this.currentImageArray = images;
    this.currentImageIndex = startIndex;
    
    console.log(`Opening modal with ${images.length} images, starting at index ${startIndex}`);
    console.log('Images:', images);
    
    this.modal.style.display = "flex";
    this.updateModalImage();
    this.updateImageCounter();
    
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    
    // Focus modal for keyboard navigation
    this.modal.focus();
  }

  closeModal() {
    this.modal.style.display = "none";
    document.body.style.overflow = "";
    this.currentImageArray = [];
    this.currentImageIndex = 0;
  }

  updateModalImage() {
    const modalImg = this.modal.querySelector(".modal-img");
    const currentImage = this.currentImageArray[this.currentImageIndex];
    const prevBtn = this.modal.querySelector(".prev");
    const nextBtn = this.modal.querySelector(".next");
    
    modalImg.src = `assets/${currentImage}`;
    modalImg.alt = currentImage;
    
    // Update navigation buttons state
    if (this.currentImageArray.length > 1) {
      prevBtn.disabled = this.currentImageIndex === 0;
      nextBtn.disabled = this.currentImageIndex === this.currentImageArray.length - 1;
      
      // Show navigation buttons
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    } else {
      // Hide navigation buttons when there's only one image
      prevBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
    }
  }

  updateImageCounter() {
    if (this.currentImageArray.length > 1) {
      const counter = this.modal.querySelector(".image-counter");
      counter.textContent = `${this.currentImageIndex + 1} / ${this.currentImageArray.length}`;
      counter.style.display = "block";
    } else {
      this.modal.querySelector(".image-counter").style.display = "none";
    }
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      console.log(`Moving to previous image: ${this.currentImageIndex + 1}/${this.currentImageArray.length}`);
      this.updateModalImage();
      this.updateImageCounter();
    }
  }

  showNextImage() {
    if (this.currentImageIndex < this.currentImageArray.length - 1) {
      this.currentImageIndex++;
      console.log(`Moving to next image: ${this.currentImageIndex + 1}/${this.currentImageArray.length}`);
      this.updateModalImage();
      this.updateImageCounter();
    }
  }

  setupThemeToggle() {
    const toggleBtn = document.getElementById("toggleMode");
    
    // Set initial state
    this.updateThemeButton(toggleBtn);
    
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      this.updateThemeButton(toggleBtn);
      
      // Save preference
      localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    
    // Load saved preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      document.body.classList.add("dark-mode");
      this.updateThemeButton(toggleBtn);
    }
  }

  updateThemeButton(button) {
    if (document.body.classList.contains("dark-mode")) {
      button.textContent = "☀️";
      button.title = "Switch to Light Mode";
    } else {
      button.textContent = "🌙";
      button.title = "Switch to Dark Mode";
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (this.modal.style.display === "flex") {
        switch (e.key) {
          case "Escape":
            this.closeModal();
            break;
          case "ArrowLeft":
            this.showPreviousImage();
            break;
          case "ArrowRight":
            this.showNextImage();
            break;
        }
      }
    });
  }

  // Cleanup method for when component is destroyed
  destroy() {
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const gallery = new ImageGallery();
  
  // Expose gallery instance globally for debugging
  window.gallery = gallery;
});
