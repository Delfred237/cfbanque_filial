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
    if (scrollPos > 120) {
      navbar.classList.add("scrolled");

      if (topBar) {
        topBar.classList.add("scrolled");
      }
    } else {
      navbar.classList.remove("scrolled");

      if (topBar) {
        topBar.classList.remove("scrolled");
      }
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
