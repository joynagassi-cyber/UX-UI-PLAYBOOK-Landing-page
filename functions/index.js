// Cloudflare Pages Function for the root URL only.
// The /fr and /en pages are exported as static HTML; this function only
// preserves the language-aware entry-point redirect previously handled by Next.js Proxy.

const FRANCOPHONE_COUNTRIES = new Set([
  'FR', 'BE', 'CH', 'LU', 'MC', 'BJ', 'SN', 'CI', 'CM', 'TG', 'BF',
  'ML', 'NE', 'GA', 'CD', 'CG', 'MG', 'MA', 'TN', 'DZ', 'HT', 'RE',
  'GP', 'MQ', 'GF',
]);

function cookieLocale(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/(?:^|;\\s*)NEXT_LOCALE=(fr|en)(?:;|$)/i);
  return match ? match[1].toLowerCase() : null;
}

function languageLocale(request) {
  const value = request.headers.get('Accept-Language') || '';
  const languages = value.split(',').map((part) => {
    const [tag, ...params] = part.trim().split(';');
    let quality = 1;
    for (const param of params) {
      const [key, raw] = param.trim().split('=');
      if (key === 'q' && raw) {
        const parsed = Number.parseFloat(raw);
        if (Number.isFinite(parsed)) quality = parsed;
      }
    }
    return { tag: (tag || '').trim().toLowerCase(), quality };
  }).sort((a, b) => b.quality - a.quality);

  for (const item of languages) {
    if (item.tag.startsWith('fr')) return 'fr';
    if (item.tag.startsWith('en')) return 'en';
  }
  return null;
}

function preferredLocale(request) {
  const saved = cookieLocale(request);
  if (saved) return saved;

  const fromLanguage = languageLocale(request);
  if (fromLanguage) return fromLanguage;

  const cf = request.cf || {};
  const country = String(cf.country || request.headers.get('CF-IPCountry') || '').toUpperCase();
  if (FRANCOPHONE_COUNTRIES.has(country)) return 'fr';

  return 'en';
}

export function onRequest({ request }) {
  const url = new URL(request.url);
  const locale = preferredLocale(request);
  const target = new URL('/' + locale, url.origin);
  target.search = url.search;

  return new Response(null, {
    status: 307,
    headers: {
      Location: target.toString(),
      Vary: 'Accept-Language, Cookie, CF-IPCountry',
      'Cache-Control': 'private, no-store',
    },
  });
}
