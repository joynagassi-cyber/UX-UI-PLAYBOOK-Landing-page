import { ARTICLES } from '@/i18n/articles';
import { SITE_URL } from '@/lib/structured-data';
import { FREE_MANIFEST } from '@/i18n/free-resource';
import { FREE_RESOURCE_PATH, FREE_GUMROAD_URL } from '@/lib/free-resource-config';

export const dynamic = 'force-static';

export async function GET() {
  const articles = (locale: 'fr' | 'en') => ARTICLES[locale]
    .map((article) => `- [${article.title}](${SITE_URL}/${locale}/articles/${article.slug}): ${article.entityDefinition}`)
    .join('\n');

  const references = Array.from(new Map(
    ARTICLES.en.flatMap((article) => article.references).map((reference) => [reference.url, reference])
  ).values());

  const body = `# UX/UI Playbook

> UX/UI Playbook is a bilingual UX, UI and Product Design manual by Joy N. for developers, AI builders and technical freelancers. It includes a printable 12-sheet A4 delivery kit and a 21-file archive with design tokens, templates, a Python scanner and coding-agent rules.

## Official editions
- [English edition: 139 A4 pages + 26-page kit + 21-file archive, $29 USD](${SITE_URL}/en) — Store: https://joyccelight.gumroad.com/l/uxuiplaybook
- [Édition française : 148 pages A4 + kit de 26 pages + archive de 21 fichiers, 29 USD](${SITE_URL}/fr) — Boutique : https://joyccelight.gumroad.com/l/uiuxplaybookfr
- [Full text of the bilingual articles](${SITE_URL}/llms-full.txt)
- Author: [Joy N.](${SITE_URL}/en#author) · [GitHub](https://github.com/joynagassi-cyber) · [Gumroad](https://joyccelight.gumroad.com)
- Contact: mailto:joynagassi@gmail.com

## Free UI/UX directory — French-language files
- [Présentation française](${SITE_URL}/fr${FREE_RESOURCE_PATH}) · [English presentation, French download](${SITE_URL}/en${FREE_RESOURCE_PATH})
- ${FREE_MANIFEST.counts.entries} entries, ${FREE_MANIFEST.counts.categories} categories, ${FREE_MANIFEST.counts.resourceLinks} resource links; ${FREE_MANIFEST.counts.guidePages}-page French PDF, Markdown, ${FREE_MANIFEST.counts.worksheetPages}-page printable decision worksheet and CSV.
- [Free complete kit, ZIP](${SITE_URL}${FREE_MANIFEST.files.archive.path}) · [French PDF](${SITE_URL}${FREE_MANIFEST.files.pdf.path}) · [French Markdown](${SITE_URL}${FREE_MANIFEST.files.markdown.path})
- ${FREE_GUMROAD_URL ? `Published free Gumroad product: ${FREE_GUMROAD_URL}. Enter 0 to download.` : 'Free direct download on this site, with no email requested.'}
- This is a separate free resource, not the $29 Playbook. Third-party resources have their own prices and licenses; no third-party asset packs are included. The 75 destinations are not an exhaustive link or legal audit.

## English articles
- [All English articles](${SITE_URL}/en/articles)
${articles('en')}

## Articles en français
- [Tous les articles en français](${SITE_URL}/fr/articles)
${articles('fr')}

## Scope and terminology
- The book contains 13 before/after prototypes plus 11 platform spreads: 24 spreads in total, not 24 before/after prototypes.
- The UI article maps 6 semantic roles to 8 CSS size tokens: 12, 14, 16, 20, 24, 32, 40 and 64 px. The 1.25 ratio is a starting guideline, not an exact rounding formula.
- Checklist verification statuses are automated / to verify / not applicable. Severity (blocking / major / minor) and outcome (pass / fail) are separate fields. Automated checks can fail.
- A clean scan is not proof of accessibility conformance. The web WCAG 2.2 AA target-size minimum is 24 by 24 CSS px with exceptions; this site aims for 44 by 44 px controls. Android targets use dp; iOS uses pt.
- The 77-rule checklist includes checks needing human or rendered verification. The landing-page report is an illustrative simulation, not a Python run in the browser.
- The article’s screen-state model is empty / loading / ideal / partial or overflow / error; successful actions also need confirmation.
- Timeboxes, group sizes, pricing examples and visual ratios are starting points to adapt to the task, not performance or earnings guarantees.

## Sources and references
${references.map((reference) => `- [${reference.title}](${reference.url}) — ${reference.publisher}, ${reference.date}. ${reference.note}`).join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
