#!/usr/bin/env node
// Read-only guarantee against accidental editorial/product expansion in this pass.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { root } = require('./content-data.cjs');
const baseline = require('../docs/technical-baseline.json');
const changed = Object.entries(baseline.protectedFiles).filter(([file, hash]) => !fs.existsSync(path.join(root, file)) || crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex') !== hash).map(([file]) => file);
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const pageFiles = walk(path.join(root, 'src/app')).filter(file => path.basename(file) === 'page.tsx').map(file => path.relative(root, file)).sort();
const initialPageFiles = baseline.initialTrackedPaths.filter(file => file.startsWith('src/app/') && file.endsWith('/page.tsx')).sort();
if (JSON.stringify(pageFiles) !== JSON.stringify(initialPageFiles)) changed.push('Public page route inventory changed');
const draft = path.join(root, 'out/docs/drafts/USABILITY_TEST_PROTOCOL_FR.md');
if (fs.existsSync(draft)) changed.push('Internal draft exposed in export');
const appendOnly = Object.entries(baseline.appendOnlyFiles || {}).map(([file, original]) => {
  const bytes = fs.readFileSync(path.join(root, file));
  const preserved = bytes.length >= original.bytes && crypto.createHash('sha256').update(bytes.subarray(0, original.bytes)).digest('hex') === original.sha256;
  if (!preserved) changed.push(`${file}: original report was not preserved as a prefix`);
  return { file, preserved, originalBytes: original.bytes, appendedBytes: bytes.length - original.bytes };
});
const report = { baseCommit: baseline.baseCommit, protectedFiles: Object.keys(baseline.protectedFiles).length, appendOnly, changed, publicPageFiles: pageFiles, outcome: changed.length ? 'fail' : 'pass' };
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/preservation-check.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Preservation: ${report.protectedFiles - changed.length}/${report.protectedFiles} protected files unchanged; public page inventory ${changed.length ? 'REVIEW' : 'unchanged'}.`);
for (const file of changed) console.error('FAIL', file);
process.exitCode = changed.length ? 1 : 0;
