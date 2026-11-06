/* Carrossel de Fotos do Ambiente: Aspecto Quadrado 1:1, Navegação por Arraste e Controles */
(function () {
  'use strict';
  var CFG = window.BILU || {};
  var fotos = CFG.fotos || [];
  var base = document.documentElement.getAttribute('data-base') || '';

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function initCarrossel(wrapper) {
    if (!wrapper) return;
    var track = wrapper.querySelector('[data-carrossel-track]');
    var dotsContainer = wrapper.querySelector('[data-carrossel-dots]');
    var contador = wrapper.querySelector('[data-carrossel-contador]');
    var btnAnt = wrapper.querySelector('[data-carrossel-ant]');
    var btnProx = wrapper.querySelector('[data-carrossel-prox]');

    if (!track || !fotos.length) return;

    // Renderizar slides quadrados
    track.innerHTML = fotos.map(function (f, i) {
      return '<div class="carrossel-slide" data-index="' + i + '">' +
        '<div class="carrossel-card">' +
          '<img src="' + base + 'assets/img/' + f.arquivo + '" alt="' + esc(f.alt || f.legenda) + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '" decoding="async">' +
          '<div class="carrossel-legenda">' + esc(f.legenda) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    // Renderizar dots
    if (dotsContainer) {
      dotsContainer.innerHTML = fotos.map(function (_, i) {
        return '<button class="carrossel-dot' + (i === 0 ? ' ativo' : '') + '" type="button" data-dot="' + i + '" aria-label="Ir para foto ' + (i + 1) + '"></button>';
      }).join('');
    }

    function atualizarEstado(index) {
      if (contador) {
        contador.textContent = (index + 1) + ' / ' + fotos.length;
      }
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.carrossel-dot');
        dots.forEach(function (d, i) {
          d.classList.toggle('ativo', i === index);
        });
      }
    }

    function slidePara(index) {
      index = Math.max(0, Math.min(index, fotos.length - 1));
      var slide = track.children[index];
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
        atualizarEstado(index);
      }
    }

    function obterIndexAtual() {
      var scrollLeft = track.scrollLeft;
      var slideWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : track.offsetWidth;
      return Math.round(scrollLeft / (slideWidth + 14));
    }

    // Listener de scroll para sincronizar contador e dots
    var ticking = false;
    track.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          atualizarEstado(obterIndexAtual());
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Setas
    if (btnAnt) {
      btnAnt.addEventListener('click', function () {
        var i = obterIndexAtual();
        slidePara(i - 1);
      });
    }
    if (btnProx) {
      btnProx.addEventListener('click', function () {
        var i = obterIndexAtual();
        slidePara(i + 1);
      });
    }

    // Clique nos dots
    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        var b = e.target.closest('[data-dot]');
        if (b) {
          slidePara(parseInt(b.getAttribute('data-dot'), 10));
        }
      });
    }

    // Suporte a arraste com mouse (Desktop Drag)
    var isDown = false;
    var startX = 0;
    var scrollLeftStart = 0;

    track.addEventListener('mousedown', function (e) {
      isDown = true;
      track.classList.add('arrastando');
      startX = e.pageX - track.offsetLeft;
      scrollLeftStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', function () {
      if (isDown) {
        isDown = false;
        track.classList.remove('arrastando');
        // snap automático no slide mais próximo
        slidePara(obterIndexAtual());
      }
    });

    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.4;
      track.scrollLeft = scrollLeftStart - walk;
    });

    atualizarEstado(0);
  }

  // Inicializar em qualquer contêiner na página
  document.querySelectorAll('[data-carrossel-viewport]').forEach(function (vp) {
    initCarrossel(vp.closest('.carrossel-dialog') || vp.closest('.carrossel-secao') || vp.parentElement);
  });

  // Modal no index.html
  var modal = document.getElementById('carrossel-modal');
  var btsAbrir = document.querySelectorAll('[data-open-carrossel]');
  var ultimoElemento = null;

  function abrirModal() {
    if (!modal) return;
    ultimoElemento = document.activeElement;
    modal.hidden = false;
    // Forçar reflow para transição suave
    void modal.offsetWidth;
    modal.classList.add('aberto');
    document.documentElement.classList.add('trava');
    var fecharBtn = modal.querySelector('.carrossel-fechar');
    if (fecharBtn) fecharBtn.focus({ preventScroll: true });

    // Reajustar tamanho do track ao abrir
    var track = modal.querySelector('[data-carrossel-track]');
    if (track) track.scrollTo({ left: 0, behavior: 'auto' });
  }

  function fecharModal() {
    if (!modal) return;
    modal.classList.remove('aberto');
    document.documentElement.classList.remove('trava');
    setTimeout(function () {
      modal.hidden = true;
      if (ultimoElemento && ultimoElemento.isConnected) {
        ultimoElemento.focus({ preventScroll: true });
      }
    }, 250);
  }

  btsAbrir.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      abrirModal();
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-close-carrossel]').forEach(function (el) {
      el.addEventListener('click', fecharModal);
    });

    document.addEventListener('keydown', function (e) {
      if (modal.classList.contains('aberto')) {
        if (e.key === 'Escape') fecharModal();
        else if (e.key === 'ArrowLeft') {
          var btnAnt = modal.querySelector('[data-carrossel-ant]');
          if (btnAnt) btnAnt.click();
        } else if (e.key === 'ArrowRight') {
          var btnProx = modal.querySelector('[data-carrossel-prox]');
          if (btnProx) btnProx.click();
        }
      }
    });
  }
})();

