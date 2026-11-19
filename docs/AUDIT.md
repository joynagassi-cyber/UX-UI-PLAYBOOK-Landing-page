# Audit appliqué — export Pages et comparatif UX/UI/Product

## Périmètre de cette validation

Site **Next.js 16.4.6 / React 19.3.1**, export statique `out`, **Wrangler Pages 4.165.0**, Node **22.22.3**. Les contrôles HTTP et navigateur utilisent le même serveur local `http://127.0.0.1:3100`, avec les **vraies Pages Functions compilées**, et non un serveur de fichiers Python ni un serveur de production Next.

L’origine canonique attendue est **https://joyccelight-playbook.pages.dev**, indépendamment de l’adresse HTTP de test. Douze pages localisées sont examinées : deux landings, deux index et huit articles. Les trois articles initiaux sont conservés ; `ux-ui-product-design` ajoute le comparatif FR/EN. L’interface utilise le libellé « Article », sans nombre figé.

**Aucune publication Cloudflare ni opération Vercel n’est effectuée dans cette passe.** Ces résultats locaux ne valident ni le projet Cloudflare distant ni la PR #2, dont la branche n’est pas celle de la session. [Diagnostic, branche et actions restantes](../CLOUDFLARE_MIGRATION.md).

## Résultats réellement exécutés

| Commande / juge | Résultat observé |
| --- | --- |
| `npm ci` | Installation propre depuis le lockfile : 110 paquets ajoutés, 111 audités, 0 vulnérabilité signalée. Avertissement de dépréciation transitif `node-domexception`, sans échec d’installation. |
| `npm run typecheck` | Réussi. |
| `npm run test:routing` | **34/34 réussis**, aucun ignoré ; logique partagée et handlers Pages importés directement. |
| `NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev npm run build` | Réussi ; Next rapporte 19 générations statiques, dont les 12 pages éditoriales localisées et les endpoints/ressources statiques. `out/404.html` et les quatre endpoints machine sont présents. |
| `npm run check:export` | **209/209 contrôles réussis**, 0 échec. Catalogue, métadonnées et liens de toutes les routes, schémas, ressources/polices, images sociales 1200 × 630, corpus LLM et fichiers de routage vérifiés ; scan de `out` sans ancienne origine Vercel détectée. |
| `python3 scripts/site_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev` | **646 contrôles automatisés, 0 échec bloquant ; 4 points à vérifier ; 1 non applicable.** Rapport `reports/site-check.json`. |
| `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui` | **45/45 réussis**, 0 ignoré, 0 échec inattendu, 0 flaky dans le dernier rapport. Chromium **153.0.8010.0** ; 12 routes × 2 thèmes, largeurs 1280/390/320, axe à 1280/320, interactions et vérifications détaillées ci-dessous. |
| `npm audit --audit-level=moderate` | 0 vulnérabilité signalée. Ce résultat porte sur l’état de la base d’avis au moment de l’exécution. |
| `npm run generate:social` | Dix JPEG générés sans débordement géométrique détecté, dont les deux nouveaux aperçus du comparatif ; les huit aperçus existants restent inchangés dans le diff. |
| `git diff --check` | Réussi avant livraison. |
| SHA-256 des fichiers de `public` | Aucun doublon exact détecté ; aucune image ni licence supprimée. |

Le navigateur n’étant pas installé dans l’environnement initial, Chromium a été obtenu temporairement depuis le registre npm avec `@sparticuz/chromium@153.0.0`, **hors du dépôt**, puis utilisé via `CHROMIUM_EXECUTABLE_PATH=/tmp/chromium` et `LD_LIBRARY_PATH=/tmp/al2023/lib`. Aucune dépendance Chromium serverless n’a été ajoutée au package du site. En CI, `playwright install --with-deps chromium` fournit le navigateur.

### Ce que couvrent les tests navigateur

