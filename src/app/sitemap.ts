import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://joyccelight-playbook.vercel.app';
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
