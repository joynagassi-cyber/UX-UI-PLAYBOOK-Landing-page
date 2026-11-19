import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = ['ux-design-guide', 'ui-design-system-tokens', 'product-design-ai-agents'];
// Previously removed phrases only: editorial review remains necessary.
const removedSlogans = /plus qu[’']un ebook|more than an ebook|execution system|tenir debout|tient debout|make it hold|high.leverage checkout|règle d[’']or de l[’']ingénierie|core law of agentic|attention tax|taxe d[’']attention|calm rigour|cheapest anxiety reducer|réduction d[’']anxiété la moins chère|scope.survival|phrases de survie|the 5 exact moments|5 moments exacts/iu;
const routes = ['fr', 'en'].flatMap((locale) => [
  `/${locale}`,
  `/${locale}/articles`,
  ...slugs.map((slug) => `/${locale}/articles/${slug}`),
]);
const store = (locale: string) => locale === 'fr'
  ? 'https://joyccelight.gumroad.com/l/uiuxplaybookfr'
  : 'https://joyccelight.gumroad.com/l/uxuiplaybook';

async function revealAndLoad(page: Page) {
  // Exercise scroll-triggered content rather than excluding it from axe.
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let top = 0; top < document.documentElement.scrollHeight; top += 650) {
      window.scrollTo(0, top);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
    window.scrollTo(0, 0);
  });
  await expect(page.locator('.notion-reveal:not(.is-visible)')).toHaveCount(0);
}

async function layoutIssues(page: Page) {
  return page.evaluate(() => {
    const visible = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden'
        && element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    };
    const textIssues: string[] = [];
    const fontIssues: string[] = [];
    const symbolIssues: string[] = [];
    const primaryFamily = (value: string) => value.split(',')[0].trim().replace(/["']/g, '');
    const domine = primaryFamily(getComputedStyle(document.documentElement).getPropertyValue('--font-domine'));
    if (!domine || !document.fonts.check(`400 16px "${domine}"`, 'Écran français & English')
      || !document.fonts.check(`700 16px "${domine}"`, 'Écran français & English')) fontIssues.push('Domine regular/bold not loaded');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || !node.textContent?.trim() || parent.closest('script, style, svg, .sr-skip') || !visible(parent)) continue;
      const style = getComputedStyle(parent);
      const fontSize = parseFloat(style.fontSize);
      if (primaryFamily(style.fontFamily) !== domine) fontIssues.push(`${parent.tagName}.${parent.className}: ${style.fontFamily}`);
      if (parseFloat(style.fontWeight) > 700) fontIssues.push(`${parent.className}: unsupported weight ${style.fontWeight}`);
      // ©, ® and ™ in ordinary prose are not emoji; presentation selectors are.
      if (/\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F|[✓✔✕✖▲↗]/u.test(node.textContent)) symbolIssues.push(node.textContent.trim().slice(0, 100));
      if (fontSize < 12) textIssues.push(`${parent.className}: ${fontSize}px: ${node.textContent.trim().slice(0, 70)}`);
    }
    const targets = Array.from(document.querySelectorAll('a, button, summary, [role="button"]'))
      .filter((element) => !element.matches('.sr-skip') && visible(element))
      // WCAG's inline exception: this site's standalone controls still use 44px.
      .filter((element) => !(element.tagName === 'A' && getComputedStyle(element).display === 'inline' && element.closest('p')))
      .flatMap((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width < 43.9 || rect.height < 43.9
          ? [`${element.tagName}.${element.className} ${rect.width.toFixed(1)}×${rect.height.toFixed(1)} ${element.textContent?.trim().slice(0, 65)}`]
          : [];
      });
    return {
      pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      textIssues,
      fontIssues,
      symbolIssues,
      iconIssues: Array.from(document.querySelectorAll('body svg')).filter(visible).flatMap((icon) => {
        const rect = icon.getBoundingClientRect();
        return !icon.matches('.site-icon[data-icon]') || rect.width < 20 || rect.height < 20
          || parseFloat(getComputedStyle(icon).strokeWidth) !== 3 || icon.getAttribute('aria-hidden') !== 'true'
          || icon.getAttribute('focusable') !== 'false'
          ? [`${icon.getAttribute('data-icon')}: ${rect.width}×${rect.height}, stroke=${getComputedStyle(icon).strokeWidth}`] : [];
      }),
      targets,
      numericIssues: Array.from(document.querySelectorAll('.offer-amount, .strip-num, .term-score-val, .notion-stat-val, time, table'))
        .filter((element) => visible(element) && !getComputedStyle(element).fontVariantNumeric.includes('tabular-nums'))
        .map((element) => element.className || element.tagName)
        .concat(Array.from(document.querySelectorAll('.tabular-digit')).filter(visible)
          .filter((element) => Math.abs(element.getBoundingClientRect().width - parseFloat(getComputedStyle(element).fontSize) * 0.7) > 0.15)
          .map((element) => `Digit cell has unequal advance: ${element.textContent}`)),
      clippedControls: Array.from(document.querySelectorAll('a, button, summary'))
        .filter((element) => visible(element) && !element.matches('.sr-skip'))
        .filter((element) => { const rect = element.getBoundingClientRect(); return rect.left < -1 || rect.right > innerWidth + 1; })
        .map((element) => `${element.className}: ${element.textContent?.trim().slice(0, 60)}`),
      badImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    };
  });
}

