// Shared by the three Pages Functions. No Next.js runtime, storage or remote service.
const FRANCOPHONE_COUNTRIES = new Set([
  'FR', 'BE', 'CH', 'LU', 'MC', 'BJ', 'SN', 'CI', 'CM', 'TG', 'BF',
  'ML', 'NE', 'GA', 'CD', 'CG', 'MG', 'MA', 'TN', 'DZ', 'HT', 'RE',
  'GP', 'MQ', 'GF',
]);
const SUPPORTED = new Set(['fr', 'en']);

export function preferredLocale(request) {
  for (const part of (request.headers.get('Cookie') || '').split(';')) {
    const separator = part.indexOf('=');
    if (part.slice(0, separator).trim() !== 'NEXT_LOCALE') continue;
    try {
      const value = decodeURIComponent(part.slice(separator + 1).trim()).toLowerCase();
      if (SUPPORTED.has(value)) return value;
    } catch { /* Malformed or unsupported cookies do not suppress other hints. */ }
  }

  const accepted = (request.headers.get('Accept-Language') || '').split(',').map((part, index) => {
    const [rawTag, ...params] = part.trim().split(';');
    const tag = rawTag.trim().toLowerCase();
    const parameter = params.find((param) => /^q\s*=/i.test(param.trim()));
    const rawQuality = parameter?.split('=')[1]?.trim();
    // RFC qvalues: 0..1 with up to three decimals. Reject malformed values, not the whole header.
    const quality = rawQuality === undefined ? 1
      : /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(rawQuality) ? Number(rawQuality) : 0;
    const locale = /^(fr|en)(?:-[a-z0-9]{1,8})*$/.exec(tag)?.[1];
    return { locale, quality, index, explicitlyExcluded: rawQuality !== undefined && /^0(?:\.0{0,3})?$/.test(rawQuality) };
  });
  const ranked = accepted.filter((item) => item.locale && item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  if (ranked.length) return ranked[0].locale;

  const excluded = new Set(accepted.filter((item) => item.explicitlyExcluded).map((item) => item.locale));
  const country = String(request.cf?.country || request.headers.get('CF-IPCountry') || '').toUpperCase();
  if (FRANCOPHONE_COUNTRIES.has(country) && !excluded.has('fr')) return 'fr';
  // A fixed English fallback keeps unsupported-language requests navigable; no 406 page.
  return 'en';
}

export function redirectToLocale(request, pathname) {
  const target = new URL(request.url);
  const path = pathname.replace(/\/+$/, '');
  target.pathname = `/${preferredLocale(request)}${path}`;
  // target.search is intentionally untouched, including repeated and encoded parameters.
  return new Response(null, {
    status: 307,
    headers: {
      Location: target.href,
      'Cache-Control': 'private, no-store',
      Vary: 'Cookie, Accept-Language, CF-IPCountry',
    },
  });
}
