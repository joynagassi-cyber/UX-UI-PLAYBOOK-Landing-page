import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { ArticleCardVisual } from '@/components/ArticleCardVisual';
import { TabularText } from '@/components/TabularText';
import { CONTENT, type Locale } from '@/i18n/content';
import { ARTICLES, ARTICLES_UI } from '@/i18n/articles';
import { GumroadButton } from '@/components/GumroadButton';
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls';
import { FreeResourcePromo } from '@/components/FreeResourcePromo';
import { FREE_UI } from '@/i18n/free-resource';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';
import { authorJsonLd, serializeJsonLd } from '@/lib/structured-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'fr' ? 'fr' : 'en';
  const c = CONTENT[locale];
  const ui = ARTICLES_UI[locale];

  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: {
      canonical: `/${locale}/articles`,
      languages: {
        fr: '/fr/articles',
        en: '/en/articles',
        'x-default': '/en/articles',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'UX/UI Playbook',
      locale: c.meta.ogLocale,
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      title: ui.metaTitle,
      description: ui.metaDescription,
      url: `${c.siteUrl}/${locale}/articles`,
      images: [
        {
          url: locale === 'fr' ? '/og-fr.jpg' : '/og-en.jpg',
          width: 1200,
          height: 630,
          alt: ui.metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ui.metaTitle,
      description: ui.metaDescription,
      images: [locale === 'fr' ? '/og-fr.jpg' : '/og-en.jpg'],
    },
  };
}

export default async function ArticlesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== 'fr' && rawLocale !== 'en') {
    notFound();
  }
  const locale: Locale = rawLocale;
  const c = CONTENT[locale];
  const ui = ARTICLES_UI[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      authorJsonLd(locale),
      {
        '@type': 'CollectionPage',
        '@id': `${c.siteUrl}/${locale}/articles#collection`,
        url: `${c.siteUrl}/${locale}/articles`,
        name: ui.metaTitle,
        description: ui.metaDescription,
        inLanguage: locale,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${c.siteUrl}/#website`,
          name: 'UX/UI Playbook',
          url: c.siteUrl,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: ARTICLES[locale].map((art, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${c.siteUrl}/${locale}/articles/${art.slug}`,
            name: art.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'UX/UI Playbook',
            item: `${c.siteUrl}/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: c.nav.guides,
            item: `${c.siteUrl}/${locale}/articles`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <a className="sr-skip" href="#hub-content">
        {c.skipToContent}
      </a>

      {/* Top Announcement Bar */}
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="topbar-left">
            <span className="oled-dot" aria-hidden="true" />
            <span className="mono">{c.topBar.badge}</span>
          </div>
          <GumroadButton href={c.gumroadUrl} className="mono topbar-cta">
            {c.topBar.cta}
            <Icon name="arrow-up-right" size="sm" />
          </GumroadButton>
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav
        className="site-nav"
        aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}
      >
        <div className="wrap nav-inner">
          <a className="brand" href={`/${locale}`}>
            <span className="brand-mark">UP</span>
            <span>UX/UI Playbook</span>
          </a>

          <div className="nav-links">
            <a href={`/${locale}#pillars`}>{c.nav.pillars}</a>
            <a href={`/${locale}#tool`}>{c.nav.demo}</a>
            <a href={`/${locale}#inside`}>{c.nav.inside}</a>
            <a
              href={`/${locale}/articles`}
              aria-current="page"
              style={{ color: 'var(--accent-ink)', fontWeight: 700 }}
            >
              {c.nav.guides}
            </a>
            <a className="nav-free" href={`/${locale}${FREE_RESOURCE_PATH}`}>{FREE_UI[locale].nav}</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeAndLangControls
              locale={locale}
              themeDarkLabel={c.nav.themeDarkLabel}
              themeLightLabel={c.nav.themeLightLabel}
              switchLangTitle={c.nav.switchLangTitle}
            />
            <GumroadButton href={c.gumroadUrl} className="btn primary small nav-buy-btn">
              {c.nav.buy}
            </GumroadButton>
          </div>
        </div>
      </nav>

      <main id="hub-content" className="notion-page-wrap">
        <div style={{ marginBottom: 24 }}>
          <a
            href={`/${locale}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              minHeight: 44,
              fontSize: 13.5,
              color: 'var(--fg-2)',
              textDecoration: 'none',
            }}
          >
            <Icon name="arrow-left" size="sm" />
            <span>{ui.backHome}</span>
          </a>
        </div>

        <header style={{ maxWidth: 820, marginBottom: 44 }}>
          <div className="notion-header-meta">
            <span className="mono sec-kicker" style={{ marginBottom: 0 }}>
              {ui.kicker}
            </span>
          </div>
          <h1 className="notion-title" style={{ marginTop: 12 }}>
            {ui.heading}
          </h1>
          <p className="notion-subtitle" style={{ marginBottom: 0 }}>
            {ui.lede}
          </p>
        </header>

        {/* Article grid */}
        <div className="guides-grid" style={{ marginTop: 0 }}>
          {ARTICLES[locale].map((art) => {
            return (
              <a
                key={art.slug}
                href={`/${locale}/articles/${art.slug}`}
                className="guide-card"
              >
                <div>
                  <div className="guide-card-top">
                    <span className="guide-cat-pill">
                      <Icon name={art.icon} size="sm" />
                      <span>{art.category}</span>
                    </span>
                    <span className="guide-read-meta">{art.readTime}</span>
                  </div>
                  <ArticleCardVisual article={art} locale={locale} />
                  <h3>{art.title}</h3>
                  <p>{art.subtitle}</p>

                  {/* Mini Stat Preview */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    {art.keyStats.slice(0, 2).map((st, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 12,
                          padding: '4px 9px',
                          borderRadius: 7,
                          background: 'var(--s2)',
                          border: '1px solid var(--line)',
                          color: 'var(--fg-2)',
                        }}
                      >
                        <strong style={{ color: 'var(--fg)' }}><TabularText>{st.value}</TabularText></strong> ·{' '}
                        {st.source.split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="guide-card-foot">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>
                    {art.sections.length} {locale === 'fr' ? 'parties et exemples' : 'sections and examples'}
                  </span>
                  <span className="guide-card-arrow">
                    <span>{ui.readBtn}</span>
                    <Icon name="arrow-right" size="sm" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ marginTop: 44 }}><FreeResourcePromo locale={locale} compact /></div>

        {/* Full System Offer Banner */}
        <section className="notion-cta-card" style={{ marginTop: 64 }}>
          <div className="notion-cta-grid">
            <div>
              <div className="mono sec-kicker" style={{ marginBottom: 10 }}>
                {c.offer.kicker}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                {c.offer.heading}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)' }}>
                {c.offer.lede}
              </p>
            </div>
            <div className="notion-cta-pricebox">
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 42,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <TabularText>{c.offer.priceDisplay}</TabularText>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--fg-2)', marginBottom: 16 }}>
                {c.offer.priceSub}
              </p>
              <GumroadButton
                href={c.gumroadUrl}
                className="btn primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{c.offer.buyBtn}</span>
                <Icon name="arrow-up-right" size="md" />
              </GumroadButton>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <strong style={{ color: 'var(--fg)' }}>{c.footer.copyright}</strong>
          </div>

          <div className="footer-links">
            <a href={`/${locale}${FREE_RESOURCE_PATH}`}>{FREE_UI[locale].promoLink}</a>
            <a href={`/${locale}`}>UX/UI Playbook</a>
            <GumroadButton href={c.gumroadUrl}>
              {c.footer.gumroadLinkLabel}
            </GumroadButton>
            <a href="mailto:joynagassi@gmail.com">joynagassi@gmail.com</a>
            <a
              href={`/${c.otherLocale}/articles`}
              hrefLang={c.otherLocale}
              lang={c.otherLocale}
            >
              {c.footer.otherEditionLabel}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
