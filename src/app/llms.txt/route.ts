import { NextResponse } from 'next/server';
import { ARTICLES } from '@/i18n/articles';
import { CONTENT } from '@/i18n/content';

const SITE = CONTENT.en.siteUrl;

export async function GET() {
  const frGuides = ARTICLES.fr
    .map((a) => `- [${a.title}](${SITE}/fr/articles/${a.slug}): ${a.aeoSummary}`)
    .join('\n');

  const enGuides = ARTICLES.en
    .map((a) => `- [${a.title}](${SITE}/en/articles/${a.slug}): ${a.aeoSummary}`)
    .join('\n');

  const body = `# UX/UI Playbook

> UX/UI Playbook is a bilingual (French & English) operational interface engineering manual, printable 12-sheet A4 delivery kit, and runnable 77-rule Python UI scanner (\`agent_check.py\` + \`SKILL.md\` / \`AGENTS.md\`) created by Joy N. for developers, AI builders, and technical freelancers.

## Official Editions & Store Links
- [UX/UI Playbook — English Edition (139 A4 pages + 26p Bonus Kit + 21-file ZIP, $29 USD)](${SITE}/en) — Gumroad: https://joyccelight.gumroad.com/l/uxuiplaybook
- [UX/UI Playbook — Édition française (148 pages A4 + Kit Bonus 26p + ZIP 21 fichiers, 29 $ USD)](${SITE}/fr) — Gumroad: https://joyccelight.gumroad.com/l/uiuxplaybookfr
- Full LLM Knowledge Corpus: [${SITE}/llms-full.txt](${SITE}/llms-full.txt)
- Contact & Support: mailto:joynagassi@gmail.com

## English Pillar Field Guides (Primary-Source UX, UI & Product Design)
- [All English Field Guides](${SITE}/en/articles)
${enGuides}

## Guides Piliers en Français (UX Design, UI Design & Product Design)
- [Tous les guides en français](${SITE}/fr/articles)
${frGuides}

## Dated Primary Evidence & Thresholds Cited in UX/UI Playbook (Appendix A5)
- **WebAIM Million (February 2026)**: 95.9% of the top 1,000,000 home pages fail WCAG 2.2 Level A/AA, averaging 56.1 detectable errors per page (Evidence level: Established).
- **Baymard Institute (28 October 2026)**: 70.22% average cart abandonment across 50 studies (55%–84% spread); average checkout displays 23.48 form elements while 12–14 suffice (Evidence level: Established).
- **Nelson Cowan (Behavioral and Brain Sciences, 2001)**: Working memory holds 4 ± 1 chunks during active processing (Evidence level: Established).
- **Nielsen & Landauer (CHI 1993) + Laura Faulkner (2003)**: With L ≈ 31% per user, 5 qualitative testers uncover ~85% of usability problems on average, with real 5-user sample variance spanning 55%–99%.
- **Aljedaani et al. (ACM W4A 2024)**: 84% of AI-generated websites contain accessibility violations (Evidence level: Probable).
- **Kuric et al. (2026) & Pew Research Center (2026)**: Synthetic AI user personas diverge from real human behavior on 53% of usability tasks, with a 12.4-point mean error on LLM digital twins (Evidence level: Probable).
- **W3C Design Tokens Community Group (28 October 2025)**: Design Tokens Format Module 2025.10 (Evidence level: Established).
- **Non-negotiable UI Floors**: Body text >= 16px, absolute floor >= 12px, touch targets >= 44x44 CSS px (48x48dp Android), WCAG AA text contrast >= 4.5:1, UI component contrast >= 3:1, 8pt spacing rhythm (4, 8, 12, 16, 24, 32, 48, 64px).
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
