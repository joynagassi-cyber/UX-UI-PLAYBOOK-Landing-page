const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const { loadData, root } = require('../scripts/content-data.cjs');
const { validateSiteOrigin, SITE_URL } = loadData('src/lib/site-config.ts');
const { ARTICLE_SLUGS } = loadData('src/i18n/articles.ts');
const { serializeJsonLd } = loadData('src/lib/structured-data.ts');
const policy = require('../src/config/site-policy.json');
const crawlers = require('../src/config/crawler-policy.json');
const expected = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User'];

for (const value of [policy.defaultOrigin, 'https://playbook.example', 'https://playbook.example/']) {
  test(`canonical origin accepts an intentional public HTTPS origin: ${value}`, () => assert.equal(validateSiteOrigin(value), new URL(value).origin));
}
for (const [name, value] of Object.entries({
  empty: '', invalid: 'not-a-url', relative: '/fr', insecure: 'http://playbook.example', path: 'https://playbook.example/fr',
  query: 'https://playbook.example/?utm_source=test', fragment: 'https://playbook.example/#buy',
  credentials: 'https://unit-only-not-a-real-secret@playbook.example', port: 'https://playbook.example:8443', whitespace: ' https://playbook.example ',
  localhost: 'https://localhost', trailingDot: 'https://localhost.', loopback: 'https://127.0.0.1', ipv6: 'https://[::1]', numeric: 'https://192.168.1.1',
  privateName: 'https://playbook.local', singleLabel: 'https://playbook', sandbox: 'https://3000-preview.e2b.app',
  oldPreview: 'https://preview.vercel.app', pagesPreview: 'https://branch.joyccelight-playbook.pages.dev', protocol: 'ftp://playbook.example',
})) {
  test(`canonical origin rejects ${name} without echoing configuration`, () => assert.throws(() => validateSiteOrigin(value), error => error.message.startsWith('NEXT_PUBLIC_SITE_URL must be') && !error.message.includes(value || 'never-match-empty')));
}
test('hosting discovery and test-server origins never determine the canonical origin', () => {
  const env = { ...process.env, VERCEL_URL: 'preview.vercel.app', CF_PAGES_URL: 'https://branch.joyccelight-playbook.pages.dev', PLAYWRIGHT_BASE_URL: 'http://127.0.0.1:3100' };
  delete env.NEXT_PUBLIC_SITE_URL;
  const result = spawnSync(process.execPath, ['-e', 'console.log(require("./scripts/content-data.cjs").loadData("src/lib/site-config.ts").SITE_URL)'], { cwd: root, env, encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), policy.defaultOrigin);
});
test('an explicit empty canonical origin fails rather than silently falling back', () => {
  const result = spawnSync(process.execPath, ['-e', 'require("./scripts/content-data.cjs").loadData("src/lib/site-config.ts")'], { cwd: root, env: { ...process.env, NEXT_PUBLIC_SITE_URL: '' }, encoding: 'utf8' });
  assert.equal(result.status, 1);
});
test('sitemap has exactly the 14 existing canonical pages, reciprocal alternates and no unjustified dates', () => {
  const entries = loadData('src/app/sitemap.ts').default();
  const suffixes = ['', '/articles', '/resources/ui-ux-directory', ...ARTICLE_SLUGS.map(slug => `/articles/${slug}`)];
  const urls = ['fr', 'en'].flatMap(locale => suffixes.map(suffix => `${SITE_URL}/${locale}${suffix}`)).sort();
  assert.equal(entries.length, 14);
  assert.equal(new Set(entries.map(e => e.url)).size, 14);
  assert.deepEqual(entries.map(e => e.url).sort(), urls);
  for (const entry of entries) {
    assert.ok(!('lastModified' in entry), 'Dates require a page-specific provenance ledger, not updatedAt/build time');
    const suffix = new URL(entry.url).pathname.slice(3);
    assert.deepEqual(entry.alternates.languages, { fr: `${SITE_URL}/fr${suffix}`, en: `${SITE_URL}/en${suffix}`, 'x-default': `${SITE_URL}/en${suffix}` });
  }
});
test('all requested search/training/retrieval controls are explicit and retain the existing allow policy', () => {
  assert.ok(expected.every(bot => crawlers.some(c => c.userAgent === bot)));
  assert.equal(new Set(crawlers.map(c => c.userAgent.toLowerCase())).size, crawlers.length);
  const robots = loadData('src/app/robots.ts').default();
  assert.equal(robots.sitemap, `${SITE_URL}/sitemap.xml`);
  assert.ok(!('host' in robots), 'Host is not a Google robots canonicalization directive');
  for (const name of ['*', ...crawlers.map(c => c.userAgent)]) {
    const group = robots.rules.find(rule => rule.userAgent === name);
    assert.equal(group?.allow, '/');
    assert.ok(!group.disallow);
  }
  assert.equal(crawlers.find(c => c.userAgent === 'GPTBot').purpose, 'training');
  assert.equal(crawlers.find(c => c.userAgent === 'OAI-SearchBot').purpose, 'search');
});
test('JSON-LD serialization cannot close the script element and remains parseable', () => {
  const value = { '@context': 'https://schema.org', text: '</script><script>unit-only</script>&\u2028' };
  const serialized = serializeJsonLd(value);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), value);
});
test('structured article metadata does not invent an hour or label original guides as book excerpts', () => {
  const source = fs.readFileSync(`${root}/src/app/[locale]/articles/[slug]/page.tsx`, 'utf8');
  assert.ok(!/T08:00:00|T00:00:00/.test(source));
  assert.ok(source.includes("'@type': 'WebSite'"));
  assert.ok(!source.includes("'@type': 'Book'"));
});
test('related cards serialize summaries, not three hidden duplicate guide bodies', () => {
  const { ARTICLES } = loadData('src/i18n/articles.ts');
  const { articleSummary } = loadData('src/lib/article-summary.ts');
  for (const locale of ['fr', 'en']) for (const article of ARTICLES[locale]) {
    const summary = articleSummary(article);
    assert.deepEqual(Object.keys(summary).sort(), ['category', 'icon', 'readTime', 'slug', 'subtitle', 'title']);
    assert.equal(summary.title, article.title);
    assert.equal(summary.slug, article.slug);
    assert.ok(!('sections' in summary) && !('references' in summary));
  }
});
test('production serving remains a static export on Workers with no publishing command in GitHub CI', () => {
  const config = fs.readFileSync(`${root}/next.config.mjs`, 'utf8');
  assert.match(config, /output: 'export'/);
  const pkg = JSON.parse(fs.readFileSync(`${root}/package.json`, 'utf8'));
  assert.equal(pkg.scripts['check:worker'], 'node scripts/deploy_worker.cjs --dry-run');
  assert.equal(pkg.scripts['deploy:worker'], 'node scripts/deploy_worker.cjs');
  for (const name of ['cloudflare-static-export.yml', 'ui-check.yml']) {
    const text = fs.readFileSync(`${root}/.github/workflows/${name}`, 'utf8');
    assert.ok(!/wrangler\s+(?:pages\s+deploy|deploy)|vercel\s+(?:deploy|--prod)|npm\s+(?:run\s+)?deploy:worker/i.test(text));
  }
});
