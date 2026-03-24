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
    staggerDelay: 50,
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
    const targetStr =
      el.getAttribute("data-target") || el.innerText.replace(/[^0-9]/g, "");
    const target = parseInt(targetStr);
    if (isNaN(target)) return;

    let count = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = target / totalFrames;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.innerText = Math.floor(count) + (target > 100 ? "+" : "");
        requestAnimationFrame(updateCount);
      } else {
        // Formatage final (Ex: 1000 -> 1K+)
        el.innerText =
          target >= 1000
            ? (target / 1000).toFixed(0) + "K+"
            : target + (target > 1 ? "+" : "");
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

  /* ─── 8. ACCORDEON MOBILE (MENU MORE) ─── */
  const accordionTrigger = document.querySelector(".accordion-trigger");
  const accordionBody = document.querySelector(".accordion-body");

  if (accordionTrigger && accordionBody) {
    accordionTrigger.addEventListener("click", () => {
      const isOpen = accordionBody.classList.contains("is-open");

      // 1. Gestion de l'accessibilité
      accordionTrigger.setAttribute("aria-expanded", !isOpen);

      // 2. Toggle de la classe pour l'animation CSS (max-height)
      accordionBody.classList.toggle("is-open");

      // 3. Rotation de la flèche (gérée par ton CSS via aria-expanded)
      const arrow = accordionTrigger.querySelector(".accordion-arrow");
      if (arrow) {
        arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
      }
    });
  }

  /* ─── 9. MARKET TABS ─── */
  window.showMarket = function (id, el) {
    document
      .querySelectorAll(".market-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".market-panel")
      .forEach((p) => p.classList.remove("active"));
    el.classList.add("active");
    document.getElementById("panel-" + id).classList.add("active");
  };

  /* ─── 10. CONTACT FORM ─── */
  let currentStep = 1;

  window.goToStep = function (step) {
    document.getElementById("step-" + currentStep).classList.remove("active");
    document.getElementById("step-" + step).classList.add("active");
    // Update dots
    for (let i = 1; i <= 3; i++) {
      const dot = document.getElementById("dot-" + i);
      if (i < step) {
        dot.className = "step-dot done";
        dot.innerHTML = "✓";
      } else if (i === step) {
        dot.className = "step-dot current";
        dot.innerHTML = i;
      } else {
        dot.className = "step-dot upcoming";
        dot.innerHTML = i;
      }
    }
    // Update lines
    for (let i = 1; i <= 2; i++) {
      const line = document.getElementById("line-" + i);
      line.className = i < step ? "step-line done" : "step-line";
    }
    currentStep = step;
    window.scrollTo({
      top: document.querySelector(".lg\\:col-span-2").offsetTop - 120,
      behavior: "smooth",
    });
  };

  window.submitForm = function () {
    document.getElementById("step-3").classList.remove("active");
    document.getElementById("step-success").classList.add("active");
    for (let i = 1; i <= 3; i++) {
      const dot = document.getElementById("dot-" + i);
      dot.className = "step-dot done";
      dot.innerHTML = "✓";
    }
    for (let i = 1; i <= 2; i++)
      document.getElementById("line-" + i).className = "step-line done";
  };

  /* ─── 11. VP EXPAND TOGGLE ─── */
  window.toggleExpand = function (btn) {
    const card = btn.closest(".vp-card");
    const exp = card.querySelector(".vp-expand");
    const isOpen = exp.classList.contains("open");

    // Fermer les autres profils ouverts (Optionnel - pour un effet Accordéon)
    document.querySelectorAll(".vp-expand.open").forEach((el) => {
      if (el !== exp) {
        el.classList.remove("open");
        el.closest(".vp-card").querySelector("svg").style.transform = "";
      }
    });

    exp.classList.toggle("open");

    // Animation de l'icône
    const svg = btn.querySelector("svg");
    svg.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";

    // Changement de texte
    btn.querySelector(".vp-detail-btn").innerText = isOpen
      ? "Full Profile"
      : "Close Profile";
  };

  const trailer = document.querySelector(".cursor-trailer");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // On montre le trailer dès le premier mouvement
    if (trailer.style.opacity === "0") {
      trailer.style.opacity = "1";
    }

    trailer.style.left = `${posX}px`;
    trailer.style.top = `${posY}px`;
  });

  // Cache le trailer si la souris sort de la fenêtre
  document.addEventListener("mouseleave", () => {
    trailer.style.opacity = "0";
  });

  // Effet de scale au survol des liens/boutons
  const interactiveElements = document.querySelectorAll(
    "a, button, .slider-dot, .slider-arrow",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-active");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-active");
    });
  });

  window.addEventListener("scroll", () => {
    const scrollBar = document.getElementById("scrollBar");

    // Calcul du pourcentage de scroll
    // (Position actuelle / (Hauteur totale - Hauteur fenêtre)) * 100
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Mise à jour de la largeur de la barre
    if (scrollBar) {
      scrollBar.style.width = scrolled + "%";
    }
  });

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    // On attend un tout petit peu pour laisser les animations du Hero commencer
    setTimeout(() => {
      preloader.classList.add("loader-hidden");
    }, 500);
  });
});
