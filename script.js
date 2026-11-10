/* ============================================================
   VICTOR KOLODZIEJSKI — PORTFÓLIO — script.js
   Os números vêm de data.js (window.PORTFOLIO_DATA).
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.PORTFOLIO_DATA || {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Formatação pt-BR ---------- */
  var nf0 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var NBSP = ' ';
  var FORMATS = {
    int:    function (v) { return nf0.format(v); },
    dec1:   function (v) { return nf1.format(v); },
    dec2:   function (v) { return nf2.format(v); },
    brl:    function (v) { return 'R$' + NBSP + nf0.format(v); },
    meses:  function (v) { return nf1.format(v) + NBSP + 'meses'; }
  };

  function getPath(path) {
    return path.split('.').reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, DATA);
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initHeader();
    initMobileNav();
    initScrollSpy();
    initTabs();
    initMetrics();
    initWaterfall();
    initObservers();
    initGallery();
    initContactForm();
    initToTop();
    var y = document.getElementById('footerYear');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- Header: fundo ao rolar + barra de progresso ---------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    var bar = document.getElementById('scrollProgress');
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      header.classList.toggle('scrolled', y > 8);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    function close() {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Item ativo do menu conforme a seção ---------- */
  function initScrollSpy() {
    if (!hasIO) return;
    var links = {};
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].classList.remove('active'); });
        var link = links[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Abas (produtos e módulos) ---------- */
  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
          var n = tabs.length, idx = i;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') idx = (i + 1) % n;
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') idx = (i - 1 + n) % n;
          else if (e.key === 'Home') idx = 0;
          else if (e.key === 'End') idx = n - 1;
          else return;
          e.preventDefault();
          select(tabs[idx], true);
        });
      });
    });
  }

  /* ---------- Métricas: valores de data.js + contagem animada ---------- */
  function initMetrics() {
    var els = document.querySelectorAll('[data-metric]');
    var items = [];

    els.forEach(function (el) {
      var value = getPath(el.getAttribute('data-metric'));
      var fmt = FORMATS[el.getAttribute('data-format') || 'int'];
      if (typeof value !== 'number' || !fmt) return; // mantém o texto estático do HTML
      el.textContent = fmt(value);           // valor final (também vale sem animação)
      items.push({ el: el, value: value, fmt: fmt });
    });

    if (reduceMotion || !hasIO) return;

    function count(item) {
      var duration = 1600, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        item.el.textContent = item.fmt(item.value * eased);
        if (p < 1) window.requestAnimationFrame(step);
        else item.el.textContent = item.fmt(item.value);
      }
      window.requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var item = entry.target._metric;
        observer.unobserve(entry.target);
        if (item) count(item);
      });
    }, { threshold: 0.4 });

    items.forEach(function (item) {
      item.el._metric = item;
      item.el.textContent = item.fmt(0);
      observer.observe(item.el);
    });
  }

  /* ---------- Cascata financeira calculada a partir de data.js ---------- */
  function initWaterfall() {
    var f = DATA.financeiro;
    if (!f || !f.economiaAnualBruta) return;
    var total = f.economiaAnualBruta;
    var afterDev = total - f.custoDev;
    var afterAll = afterDev - f.manutencaoAnual;
    var pct = function (v) { return (v / total * 100).toFixed(2) + '%'; };
    var rows = {
      bruta:   { left: '0%',          w: '100%' },
      dev:     { left: pct(afterDev), w: pct(f.custoDev) },
      manut:   { left: pct(afterAll), w: pct(f.manutencaoAnual) },
      liquido: { left: '0%',          w: pct(f.beneficioLiquido || afterAll) }
    };
    document.querySelectorAll('[data-wf]').forEach(function (row) {
      var cfg = rows[row.getAttribute('data-wf')];
      if (!cfg) return;
      row.style.setProperty('--left', cfg.left);
      row.style.setProperty('--w', cfg.w);
    });
  }

  /* ---------- Entrada em tela: reveal, fluxo, cascata, barras ---------- */
  function initObservers() {
    var targets = document.querySelectorAll('.reveal, .observe');
    if (!hasIO || reduceMotion) {
      targets.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    // Pequeno atraso escalonado entre irmãos
    var seen = new Map();
    targets.forEach(function (el) {
      var parent = el.parentNode;
      var n = seen.get(parent) || 0;
      seen.set(parent, n + 1);
      if (el.classList.contains('reveal')) el.style.transitionDelay = Math.min(n, 5) * 70 + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Galeria: carrossel + lightbox ---------- */
  function initGallery() {
    var track = document.getElementById('galleryTrack');
    if (!track) return;
    var shots = Array.prototype.slice.call(track.querySelectorAll('.shot'));
    var prev = document.getElementById('galleryPrev');
    var next = document.getElementById('galleryNext');

    function scrollCards(dir) {
      var card = shots[0];
      var amount = card ? card.offsetWidth + 18 : 320;
      track.scrollBy({ left: dir * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    prev.addEventListener('click', function () { scrollCards(-1); });
    next.addEventListener('click', function () { scrollCards(1); });

    var box = document.getElementById('lightbox');
    var media = document.getElementById('lbMedia');
    var caption = document.getElementById('lbCaption');
    var current = 0, lastFocus = null;

    function render(i) {
      current = (i + shots.length) % shots.length;
      var shot = shots[current];
      var img = shot.querySelector('img');
      media.innerHTML = '';
      if (img) {
        var clone = document.createElement('img');
        clone.src = img.src;
        clone.alt = shot.getAttribute('data-label') || '';
        media.appendChild(clone);
      } else {
        var ph = document.createElement('div');
        ph.className = 'lb-placeholder';
        ph.textContent = 'Screenshot ' + String(current + 1).padStart(2, '0') + ' — adicione em assets/gallery/';
        media.appendChild(ph);
      }
      caption.textContent = String(current + 1).padStart(2, '0') + ' · ' + (shot.getAttribute('data-label') || '');
    }
    function open(i) {
      lastFocus = document.activeElement;
      render(i);
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('lbClose').focus();
    }
    function close() {
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    shots.forEach(function (shot, i) { shot.addEventListener('click', function () { open(i); }); });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { render(current - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { render(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') render(current - 1);
      else if (e.key === 'ArrowRight') render(current + 1);
    });
  }

  /* ---------- Formulário: abre o e-mail já preenchido ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var f = new FormData(form);
      var subject = 'Contato pelo portfólio — ' + f.get('nome');
      var body = 'Nome: ' + f.get('nome') + '\n' +
                 'Empresa: ' + (f.get('empresa') || '-') + '\n' +
                 'E-mail: ' + f.get('email') + '\n\n' + f.get('mensagem');
      window.location.href = 'mailto:kolodzvitor2636@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      status.textContent = 'Abrindo o seu aplicativo de e-mail com a mensagem pronta.';
    });
  }

  /* ---------- Voltar ao topo ---------- */
  function initToTop() {
    var btn = document.getElementById('toTop');
    function update() { btn.classList.toggle('visible', (window.scrollY || 0) > 700); }
    update();
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
})();
