/* Divi Pixel / Divi Engine tadinda sade mobil menu */
(function () {
  function getDirectChildByTag(parentNode, tagName) {
    var children = parentNode.children;
    var normalizedTag = tagName.toUpperCase();
    var i;

    for (i = 0; i < children.length; i += 1) {
      if (children[i].tagName === normalizedTag) {
        return children[i];
      }
    }

    return null;
  }

  function sanitizeDuplicateIds(rootNode) {
    var allIds = rootNode.querySelectorAll("[id]");
    var i;

    for (i = 0; i < allIds.length; i += 1) {
      allIds[i].removeAttribute("id");
    }
  }

  function getBrandTitle() {
    var logo = document.querySelector(".logo_container img, #logo");
    if (logo && logo.getAttribute("alt")) {
      return logo.getAttribute("alt");
    }

    if (document.title) {
      return document.title.split("|")[0].trim();
    }

    return "Site Menu";
  }

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
    panel.setAttribute("aria-label", "Mobil menu");
    panel.setAttribute("aria-modal", "true");

    var header = document.createElement("div");
    header.className = "dmm-panel-header";

    var brand = document.createElement("div");
    brand.className = "dmm-brand";

    var brandLabel = document.createElement("span");
    brandLabel.className = "dmm-brand-label";
    brandLabel.textContent = "NAVIGATION";

    var brandTitle = document.createElement("strong");
    brandTitle.className = "dmm-brand-title";
    brandTitle.textContent = getBrandTitle();

    brand.appendChild(brandLabel);
    brand.appendChild(brandTitle);

    var closeButton = document.createElement("button");
    closeButton.className = "dmm-close";
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "Menuyu kapat");
    closeButton.textContent = "×";

    header.appendChild(brand);
    header.appendChild(closeButton);

    var clonedMenu = sourceMenu.cloneNode(true);
    clonedMenu.classList.remove("et_mobile_menu");
    clonedMenu.classList.add("dmm-menu");
    if (clonedMenu.id) {
      clonedMenu.removeAttribute("id");
    }
    sanitizeDuplicateIds(clonedMenu);

    var submenuParents = clonedMenu.querySelectorAll(
      "li.menu-item-has-children, li.page_item_has_children"
    );

    function collapseSubmenu(parentItem) {
      var submenu = getDirectChildByTag(parentItem, "ul");
      var toggle = parentItem.querySelector(".dmm-submenu-toggle");

      parentItem.classList.remove("dmm-submenu-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
      if (submenu) {
        submenu.style.maxHeight = "0px";
      }
    }

    function expandSubmenu(parentItem) {
      var submenu = getDirectChildByTag(parentItem, "ul");
      var toggle = parentItem.querySelector(".dmm-submenu-toggle");

      parentItem.classList.add("dmm-submenu-open");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
      }
      if (submenu) {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    }

    function collapseAllSubmenus() {
      var i;

      for (i = 0; i < submenuParents.length; i += 1) {
        collapseSubmenu(submenuParents[i]);
      }
    }

    var i;
    for (i = 0; i < submenuParents.length; i += 1) {
      (function (parentItem, index) {
        var parentLink = getDirectChildByTag(parentItem, "a");
        var submenu = getDirectChildByTag(parentItem, "ul");
        var submenuId;
        var toggle;

        if (!parentLink || !submenu) {
          return;
        }

        submenuId = "dmm-submenu-" + index;
        submenu.id = submenuId;
        submenu.classList.add("dmm-submenu");
        submenu.style.maxHeight = "0px";

        toggle = document.createElement("button");
        toggle.className = "dmm-submenu-toggle";
        toggle.setAttribute("type", "button");
        toggle.setAttribute("aria-label", "Alt menuyu ac/kapat");
        toggle.setAttribute("aria-controls", submenuId);
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<span class="dmm-chevron" aria-hidden="true"></span>';

        parentItem.classList.add("dmm-has-submenu");
        parentItem.insertBefore(toggle, submenu);

        toggle.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (parentItem.classList.contains("dmm-submenu-open")) {
            collapseSubmenu(parentItem);
            return;
          }

          collapseAllSubmenus();
          expandSubmenu(parentItem);
        });
      })(submenuParents[i], i + 1);
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
      collapseAllSubmenus();
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
      var parentItem;
      var href;
      var toggle;

      if (!menuLink || menuLink.closest(".dmm-submenu-toggle")) {
        return;
      }

      parentItem = menuLink.parentElement;
      if (parentItem && parentItem.classList.contains("dmm-has-submenu")) {
        href = menuLink.getAttribute("href");

        if (!href || href === "#") {
          event.preventDefault();
          toggle = parentItem.querySelector(".dmm-submenu-toggle");
          if (toggle) {
            toggle.click();
          }
          return;
        }
      }

      closeMenu();
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
