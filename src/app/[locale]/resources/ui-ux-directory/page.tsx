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
const FREE_STORES = {
  fr: 'https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr',
  en: 'https://joyccelight.gumroad.com/l/free-ui-ux-directory-en',
} as const;

const COPY = {
  fr: {
    metaTitle: 'Répertoire UI/UX gratuit · 54 pages (0 $ sur Gumroad)',
    metaDescription: 'Répertoire UI/UX gratuit de Joy N. : 54 pages, 51 fiches, 75 liens commentés, 20 aperçus et une fiche de décision. FR et EN, 0 $ sur Gumroad.',
    skip: 'Aller au contenu',
    breadcrumbCurrent: 'Répertoire UI/UX gratuit',
    kicker: 'LIVRE GRATUIT · DISTRIBUÉ SUR GUMROAD',
    h1: 'Répertoire UI/UX gratuit',
    lead: 'Un livre de 54 pages pour choisir des ressources UI/UX sans collectionner des liens au hasard : 51 fiches classées en 6 familles, 75 liens commentés et 20 aperçus de sites réels. Le site présente le livre ; le téléchargement se fait sur Gumroad, à 0 $.',
    coverAlt: 'Couverture du Répertoire UI/UX gratuit, édition française',
    facts: [
      ['54', 'pages A4'],
      ['51', 'fiches de ressources'],
      ['75', 'liens commentés'],
      ['20', 'aperçus de sites'],
      ['3', 'pages de fiche de décision'],
    ],
    editionsHeading: 'Les deux éditions',
    editionsLead: 'Chaque édition est un produit Gumroad séparé, au prix de 0 $. Choisissez la langue du texte ; les captures gardent la langue d’origine des sites présentés.',
    contentsHeading: 'Les 6 familles du répertoire',
    families: ['Couleurs et thèmes', 'Typographie', 'Icônes', 'Composants et kits', 'Graphiques de données', 'Illustrations et 3D'],
    notesHeading: 'Bon à savoir',
    notes: [
      'Aucun fichier n’est téléchargé depuis ce site : Gumroad sert le ZIP de chaque édition.',
      'Chaque fiche indique quoi vérifier avant d’adopter une ressource : licence, limites et usage prévu.',
      'Les captures sont des aperçus éditoriaux du lot fourni le 2026-11-19, non vérifiés ici. Une capture ne prouve ni les droits, ni les tarifs, ni le fonctionnement actuel d’un service.',
      'Le livre se termine par une présentation du Playbook payant ; ses fichiers ne font pas partie du téléchargement gratuit.',
    ],
    paidLead: 'Pour la méthode complète : ',
    paidLink: 'découvrir le UX/UI Playbook (29 $ USD, paiement unique)',
  },
  en: {
    metaTitle: 'Free UI/UX Directory · 54-page book ($0 on Gumroad)',
    metaDescription: 'Free UI/UX Directory by Joy N.: 54 pages, 51 entries, 75 annotated links, 20 previews and a decision worksheet. FR and EN editions, $0 on Gumroad.',
    skip: 'Skip to content',
    breadcrumbCurrent: 'Free UI/UX Directory',
    kicker: 'FREE BOOK · DISTRIBUTED ON GUMROAD',
    h1: 'Free UI/UX Directory',
    lead: 'A 54-page book for choosing UI/UX resources without collecting random links: 51 entries in 6 families, 75 annotated links and 20 previews of real sites. This page presents the book; the download happens on Gumroad, at $0.',
    coverAlt: 'Cover of the Free UI/UX Directory, English edition',
    facts: [
      ['54', 'A4 pages'],
      ['51', 'resource entries'],
      ['75', 'annotated links'],
      ['20', 'site previews'],
      ['3', 'decision worksheet pages'],
    ],
    editionsHeading: 'The two editions',
    editionsLead: 'Each edition is a separate Gumroad product priced at $0. Pick the language of the text; screenshots keep the original language of the sites they show.',
    contentsHeading: 'The 6 directory families',
    families: ['Colors and themes', 'Typography', 'Icons', 'Components and kits', 'Data charts', 'Illustrations and 3D'],
    notesHeading: 'Good to know',
    notes: [
      'No file is downloaded from this website: Gumroad serves each edition ZIP.',
      'Every entry states what to check before adopting a resource: license, limits and intended use.',
      'Screenshots are editorial previews from the batch supplied on 2026-11-19, not independently verified. A screenshot proves neither rights, pricing nor current functionality of a service.',
      'The book ends with a presentation of the paid Playbook; its files are not part of the free download.',
    ],
    paidLead: 'For the complete method: ',
    paidLink: 'discover the UX/UI Playbook ($29 USD, one-time payment)',
  },
} as const;

