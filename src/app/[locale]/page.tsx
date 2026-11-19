import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { CONTENT, type Locale } from '@/i18n/content';
import { ARTICLES, ARTICLES_UI } from '@/i18n/articles';
import { GumroadButton } from '@/components/GumroadButton';
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls';
import { LiveAgentDemo } from '@/components/LiveAgentDemo';
import {
  BookGalleryLightbox,
  HeroBookStack,
  HeroSampleTrigger,
} from '@/components/BookGalleryLightbox';
import { ContentsExplorer } from '@/components/ContentsExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'fr' ? 'fr' : 'en';
  const c = CONTENT[locale];

  return {
    title: c.meta.title,
    description: c.meta.description,
    keywords:
      locale === 'fr'
        ? [
            'UX/UI Playbook',
            'UX design développeur',
            'UI design system tokens',
            'Product design agent IA',
            'checklist UX 77 règles',
            'Claude Code UI skill',
            'Cursor règles UI',
            'audit accessibilité WCAG 2.2',
          ]
        : [
            'UX/UI Playbook',
            'UX design for developers',
            'UI design tokens system',
            'Product design AI coding agents',
            '77 UI rules checklist',
            'Claude Code UI skill',
            'Cursor UI rules',
            'WCAG 2.2 accessibility checklist',
          ],
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
      siteName: 'UX/UI Playbook',
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
  };
}

const ARTICLE_THUMBS: Record<string, Record<Locale, string>> = {
  'ux-design-guide': {
    fr: '/images/articles/fr/ux-states.webp',
    en: '/images/articles/en/ux-states.webp',
  },
  'ui-design-system-tokens': {
    fr: '/images/articles/fr/ui-sbs-dark.webp',
    en: '/images/articles/en/ui-sbs-dark.webp',
  },
  'product-design-ai-agents': {
    fr: '/images/articles/fr/prod-pipeline.webp',
    en: '/images/articles/en/prod-pipeline.webp',
  },
};

