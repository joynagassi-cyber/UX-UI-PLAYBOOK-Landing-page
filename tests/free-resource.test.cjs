const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync, spawnSync } = require('node:child_process');
const { loadData, root } = require('../scripts/content-data.cjs');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { CONTENT } = loadData('src/i18n/content.ts');
const { marketingHTML } = require('../scripts/free_resource_layout.cjs');
const readArtifact = file => fs.readFileSync(path.join(root, file));
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const editions = {
  fr: { folder: 'products/ui-ux-directory', prefix: 'repertoire-ui-ux-fr/', names: ['LIRE-MOI-FR.md', 'Repertoire-UI-UX-Gratuit-FR.pdf', 'Repertoire-UI-UX-Gratuit-FR.md', 'Fiche-decision-UI-UX-FR.pdf', 'Fiche-decision-UI-UX-FR.md', 'Grille-selection-UI-UX-FR.csv', 'LICENCES-FR.txt'], separator: ';' },
  en: { folder: 'products/ui-ux-directory/en', prefix: 'ui-ux-directory-en/', names: ['README-EN.md', 'Free-UI-UX-Directory-EN.pdf', 'Free-UI-UX-Directory-EN.md', 'UI-UX-Decision-Worksheet-EN.pdf', 'UI-UX-Decision-Worksheet-EN.md', 'UI-UX-Selection-Grid-EN.csv', 'LICENSES-EN.txt'], separator: ',' },
};
const catalogs = Object.fromEntries(Object.entries(editions).map(([locale, edition]) => [locale, require('../' + edition.folder + '/catalogue.json')]));
const manifests = Object.fromEntries(Object.entries(editions).map(([locale, edition]) => [locale, require('../' + edition.folder + '/manifest.json')]));

test('English preserves every French entry ID, category, destination and source URL', () => {
  const fr = catalogs.fr, en = catalogs.en;
  const identity = catalog => catalog.entries.map(({ id, category, urls }) => ({ id, category, urls }));
  assert.deepEqual(identity(en), identity(fr));
  assert.deepEqual(en.sources.map(source => source.url), fr.sources.map(source => source.url));
  assert.equal(en.sources.length, 11);
  assert.equal(en.editionDate, fr.editionDate);
  for (const [index, entry] of en.entries.entries()) for (const key of ['description', 'nonDesigner', 'developer', 'agent', 'watch']) {
    assert.notEqual(entry[key], fr.entries[index][key], `${entry.id}/${key} must be translated`);
  }
  for (const [index, category] of en.categories.entries()) for (const key of ['name', 'purpose', 'question']) assert.notEqual(category[key], fr.categories[index][key]);
});

