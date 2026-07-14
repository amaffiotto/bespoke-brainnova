/**
 * Fondazione BRA INNOVA - Main JavaScript (Vanilla, no jQuery)
 */

document.addEventListener('DOMContentLoaded', function () {

  // === Scroll to Top Button ===
  var scrollBtn = document.querySelector('.scroll-top');
  function handleScroll() {
    if (scrollBtn) {
      if (window.scrollY >= 300) {
        scrollBtn.classList.add('open');
      } else {
        scrollBtn.classList.remove('open');
      }
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

  // === Download Carousel ===
  var track = document.querySelector('.download-track');
  var prevBtn = document.querySelector('.download-arrow.prev');
  var nextBtn = document.querySelector('.download-arrow.next');
  function smoothScrollTo(el, target, duration) {
    var start = el.scrollLeft;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.scrollLeft = start + (target - start) * ease;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (track && prevBtn && nextBtn) {
    var scrollAmount = 300;
    prevBtn.addEventListener('click', function () { smoothScrollTo(track, track.scrollLeft - scrollAmount, 400); });
    nextBtn.addEventListener('click', function () { smoothScrollTo(track, track.scrollLeft + scrollAmount, 400); });
  }

  // === Back to top smooth scroll ===
  var backToTop = document.querySelector('.scroll-to-target');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Mobile Menu ===
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuOuter = document.querySelector('.mobile-menu .menu-outer');
  var desktopNav = document.querySelector('.main-header .header-lower .main-menu .navigation');
  var menuBackdrop = document.querySelector('.mobile-menu .menu-backdrop');
  var closeBtn = document.querySelector('.mobile-menu .close-btn');
  var mobileTogglers = document.querySelectorAll('.mobile-nav-toggler');

  if (mobileMenu && menuOuter && desktopNav) {
    var navClone = desktopNav.cloneNode(true);
    navClone.removeAttribute('id');
    navClone.classList.add('mobile-navigation');
    menuOuter.appendChild(navClone);
  }

  function openMobileMenu() {
    document.body.classList.add('mobile-menu-visible');
  }

  function closeMobileMenu() {
    document.body.classList.remove('mobile-menu-visible');
  }

  mobileTogglers.forEach(function (toggler) {
    toggler.addEventListener('click', openMobileMenu);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMobileMenu);

  // Mobile submenu toggle
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      var btn = e.target.closest('.dropdown-btn');
      if (!btn) return;
      e.preventDefault();
      var li = btn.closest('li');
      if (!li) return;
      var subMenu = li.querySelector(':scope > ul, :scope > .megamenu');
      if (subMenu) {
        var isOpen = li.classList.contains('open');
        li.classList.toggle('open');
      }
    });
  }

});
