import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { CONTENT, type Locale } from '@/i18n/content';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'fr' ? 'fr' : 'en';
  const c = CONTENT[locale];

  return {
    metadataBase: new URL(c.siteUrl),
    applicationName: 'UX/UI Playbook',
    authors: [{ name: 'Joy N.', url: `${c.siteUrl}/${locale}` }],
    creator: 'Joy N.',
    publisher: 'UX/UI Playbook',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('playbook-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', theme === 'light' ? '#FAF8F4' : '#000000');
  } catch (e) {
    var fallbackTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', fallbackTheme);
  }
})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'fr' && locale !== 'en') {
    notFound();
  }

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/jbmono-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="UX/UI Playbook LLM Index" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
