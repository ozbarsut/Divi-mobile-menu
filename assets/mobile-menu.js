/* Basit Divi mobil menü davranisi */
(function () {
  function initSimpleMobileMenu() {
    if (document.querySelector(".dmm-panel")) {
      return;
    }

    var sourceMenu = document.querySelector("#mobile_menu, .et_mobile_menu");
    var trigger = document.querySelector(
      ".mobile_menu_bar_toggle, .mobile_menu_bar"
    );

    if (!sourceMenu || !trigger) {
      return;
    }

    var overlay = document.createElement("div");
    overlay.className = "dmm-overlay";
    overlay.setAttribute("aria-hidden", "true");

    var panel = document.createElement("aside");
    panel.className = "dmm-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Mobil menü");
    panel.setAttribute("aria-modal", "true");

    var header = document.createElement("div");
    header.className = "dmm-panel-header";

    var closeButton = document.createElement("button");
    closeButton.className = "dmm-close";
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "Menüyü kapat");
    closeButton.textContent = "×";
    header.appendChild(closeButton);

    var clonedMenu = sourceMenu.cloneNode(true);
    clonedMenu.classList.remove("et_mobile_menu");
    clonedMenu.classList.add("dmm-menu");
    if (clonedMenu.id) {
      clonedMenu.removeAttribute("id");
    }

    panel.appendChild(header);
    panel.appendChild(clonedMenu);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    function openMenu() {
      document.body.classList.add("dmm-open");
      trigger.setAttribute("aria-expanded", "true");
      closeButton.focus();
    }

    function closeMenu() {
      document.body.classList.remove("dmm-open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }

    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (document.body.classList.contains("dmm-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    trigger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenu();
      }
    });

    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    panel.addEventListener("click", function (event) {
      var menuLink = event.target.closest("a");
      if (menuLink) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("dmm-open")) {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSimpleMobileMenu);
  } else {
    initSimpleMobileMenu();
  }
})();