- OLED et clair, préférence système et choix sauvegardé ; fond OLED noir effectif et fond clair `#faf8f4`.
- Tous les textes visibles, code compris, en Domine réellement chargée aux poids 400/700 ; taille utile ≥ 12 px, pictogrammes Lucide ≥ 20 px / tracé 3, sémantique décorative et contrôles autonomes ≥ 44 × 44 px.
- Chiffres de largeur égale `0.7em`, **alignement horizontal effectif des chiffres d’un même groupe**, absence de commandes coupées, débordement horizontal, image locale cassée, exception JavaScript ou d’hydratation détectée dans les parcours testés.
- Contrôles axe A/AA dans les états visités, sans violation détectée ; les éléments révélés au scroll sont chargés, pas exclus de l’analyse.
- Galerie dix pages, flèches clavier, Échap, confinement et restauration du focus ; filtres et onglets du sommaire du livre, kit 12 fiches et présentation de l’archive 21 fichiers.
- Sommaires desktop/mobile des articles, copie dans le presse-papiers, schémas agrandis dans les deux langues/thèmes à 320/1280, fermeture et focus ; CTA Gumroad de la bonne édition.
- Checklist UX copiable, FAQ au clavier, changement de langue en conservant le nouvel article et cookie explicite.
- Quatorze explications du comparatif et celles des trois articles initiaux ; appariement texte/visuel à 1280, 1024, 760, 390 et 320 px ; absence des slogans retirés et des badges de classement des sources.
- Prototype Atelier : neuf annotations, trois écrans, absence de confirmation sans créneau, choix conservé lors du changement de regard et du retour, confirmation simulée, refus annoncé/focalisé, créneau indisponible, reprise vers un autre horaire et remise à zéro au rechargement. Aucun envoi de formulaire, réservation ou donnée personnelle dans ce parcours.
- Redirections Pages réelles : cookies, pondérations `q`, pays de repli, query répétée, cache privé/Vary, pages localisées et ressources exclues, deux anciennes URLs HTML et 404 sans boucle.

### Défauts relevés puis corrigés

Les premières passes ont révélé des noms accessibles de créneaux fragmentés en chiffres séparés. Les boutons portent désormais un libellé continu explicite, avec l’état lisible correspondant ; le test vérifie le nom accessible et l’utilisation au clavier.

L’inspection visuelle a ensuite montré qu’un sélecteur CSS visant tous les `span` d’une carte de service empilait les cellules numériques. Le sélecteur a été limité au bon enfant. Le nouveau contrôle examine la **géométrie des chiffres**, plutôt qu’un simple `display` calculé : un élément flex peut légitimement être blockifié sans empiler son texte. Les captures et la suite finale ont été rejouées après correction. Les résultats intermédiaires ne sont pas présentés comme la validation finale.

### Preuves et conservation

Fichiers locaux ignorés par Git :

- `reports/static-export-check.json`, `reports/site-check.json`, `reports/browser-check.json` ;
- `reports/playwright-run.log`, `reports/site-check-run.log`, `reports/pages-server.log` ;
- `playwright-report/`, `test-results/` : résultats, captures jointes et traces conservées en cas d’échec ;
- `reports/visual-inspection.json` et captures `reports/pages-*.png`.

Inspection visuelle complémentaire : laboratoire FR OLED à 1440 px, refus EN clair à 390 px, créneau sélectionné EN OLED à 320 px, récapitulatif FR clair à 320 px, synthèse vectorielle EN claire à 1440 px et index de quatre articles FR OLED à 1440 px. Les deux nouvelles cartes Open Graph ont aussi été ouvertes et examinées. Les captures sont celles du rendu courant, sans désactiver de CSS pour masquer un défaut. La navigation fixe peut recouvrir le contexte situé au-dessus de la portion capturée, pas les commandes vérifiées dans le parcours.

Les workflows [export statique](../.github/workflows/cloudflare-static-export.yml) et [UI](../.github/workflows/ui-check.yml) sont adaptés à Node 22 / Pages, sans étape de déploiement. Ils conservent leurs preuves 14 jours avec un nom contenant le SHA. **Une configuration écrite n’est pas un run GitHub réussi** : les conclusions distantes éventuelles figurent séparément dans le compte rendu de livraison.

## Contenu, typographie et ressources préservés

| Article | Explications FR / EN | Mots de prose FR / EN | Min–max par explication FR / EN |
| --- | ---: | ---: | --- |
| UX | 19 / 19 | 3 322 / 3 151 | 137–238 / 139–220 |
| UI | 14 / 14 | 2 463 / 2 271 | 148–250 / 140–226 |
| Product / agents | 13 / 13 | 2 330 / 2 142 | 136–247 / 136–226 |
| Comparatif UX/UI/Product | 14 / 14 | 2 381 / 2 267 | 154–178 / 155–167 |

Ces comptages concernent les explications en prose, hors tableaux, listes, code, légendes et annotations du prototype. Les 120 explications FR/EN restent développées ; `CONTENT07` impose une explication d’au moins 100 mots pour chaque visuel et un total d’au moins 125 mots par explication, sans plafond. La longueur ne prouve ni la qualité littéraire ni la compréhension. `COPY03` protège une sélection de slogans retirés, sans détecter l’origine d’un texte.

