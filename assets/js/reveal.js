(function () {
  "use strict";

  const CONFIG = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
    staggerDelay: 150,
  };

  // --- LOGIQUE DU COMPTEUR ---
  const countUp = (el) => {
    const target = parseInt(el.innerText);

    let count = 0;

    const speed = 1000 / target; // Durée totale de 2 secondes

    const updateCount = () => {
      if (count < target) {
        count++;

        el.innerText = count + (target > 999 ? "K" : "");

        setTimeout(updateCount, speed);
      } else {
        el.innerText = target + "K";
      }
    };

    updateCount();
  };

  // --- CALLBACK UNIQUE ---
  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // 1. Gérer le compteur si présent
        const statNumber = target.querySelector(".counter");
        if (statNumber) countUp(statNumber);

        // 2. Gérer le Staggering
        if (target.hasAttribute("data-stagger")) {
          const children = target.querySelectorAll(target.dataset.stagger);
          children.forEach((child, index) => {
            setTimeout(
              () => child.classList.add("is-visible"),
              index * CONFIG.staggerDelay,
            );
          });
        }

        // 3. Révéler l'élément lui-même
        target.classList.add("is-visible");

        observer.unobserve(target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, {
    threshold: CONFIG.threshold,
    rootMargin: CONFIG.rootMargin,
  });

  const init = () => {
    // On observe tout ce qui a .reveal OU .animate-on-scroll OU data-stagger
    const elementsToWatch = document.querySelectorAll(
      ".reveal, .animate-on-scroll, [data-stagger]",
    );
    elementsToWatch.forEach((el) => observer.observe(el));

    // Navbar
    const navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener(
        "scroll",
        () => {
          navbar.classList.toggle("scrolled", window.scrollY > 20);
        },
        { passive: true },
      );
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
