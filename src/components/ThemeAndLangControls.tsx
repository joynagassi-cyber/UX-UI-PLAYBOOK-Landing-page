'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Locale } from '@/i18n/content';

interface ControlsProps {
  locale: Locale;
  themeDarkLabel: string;
  themeLightLabel: string;
  switchLangTitle: string;
}

export function ThemeAndLangControls({
  locale,
  themeDarkLabel,
  themeLightLabel,
  switchLangTitle,
}: ControlsProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') {
      setTheme(current);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
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
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <div className="nav-actions">
      <div className="lang-switch" role="group" aria-label="Language edition">
        <a
          href="/fr"
          hrefLang="fr"
          lang="fr"
          onClick={() => handleLangClick('fr')}
          className={`lang-btn ${locale === 'fr' ? 'active' : ''}`}
          aria-current={locale === 'fr' ? 'page' : undefined}
          title={locale === 'en' ? switchLangTitle : 'Édition française (148 pages)'}
        >
          FR
        </a>
        <a
          href="/en"
          hrefLang="en"
          lang="en"
          onClick={() => handleLangClick('en')}
          className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
          aria-current={locale === 'en' ? 'page' : undefined}
          title={locale === 'fr' ? switchLangTitle : 'English edition (139 pages)'}
        >
          EN
        </a>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="theme-btn"
        aria-label={theme === 'dark' ? themeDarkLabel : themeLightLabel}
        title={theme === 'dark' ? themeDarkLabel : themeLightLabel}
      >
        {theme === 'dark' ? (
          <>
            <Sun size={15} aria-hidden="true" />
            <span className="theme-btn-label">LIGHT</span>
          </>
        ) : (
          <>
            <Moon size={15} aria-hidden="true" />
            <span className="theme-btn-label">OLED</span>
          </>
        )}
      </button>
    </div>
  );
}