for (const route of routes) {
  for (const theme of ['dark', 'light'] as const) {
    test(`${route} · ${theme} · responsive + axe`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      const externalRequests: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => {
        if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(testInfo.project.use.baseURL as string).origin) externalRequests.push(request.url());
      });
      await page.addInitScript((value) => localStorage.setItem('playbook-theme', value), theme);
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await revealAndLoad(page);
      await expect(page.locator('main')).not.toContainText(removedSlogans);
      const categoryIcons = await page.locator('.guide-cat-pill svg').evaluateAll((icons) => icons.map((icon) => icon.getAttribute('data-icon')));
      expect(categoryIcons.length).toBeGreaterThan(0);
      expect(categoryIcons.every((name) => ['compass', 'palette', 'settings'].includes(name!))).toBe(true);
      expect((await page.locator('.guide-cat-pill').allTextContents()).every((text) => !/compass|palette|settings/.test(text))).toBe(true);
      for (const width of [1280, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        const issues = await layoutIssues(page);
        expect(issues, `${route} ${theme} @${width}px`).toEqual({ pageOverflow: false, textIssues: [], fontIssues: [], symbolIssues: [], iconIssues: [], targets: [], numericIssues: [], clippedControls: [], badImages: [] });
        if (width === 1280 || width === 320) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
          await testInfo.attach(`axe-${width}`, {
            body: JSON.stringify({ status: 'automated', severity: 'blocking', outcome: axe.violations.length ? 'fail' : 'pass', route, theme, width, violations: axe.violations, incomplete: axe.incomplete }, null, 2),
            contentType: 'application/json',
          });
          expect(axe.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => ({ target: node.target, issue: node.failureSummary })) }))).toEqual([]);
        }
      }
      expect(errors, 'No browser runtime or hydration exceptions').toEqual([]);
      expect(externalRequests, 'All page fonts and images are self-hosted').toEqual([]);
    });
  }
}

