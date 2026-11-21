#!/usr/bin/env node
/**
 * @license MIT
 * ============================================================================
 * scripts/prerender.mjs — Static Site Generator, OpenGraph & Sitemap Compiler
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL NODE.JS SSG BUILD SCRIPT):
 *   What does this script do at the end of `npm run build`?
 *     1. Compiles `src/entry-server.ts` into a temporary SSR bundle via Vite
 *        (`vite build --ssr src/entry-server.ts --outDir .ssr-temp`).
 *     2. Pre-renders all 4 canonical routes (`/`, `/apps`, `/updates`, `/faq`)
 *        PLUS `/404.html` into static HTML files inside `dist/`.
 *     3. Enforces `<= 60` character `<title>` and `<= 155` character `<meta description>`,
 *        emits OpenGraph + Twitter Card tags and Schema.org `SoftwareApplication`
 *        JSON-LD, writes `dist/sitemap.xml`, `dist/robots.txt`, and the IndexNow
 *        verification key, and cleans up `.ssr-temp/`!
 * ============================================================================
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrDir = path.join(projectRoot, '.ssr-temp');

const SITE_ORIGIN = 'https://launcher.raggiesoft.com';
const OG_IMAGE = 'https://assets.raggiesoft.com/raggiesoft-launcher/images/og-launcher.jpg';
const FAVICON_SVG = 'https://assets.raggiesoft.com/raggiesoft-launcher/images/launcher-logo.svg';
const INDEXNOW_KEY = '726167676965736f6674696e6465786e';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSeoHead({ seoTitle, seoDescription, canonicalUrl, noindex = false }) {
  if (seoTitle.length > 60) {
    throw new Error(`SEO Title exceeds 60 chars (${seoTitle.length}): "${seoTitle}"`);
  }
  if (seoDescription.length > 155) {
    throw new Error(`SEO Description exceeds 155 chars (${seoDescription.length}): "${seoDescription}"`);
  }

  const robots = noindex ? 'noindex,follow' : 'index,follow';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_ORIGIN}/#software`,
        name: 'RaggieSoft Launcher',
        url: `${SITE_ORIGIN}/`,
        applicationCategory: 'UtilitiesApplication, MultimediaApplication',
        operatingSystem: 'Windows',
        softwareVersion: '1.0.0',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Person',
          '@id': 'https://michaelpragsdale.com/#michael-ragsdale',
          name: 'Michael P. Ragsdale',
          url: 'https://michaelpragsdale.com'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'RaggieSoft Launcher Portal'
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seoTitle,
        description: seoDescription,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${SITE_ORIGIN}/#software` }
      }
    ]
  };

  return [
    `<title>${escapeHtml(seoTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="robots" content="${robots}" />`,
    ...(noindex ? [] : [`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`]),
    `<link rel="icon" type="image/svg+xml" href="${escapeHtml(FAVICON_SVG)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="RaggieSoft Launcher" />`,
    `<meta property="og:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta property="og:image:alt" content="RaggieSoft Launcher — One calm home for Book Reader, The Listening Room, Backstage, and StoreTrainer" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seoTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seoDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ].join('\n    ');
}

async function main() {
  // Compile server entry via local Vite binary
  const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  execFileSync(
    process.execPath,
    [viteBin, 'build', '--ssr', 'src/entry-server.ts', '--outDir', '.ssr-temp'],
    { cwd: projectRoot, stdio: 'inherit' }
  );

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const serverMod = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
  const { renderRoute, LAUNCHER_ROUTES } = serverMod;

  const sitemapUrls = [];

  for (const route of LAUNCHER_ROUTES) {
    const is404 = route.path === '/404';
    const canonicalUrl = route.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`;
    const { html: appHtml } = renderRoute(route.path);
    const headHtml = buildSeoHead({
      seoTitle: route.seoTitle,
      seoDescription: route.seoDescription,
      canonicalUrl,
      noindex: Boolean(route.noindex)
    });

    const pageHtml = templateHtml
      .replace('<!--SSR_HEAD-->', headHtml)
      .replace('<!--SSR_OUTLET-->', appHtml);

    if (route.path === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml, 'utf-8');
      sitemapUrls.push(`${SITE_ORIGIN}/`);
    } else if (is404) {
      fs.writeFileSync(path.join(distDir, '404.html'), pageHtml, 'utf-8');
    } else {
      const slug = route.path.replace(/^\/+/, '');
      const subDir = path.join(distDir, slug);
      fs.mkdirSync(subDir, { recursive: true });
      fs.writeFileSync(path.join(distDir, `${slug}.html`), pageHtml, 'utf-8');
      fs.writeFileSync(path.join(subDir, 'index.html'), pageHtml, 'utf-8');
      sitemapUrls.push(canonicalUrl);
    }
  }

  const todayIso = new Date().toISOString().slice(0, 10);
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls.map(
      (u) => `  <url>\n    <loc>${escapeHtml(u)}</loc>\n    <lastmod>${todayIso}</lastmod>\n  </url>`
    ),
    '</urlset>',
    ''
  ].join('\n');

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `# RaggieSoft Launcher (${SITE_ORIGIN})\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    'utf-8'
  );
  fs.writeFileSync(path.join(distDir, `${INDEXNOW_KEY}.txt`), `${INDEXNOW_KEY}\n`, 'utf-8');

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log(
    `✅ [launcher.raggiesoft.com] Pre-rendered ${sitemapUrls.length} canonical routes + 404.html + sitemap.xml into dist/`
  );
}

main().catch((err) => {
  console.error('✗ [launcher] Static prerender failed:', err);
  process.exit(1);
});
