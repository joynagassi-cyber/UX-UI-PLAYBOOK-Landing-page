import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { CONTENT, type Locale } from '@/i18n/content';
import {
  ARTICLES,
  ARTICLE_SLUGS,
  getArticleBySlug,
} from '@/i18n/articles';
import { GumroadButton } from '@/components/GumroadButton';
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls';
import { NotionArticleReader } from '@/components/NotionArticleReader';
import { authorJsonLd, serializeJsonLd } from '@/lib/structured-data';

export function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en'];
  return locales.flatMap((locale) =>
    ARTICLE_SLUGS.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'fr' ? 'fr' : 'en';
  const art = getArticleBySlug(locale, slug);
  if (!art) return {};

  const c = CONTENT[locale];

  return {
    title: art.metaTitle,
    description: art.metaDescription,
    authors: [{ name: 'Joy N.', url: `${c.siteUrl}/${locale}#author` }],
    alternates: {
      canonical: `/${locale}/articles/${art.slug}`,
      languages: {
        fr: `/fr/articles/${art.slug}`,
        en: `/en/articles/${art.slug}`,
        'x-default': `/en/articles/${art.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      siteName: 'UX/UI Playbook',
      locale: c.meta.ogLocale,
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      title: art.metaTitle,
      description: art.metaDescription,
      url: `${c.siteUrl}/${locale}/articles/${art.slug}`,
      publishedTime: `${art.publishedAt}T08:00:00.000Z`,
      modifiedTime: `${art.updatedAt}T08:00:00.000Z`,
      authors: ['Joy N.'],
      section: art.category,
      tags: art.keywords,
      images: [
        {
          url: art.ogImage,
          width: 1200,
          height: 630,
          alt: art.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: art.metaTitle,
      description: art.metaDescription,
      images: [art.ogImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== 'fr' && rawLocale !== 'en') {
    notFound();
  }
  const locale: Locale = rawLocale;
  const art = getArticleBySlug(locale, slug);
  if (!art) {
    notFound();
  }

  const c = CONTENT[locale];
  const relatedArticles = ARTICLES[locale].filter((a) => a.slug !== art.slug);
  const articleUrl = `${c.siteUrl}/${locale}/articles/${art.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      authorJsonLd(locale),
      {
        '@type': 'TechArticle',
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: articleUrl,
        headline: art.title,
        description: art.aeoSummary,
        abstract: art.aeoSummary,
        image: `${c.siteUrl}${art.ogImage}`,
        inLanguage: locale,
        datePublished: `${art.publishedAt}T08:00:00.000Z`,
        dateModified: `${art.updatedAt}T08:00:00.000Z`,
        articleSection: art.category,
        keywords: art.keywords.join(', '),
        author: { '@id': `${c.siteUrl}/#joy-n` },
        publisher: {
          '@type': 'Organization',
          '@id': `${c.siteUrl}/#organization`,
          name: 'UX/UI Playbook',
          url: c.siteUrl,
          email: 'joynagassi@gmail.com',
          logo: {
            '@type': 'ImageObject',
            url: `${c.siteUrl}/icon.svg`,
            width: 512,
            height: 512,
          },
        },
        isPartOf: {
          '@type': 'Book',
          '@id': `${c.siteUrl}/${locale}#book`,
          name: 'UX/UI Playbook',
          url: `${c.siteUrl}/${locale}`,
        },
        citation: art.references.map((reference) => ({
          '@type': 'CreativeWork',
          name: reference.title,
          url: reference.url,
          publisher: { '@type': 'Organization', name: reference.publisher },
          description: reference.note,
          ...( /^\d{4}-\d{2}-\d{2}$/.test(reference.date) ? { datePublished: reference.date } : {} ),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${articleUrl}#faq`,
        mainEntity: art.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: art.title,
            item: articleUrl,
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

      <a className="sr-skip" href="#article-main">
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
              style={{ color: 'var(--accent-ink)', fontWeight: 700 }}
            >
              {c.nav.guides}
            </a>
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

      <main id="article-main">
        <NotionArticleReader
          locale={locale}
          gumroadUrl={c.gumroadUrl}
          article={art}
          relatedArticles={relatedArticles}
        />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <strong style={{ color: 'var(--fg)' }}>{c.footer.copyright}</strong>
          </div>

          <div className="footer-links">
            <a href={`/${locale}`}>UX/UI Playbook</a>
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <GumroadButton href={c.gumroadUrl}>
              {c.footer.gumroadLinkLabel}
            </GumroadButton>
            <a href="mailto:joynagassi@gmail.com">joynagassi@gmail.com</a>
            <a
              href={`/${c.otherLocale}/articles/${art.slug}`}
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
