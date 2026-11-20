const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { loadData, root } = require('../scripts/content-data.cjs');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { parseFreeGumroadUrl, resolveFreeGumroadUrls, FREE_RESOURCE_PATH } = loadData('src/lib/free-resource-config.ts');
const { FREE_UI, freeResourceCatalog, freeResourceManifest, resourceCategories, resourceSamples } = loadData('src/i18n/free-resource.ts');
const readPublic = file => fs.readFileSync(path.join(root, 'public', file));
const editions = {
  fr: { folder: 'products/ui-ux-directory', prefix: 'repertoire-ui-ux/', names: ['LIRE-MOI.md', 'repertoire-ui-ux-fr.pdf', 'repertoire-ui-ux-fr.md', 'fiche-decision.pdf', 'fiche-decision.md', 'grille-selection.csv', 'LICENCES.txt'], separator: ';' },
  en: { folder: 'products/ui-ux-directory/en', prefix: 'ui-ux-directory/', names: ['README.md', 'ui-ux-directory-en.pdf', 'ui-ux-directory-en.md', 'decision-worksheet.pdf', 'decision-worksheet.md', 'selection-grid.csv', 'LICENSES.txt'], separator: ',' },
};

// Synthetic URLs below exercise syntax only; these are not published products or account lookups.
const fixtureFr = 'https://joyccelight.gumroad.com/l/test-fixture-fr-only';
const fixtureEn = 'https://joyccelight.gumroad.com/l/test-fixture-en-only';
test('empty Gumroad config keeps a working direct download for each language', () => {
  for (const value of [undefined, '', '   ']) assert.equal(parseFreeGumroadUrl(value), null);
  assert.deepEqual(resolveFreeGumroadUrls({}), { fr: null, en: null });
});
test('the optional checkout only accepts the creator’s store and a non-paid product path', () => {
  assert.equal(parseFreeGumroadUrl(` ${fixtureEn} `), fixtureEn);
  for (const invalid of [
    'http://joyccelight.gumroad.com/l/test-fixture-only',
    'https://example.com/l/test-fixture-only',
    'https://other.gumroad.com/l/test-fixture-only',
    'https://joyccelight.gumroad.com.evil.example/l/test-fixture-only',
    'https://user:password@joyccelight.gumroad.com/l/test-fixture-only',
    'https://joyccelight.gumroad.com:8443/l/test-fixture-only',
    'https://joyccelight.gumroad.com/l/uiuxplaybookfr',
    'https://joyccelight.gumroad.com/l/uxuiplaybook',
    'https://joyccelight.gumroad.com/l/UIUXPLAYBOOKFR',
    'https://joyccelight.gumroad.com/l/',
    'https://joyccelight.gumroad.com/',
    'https://joyccelight.gumroad.com/l/test-fixture-only?utm_source=test',
    'https://joyccelight.gumroad.com/l/test-fixture-only#checkout',
    'javascript:alert(1)',
  ]) assert.throws(() => parseFreeGumroadUrl(invalid), Error, invalid);
});
test('legacy and explicit French configuration never control the English checkout', () => {
  assert.deepEqual(resolveFreeGumroadUrls({ legacyFr: fixtureFr }), { fr: fixtureFr, en: null });
  assert.deepEqual(resolveFreeGumroadUrls({ fr: fixtureFr }), { fr: fixtureFr, en: null });
  assert.deepEqual(resolveFreeGumroadUrls({ en: fixtureEn }), { fr: null, en: fixtureEn });
  assert.deepEqual(resolveFreeGumroadUrls({ legacyFr: fixtureFr, en: '  ' }), { fr: fixtureFr, en: null });
  assert.deepEqual(resolveFreeGumroadUrls({ fr: ' ', legacyFr: fixtureFr, en: fixtureEn }), { fr: fixtureFr, en: fixtureEn });
  const legacyFr = 'https://joyccelight.gumroad.com/l/test-fixture-legacy-only';
  assert.deepEqual(resolveFreeGumroadUrls({ fr: fixtureFr, legacyFr, en: fixtureEn }), { fr: fixtureFr, en: fixtureEn });
});
test('French and English kits cannot silently share a checkout URL', () => {
  assert.throws(() => resolveFreeGumroadUrls({ fr: fixtureFr, en: fixtureFr }), /separate/u);
  assert.throws(() => resolveFreeGumroadUrls({ legacyFr: fixtureFr, en: fixtureFr }), /separate/u);
  assert.throws(() => resolveFreeGumroadUrls({ fr: fixtureFr, en: 'https://joyccelight.gumroad.com/l/TEST-FIXTURE-FR-ONLY' }), /separate/u);
});
test('the English translation preserves all entry IDs, categories, resource URLs and source URLs', () => {
  const fr = freeResourceCatalog('fr'), en = freeResourceCatalog('en');
  const identity = catalog => catalog.entries.map(({ id, category, urls }) => ({ id, category, urls }));
  assert.deepEqual(identity(en), identity(fr));
  assert.deepEqual(en.sources.map(source => source.url), fr.sources.map(source => source.url));
  assert.equal(en.sources.length, 11);
  assert.equal(en.editionDate, fr.editionDate);
  for (const [index, entry] of en.entries.entries()) {
    for (const key of ['description', 'nonDesigner', 'developer', 'agent', 'watch']) assert.notEqual(entry[key], fr.entries[index][key], `${entry.id}/${key} must be translated`);
  }
  for (const [index, category] of en.categories.entries()) {
    for (const key of ['name', 'purpose', 'question']) assert.notEqual(category[key], fr.categories[index][key], `${category.id}/${key}`);
  }
});

