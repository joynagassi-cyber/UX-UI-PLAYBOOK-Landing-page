#!/usr/bin/env node
// Package an explicit allowlist of product deliverables, never source or raw captures.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { root } = require('./content-data.cjs');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const product = 'products/ui-ux-directory';
const outputFolder = path.join(root, product, 'releases');
const work = path.join(root, '.cache/free-resource/publication');
const manifests = Object.fromEntries(['fr', 'en'].map(locale => [locale, JSON.parse(fs.readFileSync(path.join(root, product, locale === 'en' ? 'en/manifest.json' : 'manifest.json'), 'utf8'))]));
const mappings = [];
const add = (source, destination) => mappings.push({ source, destination });
for (const locale of ['fr', 'en']) {
  const manifest = manifests[locale];
  if (manifest.distribution !== 'gumroad-only' || manifest.screenshots?.mode !== 'partial'
    || manifest.screenshots.count !== 20 || manifest.counts.guidePages !== 54
    || manifest.counts.archiveFiles !== 7) throw new Error(`Review ${locale} counts and publication copy before packaging a changed release.`);
  for (const file of Object.values(manifest.files)) {
    if (!file.path.startsWith(product + '/releases/' + locale + '/') || file.path.includes('..')) throw new Error('Unsafe or public artifact path.');
    const bytes = fs.readFileSync(path.join(root, file.path));
    if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) throw new Error('Artifact differs from its reviewed manifest: ' + file.path);
  }
  const language = locale.toUpperCase();
  add(manifest.files.archive.path, `01-FICHIERS-CLIENTS/${language}/${path.basename(manifest.files.archive.path)}`);
  add(manifest.files.pdf.path, `02-LIVRES-PDF/${path.basename(manifest.files.pdf.path)}`);
  const ownerFolder = product + (locale === 'en' ? '/en' : '');
  for (const [source, destination] of [
    ['gumroad-listing.md', 'Texte-Gumroad-' + language + '.md'],
    ['publication-guide.md', 'Guide-publication-' + language + '.md'],
    ['marketing/cover-1280x720.png', 'Couverture-0-USD-' + language + '-1280x720.png'],
    ['marketing/thumbnail-1080x1080.png', 'Thumbnail-0-USD-' + language + '-1080x1080.png'],
  ]) add(`${ownerFolder}/${source}`, `03-PUBLICATION-GUMROAD/${language}/${destination}`);
}
const destinations = new Map(mappings.map(item => [item.source, item.destination]));
if (new Set(mappings.map(item => item.destination)).size !== mappings.length) throw new Error('Duplicate publication path.');
const files = mappings.map(item => {
  let bytes = fs.readFileSync(path.join(root, item.source));
  if (item.source.endsWith('.md')) {
    const text = bytes.toString('utf8').replace(/\[([^\]]+)\]\(([^)#]+)\)/g, (match, label, href) => {
      if (/^https?:|^mailto:/u.test(href)) return match;
      const sourceTarget = path.posix.normalize(path.posix.join(path.posix.dirname(item.source), href));
      const destinationTarget = destinations.get(sourceTarget);
      if (!destinationTarget) throw new Error('Publication document links to an unpackaged file: ' + sourceTarget);
      return `[${label}](${path.posix.relative(path.posix.dirname(item.destination), destinationTarget)})`;
    });
    bytes = Buffer.from(text);
  }
  return { destination: item.destination, bytes };
});
const overview = `# Livres UI/UX gratuits : kit de publication FR/EN

## À charger dans Gumroad

- Produit français : \`01-FICHIERS-CLIENTS/FR/Repertoire-UI-UX-Gratuit-FR.zip\`.
- English product: \`01-FICHIERS-CLIENTS/EN/Free-UI-UX-Directory-EN.zip\`.

Chaque ZIP client contient 7 fichiers dans une seule langue. Ne chargez pas cette archive générale comme contenu d’un produit : elle contient aussi les documents de publication.

## À relire

\`02-LIVRES-PDF/\` contient les deux livres directement accessibles : **54 pages chacun, 51 fiches, 6 familles, 75 liens et 20 captures cliquables**. Chaque livre est aussi dans son ZIP client, avec une fiche de décision de 3 pages, deux Markdown, un CSV, un mode d’emploi et les notices.

Les 20 captures sont partagées entre les deux éditions, pas 40 captures différentes. Les interfaces restent dans leur langue d’origine. La sélection est partielle ; les 75 liens restent présents. Une capture de chargement a été écartée des 21 originaux reçus. Aucun aperçu n’a été inventé et aucun nouvel appel de capture n’a été lancé.

## Pour publier

\`03-PUBLICATION-GUMROAD/FR/\` et \`EN/\` contiennent chacun :

- le nom, le résumé, la description et les messages à copier ;
- le guide de publication et de test à 0 ;
- une couverture 1280 × 720 et un thumbnail 1080 × 1080, avec le prix **0 $ / $0**.

Aucun produit n’a été publié par cet agent. Les règles actuelles de Gumroad doivent être vérifiées dans le compte ; tester les deux parcours à 0 avant de les partager. Retirer les consignes internes du texte public.

## Site et liens attendus

Les pages, téléchargements et promotions du répertoire sont retirés du code du site. Leurs images sont conservées. Aucun teaser ou téléchargement de repli n’est prévu. Les quatre guides éditoriaux par langue et le Playbook payant sont conservés. Un changement local n’est pas une preuve de retrait en production.

**Transmettre les deux vraies URL publiques Gumroad FR/EN après publication et test pour ajouter les redirections dans une prochaine modification.** Aucun lien de produit gratuit n’est inventé dans ces fichiers.

Chaque livre se termine par le Playbook payant localisé : 182 pages FR / 171 pages EN, 120 sections, 77 règles, kit de 26 pages et 12 fiches, archive de 21 fichiers dans la langue achetée, 29 USD en paiement unique. Ces fichiers payants ne sont pas inclus.

## Contrôles et limites

\`CONTENU-VERIFIE.json\` décrit les fichiers livrés. \`SHA256SUMS.txt\` permet de vérifier leur intégrité. Les images et PDF ont été relus ; cela ne constitue ni un audit des 75 sites, ni une certification d’accessibilité ou PDF/UA. Les dates de capture sont déclarées par la soumission externe, non vérifiées indépendamment. Les captures ne sont pas des actifs à extraire et réutiliser.

Contact : joynagassi@gmail.com
`;
files.push({ destination: 'LIRE-MOI-PUBLICATION.md', bytes: Buffer.from(overview) });
const inventory = {
  version: 1, distribution: 'owner-publication-kit', gumroadPublishedByAgent: false,
  freeStoreUrlsSupplied: false,
  countsPerLanguage: { entries: 51, categories: 6, resourceLinks: 75, screenshots: 20, guidePages: 54, worksheetPages: 3, customerArchiveFiles: 7 },
  languages: manifests,
  contents: files.map(file => ({ path: file.destination, bytes: file.bytes.length, sha256: sha256(file.bytes) })),
};
files.push({ destination: 'CONTENU-VERIFIE.json', bytes: Buffer.from(JSON.stringify(inventory, null, 2) + '\n') });
files.push({ destination: 'SHA256SUMS.txt', bytes: Buffer.from(files.map(file => `${sha256(file.bytes)}  ${file.destination}`).sort().join('\n') + '\n') });
fs.mkdirSync(work, { recursive: true });
fs.mkdirSync(outputFolder, { recursive: true });
for (const file of files) {
  const target = path.join(work, file.destination);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, file.bytes);
}
const archive = path.join(outputFolder, 'Livres-UI-UX-Gratuits-FR-EN-Kit-Gumroad.zip');
execFileSync('python3', ['-c', `from pathlib import Path
import json,sys,zipfile
base=Path(sys.argv[1])
with zipfile.ZipFile(sys.argv[2]+'.tmp','w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for name in sorted(json.loads(sys.argv[3])):
  info=zipfile.ZipInfo(name,(2026,11,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16
  z.writestr(info,(base/name).read_bytes())
Path(sys.argv[2]+'.tmp').replace(sys.argv[2])`, work, archive, JSON.stringify(files.map(file => file.destination))]);
const bytes = fs.readFileSync(archive);
const release = { path: path.relative(root, archive).split(path.sep).join('/'), bytes: bytes.length, sha256: sha256(bytes), files: files.length };
fs.writeFileSync(path.join(outputFolder, 'publication-manifest.json'), JSON.stringify(release, null, 2) + '\n');
console.log(`Publication kit ready: ${release.path}; ${files.length} files; ${(bytes.length / 1048576).toFixed(2)} MiB. No upload or deployment performed.`);
