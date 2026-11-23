import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';
import crawlers from '@/config/crawler-policy.json';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    // Preserve the existing permissive policy, including its training controls.
    // robots.txt is a request to compliant clients, not authentication or proof
    // of crawl/indexing/citation. Search and training are different purposes.
    rules: [
      { userAgent: '*', allow: '/' },
      ...crawlers.map(({ userAgent }) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
