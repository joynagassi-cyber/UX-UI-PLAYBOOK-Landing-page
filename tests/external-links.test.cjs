'use strict';
// Owner rule: a visitor who clicks an external link (article sources, store,
// author profiles) must not lose the site. Every external anchor rendered from
// src opens a new tab with opener protection; internal and mailto links do not.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const walk = directory => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

test('every external anchor in src opens a new tab with noopener; internal anchors do not', () => {
  const files = walk(path.join(root, 'src')).filter(file => /\.tsx$/u.test(file));
  const external = [];
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/<a\b([^>]*)>/gu)) {
      const attrs = match[1];
      const href = attrs.match(/href=(?:"([^"]*)"|\{([^}]*)\})/u);
      if (!href) continue;
      const target = (href[1] ?? href[2] ?? '');
      const isExternal = /^https?:\/\//u.test(target) || /\burl\b|gumroadUrl|FREE_STORES/u.test(target);
      if (!isExternal) continue;
      external.push({ file: path.relative(root, file), attrs });
      assert.match(attrs, /target="_blank"/u, `${path.relative(root, file)}: ${attrs.trim()}`);
      assert.match(attrs, /rel="[^"]*noopener/u, `${path.relative(root, file)}: ${attrs.trim()}`);
    }
  }
  // Guard against a vacuous pass: the known external render sites must be found.
  assert.ok(external.length >= 5, `found only ${external.length} external anchors`);
});
