/* Cardápio com carrinho. Dados em menu-data.js, configurações em config.js. */
(function () {
  'use strict';
  var CFG = window.BILU || {};
  var MENU = window.BILU_MENU || [];
  var U = window.BILU_UTIL;
  var base = document.documentElement.getAttribute('data-base') || '';
  var KEY = 'bilu-carrinho-v1';
  var reduz = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function brl(c) { return (c / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function ico(id) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }

  var cats = MENU.filter(function (c) { return c.itens && c.itens.length; });
  var porId = {};
  cats.forEach(function (c) { c.itens.forEach(function (i) { porId[i.id] = i; }); });

  /* estado do carrinho (guardado no aparelho; falha em silêncio se o navegador bloquear) */
  var carrinho = {};
  try {
    var salvo = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.keys(salvo).forEach(function (id) {
      var q = parseInt(salvo[id], 10);
      if (porId[id] && q > 0) carrinho[id] = Math.min(q, 99);
    });
  } catch (e) {}
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(carrinho)); } catch (e) {} }

  function qtdTotal() { return Object.keys(carrinho).reduce(function (s, id) { return s + carrinho[id]; }, 0); }
  function valorTotal() { return Object.keys(carrinho).reduce(function (s, id) { return s + porId[id].preco * carrinho[id]; }, 0); }

  /* ---------- ícones para itens sem foto ---------- */
  function icone(tipo, cor) {
    var c = cor || '#FFB800';
    var linha = 'stroke="#07401A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
    var formas = {
      copo: '<path d="M18 16h28l-3.4 38a4 4 0 0 1-4 3.6H25.4a4 4 0 0 1-4-3.6z" fill="' + c + '" ' + linha + '/><path d="M23 24h18" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/><path d="M38 4 33 18" ' + linha + ' fill="none"/>',
      'copo-tampa': '<path d="M16 26h32l-3.6 28a4 4 0 0 1-4 3.5H23.6a4 4 0 0 1-4-3.5z" fill="' + c + '" ' + linha + '/><path d="M14 26a18 14 0 0 1 36 0z" fill="#fff" fill-opacity=".85" ' + linha + '/><path d="M23 38h18" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>',
      lata: '<rect x="20" y="12" width="24" height="42" rx="4" fill="' + c + '" ' + linha + '/><path d="M20 19h24M20 47h24" ' + linha + ' fill="none"/><path d="M26 27h4" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>',
      garrafa: '<path d="M27 6h10v8l5 8v30a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V22l5-8z" fill="' + c + '" ' + linha + '/><path d="M27 6h10" ' + linha + ' fill="none"/><path d="M27 30h10" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>'
    };
    return '<svg viewBox="0 0 64 64" aria-hidden="true">' + (formas[tipo] || formas.copo) + '</svg>';
  }

  /* ---------- lista de itens ---------- */
  function acaoHtml(item) {
    var q = carrinho[item.id] || 0;
    if (!q) return '<button class="add" type="button" data-add="' + item.id + '">Adicionar</button>';
    return '<div class="step" role="group" aria-label="Quantidade de ' + esc(item.nome) + '">' +
      '<button type="button" data-dec="' + item.id + '" aria-label="Tirar um ' + esc(item.nome) + '">' + ico('menos') + '</button>' +
      '<output aria-live="polite">' + q + '</output>' +
      '<button type="button" data-inc="' + item.id + '" aria-label="Adicionar mais um ' + esc(item.nome) + '">' + ico('mais') + '</button></div>';
  }
  function itemHtml(item) {
    var foto = item.foto
      ? '<img src="' + base + 'assets/img/' + item.foto + '" alt="' + esc(item.nome) + '" width="92" height="92" loading="lazy" decoding="async">'
      : icone(item.icone, item.cor);
    return '<li class="item" data-item="' + item.id + '">' +
      '<div class="item-foto">' + foto + '</div>' +
      '<div class="item-corpo"><h3>' + esc(item.nome) + '</h3>' +
      (item.desc ? '<p class="desc">' + esc(item.desc) + '</p>' : '') +
      '<div class="item-rodape"><span class="preco">' + brl(item.preco) + '</span><span class="acao" data-acao>' + acaoHtml(item) + '</span></div></div></li>';
  }

  var raiz = $('[data-cardapio]');
  var navIn = $('.cats-in');
  if (!cats.length) {
    raiz.innerHTML = '<p class="vazio">O cardápio está sendo atualizado. Chame no WhatsApp para ver as opções.</p>';
    return;
  }
  raiz.innerHTML = cats.map(function (c) {
    return '<section class="cat" id="' + c.id + '" aria-labelledby="t-' + c.id + '"><h2 class="faixa" id="t-' + c.id + '">' + esc(c.nome) + '</h2>' +
      '<ul class="itens">' + c.itens.map(itemHtml).join('') + '</ul></section>';
  }).join('');
  navIn.innerHTML = '<span class="pilula" aria-hidden="true"></span>' + cats.map(function (c) {
    return '<a href="#' + c.id + '">' + esc(c.nome) + '</a>';
  }).join('');

  /* ---------- navegação por categoria (pílula que desliza) ---------- */
  var chips = $$('a', navIn);
  var pilula = $('.pilula', navIn);
  var secoes = $$('.cat', raiz);
  var atual = 0;
  function marcar(i, rolar) {
    atual = i;
    chips.forEach(function (c, j) { c.setAttribute('aria-current', j === i ? 'true' : 'false'); });
    var c = chips[i];
    pilula.style.width = c.offsetWidth + 'px';
    pilula.style.transform = 'translateX(' + c.offsetLeft + 'px)';
    if (rolar) {
      var alvo = c.offsetLeft - (navIn.clientWidth - c.offsetWidth) / 2;
      navIn.scrollTo({ left: alvo, behavior: reduz ? 'auto' : 'smooth' });
    }
  }
  var travado = 0;
  chips.forEach(function (c, i) {
    c.addEventListener('click', function () { travado = Date.now(); marcar(i, true); });
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && Date.now() - travado > 900) marcar(secoes.indexOf(e.target), true);
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    secoes.forEach(function (s) { io.observe(s); });
  }
  marcar(0, false);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { marcar(atual, false); });

  /* ---------- carrinho: barra, gaveta, mensagem ---------- */
  var barra = $('.carrinho-barra');
  var abrir = $('.carrinho-abrir');
  var gaveta = $('.gaveta');
  var lista = $('.gaveta-lista');
  var obs = $('#obs');
  var envio = $('#enviar');
  var totalEl = $('[data-total]');
  var vazia = $('.gaveta-vazia');
  var rodape = $('.gaveta-rodape');
  var anuncio = $('#anuncio');

  function mensagem() {
    var linhas = ['Olá! Quero fazer um pedido pela página da Pastelaria do Bilu:', ''];
    Object.keys(carrinho).forEach(function (id) {
      var i = porId[id], q = carrinho[id];
      linhas.push(q + 'x ' + i.nome + ' (' + brl(i.preco * q) + ')');
    });
    linhas.push('', 'Total: ' + brl(valorTotal()));
    var o = obs.value.trim();
    if (o) linhas.push('Observação: ' + o);
    linhas.push('', 'Podem confirmar o valor e a forma de entrega ou retirada?');
    return linhas.join('\n');
  }

  function pintarGaveta() {
    var ids = Object.keys(carrinho);
    lista.innerHTML = ids.map(function (id) {
      var i = porId[id], q = carrinho[id];
      return '<li class="linha" data-item="' + id + '"><h3>' + esc(i.nome) + '</h3>' +
        '<p class="un">' + q + ' × ' + brl(i.preco) + ' = ' + brl(i.preco * q) + '</p>' +
        '<div class="step" role="group" aria-label="Quantidade de ' + esc(i.nome) + '">' +
        '<button type="button" data-dec="' + id + '" aria-label="Tirar um ' + esc(i.nome) + '">' + ico('menos') + '</button>' +
        '<output>' + q + '</output>' +
        '<button type="button" data-inc="' + id + '" aria-label="Adicionar mais um ' + esc(i.nome) + '">' + ico('mais') + '</button></div></li>';
    }).join('');
    var tem = ids.length > 0;
    vazia.hidden = tem;
    lista.hidden = !tem;
    rodape.hidden = !tem;
    totalEl.textContent = brl(valorTotal());
    if (tem) {
      envio.href = U.waUrl(mensagem());
    }
  }

  function pintarBarra(pulo) {
    var n = qtdTotal();
    barra.classList.toggle('on', n > 0);
    barra.setAttribute('aria-hidden', n > 0 ? 'false' : 'true');
    abrir.tabIndex = n > 0 ? 0 : -1;
    $('.qtd', abrir).textContent = n;
    $('.tot', abrir).textContent = brl(valorTotal());
    anuncio.textContent = n ? n + (n === 1 ? ' item' : ' itens') + ' no carrinho, total ' + brl(valorTotal()) : 'Carrinho vazio';
    if (pulo && !reduz) {
      abrir.classList.remove('pulo');
      void abrir.offsetWidth;
      abrir.classList.add('pulo');
    }
  }

  function mudar(id, delta) {
    var q = (carrinho[id] || 0) + delta;
    if (q <= 0) delete carrinho[id]; else carrinho[id] = Math.min(q, 99);
    guardar();
    var li = $('.item[data-item="' + id + '"] [data-acao]', raiz);
    if (li) {
      li.innerHTML = acaoHtml(porId[id]);
      /* mantém o foco no botão que o cliente usou */
      var alvo = delta > 0 ? (carrinho[id] ? '[data-inc]' : '[data-add]') : (carrinho[id] ? '[data-dec]' : '[data-add]');
      if (document.activeElement === document.body || !document.activeElement || !document.activeElement.isConnected) {
        var b = $(alvo, li); if (b && !gaveta.classList.contains('aberta')) b.focus({ preventScroll: true });
      }
    }
    pintarBarra(delta > 0);
    if (gaveta.classList.contains('aberta')) {
      var dentro = document.activeElement && gaveta.contains(document.activeElement);
      var idFoco = dentro && document.activeElement.getAttribute('data-inc') ? 'inc' : (dentro && document.activeElement.getAttribute('data-dec') ? 'dec' : '');
      pintarGaveta();
      if (!Object.keys(carrinho).length) { fecharGaveta(); }
      else if (idFoco) { var nb = $('[data-' + idFoco + '="' + id + '"]', lista) || $('[data-' + idFoco + ']', lista); if (nb) nb.focus({ preventScroll: true }); }
    }
  }

  /* cliques nos itens e na gaveta */
  function clique(e) {
    var b = e.target.closest('[data-add],[data-inc],[data-dec]');
    if (!b) return;
    if (b.hasAttribute('data-add')) mudar(b.getAttribute('data-add'), 1);
    else if (b.hasAttribute('data-inc')) mudar(b.getAttribute('data-inc'), 1);
    else mudar(b.getAttribute('data-dec'), -1);
  }
  raiz.addEventListener('click', clique);
  lista.addEventListener('click', clique);

  /* gaveta inferior: abre, fecha por fora, Esc, botão e arrastar a alça */
  var ultimoFoco = null;
  function abrirGaveta() {
    pintarGaveta();
    ultimoFoco = document.activeElement;
    document.documentElement.classList.add('gaveta-on', 'trava');
    gaveta.classList.add('aberta');
    gaveta.inert = false;
    gaveta.setAttribute('aria-hidden', 'false');
    setTimeout(function () { var f = $('.fechar', gaveta); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function fecharGaveta() {
    document.documentElement.classList.remove('gaveta-on', 'trava');
    gaveta.classList.remove('aberta');
    gaveta.inert = true;
    gaveta.setAttribute('aria-hidden', 'true');
    gaveta.style.transform = '';
    if (ultimoFoco && ultimoFoco.isConnected && ultimoFoco.tabIndex >= 0) ultimoFoco.focus({ preventScroll: true });
  }
  abrir.addEventListener('click', abrirGaveta);
  $('.fechar', gaveta).addEventListener('click', fecharGaveta);
  $('.fundo-gaveta').addEventListener('click', fecharGaveta);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && gaveta.classList.contains('aberta')) fecharGaveta(); });
  obs.addEventListener('input', function () { envio.href = U.waUrl(mensagem()); });
  $('.limpar', gaveta).addEventListener('click', function () {
    Object.keys(carrinho).forEach(function (id) {
      delete carrinho[id];
      var li = $('.item[data-item="' + id + '"] [data-acao]', raiz);
      if (li) li.innerHTML = acaoHtml(porId[id]);
    });
    guardar(); pintarBarra(false); fecharGaveta();
  });

  var alca = $('.alca', gaveta), y0 = 0, arrastando = false, dy = 0;
  alca.addEventListener('pointerdown', function (e) { arrastando = true; y0 = e.clientY; dy = 0; alca.setPointerCapture(e.pointerId); gaveta.style.transition = 'none'; });
  alca.addEventListener('pointermove', function (e) { if (!arrastando) return; dy = Math.max(0, e.clientY - y0); gaveta.style.transform = 'translateY(' + dy + 'px)'; });
  function soltar() { if (!arrastando) return; arrastando = false; gaveta.style.transition = ''; gaveta.style.transform = ''; if (dy > 80) fecharGaveta(); }
  alca.addEventListener('pointerup', soltar);
  alca.addEventListener('pointercancel', soltar);
  alca.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') fecharGaveta(); });

  gaveta.inert = true;
  pintarBarra(false);
})();
