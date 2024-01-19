var currentSlide = 0;
var slides = document.getElementsByClassName("slider-img");
var interval;

document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);

function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[currentSlide].style.display = "block";
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide(intervalTime) {
  interval = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(interval);
}

// Start auto slide with an interval of 2000 milliseconds (2 seconds)
startAutoSlide(2000);
