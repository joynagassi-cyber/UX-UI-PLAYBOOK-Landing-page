import type { ArticleData } from '@/i18n/articles';
import type { Locale } from '@/i18n/content';

/** Contextual reading links stay inside the current language's article collection. */
export function articleHref(
  locale: Locale,
  slug: ArticleData['slug'],
  sectionId?: string,
): string {
  const fragment = sectionId ? `#${encodeURIComponent(sectionId)}` : '';
  return `/${locale}/articles/${slug}${fragment}`;
}
