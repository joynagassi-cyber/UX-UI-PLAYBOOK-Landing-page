const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { loadData, root } = require('../scripts/content-data.cjs');
const catalog = require('../products/ui-ux-directory/catalogue.json');
const manifest = require('../products/ui-ux-directory/manifest.json');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { parseFreeGumroadUrl, FREE_RESOURCE_PATH } = loadData('src/lib/free-resource-config.ts');
const { FREE_UI, resourceCategories, resourceSamples } = loadData('src/i18n/free-resource.ts');
const readPublic = (file) => fs.readFileSync(path.join(root, 'public', file));

// Synthetic URLs below exercise syntax only; they are not published links or account lookups.
test('empty Gumroad config keeps the working direct-download fallback', () => {
  for (const value of [undefined, '', '   ']) assert.equal(parseFreeGumroadUrl(value), null);
});

test('the optional checkout only accepts the creator’s store and a non-paid product path', () => {
  const fixture = 'https://joyccelight.gumroad.com/l/test-fixture-only';
  assert.equal(parseFreeGumroadUrl(` ${fixture} `), fixture);
  for (const invalid of [
    'http://joyccelight.gumroad.com/l/test-fixture-only',
    'https://example.com/l/test-fixture-only',
    'https://other.gumroad.com/l/test-fixture-only',
    'https://joyccelight.gumroad.com.evil.example/l/test-fixture-only',
    'https://user:password@joyccelight.gumroad.com/l/test-fixture-only',
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

test('counts mean 51 entries, 6 categories and 75 resource links, not 75 audited tools', () => {
  assert.equal(catalog.entries.length, 51);
  assert.equal(catalog.categories.length, 6);
  assert.deepEqual(catalog.categories.map(c => catalog.entries.filter(e => e.category === c.id).length), [10, 10, 10, 7, 7, 7]);
  const urls = catalog.entries.flatMap(e => e.urls);
  assert.equal(urls.length, 75);
  assert.equal(new Set(urls).size, 75);
  for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
  assert.deepEqual(manifest.counts, { entries: 51, categories: 6, resourceLinks: 75, guidePages: 34, worksheetPages: 3, archiveFiles: 7 });
});

test('every entry has descriptive text, three profile uses and a caveat', () => {
  assert.equal(new Set(catalog.entries.map(e => e.id)).size, 51);
  for (const entry of catalog.entries) {
    assert.ok(entry.name.length > 2);
    assert.ok(entry.description.split(/\s+/u).length >= 50, entry.id);
    for (const key of ['nonDesigner', 'developer', 'agent', 'watch']) assert.ok(entry[key].length > 35, `${entry.id}/${key}`);
  }
  assert.ok(!JSON.stringify(catalog).match(/sans hallucination|UI irréprochable|garantit un rendu/u));
});

test('the corrected addresses and qualified licensing statements remain in the edited edition', () => {
  const text = JSON.stringify(catalog);
  for (const url of ['https://reactnativereusables.com/', 'https://chartist.dev/', 'https://recharts.github.io/', 'https://apexcharts.com/license/', 'https://undraw.co/license', 'https://storyset.com/terms']) assert.ok(text.includes(url), url);
  assert.ok(!/rnr-docs|gionkunz\.github\.io|vercel\.app/u.test(text));
  assert.match(catalog.entries.find(e => e.id === '5.3').description, /Community.*commercial.*OEM/iu);
  assert.match(catalog.entries.find(e => e.id === '6.2').description, /attribution/u);
  assert.match(catalog.entries.find(e => e.id === '6.1').description, /entraînement/u);
  assert.match(catalog.entries.find(e => e.id === '2.7').description, /closed source/u);
});

test('both page languages expose the same French files honestly and preserve locale switching', () => {
  assert.equal(FREE_RESOURCE_PATH, '/resources/ui-ux-directory');
  assert.equal(manifest.language, 'fr');
  assert.equal(manifest.generatedForOrigin, SITE_URL, 'Regenerate the pack when the public build origin changes.');
  for (const locale of ['fr', 'en']) {
    const t = FREE_UI[locale];
    assert.ok(t.metaTitle.length <= 60);
    assert.ok(t.metaDescription.length >= 135 && t.metaDescription.length <= 155);
    assert.equal(resourceCategories(locale).flatMap(c => c.entries).length, 51);
    assert.equal(resourceSamples(locale).length, 3);
    assert.ok(t.files[0].title.includes(String(manifest.counts.guidePages)));
  }
  assert.match(FREE_UI.en.language, /French-language/u);
  assert.match(FREE_UI.en.download, /French/u);
  assert.match(FREE_UI.en.faqs[2].a, /both languages download the same French kit/u);
});

for (const [key, file] of Object.entries(manifest.files)) {
  test(`real ${key} download matches the declared byte length and SHA-256`, () => {
    const bytes = readPublic(file.path);
    assert.ok(bytes.length > 1000);
    assert.equal(bytes.length, file.bytes);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), file.sha256);
    assert.ok(file.path.startsWith('/downloads/') && !file.path.includes('..'));
  });
}

test('the ZIP is intact, contains exactly seven expected files and meets the free-product size limit', () => {
  const data = JSON.parse(execFileSync('python3', ['-c', `import zipfile,json,sys,re\nfrom pathlib import PurePosixPath\nwith zipfile.ZipFile(sys.argv[1]) as z:\n print(json.dumps({'bad':z.testzip(),'names':z.namelist(),'bytes':sum(f.file_size for f in z.infolist()),'unsafe':any(PurePosixPath(f.filename).is_absolute() or '..' in PurePosixPath(f.filename).parts for f in z.infolist()),'date':list(z.infolist()[0].date_time)}))`, path.join(root, 'public', manifest.files.archive.path)], { encoding: 'utf8' }));
  assert.equal(data.bad, null);
  assert.equal(data.unsafe, false);
  assert.ok(data.bytes < 250_000_000);
  assert.deepEqual(data.date, [2026, 11, 18, 0, 0, 0]);
  assert.deepEqual(data.names.sort(), ['LIRE-MOI.md', 'repertoire-ui-ux-fr.pdf', 'repertoire-ui-ux-fr.md', 'fiche-decision.pdf', 'fiche-decision.md', 'grille-selection.csv', 'LICENCES.txt'].map(name => 'repertoire-ui-ux/' + name).sort());
});

test('PDFs have the promised pages, French language, text tags and all resource destinations', () => {
  const guide = readPublic(manifest.files.pdf.path).toString('latin1');
  assert.ok(guide.startsWith('%PDF-'));
  assert.equal((guide.match(/\/Type \/Page\b/g) || []).length, manifest.counts.guidePages);
  assert.match(guide, /\/Lang \(fr\)/u);
  assert.match(guide, /\/Marked true/u);
  const destinations = [...guide.matchAll(/\/URI \(([^)]*)\)/g)].map(match => match[1]);
  for (const url of catalog.entries.flatMap(e => e.urls)) assert.ok(destinations.includes(url), `Missing PDF link ${url}`);
  assert.ok(destinations.some(url => url.startsWith(SITE_URL + '/fr?utm_source=') && url.endsWith('#buy')));
  assert.ok(!destinations.some(url => url.includes('#buy?utm_')));
  const worksheet = execFileSync('python3', ['-c', `import zipfile,sys\nwith zipfile.ZipFile(sys.argv[1]) as z: sys.stdout.buffer.write(z.read('repertoire-ui-ux/fiche-decision.pdf'))`, path.join(root, 'public', manifest.files.archive.path)]).toString('latin1');
  assert.equal((worksheet.match(/\/Type \/Page\b/g) || []).length, manifest.counts.worksheetPages);
  assert.match(worksheet, /\/Lang \(fr\)/u);
  // Tags are structural output, not a claim of PDF/UA or screen-reader certification.
});

test('Markdown includes all 51 complete entries, tracked return links and licensing caveats', () => {
  const md = readPublic(manifest.files.markdown.path).toString('utf8');
  for (const entry of catalog.entries) {
    assert.ok(md.includes(`### ${entry.id}. ${entry.name}`));
    for (const value of [entry.description, entry.nonDesigner, entry.developer, entry.agent, entry.watch, ...entry.urls]) assert.ok(md.includes(value), entry.id);
  }
  assert.ok(md.includes(`${SITE_URL}/fr${FREE_RESOURCE_PATH}?utm_source=`));
  assert.ok(!md.includes('#buy?utm_'));
  assert.match(md, /pas à 75 outils distincts/u);
  assert.match(md, /audit exhaustif/u);
});

test('worksheet, CSV and notices are useful templates, not third-party asset redistributions', () => {
  const data = JSON.parse(execFileSync('python3', ['-c', `import csv,io,zipfile,json,sys\nwith zipfile.ZipFile(sys.argv[1]) as z:\n read=lambda n:z.read('repertoire-ui-ux/'+n).decode('utf-8-sig')\n print(json.dumps({'rows':list(csv.reader(io.StringIO(read('grille-selection.csv')),delimiter=';')),'worksheet':read('fiche-decision.md'),'notices':read('LICENCES.txt'),'readme':read('LIRE-MOI.md')}))`, path.join(root, 'public', manifest.files.archive.path)], { encoding: 'utf8' }));
  assert.equal(data.rows.length, 7);
  assert.ok(data.rows.every(row => row.length === 11));
  assert.ok(data.rows.slice(1).every(row => row.slice(1).every(cell => cell === '')));
  for (const c of catalog.categories) assert.ok(data.worksheet.includes(c.name));
  for (const text of ['SIL OPEN FONT LICENSE', 'ISC License', 'Feather', 'Joy N.', 'ne concèdent aucun droit']) assert.ok(data.notices.includes(text), text);
  assert.match(data.readme, /pas un formulaire PDF interactif/u);
  assert.match(data.readme, /34 pages/u);
});

function pngDimensions(filename) { const data = fs.readFileSync(filename); assert.equal(data.toString('ascii', 1, 4), 'PNG'); return [data.readUInt32BE(16), data.readUInt32BE(20)]; }
test('Gumroad gets a real landscape cover and a separate high-resolution square thumbnail', () => {
  assert.deepEqual(pngDimensions(path.join(root, 'products/ui-ux-directory/marketing/cover-1280x720.png')), [1280, 720]);
  assert.deepEqual(pngDimensions(path.join(root, 'products/ui-ux-directory/marketing/thumbnail-1080x1080.png')), [1080, 1080]);
});
