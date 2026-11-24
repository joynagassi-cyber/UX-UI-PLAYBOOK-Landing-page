# Livraison des livres gratuits FR/EN et retrait du répertoire du site

## Périmètre confirmé

Le propriétaire demande de livrer les livres gratuits illustrés avec les captures disponibles, sans attendre les 75 destinations ni lancer une nouvelle série payante. Il confirme le retrait des pages, téléchargements et promotions du répertoire sur le site, en conservant ses seuls assets images. Les deux vraies URL Gumroad seront fournies ensuite pour ajouter les redirections. Ni teaser, ni catalogue web sans téléchargement, ni faux checkout n’est maintenu.

La PR 12 est déjà fusionnée, commit `b383b0cc9394fabf211371fd2d94463ee457b752`. Cette préparation poursuit le travail sur la branche Arena existante ; elle ne refusionne pas cette PR et ne réalise aucun déploiement manuel ou changement distant de configuration.

## Livrables contrôlés

Archive principale : `products/ui-ux-directory/releases/Livres-UI-UX-Gratuits-FR-EN-Kit-Gumroad.zip`.

Elle contient **15 fichiers** : les deux ZIP clients, les deux livres PDF directement accessibles, deux fiches Gumroad, deux guides de publication, quatre visuels, un mode d’emploi général, un inventaire et un fichier de sommes de contrôle. Les clients et le marketing sont séparés dans des dossiers explicites.

| Édition | Livre | Aperçus | Fiche de décision séparée | ZIP client |
| --- | --- | --- | --- | --- |
| FR | 54 pages A4 | 20 captures | 3 pages A4 | `Repertoire-UI-UX-Gratuit-FR.zip`, 7 fichiers |
| EN | 54 pages A4 | Les mêmes 20 captures | 3 pages A4 | `Free-UI-UX-Directory-EN.zip`, 7 fichiers |

Les deux éditions conservent **51 fiches, 6 familles, 75 liens distincts et 11 notes de sources**. Les images ne sont pas livrées comme un pack réutilisable. Les interfaces restent dans leur langue d’origine. Les descriptions Gumroad distinguent le texte de chaque langue et les images d’origine.

Les couvertures 1280 × 720 et thumbnails 1080 × 1080 sont tous marqués **0 $ / $0**. Les fichiers, octets et SHA-256 exacts sont dans les manifestes de chaque langue et `releases/publication-manifest.json`. L’archive globale n’est pas destinée à être chargée comme contenu d’un seul produit Gumroad.

Chaque livre finit par une promotion du Playbook localisée : **182 pages FR / 171 EN**, **120 sections**, **77 règles**, kit de **26 pages et 12 fiches A4**, archive de **21 fichiers dans la langue achetée**, **29 USD en paiement unique**. Les liens sont les boutiques réelles `uiuxplaybookfr` et `uxuiplaybook`, sans fichiers payants dans cette livraison.

## Revue des captures

Le manifeste externe `manifest.external-ddf2bcc.json`, SHA-256 `011e4bf6271acf95696e23204e2db2388e26e8445f6b9aa650ba7c63ff88661a`, et les **21 originaux** sont conservés octet pour octet.

Une planche des originaux puis les images douteuses ont été ouvertes. Les **20 dérivés optimisés** ont aussi été examinés. La capture de `https://www.shadcndesign.com/theme-generator` est exclue : elle montre encore un indicateur de chargement dans la zone du générateur. Sa fiche reste dans le répertoire et son original est conservé.

L’import local produit des PNG de **960 × 600**, sans recadrage, palette de 256 couleurs, sous **200 000 octets chacun**. `visual-review.json` lie chaque décision aux empreintes de l’original et du dérivé relu. L’import refuse un dérivé dont les pixels encodés ont changé avant une nouvelle revue. Un second import a confirmé la reproductibilité locale.

Statuts canoniques : **20 capturées/approuvées, 4 rejetées dont 1 décision locale, 1 échec ERATE, 50 attentes**. Les statuts externes restent distingués de la revue locale. Les horodatages déclarés le 19 novembre 2026 sont conservés comme données du fournisseur, non vérifiées ici ; les légendes ne prétendent pas les avoir mesurés.

`acquisitionPaused` bloque toute nouvelle requête, y compris un essai GitHub ou une reprise individuelle, avant lecture de clé ou chargement du SDK. Le plan est hors réseau et affiche 20 images locales approuvées, `captureBlocked: true`, `apiCallsNeeded: null` et zéro appel réseau. Aucun appel API de capture ni téléchargement CDN n’a été effectué pour cette livraison.

## Retrait du site

Retraits ciblés :

- route `src/app/[locale]/resources/ui-ux-directory/page.tsx`, composants de promotion et téléchargement, module UI et ancienne configuration de checkout gratuit ;
- les six PDF/ZIP/Markdown sous `public/downloads`, sans copie dans un autre chemin public ;
- liens et blocs de promotion sur les accueils, le hub et les pages d’articles, navigation et pieds de page ;
- catalogue intégral, liens de téléchargement et métadonnées du répertoire dans les endpoints LLM et le sitemap ;
- anciens alias permanents et en-têtes dédiés aux téléchargements ; styles du répertoire retirés.

Les générateurs écrivent maintenant dans `products/ui-ux-directory/releases/`. Les quatre guides éditoriaux par langue, leurs schémas, illustrations, sources et sommaires restent présents. L’offre payante, les aperçus autorisés, l’origine Worker, le routage linguistique et les vraies 404 restent préservés. Le sitemap comporte **12 pages canoniques**, avec **24 alias** pour les pages conservées. Les images du répertoire restent servies.

