/**
 * @license MIT
 * ============================================================================
 * vite.config.ts — Vite 6 Bundler Configuration for RaggieSoft Launcher Portal
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL BUILD CONFIGURATION GUIDE):
 *   What does this file do?
 *     It configures Vite (`npm run build`) to bundle our client-side TypeScript
 *     and Microsoft Fluent UI Web Components (`@fluentui/web-components`) into
 *     compact, content-hashed `.js` and `.css` files inside `dist/assets/`.
 *     Right after `vite build` finishes, `scripts/prerender.mjs` injects our
 *     pre-rendered HTML routes (`/`, `/apps`, `/updates`, `/faq`, and `/404.html`)
 *     into that template so every page loads instantly with zero database!
 * ============================================================================
 */

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Emit production static assets into `./dist` (synced by `sarah-deploy.sh` to `/var/www/launcher.raggiesoft.com`).
    outDir: 'dist',
    // Wipe stale hashed bundles before each clean build.
    emptyOutDir: true,
    // Target modern evergreen browsers supporting W3C Custom Elements & CSS `light-dark()`.
    target: 'es2022'
  }
});
