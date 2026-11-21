# RaggieSoft Launcher Portal (`https://launcher.raggiesoft.com`)

[![License: MIT](https://img.shields.io/badge/Code_License-MIT-0ea5e9.svg)](./LICENSE)
[![Website](https://img.shields.io/badge/Live_Site-launcher.raggiesoft.com-0284c7.svg)](https://launcher.raggiesoft.com)

Official consumer companion portal for **RaggieSoft Launcher** — the all-in-one desktop application hub for installing, opening, and updating **RaggieSoft Book Reader**, **The Listening Room**, **RaggieSoft Backstage**, and **RaggieSoft StoreTrainer**.

## Architecture & Tech Stack
- **UI Components**: Microsoft **Fluent UI Web Components** (`@fluentui/web-components` + `@microsoft/fast-element` W3C Custom Elements) with synchronized `baseLayerLuminance` Light & Dark theming.
- **Compiler & Bundler**: **TypeScript 5.7 + Vite 6 Static Site Generator (`scripts/prerender.mjs`)** emitting zero-database pre-rendered HTML routes (`/`, `/apps`, `/updates`, `/faq`, `/404.html`), `sitemap.xml`, `robots.txt`, and IndexNow verification into `dist/`.
- **Accessibility**: WCAG 2.1 AA / Section 508 compliant (`>= 4.5:1` contrast, `color-scheme: light dark` with CSS `light-dark()`, `forced-colors` support, keyboard focus management, and full WAI-ARIA landmarks).

## Licensing & Fictitious Persons Notice
- **Source Code**: [MIT License](./LICENSE).
- **Documentation & Creative Content**: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- **Fictitious Persons & Entities Disclaimer**: All narrative characters, bands, biographies, universities (CPI, VDU, The Forgers, The Crucible), corporations (OmniCorp, Apex Records, Prairie Coachworks, Sainte-Claire), transit agencies (BRT, CVTA), and in-universe legal entities across RaggieSoft's creative catalogs are works of fiction.
