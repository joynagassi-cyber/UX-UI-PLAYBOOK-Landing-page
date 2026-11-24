import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalogue from '../src/i18n/article-catalog.json';
import { DESIGN_LAB } from '../src/i18n/design-lab';

const slugs = Object.keys(catalogue) as Array<keyof typeof catalogue>;
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
        if (icon.hasAttribute('data-vector-illustration')) {
          return !icon.matches('.design-vector[viewBox]') || !['discipline-map', 'decision-loop', 'bicycle'].includes(icon.getAttribute('data-vector-illustration')!)
            || rect.width < 20 || rect.height < 20 || parseFloat(getComputedStyle(icon).strokeWidth) !== 3
            || icon.getAttribute('aria-hidden') !== 'true' || icon.getAttribute('focusable') !== 'false'
            ? [`Invalid original vector: ${icon.getAttribute('data-vector-illustration')}, ${rect.width}×${rect.height}`] : [];
        }
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
          .map((element) => `Digit cell has unequal advance: ${element.textContent}`))
        .concat(Array.from(document.querySelectorAll('.tabular-run')).filter(visible)
          // Flex items are legitimately blockified in computed CSS. Inspect the actual digit row.
          .filter((element) => {
            const digits = Array.from(element.querySelectorAll('.tabular-digit')).map((digit) => digit.getBoundingClientRect());
            return digits.some((digit, index) => Math.abs(digit.top - digits[0].top) > 1 || (index > 0 && digit.left <= digits[index - 1].left));
          })
          .map((element) => `Numeric run stacks or overlaps its digits: ${element.textContent}`)),
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
  test(`${locale} · book facts and glossary without a release announcement`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator('#edition-2026')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/ce qui est nouveau|what is new in this edition|édition française augmentée|expanded english edition/iu);
    expect(await page.locator('#contents').evaluate(element => element.nextElementSibling?.id)).toBe('guides');
    await expect(page.locator('.toc-summary')).toHaveCount(9);
    await page.locator('.toc-summary').nth(7).click();
    await expect(page.locator('.toc-item').nth(7)).toContainText('56');
    await expect(page.locator('.toc-item').nth(7)).toContainText(locale === 'fr' ? 'p. 124' : 'p. 113');
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const graph = schemas.flatMap(value => JSON.parse(value)['@graph'] || []);
    const book = graph.find(item => item['@type'] === 'Book');
    expect(book.numberOfPages).toBe(locale === 'fr' ? 182 : 171);
    expect(book.bookEdition).toBe(locale === 'fr' ? 'Édition française' : 'English edition');
    expect(book.dateModified).toBeUndefined();
    await page.locator('.shot-card').filter({ hasText: locale === 'fr' ? 'Nommer les composants web' : 'Naming web components' }).click();
    await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', `/images/${locale}/component-lexicon.webp`);
    await page.keyboard.press('Escape');
  });

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
    await expect(page.locator('.term-score-val')).toHaveText(['8', '49', '20']);
    const cleanAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(cleanAxe.violations).toEqual([]);
    await page.locator('.seg-tab').first().click();
    await expect(page.locator('.term-outcome')).toContainText('EXIT 1');
    await expect(page.locator('.term-score-val')).toHaveText(['9', '48', '20']);
    await page.setViewportSize({ width: 320, height: 900 });
    const opener = page.locator('.shot-card').first();
    await opener.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('[data-modal-close]')).toBeFocused();
    expect(await page.locator('.site-nav').evaluate(element => !!element.closest('[inert]'))).toBe(true);
    expect(await dialog.evaluate(element => !!element.closest('[inert]'))).toBe(false);
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
    expect(await page.locator('.site-nav').evaluate(element => !!element.closest('[inert]'))).toBe(false);

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
    // The four folders represent the 21 localized files, including nested copies.
    await expect(page.locator('.archive-card')).toHaveCount(4);
    await expect(page.locator('#contents-panel-archive')).toContainText('21');
    await expect(page.locator('.archive-files')).toContainText([
      'agent_check.py', 'SKILL.md', 'tokens.css',
      locale === 'fr' ? 'handoff-developpeur.md' : 'handoff-developer.md',
    ]);

    const otherLocale = locale === 'fr' ? 'en' : 'fr';
    await page.locator('.lang-menu-btn').click();
    await page.locator(`.lang-menu-panel a[lang="${otherLocale}"]`).click();
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
        expect(await page.locator('.site-nav').evaluate(element => !!element.closest('[inert]'))).toBe(true);
        expect(await dialog.evaluate(element => !!element.closest('[inert]'))).toBe(false);
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
        expect(await page.locator('.site-nav').evaluate(element => !!element.closest('[inert]'))).toBe(false);
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
    // Native details/summary exposes expanded state without duplicating ARIA.
    await expect(page.locator('.notion-mobile-toc')).toHaveJSProperty('open', false);
    await expect(page.locator('.notion-mobile-toc-btn')).toHaveAccessibleName(locale === 'fr' ? 'Dans cet article' : 'In this article');
  });
}

