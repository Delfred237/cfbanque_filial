(function () {
  "use strict";

  /* ── Selectors ── */
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  let isOpen = false;

  /* ────────────────────────────────────────
     DRAWER — Open / Close
  ──────────────────────────────────────── */
  function openMenu() {
    isOpen = true;

    drawer.classList.add("is-open");
    overlay.classList.add("is-visible");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");

    // Trap focus inside drawer after transition
    drawer.addEventListener("transitionend", trapFocus, { once: true });
  }

  function closeMenu() {
    isOpen = false;

    drawer.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");

    // Close all accordions
    accordionTriggers.forEach(closeAccordion);
  }

  function trapFocus() {
    const focusable = drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length) focusable[0].focus();
  }

  /* Toggle */
  toggle.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));

  /* Close on overlay click */
  overlay.addEventListener("click", closeMenu);

  /* Close button inside drawer */
  drawerClose.addEventListener("click", closeMenu);

  /* Close on Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  /* Close on resize to desktop breakpoint */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && isOpen) closeMenu();
  });

  /* ────────────────────────────────────────
     ACCORDION
  ──────────────────────────────────────── */
  function openAccordion(trigger) {
    const body = trigger.nextElementSibling;
    trigger.setAttribute("aria-expanded", "true");
    body.classList.add("is-open");
  }

  function closeAccordion(trigger) {
    const body = trigger.nextElementSibling;
    trigger.setAttribute("aria-expanded", "false");
    body.classList.remove("is-open");
  }

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other accordions (single-open behaviour)
      accordionTriggers.forEach((t) => {
        if (t !== trigger) closeAccordion(t);
      });

      isExpanded ? closeAccordion(trigger) : openAccordion(trigger);
    });
  });

  /* ────────────────────────────────────────
     NAVBAR — Scroll shadow
  ──────────────────────────────────────── */
  const scrollHandler = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });

  // Run once on load
  scrollHandler();
})();

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Back to top
  const btn = document.getElementById("backToTop");

  if (window.scrollY > 400) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }

  // Scroll animations
  animateOnScroll();
});

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

// Trigger on load
animateOnScroll();
