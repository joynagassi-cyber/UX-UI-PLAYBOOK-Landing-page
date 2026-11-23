#!/usr/bin/env node
/** Render social previews from the same editorial data as the site, without book-page scans. */
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { chromium } = require('playwright');
const icons = require('lucide-react');

const { loadData, root } = require('./content-data.cjs');
const catalogue = loadData('src/i18n/article-catalog.json');
const { CONTENT } = loadData('src/i18n/content.ts');
const { playbookPages } = loadData('src/lib/playbook-edition.ts');
const ARTICLES = {
  fr: loadData('src/i18n/articles/fr.ts').ARTICLES_FR,
  en: loadData('src/i18n/articles/en.ts').ARTICLES_EN,
};
const font = fs.readFileSync(path.join(root, 'src/fonts/domine-latin.woff2')).toString('base64');
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const icon = (name, size = 28) => renderToStaticMarkup(React.createElement(icons[name], { width: size, height: size, strokeWidth: 3, 'aria-hidden': true }));

function artPanel(locale, index) {
  const fr = locale === 'fr';
  if (index === -1) {
    return `<div class="panel-heading">${fr ? 'Dans le téléchargement' : 'In the download'}</div>
      <div class="file-row">${icon('BookOpen', 32)}<div><strong>${playbookPages(locale)} pages</strong><span>${fr ? 'Manuel PDF' : 'PDF manual'}</span></div></div>
      <div class="file-row">${icon('FileText', 32)}<div><strong>${fr ? '12 fiches A4' : '12 A4 worksheets'}</strong><span>${fr ? 'Kit de 26 pages' : '26-page kit'}</span></div></div>
      <div class="file-row">${icon('Terminal', 32)}<div><strong>${fr ? '21 fichiers' : '21 files'}</strong><span>${fr ? 'Tokens, gabarits, scanner' : 'Tokens, templates, scanner'}</span></div></div>`;
  }
  if (index === 0) {
    const labels = fr ? ['Vide', 'Chargement', 'Idéal', 'Partiel', 'Erreur'] : ['Empty', 'Loading', 'Ideal', 'Partial', 'Error'];
    return `<div class="panel-heading">${fr ? 'États à préparer' : 'States to prepare'}</div>${labels.map((label, i) => `<div class="state-row">${icon(['Inbox', 'LoaderCircle', 'CheckCircle', 'Layers', 'AlertTriangle'][i])}<span>${label}</span></div>`).join('')}`;
  }
  if (index === 1) {
    return `<div class="panel-heading">${fr ? 'Valeur → rôle → composant' : 'Value → role → component'}</div><div class="token-value"><span class="swatch"></span>#c2320a</div><div class="token-name">--color-accent</div><div class="example-button">${fr ? 'Enregistrer' : 'Save changes'}</div><div class="theme-row"><span>${icon('Sun', 25)} ${fr ? 'Clair' : 'Light'}</span><span>${icon('Moon', 25)} OLED</span></div>`;
  }
  if (index === 3) {
    return `<div class="panel-heading">${fr ? 'Atelier · application fictive' : 'Atelier · fictional application'}</div>
      <div class="comparison-offer">${icon('Bike', 36)}<div><strong>${fr ? 'Entretien vélo' : 'Bicycle service'}</strong><span>${fr ? '39 € · 45 min' : '€39 · 45 min'}</span></div></div>
      <div class="comparison-contribution"><b>UX</b><span>${fr ? 'Parcours et reprise' : 'Journey and recovery'}</span></div>
      <div class="comparison-contribution"><b>UI</b><span>${fr ? 'Composants et états' : 'Components and states'}</span></div>
      <div class="comparison-contribution"><b>Product</b><span>${fr ? 'Offre et contraintes' : 'Offer and constraints'}</span></div>`;
  }
  return `<div class="panel-heading">${fr ? 'Le pipeline de revue' : 'The review pipeline'}</div>${['brief.md', 'screens.md', 'wireframe.html', 'review.md', 'handoff.md'].map((file, i) => `<div class="pipeline-row"><b>${i + 1}</b><span>${file}</span></div>`).join('')}`;
}

