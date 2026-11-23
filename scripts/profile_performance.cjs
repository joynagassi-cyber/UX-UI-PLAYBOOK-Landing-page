#!/usr/bin/env node
// Read-only local diagnostics. CPU/trace instrumentation is deliberately separate
// from the unchanged Lighthouse budget campaign; these are NOT new TBT scores.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { parseArgs } = require('node:util');
const { chromium } = require('@playwright/test');
const { root } = require('./content-data.cjs');
const targets = ['/fr', '/fr/articles/ux-design-guide', '/fr/articles/product-design-ai-agents', '/en/articles/product-design-ai-agents'];
const metricNames = ['ScriptDuration', 'RecalcStyleDuration', 'LayoutDuration', 'TaskDuration', 'RecalcStyleCount', 'LayoutCount'];
const toMetrics = result => Object.fromEntries(result.metrics.map(m => [m.name, m.value]));
const delta = (before, after) => Object.fromEntries(metricNames.map(name => [name, after[name] - (before[name] || 0)]));
async function stopTrace(cdp) {
  const done = new Promise(resolve => cdp.once('Tracing.tracingComplete', resolve));
  await cdp.send('Tracing.end');
  const { stream } = await done;
  let text = '';
  for (;;) {
    const chunk = await cdp.send('IO.read', { handle: stream });
    text += chunk.base64Encoded ? Buffer.from(chunk.data, 'base64').toString() : chunk.data;
    if (chunk.eof) break;
  }
  await cdp.send('IO.close', { handle: stream });
  return JSON.parse(text);
}
function summarizeCpu(profile) {
  const nodes = new Map(profile.nodes.map(n => [n.id, n]));
  const time = new Map();
  for (let i = 0; i < (profile.samples || []).length; i++) time.set(profile.samples[i], (time.get(profile.samples[i]) || 0) + profile.timeDeltas[i] / 1000);
  return [...time].map(([id, selfMs]) => ({ ...nodes.get(id).callFrame, selfMs })).sort((a, b) => b.selfMs - a.selfMs).slice(0, 60);
}
async function profileRoute(browser, baseURL, route, directory) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  try {
    const page = await context.newPage(), cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Performance.enable');
    await cdp.send('Profiler.enable');
    const requests = [];
    cdp.on('Network.responseReceived', e => { if (['Script', 'Stylesheet', 'Document'].includes(e.type)) requests.push({ type: e.type, url: e.response.url, status: e.response.status, cache: !!e.response.fromDiskCache }); });
    await page.addInitScript(() => {
      window.__diagnostic = { tasks: [], transitions: {}, events: [] };
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.__diagnostic.tasks.push({ startMs: e.startTime, durationMs: e.duration }); }).observe({ type: 'longtask', buffered: true });
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.interactionId) window.__diagnostic.events.push({ id: e.interactionId, name: e.name, durationMs: e.duration, inputDelayMs: e.processingStart - e.startTime, processingMs: e.processingEnd - e.processingStart, presentationDelayMs: e.startTime + e.duration - e.processingEnd }); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      for (const name of ['transitionrun', 'transitionstart', 'transitionend', 'animationstart']) document.addEventListener(name, () => { window.__diagnostic.transitions[name] = (window.__diagnostic.transitions[name] || 0) + 1; }, true);
    });
    await cdp.send('Tracing.start', { categories: 'devtools.timeline,blink.user_timing', transferMode: 'ReturnAsStream' });
    await cdp.send('Profiler.startPreciseCoverage', { callCount: true, detailed: true });
    await cdp.send('Profiler.start');
    await page.goto(baseURL + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    const cpu = (await cdp.send('Profiler.stop')).profile;
    const coverage = (await cdp.send('Profiler.takePreciseCoverage')).result;
    await cdp.send('Profiler.stopPreciseCoverage');
    const trace = await stopTrace(cdp);
    const metrics = toMetrics(await cdp.send('Performance.getMetrics'));
    const initial = await page.evaluate(() => ({ ...window.__diagnostic, domNodes: document.querySelectorAll('*').length, svgNodes: document.querySelectorAll('svg').length, visibleTextCharacters: document.body.innerText.length, scriptTags: [...document.scripts].filter(s => s.src).map(s => ({ url: s.src, noModule: s.noModule, async: s.async, type: s.type })) }));
    const tasks = trace.traceEvents.filter(e => e.name === 'RunTask' && e.dur > 50000).map(e => ({ startUs: e.ts, durationMs: e.dur / 1000 }));
    const eventWork = {};
    for (const e of trace.traceEvents) if (e.ph === 'X' && ['UpdateLayoutTree', 'Layout', 'FunctionCall', 'EvaluateScript', 'EventDispatch', 'ParseHTML'].includes(e.name)) {
      const key = e.name === 'EventDispatch' ? `${e.name}:${e.args?.data?.type}` : e.name;
      const row = eventWork[key] ||= { calls: 0, inclusiveMs: 0 };
      row.calls++; row.inclusiveMs += e.dur / 1000;
    }
    const themes = [];
    for (const motion of ['no-preference', 'reduce']) {
      await page.emulateMedia({ reducedMotion: motion });
      await page.waitForTimeout(300);
      await page.evaluate(() => { window.__diagnostic = { tasks: [], transitions: {}, events: [] }; });
      const before = toMetrics(await cdp.send('Performance.getMetrics'));
      for (let i = 0; i < 2; i++) { await page.locator('.theme-btn').focus(); await page.keyboard.press('Space'); await page.waitForTimeout(150); }
      await page.waitForTimeout(600);
      themes.push({ reducedMotion: motion, metrics: delta(before, toMetrics(await cdp.send('Performance.getMetrics'))), observation: await page.evaluate(() => window.__diagnostic) });
    }
    const save = (name, object) => fs.writeFileSync(path.join(directory, name + '.json.gz'), zlib.gzipSync(JSON.stringify(object)));
    save('navigation-trace', trace); save('navigation-cpu', cpu); save('navigation-coverage', coverage);
    const result = { route, scope: 'Instrumented diagnosis only: CPU x4, local unshaped HTTP, cold browser cache; NOT Lighthouse simulated TBT or field data', initialMetrics: Object.fromEntries([...metricNames, 'Nodes', 'JSHeapUsedSize'].map(k => [k, metrics[k]])), initial, requests, longTraceTasks: tasks, inclusiveTraceWork: eventWork, cpuSelfTime: summarizeCpu(cpu), executedScripts: coverage.filter(s => s.url.startsWith(baseURL)).map(s => ({ url: s.url, functions: s.functions.length, executedFunctions: s.functions.filter(f => f.ranges.some(r => r.count > 0)).length, scriptBytesUtf16: Math.max(...s.functions.flatMap(f => f.ranges.map(r => r.endOffset)), 0) })), themes, warning: 'Profiling adds overhead. Inclusive trace categories overlap; do not add them. Theme observations test both motion modes but are short diagnostics, not population INP.' };
    fs.writeFileSync(path.join(directory, 'summary.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(`${route}: ${initial.tasks.length} observed initial long tasks; script ${metrics.ScriptDuration.toFixed(3)}s, style ${metrics.RecalcStyleDuration.toFixed(3)}s, layout ${metrics.LayoutDuration.toFixed(3)}s; ${requests.filter(r => r.type === 'Script').length} requested scripts`);
  } finally { await context.close(); }
}
async function main() {
  const { values } = parseArgs({ options: { 'base-url': { type: 'string', default: 'http://127.0.0.1:3100' }, tag: { type: 'string', default: 'before' }, route: { type: 'string', multiple: true } } });
  if (!/^[a-z0-9-]+$/.test(values.tag) || values.route?.some(r => !targets.includes(r))) throw new Error('Use an alphanumeric tag and one of the four profiled routes.');
  const output = path.join(root, 'reports/performance-finalization/profiles', values.tag);
  if (fs.existsSync(output)) throw new Error('Diagnostic tag already exists; preserve it and choose a new tag.');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
  try {
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, 'environment.json'), JSON.stringify({ browser: browser.version(), viewport: '390x844', cpuSlowdownMultiplier: 4, network: 'local unshaped HTTP', baseURL: values['base-url'] }, null, 2) + '\n');
    for (const route of values.route || targets) { const directory = path.join(output, route.slice(1).replaceAll('/', '-')); fs.mkdirSync(directory); await profileRoute(browser, values['base-url'], route, directory); }
  } finally { await browser.close(); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
