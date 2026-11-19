import type { Locale } from '../content';
import type { ArticleVisual } from './visual-types';

export type ArticleBlock =
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'explanation'; paragraphs: string[]; visual: ArticleVisual }
  | { type: 'diagram'; visual: ArticleVisual }
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
  slug: 'ux-design-guide' | 'ui-design-system-tokens' | 'product-design-ai-agents';
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
    metaTitle: 'Articles UX, UI et Product Design | UX/UI Playbook',
    metaDescription:
      'Trois articles pour concevoir vos interfaces : audit UX de 40 points, tokens CSS clair/sombre et workflow Product Design avec agents IA. Exemples FR.',
    kicker: 'ARTICLES · UX, UI ET PRODUCT DESIGN',
    heading: 'Parcours UX, composants UI et travail avec les agents IA.',
    lede:
      'L’article UX examine les informations à conserver pendant une tâche, les erreurs et les méthodes d’observation. L’article UI décrit les rôles typographiques, les couleurs et les espacements, puis leur traduction en tokens CSS. L’article Product Design suit le cadrage et la revue du travail confié à un agent. Vous y trouverez les explications, les exemples et les modèles à copier pour préparer chaque étape ; les sources sont regroupées à la fin de chaque article.',
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
    metaTitle: 'UX, UI and Product Design Articles | UX/UI Playbook',
    metaDescription:
      'Three articles for designing interfaces: a 40-point UX audit, light/dark CSS tokens and a Product Design workflow for AI agents. Practical examples.',
    kicker: 'ARTICLES · UX, UI AND PRODUCT DESIGN',
    heading: 'UX journeys, UI components and work with AI agents.',
    lede:
      'The UX article examines information needed throughout a task, errors and observation methods. The UI article describes type roles, colour and spacing, then translates them into CSS tokens. The Product Design article follows the scoping and review of work delegated to an agent. Explanations, examples and templates support preparation for each stage; references are collected at the end of each article.',
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
