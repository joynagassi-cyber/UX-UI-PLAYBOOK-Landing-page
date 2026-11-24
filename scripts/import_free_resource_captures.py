#!/usr/bin/env python3
"""Reconcile the preserved capture batch offline. Never fetch or call a capture API."""
import hashlib
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "products/ui-ux-directory/screenshots"
SOURCE = BASE / "manifest.external-ddf2bcc.json"
EXPECTED_SOURCE_SHA = "011e4bf6271acf95696e23204e2db2388e26e8445f6b9aa650ba7c63ff88661a"
sha = lambda value: hashlib.sha256(value).hexdigest()


def main():
    original = SOURCE.read_bytes()
    if sha(original) != EXPECTED_SOURCE_SHA:
        raise ValueError("The preserved source manifest changed; review required.")
    incoming = json.loads(original)
    review = json.loads((BASE / "visual-review.json").read_text())
    catalog = json.loads((ROOT / "products/ui-ux-directory/catalogue.json").read_text())
    urls = {url for entry in catalog["entries"] for url in entry["urls"]}
    assert len(incoming["entries"]) == len(urls) == 75
    assert {entry["url"] for entry in incoming["entries"]} == urls
    decisions = {entry["url"]: entry for entry in review["images"]}
    captures = {}
    staged = {}
    for entry in incoming["entries"]:
        url = entry["url"]
        capture = {"sourceUrl": url, "status": entry["status"], "externalStatus": entry["status"]}
        if entry["status"] == "failed" and entry.get("errorCode") == "ERATE":
            capture["error"] = {"code": "ERATE"}
        if entry["status"] == "approved":
            decision = decisions[url]
            relative = Path(entry["file"])
            assert relative.parts[0] == "images" and len(relative.parts) == 2
            file = BASE / relative
            assert not file.is_symlink() and file.is_file()
            source = file.read_bytes()
            assert sha(source) == entry["sha256"] == decision["originalSha256"]
            assert len(source) == entry["bytes"]
            image = Image.open(io.BytesIO(source))
            assert image.format == "PNG" and image.size == (entry["width"], entry["height"])
            capture["source"] = {"manifest": SOURCE.name, "image": entry["file"], "sha256": entry["sha256"], "reportedApprovedAt": entry.get("approvedAt")}
            capture["review"] = decision["decision"]
            capture["reviewNote"] = decision["reason"]
            if decision["decision"] == "approved":
                image = image.convert("RGB")
                image.thumbnail((960, 600), Image.Resampling.LANCZOS)
                output = io.BytesIO()
                image.quantize(colors=256, method=Image.Quantize.MEDIANCUT).save(output, "PNG", optimize=True)
                data = output.getvalue()
                assert len(data) <= 200_000
                assert sha(data) == decision["optimizedSha256"], "Derivative changed; inspect it before recording a new approval."
                assert image.size == (decision["optimizedWidth"], decision["optimizedHeight"])
                name = "images/" + sha(url.encode())[:20] + ".png"
                staged[name] = data
                capture.update(status="captured", image=name, width=image.width, height=image.height, bytes=len(data), sha256=sha(data), retrievedAt=entry["capturedAt"])
            else:
                capture["status"] = "rejected"
        captures[url] = capture
    assert len(decisions) == 21 and sum(c.get("review") == "approved" for c in captures.values()) == 20
    manifest = {
        "version": 1, "provider": "microlink",
        "requestOptions": json.loads((BASE / "manifest.json").read_text())["requestOptions"],
        "captures": captures,
        "externalImport": {"manifest": SOURCE.name, "sha256": EXPECTED_SOURCE_SHA, "sourceCommit": "ddf2bccc6864d4f23b15e0da043df7189d869c76", "originalImages": 21, "includedImages": 20, "reviewFile": "visual-review.json", "method": "Offline resize, no crop, 256-color PNG. Original files are unchanged."},
        "acquisitionPaused": {"reason": "Owner requested a partial illustrated release from existing images only. No new capture budget or retry authorized."},
    }
    for name, data in staged.items():
        (BASE / name).write_bytes(data)
    (BASE / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print("Offline import: 21 originals preserved, 20 optimized previews, 1 loading-state image excluded; zero network requests.")


if __name__ == "__main__":
    main()
