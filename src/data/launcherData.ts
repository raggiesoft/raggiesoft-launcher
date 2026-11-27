/**
 * @license MIT
 * ============================================================================
 * src/data/launcherData.ts — Consumer-Friendly Content for RaggieSoft Launcher
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL TYPESCRIPT DATA GUIDE):
 *   What is this file?
 *     This TypeScript module stores all routes, application cards, update
 *     walkthrough steps, and everyday questions for `https://launcher.raggiesoft.com`.
 *
 *   Consumer-Friendly Language Rule:
 *     Every headline, description, and bullet point here is written in warm,
 *     everyday language for book readers, music listeners, and PC gamers—with
 *     zero intimidating developer or compiler jargon!
 * ============================================================================
 */

export const SITE_ORIGIN = 'https://launcher.raggiesoft.com';
export const CDN_BASE = 'https://assets.raggiesoft.com/raggiesoft-launcher/images';
export const INDEXNOW_KEY = '726167676965736f6674696e6465786e';

export const LAUNCHER_IMAGES = {
  iconPng: `${CDN_BASE}/launcher-icon.png`,
  logoSvg: `${CDN_BASE}/launcher-logo.svg`,
  ogBanner: `${CDN_BASE}/og-launcher.jpg`
} as const;

export interface LauncherRouteMeta {
  readonly path: string;
  readonly navLabel: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly inMainNav: boolean;
  readonly noindex?: boolean;
}

// Strict SEO guardrails: every seoTitle <= 60 chars, every seoDescription <= 155 chars.
export const LAUNCHER_ROUTES: readonly LauncherRouteMeta[] = [
  {
    path: '/',
    navLabel: 'Overview',
    seoTitle: 'RaggieSoft Launcher | Desktop App Hub for Books & Music',
    seoDescription:
      'Discover, install, open, and update RaggieSoft Book Reader, The Listening Room, Backstage, and StoreTrainer from one calm, account-free desktop home.',
    inMainNav: true
  },
  {
    path: '/apps',
    navLabel: 'Included Apps',
    seoTitle: 'Desktop Apps in RaggieSoft Launcher | Books, Music & Games',
    seoDescription:
      'Explore all applications managed by RaggieSoft Launcher: Book Reader, The Listening Room, RaggieSoft Backstage, and StoreTrainer.',
    inMainNav: true
  },
  {
    path: '/updates',
    navLabel: 'Easy Updates & Safety',
    seoTitle: 'One-Click Updates & Safe Uninstalls | RaggieSoft Launcher',
    seoDescription:
      'See how RaggieSoft Launcher and the built-in Software Update Wizard keep your apps current while protecting your saved books, music, and games.',
    inMainNav: true
  },
  {
    path: '/faq',
    navLabel: 'Questions & Tips',
    seoTitle: 'Questions & Offline Reading Tips | RaggieSoft Launcher',
    seoDescription:
      'Plain-English answers about offline reading and listening, account-free setup, Light and Dark themes, and managing offline library space.',
    inMainNav: true
  },
  {
    path: '/404',
    navLabel: '404',
    seoTitle: 'Page Not Found | RaggieSoft Launcher',
    seoDescription:
      'We could not find a page at this address—return to RaggieSoft Launcher or explore the full RaggieSoft directory at The Uncharted Waystation.',
    inMainNav: false,
    noindex: true
  }
] as const;

export type AppCategory = 'all' | 'reading' | 'music' | 'games';

export interface ManagedDesktopApp {
  readonly id: string;
  readonly title: string;
  readonly imprint: string;
  readonly category: Exclude<AppCategory, 'all'>;
  readonly categoryBadge: string;
  readonly icon: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly webUrl: string;
  readonly webLabel: string;
  readonly secondaryUrl?: string;
  readonly secondaryLabel?: string;
}

