/**
 * Chartered Platform - Services Tab System
 * Gère le glissement de l'indicateur et l'affichage des panneaux
 */

(function () {
  "use strict";

  const initTabs = () => {
    const tabsContainer = document.querySelector(".service-tabs");
    const indicator = document.getElementById("tab-indicator");
    const tabs = document.querySelectorAll(".service-tab");
    const panels = document.querySelectorAll(".service-panel");

    if (!tabsContainer || !indicator) return;

    /**
     * Déplace la ligne dorée sous l'onglet actif
     */
    const moveIndicator = (tab) => {
      indicator.style.width = `${tab.offsetWidth}px`;
      indicator.style.left = `${tab.offsetLeft}px`;
    };

    /**
     * Change le panneau visible avec une animation
     */
    const switchPanel = (index) => {
      panels.forEach((panel) => {
        panel.classList.remove("active");
        panel.style.display = "none";
      });

      const activePanel = document.getElementById(`service-${index}`);
      if (activePanel) {
        activePanel.style.display = "flex";
        // On attend le prochain frame pour déclencher l'animation CSS
        requestAnimationFrame(() => {
          activePanel.classList.add("active");
        });
      }
    };

    // --- ÉVÉNEMENTS ---

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const serviceIndex = tab.dataset.service;

        // 1. Mise à jour des classes onglets
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // 2. Mouvement de l'indicateur
        moveIndicator(tab);

        // 3. Switch des panneaux
        switchPanel(serviceIndex);
      });
    });

    // --- INITIALISATION & RESPONSIVE ---

    // Positionner l'indicateur au chargement (sur l'onglet 'active' par défaut)
    const activeTab = tabsContainer.querySelector(".service-tab.active");
    if (activeTab) {
      // Un petit délai peut être nécessaire si les polices personnalisées ne sont pas chargées
      setTimeout(() => moveIndicator(activeTab), 100);
    }

    // Recalculer la position si l'utilisateur redimensionne son navigateur
    window.addEventListener(
      "resize",
      () => {
        const currentActive = tabsContainer.querySelector(
          ".service-tab.active",
        );
        if (currentActive) moveIndicator(currentActive);
      },
      { passive: true },
    );
  };

  // Lancement au chargement du DOM
  document.addEventListener("DOMContentLoaded", initTabs);
})();
