# Publish the English UI/UX Directory on Gumroad

## Current status

The English downloadable product and its website integration are prepared in this repository. **No English Gumroad product has been created or published, and no website deployment was performed for this task.** The creator completes publication in their own account; no passwords or tokens need to be shared in chat.

Until a real English checkout is published and tested, the English website export serves the English ZIP directly, without an email form or an invented Gumroad link. A local preview is not a production deployment.

**Later illustration request:** the [Microlink workflow](../screenshots/README.md) preserves 21 externally supplied PNGs and their original manifest. Offline reconciliation is still required; new capture calls are blocked to prevent duplicate paid requests. No illustrated kit has been generated here. The files and counts below describe the current kit **without screenshots**. Update the listing and these counts after real illustrated generation; do not advertise previews before they are in the delivered PDF.

## 1. Files to use

| Purpose | File |
| --- | --- |
| Customer delivery | [ui-ux-directory-free-en-v1.zip](../../../public/downloads/ui-ux-directory-free-en-v1.zip) |
| Landscape marketing cover | [cover-1280x720.png](marketing/cover-1280x720.png) |
| Square thumbnail | [thumbnail-1080x1080.png](marketing/thumbnail-1080x1080.png) |
| Product title, summary, description and messages | [gumroad-listing.md](gumroad-listing.md) |
| Guide PDF for review | [ui-ux-directory-en-v1.pdf](../../../public/downloads/ui-ux-directory-en-v1.pdf) |
| Guide Markdown for review | [ui-ux-directory-en-v1.md](../../../public/downloads/ui-ux-directory-en-v1.md) |
| Exact sizes, hashes and page counts | [manifest.json](manifest.json) |

Upload **only the customer ZIP** as the product’s content. It is approximately **504 KiB**, well under 1 MiB. Do not upload the source catalogue, the original supplied document, marketing artwork, this publication guide or the listing instructions as customer files.

The ZIP contains exactly these seven files under `ui-ux-directory/`:

1. `README.md` — how to begin and what is included.
2. `ui-ux-directory-en.pdf` — 34 A4 pages, clickable links.
3. `ui-ux-directory-en.md` — the same editorial guide as editable text.
4. `decision-worksheet.pdf` — 3 printable A4 pages; not an interactive PDF form.
5. `decision-worksheet.md` — the editable decision worksheet.
6. `selection-grid.csv` — 6 blank category rows, 11 columns, UTF-8 with BOM, **comma-separated**.
7. `LICENSES.txt` — guide terms and Domine/Lucide notices.

Before publishing, review the English text, the proposed terms in `LICENSES.txt` and the references. Confirm the obligations that apply to your activity. No third-party resource packs are included; do not add any without permission.

The English catalogue translates the edited French directory dated November 18, 2026. It preserves 51 entries, 6 categories, 75 resource links and 11 reference notes; it does not represent a new exhaustive review of those external services.

## 2. Create a separate free English product

1. In the creator’s account, go to **Products → New product** and choose a digital product suitable for a ZIP. Exact interface labels may change.
2. Create a **separate English product**, rather than replacing the French content or reusing the paid Playbook checkout.
3. Copy the English name, summary and description from `gumroad-listing.md`. Leave internal instructions out of the public page.
4. Set **Amount to 0**. The referenced Gumroad help describes this as pay-what-you-want pricing with a free option. Set the suggested amount to **0** if that field is available.
5. Do not add paid versions or a subscription. Check that the buyer can enter **0** and receive the kit without a payment card. Any contribution must remain optional.
6. Upload `ui-ux-directory-free-en-v1.zip` as the customer content. The referenced free-product limit is **250 MB of total content**; this kit is far smaller. Recheck current account limits before publishing.
7. Add the **1280 × 720** cover and **1080 × 1080** thumbnail from this English folder. They are marketing images, not customer-delivery content.
8. Confirm that the title and description say **English**, **34 guide pages**, **3 worksheet pages** and **7 files**. The paid Playbook is not included. Available button text is controlled by Gumroad; do not promise a custom CTA label.
9. Complete any identity, sales or account requirements shown in the account, then publish yourself.

## 3. Test the public free path before sharing

