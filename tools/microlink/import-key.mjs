#!/usr/bin/env node
// Copy a locally authorized key without putting it in arguments, output or browser code.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const target = path.join(root, '.env.local');
let staging;
try {
  execFileSync('git', ['check-ignore', '-q', '.env.local'], { cwd: root, stdio: 'ignore' });
  const tracked = execFileSync('git', ['ls-files', '--', '.env.local'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  // lstat also detects dangling symlinks, unlike existsSync followed by a check.
  const targetStat = fs.lstatSync(target, { throwIfNoEntry: false });
  if (tracked.trim() || (targetStat && !targetStat.isFile())) throw new Error('Unsafe target.');
  const config = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config/microlink/config.json'), 'utf8'));
  const key = config.apiKey;
  if (typeof key !== 'string' || !/^[A-Za-z0-9_-]{10,}$/.test(key)) throw new Error('Missing authorized key.');
  const previous = targetStat ? fs.readFileSync(target, 'utf8') : '';
  // Keep unrelated variables; remove duplicate/exported single-line assignments
  // so an older key cannot override the newly approved one when the env is read.
  const otherVariables = previous.replace(/^[\t ]*(?:export[\t ]+)?MICROLINK_API_KEY[\t ]*=.*(?:\r?\n|$)/gm, '');
  const next = `${otherVariables}${otherVariables && !otherVariables.endsWith('\n') ? '\n' : ''}MICROLINK_API_KEY=${key}\n`;
  // Atomic replacement: the new key is never written to an existing loose-mode
  // file or through a symlink. This staging name is also matched by .env*.local.
  staging = path.join(root, `.env.microlink-${randomUUID()}.local`);
  fs.writeFileSync(staging, next, { flag: 'wx', mode: 0o600 });
  fs.renameSync(staging, target);
  staging = undefined;
  console.log('Authorized Microlink key copied to ignored .env.local (0600). No key printed.');
} catch {
  console.error('No key copied. Run Microlink login in your own local terminal, then rerun this command. Ensure .env.local is untracked, ignored and not a symlink. Never paste a key into chat.');
  process.exitCode = 1;
} finally {
  if (staging) { try { fs.unlinkSync(staging); } catch { /* Never log private env contents. */ } }
}
