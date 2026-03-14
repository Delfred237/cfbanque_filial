// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider-dot");
let autoSlide;

function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = n;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
  resetAutoSlide();
}

function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 6000);
}

autoSlide = setInterval(nextSlide, 6000);

// Reset l'intervalle si l'utilisateur clique
document.querySelector(".slider-arrows").addEventListener("click", () => {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 8000);
});
