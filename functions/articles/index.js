const FRANCOPHONE_COUNTRIES = new Set([
  'FR', 'BE', 'CH', 'LU', 'MC', 'BJ', 'SN', 'CI', 'CM', 'TG', 'BF',
  'ML', 'NE', 'GA', 'CD', 'CG', 'MG', 'MA', 'TN', 'DZ', 'HT', 'RE',
  'GP', 'MQ', 'GF',
]);

function preferredLocale(request) {
  const cookie = request.headers.get('Cookie') || '';
  const cookieMatch = cookie.match(/(?:^|;\\s*)NEXT_LOCALE=(fr|en)(?:;|$)/i);
  if (cookieMatch) return cookieMatch[1].toLowerCase();

  const accepted = (request.headers.get('Accept-Language') || '')
    .split(',')
    .map((part) => {
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
    })
    .filter((item) => item.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const item of accepted) {
    if (item.tag.startsWith('fr')) return 'fr';
    if (item.tag.startsWith('en')) return 'en';
  }

  const cf = request.cf || {};
  const country = String(cf.country || request.headers.get('CF-IPCountry') || '').toUpperCase();
  return FRANCOPHONE_COUNTRIES.has(country) ? 'fr' : 'en';
}

function redirectToLocale(request, pathname) {
  const url = new URL(request.url);
  const target = new URL('/' + preferredLocale(request) + pathname, url.origin);
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

export function onRequest({ request }) {
  return redirectToLocale(request, '/articles');
}
