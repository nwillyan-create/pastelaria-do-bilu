/* Página inicial: entrada com cortina dupla (uma vez por visita), sequência do topo e barra fixa de pedido. */
(function () {
  'use strict';
  var root = document.documentElement;
  var intro = document.querySelector('.intro');
  var feito = false;

  function liberarHero() { root.classList.add('hero-go'); }

  function encerrar(rapido) {
    if (feito) return;
    feito = true;
    try { sessionStorage.setItem('bilu-intro', '1'); } catch (e) {}
    if (!intro) { root.classList.remove('intro-on'); liberarHero(); return; }
    intro.classList.add('intro-saindo');
    setTimeout(liberarHero, rapido ? 150 : 350);
    setTimeout(function () {
      root.classList.remove('intro-on');
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    }, 900);
  }

  if (root.classList.contains('intro-on') && intro) {
    var t = setTimeout(function () { encerrar(false); }, 2300);
    intro.addEventListener('click', function () { clearTimeout(t); encerrar(true); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Enter') { clearTimeout(t); encerrar(true); }
    });
  } else {
    liberarHero();
  }

  /* barra fixa: aparece quando os botões do topo saem da tela e some no rodapé */
  var barra = document.querySelector('[data-barra]');
  var alvoLinks = document.querySelector('.links');
  var alvoRodape = document.querySelector('.rodape');
  if (barra && alvoLinks && 'IntersectionObserver' in window) {
    var linksVisivel = true, rodapeVisivel = false;
    var atualizar = function () {
      var mostrar = !linksVisivel && !rodapeVisivel;
      barra.classList.toggle('on', mostrar);
      barra.setAttribute('aria-hidden', mostrar ? 'false' : 'true');
      barra.querySelectorAll('a').forEach(function (a) { a.tabIndex = mostrar ? 0 : -1; });
    };
    new IntersectionObserver(function (es) { linksVisivel = es[0].isIntersecting; atualizar(); }).observe(alvoLinks);
    if (alvoRodape) new IntersectionObserver(function (es) { rodapeVisivel = es[0].isIntersecting; atualizar(); }, { threshold: .35 }).observe(alvoRodape);
    atualizar();
  }
})();
