import type { Locale } from './content';
import type { ArticleData } from './articles/types';
import { ARTICLES_FR } from './articles/fr';
import { ARTICLES_EN } from './articles/en';
import catalog from './article-catalog.json';

export type {
  ArticleBlock,
  ArticleSection,
  ArticleData,
  ArticleReference,
  ArticlesIndexCopy,
} from './articles/types';
export { ARTICLES_UI } from './articles/types';

export const ARTICLE_SLUGS = Object.keys(catalog) as Array<keyof typeof catalog>;

export const ARTICLES: Record<Locale, ArticleData[]> = {
  fr: ARTICLES_FR,
  en: ARTICLES_EN,
};

export function getArticleBySlug(locale: Locale, slug: string): ArticleData | undefined {
  return ARTICLES[locale].find((a) => a.slug === slug);
}
