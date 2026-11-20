const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { loadData, root } = require('../scripts/content-data.cjs');
const { ARTICLES, ARTICLE_SLUGS, ARTICLES_UI } = loadData('src/i18n/articles.ts');
const { articleHref } = loadData('src/lib/article-links.ts');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { GET } = loadData('src/app/llms-full.txt/route.ts');
const catalog = loadData('src/i18n/article-catalog.json');
const fullText = GET().then((response) => response.text());

const expectedSlugs = [
  'ux-design-guide',
  'ui-design-system-tokens',
  'product-design-ai-agents',
  'ux-ui-product-design',
];
const flattenStrings = (value) => typeof value === 'string' ? [value]
  : value && typeof value === 'object' ? Object.values(value).flatMap(flattenStrings) : [];
const blocks = (article) => article.sections.flatMap((section) => section.blocks);

test('the four existing intents remain consolidated in the same FR/EN URLs', () => {
  assert.deepEqual(ARTICLE_SLUGS, expectedSlugs);
  for (const locale of ['fr', 'en']) assert.deepEqual(ARTICLES[locale].map((article) => article.slug), expectedSlugs);
});

test('article links preserve locale and encode only the optional fragment', () => {
  assert.equal(articleHref('fr', 'ux-design-guide'), '/fr/articles/ux-design-guide');
  assert.equal(articleHref('en', 'ux-design-guide', 'methods & checks'), '/en/articles/ux-design-guide#methods%20%26%20checks');
});

