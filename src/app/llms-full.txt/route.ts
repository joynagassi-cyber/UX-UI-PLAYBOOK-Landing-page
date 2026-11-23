import { ARTICLES, type ArticleData } from '@/i18n/articles';
import { designLabTranscript } from '@/i18n/design-lab';
import { CONTENT } from '@/i18n/content';
import { SITE_URL as SITE } from '@/lib/structured-data';
import { freeResourceCatalog, freeResourceManifest } from '@/i18n/free-resource';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';
import { articleHref } from '@/lib/article-links';
import { PLAYBOOK_COUNTS, PLAYBOOK_EDITION, playbookPages } from '@/lib/playbook-edition';

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
  lines.push(lang === 'fr' ? '### Repères' : '### At a glance');
  for (const st of art.keyStats) {
    const source = st.url ? `[${st.source}](${st.url})` : st.source;
    lines.push(`- **${st.value}** — ${st.label} (${source})`);
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
      } else if (block.type === 'explanation') {
        lines.push(...block.paragraphs.flatMap((paragraph) => [paragraph, '']));
        lines.push(`**${block.visual.title}**`);
        lines.push(block.visual.labels.join(' → '));
        lines.push(block.visual.caption);
        lines.push('');
      } else if (block.type === 'quote') {
        lines.push(`> **${block.tag}**: "${block.text}"`);
        lines.push('');
      } else if (block.type === 'doDont') {
        lines.push(`**${block.doTitle}**`);
        for (const d of block.doItems) lines.push(`- ${d}`);
        lines.push('');
        lines.push(`**${block.dontTitle}**`);
        for (const d of block.dontItems) lines.push(`- ${d}`);
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
      } else if (block.type === 'diagram') {
        lines.push(`**${block.visual.title}**`);
        lines.push(block.visual.labels.join(' → '));
        lines.push(block.visual.caption);
        lines.push('');
      } else if (block.type === 'mobileLab') {
        lines.push(`#### ${block.title}`, block.caption, '', designLabTranscript(lang), '');
      } else if (block.type === 'readingLink') {
        lines.push(block.text);
        lines.push(`[${block.label}](${SITE}${articleHref(lang, block.slug, block.sectionId)})`, '');
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

  lines.push(lang === 'fr' ? '### Sources et références' : '### Sources and references');
  for (const reference of art.references) {
    lines.push(`- [${reference.title}](${reference.url}) — ${reference.publisher}, ${reference.date}. ${reference.note}`);
  }
  lines.push('');

  return lines.join('\n');
}

export const dynamic = 'force-static';