for (const locale of ['fr', 'en']) {
  test(`${locale} · existing system theme and saved choice`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(`/${locale}`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('.theme-btn').click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test(`${locale} · theme, locale edition, demo and gallery keyboard`, async ({ page }) => {
    // Keep the existing system-theme behaviour deterministic in this scenario.
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(`/${locale}`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
    await page.locator('.theme-btn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 248, 244)');

    await page.locator('.seg-tab').nth(1).click();
    await expect(page.locator('.seg-tab').nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.term-outcome')).toContainText('EXIT 0');
    await expect(page.locator('.term-score-val')).toHaveText(['9', '6', '62']);
    const cleanAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(cleanAxe.violations).toEqual([]);
    await page.locator('.seg-tab').first().click();
    await expect(page.locator('.term-outcome')).toContainText('EXIT 1');
    await page.setViewportSize({ width: 320, height: 900 });
    const opener = page.locator('.shot-card').first();
    await opener.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('[data-modal-close]')).toBeFocused();
    expect(await layoutIssues(page)).toEqual({ pageOverflow: false, textIssues: [], fontIssues: [], symbolIssues: [], iconIssues: [], targets: [], numericIssues: [], clippedControls: [], badImages: [] });
    const modalAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(modalAxe.violations).toEqual([]);
    await page.keyboard.press('ArrowRight');
    await expect(dialog.locator('.lightbox-top')).toContainText('2 / 10');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();

    await page.locator('.filter-pills button').nth(1).click();
    await expect(page.locator('.filter-pills button').nth(1)).toHaveAttribute('aria-pressed', 'true');
    await page.locator('.explorer-tabs button').first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.explorer-tabs button').nth(1)).toBeFocused();
    await expect(page.locator('.explorer-tabs button').nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#contents-panel-kit')).toBeVisible();
    await expect(page.locator('.kit-card')).toHaveCount(12);
    await page.keyboard.press('End');
    await expect(page.locator('.explorer-tabs button').nth(2)).toBeFocused();
    await expect(page.locator('#contents-panel-archive')).toBeVisible();
    // The UI lists three representative groups, not all 21 archive files.
    await expect(page.locator('.archive-card')).toHaveCount(3);
    await expect(page.locator('#contents-panel-archive')).toContainText('21');
    await expect(page.locator('.archive-files')).toContainText(['agent_check.py', 'tokens.css', 'handoff-spec.md']);

    const otherLocale = locale === 'fr' ? 'en' : 'fr';
    await page.locator(`.lang-btn[lang="${otherLocale}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${otherLocale}$`));
    const hrefs = await page.locator('a[href*="gumroad.com/l/"]').evaluateAll((anchors) => anchors.map((anchor) => (anchor as HTMLAnchorElement).href));
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.every((href) => href.split('?')[0] === store(otherLocale))).toBe(true);
  });

  test(`${locale} · article TOC, copy, modal and contextual CTA`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.goto(`/${locale}/articles/ui-design-system-tokens`);
    await revealAndLoad(page);
    const copy = page.locator('.notion-copy-btn').first();
    await copy.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain('--color-warning');
    const figure = page.locator('.notion-figure button').first();
    for (const theme of ['dark', 'light']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('.theme-btn').click();
      for (const width of [1280, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await figure.click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.locator('img')).toHaveCount(0);
        await expect(page.locator('[data-modal-close]')).toBeFocused();
        for (let i = 0; i < 4; i++) {
          await page.keyboard.press('Tab');
          expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
        }
        expect(await layoutIssues(page)).toEqual({ pageOverflow: false, textIssues: [], fontIssues: [], symbolIssues: [], iconIssues: [], targets: [], numericIssues: [], clippedControls: [], badImages: [] });
        const modalAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        expect(modalAxe.violations).toEqual([]);
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(figure).toBeFocused();
      }
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.locator('.notion-toc-rail a[href="#article-sources"]').click();
    await expect(page).toHaveURL(/#article-sources$/);
    await expect(page.locator('.notion-toc-rail a[href="#article-sources"]')).toHaveAttribute('aria-current', 'location');
    const cta = page.locator('.notion-inline-cta a');
    await expect(cta).toHaveAttribute('href', new RegExp(store(locale)));
    await page.setViewportSize({ width: 320, height: 900 });
    await page.locator('.notion-mobile-toc-btn').click();
    await page.locator('.notion-mobile-toc a[href="#article-sources"]').click();
    await expect(page.locator('.notion-mobile-toc-btn')).toHaveAttribute('aria-expanded', 'false');
  });
}

for (const locale of ['fr', 'en']) {
  for (const [index, slug] of slugs.entries()) {
    test(`${locale} · ${slug} · illustrated explanations and editorial copy`, async ({ page }) => {
      await page.goto(`/${locale}/articles/${slug}`);
      await revealAndLoad(page);
      await expect(page.locator('.notion-explainer')).toHaveCount([19, 14, 13][index]);
      await expect(page.locator('.notion-explainer figure[data-explainer-visual]')).toHaveCount([19, 14, 13][index]);
      const prose = await page.locator('.notion-explainer').evaluateAll((explanations) => explanations.map((explanation) =>
        Array.from(explanation.querySelectorAll('.notion-p')).map((paragraph) => (paragraph.textContent ?? '').trim().split(/\s+/u).length)
      ));
      // Protect the requested long-form explanations without a paragraph-length ceiling.
      expect(prose.every((paragraphs) => paragraphs.some((words) => words >= 100))).toBe(true);
      expect(prose.flat().reduce((total, words) => total + words, 0)).toBeGreaterThanOrEqual([19, 14, 13][index] * 125);
      await expect(page.locator('main')).not.toContainText(removedSlogans);
      await expect(page.locator('figure[data-summary-diagram]')).toHaveCount(2);
      await expect(page.locator('.notion-doc img')).toHaveCount(0);
      await expect(page.locator('.notion-refs-badge, .notion-verified-pill, .footer-lic, .footer-rule-badge')).toHaveCount(0);
      await expect(page.locator('#article-sources-heading')).toHaveText(locale === 'fr' ? 'Sources et références' : 'Sources and references');
      await expect(page.locator('.notion-breadcrumbs a').nth(1)).toHaveText('Articles');
      await expect(page.locator('main')).not.toContainText(/niveaux? de preuve|evidence levels|(?<!\p{L})(?:Établi|Established|Probable)(?!\p{L})|dossiers? de terrain|field courses/iu);
      await expect(page.locator('footer')).not.toContainText(/commercial use|usage commercial|revente|resale|redistribution|\bTVA\b|\bVAT\b|rejouables|reproducible site checks|automated measurements/i);
      for (const width of [1280, 1024, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        const pairIssues = await page.locator('.notion-explainer').evaluateAll((explanations) => explanations.flatMap((explanation, explanationIndex) => {
          const copy = explanation.querySelector('.notion-explainer-copy')!.getBoundingClientRect();
          const visual = explanation.querySelector('figure')!.getBoundingClientRect();
          const adjacent = innerWidth > 760;
          const geometryOK = adjacent
            ? visual.left >= copy.right + 15 && Math.abs(visual.top - copy.top) <= 1
            : visual.top >= copy.bottom + 10 && Math.abs(visual.left - copy.left) <= 1;
          const empty = !explanation.querySelector('figcaption')?.textContent?.trim();
          const clipped = Array.from(explanation.querySelectorAll('.article-visual *')).some((element) => {
            const box = element.getBoundingClientRect();
            return box.width > 0 && (box.left < visual.left - 1 || box.right > visual.right + 1);
          });
          return geometryOK && !empty && !clipped ? [] : [{ explanationIndex, adjacent, geometryOK, empty, clipped }];
        }));
        expect(pairIssues, `Text/visual pairing at ${width}px`).toEqual([]);
      }
    });
  }
}
