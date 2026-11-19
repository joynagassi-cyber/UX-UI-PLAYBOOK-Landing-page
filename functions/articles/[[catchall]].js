import { redirectToLocale } from '../../lib/locale-routing.mjs';

export function onRequest({ request }) {
  // Unknown slugs receive one localized redirect, then the static 404, never another Function.
  return redirectToLocale(request, new URL(request.url).pathname);
}
