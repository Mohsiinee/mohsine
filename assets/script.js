window.addEventListener("load", function() {
  const loading = document.getElementById("loading");
  const bodyScroll = document.getElementById("body");
  
  setTimeout(function() {
    bodyScroll.style.overflowY = "scroll";
    loading.style.display = "none";
  }, 1000);
});

var overlayModal = document.getElementsByClassName("overlay-modal")[0];
function openModal(filename) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      document.getElementById('modal-body').innerHTML = this.responseText;
      var modal = document.getElementById("myModal");
      overlayModal.style.display = "block";
      modal.style.display = "block";
      setTimeout(function(){ modal.style.opacity = "1"; }, 50);
      document.body.style.overflow = 'hidden';
  }
  
  xhr.open('GET', './modals/' + filename, true);
  xhr.send();
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  var modal = document.getElementById("myModal");
  modal.style.opacity = "0";
  overlayModal.style.display = "none";
  setTimeout(function(){ modal.style.display = "none"; }, 500);
  document.body.style.overflow = 'auto';
}

var modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == overlayModal) {
    overlayModal.style.display = "none";
    modal.style.opacity = "0";
    setTimeout(function(){ modal.style.display = "none"; }, 500);
    document.body.style.overflow = 'auto';
  }
}


document.querySelectorAll('a[href^="#"]').forEach (anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


AOS.init({
  duration: 1500,
  offset: 160, 
  easing: 'ease-in-out',
  once: true, 
  mirror: false,
  anchorPlacement: 'top-bottom',
});