for (const locale of ['fr', 'en']) {
  const articles = ARTICLES[locale];
  const ux = articles.find((article) => article.slug === 'ux-design-guide');
  const ui = articles.find((article) => article.slug === 'ui-design-system-tokens');
  const product = articles.find((article) => article.slug === 'product-design-ai-agents');

  test(`${locale}: hub orientation names all three disciplines`, () => {
    const hub = ARTICLES_UI[locale];
    assert.match(hub.heading, /UX.*UI.*Product Design/);
    assert.ok(hub.startLinkLabel && hub.startLinkText);
    for (const item of [hub, ...articles]) {
      assert.ok(item.metaTitle.length <= 60, item.metaTitle);
      assert.ok(item.metaDescription.length >= 135 && item.metaDescription.length <= 155, `${item.metaDescription.length}: ${item.metaDescription}`);
    }
  });

  test(`${locale}: contextual links have real local targets and full-text equivalents`, async () => {
    const markdown = await fullText;
    let count = 0;
    for (const article of articles) {
      for (const block of blocks(article).filter((block) => block.type === 'readingLink')) {
        count++;
        const destination = articles.find((item) => item.slug === block.slug);
        assert.ok(destination, `${article.slug}: ${block.slug}`);
        assert.notEqual(article.slug, block.slug, 'A contextual link should add a different reading, not link to itself.');
        if (block.sectionId) assert.ok(destination.sections.some((section) => section.id === block.sectionId), block.sectionId);
        assert.ok(block.label.trim() && block.text.trim());
        assert.ok(markdown.includes(`[${block.label}](${SITE_URL}${articleHref(locale, block.slug, block.sectionId)})`));
        assert.ok(markdown.includes(block.text));
      }
    }
    assert.equal(count, 9);
  });

  for (const article of articles) {
    test(`${locale}/${article.slug}: numbered citations resolve and long explanations remain intact`, () => {
      const seen = new Set();
      for (const reference of article.references) {
        assert.ok(reference.url.startsWith('https://'));
        assert.ok(!seen.has(reference.url), `Duplicate source: ${reference.url}`);
        seen.add(reference.url);
        assert.ok(reference.title && reference.publisher && reference.date && reference.note);
      }
      const prose = blocks(article).filter((block) => block.type !== 'copyable').flatMap(flattenStrings).join('\n');
      for (const match of prose.matchAll(/\[(\d+)\]/g)) {
        const index = Number(match[1]);
        assert.ok(index >= 1 && index <= article.references.length, `Unresolved citation [${index}]`);
      }
      const explanations = blocks(article).filter((block) => block.type === 'explanation');
      assert.equal(explanations.length, catalog[article.slug].explanations);
      assert.ok(explanations.every((block) => block.paragraphs.some((paragraph) => paragraph.split(/\s+/u).length >= 100)));
      assert.equal(blocks(article).filter((block) => block.type === 'diagram').length, 2);
    });
  }

  test(`${locale}: method matrix complements, rather than replaces, the existing sample cautions`, () => {
    const matrix = blocks(ux).find((block) => block.type === 'table' && /export/i.test(block.caption ?? ''));
    assert.ok(matrix);
    assert.equal(matrix.rows.length, 6);
    assert.ok(matrix.rows.every((row) => row.length === matrix.headers.length && row.every(Boolean)));
    for (const suffix of ['which-ux-research-methods/', 'plan-user-research-for-your-service', 'synthetic-users/']) {
      assert.ok(ux.references.some((reference) => reference.url.endsWith(suffix)));
    }
    assert.ok(ux.references.some((reference) => reference.url === 'https://doi.org/10.3758/BF03195514'));
    assert.match(flattenStrings(ux.sections).join(' '), /Faulkner.*55.*99/);
    assert.ok(blocks(ux).some((block) => block.type === 'copyable' && /checklist/i.test(block.label)));
  });

  test(`${locale}: token example has an actual consumer and retains the DTCG status caveat`, () => {
    const snippets = blocks(ui).filter((block) => block.type === 'copyable');
    const css = snippets.find((block) => block.langTag === 'css');
    const html = snippets.find((block) => block.langTag === 'html');
    assert.ok(css && html);
    assert.match(html.code, /<button type="button" class="export-action">/);
    assert.match(html.code, /:focus-visible/);
    for (const match of html.code.matchAll(/var\((--[\w-]+)\)/g)) assert.ok(css.code.includes(`${match[1]}:`), `Undefined demo token ${match[1]}`);
    assert.ok(ui.references.some((reference) => reference.url === 'https://www.designtokens.org/tr/2025.10/format/'));
    assert.doesNotMatch(ui.keywords.join(' '), /W3C.*2025\.10|2025\.10.*W3C/);
    assert.match(flattenStrings(ui.sections).join(' '), locale === 'fr' ? /distinct d’une Recommandation W3C/ : /distinct from a W3C Recommendation/);
    assert.ok(ui.references.some((reference) => reference.url.includes('forms/notifications/')));
  });

  test(`${locale}: AI review template cannot be mistaken for completed participant research`, () => {
    const template = blocks(product).find((block) => block.type === 'copyable' && block.langTag === 'yaml');
    assert.ok(template);
    assert.match(template.code, locale === 'fr' ? /resultat: non_execute/ : /outcome: not_run/);
    assert.match(template.code, locale === 'fr' ? /observe: null/ : /observed: null/);
    assert.match(template.code, locale === 'fr' ? /preuve: null/ : /evidence: null/);
    assert.match(template.note, locale === 'fr' ? /non exécuté/ : /not run/);
    assert.ok(product.references.some((reference) => reference.url.endsWith('/responsible-use/agents')));
    assert.ok(product.references.some((reference) => reference.url.includes('test-evaluate/tools/selecting/')));
    assert.match(product.entityDefinition, locale === 'fr' ? /ne possède pas seul/ : /does not own/);
  });
}

test('priority protocol is an internal draft, not a new public route or download', () => {
  const filename = path.join(root, 'docs/drafts/USABILITY_TEST_PROTOCOL_FR.md');
  assert.ok(fs.existsSync(filename));
  const draft = fs.readFileSync(filename, 'utf8');
  assert.match(draft, /BROUILLON INTERNE/);
  assert.match(draft, /aucune session/i);
  assert.ok(!fs.existsSync(path.join(root, 'public/drafts/USABILITY_TEST_PROTOCOL_FR.md')));
});
