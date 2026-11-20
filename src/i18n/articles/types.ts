import type { Locale } from '../content';
import catalog from '../article-catalog.json';
import type { ArticleVisual } from './visual-types';

export type ArticleBlock =
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'explanation'; paragraphs: string[]; visual: ArticleVisual }
  | { type: 'diagram'; visual: ArticleVisual }
  | { type: 'mobileLab'; title: string; caption: string }
  | {
      type: 'readingLink';
      slug: keyof typeof catalog;
      sectionId?: string;
      label: string;
      text: string;
    }
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
      icon: 'message-circle' | 'sparkles';
      title: string;
      text: string;
      tone?: 'neutral' | 'accent' | 'lime' | 'warn';
    }
  | {
      type: 'inlineCta';
      title: string;
      text: string;
      buttonLabel: string;
    }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
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

export interface ArticleReference {
  title: string;
  url: `https://${string}`;
  publisher: string;
  date: string;
  note: string;
}

export interface ArticleData {
  slug: keyof typeof catalog;
  category: 'UX Design' | 'UI Design' | 'Product Design';
  icon: 'compass' | 'palette' | 'settings';
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  ogImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  title: string;
  subtitle: string;
  entityDefinition: string;
  aeoSummaryTitle: string;
  aeoSummary: string;
  keyStats: Array<{
    value: string;
    label: string;
    source: string;
    url?: `https://${string}`;
  }>;
  references: ArticleReference[];
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
  startLinkText: string;
  startLinkLabel: string;
  readBtn: string;
  backHome: string;
  tocTitle: string;
  copyBtn: string;
  copiedBtn: string;
  sourcesTitle: string;
  relatedHeading: string;
  miniCtaTag: string;
  miniCtaTitle: string;
  miniCtaBtn: string;
}

export const ARTICLES_UI: Record<Locale, ArticlesIndexCopy> = {
  fr: {
    metaTitle: 'Guides UX, UI et Product Design | UX/UI Playbook',
    metaDescription:
      'Comparez les rôles UX, UI et Product Design, choisissez une méthode de recherche, créez des tokens CSS et préparez la revue d’une interface générée par IA.',
    kicker: 'LES GUIDES',
    heading: 'Guides UX, UI et Product Design',
    lede:
      'Quatre guides pour comparer les responsabilités, choisir une méthode de recherche, construire des composants et revoir le travail d’un agent IA. Le cas mobile Atelier est fictif. Chaque article relie explications, exemples, modèles à copier et sources.',
    startLinkText: 'Vous cherchez d’abord à distinguer les disciplines ?',
    startLinkLabel: 'Commencer par le comparatif UX, UI et Product Design',
    readBtn: 'Lire l’article',
    backHome: 'Retour à UX/UI Playbook',
    tocTitle: 'Dans cet article',
    copyBtn: 'Copier',
    copiedBtn: 'Copié !',
    sourcesTitle: 'Sources et références',
    relatedHeading: 'À lire aussi',
    miniCtaTag: 'LE LIVRE · 29 $',
    miniCtaTitle: 'Le Playbook en français, les fiches A4 et les fichiers de travail.',
    miniCtaBtn: 'Voir le livre',
  },
  en: {
    metaTitle: 'UX, UI and Product Design Guides | UX/UI Playbook',
    metaDescription:
      'Compare UX, UI and Product Design roles, choose a research method, build CSS tokens and prepare an evidence-based review of an AI-generated interface.',
    kicker: 'THE GUIDES',
    heading: 'UX, UI and Product Design guides',
    lede:
      'Four guides to compare responsibilities, choose a research method, build components and review work delegated to an AI agent. The Atelier mobile app is fictional. Each article connects explanations, examples, copy-ready templates and references.',
    startLinkText: 'Need to distinguish the disciplines first?',
    startLinkLabel: 'Start with the UX, UI and Product Design comparison',
    readBtn: 'Read the article',
    backHome: 'Back to UX/UI Playbook',
    tocTitle: 'In this article',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    sourcesTitle: 'Sources and references',
    relatedHeading: 'Read next',
    miniCtaTag: 'THE BOOK · $29',
    miniCtaTitle: 'The English Playbook, A4 worksheets and working files.',
    miniCtaBtn: 'View the book',
  },
};