export default async function LandingPage({
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
      {
        '@type': 'WebSite',
        '@id': `${c.siteUrl}/#website`,
        url: c.siteUrl,
        name: 'UX/UI Playbook',
        inLanguage: ['fr', 'en'],
        publisher: { '@id': `${c.siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${c.siteUrl}/#organization`,
        name: 'UX/UI Playbook',
        url: c.siteUrl,
        email: 'joynagassi@gmail.com',
        founder: {
          '@type': 'Person',
          name: 'Joy N.',
        },
      },
      {
        '@type': 'Product',
        '@id': `${c.siteUrl}/${locale}#product`,
        name: c.meta.productName,
        description: c.meta.description,
        brand: {
          '@type': 'Brand',
          name: 'UX/UI Playbook',
        },
        inLanguage: locale,
        category: 'Software & Interface Design Playbook',
        image: c.meta.ogImage,
        offers: {
          '@type': 'Offer',
          price: '29.00',
          priceCurrency: 'USD',
          url: c.gumroadUrl,
          availability: 'https://schema.org/InStock',
          seller: {
            '@id': `${c.siteUrl}/#organization`,
          },
        },
      },
      {
        '@type': 'Book',
        '@id': `${c.siteUrl}/${locale}#book`,
        name: 'UX/UI Playbook',
        author: {
          '@type': 'Person',
          name: 'Joy N.',
        },
        bookEdition: locale === 'fr' ? 'Édition française 2026' : '2026 English Edition',
        bookFormat: 'https://schema.org/EBook',
        numberOfPages: locale === 'fr' ? 148 : 139,
        inLanguage: locale,
        datePublished: '2026-11-01',
        publisher: { '@id': `${c.siteUrl}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${c.siteUrl}/${locale}#faq`,
        mainEntity: c.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${c.siteUrl}/${locale}#guides`,
        name:
          locale === 'fr'
            ? 'Guides de terrain UX/UI Playbook'
            : 'UX/UI Playbook Field Guides',
        itemListElement: ARTICLES[locale].map((art, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: art.title,
          url: `${c.siteUrl}/${locale}/articles/${art.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a className="sr-skip" href="#content">
        {c.skipToContent}
      </a>

      {/* Top Announcement Bar */}
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="topbar-left">
            <span className="oled-dot" aria-hidden="true" />
            <span className="mono">{c.topBar.badge}</span>
            <span className="topbar-hint">{c.topBar.audienceHint}</span>
          </div>
          <GumroadButton href={c.gumroadUrl} className="mono topbar-cta">
            {c.topBar.cta}
            <ArrowUpRight size={14} aria-hidden="true" />
          </GumroadButton>
        </div>
      </div>

      {/* Sticky Navigation */}
      <nav
        className="site-nav"
        aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}
      >
        <div className="wrap nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">UP</span>
            <span>UX/UI Playbook</span>
          </a>

          <div className="nav-links">
            <a href="#pillars">{c.nav.pillars}</a>
            <a href="#tool">{c.nav.demo}</a>
            <a href="#inside">{c.nav.inside}</a>
            <a href="#contents">{c.nav.contents}</a>
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <a href="#faq">{c.nav.faq}</a>
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

      {/* Hero Section */}
      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <div className="mono sec-kicker">{c.hero.kicker}</div>
            <h1>
              {c.hero.titleBefore}
              <em>{c.hero.titleAccent}</em>
              {c.hero.titleAfter}
            </h1>
            <p className="hero-lede">{c.hero.lede}</p>

            <div className="hero-ctas">
              <GumroadButton href={c.gumroadUrl} className="btn primary">
                {c.hero.primaryCta}
                <ArrowUpRight size={17} aria-hidden="true" />
              </GumroadButton>
              <HeroSampleTrigger label={c.hero.secondaryCta} pageIndex={0} />
            </div>

            <p className="hero-note">{c.hero.note}</p>

            <div className="hero-proof">
              {c.hero.proofs.map((proof, idx) => (
                <span key={idx}>{proof}</span>
              ))}
            </div>
          </div>

          <HeroBookStack
            coverSrc={`/images/${locale}/cover.webp`}
            coverAlt={c.insideSection.pages[0].alt}
            coverCaption={c.hero.coverCaption}
            spreadSrc={`/images/${locale}/landing-annotated.webp`}
            spreadAlt={c.insideSection.pages[2].alt}
            spreadCaption={c.hero.spreadCaption}
          />
        </div>
      </header>

      {/* Key Metrics Strip */}
      <div className="strip">
        <div className="wrap strip-grid">
          {c.strip.map((item, idx) => (
            <div className="strip-cell" key={idx}>
              <div className="strip-num">{item.num}</div>
              <div className="strip-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <main id="content">
        {/* 3 Pillars Section */}
        <section id="pillars">
          <div className="wrap">
            <div className="mono sec-kicker">{c.pillars.kicker}</div>
            <h2>{c.pillars.heading}</h2>
            <p className="sec-lede">{c.pillars.lede}</p>

            <div className="pillars-grid">
              {c.pillars.cards.map((card, idx) => (
                <article className="pillar-card" key={idx}>
                  <div className="mono pillar-tag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <div className="pillar-sub">{card.subtitle}</div>
                  <ul className="ticks">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Live Interactive Agent Checklist & Before/After Demo */}
        <LiveAgentDemo data={c.agentDemo} />

        {/* What Actually Breaks (Screen States) */}
        <section id="problem">
          <div className="wrap">
            <div className="mono sec-kicker">{c.statesSection.kicker}</div>
            <h2>{c.statesSection.heading}</h2>
            <p className="sec-lede">{c.statesSection.lede}</p>

            <div className="states-grid">
              {c.statesSection.cards.map((st, idx) => (
                <article
                  className={`state-card ${st.hot ? 'hot' : ''}`}
                  key={idx}
                >
                  <div className="mono">{st.tag}</div>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Real Pages Gallery + Fullscreen Sample Reader */}
        <BookGalleryLightbox data={c.insideSection} gumroadUrl={c.gumroadUrl} />

        {/* Complete Table of Contents + 12-Sheet Bonus Kit + 21-File Archive */}
        <ContentsExplorer data={c.contentsSection} />

        {/* 3 Free Notion-Style Field Guides (UX Design, UI Design, Product Design) */}
        <section id="guides">
          <div className="wrap">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 18,
              }}
            >
              <div>
                <div className="mono sec-kicker">{ui.kicker}</div>
                <h2>
                  {locale === 'fr'
                    ? 'Lisez gratuitement nos 3 dossiers piliers (UX, UI & Produit).'
                    : 'Read our 3 free pillar field guides (UX, UI & Product).'}
                </h2>
                <p className="sec-lede">{ui.lede}</p>
              </div>
              <a className="btn ghost small" href={`/${locale}/articles`}>
                <BookOpen size={15} aria-hidden="true" />
                <span>{c.nav.guides}</span>
              </a>
            </div>

            <div className="guides-grid">
              {ARTICLES[locale].map((art) => {
                const thumb = ARTICLE_THUMBS[art.slug][locale];
                return (
                  <a
                    key={art.slug}
                    href={`/${locale}/articles/${art.slug}`}
                    className="guide-card"
                  >
                    <div>
                      <div className="guide-card-top">
                        <span className="guide-cat-pill">
                          <span>{art.icon}</span>
                          <span>{art.category}</span>
                        </span>
                        <span className="guide-read-meta">{art.readTime}</span>
                      </div>
                      <div className="guide-card-thumb">
                        <img
                          src={thumb}
                          alt={art.title}
                          width={540}
                          height={320}
                          loading="lazy"
                        />
                      </div>
                      <h3>{art.title}</h3>
                      <p>{art.subtitle}</p>
                    </div>
                    <div className="guide-card-foot">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>
                        {locale === 'fr' ? 'Format Notion + Sommaire' : 'Notion UI + Sticky TOC'}
                      </span>
                      <span className="guide-card-arrow">
                        <span>{ui.readBtn}</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Market Positioning & Comparison */}
        <section id="comparison">
          <div className="wrap">
            <div className="mono sec-kicker">{c.comparison.kicker}</div>
            <h2>{c.comparison.heading}</h2>
            <p className="sec-lede">{c.comparison.lede}</p>

            <div className="comp-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th scope="col">{c.comparison.colFeature}</th>
                    <th scope="col">{c.comparison.colOthers}</th>
                    <th scope="col">{c.comparison.colPlaybook}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.feature}</td>
                      <td className="tabular">{row.others}</td>
                      <td className="tabular">{row.playbook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Radical Honesty: For You / Not For You */}
        <section id="honesty">
          <div className="wrap">
            <div className="mono sec-kicker">{c.honesty.kicker}</div>
            <h2>{c.honesty.heading}</h2>

            <div className="honest-grid">
              <div className="hcard yes">
                <h3>{c.honesty.yesTitle}</h3>
                <ul>
                  {c.honesty.yesItems.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
              <div className="hcard no">
                <h3>{c.honesty.noTitle}</h3>
                <ul>
                  {c.honesty.noItems.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section id="author">
          <div className="wrap">
            <div className="mono sec-kicker">{c.author.kicker}</div>
            <h2>{c.author.heading}</h2>

            <div className="author-card">
              <img
                src="/images/author-joy.webp"
                width={116}
                height={116}
                alt="Joy N."
                className="author-avatar"
                loading="lazy"
              />
              <div>
                <h3>{c.author.role}</h3>
                <p>{c.author.p1}</p>
                <p style={{ marginTop: '12px' }}>{c.author.p2}</p>
                <div className="author-sig">{c.author.signature}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <div className="wrap">
            <div className="mono sec-kicker">{c.faq.kicker}</div>
            <h2>{c.faq.heading}</h2>

            <div className="faq-list">
              {c.faq.items.map((item, idx) => (
                <details key={idx} open={idx === 0}>
                  <summary>{item.q}</summary>
                  <div className="faq-answer">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final Offer & Cross-Edition Switch */}
        <section id="buy">
          <div className="wrap">
            <div className="offer-box">
              <div>
                <div className="mono sec-kicker">{c.offer.kicker}</div>
                <h2>{c.offer.heading}</h2>
                <p className="sec-lede">{c.offer.lede}</p>

                <p
                  style={{
                    fontWeight: 700,
                    marginTop: '22px',
                    marginBottom: '8px',
                    fontSize: '15px',
                  }}
                >
                  {c.offer.includedTitle}
                </p>
                <ul className="ticks">
                  {c.offer.includedList.map((inc, idx) => (
                    <li key={idx}>{inc}</li>
                  ))}
                </ul>
              </div>

              <div className="offer-price-panel">
                <div className="offer-amount">{c.offer.priceDisplay}</div>
                <div className="offer-sub">{c.offer.priceSub}</div>

                <div style={{ marginTop: '22px' }}>
                  <GumroadButton
                    href={c.gumroadUrl}
                    className="btn primary"
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      {c.offer.buyBtn}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </GumroadButton>
                </div>

                <div className="offer-guarantees">
                  {c.offer.guarantees.map((g, idx) => (
                    <span key={idx}>{g}</span>
                  ))}
                </div>

                <p className="hero-note" style={{ marginTop: '14px' }}>
                  {c.offer.licenseNote}
                </p>
              </div>
            </div>

            <div className="crosslink-card">
              <div>
                <span className="mono" style={{ color: 'var(--accent-ink)' }}>
                  {c.offer.crosslinkTag}
                </span>
                <p>{c.offer.crosslinkText}</p>
              </div>
              <a
                className="btn ghost small"
                href={`/${c.otherLocale}`}
                hrefLang={c.otherLocale}
                rel="alternate"
              >
                {c.offer.crosslinkBtn}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <strong style={{ color: 'var(--fg)' }}>{c.footer.copyright}</strong>
            <div className="footer-lic">{c.footer.license}</div>
            <div className="footer-rule-badge">✓ {c.footer.builtWithRule}</div>
          </div>

          <div className="footer-links">
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <GumroadButton href={c.gumroadUrl}>
              {c.footer.gumroadLinkLabel}
            </GumroadButton>
            <a href="mailto:joynagassi@gmail.com">joynagassi@gmail.com</a>
            <a
              href={`/${c.otherLocale}`}
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
