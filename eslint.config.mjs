import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import globals from 'globals';

// Explicit supported plugins rather than eslint-config-next's React/import
// bundle, whose current peer range still excludes ESLint 10. No peer overrides.
export default defineConfig([
  globalIgnores(['.next/**', 'out/**', '.cache/**', '.wrangler/**', 'reports/**', 'test-results/**', 'playwright-report/**', 'next-env.d.ts']),
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': hooks, '@next/next': next },
    rules: {
      ...hooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      // Native anchors and dimensioned images are intentional for static Pages.
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      // Existing automatic-JSX-runtime imports are harmless and need not churn
      // protected editorial modules merely to remove the React namespace.
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    },
  },
  {
    files: ['**/*.cjs'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]);
