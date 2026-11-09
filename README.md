# Portfólio — Victor Renan Kolodziejski Dias

Site institucional em HTML5, CSS3 e JavaScript puro (sem frameworks e sem etapa de build), apresentando a trajetória em Supply Chain, as competências em automação, dados e IA, a plataforma **MB Automation** e outros projetos (Planeja MB e automações em Python).

## Estrutura

```
index.html   → conteúdo e SEO
styles.css   → estilos (paleta e tokens em :root)
script.js    → animações, contadores, carrossel, lightbox e formulário
.nojekyll    → faz o GitHub Pages servir os arquivos como estão
```

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (por exemplo `portfolio`) e envie estes arquivos na raiz.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e salve.
4. Em alguns minutos o site fica em `https://SEU-USUARIO.github.io/portfolio/`.

Se preferir o endereço `https://SEU-USUARIO.github.io`, nomeie o repositório exatamente como `SEU-USUARIO.github.io`.

## O que personalizar antes de publicar

- **Resultados** e **métricas do topo**: os números são ilustrativos; ajuste os atributos `data-count` com valores reais.
- **Galeria**: substituir os 8 espaços reservados por screenshots reais da MB Automation (sem dados sensíveis).
- **Formulário de contato**: hoje só valida no navegador. Para receber mensagens, conecte a um serviço de formulários ou ao Supabase.
- **Foto**: trocar a ilustração da seção Sobre Mim por uma foto profissional.

## Cuidado com informações da empresa

O repositório é público. Os textos dos projetos não citam clientes, endereços internos, caminhos de rede nem credenciais. Mantenha esse padrão ao adicionar screenshots ou trechos de código.
