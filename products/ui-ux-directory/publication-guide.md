# Publier le Répertoire UI/UX sur Gumroad

## Situation actuelle

Le produit téléchargeable et son intégration au site sont préparés dans ce dépôt. **Aucun produit Gumroad n’a été créé ou publié et aucun déploiement du site n’a été effectué pour cette tâche.** Le connecteur Gumroad n’est pas pris en charge dans cette session. Aucune demande de mot de passe ou de jeton n’est nécessaire : le propriétaire effectue les actions dans son compte.

En attendant, le site exporté sert un téléchargement direct réel, sans email ni lien Gumroad inventé. L’aperçu local n’est pas une mise en production.

**Demande d’illustration ultérieure :** le [workflow Microlink](screenshots/README.md) est préparé, mais aucune vraie capture n’a encore été obtenue. Les fichiers et chiffres ci-dessous décrivent le kit actuel **sans captures**. Actualiser cette fiche après la génération illustrée réelle ; ne pas annoncer les aperçus avant leur présence dans le PDF.

## 1. Fichiers à utiliser

| Usage | Fichier dans le dépôt |
| --- | --- |
| Contenu à livrer au client | [repertoire-ui-ux-gratuit-v1.zip](../../public/downloads/repertoire-ui-ux-gratuit-v1.zip) |
| Couverture marketing | [cover-1280x720.png](marketing/cover-1280x720.png) |
| Vignette carrée | [thumbnail-1080x1080.png](marketing/thumbnail-1080x1080.png) |
| Texte à copier | [gumroad-listing.md](gumroad-listing.md) |
| PDF pour relecture | [repertoire-ui-ux-fr-v1.pdf](../../public/downloads/repertoire-ui-ux-fr-v1.pdf) |

Le ZIP inclut sept fichiers : guide PDF de 34 pages, même contenu en Markdown, fiche PDF de 3 pages, fiche Markdown, CSV, mode d’emploi et notices. Il pèse environ **540 Kio**. Ne pas charger le dossier source, le document original ni ce guide de publication comme contenu client.

La [version anglaise](en/README.md) possède son propre ZIP, ses visuels, sa [fiche Gumroad](en/gumroad-listing.md) et son [guide de publication](en/publication-guide.md). Ne pas remplacer les fichiers français par les fichiers anglais dans ce produit.

Avant publication, le créateur doit relire les textes, les conditions d’usage proposées dans `LICENCES.txt` et les références, et confirmer le régime applicable à son activité. Ne pas ajouter de fichiers tiers au ZIP sans permission.

## 2. Créer le produit gratuit

1. Dans le compte du créateur, aller à **Products → New product** et choisir un produit numérique adapté au ZIP (l’intitulé exact peut évoluer).
2. Copier le nom, le résumé et la description de `gumroad-listing.md`.
3. Régler **Amount / montant à 0**. La documentation Gumroad décrit alors un prix libre permettant la gratuité. Régler le montant suggéré à **0** si le champ est présent.
4. Ne pas ajouter de version payante ou d’abonnement à ce produit. Vérifier l’aperçu : le client doit pouvoir saisir **0** et obtenir le kit sans carte bancaire. Une éventuelle contribution doit rester facultative.
5. Ajouter le ZIP comme contenu livré. La limite documentée pour les produits gratuits est de **250 MB cumulés** ; ce kit est très en dessous.
6. Ajouter la couverture **1280 × 720** et la vignette **1080 × 1080**. Ces visuels sont du marketing, pas les fichiers livrés.
7. Confirmer langue française, formats et absence du Playbook payant. Le texte de bouton disponible dépend de Gumroad ; ne pas promettre un bouton personnalisé.
8. Vérifier les obligations du compte (identité, paramètres de vente et autres exigences affichées) puis publier vous-même.

## 3. Tester avant de partager

