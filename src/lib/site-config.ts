import policy from '@/config/site-policy.json';

// Only a deliberate build-time production origin. Never infer it from a request,
// a hosting-provider environment variable, localhost or an ephemeral preview.
export function validateSiteOrigin(value: string): string {
  const message = 'NEXT_PUBLIC_SITE_URL must be a public HTTPS origin without credentials, port, path, query or fragment; preview and local origins are not canonical origins.';
  let parsed: URL;
  try { parsed = new URL(value); }
  catch { throw new Error(message); }
  const host = parsed.hostname.toLowerCase();
  const localOrPreview = /^(?:localhost|0\.0\.0\.0|127\..*|\[.*\])$/.test(host)
    || /\.(?:localhost|local|internal|test|invalid)$/.test(host)
    || host.endsWith('.e2b.app') || host.endsWith('.vercel.app')
    || host.endsWith('.joyccelight-playbook.pages.dev');
  if (value !== value.trim() || parsed.protocol !== 'https:' || parsed.username || parsed.password
    || parsed.port || parsed.pathname !== '/' || parsed.search || parsed.hash
    || !host.includes('.') || host.endsWith('.') || localOrPreview || /^\d+(?:\.\d+){3}$/.test(host)) {
    // Do not echo the supplied value: a misconfigured URL could contain a secret.
    throw new Error(message);
  }
  return parsed.origin;
}

export const SITE_URL = validateSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? policy.defaultOrigin);
