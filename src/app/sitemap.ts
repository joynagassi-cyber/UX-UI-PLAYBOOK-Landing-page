import type { MetadataRoute } from 'next';
import { ARTICLES, ARTICLE_SLUGS } from '@/i18n/articles';
import { SITE_URL } from '@/lib/site-config';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/fr`,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/fr/articles`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr/articles`,
          en: `${SITE_URL}/en/articles`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/articles`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr/articles`,
          en: `${SITE_URL}/en/articles`,
        },
      },
    },
  ];

  const articleEntries: MetadataRoute.Sitemap = ARTICLE_SLUGS.flatMap((slug) => {
    const frArticle = ARTICLES.fr.find((article) => article.slug === slug);
    const enArticle = ARTICLES.en.find((article) => article.slug === slug);

    return [
      {
        url: `${SITE_URL}/fr/articles/${slug}`,
        ...(frArticle?.updatedAt
          ? { lastModified: new Date(`${frArticle.updatedAt}T00:00:00.000Z`) }
          : {}),
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr/articles/${slug}`,
            en: `${SITE_URL}/en/articles/${slug}`,
          },
        },
      },
      {
        url: `${SITE_URL}/en/articles/${slug}`,
        ...(enArticle?.updatedAt
          ? { lastModified: new Date(`${enArticle.updatedAt}T00:00:00.000Z`) }
          : {}),
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr/articles/${slug}`,
            en: `${SITE_URL}/en/articles/${slug}`,
          },
        },
      },
    ];
  });

  const resourceEntries: MetadataRoute.Sitemap = (['fr', 'en'] as const).map((locale) => ({
    url: `${SITE_URL}/${locale}${FREE_RESOURCE_PATH}`,
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: {
      languages: { fr: `${SITE_URL}/fr${FREE_RESOURCE_PATH}`, en: `${SITE_URL}/en${FREE_RESOURCE_PATH}` },
    },
  }));

  return [...coreEntries, ...articleEntries, ...resourceEntries];
}
