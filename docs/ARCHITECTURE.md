# Arquitetura

## Visão geral
O projeto é uma SPA estática (HTML + CSS + JavaScript) focada em performance e simplicidade.

## Componentes principais
- **UI (HTML)**: Estrutura semântica da página e dos controles.
- **Estilos (CSS)**: Animações, glassmorphism e responsividade em `Styles/styles.css`.
- **Lógica (JS)**: Classe `VibesSlideshow` em `scripts/script.js` controla navegação, autoplay e interações.

## Fluxo de execução
1. DOM é carregado.
2. `VibesSlideshow` inicializa o slideshow e listeners.
3. UI reage a cliques, teclado e gestos.

## Considerações
- Sem build step obrigatório.
- Distribuição estática (Vercel/CDN).
