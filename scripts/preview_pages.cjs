#!/usr/bin/env node
// Backwards-compatible entry for older local instructions; it does not run Pages.
console.warn('preview:pages is a legacy alias. This repository now previews the Worker; prefer npm run preview:worker.');
require('./preview_worker.cjs');
