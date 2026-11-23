const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { verifyPreservation } = require('../scripts/check_preservation.cjs');
const sha = value => createHash('sha256').update(value).digest('hex');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playbook-preservation-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file, text) => { const name = path.join(root, file); fs.mkdirSync(path.dirname(name), { recursive: true }); fs.writeFileSync(name, text); };
  const original = 'historical asset\n';
  write('public/asset.txt', original);
  write('src/app/[locale]/page.tsx', 'page');
  write('docs/review.md', 'Documented, narrowly scoped revision.');
  write('docs/history.md', 'Historical report.\n');
  const baseline = {
    baseCommit: 'historical-commit', protectedFiles: { 'public/asset.txt': sha(original) },
    initialTrackedPaths: ['src/app/[locale]/page.tsx'],
    appendOnlyFiles: { 'docs/history.md': { bytes: 19, sha256: sha('Historical report.\n') } },
  };
  const baselineBytes = JSON.stringify(baseline);
  write('docs/technical-baseline.json', baselineBytes);
  const ledger = { schemaVersion: 1, baselineSha256: sha(baselineBytes), revisions: [] };
  const save = () => write('docs/preservation-revisions.json', JSON.stringify(ledger));
  save();
  return { root, write, ledger, save, original, revision: (before, after) => ({
    id: 'edition-update', reason: 'Requested edition change', reviewReport: 'docs/review.md',
    files: [{ path: 'public/asset.txt', fromSha256: sha(before), toSha256: sha(after), reason: 'New edition copy' }],
  }) };
}

test('preservation accepts untouched history and appended report text', t => {
  const f = fixture(t);
  f.write('docs/history.md', 'Historical report.\n\nNew evidence.');
  const report = verifyPreservation(f.root);
  assert.equal(report.outcome, 'pass');
  assert.equal(report.unchangedHistoricalFiles, 1);
  assert.equal(report.exactReviewedFiles, 0);
  assert.equal(report.pageInventoryPreserved, true);
});

test('preservation accepts a documented exact chain without resetting the historical baseline', t => {
  const f = fixture(t);
  const intermediate = 'already merged copy\n', current = 'new edition\n';
  const first = f.revision(f.original, intermediate); first.id = 'merged-pr';
  f.ledger.revisions.push(first, f.revision(intermediate, current));
  f.write('public/asset.txt', current);
  f.save();
  const report = verifyPreservation(f.root);
  assert.equal(report.outcome, 'pass');
  assert.equal(report.revisions.length, 2);
  assert.equal(report.exactReviewedFiles, 1);
});

test('preservation still rejects any future drift in a reviewed file', t => {
  const f = fixture(t);
  f.ledger.revisions.push(f.revision(f.original, 'approved revision'));
  f.save();
  f.write('public/asset.txt', 'approved revision plus an unreviewed claim');
  assert.ok(verifyPreservation(f.root).changed.some(item => item.includes('unreviewed content change')));
});

test('preservation rejects removal of an originally protected file', t => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.root, 'public/asset.txt'));
  assert.ok(verifyPreservation(f.root).changed.some(item => item.includes('missing protected file')));
});

test('preservation rejects a stale predecessor rather than a whole-file waiver', t => {
  const f = fixture(t);
  f.ledger.revisions.push(f.revision('not the original bytes', 'new edition'));
  f.write('public/asset.txt', 'new edition'); f.save();
  const report = verifyPreservation(f.root);
  assert.equal(report.outcome, 'fail');
  assert.ok(report.changed.some(item => item.includes('Invalid revision chain')));
});

test('preservation rejects a baseline rewrite even if the rewritten file matches current content', t => {
  const f = fixture(t);
  const baselinePath = path.join(f.root, 'docs/technical-baseline.json');
  const baseline = JSON.parse(fs.readFileSync(baselinePath));
  baseline.protectedFiles['public/asset.txt'] = sha('new edition');
  f.write('public/asset.txt', 'new edition'); f.write('docs/technical-baseline.json', JSON.stringify(baseline));
  assert.ok(verifyPreservation(f.root).changed.includes('Historical preservation baseline was changed'));
});

test('preservation rejects undocumented revisions and duplicate revision identities', t => {
  const f = fixture(t);
  const revision = f.revision(f.original, 'new edition');
  revision.reviewReport = 'docs/nonexistent-review.md';
  f.ledger.revisions.push(revision); f.save();
  assert.equal(verifyPreservation(f.root).outcome, 'fail');
  revision.reviewReport = 'docs/review.md';
  f.ledger.revisions.push({ ...revision }); f.save();
  assert.ok(verifyPreservation(f.root).changed.some(item => item.includes('Invalid or undocumented revision')));
});

test('preservation can protect new preview files by exact digest, never a folder-wide exclusion', t => {
  const f = fixture(t);
  const revision = f.revision(f.original, 'new edition');
  revision.introducedFiles = [{ path: 'public/new-excerpt.webp', sha256: sha('new excerpt'), reason: 'New glossary page' }];
  f.ledger.revisions.push(revision);
  f.write('public/asset.txt', 'new edition'); f.write('public/new-excerpt.webp', 'new excerpt'); f.save();
  assert.equal(verifyPreservation(f.root).outcome, 'pass');
  f.write('public/new-excerpt.webp', 'wrong excerpt');
  assert.equal(verifyPreservation(f.root).outcome, 'fail');
});

test('preservation rejects a new public page or an exposed private draft independently of content hashes', t => {
  const f = fixture(t);
  f.write('src/app/[locale]/new-article/page.tsx', 'unrequested page');
  let report = verifyPreservation(f.root);
  assert.equal(report.pageInventoryPreserved, false);
  assert.ok(report.changed.includes('Public page route inventory changed'));
  fs.rmSync(path.join(f.root, 'src/app/[locale]/new-article'), { recursive: true });
  f.write('out/docs/drafts/USABILITY_TEST_PROTOCOL_FR.md', 'private');
  report = verifyPreservation(f.root);
  assert.equal(report.pageInventoryPreserved, true);
  assert.ok(report.changed.includes('Internal draft exposed in export'));
});

test('preservation rejects edits to the historical prefix of append-only reports', t => {
  const f = fixture(t);
  f.write('docs/history.md', 'Rewritten report.\n');
  const report = verifyPreservation(f.root);
  assert.equal(report.outcome, 'fail');
  assert.equal(report.appendOnly[0].preserved, false);
});
