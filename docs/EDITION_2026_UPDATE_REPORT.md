# Édition du 9 novembre 2026 : contenu, visibilité et CI

Travail préparé le 18 novembre 2026 sur `arena/52b57736-ux-ui-playbook-landing-page`, depuis `228c4b1439e5a36d8f8858dc2aa6d154e08844ff`. La date d’édition du produit reste le 9 novembre. Ce document décrit les modifications locales, pas une publication.

## Diagnostic SEO, AEO et GEO

Un workflow GitHub rouge n’est pas, à lui seul, une pénalité de recherche ou une preuve de refus par un moteur de réponses. Il peut empêcher une validation ou une publication, ce qui laisse ensuite des erreurs visibles en ligne.

Sur le commit de fusion de la PR 10 :

- [Export statique GitHub, run 45198540383](https://github.com/joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page/actions/runs/45198540383) : échec de l’étape composée préservation/lint/types/tests. Les étapes de build et d’export suivantes sont marquées *skipped* par l’API GitHub.
- [Interface GitHub, run 45198540283](https://github.com/joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page/actions/runs/45198540283) : échec. Le garde local historique reproduit 107/108 fichiers inchangés, avec seulement `src/i18n/content.ts` différent avant ce travail. Cet écart provient des retouches fusionnées dans la PR 10. Les logs détaillés n’ayant pas été récupérés, cela ne décrit pas d’éventuelles erreurs ultérieures d’une étape qui n’a pas été exécutée.
- **Workers Builds est passé en succès** pour ce même commit : build `87d40d56-ae3f-4a7d-9e21-26c90e34ff60`, version `f2c2fe2e-809d-469e-828c-84b11134e566`. L’ancien échec Workers de la branche de PR n’est donc pas l’état du build de `main`. Ce succès ne prouve pas que la nouvelle édition de cette branche est publique.

Une nouvelle lecture de [la page FR publique](https://joyccelight-playbook.uxplay.workers.dev/fr), pendant cette validation, retrouve encore **148 pages, 97 sections**, les anciens chemins de scanner et une image Open Graph pointant sur `https://joyccelight-playbook.pages.dev/og-fr.jpg`. Le contenu de cette branche n’est donc pas présenté comme déjà publié. Cette lecture par un outil de récupération ne prouve ni visite d’un vrai robot de recherche ni indexation.

Les problèmes concrets corrigés ici sont la désignation d’une autre origine dans les canoniques/ressources, les anciennes pagination et offre dans les points d’entrée, et les résultats de scanner illustratifs présentés avec de mauvais compteurs. Dans l’export local actualisé, les métadonnées et le texte visible donnent maintenant les mêmes informations. Le bloc nouveau est du texte HTML rendu à l’export, avec des sources nommées et datées, pas du texte réservé à un robot.

Aucun trafic, classement, résultat enrichi ou citation générative n’est promis. `llms.txt` et les données structurées facilitent la découverte et l’interprétation ; ils ne commandent pas une indexation. Aucun journal de véritables robots, donnée Search Console ou mesure de conversion n’a été consulté.

## Décisions du propriétaire appliquées

- Origine officielle : **`https://joyccelight-playbook.uxplay.workers.dev`**.
- **21 fichiers de travail dans la langue choisie**, en plus du livre et du kit PDF. Le ZIP Drive de 42 fichiers contient les deux langues et ne représente pas un achat bilingue.
- **29 USD, paiement unique**, éditions FR et EN vendues séparément. Liens Gumroad existants conservés.
- Aucun changement DNS, réglage Cloudflare distant, publication Gumroad ou déploiement manuel.

Le défaut de build, `.env.example`, les deux workflows, les liens de ressources et les deux kits gratuits générés utilisent cette origine. Une variable `NEXT_PUBLIC_SITE_URL` définie dans les réglages distants Workers Builds doit aussi correspondre à ce choix ; elle n’a pas été modifiée ici. La convergence HTTP depuis les anciens hosts demande un contrôle distinct sur ces hosts.

## Sources Drive réellement examinées

Dossier fourni : [édition du 9 novembre](https://drive.google.com/drive/folders/1snWl-UdSvlAMD5-YxNJhH9aTK4I5LR8q).

Les notes `NOUVEAUTES-edition-2026.md`, les quatre PDF, `TEMPLATES.zip`, l’ancien listing Gumroad et le corps de l’ancienne page de vente FR ont été lus. Les binaires ont été vérifiés par empreintes avant extraction. Les textes des quatre PDF ont été extraits page par page. Les fichiers payants restent dans le cache privé de travail, hors `public/` et hors Git.

Le listing Gumroad et l’HTML FR du Drive portent encore plusieurs informations de l’ancienne édition. Leurs prix et leurs compteurs ne sont pas repris pour remplacer les décisions actuelles.

### Mesures retenues

| Élément | Français | Anglais | Méthode |
| --- | ---: | ---: | --- |
| Pages du livre | 182 | 171 | Pages physiques du PDF, couverture comprise |
| Sections | 120 | 120 | Signets de niveau 2 et bandeaux I–CXX |
| Parties | 9 | 9 | Signets de niveau 1 |
| Sections du lexique | 22 | 22 | Repères L1–L22 |
| Entrées du lexique | 56 | 56 | Lignes nommées des tableaux de composants |
| Comparaisons thématiques | 13 | 13 | Marqueur « avant » des prototypes comparés |
| Comparaisons de plateformes | 11 | 11 | Marqueur « avant » des plateformes comparées |
| Pages du kit | 26 | 26 | Pages physiques du PDF |
| Fiches du kit | 12 | 12 | Une fiche suivie d’une page de notes |
| Fichiers de travail | 21 | 21 | Entrées de fichiers du dossier de langue, copies imbriquées incluses |
| Règles | 77 | 77 | Liste structurée `RULES` dans `rules.py` |

Ouvertures des parties 01–09 : FR **10, 29, 50, 66, 74, 85, 94, 124, 149** ; EN **10, 27, 45, 59, 67, 75, 83, 113, 138**. Les 120 lignes imprimées du sommaire ont aussi été comparées à leurs liens et aux débuts réels des sections dans chaque langue.

Les nombres, les pages et les SHA-256 des sources et des 42 fichiers sont enregistrés dans [`products/playbook-2026/counts.json`](../products/playbook-2026/counts.json). Ce manifeste ne contient pas les PDF ni le code payant.

### Contradictions non masquées

- Les notes annoncent « 36 pages-figure : 12 maquettes + 24 paires », mais les couvertures parlent encore de 35 écrans. Les 24 paires sont recomptées ; un total de 36 **écrans annotés** n’est pas réaffirmé. Les maquettes restent présentées sans compteur global non établi.
- L’introduction du lexique imprime 67, mais les tableaux contiennent 56 entrées distinctes par langue. La landing et les descriptions utilisent **56**, avec l’inventaire des lignes dans le manifeste.
- Aucun rapport QA des « 36 contrôles, tous verts » des notes n’a été fourni ; le dossier QA consulté était vide. Cette réussite n’est pas annoncée. Notre audit structurel local des sources comporte **45 vérifications réussies**, sur un autre périmètre. Il ne remplace pas le rapport d’origine et ne constitue pas un audit PDF/UA.

## Scanner : résultats exécutés et limites

Les quatre commandes suivantes ont réellement été lancées dans le dossier de langue `checklist-agent/`, avec Python isolé et sans dépendance externe :

```sh
python3 -I agent_check.py --target test/bad.html --platform web --lang fr --fail-on blocking --json
python3 -I agent_check.py --target test/good.html --platform web --lang fr --fail-on blocking --json
python3 -I agent_check.py --target test/bad.html --platform web --lang en --fail-on blocking --json
python3 -I agent_check.py --target test/good.html --platform web --lang en --fail-on blocking --json
```

| Fichier témoin | Périmètre web | Automatisés | À vérifier | Hors périmètre web | Échecs | Dont bloquants | Sortie |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `bad.html`, FR et EN | 57 | 9 | 48 | 20 | 8 | 7 | 1 |
| `good.html`, FR et EN | 57 | 8 | 49 | 20 | 0 | 0 | 0 |

Sur `bad.html`, les échecs bloquants sont G01, H02, H03, F01, I03, C01 et E01. J16 est majeur. L01 est informatif, pas un échec. Les rapports complets et les commandes sont conservés dans `reports/edition-2026-update/scanner-*.json` pendant cette session.

La démo affiche un **résumé** de ces résultats, sans exécuter Python dans le navigateur. Le paiement à gauche est une illustration distincte des fichiers témoins. Contraste rendu, cibles, clavier, correspondance exacte des libellés et états complets demandent une revue qui n’est pas prouvée par de simples attributs ou marqueurs de texte. Une sortie 0 ne certifie pas la conformité.

Les vrais chemins livrés sont `rules.py` et `test/good.html`, pas `rules_77.json` et `clean.html`. Les quatre gabarits Markdown sont le brief, l’audit, la passation et le journal de preuves. La proposition en une page se trouve dans le kit PDF, pas dans les gabarits de l’archive.

## Modifications réalisées

- Landing FR/EN : pagination, sommaire à neuf parties et ouvertures exactes, lexique, archive, FAQ, répartition des livrables et offre.
- Bloc **« Ce qui est nouveau dans cette édition »** immédiatement après le sommaire, avant le prix, et équivalent anglais. Bandeaux romains, identifiants d’origine, lexique et références datées.
- Dix aperçus par langue rendus depuis les nouvelles sources, sans altérer les PDF. La sélection introduit la section de sources et la page du lexique ; légendes et pages correspondent au manifeste.
- Titres, descriptions, JSON-LD Book/Product/FAQ, cartes OG de landing et deux fichiers `llms` alignés. Les CTA des quatre guides par langue et des ressources gratuites ont la nouvelle pagination ; le fond des guides et leurs sources sont conservés.
- Deux kits gratuits régénérés avec la nouvelle origine et les bons CTA. Ils conservent leur contenu de répertoire, leurs sept fichiers, leurs 34 pages de guide, leurs trois pages de fiche et leur date d’édition propre. Manifeste, tailles, empreintes et ZIP ont été recalculés. Les visuels marketing gratuits et les captures ne sont pas régénérés pour ce changement de liens.
- [Description Gumroad FR](../products/playbook-2026/gumroad-description-fr.md) et [description EN](../products/playbook-2026/gumroad-description-en.md) **préparées, pas publiées**.
- Architecture `output: 'export'` + Workers Static Assets, nom `joyccelight-playbook`, 14 URL, liens de langue, redirections, vraies 404, ressources gratuites et retouches d’interface conservés.

## Sources de recherche et prudence d’interprétation

Les pages primaires ont été ouvertes directement, en plus de leur lecture dans le livre :

1. **Nielsen Norman Group, Therese Fessenden, 15 avril 2018**, [Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/). Le bloc reprend 57 % au-dessus de la ligne de flottaison dans cette étude sur ordinateur, pas une mesure 2026 ni une mesure de la page du client.
2. **Baymard Institute, page actualisée le 28 octobre 2026**, [Cart Abandonment Rate](https://baymard.com/blog/cart-abandonment-rate). 70,22 % est une moyenne non pondérée de 50 études 2006–2025. Les 23,48 concernent des **éléments de formulaire**, pas 23,48 champs. L’estimation de gain de 35,26 % concerne les checkouts étudiés et n’est pas une promesse pour tout produit ; elle n’est pas utilisée comme argument de conversion garanti.
3. **Christine Perfetti, UIE / Center Centre, 11 septembre 2007**, [5-Second Tests: Measuring Your Site’s Content Pages](https://articles.centercentre.com/five_second_test/). La méthode convient à une page de contenu à objectif principal. L’article signale les limites des pages qui servent plusieurs tâches. Les anciennes adresses UIE redirigent vers des accueils ; le lien actuel vise l’article précis.

## Préservation et CI

La baseline historique [`technical-baseline.json`](technical-baseline.json) est conservée **octet pour octet**, SHA-256 `68329e1ac8b7cf1a150be421139c1a7902e0ad4e912c2bdc2ef266b04cb756d2`.

Le registre [`preservation-revisions.json`](preservation-revisions.json) ajoute uniquement des transitions exactes, avec empreinte avant/après et motif par fichier. Il distingue les retouches déjà fusionnées de la PR 10 de la mise à jour de cette édition. Les nouvelles pages d’aperçu et le manifeste ont aussi leur empreinte protégée. Une modification suivante non enregistrée échoue encore. Aucune exclusion de dossier, réinitialisation globale ou désactivation du garde.

Le garde continue de vérifier l’inventaire des routes, l’absence du brouillon interne dans l’export et le préfixe historique des rapports append-only. Des tests négatifs couvrent les modifications non relues, fichiers manquants, chaînes d’empreintes invalides, baseline réécrite, nouvelle route et rapport historique altéré.

Les étapes préservation, lint, types, unitaires et build sont séparées dans les deux workflows, afin que le prochain échec identifie la vérification responsable. Les workflows ne publient toujours pas. Un futur push peut en revanche déclencher l’intégration externe Workers Builds ; aucun push n’est nécessaire à ces tests locaux.

## Validation de cette révision

Tous les résultats ci-dessous ont été obtenus sur les fichiers actualisés de cette branche. Ils ne reprennent pas les résultats de la PR 10.

| Vérification locale | Résultat |
| --- | --- |
| `npm run check:preservation` | **113 fichiers protégés acceptés** : 72 fichiers historiques inchangés, 36 fichiers révisés exactement et cinq nouveaux protégés ; zéro échec. La transition préexistante de `content.ts` fusionnée par PR 10 est conservée dans la chaîne. Routes inchangées. |
| `npm run lint` | Succès, sans avertissement |
| `npm run typecheck` | Succès |
| `npm test` | **214/214** réussis, dont les régressions d’édition et les cas négatifs de préservation |
| `npm run build` | Export statique réussi des deux langues, quatre guides par langue, deux index, deux ressources et fichiers de découverte |
| `npm run check:worker` | Dry-run réussi pour **`joyccelight-playbook`**, binding `ASSETS`. Aucune publication. |
| `npm run check:export` | **281/281** réussis : inclut Book/date/pages/prix, bloc nouveau rendu, sommaire à neuf parties, aperçus et absence des anciennes assertions ou de l’ancien host dans le texte exporté |
| `scripts/site_check.py`, Worker local | **778 contrôles automatisés**, zéro échec bloquant ; **quatre à vérifier et un non applicable** restent distincts |
| `scripts/seo_check.py`, Worker local | **484/484**, 270 requêtes locales : URL, canoniques/hreflang, sitemap, réponses selon UA simulés, cache et vraies 404 |
| `npm run test:ui`, Worker local | **112/112**, sans échec, saut ni relance. Clavier, défilement natif sans barres, sommaires repliables, tooltips, thèmes, langues, galerie, ressources et nouvelles assertions d’édition. |
| Audit privé des sources | **45/45** : empreintes, pages, signets, numéros romains, liens/numéros imprimés du sommaire, lexique et inventaire ZIP. Périmètre distinct de l’ancien QA du produit. |
| `git diff --check` | Succès |

Le navigateur local est Chromium **138.0.7204.0**, obtenu depuis le registre npm autorisé et utilisé seulement au laboratoire, avec Node **22.22.3**. Les tests de layout couvrent 1280, 390 et 320 px dans les deux thèmes ; les tests de navigation existants conservent aussi leurs largeurs spécifiques. Les aperçus vérifiés ont été rendus à 960 × 1357 px.

Les 68 pièces jointes axe contiennent 70 résultats enregistrés et **zéro violation détectée**. Elles contiennent encore **66 occurrences de contrôle incomplet `color-contrast`**, notamment sur les visuels à revoir. Il ne s’agit ni de 66 violations ni de 66 pages distinctes. Ces observations, les quatre contrôles humains en attente et les lecteurs d’écran réels ne sont pas convertis en validations automatiques.

Le garde de rédaction HTTP a été précisé : les références bibliographiques exactes vérifiées à l’annexe A5 sont désormais permises. Les anciens badges génériques de classement (« établi », « probable », « established ») restent refusés, avec cas positifs et négatifs automatisés. Les règles ne sont pas désactivées pour faire passer le nouveau titre d’annexe.

### Performance des deux pages de vente, laboratoire seulement

Trois navigations Lighthouse par langue, profil mobile 390 × 844, simulation RTT 150 ms / 1 638,4 kbit/s / CPU ×4. Interactions scriptées séparées sur HTTP local, réseau non bridé. Pas de mesure CrUX/RUM ou d’INP de terrain.

| Page | LCP médian | CLS médian | TBT médian | Pire candidat INP du script |
| --- | ---: | ---: | ---: | ---: |
| `/fr` | 1 099 ms | 0,0000 | 138 ms | 96 ms |
| `/en` | 940 ms | 0,0000 | 95 ms | 96 ms |

Les deux pages passent les budgets existants du script : LCP ≤ 2 500 ms, CLS ≤ 0,1, TBT ≤ 200 ms et candidat d’interaction ≤ 200 ms. Une médiane de laboratoire ne prédit pas l’expérience du trafic réel.

### Preuves de session

Les données détaillées restent dans les dossiers ignorés par Git, sans binaires payants publiés :

- `reports/preservation-check.json`, `reports/static-export-check.json`, `reports/site-check.json`, `reports/seo-check.json` ;
- `reports/browser-check.json`, `reports/edition-2026-update/browser-summary.json` et les pièces jointes du rapport Playwright ;
- `reports/edition-2026-update/source-audit.json`, `preview-assets.json`, les inventaires et les quatre rapports du scanner ;
- `reports/edition-2026-update/performance-landings.json` et ses six rapports Lighthouse bruts.

Les captures de lecture du nouveau bloc et l’examen des aperçus complètent les tests, sans être présentés comme une recherche utilisateurs.

### Reproduction locale des sources privées

Ces commandes d’auteur nécessitent PyMuPDF et Pillow, hors dépendances de production. Les sources doivent avoir été obtenues auprès du propriétaire et rester hors `public/`.

```sh
python3 scripts/audit_playbook_edition.py --source .cache/edition-2026/source
python3 scripts/render_playbook_previews.py --source .cache/edition-2026/source
```

Les générateurs des deux kits gratuits acceptent `--downloads-only` pour ne pas remplacer les visuels marketing ; le générateur social accepte `--landing-only` pour ne pas réécrire les cartes des guides.

## Ce qui reste externe

- Publication des changements du dépôt après revue et autorisation ; aucun commit/push/déploiement n’est effectué par cette mise à jour locale.
- Copier les deux descriptions sur les fiches Gumroad et vérifier le contenu effectivement remis par chaque achat. Les décisions d’offre ne prouvent pas une modification de ces fiches à distance.
- Vérifier le prochain build public, l’origine de ses canoniques, sitemap, robots, ressources et éventuelle variable distante. Configurer une redirection permanente depuis l’ancien host uniquement si son administration et cette action sont autorisées.
- Vérifier l’accès des vrais robots et les données d’indexation/citation dans les outils des moteurs. Un user-agent simulé et un test local ne prouvent pas une visite de Google, ChatGPT ou Perplexity.
- Revue humaine : lecteurs d’écran réels, compréhension FR/EN et usages avec des personnes. Pas de certification automatique ni de promesse de trafic.


## Correction de présentation demandée par le propriétaire

Le propriétaire précise que le livre est dans ses premiers jours de publication. La consigne de présentation d’une « nouvelle édition » est donc remplacée : la page ne doit pas suggérer une ancienne version déjà commercialisée.

- Suppression complète du bloc « Ce qui est nouveau dans cette édition » et de son équivalent anglais, sans le remplacer par une autre annonce de mise à jour.
- Suppression des qualificatifs « augmentée », « expanded », « nouvelle partie », « nouvelle section » et « nouveau lexique » dans les textes de vente FR/EN, les métadonnées et les descriptions Gumroad préparées.
- Réécriture des fichiers de découverte en présentation directe du contenu. Les références scientifiques restent attribuées et datées ; la date de révision du produit n’est plus un argument commercial.
- `Book.bookEdition` indique uniquement la langue ; la propriété de modification datée ajoutée à l’étape précédente est retirée. Aucun jour de première publication n’est inventé.
- Conservation des données vérifiées : pagination, 120 sections, neuf parties, lexique, kit, fichiers, prix et liens d’achat. Les aperçus ne changent pas. Suppression du composant et des styles devenus inutilisés.
- Nouvelle transition exacte de préservation pour `content.ts`, sans écraser la baseline ni les révisions précédentes.

Validation de cette correction : lint et types réussis, **214 tests unitaires**, build réussi, **282/282 contrôles d’export**, garde de préservation réussi, **778 contrôles HTTP automatisés sans échec bloquant**, **484/484 contrôles SEO** et **8/8 tests navigateur ciblés FR/EN** (deux thèmes, responsive/axe, contenu, galerie et clavier). Les 112 tests navigateur cités plus haut restent l’exécution complète de l’étape précédente, pas un nouveau passage intégral après cette correction. La preuve complète précédente est conservée dans `reports/edition-2026-update/browser-check-before-launch-copy.json` ; les preuves de cette correction sont sous `reports/launch-copy/`.

L’aperçu local est reconstruit. Aucun commit, push ou déploiement, aucune modification distante de fiche Gumroad.
