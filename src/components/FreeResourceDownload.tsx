import { Icon } from '@/components/Icon';
import { GumroadButton } from '@/components/GumroadButton';
import type { Locale } from '@/i18n/content';
import { FREE_UI, freeResourceManifest, resourceSize } from '@/i18n/free-resource';
import { FREE_GUMROAD_URLS } from '@/lib/free-resource-config';

export function FreeResourceDownload({ locale }: { locale: Locale }) {
  const t = FREE_UI[locale];
  const manifest = freeResourceManifest(locale);
  const gumroadUrl = FREE_GUMROAD_URLS[locale];
  return (
    <div className="resource-download" data-free-download={gumroadUrl ? 'gumroad' : 'direct'}>
      <div className="resource-actions">
        {gumroadUrl ? (
          <GumroadButton href={gumroadUrl} className="btn primary free-download-primary">
            <Icon name="arrow-up-right" size="sm" /><span>{t.gumroad}</span>
          </GumroadButton>
        ) : (
          <a href={manifest.files.archive.path} download hrefLang={locale} className="btn primary free-download-primary">
            <Icon name="folder-git" size="sm" /><span>{t.download}</span>
          </a>
        )}
        <a className="btn ghost" href={manifest.files.pdf.path} target="_blank" rel="noopener noreferrer" hrefLang={locale} type="application/pdf">
          <Icon name="file-text" size="sm" /><span>{t.viewPdf}</span>
        </a>
      </div>
      <p className="resource-download-note">{gumroadUrl ? t.gumroadNote : t.directNote}</p>
      <p className="resource-file-meta">ZIP · {resourceSize(manifest.files.archive.bytes, locale)} · {t.language}</p>
    </div>
  );
}
