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
        clearTimeout(timer);
        timer = setTimeout(function () { btn.textContent = label; }, 2400);
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
})();
