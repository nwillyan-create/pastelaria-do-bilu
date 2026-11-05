/* Cardápio da Pastelaria do Bilu.
   Preços em centavos (1999 = R$ 19,99). Categorias sem itens não aparecem na página.
   Base: prints do iFood da loja. PENDENTE: confirmar se o preço na página é o mesmo do iFood ou o preço direto. */
window.BILU_MENU = [
  {
    id: 'pasteis-salgados',
    nome: 'Pastéis salgados',
    itens: [
      /* PENDENTE: faltam os prints desta categoria (sabores e preços). Modelo:
      { id: 'carne', nome: 'Carne', desc: 'Descrição curta.', preco: 1799, foto: 'item-pastel-salgado.jpg' }, */
    ]
  },
  {
    id: 'pasteis-doces',
    nome: 'Pastéis de doce',
    itens: [
      { id: 'romeu-e-julieta', nome: 'Romeu e Julieta', desc: 'A cremosidade do queijo premium fundido, de textura aveludada.', preco: 1999, foto: 'item-pastel-doce.jpg' },
      { id: 'doce-de-leite',   nome: 'Doce de leite',   desc: 'Pastel recheado com doce de leite cremoso.',                     preco: 1999, foto: 'item-pastel-doce.jpg' }
    ]
  },
  {
    id: 'acai',
    nome: 'Açaí',
    itens: [
      { id: 'acai-garrafa-500', nome: 'Açaí na garrafa 500 ml', desc: 'Açaí cremoso, leite condensado e leite em pó.', preco: 2299, foto: 'item-acai-garrafa.jpg' },
      { id: 'acai-garrafa-300', nome: 'Açaí na garrafa 300 ml', desc: 'Açaí cremoso, leite condensado e leite em pó.', preco: 1899, foto: 'item-acai-garrafa.jpg' },
      { id: 'acai-amendoim-180', nome: 'Açaí tradicional com amendoim 180 ml', desc: 'Açaí cremoso com amendoim.', preco: 1299, icone: 'copo-tampa', cor: '#5B2A6E' }
    ]
  },
  {
    id: 'caldo-de-cana',
    nome: 'Caldo de cana',
    itens: [
      /* PENDENTE: faltam os prints desta categoria (tamanhos e preços). Modelo:
      { id: 'caldo-500', nome: 'Caldo de cana 500 ml', desc: 'Moído na máquina da casa.', preco: 1000, foto: 'item-caldo.jpg' }, */
    ]
  },
  {
    id: 'sucos',
    nome: 'Sucos',
    itens: [
      { id: 'suco-abacaxi',  nome: 'Abacaxi',  desc: 'Refrescante, para qualquer hora do dia.',             preco: 1399, icone: 'copo', cor: '#FFC933' },
      { id: 'suco-acai',     nome: 'Açaí',     desc: 'Bebida densa, vibrante e nutritiva.',                 preco: 1399, icone: 'copo', cor: '#6A2C73' },
      { id: 'suco-acerola',  nome: 'Acerola',  desc: 'Uma explosão de vitamina C.',                         preco: 1399, icone: 'copo', cor: '#C42B45' },
      { id: 'suco-maracuja', nome: 'Maracujá', desc: 'O maracujá de verdade num suco encorpado e aveludado.', preco: 1399, icone: 'copo', cor: '#F59A1B' },
      { id: 'suco-cupuacu',  nome: 'Cupuaçu',  desc: 'O ouro branco da Amazônia em um copo.',               preco: 1399, icone: 'copo', cor: '#EAD9AE' }
    ]
  },
  {
    id: 'bebidas',
    nome: 'Bebidas',
    itens: [
      { id: 'coca-350',     nome: 'Coca-Cola 350 ml',               preco: 899, icone: 'lata', cor: '#D8262F' },
      { id: 'coca-zero-350', nome: 'Coca-Cola Zero 350 ml',         preco: 899, icone: 'lata', cor: '#2B2B2B' },
      { id: 'fanta-350',    nome: 'Fanta Laranja 350 ml',           preco: 850, icone: 'lata', cor: '#F28A12' },
      { id: 'guarana-350',  nome: 'Guaraná Mineiro lata 350 ml',    preco: 850, icone: 'lata', cor: '#E8B80C' },
      { id: 'agua-gas-500', nome: 'Água Crystal com gás 500 ml',    preco: 499, icone: 'garrafa', cor: '#9CD3EA' }
    ]
  }
];
