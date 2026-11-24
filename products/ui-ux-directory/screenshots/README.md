# Captures du répertoire : import hors réseau et revue

## Résultat utilisé dans les livres FR/EN

- **75 destinations** dans le catalogue, communes aux deux langues.
- **21 PNG originaux reçus**, tous conservés sans modification.
- **20 aperçus optimisés et relus**, intégrés dans chaque PDF avec une image et une URL cliquables.
- **1 image écartée localement** : Shadcn Design Theme Generator montre encore un indicateur de chargement dans la zone de démonstration. Son original reste conservé.
- Les **3 rejets, 1 échec et 50 attentes** déjà déclarés dans le lot externe ne deviennent pas des captures réussies.

Il s’agit d’une livraison **partiellement illustrée**, pas de 75 sites capturés ou audités. La revue visuelle contrôle l’identité du site, la présence d’un contenu utile et l’absence d’un blocage évident ; elle ne teste pas les fonctions du service ni les droits de diffusion. Les interfaces gardent leur langue d’origine.

## Provenance inchangée

Soumission externe issue du commit `ddf2bccc6864d4f23b15e0da043df7189d869c76` :

- `manifest.external-ddf2bcc.json`, SHA-256 `011e4bf6271acf95696e23204e2db2388e26e8445f6b9aa650ba7c63ff88661a` ;
- 21 originaux dans `images/`, dimensions 2560 × 1600, empreintes et tailles contrôlées contre ce manifeste ;
- statuts et arrêt sur quota `ERATE` attribués à cette soumission, pas à une exécution effectuée ici.

Le lot déclare des captures obtenues le **19 novembre 2026**. Cet horodatage externe n’est pas vérifié indépendamment et n’a pas été réécrit. Les légendes le présentent comme une date déclarée par le lot, pas comme une mesure effectuée par cet agent. Une image peut aussi provenir d’un cache ; elle ne garantit pas l’état actuel d’un service.

`visual-review.json` contient la décision pour chacun des 21 originaux, son SHA-256 et, pour les 20 inclus, le SHA-256 exact du dérivé relu. Le manifeste canonique `manifest.json` conserve les statuts et les références de provenance. Les originaux ne sont pas renommés ou écrasés.

## Optimisation locale reproductible

Les dérivés ont une largeur de **960 px**, une hauteur de **600 px**, sans recadrage, et une palette PNG de 256 couleurs. Chacun reste sous **200 000 octets**. Les noms canoniques sont les 20 premiers caractères du SHA-256 de l’URL. Les originaux, plus lourds, restent archivés séparément.

L’import n’a besoin ni de clé ni de connexion réseau. L’environnement de fabrication utilise Python, Pillow 13.0.0 et PyMuPDF 2.1 pour la relecture indépendante des PDF ; ces dépendances ne sont pas nécessaires au build du site.

```bash
# Dans un environnement Python local avec Pillow :
python scripts/import_free_resource_captures.py
npm run microlink:plan
npm run generate:resource
npm run generate:resource:en
npm run check:resource
npm run package:resource
```

L’import refuse un manifeste externe ou un original dont l’empreinte a changé. Il refuse également un dérivé différent de celui associé à la revue : examiner la nouvelle image avant toute nouvelle approbation. L’approbation ne doit pas être étendue automatiquement après un changement d’outil ou d’image.

## Deux modes de génération distincts

- **`--with-available-screenshots`** : sélection partielle explicite, utilisée par les deux commandes npm de fabrication. Seules les captures approuvées sont incluses ; un fichier approuvé mais corrompu provoque un échec, il n’est pas discrètement ignoré. Chaque aperçu occupe une page lisible. Livraison actuelle : **54 pages par guide**, dont **20 pages d’aperçus**, plus **3 pages** pour la fiche de décision séparée.
- **`--with-screenshots`** : ancien contrôle complet, toujours strict. Il exige les **75 images** intègres et approuvées. Dans l’état actuel, il échoue avant d’écraser les livrables. Ce contrôle ne donne aucune autorisation de recapture.
- **`--without-screenshots`** : fabrication texte expressément demandée ; ne décrit pas les livrables illustrés actuels.

Les images sont intégrées aux PDF, pas fournies comme pack de sites à réutiliser. Les ZIP clients gardent **7 fichiers par langue**. Les livrables sont dans `products/ui-ux-directory/releases/`, jamais dans les téléchargements publics du site.

## Acquisition suspendue

**Aucun nouvel appel Microlink ni téléchargement CDN n’a été effectué pour cette préparation.** L’import, l’optimisation et la génération sont hors réseau.

`acquisitionPaused` bloque toute nouvelle requête de capture sur **`EACQUISITIONPAUSED`**, avant la lecture de clé ou le chargement du SDK. `microlink:plan` reste hors réseau et affiche `captureBlocked: true`, `apiCallsNeeded: null` et `networkCallsMadeByThisPlan: 0`. Ne pas supprimer ce blocage pour remplir les destinations manquantes. Le propriétaire a demandé d’utiliser les images disponibles, sans nouvelle dépense.

L’outil SDK historique reste isolé sous `tools/microlink/` et Node 24+, sans migrer le site Node 22. Ses garde-fous de budget explicite, arrêt sur erreur, refus de reprise réseau automatique et refus des redirections authentifiées restent en place. Une clé précédemment exposée doit être révoquée par son propriétaire ; aucune clé n’a été recopiée ici. Ne jamais placer de secret dans le navigateur, les archives, Git ou le chat.

## Fichiers à conserver hors des téléchargements clients

Les originaux, manifestes de capture, décisions de revue, HTML de travail, planches de contrôle et sources restent des fichiers de fabrication. Le kit client contient seulement les PDF, textes, grille et notices attendus. Aucune publication Gumroad ni aucun déploiement manuel n’est réalisé par ces scripts.
