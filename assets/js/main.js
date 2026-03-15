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

// ===== TESTIMONIALS =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-slide");
const tdots = document.querySelectorAll('[id^="tdot-"]');

function goToTestimonial(n) {
  testimonials[currentTestimonial].classList.remove("active");
  tdots[currentTestimonial].classList.remove("active");
  currentTestimonial = n;
  testimonials[currentTestimonial].classList.add("active");
  tdots[currentTestimonial].classList.add("active");
}

setInterval(() => {
  goToTestimonial((currentTestimonial + 1) % testimonials.length);
}, 5000);

// ===== MULTI-STEP FORM =====
function nextFormStep(current) {
  document.getElementById("fs-" + current).classList.remove("active");
  document.getElementById("si-" + current).classList.remove("active");
  document.getElementById("fs-" + (current + 1)).classList.add("active");
  document.getElementById("si-" + (current + 1)).classList.add("active");
}

function prevFormStep(current) {
  document.getElementById("fs-" + current).classList.remove("active");
  document.getElementById("si-" + current).classList.remove("active");
  document.getElementById("fs-" + (current - 1)).classList.add("active");
  document.getElementById("si-" + (current - 1)).classList.add("active");
}

function submitForm() {
  document.getElementById("fs-3").classList.remove("active");
  document.querySelector(".step-indicators").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
}

function selectOption(el) {
  // Allow toggle in same group
  const siblings = el.parentElement.querySelectorAll(".form-option");
  siblings.forEach((s) => s.classList.remove("selected"));
  el.classList.add("selected");
}
