#!/usr/bin/env node
// A local-only wrapper around the documented `wrangler pages dev out` command.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(root, 'out/fr.html'))) {
  console.error('Static export missing. Run npm run build before npm run preview:pages.');
  process.exit(1);
}
// Miniflare otherwise invents a US location or fetches geo data from the network.
// A fresh neutral local fixture makes CF-IPCountry integration tests deterministic.
// Real request.cf.country precedence is additionally covered by the pure unit tests.
const cfPath = path.join(root, '.wrangler', 'cf-local.json');
fs.mkdirSync(path.dirname(cfPath), { recursive: true });
fs.writeFileSync(cfPath, '{}\n');
const child = spawn(process.execPath, [
  path.join(root, 'node_modules/wrangler/bin/wrangler.js'),
  'pages', 'dev', 'out', '--ip', '0.0.0.0', '--port', '3100',
  '--inspector-port', '0', '--show-interactive-dev-session', 'false',
], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, WRANGLER_SEND_METRICS: 'false', CLOUDFLARE_CF_FETCH_ENABLED: 'true', CLOUDFLARE_CF_FETCH_PATH: cfPath },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', (error) => { console.error(error); process.exitCode = 1; });
child.on('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
