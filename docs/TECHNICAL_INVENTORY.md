# Inventaire technique initial — Joyceelight Playbook

Base inspectée : `0fb7adccbe5595ca4598c71a2e9faf1760db2873`. Branche de travail : `arena/cf1c4a81-ux-ui-playbook-landing-page`.

État avant intervention : **Git propre ; aucun fichier modifié, ajouté ou non suivi hors ignore**. 185 fichiers suivis. Inventaire établi à partir du répertoire, pas du rapport précédent. Les dépendances et rapports de contrôle sont ignorés.

## Périmètre à préserver

- Quatre guides par langue : `ux-design-guide`, `ui-design-system-tokens`, `product-design-ai-agents`, `ux-ui-product-design` ; huit pages, aucun nouveau guide prévu.
- Deux landings, deux index et deux pages répertoire : **14 pages canoniques localisées** au total.
- Brouillon interne `docs/drafts/USABILITY_TEST_PROTOCOL_FR.md`, non importé dans les routes et non distribué.
- 108 fichiers éditoriaux/produits/visuels gelés par SHA-256. Leur liste et leurs empreintes sont dans [technical-baseline.json](technical-baseline.json). Le contrôle de préservation sera réexécuté en fin de mission.
- Endpoints existants : `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`. Trois entrées Functions : `/`, `/articles`, `/articles/*`. Ce sont des points de négociation/redirection, pas de nouveaux articles.
- Une 404 statique existe déjà dans l’export. Aucun brouillon, rapport ou catalogue interne ne doit devenir une nouvelle route publique.

## Travaux présents mais hors périmètre de cette mission

- Kits gratuits français/anglais et fichiers de fabrication : 51 fiches, six catégories, 75 destinations, PDF/Markdown/ZIP et visuels ; ne pas régénérer.
- Lot de 21 PNG externes et son manifeste original ; `pendingExternalImport` bloque les appels payants jusqu’à réconciliation. Ne pas capturer, transformer, approuver ou publier ce lot.
- Outil Microlink Node 24+ isolé ; le site reste Node 22. Aucun accès à une clé.
- Offres Gumroad et données éditoriales existantes : ne pas publier ni modifier l’offre.
- Rapport concurrentiel et améliorations FR/EN : pas de nouvelle recherche, pas d’expansion de contenus. Seule une annexe de liaison vers la présente validation technique est prévue.
- Vercel, déploiements, DNS, indexation réelle et réglages du compte Cloudflare : aucune modification autorisée. Les vérifications de compte/production seront explicitement séparées des preuves locales.

## Inventaire exhaustif des fichiers suivis à l’entrée

| Groupe | Fichiers |
| --- | ---: |
| Configuration racine | 11 |
| CI de vérification | 2 |
| Documentation | 4 |
| Pages Functions | 4 |
| Configuration et bibliothèques | 5 |
| Produits et captures — hors mission | 39 |
| Fichiers publics, visuels et téléchargements | 60 |
| Scripts de fabrication et validation | 9 |
| Routes Next et styles | 11 |
| Composants React | 15 |
| Polices et licences | 4 |
| Contenus et données FR/EN | 11 |
| Tests | 6 |
| Outil Microlink isolé — hors mission | 4 |
| **Total** | **185** |

### Configuration racine

```text
.env.example
.gitignore
.nvmrc
CLOUDFLARE_MIGRATION.md
README.md
next.config.mjs
package-lock.json
package.json
playwright.config.ts
tsconfig.json
wrangler.jsonc
```

### CI de vérification

```text
.github/workflows/cloudflare-static-export.yml
.github/workflows/ui-check.yml
```

### Documentation

```text
docs/AUDIT.md
docs/COMPETITIVE_CONTENT_STRATEGY.md
docs/EDITORIAL.md
docs/drafts/USABILITY_TEST_PROTOCOL_FR.md
```

### Pages Functions

```text
functions/articles/[[catchall]].js
functions/articles/index.js
functions/index.js
functions/package.json
```

