# Pedro Vitor — Volt Monochrome

Projeto estático (HTML, CSS e JavaScript separados) para o cartão digital do CTO da Lumos Connect.

## Abrir e testar no Pop!_OS / Ubuntu

1. Extraia o ZIP e abra a pasta do projeto no VS Code (`code .`).
2. No terminal dentro da pasta, execute `python3 -m http.server 8000`.
3. Acesse `http://localhost:8000`.

## Personalização

- **Contatos**: edite `PROFILE` no começo do `script.js`.
- **Cores e visual**: edite as variáveis CSS no início de `style.css`.
- **Estrutura**: edite `index.html`.
- **Fotografia**: `assets/pedro-perfil.png` foi recortada da imagem de QR do WhatsApp enviada. É de **resolução baixa** e está usada como avatar pequeno em um quadro retangular. Troque por um retrato original em melhor qualidade quando disponível. É possível mudar o retrato central para ocupar mais espaço em `style.css`.

Os contatos já configurados são WhatsApp, Instagram e LinkedIn. E-mail, portfólio, GitHub e site institucional estão vazios e não são exibidos, pois os links não foram fornecidos.

As áreas de foco são categorias genéricas propostas para apresentação visual; não representam competências específicas verificadas de Pedro.

## Hospedagem

O site não requer `npm` nem build. Para publicar em Vercel ou Netlify, selecione a pasta com `index.html` como raiz do site. Os arquivos do pacote são relativos à raiz. A publicação gera uma URL que você pode transformar em QR Code.

> Confira com Pedro se os dados e a foto podem aparecer em uma página pública antes de publicar.
