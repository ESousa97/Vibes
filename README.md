<div align="center">

# Vibes

[![CI](https://img.shields.io/github/actions/workflow/status/ESousa97/Vibes/ci.yml?style=flat&logo=github-actions&logoColor=white&label=CI)](https://github.com/ESousa97/Vibes/actions/workflows/ci.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/ESousa97/Vibes/codeql.yml?style=flat&logo=github-actions&logoColor=white&label=CodeQL)](https://github.com/ESousa97/Vibes/actions/workflows/codeql.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/ESousa97/Vibes/badge?style=flat)](https://www.codefactor.io/repository/github/ESousa97/Vibes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Archived-lightgrey.svg?style=flat&logo=archive&logoColor=white)](#)

**Aplicação web imersiva para relaxamento e contemplação — slideshow de paisagens com animações CSS procedurais, controle multimodal e otimização via IntersectionObserver, tudo em Vanilla JS sem dependências.**

[Demo](https://vibes-lemon.vercel.app)

</div>

---

> **⚠️ Projeto Arquivado**
> Este projeto não recebe mais atualizações ou correções. O código permanece disponível como referência e pode ser utilizado livremente sob a licença MIT. Fique à vontade para fazer fork caso deseje continuar o desenvolvimento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Uso Local](#uso-local)
- [Atalhos de Teclado](#atalhos-de-teclado)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Deploy](#deploy)
- [FAQ](#faq)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

Este projeto é uma aplicação web de página única (SPA) puramente client-side, concebida como um santuário digital para relaxamento e contemplação. Desenvolvida com Vanilla JavaScript (ES6+), oferece uma galeria interativa de paisagens naturais com animações CSS3 procedurais, efeitos de glassmorphism e gerenciamento inteligente de recursos.

O repositório prioriza:

- **Zero dependências externas** — JavaScript puro com OOP para gerenciamento de estado, sem frameworks
- **CSS como motor de animação** — Keyframes, transitions e transforms acelerados por GPU, liberando a main thread
- **Otimização proativa** — `IntersectionObserver` pausa o slideshow quando fora do viewport, conservando CPU e bateria
- **Design imersivo** — Glassmorphism, orbes flutuantes e partículas procedurais para atmosfera contemplativa
- **Controle multimodal** — Botões na interface, atalhos de teclado e gestos de toque

### Por que Vanilla JS?

Decisão deliberada para manter a aplicação extremamente leve e performática. O escopo definido do projeto não justifica overhead de frameworks, e a abordagem demonstra a capacidade das tecnologias web nativas para criar experiências ricas com gerenciamento de estado via OOP (classe `VibesSlideshow`).

---

## Funcionalidades

- **Slideshow automatizado** — Transições suaves entre paisagens de alta qualidade com barra de progresso visual
- **Controle multimodal** — Navegação por botões, teclado (setas, espaço, Home, End) e toque
- **Atmosfera visual procedural** — Orbes coloridas flutuantes e partículas brilhantes geradas via CSS keyframes
- **Gerenciamento inteligente de recursos** — Pausa automática ao mudar de aba ou minimizar janela
- **Design glassmorphism** — Efeitos com `backdrop-filter` e transparências para interface contemporânea
- **Responsivo** — Design adaptativo para desktop, tablet e mobile

---

## Tecnologias

### Core

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Ferramentas de Desenvolvimento

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-263238?style=flat&logo=stylelint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

**Requisitos mínimos:**

- Navegador moderno (Chrome 80+, Firefox 78+, Safari 14+, Edge 80+)
- Node.js 18+ (apenas para lint/test)

---

## Arquitetura do Sistema

A aplicação segue um padrão adaptado de MVC para SPA em Vanilla JS, inteiramente client-side:

```
Usuário
  → DOM Event Listeners (Gestor de Eventos)
    → VibesSlideshow Class (Controller / Lógica de Controle)
      → Estado Interno (Model: currentSlide, isPlaying, slideInterval)
      → HTML DOM (View / Camada de Apresentação)
      → CSS Keyframes & Transitions (Motor de Animação, acelerado por GPU)
        → IntersectionObserver (Otimização de visibilidade)
```

### Componentes Principais

| Componente            | Responsabilidade                                                        |
| --------------------- | ----------------------------------------------------------------------- |
| **View**              | `index.html` — estrutura semântica do DOM, receptáculo para conteúdo    |
| **Animation Engine**  | CSS3 — keyframes, transitions, transforms para fundo e transições       |
| **Controller**        | `VibesSlideshow` — ciclo de vida do slideshow, eventos, reprodução      |
| **Model**             | Propriedades internas — `currentSlide`, `isPlaying`, `slideInterval`    |
| **Event Manager**     | Event listeners — tradução de ações do usuário em chamadas de método    |

---

## Estrutura do Projeto

```
Vibes/
├── index.html             # Ponto de entrada da aplicação
├── Assets/                # Imagens do slideshow
├── Styles/
│   └── styles.css         # Estilização, glassmorphism e animações procedurais
├── scripts/               # Lógica JavaScript da aplicação
├── tests/                 # Testes automatizados (Vitest + JSDOM)
├── tools/                 # Scripts de verificação
├── docs/                  # Documentação adicional
├── src/                   # Reservado para modularização futura
├── public/                # Ativos públicos
├── .github/
│   └── workflows/
│       ├── ci.yml         # Pipeline de CI
│       └── codeql.yml     # Análise de segurança
├── vercel.json            # Configuração de deploy Vercel
├── package.json           # Dependências e scripts
└── LICENSE                # Licença MIT
```

---

## Começando

### Pré-requisitos

A aplicação é puramente client-side e roda diretamente no navegador. Para lint e testes:

```bash
node --version  # v18 ou superior (opcional, para lint/test)
npm --version   # v9 ou superior (opcional, para lint/test)
```

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ESousa97/Vibes.git
cd Vibes
```

2. **Instale as dependências de desenvolvimento** (opcional)

```bash
npm install
```

### Uso Local

**Abrir diretamente no navegador:**

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**Com servidor local (recomendado para desenvolvimento):**

```bash
# VS Code Live Server ou:
npx serve .
```

Acesse: `http://localhost:3000/`

**Produção:** [vibes-lemon.vercel.app](https://vibes-lemon.vercel.app)

---

## Atalhos de Teclado

| Tecla              | Ação                           |
| ------------------ | ------------------------------ |
| `Barra de Espaço`  | Alterna Play / Pause           |
| `Seta Esquerda ←`  | Slide anterior                 |
| `Seta Direita →`   | Próximo slide                  |
| `Home`             | Primeiro slide                 |
| `End`              | Último slide                   |

---

## Scripts Disponíveis

```bash
# Executar lint
npm run lint

# Rodar testes
npm run test

# Build estático
npm run build
```

---

## Deploy

### Vercel (Produção)

A aplicação é um site estático com deploy contínuo automatizado via GitHub. Zero configuração necessária.

```bash
vercel --prod
```

O `vercel.json` configura rewrites para comportamento de SPA:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

O projeto também é compatível com Netlify, GitHub Pages ou qualquer plataforma de hospedagem estática.

---

## FAQ

<details>
<summary><strong>Por que JavaScript puro em vez de React ou Vue?</strong></summary>

Escolha deliberada para manter a aplicação extremamente leve e sem dependências. O escopo do projeto não justifica overhead de frameworks, e a abordagem demonstra a capacidade das tecnologias web nativas.
</details>

<details>
<summary><strong>Como adicionar novas imagens ao slideshow?</strong></summary>

Adicione imagens ao diretório `Assets/` e edite o `index.html`, inserindo novas seções `<div class="slide"><img src="Assets/sua-imagem.jpg" alt="Descrição"></div>`.
</details>

<details>
<summary><strong>A aplicação funciona offline?</strong></summary>

Sim. Após o primeiro carregamento, todas as imagens e scripts já estão disponíveis localmente, permitindo uso sem conexão.
</details>

<details>
<summary><strong>O projeto é responsivo?</strong></summary>

Sim, totalmente responsivo com design adaptativo para desktop, tablet e mobile, utilizando media queries e unidades relativas.
</details>

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License - você pode usar, copiar, modificar e distribuir este código.
```

---

## Contato

**José Enoque Costa de Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/ESousa97)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=todoist&logoColor=white)](https://enoquesousa.vercel.app)

---

<div align="center">

**[⬆ Voltar ao topo](#vibes)**

Feito com ❤️ por [José Enoque](https://github.com/ESousa97)

**Status do Projeto:** Archived — Sem novas atualizações

</div>
