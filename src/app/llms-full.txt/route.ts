import { NextResponse } from 'next/server';
import { ARTICLES, type ArticleData } from '@/i18n/articles';
import { CONTENT } from '@/i18n/content';
import { SITE_URL as SITE } from '@/lib/structured-data';

export const dynamic = 'force-static';

const tableCell = (text: string) => text.replace(/\|/g, '\\|').replace(/\n/g, ' ');

function renderArticleMarkdown(lang: 'en' | 'fr', art: ArticleData): string {
  const lines: string[] = [];
  lines.push(`## [${lang.toUpperCase()}] ${art.title}`);
  lines.push(`URL: ${SITE}/${lang}/articles/${art.slug}`);
  lines.push(`Category: ${art.category} | Reading time: ${art.readTime} | Published: ${art.publishedAt} | Updated: ${art.updatedAt}`);
  lines.push('');
  lines.push(`**${art.category}** — ${art.entityDefinition}`);
  lines.push('');
  lines.push(`> **${art.aeoSummaryTitle}**: ${art.aeoSummary}`);
  lines.push('');
  lines.push(lang === 'fr' ? '### Sources et repères de méthode' : '### Evidence and method guidelines');
  for (const st of art.keyStats) {
    const source = st.url ? `[${st.source}](${st.url})` : st.source;
    lines.push(`- **${st.value}** — ${st.label} (${source}; evidence: ${st.evidence})`);
  }
  lines.push('');

  for (const sec of art.sections) {
    lines.push(`### ${sec.num}. ${sec.heading}`);
    for (const block of sec.blocks) {
      if (block.type === 'h3') {
        lines.push(`#### ${block.text}`);
        lines.push('');
      } else if (block.type === 'p') {
        lines.push(block.text);
        lines.push('');
      } else if (block.type === 'quote') {
        lines.push(`> **${block.tag}**: "${block.text}"`);
        lines.push('');
      } else if (block.type === 'doDont') {
        lines.push(`**${block.doTitle}**`);
        for (const d of block.doItems) lines.push(`- ✓ ${d}`);
        lines.push('');
        lines.push(`**${block.dontTitle}**`);
        for (const d of block.dontItems) lines.push(`- ✕ ${d}`);
        lines.push('');
      } else if (block.type === 'steps') {
        lines.push(`**${block.title}**`);
        block.steps.forEach((st, idx) => {
          lines.push(`${idx + 1}. **${st.bold}** — ${st.text}`);
        });
        lines.push('');
      } else if (block.type === 'list') {
        if (block.heading) lines.push(`**${block.heading}**`);
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
        if (block.note) lines.push(`*${block.note}*`);
        lines.push('');
      } else if (block.type === 'inlineCta') {
        lines.push(`**${block.title}** ${block.text}`);
        lines.push(`[${block.buttonLabel}](${CONTENT[lang].gumroadUrl})`);
        lines.push('');
      } else if (block.type === 'figure') {
        lines.push(`[${block.alt}](${SITE}${block.src}) — ${block.caption} (${block.sourceRef})`);
        lines.push('');
      } else if (block.type === 'table') {
        lines.push(`| ${block.headers.map(tableCell).join(' | ')} |`);
        lines.push(`| ${block.headers.map(() => '---').join(' | ')} |`);
        for (const r of block.rows) {
          lines.push(`| ${r.map(tableCell).join(' | ')} |`);
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

  lines.push(lang === 'fr' ? '### Sources et niveaux de preuve' : '### Sources and evidence levels');
  for (const reference of art.references) {
    lines.push(`- [${reference.title}](${reference.url}) — ${reference.publisher}, ${reference.date}. Evidence: ${reference.evidence}. ${reference.note}`);
  }
  lines.push('');

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
