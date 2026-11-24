import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { GumroadButton } from '@/components/GumroadButton';
import { ThemeAndLangControls } from '@/components/ThemeAndLangControls';
import { TabularText } from '@/components/TabularText';
import { CONTENT, type Locale } from '@/i18n/content';
import { SITE_URL } from '@/lib/site-config';
import { authorJsonLd, serializeJsonLd } from '@/lib/structured-data';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

const PATH = '/resources/ui-ux-directory';
const STORE = {
  fr: 'https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr',
  en: 'https://joyccelight.gumroad.com/l/free-ui-ux-directory-en',
} as const;

const COPY = {
  fr: {
    metaTitle: 'Répertoire UI/UX gratuit · 54 pages (0 $ sur Gumroad)',
    metaDescription: 'Répertoire UI/UX gratuit de Joy N. : 54 pages, 51 fiches, 75 liens commentés, 20 aperçus et une fiche de décision. FR et EN, 0 $ sur Gumroad.',
    skip: 'Aller au contenu',
    breadcrumb: 'Répertoire UI/UX gratuit',
    kicker: 'LIVRE GRATUIT · ÉDITION FRANÇAISE',
    h1: 'Le Répertoire UI/UX gratuit',
    lead: 'Cinquante-et-une ressources UI/UX présentées une à une, avec ce qu’elles font bien, leurs limites et le point à vérifier avant de les adopter. Le livre se lit comme un catalogue raisonné : chaque fiche aide à comparer, puis la fiche de décision garde la trace du choix.',
    summary: 'En résumé : un livre PDF gratuit de 54 pages, 51 fiches de ressources classées en 6 familles, 75 liens commentés, 20 aperçus de sites et une fiche de décision A4 de 3 pages. L’édition française est distribuée sur Gumroad au prix de 0 $.',
    coverAlt: 'Couverture du Répertoire UI/UX gratuit, édition française',
    priceFree: '0 $',
    priceDetail: 'sur Gumroad, sans abonnement',
    ctaDownload: 'Télécharger gratuitement sur Gumroad',
    ctaSecondary: 'Voir les articles du site',
    facts: [
      ['54', 'pages A4'],
      ['51', 'fiches de ressources'],
      ['75', 'liens commentés'],
      ['20', 'aperçus de sites'],
      ['3', 'pages de fiche de décision'],
    ],
    insideHeading: 'Ce que contient le répertoire',
    insideLead: 'Six familles couvrent les choix qui reviennent dans presque chaque projet d’interface.',
    families: [
      ['Couleurs et thèmes', 'Comparer une palette sur des textes, des surfaces et des états réels.'],
      ['Typographie', 'Examiner les familles, les graisses et les tailles sur vos propres contenus.'],
      ['Icônes', 'Choisir une famille cohérente et des symboles compréhensibles.'],
      ['Composants et kits', 'Sélectionner une base compatible avec votre plateforme et votre maintenance.'],
      ['Graphiques de données', 'Présenter une question et des données sans masquer les unités ni les limites.'],
      ['Illustrations et 3D', 'Trouver un visuel utile sans oublier les droits, le poids et l’alternative.'],
    ],
    entryHeading: 'Une fiche par ressource',
    entryLead: 'Chaque fiche présente le service, son usage le plus solide et le point de vigilance associé. Vingt fiches montrent en plus un aperçu du site, pour juger l’interface avant même de cliquer.',
    entryPoints: [
      'Ce que la ressource fait, et pour quel type de projet.',
      'Le point à vérifier : licence, limite gratuite, maintenance ou accessibilité.',
      'Le lien officiel, commenté plutôt que simplement listé.',
    ],
    filesHeading: 'Le téléchargement, concrètement',
    filesLead: 'Le ZIP de l’édition française, servi par Gumroad, contient de quoi lire, comparer et documenter un choix.',
    files: [
      ['Le livre en PDF', '54 pages A4, sommaire cliquable, fiches et aperçus.'],
      ['Le livre en Markdown', 'Le même texte, facile à rechercher et à citer dans vos notes.'],
      ['La fiche de décision', '3 pages A4, en PDF et en Markdown, pour consigner le choix et ses raisons.'],
      ['La grille de sélection', 'Un CSV à remplir ressource par ressource pendant la comparaison.'],
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      ['Combien coûte le Répertoire UI/UX ?', 'L’édition française coûte 0 $ sur Gumroad. Aucun abonnement et aucune contribution obligatoire : le téléchargement se fait au prix affiché de 0 $.'],
      ['Que contient le fichier téléchargé ?', 'Un ZIP avec le livre en PDF de 54 pages, sa version Markdown, la fiche de décision de 3 pages en PDF et Markdown, et une grille de sélection au format CSV.'],
      ['À qui s’adresse ce répertoire ?', 'Aux personnes qui conçoivent ou développent des interfaces et veulent choisir leurs ressources sur des critères explicites : usage, licence, limites et maintenance.'],
      ['Quelle différence avec le UX/UI Playbook ?', 'Le répertoire gratuit aide à choisir des ressources externes. Le Playbook, à 29 $ USD, est le manuel complet de la méthode : 182 pages, 120 sections, un kit A4 et les fichiers de travail.'],
      ['Dans quelle langue sont les captures ?', 'Le texte du livre est en français. Les captures gardent la langue d’origine des sites présentés, comme dans un catalogue illustré.'],
    ],
    finalHeading: 'Le répertoire vous attend sur Gumroad',
    finalLead: 'L’édition française est disponible au prix de 0 $. La page Gumroad présente le fichier et lance le téléchargement.',
    furtherLead: 'La méthode complète est dans ',
    furtherLink: 'le UX/UI Playbook (29 $ USD, paiement unique)',
  },
  en: {
    metaTitle: 'Free UI/UX Directory · 54-page book ($0 on Gumroad)',
    metaDescription: 'Free UI/UX Directory by Joy N.: 54 pages, 51 entries, 75 annotated links, 20 previews and a decision worksheet. FR and EN editions, $0 on Gumroad.',
    skip: 'Skip to content',
    breadcrumb: 'Free UI/UX Directory',
    kicker: 'FREE BOOK · ENGLISH EDITION',
    h1: 'The Free UI/UX Directory',
    lead: 'Fifty-one UI/UX resources presented one by one, with what they do well, their limits and the point to check before adopting them. The book reads like a reasoned catalogue: every entry helps a comparison, and the decision worksheet keeps a record of the choice.',
    summary: 'In short: a free 54-page PDF book, 51 resource entries in 6 families, 75 annotated links, 20 site previews and a 3-page A4 decision worksheet. The English edition is distributed on Gumroad at $0.',
    coverAlt: 'Cover of the Free UI/UX Directory, English edition',
    priceFree: '$0',
    priceDetail: 'on Gumroad, no subscription',
    ctaDownload: 'Download free on Gumroad',
    ctaSecondary: 'Browse the site articles',
    facts: [
      ['54', 'A4 pages'],
      ['51', 'resource entries'],
      ['75', 'annotated links'],
      ['20', 'site previews'],
      ['3', 'decision worksheet pages'],
    ],
    insideHeading: 'What the Directory covers',
    insideLead: 'Six families cover the choices that come back in almost every interface project.',
    families: [
      ['Colors and themes', 'Compare a palette on real text, surfaces and states.'],
      ['Typography', 'Examine families, weights and sizes using your own content.'],
      ['Icons', 'Choose a coherent family and understandable symbols.'],
      ['Components and kits', 'Choose a base compatible with your platform and maintenance needs.'],
      ['Data charts', 'Explain a question and its data without hiding units or limits.'],
      ['Illustrations and 3D', 'Find a useful visual without forgetting rights, loading or alternatives.'],
    ],
    entryHeading: 'One entry per resource',
    entryLead: 'Every entry presents the service, its strongest use and the point of caution that comes with it. Twenty entries also show a preview of the site, so the interface can be judged before any click.',
    entryPoints: [
      'What the resource does, and for which kind of project.',
      'The point to check: license, free-tier limits, maintenance or accessibility.',
      'The official link, annotated rather than merely listed.',
    ],
    filesHeading: 'The download, concretely',
    filesLead: 'The English edition ZIP, served by Gumroad, contains what is needed to read, compare and document a choice.',
    files: [
      ['The book as PDF', '54 A4 pages, clickable contents, entries and previews.'],
      ['The book as Markdown', 'The same text, easy to search and quote in your notes.'],
      ['The decision worksheet', '3 A4 pages, as PDF and Markdown, to record the choice and its reasons.'],
      ['The selection grid', 'A CSV to fill in resource by resource during the comparison.'],
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      ['How much does the UI/UX Directory cost?', 'The English edition costs $0 on Gumroad. No subscription and no required contribution: the download happens at the displayed price of $0.'],
      ['What does the download contain?', 'A ZIP with the 54-page book as PDF, its Markdown version, the 3-page decision worksheet as PDF and Markdown, and a selection grid in CSV format.'],
      ['Who is this directory for?', 'People who design or build interfaces and want to choose resources on explicit criteria: use, license, limits and maintenance.'],
      ['How does it differ from the UX/UI Playbook?', 'The free directory helps choose external resources. The Playbook, at $29 USD, is the complete method manual: 171 pages, 120 sections, an A4 kit and the working files.'],
      ['What language are the screenshots in?', 'The book text is in English. Screenshots keep the original language of the sites they show, as in an illustrated catalogue.'],
    ],
    finalHeading: 'The Directory is waiting on Gumroad',
    finalLead: 'The English edition is available at $0. The Gumroad page presents the file and starts the download.',
    furtherLead: 'The complete method lives in ',
    furtherLink: 'the UX/UI Playbook ($29 USD, one-time payment)',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = raw === 'en' ? 'en' : 'fr';
  const t = COPY[locale];
  const image = `/og-directory-${locale}.jpg`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}${PATH}`,
      languages: { fr: `/fr${PATH}`, en: `/en${PATH}`, 'x-default': `/en${PATH}` },
    },
    openGraph: {
      type: 'website', siteName: 'UX/UI Playbook', title: t.metaTitle, description: t.metaDescription,
      locale: CONTENT[locale].meta.ogLocale, alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      url: `${SITE_URL}/${locale}${PATH}`,
      images: [{ url: image, width: 1200, height: 630, alt: t.coverAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.metaTitle, description: t.metaDescription, images: [{ url: image, alt: t.coverAlt }] },
  };
}

export default async function FreeDirectoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== 'fr' && raw !== 'en') notFound();
  const locale: Locale = raw;
  const c = CONTENT[locale];
  const t = COPY[locale];
  const store = STORE[locale];
  const url = `${SITE_URL}/${locale}${PATH}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      authorJsonLd(locale),
      {
        '@type': 'WebPage', '@id': `${url}#page`, url, name: t.metaTitle, description: t.metaDescription,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'UX/UI Playbook', url: SITE_URL },
        mainEntity: { '@id': `${url}#book` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'UX/UI Playbook', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.breadcrumb, item: url },
        ],
      },
      {
        '@type': 'Book', '@id': `${url}#book`,
        name: locale === 'fr' ? 'Répertoire UI/UX gratuit' : 'Free UI/UX Directory',
        description: t.metaDescription, inLanguage: locale,
        bookFormat: 'https://schema.org/EBook', numberOfPages: 54,
        isAccessibleForFree: true, url: store,
        author: { '@id': `${SITE_URL}/#joy-n` },
        image: `${SITE_URL}/images/free-directory/cover-${locale}.jpg`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: store },
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: t.faqs.map(([q, a]) => ({
          '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />
      <a className="sr-skip" href="#directory-content">{t.skip}</a>
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
      <nav className="site-nav" aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>
        <div className="wrap nav-inner">
          <a className="brand" href={`/${locale}`}>
            <span className="brand-mark">UP</span>
            <span>UX/UI Playbook</span>
          </a>
          <div className="nav-links">
            <a href={`/${locale}#pillars`}>{c.nav.pillars}</a>
            <a href={`/${locale}#tool`}>{c.nav.demo}</a>
            <a href={`/${locale}#inside`}>{c.nav.inside}</a>
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <a href={`/${locale}/resources/ui-ux-directory`} aria-current="page" style={{ color: 'var(--accent-ink)', fontWeight: 700 }}>{c.nav.freeDirectory}</a>
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

      <main tabIndex={-1} id="directory-content" className="notion-page-wrap">
        <nav aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} style={{ marginBottom: 18 }}>
          <a href={`/${locale}`}>UX/UI Playbook</a>
          <span aria-hidden="true"> · </span>
          <span aria-current="page">{t.breadcrumb}</span>
        </nav>

        {/* Hero: the book, its promise and the free download. */}
        <div className="mono sec-kicker">{t.kicker}</div>
        <h1 style={{ marginTop: 10 }}>{t.h1}</h1>
        <p style={{ maxWidth: '65ch', marginTop: 14, fontSize: '1.05rem', lineHeight: 1.65 }}>{t.lead}</p>
        <p style={{ maxWidth: '65ch', marginTop: 12 }}>{t.summary}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginTop: 22 }}>
          <a className="btn primary" href={store} target="_blank" rel="noopener noreferrer">
            <span>{t.ctaDownload}</span>
            <Icon name="arrow-up-right" size="sm" />
          </a>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
            <strong style={{ fontSize: '1.4rem' }}>{t.priceFree}</strong>
            <span style={{ color: 'var(--fg-2)' }}>{t.priceDetail}</span>
          </span>
          <a href={`/${locale}/articles`}>{t.ctaSecondary}</a>
        </div>

        <img
          src={`/images/free-directory/cover-${locale}.jpg`}
          width={1280}
          height={720}
          alt={t.coverAlt}
          style={{ width: '100%', height: 'auto', borderRadius: 16, marginTop: 26 }}
        />

        <div className="notion-stats-row" style={{ marginTop: 24 }}>
          {t.facts.map(([value, label]) => (
            <div key={label} className="notion-stat-card">
              <div className="notion-stat-val"><TabularText>{value}</TabularText></div>
              <div className="notion-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Contents: the six families. */}
        <h2 style={{ marginTop: 44 }}>{t.insideHeading}</h2>
        <p style={{ maxWidth: '65ch', marginTop: 10 }}>{t.insideLead}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginTop: 18 }}>
          {t.families.map(([name, purpose]) => (
            <article key={name} className="notion-stat-card" style={{ textAlign: 'left' }}>
              <h3 style={{ marginBottom: 8 }}>{name}</h3>
              <p style={{ color: 'var(--fg-2)', lineHeight: 1.55 }}>{purpose}</p>
            </article>
          ))}
        </div>

        {/* How each entry is written. */}
        <h2 style={{ marginTop: 44 }}>{t.entryHeading}</h2>
        <p style={{ maxWidth: '65ch', marginTop: 10 }}>{t.entryLead}</p>
        <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 1.7 }}>
          {t.entryPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>

        {/* The actual download contents. */}
        <h2 style={{ marginTop: 44 }}>{t.filesHeading}</h2>
        <p style={{ maxWidth: '65ch', marginTop: 10 }}>{t.filesLead}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, marginTop: 18 }}>
          {t.files.map(([name, detail]) => (
            <article key={name} className="notion-stat-card" style={{ textAlign: 'left' }}>
              <h3 style={{ marginBottom: 8 }}>{name}</h3>
              <p style={{ color: 'var(--fg-2)', lineHeight: 1.55 }}>{detail}</p>
            </article>
          ))}
        </div>

        {/* FAQ: visible answers, mirrored in FAQPage schema. */}
        <h2 style={{ marginTop: 44 }}>{t.faqHeading}</h2>
        <div className="faq-list" style={{ marginTop: 16 }}>
          {t.faqs.map(([q, a], idx) => (
            <details key={q} open={idx === 0}>
              <summary><span>{q}</span><Icon name="chevron-down" className="faq-chevron" /></summary>
              <div className="faq-answer">{a}</div>
            </details>
          ))}
        </div>

        {/* Final invitation. */}
        <section style={{ marginTop: 44, padding: '28px 24px', borderRadius: 16, background: 'var(--s2)', border: '1px solid var(--line-2)' }}>
          <h2 style={{ marginTop: 0 }}>{t.finalHeading}</h2>
          <p style={{ maxWidth: '60ch', marginTop: 10 }}>{t.finalLead}</p>
          <p style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <a className="btn primary" href={store} target="_blank" rel="noopener noreferrer">
              <span>{t.ctaDownload}</span>
              <Icon name="arrow-up-right" size="sm" />
            </a>
            <span><strong>{t.priceFree}</strong> · {t.priceDetail}</span>
          </p>
          <p style={{ marginTop: 16 }}>
            {t.furtherLead}
            <a href={`/${locale}`}>{t.furtherLink}</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <strong style={{ color: 'var(--fg)' }}>{c.footer.copyright}</strong>
          </div>
          <div className="footer-links">
            <a href={`/${locale}/articles`}>{c.nav.guides}</a>
            <GumroadButton href={c.gumroadUrl}>
              {c.footer.gumroadLinkLabel}
            </GumroadButton>
            <a href="mailto:joynagassi@gmail.com">joynagassi@gmail.com</a>
            <a
              href={`/${c.otherLocale}${PATH}`}
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
