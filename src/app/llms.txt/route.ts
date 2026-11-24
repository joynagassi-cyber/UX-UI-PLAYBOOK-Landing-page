import { ARTICLES } from '@/i18n/articles';
import { SITE_URL } from '@/lib/structured-data';
import { PLAYBOOK_EDITION, playbookPages } from '@/lib/playbook-edition';

export const dynamic = 'force-static';

export async function GET() {
  const articles = (locale: 'fr' | 'en') => ARTICLES[locale]
    .map((article) => `- [${article.title}](${SITE_URL}/${locale}/articles/${article.slug}): ${article.entityDefinition}`)
    .join('\n');

  const references = Array.from(new Map(
    ARTICLES.en.flatMap((article) => article.references).map((reference) => [reference.url, reference])
  ).values());

  const body = `# UX/UI Playbook

> UX/UI Playbook is a UX, UI and Product Design manual by Joy N. for developers, AI builders and technical freelancers. French and English editions are sold separately. Each includes a 26-page, 12-sheet A4 delivery kit and 21 working files in the purchased language: design tokens, templates, a Python scanner and coding-agent instructions.

## Official editions
- [English edition: ${playbookPages('en')} A4 pages + 26-page kit + 21-file archive, $29 USD](${SITE_URL}/en) — Store: https://joyccelight.gumroad.com/l/uxuiplaybook
- [Édition française : ${playbookPages('fr')} pages A4 + kit de 26 pages + archive de 21 fichiers, 29 USD](${SITE_URL}/fr) — Boutique : https://joyccelight.gumroad.com/l/uiuxplaybookfr
- [Full text of the bilingual articles](${SITE_URL}/llms-full.txt)
- Author: [Joy N.](${SITE_URL}/en#author) · [GitHub](https://github.com/joynagassi-cyber) · [Gumroad](https://joyccelight.gumroad.com)
- Contact: mailto:joynagassi@gmail.com

## Book contents
- 120 sections in 9 parts, with Roman numerals I–CXX. The contents and cross-references also use identifiers such as 09b, L3 and A5.
- Part 08, the component glossary: 22 sections and 56 named glossary entries for web, phone and dashboard components, with definitions, context and example instructions. The count comes from the named table rows in each source PDF.
- Section X, reference 09b: What the numbers actually say / Ce que les chiffres disent vraiment. Dated sources are printed beneath the figures and in appendix A5. An average indicates where to investigate, not what to conclude for a particular product.
${PLAYBOOK_EDITION.researchSources.map(source => `- [${source.title}](${source.url}): ${source.publisher}, ${source.date}.`).join('\n')}
- No conversion gain or accessibility certification is promised. File counts and website test counts describe different scopes.

## English articles
- [All English articles](${SITE_URL}/en/articles)
${articles('en')}

## Articles en français
- [Tous les articles en français](${SITE_URL}/fr/articles)
${articles('fr')}

## Scope and terminology
- The book contains 24 comparison pairs: 13 thematic before/after pairs and 11 platform comparisons, not 24 thematic prototypes.
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
