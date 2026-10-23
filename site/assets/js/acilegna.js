(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu mobile
  var menuBtn = document.querySelector('.ac-menu-btn');
  var menu = document.getElementById('ac-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      menu.toggleAttribute('hidden', !open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.setAttribute('hidden', '');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // « Acilegna » se retourne en « Angélica »
  var flip = document.querySelector('.ac-flip');
  if (flip) {
    flip.addEventListener('click', function () {
      flip.setAttribute('aria-pressed', flip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  }

  // Copier l'adresse e-mail
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.textContent, timer;
    btn.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        btn.textContent = 'Adresse copiée';
        btn.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(function () { btn.textContent = label; btn.classList.remove('is-copied'); }, 2400);
      });
    });
  });

  // Parallaxe des perles du héros (souris uniquement)
  var hero = document.querySelector('.ac-hero');
  if (hero && !reduce) {
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    var tick = function () {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      hero.style.setProperty('--mx', x.toFixed(4));
      hero.style.setProperty('--my', y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0006 ? requestAnimationFrame(tick) : 0;
    };
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = hero.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1));
      ty = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1));
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener('pointerleave', function () {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }

  // En-tête : ombre dès que la page défile
  var header = document.querySelector('.ac-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      ticking = false;
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  // Navigation : lien de la section qui traverse le milieu de l'écran
  var navLinks = document.querySelectorAll('.ac-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.ac-root section[id]').forEach(function (sec) { spy.observe(sec); });
  }

  // Apparitions au défilement (uniquement si .ac-motion a été posée en tête de page)
  var root = document.documentElement;
  window.acMotion = true;
  if (root.classList.contains('ac-motion')) {
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('ac-motion');
    } else {
      document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) { child.style.setProperty('--i', i); });
      });

      // Chiffres : comptent jusqu'à leur valeur, puis reprennent exactement le texte d'origine
      var countUp = function (el, delay) {
        var final = el.textContent;
        var m = final.match(/^([^\d]*)(\d[\d ]*(?:,\d+)?)(.*)$/);
        if (!m) return;
        var target = parseFloat(m[2].replace(/ /g, '').replace(',', '.'));
        var decimals = (m[2].split(',')[1] || '').length;
        var format = function (v) {
          var parts = v.toFixed(decimals).split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          return m[1] + parts.join(',') + m[3];
        };
        el.style.minWidth = el.getBoundingClientRect().width + 'px'; // le libellé « vues » ne bouge pas
        el.textContent = format(0);
        setTimeout(function () {
          var t0 = performance.now();
          var step = function (now) {
            var p = Math.min(1, (now - t0) / 1600);
            if (p < 1) {
              el.textContent = format(target * (1 - Math.pow(1 - p, 4)));
              requestAnimationFrame(step);
            } else {
              el.textContent = final;
              el.style.minWidth = '';
            }
          };
          requestAnimationFrame(step);
        }, delay);
      };

      var reveal = function (el, delay) {
        el.style.setProperty('--delay', delay + 'ms');
        el.classList.add('is-in');
        io.unobserve(el);
        el.querySelectorAll('.ac-stat-num').forEach(function (num, i) { countUp(num, delay + 250 + i * 80); });
      };
      var io = new IntersectionObserver(function (entries) {
        var n = 0;
        entries.forEach(function (e) {
          if (e.isIntersecting) reveal(e.target, n++ * 90);
        });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0.12 });
      document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(function (el) { io.observe(el); });
      // Filet de sécurité : arrivé en bas de page, tout ce qui reste apparaît (pied de page sur très grand écran)
      window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
        document.querySelectorAll('[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in)').forEach(function (el, i) { reveal(el, i * 90); });
      }, { passive: true });

      // Tirages : une fois le balancement d'arrivée fini, le survol reprend son propre balancement
      document.querySelectorAll('.ac-print-photo').forEach(function (photo) {
        photo.addEventListener('animationend', function (e) {
          if (e.animationName === 'ac-swing-in') photo.closest('.ac-print').classList.add('is-settled');
        });
      });
    }
  }
})();
