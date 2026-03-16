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
window.nextFormStep = function (current) {
  const currentStep = document.getElementById(`fs-${current}`);
  const nextStep = document.getElementById(`fs-${current + 1}`);
  const currentInd = document.getElementById(`si-${current}`);
  const nextInd = document.getElementById(`si-${current + 1}`);

  if (nextStep) {
    // 1. Sortie de l'étape actuelle
    currentStep.style.opacity = "0";
    currentStep.style.transform = "translateX(-20px)";

    setTimeout(() => {
      currentStep.classList.remove("active");
      currentInd.classList.remove("active");

      // 2. Entrée de la nouvelle étape
      nextStep.classList.add("active");
      nextInd.classList.add("active");
    }, 300); // On attend la fin de la transition de sortie
  }
};

window.prevFormStep = function (current) {
  const currentStep = document.getElementById(`fs-${current}`);
  const prevStep = document.getElementById(`fs-${current - 1}`);
  const currentInd = document.getElementById(`si-${current}`);
  const prevInd = document.getElementById(`si-${current - 1}`);

  if (prevStep) {
    currentStep.style.opacity = "0";
    currentStep.style.transform = "translateX(20px)";

    setTimeout(() => {
      currentStep.classList.remove("active");
      currentInd.classList.remove("active");
      prevStep.classList.add("active");
      prevInd.classList.add("active");
    }, 300);
  }
};

window.selectOption = function (el) {
  // Gestion de la sélection unique par groupe
  const parent = el.closest(".form-options");
  const siblings = parent.querySelectorAll(".form-option");
  siblings.forEach((s) => s.classList.remove("selected"));
  el.classList.add("selected");
};

window.submitForm = function () {
  const step3 = document.getElementById("fs-3");
  const indicators = document.querySelector(".step-indicators");
  const successMsg = document.getElementById("formSuccess");
  const formTitle = successMsg.closest(".bg-[#f8f7f4]").querySelector("h3");

  if (step3 && successMsg) {
    step3.classList.remove("active");
    if (indicators) indicators.style.display = "none";
    if (formTitle) formTitle.style.display = "none";

    successMsg.classList.remove("hidden");
    successMsg.classList.add("block");

    // Optionnel : Reset du formulaire ou redirection après 5s
    console.log("Formulaire envoyé avec succès !");
  }
};
