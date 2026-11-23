import { defineConfig, type ReporterDescription } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3100';
const reporters: ReporterDescription[] = [
  ['list'], ['json', { outputFile: 'reports/browser-check.json' }], ['html', { open: 'never' }],
];
// Expose exact assertion failures through the Checks API as well as artifacts.
if (process.env.GITHUB_ACTIONS) reporters.push(['github']);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  retries: 0,
  reporter: reporters,
  use: {
    baseURL,
    browserName: 'chromium',
    reducedMotion: 'reduce',
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: process.env.CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    } : {},
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'npm run preview:worker',
    env: { WRANGLER_SEND_METRICS: 'false' },
    url: `${baseURL}/fr`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
