import type { Locale } from '../content';

export type ArticleBlock =
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'quote'; tag: string; text: string }
  | {
      type: 'doDont';
      doTitle: string;
      dontTitle: string;
      doItems: string[];
      dontItems: string[];
    }
  | {
      type: 'steps';
      title: string;
      steps: Array<{ bold: string; text: string }>;
    }
  | {
      type: 'callout';
      icon: 'compass' | 'message-circle' | 'palette' | 'settings';
      title: string;
      text: string;
      tone?: 'neutral' | 'accent' | 'lime' | 'warn';
    }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'figure';
      src: string;
      alt: string;
      caption: string;
      sourceRef: string;
    }
  | {
      type: 'copyable';
      label: string;
      langTag: string;
      code: string;
      note?: string;
    }
  | {
      type: 'list';
      heading?: string;
      ordered?: boolean;
      items: Array<{ bold?: string; text: string }>;
    };

export interface ArticleSection {
  id: string;
  num: string;
  tocLabel: string;
  heading: string;
  blocks: ArticleBlock[];
}

export interface ArticleData {
  slug: 'ux-design-guide' | 'ui-design-system-tokens' | 'product-design-ai-agents';
  category: 'UX Design' | 'UI Design' | 'Product Design';
  icon: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  ogImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  title: string;
  subtitle: string;
  aeoSummaryTitle: string;
  aeoSummary: string;
  keyStats: Array<{ value: string; label: string; source: string; urls?: string[] }>;
  sections: ArticleSection[];
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaText: string;
  ctaBullets: string[];
}

export interface ArticlesIndexCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  heading: string;
  lede: string;
  readBtn: string;
  backHome: string;
  tocTitle: string;
  copyBtn: string;
  copiedBtn: string;
  sourcesBadge: string;
  relatedHeading: string;
  miniCtaTag: string;
  miniCtaTitle: string;
  miniCtaBtn: string;
}

export const ARTICLES_UI: Record<Locale, ArticlesIndexCopy> = {
  fr: {
    metaTitle: 'Dossiers UX Design, UI Design & Product Design 2026 — UX/UI Playbook',
    metaDescription:
      'Trois cours de terrain tirés du UX/UI Playbook 2026 : psychologie cognitive et audit UX 40 points, design tokens CSS et vrai Dark Mode WCAG 2.2, pipeline Product Design et facturation à l’ère des agents IA.',
    kicker: 'DOSSIERS DE TERRAIN · MÉTHODE INTÉGRALE EXTRAITE DU MANUEL',
    heading: 'Ce qui fait réellement tenir un écran : trois cours complets, zéro jargon.',
    lede:
      'Chaque dossier condense plusieurs chapitres clés du UX/UI Playbook 2026 en protocoles directement applicables : tests de diagnostic en 5 secondes, seuils chiffrés, comparatifs À faire / À éviter, clauses contractuelles et fichiers prêts à copier.',
    readBtn: 'Lire le cours complet',
    backHome: 'Retour à UX/UI Playbook',
    tocTitle: 'Sommaire du cours',
    copyBtn: 'Copier',
    copiedBtn: 'Copié !',
    sourcesBadge: 'Sources primaires datées (Annexe A5)',
    relatedHeading: 'Poursuivre avec les deux autres volets du système',
    miniCtaTag: 'MANUEL COMPLET · 29 $',
    miniCtaTitle: '148 pages A4, 12 fiches imprimables & le scanner Python des 77 règles.',
    miniCtaBtn: 'Obtenir le Playbook FR →',
  },
  en: {
    metaTitle: 'UX Design, UI Design & Product Design Field Courses 2026 — UX/UI Playbook',
    metaDescription:
      'Three deep-dive field courses from the UX/UI Playbook 2026: cognitive UX laws and the 40-point audit, CSS design tokens and halation-free Dark Mode, and deterministic AI agent product workflows.',
    kicker: 'FIELD COURSES · EXTRACTED FROM THE PLAYBOOK',
    heading: 'What actually makes a screen hold up: three complete field courses, zero fluff.',
    lede:
      'Each course distills core chapters of the UX/UI Playbook 2026 into operational craft: 5-second diagnostic tests, measured thresholds, Do / Don’t breakdowns, protective client clauses, and copy-ready repository files.',
    readBtn: 'Read full course',
    backHome: 'Back to UX/UI Playbook',
    tocTitle: 'Course contents',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    sourcesBadge: 'Dated primary sources (Appendix A5)',
    relatedHeading: 'Continue with the other two Playbook courses',
    miniCtaTag: 'COMPLETE SYSTEM · $29',
    miniCtaTitle: '139 A4 pages, 12 printable sheets & the 77-rule Python scanner.',
    miniCtaBtn: 'Get the EN Playbook →',
  },
};
