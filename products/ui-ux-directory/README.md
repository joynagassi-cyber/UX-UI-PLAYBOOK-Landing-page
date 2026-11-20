# Répertoire UI/UX gratuit — dossier de fabrication

Produit issu du fichier Markdown fourni par Joy N. : **51 fiches, 6 familles, 75 liens de ressources**. Les fiches qui regroupent plusieurs sites restent une fiche : ne pas annoncer « 75 outils vérifiés ».

- `catalogue.json` : version éditée, source unique des fiches, catégories et références. Mise à jour éditoriale : **18 novembre 2026**.
- `source-original.md` : document fourni, archivé pour traçabilité ; il n’est ni distribué ni affiché sur le site et contient des affirmations remplacées dans l’édition.
- `manifest.json` : pages, noms, tailles et SHA-256 des livrables français générés.
- [`en/`](en/README.md) : traduction anglaise complète, manifeste, ZIP, visuels et documents de publication distincts.
- `gumroad-listing.md` : textes de la fiche produit, prêts à copier.
- `publication-guide.md` : réglage gratuit, fichiers à charger, test à 0 et raccordement du vrai lien au site.
- `marketing/cover-1280x720.png` et `marketing/thumbnail-1080x1080.png` : visuels originaux pour Gumroad, distincts des fichiers à télécharger.

## Régénérer

```bash
# Chromium doit être installé : npx playwright install chromium
npm run generate:resource       # Français
npm run generate:resource:en    # Anglais
npm run check:resource
```

`CHROMIUM_EXECUTABLE_PATH` peut pointer sur un navigateur déjà disponible. Le générateur lit Domine et les icônes Lucide locales, vérifie les débordements des pages avant impression, produit deux PDF en français, le Markdown, une grille CSV et un ZIP aux entrées horodatées à la date de l’édition. Les copies de travail sont dans `.cache/free-resource/`, ignoré ; seuls les livrables utilisés sont dans `public/downloads/`. Le générateur français ne modifie que les fichiers et visuels français ; le générateur anglais produit les livrables de `en/` et les téléchargements anglais. La mise en page commune est dans `scripts/free_resource_layout.cjs`. Chaque page du site fournit le kit de sa langue.

Changer `NEXT_PUBLIC_SITE_URL` impose de régénérer les deux éditions pour actualiser les liens imprimés. L’origine de génération figure dans le manifeste et est contrôlée avant le déploiement. Ne pas modifier les fichiers binaires à la main.

## Périmètre éditorial

Réécriture des descriptions et des usages pour trois profils ; retrait des garanties de rendu, performance, accessibilité ou absence d’erreurs IA. Distinction entre gratuité du guide et tarification/licences de chaque service. Corrections documentées dans les références, en particulier ApexCharts, unDraw, Storyset, Fontshare et les usages de Radix Colors. Mise à jour des adresses de React Native Reusables, Recharts et Chartist. Aucune illustration, police, bibliothèque ou autre ressource tierce du répertoire n’est redistribuée ; seules les notices de Domine/Lucide utilisés pour fabriquer les documents sont incluses.

Les 75 destinations n’ont pas subi d’audit exhaustif de disponibilité ou de licence. Des pistes du document fourni sont expressément signalées comme non testées. Cette édition n’est pas un conseil juridique ni une certification. Le site n’ajoute ni formulaire de collecte, ni traceur ni abonnement implicite. Le texte des conditions d’usage du guide est une proposition à valider par son créateur avant publication.

## Publication

**Aucun produit Gumroad n’a été créé ni publié par cet agent.** Le connecteur Gumroad n’est pas disponible dans cette session. Le site propose donc un vrai téléchargement direct sans email. Le propriétaire publie le ZIP dans son compte puis renseigne `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_FR` ou `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL_EN` avec l’URL réellement obtenue pour chaque langue. L’ancien `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL` reste un repli français uniquement ; il ne contrôle jamais le CTA anglais. Les deux produits doivent avoir des URLs distinctes. La configuration refuse les URLs payantes du Playbook et n’invente jamais d’URL de produit gratuit. Voir le guide de publication.

## Demande suivante : aperçus cliquables Microlink

[Workflow, sécurité de la clé, essai GitHub, quota et intégration PDF](screenshots/README.md). Aucun appel API n’a été effectué ici. Un commit distant déjà présent sur cette branche a fourni **21 PNG marqués approuvés dans son manifeste**, conservés sans modification avec `screenshots/manifest.external-ddf2bcc.json`. Leur import reste à réconcilier (schéma, chemins, dimensions et poids) ; le manifeste canonique bloque toute nouvelle capture sur `EIMPORTPENDING` pour éviter des appels payants en double. Les hashes, tailles et dimensions ont été contrôlés, pas une nouvelle approbation visuelle.

Les kits actuels restent sans galerie. Le drapeau `--with-screenshots` exige les 75 PNG présents, compatibles, intègres et relus avant de modifier un livrable. Les images seront communes aux deux langues ; il faudra ensuite actualiser les pages/tailles des textes de publication d’après les nouveaux manifestes.
