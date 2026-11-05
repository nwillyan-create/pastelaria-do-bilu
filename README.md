# Entrega — Pastelaria do Bilu

Produto publicável do cliente. Esta pasta funciona de forma 100% autocontida e pode ser publicada isoladamente (Vercel, Cloudflare Pages ou servidor estático).

## Tecnologia

HTML5 semântico, CSS3 com variáveis nativas (:root) e JavaScript vanilla. Sem dependências externas de CDN ou build step. Fontes locais `.woff2` embutidas em `assets/fonts/`.

## Estrutura da Entrega

```text
entrega/
├── index.html                  # Página inicial (BioSite institucional + atalhos + status + FAQ)
├── cardapio/
│   └── index.html              # Cardápio digital interativo com sacola local e checkout WhatsApp
├── fotos/
│   └── index.html              # Galeria de fotos do ambiente e produtos
├── LEIA-ME-PENDENCIAS.md       # Notas técnicas originais e pendências de cardápio
├── README.md                   # Este arquivo de documentação
└── assets/
    ├── css/
    │   └── style.css           # Estilos principais compartilhados
    ├── fonts/                  # Fontes locais Lilita One e Nunito Sans (.woff2)
    ├── img/                    # Fotos e logos do cliente (.webp, .jpg, .png)
    └── js/
        ├── cart.js             # Lógica do carrinho/sacola e formatação para WhatsApp
        ├── common.js           # Funções utilitárias compartilhadas
        ├── config.js           # Configurações de horários, WhatsApp, Instagram e fotos
        ├── fotos.js            # Lógica da galeria de fotos
        ├── home.js             # Lógica da home e verificação de horário aberto/fechado
        └── menu-data.js        # Dados de categorias e itens do cardápio
```

## Como Visualizar

Abrir `index.html` em um navegador web ou executar qualquer servidor estático local:
```bash
# Exemplo com npx serve ou Live Server
npx serve .
```

## Como Funciona o Pedido

1. O cliente navega pelas categorias no `cardapio/`.
2. Adiciona itens e ajusta quantidades.
3. Clica em **"Ver meu pedido"**.
4. É direcionado para o WhatsApp da loja com a mensagem pré-formatada contendo os itens, quantidades e total.
5. Não há necessidade de backend ou processamento de cartão: tudo opera no cliente.

## Configurações Principais

As configurações operacionais ficam centralizadas em:
- `assets/js/config.js`: telefone de WhatsApp, Instagram, horários por dia da semana e lista de fotos.
- `assets/js/menu-data.js`: categorias, nomes dos itens, preços (em centavos), descrições e ícones/fotos.