const EDITIONS = [
  {
    id: 'fr' as Locale,
    name: { fr: 'Édition française', en: 'French edition' },
    items: {
      fr: ['PDF de 54 pages et version Markdown', 'Fiche de décision A4 de 3 pages (PDF et Markdown)', 'Grille de sélection CSV'],
      en: ['54-page PDF and Markdown version', '3-page A4 decision worksheet (PDF and Markdown)', 'CSV selection grid'],
    },
    price: { fr: '0 $', en: '$0' },
    cta: { fr: 'Obtenir l’édition française sur Gumroad', en: 'Get the French edition on Gumroad' },
  },
  {
    id: 'en' as Locale,
    name: { fr: 'English edition', en: 'English edition' },
    items: {
      fr: ['PDF de 54 pages et version Markdown', 'Fiche de décision A4 de 3 pages (PDF et Markdown)', 'Grille de sélection CSV'],
      en: ['54-page PDF and Markdown version', '3-page A4 decision worksheet (PDF and Markdown)', 'CSV selection grid'],
    },
    price: { fr: '0 $', en: '$0' },
    cta: { fr: 'Obtenir l’édition anglaise sur Gumroad', en: 'Get the English edition on Gumroad' },
  },
];

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
  const url = `${SITE_URL}/${locale}${PATH}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      authorJsonLd(locale),
      {
        '@type': 'WebPage', '@id': `${url}#page`, url, name: t.metaTitle, description: t.metaDescription,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'UX/UI Playbook', url: SITE_URL },
        mainEntity: { '@id': `${url}#editions` },
      },
      {
        '@type': 'ItemList', '@id': `${url}#editions`, numberOfItems: 2,
        itemListElement: EDITIONS.map((edition, index) => ({
          '@type': 'ListItem', position: index + 1,
          item: {
            '@type': 'Book', name: edition.id === 'fr' ? 'Répertoire UI/UX gratuit' : 'Free UI/UX Directory',
            inLanguage: edition.id, bookFormat: 'https://schema.org/EBook', numberOfPages: 54,
            isAccessibleForFree: true, url: FREE_STORES[edition.id],
            author: { '@id': `${SITE_URL}/#joy-n` },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: FREE_STORES[edition.id] },
          },
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
          <span aria-current="page">{t.breadcrumbCurrent}</span>
        </nav>

        <div className="mono sec-kicker">{t.kicker}</div>
        <h1 style={{ marginTop: 10 }}>{t.h1}</h1>
        <p style={{ maxWidth: '65ch', marginTop: 14 }}>{t.lead}</p>

        <img
          src={`/images/free-directory/cover-${locale}.jpg`}
          width={1280}
          height={720}
          alt={t.coverAlt}
          style={{ width: '100%', height: 'auto', borderRadius: 16, marginTop: 24 }}
        />

        <div className="notion-stats-row" style={{ marginTop: 24 }}>
          {t.facts.map(([value, label]) => (
            <div key={label} className="notion-stat-card">
              <div className="notion-stat-val"><TabularText>{value}</TabularText></div>
              <div className="notion-stat-label">{label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 40 }}>{t.editionsHeading}</h2>
        <p style={{ maxWidth: '65ch', marginTop: 10 }}>{t.editionsLead}</p>
        <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
          {EDITIONS.map((edition) => (
            <article key={edition.id} className="notion-stat-card" style={{ textAlign: 'left' }}>
              <h3 lang={edition.id}>{edition.name[locale]}</h3>
              <ul style={{ margin: '10px 0 14px', paddingLeft: 20 }}>
                {edition.items[locale].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p style={{ fontWeight: 700, marginBottom: 12 }}>{edition.price[locale]}</p>
              <a
                className="btn primary"
                href={FREE_STORES[edition.id]}
                target="_blank"
                rel="noopener noreferrer"
                hrefLang={edition.id}
                lang={edition.id}
              >
                <span>{edition.cta[locale]}</span>
                <Icon name="arrow-up-right" size="sm" />
              </a>
            </article>
          ))}
        </div>

        <h2 style={{ marginTop: 40 }}>{t.contentsHeading}</h2>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          {t.families.map((family) => <li key={family}>{family}</li>)}
        </ul>

        <h2 style={{ marginTop: 40 }}>{t.notesHeading}</h2>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          {t.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>

        <p style={{ marginTop: 32 }}>
          {t.paidLead}
          <a href={`/${locale}`}>{t.paidLink}</a>
        </p>
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
