/**
 * Fondazione BRA INNOVA - Main JavaScript (Vanilla, no jQuery)
 */

document.addEventListener('DOMContentLoaded', function () {

  // === Preloader ===
  const loaderWrap = document.querySelector('.loader-wrap');
  if (loaderWrap) {
    setTimeout(function () {
      loaderWrap.style.opacity = '0';
      loaderWrap.style.pointerEvents = 'none';
      setTimeout(function () { loaderWrap.style.display = 'none'; }, 500);
    }, 1500);
  }
  const preloaderClose = document.querySelector('.preloader-close');
  if (preloaderClose) {
    preloaderClose.addEventListener('click', function () {
      loaderWrap.style.opacity = '0';
      loaderWrap.style.pointerEvents = 'none';
      setTimeout(function () { loaderWrap.style.display = 'none'; }, 500);
    });
  }

  // === Sticky Header ===
  const header = document.querySelector('.main-header');
  const scrollBtn = document.querySelector('.scroll-top');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY >= 110) {
      header.classList.add('fixed-header');
      if (scrollBtn) scrollBtn.classList.add('open');
    } else {
      header.classList.remove('fixed-header');
      if (scrollBtn) scrollBtn.classList.remove('open');
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // === Scroll to Top ===
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Smooth Scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Scroll Reveal Animation (replaces WOW.js) ===
  var revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('revealed'); });
  }

  // === Accordion (vanilla) ===
  document.querySelectorAll('.accordion-box .acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = this.closest('.accordion');
      var content = this.nextElementSibling;
      var parent = this.closest('.accordion-box');
      var isActive = this.classList.contains('active');

      // Close all
      parent.querySelectorAll('.acc-btn').forEach(function (b) { b.classList.remove('active'); });
      parent.querySelectorAll('.acc-content').forEach(function (c) {
        c.style.maxHeight = null;
        c.classList.remove('active');
      });

      // Open clicked if it was closed
      if (!isActive) {
        this.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // === Back to top smooth scroll ===
  var backToTop = document.querySelector('.scroll-to-target');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
