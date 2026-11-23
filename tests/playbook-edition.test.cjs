const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { loadData, root } = require('../scripts/content-data.cjs');
const edition = require('../products/playbook-2026/counts.json');
const { CONTENT } = loadData('src/i18n/content.ts');
const { ARTICLES } = loadData('src/i18n/articles.ts');
const { FREE_UI } = loadData('src/i18n/free-resource.ts');
const { playbookPages } = loadData('src/lib/playbook-edition.ts');
const strings = value => typeof value === 'string' ? [value]
  : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
const hash = value => createHash('sha256').update(value).digest('hex');
const obsoleteClaims = /\b(?:148|139)[- ](?:page|pages)|97 sections|8 (?:parties|parts)\b|36 (?:écrans|annotated screens)|rules_77\.json|test\/clean\.html|67 (?:entrées|entries|composants|components)/iu;
const editionNovelty = /ce qui est nouveau|nouvelle? (?:édition|version|partie|section)|édition[^.\n]*augmentée|expanded (?:english|2026) edition|what is new in this edition|new (?:edition|part|section|glossary)|9 novembre 2026|9 November 2026/iu;

test('edition counters describe the measured localized deliverables, not the bilingual source ZIP', () => {
  assert.equal(edition.editionDate, '2026-11-09');
  assert.deepEqual(edition.counts, {
    sections: 120, parts: 9, glossarySections: 22, glossaryEntries: 56,
    thematicComparisons: 13, platformComparisons: 11, comparisons: 24,
    checklistRules: 77, platforms: 6, kitSheets: 12,
    workingFilesPerEdition: 21, sourceZipFiles: 42,
  });
  assert.ok(!('screens' in edition.counts) && !('productQaPassed' in edition.counts));
  assert.equal(edition.counts.comparisons, edition.counts.thematicComparisons + edition.counts.platformComparisons);
  assert.deepEqual(['fr', 'en'].map(playbookPages), [182, 171]);
});

