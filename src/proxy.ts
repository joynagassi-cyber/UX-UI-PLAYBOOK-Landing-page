import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['fr', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function detectPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value?.toLowerCase();
  if (cookieLocale === 'fr' || cookieLocale === 'en') {
    return cookieLocale;
  }

  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const parsed = acceptLang
      .split(',')
      .map((part) => {
        const [rawTag, ...params] = part.trim().split(';');
        const lang = rawTag.trim().toLowerCase();
        let q = 1.0;
        for (const p of params) {
          const [k, v] = p.trim().split('=');
          if (k === 'q' && v) {
            const parsedQ = parseFloat(v);
            if (!Number.isNaN(parsedQ)) q = parsedQ;
          }
        }
        return { lang, q };
      })
      .sort((a, b) => b.q - a.q);

    for (const item of parsed) {
      if (item.lang.startsWith('fr')) return 'fr';
      if (item.lang.startsWith('en')) return 'en';
    }
  }

  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase();
  const francophoneCountries = new Set([
    'FR', 'BE', 'CH', 'LU', 'MC', 'BJ', 'SN', 'CI', 'CM', 'TG', 'BF', 'ML', 'NE', 'GA', 'CD', 'CG', 'MG', 'MA', 'TN', 'DZ', 'HT', 'RE', 'GP', 'MQ', 'GF',
  ]);
  if (country && francophoneCountries.has(country)) {
    return 'fr';
  }

  return 'en';
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Let static assets, Next internals, and SEO/GEO machine endpoints pass directly
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if path already starts with /fr or /en
  const seg = pathname.split('/')[1]?.toLowerCase();
  if (seg === 'fr' || seg === 'en') {
    const response = NextResponse.next();
    response.headers.set('x-locale', seg);
    return response;
  }

  // Root `/` or unlocalized routes like `/articles` or `/articles/ux-design-guide`
  // automatically redirect to the visitor's language (`/fr/...` or `/en/...`)
  const locale = detectPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  url.search = search;
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Vary', 'Accept-Language, Cookie, x-vercel-ip-country');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|og-.*\\.jpg|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt).*)',
  ],
};
