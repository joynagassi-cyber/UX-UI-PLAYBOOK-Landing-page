import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ORIGINAL_WORKER_NAME, deploymentArgs } from '../scripts/deploy_worker.cjs';
import worker, { isNegotiatedPath } from '../worker/index.mjs';

const root = new URL('../', import.meta.url);
const config = JSON.parse(fs.readFileSync(new URL('wrangler.jsonc', root), 'utf8'));
const failAssets = { ASSETS: { fetch() { assert.fail('Negotiated paths must not consult the static asset service.'); } } };

for (const path of ['/', '/articles', '/articles/', '/articles/ux-design-guide', '/articles/ux-ui-product-design/', '/articles/unknown/nested']) {
  for (const locale of ['fr', 'en']) {
    test(`Worker ${path}: ${locale}, same origin, repeated query, private 307`, async () => {
      const request = new Request(`https://worker.example${path}?a=1&a=2&label=hello%20world`, { headers: { Cookie: `NEXT_LOCALE=${locale}`, 'Accept-Language': locale === 'fr' ? 'en' : 'fr' } });
      const response = await worker.fetch(request, failAssets);
      const location = new URL(response.headers.get('Location'));
      assert.equal(response.status, 307);
      assert.equal(location.origin, 'https://worker.example');
      assert.equal(location.pathname, `/${locale}${path === '/' ? '' : path.replace(/\/+$/, '')}`);
      assert.equal(location.search, '?a=1&a=2&label=hello%20world');
      assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
      assert.deepEqual(new Set(response.headers.get('Vary').toLowerCase().split(',').map(v => v.trim())), new Set(['cookie', 'accept-language', 'cf-ipcountry']));
      assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
      assert.equal(response.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
      assert.equal(response.headers.get('Set-Cookie'), null);
      assert.equal(await response.text(), '');
    });
  }
}
for (const path of ['/fr', '/en/articles', '/fr/articles/ux-design-guide', '/en/resources/ui-ux-directory', '/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/_next/static/chunk.js', '/images/en/cover.webp', '/downloads/ui-ux-directory-free-en-v1.zip', '/unknown', '/articleship', '/articles.html', '/Articles', '/articles%2Fhidden']) {
  test(`Worker asset/fallback bypass: ${path}`, async () => {
    const input = new Request(`https://worker.example${path}?a=1`, { headers: { Cookie: 'NEXT_LOCALE=fr', 'Accept-Language': 'fr' } });
    const assetResponse = new Response('asset-or-real-404', { status: path === '/unknown' ? 404 : 200, headers: { 'Content-Type': 'text/plain' } });
    let called = 0;
    const response = await worker.fetch(input, { ASSETS: { fetch(request) { called++; assert.strictEqual(request, input); return assetResponse; } } });
    assert.equal(called, 1);
    assert.strictEqual(response, assetResponse);
    assert.equal(response.headers.get('Location'), null);
    assert.equal(response.headers.get('Vary'), null);
  });
}
for (const [headers, cf, expected] of [
  [{ 'Accept-Language': 'fr;q=0.2,en;q=0.9', 'CF-IPCountry': 'BJ' }, undefined, 'en'],
  [{ 'CF-IPCountry': 'BJ' }, undefined, 'fr'],
  [{ 'CF-IPCountry': 'BJ' }, { country: 'US' }, 'en'],
  [{ 'Accept-Language': 'en;q=0' }, undefined, 'fr'],
  [{ 'Accept-Language': 'fr;q=0,en;q=0' }, undefined, 'en'],
]) {
  test(`Worker language precedence: ${JSON.stringify({ headers, cf })}`, () => {
    const request = new Request('https://worker.example/', { headers });
    if (cf) Object.defineProperty(request, 'cf', { value: cf });
    assert.equal(worker.fetch(request, failAssets).headers.get('Location'), `https://worker.example/${expected}`);
  });
}
test('Worker HEAD and POST redirects preserve the existing 307 semantics without a body', async () => {
  for (const method of ['HEAD', 'POST']) {
    const response = worker.fetch(new Request('https://worker.example/articles?x=1', { method, headers: { Cookie: 'NEXT_LOCALE=fr' } }), failAssets);
    assert.equal(response.status, 307);
    assert.equal(response.headers.get('Location'), 'https://worker.example/fr/articles?x=1');
    assert.equal(await response.text(), '');
  }
});
test('deployment enforces the original name, static export and genuine 404 without assuming a remote project', () => {
  assert.equal(config.name, 'joyccelight-playbook');
  assert.equal(config.main, 'worker/index.mjs');
  assert.equal(config.pages_build_output_dir, undefined);
  assert.equal(config.assets.directory, './out');
  assert.equal(config.assets.binding, 'ASSETS');
  assert.equal(config.assets.html_handling, 'drop-trailing-slash');
  assert.equal(config.assets.not_found_handling, '404-page');
  assert.deepEqual(config.assets.run_worker_first, ['/', '/articles', '/articles/*']);
  for (const path of ['/', '/articles', '/articles/', '/articles/guide', '/fr', '/robots.txt', '/articleship']) {
    const configured = config.assets.run_worker_first.some(pattern => pattern.endsWith('*') ? path.startsWith(pattern.slice(0, -1)) : path === pattern);
    assert.equal(isNegotiatedPath(path), configured);
  }
  assert.match(fs.readFileSync(new URL('public/.assetsignore', root), 'utf8'), /^\/_routes\.json$/m);
});
test('Worker uses only the shared locale helper and static asset service, never a Next server or external fetch', () => {
  const source = fs.readFileSync(new URL(config.main, root), 'utf8');
  assert.match(source, /import \{ redirectToLocale \} from '\.\.\/lib\/locale-routing\.mjs'/);
  assert.doesNotMatch(source, /from ['"]next|\bfetch\(['"`]|ASSETS\.fetch\(new Request|HTMLRewriter|eval\(/);
  const pkg = JSON.parse(fs.readFileSync(new URL('package.json', root), 'utf8'));
  assert.equal(pkg.scripts.build, 'next build');
  assert.equal(pkg.scripts.start, 'npm run preview:worker');
  assert.equal(pkg.scripts['check:worker'], 'node scripts/deploy_worker.cjs --dry-run');
  assert.equal(pkg.scripts['deploy:worker'], 'node scripts/deploy_worker.cjs');
  assert.equal(pkg.scripts['preview:worker'], 'node scripts/preview_worker.cjs');
});

test('deployment pins the original name and root config, not the npm package or CI label', () => {
  assert.equal(ORIGINAL_WORKER_NAME, 'joyccelight-playbook');
  const args = deploymentArgs(config, {}, []);
  assert.deepEqual(args, ['deploy', '--config', fileURLToPath(new URL('wrangler.jsonc', root)), '--name', 'joyccelight-playbook']);
});
test('dry-run uses the same locked target without mutating the CI identity/tag', () => {
  const environment = { WRANGLER_CI_OVERRIDE_NAME: 'joyccelight-playbook', WRANGLER_CI_MATCH_TAG: 'unit-test-tag' };
  const before = { ...environment };
  const args = deploymentArgs(config, environment, ['--dry-run']);
  assert.deepEqual(args, ['deploy', '--config', fileURLToPath(new URL('wrangler.jsonc', root)), '--name', 'joyccelight-playbook', '--dry-run', '--outdir', path.join(fileURLToPath(root), '.cache/worker-dry-run')]);
  assert.deepEqual(environment, before);
});
test('a missing or renamed Worker in the config is refused', () => {
  for (const name of [undefined, '', 'ux-ui-playbook']) {
    assert.throws(() => deploymentArgs({ ...config, name }, {}, ['--dry-run']), /wrangler.name must remain joyccelight-playbook/);
  }
});
test('a conflicting CI-provided Worker name is refused rather than silently overridden', () => {
  for (const name of ['', 'ux-ui-playbook', 'joyccelight-playbook-preview']) {
    assert.throws(() => deploymentArgs(config, { WRANGLER_CI_OVERRIDE_NAME: name }, ['--dry-run']), /automatic renaming is refused/);
  }
});
test('a named Cloudflare environment cannot select a different Worker', () => {
  assert.throws(() => deploymentArgs(config, { CLOUDFLARE_ENV: 'preview' }, ['--dry-run']), /CLOUDFLARE_ENV is not allowed/);
});
test('CLI name, environment, config and script overrides cannot bypass the pinned target', () => {
  for (const args of [['--name', 'other'], ['--name=other'], ['--env', 'preview'], ['-e', 'preview'], ['--config', 'other.jsonc'], ['-c', 'other.jsonc'], ['other.mjs'], ['--dry-run', '--name', 'other']]) {
    assert.throws(() => deploymentArgs(config, {}, args), /overrides are refused/);
  }
});
test('the executable guard exits before starting Wrangler when Workers Builds targets another name', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('scripts/deploy_worker.cjs', root)), '--dry-run'], {
    cwd: fileURLToPath(root), env: { ...process.env, WRANGLER_CI_OVERRIDE_NAME: 'ux-ui-playbook' }, encoding: 'utf8',
  });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /\[worker-identity\].*automatic renaming is refused/);
});
