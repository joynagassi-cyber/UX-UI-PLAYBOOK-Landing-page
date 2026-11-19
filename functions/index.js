import { redirectToLocale } from '../lib/locale-routing.mjs';

export function onRequest({ request }) {
  return redirectToLocale(request, '');
}
