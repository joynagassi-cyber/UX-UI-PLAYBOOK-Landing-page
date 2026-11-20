#!/usr/bin/env node
// Server-side only. This tool is deliberately outside Next's app/src dependency graph.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import helpers from '../../scripts/free_resource_screenshots.cjs';

const { directory, sha256, imageName, requestOptions, failure, capturePlan, readManifest, pngDimensions, validateCapture, safeError } = helpers;
const root = fileURLToPath(new URL('../../', import.meta.url));
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'products/ui-ux-directory/catalogue.json'), 'utf8'));
const github = 'https://github.com/';
const manifestPath = path.join(directory, 'manifest.json');

export async function oneSdkRequest(client, target, fetchImpl = globalThis.fetch) {
  // The SDK also has an HTTP retry layer. A hard network gate prevents it spending
  // additional requests even if a transport implementation ignores retry: 0.
  const previousFetch = globalThis.fetch;
  let attempted = false, firstApiError;
  globalThis.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
    if (url.origin !== 'https://pro.microlink.io') throw failure('EENDPOINT', 'Unexpected SDK endpoint.');
    if (attempted) throw failure('EREPLAYBLOCKED', 'Automatic transport retry blocked before network I/O.');
    attempted = true;
    const requestSignal = typeof input === 'object' && !(input instanceof URL) ? input.signal : init?.signal;
    const signal = requestSignal ? AbortSignal.any([requestSignal, AbortSignal.timeout(75_000)]) : AbortSignal.timeout(75_000);
    const response = await fetchImpl(input, { ...init, signal, redirect: 'error' });
    if (!response.ok) {
      try {
        const body = await response.clone().json();
        firstApiError = Object.assign(new Error('Microlink rejected the request.'), { code: body.code, statusCode: response.status });
      } catch { /* Never print raw response bodies or request headers. */ }
    }
    return response;
  };
  try { return await client.screenshot(target, requestOptions); }
  catch (error) { throw firstApiError || error; }
  finally { globalThis.fetch = previousFetch; }
}

