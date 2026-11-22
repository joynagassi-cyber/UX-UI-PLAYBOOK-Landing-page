import type { ArticleData } from '@/i18n/articles';

export type ArticleSummary = Pick<ArticleData, 'slug' | 'icon' | 'category' | 'readTime' | 'title' | 'subtitle'>;

// Related cards do not need the other three complete guides in the client RSC
// payload. Keep their visible content and links, not hidden duplicate bodies.
export function articleSummary(article: ArticleData): ArticleSummary {
  const { slug, icon, category, readTime, title, subtitle } = article;
  return { slug, icon, category, readTime, title, subtitle };
}
