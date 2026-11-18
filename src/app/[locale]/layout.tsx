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
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Joy N. · UX/UI Playbook',
      locale: c.meta.ogLocale,
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      url: `${c.siteUrl}/${locale}`,
      images: [
        {
          url: locale === 'fr' ? '/og-fr.jpg' : '/og-en.jpg',
          width: 1200,
          height: 630,
          alt: c.meta.productName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      images: [locale === 'fr' ? '/og-fr.jpg' : '/og-en.jpg'],
    },
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23FF5A2B'/%3E%3Ctext x='16' y='21.5' font-family='Helvetica,Arial,sans-serif' font-size='14' font-weight='900' fill='%23000' text-anchor='middle'%3EJN%3C/text%3E%3C/svg%3E",
    },
  };
}

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('playbook-theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', theme === 'light' ? '#FAF8F4' : '#000000');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
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
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
