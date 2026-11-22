import assert from 'node:assert/strict';
import test from 'node:test';
import { preferredLocale, redirectToLocale } from '../lib/locale-routing.mjs';
import { onRequest as root } from '../functions/index.js';
import { onRequest as hub } from '../functions/articles/index.js';
import { onRequest as article } from '../functions/articles/[[catchall]].js';

const request = (headers = {}, cf) => {
  const result = new Request('https://local.example/?utm_source=test', { headers });
  if (cf) Object.defineProperty(result, 'cf', { value: cf });
  return result;
};
const cases = [
  ['cookie fr before English and country', { Cookie: 'theme=dark; NEXT_LOCALE=fr', 'Accept-Language': 'en', 'CF-IPCountry': 'US' }, undefined, 'fr'],
  ['cookie en before French and country', { Cookie: 'NEXT_LOCALE=en', 'Accept-Language': 'fr', 'CF-IPCountry': 'BJ' }, undefined, 'en'],
  ['invalid cookie uses language', { Cookie: 'NEXT_LOCALE=de', 'Accept-Language': 'fr' }, undefined, 'fr'],
  ['encoded cookie', { Cookie: 'NEXT_LOCALE=%66%72' }, undefined, 'fr'],
  ['malformed cookie', { Cookie: 'NEXT_LOCALE=%XX', 'Accept-Language': 'en' }, undefined, 'en'],
  ['quality not header order', { 'Accept-Language': 'fr;q=0.1,en-GB;q=0.9' }, undefined, 'en'],
  ['French regional tag', { 'Accept-Language': 'de;q=1,fr-BJ;q=0.8,en;q=0.2' }, undefined, 'fr'],
  ['ties keep original order', { 'Accept-Language': 'en;q=0.8,fr;q=0.8' }, undefined, 'en'],
  ['q zero never selected', { 'Accept-Language': 'fr;q=0,en;q=0.1' }, undefined, 'en'],
  ['q zero also excludes country French', { 'Accept-Language': 'fr;q=0', 'CF-IPCountry': 'BJ' }, undefined, 'en'],
  ['decimal q zero also excludes country French', { 'Accept-Language': 'fr;q=0.', 'CF-IPCountry': 'BJ' }, undefined, 'en'],
  ['invalid q not accepted as priority 1', { 'Accept-Language': 'fr;q=banana,en;q=0.2' }, undefined, 'en'],
  ['out of range q ignored', { 'Accept-Language': 'fr;q=2,en;q=0.8' }, undefined, 'en'],
  ['exact language prefixes only', { 'Accept-Language': 'french,enochian' }, undefined, 'en'],
  ['header before country', { 'Accept-Language': 'en', 'CF-IPCountry': 'BJ' }, undefined, 'en'],
  ['country header fallback', { 'CF-IPCountry': 'bj' }, undefined, 'fr'],
  ['Cloudflare country property', {}, { country: 'BJ' }, 'fr'],
  ['Cloudflare property before client header', { 'CF-IPCountry': 'BJ' }, { country: 'US' }, 'en'],
  ['unsupported header uses country', { 'Accept-Language': 'de,es;q=0.8', 'CF-IPCountry': 'BJ' }, undefined, 'fr'],
  ['wildcard uses country', { 'Accept-Language': '*', 'CF-IPCountry': 'BJ' }, undefined, 'fr'],
  ['English exclusion permits French without a French country', { 'Accept-Language': 'en;q=0', 'CF-IPCountry': 'US' }, undefined, 'fr'],
  ['English regional exclusion permits French fallback', { 'Accept-Language': 'en-US;q=0' }, undefined, 'fr'],
  ['both languages excluded use the documented navigable fallback', { 'Accept-Language': 'en;q=0,fr;q=0' }, undefined, 'en'],
  ['English final fallback', {}, undefined, 'en'],
];
for (const [name, headers, cf, expected] of cases) {
  test(name, () => assert.equal(preferredLocale(request(headers, cf)), expected));
}
for (const locale of ['fr', 'en']) {
  for (const [handler, path] of [[root, '/'], [hub, '/articles'], [hub, '/articles/'], [article, '/articles/ux-design-guide'], [article, '/articles/ux-ui-product-design/'], [article, '/articles/unknown/nested']]) {
    test(`${locale} ${path}: same origin, query, 307, privacy`, () => {
      const input = new Request(`https://preview.example${path}?utm_source=test&a=1&a=2&label=hello%20world`, { headers: { Cookie: `NEXT_LOCALE=${locale}` } });
      const response = handler({ request: input });
      const target = new URL(response.headers.get('Location'));
      assert.equal(response.status, 307);
      assert.equal(target.origin, 'https://preview.example');
      assert.equal(target.pathname, `/${locale}${path === '/' ? '' : path.replace(/\/+$/, '')}`);
      assert.equal(target.search, '?utm_source=test&a=1&a=2&label=hello%20world');
      assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
      assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
      assert.equal(response.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
      assert.equal(response.headers.get('Set-Cookie'), null);
      assert.deepEqual(new Set(response.headers.get('Vary').toLowerCase().split(',').map((part) => part.trim())), new Set(['cookie', 'accept-language', 'cf-ipcountry']));
    });
  }
}
test('HEAD redirect has no body', async () => {
  const response = redirectToLocale(new Request('https://preview.example/', { method: 'HEAD' }), '');
  assert.equal(await response.text(), '');
});
