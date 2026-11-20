#!/usr/bin/env node
/** Build the creator's French free product. No third-party assets from the directory are bundled. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const { loadData, root } = require('./content-data.cjs');
const { SITE_URL } = loadData('src/lib/site-config.ts');
const { screenshotSheets } = require('./free_resource_screenshots.cjs');
const { escape, icon, pdfCSS, categoryIcon, heading, sheet, marketingHTML } = require('./free_resource_layout.cjs');
const catalog = require('../products/ui-ux-directory/catalogue.json');
// Explicit opt-in; missing or unreviewed PNGs fail before any deliverable is overwritten.
const screenshotGallery = process.argv.includes('--with-screenshots') ? screenshotSheets(catalog, 'fr') : [];
const work = path.join(root, '.cache/free-resource');
const pack = path.join(work, 'pack');
const product = path.join(root, 'products/ui-ux-directory');
const downloads = path.join(root, 'public/downloads');
const marketing = path.join(product, 'marketing');
for (const dir of [work, pack, downloads, marketing, path.join(root, 'public/images/free-directory')]) fs.mkdirSync(dir, { recursive: true });
const count = catalog.entries.length;
const links = catalog.entries.reduce((n, e) => n + e.urls.length, 0);
const resourcePath = '/resources/ui-ux-directory';
const tracked = (suffix, medium) => {
  const url = new URL(`/fr${suffix}`, SITE_URL);
  url.search = new URLSearchParams({ utm_source: 'repertoire-ui-ux', utm_medium: medium, utm_campaign: 'ressource-gratuite' }).toString();
  return url.href;
};
const intro = 'Un répertoire pour comparer, choisir et documenter vos ressources d’interface. Il s’adresse aux non-designers, aux développeurs et aux personnes qui travaillent avec un agent IA. Ce n’est pas une collection de composants ou d’illustrations à réutiliser : les ressources restent sur les sites de leurs auteurs.';
const scope = 'Le guide et la grille sont gratuits. Les services cités peuvent proposer des fonctions payantes ou des licences conditionnelles. Les 75 liens ne correspondent pas à 75 outils distincts et n’ont pas fait l’objet d’un audit exhaustif de disponibilité. Cette édition fournit des points de départ à vérifier ; elle ne promet ni résultat commercial, ni performance, ni conformité d’accessibilité, ni absence d’erreurs d’un agent IA.';
const steps = [
  ['Cadrer', 'Choisissez un écran, une plateforme et une contrainte importante. Exemple : un formulaire mobile avec des erreurs lisibles et des polices hébergées localement.'],
  ['Comparer', 'Retenez deux options au maximum par famille, avec les mêmes textes, états et données. Vous pouvez aussi conserver une ressource déjà maîtrisée.'],
  ['Vérifier', 'Notez l’URL officielle, la version, les droits, l’attribution et les coûts. Ne transmettez ni données personnelles ni fichier client à un service sans autorisation.'],
  ['Essayer', 'Testez les états vide, chargement, erreur et succès ; le clavier, le zoom, les contrastes et l’écran le plus étroit. Mesurez le chargement sur le projet.'],
  ['Consigner', 'Remplissez la fiche de décision : choix, raison, limite, personne responsable, test restant et date de relecture. Une piste non vérifiée peut rester écartée.'],
];
const prompt = `Contexte : [produit, écran, public, plateforme].\nRessources autorisées : [noms, URLs officielles, versions et licences approuvées].\nDécisions à respecter : [tokens, police, icônes et composants retenus].\nNe pas ajouter de dépendance, de fichier tiers, de couleur ou d’achat sans accord.\nSignaler les noms d’API ou d’icônes introuvables au lieu de les inventer.\nPréparer les états vide, chargement, erreur et succès ; maintenir le clavier et le focus.\nSéparer ce qui est implémenté, testé automatiquement et encore à vérifier par une personne.\nNe pas utiliser les ressources tierces pour entraîner un modèle ni constituer un pack.\nAvant livraison : lister les fichiers modifiés, les sources, les tests et les limites.`;
const rights = 'Texte et mise en page : Joy N. / Joyccelight, 2026. Vous pouvez consulter ce guide, l’utiliser dans vos projets personnels ou professionnels et adapter les fiches de décision pour votre équipe ou vos clients. Ne revendez pas ce guide et ne le republiez pas à l’identique sous votre nom ; partagez plutôt sa page de téléchargement. Ces conditions concernent uniquement ce guide : elles ne concèdent aucun droit sur les sites, marques, polices, icônes, composants ou visuels cités. Les auteurs et leurs licences restent les références. Aucun partenariat ni affiliation rémunérée avec les services cités n’est revendiqué. Ce guide n’est pas un conseil juridique.';

function markdown() {
  const lines = ['# Répertoire UI/UX', '', `**${count} fiches · ${catalog.categories.length} familles · ${links} liens de ressources**`, '', 'Version 1.0 · Français · Édition du 18 novembre 2026 · Joy N. / Joyccelight', '', intro, '', '> ' + scope, '', `Page du guide : ${tracked(resourcePath, 'markdown')}`, '', '## Comment l’utiliser', ''];
  steps.forEach(([title, text], i) => lines.push(`${i + 1}. **${title}** — ${text}`));
  lines.push('', '## Commencer par un besoin', '');
  for (const category of catalog.categories) lines.push(`- **${category.name}** — ${category.purpose} Question : ${category.question}`);
  lines.push('', '## Brief à transmettre à un agent IA', '', 'Ce modèle doit être rempli et relu. Il ne remplace pas une revue humaine ni un test du code.', '', '```text', prompt, '```', '');
  for (const category of catalog.categories) {
    lines.push(`## ${category.id}. ${category.name}`, '', category.purpose, '', `**Question de décision :** ${category.question}`, '');
    for (const entry of catalog.entries.filter(e => e.category === category.id)) {
      lines.push(`### ${entry.id}. ${entry.name}`, '', ...entry.urls.map(url => `- ${url}`), '', entry.description, '', `- **Non-designer :** ${entry.nonDesigner}`, `- **Développeur :** ${entry.developer}`, `- **Avec un agent IA :** ${entry.agent}`, `- **À vérifier :** ${entry.watch}`, '');
    }
  }
  lines.push('## Trois licences à examiner avant tout téléchargement', '', '- **ApexCharts :** la licence actuelle distingue Community sous conditions, Commercial et OEM/redistribution. Vérifiez le régime applicable à l’organisation et à l’usage : https://apexcharts.com/license/', '- **unDraw :** licence spécifique, restrictions de redistribution en packs et d’usage pour l’entraînement/développement IA : https://undraw.co/license', '- **Storyset :** attribution requise dans l’offre gratuite selon les conditions consultées ; vérifier les autres restrictions : https://storyset.com/terms', '', '## Sources et limites éditoriales', '', 'Adaptation du document fourni par le créateur : repertoire-complet-ui-ux-profils.md. Les références ci-dessous ont servi aux corrections ciblées, pas à un audit juridique des 75 liens. Les conditions peuvent évoluer. Les fonctions actuelles de certaines pistes sont expressément signalées comme non testées dans leurs fiches.', '');
  catalog.sources.forEach(s => lines.push(`- **${s.title}** — ${s.url}\n  ${s.note}`));
  lines.push('', '## Et après le répertoire ?', '', 'Ce guide aide à choisir des ressources. Le UX/UI Playbook payant traite la préparation et la revue d’une interface : manuel, kit de fiches A4 et archive avec tokens, gabarits et scanner. Il n’est pas inclus dans ce téléchargement gratuit.', '', `Découvrir l’édition française (29 USD) : ${tracked('#buy', 'markdown')}`, '', `Lire les articles gratuits : ${tracked('/articles', 'markdown')}`, '', '## Conditions d’usage', '', rights, '');
  return lines.join('\n');
}

const worksheetMd = `# Fiche de décision UI/UX\n\nVersion 1.0 · Français · Joy N. / Joyccelight · 18 novembre 2026\n\nÀ dupliquer pour chaque projet. Les lignes vides sont des champs à remplir, pas des décisions déjà validées.\n\n## 1. Le projet\n\n- Projet / écran :\n- Public et tâche principale :\n- Plateforme et framework / versions :\n- Contraintes (budget, données, hébergement, appareils) :\n- Personne responsable / date :\n\n## 2. Les choix\n\nPour chaque famille, comparer au plus deux options puis noter un choix, y compris « aucun nouvel outil ».\n\n${catalog.categories.map(c => `### ${c.name}\n\n${c.question}\n\n- Option A / URL officielle :\n- Option B / URL officielle :\n- Décision et raison :\n- Version, licence et attribution :\n- Coût / contrainte / limite :\n- Test réalisé et résultat :\n- Test restant / responsable / date :\n`).join('\n')}\n## 3. Avant intégration\n\n- [ ] URLs et auteurs identifiés ; licence lue pour chaque fichier retenu.\n- [ ] Droits de modification, d’hébergement et de livraison au client vérifiés.\n- [ ] Coûts, quotas et mentions d’attribution acceptés.\n- [ ] Aucun fichier client ni donnée personnelle confié à un service sans accord.\n- [ ] Aucun pack tiers aspiré ou redistribué ; aucune utilisation IA contraire à une licence.\n\n## 4. Avant livraison\n\n- [ ] États vide, chargement, erreur et succès examinés.\n- [ ] Clavier, focus, zoom et écran étroit testés.\n- [ ] Contrastes réels et alternatives textuelles examinés.\n- [ ] Poids et chargement mesurés sur le projet, pas repris d’une fiche marketing.\n- [ ] Imports, noms d’icônes, API et versions proposés par l’IA vérifiés.\n\nRésultat des essais / lien vers la preuve :\n\nDécision (retenu / à revoir / écarté) :\n\nRisques acceptés / personne et date de validation :\n\nProchaine date de relecture :\n\n## Brief pour un agent IA\n\n${prompt}\n\n## Revenir au répertoire\n\n${tracked(resourcePath, 'worksheet')}\n\nLes conditions de LICENCES.txt s’appliquent. Cette fiche ne constitue pas une certification d’accessibilité ni une validation juridique.\n`;
function entryCard(e) {
  return `<article class="entry" data-entry="${e.id}"><div class="entry-title"><span class="entry-id">${e.id}</span><h3>${escape(e.name)}</h3></div><div class="entry-links">${e.urls.map(url => `<a href="${escape(url)}">${escape(url.replace(/^https:\/\//, '').replace(/\/$/, ''))}</a>`).join('')}</div><p>${escape(e.description)}</p><div class="roles"><div><strong>Non-designer</strong>${escape(e.nonDesigner)}</div><div><strong>Développeur</strong>${escape(e.developer)}</div><div><strong>Avec un agent IA</strong>${escape(e.agent)}</div></div><div class="watch"><strong>À vérifier.</strong> ${escape(e.watch)}</div></article>`;
}
function buildGuide() {
  const sheets = [sheet(`<div class="eyebrow">Joy N. / Joyccelight · UX/UI Playbook</div><span class="cover-tag">Ressource gratuite · Édition française</span><div><h1>Répertoire<br><em>UI/UX.</em></h1><p class="lead" style="margin-top:24px">51 fiches pour choisir vos ressources, comparer leurs usages et consigner vos décisions.</p></div><div class="cover-grid">${catalog.categories.map((c,i) => `<div>${icon(categoryIcon[i],30)}${escape(c.name)}</div>`).join('')}</div><div class="cover-bottom"><span>51 fiches · 6 familles · 75 liens<br>Pour les non-designers, développeurs et agents IA</span><span>Version 1.0<br>18 novembre 2026</span></div><p class="small" style="color:#d6d3c4">Le guide est gratuit. Les services cités conservent leurs prix et licences.</p>`, 'cover')];
  sheets.push(sheet(`${heading('Pour commencer', 'Choisir sans tout collectionner.')}<p class="lead">${intro}</p><div>${steps.map(([title,text],i) => `<div class="step"><b>${i+1}</b><div><strong>${title}</strong>${text}</div></div>`).join('')}</div><aside class="note small">${scope}</aside><p class="small">Le Markdown joint reprend les fiches et les liens. La fiche de décision existe en PDF imprimable et en Markdown modifiable ; la grille CSV peut être ouverte dans un tableur.</p>`));
  sheets.push(sheet(`${heading('Le point de départ', 'Un besoin, une petite sélection.')}<div class="category-table">${catalog.categories.map(c => `<div class="category-box"><h3>${escape(c.name)}</h3><p>${escape(c.purpose)}</p><strong>${escape(c.question)}</strong></div>`).join('')}</div><div class="example"><h3>Exemple de décision documentée</h3><p><strong>Écran :</strong> formulaire mobile. <strong>Choix :</strong> conserver la police existante et tester une échelle Radix Colors pour les rôles manquants. <strong>Raison :</strong> limiter les changements. <strong>Reste à faire :</strong> mesurer les paires texte/fond et tester les erreurs au clavier. Ce choix est illustratif, pas recommandé pour tous les projets.</p></div>`));
  for (const c of catalog.categories) {
    const entries = catalog.entries.filter(e => e.category === c.id);
    for (let i=0;i<entries.length;i+=2) {
      const second = entries[i+1] ? entryCard(entries[i+1]) : `<aside class="decision-note"><div class="eyebrow">Votre choix</div><h3>${escape(c.question)}</h3><p>Notez dans la fiche de décision l’option retenue, sa source, ses droits et le test qui manque encore. Vous pouvez aussi choisir de ne rien ajouter au projet.</p><p class="small">${escape(c.purpose)}</p></aside>`;
      sheets.push(sheet(`${heading(`Famille ${c.id} / 6`, c.name, `${Math.floor(i/2)+1} / ${Math.ceil(entries.length/2)}`)}<div class="pair">${entryCard(entries[i])}${second}</div>`));
    }
  }
  sheets.push(sheet(`${heading('Droits et limites', 'Trois points à ne pas sauter.')}<div class="license-alert"><h3>ApexCharts : gratuité conditionnelle</h3><p>La licence actuelle distingue Community sous conditions, Commercial et OEM/redistribution. Faire vérifier la situation de l’organisation et le type d’usage avant intégration. Ne pas s’appuyer sur une ancienne qualification générale d’open source.</p><a href="https://apexcharts.com/license/">apexcharts.com/license/</a></div><div class="license-alert"><h3>unDraw : pas de pack ni d’entraînement IA</h3><p>Sa licence spécifique autorise certains usages gratuits, mais restreint notamment la redistribution en packs et les usages liés à l’entraînement/développement d’IA. Ce guide ne contient aucun fichier unDraw.</p><a href="https://undraw.co/license">undraw.co/license</a></div><div class="license-alert"><h3>Storyset : attribution de l’offre gratuite</h3><p>Les conditions consultées imposent un crédit dans l’offre gratuite et limitent la redistribution. Vérifier l’usage précis, la livraison au client et les éventuelles conditions supplémentaires. Aucun visuel Storyset n’est fourni.</p><a href="https://storyset.com/terms">storyset.com/terms</a></div><aside class="note">Une mention « gratuit » ne vaut pas autorisation de modifier, héberger, revendre, redistribuer ou entraîner un modèle. La licence du fichier retenu fait référence.</aside>`));
  for (let start=0;start<catalog.sources.length;start+=6) {
    sheets.push(sheet(`${heading('Traçabilité éditoriale', 'Sources et références.', `${start===0?1:2} / 2`)}${start===0?'<p class="small">Adaptation du document fourni par le créateur : repertoire-complet-ui-ux-profils.md. Références utilisées pour des corrections ciblées au 18 novembre 2026, et non pour un audit des 75 destinations. Les conditions peuvent évoluer.</p>':''}<div>${catalog.sources.slice(start,start+6).map(s => `<article class="source"><h3>${escape(s.title)}</h3><a href="${escape(s.url)}">${escape(s.url)}</a><p>${escape(s.note)}</p></article>`).join('')}</div>${start>0?`<aside class="note small">${rights}</aside>`:''}`));
  }
  sheets.push(sheet(`${heading('Du choix à la revue', 'Un répertoire n’est pas une méthode complète.')}<p class="lead">Gardez une petite sélection de ressources et documentez les décisions importantes. Le bon point de départ est celui que vous pouvez expliquer, maintenir et tester.</p><h3>Un cadre pour votre agent IA</h3><pre class="prompt">${escape(prompt)}</pre><div class="cta-box"><div class="eyebrow" style="color:#ffac87">Pour aller plus loin · Offre distincte</div><h2>UX/UI Playbook</h2><p>Le manuel français de 148 pages, le kit de 12 fiches A4 et l’archive de 21 fichiers : tokens, gabarits et scanner Python. Le répertoire gratuit n’inclut pas ces fichiers.</p><div class="cta-price">29 USD · Paiement unique</div><a href="${escape(tracked('#buy','pdf'))}">Découvrir le Playbook sur le site</a></div><p><a href="${escape(tracked('/articles','pdf'))}">Continuer avec les articles gratuits</a> · <a href="${escape(tracked(resourcePath,'pdf'))}">Retrouver le répertoire</a></p>`));
  sheets.splice(sheets.length - 1, 0, ...screenshotGallery);
  return sheets;
}
function buildWorksheet() {
  return [
    sheet(`${heading('Fiche de décision · 1 / 3', 'Cadrer un écran.')}<p class="lead">À imprimer ou à dupliquer. Les espaces ci-dessous sont à remplir : rien n’est validé à l’avance.</p>${['Projet et écran','Public et tâche principale','Plateforme, framework et versions','Contraintes : budget, données, hébergement, appareils','Responsable et date'].map(label => `<div class="write-field tall"><strong>${label}</strong></div>`).join('')}<aside class="note small">Comparer au maximum deux options par famille. « Conserver l’existant » et « aucun nouvel outil » sont des décisions possibles.</aside>`),
    sheet(`${heading('Fiche de décision · 2 / 3', 'Choisir et conserver la source.')}<p class="small">Pour chaque famille : option retenue / URL officielle / version / licence et attribution / raison. Utiliser le Markdown ou le CSV pour une comparaison détaillée.</p>${catalog.categories.map(c=>`<div class="choice"><h3>${escape(c.name)}</h3><p>${escape(c.question)}</p><div class="blank"></div><div class="blank"></div></div>`).join('')}`),
    sheet(`${heading('Fiche de décision · 3 / 3', 'Vérifier avant livraison.')}<ul class="checklist">${['Sources, licences et obligations d’attribution lues pour les fichiers retenus.','Droits de modification, d’hébergement et de livraison au client vérifiés.','Coûts et quotas acceptés ; données client ou personnelles protégées.','Aucun pack tiers redistribué ; aucun usage IA contraire à la licence.','États vide, chargement, erreur et succès examinés.','Clavier, focus, zoom, écran étroit et contrastes réels testés.','Alternatives textuelles, poids et chargement examinés sur le projet.','Imports, noms d’icônes, API et versions proposés par l’IA vérifiés.'].map(t=>`<li>${t}</li>`).join('')}</ul>${['Résultat des essais et lien vers la preuve','Décision : retenu / à revoir / écarté ; limites acceptées','Validation : personne / date ; prochaine relecture'].map(label=>`<div class="write-field tall"><strong>${label}</strong></div>`).join('')}<p class="small">Cette fiche ne certifie ni l’accessibilité ni la conformité juridique du projet. Conditions dans LICENCES.txt.</p><p><a href="${escape(tracked(resourcePath,'worksheet'))}">Revenir au répertoire UI/UX</a></p>`),
  ];
}
function pdfHTML(sheets, title) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${escape(title)}</title><meta name="author" content="Joy N. / Joyccelight"><style>${pdfCSS}</style></head><body>${sheets.map((s,i)=>`<section class="sheet ${s.cls}"><div class="page-content">${s.body}</div>${s.cls==='cover'?'':`<footer class="footer"><span>Répertoire UI/UX · Joy N. / Joyccelight · 2026</span><span>${i+1} / ${sheets.length}</span></footer>`}</section>`).join('')}</body></html>`;
}

(async()=>{
  // Clear only known generated pack files, never arbitrary repository content.
  const names=['LIRE-MOI.md','repertoire-ui-ux-fr.pdf','repertoire-ui-ux-fr.md','fiche-decision.pdf','fiche-decision.md','grille-selection.csv','LICENCES.txt'];
  for(const name of names) if(fs.existsSync(path.join(pack,name)))fs.unlinkSync(path.join(pack,name));
  fs.writeFileSync(path.join(pack,'repertoire-ui-ux-fr.md'),markdown());
  fs.writeFileSync(path.join(pack,'fiche-decision.md'),worksheetMd);
  const csvCell=s=>'"'+s.replace(/"/g,'""')+'"';
  const csv=[['Famille','Option A / URL officielle','Option B / URL officielle','Choix et raison','Version','Licence / attribution','Coût / limite','Test réalisé / résultat','Test restant','Responsable','Date de relecture'],...catalog.categories.map(c=>[c.name,...Array(10).fill('')])].map(row=>row.map(csvCell).join(';')).join('\r\n')+'\r\n';
  fs.writeFileSync(path.join(pack,'grille-selection.csv'),'\uFEFF'+csv);
  const notice=`RÉPERTOIRE UI/UX — VERSION 1.0\n\n${rights}\n\nCette ressource contient des liens, pas les fichiers des outils cités.\n\n--- POLICE UTILISÉE POUR LA MISE EN PAGE : DOMINE (OFL 1.1) ---\n\n${fs.readFileSync(path.join(root,'src/fonts/OFL-Domine.txt'),'utf8')}\n\n--- PICTOGRAMMES DE MISE EN PAGE : LUCIDE (ISC ET MENTIONS FEATHER) ---\n\n${fs.readFileSync(path.join(root,'node_modules/lucide-react/LICENSE'),'utf8')}\n`;
  fs.writeFileSync(path.join(pack,'LICENCES.txt'),notice);
  const guide=buildGuide(),worksheet=buildWorksheet();
  const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
  try{
    const page=await browser.newPage({viewport:{width:794,height:1123},deviceScaleFactor:1});
    for(const [name,sheets,title] of [['repertoire-ui-ux-fr',guide,'Répertoire UI/UX — 51 fiches pour choisir vos ressources'],['fiche-decision',worksheet,'Fiche de décision UI/UX']]){
      const html=pdfHTML(sheets,title);
      fs.writeFileSync(path.join(work,name+'.html'),html);
      await page.setContent(html,{waitUntil:'load'});
      await page.evaluate(()=>document.fonts.ready);
      const brokenImages=await page.evaluate(()=>[...document.images].filter(image=>!image.complete||!image.naturalWidth).length);
      if(brokenImages)throw new Error(`${name}: ${brokenImages} unreadable image(s); refusing to print.`);
      const overflow=await page.evaluate(()=>[...document.querySelectorAll('.sheet')].flatMap((s,i)=>{
        const content=s.querySelector('.page-content');
        const box=content.getBoundingClientRect();
        const problems=[...content.querySelectorAll('*')].filter(el=>{
          const b=el.getBoundingClientRect();
          return b.height>0 && (b.bottom>box.bottom+1||b.right>box.right+1||b.left<box.left-1||el.scrollHeight>el.clientHeight+2);
        }).map(el=>el.getAttribute('data-entry')||el.className||el.tagName);
        return problems.length?[{page:i+1,problems}]:[];
      }));
      if(overflow.length)throw new Error(`${name}: page overflow ${JSON.stringify(overflow)}`);
      await page.pdf({path:path.join(pack,name+'.pdf'),format:'A4',preferCSSPageSize:true,printBackground:true,tagged:true,outline:true});
      // Evidence only; these are not duplicated in the distributed pack.
      for(const index of name==='fiche-decision'?[0,1,2]:[0,3,16,29,30,33]){
        if(index<sheets.length)await page.locator('.sheet').nth(index).screenshot({path:path.join(work,`${name}-page-${index+1}.png`)});
      }
      console.log(`${name}.pdf: ${sheets.length} pages, no HTML overflow`);
    }
    const marketPage=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
    async function art(locale,width,height,output,type='png',square=false){
      await marketPage.setViewportSize({width,height});
      await marketPage.setContent(marketingHTML(locale,width,height,square),{waitUntil:'load'});
      await marketPage.evaluate(()=>document.fonts.ready);
      const overflow=await marketPage.evaluate(()=>[...document.querySelectorAll('h1,p,.grid,.stats,.foot,.brand')].filter(el=>el.getBoundingClientRect().bottom>innerHeight||el.scrollHeight>el.clientHeight+1).map(el=>({element:el.className||el.tagName,height:el.clientHeight,scroll:el.scrollHeight,bottom:el.getBoundingClientRect().bottom})));
      if(overflow.length){
        await marketPage.screenshot({path:path.join(work,'marketing-overflow.png')});
        throw new Error('Marketing overflow: '+output+' '+JSON.stringify(overflow));
      }
      await marketPage.screenshot({path:output,type,...(type==='jpeg'?{quality:91}:{})});
    }
    await art('fr',1280,720,path.join(marketing,'cover-1280x720.png'));
    await marketPage.screenshot({path:path.join(root,'public/images/free-directory/cover-fr.jpg'),type:'jpeg',quality:89});
    await art('fr',1080,1080,path.join(marketing,'thumbnail-1080x1080.png'),'png',true);
    for(const locale of ['fr'])await art(locale,1200,630,path.join(root,`public/og-directory-${locale}.jpg`),'jpeg');
  }finally{await browser.close();}
  fs.writeFileSync(path.join(pack,'LIRE-MOI.md'),`# Votre répertoire UI/UX gratuit\n\nMerci d’avoir téléchargé cette ressource de Joy N. / Joyccelight.\n\n**51 fiches · 6 familles · 75 liens de ressources · Fichiers en français**\n\n- repertoire-ui-ux-fr.pdf : guide de ${guide.length} pages A4, avec liens cliquables.\n- repertoire-ui-ux-fr.md : même contenu éditorial dans un format texte modifiable.\n- fiche-decision.pdf : ${worksheet.length} pages A4 à imprimer ; pas un formulaire PDF interactif.\n- fiche-decision.md : fiche à dupliquer et compléter dans un éditeur Markdown.\n- grille-selection.csv : 6 lignes de familles à compléter dans un tableur (UTF-8, séparateur point-virgule).\n- LICENCES.txt : conditions d’usage du guide et notices Domine/Lucide.\n\nCommencez par un écran, comparez peu d’options et gardez la raison de chaque choix. Les services tiers ont leurs propres tarifs et licences ; ce téléchargement ne contient aucun de leurs packs ni bibliothèques. Les liens n’ont pas subi d’audit exhaustif de disponibilité.\n\nVersion 1.0 · Édition du 18 novembre 2026\nPage du guide : ${tracked(resourcePath,'readme')}\nArticles gratuits : ${tracked('/articles','readme')}\nLe Playbook payant (offre distincte) : ${tracked('','readme')}#buy\n\nContact : joynagassi@gmail.com\n`);
  const archive='repertoire-ui-ux-gratuit-v1.zip';
  execFileSync('python3',['-c',`from pathlib import Path\nimport zipfile,sys,json\np=Path(sys.argv[1])\nwith zipfile.ZipFile(sys.argv[2],'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:\n for name in sorted(json.loads(sys.argv[3])):\n  f=p/name\n  info=zipfile.ZipInfo('repertoire-ui-ux/'+f.name,(2026,11,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16\n  z.writestr(info,f.read_bytes())`,pack,path.join(downloads,archive),JSON.stringify(names)]);
  fs.copyFileSync(path.join(pack,'repertoire-ui-ux-fr.pdf'),path.join(downloads,'repertoire-ui-ux-fr-v1.pdf'));
  fs.copyFileSync(path.join(pack,'repertoire-ui-ux-fr.md'),path.join(downloads,'repertoire-ui-ux-fr-v1.md'));
  const fileInfo=(name,role)=>{const bytes=fs.readFileSync(path.join(downloads,name));return {role,path:'/downloads/'+name,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};};
  const manifest={...(screenshotGallery.length?{screenshots:{provider:'microlink',count:links,galleryPages:screenshotGallery.length}}:{}),version:'1.0',language:'fr',editionDate:catalog.editionDate,generatedForOrigin:SITE_URL,counts:{entries:count,categories:catalog.categories.length,resourceLinks:links,guidePages:guide.length,worksheetPages:worksheet.length,archiveFiles:names.length},files:{archive:fileInfo(archive,'Complete French kit'),pdf:fileInfo('repertoire-ui-ux-fr-v1.pdf','French guide PDF'),markdown:fileInfo('repertoire-ui-ux-fr-v1.md','French guide Markdown')}};
  fs.writeFileSync(path.join(product,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(`Ready: ${archive} (${(manifest.files.archive.bytes/1048576).toFixed(2)} MiB), ${names.length} files. No Gumroad publication performed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
