#!/usr/bin/env python3
"""Dogfood checks for this site, not the Playbook's separate 77-rule scanner.

Python standard library only. A verification status describes HOW a rule is
checked; it never doubles as severity or pass/fail. Exit 1 for automated
blocking failures. Pending human checks are retained explicitly in JSON.
"""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from statistics import median
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler
import xml.etree.ElementTree as ET

SITE = "https://joyccelight-playbook.vercel.app"
ROOT = Path(__file__).resolve().parents[1]
SLUGS = ("ux-design-guide", "ui-design-system-tokens", "product-design-ai-agents")
STORES = {
    "fr": "https://joyccelight.gumroad.com/l/uiuxplaybookfr",
    "en": "https://joyccelight.gumroad.com/l/uxuiplaybook",
}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Element:
    def __init__(self, tag="document", attrs=(), parent=None):
        self.tag = tag
        self.attrs = dict(attrs)
        self.parent = parent
        self.children: list[Element | str] = []

    def all(self, tag=None, cls=None):
        result = []
        for child in self.children:
            if isinstance(child, Element):
                if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get("class", "").split()):
                    result.append(child)
                result.extend(child.all(tag, cls))
        return result

    def text(self):
        return "".join(child if isinstance(child, str) else child.text() for child in self.children)


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element()
        self.current = self.root
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs, self.current)
        self.current.children.append(element)
        if tag not in VOID:
            self.current = element

    def handle_endtag(self, tag):
        parent = self.current
        while parent.parent is not None:
            if parent.tag == tag:
                self.current = parent.parent
                return
            parent = parent.parent

    def handle_data(self, data):
        self.current.children.append(data)


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://127.0.0.1:3000")
    parser.add_argument("--output", default="reports/site-check.json")
    parser.add_argument("--wait", type=int, default=0, help="Startup grace period in seconds")
    args = parser.parse_args()
    base = args.base_url.rstrip("/")
    checks = []
    cache = {}
    opener = build_opener(NoRedirect)

    def record(rule, target, ok, evidence, severity="blocking", status="automated"):
        outcome = ("pass" if ok else "fail") if status == "automated" else ("pending" if status == "to verify" else "skipped")
        checks.append(dict(id=rule, target=target, status=status, severity=severity, outcome=outcome, evidence=evidence))

    def get(path, headers=None):
        key = (path, tuple(sorted((headers or {}).items())))
        if key not in cache:
            request = Request(urljoin(base + "/", path.lstrip("/")), headers=headers or {})
            try:
                with opener.open(request, timeout=20) as response:
                    cache[key] = (response.status, response.headers, response.read())
            except HTTPError as error:
                cache[key] = (error.code, error.headers, error.read())
        return cache[key]

    if args.wait:
        deadline = time.monotonic() + args.wait
        while True:
            try:
                get("/fr")
                break
            except (URLError, TimeoutError):
                if time.monotonic() >= deadline:
                    break
                time.sleep(0.5)

    routes = [f"/{lang}{suffix}" for lang in STORES for suffix in ("", "/articles", *(f"/articles/{slug}" for slug in SLUGS))]
    source_urls = set()
    prose_paragraphs = set()
    visual_titles = set()
    rejected_copy = re.compile(r"niveaux? de preuve|sources and evidence|annexe a5|appendix a5|dossiers? de terrain|field courses|\b(?:établi|established|probable)\b", re.I)
    # Targeted regressions for phrases removed in editorial review, not an AI detector
    # or an exhaustive judgement of prose quality. See docs/EDITORIAL.md.
    removed_slogans = re.compile(
        r"plus qu[’']un ebook|more than an ebook|execution system|tenir debout|tient debout|"
        r"make it hold|high.leverage checkout|règle d[’']or de l[’']ingénierie|"
        r"core law of agentic|attention tax|taxe d[’']attention|calm rigour|"
        r"cheapest anxiety reducer|réduction d[’']anxiété la moins chère|"
        r"scope.survival|phrases de survie|the 5 exact moments|5 moments exacts", re.I)
    for route in routes:
        lang = route.split("/")[1]
        is_article = any(route.endswith("/" + slug) for slug in SLUGS)
        try:
            status, _, raw = get(route)
            record("HTTP01", route, status == 200, f"GET {route}: HTTP {status}")
            if status != 200:
                continue
            doc = Document(raw.decode("utf-8")).root
            metas = {element.attrs.get("name", element.attrs.get("property", "")): element.attrs.get("content", "") for element in doc.all("meta")}
            links = doc.all("link")
            titles = doc.all("title")
            title = titles[0].text() if titles else ""
            description = metas.get("description", "")
            record("SEO01", route, len(titles) == 1 and 0 < len(title) <= 60 and 135 <= len(description) <= 155,
                   f"title={len(title)} chars; description={len(description)} chars")
            record("SEO02", route, "keywords" not in metas, "No meta[name=keywords]")
            record("SEO03", route, any(link.attrs.get("rel") == "canonical" and link.attrs.get("href") == SITE + route for link in links), "Canonical must match the localized production URL")
            alternates = {link.attrs.get("hreflang"): link.attrs.get("href") for link in links if link.attrs.get("rel") == "alternate"}
            suffix = route[3:]
            record("I18N01", route, all(alternates.get(code) == SITE + f"/{code}" + suffix for code in STORES), f"hreflang={alternates}")
            html_nodes = doc.all("html")
            record("I18N02", route, len(html_nodes) == 1 and html_nodes[0].attrs.get("lang") == lang and html_nodes[0].attrs.get("data-theme") == "dark", "Localized html[lang], dark server-rendered default")
            record("A01", route, len(doc.all("h1")) == 1, f"H1 count={len(doc.all('h1'))}")
            icons = doc.all("svg")
            invalid_icons = [icon.attrs for icon in icons if
                             "site-icon" not in icon.attrs.get("class", "").split()
                             or not icon.attrs.get("data-icon")
                             or icon.attrs.get("width") not in {"20", "24", "28", "40"}
                             or icon.attrs.get("width") != icon.attrs.get("height")
                             or icon.attrs.get("stroke-width") != "3"
                             or icon.attrs.get("aria-hidden") != "true"
                             or icon.attrs.get("focusable") != "false"]
            record("ICON01", route, bool(icons) and not invalid_icons,
                   f"{len(icons)} Lucide SVG icons, 20–40px, stroke 3, decorative semantics; invalid={invalid_icons}")
            pills = doc.all(cls="guide-cat-pill")
            record("ICON02", route, bool(pills) and all(
                len(pill.all("svg")) == 1 and pill.all("svg")[0].attrs.get("data-icon") in {"compass", "palette", "settings"}
                and pill.text().strip() not in {"compass", "palette", "settings"}
                for pill in pills), "Guide categories render real icons, never raw icon keys")
            store_links = [element.attrs.get("href", "") for element in doc.all("a") if "gumroad.com/l/" in element.attrs.get("href", "")]
            record("I18N03", route, bool(store_links) and all(url.split("?")[0] == STORES[lang] for url in store_links), f"{len(store_links)} localized purchase links")
            record("CONTACT01", route, any(element.attrs.get("href") == "mailto:joynagassi@gmail.com" for element in doc.all("a")), "Public contact mailto link")
            record("COPY01", route, not rejected_copy.search(doc.text()), "No source-rating badges or book-authority promotional labels")
            record("COPY03", route, not removed_slogans.search(doc.text()), "Selected removed promotional phrases have not returned; this is not an AI or style detector")
            footers = doc.all("footer")
            footer_text = " ".join(footer.text() for footer in footers)
            record("COPY02", route, bool(footers) and not re.search(r"usage commercial|commercial use|revente|resale|redistribution|TVA|VAT|seller of record|revendeur officiel|rejouables|reproducible site checks|automated measurements|mesures automatiques", footer_text, re.I)
                   and not doc.all(cls="footer-lic") and not doc.all(cls="footer-rule-badge"), "Footer contains copyright and useful links only")
            ids = [element.attrs["id"] for element in doc.all() if "id" in element.attrs]
            record("HTML01", route, len(ids) == len(set(ids)), "HTML IDs are unique")
            broken_anchors = [element.attrs["href"] for element in doc.all("a") if element.attrs.get("href", "").startswith("#") and element.attrs["href"][1:] not in ids]
            record("HTML02", route, not broken_anchors, f"Missing same-page anchors: {broken_anchors}")
            images = doc.all("img")
            invalid_images = [image.attrs.get("src") for image in images if not image.attrs.get("alt") or not image.attrs.get("width", "").isdigit() or not image.attrs.get("height", "").isdigit()]
            native_visuals = doc.all(cls="article-visual") + doc.all(cls="article-card-art")
            record("IMG01", route, bool(images or native_visuals) and not invalid_images, f"{len(images)} valid images and {len(native_visuals)} native text/CSS visuals; invalid={invalid_images}")
            for image in images:
                src = image.attrs.get("src", "")
                if src.startswith("/"):
                    asset_status, _, _ = get(src)
                    record("ASSET01", src, asset_status == 200, f"Referenced by {route}: HTTP {asset_status}")
            graphs = []
            for script in doc.all("script"):
                if script.attrs.get("type") == "application/ld+json":
                    try:
                        data = json.loads(script.text())
                        graphs.extend(data.get("@graph", [data]))
                    except (ValueError, AttributeError) as error:
                        record("SCHEMA01", route, False, f"Invalid JSON-LD: {error}")
            record("SCHEMA01", route, bool(graphs), f"Parsed {len(graphs)} JSON-LD entities")
            people = [item for item in graphs if item.get("@type") == "Person"]
            record("SCHEMA02", route, any(person.get("sameAs") and "https://github.com/joynagassi-cyber" in person["sameAs"] and "https://joyccelight.gumroad.com" in person["sameAs"] for person in people), "Author Person uses the two verified identity links")
            if is_article:
                articles = [item for item in graphs if item.get("@type") == "TechArticle"]
                citations = articles[0].get("citation", []) if articles else []
                refs = doc.all("ol", "notion-refs-list")
                reference_links = refs[0].all("a") if refs else []
                urls = {link.attrs.get("href", "") for link in reference_links}
                source_urls.update(urls)
                record("AEO01", route, bool(doc.all(cls="notion-entity-def")), "An entity definition precedes the guide summary")
                record("GEO01", route, len(citations) >= 3 and all(isinstance(citation, dict) and citation.get("@type") == "CreativeWork" and citation.get("url", "").startswith("https://") and citation.get("url") in urls for citation in citations), f"{len(citations)} JSON-LD citations matched to visible bibliography links")
                record("GEO02", route, len(urls) == len(citations) and all(url.startswith("https://") for url in urls), f"{len(urls)} distinct outbound HTTPS primary references")
                figures = doc.all("figure", "notion-figure")
                record("CONTENT01", route, len(figures) == 2 and all("data-summary-diagram" in figure.attrs and figure.all("figcaption") and figure.all("button") for figure in figures), f"Two compact native summary diagrams, each with a caption and enlarge control: {len(figures)}")
                explanations = doc.all(cls="notion-explainer")
                expected = {"ux-design-guide": 19, "ui-design-system-tokens": 14, "product-design-ai-agents": 13}[route.split("/")[-1]]
                record("CONTENT04", route, len(explanations) == expected and all(len(explanation.all("figure", "article-visual")) == 1 and explanation.all("p", "notion-p") and explanation.all("figcaption") for explanation in explanations), f"{len(explanations)}/{expected} prose explanations each paired with a labelled native visual")
                record("CONTENT05", route, not images, "No book-page scans or raster illustrations inside articles")
                headings = doc.all(cls="notion-refs-head")
                source_heading = "Sources et références" if lang == "fr" else "Sources and references"
                record("CONTENT06", route, len(headings) == 1 and headings[0].text().strip() == source_heading and not doc.all(cls="notion-refs-badge") and not doc.all(cls="notion-verified-pill"), "Plain Sources and references heading, with no source-rating badges")
                paragraphs = [paragraph.text() for explanation in explanations for paragraph in explanation.all("p", "notion-p")]
                prose_paragraphs.update(paragraphs)
                visual_titles.update(title.text() for title in doc.all(cls="article-visual-title"))
                lengths = [len(paragraph.split()) for paragraph in paragraphs]
                word_count = sum(lengths)
                developed = all(any(len(paragraph.text().split()) >= 100 for paragraph in explanation.all("p", "notion-p")) for explanation in explanations)
                record("CONTENT07", route, len(paragraphs) >= expected and developed and word_count >= expected * 125,
                       f"{len(paragraphs)} developed paragraphs, {word_count} prose words; min/median/max={min(lengths, default=0)}/{median(lengths) if lengths else 0}/{max(lengths, default=0)}. Length is not a comprehension measure.")
                ctas = doc.all(cls="notion-inline-cta")
                record("CONTENT02", route, len(ctas) == 1 and bool(ctas[0].all("a")), "One contextual mid-article purchase CTA")
                if articles:
                    publication, modification = articles[0].get("datePublished", ""), articles[0].get("dateModified", "")
                    record("DATE01", route, bool(publication) and publication <= modification, f"Published={publication}; updated={modification}. Dates are not proof of originality.")
                if route.endswith("/ux-design-guide"):
                    laws = [table for table in doc.all("table") if len(table.all("tbody")) and len(table.all("tbody")[0].all("tr")) == 10]
                    record("CONTENT03", route, bool(laws), "The cognitive-principles HTML table has ten data rows")
        except (URLError, TimeoutError, OSError, UnicodeError, ValueError) as error:
            record("HTTP01", route, False, str(error))

    for headers, locale in [({"Accept-Language": "fr-BJ,fr;q=0.9,en;q=0.5"}, "fr"), ({"Accept-Language": "en-US,en;q=0.9,fr;q=0.1"}, "en"), ({"Accept-Language": "en", "Cookie": "NEXT_LOCALE=fr"}, "fr"), ({"x-vercel-ip-country": "BJ"}, "fr")]:
        try:
            status, response_headers, _ = get("/?utm_source=dogfood", headers)
            location = urlparse(response_headers.get("Location", ""))
            record("I18N04", "/", status == 307 and location.path == f"/{locale}" and location.query == "utm_source=dogfood", f"{headers} -> {status} {location.path}?{location.query}")
        except (URLError, TimeoutError, OSError) as error:
            record("I18N04", "/", False, str(error))

    for endpoint in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt"):
        try:
            status, _, body = get(endpoint)
            record("MACHINE01", endpoint, status == 200 and len(body) > 100, f"HTTP {status}, {len(body)} bytes")
            if endpoint == "/sitemap.xml" and status == 200:
                sitemap = ET.fromstring(body)
                namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
                found = {node.text for node in sitemap.findall("s:url/s:loc", namespace)}
                record("MACHINE02", endpoint, {SITE + route for route in routes} == found, f"{len(found)} localized sitemap URLs")
            if endpoint == "/llms-full.txt":
                text = body.decode("utf-8")
                record("MACHINE03", endpoint, all(url in text for url in source_urls) and all(store in text for store in STORES.values()), "Full text includes every visible reference and both localized inline purchase CTAs")
                normalised = text.replace("`", "")
                missing = [paragraph[:90] for paragraph in prose_paragraphs if paragraph not in normalised]
                record("MACHINE04", endpoint, not missing and all(title in text for title in visual_titles) and not rejected_copy.search(text) and not removed_slogans.search(text), f"All developed paragraphs and visual titles exported; removed source ratings and selected slogans absent; missing={missing}")
            if endpoint == "/llms.txt":
                record("MACHINE05", endpoint, not rejected_copy.search(body.decode("utf-8")) and "English articles" in body.decode("utf-8"), "Article terminology and plain source list in the discovery endpoint")
        except (URLError, TimeoutError, OSError, ET.ParseError) as error:
            record("MACHINE01", endpoint, False, str(error))

    css = (ROOT / "src/app/globals.css").read_text()
    defined = set(re.findall(r"(--[\w-]+)\s*:", css)) | {"--font-domine"}
    used = set(re.findall(r"var\((--[\w-]+)", css))
    record("TOKENS01", "src/app/globals.css", not used - defined, f"Undefined CSS variables: {sorted(used - defined)}")
    def contrast(foreground, background):
        def luminance(color):
            rgb = [int(color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
            linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in rgb]
            return sum(weight * value for weight, value in zip((0.2126, 0.7152, 0.0722), linear))
        lighter, darker = sorted((luminance(foreground), luminance(background)), reverse=True)
        return (lighter + 0.05) / (darker + 0.05)

    for theme in ("dark", "light"):
        section = re.search(r"html\[data-theme='" + theme + r"'\]\s*\{([^}]+)\}", css)
        tokens = dict(re.findall(r"(--[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;", section.group(1))) if section else {}
        try:
            button_ratio = contrast(tokens["--on-accent"], tokens["--accent"])
            record("CONTRAST01", theme, button_ratio > 5.5, f"Primary button text/background token ratio={button_ratio:.3f}:1 (target >5.5)")
            for ink in ("--fg", "--fg-2", "--fg-3", "--accent-ink", "--ok", "--warn", "--danger"):
                for surface in ("--void", "--s1", "--s2"):
                    ratio = contrast(tokens[ink], tokens[surface])
                    record("CONTRAST02", f"{theme} {ink}/{surface}", ratio >= 4.5, f"Opaque token pair={ratio:.3f}:1. Actual blended surfaces checked separately with axe.")
            for ink, soft in (("--ok", "--ok-soft"), ("--warn", "--warn-soft")):
                rgba = re.search(re.escape(soft) + r":\s*rgba\(([^)]+)\)", section.group(1))
                if rgba:
                    red, green, blue, alpha = [float(value.strip()) for value in rgba.group(1).split(",")]
                    base_channels = [int(tokens["--s1"][index:index + 2], 16) for index in (1, 3, 5)]
                    tinted = "#" + "".join(f"{round(channel * alpha + base_channel * (1 - alpha)):02x}" for channel, base_channel in zip((red, green, blue), base_channels))
                    ratio = contrast(tokens[ink], tinted)
                    record("CONTRAST03", f"{theme} {ink} on tinted badge", ratio >= 4.5, f"RGBA {soft} blended on actual --s1 {tokens['--s1']}: {tinted}; text contrast={ratio:.3f}:1")
        except KeyError as error:
            record("CONTRAST01", theme, False, f"Missing color token: {error}")
    font_files = list((ROOT / "src/fonts").glob("*.woff2"))
    licenses = list((ROOT / "src/fonts").glob("OFL-*.txt"))
    expected_fonts = {"domine-latin.woff2", "domine-latin-ext.woff2"}
    record("FONTS01", "src/fonts", {font.name for font in font_files} == expected_fonts
           and len(licenses) == 1 and licenses[0].name == "OFL-Domine.txt"
           and "SIL OPEN FONT LICENSE" in licenses[0].read_text()
           and "Domine Project Authors" in licenses[0].read_text(),
           f"{len(font_files)} local Domine WOFF2 files; {len(licenses)} complete OFL notice")

    for rule, evidence in [
        ("HUMAN01", "Non vérifié: VoiceOver/NVDA reading order, announcements and real assistive-technology navigation. Verify with a documented walkthrough."),
        ("HUMAN02", "Non vérifié: comprehension, reading comfort and conversion with real FR/EN readers. Test representative tasks; no uplift is promised."),
        ("LEGAL01", "Non vérifié for a particular client: legal applicability, national transposition and exceptions. Primary references are linked, not legal advice."),
        ("FIELD01", "Non vérifié: field CLS/LCP/INP and crawler indexing/citation. Requires production field data and search-console evidence; local browser tests are not field data."),
    ]:
        record(rule, "human review", None, evidence, "major", "to verify")
    record("PLATFORM01", "native controls", None, "Not applicable: this repository ships a website, not native iOS/Android/desktop controls.", "major", "not applicable")

    failed = [check for check in checks if check["status"] == "automated" and check["outcome"] == "fail" and check["severity"] == "blocking"]
    report = {
        "scope": "UX/UI Playbook website-specific checks; not the 77-rule product scanner or a conformance certificate",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "baseUrl": base,
        "summary": {status: sum(check["status"] == status for check in checks) for status in ("automated", "to verify", "not applicable")},
        "automatedBlockingFailures": len(failed),
        "checks": checks,
    }
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    for check in failed:
        print(f"FAIL {check['id']} {check['target']}: {check['evidence']}")
    print(f"{report['summary']} | automated blocking failures: {len(failed)} | {output}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