### Configuration et bibliothèques

```text
lib/locale-routing.mjs
src/lib/article-links.ts
src/lib/free-resource-config.ts
src/lib/site-config.ts
src/lib/structured-data.ts
```

### Produits et captures — hors mission

```text
products/ui-ux-directory/README.md
products/ui-ux-directory/catalogue.json
products/ui-ux-directory/en/README.md
products/ui-ux-directory/en/catalogue.json
products/ui-ux-directory/en/gumroad-listing.md
products/ui-ux-directory/en/manifest.json
products/ui-ux-directory/en/marketing/cover-1280x720.png
products/ui-ux-directory/en/marketing/thumbnail-1080x1080.png
products/ui-ux-directory/en/publication-guide.md
products/ui-ux-directory/gumroad-listing.md
products/ui-ux-directory/manifest.json
products/ui-ux-directory/marketing/cover-1280x720.png
products/ui-ux-directory/marketing/thumbnail-1080x1080.png
products/ui-ux-directory/publication-guide.md
products/ui-ux-directory/screenshots/README.md
products/ui-ux-directory/screenshots/images/11-tweakcn.png
products/ui-ux-directory/screenshots/images/110-ai-brand-kits-live-brand-preview.png
products/ui-ux-directory/screenshots/images/12-realtime-colors.png
products/ui-ux-directory/screenshots/images/13-shadcn-design-theme-generator.png
products/ui-ux-directory/screenshots/images/14-huemint.png
products/ui-ux-directory/screenshots/images/15-radix-colors.png
products/ui-ux-directory/screenshots/images/16-ui-colors.png
products/ui-ux-directory/screenshots/images/17-material-theme-builder.png
products/ui-ux-directory/screenshots/images/18-coolors-et-color-hunt-2.png
products/ui-ux-directory/screenshots/images/18-coolors-et-color-hunt.png
products/ui-ux-directory/screenshots/images/19-khroma.png
products/ui-ux-directory/screenshots/images/21-typehue.png
products/ui-ux-directory/screenshots/images/210-sitepeel-font-changer.png
products/ui-ux-directory/screenshots/images/22-web-font-preview.png
products/ui-ux-directory/screenshots/images/23-ui-fonts.png
products/ui-ux-directory/screenshots/images/24-fontpair.png
products/ui-ux-directory/screenshots/images/25-fontjoy.png
products/ui-ux-directory/screenshots/images/26-google-fonts.png
products/ui-ux-directory/screenshots/images/28-uncut-wtf-et-fontesk-2.png
products/ui-ux-directory/screenshots/images/29-typescale.png
products/ui-ux-directory/screenshots/images/31-phosphor-icons.png
products/ui-ux-directory/screenshots/manifest.external-ddf2bcc.json
products/ui-ux-directory/screenshots/manifest.json
products/ui-ux-directory/source-original.md
```

### Fichiers publics, visuels et téléchargements

