// // Array of image filenames inside the 'assets/' folder
// const imageList = ["about.jpg", "aboutDP.jpg", "AnirudhBeach.jpg", "AnirudhBench.jpg", "Avatar1.jpg", "bb black.jpg", "bb.jpg" ,"bb1.jpg" ,"bb1_cpy.jpg", "bb2.jpg", "bb2_cpy.jpg", "bb3.jpg", "bb4.jpg", "bb5.jpg", "bb6.jpg", "bb7.jpg", "bb8.jpg", "bb9.jpg", "Black_Court.jpg", "BlackBoardSide.jpg", "BLackFullCourt.jpg", "DP.jpg", "DP1.jpg", "dp3.jpg", "Profile Pic.jpg" 
//   ];
  
//   const gallery = document.getElementById("gallery");
  
//   imageList.forEach(image => {
//     const img = document.createElement("img");
//     img.src = `assets/${image}`;
//     img.alt = image;
//     gallery.appendChild(img);
//   });
  
// Load local images
const imageList = ["about.jpg", "aboutDP.jpg", "AnirudhBeach.jpg", "AnirudhBench.jpg", "Avatar1.jpg", "bb black.jpg", "bb.jpg" ,"bb1.jpg" ,"bb1_cpy.jpg", "bb2.jpg", "bb2_cpy.jpg", "bb3.jpg", "bb4.jpg", "bb5.jpg", "bb6.jpg", "bb7.jpg", "bb8.jpg", "bb9.jpg", "Black_Court.jpg", "BlackBoardSide.jpg", "BLackFullCourt.jpg", "DP.jpg", "DP1.jpg", "dp3.jpg", "Profile Pic.jpg" 
  ];
  
  const gallery = document.getElementById("gallery");
  
  imageList.forEach(image => {
    const img = document.createElement("img");
    img.src = `assets/${image}`;
    img.alt = image;
    gallery.appendChild(img);
  });
  
  const toggleBtn = document.getElementById("toggleMode");

  // Set initial icon based on current theme
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
    toggleBtn.title = "Switch to Light Mode";
  } else {
    toggleBtn.textContent = "🌙";
    toggleBtn.title = "Switch to Dark Mode";
  }
  
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  
    // Update icon and tooltip
    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      toggleBtn.title = "Switch to Light Mode";
    } else {
      toggleBtn.textContent = "🌙";
      toggleBtn.title = "Switch to Dark Mode";
    }
  });
    