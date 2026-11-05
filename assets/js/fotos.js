/* Página de fotos: grade em colunas e visualização em tela cheia. Fotos em config.js. */
(function () {
  'use strict';
  var CFG = window.BILU || {};
  var fotos = CFG.fotos || [];
  var base = document.documentElement.getAttribute('data-base') || '';
  var raiz = document.querySelector('[data-galeria]');
  var lb = document.querySelector('.lightbox');
  var img = lb.querySelector('.lb-img');
  var leg = lb.querySelector('.leg');
  var atual = 0, ultimo = null;

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  if (!fotos.length) {
    raiz.innerHTML = '<p class="intro-texto">As fotos chegam em breve. Enquanto isso, veja a gente no Instagram.</p>';
    return;
  }

  raiz.innerHTML = fotos.map(function (f, i) {
    return '<button class="foto" type="button" data-i="' + i + '" aria-label="Ampliar foto: ' + esc(f.legenda) + '">' +
      '<img src="' + base + 'assets/img/' + f.arquivo + '" alt="' + esc(f.alt || f.legenda) + '" loading="' + (i < 4 ? 'eager' : 'lazy') + '" decoding="async">' +
      '<span>' + esc(f.legenda) + '</span></button>';
  }).join('');

  function mostrar(i) {
    atual = (i + fotos.length) % fotos.length;
    var f = fotos[atual];
    img.src = base + 'assets/img/' + f.arquivo;
    img.alt = f.alt || f.legenda;
    leg.textContent = (atual + 1) + ' de ' + fotos.length + ' · ' + f.legenda;
  }
  function abrir(i) {
    ultimo = document.activeElement;
    mostrar(i);
    lb.inert = false;
    lb.classList.add('on');
    document.documentElement.classList.add('trava');
    lb.querySelector('.fechar').focus({ preventScroll: true });
  }
  function fechar() {
    lb.classList.remove('on');
    lb.inert = true;
    document.documentElement.classList.remove('trava');
    if (ultimo && ultimo.isConnected) ultimo.focus({ preventScroll: true });
  }

  raiz.addEventListener('click', function (e) {
    var b = e.target.closest('.foto');
    if (b) abrir(parseInt(b.getAttribute('data-i'), 10));
  });
  lb.querySelector('.fechar').addEventListener('click', fechar);
  lb.querySelector('[data-ant]').addEventListener('click', function () { mostrar(atual - 1); });
  lb.querySelector('[data-prox]').addEventListener('click', function () { mostrar(atual + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) fechar(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') fechar();
    else if (e.key === 'ArrowLeft') mostrar(atual - 1);
    else if (e.key === 'ArrowRight') mostrar(atual + 1);
  });

  /* deslizar para o lado troca de foto */
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
  });

  lb.inert = true;
})();
