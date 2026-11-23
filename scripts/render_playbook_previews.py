#!/usr/bin/env python3
"""Render only the 10 selected preview pages per language, never the full paid PDF.

Requires PyMuPDF and Pillow. All source bytes must match products/playbook-2026/counts.json.
Usage: python3 scripts/render_playbook_previews.py --source .cache/edition-2026/source
"""
import argparse
import hashlib
import io
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    import pymupdf
    from PIL import Image

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path)
    args = parser.parse_args()
    manifest = json.loads((ROOT / "products/playbook-2026/counts.json").read_text())
    outputs = []
    # Validate ALL inputs before replacing a single preview.
    for edition in manifest["editions"].values():
        for kind in ("book", "kit"):
            spec = edition[kind + "Source"]
            assert hashlib.sha256((args.source / spec["name"]).read_bytes()).hexdigest() == spec["sha256"], spec["name"]
    for locale, edition in manifest["editions"].items():
        docs = {kind: pymupdf.open(args.source / edition[kind + "Source"]["name"]) for kind in ("book", "kit")}
        try:
            for preview in edition["previews"]:
                page = docs[preview["document"]][preview["page"] - 1]
                pix = page.get_pixmap(matrix=pymupdf.Matrix(960 / page.rect.width, 960 / page.rect.width), alpha=False)
                image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
                image = image.resize((960, 1357), Image.Resampling.LANCZOS)
                output = ROOT / "public" / preview["path"].lstrip("/")
                assert output.parent == ROOT / "public/images" / locale
                output.parent.mkdir(parents=True, exist_ok=True)
                image.save(output, "WEBP", quality=88, method=6)
                data = output.read_bytes()
                outputs.append({**preview, "locale": locale, "bytes": len(data),
                                "sha256": hashlib.sha256(data).hexdigest(), "dimensions": [960, 1357]})
                print(preview["path"], f"{preview['document']} p. {preview['page']}")
        finally:
            for doc in docs.values():
                doc.close()
    report = ROOT / "reports/edition-2026-update/preview-assets.json"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(json.dumps(outputs, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
