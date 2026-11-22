#!/usr/bin/env python3
"""Read-only SEO/robots/links/HTTP checks against the actual static Pages server.

A forged local User-Agent is NOT evidence that a real crawler reached production.
JSON-LD validation below is a scoped structural/content check, not a Google rich
results eligibility decision or a full Schema.org vocabulary validator.
"""
from __future__ import annotations
import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse, unquote
from urllib.request import Request, build_opener
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET
from site_check import Document, NoRedirect

ROOT = Path(__file__).resolve().parents[1]
POLICY = json.loads((ROOT / "src/config/site-policy.json").read_text())
BOTS = json.loads((ROOT / "src/config/crawler-policy.json").read_text())
SLUGS = json.loads((ROOT / "src/i18n/article-catalog.json").read_text())
SUFFIXES = ["", "/articles", "/resources/ui-ux-directory", *[f"/articles/{slug}" for slug in SLUGS]]
ROUTES = [f"/{locale}{suffix}" for locale in ("fr", "en") for suffix in SUFFIXES]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://127.0.0.1:3100")
    parser.add_argument("--expected-origin", default=os.environ.get("NEXT_PUBLIC_SITE_URL", POLICY["defaultOrigin"]))
    parser.add_argument("--output", default="reports/seo-check.json")
    args = parser.parse_args()
    base, site = args.base_url.rstrip("/"), args.expected_origin.rstrip("/")
    origin = urlparse(site)
    if origin.scheme != "https" or not origin.hostname or origin.path or origin.query or origin.fragment or origin.username or origin.password:
        parser.error("Expected canonical origin must be public HTTPS, without credentials, path, query or fragment")
    checks, cache, documents = [], {}, {}
    opener = build_opener(NoRedirect)

    def check(rule, target, ok, evidence):
        checks.append({"id": rule, "target": target, "outcome": "pass" if ok else "fail", "evidence": evidence})

    def get(route, method="GET", agent=None):
        key = (route, method, agent)
        if key not in cache:
            request = Request(urljoin(base + "/", route.lstrip("/")), method=method, headers={"User-Agent": agent or "Playbook-local-seo-validation/1.0"})
            try:
                with opener.open(request, timeout=30) as response:
                    cache[key] = response.status, response.headers, response.read()
            except HTTPError as error:
                cache[key] = error.code, error.headers, error.read()
            except (URLError, TimeoutError, OSError) as error:
                cache[key] = 0, {}, str(type(error).__name__).encode()
        return cache[key]

    def meta(doc, name):
        return [node.attrs.get("content", "") for node in doc.all("meta") if node.attrs.get("name", node.attrs.get("property", "")).lower() == name]

    def unblocked(headers):
        return not re.search(r"\b(?:noindex|nofollow|none|nosnippet)\b", headers.get("X-Robots-Tag", ""), re.I)

    def normalized(value):
        return re.sub(r"\s+", " ", value).strip()

    for route in ROUTES:
        status, headers, body = get(route)
        check("HTTP", route, status == 200, {"status": status})
        if status != 200:
            continue
        doc = Document(body.decode("utf-8")).root
        documents[route] = doc
        locale, suffix = route.split("/")[1], route[3:]
        canonicals = [n.attrs.get("href") for n in doc.all("link") if n.attrs.get("rel") == "canonical"]
        check("CANONICAL", route, canonicals == [site + route], canonicals)
        alternate_nodes = [n for n in doc.all("link") if n.attrs.get("rel") == "alternate" and n.attrs.get("hreflang")]
        alternates = {n.attrs["hreflang"]: n.attrs.get("href") for n in alternate_nodes}
        wanted = {"fr": f"{site}/fr{suffix}", "en": f"{site}/en{suffix}", "x-default": f"{site}/en{suffix}"}
        check("HREFLANG", route, len(alternate_nodes) == 3 and alternates == wanted, alternates)
        directives = meta(doc, "robots") + meta(doc, "googlebot") + meta(doc, "bingbot")
        check("INDEXABLE", route, bool(directives) and unblocked(headers) and not any(re.search(r"\b(?:noindex|nofollow|none|nosnippet)\b", d, re.I) for d in directives), {"meta": directives, "xRobotsTag": headers.get("X-Robots-Tag")})
        check("HTML_CONTENT", route, len(doc.all("main")) == 1 and len(doc.all("h1")) == 1 and len(normalized(doc.all("main")[0].text())) > 500, "Semantic, substantial content in raw HTTP HTML, before JavaScript")
        check("HTTP_LANGUAGE", route, headers.get("Content-Language") == locale, headers.get("Content-Language"))
        check("STATIC_PRIVACY", route, not headers.get("Set-Cookie") and not re.search(r"cookie|accept-language|cf-ipcountry", headers.get("Vary", ""), re.I), {"cache": headers.get("Cache-Control"), "vary": headers.get("Vary"), "setsCookie": bool(headers.get("Set-Cookie"))})
        check("SECURITY_HEADERS", route, headers.get("X-Content-Type-Options") == "nosniff" and headers.get("Referrer-Policy") == "strict-origin-when-cross-origin", "nosniff and strict-origin-when-cross-origin")
        check("META_UNIQUENESS", route, all(len(meta(doc, key)) == 1 and bool(meta(doc, key)[0]) for key in ("description", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image")) and len(doc.all("title")) == 1, "One title/description and one value for each required social tag")
        check("SOCIAL_ORIGIN", route, meta(doc, "og:url") == [site + route] and meta(doc, "og:image") == meta(doc, "twitter:image") and all(url.startswith(site + "/") for url in meta(doc, "og:image")), "Canonical and social URL/image use the same intentional origin")
        check("SOCIAL_IMAGE_ALTS", route, bool(meta(doc, "og:image:alt")) and bool(meta(doc, "twitter:image:alt")), "Descriptive social-image alternatives, not only image URLs")
        graph, valid = [], True
        for script in doc.all("script"):
            if script.attrs.get("type") != "application/ld+json":
                continue
            try:
                data = json.loads(script.text())
                valid = valid and data.get("@context") == "https://schema.org"
                graph.extend(data.get("@graph", [data]))
            except (ValueError, AttributeError):
                valid = False
        check("JSONLD_PARSE", route, valid and bool(graph), {"entities": len(graph)})
        types = {item.get("@type") for item in graph}
        required = {"Person", "TechArticle", "FAQPage", "BreadcrumbList"} if suffix.startswith("/articles/") else ({"Person", "Book", "WebPage", "FAQPage", "BreadcrumbList"} if suffix.startswith("/resources/") else ({"Person", "CollectionPage", "BreadcrumbList"} if suffix == "/articles" else {"Person", "WebSite", "Organization", "Product", "Book", "FAQPage"}))
        check("JSONLD_TYPES", route, required <= types, sorted(types))
        faqs = [item for item in graph if item.get("@type") == "FAQPage"]
        qa = [q for faq in faqs for q in faq.get("mainEntity", [])]
        # Never count text found only inside JSON-LD/RSC scripts as visible copy.
        rendered_qa = set()
        for details in doc.all("details"):
            summaries, answers = details.all("summary"), details.all(cls="faq-answer")
            if summaries and answers:
                rendered_qa.add((normalized(summaries[0].text()), normalized(answers[0].text())))
        check("JSONLD_VISIBLE_FAQ", route, all(q.get("@type") == "Question" and q.get("acceptedAnswer", {}).get("@type") == "Answer" and (normalized(q.get("name", "")), normalized(q.get("acceptedAnswer", {}).get("text", ""))) in rendered_qa for q in qa), {"questionsMatched": len(qa), "renderedPairs": len(rendered_qa)})
        for item in graph:
            if item.get("@type") == "TechArticle":
                refs = {a.attrs.get("href") for ol in doc.all("ol", "notion-refs-list") for a in ol.all("a")}
                check("JSONLD_ARTICLE", route, item.get("mainEntityOfPage") == site + route and item.get("inLanguage") == locale and item.get("author", {}).get("@id") == site + "/#joy-n" and {r.get("url") for r in item.get("citation", [])} == refs and item.get("isPartOf", {}).get("@type") == "WebSite", {"citations": len(refs), "datesAreEditorialNotCrawlEvidence": True})
        probe = route + "?utm_source=seo_probe_private&a=1&a=2&next=https%3A%2F%2Finvalid.example%2F"
        pstatus, _, pbody = get(probe)
        check("PARAMETER_CANONICAL", route, pstatus == 200 and pbody == body, "Parameter variants return the same static HTML; canonical has neither query nor fragment")
        hstatus, hheaders, hbody = get(route, "HEAD")
        check("HEAD", route, hstatus == 200 and not hbody and unblocked(hheaders), {"status": hstatus})

    titles = [d.all("title")[0].text() for d in documents.values() if d.all("title")]
    check("UNIQUE_TITLES", "all localized pages", len(titles) == 14 and len(set(titles)) == 14, {"unique": len(set(titles))})
    edge_graph = {route: set() for route in ROUTES}
    issues, checked_links, external = [], 0, set()
    for route, doc in documents.items():
        for a in doc.all("a"):
            href = a.attrs.get("href", "")
            if not href or href.startswith(("mailto:", "tel:")):
                continue
            target = urlparse(urljoin(site + route, href))
            if target.netloc != origin.netloc:
                external.add(target.geturl())
                continue
            target_path = unquote(target.path) or "/"
            checked_links += 1
            if target_path in edge_graph:
                edge_graph[route].add(target_path)
            status, _, _ = get(target_path)
            if status not in (200, 301, 307, 308):
                issues.append({"from": route, "href": href, "status": status})
            if target.fragment and target_path in documents:
                ids = {n.attrs.get("id") for n in documents[target_path].all()}
                if unquote(target.fragment) not in ids:
                    issues.append({"from": route, "href": href, "missingAnchor": target.fragment})
    check("INTERNAL_LINKS_AND_ANCHORS", "14 pages", not issues, {"checked": checked_links, "issues": issues, "externalUrlsNotHTTPVerified": len(external)})
    reachable, pending = set(), ["/fr", "/en"]
    while pending:
        route = pending.pop()
        if route in reachable:
            continue
        reachable.add(route)
        pending.extend(edge_graph.get(route, set()) - reachable)
    check("NO_ORPHAN_PAGES", "internal link graph", reachable == set(ROUTES), {"reachable": len(reachable), "missing": sorted(set(ROUTES) - reachable)})

    status, headers, body = get("/sitemap.xml")
    check("SITEMAP_HTTP", "/sitemap.xml", status == 200 and "xml" in headers.get("Content-Type", ""), {"status": status, "type": headers.get("Content-Type")})
    try:
        tree = ET.fromstring(body)
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "h": "http://www.w3.org/1999/xhtml"}
        entries = tree.findall("s:url", ns)
        locs = [e.findtext("s:loc", namespaces=ns) for e in entries]
        check("SITEMAP_URLS", "/sitemap.xml", len(locs) == len(set(locs)) == 14 and set(locs) == {site + r for r in ROUTES}, locs)
        check("SITEMAP_LASTMOD", "/sitemap.xml", not tree.findall(".//s:lastmod", ns), "No unverified lastmod, build-time freshness or fabricated time")
        for entry in entries:
            loc = entry.findtext("s:loc", namespaces=ns)
            suffix = urlparse(loc).path[3:]
            alt = {node.attrib.get("hreflang"): node.attrib.get("href") for node in entry.findall("h:link", ns)}
            wanted = {"fr": site + "/fr" + suffix, "en": site + "/en" + suffix, "x-default": site + "/en" + suffix}
            check("SITEMAP_ALTERNATES", loc, alt == wanted, alt)
    except (ET.ParseError, TypeError) as error:
        check("SITEMAP_XML", "/sitemap.xml", False, str(error))

    status, headers, body = get("/robots.txt")
    text = body.decode("utf-8", errors="replace")
    robots = RobotFileParser()
    robots.parse(text.splitlines())
    check("ROBOTS_HTTP", "/robots.txt", status == 200 and headers.get("Content-Type", "").startswith("text/plain"), {"status": status})
    check("ROBOTS_SITEMAP", "/robots.txt", robots.site_maps() == [site + "/sitemap.xml"], robots.site_maps())
    bot_results = []
    machine = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt"]
    for bot in BOTS:
        name = bot["userAgent"]
        allowed = all(robots.can_fetch(name, site + r) for r in ["/", *ROUTES, *machine])
        check("ROBOTS_ALLOW", name, allowed and re.search(r"^User-Agent: " + re.escape(name) + r"$", text, re.M) is not None, {"declaredPurpose": bot["purpose"], "allowed": allowed})
        # Extended controls are provider directives, not separate fetch identities.
        if bot["purpose"].startswith("provider-control"):
            continue
        outcomes = []
        for route in [*ROUTES, *machine]:
            bstatus, bheaders, bbody = get(route, agent=name)
            human_body = get(route)[2]
            ok = bstatus == 200 and unblocked(bheaders) and hashlib.sha256(bbody).digest() == hashlib.sha256(human_body).digest()
            outcomes.append(ok)
            check("LOCAL_BOT_HTTP", f"{name} {route}", ok, {"status": bstatus, "sameBodyAsDefault": bbody == human_body, "xRobotsTag": bheaders.get("X-Robots-Tag")})
        bot_results.append({"userAgent": name, "purpose": bot["purpose"], "robotsAllowed": allowed, "localHttpPaths": len(outcomes), "localHttpPassed": sum(outcomes), "cloudflareAccountChecked": False, "publicCrawlerAccessVerified": False, "observedRealCrawlsOrCitations": None})

    for route in ["/missing-page", "/de", "/de/articles", "/fr/missing", "/en/articles/missing", "/fr/resources/missing", "/_private-draft"]:
        status, _, body = get(route)
        doc = Document(body.decode("utf-8", errors="replace")).root
        check("REAL_404", route, status == 404 and any("noindex" in v for v in meta(doc, "robots")) and not [n for n in doc.all("link") if n.attrs.get("rel") == "canonical"] and {"/fr", "/en"} <= {a.attrs.get("href") for a in doc.all("a")}, {"status": status, "noindex": meta(doc, "robots")})
    for path in ["/fr.html", "/en.html", "/fr/articles/ux-design-guide.html", "/en/resources/ui-ux-directory.html", "/fr/", "/en/articles/"]:
        query = "?utm_source=seo&a=1&a=2&label=hello%20world"
        status, headers, _ = get(path + query)
        target = urlparse(urljoin(base, headers.get("Location", "")))
        expected = path.removesuffix(".html").rstrip("/")
        check("CANONICAL_REDIRECT", path, status in (301, 308) and target.path == expected and target.query == query[1:] and target.netloc == urlparse(base).netloc, {"status": status, "location": headers.get("Location")})
    for locale in ("fr", "en"):
        status, headers, _ = get(f"/{locale}?utm_source=seo")
        check("NO_LOCALE_COOKIE_FROM_GET", locale, status == 200 and not headers.get("Set-Cookie"), "Static localized GET does not set tracking or preference cookies")
    immutable = next((a.attrs.get("src") for d in documents.values() for a in d.all("script") if a.attrs.get("src", "").startswith("/_next/static/")), None)
    if immutable:
        _, headers, _ = get(immutable)
        check("HASHED_ASSET_CACHE", immutable, "immutable" in headers.get("Cache-Control", "") and "31536000" in headers.get("Cache-Control", ""), headers.get("Cache-Control"))
    failures = [c for c in checks if c["outcome"] == "fail"]
    report = {"generatedAt": datetime.now(timezone.utc).isoformat(), "scope": "local HTTP and scoped static-content/JSON-LD validation, not production or indexing evidence", "baseUrl": base, "expectedOrigin": site, "routes": ROUTES, "passed": len(checks) - len(failures), "failed": len(failures), "requests": len(cache), "bots": bot_results, "unverified": ["Cloudflare account settings/WAF/managed robots", "Actual public origin and DNS/redirect convergence", "Authentic crawler logs and generative citations", "External-link availability beyond local destination structure", "Google rich-results eligibility and indexing"], "ruleCounts": dict(Counter(c["id"] for c in checks)), "checks": checks}
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    for c in failures:
        print(f"FAIL {c['id']} {c['target']}: {c['evidence']}")
    print(f"SEO HTTP: {report['passed']}/{len(checks)} passed; {report['failed']} failures; {len(cache)} requests. {output}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
