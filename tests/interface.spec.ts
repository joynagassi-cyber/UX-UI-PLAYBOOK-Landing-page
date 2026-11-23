import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalogue from '../src/i18n/article-catalog.json';

const suffixes = ['', '/articles', '/resources/ui-ux-directory', ...Object.keys(catalogue).map(slug => `/articles/${slug}`)];
const articlePath = (locale: string) => `/${locale}/articles/ux-design-guide`;
const scrollbarChrome = (locator: Locator) => locator.evaluate(element => ({
  standard: getComputedStyle(element).getPropertyValue('scrollbar-width'),
  webkit: getComputedStyle(element, '::-webkit-scrollbar').display,
}));

// Chromium exposes native summary as DisclosureTriangle, not the ARIA button
// role queried by Playwright's role locator. Check the actual accessibility tree.
async function assertNativeDisclosure(page: Page, summary: Locator, label: string, expanded: boolean) {
  await expect(summary).toHaveAccessibleName(label);
  const cdp = await page.context().newCDPSession(page);
  try {
    const tree = await cdp.send('Accessibility.getFullAXTree');
    const node = tree.nodes.find(item => item.role?.value === 'DisclosureTriangle' && item.name?.value === label);
    expect(node).toBeTruthy();
    expect(node?.properties?.find(property => property.name === 'expanded')?.value.value).toBe(expanded);
  } finally { await cdp.detach(); }
}

async function assertScrollableWithKeyboardAndWheel(page: Page, region: Locator, axis: 'x' | 'y') {
  await expect(region).toBeVisible();
  expect(await scrollbarChrome(region)).toEqual({ standard: 'none', webkit: 'none' });
  expect(await region.evaluate((element, direction) => direction === 'x'
    ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight, axis)).toBe(true);
  await region.focus();
  await page.keyboard.press(axis === 'x' ? 'ArrowRight' : 'PageDown');
  await expect.poll(() => region.evaluate((element, direction) => direction === 'x'
    ? element.scrollLeft : element.scrollTop, axis)).toBeGreaterThan(0);
  await region.evaluate(element => element.scrollTo(0, 0));
  await region.hover();
  await page.mouse.wheel(axis === 'x' ? 160 : 0, axis === 'y' ? 160 : 0);
  await expect.poll(() => region.evaluate((element, direction) => direction === 'x'
    ? element.scrollLeft : element.scrollTop, axis)).toBeGreaterThan(0);
}

