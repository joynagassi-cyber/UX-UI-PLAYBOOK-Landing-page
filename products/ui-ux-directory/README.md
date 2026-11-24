# Répertoire UI/UX gratuit : fabrication et livraison Gumroad

Livre gratuit distinct du Playbook à 29 USD : **51 fiches, 6 familles, 75 liens et 20 captures de sites**. Certaines fiches regroupent plusieurs destinations ; ne pas annoncer 75 outils audités. Le texte est en français ; les captures conservent la langue des interfaces.

## Livrables français

- [ZIP client français](releases/fr/Repertoire-UI-UX-Gratuit-FR.zip) : **7 fichiers**, environ **2,38 Mio**.
- [Livre PDF français](releases/fr/Repertoire-UI-UX-Gratuit-FR.pdf) : **54 pages A4**, dont **20 pages d’aperçus**, avant la promotion finale du Playbook français.
- [Texte Markdown](releases/fr/Repertoire-UI-UX-Gratuit-FR.md) : fiches complètes, liens et brief IA ; captures uniquement dans le PDF.
- [Fiche Gumroad](gumroad-listing.md), [guide de publication](publication-guide.md), [couverture 0 $](marketing/cover-1280x720.png) et [vignette 0 $](marketing/thumbnail-1080x1080.png).
- [Édition anglaise](en/README.md) : fichiers clients, textes et visuels distincts.
- [Kit global FR/EN](releases/Livres-UI-UX-Gratuits-FR-EN-Kit-Gumroad.zip) : les deux ZIP clients, les deux livres PDF, les visuels et les documents de publication, dans des dossiers séparés. Ce n’est pas le fichier à charger dans un seul produit Gumroad.

Le ZIP client contient `LIRE-MOI-FR.md`, `Repertoire-UI-UX-Gratuit-FR.pdf`, `Repertoire-UI-UX-Gratuit-FR.md`, `Fiche-decision-UI-UX-FR.pdf`, `Fiche-decision-UI-UX-FR.md`, `Grille-selection-UI-UX-FR.csv` et `LICENCES-FR.txt`. La fiche PDF a **3 pages imprimables**, sans formulaire interactif. Le CSV utilise UTF-8 avec BOM, le point-virgule, **6 lignes de familles et 11 colonnes**, plus l’en-tête.

## Sources et captures

- `catalogue.json` : source française éditée, sans modification des 51 fiches pendant l’intégration illustrée.
- `source-original.md` : document fourni, conservé pour traçabilité, non distribué.
- `manifest.json` : pages, chemins hors site, tailles, SHA-256 et liste des 20 destinations illustrées.
- `screenshots/manifest.external-ddf2bcc.json` et les **21 originaux PNG** : conservés octet pour octet.
- `screenshots/visual-review.json` : décision et empreinte de chaque original, ainsi que l’empreinte exacte du dérivé approuvé.
- `screenshots/manifest.json` : **20 captures optimisées approuvées**, une capture de chargement écartée, autres rejets/échecs/attentes conservés. Aucune image inventée ni nouvel appel de capture.

La couverture illustrée est partielle. Les dates sont celles déclarées par le lot externe, non vérifiées indépendamment. La revue visuelle n’est ni un audit fonctionnel ni une validation juridique des 75 destinations.

## Régénérer hors réseau

```bash
# Dépendances Node installées, Chromium disponible.
# CHROMIUM_EXECUTABLE_PATH peut désigner un navigateur existant.
npm run generate:resource
npm run generate:resource:en
npm run check:resource
npm run package:resource
```

Les commandes npm sélectionnent explicitement `--with-available-screenshots`. Ce mode accepte une sélection partielle, mais refuse un fichier approuvé corrompu, remplacé ou lié symboliquement. Les captures absentes ou non approuvées ne sont pas présentées comme réussies.

Le contrôle strict historique reste disponible avec `node scripts/generate_free_resource.cjs --with-screenshots` : il exige les **75 images** et échoue avant d’écraser les livrables si le lot est incomplet. Ne pas l’utiliser comme consigne de recapture. Le mode `--without-screenshots` est réservé à une fabrication texte explicite et ne décrit pas la livraison illustrée actuelle.

Les fichiers clients sortent exclusivement dans `products/ui-ux-directory/releases/`, jamais dans `public/downloads`. Les fichiers de travail restent dans `.cache/free-resource/`. Seuls les visuels images sont copiés dans `public`. Modifier l’origine canonique impose de régénérer les deux langues pour actualiser les liens imprimés, puis de revoir les comptes, textes et archives.

## Retrait du site et publication

Les pages, promotions, métadonnées de catalogue, exports LLM et téléchargements du répertoire sont retirés du site source. Seuls leurs assets images restent. Les quatre guides éditoriaux par langue et l’offre payante restent inchangés. Un retrait local n’est pas une preuve de retrait en production.

**Produits Gumroad publiés par le propriétaire : [Répertoire UI/UX gratuit FR](https://joyccelight.gumroad.com/l/repertoire-ui-ux-gratuit-fr) et [Free UI/UX Directory EN](https://joyccelight.gumroad.com/l/free-ui-ux-directory-en).** Aucun teaser ni fallback local n’est ajouté. Les anciennes adresses `/fr/resources/ui-ux-directory` et `/en/resources/ui-ux-directory` (formes `.html` et slash final comprises) redirigent en 308 vers le produit de leur langue ; les anciens téléchargements restent en vraie 404.

Les conditions du guide sont à relire par le créateur. Les captures sont des aperçus éditoriaux, pas des packs réutilisables. Aucun résultat commercial, de visibilité ou de conformité d’accessibilité n’est promis. Le balisage PDF n’est pas une certification PDF/UA.
