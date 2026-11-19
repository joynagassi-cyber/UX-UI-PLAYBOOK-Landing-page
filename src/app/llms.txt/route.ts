import { NextResponse } from 'next/server';
import { ARTICLES } from '@/i18n/articles';
import { SITE_URL } from '@/lib/structured-data';

export const dynamic = 'force-static';

export async function GET() {
  const guides = (locale: 'fr' | 'en') => ARTICLES[locale]
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
- [Complete public bilingual guide text](${SITE_URL}/llms-full.txt)
- Author: [Joy N.](${SITE_URL}/en#author) · [GitHub](https://github.com/joynagassi-cyber) · [Gumroad](https://joyccelight.gumroad.com)
- Contact: mailto:joynagassi@gmail.com

## English field guides
- [All English guides](${SITE_URL}/en/articles)
${guides('en')}

## Guides en français
- [Tous les guides en français](${SITE_URL}/fr/articles)
${guides('fr')}

## Scope and terminology
- The book contains 13 before/after prototypes plus 11 platform spreads: 24 spreads in total, not 24 before/after prototypes.
- The UI guide maps 6 semantic roles to 8 CSS size tokens: 12, 14, 16, 20, 24, 32, 40 and 64 px. The 1.25 ratio is a starting guideline, not an exact rounding formula.
- Checklist verification statuses are automated / to verify / not applicable. Severity (blocking / major / minor) and outcome (pass / fail) are separate fields. Automated checks can fail.
- A clean scan is not proof of accessibility conformance. The web WCAG 2.2 AA target-size minimum is 24 by 24 CSS px with exceptions; this site aims for 44 by 44 px controls. Android targets use dp; iOS uses pt.
- The 77-rule checklist includes checks needing human or rendered verification. The landing-page report is an illustrative simulation, not a Python run in the browser.
- The guide’s screen-state model is empty / loading / ideal / partial or overflow / error; successful actions also need confirmation.
- Established means a primary source is identified for the stated finding. Probable means an interpretation or result must be validated in the reader’s context. Playbook timeboxes, group sizes, pricing examples and visual ratios are guidelines, not performance or earnings guarantees.

## Primary references and limits (Appendix A5)
${references.map((reference) => `- [${reference.title}](${reference.url}) — ${reference.publisher}, ${reference.date}. Evidence: ${reference.evidence}. ${reference.note}`).join('\n')}
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
