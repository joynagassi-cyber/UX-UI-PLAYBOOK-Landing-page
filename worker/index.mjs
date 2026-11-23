import { redirectToLocale } from '../lib/locale-routing.mjs';

// Keep language negotiation limited to the three former Pages Function routes.
// Explicit FR/EN pages, files and unknown paths must reach the static asset
// service unchanged; never turn a missing asset into a language redirect or SPA.
export function isNegotiatedPath(pathname) {
  return pathname === '/' || pathname === '/articles' || pathname.startsWith('/articles/');
}

export default {
  fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (isNegotiatedPath(pathname)) {
      return redirectToLocale(request, pathname === '/' ? '' : pathname);
    }
    return env.ASSETS.fetch(request);
  },
};
