# Cloudflare Pages migration

This branch prepares the existing Next.js landing page for a parallel Cloudflare Pages deployment.

## Safety and rollback

- The existing Vercel deployment is intentionally left untouched.
- The migration is isolated on the `cloudflare-migration` branch.
- Do not move the production domain or remove Vercel until the Cloudflare preview has passed the checks below.

## Cloudflare Pages build settings

Create a Pages project connected to this repository and use:

- Production branch during validation: `cloudflare-migration`
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev`

The final public URL can be changed later. Update `NEXT_PUBLIC_SITE_URL` in the Cloudflare Pages build environment before the final production build if a custom domain is selected.

## What changed

- `next.config.mjs` enables Next.js static export.
- Both locale routes are generated from `generateStaticParams()` in `src/app/[locale]/layout.tsx`.
- The Next.js Proxy is removed because request-time Next.js Proxy/middleware is not part of a static export.
- `functions/index.js` handles only the root URL and chooses `/fr` or `/en` using the saved `NEXT_LOCALE` cookie, then `Accept-Language`, then Cloudflare's country hint.
- `public/_redirects` preserves the old `/fr.html` and `/en.html` paths.
- Canonical URLs, Open Graph image URLs, robots.txt and sitemap.xml use `NEXT_PUBLIC_SITE_URL`.

## Required smoke tests before switching traffic

1. Open `/fr` and `/en` directly.
2. Refresh both localized routes and confirm they still load.
3. Open `/` with a French `Accept-Language` header and confirm a redirect to `/fr`.
4. Open `/` with an English `Accept-Language` header and confirm a redirect to `/en`.
5. Set `NEXT_LOCALE=fr` or `NEXT_LOCALE=en` and confirm the cookie takes priority.
6. Confirm the locale switch, theme toggle, gallery, sample reader, contents explorer and interactive checklist work.
7. Confirm images, fonts, Open Graph images, robots.txt and sitemap.xml load.
8. Follow both Gumroad purchase links and confirm the correct edition opens.

Only after these tests pass should the Cloudflare project be promoted to the production branch/domain. Keep Vercel available as a rollback until then.
