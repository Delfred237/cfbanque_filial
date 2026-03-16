// (function () {
//   "use strict";

//   /* ── Selectors ── */
//   const navbar = document.getElementById("navbar");
//   const toggle = document.getElementById("mobileToggle");
//   const drawer = document.getElementById("mobileDrawer");
//   const overlay = document.getElementById("mobileOverlay");
//   const drawerClose = document.getElementById("drawerClose");
//   const accordionTriggers = document.querySelectorAll(".accordion-trigger");

//   let isOpen = false;

//   /* ────────────────────────────────────────
//      DRAWER — Open / Close
//   ──────────────────────────────────────── */
//   function openMenu() {
//     isOpen = true;

//     drawer.classList.add("is-open");
//     overlay.classList.add("is-visible");
//     toggle.classList.add("is-open");
//     toggle.setAttribute("aria-expanded", "true");
//     document.body.classList.add("menu-open");

//     // Trap focus inside drawer after transition
//     drawer.addEventListener("transitionend", trapFocus, { once: true });
//   }

//   function closeMenu() {
//     isOpen = false;

//     drawer.classList.remove("is-open");
//     overlay.classList.remove("is-visible");
//     toggle.classList.remove("is-open");
//     toggle.setAttribute("aria-expanded", "false");
//     document.body.classList.remove("menu-open");

//     // Close all accordions
//     accordionTriggers.forEach(closeAccordion);
//   }

//   function trapFocus() {
//     const focusable = drawer.querySelectorAll(
//       'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
//     );
//     if (focusable.length) focusable[0].focus();
//   }

//   /* Toggle */
//   toggle.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));

//   /* Close on overlay click */
//   overlay.addEventListener("click", closeMenu);

//   /* Close button inside drawer */
//   drawerClose.addEventListener("click", closeMenu);

//   /* Close on Escape key */
//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && isOpen) closeMenu();
//   });

//   /* Close on resize to desktop breakpoint */
//   window.addEventListener("resize", () => {
//     if (window.innerWidth >= 1024 && isOpen) closeMenu();
//   });

//   /* ────────────────────────────────────────
//      ACCORDION
//   ──────────────────────────────────────── */
//   function openAccordion(trigger) {
//     const body = trigger.nextElementSibling;
//     trigger.setAttribute("aria-expanded", "true");
//     body.classList.add("is-open");
//   }

//   function closeAccordion(trigger) {
//     const body = trigger.nextElementSibling;
//     trigger.setAttribute("aria-expanded", "false");
//     body.classList.remove("is-open");
//   }

//   accordionTriggers.forEach((trigger) => {
//     trigger.addEventListener("click", () => {
//       const isExpanded = trigger.getAttribute("aria-expanded") === "true";

//       // Close all other accordions (single-open behaviour)
//       accordionTriggers.forEach((t) => {
//         if (t !== trigger) closeAccordion(t);
//       });

//       isExpanded ? closeAccordion(trigger) : openAccordion(trigger);
//     });
//   });
// })();

// // ===== NAVBAR SCROLL =====
// const handleScroll = () => {
//   const navbar = document.getElementById("navbar");
//   const backToTop = document.getElementById("backToTop");
//   const scrollPosition = window.scrollY;

//   // 1. Gestion de la Navbar Sticky
//   if (scrollPosition > 20) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }

//   // 2. Gestion du bouton Back To Top
//   if (backToTop) {
//     if (scrollPosition > 400) {
//       backToTop.classList.add("is-visible"); // Utilise une classe CSS plutôt que .style.display
//       backToTop.style.display = "flex";
//     } else {
//       backToTop.classList.remove("is-visible");
//       backToTop.style.display = "none";
//     }
//   }

//   // 3. Appel de tes animations au scroll
//   animateOnScroll();
// };

// // ===== SCROLL ANIMATIONS =====
// function animateOnScroll() {
//   document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//     const rect = el.getBoundingClientRect();
//     if (rect.top < window.innerHeight - 80) {
//       el.classList.add("visible");
//     }
//   });
// }

// // ===== INITIALISATION =====
// handleScroll();
// animateOnScroll();

(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const topBar = document.querySelector(".top-bar");
  const toggle = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const drawerClose = document.getElementById("drawerClose");
  const backToTop = document.getElementById("backToTop");

  /* ─── GESTION DU SCROLL ─── */
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky Header Effect
    if (navbar) {
      topBar.classList.toggle("scrolled", scrollPos > 100);
      navbar.classList.toggle("scrolled", scrollPos > 100);
    }

    // Back to Top Button
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

    // Déclenchement des animations on-scroll
    animateOnScroll();
  };

  /* ─── GESTION DU DRAWER ─── */
  const toggleMenu = (state) => {
    drawer.classList.toggle("is-open", state);
    overlay.classList.toggle("is-visible", state);
    toggle.classList.toggle("is-open", state);
    document.body.style.overflow = state ? "hidden" : "";
  };

  toggle.addEventListener("click", () =>
    toggleMenu(!drawer.classList.contains("is-open")),
  );
  overlay.addEventListener("click", () => toggleMenu(false));
  drawerClose.addEventListener("click", () => toggleMenu(false));

  /* ─── ANIMATIONS ON SCROLL ─── */
  function animateOnScroll() {
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("visible");
      }
    });
  }

  /* ─── INITIALISATION ─── */
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Check au chargement
})();
