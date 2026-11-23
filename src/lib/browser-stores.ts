// useSyncExternalStore snapshots keep server HTML deterministic while reflecting
// browser-only values after hydration, without setState-in-effect cascades.
export const serverSearch = () => '';
export const browserSearch = () => window.location.search;
export function subscribeSearch(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

export const serverTheme = (): 'dark' | 'light' => 'dark';
export const browserTheme = (): 'dark' | 'light' => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
export function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
