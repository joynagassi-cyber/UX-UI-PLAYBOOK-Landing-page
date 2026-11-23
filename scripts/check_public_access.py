#!/usr/bin/env python3
"""Small unauthenticated, read-only public HTTP probe; never changes hosting/DNS.

Stop after the first network error or challenge/error response. A successful
request from this client is not proof of authentic crawler access or indexing.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, build_opener
from site_check import NoRedirect

ROOT = Path(__file__).resolve().parents[1]
DEFAULT = json.loads((ROOT / "src/config/site-policy.json").read_text())["defaultOrigin"]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--origin", default=os.environ.get("NEXT_PUBLIC_SITE_URL", DEFAULT))
parser.add_argument("--output", default="reports/public-access-check.json")
args = parser.parse_args()
origin = args.origin.rstrip("/")
parsed = urlparse(origin)
if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password or parsed.path or parsed.query or parsed.fragment:
    parser.error("Use the deliberate public HTTPS origin, not credentials or a URL path")
slugs = json.loads((ROOT / "src/i18n/article-catalog.json").read_text())
paths = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", *[f"/{locale}{suffix}" for locale in ("fr", "en") for suffix in ("", "/articles", "/resources/ui-ux-directory", *[f"/articles/{s}" for s in slugs])]]
report = {"attemptedAt": datetime.now(timezone.utc).isoformat(), "origin": origin, "scope": "Unauthenticated client HTTP only, not real crawler access", "cloudflareAccountChecked": False, "dnsChanged": False, "deployment": False, "authenticCrawlerAccessVerified": False, "observedCrawlsOrCitations": None, "responses": []}
opener = build_opener(NoRedirect)
for path in paths:
    try:
        request = Request(origin + path, headers={"User-Agent": "Playbook-read-only-validation/1.0"})
        try:
            response = opener.open(request, timeout=15)
        except HTTPError as error:
            response = error
        with response:
            body = response.read(5_000_000)
            report["responses"].append({"path": path, "status": response.code, "contentType": response.headers.get("Content-Type"), "xRobotsTag": response.headers.get("X-Robots-Tag"), "location": response.headers.get("Location"), "bytes": len(body), "sha256": hashlib.sha256(body).hexdigest()})
            if response.code != 200:
                report["stoppedBecause"] = "Non-200 response; inspect before any further request. No bypass attempted."
                break
    except (URLError, TimeoutError, OSError) as error:
        report["networkFailure"] = {"path": path, "type": type(error).__name__}
        report["stoppedBecause"] = "No HTTP response obtained from this environment. Network access is restricted; this is not evidence of a production crawler block."
        break
report["publicHttpResponseObtained"] = bool(report["responses"])
report["allExpectedPublicPathsReturned200"] = len(report["responses"]) == len(paths) and all(r["status"] == 200 for r in report["responses"])
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(report, ensure_ascii=False, indent=2))
# Exit 2 distinguishes unavailable/incomplete public evidence from local test failure.
raise SystemExit(0 if report["allExpectedPublicPathsReturned200"] else 2)