export const MANAGED_DESKTOP_APPS: readonly ManagedDesktopApp[] = [
  {
    id: 'book-reader',
    title: 'RaggieSoft Book Reader',
    imprint: 'Ocean View Archives & Story Crossroads',
    category: 'reading',
    categoryBadge: 'Books & Interactive Novels',
    icon: '📖',
    summary:
      'Read every Ocean View Archives novel and interactive Story Crossroads adventure offline on your computer with adjustable font sizes, warm reading themes, full-color illustrations, and one-click chapter soundtracks.',
    highlights: [
      'Download complete novels with artwork for airplane, commuter, or cabin offline reading.',
      'Customize text size, line spacing, and Daylight, Sepia, or Night reading palettes.',
      'Jump straight into chapter songs in The Listening Room or bonus notes in Backstage without losing your page.'
    ],
    webUrl: 'https://books.raggiesoft.com',
    webLabel: 'Open Web Edition (books.raggiesoft.com)',
    secondaryUrl: 'https://crossroads.raggiesoft.com',
    secondaryLabel: 'Explore Story Crossroads'
  },
  {
    id: 'listening-room',
    title: 'The Listening Room',
    imprint: 'Engine Room Records',
    category: 'music',
    categoryBadge: 'Music & Sing-Along Lyrics',
    icon: '🎧',
    summary:
      'Stream or save full Engine Room Records albums on your desktop with gapless playback, synchronized line-by-line lyrics, album liner notes, and keyboard media controls.',
    highlights: [
      'Save favorite albums from The Stardust Engine, Crimson Node, Firelight, and more for offline listening.',
      'Watch lyrics highlight in time with the vocals—or jump to any verse by clicking a line.',
      'Plays seamlessly alongside RaggieSoft Book Reader when exploring soundtrack-paired chapters.'
    ],
    webUrl: 'https://music.raggiesoft.com',
    webLabel: 'Open Web Edition (music.raggiesoft.com)',
    secondaryUrl: 'https://engineroom.raggiesoft.com',
    secondaryLabel: 'Meet All 7 Bands'
  },
  {
    id: 'backstage',
    title: 'RaggieSoft Backstage',
    imprint: 'RaggieSoft Media Bonus Features',
    category: 'reading',
    categoryBadge: 'Behind the Scenes & Story Arcs',
    icon: '🎬',
    summary:
      'Like the bonus-features disc inside a favorite box set: explore behind-the-scenes essays, character correspondence, curated multi-book Story Arcs, and standalone alternate-path stories.',
    highlights: [
      'Browse spoiler-marked commentary and production stories organized by book and musical era.',
      'Follow guided Story Arcs across interconnected novels in chronological order.',
      'Opens instantly when clicking a Bonus Feature card inside RaggieSoft Book Reader.'
    ],
    webUrl: 'https://backstage.raggiesoft.com',
    webLabel: 'Open Web Edition (backstage.raggiesoft.com)'
  },
  {
    id: 'storetrainer',
    title: 'RaggieSoft StoreTrainer 2.0',
    imprint: 'PC Game & Trainer Organizer',
    category: 'games',
    categoryBadge: 'PC Games & Trainers',
    icon: '🕹️',
    summary:
      'Keep your classic and modern PC games paired with their companion trainers, downloaded trainer ZIP archives, pre-launch save-game backups, and floating shortcut key cheat cards.',
    highlights: [
      'Launch with your chosen trainer—or click "Launch Game Only (No Trainer)" anytime for standard play.',
      'Extract trainer ZIP files straight into your game folder, view classic ASCII info files, and pop out an Always-On-Top Cheat Card.',
      'Includes a 3-step StoreFile Upgrade Wizard that imports classic StoreTrainer 1.0 & 1.1 profiles while leaving your originals untouched.'
    ],
    webUrl: 'https://storetrainer.raggiesoft.com',
    webLabel: 'Visit StoreTrainer Portal',
    secondaryUrl: 'https://github.com/raggiesoft/storetrainer',
    secondaryLabel: 'View Open-Source Archive'
  },
  {
    id: 'storetrainer-classic',
    title: 'StoreTrainer Classic (v1.1 Retro Edition)',
    imprint: 'Vintage Windows 95 – 2000 Preservation',
    category: 'games',
    categoryBadge: 'Retro PC Preservation',
    icon: '💾',
    summary:
      'Built for collectors running real vintage Windows 95, Windows 98, or Windows 2000 gaming PCs—and automatically recognized by RaggieSoft Launcher when installed on modern PCs too.',
    highlights: [
      'Preserves the lightweight classic design Michael originally hand-built inside Windows 2000.',
      'Saves classic My StoreFiles profiles that remain 100% compatible between v1.0 and v1.1.',
      'Automatically disables internet update checks when installed on offline vintage PCs.'
    ],
    webUrl: 'https://storetrainer.raggiesoft.com/installer',
    webLabel: 'Explore Retro Edition'
  }
] as const;

