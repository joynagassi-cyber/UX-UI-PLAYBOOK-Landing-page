#!/usr/bin/env python3
"""Independent PDF/ZIP inspection, using PyMuPDF and Pillow, without network access.

Run after generating and packaging both editions. This is a scoped artifact
check, not PDF/UA certification, a functional site audit, or production evidence.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import zipfile

from PIL import Image
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "products/ui-ux-directory"
sha = lambda value: hashlib.sha256(value).hexdigest()
def normalize(text):
    # PDF text extraction adds a newline at a visual wrap after an existing
    # compound-word hyphen. Preserve that hyphen, without adding a word space.
    text = re.sub(r"(?<=\w)-\s*\n\s*(?=\w)", "-", text)
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", text)).strip()


def verify():
    checks = []

    def check(name, success, evidence):
        checks.append({"name": name, "passed": bool(success), "evidence": evidence})

    captures = json.loads((BASE / "screenshots/manifest.json").read_text())["captures"]
    approved = {url: capture for url, capture in captures.items() if capture.get("review") == "approved"}
    review = json.loads((BASE / "screenshots/visual-review.json").read_text())
    check("review-counts", len(review["images"]) == 21 and len(approved) == 20, "21 supplied originals; 20 included previews")
    external_path = BASE / "screenshots/manifest.external-ddf2bcc.json"
    check("external-provenance", sha(external_path.read_bytes()) == "011e4bf6271acf95696e23204e2db2388e26e8445f6b9aa650ba7c63ff88661a", external_path.name)
    external = json.loads(external_path.read_text())
    for record in external["entries"]:
        if record["status"] == "approved":
            check("original:" + record["url"], sha((BASE / "screenshots" / record["file"]).read_bytes()) == record["sha256"], "Supplied original preserved byte-for-byte")
    for locale in ("fr", "en"):
        folder = BASE / "en" if locale == "en" else BASE
        catalog = json.loads((folder / "catalogue.json").read_text())
        manifest = json.loads((folder / "manifest.json").read_text())
        pdf_path = ROOT / manifest["files"]["pdf"]["path"]
        pdf = pymupdf.open(pdf_path)
        check(locale + ":pages", len(pdf) == manifest["counts"]["guidePages"] == 54, len(pdf))
        check(locale + ":bookmarks", len(pdf.get_toc()) > 51, len(pdf.get_toc()))
        catalog_object = pdf.xref_object(pdf.pdf_catalog())
        check(locale + ":tags-language", f"/Lang ({locale})" in catalog_object and "/StructTreeRoot" in catalog_object and "/Marked true" in catalog_object, "Structural tags and document language only, not a conformance claim")
        text = normalize(" ".join(page.get_text() for page in pdf))
        destinations = {link.get("uri") for page in pdf for link in page.get_links() if link.get("uri")}
        urls = {url for entry in catalog["entries"] for url in entry["urls"]}
        check(locale + ":resource-links", len(urls) == 75 and urls <= destinations, {"expected": len(urls), "found": len(urls & destinations)})
        entries_found = [entry["id"] for entry in catalog["entries"] if normalize(entry["name"]) in text and all(normalize(entry[field]) in text for field in ("description", "nonDesigner", "developer", "agent", "watch"))]
        check(locale + ":complete-entry-text", len(entries_found) == 51, {"entriesFound": len(entries_found)})
        sources_found = [source["url"] for source in catalog["sources"] if source["url"] in destinations and normalize(source["note"]) in text]
        check(locale + ":source-notes", len(sources_found) == 11, len(sources_found))
        check(locale + ":no-withdrawn-return-links", not any("/resources/ui-ux-directory" in url or "/downloads/" in url for url in destinations), "Client files do not link back to withdrawn directory/download paths")
        image_pages = []
        matched_urls = []
        out_of_bounds = []
        for page_number, page in enumerate(pdf, 1):
            # Inspect actual PDF text geometry, independently of HTML overflow checks.
            for block in page.get_text("dict")["blocks"]:
                if block["type"] != 0:
                    continue
                for line in block["lines"]:
                    for span in line["spans"]:
                        rect = pymupdf.Rect(span["bbox"])
                        if rect.x0 < -0.5 or rect.y0 < -0.5 or rect.x1 > page.rect.width + 0.5 or rect.y1 > page.rect.height + 0.5:
                            out_of_bounds.append({"page": page_number, "text": span["text"][:60]})
            images = page.get_image_info(xrefs=True)
            if not images:
                continue
            image_pages.append(page_number)
            check(f"{locale}:image-count-page-{page_number}", len(images) == 1, len(images))
            for image in images:
                image_rect = pymupdf.Rect(image["bbox"])
                links = [link for link in page.get_links() if link.get("uri") in approved and (pymupdf.Rect(link["from"]) & image_rect).get_area() >= image_rect.get_area() * 0.98]
                check(f"{locale}:clickable-image-page-{page_number}", len(links) == 1, [link.get("uri") for link in links])
                if not links:
                    continue
                url = links[0]["uri"]
                capture = approved[url]
                original = Image.open(BASE / "screenshots" / capture["image"]).convert("RGB")
                pixmap = pymupdf.Pixmap(pdf, image["xref"])
                pixels_match = pixmap.n == 3 and (pixmap.width, pixmap.height) == original.size and sha(pixmap.samples) == sha(original.tobytes())
                check(f"{locale}:image-pixels-page-{page_number}", pixels_match, {"url": url, "width": pixmap.width, "height": pixmap.height, "exactReviewedPixels": pixels_match})
                matched_urls.append(url)
                # The visible URL label has a separate link in addition to the image.
                check(f"{locale}:visible-image-url-page-{page_number}", sum(link.get("uri") == url for link in page.get_links()) == 2 and url in normalize(page.get_text()), url)
        check(locale + ":all-previews-once", len(image_pages) == len(matched_urls) == len(set(matched_urls)) == 20 and set(matched_urls) == set(manifest["screenshots"]["urls"]), image_pages)
        check(locale + ":no-pdf-text-outside-pages", not out_of_bounds, out_of_bounds)
        last = pdf[-1]
        paid_url = "https://joyccelight.gumroad.com/l/" + ("uiuxplaybookfr" if locale == "fr" else "uxuiplaybook")
        last_text = normalize(last.get_text())
        final_links = {link.get("uri") for link in last.get_links()}
        check(locale + ":final-paid-promotion", paid_url in final_links and all(str(value) in last_text for value in (182 if locale == "fr" else 171, 120, 77, 26, 12, 21, 29)) and ("Paiement unique" if locale == "fr" else "One-time payment") in last_text, {"url": paid_url, "finalPage": len(pdf)})
        check(locale + ":zero-price-cover", ("0 $" if locale == "fr" else "$0") in normalize(pdf[0].get_text()), "Zero price is printed on the book cover")
        with zipfile.ZipFile(ROOT / manifest["files"]["archive"]["path"]) as archive:
            names = archive.namelist()
            check(locale + ":customer-zip", archive.testzip() is None and len(names) == 7, names)
            worksheets = [name for name in names if name.endswith('.pdf') and 'Directory' not in name and 'Repertoire' not in name]
            check(locale + ":one-worksheet", len(worksheets) == 1, worksheets)
            worksheet = pymupdf.open(stream=archive.read(worksheets[0]), filetype="pdf")
            check(locale + ":worksheet-pages", len(worksheet) == 3, len(worksheet))
            check(locale + ":guide-zip-copy", archive.read(next(name for name in names if name.endswith(pdf_path.name))) == pdf_path.read_bytes(), pdf_path.name)
            for name in names:
                if name.endswith(('.md', '.txt', '.csv')):
                    content = archive.read(name).decode('utf-8-sig')
                    check(locale + ":client-text-links:" + Path(name).name, "/resources/ui-ux-directory" not in content and "/downloads/" not in content, "No retired return path")
        pdf.close()
    return checks


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='reports/free-resource-gumroad/pdf-zip-verification.json')
    args = parser.parse_args()
    checks = verify()
    failed = [check for check in checks if not check['passed']]
    report = {"scope": "Offline PDF/ZIP structure, text, link, image pixel integrity and provenance checks. Not accessibility certification or production evidence.", "passed": len(checks) - len(failed), "failed": len(failed), "checks": checks}
    target = ROOT / args.output
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    for item in failed:
        print('FAIL', item['name'], item['evidence'])
    print(f"Independent PDF/ZIP check: {report['passed']}/{len(checks)} passed; {len(failed)} failures. {target.relative_to(ROOT)}")
    return 1 if failed else 0


if __name__ == '__main__':
    raise SystemExit(main())