Le mode partiel `--with-available-screenshots` est explicite dans les scripts npm. Il ne contourne pas l’intégrité d’un fichier approuvé corrompu. Le mode complet `--with-screenshots` reste strict : le lot partiel provoque un échec avant écrasement des livrables, avec 55 destinations non disponibles pour ce mode.

## Préservation sans réinitialisation

Le contrôle initial a effectivement échoué sur les retraits et changements attendus. Son journal est `reports/free-resource-gumroad/preservation-before-review.log`.

La baseline historique reste inchangée, SHA-256 `68329e1ac8b7cf1a150be421139c1a7902e0ad4e912c2bdc2ef266b04cb756d2`. Le registre ajoute uniquement les transitions exactes du présent périmètre et les nouveaux livrables vérifiés. Aucun refresh global, wildcard ou dossier exempté.

Les retraits protégés ont une empreinte de prédécesseur et une raison. Ils deviennent des tombstones : leur réapparition fait échouer le contrôle. Le retrait de route est nommé explicitement dans l’inventaire ; retirer une autre page ou recréer celle-ci échoue toujours. Les tests couvrent les prédécesseurs erronés, les chemins inconnus, les suppressions non documentées et la réintroduction des fichiers. L’empreinte du template de page retiré, qui n’a pas de hash dans la baseline, est recoupée avec le plus récent blob git du chemin quand l’historique est disponible : `predecessorHashVerified: true`, valeur `7774379fc19afc865edb53b78c4f487fd7b4553e974aace821961e0021267bcc`, identique au relevé `before.json` d’avant tâche. Sans historique git, ce recoupement est ignoré, jamais considéré comme réussi.

## Vérifications

Résultats locaux observés :

- **224 tests unitaires réussis**, dont **54 tests de ressource/capture** et **14 tests du contrat de préservation**.
- **223/223 contrôles PDF/ZIP indépendants** : 54 pages par livre, texte intégral des 51 fiches et 11 notes, 75 destinations PDF, 20 images par langue, pixels identiques aux dérivés relus, image et URL pointant sur la bonne destination, promotion payante en dernière page, ZIP clients propres et liens de retour valides.
- **245/245 contrôles d’export statique** : absence de PDF/ZIP/Markdown, de routes gratuites, de catalogue et de liens résiduels dans les fichiers exportés, conservation des images et des contenus payants/autorisés.
- **708 contrôles HTTP automatisés réussis**, zéro échec bloquant ; **4 contrôles humains en attente**, **1 hors périmètre**.
- **426/426 contrôles SEO HTTP locaux** : canonical, langues, sitemap, robots, paramètres, alias et véritables 404. Aucun résultat d’indexation ou de crawler public n’en est déduit.
- Lint, TypeScript, build Next export et dry-run Worker réussis. Le dry-run ne publie rien.
- **Deux tests ciblés de couleurs forcées réussis** après correction du sélecteur de FAQ et emploi des couleurs système sur les blocs copiables. Le changement CSS est limité au mode couleurs forcées ; les thèmes ordinaires ne sont pas recolorés.
- Exécution navigateur complète finale : **102/102 tests réussis** sur le Worker local, y compris le nouveau contrôle « withdrawn directory and downloads are unavailable; images remain » dans les deux langues.

Le premier passage navigateur a révélé un sélecteur de test devenu inadapté après retrait de la page gratuite. Le test a été déplacé vers les éléments `details` réels de la FAQ d’un guide existant. Ce contrôle plus pertinent a aussi révélé des couleurs pâles de blocs copiables sur le Canvas système clair ; les couleurs système CanvasText/Canvas/ButtonText/ButtonFace corrigent ce cas sans désactiver axe ou l’ajustement de couleurs forcées.

Les journaux et rapports reproductibles sont dans `reports/free-resource-gumroad/`. Les rendus régénérés après correction des légendes (première, milieu et dernière pages illustrées FR/EN, promotion finale EN) ont été rouverts : image, URL cliquable, mention « horodatage non vérifié » et pied de page éditorial sont corrects.

## Rejouer les contrôles de fabrication

Les dépendances Python sont facultatives et séparées du build du site :

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements-free-resource.txt
.venv/bin/python scripts/verify_free_resources.py
npm run check:resource
npm run package:resource
```

Le script Python contrôle les pixels réellement incorporés dans les PDF et leurs zones de lien, indépendamment des tests HTML et des générateurs. Les PDF ont des balises et des signets, mais aucune certification PDF/UA ou WCAG n’est annoncée.

## Actions restantes, exclusivement réelles

1. Le créateur relit ses conditions d’usage et les réglages Gumroad actuels dans son compte.
2. Il publie deux produits distincts à 0 et teste chaque ZIP réellement servi, sans contribution obligatoire.
3. Il transmet les deux URL publiques FR/EN.
4. Une modification ultérieure ajoute les redirections localisées, sans rétablir les anciens téléchargements publics.
5. Le retrait du site suit le processus de déploiement autorisé. **Cette livraison locale ne prouve pas un retrait en production.**

Aucune publication Gumroad, modification DNS, exposition de sources payantes ou reconfiguration distante n’a été effectuée. Les tests locaux ne constituent ni un audit des 75 destinations, ni une validation juridique des captures, ni une preuve de visibilité, de conversion ou de conformité d’accessibilité.
