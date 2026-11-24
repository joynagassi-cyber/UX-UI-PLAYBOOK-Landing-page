import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../src/i18n/article-catalog.json';
import { SITE_URL } from '../src/lib/site-config';

const suffixes = ['', '/articles', ...Object.keys(catalog).map(slug => `/articles/${slug}`)];

for (const locale of ['fr', 'en']) {
  for (const suffix of suffixes) {
    const route = `/${locale}${suffix}`;
    test(`${route} · substantive content without JavaScript`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
      try {
        const page = await context.newPage();
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('[hidden][id^="S:"]')).toHaveCount(0);
        expect((await page.locator('main').innerText()).length).toBeGreaterThan(500);
        if (suffix.startsWith('/articles/')) {
          // Every section, not just the FAQ: streaming a body into hidden SSR
          // slots would otherwise need JavaScript to reveal editorial content.
          for (const section of await page.locator('.notion-section').all()) {
            await expect(section).toBeVisible();
            await expect(section).toHaveCSS('opacity', '1');
          }
          await expect(page.locator('.notion-entity-def')).toBeVisible();
          await expect(page.locator('.notion-refs')).toBeVisible();
        } else if (suffix === '') {
          for (const selector of ['#tool', '#inside', '#contents']) await expect(page.locator(selector)).toBeVisible();
        }
        await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', SITE_URL + route);
      } finally { await context.close(); }
    });
  }

  for (const theme of ['dark', 'light']) {
    test(`${locale} · ${theme} · keyboard skip/focus across all six pages`, async ({ page }, testInfo) => {
      const observations = [];
      await page.setViewportSize({ width: 320, height: 800 });
      await page.addInitScript(value => localStorage.setItem('playbook-theme', value), theme);
      for (const suffix of suffixes) {
        await page.goto(`/${locale}${suffix}`);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await page.keyboard.press('Tab');
        const skip = page.locator('.sr-skip');
        await expect(skip).toBeFocused();
        await expect(skip).toBeVisible();
        await page.keyboard.press('Enter');
        await expect(page.locator('main')).toBeFocused();
        await page.keyboard.press('Tab');
        const state = await page.evaluate(() => {
          const element = document.activeElement as HTMLElement;
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const x = Math.min(innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
          const y = Math.min(innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
          const hit = document.elementFromPoint(x, y);
          return {
            tag: element.tagName, name: element.getAttribute('aria-label') || element.textContent?.trim().slice(0, 100),
            focusVisible: element.matches(':focus-visible'), outlineWidth: parseFloat(style.outlineWidth), outlineStyle: style.outlineStyle,
            inViewport: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
            centerUnobscured: !!hit && (element === hit || element.contains(hit)),
          };
        });
        observations.push({ route: `/${locale}${suffix}`, theme, width: 320, ...state });
        expect(state.tag).not.toBe('BODY');
        expect(state.name).toBeTruthy();
        expect(state.focusVisible).toBe(true);
        expect(state.outlineWidth).toBeGreaterThanOrEqual(2);
        expect(state.outlineStyle).not.toBe('none');
        expect(state.inViewport).toBe(true);
        expect(state.centerUnobscured).toBe(true);
      }
      await testInfo.attach('keyboard-focus-observations', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
    });
  }

  test(`${locale} · clean canonical, safe attribution and host-only preference cookie`, async ({ page, context }) => {
    await page.goto(`/${locale}?utm_source=technical&utm_campaign=release&a=1&a=2&secret_probe=not_forwarded#buy`);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE_URL}/${locale}`);
    await expect.poll(() => page.locator('a[href*="gumroad.com/l/"]').first().getAttribute('href')).toContain('utm_source=technical');
    const links = await page.locator('a[href*="gumroad.com/l/"]').evaluateAll(anchors => anchors.map(a => (a as HTMLAnchorElement).href));
    for (const href of links) {
      const url = new URL(href);
      expect(url.searchParams.get('utm_source')).toBe('technical');
      expect(url.searchParams.get('utm_campaign')).toBe('release');
      expect(url.searchParams.has('secret_probe')).toBe(false);
      expect(url.searchParams.has('a')).toBe(false);
    }
    const other = locale === 'fr' ? 'en' : 'fr';
    await page.locator('.lang-menu-btn').click();
    await page.locator(`.lang-menu-panel a[lang=${other}]`).click();
    const cookie = (await context.cookies()).find(c => c.name === 'NEXT_LOCALE');
    expect(cookie?.value).toBe(other);
    expect(cookie?.path).toBe('/');
    expect(cookie?.sameSite).toBe('Lax');
    expect(cookie?.secure).toBe(new URL(page.url()).protocol === 'https:');
    expect(cookie?.domain.startsWith('.')).toBe(false);
  });

  test(`${locale} · forced colors, named controls and no submitted form`, async ({ page }, testInfo) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto(`/${locale}/articles/ux-design-guide`);
    await expect(page.locator('form, input, select, textarea')).toHaveCount(0);
    const disclosure = page.locator('#article-faq details').last();
    const summary = disclosure.locator('summary');
    await expect(disclosure).not.toHaveAttribute('open', '');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(disclosure).toHaveAttribute('open', '');
    await expect(summary).toHaveCSS('outline-style', 'solid');
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach('axe-forced-colors', { body: JSON.stringify({ violations: result.violations, incomplete: result.incomplete }, null, 2), contentType: 'application/json' });
    expect(result.violations).toEqual([]);
  });
}

for (const locale of ['fr', 'en']) {
  test(`${locale} · reduced motion removes transitions instead of generating near-zero-duration events`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      const state = { transitions: 0, animations: 0 };
      (window as typeof window & { motionEvents: typeof state }).motionEvents = state;
      document.addEventListener('transitionrun', () => { state.transitions++; }, true);
      document.addEventListener('animationstart', () => { state.animations++; }, true);
    });
    await page.goto(`/${locale}/articles/ui-design-system-tokens`, { waitUntil: 'networkidle' });
    const before = await page.locator('html').getAttribute('data-theme');
    await page.locator('.theme-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', before === 'dark' ? 'light' : 'dark');
    await page.locator('.theme-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', before!);
    // Observe complete rendering frames rather than counting only synchronous events.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const observation = await page.evaluate(() => ({
      ...(window as typeof window & { motionEvents: { transitions: number; animations: number } }).motionEvents,
      bodyTransitionDuration: getComputedStyle(document.body).transitionDuration,
      bodyAnimation: getComputedStyle(document.body).animationName,
    }));
    await testInfo.attach('reduced-motion-theme-events', { body: JSON.stringify(observation, null, 2), contentType: 'application/json' });
    expect(observation).toEqual({ transitions: 0, animations: 0, bodyTransitionDuration: '0s', bodyAnimation: 'none' });
  });
}

test('static 404 · HTTP error, noindex, bilingual recovery, keyboard and axe', async ({ page }, testInfo) => {
  const response = await page.goto('/fr/articles/unknown-guide?utm_source=technical');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name=robots]').last()).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel=canonical], link[hreflang]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'English edition' })).toHaveAttribute('href', '/en');
  await expect(page.getByRole('link', { name: 'Édition française' })).toHaveAttribute('href', '/fr');
  await page.keyboard.press('Tab');
  await expect(page.locator('.sr-skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const width of [1280, 320]) {
    await page.setViewportSize({ width, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`axe-404-${width}`, { body: JSON.stringify({ violations: result.violations, incomplete: result.incomplete }, null, 2), contentType: 'application/json' });
    expect(result.violations).toEqual([]);
  }
});
