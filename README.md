# Portfólio — Victor Renan Kolodziejski Dias

Site em HTML5, CSS3 e JavaScript puro (sem frameworks e sem build), em tema claro, apresentando os produtos **MB Automation Platform** e **Planeja MB**, as automações em Python, os resultados e a trajetória em Supply Chain.

## Estrutura

```
index.html        → conteúdo e SEO
styles.css        → estilos (paleta em :root)
script.js         → abas, animações, galeria, formulário
data.js           → TODOS os números do site (edite aqui)
assets/
  victor.jpg      → sua foto (proporção 4:5); sem ela, aparece o monograma VK
  gallery/        → screenshots 01.png … 08.png da galeria
.nojekyll         → GitHub Pages serve os arquivos como estão
```

## Atualizar os números

Abra `data.js` e altere os valores. Hero, painel executivo, resultados e gráfico em cascata acompanham automaticamente, inclusive a proporção das barras.

## Fotos e screenshots

- Foto: salve em `assets/victor.jpg`.
- Galeria: salve `01.png` a `08.png` em `assets/gallery/`. Ordem sugerida: dashboard executivo, Discovery, Priorização, Projetos e Kanban, Business Case, Governança e riscos, Planejamento Compartilhado (Planeja MB), Programação (Planeja MB).
- Antes de publicar, confira se os prints não mostram nomes de clientes, dados reais de pedidos, abas pessoais do navegador ou credenciais.

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz do repositório.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O endereço aparece em poucos minutos: `https://kollodz.github.io/NOME-DO-REPOSITORIO/` (ou `https://kollodz.github.io` se o repositório se chamar `Kollodz.github.io`).

## Formulário de contato

Ao enviar, o formulário abre o aplicativo de e-mail do visitante com a mensagem já preenchida para o seu endereço. Não depende de servidor.

## Cuidado com informações da empresa

O repositório é público. Os textos não citam clientes, endereços internos, caminhos de rede nem credenciais. Os indicadores financeiros em `data.js` são da empresa: confirme que a divulgação está autorizada.
