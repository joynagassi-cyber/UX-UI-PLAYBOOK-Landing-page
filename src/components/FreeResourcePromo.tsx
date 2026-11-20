import { Icon } from '@/components/Icon';
import type { Locale } from '@/i18n/content';
import { FREE_UI } from '@/i18n/free-resource';
import { FREE_RESOURCE_PATH } from '@/lib/free-resource-config';

export function FreeResourcePromo({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = FREE_UI[locale];
  return (
    <aside className={`free-promo${compact ? ' free-promo-compact' : ''}`} aria-labelledby="free-promo-title">
      <div className="free-promo-copy">
        <div className="mono sec-kicker">{t.promoKicker}</div>
        <h2 id="free-promo-title">{t.promoTitle}</h2>
        <p>{t.promoText}</p>
        <a className="btn ghost" href={`/${locale}${FREE_RESOURCE_PATH}`}>
          <Icon name="book-open" size="sm" />
          <span>{t.promoLink}</span>
          <Icon name="arrow-right" size="sm" />
        </a>
        <span className="free-promo-note">{t.language}</span>
      </div>
      {!compact && (
        <div className="free-promo-image">
          <img src={`/images/free-directory/cover-${locale}.jpg`} width={1280} height={720} alt={t.coverAlt} loading="lazy" />
        </div>
      )}
    </aside>
  );
}
