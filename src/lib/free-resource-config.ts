// Set only after publishing and testing the real, free product in the creator's store.
// Empty config deliberately keeps the site on a working local download, not a fabricated checkout.
const paidSlugs = new Set(['uiuxplaybookfr', 'uxuiplaybook']);

export function parseFreeGumroadUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  const slug = /^\/l\/([a-zA-Z0-9_-]+)$/.exec(url.pathname)?.[1];
  if (url.protocol !== 'https:' || url.hostname !== 'joyccelight.gumroad.com'
    || url.port || url.username || url.password || url.search || url.hash
    || !slug || paidSlugs.has(slug.toLowerCase())) {
    throw new Error('NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL must be the published free product URL: https://joyccelight.gumroad.com/l/<slug> (not a paid Playbook URL).');
  }
  return url.href;
}

export const FREE_GUMROAD_URL = parseFreeGumroadUrl(process.env.NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL);
export const FREE_RESOURCE_PATH = '/resources/ui-ux-directory';
