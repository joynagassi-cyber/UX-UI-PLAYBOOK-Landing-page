#!/usr/bin/env node
/** Inspect every exported route and local asset, independently of a running Next server. */
const fs = require('node:fs');
const path = require('node:path');
const { loadData, root } = require('./content-data.cjs');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { ARTICLES, ARTICLE_SLUGS, ARTICLES_UI } = loadData('src/i18n/articles.ts');
const { CONTENT } = loadData('src/i18n/content.ts');
const { PLAYBOOK_EDITION, playbookPages } = loadData('src/lib/playbook-edition.ts');
const { designLabTranscript } = loadData('src/i18n/design-lab.ts');
const catalogue = loadData('src/i18n/article-catalog.json');
const out = path.join(root, 'out');
const workerConfigResult = require('typescript').parseConfigFileTextToJson('wrangler.jsonc', fs.readFileSync(path.join(root, 'wrangler.jsonc'), 'utf8'));
const workerConfig = workerConfigResult.config || {};
const checks = [];
const check = (name, ok, evidence) => checks.push({ name, outcome: ok ? 'pass' : 'fail', evidence });
const requireFile = (file) => {
  const target = path.join(out, file);
  check(`file:${file}`, fs.existsSync(target) && fs.statSync(target).size > 0, file);
};
const readOut = (file) => fs.existsSync(path.join(out, file)) ? fs.readFileSync(path.join(out, file), 'utf8') : '';
const decode = (value = '') => value.replace(/&(?:quot|amp|lt|gt|apos|#x27|#39);/g, (entity) => ({ '&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&apos;': "'", '&#x27;': "'", '&#39;': "'" }[entity]));
function meta(html) {
  return Object.fromEntries([...html.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}
function jpegSize(file) {
  if (!fs.existsSync(path.join(out, file))) return null;
  const data = fs.readFileSync(path.join(out, file));
  if (data[0] !== 0xff || data[1] !== 0xd8) return null;
  for (let offset = 2; offset + 8 < data.length;) {
    if (data[offset] !== 0xff) return null;
    const marker = data[offset + 1];
    if (marker === 0xd9 || marker === 0xda) return null;
    const size = data.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
    if (size < 2) return null;
    offset += size + 2;
  }
  return null;
}
const allRoutes = [];
check('catalogue:slugs', JSON.stringify(ARTICLE_SLUGS) === JSON.stringify(Object.keys(catalogue)), ARTICLE_SLUGS);
for (const locale of ['fr', 'en']) {
  check(`catalogue:${locale}`, JSON.stringify(ARTICLES[locale].map((article) => article.slug)) === JSON.stringify(ARTICLE_SLUGS), ARTICLES[locale].map((article) => article.slug));
  for (const suffix of ['', '/articles', ...ARTICLE_SLUGS.map((slug) => `/articles/${slug}`)]) {
    const route = `/${locale}${suffix}`;
    allRoutes.push(route);
    const file = `${route.slice(1)}.html`;
    requireFile(file);
    const html = readOut(file);
    const tags = meta(html);
    const title = decode(/<title>([^<]+)<\/title>/.exec(html)?.[1]);
    const article = ARTICLES[locale].find((entry) => suffix === `/articles/${entry.slug}`);
    const expectedTitle = (article?.metaTitle) || (suffix === '/articles' ? ARTICLES_UI[locale].metaTitle : CONTENT[locale].meta.title);
    const expectedDescription = (article?.metaDescription) || (suffix === '/articles' ? ARTICLES_UI[locale].metaDescription : CONTENT[locale].meta.description);
    const expectedSocialTitle = suffix ? expectedTitle : CONTENT[locale].meta.ogTitle;
    const expectedSocialDescription = suffix ? expectedDescription : CONTENT[locale].meta.ogDescription;
    const expectedImage = SITE_URL + (article?.ogImage || `/og-${locale}.jpg`);
    check(`metadata:${route}`, title === expectedTitle && title.length <= 60 && tags.description === expectedDescription && tags.description.length >= 135 && tags.description.length <= 155 && !('keywords' in tags), { title, descriptionLength: tags.description?.length });
    check(`canonical:${route}`, html.includes(`rel="canonical" href="${SITE_URL}${route}"`), SITE_URL + route);
    for (const other of ['fr', 'en']) check(`hreflang:${route}:${other}`, html.includes(`hrefLang="${other}" href="${SITE_URL}/${other}${suffix}"`), `${other}${suffix}`);
    check(`hreflang:${route}:x-default`, html.includes(`hrefLang="x-default" href="${SITE_URL}/en${suffix}"`), '/en' + suffix);
    check(`social:${route}`, tags['og:url'] === SITE_URL + route && tags['og:image'] === expectedImage && tags['twitter:image'] === expectedImage && tags['og:title'] === expectedSocialTitle && tags['twitter:title'] === expectedSocialTitle && tags['og:description'] === expectedSocialDescription && tags['twitter:description'] === expectedSocialDescription && tags['og:image:width'] === '1200' && tags['og:image:height'] === '630' && tags['twitter:card'] === 'summary_large_image', expectedImage);
    check(`no-image-server:${route}`, !html.includes('/_next/image?'), 'Static export must reference local image files directly.');
    const localAssets = [...html.matchAll(/(?:src|href)="(\/(?:_next\/static|images)\/[^"?#]+)(?:\?[^"#]*)?"/g)].map((match) => match[1]);
    const missing = localAssets.filter((asset) => !fs.existsSync(path.join(out, decodeURIComponent(asset))));
    check(`assets:${route}`, localAssets.length > 0 && missing.length === 0, { checked: localAssets.length, missing });
    const localLinks = [...html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)].map((match) => decodeURIComponent(decode(match[1]))).filter((href) => !href.startsWith('//'));
    const brokenLinks = localLinks.filter((href) => !['/', '/articles'].includes(href) && ![href, `${href}.html`, `${href.replace(/\/$/, '')}.html`, `${href}/index.html`].some((candidate) => fs.existsSync(path.join(out, candidate))));
    check(`local-links:${route}`, brokenLinks.length === 0, { checked: localLinks.length, missing: brokenLinks });
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((match) => { const graph = JSON.parse(match[1]); return graph['@graph'] || [graph]; });
    const person = schemas.find((item) => item['@type'] === 'Person');
    check(`person:${route}`, person?.['@id'] === `${SITE_URL}/#joy-n` && person.url === `${SITE_URL}/${locale}#author` && person.image === `${SITE_URL}/images/author-joy.webp` && person.sameAs?.includes('https://github.com/joynagassi-cyber') && person.sameAs?.includes('https://joyccelight.gumroad.com'), person);
    if (!suffix) {
      const book = schemas.find(item => item['@type'] === 'Book');
      const product = schemas.find(item => item['@type'] === 'Product');
      const c = CONTENT[locale];
      check(`edition:${route}:book-and-price`, book?.numberOfPages === playbookPages(locale)
        && book.inLanguage === locale && !book.dateModified && !book.datePublished
        && book.bookEdition === (locale === 'fr' ? 'Édition française' : 'English edition')
        && product?.offers?.price === '29.00' && product.offers.priceCurrency === 'USD'
        && product.offers.url === c.gumroadUrl, { pages: book?.numberOfPages, date: book?.dateModified, offer: product?.offers });
      check(`edition:${route}:no-release-announcement`, !html.includes('id="edition-2026"')
        && !/ce qui est nouveau|what is new in this edition|édition[^<.]*augmentée|expanded english edition/iu.test(decode(html)),
        'The landing presents book contents without suggesting a new or expanded replacement edition.');
      check(`edition:${route}:nine-parts`, (html.match(/class="toc-item"/g) || []).length === 9
        && c.contentsSection.parts.every(part => decode(html).includes(part.title)), 'All nine part summaries are present without JavaScript.');
      check(`edition:${route}:selected-previews`, PLAYBOOK_EDITION.editions[locale].previews.every(item =>
        html.includes(`src="${item.path}"`) && fs.existsSync(path.join(out, item.path))), 'Ten source-mapped preview pages including the evidence section and glossary.');
    }
    if (!article) {
      check(`hub-links:${route}`, ARTICLE_SLUGS.every((slug) => html.includes(`href="/${locale}/articles/${slug}"`)), ARTICLE_SLUGS);
    } else {
      const structuredArticle = schemas.find((item) => item['@type'] === 'TechArticle');
      check(`article-schema:${route}`, structuredArticle?.mainEntityOfPage === SITE_URL + route && structuredArticle.image === expectedImage && structuredArticle.citation?.length === article.references.length && article.references.every((reference) => structuredArticle.citation.some((citation) => citation.url === reference.url)), { citations: structuredArticle?.citation?.length, image: structuredArticle?.image });
      const explanations = article.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'explanation');
      const paragraphs = explanations.flatMap((block) => block.paragraphs);
      const words = paragraphs.reduce((sum, paragraph) => sum + paragraph.split(/\s+/u).length, 0);
      check(`explanations:${locale}:${article.slug}`, explanations.length === catalogue[article.slug].explanations && explanations.every((block) => block.paragraphs.some((text) => text.split(/\s+/u).length >= 100)) && words >= explanations.length * 125, { count: explanations.length, words });
      check(`summary-diagrams:${route}`, article.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'diagram').length === 2 && (html.match(/data-summary-diagram=/g) || []).length === 2, 'Two native, zoomable summary diagrams per article.');
    }
  }
  for (const image of [`og-${locale}.jpg`, `og-directory-${locale}.jpg`, ...ARTICLES[locale].map((article) => article.ogImage.slice(1))]) {
    requireFile(image);
    const size = jpegSize(image);
    check(`social-image-size:${image}`, size?.width === 1200 && size?.height === 630, size);
  }
  requireFile(`images/${locale}/cover.webp`);
  const cover = `images/free-directory/cover-${locale}.jpg`;
  requireFile(cover);
  check(`resource:cover-size:${locale}`, JSON.stringify(jpegSize(cover)) === JSON.stringify({ width: 1280, height: 720 }), jpegSize(cover));
}
for (const file of ['404.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', '_redirects', '_routes.json', '_headers', '.assetsignore', 'icon.svg']) requireFile(file);
for (const file of ['_routes.json', '_redirects', '_headers', '.assetsignore']) {
  check(`routing-file:${file}`, readOut(file) === fs.readFileSync(path.join(root, 'public', file), 'utf8'), 'Public routing configuration copied unchanged.');
}
const routing = JSON.parse(readOut('_routes.json') || '{}');
check('routing:legacy-Pages-metadata-preserved', routing.version === 1 && JSON.stringify(routing.include) === JSON.stringify(['/', '/articles', '/articles/*']) && JSON.stringify(routing.exclude) === '[]', 'Legacy file retained, not used for Workers routing.');
const workerRoutes = Array.isArray(workerConfig.assets?.run_worker_first) ? workerConfig.assets.run_worker_first : [];
check('worker:original-name-enforced', workerConfig.name === 'joyccelight-playbook', 'The original Worker name is required; do not adopt a CI-provided replacement.');
check('worker:branch-previews-enabled', JSON.stringify(workerConfig.previews) === '{}', 'Remote branch Previews require an explicit empty previews block; ASSETS and compatibility stay at the top level.');
check('worker:entry-and-assets', !workerConfigResult.error && workerConfig.main === 'worker/index.mjs' && fs.existsSync(path.join(root, workerConfig.main)) && !('pages_build_output_dir' in workerConfig) && workerConfig.assets?.directory === './out' && workerConfig.assets?.binding === 'ASSETS' && workerConfig.assets?.html_handling === 'drop-trailing-slash' && workerConfig.assets?.not_found_handling === '404-page', 'A real Worker + ASSETS binding, clean URLs and genuine static 404.');
check('routing:Worker-first-only-unlocalized', JSON.stringify(workerRoutes) === JSON.stringify(['/', '/articles', '/articles/*']), workerRoutes);
check('routing:no-static-overlap', allRoutes.every((route) => !workerRoutes.some((pattern) => pattern.endsWith('*') ? route.startsWith(pattern.slice(0, -1)) : route === pattern)) && !workerRoutes.some((pattern) => /images|_next|robots|sitemap|llms|og-/.test(pattern)), 'Localized pages, images, fonts and discovery files use asset-first routing.');
check('worker:legacy-routing-file-not-uploaded', /^\/_routes\.json$/m.test(readOut('.assetsignore')), 'Workers assets ignore the obsolete Pages routing metadata.');
const canonicalRedirects = readOut('_redirects').trim().split('\n').map(line => line.trim().split(/\s+/));
check('routing:permanent-canonical-aliases', canonicalRedirects.length === allRoutes.length * 2 && allRoutes.every(route => canonicalRedirects.some(([from, to, status]) => from === route + '.html' && to === route && status === (['/fr', '/en'].includes(route) ? '301' : '308')) && canonicalRedirects.some(([from, to, status]) => from === route + '/' && to === route && status === '308')), 'Only the 12 retained pages have permanent HTML/trailing-slash aliases; private language negotiation stays in the Worker.');
const robots = readOut('robots.txt');
check('robots:production-origin', robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`) && !/^Host:/m.test(robots), SITE_URL);
const crawlers = require('../src/config/crawler-policy.json');
check('robots:explicit-crawlers', crawlers.every(({ userAgent }) => robots.includes(`User-Agent: ${userAgent}\nAllow: /`)), crawlers.map(bot => bot.userAgent));
check('sitemap:no-artificial-lastmod', !/<lastmod>|<changefreq>|<priority>/i.test(readOut('sitemap.xml')), 'Optional dates/frequencies omitted until backed by actual page-change provenance.');
const errorPage = readOut('404.html');
check('404:accessible-noindex', /name="robots" content="[^"]*noindex/.test(errorPage) && errorPage.includes('<main') && errorPage.includes('href="/fr"') && errorPage.includes('href="/en"') && !errorPage.includes('rel="canonical"'), 'Bilingual recovery links, semantic main, no indexable/canonical error page.');
const sitemapUrls = [...readOut('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
check('sitemap:all-localized-pages', JSON.stringify(sitemapUrls) === JSON.stringify(allRoutes.map((route) => SITE_URL + route).sort()), sitemapUrls);
const discovery = readOut('llms.txt');
const full = readOut('llms-full.txt');
for (const locale of ['fr', 'en']) {
  check(`llms:${locale}:catalogue-and-references`, ARTICLES[locale].every((article) => discovery.includes(`${SITE_URL}/${locale}/articles/${article.slug}`) && full.includes(article.title) && article.references.every((reference) => discovery.includes(reference.url) && full.includes(reference.url))), `${ARTICLES[locale].length} articles and every bibliography URL`);
  check(`llms:${locale}:book-facts`, full.includes(CONTENT[locale].hero.note)
    && CONTENT[locale].contentsSection.parts.every(item => full.includes(item.title))
    && PLAYBOOK_EDITION.researchSources.every(item => discovery.includes(item.url) && full.includes(item.url))
    && discovery.includes(String(playbookPages(locale))), 'Measured book contents and attributed sources remain available without a release-history announcement.');
  check(`llms:${locale}:all-prototype-viewpoints`, full.includes(designLabTranscript(locale)), 'All nine annotations and hidden screen states are serialized, not just the initial render.');
}
function walk(dir) { return fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]) : []; }
const forbidden = /vercel\.app|VERCEL_URL|x-vercel-ip-country|@vercel\//i;
const textFiles = walk(out).filter((file) => /\.(?:html|txt|xml|json|js|css|svg)$/.test(file));
const withdrawnPayloads = walk(out).filter(file => /\.(?:pdf|zip|md)$/iu.test(file)).map(file => path.relative(out, file));
check('withdrawn-directory:no-download-payloads', withdrawnPayloads.length === 0 && !fs.existsSync(path.join(out, 'downloads')), withdrawnPayloads);
for (const locale of ['fr', 'en']) {
  check(`withdrawn-directory:${locale}:no-route`, !fs.existsSync(path.join(out, locale, 'resources')), 'No old page, HTML alias, RSC payload or replacement teaser is exported.');
}
const directoryCatalogs = [require('../products/ui-ux-directory/catalogue.json'), require('../products/ui-ux-directory/en/catalogue.json')];
const leakedDirectoryContent = textFiles.filter(file => {
  const text = fs.readFileSync(file, 'utf8');
  return /\/resources\/ui-ux-directory|\/downloads\/|data-directory-entry|data-free-download/u.test(text)
    || directoryCatalogs.some(catalog => catalog.entries.some(entry => text.includes(entry.description)));
}).map(file => path.relative(out, file));
check('withdrawn-directory:no-promotions-or-catalogue', leakedDirectoryContent.length === 0, { scanned: textFiles.length, matches: leakedDirectoryContent });

const obsolete = textFiles.filter((file) => forbidden.test(fs.readFileSync(file, 'utf8'))).map((file) => path.relative(out, file));
const staleOrigin = textFiles.filter(file => fs.readFileSync(file, 'utf8').includes('https://joyccelight-playbook.pages.dev')).map(file => path.relative(out, file));
check('all-generated-files:no-retired-canonical-origin', staleOrigin.length === 0, { scanned: textFiles.length, matches: staleOrigin });
const obsoleteEditionClaims = /\b(?:148|139)[- ](?:page|pages)|97 sections|36 (?:écrans|annotated screens)|rules_77\.json|test\/clean\.html/iu;
const staleClaims = textFiles.filter(file => obsoleteEditionClaims.test(fs.readFileSync(file, 'utf8'))).map(file => path.relative(out, file));
check('all-generated-files:no-obsolete-edition-claims', staleClaims.length === 0, { scanned: textFiles.length, matches: staleClaims });
const releaseAnnouncements = /ce qui est nouveau dans cette édition|what is new in this edition|édition française augmentée|expanded (?:english|2026) edition|expanded edition, 9 november 2026/iu;
const releaseHistoryFiles = textFiles.filter(file => releaseAnnouncements.test(fs.readFileSync(file, 'utf8'))).map(file => path.relative(out, file));
check('all-generated-files:no-release-history-marketing', releaseHistoryFiles.length === 0, { scanned: textFiles.length, matches: releaseHistoryFiles });
const paidFileNames = [PLAYBOOK_EDITION.sourceArchive.name, ...Object.values(PLAYBOOK_EDITION.editions).flatMap(item => [item.bookSource.name, item.kitSource.name])];
const exposedPaidFiles = walk(out).filter(file => paidFileNames.includes(path.basename(file)));
check('all-generated-files:no-private-paid-deliverables', exposedPaidFiles.length === 0, exposedPaidFiles);
check('all-generated-files:no-vercel-origin', textFiles.length > 0 && obsolete.length === 0, { scanned: textFiles.length, matches: obsolete });
const fontUrls = textFiles.filter((file) => file.endsWith('.css')).flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/url\(["']?([^"')]+\.woff2)["']?\)/g)].map((match) => path.resolve(path.dirname(file), match[1])));
check('fonts:self-hosted-exported', fontUrls.length >= 2 && fontUrls.every((file) => file.startsWith(out + path.sep) && fs.existsSync(file)), fontUrls.map((file) => path.relative(out, file)));
check('root-redirect:Worker-not-Next-proxy', !fs.existsSync(path.join(root, 'src/proxy.ts')) && !fs.existsSync(path.join(root, 'src/middleware.ts')) && fs.existsSync(path.join(root, 'worker/index.mjs')), 'No request-time Next.js dependency; Worker reuses the existing locale helper.');
const failed = checks.filter((item) => item.outcome === 'fail');
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/static-export-check.json'), JSON.stringify({ siteUrl: SITE_URL, passed: checks.length - failed.length, failed: failed.length, checks }, null, 2) + '\n');
for (const item of failed) console.error('FAIL', item.name, item.evidence);
console.log(`Static export: ${checks.length - failed.length}/${checks.length} passed; ${failed.length} failures. Canonical origin: ${SITE_URL}`);
process.exitCode = failed.length ? 1 : 0;
