import type { MetadataRoute } from 'next';
import { ARTICLE_SLUGS } from '@/i18n/articles';
import { SITE_URL } from '@/lib/site-config';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const suffixes = ['', '/articles', FREE_RESOURCE_PATH, ...ARTICLE_SLUGS.map(slug => `/articles/${slug}`)];
  // Editorial updatedAt values are not a page-specific, evidenced change ledger.
  // Omit optional lastmod rather than publish build times, invented midnight
  // timestamps or a blanket "freshness" date. Reintroduce only with provenance.
  return suffixes.flatMap(suffix => (['fr', 'en'] as const).map(locale => ({
    url: `${SITE_URL}/${locale}${suffix}`,
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr${suffix}`,
        en: `${SITE_URL}/en${suffix}`,
        'x-default': `${SITE_URL}/en${suffix}`,
      },
    },
  })));
}