Le comparatif ajoute six références à chacune des deux langues ; les 11 / 4 / 4 références existantes sont conservées. Citations visibles, JSON-LD et corpus LLM sont confrontés. Le transcript du laboratoire exporte également les annotations non sélectionnées à l’écran. Les illustrations originales ne sont pas présentées comme des résultats de recherche ni comme une reproduction du Double Diamond.

Les deux WOFF2 Domine variables 400–700 et la notice OFL sont conservés. L’inspection FontTools et les empreintes du paquet Fontsource consignées dans [les licences](../src/fonts/LICENSES.md) appartiennent à la passe typographique précédente ; cette migration ne prétend pas les avoir refaites. Les cellules numériques restent nécessaires en l’absence de `tnum`.

Contrastes de tokens recalculés par le script Python : bouton principal **6,749:1 en OLED** et **5,593:1 en clair** ; badges clairs sur le fond composite réel `--s1`, succès **5,774:1** et avertissement **5,498:1**. Les contrôles axe portent en complément sur les états rendus.

Offre inchangée : 29 USD, manuel FR 148 pages / EN 139 pages, kit 26 pages / 12 fiches, archive 21 fichiers, boutiques localisées, contact `joynagassi@gmail.com`. Les pages et fichiers du produit ne sont pas modifiés. Les trois articles initiaux conservent leur date de publication commune ; le comparatif possède sa date propre. Aucune date n’est inventée pour modifier un signal SEO.

### Clarifications juridiques déjà présentes

La migration conserve les distinctions éditoriales de la passe précédente ; elle ne constitue pas une nouvelle vérification juridique complète :

