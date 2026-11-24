#!/usr/bin/env node
/** Build the complete English free product without modifying the existing French downloads. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const { loadData, root } = require('./content-data.cjs');
const { escape, icon, pdfCSS, categoryIcon, heading, sheet, marketingHTML } = require('./free_resource_layout.cjs');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { playbookPages } = loadData('src/lib/playbook-edition.ts');
const { CONTENT } = loadData('src/i18n/content.ts');
const paidStore = CONTENT['en'].gumroadUrl;
const { screenshotSheets, loadGallery, selectGalleryMode } = require('./free_resource_screenshots.cjs');
const catalog = require('../products/ui-ux-directory/en/catalogue.json');
// Explicit opt-in; missing or unreviewed PNGs fail before any deliverable is overwritten.
const galleryMode = selectGalleryMode(process.argv.slice(2));
const galleryOptions = { partial: galleryMode === 'partial' };
const galleryImages = galleryMode === 'none' ? [] : loadGallery(catalog, undefined, galleryOptions);
const screenshotGallery = galleryImages.length ? screenshotSheets(catalog, 'en', undefined, galleryOptions) : [];
const product = path.join(root, 'products/ui-ux-directory/en');
const marketing = path.join(product, 'marketing');
const work = path.join(root, '.cache/free-resource/en');
const pack = path.join(work, 'pack');
const downloads = path.join(root, 'products/ui-ux-directory/releases/en');
for (const dir of [work, pack, downloads, marketing, path.join(root, 'public/images/free-directory')]) fs.mkdirSync(dir, { recursive: true });
const count = catalog.entries.length;
const links = catalog.entries.reduce((sum, entry) => sum + entry.urls.length, 0);
const resourcePath = '/articles';
function tracked(suffix, medium) {
  const url = new URL(`/en${suffix}`, SITE_URL);
  url.search = new URLSearchParams({ utm_source: 'ui-ux-directory', utm_medium: medium, utm_campaign: 'free-resource' }).toString();
  return url.href;
}
const intro = 'A directory for comparing, choosing and documenting interface resources. It is for non-designers, developers and people working with AI agents. This is not a collection of reusable components or illustrations: the resources remain on their authors’ websites.';
const scope = 'The guide and worksheet are free. Listed services may offer paid features or conditional licenses. The 75 links are not 75 distinct tools and have not undergone an exhaustive availability audit. This edition offers starting points to verify; it does not promise business results, performance, accessibility conformance or error-free AI output.';
const rights = 'Text and layout: Joy N. / Joyccelight, 2026. You may read this guide, use it in personal or professional projects and adapt the decision worksheets for your team or clients. Website screenshots serve an editorial purpose and are not assets to extract or reuse. Do not resell the guide or republish it unchanged under your own name; share its download page instead. These terms apply only to this guide and grant no rights to the referenced websites, brands, fonts, icons, components or visuals. Their authors and licenses remain the authorities. No partnership or paid affiliation with the listed services is claimed. This guide is not legal advice.';
const steps = [
  ['Frame the need', 'Choose one screen, platform and important constraint. For example: a mobile form with readable errors and locally hosted fonts.'],
  ['Compare', 'Keep at most two options per category, using the same text, states and data. Keeping a resource you already know is also a valid choice.'],
  ['Check', 'Record the official URL, version, rights, attribution and costs. Do not send personal data or client files to a service without approval.'],
  ['Try it', 'Test empty, loading, error and success states; keyboard access, zoom, contrast and the narrowest screen. Measure loading in your project.'],
  ['Record', 'Complete the decision worksheet: choice, reason, limitation, responsible person, remaining check and review date. An unverified candidate can stay excluded.'],
];
const prompt = `Context: [product, screen, audience, platform].\nApproved resources: [names, official URLs, versions and accepted licenses].\nDecisions to follow: [selected tokens, typeface, icons and components].\nDo not add dependencies, third-party files, colors or purchases without approval.\nFlag missing API or icon names instead of inventing them.\nPrepare empty, loading, error and success states; preserve keyboard access and focus.\nSeparate implemented work, automated checks and remaining human review.\nDo not use third-party resources to train a model or assemble an asset pack.\nBefore delivery: list changed files, sources, tests and limitations.`;
const alerts = [
  { name: 'ApexCharts: conditional free use', text: 'The current license distinguishes conditional Community, Commercial and OEM/redistribution regimes. Confirm the organization’s circumstances and the intended use before integrating it. Do not rely on an older blanket description of the library as open source.', url: 'https://apexcharts.com/license/' },
  { name: 'unDraw: no asset packs or AI training', text: 'Its specific license permits certain free uses, but restricts asset-pack redistribution and uses related to AI training or development. This guide includes no unDraw files. Read the full current terms before downloading or using a visual.', url: 'https://undraw.co/license' },
  { name: 'Storyset: attribution in the free offering', text: 'The reviewed terms require credit for free use and limit redistribution. Check the exact intended use, delivery to a client and any additional restrictions. This kit does not include any Storyset illustrations.', url: 'https://storyset.com/terms' },
];
const sourceNote = 'English translation of the edited directory adapted from repertoire-complet-ui-ux-profils.md, supplied by the creator. References informed targeted corrections in the French source edition dated November 18, 2026, not a legal or availability audit of all 75 destinations. The translation does not imply a fresh exhaustive review. Terms may change; candidates whose features were not tested are identified in their entries.';

function guideMarkdown() {
  const lines = ['# UI/UX Directory', '', `**${count} entries · ${catalog.categories.length} categories · ${links} resource links**`, '', 'Version 1.0 · English edition · November 18, 2026 · Joy N. / Joyccelight', '', intro, '', '> ' + scope, '', `Free guides: ${tracked(resourcePath, 'markdown')}`, '', '## How to use it', ''];
  steps.forEach(([title, text], index) => lines.push(`${index + 1}. **${title}**: ${text}`));
  lines.push('', '## Start with a need', '');
  for (const category of catalog.categories) lines.push(`- **${category.name}**: ${category.purpose} Decision question: ${category.question}`);
  lines.push('', '## Brief for an AI agent', '', 'Complete and review this template. It does not replace human review or testing of the code.', '', '```text', prompt, '```', '');
  for (const category of catalog.categories) {
    lines.push(`## ${category.id}. ${category.name}`, '', category.purpose, '', `**Decision question:** ${category.question}`, '');
    for (const entry of catalog.entries.filter(item => item.category === category.id)) {
      lines.push(`### ${entry.id}. ${entry.name}`, '', ...entry.urls.map(url => `- ${url}`), '', entry.description, '', `- **Non-designer:** ${entry.nonDesigner}`, `- **Developer:** ${entry.developer}`, `- **With an AI agent:** ${entry.agent}`, `- **Check first:** ${entry.watch}`, '');
    }
  }
  lines.push('## Three licenses to examine before downloading', '');
  alerts.forEach(alert => lines.push(`- **${alert.name}**: ${alert.text} ${alert.url}`));
  lines.push('', '## Sources and editorial limitations', '', sourceNote, '');
  catalog.sources.forEach(source => lines.push(`- **${source.title}**: ${source.url}\n  ${source.note}`));
  lines.push('', '## What comes after the directory?', '', 'This guide helps you choose resources. The separate paid UX/UI Playbook covers preparing and reviewing interfaces with a manual, A4 worksheets and an archive of tokens, templates and a scanner. The paid product is not included in this free download.', '', `Explore the English edition ($29 USD): ${tracked('#buy', 'markdown')}`, '', `Read the free articles: ${tracked('/articles', 'markdown')}`, '', '## Terms of use', '', rights, '');
  lines.splice(8, 0, `The PDF contains ${galleryImages.length} supplied, reviewed screenshots for ${links} links. Coverage is partial; no preview is invented for other destinations. Images are not supplied as a reusable asset pack.`, '');
  return lines.join('\n');
}

function worksheetMarkdown() {
  return `# UI/UX decision worksheet\n\nVersion 1.0 · English · Joy N. / Joyccelight · November 18, 2026\n\nDuplicate for each project. Blank lines are fields to complete, not decisions that have already been approved.\n\n## 1. The project\n\n- Project / screen:\n- Audience and main task:\n- Platform, framework and versions:\n- Constraints (budget, data, hosting, devices):\n- Responsible person / date:\n\n## 2. The choices\n\nCompare no more than two options per category. Record a decision, including “no new tool” where appropriate.\n\n${catalog.categories.map(category => `### ${category.name}\n\n${category.question}\n\n- Option A / official URL:\n- Option B / official URL:\n- Decision and reason:\n- Version, license and attribution:\n- Cost / constraint / limitation:\n- Completed check and result:\n- Remaining check / responsible person / date:\n`).join('\n')}\n## 3. Before integration\n\n- [ ] Identify official sources and authors; read each selected file's license.\n- [ ] Check rights to modify, host and deliver files to a client.\n- [ ] Accept costs, quotas and attribution requirements.\n- [ ] Do not send personal data or client files to a service without approval.\n- [ ] Do not scrape or redistribute third-party packs, or use AI in ways prohibited by a license.\n\n## 4. Before delivery\n\n- [ ] Examine empty, loading, error and success states.\n- [ ] Test keyboard access, focus, zoom and a narrow screen.\n- [ ] Examine actual contrast and text alternatives.\n- [ ] Measure file weight and loading in the project instead of repeating marketing figures.\n- [ ] Verify AI-suggested imports, icon names, APIs and versions.\n\nTest results / link to evidence:\n\nDecision (accepted / revisit / rejected):\n\nAccepted risks / approving person and date:\n\nNext review date:\n\n## Brief for an AI agent\n\n${prompt}\n\n## Free UX/UI guides\n\n${tracked(resourcePath, 'worksheet')}\n\nThe terms in LICENSES-EN.txt apply. This worksheet is not an accessibility certification or legal validation.\n`;
}

function entryCard(entry) {
  return `<article class="entry" data-entry="${entry.id}"><div class="entry-title"><span class="entry-id">${entry.id}</span><h3>${escape(entry.name)}</h3></div><div class="entry-links">${entry.urls.map(url => `<a href="${escape(url)}">${escape(url.replace(/^https:\/\//, '').replace(/\/$/, ''))}</a>`).join('')}</div><p>${escape(entry.description)}</p><div class="roles"><div><strong>Non-designer</strong>${escape(entry.nonDesigner)}</div><div><strong>Developer</strong>${escape(entry.developer)}</div><div><strong>With an AI agent</strong>${escape(entry.agent)}</div></div><div class="watch"><strong>Check first.</strong> ${escape(entry.watch)}</div></article>`;
}
function buildGuide() {
  const sheets = [sheet(`<div class="eyebrow">Joy N. / Joyccelight · UX/UI Playbook</div><span class="cover-tag">$0 · Free book · English</span><div><h1>UI/UX<br><em>Directory.</em></h1><p class="lead" style="margin-top:24px">51 entries to help you choose resources, compare their uses and document your decisions.</p></div><div class="cover-grid">${catalog.categories.map((category, index) => `<div>${icon(categoryIcon[index], 30)}${escape(category.name)}</div>`).join('')}</div><div class="cover-bottom"><span>51 entries · 6 categories · 75 links<br>For non-designers, developers and AI-assisted work</span><span>${galleryImages.length} previews<br>English · 2026</span></div><p class="small" style="color:#d6d3c4">The guide is free. Listed services keep their own prices and licenses.</p>`, 'cover')];
  sheets.push(sheet(`${heading('Getting started', 'Choose without collecting everything.')}<p class="lead">${intro}</p><div>${steps.map(([title, text], index) => `<div class="step"><b>${index + 1}</b><div><strong>${escape(title)}</strong>${escape(text)}</div></div>`).join('')}</div><aside class="note small">${scope}</aside><p class="small">The ${galleryImages.length} dated previews follow the references. Coverage is partial: all 75 links remain included. The Markdown edition includes the entries and links. The decision worksheet is available as a printable PDF and editable Markdown; open the CSV grid in a spreadsheet.</p>`));
  sheets.push(sheet(`${heading('A starting point', 'One need. A small selection.')}<div class="category-table">${catalog.categories.map(category => `<div class="category-box"><h3>${escape(category.name)}</h3><p>${escape(category.purpose)}</p><strong>${escape(category.question)}</strong></div>`).join('')}</div><div class="example"><h3>Example of a recorded decision</h3><p><strong>Screen:</strong> mobile form. <strong>Choice:</strong> keep the existing typeface and test a Radix Colors scale for missing roles. <strong>Reason:</strong> limit changes. <strong>Still to do:</strong> measure text/background pairs and test error recovery by keyboard. This example is illustrative, not a recommendation for every project.</p></div>`));
  for (const category of catalog.categories) {
    const entries = catalog.entries.filter(entry => entry.category === category.id);
    for (let index = 0; index < entries.length; index += 2) {
      const second = entries[index + 1] ? entryCard(entries[index + 1]) : `<aside class="decision-note"><div class="eyebrow">Your decision</div><h3>${escape(category.question)}</h3><p>Record the selected option, source, rights and remaining check in the worksheet. Choosing not to add anything to the project is also a valid decision.</p><p class="small">${escape(category.purpose)}</p></aside>`;
      sheets.push(sheet(`${heading(`Category ${category.id} / 6`, category.name, `${Math.floor(index / 2) + 1} / ${Math.ceil(entries.length / 2)}`)}<div class="pair">${entryCard(entries[index])}${second}</div>`));
    }
  }
  sheets.push(sheet(`${heading('Rights and limitations', 'Three checks not to skip.')} ${alerts.map(alert => `<div class="license-alert"><h3>${escape(alert.name)}</h3><p>${escape(alert.text)}</p><a href="${escape(alert.url)}">${escape(alert.url)}</a></div>`).join('')}<aside class="note">A “free” label is not permission to modify, host, resell, redistribute or train a model. The license for the selected file is the reference.</aside>`));
  for (let start = 0; start < catalog.sources.length; start += 6) {
    sheets.push(sheet(`${heading('Editorial traceability', 'Sources and references.', `${start === 0 ? 1 : 2} / 2`)}${start === 0 ? `<p class="small">${escape(sourceNote)}</p>` : ''}<div>${catalog.sources.slice(start, start + 6).map(source => `<article class="source"><h3>${escape(source.title)}</h3><a href="${escape(source.url)}">${escape(source.url)}</a><p>${escape(source.note)}</p></article>`).join('')}</div>${start > 0 ? `<aside class="note small">${rights}</aside>` : ''}`));
  }
  sheets.push(sheet(`${heading('From choice to review', 'A directory is not a complete method.')}<p class="lead">Keep a small resource selection and record important decisions. A useful starting point is one you can explain, maintain and test.</p><h3>A brief for your AI agent</h3><pre class="prompt">${escape(prompt)}</pre><div class="cta-box"><div class="eyebrow" style="color:#ffac87">Go further · Separate paid product</div><h2>UX/UI Playbook</h2><p>The ${playbookPages('en')}-page English manual, 26-page, 12-sheet A4 kit and 21-file archive: tokens, templates and a Python scanner. 120 sections and 77 rules. These paid files are not part of the free directory.</p><div class="cta-price">$29 USD · One-time payment</div><a href="${escape(paidStore)}">Get the English Playbook on Gumroad</a></div><p><a href="${escape(tracked('#buy', 'pdf'))}">See the Playbook contents on the website</a> · <a href="${escape(tracked('/articles', 'pdf'))}">Read the free guides</a></p>`));
  sheets.splice(sheets.length - 1, 0, ...screenshotGallery);
  return sheets;
}
function buildWorksheet() {
  return [
    sheet(`${heading('Decision worksheet · 1 / 3', 'Frame one screen.')}<p class="lead">Print or duplicate this worksheet. Complete the blank fields; nothing has been approved in advance.</p>${['Project and screen', 'Audience and main task', 'Platform, framework and versions', 'Constraints: budget, data, hosting, devices', 'Responsible person and date'].map(label => `<div class="write-field tall"><strong>${label}</strong></div>`).join('')}<aside class="note small">Compare at most two options per category. “Keep the existing resource” and “no new tool” are valid choices.</aside>`),
    sheet(`${heading('Decision worksheet · 2 / 3', 'Choose and retain the source.')}<p class="small">For each category: chosen option / official URL / version / license and attribution / reason. Use the Markdown worksheet or CSV for a more detailed comparison.</p>${catalog.categories.map(category => `<div class="choice"><h3>${escape(category.name)}</h3><p>${escape(category.question)}</p><div class="blank"></div><div class="blank"></div></div>`).join('')}`),
    sheet(`${heading('Decision worksheet · 3 / 3', 'Check before delivery.')}<ul class="checklist">${['Read sources, licenses and attribution requirements for the chosen files.', 'Check rights to modify, host and deliver files to a client.', 'Accept costs and quotas; protect client files and personal data.', 'Do not redistribute third-party packs or use AI against a license.', 'Examine empty, loading, error and success states.', 'Test keyboard access, focus, zoom, narrow screens and actual contrast.', 'Examine text alternatives, file weight and loading in the project.', 'Verify AI-suggested imports, icon names, APIs and versions.'].map(text => `<li>${text}</li>`).join('')}</ul>${['Test results and link to evidence', 'Decision: accepted / revisit / rejected; accepted limitations', 'Approval: person / date; next review date'].map(label => `<div class="write-field tall"><strong>${label}</strong></div>`).join('')}<p class="small">This worksheet does not certify accessibility or legal compliance. Terms are in LICENSES-EN.txt.</p><p><a href="${escape(tracked(resourcePath, 'worksheet'))}">Read the free UX/UI guides</a></p>`),
  ];
}
function pdfHTML(sheets, title) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(title)}</title><meta name="author" content="Joy N. / Joyccelight"><style>${pdfCSS}</style></head><body>${sheets.map((item, index) => `<section class="sheet ${item.cls}"><div class="page-content">${item.body}</div>${item.cls === 'cover' ? '' : `<footer class="footer"><span>UI/UX Directory · Joy N. / Joyccelight · 2026</span><span>${index + 1} / ${sheets.length}</span></footer>`}</section>`).join('')}</body></html>`;
}

(async () => {
  const names = ['README-EN.md', 'Free-UI-UX-Directory-EN.pdf', 'Free-UI-UX-Directory-EN.md', 'UI-UX-Decision-Worksheet-EN.pdf', 'UI-UX-Decision-Worksheet-EN.md', 'UI-UX-Selection-Grid-EN.csv', 'LICENSES-EN.txt'];
  fs.writeFileSync(path.join(pack, 'Free-UI-UX-Directory-EN.md'), guideMarkdown());
  fs.writeFileSync(path.join(pack, 'UI-UX-Decision-Worksheet-EN.md'), worksheetMarkdown());
  const csvCell = value => '"' + value.replace(/"/g, '""') + '"';
  const csv = [['Category', 'Option A / official URL', 'Option B / official URL', 'Decision and reason', 'Version', 'License / attribution', 'Cost / limitation', 'Completed check / result', 'Remaining check', 'Responsible person', 'Review date'], ...catalog.categories.map(category => [category.name, ...Array(10).fill('')])].map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
  fs.writeFileSync(path.join(pack, 'UI-UX-Selection-Grid-EN.csv'), '\uFEFF' + csv);
  fs.writeFileSync(path.join(pack, 'LICENSES-EN.txt'), `UI/UX DIRECTORY: VERSION 1.0, ENGLISH\n\n${rights}\n\nThis directory includes links and editorial website screenshots. Screenshots are not assets to extract and reuse; no third-party font, library, asset pack or service source file is distributed. Rights to captured websites, logos and content remain with their authors. Dates are retrieval dates reported by the supplier, not guarantees of current state.\n\n--- TYPEFACE USED FOR LAYOUT: DOMINE (OFL 1.1) ---\n\n${fs.readFileSync(path.join(root, 'src/fonts/OFL-Domine.txt'), 'utf8')}\n\n--- LAYOUT ICONS: LUCIDE (ISC AND INHERITED FEATHER NOTICES) ---\n\n${fs.readFileSync(path.join(root, 'node_modules/lucide-react/LICENSE'), 'utf8')}\n`);
  const guide = buildGuide(), worksheet = buildWorksheet();
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}), args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] });
  try {
    const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
    for (const [name, sheets, title] of [['Free-UI-UX-Directory-EN', guide, 'UI/UX Directory: 51 entries to help you choose resources'], ['UI-UX-Decision-Worksheet-EN', worksheet, 'UI/UX decision worksheet']]) {
      const html = pdfHTML(sheets, title);
      fs.writeFileSync(path.join(work, name + '.html'), html);
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const brokenImages = await page.evaluate(() => [...document.images].filter(image => !image.complete || !image.naturalWidth).length);
      if (brokenImages) throw new Error(`${name}: ${brokenImages} unreadable image(s); refusing to print.`);
      const overflow = await page.evaluate(() => [...document.querySelectorAll('.sheet')].flatMap((section, index) => {
        const content = section.querySelector('.page-content');
        const box = content.getBoundingClientRect();
        const problems = [...content.querySelectorAll('*')].filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.height > 0 && (rect.bottom > box.bottom + 1 || rect.right > box.right + 1 || rect.left < box.left - 1 || element.scrollHeight > element.clientHeight + 2);
        }).map(element => element.getAttribute('data-entry') || element.className || element.tagName);
        return problems.length ? [{ page: index + 1, problems }] : [];
      }));
      if (overflow.length) throw new Error(`${name}: page overflow ${JSON.stringify(overflow)}`);
      await page.pdf({ path: path.join(pack, name + '.pdf'), format: 'A4', preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
      for (const index of name === 'UI-UX-Decision-Worksheet-EN' ? [0, 1, 2] : [0, 3, 16, 29, 30, 32, 33, sheets.length - 1]) {
        if (index < sheets.length) await page.locator('.sheet').nth(index).screenshot({ path: path.join(work, `${name}-page-${index + 1}.png`) });
      }
      console.log(`${name}.pdf: ${sheets.length} pages, no HTML overflow`);
    }
    async function art(width, height, output, type = 'png', square = false) {
      await page.setViewportSize({ width, height });
      await page.setContent(marketingHTML('en', width, height, square, galleryImages.length), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => [...document.querySelectorAll('h1,p,.grid,.stats,.foot,.brand')].filter(element => element.getBoundingClientRect().bottom > innerHeight || element.scrollHeight > element.clientHeight + 1).map(element => element.className || element.tagName));
      if (overflow.length) throw new Error('English marketing overflow: ' + output + ' ' + JSON.stringify(overflow));
      await page.screenshot({ path: output, type, ...(type === 'jpeg' ? { quality: 91 } : {}) });
    }
    if (!process.argv.includes('--downloads-only')) {
    await art(1280, 720, path.join(marketing, 'cover-1280x720.png'));
    await page.screenshot({ path: path.join(root, 'public/images/free-directory/cover-en.jpg'), type: 'jpeg', quality: 89 });
    await art(1080, 1080, path.join(marketing, 'thumbnail-1080x1080.png'), 'png', true);
    await art(1200, 630, path.join(root, 'public/og-directory-en.jpg'), 'jpeg');
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(pack, 'README-EN.md'), `# Your free UI/UX Directory\n\nThank you for downloading this resource by Joy N. / Joyccelight.\n\n**51 entries · 6 categories · 75 resource links · English-language files**\n\n- Free-UI-UX-Directory-EN.pdf: ${guide.length}-page illustrated A4 guide, ${galleryImages.length} screenshots and clickable links.\n- Free-UI-UX-Directory-EN.md: entries and links as editable text; screenshots appear only in the PDF.\n- UI-UX-Decision-Worksheet-EN.pdf: ${worksheet.length} printable A4 pages; not an interactive PDF form.\n- UI-UX-Decision-Worksheet-EN.md: a worksheet to duplicate and complete in a Markdown editor.\n- UI-UX-Selection-Grid-EN.csv: 6 category rows to complete in a spreadsheet (UTF-8, comma-separated).\n- LICENSES-EN.txt: guide terms and Domine/Lucide notices.\n\nStart with one screen, compare a few options and record why you chose them. Third-party services have their own prices and licenses. This download includes none of their asset packs or libraries. The destinations have not undergone an exhaustive availability audit.\n\nVersion 1.0 · English edition · November 18, 2026\nFree guides: ${tracked('/articles', 'readme')}\nPaid English Playbook (separate product, $29 USD): ${paidStore}\n\nContact: joynagassi@gmail.com\n`);
  const archive = 'Free-UI-UX-Directory-EN.zip';
  execFileSync('python3', ['-c', `from pathlib import Path\nimport zipfile,sys,json\np=Path(sys.argv[1])\nwith zipfile.ZipFile(sys.argv[2],'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:\n for name in sorted(json.loads(sys.argv[3])):\n  f=p/name\n  info=zipfile.ZipInfo('ui-ux-directory-en/'+name,(2026,11,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16\n  z.writestr(info,f.read_bytes())`, pack, path.join(downloads, archive), JSON.stringify(names)]);
  fs.copyFileSync(path.join(pack, 'Free-UI-UX-Directory-EN.pdf'), path.join(downloads, 'Free-UI-UX-Directory-EN.pdf'));
  fs.copyFileSync(path.join(pack, 'Free-UI-UX-Directory-EN.md'), path.join(downloads, 'Free-UI-UX-Directory-EN.md'));
  const fileInfo = (name, role) => {
    const bytes = fs.readFileSync(path.join(downloads, name));
    return { role, path: path.relative(root, path.join(downloads, name)).split(path.sep).join('/'), bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
  };
  const manifest = { distribution: 'gumroad-only', ...(screenshotGallery.length ? { screenshots: { provider: 'microlink', count: galleryImages.length, resourceLinks: links, complete: galleryImages.length === links, mode: galleryMode, galleryPages: screenshotGallery.length, urls: galleryImages.map(item => item.url) } } : {}), version: '1.0', language: 'en', editionDate: catalog.editionDate, generatedForOrigin: SITE_URL, counts: { entries: count, categories: catalog.categories.length, resourceLinks: links, guidePages: guide.length, worksheetPages: worksheet.length, archiveFiles: names.length }, files: { archive: fileInfo(archive, 'Complete English kit'), pdf: fileInfo('Free-UI-UX-Directory-EN.pdf', 'English guide PDF'), markdown: fileInfo('Free-UI-UX-Directory-EN.md', 'English guide Markdown') } };
  fs.writeFileSync(path.join(product, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Ready: ${archive} (${(manifest.files.archive.bytes / 1048576).toFixed(2)} MiB), ${names.length} English files. All generated files stay outside the public site. No Gumroad publication performed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