export interface LauncherFeaturePillar {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

export const OVERVIEW_PILLARS: readonly LauncherFeaturePillar[] = [
  {
    icon: '🔓',
    title: 'Zero Sign-Ins, Zero Background Bloat',
    body: 'RaggieSoft Launcher only runs when you open it—never sitting in your system tray, never asking for an email account, and never interrupting your day with pop-ups.'
  },
  {
    icon: '⚡',
    title: 'Express Setup or Custom Control',
    body: 'Every RaggieSoft setup wizard lets you pick one-click Express Setup for sensible defaults, or Custom Setup to choose your exact folder, shortcuts, and file preferences.'
  },
  {
    icon: '🛡️',
    title: 'Your Offline Library Always Stays Safe',
    body: 'Updating or removing an app never deletes your downloaded books, music albums, reading preferences, or saved game profiles unless you explicitly check the box to clear them.'
  }
] as const;

export const UPDATE_HIGHLIGHTS: readonly LauncherFeaturePillar[] = [
  {
    icon: '🔄',
    title: 'Shared Software Update Wizard',
    body: 'Click "Check for Updates" inside RaggieSoft Launcher—or inside the About window of any RaggieSoft app—to check all of your installed RaggieSoft apps in one step.'
  },
  {
    icon: '🪄',
    title: 'Step-by-Step or One-Click Quiet Mode',
    body: 'Prefer seeing every setup screen? Leave Quick Install unchecked. Prefer updating in a single click? Turn on Quick Install inside Launcher for smooth, hands-free updates.'
  },
  {
    icon: '👤',
    title: 'Works With or Without Administrator Access',
    body: 'Install for everyone on a family PC, or choose "Install for me only" to set up RaggieSoft apps inside your personal account folder with zero administrator password prompts.'
  }
] as const;

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export const LAUNCHER_FAQS: readonly FaqEntry[] = [
  {
    question: 'Do I need to create an account or stay connected to the internet?',
    answer:
      'Never! None of our desktop apps or websites use accounts, subscriptions, or sign-in walls. Once you download a book in Book Reader or an album in The Listening Room, you can read and listen completely offline.'
  },
  {
    question: 'Can I still read books and listen to music in my web browser without installing anything?',
    answer:
      'Yes! Every RaggieSoft desktop app has a full-featured web twin—including books.raggiesoft.com, music.raggiesoft.com, and backstage.raggiesoft.com—that works immediately on phones, tablets, Macs, Linux PCs, and Windows computers.'
  },
  {
    question: 'What happens to my downloaded books, music, and StoreTrainer profiles when an app updates?',
    answer:
      'They stay 100% untouched. Even if you uninstall an app, your offline downloads and personal font/theme preferences are kept safe by default so you never lose your spot.'
  },
  {
    question: 'How do I check how much disk space my offline books and albums are using?',
    answer:
      'Look at the bottom bar of RaggieSoft Launcher: it shows the exact size of your downloaded offline library alongside one-click buttons to open the folder or clear cached downloads whenever you want.'
  },
  {
    question: 'Where can I see the full map of every RaggieSoft website and story world?',
    answer:
      'Visit The Uncharted Waystation (waystation.raggiesoft.com) for our complete searchable directory of every RaggieSoft site, or visit Jessica’s Study (jessica.raggiesoft.com) to read the personal story behind why each project was created!'
  }
] as const;
