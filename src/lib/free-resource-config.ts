// Set each URL only after publishing and testing that language's real, free product.
// Empty config keeps a working local download; an EN visit never falls back to an FR checkout.
const paidSlugs = new Set(['uiuxplaybookfr', 'uxuiplaybook']);

export function parseFreeGumroadUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  const slug = /^\/l\/([a-zA-Z0-9_-]+)$/.exec(url.pathname)?.[1];
  if (url.protocol !== 'https:' || url.hostname !== 'joyccelight.gumroad.com'
    || url.port || url.username || url.password || url.search || url.hash
    || !slug || paidSlugs.has(slug.toLowerCase())) {
    throw new Error('Free resource Gumroad URLs must be published free product URLs: https://joyccelight.gumroad.com/l/<slug> (not a paid Playbook URL).');
  }
  return url.href;
}

export function resolveFreeGumroadUrls(values: { fr?: string; en?: string; legacyFr?: string }) {
  const fr = parseFreeGumroadUrl(values.fr?.trim() ? values.fr : values.legacyFr);
  const en = parseFreeGumroadUrl(values.en);
  if (fr && en && fr.toLowerCase() === en.toLowerCase()) {
    throw new Error('The French and English free kits require separate Gumroad product URLs. Leave an unpublished edition empty to use its direct download.');
  }
  return { fr, en };
}

export const FREE_GUMROAD_URLS = resolveFreeGumroadUrls({
  fr: process.env.NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_FR,
  en: process.env.NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN,
  legacyFr: process.env.NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL,
});
export const FREE_RESOURCE_PATH = '/resources/ui-ux-directory';
