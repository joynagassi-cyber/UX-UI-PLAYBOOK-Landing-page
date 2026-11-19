import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
import { ARTICLES, type ArticleData } from '@/i18n/articles';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://joyccelight-playbook.pages.dev';

function renderArticleMarkdown(lang: 'en' | 'fr', art: ArticleData): string {
  const lines: string[] = [];
  lines.push(`## [${lang.toUpperCase()}] ${art.title}`);
  lines.push(`URL: ${SITE}/${lang}/articles/${art.slug}`);
  lines.push(`Category: ${art.category} | Reading time: ${art.readTime} | Updated: ${art.updatedAt}`);
  lines.push('');
  lines.push(`> **${art.aeoSummaryTitle}**: ${art.aeoSummary}`);
  lines.push('');
  lines.push('### Key Dated Metrics');
  for (const st of art.keyStats) {
    lines.push(`- **${st.value}** — ${st.label} (*${st.source}*)`);
  }
  lines.push('');

  for (const sec of art.sections) {
    lines.push(`### ${sec.num}. ${sec.heading}`);
    for (const block of sec.blocks) {
      if (block.type === 'p') {
        lines.push(block.text);
        lines.push('');
      } else if (block.type === 'list') {
        for (const it of block.items) {
          lines.push(it.bold ? `- **${it.bold}**: ${it.text}` : `- ${it.text}`);
        }
        lines.push('');
      } else if (block.type === 'callout') {
        lines.push(`> **${block.title}**: ${block.text}`);
        lines.push('');
      } else if (block.type === 'copyable') {
        lines.push(`**${block.label}**`);
        lines.push(`\`\`\`${block.langTag}`);
        lines.push(block.code);
        lines.push('```');
        lines.push('');
      } else if (block.type === 'table') {
        lines.push(`| ${block.headers.join(' | ')} |`);
        lines.push(`| ${block.headers.map(() => '---').join(' | ')} |`);
        for (const r of block.rows) {
          lines.push(`| ${r.join(' | ')} |`);
        }
        if (block.caption) lines.push(`*${block.caption}*`);
        lines.push('');
      }
    }
  }

  lines.push('### FAQ');
  for (const f of art.faqs) {
    lines.push(`**Q: ${f.q}**`);
    lines.push(`A: ${f.a}`);
    lines.push('');
  }

  return lines.join('\n');
}

export async function GET() {
  const chunks: string[] = [
    '# UX/UI Playbook — Complete Bilingual Field Guide Corpus (llms-full.txt)',
    '',
    `Canonical site: ${SITE}`,
    'Author: Joy N. | Contact: joynagassi@gmail.com',
    'English Edition: https://joyccelight.gumroad.com/l/uxuiplaybook ($29 USD, 139p PDF + 26p Kit + 21-file ZIP)',
    'French Edition: https://joyccelight.gumroad.com/l/uiuxplaybookfr ($29 USD, 148p PDF + 26p Kit + 21-file ZIP)',
    '',
    '---',
    '',
  ];

  for (const art of ARTICLES.en) {
    chunks.push(renderArticleMarkdown('en', art));
    chunks.push('---');
    chunks.push('');
  }

  for (const art of ARTICLES.fr) {
    chunks.push(renderArticleMarkdown('fr', art));
    chunks.push('---');
    chunks.push('');
  }

  return new NextResponse(chunks.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