function save(manifest) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(manifestPath + '.tmp', JSON.stringify(manifest, null, 2) + '\n');
  fs.renameSync(manifestPath + '.tmp', manifestPath);
}
function isValidLocal(url, capture) {
  try { validateCapture(url, capture, directory, false); return true; }
  catch { return false; }
}
function pendingSummary(manifest) {
  const plan = capturePlan(catalog);
  return {
    resourceLinks: plan.length,
    validLocalImages: plan.filter(item => isValidLocal(item.url, manifest.captures[item.url])).length,
    approvedImages: plan.filter(item => isValidLocal(item.url, manifest.captures[item.url]) && manifest.captures[item.url].review === 'approved').length,
    // Incoming submissions may already have spent calls. Do not recommend recapture
    // while their different manifest/filenames/image bounds remain unreconciled.
    apiCallsNeeded: manifest.pendingExternalImport ? null : plan.filter(item => !isValidLocal(item.url, manifest.captures[item.url]) && !manifest.captures[item.url]?.asset?.url).length,
    ...(manifest.pendingExternalImport ? { captureBlocked: true, pendingExternalImport: manifest.pendingExternalImport } : {}),
    storedReceiptsToDownload: plan.filter(item => !isValidLocal(item.url, manifest.captures[item.url]) && manifest.captures[item.url]?.asset?.url).length,
    previousFailures: plan.filter(item => ['failed', 'requested'].includes(manifest.captures[item.url]?.status) && !isValidLocal(item.url, manifest.captures[item.url])).map(item => ({ url: item.url, code: manifest.captures[item.url].error?.code || 'EINTERRUPTED' })),
    networkCallsMadeByThisPlan: 0,
    note: manifest.pendingExternalImport
      ? 'External PNGs and their original manifest are preserved but need offline reconciliation. API-call estimate is unknown; capture is blocked to prevent duplicate paid requests. No network calls.'
      : 'One shared image set for both languages. The separate GitHub smoke test can use one additional API request. No automatic API or HTTP retries.',
  };
}
async function downloadAndOptimize(asset, target, sharp) {
  const url = new URL(asset.url);
  if (url.protocol !== 'https:' || url.username || url.password) throw failure('EASSET', 'Invalid screenshot asset URL.');
  // Never send the API key or any SDK request headers to the CDN.
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw failure('EASSETDOWNLOAD', 'Screenshot CDN download failed; saved receipt can be reused.');
  const limit = 5_000_000;
  const chunks = []; let length = 0;
  for await (const chunk of response.body) {
    length += chunk.byteLength;
    if (length > limit) throw failure('EASSETSIZE', 'Screenshot exceeds the local input size limit.');
    chunks.push(Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks), originalSize = pngDimensions(raw);
  if (originalSize.width !== 1280 || originalSize.height !== 720) throw failure('EASSETDIMENSIONS', 'Unexpected viewport; inspect the saved receipt before another API call.');
  const rawDir = path.join(root, '.cache/microlink/raw');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.writeFileSync(path.join(rawDir, path.basename(imageName(target))), raw);
  // Keep all public/editable assets bounded. Raw PNGs stay in ignored .cache.
  let png;
  for (const [width, colours] of [[960, 128], [800, 64], [640, 64]]) {
    png = await sharp(raw).resize(width, Math.round(width * 9 / 16)).png({ palette: true, colours, compressionLevel: 9, effort: 9 }).toBuffer();
    if (png.length <= 180_000) break;
  }
  if (png.length > 200_000) throw failure('EASSETSIZE', 'Optimized PNG is too large. Reprocess the saved raw PNG; do not spend another API request.');
  return { png, original: { ...originalSize, bytes: raw.length, sha256: sha256(raw) } };
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, strict: true, options: {
    plan: { type: 'boolean' }, url: { type: 'string' }, all: { type: 'boolean' },
    'max-calls': { type: 'string' }, 'confirm-billable': { type: 'boolean' },
    'retry-failed': { type: 'boolean' }, approve: { type: 'string' },
  } });
  const manifest = readManifest();
  const modes = [values.plan, values.url, values.all, values.approve].filter(Boolean);
  if (modes.length !== 1) throw failure('EUSAGE', 'Choose --plan, --url <url>, --approve <url>, or --all with an explicit budget.');
  if (values.plan) { console.log(JSON.stringify(pendingSummary(manifest), null, 2)); return; }
  const plan = capturePlan(catalog), allowed = new Set([github, ...plan.map(item => item.url)]);
  const selected = values.url || values.approve;
  const normalized = selected ? new URL(selected).href : null;
  if (normalized && !allowed.has(normalized)) throw failure('EINVALTARGET', 'Use a catalogue URL or the GitHub smoke-test URL.');
  if (values.approve) {
    const item = manifest.captures[normalized];
    validateCapture(normalized, item, directory, false);
    item.review = 'approved';
    save(manifest);
    console.log('Visual review recorded for: ' + normalized + '. No API request made.');
    return;
  }
  if (values['retry-failed'] && !values.url) throw failure('EUSAGE', 'A failed URL can only be retried individually after reading its saved error code.');
  const budget = values.all ? Number(values['max-calls']) : 1;
  if (values.all && (!values['confirm-billable'] || !Number.isInteger(budget) || budget < 1 || budget > 75)) throw failure('EBUDGET', 'Batch capture requires --confirm-billable and --max-calls between 1 and 75.');
  if (manifest.pendingExternalImport) throw failure('EIMPORTPENDING', 'Reconcile the preserved external submission offline before requesting captures.');
  const targets = values.all ? plan.map(item => item.url) : [normalized];
  const remaining = targets.filter(target => !isValidLocal(target, manifest.captures[target]));
  if (!remaining.length) { console.log('All selected PNGs are already valid locally. No API request made.'); return; }
  for (const target of remaining) {
    if (['failed', 'requested'].includes(manifest.captures[target]?.status) && !manifest.captures[target].asset?.url && !values['retry-failed']) throw failure('EPREVIOUS', 'Previous capture failed.');
  }
  const needed = remaining.filter(target => !manifest.captures[target]?.asset?.url).length;
  if (needed > budget) throw failure('EBUDGET', 'The requested set exceeds the explicitly authorized API-call budget. Use the plan or a single URL.');
  const envFile = path.join(root, '.env.local');
  if (fs.existsSync(envFile)) process.loadEnvFile(envFile);
  if (needed && !process.env.MICROLINK_API_KEY?.trim()) throw failure('ENOKEY', 'No API key configured.');
  if (Number(process.versions.node.split('.')[0]) < 24) throw failure('ENODEVERSION', 'The isolated SDK requires Node 24+.');
  const lockDirectory = path.join(root, '.cache/microlink');
  fs.mkdirSync(lockDirectory, { recursive: true });
  const lockFile = path.join(lockDirectory, 'capture.lock');
  let lock;
  try { lock = fs.openSync(lockFile, 'wx', 0o600); }
  catch { throw failure('EBUSY', 'Another capture is running or its lock needs inspection.'); }
  fs.writeFileSync(lock, String(process.pid) + '\n');
  try {
    // Do not allow SDK debug/tracing to dump authenticated headers.
    process.env.DEBUG = '';
    const [{ default: createClient }, { default: sharp }] = await Promise.all([import('microlink.io'), import('sharp')]);
    const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY });
    let apiCalls = 0;
    for (const target of remaining) {
      let record = manifest.captures[target];
      try {
        if (!record?.asset?.url) {
          if (apiCalls >= budget) throw failure('EBUDGET', 'API-call ceiling reached.');
          apiCalls += 1;
          record = { sourceUrl: target, status: 'requested', review: 'pending', requestedAt: new Date().toISOString() };
          manifest.captures[target] = record;
          // Persist the attempt first: a crash cannot silently trigger another paid request.
          save(manifest);
          record.asset = await oneSdkRequest(microlink, target);
          if (!record.asset?.url || !['png', 'image/png'].includes(record.asset.type)) throw failure('EASSET', 'Microlink did not return the requested PNG.');
          record.retrievedAt = new Date().toISOString();
          save(manifest); // Receipt survives a CDN/network/post-processing failure.
        }
        const { png, original } = await downloadAndOptimize(record.asset, target, sharp);
        const image = imageName(target), filename = path.join(directory, image);
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        fs.writeFileSync(filename, png);
        Object.assign(record, { status: 'captured', review: 'pending', image, ...pngDimensions(png), bytes: png.length, sha256: sha256(png), original });
        delete record.error;
        save(manifest);
        console.log(`Saved PNG: ${path.relative(root, filename)} · review pending · API calls this run: ${apiCalls}`);
      } catch (error) {
        if (record) { record.status = 'failed'; record.error = safeError(error); save(manifest); }
        throw error; // First error stops the run. No retries or quota-draining loop.
      }
    }
  } finally {
    fs.closeSync(lock);
    fs.unlinkSync(lockFile);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(JSON.stringify(safeError(error))); process.exitCode = 1; });
}
