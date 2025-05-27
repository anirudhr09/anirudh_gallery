// Load local images and videos
const mediaList = [
  { image: "AnirudhBench.jpg", video: "bbvideo.mp4" },
  { image: ["about.jpg" ,"aboutDP.jpg", "AnirudhBeach.jpg", "Avatar1.jpg" ,"bb black.jpg","bb.jpg", "bb1.jpg", "bb1_cpy.jpg", "bb2.jpg", "bb2_cpy.jpg", "bb3.jpg", "bb4.jpg", "bb5.jpg", "bb6.jpg", "bb7.jpg", "bb8.jpg", "bb9.jpg","Black_Court.jpg","BlackBoardSide.jpg", "BLackFullCourt.jpg", "DP.jpg", "DP1.jpg", "dp3.jpg", "Profile Pic.jpg"] }
];

const gallery = document.getElementById("gallery");

mediaList.forEach(media => {
  const images = Array.isArray(media.image) ? media.image : [media.image];

  images.forEach(imageSrc => {
    const container = document.createElement("div");
    container.className = "gallery-item";

    const img = document.createElement("img");
    img.src = `assets/${imageSrc}`;
    img.alt = imageSrc;

    img.onload = () => {
      img.classList.add("loaded");
    };

    container.appendChild(img);

    // Only add video if there's one image and a video specified
    if (media.video && !Array.isArray(media.image)) {
      const video = document.createElement("video");
      video.src = `assets/${media.video}`;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      container.addEventListener("mouseenter", () => {
        video.play();
      });

      container.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });

      container.appendChild(video);
      container.classList.add("has-video");
    }

    gallery.appendChild(container);
  });
});

const toggleBtn = document.getElementById("toggleMode");

if (document.body.classList.contains("dark-mode")) {
  toggleBtn.textContent = "☀️";
  toggleBtn.title = "Switch to Light Mode";
} else {
  toggleBtn.textContent = "🌙";
  toggleBtn.title = "Switch to Dark Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
    toggleBtn.title = "Switch to Light Mode";
  } else {
    toggleBtn.textContent = "🌙";
    toggleBtn.title = "Switch to Dark Mode";
  }
});
