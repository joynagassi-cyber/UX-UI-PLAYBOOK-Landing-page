import type { MetadataRoute } from 'next';
import { ARTICLES, ARTICLE_SLUGS } from '@/i18n/articles';
import { CONTENT } from '@/i18n/content';

const BASE = CONTENT.en.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/fr`,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/en`,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/fr/articles`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: { fr: `${BASE}/fr/articles`, en: `${BASE}/en/articles` },
      },
    },
    {
      url: `${BASE}/en/articles`,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: { fr: `${BASE}/fr/articles`, en: `${BASE}/en/articles` },
      },
    },
  ];

  const articleEntries: MetadataRoute.Sitemap = ARTICLE_SLUGS.flatMap((slug) => {
    const frArticle = ARTICLES.fr.find((article) => article.slug === slug);
    const enArticle = ARTICLES.en.find((article) => article.slug === slug);

    return [
      {
        url: `${BASE}/fr/articles/${slug}`,
        ...(frArticle?.updatedAt
          ? { lastModified: new Date(`${frArticle.updatedAt}T00:00:00.000Z`) }
          : {}),
        alternates: {
          languages: {
            fr: `${BASE}/fr/articles/${slug}`,
            en: `${BASE}/en/articles/${slug}`,
          },
        },
      },
      {
        url: `${BASE}/en/articles/${slug}`,
        ...(enArticle?.updatedAt
          ? { lastModified: new Date(`${enArticle.updatedAt}T00:00:00.000Z`) }
          : {}),
        alternates: {
          languages: {
            fr: `${BASE}/fr/articles/${slug}`,
            en: `${BASE}/en/articles/${slug}`,
          },
        },
      },
    ];
  });

  return [...coreEntries, ...articleEntries];
}
