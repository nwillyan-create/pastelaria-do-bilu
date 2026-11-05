# Pastelaria do Bilu — biosite (plano Autoridade)

## Como abrir
Abra `index.html` por um servidor (ou publique a pasta inteira). Páginas: início, `cardapio/`, `fotos/`.

## O que ainda falta do cliente (nada disso foi inventado)
Tudo se ajusta em `assets/js/config.js` e `assets/js/menu-data.js`.

| Pendência | Onde mexer | Enquanto não chega |
|---|---|---|
| Foto do ambiente para o fundo do topo | `heroFoto` em config.js (ex.: `assets/img/ambiente-hero.jpg`) | Fundo de raios com as cores da logo |
| Endereço completo | `endereco` | Linha de endereço fica oculta |
| Link do Google Maps do ponto | `mapsUrl` | Botão abre busca pelo nome |
| WhatsApp confirmado (usei o número lido na etiqueta da garrafa: 62 99416-7100) | `whatsapp` | Número lido da etiqueta |
| Pastéis salgados: sabores, descrição, preço | categoria `pasteis-salgados` em menu-data.js | Categoria não aparece |
| Caldo de cana: tamanhos e preços | categoria `caldo-de-cana` | Categoria não aparece |
| Itens do iFood abaixo do corte dos prints | menu-data.js | Só o que aparece nos prints |
| Preço do site = preço do iFood ou preço direto? | menu-data.js | Usei os preços do iFood |
| Fotos do ambiente (fachada, balcão, mesas) em boa resolução | `fotos` em config.js | 4 fotos recortadas do Instagram (baixa resolução) |
| Depoimentos reais (até 5) e vídeo | não incluídos | Autoridade comporta; precisa de material |
| Forma de entrega, pagamento, taxa | FAQ em index.html | FAQ só com o que é confirmado |

## Como o pedido funciona
O cliente adiciona itens, abre "Ver meu pedido" e envia a lista pronta no WhatsApp da loja (mensagem pré-preenchida com itens, total e observação). Não há pagamento nem backend: o carrinho fica no aparelho do cliente.

## Observação de escopo
O carrinho é um extra além do pacote Autoridade padrão (R$397), feito a pedido. Alterações futuras no cardápio (preços, itens) são manutenção.