```text
public/_headers
public/_redirects
public/_routes.json
public/downloads/repertoire-ui-ux-fr-v1.md
public/downloads/repertoire-ui-ux-fr-v1.pdf
public/downloads/repertoire-ui-ux-gratuit-v1.zip
public/downloads/ui-ux-directory-en-v1.md
public/downloads/ui-ux-directory-en-v1.pdf
public/downloads/ui-ux-directory-free-en-v1.zip
public/images/articles/en/prod-pipeline.webp
public/images/articles/en/prod-verify-ai.webp
public/images/articles/en/ui-sbs-dark.webp
public/images/articles/en/ui-spacing.webp
public/images/articles/en/ux-cognitive.webp
public/images/articles/en/ux-states.webp
public/images/articles/fr/prod-pipeline.webp
public/images/articles/fr/prod-verify-ai.webp
public/images/articles/fr/ui-sbs-dark.webp
public/images/articles/fr/ui-spacing.webp
public/images/articles/fr/ux-cognitive.webp
public/images/articles/fr/ux-states.webp
public/images/author-joy.webp
public/images/en/audit-20min.webp
public/images/en/before-after-checkout.webp
public/images/en/before-after-loading.webp
public/images/en/bonus-ai-grid.webp
public/images/en/bonus-cover.webp
public/images/en/checklist-rules.webp
public/images/en/checkout-annotated.webp
public/images/en/contents.webp
public/images/en/cover.webp
public/images/en/eight-questions.webp
public/images/en/landing-annotated.webp
public/images/en/part-05-revenue.webp
public/images/fr/audit-20min.webp
public/images/fr/before-after-checkout.webp
public/images/fr/before-after-loading.webp
public/images/fr/bonus-ai-grid.webp
public/images/fr/bonus-cover.webp
public/images/fr/checklist-rules.webp
public/images/fr/checkout-annotated.webp
public/images/fr/contents.webp
public/images/fr/cover.webp
public/images/fr/eight-questions.webp
public/images/fr/landing-annotated.webp
public/images/fr/part-05-revenue.webp
public/images/free-directory/cover-en.jpg
public/images/free-directory/cover-fr.jpg
public/og-article-comparison-en.jpg
public/og-article-comparison-fr.jpg
public/og-article-product-en.jpg
public/og-article-product-fr.jpg
public/og-article-ui-en.jpg
public/og-article-ui-fr.jpg
public/og-article-ux-en.jpg
public/og-article-ux-fr.jpg
public/og-directory-en.jpg
public/og-directory-fr.jpg
public/og-en.jpg
public/og-fr.jpg
```

### Scripts de fabrication et validation

```text
scripts/check_static_export.cjs
scripts/content-data.cjs
scripts/free_resource_layout.cjs
scripts/free_resource_screenshots.cjs
scripts/generate_free_resource.cjs
scripts/generate_free_resource_en.cjs
scripts/preview_pages.cjs
scripts/site_check.py
scripts/social_images.cjs
```

### Routes Next et styles

```text
src/app/[locale]/articles/[slug]/page.tsx
src/app/[locale]/articles/page.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/app/[locale]/resources/ui-ux-directory/page.tsx
src/app/globals.css
src/app/icon.svg
src/app/llms-full.txt/route.ts
src/app/llms.txt/route.ts
src/app/robots.ts
src/app/sitemap.ts
```

### Composants React

```text
src/components/ArticleCardVisual.tsx
src/components/ArticleVisual.tsx
src/components/BookGalleryLightbox.tsx
src/components/ContentsExplorer.tsx
src/components/DesignRolesLab.tsx
src/components/DesignVector.tsx
src/components/FreeResourceDownload.tsx
src/components/FreeResourcePromo.tsx
src/components/GumroadButton.tsx
src/components/Icon.tsx
src/components/LiveAgentDemo.tsx
src/components/NotionArticleReader.tsx
src/components/TabularText.tsx
src/components/ThemeAndLangControls.tsx
src/components/useModalFocus.ts
```

### Polices et licences

```text
src/fonts/LICENSES.md
src/fonts/OFL-Domine.txt
src/fonts/domine-latin-ext.woff2
src/fonts/domine-latin.woff2
```

### Contenus et données FR/EN

```text
src/i18n/article-catalog.json
src/i18n/articles.ts
src/i18n/articles/comparison-en.ts
src/i18n/articles/comparison-fr.ts
src/i18n/articles/en.ts
src/i18n/articles/fr.ts
src/i18n/articles/types.ts
src/i18n/articles/visual-types.ts
src/i18n/content.ts
src/i18n/design-lab.ts
src/i18n/free-resource.ts
```

### Tests

```text
tests/editorial-content.test.cjs
tests/editorial.spec.ts
tests/free-resource.test.cjs
tests/locale-routing.test.mjs
tests/resource-screenshots.test.cjs
tests/ui.spec.ts
```

### Outil Microlink isolé — hors mission

```text
tools/microlink/capture.mjs
tools/microlink/import-key.mjs
tools/microlink/package-lock.json
tools/microlink/package.json
```
