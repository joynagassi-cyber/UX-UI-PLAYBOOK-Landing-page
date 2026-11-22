import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Icon, type IconName } from '@/components/Icon';
import { ArticleCardVisual } from '@/components/ArticleCardVisual';
import { FreeResourceDownload } from '@/components/FreeResourceDownload';
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls';
import { TabularText } from '@/components/TabularText';
import { CONTENT, type Locale } from '@/i18n/content';
import { ARTICLES } from '@/i18n/articles';
import { FREE_UI, freeResourceCatalog, freeResourceManifest, resourceCategories, resourceSamples } from '@/i18n/free-resource';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';
import { SITE_URL } from '@/lib/site-config';
import { authorJsonLd, serializeJsonLd } from '@/lib/structured-data';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === 'fr' ? 'fr' : 'en';
  const t = FREE_UI[locale];
  const image = `/og-directory-${locale}.jpg`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}${FREE_RESOURCE_PATH}`,
      languages: { fr: `/fr${FREE_RESOURCE_PATH}`, en: `/en${FREE_RESOURCE_PATH}`, 'x-default': `/en${FREE_RESOURCE_PATH}` },
    },
    openGraph: {
      type: 'website', siteName: 'UX/UI Playbook', title: t.metaTitle, description: t.metaDescription,
      locale: CONTENT[locale].meta.ogLocale, alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      url: `${SITE_URL}/${locale}${FREE_RESOURCE_PATH}`,
      images: [{ url: image, width: 1200, height: 630, alt: t.coverAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.metaTitle, description: t.metaDescription, images: [{ url: image, alt: t.coverAlt }] },
  };
}

function destinationLabel(url: string) {
  const parsed = new URL(url);
  return parsed.hostname.replace(/^www\./, '') + (parsed.hostname === 'github.com' ? parsed.pathname : '');
}

export default async function FreeDirectoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== 'fr' && raw !== 'en') notFound();
  const locale: Locale = raw;
  const c = CONTENT[locale];
  const t = FREE_UI[locale];
  const catalog = freeResourceCatalog(locale);
  const manifest = freeResourceManifest(locale);
  const categories = resourceCategories(locale);
  const samples = resourceSamples(locale);
  const url = `${SITE_URL}/${locale}${FREE_RESOURCE_PATH}`;
  // Each page describes and serves its own language edition.
  // No fake Gumroad offer: the actual free files are available on this page in either configuration.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      authorJsonLd(locale),
      {
        '@type': 'WebPage', '@id': `${url}#page`, url, name: t.metaTitle,
        description: t.metaDescription, inLanguage: locale,
        mainEntity: { '@id': `${url}#guide` },
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'UX/UI Playbook', url: SITE_URL },
      },
      {
        '@type': 'Book', '@id': `${url}#guide`, url,
        name: `${catalog.title} — ${catalog.subtitle}`,
        description: t.metaDescription,
        author: { '@id': `${SITE_URL}/#joy-n` },
        inLanguage: locale, isAccessibleForFree: true, bookFormat: 'https://schema.org/EBook',
        numberOfPages: manifest.counts.guidePages, version: manifest.version,
        image: `${SITE_URL}/images/free-directory/cover-${locale}.jpg`,
        encoding: {
          '@type': 'MediaObject', inLanguage: locale, encodingFormat: 'application/pdf',
          contentUrl: SITE_URL + manifest.files.pdf.path,
          contentSize: `${manifest.files.pdf.bytes} bytes`,
        },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: t.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'UX/UI Playbook', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />
      <a className="sr-skip" href="#resource-content">{c.skipToContent}</a>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="topbar-left"><span className="oled-dot" aria-hidden="true" /><span className="mono">{t.nav}</span></div>
          <a className="mono topbar-cta" href={`/${locale}`}>UX/UI Playbook <Icon name="arrow-right" size="sm" /></a>
        </div>
      </div>
      <nav className="site-nav" aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>
        <div className="wrap nav-inner">
          <a className="brand" href={`/${locale}`}><span className="brand-mark">UP</span><span>UX/UI Playbook</span></a>
          <div className="nav-links">
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <a href={`/${locale}${FREE_RESOURCE_PATH}`} aria-current="page">{t.nav}</a>
            <a href="#directory">{t.readDirectory}</a>
          </div>
          <ThemeAndLangControls locale={locale} themeDarkLabel={c.nav.themeDarkLabel} themeLightLabel={c.nav.themeLightLabel} switchLangTitle={c.nav.switchLangTitle} />
        </div>
      </nav>

      <main tabIndex={-1} id="resource-content" className="resource-page">
        <header className="resource-hero wrap">
          <div className="resource-hero-copy">
            <div className="mono sec-kicker">{t.kicker}</div>
            <h1>{t.title}</h1>
            <p className="resource-lede">{t.lede}</p>
            <dl className="resource-stats">
              {[[manifest.counts.entries, t.entries], [manifest.counts.categories, t.categories], [manifest.counts.resourceLinks, t.links]].map(([value, label]) => (
                <div key={label}><dt><TabularText>{String(value)}</TabularText></dt><dd>{label}</dd></div>
              ))}
            </dl>
            <FreeResourceDownload locale={locale} />
            <a className="resource-text-link" href="#directory"><span>{t.readDirectory}</span><Icon name="arrow-right" size="sm" /></a>
          </div>
          <figure className="resource-cover">
            <img src={`/images/free-directory/cover-${locale}.jpg`} width={1280} height={720} alt={t.coverAlt} fetchPriority="high" />
            <figcaption>{t.coverCaption}</figcaption>
          </figure>
        </header>

        <section className="wrap resource-section" aria-labelledby="resource-inside-title">
          <div className="mono sec-kicker">{t.insideKicker}</div><h2 id="resource-inside-title">{t.insideTitle}</h2>
          <div className="resource-files">
            {t.files.map((file) => <article className="resource-file" key={file.title}><Icon name={file.icon as IconName} size="lg" /><h3>{file.title}</h3><p>{file.text}</p></article>)}
          </div>
          <p className="resource-subnote">{t.archiveNote}</p>
        </section>

        <section className="wrap resource-section" aria-labelledby="resource-how-title">
          <div className="mono sec-kicker">{t.howKicker}</div><h2 id="resource-how-title">{t.howTitle}</h2>
          <ol className="resource-steps">
            {t.steps.map((step, i) => <li key={step.title}><span className="resource-step-number"><TabularText>{String(i + 1).padStart(2, '0')}</TabularText></span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
          </ol>
        </section>

        <section className="wrap resource-section" id="directory" aria-labelledby="resource-directory-title">
          <div className="mono sec-kicker">{t.directoryKicker}</div><h2 id="resource-directory-title">{t.directoryTitle}</h2>
          <p className="sec-lede">{t.directoryText}</p>
          <div className="resource-directory">
            {categories.map((category, i) => (
              <details className="resource-family" key={category.id} open={i === 0}>
                <summary>
                  <Icon name={category.icon} size="lg" />
                  <span className="resource-family-label">{category.name}<span><TabularText>{String(category.entries.length)}</TabularText> {t.entries}</span></span>
                  <Icon name="chevron-down" size="sm" className="resource-family-chevron" />
                </summary>
                <div className="resource-family-body">
                  <p>{category.purpose}</p><p className="resource-family-question">{category.question}</p>
                  <ul className="resource-entry-list">
                    {category.entries.map((entry) => (
                      <li key={entry.id} data-directory-entry={entry.id}>
                        <strong>{entry.name}</strong>
                        <div className="resource-source-links">
                          {entry.urls.map((href) => <a href={href} key={href} rel="noopener noreferrer" target="_blank" aria-label={`${t.official} : ${entry.name} — ${destinationLabel(href)}`}><span>{destinationLabel(href)}</span><Icon name="arrow-up-right" size="sm" /></a>)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="wrap resource-section" aria-labelledby="resource-samples-title">
          <div className="mono sec-kicker">{t.sampleKicker}</div><h2 id="resource-samples-title">{t.sampleTitle}</h2><p className="sec-lede">{t.sampleText}</p>
          <div className="resource-samples">
            {samples.map((entry) => <article className="resource-sample" key={entry.id}>
              <h3>{entry.name}</h3><p>{entry.description}</p>
              <dl>{[entry.nonDesigner, entry.developer, entry.agent].map((value, i) => <div key={value}><dt>{t.profiles[i]}</dt><dd>{value}</dd></div>)}</dl>
              <p className="resource-sample-watch"><strong>{t.watch}.</strong> {entry.watch}</p>
            </article>)}
          </div>
          <aside className="resource-rights"><Icon name="alert-triangle" size="lg" /><div><h3>{t.rightsTitle}</h3><p>{t.rightsText}</p><a href={manifest.files.pdf.path}>{t.rightsLink}</a></div></aside>
        </section>

        <section className="wrap resource-section" aria-labelledby="resource-faq-title">
          <h2 id="resource-faq-title">{t.faqTitle}</h2>
          <div className="faq-list">{t.faqs.map((faq, i) => <details key={faq.q} open={i === 0}><summary><span>{faq.q}</span><Icon name="chevron-down" className="faq-chevron" /></summary><div className="faq-answer">{faq.a}</div></details>)}</div>
        </section>

        <section className="wrap resource-section resource-bottom" aria-labelledby="resource-bottom-title">
          <h2 id="resource-bottom-title">{t.bottomTitle}</h2><FreeResourceDownload locale={locale} />
          <a className="resource-text-link" href={manifest.files.markdown.path} download hrefLang={locale}><Icon name="file-text" size="sm" /><span>{t.markdown}</span></a>
          <p className="resource-subnote">{t.edition}</p>
        </section>

        <section className="wrap resource-section resource-next" aria-labelledby="resource-next-title">
          <div><div className="mono sec-kicker">{t.nextKicker}</div><h2 id="resource-next-title">{t.nextTitle}</h2><p>{t.nextText}</p></div>
          <div className="resource-next-actions"><a className="btn ghost" href={`/${locale}#buy`}>{t.nextLink}<Icon name="arrow-right" size="sm" /></a><a className="resource-text-link" href={`/${locale}/articles`}>{t.nextFree}</a></div>
        </section>

        <section className="wrap resource-section" aria-labelledby="resource-articles-title">
          <h2 id="resource-articles-title">{t.nextFree}</h2>
          <div className="guides-grid">{ARTICLES[locale].map((article) => <a className="guide-card" href={`/${locale}/articles/${article.slug}`} key={article.slug}><div className="guide-cat-pill"><Icon name={article.icon} size="sm" /><span>{article.category}</span></div><ArticleCardVisual article={article} locale={locale} /><h3>{article.title}</h3><p>{article.subtitle}</p><span className="resource-text-link">{c.nav.guides}<Icon name="arrow-right" size="sm" /></span></a>)}</div>
        </section>
      </main>
      <footer className="site-footer"><div className="wrap footer-grid"><strong>{c.footer.copyright}</strong><div className="footer-links"><a href={`/${locale}`}>UX/UI Playbook</a><a href={`/${locale}/articles`}>{c.nav.guides}</a><a href="mailto:joynagassi@gmail.com">joynagassi@gmail.com</a></div></div></footer>
    </>
  );
}
