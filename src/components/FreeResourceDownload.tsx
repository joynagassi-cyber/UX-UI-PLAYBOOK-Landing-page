import { Icon } from '@/components/Icon';
import { GumroadButton } from '@/components/GumroadButton';
import type { Locale } from '@/i18n/content';
import { FREE_MANIFEST, FREE_UI, resourceSize } from '@/i18n/free-resource';
import { FREE_GUMROAD_URL } from '@/lib/free-resource-config';

export function FreeResourceDownload({ locale }: { locale: Locale }) {
  const t = FREE_UI[locale];
  return (
    <div className="resource-download" data-free-download={FREE_GUMROAD_URL ? 'gumroad' : 'direct'}>
      <div className="resource-actions">
        {FREE_GUMROAD_URL ? (
          <GumroadButton href={FREE_GUMROAD_URL} className="btn primary free-download-primary">
            <Icon name="arrow-up-right" size="sm" /><span>{t.gumroad}</span>
          </GumroadButton>
        ) : (
          <a href={FREE_MANIFEST.files.archive.path} download className="btn primary free-download-primary">
            <Icon name="folder-git" size="sm" /><span>{t.download}</span>
          </a>
        )}
        <a className="btn ghost" href={FREE_MANIFEST.files.pdf.path} target="_blank" rel="noopener noreferrer" hrefLang="fr" type="application/pdf">
          <Icon name="file-text" size="sm" /><span>{t.viewPdf}</span>
        </a>
      </div>
      <p className="resource-download-note">{FREE_GUMROAD_URL ? t.gumroadNote : t.directNote}</p>
      <p className="resource-file-meta">ZIP · {resourceSize(FREE_MANIFEST.files.archive.bytes, locale)} · {t.language}</p>
    </div>
  );
}
