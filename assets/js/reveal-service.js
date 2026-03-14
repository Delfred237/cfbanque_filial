(function () {
  "use strict";

  const initServices = () => {
    const section = document.querySelector(".what-we-do");
    const tabsContainer = document.getElementById("tabs-container");
    const indicator = document.getElementById("tab-indicator");
    const tabs = document.querySelectorAll(".service-tab");
    const panels = document.querySelectorAll(".service-panel");

    if (!section) return;

    // 1. Gérer l'apparition de la section entière au scroll
    // On utilise l'observer global que nous avons créé précédemment
    // Assure-toi que <section class="what-we-do"> a la classe .reveal

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
        // On force un reflow pour que l'animation se redéclenche
        void activePanel.offsetWidth;
        activePanel.classList.add("active", "is-visible");
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

    // Initialisation au chargement
    const firstTab = tabsContainer.querySelector(".service-tab.active");
    if (firstTab) setTimeout(() => moveIndicator(firstTab), 200);
  };

  document.addEventListener("DOMContentLoaded", initServices);
})();
