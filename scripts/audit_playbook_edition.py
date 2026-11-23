#!/usr/bin/env python3
"""Recount the private 9 Nov 2026 PDFs/ZIP without publishing or executing them.

Optional authoring tool, not a build dependency. Requires PyMuPDF. Obtain the four
PDFs and TEMPLATES.zip from the owner's Drive, keep them OUTSIDE public/, then run:
  python3 scripts/audit_playbook_edition.py --source .cache/edition-2026/source
No claim is made about the missing original product QA report or PDF accessibility.
"""
import argparse
import ast
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "products/playbook-2026/counts.json"


def roman(number):
    result = ""
    for value, glyph in [(100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
                         (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]:
        while number >= value:
            result += glyph
            number -= value
    return result


def inspect_sources(source):
    import pymupdf

    manifest = json.loads(MANIFEST.read_text())
    checks = []

    def check(name, actual, expected):
        checks.append({"name": name, "actual": actual, "expected": expected,
                       "passed": actual == expected})

    for locale, edition in manifest["editions"].items():
        docs = {}
        try:
            for kind in ("book", "kit"):
                spec = edition[kind + "Source"]
                file = source / spec["name"]
                data = file.read_bytes()
                check(f"{locale}:{kind}:bytes", len(data), spec["bytes"])
                check(f"{locale}:{kind}:sha256", hashlib.sha256(data).hexdigest(), spec["sha256"])
                docs[kind] = pymupdf.open(file)
            book, kit = docs["book"], docs["kit"]
            check(f"{locale}:book:pages", len(book), edition["pages"])
            check(f"{locale}:kit:pages", len(kit), edition["kitPages"])
            toc = book.get_toc()
            sections = [entry for entry in toc if entry[0] == 2]
            parts = []
            for depth, title, page in toc:
                if depth == 1:
                    num, title = title.split(" · ", 1)
                    parts.append({"num": num, "title": title, "page": page, "sectionCount": 0})
                else:
                    parts[-1]["sectionCount"] += 1
            check(f"{locale}:sections", len(sections), manifest["counts"]["sections"])
            check(f"{locale}:parts", parts, edition["parts"])
            check(f"{locale}:romans", [book[e[2] - 1].get_text().splitlines()[0] for e in sections],
                  [roman(i + 1) for i in range(120)])

            # A whole linked contents row contains original ID, title, printed page.
            # Ignore the three duplicate links on the ID, title and number alone.
            printed = {}
            for page in list(book)[3:9]:
                for link in page.get_links():
                    if link.get("nameddest", "").startswith("sec-") and link["from"].width > 450:
                        text = page.get_textbox(link["from"]).strip()
                        if re.search(r"\d+\s*$", text):
                            printed[link["nameddest"][4:]] = {
                                "printed": int(re.search(r"\d+\s*$", text)[0]),
                                "target": link["page"] + 1,
                            }
            check(f"{locale}:contents:linked-sections", len(printed), 120)
            check(f"{locale}:contents:printed-pages",
                  {key: item["printed"] for key, item in printed.items()},
                  {key: item["target"] for key, item in printed.items()})
            check(f"{locale}:contents:bookmark-pages",
                  {entry[1].split(" · ", 1)[0]: entry[2] for entry in sections},
                  {key: item["target"] for key, item in printed.items()})

            start = next(entry[2] - 1 for entry in sections if entry[1].startswith("L2 · "))
            end = next(entry[2] - 1 for entry in sections if entry[1].startswith("L17 · "))
            names = []
            for index in range(start, end):
                for block in book[index].get_text("dict")["blocks"]:
                    for line in block.get("lines", []):
                        for span in line["spans"]:
                            # The row names, not the monospace translation or diagram.
                            if (abs(span["bbox"][0] - 42.51968) < 0.1
                                    and span["font"] == "Inter-Semi-Bold"
                                    and abs(span["size"] - 8.5) < 0.05):
                                names.append({"page": index + 1, "name": span["text"]})
            check(f"{locale}:glossary:rows", names, edition["glossaryEntries"])
            check(f"{locale}:glossary:count", len(names), manifest["counts"]["glossaryEntries"])
            check(f"{locale}:glossary:sections",
                  sum(entry[1].startswith("L") for entry in sections), manifest["counts"]["glossarySections"])
            for kind, marker in {
                "thematic": "Prototype comparé · avant" if locale == "fr" else "Side-by-side prototype · before",
                "platform": "Plateforme comparée · avant" if locale == "fr" else "Platform comparison · before",
            }.items():
                check(f"{locale}:comparisons:{kind}",
                      [i + 1 for i, page in enumerate(book) if marker in page.get_text()],
                      edition["comparisonPages"][kind])
            check(f"{locale}:kit:sheets", sum("B O N U S" in page.get_text().splitlines()[0]
                  for page in list(kit)[1:25]), manifest["counts"]["kitSheets"])
        finally:
            for doc in docs.values():
                doc.close()

    spec = manifest["sourceArchive"]
    data = (source / spec["name"]).read_bytes()
    check("zip:bytes", len(data), spec["bytes"])
    check("zip:sha256", hashlib.sha256(data).hexdigest(), spec["sha256"])
    with zipfile.ZipFile(source / spec["name"]) as archive:
        files = [{"path": item.filename, "bytes": item.file_size,
                  "sha256": hashlib.sha256(archive.read(item)).hexdigest()}
                 for item in archive.infolist() if not item.is_dir()]
        check("zip:integrity", archive.testzip(), None)
        check("zip:files", files, spec["files"])
        check("zip:per-language", dict(Counter(item["path"].split("/")[0] for item in files)),
              {"FR": 21, "EN": 21})
        for locale in ("FR", "EN"):
            tree = ast.parse(archive.read(f"{locale}/checklist-agent/rules.py"))
            rules = next(node.value for node in tree.body if isinstance(node, ast.Assign)
                         and any(isinstance(t, ast.Name) and t.id == "RULES" for t in node.targets))
            check(f"{locale}:rules", len(rules.elts), manifest["counts"]["checklistRules"])
            check(f"{locale}:rule-ids:unique", len({node.elts[0].value for node in rules.elts}), 77)
    return {"editionDate": manifest["editionDate"], "originalProductQaReportAvailable": False,
            "scope": "Source hashes, PDF structure/contents and archive inventory. Not PDF/UA or a conversion test.",
            "passed": sum(c["passed"] for c in checks), "failed": sum(not c["passed"] for c in checks),
            "checks": checks}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--output", type=Path, default=ROOT / "reports/edition-2026-update/source-audit.json")
    args = parser.parse_args()
    report = inspect_sources(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    for item in report["checks"]:
        if not item["passed"]:
            print("FAIL", item["name"])
    print(f"Edition source audit: {report['passed']} passed, {report['failed']} failed. Original product QA not supplied.")
    raise SystemExit(1 if report["failed"] else 0)
