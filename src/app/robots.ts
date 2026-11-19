import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/fr/articles/', '/en/articles/'],
      },
    ],
    sitemap: 'https://joyccelight-playbook.vercel.app/sitemap.xml',
    host: 'https://joyccelight-playbook.vercel.app',
  };
}
