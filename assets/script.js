window.addEventListener("load", function() {
  const loading = document.getElementById("loading");
  const bodyScroll = document.getElementById("body");
  
  setTimeout(function() {
    bodyScroll.style.overflowY = "scroll";
    loading.style.display = "none";
  }, 3000);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    let startTime = null;
    const duration = 3000; // 3 seconds

    function animateScroll(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + (targetPosition - startPosition) * progress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    }

    window.requestAnimationFrame(animateScroll);
  });
});





document.addEventListener("DOMContentLoaded", function() {
  const videoSection = document.getElementById('video-section');
  const backgroundVideo = document.getElementById('background-video');

  if (videoSection && backgroundVideo) {
    window.addEventListener('scroll', () => {
      const sectionTop = videoSection.offsetTop;
      const sectionBottom = sectionTop + videoSection.offsetHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      
      if (window.scrollY >= sectionTop && viewportBottom <= sectionBottom) {
        backgroundVideo.style.position = 'fixed';
        backgroundVideo.style.top = '0';
      } else {
        backgroundVideo.style.position = 'absolute';
        
        if (window.scrollY < sectionTop) {
          backgroundVideo.style.top = '0';
        } else if (viewportBottom >= sectionBottom) {
          backgroundVideo.style.top = `${videoSection.offsetHeight - window.innerHeight}px`;
        }
      }
    });
  } else {
    console.error('Element not found. Please check your IDs.');
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('binary-canvas');
  const ctx = canvas.getContext('2d');

  const container = document.getElementById('binary-container');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  const cellSize = 30; // In pixels

  const maxRows = Math.floor(canvas.height / cellSize);
  const maxCols = Math.floor(canvas.width / cellSize);

  const drawCell = (row, col, digit) => {
    const x = col * cellSize;
    const y = row * cellSize;

    ctx.clearRect(x, y, cellSize, cellSize); // Clear previous digit
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgb(124, 252, 218, 0.3)';
    ctx.fillText(digit, x + cellSize / 4, y + cellSize / 1.5);
  };

  const scheduleRandomUpdate = (row, col) => {
    setTimeout(() => {
      const newDigit = Math.floor(Math.random() * 2).toString();
      drawCell(row, col, newDigit);
      scheduleRandomUpdate(row, col);
    }, Math.random() * 10000 + 800);
  };

  // Initial rendering and schedule updates
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const digit = Math.floor(Math.random() * 2).toString();
      drawCell(row, col, digit);
      scheduleRandomUpdate(row, col);
    }
  }
});





// Function to initiate the dynamic typing
function startDynamicTyping() {
  new TypeIt("#dynamicText", {
    speed: 75,
    loop: true,
    loopDelay: 1000
  })
    .pause(300)
    .type("successful and profitable.", { delay: 2500 })
    .delete(26)
    .type("empowering.", { delay: 2500 })
    .delete(11)
    .type("lasting.", { delay: 2500 })
    .delete(8)
    .type("scalable.", { delay: 2500 })
    .delete(9)
    .type("aligned with your vision.", { delay: 2500 })
    .delete(25)
    .type("impactful.", { delay: 2500 })
    .delete(25)
    .go();
}

// Type the static part and then start the dynamic part
new TypeIt("#staticText", {
  speed: 60
})
.type(
  "It's not just about being a service provider; it's about being a trusted advisor partner. Together, we can build something that is "
)
.exec(() => {
  document.querySelector("#staticText .ti-cursor").style.display = "none";
  startDynamicTyping();
})
.go();

