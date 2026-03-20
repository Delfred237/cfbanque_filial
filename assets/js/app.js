/**
 * Bundle JS - Site Unifié
 * Regroupe : Slider, Testimonials, Formulaire, Navbar, Reveal & Tabs
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ─── 1. CONFIGURATION & SÉLECTEURS GÉNÉRAUX ─── */
  const navbar = document.querySelector(".navbar");
  const topBar = document.querySelector(".top-bar");
  const backToTop = document.getElementById("backToTop");

  // Reveal Configuration
  const REVEAL_CONFIG = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
    staggerDelay: 150,
  };

  /* ─── 2. GESTION NAVIGATION & SCROLL ─── */
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky Header
    if (navbar) navbar.classList.toggle("scrolled", scrollPos > 20);
    if (topBar) topBar.classList.toggle("scrolled", scrollPos > 120);

    // Button Back to Top
    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.style.display = "flex";
        setTimeout(() => backToTop.classList.add("is-visible"), 10);
      } else {
        backToTop.classList.remove("is-visible");
        setTimeout(() => {
          if (!backToTop.classList.contains("is-visible"))
            backToTop.style.display = "none";
        }, 300);
      }
    }
  };

  // Mobile Menu (Drawer)
  const toggle = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const drawerClose = document.getElementById("drawerClose");

  if (toggle && drawer) {
    const toggleMenu = (state) => {
      drawer.classList.toggle("is-open", state);
      overlay?.classList.toggle("is-visible", state);
      toggle.classList.toggle("is-open", state);
      document.body.style.overflow = state ? "hidden" : "";
    };

    toggle.addEventListener("click", () =>
      toggleMenu(!drawer.classList.contains("is-open")),
    );
    overlay?.addEventListener("click", () => toggleMenu(false));
    drawerClose?.addEventListener("click", () => toggleMenu(false));
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ─── 3. HERO SLIDER ─── */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const sliderArrows = document.querySelector(".slider-arrows");
  let currentSlide = 0;
  let autoSlideInterval;

  if (slides.length > 0) {
    const goToSlide = (n) => {
      slides[currentSlide].classList.remove("active");
      dots[currentSlide]?.classList.remove("active");
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      dots[currentSlide]?.classList.add("active");
    };

    const startAutoSlide = (delay = 6000) => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), delay);
    };

    sliderArrows?.addEventListener("click", () => startAutoSlide(8000));
    startAutoSlide();
  }

  /* ─── 4. TESTIMONIALS ─── */
  const testimonials = document.querySelectorAll(".testimonial-slide");
  const tdots = document.querySelectorAll('[id^="tdot-"]');
  let currentTestimonial = 0;

  if (testimonials.length > 0) {
    setInterval(() => {
      testimonials[currentTestimonial].classList.remove("active");
      tdots[currentTestimonial]?.classList.remove("active");
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonials[currentTestimonial].classList.add("active");
      tdots[currentTestimonial]?.classList.add("active");
    }, 5000);
  }

  /* ─── 5. SYSTÈME D'ONGLETS (SERVICES) ─── */
  const tabsContainer =
    document.querySelector(".service-tabs") ||
    document.getElementById("tabs-container");
  const indicator = document.getElementById("tab-indicator");
  const tabs = document.querySelectorAll(".service-tab");
  const panels = document.querySelectorAll(".service-panel");

  if (tabsContainer && indicator) {
    const moveIndicator = (tab) => {
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.left = `${tab.offsetLeft}px`;
    };

    const switchPanel = (index) => {
      panels.forEach((p) => {
        p.classList.remove("active", "is-visible");
        p.style.display = "none";
      });
      const activePanel = document.getElementById(`service-${index}`);
      if (activePanel) {
        activePanel.style.display = "flex";
        requestAnimationFrame(() =>
          activePanel.classList.add("active", "is-visible"),
        );
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        moveIndicator(tab);
        switchPanel(tab.dataset.service);
      });
    });

    const activeTab = tabsContainer.querySelector(".service-tab.active");
    if (activeTab) setTimeout(() => moveIndicator(activeTab), 200);
    window.addEventListener(
      "resize",
      () => {
        const current = tabsContainer.querySelector(".service-tab.active");
        if (current) moveIndicator(current);
      },
      { passive: true },
    );
  }

  /* ─── 6. ANIMATIONS REVEAL & COMPTEURS ─── */
  const countUp = (el) => {
    const target = parseInt(el.innerText);
    let count = 0;
    const speed = 1000 / target;
    const updateCount = () => {
      if (count < target) {
        count++;
        el.innerText = count + (target > 999 ? "K" : "");
        setTimeout(updateCount, speed);
      } else {
        el.innerText = target + (target > 999 ? "K" : "");
      }
    };
    updateCount();
  };

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const statNumber = target.querySelector(".counter");
          if (statNumber) countUp(statNumber);

          if (target.hasAttribute("data-stagger")) {
            const children = target.querySelectorAll(target.dataset.stagger);
            children.forEach((child, i) => {
              setTimeout(
                () => child.classList.add("is-visible"),
                i * REVEAL_CONFIG.staggerDelay,
              );
            });
          }
          target.classList.add("is-visible", "visible");
          observer.unobserve(target);
        }
      });
    },
    {
      threshold: REVEAL_CONFIG.threshold,
      rootMargin: REVEAL_CONFIG.rootMargin,
    },
  );

  document
    .querySelectorAll(".reveal, .animate-on-scroll, [data-stagger]")
    .forEach((el) => revealObserver.observe(el));

  /* ─── 7. MULTI-STEP FORM (FONCTIONS GLOBALES) ─── */
  // On les attache à window car appelées via onclick dans le HTML
  window.nextFormStep = function (current) {
    const currentStep = document.getElementById(`fs-${current}`);
    const nextStep = document.getElementById(`fs-${current + 1}`);
    const currentInd = document.getElementById(`si-${current}`);
    const nextInd = document.getElementById(`si-${current + 1}`);

    if (nextStep) {
      currentStep.style.opacity = "0";
      currentStep.style.transform = "translateX(-20px)";
      setTimeout(() => {
        currentStep.classList.remove("active");
        currentInd?.classList.remove("active");
        nextStep.classList.add("active");
        nextInd?.classList.add("active");
      }, 300);
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
        currentInd?.classList.remove("active");
        prevStep.classList.add("active");
        prevInd?.classList.add("active");
      }, 300);
    }
  };

  window.selectOption = function (el) {
    const parent = el.closest(".form-options");
    parent
      .querySelectorAll(".form-option")
      .forEach((s) => s.classList.remove("selected"));
    el.classList.add("selected");
  };

  window.submitForm = function () {
    const step3 = document.getElementById("fs-3");
    const indicators = document.querySelector(".step-indicators");
    const successMsg = document.getElementById("formSuccess");
    const formTitle = successMsg?.closest(".bg-[#f8f7f4]")?.querySelector("h3");

    if (step3 && successMsg) {
      step3.classList.remove("active");
      if (indicators) indicators.style.display = "none";
      if (formTitle) formTitle.style.display = "none";
      successMsg.classList.remove("hidden");
      successMsg.classList.add("block");
    }
  };
});
