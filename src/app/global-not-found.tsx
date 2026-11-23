import type { Metadata } from 'next';
import { domine } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Page not found · Page introuvable | UX/UI Playbook',
  description: 'This page does not exist. Cette page n’existe pas. Retrouvez les éditions française et anglaise du UX/UI Playbook.',
  robots: { index: false, follow: true },
};

// One shared bilingual error document, not a new indexable content URL. It also
// handles unsupported locales and unknown nested paths in a static Pages export.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" className={domine.variable}>
      <body>
        <a className="sr-skip" href="#not-found">Skip to content · <span lang="fr">Aller au contenu</span></a>
        <main id="not-found" className="error-page wrap" tabIndex={-1}>
          <p className="mono">UX/UI Playbook · 404</p>
          <h1>Page not found</h1>
          <p>The address may be incorrect or the page may no longer exist.</p>
          <div lang="fr">
            <h2>Page introuvable</h2>
            <p>L’adresse est peut-être incorrecte ou la page n’existe plus.</p>
          </div>
          <nav aria-label="Choose an edition">
            <a className="btn primary" href="/en" hrefLang="en">English edition</a>
            <a className="btn ghost" href="/fr" hrefLang="fr" lang="fr">Édition française</a>
          </nav>
        </main>
      </body>
    </html>
  );
}