- Open the published product in a private window, outside the seller account.
- Enter **0** and complete the free download path. Confirm no contribution is required.
- Download the ZIP delivered by Gumroad, extract it and verify all seven English files.
- Open both PDFs and check **34 / 3 pages**, readable text and clickable links.
- Confirm that the guide contains English entries across all six categories, not just an English cover.
- Open the CSV in a spreadsheet using UTF-8 and a **comma** delimiter; confirm 11 columns and 6 category rows.
- Check the product page on a phone, including language and the distinction from the paid Playbook.
- If marketing communications are offered, handle consent separately from file delivery. Do not silently subscribe everyone who downloads.
- Copy **the actual public English product URL**.

## 4. Connect that English URL to the website

Set this build-time variable only after the preceding test succeeds:

```env
NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN=
```

Put the real HTTPS product URL from the `joyccelight.gumroad.com` store in that field, with `/l/` followed by its assigned slug. **Leave it empty while the product is unpublished or untested.** Do not invent a slug, use the French kit’s URL or use either paid Playbook URL.

The editions are configured independently:

```env
# Real French product URL, once published and tested:
NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_FR=
# Real English product URL, once published and tested:
NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN=
# Legacy French-only fallback; never read by the English CTA:
NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL=
```

The explicit French setting takes priority over the legacy French-only setting. An empty English setting always keeps the English direct download—even if a French Gumroad URL is configured. Identical FR and EN checkout URLs are rejected to help prevent language mix-ups. Validation checks URL syntax and separation from the paid products, **not the remote product’s existence, contents or price**; the owner’s free-path test remains necessary.

Rebuild and check the static site:

```bash
npm run check:resource
npm run typecheck
npm run test:routing
npm run build
npm run check:export
npm run preview:pages
# In another terminal:
python3 scripts/site_check.py --base-url http://127.0.0.1:3100
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
```

The English primary CTA then becomes **“Get it free on Gumroad”**. English PDF and Markdown links remain real local files. The French page retains its own files and independent checkout setting. No website email form is added. Incoming UTM parameters use the existing button behavior; no new analytics service is installed.

Deploy the revision using the owner’s **Cloudflare** process only after validation. A build-time variable requires a new static build; changing a dashboard value alone cannot update existing HTML. No deployment is performed by these instructions.

Website pages to share **after their deployment is confirmed**:

- English files: `/en/resources/ui-ux-directory`.
- French files: `/fr/resources/ui-ux-directory`.

The current canonical build origin is `https://joyccelight-playbook.uxplay.workers.dev`. Its appearance in the guide does not establish that these pages are live. If the final origin changes, regenerate **both editions** with the correct `NEXT_PUBLIC_SITE_URL` before publication. Printed links do not change by themselves.

## 5. Regenerate the English edition when needed

The edited English source is `products/ui-ux-directory/en/catalogue.json`.

```bash
# Requires a local Chromium installation; alternatively set CHROMIUM_EXECUTABLE_PATH.
npm run generate:resource:en
npm run check:resource
```

The generator writes English downloads, their manifest, English marketing images and English website artwork. It does not overwrite the French downloads. Working files stay under ignored `.cache/free-resource/en/`. See [README.md](README.md) for the build scope.

## 6. A simple launch, without traffic promises

1. Publish and test the English Gumroad product; deploy and test the English website page.
2. Use the English launch post from the listing document and the supplied cover.
3. Keep the free directory reachable from the English home page, article hub and articles.
4. The guide’s return links lead to English articles and the separate paid Playbook, with UTM parameters. Those parameters do not collect data on their own.
5. Review downloads and feedback only with suitable tools and consent. No traffic, email signup, sales or compliance outcome is guaranteed.

## Configuration references

These are the Gumroad help references used for the French publication workflow and retained for this English equivalent. They were **not freshly revalidated during the translation**. Check the current help and account interface before publishing.

- Create a product: https://gumroad.com/help/article/149-adding-a-product
- Pay-what-you-want and a 0 amount: https://gumroad.com/help/article/133-pay-what-you-want-pricing
- File limits for free products: https://gumroad.com/help/article/289-file-size-limits-on-gumroad
- Cover and thumbnail: https://gumroad.com/help/article/60-adding-a-cover-image
