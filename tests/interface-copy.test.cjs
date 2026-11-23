const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadData } = require('../scripts/content-data.cjs');
const { CONTENT } = loadData('src/i18n/content.ts');

const strings = value => typeof value === 'string' ? [value]
  : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];

for (const locale of ['fr', 'en']) {
  const copy = CONTENT[locale];
  test(`${locale}: book previews use a localized excerpt label, not the old real-page wording`, () => {
    assert.equal(copy.insideSection.previewLabel, locale === 'fr' ? 'Extrait du livre' : 'Book excerpt');
    assert.doesNotMatch(strings(copy).join('\n'), /pages? réelles?|real pages?/iu);
    assert.equal(copy.insideSection.pages.length, 10);
    assert.deepEqual(copy.insideSection.pages.map(page => page.id), [
      'cover', 'contents', 'landing', 'checkout', 'questions', 'sbs-checkout',
      'sbs-loading', 'revenue', 'checklist', 'bonus-cover',
    ]);
    assert.ok(copy.insideSection.pages.every(page => page.src.startsWith(`/images/${locale}/`)));
  });

  test(`${locale}: revised sales copy describes delivery and instructions without extra promises`, () => {
    assert.doesNotMatch(strings(copy).join('\n'), /paiement sécurisé|secure Gumroad checkout|inclus instantanément|included immediately|instant downloads?|sans jargon|without jargon|créateur de solutions numériques|digital product builder|pure OLED|noir OLED/iu);
    assert.ok(copy.offer.guarantees.includes(locale === 'fr' ? 'Paiement via Gumroad' : 'Payment via Gumroad'));
    assert.match(copy.comparison.rows[4].playbook, /Markdown/);
    assert.equal(copy.gumroadUrl, locale === 'fr'
      ? 'https://joyccelight.gumroad.com/l/uiuxplaybookfr'
      : 'https://joyccelight.gumroad.com/l/uxuiplaybook');
    assert.equal(copy.offer.priceDisplay, locale === 'fr' ? '29 $' : '$29');
    assert.match(copy.faq.items.at(-1).a, /joynagassi@gmail\.com/);
    assert.match(copy.faq.items.at(-1).a, locale === 'fr' ? /sept jours/ : /seven days/);
  });
}
