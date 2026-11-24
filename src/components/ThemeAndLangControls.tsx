'use client';

import React, { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { browserTheme, serverTheme, subscribeTheme } from '@/lib/browser-stores';
import { Icon } from '@/components/Icon';
import type { Locale } from '@/i18n/content';

interface ControlsProps {
  locale: Locale;
  themeDarkLabel: string;
  themeLightLabel: string;
  switchLangTitle: string;
}

function swapLocaleInPath(pathname: string | null, targetLocale: Locale): string {
  if (!pathname) return `/${targetLocale}`;
  const parts = pathname.split('/');
  if (parts[1] === 'fr' || parts[1] === 'en') {
    parts[1] = targetLocale;
    return parts.join('/') || `/${targetLocale}`;
  }
  return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function ThemeAndLangControls({
  locale,
  themeDarkLabel,
  themeLightLabel,
  switchLangTitle,
}: ControlsProps) {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeTheme, browserTheme, serverTheme);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('playbook-theme', next);
    } catch {
      // ignore storage errors
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', next === 'dark' ? '#000000' : '#FAF8F4');
    }
  };

  const handleLangClick = (targetLocale: Locale) => {
    try {
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax${secure}`;
    } catch {
      // An explicit localized link must still work when cookie storage is denied.
    }
  };

  const frHref = swapLocaleInPath(pathname, 'fr');
  const enHref = swapLocaleInPath(pathname, 'en');

  const langLabel = locale === 'fr' ? 'Langue de l’édition' : 'Language edition';
  const closeOnEscape = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key !== 'Escape') return;
    const details = event.currentTarget;
    if (!details.open) return;
    details.open = false;
    details.querySelector('summary')?.focus();
  };

  return (
    <div className="nav-actions">
      <details className="lang-menu" onKeyDown={closeOnEscape}>
        <summary className="lang-menu-btn" aria-label={langLabel} title={switchLangTitle}>
          <Icon name="globe" size="sm" />
          <Icon name="chevron-down" size="sm" className="lang-menu-chevron" />
        </summary>
        <div className="lang-menu-panel" role="group" aria-label={langLabel}>
          <a
            href={frHref}
            hrefLang="fr"
            lang="fr"
            onClick={() => handleLangClick('fr')}
            className={`lang-menu-link ${locale === 'fr' ? 'active' : ''}`}
            aria-current={locale === 'fr' ? 'page' : undefined}
          >
            <span>Français</span>
            {locale === 'fr' ? <Icon name="check" size="sm" /> : null}
          </a>
          <a
            href={enHref}
            hrefLang="en"
            lang="en"
            onClick={() => handleLangClick('en')}
            className={`lang-menu-link ${locale === 'en' ? 'active' : ''}`}
            aria-current={locale === 'en' ? 'page' : undefined}
          >
            <span>English</span>
            {locale === 'en' ? <Icon name="check" size="sm" /> : null}
          </a>
        </div>
      </details>

      <button
        type="button"
        onClick={toggleTheme}
        className="theme-btn"
        aria-label={theme === 'dark' ? themeDarkLabel : themeLightLabel}
        title={theme === 'dark' ? themeDarkLabel : themeLightLabel}
      >
        {theme === 'dark' ? (
          <>
            <Icon name="sun" size="sm" />
            <span className="theme-btn-label">LIGHT</span>
          </>
        ) : (
          <>
            <Icon name="moon" size="sm" />
            <span className="theme-btn-label">OLED</span>
          </>
        )}
      </button>
    </div>
  );
}
