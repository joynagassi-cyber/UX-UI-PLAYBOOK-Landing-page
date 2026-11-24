#!/usr/bin/env node
// Local-only reproducible lab measurements. Never uploads results or injects RUM.
const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const { chromium } = require('@playwright/test');
const { root } = require('./content-data.cjs');
const catalogue = require('../src/i18n/article-catalog.json');
const allRoutes = ['fr', 'en'].flatMap(locale => ['', '/articles', '/resources/ui-ux-directory', ...Object.keys(catalogue).map(slug => `/articles/${slug}`)].map(suffix => `/${locale}${suffix}`));
const median = numbers => [...numbers].sort((a, b) => a - b)[Math.floor(numbers.length / 2)];

async function interactions(browser, baseURL, route) {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  try {
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.addInitScript(() => {
      const sample = { lcpMs: null, shifts: [], interactions: [], supported: PerformanceObserver.supportedEntryTypes };
      window.__playbookLab = sample;
      if (sample.supported.includes('largest-contentful-paint')) new PerformanceObserver(list => {
        for (const entry of list.getEntries()) sample.lcpMs = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      if (sample.supported.includes('layout-shift')) new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) sample.shifts.push({ at: entry.startTime, value: entry.value });
      }).observe({ type: 'layout-shift', buffered: true });
      if (sample.supported.includes('event')) new PerformanceObserver(list => {
        for (const entry of list.getEntries()) if (entry.interactionId) sample.interactions.push({ id: entry.interactionId, name: entry.name, target: entry.target instanceof Element ? entry.target.closest('button, summary, a')?.getAttribute('class') || entry.target.tagName : null, durationMs: entry.duration, inputDelayMs: entry.processingStart - entry.startTime, processingMs: entry.processingEnd - entry.processingStart, presentationDelayMs: Math.max(0, entry.startTime + entry.duration - entry.processingEnd) });
      }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    });
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Allow buffered paint/shift observations to be delivered before input stops LCP.
    await page.waitForTimeout(500);
    const actions = [];
    const theme = page.locator('.theme-btn');
    for (let i = 0; i < 2; i++) {
      await theme.focus();
      await page.keyboard.press('Space');
      actions.push('theme-keyboard-toggle');
      await page.waitForTimeout(150);
    }
    // Prefer an inactive toggle so the extra content action is not a no-op on
    // the already selected terminal tab. Other templates open their first control.
    const inactiveToggle = page.locator('main button[aria-pressed="false"]:visible').first();
    const control = await inactiveToggle.count() ? inactiveToggle : page.locator('main button:visible, main summary:visible').first();
    if (await control.count()) {
      actions.push((await control.getAttribute('class')) || await control.evaluate(el => el.tagName));
      await control.click();
    }
    await page.waitForTimeout(600);
    return await page.evaluate(actions => {
      const data = window.__playbookLab;
      let cls = 0, session = 0, first = 0, previous = 0;
      for (const shift of data.shifts) {
        if (!first || shift.at - previous > 1000 || shift.at - first > 5000) { first = shift.at; session = shift.value; }
        else session += shift.value;
        previous = shift.at;
        cls = Math.max(cls, session);
      }
      const grouped = new Map();
      for (const event of data.interactions) grouped.set(event.id, Math.max(event.durationMs, grouped.get(event.id) || 0));
      return {
        lcpMs: data.lcpMs, cls, actions, cpuSlowdownMultiplier: 4, network: 'local HTTP, unshaped', reducedMotion: 'reduce',
        eventTimingSupported: data.supported.includes('event'), reportedInteractionGroups: grouped.size,
        inpCandidateMs: grouped.size ? Math.max(...grouped.values()) : null,
        eventReportingFloorMs: 16, events: data.interactions,
        interpretation: 'Short scripted lab sample, NOT field INP. Null means no interaction at or above the reporting floor was observed, not a measured zero. For fewer than 50 observed interactions, the worst reported interaction is the candidate; no representative population percentile exists here.',
      };
    }, actions);
  } finally { await context.close(); }
}

