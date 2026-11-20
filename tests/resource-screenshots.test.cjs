const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync, spawnSync } = require('node:child_process');
const { root } = require('../scripts/content-data.cjs');
const catalog = require('../products/ui-ux-directory/catalogue.json');
const enCatalog = require('../products/ui-ux-directory/en/catalogue.json');
const helpers = require('../scripts/free_resource_screenshots.cjs');
const { capturePlan, imageName, sha256, requestOptions, emptyManifest, readManifest, validateCapture, pngDimensions, loadGallery, screenshotSheets, safeError } = helpers;
const moduleUrl = pathToFileURL(path.join(root, 'tools/microlink/capture.mjs')).href;
// Deliberately synthetic 1px fixture, used only in ignored local test directories.
// It is never installed as a website screenshot or included in customer downloads.
const fixturePng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1i0AAAAASUVORK5CYII=', 'base64');
const fixtureRoot = path.join(root, '.cache');
fs.mkdirSync(fixtureRoot, { recursive: true });
function temporary(t) {
  const directory = fs.mkdtempSync(path.join(fixtureRoot, 'screenshot-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function addCapture(directory, manifest, url) {
  const image = imageName(url);
  fs.mkdirSync(path.dirname(path.join(directory, image)), { recursive: true });
  fs.writeFileSync(path.join(directory, image), fixturePng);
  manifest.captures[url] = { sourceUrl: url, status: 'captured', review: 'approved', retrievedAt: '2026-11-18T12:00:00.000Z', image, ...pngDimensions(fixturePng), bytes: fixturePng.length, sha256: sha256(fixturePng) };
  return manifest.captures[url];
}
function save(directory, manifest) { fs.writeFileSync(path.join(directory, 'manifest.json'), JSON.stringify(manifest)); }

test('capture plan deduplicates 75 resource URLs and is shared by the two editions', () => {
  const plan = capturePlan(catalog);
  assert.equal(plan.length, 75);
  assert.equal(new Set(plan.map(item => item.image)).size, 75);
  assert.deepEqual(plan.map(item => item.url), capturePlan(enCatalog).map(item => item.url));
  assert.equal(capturePlan({ entries: [catalog.entries[0], catalog.entries[0]] }).length, 1);
  for (const item of plan) assert.match(item.image, /^images\/[0-9a-f]{20}\.png$/u);
});
test('Microlink capture options are PNG, bounded viewport and no internal browser retries', () => {
  assert.equal(requestOptions.type, 'png');
  assert.equal(requestOptions.retry, 0);
  assert.equal(requestOptions.meta, false);
  assert.equal(requestOptions.fullPage, false);
  assert.deepEqual(requestOptions.viewport, { width: 1280, height: 720, deviceScaleFactor: 1, isMobile: false });
  assert.ok(!JSON.stringify(requestOptions).includes('apiKey'));
});
test('empty screenshot manifests contain no fabricated captures or credentials', t => {
  const manifest = readManifest(temporary(t));
  assert.deepEqual(manifest.captures, {});
  assert.equal(manifest.provider, 'microlink');
  assert.equal(manifest.version, 1);
});
test('PNG validation rejects HTML, SVG and invalid dimensions', () => {
  assert.deepEqual(pngDimensions(fixturePng), { width: 1, height: 1 });
  for (const input of ['<html>Login</html>', '<svg></svg>', 'not an image']) assert.throws(() => pngDimensions(Buffer.from(input)), error => error.code === 'EPNG');
  const badSize = Buffer.from(fixturePng); badSize.writeUInt32BE(9000, 16);
  assert.throws(() => pngDimensions(badSize), error => error.code === 'EPNG');
});
test('a PDF capture must be present, hash-checked, dated and visually approved', t => {
  const directory = temporary(t), manifest = emptyManifest(), url = capturePlan(catalog)[0].url;
  const capture = addCapture(directory, manifest, url);
  assert.equal(validateCapture(url, capture, directory).bytes.length, fixturePng.length);
  capture.review = 'pending';
  assert.throws(() => validateCapture(url, capture, directory), error => error.code === 'EREVIEW');
  assert.ok(validateCapture(url, capture, directory, false));
  capture.review = 'approved'; capture.sha256 = '0'.repeat(64);
  assert.throws(() => validateCapture(url, capture, directory), error => error.code === 'EINTEGRITY');
  capture.sha256 = sha256(fixturePng); delete capture.retrievedAt;
  assert.throws(() => validateCapture(url, capture, directory), error => error.code === 'EMANIFEST');
});
test('the screenshot manifest cannot inject a path or substitute a symlink', t => {
  const directory = temporary(t), manifest = emptyManifest(), url = capturePlan(catalog)[0].url;
  const capture = addCapture(directory, manifest, url), original = capture.image;
  capture.image = '../private.png';
  assert.throws(() => validateCapture(url, capture, directory), error => error.code === 'ECAPTURE');
  capture.image = original;
  const image = path.join(directory, capture.image);
  fs.unlinkSync(image);
  const replacement = path.join(directory, 'replacement.png');fs.writeFileSync(replacement, fixturePng);
  fs.symlinkSync(replacement, image);
  assert.throws(() => validateCapture(url, capture, directory), error => error.code === 'EFILE');
});
test('an incomplete or unreviewed image set cannot be silently published as a complete PDF', t => {
  const directory = temporary(t), manifest = emptyManifest(), url = capturePlan(catalog)[0].url;
  addCapture(directory, manifest, url);save(directory, manifest);
  assert.throws(() => loadGallery(catalog, directory), error => error.code === 'EINCOMPLETE' && error.message.includes('74/75'));
  for (const item of capturePlan(catalog)) addCapture(directory, manifest, item.url);
  manifest.captures[url].review = 'pending';save(directory, manifest);
  assert.throws(() => loadGallery(catalog, directory), error => error.code === 'EINCOMPLETE' && error.message.includes('1/75'));
});
test('PDF galleries have all 75 images, two clickable links per URL, dates and rights notices', t => {
  const directory = temporary(t), manifest = emptyManifest();
  for (const item of capturePlan(catalog)) addCapture(directory, manifest, item.url);
  save(directory, manifest);
  for (const [locale, source] of [['fr', catalog], ['en', enCatalog]]) {
    const pages = screenshotSheets(source, locale, directory);
    assert.equal(pages.length, 19);
    const html = pages.map(page => page.body).join('\n');
    assert.equal((html.match(/data-resource-screenshot=/g) || []).length, 75);
    assert.equal((html.match(/<img /g) || []).length, 75);
    assert.equal((html.match(/2026-11-18/g) || []).length, 75);
    for (const item of capturePlan(source)) assert.equal(html.split(`href="${item.url.replaceAll('&', '&amp;')}"`).length - 1, 2, item.url);
    assert.ok(html.includes(locale === 'fr' ? 'Marques et contenus appartiennent' : 'Brands and content belong'));
    assert.ok(!html.includes('pro.microlink.io') && !html.includes('x-api-key'));
  }
});
test('error reporting exposes only a code, safe status and a fixed hint—not SDK headers', () => {
  const error = { code: 'EAUTH', statusCode: 401, message: 'private-fixture-string', request: { headers: { 'x-api-key': 'private-fixture-string' } } };
  const reported = safeError(error);
  assert.equal(reported.code, 'EAUTH');
  assert.equal(reported.statusCode, 401);
  assert.ok(!JSON.stringify(reported).includes('private-fixture-string'));
  assert.equal(safeError({ code: 'bad\nsecret' }).code, 'EUNKNOWN');
});
test('SDK wrapper makes one screenshot call and refuses authenticated redirects', async () => {
  const { oneSdkRequest } = await import(moduleUrl);
  const previous = globalThis.fetch;
  let sdkCalls = 0, networkCalls = 0;
  const asset = { url: 'https://example.com/unit-only.png', type: 'png' };
  const client = { screenshot: async (url, options) => {
    sdkCalls += 1;assert.equal(url, 'https://github.com/');assert.deepEqual(options, requestOptions);
    await fetch('https://pro.microlink.io/?url=https%3A%2F%2Fgithub.com%2F');
    return asset;
  } };
  const result = await oneSdkRequest(client, 'https://github.com/', async (input, options) => {
    networkCalls += 1;assert.equal(options.redirect, 'error');return new Response('{}', { status: 200 });
  });
  assert.equal(result, asset);assert.equal(sdkCalls, 1);assert.equal(networkCalls, 1);assert.equal(globalThis.fetch, previous);
});
test('HTTP retries are blocked before a second billable network request and retain the first API code', async () => {
  const { oneSdkRequest } = await import(moduleUrl);
  const previous = globalThis.fetch;
  let networkCalls = 0;
  const client = { screenshot: async () => {
    await fetch('https://pro.microlink.io/');
    return fetch('https://pro.microlink.io/'); // Simulated SDK retry; must never hit the network.
  } };
  await assert.rejects(oneSdkRequest(client, 'https://github.com/', async () => {
    networkCalls += 1;return new Response(JSON.stringify({ status: 'fail', code: 'ERATE' }), { status: 429 });
  }), error => error.code === 'ERATE' && error.statusCode === 429);
  assert.equal(networkCalls, 1);assert.equal(globalThis.fetch, previous);
});
test('SDK wrapper rejects any non-Pro endpoint without sending a key or making a request', async () => {
  const { oneSdkRequest } = await import(moduleUrl);
  let calls = 0;
  const client = { screenshot: () => fetch('https://example.com/') };
  await assert.rejects(oneSdkRequest(client, 'https://github.com/', async () => { calls += 1; }), error => error.code === 'EENDPOINT');
  assert.equal(calls, 0);
});
test('plan mode never needs a key, imports the SDK or exposes environment values', () => {
  const marker = 'unit-only-not-a-real-key';
  const stdout = execFileSync(process.execPath, ['tools/microlink/capture.mjs', '--plan'], { cwd: root, env: { ...process.env, MICROLINK_API_KEY: marker }, encoding: 'utf8' });
  const plan = JSON.parse(stdout);
  assert.equal(plan.resourceLinks, 75);assert.equal(plan.networkCallsMadeByThisPlan, 0);
  assert.ok(!stdout.includes(marker));
});
test('batch capture requires explicit cost confirmation before any credential or SDK lookup', () => {
  for (const args of [['--all'], ['--all', '--max-calls', '75'], ['--all', '--confirm-billable', '--max-calls', '76']]) {
    const result = spawnSync(process.execPath, ['tools/microlink/capture.mjs', ...args], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 1);assert.equal(JSON.parse(result.stderr).code, 'EBUDGET');
  }
});
test('local key import preserves other variables, replaces duplicate keys atomically and prints no key', t => {
  const directory = temporary(t), tool = path.join(directory, 'tools/microlink/import-key.mjs');
  fs.mkdirSync(path.dirname(tool), { recursive: true });
  fs.copyFileSync(path.join(root, 'tools/microlink/import-key.mjs'), tool);
  const configDir = path.join(directory, '.config/microlink');
  fs.mkdirSync(configDir, { recursive: true });
  const marker = 'unit_only_not_a_real_key_12345';
  fs.writeFileSync(path.join(configDir, 'config.json'), JSON.stringify({ apiKey: marker }));
  const env = path.join(directory, '.env.local');
  fs.writeFileSync(env, '# preserve this comment\nOTHER_VALUE=a=b\nMICROLINK_API_KEY=old_unit_only\nexport MICROLINK_API_KEY = another_old_unit_only\n');
  fs.chmodSync(env, 0o644);
  const result = spawnSync(process.execPath, [tool], { cwd: directory, env: { ...process.env, HOME: directory }, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.readFileSync(env, 'utf8'), `# preserve this comment\nOTHER_VALUE=a=b\nMICROLINK_API_KEY=${marker}\n`);
  assert.equal(fs.statSync(env).mode & 0o777, 0o600);
  assert.ok(!result.stdout.includes(marker) && !result.stderr.includes(marker));
  assert.deepEqual(fs.readdirSync(directory).filter(name => name.startsWith('.env.')), ['.env.local']);
});
test('local key import refuses regular and dangling symlinks without touching their destinations', t => {
  const directory = temporary(t), tool = path.join(directory, 'tools/microlink/import-key.mjs');
  fs.mkdirSync(path.dirname(tool), { recursive: true });
  fs.copyFileSync(path.join(root, 'tools/microlink/import-key.mjs'), tool);
  const configDir = path.join(directory, '.config/microlink');
  fs.mkdirSync(configDir, { recursive: true });
  const marker = 'unit_only_not_a_real_key_12345';
  fs.writeFileSync(path.join(configDir, 'config.json'), JSON.stringify({ apiKey: marker }));
  const env = path.join(directory, '.env.local'), destination = path.join(directory, 'do-not-modify.txt');
  for (const exists of [true, false]) {
    if (exists) fs.writeFileSync(destination, 'unchanged fixture');
    else fs.unlinkSync(destination);
    fs.symlinkSync(destination, env);
    const result = spawnSync(process.execPath, [tool], { cwd: directory, env: { ...process.env, HOME: directory }, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.ok(fs.lstatSync(env).isSymbolicLink());
    if (exists) assert.equal(fs.readFileSync(destination, 'utf8'), 'unchanged fixture');
    else assert.equal(fs.existsSync(destination), false);
    assert.ok(!result.stdout.includes(marker) && !result.stderr.includes(marker));
    fs.unlinkSync(env);
  }
});
test('the external submission retains catalogue coverage and original PNG integrity without implicit import', () => {
  const base = path.join(root, 'products/ui-ux-directory/screenshots');
  const bytes = fs.readFileSync(path.join(base, 'manifest.external-ddf2bcc.json'));
  const incoming = JSON.parse(bytes);
  const expected = capturePlan(catalog).map(item => item.url).sort();
  assert.equal(incoming.entries.length, 75);
  assert.deepEqual(incoming.entries.map(item => item.url).sort(), expected);
  const approved = incoming.entries.filter(item => item.status === 'approved');
  assert.equal(approved.length, 21);
  for (const item of approved) {
    assert.match(item.file, /^images\/[a-zA-Z0-9_.-]+\.png$/u);
    const filename = path.join(base, item.file);
    assert.ok(fs.lstatSync(filename).isFile() && !fs.lstatSync(filename).isSymbolicLink());
    const png = fs.readFileSync(filename);
    assert.equal(sha256(png), item.sha256);
    assert.equal(png.length, item.bytes);
    assert.deepEqual(pngDimensions(png), { width: item.width, height: item.height });
  }
  const canonical = readManifest();
  if (canonical.pendingExternalImport) {
    assert.equal(canonical.pendingExternalImport.sha256, sha256(bytes));
    assert.equal(canonical.pendingExternalImport.manifest, 'manifest.external-ddf2bcc.json');
  }
});
test('an unresolved external submission blocks all paid requests before credentials or SDK loading', t => {
  const directory = temporary(t);
  for (const filename of ['tools/microlink/capture.mjs', 'scripts/free_resource_screenshots.cjs', 'products/ui-ux-directory/catalogue.json']) {
    const target = path.join(directory, filename);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, filename), target);
  }
  const manifest = emptyManifest();
  manifest.pendingExternalImport = { manifest: 'manifest.external-fixture.json', reportedCounts: { approved: 1 } };
  const base = path.join(directory, 'products/ui-ux-directory/screenshots');
  fs.mkdirSync(base, { recursive: true });
  save(base, manifest);
  const marker = 'unit-only-not-a-real-key';
  const run = args => spawnSync(process.execPath, [path.join(directory, 'tools/microlink/capture.mjs'), ...args], { cwd: directory, env: { ...process.env, MICROLINK_API_KEY: marker }, encoding: 'utf8' });
  const plan = run(['--plan']);
  assert.equal(plan.status, 0, plan.stderr);
  assert.equal(JSON.parse(plan.stdout).captureBlocked, true);
  assert.equal(JSON.parse(plan.stdout).apiCallsNeeded, null);
  assert.equal(JSON.parse(plan.stdout).networkCallsMadeByThisPlan, 0);
  for (const args of [['--url', 'https://github.com/'], ['--all', '--max-calls', '75', '--confirm-billable']]) {
    const result = run(args);
    assert.equal(result.status, 1);
    assert.equal(JSON.parse(result.stderr).code, 'EIMPORTPENDING');
    assert.ok(!result.stdout.includes(marker) && !result.stderr.includes(marker));
  }
});
test('secrets and isolated SDK dependencies are Git-ignored and never imported in browser source', () => {
  for (const filename of ['.env.local', 'tools/microlink/node_modules/microlink.io/package.json']) assert.equal(execFileSync('git', ['check-ignore', filename], { cwd: root, encoding: 'utf8' }).trim(), filename);
  function walk(directory) { return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]); }
  const code = walk(path.join(root, 'src')).filter(file => /\.(?:ts|tsx|js|jsx)$/u.test(file));
  assert.ok(code.every(file => !/MICROLINK_API_KEY|from ['"]microlink\.io|require\(['"]microlink\.io/u.test(fs.readFileSync(file, 'utf8'))));
});
