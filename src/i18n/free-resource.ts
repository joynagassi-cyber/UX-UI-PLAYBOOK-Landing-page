import type { Locale } from '@/i18n/content';
import catalog from '../../products/ui-ux-directory/catalogue.json';
import manifest from '../../products/ui-ux-directory/manifest.json';
import type { IconName } from '@/components/Icon';

export const FREE_CATALOG = catalog;
export const FREE_MANIFEST = manifest;

export function resourceSize(bytes: number, locale: Locale): string {
  const large = bytes >= 1024 * 1024;
  const value = bytes / (large ? 1024 * 1024 : 1024);
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)} ${locale === 'fr' ? (large ? 'Mio' : 'Kio') : (large ? 'MiB' : 'KiB')}`;
}

const EN_CATEGORIES = [
  { name: 'Colors and themes', purpose: 'Compare palettes on real text, surfaces and component states.', question: 'Which text/background pairs remain readable in both themes?' },
  { name: 'Typography', purpose: 'Try families, weights and sizes with the content you actually use.', question: 'Do the accents, numbers, long labels and hosting conditions fit?' },
  { name: 'Icons', purpose: 'Choose a coherent family and symbols people can understand.', question: 'Do the names exist, and do important actions keep their text labels?' },
  { name: 'Components and kits', purpose: 'Choose a starting point you can integrate and maintain.', question: 'Which behaviors and updates will become your responsibility?' },
  { name: 'Data charts', purpose: 'Explain a question and its data without hiding units or limitations.', question: 'Does the chart have units, a legend and a text alternative?' },
  { name: 'Illustrations and 3D', purpose: 'Find a useful visual without forgetting rights, loading or alternatives.', question: 'Does the visual explain something rather than slow the page down?' },
];

export function resourceCategories(locale: Locale) {
  return catalog.categories.map((category, index) => ({
    ...category,
    ...(locale === 'en' ? EN_CATEGORIES[index] : {}),
    icon: category.icon as IconName,
    entries: catalog.entries.filter((entry) => entry.category === category.id),
  }));
}

export const FREE_UI = {
  fr: {
    nav: 'Gratuit',
    promoKicker: 'POUR COMMENCER · RESSOURCE GRATUITE',
    promoTitle: 'Vos ressources UI/UX, dans un seul répertoire.',
    promoText: 'Palettes, polices, icônes, composants, graphiques et visuels : 51 fiches pour comparer les options et garder une trace de vos choix.',
    promoLink: 'Découvrir le répertoire gratuit',
    language: 'Fichiers en français · PDF + Markdown + grille de décision',
    title: 'Le répertoire UI/UX gratuit.',
    kicker: 'UNE PETITE SÉLECTION, DES CHOIX DOCUMENTÉS',
    lede: '51 fiches pour choisir vos ressources sans collectionner les onglets. Pour les non-designers, les développeurs et les personnes qui travaillent avec un agent IA.',
    metaTitle: 'Répertoire UI/UX gratuit : 51 fiches + PDF et grille',
    metaDescription: 'Téléchargez le répertoire UI/UX gratuit : 51 fiches, 75 liens, PDF et Markdown en français, avec une grille pour documenter vos choix de ressources.',
    entries: 'fiches',
    categories: 'familles',
    links: 'liens de ressources',
    download: 'Télécharger le kit gratuit',
    gumroad: 'Obtenir gratuitement sur Gumroad',
    directNote: '0 € · Téléchargement direct, sans email demandé sur ce site.',
    gumroadNote: 'Entrez 0 sur Gumroad pour le télécharger gratuitement. Aucun abonnement requis.',
    viewPdf: 'Voir le guide PDF (FR)',
    readDirectory: 'Explorer les 6 familles',
    coverAlt: 'Couverture du Répertoire UI/UX gratuit : 51 fiches, 6 familles, 75 liens, édition française.',
    coverCaption: 'Une ressource autonome. Le manuel et le kit payants du Playbook ne sont pas inclus.',
    insideKicker: 'DANS LE TÉLÉCHARGEMENT',
    insideTitle: 'Lire, comparer, puis consigner.',
    files: [
      { icon: 'book-open', title: 'Un guide PDF de 34 pages', text: 'Les 51 fiches, leurs liens cliquables et les points de vigilance, classés en 6 familles.' },
      { icon: 'file-text', title: 'La version Markdown', text: 'Le contenu éditorial du guide dans un format texte, avec un brief à adapter pour votre agent IA.' },
      { icon: 'list-tree', title: 'Une fiche de décision + un CSV', text: '3 pages A4 à imprimer, une fiche Markdown modifiable et 6 lignes de familles à compléter dans un tableur.' },
    ],
    archiveNote: 'Le ZIP contient 7 fichiers, dont le mode d’emploi et les notices. Aucun pack de police, d’icônes ou d’illustrations tiers n’est redistribué.',
    howKicker: 'MODE D’EMPLOI',
    howTitle: 'Commencez par un écran, pas par un catalogue.',
    steps: [
      { title: 'Définir le besoin', text: 'Choisissez la plateforme, la tâche principale et une contrainte : budget, hébergement, données ou appareils.' },
      { title: 'Comparer peu d’options', text: 'Retenez au maximum deux pistes par famille et gardez les mêmes textes, états et données pour les comparer.' },
      { title: 'Vérifier sur le projet', text: 'Lisez la licence, essayez les états, le clavier et les contrastes. Mesurez le chargement au lieu de reprendre une promesse marketing.' },
      { title: 'Garder la décision', text: 'Notez la source, la raison du choix, les tests restants, la personne responsable et la date de relecture.' },
    ],
    directoryKicker: 'LE SOMMAIRE DU GUIDE',
    directoryTitle: 'Six familles. Les sources à portée de main.',
    directoryText: 'Ouvrez une famille pour voir les fiches et leurs destinations. Certaines fiches regroupent plusieurs sites : 75 liens ne signifie pas 75 outils distincts.',
    official: 'Consulter la source',
    sampleKicker: 'APERÇU ÉDITORIAL',
    sampleTitle: 'Pas seulement une liste de liens.',
    sampleText: 'Chaque fiche donne un usage pour trois profils et un point à vérifier. Voici trois extraits ; le PDF et le Markdown contiennent les 51 fiches complètes.',
    profiles: ['Non-designer', 'Développeur', 'Avec un agent IA'],
    watch: 'À vérifier',
    rightsTitle: 'Gratuit pour vous. Pas une licence universelle.',
    rightsText: 'Le guide est gratuit, pas nécessairement chaque service cité. Les tarifs, droits et disponibilités évoluent. La sélection n’est ni un audit juridique, ni une garantie de performance ou d’accessibilité. Vérifiez les conditions du fichier ou du service retenu.',
    rightsLink: 'Lire les sources et les limites dans le guide',
    faqTitle: 'Avant de télécharger',
    faqs: [
      { q: 'Le téléchargement est-il vraiment gratuit ?', a: 'Oui. Le kit est proposé à 0. Il ne contient pas le Playbook payant et ne nécessite pas de l’acheter. Le téléchargement direct sur ce site ne demande pas d’adresse email.' },
      { q: 'Tous les outils du répertoire sont-ils gratuits ?', a: 'Non. Certaines ressources sont gratuites, d’autres ont des offres payantes ou des licences conditionnelles. Les fiches vous invitent à contrôler les droits, les formats et les coûts à la source ; aucun abonnement tiers n’est inclus.' },
      { q: 'Les fichiers existent-ils en anglais ?', a: 'Cette première édition des fichiers est en français. La page de présentation existe en français et en anglais, mais les deux téléchargent le même kit français. Le Playbook payant possède, lui, deux éditions distinctes.' },
      { q: 'Qu’est-ce qui change par rapport au Playbook ?', a: 'Le répertoire aide à choisir des ressources et à noter une décision. Le Playbook payant traite la préparation et la revue des interfaces, avec un manuel, un kit de fiches A4 et une archive de fichiers. Ce sont deux produits distincts.' },
      { q: 'Les liens et licences ont-ils tous été audités ?', a: 'Non. L’édition corrige des points ciblés à partir de documents officiels, notamment pour ApexCharts, unDraw et Storyset, mais ne revendique pas un contrôle exhaustif des 75 liens. Des pistes sont signalées comme non testées dans leurs fiches.' },
    ],
    nextKicker: 'POUR ALLER PLUS LOIN · OFFRE DISTINCTE',
    nextTitle: 'Du choix des ressources à la revue d’une interface.',
    nextText: 'Le UX/UI Playbook réunit le manuel français de 148 pages, le kit de 12 fiches A4 et l’archive de 21 fichiers. Pour préparer les écrans, leurs états et leur revue avec ou sans agent IA.',
    nextLink: 'Découvrir le Playbook · 29 USD',
    nextFree: 'Lire les articles gratuits',
    bottomTitle: 'Gardez le répertoire pour votre prochain écran.',
    edition: 'Version 1.0 · Édition du 18 novembre 2026 · Joy N. / Joyccelight',
    markdown: 'Télécharger le Markdown seul (FR)',
  },
  en: {
    nav: 'Free guide',
    promoKicker: 'START HERE · FREE RESOURCE',
    promoTitle: 'Your UI/UX resources, in one directory.',
    promoText: 'Palettes, type, icons, components, charts and visuals: 51 entries to compare options and keep a record of your decisions.',
    promoLink: 'Explore the free directory',
    language: 'French-language files · PDF + Markdown + decision worksheet',
    title: 'The free UI/UX directory.',
    kicker: 'A SMALL SELECTION, DOCUMENTED DECISIONS',
    lede: '51 entries to help you choose resources without collecting browser tabs. For non-designers, developers and people working with an AI agent. The downloadable files are in French.',
    metaTitle: 'Free UI/UX directory: 51 entries + French PDF and worksheet',
    metaDescription: 'Get the free UI/UX directory: 51 entries, 75 links, a French PDF and Markdown guide, plus a worksheet to document your resource choices and checks.',
    entries: 'entries',
    categories: 'categories',
    links: 'resource links',
    download: 'Download the free kit (French)',
    gumroad: 'Get it free on Gumroad (French)',
    directNote: 'Free · Direct download, with no email requested on this site.',
    gumroadNote: 'Enter 0 on Gumroad to download it for free. No subscription required.',
    viewPdf: 'Read the PDF guide (French)',
    readDirectory: 'Explore the 6 categories',
    coverAlt: 'French cover of the free UI/UX Directory: 51 entries, 6 categories and 75 links.',
    coverCaption: 'A standalone resource. The paid Playbook manual and kit are not included.',
    insideKicker: 'IN THE DOWNLOAD',
    insideTitle: 'Read, compare, then record.',
    files: [
      { icon: 'book-open', title: 'A 34-page PDF guide', text: 'All 51 entries, clickable links and caveats, organized into 6 categories. Written in French.' },
      { icon: 'file-text', title: 'The Markdown edition', text: 'The editorial guide as editable text, including a brief to adapt for your AI agent. Written in French.' },
      { icon: 'list-tree', title: 'A decision worksheet + CSV', text: '3 printable A4 pages, an editable Markdown worksheet and 6 category rows to fill in a spreadsheet. French labels.' },
    ],
    archiveNote: 'The ZIP contains 7 files, including instructions and license notices. It does not redistribute any third-party font, icon or illustration packs.',
    howKicker: 'HOW TO USE IT',
    howTitle: 'Start with one screen, not a catalog.',
    steps: [
      { title: 'Define the need', text: 'Choose the platform, main task and one constraint: budget, hosting, data or devices.' },
      { title: 'Compare a few options', text: 'Keep no more than two candidates per category and compare them with the same text, states and data.' },
      { title: 'Check in your project', text: 'Read the license and try states, keyboard access and contrast. Measure loading instead of repeating a marketing promise.' },
      { title: 'Record the decision', text: 'Keep the source, reason for choosing it, remaining tests, responsible person and review date.' },
    ],
    directoryKicker: 'GUIDE CONTENTS',
    directoryTitle: 'Six categories. The sources at hand.',
    directoryText: 'Open a category to see its entries and destinations. Some entries group several sites, so 75 links does not mean 75 distinct tools.',
    official: 'Visit the source',
    sampleKicker: 'EDITORIAL PREVIEW',
    sampleTitle: 'More than a list of links.',
    sampleText: 'Every entry includes a use for three profiles and a caveat. These three excerpts are translated here; the PDF and Markdown contain all 51 full entries in French.',
    profiles: ['Non-designer', 'Developer', 'With an AI agent'],
    watch: 'Check first',
    rightsTitle: 'Free to download. Not a universal license.',
    rightsText: 'The guide is free; not every service in it is. Prices, rights and availability change. This selection is not a legal audit or an accessibility or performance guarantee. Check the terms for the exact file or service you choose.',
    rightsLink: 'Read the sources and limitations in the French guide',
    faqTitle: 'Before you download',
    faqs: [
      { q: 'Is it really free?', a: 'Yes. The kit is available for 0 and does not require buying the paid Playbook. Direct downloads from this site do not ask for an email address.' },
      { q: 'Are all the listed tools free?', a: 'No. Some are free, while others have paid plans or conditional licenses. Each entry asks you to check rights, formats and costs at the source. No third-party subscriptions are included.' },
      { q: 'Are the downloadable files available in English?', a: 'This first file edition is in French. The presentation page is bilingual, but both languages download the same French kit. The paid Playbook has two separate language editions.' },
      { q: 'How is this different from the Playbook?', a: 'The directory helps you choose resources and record a decision. The paid Playbook covers preparing and reviewing interfaces with a manual, A4 worksheets and a file archive. They are separate products.' },
      { q: 'Have all the links and licenses been audited?', a: 'No. This edition makes targeted corrections using official documents, including ApexCharts, unDraw and Storyset. It does not claim an exhaustive check of all 75 links. Some candidates are explicitly marked as untested in the guide.' },
    ],
    nextKicker: 'GO FURTHER · SEPARATE PAID PRODUCT',
    nextTitle: 'From choosing resources to reviewing an interface.',
    nextText: 'The English UX/UI Playbook includes a 139-page manual, a 12-sheet A4 kit and a 21-file archive. Prepare screens, their states and their review, with or without an AI agent.',
    nextLink: 'Explore the Playbook · $29 USD',
    nextFree: 'Read the free articles',
    bottomTitle: 'Keep the directory for your next screen.',
    edition: 'Version 1.0 · November 18, 2026 edition · Joy N. / Joyccelight',
    markdown: 'Download Markdown only (French)',
  },
} as const;

const SAMPLE_EN = [
  { id: '1.5', description: 'Radix Colors organizes each scale into twelve steps and documents typical uses, with explicit exceptions. Map these to your product’s roles, then check the actual text/background pairs. A scale is a starting point, not an accessibility certificate.', nonDesigner: 'Use documented roles instead of choosing every shade in isolation.', developer: 'Map scale steps to your tokens and component states.', agent: 'Supply the step-to-role mapping and check the pairs actually rendered.', watch: 'The documentation describes uses, not a general contrast guarantee.' },
  { id: '3.3', description: 'Lucide provides SVG icons with a customizable stroke. A coherent family and discoverable names help keep a vocabulary consistent; they do not prevent an AI agent from making mistakes. Keep text labels for important actions and verify the icon names in the installed version.', nonDesigner: 'Keep one family and test whether people understand the symbols.', developer: 'Import the icons you use and retain the package’s license notice.', agent: 'Use names from the installed version and verify generated imports.', watch: 'The reviewed package has an ISC license with inherited Feather notices. Keep the full notice.' },
  { id: '5.3', description: 'ApexCharts supports interactive charts, but capability and permission are separate questions. Its current licensing distinguishes conditional Community, Commercial and OEM/redistribution regimes. Do not assume a working example grants free use to every organization.', nonDesigner: 'Compare the interactions you need without assuming every plan is free.', developer: 'Confirm the applicable license before adding the dependency.', agent: 'Read the selected version and license instead of installing it automatically.', watch: 'Payment may be required depending on the organization and usage. The current license page is the reference.' },
];

export function resourceSamples(locale: Locale) {
  return ['1.5', '3.3', '5.3'].map((id, index) => {
    const entry = catalog.entries.find((candidate) => candidate.id === id)!;
    return { ...entry, ...(locale === 'en' ? SAMPLE_EN[index] : {}) };
  });
}