- Ouvrir le lien public dans une fenêtre privée, hors du compte vendeur.
- Saisir **0**, suivre le parcours gratuit et confirmer qu’aucune contribution n’est obligatoire.
- Télécharger le ZIP livré par Gumroad, le décompresser et ouvrir les deux PDF.
- Vérifier **34 pages / 3 pages**, accents, liens cliquables et présence des sept fichiers.
- Vérifier le CSV dans un tableur (UTF-8, point-virgule).
- Relire la fiche produit sur téléphone ; ce produit livre uniquement les fichiers français. L’édition anglaise possède un téléchargement et un produit distincts.
- Si Gumroad propose des communications marketing, traiter le consentement séparément de la remise du fichier. Ne pas inscrire implicitement tous les destinataires à une newsletter.
- Copier **l’URL publique réellement publiée**.

## 4. Brancher cette URL au site

Définir la variable de build suivante avec la vraie URL obtenue :

```env
NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_FR=
```

La valeur doit être une URL HTTPS de produit du magasin `joyccelight.gumroad.com`, avec un chemin `/l/` suivi du slug réellement attribué. **Laisser la valeur vide tant que le produit n’existe pas.** La configuration rejette les deux URLs payantes existantes du Playbook, les autres domaines, les paramètres de suivi et les identifiants dans l’URL. Les paramètres UTM entrants sont ensuite transmis par le bouton existant. L’ancien `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL` reste un repli français si la nouvelle variable française est vide. La page anglaise ne lit que `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN` et conserve son ZIP direct si cette valeur est vide. Les deux langues ne peuvent pas réutiliser la même URL de checkout. La validation ne vérifie ni le contenu ni le prix du produit distant : le test manuel à 0 reste obligatoire.

```bash
npm run check:resource
npm run typecheck
npm run test:routing
npm run build
npm run check:export
npm run preview:pages
# Dans un autre terminal :
python3 scripts/site_check.py --base-url http://127.0.0.1:3100
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
```

Le CTA principal de la page gratuite devient alors **« Obtenir gratuitement sur Gumroad »**. Les liens vers le PDF et le Markdown restent de vrais fichiers locaux ; aucun formulaire de collecte n’est ajouté au site. Déployer ensuite la révision via le processus Cloudflare du propriétaire. Un changement de variable exige un nouveau build statique, pas uniquement une sauvegarde dans un tableau de bord.

Pages du site à partager **après déploiement** :

- FR : `/fr/resources/ui-ux-directory`.
- EN : `/en/resources/ui-ux-directory` (guide, fiche et grille en anglais, dans un ZIP distinct).

L’origine canonique de build actuelle est `https://joyccelight-playbook.uxplay.workers.dev`. Sa présence dans les documents n’établit pas que la page est publiée. Si l’origine publique définitive change, régénérer les deux kits avec `NEXT_PUBLIC_SITE_URL` avant publication puis relancer les contrôles : les liens imprimés ne changent pas tout seuls.

## 5. Une promotion simple, sans promesse de trafic

1. Publier Gumroad et déployer la page, puis tester les deux liens publics.
2. Utiliser le texte de lancement proposé dans la fiche et la couverture jointe.
3. Garder la page gratuite accessible depuis l’accueil, le hub Article et chaque article.
4. Les liens du kit reviennent vers les articles et l’offre du Playbook avec des paramètres UTM ; ils ne collectent rien seuls. Le site n’a pas reçu d’outil de mesure supplémentaire.
5. Observer d’abord les téléchargements et les retours, si vos outils et consentements le permettent. Aucune hausse de trafic, inscription ou vente n’est garantie.

## Références de configuration consultées

- Création d’un produit : https://gumroad.com/help/article/149-adding-a-product
- Prix libre et montant 0 : https://gumroad.com/help/article/133-pay-what-you-want-pricing
- Limite des fichiers gratuits : https://gumroad.com/help/article/289-file-size-limits-on-gumroad
- Couverture et vignette : https://gumroad.com/help/article/60-adding-a-cover-image

Ces liens documentent les réglages au moment de la préparation française ; ils n’ont pas été revalidés lors de la traduction anglaise. L’interface et les règles peuvent évoluer ; les vérifier dans le compte avant publication.
