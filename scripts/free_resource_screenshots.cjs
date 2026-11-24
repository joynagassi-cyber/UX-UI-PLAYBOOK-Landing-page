// Offline catalogue/PNG validation and clickable PDF gallery. Never calls Microlink.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');

const directory = path.join(root, 'products/ui-ux-directory/screenshots');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const imageName = url => `images/${sha256(url).slice(0, 20)}.png`;
const requestOptions = Object.freeze({
  type: 'png', fullPage: false, meta: false, retry: 0, animations: false,
  viewport: { width: 1280, height: 720, deviceScaleFactor: 1, isMobile: false },
});

function failure(code, message) { return Object.assign(new Error(message), { code }); }
function capturePlan(catalog) {
  const found = new Set();
  return catalog.entries.flatMap(entry => entry.urls.flatMap(url => {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw failure('EINVALURL', 'Only public HTTPS catalogue URLs are supported.');
    if (found.has(url)) return [];
    found.add(url);
    return [{ url, entryId: entry.id, name: entry.name, image: imageName(url) }];
  }));
}
function emptyManifest() { return { version: 1, provider: 'microlink', requestOptions, captures: {} }; }
function readManifest(base = directory) {
  const filename = path.join(base, 'manifest.json');
  if (!fs.existsSync(filename)) return emptyManifest();
  const manifest = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (manifest.version !== 1 || manifest.provider !== 'microlink' || !manifest.captures || typeof manifest.captures !== 'object' || Array.isArray(manifest.captures)) throw failure('EMANIFEST', 'Invalid screenshot manifest.');
  return manifest;
}
function pngDimensions(bytes) {
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) || bytes.toString('ascii', 12, 16) !== 'IHDR') throw failure('EPNG', 'The downloaded asset is not a PNG.');
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  if (!width || !height || width > 4096 || height > 4096) throw failure('EPNG', 'Unexpected PNG dimensions.');
  return { width, height };
}
function validateCapture(url, capture, base = directory, requireReview = true) {
  if (!capture || capture.status !== 'captured' || capture.sourceUrl !== url || capture.image !== imageName(url)) throw failure('ECAPTURE', `Missing or incomplete capture: ${url}`);
  if (requireReview && capture.review !== 'approved') throw failure('EREVIEW', `Screenshot needs visual review: ${url}`);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(capture.retrievedAt || '')) throw failure('EMANIFEST', `Missing capture date: ${url}`);
  const filename = path.join(base, capture.image);
  if (!fs.existsSync(filename) || !fs.lstatSync(filename).isFile() || fs.lstatSync(filename).isSymbolicLink() || !fs.realpathSync(filename).startsWith(fs.realpathSync(base) + path.sep)) throw failure('EFILE', `Missing regular screenshot file: ${url}`);
  const bytes = fs.readFileSync(filename), size = pngDimensions(bytes);
  if (bytes.length > 200_000 || bytes.length !== capture.bytes || sha256(bytes) !== capture.sha256 || size.width !== capture.width || size.height !== capture.height) throw failure('EINTEGRITY', `Screenshot size or hash mismatch: ${url}`);
  return { bytes, ...size, retrievedAt: capture.retrievedAt };
}
function selectGalleryMode(argv) {
  const modes = ['--with-screenshots', '--with-available-screenshots', '--without-screenshots'].filter(flag => argv.includes(flag));
  if (modes.length > 1) throw failure('EUSAGE', 'Choose exactly one screenshot mode. No deliverable was changed.');
  return modes[0] === '--with-screenshots' ? 'complete' : modes[0] === '--with-available-screenshots' ? 'partial' : 'none';
}
function loadGallery(catalog, base = directory, { partial = false } = {}) {
  const manifest = readManifest(base), plan = capturePlan(catalog);
  const problems = [];
  const images = plan.flatMap(item => {
    const capture = manifest.captures[item.url];
    if (partial && (!capture || capture.status !== 'captured' || capture.review !== 'approved')) return [];
    try { return [{ ...item, ...validateCapture(item.url, manifest.captures[item.url], base) }]; }
    catch (error) { problems.push(`${error.code}: ${item.url}`); return []; }
  });
  if (problems.length || !images.length) throw failure('EINCOMPLETE', `${problems.length}/${plan.length} screenshots are missing, invalid or unreviewed. No PDF was changed. Run the capture plan and review the images first.\n${problems.join('\n')}`);
  return images;
}
function screenshotSheets(catalog, locale, base = directory, options = {}) {
  const { escape, heading, sheet } = require('./free_resource_layout.cjs');
  const images = loadGallery(catalog, base, options), pages = [];
  const fr = locale === 'fr';
  if (options.partial) {
    for (const [index, image] of images.entries()) {
      const entry = catalog.entries.find(item => item.id === image.entryId);
      const coverage = fr
        ? `${images.length} aperçus disponibles pour ${capturePlan(catalog).length} liens. Les autres destinations restent dans le répertoire, sans image ajoutée.`
        : `${images.length} available previews for ${capturePlan(catalog).length} links. Other destinations remain in the directory without an added image.`;
      pages.push(sheet(`${heading(fr ? 'Aperçu de ressource' : 'Resource preview', image.name, `${index + 1} / ${images.length}`)}<p class="small">${escape(coverage)}</p><article class="screen-card single-screen" data-resource-screenshot="${escape(image.url)}"><a class="screen-capture-link" href="${escape(image.url)}" aria-label="${escape((fr ? 'Visiter ' : 'Visit ') + image.name)}"><img src="data:image/png;base64,${image.bytes.toString('base64')}" width="${image.width}" height="${image.height}" alt="${escape((fr ? 'Capture du site ' : 'Website screenshot: ') + new URL(image.url).hostname)}"></a><a class="screen-url" href="${escape(image.url)}">${escape(image.url)}</a><p>${escape(entry.description)}</p><p class="watch"><strong>${fr ? 'À vérifier.' : 'Check first.'}</strong> ${escape(entry.watch)}</p><p class="screen-date">${fr ? 'Fiche' : 'Entry'} ${escape(image.entryId)} · ${fr ? 'Date déclarée dans le lot fourni :' : 'Date reported in the supplied batch:'} ${escape(image.retrievedAt.slice(0, 10))}. ${fr ? 'Horodatage non vérifié ici. Interface dans sa langue d’origine.' : 'Timestamp not independently verified. Interface in its original language.'}</p></article><p class="small">${fr ? 'Aperçu éditorial, pas un fichier à réutiliser. Marques et contenus appartiennent à leurs auteurs. La capture ne vérifie ni les droits, ni les tarifs, ni le fonctionnement actuel.' : 'Editorial preview, not a reusable asset. Brands and content belong to their authors. A screenshot does not verify rights, prices or current functionality.'}</p>`, 'directory-preview-sheet'));
    }
    return pages;
  }
  for (let offset = 0; offset < images.length; offset += 4) {
    const cards = images.slice(offset, offset + 4).map(image => `<article class="screen-card" data-resource-screenshot="${escape(image.url)}"><h3>${escape(image.entryId)}. ${escape(image.name)}</h3><a class="screen-capture-link" href="${escape(image.url)}" aria-label="${escape((fr ? 'Visiter ' : 'Visit ') + image.name + ' — ' + new URL(image.url).hostname)}"><img src="data:image/png;base64,${image.bytes.toString('base64')}" width="${image.width}" height="${image.height}" alt="${escape((fr ? 'Aperçu du site ' : 'Website preview: ') + new URL(image.url).hostname)}"></a><a class="screen-url" href="${escape(image.url)}">${escape(image.url)}</a><p class="screen-date">${fr ? 'Aperçu Microlink obtenu le' : 'Microlink preview retrieved:'} ${escape(image.retrievedAt.slice(0, 10))}</p></article>`).join('');
    pages.push(sheet(`${heading(fr ? 'Aperçus des ressources' : 'Resource previews', fr ? 'Cliquez sur une image ou son lien.' : 'Click an image or its link.', `${pages.length + 1} / ${Math.ceil(images.length / 4)}`)}<p class="small">${fr ? 'Aperçus éditoriaux datés, pas des fichiers à réutiliser. Marques et contenus appartiennent à leurs auteurs. Une capture ne valide ni les droits, ni les tarifs, ni le fonctionnement actuel du service.' : 'Dated editorial previews, not reusable assets. Brands and content belong to their authors. A screenshot does not validate rights, prices or the service’s current behavior.'}</p><div class="screen-grid">${cards}</div>`, 'directory-preview-sheet'));
  }
  return pages;
}
function safeError(error) {
  // Never serialize SDK errors: they can contain authenticated request headers.
  const candidate = error?.code || error?.cause?.code;
  const code = typeof candidate === 'string' && /^[A-Z0-9_]{2,48}$/.test(candidate) ? candidate : 'EUNKNOWN';
  const hints = {
    ENOKEY: 'Add a rotated MICROLINK_API_KEY to ignored .env.local; never put it in chat.',
    ENODEVERSION: 'Run only the isolated capture tool with Node 24+. The website stays on Node 22.',
    EAUTH: 'Check or rotate the key in the Microlink dashboard.',
    ERATE: 'Quota reached. Stop and check the plan/reset time; do not retry automatically.',
    EBRWSRTIMEOUT: 'Inspect the target and request options before authorizing another call.',
    ETIMEOUT: 'Inspect the target and request options before authorizing another call.',
    EPROXYNEEDED: 'The target blocks this capture. Do not bypass the block automatically.',
    ENOTFOUND: 'The API/CDN hostname could not be reached. Check network access.',
    ECONNREFUSED: 'The API/CDN connection was refused. Check network access.',
    EPREVIOUS: 'A previous attempt failed. Read its saved code before explicitly retrying one URL.',
    EINCOMPLETE: 'Complete mode requires every capture. Partial mode includes only approved images and still rejects damaged files.',
    EACQUISITIONPAUSED: 'Use the existing approved previews. No additional capture request or retry is authorized.',
    EIMPORTPENDING: 'Reconcile the preserved external manifest, image paths and size limits offline. Do not recapture existing URLs or automatically retry quota errors.',
  };
  return { code, ...(Number.isInteger(error?.statusCode) ? { statusCode: error.statusCode } : {}), hint: hints[code] || 'Stopped without automatic retry. Review the saved code and local configuration.' };
}

module.exports = { directory, sha256, imageName, requestOptions, failure, capturePlan, emptyManifest, readManifest, pngDimensions, validateCapture, loadGallery, screenshotSheets, selectGalleryMode, safeError };
