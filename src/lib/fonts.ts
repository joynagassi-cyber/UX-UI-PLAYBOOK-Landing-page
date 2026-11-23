import localFont from 'next/font/local';

export const domine = localFont({
  src: [
    { path: '../fonts/domine-latin.woff2', weight: '400 700', style: 'normal' },
    { path: '../fonts/domine-latin-ext.woff2', weight: '400 700', style: 'normal' },
  ],
  variable: '--font-domine',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
