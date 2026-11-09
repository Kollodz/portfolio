// ============================================================
// VICTOR KOLODZIEJSKI — PORTFÓLIO — script.js
// ============================================================
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileNav();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initBarChart();
    initGallery();
    initLightbox();
    initContactForm();
    initBackToTop();
    document.getElementById('footerYear').textContent = new Date().getFullYear();
  });

  // ---------- Header: transparência ao rolar ----------
  function initHeader() {
    var header = document.getElementById('siteHeader');
    function onScroll() {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Menu mobile ----------
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Scroll reveal (fade + up) ----------
  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Contadores animados ----------
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1800;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toLocaleString('pt-BR') + suffix;
        }
      }
      window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Barras de proficiência (Competências) ----------
  function initSkillBars() {
    var cards = document.querySelectorAll('.skills-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.querySelectorAll('.bar i').forEach(function (bar) {
        bar.style.setProperty('--target', bar.style.width);
        bar.style.width = '0';
      });
    });

    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (card) {
        card.querySelectorAll('.bar i').forEach(function (bar) {
          bar.style.width = bar.style.getPropertyValue('--target');
        });
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar i').forEach(function (bar) {
            bar.style.width = bar.style.getPropertyValue('--target');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    cards.forEach(function (card) { observer.observe(card); });
  }

  // ---------- Gráfico de barras (Resultados) ----------
  function initBarChart() {
    var cols = document.querySelectorAll('.bar-col');
    if (!cols.length) return;
    if (!('IntersectionObserver' in window)) {
      cols.forEach(function (c) { c.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    cols.forEach(function (c) { observer.observe(c); });
  }

  // ---------- Galeria: carrossel ----------
  function initGallery() {
    var track = document.getElementById('galleryTrack');
    var prev = document.getElementById('galleryPrev');
    var next = document.getElementById('galleryNext');
    if (!track) return;

    function scrollByCard(dir) {
      var card = track.querySelector('.gallery-item');
      var gap = 16;
      var amount = card ? (card.offsetWidth + gap) * 2 : 300;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
    prev.addEventListener('click', function () { scrollByCard(-1); });
    next.addEventListener('click', function () { scrollByCard(1); });
  }

  // ---------- Lightbox (zoom na galeria) ----------
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var closeBtn = document.getElementById('lightboxClose');
    var label = document.getElementById('lightboxLabel');
    var items = document.querySelectorAll('.gallery-item');

    function open(text) {
      label.textContent = text;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        open(item.getAttribute('data-label') || item.textContent);
      });
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // ---------- Formulário de contato ----------
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.style.color = '#DC2626';
        status.textContent = 'Preencha os campos obrigatórios antes de enviar.';
        return;
      }
      status.style.color = '#10B981';
      status.textContent = 'Mensagem pronta! Conecte este formulário ao seu backend (e-mail ou Supabase) para envio automático.';
      form.reset();
    });
  }

  // ---------- Botão voltar ao topo ----------
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    function onScroll() {
      if (window.scrollY > 500) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
