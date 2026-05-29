(function () {
  'use strict';

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.mobile-menu');
  var body = document.body;

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-locked');
  }

  function openMenu() {
    if (!toggle || !menu) return;
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('is-locked');
  }

  if (toggle && menu) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      if (toggle.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // --- Smooth scroll for in-page anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Reveal on scroll (IntersectionObserver) ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // --- Footer year ---
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
