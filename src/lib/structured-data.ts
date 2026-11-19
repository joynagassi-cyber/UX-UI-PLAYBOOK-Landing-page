import type { Locale } from '@/i18n/content';

export const SITE_URL = 'https://joyccelight-playbook.vercel.app';

// Only identities linked to the supplied store and this repository owner.
// Do not invent social profiles or professional qualifications.
export const AUTHOR_SAME_AS = [
  'https://joyccelight.gumroad.com',
  'https://github.com/joynagassi-cyber',
];

export function authorJsonLd(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#joy-n`,
    name: 'Joy N.',
    url: `${SITE_URL}/${locale}#author`,
    sameAs: AUTHOR_SAME_AS,
    description: locale === 'fr'
      ? 'Auteur du UX/UI Playbook, entrepreneur et créateur de solutions numériques et de workflows agentiques.'
      : 'Author of UX/UI Playbook, entrepreneur and builder of digital products and agentic workflows.',
    knowsAbout: ['UX Design', 'UI Design', 'Product Design', 'Design tokens', 'AI-assisted development'],
  };
}

// Prevent future editorial text containing HTML from closing the JSON-LD script.
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
