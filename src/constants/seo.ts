export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
}

const SITE_URL = 'https://ownlyst.netlify.app';

export const SEO = {
  landing: {
    title:
      'Ownlyst - Privacy-First Notes App | Local Storage, No Cloud, No Tracking',
    description:
      'Truly private sticky notes app. Your notes stay on YOUR device - no cloud uploads, no tracking, no surveillance. Features Kanban Boards, Table View, Roadmap Timeline, and offline support.',
    keywords:
      'private notes app, local storage notes, offline notes, no tracking, privacy-first, secure sticky notes, local-only notes, browser storage, no cloud sync',
    canonicalUrl: SITE_URL,
    robots: 'index, follow',
    ogTitle: 'Ownlyst - Privacy-First Notes That Stay on Your Device',
    ogDescription:
      'Write freely with truly private notes. No cloud uploads. No tracking. No surveillance. Just honest, local-first note-taking.',
  } satisfies SeoConfig,

  app: {
    title: 'Ownlyst - Your Private Notes',
    description:
      'Your private workspace for notes, boards, tables, and roadmaps. Your data stays on your device.',
    keywords:
      'private notes, local notes, offline notes, secure notes, Ownlyst',
    canonicalUrl: `${SITE_URL}/app`,
    robots: 'noindex, nofollow',
    ogTitle: 'Ownlyst - Your Private Notes',
    ogDescription:
      'A private workspace for notes, boards, tables, and roadmaps. Your data stays on your device.',
  } satisfies SeoConfig,
} as const;

export const SEO_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const SEO_TWITTER_HANDLE = '@narainkarthik';