test('the website serves only a directory presentation page: no UI download, catalogue import or file fallback', () => {
  const pageFile = 'src/app/[locale]/resources/ui-ux-directory/page.tsx';
  assert.equal(fs.existsSync(path.join(root, pageFile)), true, pageFile);
  for (const filename of ['src/components/FreeResourcePromo.tsx', 'src/components/FreeResourceDownload.tsx', 'src/i18n/free-resource.ts', 'src/lib/free-resource-config.ts']) assert.equal(fs.existsSync(path.join(root, filename)), false, filename);
  const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
  assert.equal(walk(path.join(root, 'public')).filter(file => /\.(?:pdf|zip|md)$/iu.test(file)).length, 0);
  const pageSource = fs.readFileSync(path.join(root, pageFile), 'utf8');
  // The page presents the books and links Gumroad; it must not resurrect the
  // withdrawn catalogue, entry data or any local download path.
  assert.doesNotMatch(pageSource, /catalogue\.json|freeResourceCatalog|data-directory-entry|\/downloads\//u);
  const stores = ['https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr', 'https://joyccelight.gumroad.com/l/free-ui-ux-directory-en'];
  for (const store of stores) assert.ok(pageSource.includes(store), store);
  assert.ok(/STORE\[locale\]/u.test(pageSource), 'the page renders only the edition of its own language');
  assert.ok((pageSource.match(/target="_blank"/gu) || []).length >= 1 && /rel="noopener noreferrer"/u.test(pageSource), 'the download link opens Gumroad in a new tab');
  const redirects = readArtifact('public/_redirects').toString().trim().split('\n').map(line => line.trim().split(/\s+/u));
  for (const locale of ['fr', 'en']) {
    for (const suffix of ['.html', '/']) {
      assert.ok(redirects.some(([from, to, status]) => from === `/${locale}/resources/ui-ux-directory${suffix}` && to === `/${locale}/resources/ui-ux-directory` && status === '308'), `${locale}${suffix}`);
    }
  }
  assert.ok(!redirects.some(([, to]) => /gumroad\.com/u.test(to)), 'no server redirect to Gumroad remains');
  assert.ok(!redirects.some(([from]) => from.startsWith('/downloads/')), 'downloads are never redirected to a file host');
  assert.doesNotMatch(readArtifact('.env.example').toString(), /NEXT_PUBLIC_FREE_RESOURCE_GUMROAD/u);
});

function pngDimensions(filename) {
  const bytes = fs.readFileSync(filename);
  assert.equal(bytes.toString('ascii', 1, 4), 'PNG');
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}
for (const [locale, edition] of Object.entries(editions)) {
  const catalog = catalogs[locale], manifest = manifests[locale];
  const archive = path.join(root, manifest.files.archive.path);
  test(`${locale}: exact partial-release counts and screenshot coverage are explicit`, () => {
    assert.equal(catalog.entries.length, 51);
    assert.equal(catalog.categories.length, 6);
    assert.deepEqual(catalog.categories.map(category => catalog.entries.filter(entry => entry.category === category.id).length), [10, 10, 10, 7, 7, 7]);
    const urls = catalog.entries.flatMap(entry => entry.urls);
    assert.equal(urls.length, 75);
    assert.equal(new Set(urls).size, 75);
    for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
    assert.deepEqual(manifest.counts, { entries: 51, categories: 6, resourceLinks: 75, guidePages: 54, worksheetPages: 3, archiveFiles: 7 });
    assert.equal(manifest.screenshots.count, 20);
    assert.equal(manifest.screenshots.galleryPages, 20);
    assert.equal(manifest.screenshots.resourceLinks, 75);
    assert.equal(manifest.screenshots.complete, false);
    assert.equal(manifest.screenshots.mode, 'partial');
    assert.equal(new Set(manifest.screenshots.urls).size, 20);
    for (const url of manifest.screenshots.urls) assert.ok(urls.includes(url));
    assert.equal(manifest.distribution, 'gumroad-only');
    assert.equal(manifest.language, locale);
    assert.equal(manifest.generatedForOrigin, SITE_URL);
  });
  test(`${locale}: entries retain complete descriptions, all three profile uses and caveats`, () => {
    assert.equal(new Set(catalog.entries.map(entry => entry.id)).size, 51);
    for (const entry of catalog.entries) {
      assert.ok(entry.name.length > 2);
      assert.ok(entry.description.split(/\s+/u).length >= 50, entry.id);
      for (const key of ['nonDesigner', 'developer', 'agent', 'watch']) assert.ok(entry[key].length > 35, `${entry.id}/${key}`);
    }
    assert.doesNotMatch(JSON.stringify(catalog), /sans hallucination|UI irréprochable|garantit un rendu|hallucination.free|flawless UI/u);
  });
  test(`${locale}: corrected destinations and qualified licensing descriptions remain`, () => {
    const text = JSON.stringify(catalog);
    for (const url of ['https://reactnativereusables.com/', 'https://chartist.dev/', 'https://recharts.github.io/', 'https://apexcharts.com/license/', 'https://undraw.co/license', 'https://storyset.com/terms']) assert.ok(text.includes(url), url);
    assert.doesNotMatch(text, /rnr-docs|gionkunz\.github\.io|vercel\.app/u);
    assert.match(catalog.entries.find(entry => entry.id === '5.3').description, /Community.*commercial.*OEM/iu);
    assert.match(catalog.entries.find(entry => entry.id === '6.2').description, /attribution/u);
    assert.match(catalog.entries.find(entry => entry.id === '6.1').description, locale === 'fr' ? /entraînement/u : /AI training/u);
    assert.match(catalog.entries.find(entry => entry.id === '2.7').description, /closed.source/u);
  });
  for (const [key, file] of Object.entries(manifest.files)) {
    test(`${locale}: ${key} is a real integrity-checked off-site artifact`, () => {
      assert.ok(file.path.startsWith(`products/ui-ux-directory/releases/${locale}/`) && !file.path.includes('..'));
      const bytes = readArtifact(file.path);
      assert.ok(bytes.length > 1000);
      assert.equal(bytes.length, file.bytes);
      assert.equal(sha256(bytes), file.sha256);
      assert.equal(fs.existsSync(path.join(root, 'public/downloads', path.basename(file.path))), false);
    });
  }
  test(`${locale}: ZIP is safe, intact and contains only its seven localized customer files`, () => {
    const data = JSON.parse(execFileSync('python3', ['-c', `import zipfile,json,sys\nfrom pathlib import PurePosixPath\nwith zipfile.ZipFile(sys.argv[1]) as z:\n print(json.dumps({'bad':z.testzip(),'names':z.namelist(),'bytes':sum(f.file_size for f in z.infolist()),'unsafe':any(PurePosixPath(f.filename).is_absolute() or '..' in PurePosixPath(f.filename).parts for f in z.infolist()),'dates':[list(f.date_time) for f in z.infolist()]}))`, archive], { encoding: 'utf8' }));
    assert.equal(data.bad, null);
    assert.equal(data.unsafe, false);
    assert.ok(data.bytes < 25_000_000, 'Internal size budget, not a claim about current Gumroad limits.');
    assert.ok(data.dates.every(date => JSON.stringify(date) === JSON.stringify([2026, 11, 18, 0, 0, 0])));
    assert.deepEqual(data.names.sort(), edition.names.map(name => edition.prefix + name).sort());
  });
  test(`${locale}: PDF has the promised pages, language, tags and every resource URL`, () => {
    const guide = readArtifact(manifest.files.pdf.path).toString('latin1');
    assert.ok(guide.startsWith('%PDF-'));
    assert.equal((guide.match(/\/Type \/Page\b/g) || []).length, manifest.counts.guidePages);
    assert.match(guide, new RegExp(`/Lang \\(${locale}\\)`));
    assert.match(guide, /\/Marked true/u);
    const destinations = [...guide.matchAll(/\/URI \(([^)]*)\)/g)].map(match => match[1]);
    for (const url of catalog.entries.flatMap(entry => entry.urls)) assert.ok(destinations.includes(url), `Missing PDF link ${url}`);
    assert.ok(destinations.includes(CONTENT[locale].gumroadUrl));
    assert.ok(!destinations.includes(CONTENT[locale === 'fr' ? 'en' : 'fr'].gumroadUrl));
    assert.ok(destinations.some(url => url.startsWith(SITE_URL + `/${locale}?utm_source=`) && url.endsWith('#buy')));
    assert.ok(!destinations.some(url => /#buy\?utm_|\/resources\/ui-ux-directory|\/downloads\//u.test(url)));
    const worksheet = execFileSync('python3', ['-c', `import zipfile,sys\nwith zipfile.ZipFile(sys.argv[1]) as z: sys.stdout.buffer.write(z.read(sys.argv[2]))`, archive, edition.prefix + edition.names[3]]).toString('latin1');
    assert.equal((worksheet.match(/\/Type \/Page\b/g) || []).length, manifest.counts.worksheetPages);
    assert.match(worksheet, new RegExp(`/Lang \\(${locale}\\)`));
    // Structural tags do not establish PDF/UA or screen-reader conformance.
  });
  test(`${locale}: Markdown includes all 51 entries, coverage disclosure and useful return links`, () => {
    const md = readArtifact(manifest.files.markdown.path).toString('utf8');
    for (const entry of catalog.entries) {
      assert.ok(md.includes(`### ${entry.id}. ${entry.name}`));
      for (const value of [entry.description, entry.nonDesigner, entry.developer, entry.agent, entry.watch, ...entry.urls]) assert.ok(md.includes(value), entry.id);
    }
    assert.ok(md.includes(`${SITE_URL}/${locale}/articles?utm_source=`));
    assert.doesNotMatch(md, /#buy\?utm_|\/resources\/ui-ux-directory|\/downloads\//u);
    assert.match(md, locale === 'fr' ? /20 captures.*75 liens/u : /20 supplied.*75 links/u);
    assert.match(md, locale === 'fr' ? /pas à 75 outils distincts/u : /75 links are not 75 distinct tools/u);
    assert.match(md, locale === 'fr' ? /audit exhaustif/u : /not.*exhaustive.*audit/u);
  });
  test(`${locale}: worksheets, CSV and notices remain useful templates, not separate screenshot packs`, () => {
    const data = JSON.parse(execFileSync('python3', ['-c', `import csv,io,zipfile,json,sys\nwith zipfile.ZipFile(sys.argv[1]) as z:\n read=lambda n:z.read(sys.argv[2]+n).decode('utf-8-sig')\n names=json.loads(sys.argv[3])\n print(json.dumps({'rows':list(csv.reader(io.StringIO(read(names[5])),delimiter=sys.argv[4])),'worksheet':read(names[4]),'notices':read(names[6]),'readme':read(names[0]),'samePdf':z.read(sys.argv[2]+names[1])==open(sys.argv[5],'rb').read(),'sameMd':z.read(sys.argv[2]+names[2])==open(sys.argv[6],'rb').read()}))`, archive, edition.prefix, JSON.stringify(edition.names), edition.separator, path.join(root, manifest.files.pdf.path), path.join(root, manifest.files.markdown.path)], { encoding: 'utf8' }));
    assert.ok(data.samePdf && data.sameMd, 'Standalone guide files equal ZIP copies.');
    assert.equal(data.rows.length, 7);
    assert.ok(data.rows.every(row => row.length === 11));
    assert.ok(data.rows.slice(1).every(row => row.slice(1).every(cell => cell === '')));
    assert.deepEqual(data.rows.slice(1).map(row => row[0]), catalog.categories.map(category => category.name));
    for (const category of catalog.categories) assert.ok(data.worksheet.includes(category.name));
    for (const text of ['SIL OPEN FONT LICENSE', 'ISC License', 'Feather', 'Joy N.', locale === 'fr' ? 'ne concèdent aucun droit' : 'grant no rights']) assert.ok(data.notices.includes(text), text);
    assert.match(data.readme, locale === 'fr' ? /pas un formulaire PDF interactif/u : /not an interactive PDF form/u);
    assert.match(data.readme, /54.page/u);
    assert.match(data.readme, /20/u);
    for (const text of [data.worksheet, data.notices, data.readme]) assert.doesNotMatch(text, /\/resources\/ui-ux-directory|\/downloads\//u);
  });
  test(`${locale}: strict full-coverage generation still refuses this partial batch before overwriting files`, () => {
    const before = sha256(readArtifact(manifest.files.archive.path));
    const result = spawnSync(process.execPath, [`scripts/generate_free_resource${locale === 'en' ? '_en' : ''}.cjs`, '--with-screenshots'], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /55\/75 screenshots are missing/u);
    assert.equal(sha256(readArtifact(manifest.files.archive.path)), before);
  });
  test(`${locale}: publication art has explicit zero pricing and correct landscape/square dimensions`, () => {
    assert.deepEqual(pngDimensions(path.join(root, edition.folder, 'marketing/cover-1280x720.png')), [1280, 720]);
    assert.deepEqual(pngDimensions(path.join(root, edition.folder, 'marketing/thumbnail-1080x1080.png')), [1080, 1080]);
    for (const square of [true, false]) {
      const html = marketingHTML(locale, square ? 1080 : 1280, square ? 1080 : 720, square, 20);
      assert.ok(html.includes(locale === 'fr' ? '0 $' : '$0'));
      assert.ok(html.includes(locale === 'fr' ? '20 aperçus' : '20 previews'));
    }
    for (const image of [`public/images/free-directory/cover-${locale}.jpg`, `public/og-directory-${locale}.jpg`]) assert.ok(fs.statSync(path.join(root, image)).size > 1000);
  });
  test(`${locale}: owner copy matches the actual files and waits for real free Gumroad URLs`, () => {
    for (const filename of ['README.md', 'gumroad-listing.md', 'publication-guide.md']) {
      const file = path.join(root, edition.folder, filename), text = fs.readFileSync(file, 'utf8');
      assert.ok(text.length > 1000);
      for (const match of text.matchAll(/\]\(([^)#]+)\)/g)) if (!/^https?:|^mailto:/u.test(match[1])) assert.ok(fs.existsSync(path.resolve(path.dirname(file), match[1])), `${filename}: missing ${match[1]}`);
      assert.doesNotMatch(text, /—|NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL|34.pages|53.pages/u);
      assert.ok(text.includes('54') && text.includes('20'));
    }
    const listing = fs.readFileSync(path.join(root, edition.folder, 'gumroad-listing.md'), 'utf8');
    assert.ok(listing.includes(path.basename(manifest.files.archive.path)));
    assert.ok(listing.includes(CONTENT[locale].gumroadUrl));
    assert.ok(listing.includes(String(locale === 'fr' ? 182 : 171)));
    assert.ok(!listing.includes(CONTENT[locale === 'fr' ? 'en' : 'fr'].gumroadUrl));
    assert.doesNotMatch(listing, /https:\/\/[^\s]*\/resources\/ui-ux-directory/u);
  });
}

test('FR and EN reuse precisely the same 20 real previews, without doubling the capture claim', () => {
  assert.deepEqual(manifests.fr.screenshots.urls, manifests.en.screenshots.urls);
});

test('the overall publication ZIP cleanly separates customers, books and localized marketing, with valid checksums', () => {
  const release = require('../products/ui-ux-directory/releases/publication-manifest.json');
  assert.equal(sha256(readArtifact(release.path)), release.sha256);
  assert.equal(readArtifact(release.path).length, release.bytes);
  const data = JSON.parse(execFileSync('python3', ['-c', `import zipfile,json,hashlib,sys,posixpath,re\nfrom pathlib import PurePosixPath\nwith zipfile.ZipFile(sys.argv[1]) as z:\n names=z.namelist()\n sums=z.read('SHA256SUMS.txt').decode().splitlines()\n valid=all(hashlib.sha256(z.read(line[66:])).hexdigest()==line[:64] for line in sums)\n broken=[]\n for name in names:\n  if name.endswith('.md'):\n   for href in re.findall(r'\\]\\(([^)#]+)\\)',z.read(name).decode()):\n    if not href.startswith(('http:','https:','mailto:')) and posixpath.normpath(posixpath.join(posixpath.dirname(name),href)) not in names:broken.append([name,href])\n print(json.dumps({'bad':z.testzip(),'names':names,'validSums':valid,'sums':len(sums),'brokenLinks':broken,'unsafe':any(PurePosixPath(n).is_absolute() or '..' in PurePosixPath(n).parts for n in names)}))`, path.join(root, release.path)], { encoding: 'utf8' }));
  assert.equal(data.bad, null);
  assert.equal(data.unsafe, false);
  assert.equal(data.names.length, release.files);
  assert.equal(release.files, 15);
  assert.ok(data.validSums);
  assert.equal(data.sums, 14);
  assert.deepEqual(data.brokenLinks, []);
  for (const locale of ['FR', 'EN']) {
    assert.equal(data.names.filter(name => name.startsWith(`01-FICHIERS-CLIENTS/${locale}/`)).length, 1);
    assert.equal(data.names.filter(name => name.startsWith(`03-PUBLICATION-GUMROAD/${locale}/`)).length, 4);
  }
  assert.equal(data.names.filter(name => name.startsWith('02-LIVRES-PDF/')).length, 2);
  assert.ok(data.names.every(name => !/screenshots\/|\.env|source-original|\.html$|manifest\.external/u.test(name)));
});
