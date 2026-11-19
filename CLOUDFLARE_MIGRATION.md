# Cloudflare Pages migration (static Next.js export)

This is a parallel hosting configuration for JoyCeeLight Playbook. The existing Vercel project and deployment are intentionally untouched.

## Source and branch

- Current application source was taken from `arena/b1931c91-ux-ui-playbook-landing-page`.
- Migration branch: `cloudflare-migration-v2`.
- The repository's `main` branch was stale at migration time; do not select it for the first deployment.

## Cloudflare Pages settings

- Framework preset: **Next.js (Static HTML Export)**
- Production branch for validation: `cloudflare-migration-v2`
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `22`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev`

Cloudflare's GitHub Pages integration must be installed/authorized for this repository. The ChatGPT GitHub connection and Cloudflare's own GitHub App authorization are separate connections.

## Static export and routing

- Next.js is configured with `output: 'export'`.
- The `/fr`, `/en`, `/fr/articles`, `/en/articles`, and all six localized article detail URLs are rendered at build time.
- Dynamic route segments explicitly set `dynamicParams = false`.
- Next.js Proxy is removed because request-time Proxy, cookies and redirects cannot run in a static export.
- Pages Functions redirect only `/` and unlocalized `/articles*` requests to the preferred locale.
- Language precedence: `NEXT_LOCALE` cookie, then `Accept-Language`, then Cloudflare country hint, with English as the fallback.
- Query parameters are preserved during redirects.
- `public/_routes.json` restricts Functions execution to the root and unlocalized article routes. Static pages, images, fonts, scripts, SEO files and other assets are served directly by Pages.
- `public/_redirects` keeps the legacy `/fr.html` and `/en.html` paths working.
- Canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml` use `NEXT_PUBLIC_SITE_URL`.

## Required checks before changing traffic

1. Confirm GitHub Actions build and export checks pass.
2. Open and refresh `/fr` and `/en`.
3. Open both article hubs and all six localized guide pages.
4. Confirm the root redirect chooses French and English based on headers and respects the saved language cookie.
5. Confirm `/articles` and `/articles/ux-design-guide` redirect to the matching localized pages.
6. Check theme/language controls, sample reader, gallery, package explorer, interactive checklist and Gumroad links.
7. Check fonts, images, Open Graph images, `robots.txt`, `sitemap.xml`, and the 404 page.
8. Confirm generated canonical, sitemap and robots hosts use the Pages URL, not the Vercel URL.

## Rollback

Keep Vercel deployed and available until Cloudflare has passed the tests. Do not change DNS or attach the production domain until the Cloudflare preview is verified. If any test fails, leave traffic on Vercel and fix the migration branch.
