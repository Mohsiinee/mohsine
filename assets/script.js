const { DateTime } = luxon;

function updateClock() {
  let now = DateTime.local();

  let hours = now.hour;
  let minutes = now.minute;
  let seconds = now.second;
  let amPm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? '0' + minutes : minutes;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  let timeString = hours + ':' + minutes + ':' + seconds + ' ' + amPm;

  // Update both span elements
  document.getElementById('clock1').innerHTML = timeString;
  document.getElementById('clock2').innerHTML = timeString;

  setTimeout(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed");
  updateClock();
});
