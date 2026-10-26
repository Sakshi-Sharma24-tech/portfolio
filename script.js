/**
 * Sakshi Sharma — Portfolio Interactive Functionality
 * Includes: Theme Toggle (Dark/Light), Mobile Navigation,
 * Scroll-spy, and Dynamic Project Search & Filtering.
 */

(function () {
  "use strict";

  // ==========================================
  // 1. Dynamic Year
  // ==========================================
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // ==========================================
  // 2. Light / Dark Mode Toggle
  // ==========================================
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
  const themeText = themeToggle ? themeToggle.querySelector(".theme-text") : null;

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light Mode";
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      document.body.classList.remove("dark-mode");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark Mode";
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  // Load saved theme or match system preference
  const savedTheme = localStorage.getItem("portfolio_theme");
  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
      applyTheme(isDark);
    });
  }

  // ==========================================
  // 3. Mobile Navigation Menu
  // ==========================================
  const nav = document.getElementById("site-nav");
  const navToggle = document.querySelector(".nav-toggle");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when link is clicked
    nav.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==========================================
  // 4. Scroll-Spy (Active Navigation Link)
  // ==========================================
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            const active = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ==========================================
  // 5. Dynamic Project Search and Filtering
  // ==========================================
  const projectSearch = document.getElementById("projectSearch");
  const clearSearch = document.getElementById("clearSearch");
  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll(".project-card");
  const searchCount = document.getElementById("searchCount");
  const noResultsMessage = document.getElementById("noResultsMessage");

  let currentCategory = "all";
  let currentSearchQuery = "";

  function filterProjects() {
    let visibleCount = 0;
    const query = currentSearchQuery.trim().toLowerCase();

    projectCards.forEach(function (card) {
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const text = card.textContent.toLowerCase();

      // Check Category Match
      const matchesCategory =
        currentCategory === "all" || tags.includes(currentCategory);

      // Check Search Query Match
      const matchesSearch =
        !query || title.includes(query) || tags.includes(query) || text.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update Counter & Fallback UI
    if (searchCount) {
      if (visibleCount === projectCards.length) {
        searchCount.textContent = `Showing all ${visibleCount} projects`;
      } else {
        searchCount.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
      }
    }

    if (noResultsMessage) {
      noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }

    if (clearSearch) {
      clearSearch.style.display = currentSearchQuery ? "inline-block" : "none";
    }
  }

  if (projectSearch) {
    projectSearch.addEventListener("input", function (e) {
      currentSearchQuery = e.target.value;
      filterProjects();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", function () {
      if (projectSearch) {
        projectSearch.value = "";
        currentSearchQuery = "";
        projectSearch.focus();
        filterProjects();
      }
    });
  }

  filterChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      filterChips.forEach(function (c) {
        c.classList.remove("active");
      });
      this.classList.add("active");
      currentCategory = this.getAttribute("data-filter") || "all";
      filterProjects();
    });
  });

  console.log("Sakshi Sharma Portfolio — Scripts & Interactivity Initialized");
})();