function pngDimensions(filename) {
  const data = fs.readFileSync(filename);
  assert.equal(data.toString('ascii', 1, 4), 'PNG');
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}
for (const [locale, edition] of Object.entries(editions)) {
  const catalog = freeResourceCatalog(locale), manifest = freeResourceManifest(locale);
  const archive = path.join(root, 'public', manifest.files.archive.path);
  test(`${locale}: counts mean 51 entries, 6 categories and 75 links, not 75 audited tools`, () => {
    assert.equal(catalog.entries.length, 51);
    assert.equal(catalog.categories.length, 6);
    assert.deepEqual(catalog.categories.map(c => catalog.entries.filter(e => e.category === c.id).length), [10, 10, 10, 7, 7, 7]);
    const urls = catalog.entries.flatMap(e => e.urls);
    assert.equal(urls.length, 75);
    assert.equal(new Set(urls).size, 75);
    for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
    assert.deepEqual(manifest.counts, { entries: 51, categories: 6, resourceLinks: 75, guidePages: 34 + (manifest.screenshots ? Math.ceil(75 / 4) : 0), worksheetPages: 3, archiveFiles: 7 });
  });
  test(`${locale}: every entry has descriptive text, three profile uses and a caveat`, () => {
    assert.equal(new Set(catalog.entries.map(e => e.id)).size, 51);
    for (const entry of catalog.entries) {
      assert.ok(entry.name.length > 2);
      assert.ok(entry.description.split(/\s+/u).length >= 50, entry.id);
      for (const key of ['nonDesigner', 'developer', 'agent', 'watch']) assert.ok(entry[key].length > 35, `${entry.id}/${key}`);
    }
    assert.ok(!JSON.stringify(catalog).match(/sans hallucination|UI irréprochable|garantit un rendu|hallucination.free|flawless UI/u));
  });
  test(`${locale}: corrected addresses and qualified licensing statements remain in the edition`, () => {
    const text = JSON.stringify(catalog);
    for (const url of ['https://reactnativereusables.com/', 'https://chartist.dev/', 'https://recharts.github.io/', 'https://apexcharts.com/license/', 'https://undraw.co/license', 'https://storyset.com/terms']) assert.ok(text.includes(url), url);
    assert.ok(!/rnr-docs|gionkunz\.github\.io|vercel\.app/u.test(text));
    assert.match(catalog.entries.find(e => e.id === '5.3').description, /Community.*commercial.*OEM/iu);
    assert.match(catalog.entries.find(e => e.id === '6.2').description, /attribution/u);
    assert.match(catalog.entries.find(e => e.id === '6.1').description, locale === 'fr' ? /entraînement/u : /AI training/u);
    assert.match(catalog.entries.find(e => e.id === '2.7').description, /closed.source/u);
  });
  test(`${locale}: website data, samples, FAQ and file language describe the matching complete kit`, () => {
    assert.equal(FREE_RESOURCE_PATH, '/resources/ui-ux-directory');
    assert.equal(catalog.language, locale);
    assert.equal(manifest.language, locale);
    assert.equal(manifest.generatedForOrigin, SITE_URL, 'Regenerate both editions when the build origin changes.');
    const t = FREE_UI[locale];
    assert.ok(t.metaTitle.length <= 60);
    assert.ok(t.metaDescription.length >= 135 && t.metaDescription.length <= 155);
    assert.deepEqual(resourceCategories(locale).flatMap(c => c.entries), catalog.entries);
    assert.deepEqual(resourceSamples(locale), ['1.5', '3.3', '5.3'].map(id => catalog.entries.find(entry => entry.id === id)));
    assert.ok(t.files[0].title.includes(String(manifest.counts.guidePages)));
    assert.match(t.language, locale === 'fr' ? /Fichiers en français/u : /English-language files/u);
    assert.match(t.faqs[2].a, locale === 'fr' ? /deux kits distincts/u : /two separate kits/u);
    if (locale === 'en') {
      assert.match(t.lede, /All files are in English/u);
      assert.ok(!/French-language files|French PDF|French labels|same French kit/u.test(JSON.stringify(t)));
    }
  });
  for (const [key, file] of Object.entries(manifest.files)) {
    test(`${locale}: real ${key} download matches its byte length and SHA-256`, () => {
      const bytes = readPublic(file.path);
      assert.ok(bytes.length > 1000);
      assert.equal(bytes.length, file.bytes);
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
      assert.ok(file.path.startsWith('/downloads/') && !file.path.includes('..'));
    });
  }
  test(`${locale}: the ZIP is intact, has exactly seven expected files and meets the free-product limit`, () => {
    const data = JSON.parse(execFileSync('python3', ['-c', `import zipfile,json,sys\nfrom pathlib import PurePosixPath\nwith zipfile.ZipFile(sys.argv[1]) as z:\n print(json.dumps({'bad':z.testzip(),'names':z.namelist(),'bytes':sum(f.file_size for f in z.infolist()),'unsafe':any(PurePosixPath(f.filename).is_absolute() or '..' in PurePosixPath(f.filename).parts for f in z.infolist()),'date':list(z.infolist()[0].date_time)}))`, archive], { encoding: 'utf8' }));
    assert.equal(data.bad, null);
    assert.equal(data.unsafe, false);
    assert.ok(data.bytes < 250_000_000);
    assert.deepEqual(data.date, [2026, 11, 18, 0, 0, 0]);
    assert.deepEqual(data.names.sort(), edition.names.map(name => edition.prefix + name).sort());
  });
  test(`${locale}: PDFs have the promised pages, language, tags and all resource destinations`, () => {
    const guide = readPublic(manifest.files.pdf.path).toString('latin1');
    assert.ok(guide.startsWith('%PDF-'));
    assert.equal((guide.match(/\/Type \/Page\b/g) || []).length, manifest.counts.guidePages);
    assert.match(guide, new RegExp(`/Lang \\(${locale}\\)`));
    assert.match(guide, /\/Marked true/u);
    const destinations = [...guide.matchAll(/\/URI \(([^)]*)\)/g)].map(match => match[1]);
    for (const url of catalog.entries.flatMap(e => e.urls)) assert.ok(destinations.includes(url), `Missing PDF link ${url}`);
    assert.ok(destinations.some(url => url.startsWith(SITE_URL + `/${locale}?utm_source=`) && url.endsWith('#buy')));
    assert.ok(!destinations.some(url => url.includes('#buy?utm_')));
    const worksheet = execFileSync('python3', ['-c', `import zipfile,sys\nwith zipfile.ZipFile(sys.argv[1]) as z: sys.stdout.buffer.write(z.read(sys.argv[2]))`, archive, edition.prefix + edition.names[3]]).toString('latin1');
    assert.equal((worksheet.match(/\/Type \/Page\b/g) || []).length, manifest.counts.worksheetPages);
    assert.match(worksheet, new RegExp(`/Lang \\(${locale}\\)`));
    // Structural tags are not PDF/UA or screen-reader certification.
  });
  test(`${locale}: Markdown has all 51 complete entries, tracked return links and caveats`, () => {
    const md = readPublic(manifest.files.markdown.path).toString('utf8');
    for (const entry of catalog.entries) {
      assert.ok(md.includes(`### ${entry.id}. ${entry.name}`));
      for (const value of [entry.description, entry.nonDesigner, entry.developer, entry.agent, entry.watch, ...entry.urls]) assert.ok(md.includes(value), entry.id);
    }
    assert.ok(md.includes(`${SITE_URL}/${locale}${FREE_RESOURCE_PATH}?utm_source=`));
    assert.ok(!md.includes('#buy?utm_'));
    assert.match(md, locale === 'fr' ? /pas à 75 outils distincts/u : /75 links are not 75 distinct tools/u);
    assert.match(md, locale === 'fr' ? /audit exhaustif/u : /not.*exhaustive.*audit/u);
  });
  test(`${locale}: worksheets, CSV and notices are useful templates, not third-party asset packs`, () => {
    const data = JSON.parse(execFileSync('python3', ['-c', `import csv,io,zipfile,json,sys\nwith zipfile.ZipFile(sys.argv[1]) as z:\n read=lambda n:z.read(sys.argv[2]+n).decode('utf-8-sig')\n names=json.loads(sys.argv[3])\n print(json.dumps({'rows':list(csv.reader(io.StringIO(read(names[5])),delimiter=sys.argv[4])),'worksheet':read(names[4]),'notices':read(names[6]),'readme':read(names[0]),'samePdf':z.read(sys.argv[2]+names[1])==open(sys.argv[5],'rb').read(),'sameMd':z.read(sys.argv[2]+names[2])==open(sys.argv[6],'rb').read()}))`, archive, edition.prefix, JSON.stringify(edition.names), edition.separator, path.join(root, 'public', manifest.files.pdf.path), path.join(root, 'public', manifest.files.markdown.path)], { encoding: 'utf8' }));
    assert.ok(data.samePdf && data.sameMd, 'Standalone guide files equal their ZIP copies.');
    assert.equal(data.rows.length, 7);
    assert.ok(data.rows.every(row => row.length === 11));
    assert.ok(data.rows.slice(1).every(row => row.slice(1).every(cell => cell === '')));
    assert.deepEqual(data.rows.slice(1).map(row => row[0]), catalog.categories.map(category => category.name));
    for (const category of catalog.categories) assert.ok(data.worksheet.includes(category.name));
    for (const text of ['SIL OPEN FONT LICENSE', 'ISC License', 'Feather', 'Joy N.', locale === 'fr' ? 'ne concèdent aucun droit' : 'grant no rights']) assert.ok(data.notices.includes(text), text);
    assert.match(data.readme, locale === 'fr' ? /pas un formulaire PDF interactif/u : /not an interactive PDF form/u);
    assert.match(data.readme, new RegExp(`${manifest.counts.guidePages}.page`));
  });
  test(`${locale}: publication artwork has the landscape and high-resolution square dimensions`, () => {
    assert.deepEqual(pngDimensions(path.join(root, edition.folder, 'marketing/cover-1280x720.png')), [1280, 720]);
    assert.deepEqual(pngDimensions(path.join(root, edition.folder, 'marketing/thumbnail-1080x1080.png')), [1080, 1080]);
  });
  test(`${locale}: owner documents exist, link to real local files and keep publishing separate`, () => {
    for (const filename of ['README.md', 'gumroad-listing.md', 'publication-guide.md']) {
      const file = path.join(root, edition.folder, filename), text = fs.readFileSync(file, 'utf8');
      assert.ok(text.length > 1000);
      for (const match of text.matchAll(/\]\(([^)#]+)\)/g)) {
        if (!/^https?:|^mailto:/u.test(match[1])) assert.ok(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${filename}: missing ${match[1]}`);
      }
    }
    const guide = fs.readFileSync(path.join(root, edition.folder, 'publication-guide.md'), 'utf8');
    assert.ok(guide.includes(`NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_${locale.toUpperCase()}`));
    assert.ok(guide.includes(manifest.files.archive.path.split('/').pop()));
    assert.ok(guide.includes('0') && guide.includes('250 MB'));
  });
}
