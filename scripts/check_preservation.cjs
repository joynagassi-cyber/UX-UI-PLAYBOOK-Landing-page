#!/usr/bin/env node
// Preserve the historical baseline and accept only exact, documented revisions.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { root: repositoryRoot } = require('./content-data.cjs');
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const validSha = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const safePath = value => typeof value === 'string' && value.length > 0 && !path.isAbsolute(value)
  && !value.includes('\\') && value.split('/').every(segment => segment && segment !== '..' && segment !== '.');

function verifyPreservation(root = repositoryRoot) {
  const baselineBytes = fs.readFileSync(path.join(root, 'docs/technical-baseline.json'));
  const baseline = JSON.parse(baselineBytes);
  const ledger = JSON.parse(fs.readFileSync(path.join(root, 'docs/preservation-revisions.json'), 'utf8'));
  const expected = new Map(Object.entries(baseline.protectedFiles));
  const revisedFiles = new Set();
  const retiredFiles = new Map();
  const expectedPageFiles = new Set(baseline.initialTrackedPaths.filter(file => file.startsWith('src/app/') && file.endsWith('/page.tsx')));
  const retiredPageFiles = [];
  const changed = [];
  const revisions = [];
  const revisionIds = new Set();
  if (ledger.schemaVersion !== 1 || !Array.isArray(ledger.revisions)) changed.push('Unsupported preservation revision ledger');
  if (ledger.baselineSha256 !== sha256(baselineBytes)) changed.push('Historical preservation baseline was changed');
  for (const revision of ledger.revisions || []) {
    if (!revision.id || revisionIds.has(revision.id) || !revision.reason?.trim()
      || !safePath(revision.reviewReport) || !fs.existsSync(path.join(root, revision.reviewReport))) {
      changed.push(`Invalid or undocumented revision: ${revision.id || '(missing id)'}`);
      continue;
    }
    revisionIds.add(revision.id);
    const seen = new Set();
    for (const entry of revision.files || []) {
      const valid = safePath(entry.path) && !seen.has(entry.path) && expected.has(entry.path)
        && validSha(entry.fromSha256) && validSha(entry.toSha256) && entry.reason?.trim()
        && entry.fromSha256 === expected.get(entry.path) && entry.fromSha256 !== entry.toSha256;
      seen.add(entry.path);
      if (!valid) {
        changed.push(`Invalid revision chain: ${revision.id}: ${entry.path}`);
        continue;
      }
      expected.set(entry.path, entry.toSha256);
      revisedFiles.add(entry.path);
    }
    for (const entry of revision.introducedFiles || []) {
      if (!safePath(entry.path) || expected.has(entry.path) || retiredFiles.has(entry.path) || !validSha(entry.sha256) || !entry.reason?.trim()) {
        changed.push(`Invalid new protected file: ${revision.id}: ${entry.path}`);
        continue;
      }
      expected.set(entry.path, entry.sha256);
      revisedFiles.add(entry.path);
    }
    // Explicit tombstones, not exemptions: exact predecessor hash, named path,
    // review document, continued absence, and no later reuse as an introduced file.
    for (const entry of revision.removedFiles || []) {
      if (!safePath(entry.path) || !expected.has(entry.path) || seen.has(entry.path)
        || !validSha(entry.fromSha256) || entry.fromSha256 !== expected.get(entry.path) || !entry.reason?.trim()) {
        changed.push(`Invalid reviewed removal: ${revision.id}: ${entry.path}`);
        continue;
      }
      seen.add(entry.path);
      expected.delete(entry.path);
      retiredFiles.set(entry.path, entry);
    }
    for (const entry of revision.removedPageFiles || []) {
      if (!safePath(entry.path) || !expectedPageFiles.has(entry.path) || !validSha(entry.fromSha256) || !entry.reason?.trim()) {
        changed.push(`Invalid page inventory removal: ${revision.id}: ${entry.path}`);
        continue;
      }
      expectedPageFiles.delete(entry.path);
      retiredPageFiles.push(entry);
    }
    revisions.push({ id: revision.id, reason: revision.reason, reviewReport: revision.reviewReport,
      files: (revision.files || []).length, introducedFiles: (revision.introducedFiles || []).length,
      removedFiles: (revision.removedFiles || []).length, removedPageFiles: (revision.removedPageFiles || []).length });
  }
  const protectedFiles = [...expected].map(([file, hash]) => {
    const filename = path.join(root, file);
    const present = fs.existsSync(filename) && fs.statSync(filename).isFile();
    const actual = present ? sha256(fs.readFileSync(filename)) : null;
    const preserved = actual === hash;
    if (!preserved) changed.push(`${file}: ${present ? 'unreviewed content change' : 'missing protected file'}`);
    return { file, expectedSha256: hash, actualSha256: actual, preserved,
      basis: revisedFiles.has(file) ? 'exact reviewed revision' : 'unchanged historical baseline' };
  });
  const reviewedRemovals = [...retiredFiles].map(([file, entry]) => {
    const absent = !fs.existsSync(path.join(root, file));
    if (!absent) changed.push(`${file}: retired file reappeared`);
    return { file, fromSha256: entry.fromSha256, absent, reason: entry.reason };
  });
  // Page templates carry no baseline hash, so cross-check the recorded predecessor
  // against the newest git blob for that path when history is available. Absence of
  // git history (exported sources, fixture roots) skips this check, never passes it.
  const gitBlobSha256 = file => {
    try {
      const commit = execFileSync('git', ['-C', root, 'log', '-1', '--format=%H', '--', `:(literal)${file}`],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (!/^[a-f0-9]{40}$/.test(commit)) return null;
      return sha256(execFileSync('git', ['-C', root, 'show', `${commit}:${file}`], { maxBuffer: 64 * 1024 * 1024 }));
    } catch { return null; }
  };
  for (const entry of retiredPageFiles) {
    const historical = gitBlobSha256(entry.path);
    entry.predecessorHashVerified = historical !== null && historical === entry.fromSha256;
    if (historical !== null && historical !== entry.fromSha256) {
      changed.push(`${entry.path}: recorded predecessor hash does not match git history`);
    }
  }
  const walk = directory => fs.existsSync(directory) ? fs.readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]) : [];
  const pageFiles = walk(path.join(root, 'src/app')).filter(file => path.basename(file) === 'page.tsx')
    .map(file => path.relative(root, file)).sort();
  const pageInventoryPreserved = JSON.stringify(pageFiles) === JSON.stringify([...expectedPageFiles].sort());
  if (!pageInventoryPreserved) changed.push('Public page route inventory changed');
  if (fs.existsSync(path.join(root, 'out/docs/drafts/USABILITY_TEST_PROTOCOL_FR.md'))) changed.push('Internal draft exposed in export');
  const appendOnly = Object.entries(baseline.appendOnlyFiles || {}).map(([file, original]) => {
    const filename = path.join(root, file);
    const bytes = fs.existsSync(filename) ? fs.readFileSync(filename) : Buffer.alloc(0);
    const preserved = bytes.length >= original.bytes && sha256(bytes.subarray(0, original.bytes)) === original.sha256;
    if (!preserved) changed.push(`${file}: original report was not preserved as a prefix`);
    return { file, preserved, originalBytes: original.bytes, appendedBytes: Math.max(0, bytes.length - original.bytes) };
  });
  return { baseCommit: baseline.baseCommit, baselineSha256: sha256(baselineBytes),
    historicalProtectedFiles: Object.keys(baseline.protectedFiles).length,
    protectedFiles: protectedFiles.length, unchangedHistoricalFiles: protectedFiles.filter(file => file.preserved && file.basis === 'unchanged historical baseline').length,
    exactReviewedFiles: protectedFiles.filter(file => file.preserved && file.basis === 'exact reviewed revision').length,
    revisions, appendOnly, changed, files: protectedFiles, reviewedRemovals, retiredPageFiles, publicPageFiles: pageFiles,
    pageInventoryPreserved, outcome: changed.length ? 'fail' : 'pass' };
}

if (require.main === module) {
  try {
    const report = verifyPreservation();
    fs.mkdirSync(path.join(repositoryRoot, 'reports'), { recursive: true });
    fs.writeFileSync(path.join(repositoryRoot, 'reports/preservation-check.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(`Preservation: ${report.unchangedHistoricalFiles} historical files unchanged; ${report.exactReviewedFiles} exact reviewed files; ${report.changed.length} failures; public page inventory ${report.pageInventoryPreserved ? (report.retiredPageFiles.length ? 'matches reviewed removals' : 'unchanged') : 'REVIEW'}.`);
    for (const file of report.changed) console.error('FAIL', file);
    process.exitCode = report.changed.length ? 1 : 0;
  } catch (error) {
    console.error(`Preservation could not be verified: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { verifyPreservation };
