import { expect, test } from '@playwright/test';
import { ARTICLES, ARTICLES_UI } from '../src/i18n/articles';
import { articleHref } from '../src/lib/article-links';

for (const locale of ['fr', 'en'] as const) {
  test(`${locale} · guide orientation, contextual reading and unexecuted review template`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(`/${locale}/articles`);
    await expect(page.locator('main h1')).toHaveText(ARTICLES_UI[locale].heading);
    await expect(page.locator('.guide-card h2')).toHaveCount(4);
    await expect(page.locator('.guide-card h3')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `reports/editorial-hub-${locale}-320.png` });
    await page.locator('header .notion-reading-link a').click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/articles/ux-ui-product-design$`));

    const methodSection = locale === 'fr' ? 'audit-20-min-checklist-40' : 'audit-20-min-40-point-checklist';
    const methodHref = articleHref(locale, 'ux-design-guide', methodSection);
    await page.locator(`.notion-reading-link a[href="${methodHref}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${methodSection}$`));
    const methods = page.locator(`#${methodSection}`);
    await expect(methods.locator('table').first()).toContainText(locale === 'fr' ? 'Question à éclairer' : 'Question to inform');
    await expect(methods.locator('table').first().locator('tbody tr')).toHaveCount(6);

    const reviewSection = locale === 'fr' ? 'verifier-ia-trois-statuts' : 'verifying-ai-three-statuses';
    await page.locator(`.notion-reading-link a[href="${articleHref(locale, 'product-design-ai-agents', reviewSection)}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${reviewSection}$`));
    const review = page.locator('.notion-copybox').filter({ hasText: 'review.md —' });
    await expect(review).toContainText(locale === 'fr' ? 'resultat: non_execute' : 'outcome: not_run');
    await review.locator('.notion-copy-btn').click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(await review.locator('code').innerText());
    await expect(review).toContainText(locale === 'fr' ? 'preuve: null' : 'evidence: null');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);

    const response = await page.request.get('/llms-full.txt');
    expect(response.ok()).toBe(true);
    const markdown = await response.text();
    expect(markdown).toContain(methodHref);
    expect(markdown).not.toContain('USABILITY_TEST_PROTOCOL_FR.md');
    expect(markdown).not.toContain('BROUILLON INTERNE');
  });

  test(`${locale} · copied token/component example renders in both themes`, async ({ page }, testInfo) => {
    // Exercise the actual article snippets, not a separate approximation of them.
    const article = ARTICLES[locale].find((article) => article.slug === 'ui-design-system-tokens')!;
    const snippets = article.sections.flatMap((section) => section.blocks).filter((block) => block.type === 'copyable');
    const tokens = snippets.find((block) => block.langTag === 'css')!;
    const component = snippets.find((block) => block.langTag === 'html')!;
    await page.setContent(`<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>${tokens.code}
      body { margin: 24px; font: 1rem Georgia, serif; background: var(--color-bg); color: var(--color-text); }
      h1 { font-size: 1.5rem; }
      </style></head><body><main><h1>Tokens CSS</h1>${component.code}</main></body></html>`);
    const button = page.locator('button.export-action');
    await expect(button).toHaveAccessibleName(locale === 'fr' ? 'Exporter les factures' : 'Export invoices');
    const measurements: object[] = [];
    const expectedColors = {
      light: { text: 'rgb(255, 255, 255)', rest: 'rgb(194, 50, 10)', hover: 'rgb(166, 40, 6)' },
      dark: { text: 'rgb(11, 13, 18)', rest: 'rgb(255, 107, 71)', hover: 'rgb(255, 133, 102)' },
    };
    for (const theme of ['light', 'dark'] as const) {
      await page.evaluate((value) => document.documentElement.dataset.theme = value, theme);
      for (const width of [1280, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await page.mouse.move(0, 0);
        for (const state of ['rest', 'hover'] as const) {
          if (state === 'hover') await button.hover();
          // Let the browser apply the theme/state, including reduced-motion transitions.
          await expect(button).toHaveCSS('background-color', expectedColors[theme][state]);
          await expect(button).toHaveCSS('color', expectedColors[theme].text);
          const pair = await button.evaluate((element) => {
            const style = getComputedStyle(element);
            const channels = (rgb: string) => rgb.match(/[\d.]+/g)!.slice(0, 3).map(Number);
            const luminance = (rgb: string) => channels(rgb).map((value) => {
              const channel = value / 255;
              return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
            }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
            const foreground = luminance(style.color);
            const background = luminance(style.backgroundColor);
            return {
              color: style.color,
              background: style.backgroundColor,
              opacity: style.opacity,
              ratio: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
              height: element.getBoundingClientRect().height,
            };
          });
          expect(pair.opacity).toBe('1');
          expect(pair.ratio).toBeGreaterThanOrEqual(4.5);
          expect(pair.height).toBeGreaterThanOrEqual(44);
          measurements.push({ locale, theme, width, state, ...pair });
        }
        await page.locator('h1').click();
        await page.keyboard.press('Tab');
        await expect(button).toBeFocused();
        await expect(button).toHaveCSS('outline-style', 'solid');
        await expect(button).toHaveCSS('outline-width', '3px');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (width === 320) await page.screenshot({ path: `reports/editorial-token-${locale}-${theme}-320.png` });
      }
    }
    // Text enlargement in this isolated fixture is not a complete WCAG audit.
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await expect(button).toHaveCSS('font-size', '32px');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await testInfo.attach('token-example-contrast-checks', { body: JSON.stringify(measurements, null, 2), contentType: 'application/json' });
  });
}
