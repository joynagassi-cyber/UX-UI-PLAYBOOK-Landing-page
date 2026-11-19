// Evaluated at build time; no hosting-provider discovery or request-time origin.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://joyccelight-playbook.pages.dev';
const parsed = new URL(configuredUrl);
if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password
  || parsed.pathname !== '/' || parsed.search || parsed.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials, query or fragment.');
}
export const SITE_URL = parsed.origin;
