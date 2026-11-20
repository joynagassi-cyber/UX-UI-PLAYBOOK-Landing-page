# Free UI/UX Directory — English production files

The complete English equivalent of the edited French directory: **51 entries, 6 categories and 75 resource links**. Some entries group multiple websites; do not describe the count as “75 audited tools.” All 51 entries include a description, uses for three profiles and a caveat.

## Owner deliverables

- [Customer ZIP](../../../public/downloads/ui-ux-directory-free-en-v1.zip): 7 English files, approximately 504 KiB.
- [Guide PDF](../../../public/downloads/ui-ux-directory-en-v1.pdf): 34 A4 pages.
- [Guide Markdown](../../../public/downloads/ui-ux-directory-en-v1.md): the complete editorial guide.
- [Ready-to-copy English Gumroad listing](gumroad-listing.md): title, summary, description, delivery message and launch post.
- [Publication guide](publication-guide.md): free pricing, uploads, public-path test and independent English website checkout configuration.
- [Landscape cover](marketing/cover-1280x720.png): 1280 × 720 PNG.
- [Square thumbnail](marketing/thumbnail-1080x1080.png): 1080 × 1080 PNG.
- `catalogue.json`: complete English catalogue, translated from `../catalogue.json`, with matching entry IDs, resource URLs and source references.
- `manifest.json`: version, language, edition date, generation origin, counts, sizes and SHA-256 hashes.

The original source document remains in the parent folder for traceability only; neither it nor these publication instructions belong in the customer ZIP.

## Regenerate

```bash
# Install project dependencies first. Chromium must be available locally.
# CHROMIUM_EXECUTABLE_PATH may point to an existing browser.
npm run generate:resource:en
npm run check:resource
```

The English generator uses local Domine fonts and Lucide icons, with the shared print/artwork layout in `scripts/free_resource_layout.cjs`. It checks page overflow before printing; writes the English guide, worksheets, CSV, README and notices; packages an explicit seven-file allowlist; copies the standalone English PDF/Markdown; and updates the English manifest and images. Unrelated files in the working directory are not included. Temporary HTML, extracted files and review screenshots stay in ignored `.cache/free-resource/en/`.

English output paths:

- `public/downloads/ui-ux-directory-free-en-v1.zip`
- `public/downloads/ui-ux-directory-en-v1.pdf`
- `public/downloads/ui-ux-directory-en-v1.md`
- `public/images/free-directory/cover-en.jpg`
- `public/og-directory-en.jpg`
- `products/ui-ux-directory/en/marketing/`

`npm run generate:resource` remains the French generator. Neither language generator writes the other edition’s downloads or marketing images. When the canonical `NEXT_PUBLIC_SITE_URL` changes, regenerate **both** editions and rerun checks so the printed return links match. Do not edit binary files manually.

## Customer ZIP

The top-level `ui-ux-directory/` folder contains `README.md`, `ui-ux-directory-en.pdf`, `ui-ux-directory-en.md`, `decision-worksheet.pdf`, `decision-worksheet.md`, `selection-grid.csv` and `LICENSES.txt`. The worksheet PDF has 3 printable A4 pages and is not an interactive form. The CSV uses UTF-8 with BOM and commas, with 6 category rows and 11 columns to complete.

## Editorial scope

This translation preserves the French edition’s targeted corrections, cautions and source notes, dated **November 18, 2026**. It preserves the corrected React Native Reusables, Recharts and Chartist destinations; qualified ApexCharts, unDraw, Storyset, Fontshare and Lucide licensing descriptions; and the distinction between Radix Colors roles and actual contrast checks. It does not imply a new exhaustive availability or legal audit of all 75 destinations.

No third-party fonts, libraries, icons, illustrations or 3D packs from the directory are redistributed. The included Domine/Lucide notices concern the typeface and icons used to manufacture the documents. No accessibility, performance, AI-correctness, traffic or commercial outcome is guaranteed. Tagged PDFs are not a claim of PDF/UA or screen-reader certification. The proposed guide terms should be reviewed by the creator before publication.

## Publication

**No English Gumroad product was published and no website deployment was performed for this task.** The site offers the matching direct download while `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN` is empty. The French checkout setting—including its legacy fallback—never controls the English CTA. Publish a separate English product, test a customer purchase at 0, then supply its real URL at build time. See the [publication guide](publication-guide.md).

## Follow-up request: clickable Microlink website previews

The [capture workflow](../screenshots/README.md) explains the isolated Node 24+ SDK tool, secure local login/key import, one GitHub smoke test, explicit batch budget and reviewed PNG requirements. **No Microlink API calls were made from this environment.** The existing remote commit `ddf2bcc` supplied 21 PNGs marked approved in its own manifest; both images and that original manifest are preserved unchanged. Their schema, filenames, dimensions and size limits still need offline reconciliation, so `pendingExternalImport` blocks further capture requests with `EIMPORTPENDING`. Hash/dimension checks do not constitute a new visual approval here. The current English PDF/ZIP remain the 34-page edition without website images. The optional `--with-screenshots` mode refuses to overwrite outputs until all 75 images are present, hash-checked and approved. French and English reuse one shared image set. Publication page counts and sizes must be updated after that later illustrated generation, not before.