function htmlFor(locale, index) {
  const c = CONTENT[locale];
  const article = index >= 0 ? ARTICLES[locale][index] : null;
  if (article && !catalogue[article.slug]) throw new Error(`Missing social catalogue entry: ${article.slug}`);
  const fr = locale === 'fr';
  const title = article ? article.title : c.hero.titleBefore + c.hero.titleAccent + c.hero.titleAfter;
  const summary = article ? article.subtitle : fr
    ? 'Manuel UX, UI et Product Design, fiches A4 et fichiers pour préparer vos écrans et leur revue.'
    : 'A UX, UI and Product Design manual, A4 worksheets and files for preparing screens and reviews.';
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><style>
    @font-face {font-family: Domine; src:url(data:font/woff2;base64,${font}) format('woff2'); font-weight:400 700; font-style:normal; font-display:block}
    *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#000;color:#f4f1eb;font-family:Domine,Georgia,serif}
    .canvas{height:630px;border-top:6px solid #ff6b47;padding:36px 48px 32px;display:flex;flex-direction:column}
    .brand{display:flex;align-items:center;justify-content:space-between;font-size:24px;font-weight:700;letter-spacing:-.02em}
    .brand-name{display:flex;align-items:center;gap:12px}.brand svg{color:#ff6b47}.locale{font-size:17px;font-weight:400;letter-spacing:0;color:#c8c5c0}
    main{display:grid;grid-template-columns:minmax(0,1fr) 344px;gap:38px;align-items:center;flex:1;min-height:0;padding:24px 0}
    .kicker{font-size:16px;color:#ff9b7d;font-weight:700;margin-bottom:18px}h1{font-size:44px;line-height:1.18;font-weight:700;letter-spacing:-.035em;margin:0 0 18px;max-width:680px}
    h1.landing{font-size:56px}p{font-size:21px;line-height:1.5;color:#c8c5c0;margin:0;max-width:660px}
    .panel{padding:23px;border:1px solid #44423e;border-radius:16px;background:#111110;min-height:348px;display:flex;flex-direction:column;justify-content:center;gap:12px}
    .panel-heading{font-size:16px;font-weight:700;color:#c8c5c0;margin-bottom:6px}.file-row{display:flex;align-items:center;gap:15px;padding:13px 0;border-bottom:1px solid #34322f}.file-row:last-child{border:0}.file-row svg{color:#ff9b7d;flex-shrink:0}.file-row strong{display:block;font-size:25px}.file-row span{display:block;font-size:15px;color:#c8c5c0;margin-top:6px}
    .state-row{display:flex;align-items:center;gap:15px;padding:8px 12px;background:#22211f;border:1px solid #44423e;border-radius:8px;font-size:20px}.state-row svg{color:#ff9b7d}
    .token-value{display:flex;align-items:center;gap:14px;font-size:27px;padding:12px 0}.swatch{width:42px;height:42px;background:#c2320a;border:1px solid #ff9b7d;border-radius:10px}.token-name{font-size:19px;border:1px solid #44423e;border-radius:8px;padding:14px}.example-button{font-size:21px;text-align:center;padding:17px;background:#ff6b47;color:#17100d;border-radius:8px;font-weight:700}.theme-row{display:flex;gap:12px;margin-top:10px}.theme-row>span{display:flex;align-items:center;justify-content:center;gap:9px;font-size:17px;border:1px solid #44423e;border-radius:8px;padding:13px;flex:1}.theme-row>span:first-child{background:#faf8f4;color:#17100d}
    .pipeline-row{display:flex;align-items:center;gap:12px;font-size:20px;padding:7px 0}.pipeline-row b{display:grid;place-items:center;background:#3e2117;border:1px solid #ff9b7d;color:#ffbd9f;border-radius:50%;width:34px;height:34px;font-size:17px}.pipeline-row span{overflow-wrap:anywhere}
    .comparison-offer{display:flex;gap:12px;align-items:center;border:1px solid #9f9fac;background:#17171d;border-radius:12px;padding:16px;margin-bottom:8px}.comparison-offer svg{flex-shrink:0;color:#ff9b7d}.comparison-offer strong{font-size:20px;display:block;line-height:1.4}.comparison-offer span{font-size:17px;display:block;color:#c8c5c0;margin-top:8px}.comparison-contribution{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid #44423e}.comparison-contribution b{font-size:18px;color:#ff9b7d}.comparison-contribution span{font-size:14px;color:#f4f1eb}
    footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #44423e;padding-top:17px;font-size:16px;color:#c8c5c0}.footer-title{color:#f4f1eb;font-weight:700}
  </style></head><body><div class="canvas">
    <header class="brand"><span class="brand-name">${icon('BookOpen', 32)}UX/UI Playbook</span><span class="locale">${fr ? 'Édition française' : 'English edition'} · 2026</span></header>
    <main><section><div class="kicker">${escape(article ? article.category + ' · ' + (fr ? 'ARTICLE' : 'ARTICLE') : fr ? 'LE LIVRE ET LES FICHIERS' : 'THE BOOK AND FILES')}</div><h1 class="${article ? '' : 'landing'}">${escape(title)}</h1><p>${escape(summary)}</p></section><aside class="panel">${artPanel(locale,index)}</aside></main>
    <footer><span class="footer-title">${article ? (fr ? 'Exemples, schémas et modèles' : 'Examples, diagrams and templates') : fr ? '29 USD · Paiement unique' : '$29 USD · One-time payment'}</span><span>${article ? escape(article.readTime) : fr ? `Joy N. · ${playbookPages(locale)} pages + kit et archive` : `Joy N. · ${playbookPages(locale)} pages + kit and archive`}</span></footer>
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    for (const locale of ['fr','en']) {
      for (const index of process.argv.includes('--landing-only') ? [-1] : [-1, ...ARTICLES[locale].map((_, index) => index)]) {
        await page.setContent(htmlFor(locale,index), { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('h1,p,.panel,footer')).some(element => {
          const box=element.getBoundingClientRect();
          return box.top<0 || box.bottom>630 || element.scrollHeight>element.clientHeight+1;
        }));
        if (overflow) throw new Error(`Social preview overflow: ${locale}/${index}`);
        const filename = index === -1 ? `og-${locale}.jpg` : ARTICLES[locale][index].ogImage.slice(1);
        await page.screenshot({path:path.join(root,'public',filename),type:'jpeg',quality:92});
        console.log(filename);
      }
    }
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
