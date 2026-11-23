import edition from '../../products/playbook-2026/counts.json';

// Measured against the private source PDFs and ZIP. No paid file is published
// with the site. Reproduce with scripts/audit_playbook_edition.py; see the report.
export const PLAYBOOK_EDITION = edition;
export const PLAYBOOK_COUNTS = edition.counts;

export function playbookPages(locale: 'fr' | 'en'): number {
  return edition.editions[locale].pages;
}
