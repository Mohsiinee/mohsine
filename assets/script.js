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
    const duration = 1000; // 2 seconds

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
  const container = document.getElementById('binary-container');
  
  for (let row = 0; row < 54; row++) {
    for (let col = 0; col < 96; col++) {
      const binaryDigit = document.createElement('div');
      binaryDigit.classList.add('binary-digit');
      
      // Initial random 0 or 1
      binaryDigit.innerText = Math.floor(Math.random() * 2).toString();
      
      // Positioning
      binaryDigit.style.top = `${row * 20}px`;
      binaryDigit.style.left = `${col * 20}px`;
      
      // Add to container
      container.appendChild(binaryDigit);

      // Animate random change
      setInterval(() => {
        binaryDigit.innerText = Math.floor(Math.random() * 2).toString();
      }, Math.random() * 60000 + 10000);  // Random interval between 5000ms and 40000ms
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