for (const locale of ['fr', 'en'] as const) {
  for (const suffix of suffixes) {
    test(`${locale}${suffix} · scrollbar chrome hidden, native page scrolling retained`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 390, height: 700 });
      await page.goto(`/${locale}${suffix}`);
      expect(await scrollbarChrome(page.locator('html'))).toEqual({ standard: 'none', webkit: 'none' });
      const overflow = await page.evaluate(() => ({
        vertical: document.documentElement.scrollHeight > innerHeight,
        horizontal: document.documentElement.scrollWidth > innerWidth + 1,
        gutter: innerWidth - document.documentElement.clientWidth,
      }));
      expect(overflow).toEqual({ vertical: true, horizontal: false, gutter: 0 });
      await page.keyboard.press('PageDown');
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
      await page.evaluate(() => scrollTo(0, 0));
      await page.mouse.move(360, 620);
      await page.mouse.wheel(0, 180);
      await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
      const scrollables = await page.locator('body *').evaluateAll(elements => elements.filter(element => {
        const style = getComputedStyle(element);
        return element.checkVisibility() && (/auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight
          || /auto|scroll/.test(style.overflowX) && element.scrollWidth > element.clientWidth);
      }).map(element => ({
        tag: element.tagName, className: element.className,
        scrollbarWidth: getComputedStyle(element).getPropertyValue('scrollbar-width'),
        webkitDisplay: getComputedStyle(element, '::-webkit-scrollbar').display,
      })));
      expect(scrollables.every(element => element.scrollbarWidth === 'none' && element.webkitDisplay === 'none')).toBe(true);
      await testInfo.attach('native-scroll-observations', { body: JSON.stringify({ overflow, scrollables }), contentType: 'application/json' });
    });
  }

  test(`${locale} · longer excerpt labels fit desktop navigation in both themes`, async ({ page }, testInfo) => {
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    const observations = [];
    for (const theme of ['dark', 'light']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('.theme-btn').click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      for (const width of [1181, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const issues = await page.locator('.nav-inner').evaluate(nav => {
          const bounds = nav.getBoundingClientRect();
          const controls = Array.from(nav.querySelectorAll('a, button')).filter(element => element.checkVisibility());
          return {
            pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
            outsideNav: controls.filter(element => {
              const rect = element.getBoundingClientRect();
              return rect.left < bounds.left - 1 || rect.right > bounds.right + 1;
            }).map(element => element.textContent),
            smallTargets: controls.filter(element => {
              const rect = element.getBoundingClientRect();
              return rect.width < 43.9 || rect.height < 43.9;
            }).map(element => element.textContent),
          };
        });
        expect(issues).toEqual({ pageOverflow: false, outsideNav: [], smallTargets: [] });
        observations.push({ theme, width, ...issues });
      }
    }
    await testInfo.attach('navigation-widths', { body: JSON.stringify(observations), contentType: 'application/json' });
  });

  test(`${locale} · desktop contents collapse, regain space and reopen with native semantics`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(articlePath(locale));
    const details = page.locator('.notion-toc-disclosure');
    const toggle = details.locator('summary');
    const panel = page.locator('#desktop-article-toc');
    const collapseLabel = locale === 'fr' ? 'Replier le sommaire' : 'Collapse contents';
    const expandLabel = locale === 'fr' ? 'Afficher le sommaire' : 'Show contents';
    await assertNativeDisclosure(page, toggle, collapseLabel, true);
    const initialWidth = (await page.locator('.notion-doc').boundingBox())!.width;
    await toggle.focus();
    await page.keyboard.press('Space');
    await expect(details).toHaveJSProperty('open', false);
    await expect(panel).toBeHidden();
    await assertNativeDisclosure(page, toggle, expandLabel, false);
    await expect(toggle).toBeFocused();
    expect((await page.locator('.notion-doc').boundingBox())!.width).toBeGreaterThan(initialWidth + 150);
    // React's reading-progress updates must not reopen a natively closed panel.
    await page.evaluate(() => scrollTo(0, 350));
    await expect(details).toHaveJSProperty('open', false);
    await page.keyboard.press('Tab');
    expect(await details.evaluate(element => element.contains(document.activeElement))).toBe(false);
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveJSProperty('open', true);
    await assertScrollableWithKeyboardAndWheel(page, panel, 'y');
    await page.keyboard.press('Escape');
    await expect(details).toHaveJSProperty('open', false);
    await expect(toggle).toBeFocused();
    await page.screenshot({ path: `reports/interface-refinements/sidebar-${locale}-collapsed.png` });
    const closedAxe = await new AxeBuilder({ page }).include('.notion-toc-rail').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(closedAxe.violations).toEqual([]);
    await toggle.click();
    await assertNativeDisclosure(page, toggle, collapseLabel, true);
    await page.screenshot({ path: `reports/interface-refinements/sidebar-${locale}-expanded.png` });
    const openAxe = await new AxeBuilder({ page }).include('.notion-toc-rail').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(openAxe.violations).toEqual([]);
    await testInfo.attach('axe-desktop-contents', { body: JSON.stringify({ closed: { violations: closedAxe.violations, incomplete: closedAxe.incomplete }, open: { violations: openAxe.violations, incomplete: openAxe.incomplete } }), contentType: 'application/json' });
    await panel.locator('a[href="#article-sources"]').click();
    await expect(page.locator('#article-sources-heading')).toBeFocused();
    await expect(panel.locator('a[href="#article-sources"]')).toHaveAttribute('aria-current', 'location');
    await page.emulateMedia({ forcedColors: 'active' });
    await toggle.focus();
    await page.keyboard.press('Space');
    await expect(toggle).toHaveCSS('outline-style', 'solid');
    expect(parseFloat(await toggle.evaluate(element => getComputedStyle(element).outlineWidth))).toBeGreaterThanOrEqual(2);
    await page.keyboard.press('Enter');
    await expect(details).toHaveJSProperty('open', true);
  });

  test(`${locale} · bounded mobile contents scroll, close on Escape/link and retain focus`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto(articlePath(locale));
    const details = page.locator('.notion-mobile-toc');
    const toggle = details.locator('summary');
    const panel = page.locator('#mobile-article-toc');
    await assertNativeDisclosure(page, toggle, locale === 'fr' ? 'Dans cet article' : 'In this article', false);
    await toggle.focus();
    await page.keyboard.press('Enter');
    await assertNativeDisclosure(page, toggle, locale === 'fr' ? 'Dans cet article' : 'In this article', true);
    expect((await panel.boundingBox())!.height).toBeLessThanOrEqual(332);
    await assertScrollableWithKeyboardAndWheel(page, panel, 'y');
    await page.keyboard.press('Escape');
    await expect(details).toHaveJSProperty('open', false);
    await expect(toggle).toBeFocused();
    await toggle.click();
    const axe = await new AxeBuilder({ page }).include('.notion-mobile-toc').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(axe.violations).toEqual([]);
    await testInfo.attach('axe-mobile-contents', { body: JSON.stringify({ violations: axe.violations, incomplete: axe.incomplete }), contentType: 'application/json' });
    await page.screenshot({ path: `reports/interface-refinements/sidebar-${locale}-mobile.png` });
    await panel.locator('a[href="#article-sources"]').click();
    await expect(details).toHaveJSProperty('open', false);
    await expect(page.locator('#article-sources-heading')).toBeFocused();
    await expect(page).toHaveURL(/#article-sources$/);
    const headingTop = (await page.locator('#article-sources-heading').boundingBox())!.y;
    const toggleBox = (await toggle.boundingBox())!;
    expect(headingTop).toBeGreaterThanOrEqual(toggleBox.y + toggleBox.height);
    await toggle.click();
    await expect(panel).toBeVisible();
    expect((await page.locator('#article-sources-heading').boundingBox())!.y).toBe(headingTop);
    await expect(panel.locator('a[href="#article-sources"]')).toHaveAttribute('aria-current', 'location');
  });

  test(`${locale} · touch gesture still scrolls the mobile contents without a visible bar`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 480 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(articlePath(locale));
      // Begin with the sticky toolbar at the top, as after reading the header.
      await page.evaluate(() => scrollTo(0, 400));
      const details = page.locator('.notion-mobile-toc');
      await details.locator('summary').tap();
      const panel = page.locator('#mobile-article-toc');
      await expect(panel).toBeVisible();
      expect(await scrollbarChrome(panel)).toEqual({ standard: 'none', webkit: 'none' });
      const bounds = (await panel.boundingBox())!;
      const x = bounds.x + bounds.width / 2;
      expect(await panel.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
      const y = Math.min(450, bounds.y + bounds.height - 30);
      const cdp = await context.newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (const offset of [30, 60, 100, 140, 180]) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - offset }] });
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await expect.poll(() => panel.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
      await details.locator('summary').tap();
      await expect(details).toHaveJSProperty('open', false);
      await details.locator('summary').tap();
      await expect(panel).toBeVisible();
    } finally { await context.close(); }
  });

  test(`${locale} · every preview has the requested native hover title and accessible dialog action`, async ({ page }) => {
    await page.goto(`/${locale}`);
    const label = locale === 'fr' ? 'Extrait du livre' : 'Book excerpt';
    const previews = page.locator('.hero-stack .page-frame, .shot-card');
    await expect(previews).toHaveCount(12);
    for (const preview of await previews.all()) {
      await expect(preview).toHaveAttribute('title', label);
      await expect(preview).toHaveAttribute('aria-label', new RegExp(label));
      await expect(preview).toHaveAttribute('aria-haspopup', 'dialog');
    }
    await previews.first().hover();
    await previews.first().focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await assertScrollableWithKeyboardAndWheel(page, page.locator('.lightbox-body'), 'y');
    await page.keyboard.press('Escape');
    await expect(previews.first()).toBeFocused();
    await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
    await page.locator('.shot-card').first().hover();
    await page.locator('.shot-card').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.shot-card').first()).toBeFocused();
    expect((await page.locator('.hero, #inside, #buy').allTextContents()).join('\n')).not.toMatch(/pages? réelles?|paiement sécurisé|secure Gumroad checkout|instant download/iu);
  });

  test(`${locale} · code and comparison tables retain horizontal keyboard/wheel scrolling`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(`/${locale}/articles/ui-design-system-tokens`);
    await assertScrollableWithKeyboardAndWheel(page, page.locator('.notion-copybox pre').first(), 'x');
    await assertScrollableWithKeyboardAndWheel(page, page.locator('.notion-table-wrap').first(), 'x');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });

  test(`${locale} · desktop and mobile contents collapse/reopen and links navigate without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      for (const width of [1280, 320]) {
        await page.setViewportSize({ width, height: 700 });
        await page.goto(articlePath(locale));
        const details = page.locator(width === 1280 ? '.notion-toc-disclosure' : '.notion-mobile-toc');
        const toggle = details.locator('summary');
        const panel = page.locator(width === 1280 ? '#desktop-article-toc' : '#mobile-article-toc');
        await toggle.focus();
        if (width === 1280) {
          await page.keyboard.press('Space');
          await expect(panel).toBeHidden();
        }
        await page.keyboard.press('Enter');
        await expect(panel).toBeVisible();
        await panel.locator('a[href="#article-sources"]').click();
        await expect(page).toHaveURL(/#article-sources$/);
        await expect(page.locator('#article-sources-heading')).toBeVisible();
        await toggle.focus();
        await page.keyboard.press('Space');
        await expect(panel).toBeHidden();
        await page.keyboard.press('Enter');
        await expect(panel).toBeVisible();
      }
      await page.goto(`/${locale}`);
      for (const preview of await page.locator('.hero-stack .page-frame, .shot-card').all()) {
        await expect(preview).toHaveAttribute('title', locale === 'fr' ? 'Extrait du livre' : 'Book excerpt');
      }
    } finally { await context.close(); }
  });
}
