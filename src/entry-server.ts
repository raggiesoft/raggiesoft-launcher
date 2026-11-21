/**
 * @license MIT
 * ============================================================================
 * src/entry-server.ts — Isomorphic Route HTML Renderer for RaggieSoft Launcher
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL STATIC SSG RENDERER GUIDE):
 *   What does this module do?
 *     Both `scripts/prerender.mjs` (at build time on Node.js) and `entry-client.ts`
 *     (when clicking between `/`, `/apps`, `/updates`, and `/faq` in the browser)
 *     call `renderRoute(pathname)` here!
 *
 *   How Fluent UI Web Components (`<fluent-card>`, `<fluent-badge>`, `<fluent-divider>`)
 *   work with Static Pre-Rendering:
 *     - Build Time: `renderRoute()` emits clean semantic HTML5 (`<header>`, `<main>`,
 *       `<section>`, `<details>`) wrapped inside `<fluent-card class="fl-card">`
 *       and `<fluent-divider>` custom element tags so search engines, screen readers,
 *       and no-JS browsers get 100% of the content immediately!
 *     - Browser Time: `entry-client.ts` registers `@fluentui/web-components` with
 *       the browser's `CustomElementRegistry`, upgrading those `<fluent-*>` elements
 *       with Fluent Design System tokens and keyboard behaviors seamlessly!
 * ============================================================================
 */

import {
  LAUNCHER_FAQS,
  LAUNCHER_IMAGES,
  LAUNCHER_ROUTES,
  MANAGED_DESKTOP_APPS,
  OVERVIEW_PILLARS,
  UPDATE_HIGHLIGHTS,
  type AppCategory
} from './data/launcherData';

export { LAUNCHER_ROUTES };

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function normalizeLauncherPath(rawPath: string): string {
  if (!rawPath || rawPath === '/' || rawPath === '/index.html') return '/';
  const cleaned = rawPath.replace(/\.html$/i, '').replace(/\/+$/, '');
  return LAUNCHER_ROUTES.some((r) => r.path === cleaned) ? cleaned : '/404';
}

