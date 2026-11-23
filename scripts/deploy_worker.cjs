#!/usr/bin/env node
// One deployment target only. Never bypass Workers Builds account/tag checks.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ORIGINAL_WORKER_NAME = 'joyccelight-playbook';
const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'wrangler.jsonc');

function deploymentArgs(config, environment, args) {
  if (config?.name !== ORIGINAL_WORKER_NAME) {
    throw new Error(`wrangler.name must remain ${ORIGINAL_WORKER_NAME}.`);
  }
  // Wrangler gives this CI variable precedence even over an explicit --name.
  // Stop instead of unsetting it, changing the target, or bypassing CI identity.
  if (environment.WRANGLER_CI_OVERRIDE_NAME !== undefined
    && environment.WRANGLER_CI_OVERRIDE_NAME !== ORIGINAL_WORKER_NAME) {
    throw new Error(`Workers Builds targets another name. Connect the build to ${ORIGINAL_WORKER_NAME}; automatic renaming is refused.`);
  }
  if (environment.CLOUDFLARE_ENV) {
    throw new Error('CLOUDFLARE_ENV is not allowed: this command targets only the original top-level Worker.');
  }
  // Deliberately narrow: callers cannot append --name, --env, --config, a
  // different script or other flags that change the pinned deployment target.
  if (args.length && !(args.length === 1 && args[0] === '--dry-run')) {
    throw new Error('Only --dry-run is accepted. Worker name, environment and config overrides are refused.');
  }
  return [
    'deploy', '--config', configPath, '--name', ORIGINAL_WORKER_NAME,
    ...(args.length ? ['--dry-run', '--outdir', path.join(root, '.cache/worker-dry-run')] : []),
  ];
}

if (require.main === module) {
  try {
    const parsed = require('typescript').parseConfigFileTextToJson(configPath, fs.readFileSync(configPath, 'utf8'));
    if (parsed.error) throw new Error('Invalid wrangler.jsonc; deployment stopped.');
    const args = deploymentArgs(parsed.config, process.env, process.argv.slice(2));
    const result = spawnSync(process.execPath, [path.join(root, 'node_modules/wrangler/bin/wrangler.js'), ...args], {
      cwd: root, stdio: 'inherit', env: process.env,
    });
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
  } catch (error) {
    console.error(`[worker-identity] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { ORIGINAL_WORKER_NAME, deploymentArgs };