for (const locale of ['fr', 'en']) {
  for (const slug of slugs) {
    test(`${locale} · ${slug} · illustrated explanations and editorial copy`, async ({ page }) => {
      await page.goto(`/${locale}/articles/${slug}`);
      await revealAndLoad(page);
      await expect(page.locator('.notion-explainer')).toHaveCount(catalogue[slug].explanations);
      await expect(page.locator('.notion-explainer figure[data-explainer-visual]')).toHaveCount(catalogue[slug].explanations);
      const prose = await page.locator('.notion-explainer').evaluateAll((explanations) => explanations.map((explanation) =>
        Array.from(explanation.querySelectorAll('.notion-p')).map((paragraph) => (paragraph.textContent ?? '').trim().split(/\s+/u).length)
      ));
      // Protect the requested long-form explanations without a paragraph-length ceiling.
      expect(prose.every((paragraphs) => paragraphs.some((words) => words >= 100))).toBe(true);
      expect(prose.flat().reduce((total, words) => total + words, 0)).toBeGreaterThanOrEqual(catalogue[slug].explanations * 125);
      await expect(page.locator('main')).not.toContainText(removedSlogans);
      await expect(page.locator('figure[data-summary-diagram]')).toHaveCount(2);
      await expect(page.locator('.notion-doc img')).toHaveCount(0);
      await expect(page.locator('.notion-refs-badge, .notion-verified-pill, .footer-lic, .footer-rule-badge')).toHaveCount(0);
      await expect(page.locator('#article-sources-heading')).toHaveText(locale === 'fr' ? 'Sources et références' : 'Sources and references');
      await expect(page.locator('.notion-breadcrumbs a').nth(1)).toHaveText('Article');
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

for (const locale of ['fr', 'en'] as const) {
  for (const theme of ['dark', 'light'] as const) {
    test(`${locale} · ${theme} · Atelier mobile roles, booking and recovery`, async ({ page }, testInfo) => {
      const copy = DESIGN_LAB[locale];
      const errors: string[] = [];
      const writes: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`); });
      await page.addInitScript((value) => localStorage.setItem('playbook-theme', value), theme);
      await page.goto(`/${locale}/articles/ux-ui-product-design`);
      await revealAndLoad(page);
      const lab = page.locator('[data-mobile-lab]');
      const phone = lab.locator('.lab-phone');
      await expect(lab).toContainText(copy.example);
      await expect(lab.locator('input, form, iframe')).toHaveCount(0);
      await expect(lab.locator('.phone-primary')).toHaveText(copy.continue);

      // All nine annotations must remain available for the same simulated product.
      for (const stage of ['service', 'slot', 'review'] as const) {
        await lab.locator(`[data-screen-choice="${stage}"]`).click();
        await expect(lab.locator('h4.phone-title')).toBeFocused();
        for (const role of ['product', 'ux', 'ui'] as const) {
          await lab.locator(`[data-role-choice="${role}"]`).click();
          await expect(lab.locator(`[data-role-choice="${role}"]`)).toHaveAttribute('aria-pressed', 'true');
          await expect(lab.locator('.lab-annotation h4')).toHaveText(copy.annotations[stage][role].title);
          await expect(phone).toHaveAttribute('data-phone-screen', stage);
          await expect(phone).toHaveAttribute('data-selected-role', role);
        }
      }
      await expect(lab.locator('.phone-missing')).toHaveText(copy.missing);
      await expect(lab.getByRole('button', { name: copy.confirm, exact: true })).toHaveCount(0);
      await lab.locator('[data-reset-prototype]').click();
      await lab.locator('[data-role-choice="ux"]').focus();
      await page.keyboard.press('Enter');
      await expect(lab.locator('[data-role-choice="ux"]')).toHaveAttribute('aria-pressed', 'true');

      // A full simulated booking and the same selected time under another viewpoint.
      await lab.locator('.phone-primary').focus();
      await page.keyboard.press('Enter');
      await expect(lab.locator('h4.phone-title')).toBeFocused();
      await expect(lab.locator('.phone-primary')).toBeDisabled();
      const firstSlot = lab.locator('.phone-slot').filter({ hasText: '09:00' });
      await expect(firstSlot).toHaveAccessibleName('09:00');
      await firstSlot.focus();
      await page.keyboard.press('Space');
      await expect(firstSlot).toHaveAttribute('aria-pressed', 'true');
      await lab.locator('[data-role-choice="ui"]').click();
      await expect(firstSlot).toHaveAttribute('aria-pressed', 'true');
      await lab.locator('.phone-primary').click();
      await expect(phone).toHaveAttribute('data-phone-screen', 'review');
      await expect(lab.locator('.phone-review')).toContainText('09:00');
      await lab.getByRole('button', { name: copy.change, exact: true }).click();
      await expect(firstSlot).toHaveAttribute('aria-pressed', 'true');
      await lab.locator('.phone-primary').click();
      await lab.getByRole('button', { name: copy.confirm, exact: true }).click();
      await expect(phone).toHaveAttribute('data-prototype-outcome', 'simulated');
      await expect(lab.locator('.phone-confirmed')).toContainText(copy.noBooking);
      await expect(lab.locator('h4.phone-title')).toBeFocused();

      // Rejection is not confirmation: preserve the service, announce failure, select an alternative.
      await lab.locator('[data-reset-prototype]').click();
      await lab.locator('[data-simulate-conflict]').click();
      await expect(lab.locator('[data-simulate-conflict]')).toHaveAttribute('aria-pressed', 'true');
      await lab.locator('.phone-primary').click();
      await lab.getByRole('button', { name: '10:30', exact: true }).click();
      await lab.locator('.phone-primary').click();
      await expect(lab.locator('.phone-error')).toBeVisible();
      await expect(lab.locator('.phone-error')).toBeFocused();
      await expect(lab.locator('.phone-error')).toHaveAttribute('role', 'alert');
      await expect(lab.locator('.phone-error')).toContainText('10:30');
      await expect(lab.locator('.phone-compact-service')).toContainText(copy.service);
      await expect(lab.locator('.phone-slot').filter({ hasText: '10:30' })).toBeDisabled();
      await expect(lab.locator('.phone-primary')).toBeDisabled();
      await expect(phone).toHaveAttribute('data-prototype-outcome', 'none');
      for (const width of [1280, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        expect(await layoutIssues(page)).toEqual({ pageOverflow: false, textIssues: [], fontIssues: [], symbolIssues: [], iconIssues: [], targets: [], numericIssues: [], clippedControls: [], badImages: [] });
      }
      await testInfo.attach(`atelier-${locale}-${theme}-rejection-320`, { body: await lab.screenshot(), contentType: 'image/png' });
      const recoveryAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      await testInfo.attach('axe-atelier-rejection', { body: JSON.stringify({ violations: recoveryAxe.violations, incomplete: recoveryAxe.incomplete }, null, 2), contentType: 'application/json' });
      expect(recoveryAxe.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => ({ target: node.target, issue: node.failureSummary })) }))).toEqual([]);
      await lab.getByRole('button', { name: '11:15', exact: true }).click();
      await expect(lab.locator('.phone-error')).toHaveCount(0);
      await lab.locator('.phone-primary').click();
      await lab.getByRole('button', { name: copy.confirm, exact: true }).click();
      await expect(lab.locator('.phone-confirmed')).toContainText(copy.noBooking);
      await page.reload();
      await expect(phone).toHaveAttribute('data-phone-screen', 'service');
      await expect(phone).toHaveAttribute('data-prototype-outcome', 'none');
      expect(errors).toEqual([]);
      expect(writes, 'The demonstration does not send a booking or personal data').toEqual([]);
    });
  }

  test(`${locale} · UX checklist copy, FAQ and article locale navigation`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.goto(`/${locale}/articles/ux-design-guide`);
    await revealAndLoad(page);
    // The static audit checklist must remain copyable; it is not an automatic scanner.
    const checklist = page.locator('.notion-copybox').filter({ hasText: /checklist/i }).first();
    await expect(checklist).toBeVisible();
    await checklist.locator('.notion-copy-btn').click();
    const expected = await checklist.locator('code').innerText();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
    const faq = page.locator('#article-faq details').nth(1);
    await faq.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(faq).toHaveAttribute('open', '');
    const other = locale === 'fr' ? 'en' : 'fr';
    await page.goto(`/${locale}/articles/ux-ui-product-design`);
    await page.locator('.lang-menu-btn').click();
    await page.locator(`.lang-menu-panel a[lang="${other}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${other}/articles/ux-ui-product-design$`));
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    expect(await context.cookies()).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'NEXT_LOCALE', value: other })]));
  });
}

test('Worker · qvalues, cookies, country, query and static exclusions', async ({ request }) => {
  for (const route of ['/', '/articles', '/articles/', ...slugs.map((slug) => `/articles/${slug}`), '/articles/missing']) {
    for (const [headers, locale] of [
      [{ 'Accept-Language': 'fr;q=0.2,en;q=0.9', 'CF-IPCountry': 'BJ' }, 'en'],
      [{ Cookie: 'NEXT_LOCALE=fr', 'Accept-Language': 'en', 'CF-IPCountry': 'US' }, 'fr'],
      [{ 'CF-IPCountry': 'BJ' }, 'fr'],
    ] as const) {
      const response = await request.get(`${route}?source=browser&a=1&a=2`, { headers, maxRedirects: 0 });
      expect(response.status()).toBe(307);
      const location = new URL(response.headers().location);
      expect(location.pathname).toBe(`/${locale}${route === '/' ? '' : route.replace(/\/+$/, '')}`);
      expect(location.search).toBe('?source=browser&a=1&a=2');
      expect(response.headers()['cache-control']).toBe('private, no-store');
      expect(response.headers().vary.toLowerCase().split(',').map((value) => value.trim()).sort()).toEqual(['accept-language', 'cf-ipcountry', 'cookie']);
    }
  }
  for (const route of routes) {
    const response = await request.get(route, { headers: { Cookie: 'NEXT_LOCALE=fr', 'Accept-Language': 'fr' }, maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers().location).toBeUndefined();
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/og-fr.jpg', '/images/en/cover.webp', '/icon.svg']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers().location).toBeUndefined();
    expect(response.headers().vary ?? '').not.toMatch(/cookie|accept-language|cf-ipcountry/i);
  }
  for (const route of routes) {
    for (const suffix of ['.html', '/']) {
      const response = await request.get(`${route}${suffix}?source=browser&a=1&a=2&label=hello%20world`, {
        headers: { Cookie: 'NEXT_LOCALE=fr', 'Accept-Language': 'en' }, maxRedirects: 0,
      });
      const expectedStatus = suffix === '.html' && ['/fr', '/en'].includes(route) ? 301 : 308;
      expect(response.status()).toBe(expectedStatus);
      expect(response.headers().location).toBe(`${route}?source=browser&a=1&a=2&label=hello%20world`);
      expect(response.headers().vary ?? '').not.toMatch(/cookie|accept-language|cf-ipcountry/i);
    }
  }
  for (const route of ['/', '/articles', '/articles/ux-design-guide']) {
    const response = await request.head(`${route}?a=1&a=2`, { headers: { Cookie: 'NEXT_LOCALE=fr' }, maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toMatch(/\/fr(?:\/articles(?:\/ux-design-guide)?)?\?a=1&a=2$/);
    expect(response.headers()['cache-control']).toBe('private, no-store');
    expect(await response.body()).toHaveLength(0);
  }
  for (const path of ['/missing', '/fr/articles/missing', '/en/articles/missing', '/articles/missing', '/_routes.json', '/_headers', '/_redirects', '/.assetsignore', '/worker/index.mjs', '/functions/index.js', '/docs/drafts/USABILITY_TEST_PROTOCOL_FR.md']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  }
});

// The owner restored a presentation page for the free directory: it presents
// both books and links each Gumroad edition, while downloads stay genuinely
// unavailable on the site and no catalogue or file fallback is served.
const freeStores = {
  fr: 'https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr',
  en: 'https://joyccelight.gumroad.com/l/free-ui-ux-directory-en',
} as const;
for (const locale of ['fr', 'en'] as const) {
  test(`${locale} · directory presentation page links both Gumroad editions; downloads unavailable; images remain`, async ({ page, request }) => {
    for (const suffix of ['.html', '/']) {
      const response = await request.get(`/${locale}/resources/ui-ux-directory${suffix}`, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(`/${locale}/resources/ui-ux-directory`);
    }
    await page.goto(`/${locale}/resources/ui-ux-directory`);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const store of Object.values(freeStores)) {
      const link = page.locator(`a[href="${store}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    await expect(page.locator('a[href^="/downloads/"], [data-directory-entry], [data-free-download], .free-promo')).toHaveCount(0);
    const oldFiles = locale === 'fr'
      ? ['repertoire-ui-ux-gratuit-v1.zip', 'repertoire-ui-ux-fr-v1.pdf', 'repertoire-ui-ux-fr-v1.md']
      : ['ui-ux-directory-free-en-v1.zip', 'ui-ux-directory-en-v1.pdf', 'ui-ux-directory-en-v1.md'];
    for (const file of oldFiles) expect((await request.get('/downloads/' + file)).status()).toBe(404);
    const cover = await request.get(`/images/free-directory/cover-${locale}.jpg`);
    expect(cover.status()).toBe(200);
    expect(cover.headers()['content-type']).toContain('image/jpeg');
    for (const suffix of ['', '/articles', ...slugs.map(slug => '/articles/' + slug)]) {
      await page.goto(`/${locale}${suffix}`);
      await expect(page.locator('a[href^="/downloads/"], [data-directory-entry], [data-free-download], .free-promo')).toHaveCount(0);
    }
    for (const endpoint of ['/llms.txt', '/llms-full.txt', '/sitemap.xml']) {
      const text = await (await request.get(endpoint)).text();
      expect(text).not.toContain('/downloads/');
      expect(text).not.toContain('Live Brand Preview');
    }
  });
}

for (const locale of ['fr', 'en'] as const) {
  test(`${locale} · external source links open in a new tab; internal citations stay in place`, async ({ page }) => {
    await page.goto(`/${locale}/articles/ux-design-guide`);
    const external = page.locator('#article-sources a[href^="http"], .notion-stat-src a[href^="http"]');
    await expect(external.first()).toBeVisible();
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
    const citations = page.locator('a.notion-citation[href^="#reference-"]');
    for (const link of await citations.all()) await expect(link).not.toHaveAttribute('target', '_blank');
  });
}
