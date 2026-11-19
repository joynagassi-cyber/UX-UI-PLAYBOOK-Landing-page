# UX/UI Playbook 2026 — Bilingual Next.js Landing Page (OLED Dark + Light)

Official bilingual Next.js (App Router) landing page for **Joy N.'s UX/UI Playbook 2026**, serving two localized editions to two distinct audiences from a single codebase:

- **Édition française (`/fr`)** → 148-page French Playbook + 26-page A4 Bonus Kit + 21 working files → [Gumroad FR ($29 USD)](https://joyccelight.gumroad.com/l/uiuxplaybookfr)
- **English Edition (`/en`)** → 139-page English Playbook + 26-page A4 Bonus Kit + 21 working files → [Gumroad EN ($29 USD)](https://joyccelight.gumroad.com/l/uxuiplaybook)

## Key Features

- **OLED Dark Mode (`#000000`) + Editorial Light Mode (`#FAF8F4`)**:
  - Zero-FOUC inline initialization respects a saved choice first, then the visitor's operating-system color preference.
  - Persistent user preference (`localStorage`) with dynamic `<meta name="theme-color">`.
  - Calibrated WCAG AA (`≥ 4.5:1`) contrast tokens in both OLED Dark and Light modes.
- **Automatic Audience Detection (`src/proxy.ts`)**:
  - Visitors arriving at `/` are automatically routed (`307 Temporary Redirect` with `Vary: Accept-Language, Cookie, x-vercel-ip-country`) to `/fr` for Francophone browsers/regions or `/en` for English/international visitors.
  - Preserves incoming marketing parameters (`utm_source`, `utm_medium`, `utm_campaign`, `ref`) all the way to Gumroad checkout links.
  - Instant `FR | EN` switcher in the sticky navigation bar saves a 1-year `NEXT_LOCALE` cookie.
- **Interactive Conversion Proof**:
  - **Live 77-Rule AI Agent Demo (`#tool`)**: Interactive comparison between a raw AI-generated checkout (`test/bad.html`, exit code `1`) and the Playbook-verified screen (`test/clean.html`, exit code `0`) with copyable CLI command.
  - **10-Page Fullscreen Sample Reader (`#inside`)**: High-resolution localized WebP pages rendered directly from each edition's PDF and A4 Bonus Kit.
  - **3-Tab Package Explorer (`#contents`)**: Full 8-part / 97-section table of contents, 12 A4 working sheets, and 21-file archive breakdown.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (auto-routes to `/fr` or `/en`).

## Canonical Domain Configuration

Set `NEXT_PUBLIC_SITE_URL` to the one public origin that should be canonical, including the scheme and without a trailing slash. Use the same value in the deployment environment for every host serving this site.

```env
NEXT_PUBLIC_SITE_URL=https://your-canonical-domain.example
```

The sitemap, robots.txt, Open Graph image URLs, and both LLM text endpoints read this setting. The fallback remains the current Vercel URL until a real production domain is configured. Configure redirects at the hosting/DNS layer so alternate hostnames resolve to that canonical origin.
