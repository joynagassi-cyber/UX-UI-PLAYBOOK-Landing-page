import { ArticleVisualScene } from '@/components/ArticleVisual';
import type { ArticleData } from '@/i18n/articles';
import type { Locale } from '@/i18n/content';
import type { ArticleVisual } from '@/i18n/articles/visual-types';

/** Decorative preview; the linked article title provides the accessible description. */
export function ArticleCardVisual({ article, locale }: { article: ArticleData; locale: Locale }) {
  const fr = locale === 'fr';
  const visual: ArticleVisual = article.slug === 'ux-ui-product-design' ? {
    kind: 'discipline-map', title: article.title, caption: '',
    labels: ['UX', 'UI', 'Product'],
  } : {
    kind: article.category === 'UX Design' ? 'states' : article.category === 'UI Design' ? 'themes' : 'pipeline',
    title: article.category,
    caption: '',
    labels: article.category === 'UX Design'
      ? (fr ? ['Vide', 'Chargement', 'Idéal', 'Partiel', 'Erreur'] : ['Empty', 'Loading', 'Ideal', 'Partial', 'Error'])
      : article.category === 'UI Design'
        ? (fr ? ['Clair', 'OLED'] : ['Light', 'OLED'])
        : (fr ? ['Brief', 'Structure', 'Revue'] : ['Brief', 'Structure', 'Review']),
  };
  return <div className="guide-card-thumb article-card-art" aria-hidden="true"><ArticleVisualScene visual={visual} /></div>;
}