- **EAA** : articles 2, 3(23), 4(5), 31–32 de la [directive 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng), avec distinction entre application des mesures nationales et entrée en vigueur, et portée de l’exemption des micro-entreprises pour les services.
- **AI Act** : [texte consolidé au 27 juillet 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), art. 50, 111(4), 113 ; toutes les sorties d’IA ne relèvent pas d’une obligation identique.
- **WCAG 3** : [Working Draft du 10 septembre 2026](https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/), pas une Recommandation remplaçant WCAG 2.2.
- **EN 301 549** : [ETSI 4.1.1, septembre 2026](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf) ; publication technique et citation au JO de l’UE restent distinctes.
- **DTCG 2025.10** : [Final Community Group Report](https://www.designtokens.org/tr/2025.10/format/), pas une Recommandation W3C.

## Non vérifié / limites

- Parcours réel VoiceOver/NVDA, compréhension et confort avec des lecteurs FR/EN : à observer avec des personnes et un protocole documenté. Le nom accessible interrogé par Playwright ne remplace pas l’essai d’un lecteur d’écran.
- Atelier : aucune étude utilisateur, réservation réelle, synchronisation serveur, concurrence de requêtes, paiement ou notification. Le prototype démontre des transitions locales, pas la robustesse d’un service.
- Géolocalisation réelle et comportement dans le réseau Cloudflare : à examiner après une publication expressément autorisée. Le pays d’un visiteur n’a pas été observé ; les valeurs de test sont injectées.
- Applicabilité juridique, transposition nationale et exceptions pour un client donné : conseil qualifié nécessaire.
- Core Web Vitals terrain, indexation, classement, citations par les moteurs et effet commercial : aucune mesure de production nouvelle, aucun résultat revendiqué.
- Aucune réussite automatique, y compris axe, ne constitue une certification d’accessibilité ou une promesse de conformité intégrale.

## Complément — produit gratuit « Répertoire UI/UX »

Cette passe concerne l’arbre de travail de `arena/b41a2b1b-ux-ui-playbook-landing-page`, après la migration décrite plus haut. Les chiffres de cette section sont ceux de la nouvelle passe locale, et non une annonce de publication ou de réussite CI distante.

### Livrables et périmètre

- Source fournie par le créateur conservée dans `products/ui-ux-directory/source-original.md`, non distribuée. Source éditée : `catalogue.json` ; **51 fiches / 6 familles / 75 liens**, sans assimiler les liens à des outils distincts.
- ZIP client de sept fichiers : PDF **34 pages**, Markdown, fiche de décision PDF **3 pages**, fiche Markdown, CSV à six lignes de familles, mode d’emploi et notices Domine/Lucide. Le PDF de la fiche est imprimable, pas un formulaire interactif.
- Couverture **1280 × 720**, vignette **1080 × 1080**, texte de fiche Gumroad, message de livraison, proposition de lancement et guide de publication. Le générateur fabrique aussi deux images sociales **1200 × 630** et le JPEG de présentation du site.
- Deux pages statiques sous `/{fr|en}/resources/ui-ux-directory` : langues de présentation distinctes, **mêmes fichiers français explicitement annoncés**. Promotion dans l’accueil, le hub Article, les huit articles, navigation et pied de page ; offre payante et ses liens localisés préservés.
- Accordéons de catégories natifs, 51 fiches/75 destinations dans le HTML serveur, trois extraits par profil, FAQ, téléchargements réels, MIME/Content-Disposition et `noindex` des fichiers bruts. Sitemap, canonical/hreflang, schéma du livre et textes LLM mis à jour.
- La source originale a été réécrite pour retirer les garanties générales d’accessibilité, de performance et d’absence d’erreurs IA. Les restrictions/licences d’ApexCharts, unDraw, Storyset et Fontshare, les usages de Radix Colors et le modèle de distribution shadcn/ui sont qualifiés. Adresses RNR/Recharts/Chartist actualisées. Références ciblées dans le catalogue et le guide ; **pas d’audit juridique ou de disponibilité des 75 destinations**.

### Résultats locaux finaux

| Contrôle exécuté | Résultat |
| --- | --- |
| `generate:resource` | Deux PDF, images et ZIP produits ; aucun débordement HTML détecté avant impression sur les 37 pages. Un fichier sentinelle local ajouté au dossier de travail a bien été exclu du ZIP par la liste blanche. |
| `check:resource` | **14/14** : intégrité ZIP, sept noms attendus, tailles/SHA-256, nombre de pages, langue française, destinations PDF, contenu Markdown, CSV, notices, dimensions PNG et validation/fallback du lien Gumroad. |
| Extraction indépendante avec `pypdf` temporaire | **34 + 3 pages**, noms des 51 fiches extraits, texte et langue `fr`, balises structurelles présentes. **Pas une certification PDF/UA.** Aucune dépendance PDF ajoutée au site. |
| TypeScript | Réussi. |
| Routage Pages | **34/34** tests unitaires réussis. |
| Build statique | **21/21** pages/ressources de build générées, dont les deux nouvelles pages. |
| Export | **249/249** contrôles réussis. |
| Python sur Pages local | **729 contrôles automatisés**, **0 échec bloquant**, 4 à vérifier, 1 non applicable. Les téléchargements HTTP sont confrontés au SHA-256 du manifeste. |
| Navigateur | **53/53**, aucun test ignoré ou instable. Quatorze routes, OLED/clair, 1280/390/320 px, contrôles axe et anciens parcours préservés ; nouvelles catégories au clavier, lien d’ancrage dégagé de la navigation fixe, fichier téléchargé et changement de langue conservant la page gratuite. |
| JavaScript désactivé | Deux parcours FR/EN : catégories et liens de fichiers utilisables sans JavaScript. |
| `npm audit --audit-level=high` | **0 vulnérabilité signalée.** |
| Diff | `git diff --check` réussi. |

Les images du guide, de la fiche et des visuels de publication ont été ouvertes pour relecture. Six captures supplémentaires couvrent le hero FR OLED desktop et clair mobile, les extraits EN clairs, une famille EN OLED et les promotions d’accueil/article. Le cadrage d’un élément très haut peut inclure la barre fixe ; une capture de viewport initial complète complète la vérification mobile. Les captures ne remplacent pas une étude utilisateur.

Preuves locales ignorées : `reports/{static-export-check,site-check,browser-check,free-resource-pdf-check,free-resource-visual-inspection}.json`, `reports/final-resource-validation.log`, `reports/directory-*.png` ; pages HTML d’impression et captures intermédiaires dans `.cache/free-resource/`. Les workflows d’export et d’UI exécutent désormais aussi `check:resource`, sans générer ni publier de produit distant.

### Ce qui reste à effectuer hors de l’aperçu

**Aucun produit Gumroad n’a été créé ou publié.** Le connecteur n’est pas pris en charge ici. La configuration vide sert un téléchargement direct sans email demandé ; aucun checkout fictif n’est exposé. `NEXT_PUBLIC_FREE_RESOURCE_GUMROAD_URL` accepte seulement une URL HTTPS du magasin du créateur et rejette les deux URLs payantes connues. La validation porte sur sa forme et sa séparation du Playbook, **pas sur l’existence ou le prix du produit distant** : publier et tester le parcours à 0 dans le vrai compte reste indispensable.

Le propriétaire doit relire et approuver les conditions d’usage proposées pour son guide, publier le ZIP, tester sa livraison, transmettre le lien public puis déployer un build avec cette variable. **Aucun push, PR, nouveau déploiement, DNS ou action Vercel n’a été effectué pour cette tâche.** Ni le trafic, ni l’indexation, ni la conversion ne sont mesurés ou garantis. Les liens UTM du kit facilitent une éventuelle attribution dans des outils futurs ; ils n’ajoutent pas de collecte au site.
