import type { MetadataRoute } from 'next';
import { ARTICLE_SLUGS } from '@/i18n/articles';

const BASE = 'https://joyccelight-playbook.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-11-18T08:00:00.000Z');

  const coreEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/fr`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${BASE}/fr`,
          en: `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${BASE}/fr`,
          en: `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/fr/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${BASE}/fr/articles`,
          en: `${BASE}/en/articles`,
        },
      },
    },
    {
      url: `${BASE}/en/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${BASE}/fr/articles`,
          en: `${BASE}/en/articles`,
        },
      },
    },
  ];

  const articleEntries: MetadataRoute.Sitemap = ARTICLE_SLUGS.flatMap((slug) => [
    {
      url: `${BASE}/fr/articles/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          fr: `${BASE}/fr/articles/${slug}`,
          en: `${BASE}/en/articles/${slug}`,
        },
      },
    },
    {
      url: `${BASE}/en/articles/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          fr: `${BASE}/fr/articles/${slug}`,
          en: `${BASE}/en/articles/${slug}`,
        },
      },
    },
  ]);

  return [...coreEntries, ...articleEntries];
}
