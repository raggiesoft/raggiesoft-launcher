/**
 * @license MIT
 * ============================================================================
 * src/entry-client.ts — Fluent UI Web Components Registration & Client Router
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL FLUENT WEB COMPONENTS GUIDE):
 *   What happens when this script loads in a visitor's browser?
 *     1. Registers Microsoft's official Fluent UI Web Components (`<fluent-card>`,
 *        `<fluent-button>`, `<fluent-badge>`, `<fluent-divider>`) powered by
 *        `@microsoft/fast-element`.
 *     2. Synchronizes Fluent's `baseLayerLuminance` design token (`LightMode` vs.
 *        `DarkMode`) with the operating system's `prefers-color-scheme` and our
 *        two-state `<meta name="color-scheme">` theme toggle!
 *     3. Wires instant client-side navigation between `/`, `/apps`, `/updates`,
 *        and `/faq` plus live category & keyword filtering on `/apps`.
 * ============================================================================
 */

import {
  baseLayerLuminance,
  fluentBadge,
  fluentButton,
  fluentCard,
  fluentDivider,
  provideFluentDesignSystem,
  StandardLuminance
} from '@fluentui/web-components';
import { LAUNCHER_ROUTES, type AppCategory } from './data/launcherData';
import { normalizeLauncherPath, renderAppsGridHtml, renderRoute } from './entry-server';

// Step 1: Register Fluent UI Web Components once with the browser's CustomElementRegistry.
provideFluentDesignSystem().register(
  fluentCard(),
  fluentButton(),
  fluentBadge(),
  fluentDivider()
);

// Step 2: Color-Scheme & Fluent Luminance Synchronizer (`modern-web-guidance` two-state toggle).
function getSystemScheme(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getEffectiveScheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('color-scheme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage privacy restrictions
  }
  return getSystemScheme();
}

function syncFluentLuminanceAndThemeLabel(): void {
  const effective = getEffectiveScheme();
  // Set Fluent UI Web Components' root luminance token so `<fluent-card>` & `<fluent-divider>` match!
  baseLayerLuminance.setValueFor(
    document.body,
    effective === 'dark' ? StandardLuminance.DarkMode : StandardLuminance.LightMode
  );

  const labelEl = document.getElementById('fl-theme-label');
  if (labelEl) {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('color-scheme');
    } catch {}
    if (saved === 'light' || saved === 'dark') {
      labelEl.textContent = effective === 'dark' ? '🌙 Dark' : '☀️ Light';
    } else {
      labelEl.textContent = effective === 'dark' ? '🌓 System (Dark)' : '🌓 System (Light)';
    }
  }
}

function toggleTwoStateTheme(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (!meta) return;

  const current = getEffectiveScheme();
  const target: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';
  const sys = getSystemScheme();

  try {
    if (target === sys) {
      localStorage.removeItem('color-scheme');
      meta.content = 'light dark';
    } else {
      localStorage.setItem('color-scheme', target);
      meta.content = target;
    }
  } catch {
    meta.content = target;
  }

  syncFluentLuminanceAndThemeLabel();
}

// Step 3: Interactive Wire-Up for the Current Route (`/apps` filter + theme button + local nav).
let activeCat: AppCategory = 'all';
let activeQuery = '';

function bindInteractiveControls(): void {
  syncFluentLuminanceAndThemeLabel();

  const themeBtn = document.getElementById('fl-theme-toggle');
  themeBtn?.addEventListener('click', toggleTwoStateTheme);

  // Wire `/apps` category pills and search box if present on this route
  const resultsHost = document.getElementById('fl-apps-results');
  const searchInput = document.getElementById('fl-app-search') as HTMLInputElement | null;
  const catButtons = document.querySelectorAll<HTMLButtonElement>('.fl-filter-pill[data-cat]');

  if (resultsHost) {
    const refreshResults = () => {
      resultsHost.innerHTML = renderAppsGridHtml(activeCat, activeQuery);
    };

    catButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = (btn.getAttribute('data-cat') as AppCategory) || 'all';
        catButtons.forEach((b) =>
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false')
        );
        refreshResults();
      });
    });

    searchInput?.addEventListener('input', () => {
      activeQuery = searchInput.value;
      refreshResults();
    });
  }
}

function navigateToRoute(targetPath: string, pushHistory: boolean): void {
  const host = document.getElementById('launcher-app');
  if (!host) return;

  activeCat = 'all';
  activeQuery = '';

  const { html, normalizedPath } = renderRoute(targetPath);
  host.innerHTML = html;

  if (pushHistory) {
    window.history.pushState({}, '', normalizedPath);
  }

  const meta = LAUNCHER_ROUTES.find((r) => r.path === normalizedPath);
  if (meta) {
    document.title = meta.seoTitle;
  }

  bindInteractiveControls();

  // Notify shared RaggieSoft Network Bar to update active highlights if needed
  const win = window as unknown as { initRaggieSoftNetworkMenu?: () => void };
  win.initRaggieSoftNetworkMenu?.();

  const mainEl = document.getElementById('main-content');
  mainEl?.focus();
}

// Delegated click listener for `[data-local-nav="true"]` links
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
    return;
  }
  const target = e.target as HTMLElement | null;
  const link = target?.closest<HTMLAnchorElement>('a[data-local-nav="true"]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || !href.startsWith('/')) return;

  e.preventDefault();
  navigateToRoute(href, true);
});

window.addEventListener('popstate', () => {
  navigateToRoute(normalizeLauncherPath(window.location.pathname), false);
});

if (window.matchMedia) {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', syncFluentLuminanceAndThemeLabel);
}

window.addEventListener('storage', (ev) => {
  if (ev.key === 'color-scheme') {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    if (meta) {
      meta.content = ev.newValue === 'light' || ev.newValue === 'dark' ? ev.newValue : 'light dark';
    }
    syncFluentLuminanceAndThemeLabel();
  }
});

// Initialize on initial pre-rendered DOM!
bindInteractiveControls();
