/* Comportamentos comuns a todas as páginas: links de contato, status aberto/fechado, lista de horários. */
(function () {
  'use strict';
  var CFG = window.BILU || {};
  var DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var base = document.documentElement.getAttribute('data-base') || '';

  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function fh(n) { return Math.floor(n) + 'h'; }

  function waUrl(msg) {
    return 'https://wa.me/' + CFG.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }
  function mapsUrl() {
    if (CFG.mapsUrl) return CFG.mapsUrl;
    var q = CFG.endereco ? CFG.nome + ' ' + CFG.endereco : CFG.nome;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }
  window.BILU_UTIL = { waUrl: waUrl, mapsUrl: mapsUrl };

  /* foto de fundo do topo (opcional) */
  if (CFG.heroFoto) {
    document.documentElement.style.setProperty('--hero-foto', 'url("' + base + CFG.heroFoto + '")');
  }

  /* links de contato e delivery */
  $$('[data-wa-link]').forEach(function (a) {
    a.href = waUrl(a.getAttribute('data-wa-msg') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-ifood-link]').forEach(function (a) {
    if (CFG.ifoodUrl) a.href = CFG.ifoodUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-99-link]').forEach(function (a) {
    if (CFG.noventaENoveUrl) a.href = CFG.noventaENoveUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-maps]').forEach(function (a) {
    a.href = mapsUrl();
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-ig]').forEach(function (a) {
    a.href = 'https://www.instagram.com/' + CFG.instagram + '/';
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-ig-nome]').forEach(function (el) { el.textContent = '@' + CFG.instagram; });
  $$('[data-endereco]').forEach(function (el) {
    if (CFG.endereco) { el.textContent = CFG.endereco; el.hidden = false; } else { el.hidden = true; }
  });

  /* status: aberto agora / fechado */
  function status(now) {
    var d = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var hoje = CFG.horario[d];
    if (hoje && h >= hoje[0] && h < hoje[1]) return { aberto: true, txt: 'Aberto agora, até ' + fh(hoje[1]) };
    if (hoje && h < hoje[0]) return { aberto: false, txt: 'Fechado, abre hoje às ' + fh(hoje[0]) };
    for (var k = 1; k <= 7; k++) {
      var x = (d + k) % 7;
      var s = CFG.horario[x];
      if (s) return { aberto: false, txt: 'Fechado, abre ' + (k === 1 ? 'amanhã' : DIAS[x].toLowerCase()) + ' às ' + fh(s[0]) };
    }
    return { aberto: false, txt: 'Fechado' };
  }
  function pintarStatus() {
    var r = status(new Date());
    $$('[data-status]').forEach(function (el) {
      el.classList.toggle('aberto', r.aberto);
      var t = el.querySelector('span');
      if (t) t.textContent = r.txt;
    });
  }
  pintarStatus();
  setInterval(pintarStatus, 60000);

  /* lista de horários (segunda a domingo), com o dia de hoje destacado */
  var lista = document.querySelector('[data-horas]');
  if (lista) {
    var hoje = new Date().getDay();
    lista.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var s = CFG.horario[d];
      return '<li class="' + (d === hoje ? 'hoje ' : '') + (s ? '' : 'fechado') + '"' + (d === hoje ? ' aria-current="date"' : '') + '>' +
        '<span>' + DIAS[d] + '</span><span>' + (s ? fh(s[0]) + ' às ' + fh(s[1]) : 'Fechado') + '</span></li>';
    }).join('');
  }
})();