export async function GET() {
  const chunks: string[] = [
    '# UX/UI Playbook — Bilingual article collection (llms-full.txt)',
    '',
    `Canonical site: ${SITE}`,
    'Author: Joy N. | Contact: joynagassi@gmail.com',
    `English edition: https://joyccelight.gumroad.com/l/uxuiplaybook ($29 USD, ${playbookPages('en')}p PDF + 26p kit + 21-file English ZIP)`,
    `French edition: https://joyccelight.gumroad.com/l/uiuxplaybookfr ($29 USD, ${playbookPages('fr')}p PDF + 26p kit + 21-file French ZIP)`,
    'Editions are sold separately. The source archive contains 42 files in total: 21 FR + 21 EN, not 42 per purchase.',
    '',
    '---',
    '',
  ];

  for (const locale of ['en', 'fr'] as const) {
    const data = CONTENT[locale];
    chunks.push(`## [${locale.toUpperCase()}] ${data.meta.productName}`, data.hero.note, '');
    chunks.push(locale === 'fr'
      ? `${PLAYBOOK_COUNTS.sections} sections en ${PLAYBOOK_COUNTS.parts} parties, dont un lexique de ${PLAYBOOK_COUNTS.glossaryEntries} composants pour le web, le téléphone et le tableau de bord.`
      : `${PLAYBOOK_COUNTS.sections} sections in ${PLAYBOOK_COUNTS.parts} parts, including a ${PLAYBOOK_COUNTS.glossaryEntries}-component glossary for web, phone and dashboard.`);
    for (const part of data.contentsSection.parts) chunks.push(`- ${part.num}. ${part.title} (${part.page})`);
    chunks.push('', locale === 'fr' ? '### Références de la section sur les chiffres' : '### References for the section on figures');
    for (const source of PLAYBOOK_EDITION.researchSources) {
      chunks.push(`- [${source.title}](${source.url}): ${source.publisher}, ${source.date}.`);
    }
    chunks.push('', locale === 'fr'
      ? 'Une moyenne indique où chercher, pas ce qu’il faut conclure pour votre produit. Aucun gain de conversion ni certification d’accessibilité n’est promis.'
      : 'An average indicates where to investigate, not what to conclude for your product. No conversion gain or accessibility certification is promised.', '', '---', '');
  }

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

  for (const locale of ['en', 'fr'] as const) {
    const catalog = freeResourceCatalog(locale);
    const manifest = freeResourceManifest(locale);
    const fr = locale === 'fr';
    chunks.push(
      fr ? '# Répertoire UI/UX gratuit — édition française' : '# Free UI/UX directory — English edition',
      `${locale.toUpperCase()}: ${SITE}/${locale}${FREE_RESOURCE_PATH}`,
      fr
        ? `${manifest.counts.entries} fiches, ${manifest.counts.categories} familles, ${manifest.counts.resourceLinks} liens. Guide français de ${manifest.counts.guidePages} pages ; fiche de décision de ${manifest.counts.worksheetPages} pages, Markdown et CSV.`
        : `${manifest.counts.entries} entries, ${manifest.counts.categories} categories, ${manifest.counts.resourceLinks} links. English guide: ${manifest.counts.guidePages} pages; decision worksheet: ${manifest.counts.worksheetPages} pages, plus Markdown and CSV.`,
      `ZIP: ${SITE}${manifest.files.archive.path}`,
      `PDF: ${SITE}${manifest.files.pdf.path}`,
      `Markdown: ${SITE}${manifest.files.markdown.path}`,
      fr
        ? 'Ressource gratuite distincte du Playbook payant. Les ressources tierces conservent leurs tarifs et licences ; aucun de leurs packs n’est distribué. Les destinations n’ont pas fait l’objet d’un audit exhaustif de disponibilité ou de licence.'
        : 'A free resource separate from the paid Playbook. Third-party resources retain their own prices and licenses; none of their packs are distributed. The destinations have not undergone an exhaustive availability or license audit. This English translation preserves the edited French edition dated November 18, 2026; it does not imply a fresh exhaustive review.',
      '',
    );
    for (const category of catalog.categories) {
      chunks.push(`## ${category.name}`, category.purpose, category.question, '');
      for (const entry of catalog.entries.filter((item) => item.category === category.id)) {
        chunks.push(`### ${entry.id}. ${entry.name}`, ...entry.urls, entry.description,
          `Non-designer: ${entry.nonDesigner}`, `${fr ? 'Développeur' : 'Developer'}: ${entry.developer}`,
          `${fr ? 'Avec un agent IA' : 'With an AI agent'}: ${entry.agent}`, `${fr ? 'À vérifier' : 'Check first'}: ${entry.watch}`, '');
      }
    }
    chunks.push(fr ? '## Sources du répertoire et limites éditoriales' : '## Directory sources and editorial limitations',
      fr
        ? 'Références ciblées utilisées pour les corrections éditoriales, pas une validation juridique des 75 destinations. Les conditions peuvent évoluer. Les pistes non testées sont signalées dans leurs fiches.'
        : 'Targeted references used for editorial corrections, not legal validation of all 75 destinations. Terms may change. Untested candidates are identified in their entries.');
    for (const source of catalog.sources) chunks.push(`${source.title} — ${source.url}`, source.note, '');
  }

  return new Response(chunks.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
