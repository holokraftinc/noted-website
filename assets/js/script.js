/* =========================================================
   Noted - Day Planner | Main JavaScript
   Holokraft Consulting Services (OPC) Pvt Ltd
   ========================================================= */

'use strict';

/* ── Preloader ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('done'), 300);
  }
});

/* ── Navbar Scroll Effect ──────────────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const handler = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
})();

/* ── Mobile Menu ───────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ── FAQ Accordion ─────────────────────────────────────── */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── Scroll Animations ─────────────────────────────────── */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('visible'));
  }
})();

/* ── Scroll-to-Top Button ──────────────────────────────── */
(function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Active Navigation Link ────────────────────────────── */
(function setActiveNavLink() {
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .footer-links a, .mobile-menu .nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === filename || (filename === '' && href === 'index.html') || (filename === 'index.html' && href === '')) {
      link.classList.add('active');
    }
  });
})();

/* ── Contact Form ──────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission — replace with real endpoint
    setTimeout(() => {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Message Sent!';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
        }, 3000);
      }
    }, 1200);
  });
})();

/* ── Smooth Scroll for Anchor Links ────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Screenshots Scroll Hint ───────────────────────────── */
(function initScreenshotScroll() {
  const scroller = document.querySelector('.screenshots-scroll');
  if (!scroller) return;

  let isDown = false;
  let startX, scrollLeft;

  scroller.addEventListener('mousedown', (e) => {
    isDown = true;
    scroller.style.cursor = 'grabbing';
    startX = e.pageX - scroller.offsetLeft;
    scrollLeft = scroller.scrollLeft;
  });
  scroller.addEventListener('mouseleave', () => { isDown = false; scroller.style.cursor = 'grab'; });
  scroller.addEventListener('mouseup', () => { isDown = false; scroller.style.cursor = 'grab'; });
  scroller.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    scroller.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
  scroller.style.cursor = 'grab';
})();

/* ── Legal TOC Highlight on Scroll ─────────────────────── */
(function initLegalTOC() {
  const sections = document.querySelectorAll('.legal-section[id]');
  const links = document.querySelectorAll('.legal-toc a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.style.fontWeight = link.getAttribute('href') === '#' + id ? '700' : '';
          link.style.color = link.getAttribute('href') === '#' + id ? 'var(--primary)' : '';
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ── Notification permission helper (demo) ─────────────── */
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

/* ── Copy to clipboard utility ──────────────────────────── */
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

/* ── Expose utilities globally ──────────────────────────── */
window.NotedApp = { requestNotificationPermission, copyToClipboard };