test('the private source archive inventory has safe paths, unique entries and exactly 21 files per language', () => {
  const files = edition.sourceArchive.files;
  assert.equal(files.length, 42);
  assert.equal(new Set(files.map(file => file.path)).size, 42);
  assert.match(edition.sourceArchive.sha256, /^[a-f0-9]{64}$/u);
  for (const file of files) {
    assert.match(file.path, /^(FR|EN)\//u);
    assert.ok(!file.path.split('/').includes('..') && !file.path.includes('\\'));
    assert.match(file.sha256, /^[a-f0-9]{64}$/u);
    assert.ok(file.bytes > 0);
  }
  for (const locale of ['FR', 'EN']) {
    const paths = files.filter(file => file.path.startsWith(locale + '/')).map(file => file.path);
    assert.equal(paths.length, 21);
    for (const name of ['rules.py', 'agent_check.py', 'test/bad.html', 'test/good.html']) {
      assert.ok(paths.includes(`${locale}/checklist-agent/${name}`));
    }
    assert.equal(paths.filter(file => file.startsWith(`${locale}/templates/`)).length, 4);
    assert.ok(!paths.some(file => /rules_77\.json|clean\.html|proposal|proposition/u.test(file)));
  }
  for (const spec of [edition.sourceArchive, ...Object.values(edition.editions).flatMap(item => [item.bookSource, item.kitSource])]) {
    assert.ok(!fs.existsSync(path.join(root, 'public', spec.name)), `Paid source must stay private: ${spec.name}`);
  }
});

test('scanner summary distinguishes applicable rules, unverified checks, outcomes and exit codes', () => {
  const scanner = edition.scannerExamples;
  assert.equal(scanner.platform, 'web');
  assert.equal(scanner.applicableRules, 57);
  assert.equal(scanner.outsidePlatformScope, 20);
  assert.equal(scanner.applicableRules + scanner.outsidePlatformScope, 77);
  for (const run of [scanner.bad, scanner.good]) {
    assert.equal(run.automated + run.toVerify, scanner.applicableRules);
    assert.ok(run.failures <= run.automated && run.blockingFailures <= run.failures);
    assert.equal(run.exitCode, run.blockingFailures ? 1 : 0);
  }
  assert.deepEqual([scanner.bad.automated, scanner.bad.toVerify, scanner.bad.failures, scanner.bad.blockingFailures], [9, 48, 8, 7]);
  assert.deepEqual([scanner.good.automated, scanner.good.toVerify, scanner.good.failures, scanner.good.blockingFailures], [8, 49, 0, 0]);
});

for (const locale of ['fr', 'en']) {
  const data = CONTENT[locale];
  const measured = edition.editions[locale];
  test(`${locale}: all nine contents openings match source bookmarks and sum to 120 sections`, () => {
    assert.equal(data.contentsSection.parts.length, 9);
    assert.deepEqual(data.contentsSection.parts.map(part => [part.num, part.title, part.page]),
      measured.parts.map(part => [part.num, part.title, `p. ${part.page}`]));
    assert.equal(measured.parts.reduce((sum, part) => sum + part.sectionCount, 0), 120);
    assert.deepEqual(measured.parts.map(part => part.sectionCount), [11, 10, 8, 5, 6, 7, 26, 22, 25]);
    assert.equal(measured.glossaryEntries.length, 56);
    assert.equal(new Set(measured.glossaryEntries.map(entry => entry.name)).size, 56);
    assert.equal(measured.comparisonPages.thematic.length, 13);
    assert.equal(measured.comparisonPages.platform.length, 11);
    assert.equal(measured.kitPages, 26);
    assert.equal(data.contentsSection.kitSheets.length, 12);
    assert.equal(data.contentsSection.archiveGroups.length, 4);
  });

  test(`${locale}: ten selected excerpts use recorded source pages, never a full paid PDF`, () => {
    assert.equal(data.insideSection.pages.length, 10);
    assert.deepEqual(data.insideSection.pages.map(item => [item.id, item.src]),
      measured.previews.map(item => [item.id, item.path]));
    for (const [index, item] of data.insideSection.pages.entries()) {
      assert.ok(fs.existsSync(path.join(root, 'public', item.src)));
      if (!['cover', 'bonus-cover'].includes(item.id)) {
        assert.ok(item.badge.includes(`p. ${String(measured.previews[index].page).padStart(2, '0')}`), item.badge);
      }
      assert.ok(item.alt && item.caption);
    }
    assert.ok(data.insideSection.pages.some(item => item.id === 'evidence'));
    assert.ok(data.insideSection.pages.some(item => item.id === 'lexicon'));
    assert.ok(!/148|139/u.test(data.insideSection.readerBuy));
  });

  test(`${locale}: visible offer, articles and free-resource CTA no longer repeat obsolete edition claims`, () => {
    assert.doesNotMatch(strings([data, ARTICLES[locale], FREE_UI[locale]]).join('\n'), obsoleteClaims);
    assert.equal(data.strip[0].num, String(measured.pages));
    assert.equal(data.strip[1].num, '120');
    assert.match(data.hero.note, new RegExp(String(measured.pages)));
    assert.match(data.offer.crosslinkText, locale === 'fr' ? /vendue séparément/ : /sold separately/);
    assert.match(data.contentsSection.archiveIntro, locale === 'fr' ? /copies/ : /copies/);
    assert.ok(data.meta.title.length <= 60);
    assert.ok(data.meta.description.length >= 135 && data.meta.description.length <= 155);
    const listing = fs.readFileSync(path.join(root, `products/playbook-2026/gumroad-description-${locale}.md`), 'utf8');
    for (const count of [measured.pages, 120, 56, 21, 77, 26, 12]) assert.ok(listing.includes(String(count)));
    assert.ok(listing.includes(data.gumroadUrl) && listing.includes(`${data.siteUrl}/${locale}`));
    assert.match(listing, /29 USD/u);
    assert.match(listing, locale === 'fr' ? /non publié sur Gumroad/ : /Not published to Gumroad/u);
    assert.doesNotMatch(listing, obsoleteClaims);
    assert.doesNotMatch(listing, /—/u);
    assert.ok(edition.researchSources.every(source => listing.includes(source.url)));
  });

  test(`${locale}: sales copy describes the book without an edition-change announcement`, () => {
    assert.ok(!('editionUpdates' in data));
    assert.doesNotMatch(strings(data).join('\n'), editionNovelty);
    const listing = fs.readFileSync(path.join(root, `products/playbook-2026/gumroad-description-${locale}.md`), 'utf8');
    assert.doesNotMatch(listing, editionNovelty);
    assert.match(data.contentsSection.parts[7].sections.join(' '), /56/u);
    assert.match(data.contentsSection.parts[0].sections.join(' '), /Section X|section X/u);
    assert.deepEqual(edition.researchSources.map(source => source.date), ['2018-04-15', '2026-10-28', '2007-09-11']);
  });

  test(`${locale}: demo commands use existing fixtures and do not claim rendered contrast/H1 automation`, () => {
    assert.match(data.agentDemo.terminal.cmdBad, /--target test\/bad\.html/u);
    assert.match(data.agentDemo.terminal.cmdClean, /--target test\/good\.html/u);
    for (const command of [data.agentDemo.terminal.cmdBad, data.agentDemo.terminal.cmdClean]) {
      assert.ok(command.includes(`--platform web --lang ${locale} --fail-on blocking`));
    }
    for (const line of [...data.agentDemo.terminal.linesBad, ...data.agentDemo.terminal.linesClean]) {
      assert.doesNotMatch(line.text, /B01|A01/u);
    }
    assert.match(data.agentDemo.lede, locale === 'fr' ? /Aucun script Python ne s’exécute/ : /No Python runs/u);
    assert.match(data.agentDemo.lede, locale === 'fr' ? /pas de cette maquette/ : /not that mockup/u);
    assert.match(data.agentDemo.terminal.linesClean.at(-1).text, /49.*0 ≠/u);
  });
}

test('landing keeps the contents and factual book schema, without a release-announcement component', () => {
  const source = fs.readFileSync(path.join(root, 'src/app/[locale]/page.tsx'), 'utf8');
  assert.ok(source.includes('numberOfPages: playbookPages(locale)'));
  assert.ok(source.includes("bookEdition: locale === 'fr' ? 'Édition française' : 'English edition'"));
  assert.ok(!source.includes('EditionUpdates') && !source.includes('dateModified: PLAYBOOK_EDITION.editionDate'));
  assert.ok(!fs.existsSync(path.join(root, 'src/components/EditionUpdates.tsx')));
  assert.ok(source.indexOf('<ContentsExplorer') < source.indexOf('<section id="buy">'));
  assert.ok(source.includes('serializeJsonLd(jsonLd)'));
});

test('current site config, build examples and GitHub CI agree on the chosen official Worker origin', () => {
  const expected = 'https://joyccelight-playbook.uxplay.workers.dev';
  assert.equal(require('../src/config/site-policy.json').defaultOrigin, expected);
  for (const file of ['.env.example', '.github/workflows/cloudflare-static-export.yml', '.github/workflows/ui-check.yml']) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.ok(source.includes(expected), file);
    assert.ok(!source.includes('https://joyccelight-playbook.pages.dev'), file);
  }
});

