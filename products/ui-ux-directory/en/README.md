# Free UI/UX Directory: English production and Gumroad delivery

Separate from the paid Playbook: **51 entries, 6 categories, 75 links and 20 website screenshots**. Some entries group several destinations; do not call the count 75 audited tools. Editorial text is in English; captured interfaces retain their original language.

## English deliverables

- [English customer ZIP](../releases/en/Free-UI-UX-Directory-EN.zip): **7 files**, approximately **2.35 MiB**.
- [English book PDF](../releases/en/Free-UI-UX-Directory-EN.pdf): **54 A4 pages**, including **20 preview pages**, before the final English Playbook promotion.
- [Markdown guide](../releases/en/Free-UI-UX-Directory-EN.md): complete entries, links and AI brief; screenshots appear only in the PDF.
- [Gumroad listing](gumroad-listing.md), [publication guide](publication-guide.md), [$0 cover](marketing/cover-1280x720.png) and [$0 thumbnail](marketing/thumbnail-1080x1080.png).
- [French edition](../README.md): separate customer files, copy and artwork.
- [Overall FR/EN publication kit](../releases/Livres-UI-UX-Gratuits-FR-EN-Kit-Gumroad.zip): both customer ZIPs, both book PDFs, marketing artwork and publication documents in separate folders. Do not upload it as one product’s customer download.

The customer ZIP contains `README-EN.md`, `Free-UI-UX-Directory-EN.pdf`, `Free-UI-UX-Directory-EN.md`, `UI-UX-Decision-Worksheet-EN.pdf`, `UI-UX-Decision-Worksheet-EN.md`, `UI-UX-Selection-Grid-EN.csv` and `LICENSES-EN.txt`. The worksheet has **3 printable pages**, not an interactive PDF form. The CSV uses UTF-8 with BOM, commas, **6 category rows and 11 columns**, plus the header.

## Sources and captures

`catalogue.json` translates the edited French catalogue with the same entry IDs, destinations and source URLs. None of the 51 entries was altered during screenshot integration. `manifest.json` records pages, off-site artifact paths, byte lengths, SHA-256 hashes and the 20 illustrated destinations.

The [shared capture notes](../screenshots/README.md) document the original external batch and offline review. All **21 original PNGs** and the external manifest remain unchanged. The canonical set contains **20 approved optimized previews**. One loading-state capture is excluded; other external rejections, failures and pending entries are not relabeled as successes. No new capture request was made.

Coverage is partial. Retrieval timestamps are reported by the supplier and not independently verified. Visual review is not a functional or legal audit of all 75 destinations.

## Regenerate offline

```bash
# Install Node dependencies and make Chromium available locally.
# CHROMIUM_EXECUTABLE_PATH can point to an existing browser.
npm run generate:resource:en
npm run check:resource
npm run package:resource
```

The npm command explicitly selects `--with-available-screenshots`. Partial mode still rejects corrupt or substituted approved files and symlinks. It does not fabricate missing screenshots. The historical strict mode remains available with `node scripts/generate_free_resource_en.cjs --with-screenshots`; it requires all 75 approved images before touching deliverables. It is not permission to acquire more captures.

The English generator writes only its customer artifacts and marketing images. Artifacts go to `products/ui-ux-directory/releases/en/`, never `public/downloads`. Work files stay in ignored `.cache/free-resource/en/`. Only image artwork is copied into `public`. Regenerate both languages after a canonical-origin change so printed return links remain correct, then review counts, listings and archives.

## Website withdrawal and publication

Directory pages, promotions, catalogue metadata, LLM exports and downloads are removed from the website source. Image assets remain. The four editorial guides per language and the paid offer are preserved. A local change does not establish production withdrawal.

**Gumroad products published by the owner: [Répertoire UI/UX gratuit FR](https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr) and [Free UI/UX Directory EN](https://joyccelight.gumroad.com/l/free-ui-ux-directory-en).** There is no teaser or direct-download fallback. The former `/fr/resources/ui-ux-directory` and `/en/resources/ui-ux-directory` addresses (including `.html` and trailing-slash forms) redirect with 308 to their language's product; the old downloads remain genuine 404s.

The creator should review the proposed guide terms. Screenshots are editorial previews, not reusable asset packs. No commercial, visibility or accessibility-conformance outcome is promised. Tagged PDF output is not PDF/UA certification.
