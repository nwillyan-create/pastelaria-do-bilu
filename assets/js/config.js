/* Configurações da Pastelaria do Bilu.
   Tudo o que muda com frequência fica aqui. Itens marcados com PENDENTE precisam de confirmação do cliente. */
window.BILU = {
  nome: 'Pastelaria do Bilu',

  /* PENDENTE: confirmar. Número lido da etiqueta da garrafa nos prints: (62) 99416-7100. Formato: 55 + DDD + número. */
  whatsapp: '5562994167100',

  instagram: 'biluupasteis',

  /* Links para pedidos em apps de delivery */
  ifoodUrl: 'https://www.ifood.com.br',
  noventaENoveUrl: 'https://m.99app.com',

  /* PENDENTE: endereço completo (aparece na seção de horário e endereço). Deixe vazio para ocultar a linha. */
  endereco: '',

  /* PENDENTE: link do Google Maps do ponto (botão "Compartilhar" no Maps). Enquanto vazio, o botão abre uma busca pelo nome. */
  mapsUrl: '',

  /* PENDENTE: foto do ambiente para o fundo do topo. Exemplo: 'assets/img/ambiente-hero.jpg'. Vazio usa o fundo de raios da logo. */
  heroFoto: '',

  /* Horário por dia da semana: 0 = domingo ... 6 = sábado. [abre, fecha] em horas. null = fechado. */
  horario: {
    0: [14, 22],
    1: null,
    2: [14, 22],
    3: [14, 22],
    4: [14, 22],
    5: [14, 22],
    6: [14, 22]
  },

  /* Fotos da pastelaria (espaço do ambiente, pastéis e produção) */
  fotos: [
    { arquivo: 'foto-pasteis-grelha.jpg',  legenda: 'Pastéis fritos na hora',   alt: 'Pastéis dourados sobre a grelha' },
    { arquivo: 'foto-caldo-maquina.jpg',   legenda: 'Caldo de cana na máquina', alt: 'Cana sendo moída na máquina de caldo de cana' },
    { arquivo: 'foto-garrafa-caldo.jpg',   legenda: 'Caldo de cana fresquinho', alt: 'Garrafa de caldo de cana com a etiqueta da pastelaria' },
    { arquivo: 'foto-pasteis-peneira.jpg', legenda: 'Pastéis sequinhos',        alt: 'Dois pastéis ao lado da peneira de fritura' },
    { arquivo: 'foto-molhos-balcao.jpg',   legenda: 'Balcão de atendimento',    alt: 'Balcão da pastelaria com molhos e temperos' }
  ]
};