test('the source counter audit and preview renderer are local authoring tools, not deployment hooks', () => {
  const pkg = require('../package.json');
  assert.ok(!Object.values(pkg.scripts).some(value => /audit_playbook|render_playbook/u.test(value)));
  assert.ok(edition.countingPolicy.unpublishedClaims.includes('not supplied'));
  assert.equal(hash(fs.readFileSync(path.join(root, 'docs/technical-baseline.json'))),
    '68329e1ac8b7cf1a150be421139c1a7902e0ad4e912c2bdc2ef266b04cb756d2', 'Historical baseline is retained byte-for-byte.');
});

test('HTTP copy guard allows verified appendix titles but still rejects source-rating badges', () => {
  const cases = [
    ['Les références figurent dans l’annexe A5, « Sources et niveaux de preuve ».', false],
    ['Dated references appear in appendix A5, “Sources and evidence levels”.', false],
    ['Dated sources are printed beneath the figures and in appendix A5.', false],
    ['Source : établi', true], ['Evidence: established', true], ['Probable', true],
    ['Niveaux de preuve', true], ['Sources and evidence', true],
    ['Voir annexe A5', true], ['Appendix A5', true], ['field courses', true],
  ];
  const script = 'import json,sys; from scripts.site_check import has_rejected_authority_copy; print(json.dumps([has_rejected_authority_copy(row[0]) for row in json.loads(sys.argv[1])]))';
  const actual = JSON.parse(execFileSync('python3', ['-c', script, JSON.stringify(cases)], { cwd: root, encoding: 'utf8' }));
  assert.deepEqual(actual, cases.map(row => row[1]));
});
