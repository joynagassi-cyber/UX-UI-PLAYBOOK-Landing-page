# Publish the English directory at $0

## Status and delivery boundaries

The files are prepared in this repository. **This agent has not published a Gumroad product.** The creator publishes through their own account without sharing passwords or tokens in chat.

At the owner’s request, directory pages, downloads and promotions have been removed from the website source. Image assets remain. A local change does not establish production removal: the website must still follow its normal deployment process.

There is no interim teaser, web catalogue or direct-download fallback. **The two real FR/EN Gumroad URLs are awaited before adding redirects in a later change.** No build variable currently publishes or activates those redirects.

## English files to use

| Purpose | File |
| --- | --- |
| Customer content to upload to Gumroad | [Free-UI-UX-Directory-EN.zip](../releases/en/Free-UI-UX-Directory-EN.zip) |
| PDF to review | [Free-UI-UX-Directory-EN.pdf](../releases/en/Free-UI-UX-Directory-EN.pdf) |
| $0 cover, 1280 × 720 | [cover-1280x720.png](marketing/cover-1280x720.png) |
| $0 thumbnail, 1080 × 1080 | [thumbnail-1080x1080.png](marketing/thumbnail-1080x1080.png) |
| Name, summary, description and messages | [gumroad-listing.md](gumroad-listing.md) |

**The English ZIP contains 7 files**, including a **54-page illustrated guide**, a **3-page printable worksheet**, two Markdown files, a CSV grid, a README and notices. Approximate size: **2.35 MiB**; exact byte lengths and SHA-256 hashes are in the manifest.

Do not upload the overall FR/EN publication archive as the customer file for one product. It also contains owner instructions and marketing images. Do not upload sources, separate website captures or the external manifest.

## Create and test the free product

1. Create a digital product in the Joyccelight account.
2. Copy the English listing fields. Remove internal instructions from public copy.
3. Set the amount to **$0**, with a suggested amount of **0** if that field exists. Any contribution must remain optional. Do not add a subscription or paid version.
4. Upload only the English customer ZIP. Check limits and requirements displayed in the account; current Gumroad rules were not revalidated here.
5. Add the landscape cover and square thumbnail to their respective marketing fields. Both show $0.
6. Confirm the English file language. Captured interfaces remain in their original language. The paid Playbook is not included.
7. Review the proposed terms in `LICENSES-EN.txt` and confirm the creator’s applicable business obligations. Screenshots grant no reuse rights to third-party content.
8. Publish yourself, then test in a private window while signed out of the seller account.

### Customer journey checklist

- Enter **0** and confirm that contributions are optional and no payment card is required to receive the free kit. If not, fix the settings before sharing the link.
- Download the ZIP actually served by Gumroad and confirm its **7 files**.
- Open both PDFs: **54 pages / 3 pages**, **20 screenshots** in the guide, readable text and clickable links.
- Test an image and its matching destination, then the English Playbook link on the final page: `https://joyccelight.gumroad.com/l/uxuiplaybook`.
- Open the CSV as UTF-8, comma-separated: **6 category rows**, **11 columns**, plus the header.
- Review the listing on a phone. Do not describe all 75 destinations as exhaustively audited.
- Handle any marketing consent separately. A download does not authorize silently subscribing a person to a newsletter.

## Supply both real URLs

After testing, supply the **two complete public URLs**, French and English. They must identify two separate free products. Do not provide administration URLs or reuse the paid Playbook checkouts.

The next change will add redirects to the correct editions and check old URL variants. Do not restore public PDF/ZIP files, teasers or fallbacks while waiting. Share the real Gumroad link only after testing it, not the withdrawn website page.

The existing editorial guides and paid Playbook remain available:

- https://joyccelight-playbook.uxplay.workers.dev/en/articles
- https://joyccelight-playbook.uxplay.workers.dev/en#buy

## Limitations and provenance

The PDF contains **20 previews for 75 links**. All 21 supplied originals are preserved; the image showing a generator still loading is excluded from the delivery. Images were optimized and visually reviewed offline. No additional screenshot API call was made.

Retrieval dates are reported by the external submission and were not independently verified. A screenshot does not validate a site’s current prices, licenses, performance or behavior. The PDF is tagged, but no PDF/UA conformance or accessibility certification is claimed.

## References to check before publication

These are verification starting points, not confirmation of current Gumroad rules in this task:

- https://gumroad.com/help/article/149-adding-a-product
- https://gumroad.com/help/article/133-pay-what-you-want-pricing
- https://gumroad.com/help/article/289-file-size-limits-on-gumroad
- https://gumroad.com/help/article/60-adding-a-cover-image
