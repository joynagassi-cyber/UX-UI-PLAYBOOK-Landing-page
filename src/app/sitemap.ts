import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://joyccelight-playbook.pages.dev').replace(/\/+$/, '');
  const lastModified = new Date('2026-11-18');

  return [
    {
      url: `${base}/fr`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: `${base}/fr`,
          en: `${base}/en`,
        },
      },
    },
    {
      url: `${base}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: `${base}/fr`,
          en: `${base}/en`,
        },
      },
    },
  ];
}