function renderAppsGridHtml(categoryFilter: AppCategory = 'all', query = ''): string {
  const q = query.trim().toLowerCase();
  const filtered = MANAGED_DESKTOP_APPS.filter((app) => {
    const catOk = categoryFilter === 'all' || app.category === categoryFilter;
    if (!catOk) return false;
    if (!q) return true;
    return (
      app.title.toLowerCase().includes(q) ||
      app.imprint.toLowerCase().includes(q) ||
      app.summary.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    return `
      <fluent-card class="fl-card">
        <div>
          <h3>No desktop apps matched that search</h3>
          <p>Clear the search filter to view all ${MANAGED_DESKTOP_APPS.length} applications managed by RaggieSoft Launcher.</p>
        </div>
      </fluent-card>`;
  }

  return `
    <div class="fl-grid-2">
      ${filtered
        .map(
          (app) => `
        <fluent-card class="fl-card" data-app-category="${esc(app.category)}">
          <div>
            <span class="fl-status-pill">${esc(app.categoryBadge)}</span>
            <h3><span aria-hidden="true">${esc(app.icon)} </span>${esc(app.title)}</h3>
            <p><strong>${esc(app.imprint)}.</strong> ${esc(app.summary)}</p>
            <ul class="fl-feature-list">
              ${app.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}
            </ul>
          </div>
          <div class="fl-btn-row">
            <a href="${esc(app.webUrl)}" class="fl-btn-primary">${esc(app.webLabel)} →</a>
            ${
              app.secondaryUrl && app.secondaryLabel
                ? `<a href="${esc(app.secondaryUrl)}" class="fl-btn-secondary">${esc(app.secondaryLabel)}</a>`
                : ''
            }
          </div>
        </fluent-card>`
        )
        .join('\n')}
    </div>`;
}

function renderOverviewPage(): string {
  return `
    <section class="fl-hero" aria-labelledby="hero-heading">
      <div>
        <span class="fl-eyebrow"><span aria-hidden="true">🚀</span> All-In-One RaggieSoft Desktop Home</span>
        <h1 id="hero-heading">One Calm Desktop Hub for Every RaggieSoft Book, Album &amp; Game.</h1>
        <p class="fl-lead">
          <strong>RaggieSoft Launcher</strong> brings <em>Book Reader</em>, <em>The Listening Room</em>,
          <em>RaggieSoft Backstage</em>, and <em>StoreTrainer</em> together in one clean, friendly window—so you can
          install, open, update, and manage offline downloads without creating an account or cluttering your computer.
        </p>
        <div class="fl-btn-row">
          <a href="/apps" data-local-nav="true" class="fl-btn-primary">Explore Included Desktop Apps →</a>
          <a href="/updates" data-local-nav="true" class="fl-btn-secondary">How One-Click Updates Work</a>
          <a href="https://jessica.raggiesoft.com" class="fl-btn-secondary">🛡️ Read Jessica’s Story Behind Our Apps</a>
        </div>
      </div>

      <div class="fl-window-preview" role="img" aria-label="Preview of RaggieSoft Launcher showing Book Reader, The Listening Room, Backstage, and StoreTrainer">
        <div class="fl-window-titlebar">
          <span>🚀 RaggieSoft Launcher — Installed &amp; Available Apps</span>
          <span class="fl-window-dots" aria-hidden="true">_ □ ×</span>
        </div>
        <div class="fl-window-body">
          ${MANAGED_DESKTOP_APPS.slice(0, 4)
            .map(
              (app) => `
            <div class="fl-mini-app-row">
              <div>
                <div class="fl-mini-app-title"><span aria-hidden="true">${esc(app.icon)} </span>${esc(app.title)}</div>
                <div class="fl-mini-app-sub">${esc(app.imprint)}</div>
              </div>
              <span class="fl-status-pill">Ready to Open</span>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="fl-section" aria-labelledby="pillars-heading">
      <div class="fl-section-head">
        <h2 id="pillars-heading">Designed for Readers, Listeners &amp; Everyday Comfort</h2>
        <p>Everything you need to enjoy RaggieSoft offline—and nothing getting in your way.</p>
      </div>
      <div class="fl-grid-3">
        ${OVERVIEW_PILLARS.map(
          (p) => `
          <fluent-card class="fl-card">
            <div>
              <h3><span aria-hidden="true">${esc(p.icon)} </span>${esc(p.title)}</h3>
              <p>${esc(p.body)}</p>
            </div>
          </fluent-card>`
        ).join('\n')}
      </div>
    </section>

    <fluent-divider role="separator"></fluent-divider>

    <section class="fl-section" style="margin-top: 2rem;" aria-labelledby="featured-apps-heading">
      <div class="fl-section-head">
        <h2 id="featured-apps-heading">Applications Managed by RaggieSoft Launcher</h2>
        <p>Install only the ones you want—or enjoy their instant web editions right in your browser anytime.</p>
      </div>
      ${renderAppsGridHtml()}
    </section>`;
}

function renderAppsPage(): string {
  return `
    <section class="fl-section" aria-labelledby="apps-page-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">📦</span> 5 Desktop Applications • Web Companions Included</span>
        <h1 id="apps-page-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Every RaggieSoft Desktop Application in One Place</h1>
        <p>Filter by Books, Music, or PC Games below to explore what each RaggieSoft desktop app does.</p>
      </div>

      <div class="fl-filter-panel" role="region" aria-label="Filter RaggieSoft desktop applications">
        <div class="fl-pill-row" role="group" aria-label="Filter by category">
          <button type="button" class="fl-filter-pill" data-cat="all" aria-pressed="true">All Apps (${MANAGED_DESKTOP_APPS.length})</button>
          <button type="button" class="fl-filter-pill" data-cat="reading" aria-pressed="false">📖 Books &amp; Bonus Features</button>
          <button type="button" class="fl-filter-pill" data-cat="music" aria-pressed="false">🎧 Music &amp; Lyrics</button>
          <button type="button" class="fl-filter-pill" data-cat="games" aria-pressed="false">🕹️ PC Games &amp; Retro</button>
        </div>
        <div>
          <label for="fl-app-search" class="fl-skip-link">Search RaggieSoft desktop apps</label>
          <input id="fl-app-search" type="search" class="fl-search-input" placeholder="Search apps (e.g. lyrics, offline, trainers)..." aria-label="Search RaggieSoft desktop apps" />
        </div>
      </div>

      <div id="fl-apps-results">
        ${renderAppsGridHtml()}
      </div>
    </section>`;
}

function renderUpdatesPage(): string {
  return `
    <section class="fl-section" aria-labelledby="updates-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">🔄</span> Built-In Software Update Wizard</span>
        <h1 id="updates-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Effortless Updates That Respect Your Computer &amp; Files</h1>
        <p>Whether you install one RaggieSoft app or the whole family, keeping up with new features is always on your schedule.</p>
      </div>

      <div class="fl-grid-3" style="margin-bottom: 2rem;">
        ${UPDATE_HIGHLIGHTS.map(
          (u) => `
          <fluent-card class="fl-card">
            <div>
              <h3><span aria-hidden="true">${esc(u.icon)} </span>${esc(u.title)}</h3>
              <p>${esc(u.body)}</p>
            </div>
          </fluent-card>`
        ).join('\n')}
      </div>

      <fluent-card class="fl-card">
        <div>
          <h2>Express Setup vs. Custom Setup — Your Choice Every Time</h2>
          <p>
            Inspired by classic desktop setup wizards that respected power users while staying effortless for newcomers,
            every RaggieSoft installer offers two clear paths right after the open-culture license screen:
          </p>
          <ul class="fl-feature-list">
            <li><strong>Express Setup (Recommended):</strong> Skips straight to installing with standard Start Menu shortcuts and default settings in a single click.</li>
            <li><strong>Custom Setup:</strong> Lets you pick a custom installation folder, choose Desktop &amp; Start Menu shortcuts, pre-load offline books, or customize double-click behavior in StoreTrainer.</li>
            <li><strong>Thoughtful Uninstaller:</strong> Uninstalling RaggieSoft Launcher even shows a live checklist of your other installed RaggieSoft apps—with every data-removal box unchecked by default so you never lose books, music, or game profiles by mistake!</li>
          </ul>
        </div>
        <div class="fl-btn-row">
          <a href="/faq" data-local-nav="true" class="fl-btn-primary">Read Common Questions &amp; Tips →</a>
          <a href="https://waystation.raggiesoft.com/realms" class="fl-btn-secondary">🔮 Browse Full RaggieSoft Directory</a>
        </div>
      </fluent-card>
    </section>`;
}

function renderFaqPage(): string {
  return `
    <section class="fl-section" aria-labelledby="faq-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">💡</span> Helpful Everyday Answers</span>
        <h1 id="faq-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Questions &amp; Offline Tips</h1>
        <p>Quick plain-English answers about using RaggieSoft Launcher and its companion apps.</p>
      </div>

      <div>
        ${LAUNCHER_FAQS.map(
          (item, idx) => `
          <details class="fl-faq-item"${idx === 0 ? ' open' : ''}>
            <summary>${esc(item.question)}</summary>
            <p>${esc(item.answer)}</p>
          </details>`
        ).join('\n')}
      </div>
    </section>`;
}

function render404Page(): string {
  return `
    <section class="fl-section" aria-labelledby="not-found-heading">
      <fluent-card class="fl-card">
        <div>
          <span class="fl-eyebrow">404 • Address Not Found</span>
          <h1 id="not-found-heading" style="margin: 0.35rem 0 0.6rem;">That Page Isn’t in RaggieSoft Launcher</h1>
          <p>
            We couldn’t find a page at this web address. Head back to the RaggieSoft Launcher overview below,
            or visit Nolan &amp; Gwen at <strong>The Uncharted Waystation</strong> to search every corner of RaggieSoft!
          </p>
        </div>
        <div class="fl-btn-row">
          <a href="/" data-local-nav="true" class="fl-btn-primary">← Back to RaggieSoft Launcher Home</a>
          <a href="https://waystation.raggiesoft.com" class="fl-btn-secondary">🔮 Open Global RaggieSoft Directory</a>
        </div>
      </fluent-card>
    </section>`;
}

export function renderRoute(rawPath: string): { html: string; normalizedPath: string } {
  const path = normalizeLauncherPath(rawPath);

  const navItemsHtml = LAUNCHER_ROUTES.filter((r) => r.inMainNav)
    .map((r) => {
      const active = path === r.path;
      return `<li><a href="${esc(r.path)}" data-local-nav="true" class="fl-nav-link"${
        active ? ' aria-current="page"' : ''
      }>${esc(r.navLabel)}</a></li>`;
    })
    .join('\n              ');

  const viewHtml =
    path === '/'
      ? renderOverviewPage()
      : path === '/apps'
        ? renderAppsPage()
        : path === '/updates'
          ? renderUpdatesPage()
          : path === '/faq'
            ? renderFaqPage()
            : render404Page();

  const shellHtml = `
    <header class="fl-header">
      <div class="fl-container fl-header-inner">
        <a href="/" data-local-nav="true" class="fl-brand">
          <img src="${esc(LAUNCHER_IMAGES.logoSvg)}" alt="" width="40" height="40" class="fl-brand-icon" />
          <span>
            <span class="fl-brand-title">RaggieSoft Launcher</span>
            <span class="fl-brand-sub">Desktop App Hub for Books, Music &amp; Games</span>
          </span>
        </a>

        <button
          type="button"
          class="rs-mobile-header-toggle"
          data-rs-mobile-toggle
          data-open-label="Open menu"
          data-close-label="Close menu"
          aria-expanded="false"
          aria-controls="header-navigation-panel"
          aria-label="Open menu"
        >
          <svg class="rs-icon-bars" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg class="rs-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div id="header-navigation-panel" class="fl-nav-cluster" data-rs-collapsible="true">
          <nav aria-label="RaggieSoft Launcher Navigation">
            <ul class="fl-nav-list">
              ${navItemsHtml}
            </ul>
          </nav>
          <button type="button" id="fl-theme-toggle" class="fl-theme-btn" aria-label="Switch between light and dark color scheme">
            <span id="fl-theme-label">🌓 Theme</span>
          </button>
        </div>
      </div>
    </header>

    <main id="main-content" class="fl-main" tabindex="-1">
      <div class="fl-container">
        ${viewHtml}
      </div>
    </main>

    <footer class="fl-footer">
      <div class="fl-container">
        <div class="fl-btn-row" style="justify-content: space-between;">
          <div>
            <strong>RaggieSoft Launcher</strong> • Companion web portals:
            <a href="https://raggiesoft.com">RaggieSoft Home</a> •
            <a href="https://waystation.raggiesoft.com/realms">Global Directory (Waystation)</a> •
            <a href="https://jessica.raggiesoft.com">Project Stories (Jessica)</a> •
            <a href="https://michaelpragsdale.com">Creator Portfolio</a>
          </div>
          <div>
            Code: <a href="https://opensource.org/licenses/MIT">MIT</a> •
            Creative Works: <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
          </div>
        </div>

        <div class="fl-disclaimer" role="note" aria-label="Fictitious Persons and Entities Disclaimer">
          <strong>Work of Fiction Disclaimer:</strong> While <strong>RaggieSoft Launcher</strong> and its companion desktop applications are real software tools created by <strong>Michael P. Ragsdale</strong>, all narrative characters, bands, biographies, universities (including CPI, VDU, The Forgers, and The Crucible), corporations (including OmniCorp, Apex Records, Prairie Coachworks, and Sainte-Claire), transit agencies (BRT, CVTA), in-universe legal filings, and any entity with “LLC”, “Trust”, or “Holdings” in its name across RaggieSoft’s creative works are works of fiction. Any resemblance to actual persons, living or dead, or real-world entities is purely coincidental.
        </div>
      </div>
    </footer>`;

  return { html: shellHtml, normalizedPath: path };
}

export { renderAppsGridHtml };