async function main() {
  const { values } = parseArgs({ options: { 'base-url': { type: 'string', default: 'http://127.0.0.1:3100' }, runs: { type: 'string', default: '3' }, route: { type: 'string', multiple: true }, output: { type: 'string', default: 'reports/performance-check.json' } } });
  const runs = Number(values.runs), routes = values.route || allRoutes;
  if (!Number.isInteger(runs) || runs < 1 || runs > 5 || routes.some(route => !allRoutes.includes(route))) throw new Error('Use 1–5 runs and existing localized routes only.');
  const baseURL = values['base-url'];
  const { default: lighthouse } = await import('lighthouse');
  const { launch } = await import('chrome-launcher');
  const chrome = await launch({ chromePath: process.env.CHROMIUM_EXECUTABLE_PATH, chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'], logLevel: 'silent' });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
  const output = path.resolve(root, values.output);
  // Isolate diagnostic runs from the final campaign instead of silently
  // overwriting a prior route/run's raw report in the same parent directory.
  const rawDirectoryName = `${path.basename(output, path.extname(output))}-lighthouse`;
  const rawDirectory = path.join(path.dirname(output), rawDirectoryName);
  fs.mkdirSync(rawDirectory, { recursive: true });
  const observations = [];
  const report = { generatedAt: new Date().toISOString(), baseURL, scope: 'Local laboratory only; no CrUX, RUM, Search Console or production measurements', runsPerRoute: runs, lighthouseVersion: require('lighthouse/package.json').version, browserVersion: await browser.version(), lighthouseProfile: { formFactor: 'mobile', viewport: '390x844', throttlingMethod: 'simulate', rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 }, budgets: { lcpMs: 2500, cls: 0.1, tbtMs: 200, scriptedInpCandidateMs: 200 }, observations, fieldCoreWebVitals: { lcp: 'not measured', inp: 'not measured', cls: 'not measured', reason: 'Requires representative real users/CrUX/RUM; a Lighthouse navigation does not measure field INP.' } };
  try {
    for (const route of routes) {
      const samples = [];
      for (let run = 1; run <= runs; run++) {
        const result = await lighthouse(new URL(route, baseURL).href, {
          port: chrome.port, logLevel: 'error', output: 'json', onlyCategories: ['performance'],
          formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false },
          throttlingMethod: 'simulate', throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 },
        });
        if (!result?.lhr || result.lhr.runtimeError) throw new Error(`Lighthouse did not complete: ${route} ${result?.lhr?.runtimeError?.code || ''}`);
        const { lhr } = result;
        const file = `${route.slice(1).replaceAll('/', '-')}-${run}.json`;
        fs.writeFileSync(path.join(rawDirectory, file), JSON.stringify(lhr) + '\n');
        const interaction = await interactions(browser, baseURL, route);
        samples.push({ run, lcpMs: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue, tbtMs: lhr.audits['total-blocking-time'].numericValue, performanceScore: lhr.categories.performance.score, interaction, warnings: lhr.runWarnings, rawReport: `${rawDirectoryName}/${file}` });
      }
      const medians = { lcpMs: median(samples.map(s => s.lcpMs)), cls: median(samples.map(s => s.cls)), tbtMs: median(samples.map(s => s.tbtMs)) };
      const measuredCandidates = samples.map(s => s.interaction.inpCandidateMs).filter(n => n !== null);
      const item = { route, samples, medians, worstScriptedInpCandidateMs: measuredCandidates.length ? Math.max(...measuredCandidates) : null };
      item.budgetPass = medians.lcpMs <= report.budgets.lcpMs && medians.cls <= report.budgets.cls && medians.tbtMs <= report.budgets.tbtMs && (item.worstScriptedInpCandidateMs === null || item.worstScriptedInpCandidateMs <= report.budgets.scriptedInpCandidateMs);
      observations.push(item);
      fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
      console.log(`${route}: lab median LCP ${medians.lcpMs.toFixed(0)}ms · CLS ${medians.cls.toFixed(4)} · TBT ${medians.tbtMs.toFixed(0)}ms · worst scripted INP candidate ${item.worstScriptedInpCandidateMs ?? '<16ms or unreported'}ms · ${item.budgetPass ? 'PASS' : 'REVIEW'}`);
    }
    report.completedAt = new Date().toISOString();
    report.passed = observations.filter(o => o.budgetPass).length;
    report.failed = observations.length - report.passed;
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
    process.exitCode = report.failed ? 1 : 0;
  } finally { await browser.close(); await chrome.kill(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
