# Adaptation réelle à Cloudflare Workers — rapport de livraison locale

## Décision et état

- **Cible choisie : Workers Builds**, avec **Next.js toujours statique**, un Worker léger pour la langue et **Workers Static Assets** pour `out/`. Il ne s’agit plus de la seule correction documentaire Pages de la PR #8.
- Branche de travail : **`arena/1f8f0d8c-ux-ui-playbook-landing-page`** ; base de comparaison : **`fa2f5dd46a10612b986eb4fb2aea7037657a670b`**. Cette base n’est pas présentée comme le HEAD après livraison ; le commit livré et les statuts distants se lisent dans Git et dans la PR.
- La préparation et les vérifications initiales ont été faites sans commit ni push. **Le commit, le push de cette branche et l’ouverture d’une PR vers `main` sont ensuite demandés séparément pour la livraison.** Les résultats ci-dessous restent des preuves locales, pas des résultats de déploiement.
- **Aucune fusion ni commande manuelle d’upload/déploiement Cloudflare.** Aucun accès authentifié au compte Cloudflare, changement de DNS, de domaine, de Vercel ou de produit Gumroad. Le push autorisé pour la PR peut déclencher l’intégration externe Workers Builds ; elle n’est pas désactivée ou reconfigurée ici.
- L’erreur **`Missing entry-point to Worker script or to assets directory`** ne se produit plus lors du **dry-run local** : le vrai point d’entrée et le binding d’assets sont reconnus. **Cela ne prouve pas un déploiement réussi** ni la conformité des réglages du compte.

Le [guide courant](../CLOUDFLARE_MIGRATION.md#configuration-workers) donne les réglages et commandes. Les sections Pages conservées plus bas dans ce guide sont historiques, pas la procédure courante.

## Comportement conservé et adapté

1. **Négociation uniquement sur `/`, `/articles`, `/articles/*`**, avec priorité Worker sur ces motifs. Le helper existant conserve cookie `NEXT_LOCALE` > `Accept-Language` pondéré et exclusions > pays Cloudflare > EN. Les tests portent désormais sur le vrai Worker.
2. **307 privées**, même origine et query répétée/encodée intacte, `Cache-Control: private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`, sécurité et aucun `Set-Cookie` de négociation. HEAD sans corps et sémantique 307 de POST conservés.
3. **FR/EN et assets jamais renégociés** : asset-first ; hors négociation, le Worker délègue la Request inchangée à `ASSETS.fetch`. Aucun serveur Next ou service externe n’est ajouté au runtime.
4. **Vraies 404** via `not_found_handling: "404-page"`, sans fallback SPA. Une route d’article non localisée inconnue redirige une fois puis finit en 404. Les sources Worker/Functions, le brouillon, `_routes.json`, `_headers`, `_redirects` et `.assetsignore` ne sont pas servis comme fichiers publics.
5. **28 alias permanents pour les 14 URL existantes** : `/fr.html` et `/en.html` en 301 ; les autres `.html` et tous les slashs finaux en 308. Les premières mesures Workers renvoyaient 307 sur certaines normalisations : ajout de règles exactes dans `_redirects`, **sans assouplir les statuts attendus par les tests**. Les queries et la langue explicite sont conservées.
6. **`public/_headers` inchangé** : sécurité, Content-Language, cache immutable des fichiers hashés, MIME des endpoints et des six téléchargements, `noindex` et Content-Disposition. Les réponses personnalisées du Worker gardent leurs propres en-têtes.
7. Les anciens wrappers **`functions/` et `_routes.json` sont conservés, mais inactifs sur Workers**. `.assetsignore` exclut `_routes.json` de l’upload. Le wrapper de preview conserve la fixture géographique neutre locale ; `request.cf.country` réel reste testé séparément en unitaire.
8. **À la demande explicite de l’utilisateur, le nom d’origine `joyccelight-playbook` est désormais imposé.** `scripts/deploy_worker.cjs` fixe le nom/config et refuse les substitutions CI (`WRANGLER_CI_OVERRIDE_NAME`), les environnements nommés et les surcharges CLI. Il conserve les vérifications de compte/tag Cloudflare. `npm run check:worker` utilise ce verrou avec dry-run ; la commande future de publication est `npm run deploy:worker`, pas un appel direct à Wrangler. Aucun réglage du compte n’est modifié.

## Vérifications réellement exécutées

Environnement local : **Node 22.22.3**, npm **10.9.8**, Python **3.11.2**, Next **16.4.6**, Wrangler **4.165.0**, Playwright **1.65.1**, Chromium **138.0.7204.0**. Le navigateur portable est isolé dans `.cache/`, réservé au site local de confiance ; aucune dépendance navigateur n’est ajoutée au produit. La CI conserve son installation Playwright standard.

| Contrôle | Résultat local |
| --- | --- |
| Installation verrouillée | `npm ci --no-audit --no-fund` réussi, 369 paquets installés ; l’audit est une commande séparée |
| Conservation | **108/108** fichiers protégés inchangés, préfixe append-only conservé, inventaire des pages inchangé |
| Lint / TypeScript | `npm run lint` et `npm run typecheck` réussis, sans relever de seuil ni désactiver une règle |
| Tests unitaires/contenu/ressources/SEO/Worker | **183/183** après le verrou de nom, dont 7 nouveaux tests de cible/surcharges/blocage avant Wrangler ; aucun échec, skip ou annulation |
| Build Next | réussi, **21 pages générées** selon Next ; ne pas confondre ce nombre technique avec les **14 URL éditoriales** |
| Export | **268/268** après le verrou de nom, nom d’origine/configuration Worker et alias permanents inclus |
| Paquet Worker | `npm run check:worker` réussi après le verrou : **dry-run sur `joyccelight-playbook`**, `env.ASSETS` reconnu, sortie Wrangler « Read 190 files » ; bundle simulé **3,25 Kio**, gzip **1,44 Kio** |
| HTTP, même Worker local | **778 contrôles automatisés**, zéro échec bloquant ; **4 à vérifier** et **1 non applicable** restent distincts |
| SEO HTTP, même Worker local | **484/484**, **270 requêtes** ; les 28 normalisations HTML/slash sont contrôlées avec query répétée/encodée |
| Navigateur complet | **82/82**, zéro échec, flaky, skip ou reprise ; deux thèmes, largeurs 1280/390/320, clavier, langue, téléchargements, sans JS et routage |
| Axe joint aux tests | **64 analyses**, **0 violation détectée**, mais **62 résultats incomplets `color-contrast`** à examiner manuellement |
| Audit dépendances de production | `npm audit --omit=dev --audit-level=moderate` : **0 vulnérabilité connue signalée** ; pas une garantie de sécurité globale ni un audit complet de l’outillage |
| Diff | `git diff --check` réussi ; aucun fichier supprimé, aucun artefact généré ajouté au suivi Git |

**Portée de la revalidation du nom :** lint, TypeScript, 183 tests, export, dry-run et conservation réexécutés. Le build, HTTP/SEO et navigateur du tableau ont été exécutés lors de la migration juste avant ce verrou ; ils ne sont pas présentés comme une nouvelle exécution navigateur après celui-ci. Le Worker, le helper de langue, `src/`, les assets et les en-têtes sont inchangés par cette correction d’outillage.

Les premiers échecs HTTP et SEO (14 statuts slash temporaires et 4 cas SEO) sont conservés dans les rapports de diagnostic, séparément des résultats corrigés. Un échec de lint intermédiaire lors du remplacement des imports Pages a aussi été corrigé avant les validations complètes. Les attentes fonctionnelles, délais et reprises Playwright n’ont pas été assouplis.

### Preuves locales, ignorées par Git

- `reports/workers-migration/baseline.json` : snapshot préalable des **205 fichiers suivis**, HEAD/branche et dépendances ; pas de réinitialisation de baseline.
- `reports/workers-migration/name-lock/change-inventory.json` : inventaire courant depuis la base de migration et delta du verrou de nom, SHA avant/après ; `name-lock/before-state.json` décrit l’état avant ce seul complément, sans remplacer la baseline initiale.
- `reports/workers-migration/name-lock/checks.json`, `unit.log` et `dry-run.log` : revalidation du nom, codes de sortie et preuve de refus d’une cible CI différente. `reports/workers-migration/final-checks.json` et les logs associés restent les preuves de la migration **avant** ce complément ; une copie est conservée sous `name-lock/prior-final-checks.json`.
- `reports/workers-migration/build-after-routing.log`, `dry-run-after-routing.log`, `browser-final.log`, `browser-summary.json`, `audit-production.json`.
- `reports/preservation-check.json`, `static-export-check.json`, `site-check.json`, `seo-check.json`, `browser-check.json` ; pièces jointes axe dans `test-results/`, rapport navigateur dans `playwright-report/`.
- `reports/workers-migration/http-initial-failure.json` et `seo-initial-failure.json` : diagnostics avant les alias permanents, **pas les résultats finaux**.

Ces artefacts sont locaux ; les workflows modifiés les produiront aussi lors de leurs exécutions GitHub. **Le statut des checks distants après le push doit être lu dans la PR, pas déduit de ces résultats locaux.** Les vérifications pré-PR sont conservées séparément sous `reports/workers-migration/pr-preparation/`.

## Inventaire des différences avec la base

**23 fichiers concernés depuis la base : 17 modifiés, 6 nouveaux, aucune suppression, aucun renommage.** Le complément de verrouillage du nom retouche 8 fichiers déjà présents dans le lot et ajoute seulement `scripts/deploy_worker.cjs`. Aucun changement hors mission identifié. Les fichiers générés/temporaires restent ignorés et ne font pas partie de cette liste.

| Fichier | État | Raison |
| --- | --- | --- |
| `wrangler.jsonc` | modifié | Pages → vrai `main`, ASSETS, priorité sélective, HTML sans slash et vraies 404 ; nom/date/dev conservés |
| `worker/index.mjs` | nouveau | entrée Worker : négociation sélective puis délégation inchangée aux assets |
| `lib/locale-routing.mjs` | modifié | commentaires seulement ; logique de langue et réponses conservées |
| `public/_redirects` | modifié | conservation des deux 301 et ajout des 26 alias permanents nécessaires sur Workers |
| `public/.assetsignore` | nouveau | ne pas publier l’ancienne métadonnée Pages `_routes.json` |
| `package.json` | modifié | preview Worker, start, tests de routage, déploiement verrouillé et dry-run ; dépendances et build statique inchangés |
| `scripts/deploy_worker.cjs` | nouveau | nom/config imposés, refus des substitutions CI/CLI/environnement ; dry-run ou publication explicitement demandée |
| `scripts/preview_worker.cjs` | nouveau | runtime Worker local, ASSETS, fixture pays neutre et écoute 0.0.0.0:3100 |
| `scripts/preview_pages.cjs` | modifié | ancien nom conservé comme alias averti du Worker, pas de runtime Pages |
| `playwright.config.ts` | modifié | serveur automatique Worker ; retries, timeout et matrice conservés |
| `scripts/check_static_export.cjs` | modifié | assertions Workers/alias/404 réelles ; garde de non-chevauchement statique préservée |
| `scripts/site_check.py` | modifié | commentaire de serveur actualisé seulement ; assertions existantes conservées |
| `scripts/seo_check.py` | modifié | libellé Worker et couverture des 28 alias permanents, au lieu de 6 cas |
| `tests/locale-routing.test.mjs` | modifié | toute la matrice existante exécutée via le vrai Worker, avec le helper conservé |
| `tests/worker.test.mjs` | nouveau | Worker, priorité, méthodes, délégation sans mutation et vraie configuration d’assets |
| `tests/seo.test.cjs` | modifié | cible Workers statique et garde de dry-run sans publication GitHub CI |
| `tests/ui.spec.ts` | modifié | routage Worker réel, 28 alias, HEAD et non-exposition des fichiers internes ; autres parcours conservés |
| `.github/workflows/cloudflare-static-export.yml` | modifié | ajout du seul dry-run Worker après build, pas de publication |
| `.github/workflows/ui-check.yml` | modifié | serveur/logs Worker partagés entre Python et Playwright, pas de publication |
| `README.md` | modifié | architecture, réglages Workers et commandes actuelles, distinction des preuves |
| `CLOUDFLARE_MIGRATION.md` | modifié | procédure Workers courante ; sections Pages historiques conservées explicitement |
| `docs/SEARCH_VISIBILITY_RUNBOOK.md` | modifié | procédures Worker locales/distantes, garde de non-publication et origine séparée |
| `docs/WORKERS_MIGRATION_REPORT.md` | nouveau | ce rapport, preuves et inventaire |

**Conservés intégralement :** tout `src/` (dont FR/EN, quatre guides par langue et pages), `products/`, images, fontes et licences, kits et téléchargements, `public/_headers`, les wrappers historiques, `.env.example`, `next.config.mjs`, `package-lock.json` et les baselines de conservation. Aucune capture Microlink n’a été acquise, transformée, approuvée ou publiée ; aucune clé n’a été demandée ou utilisée.

**Temporaires/ignorés uniquement :** `node_modules/`, `.next/`, `out/`, `.wrangler/`, `reports/`, `test-results/`, `playwright-report/` et `.cache/` (dont Chromium local, sources de documentation consultées et contrôles de livraison). Ils ne sont pas des fichiers à commiter. Les travaux/artefacts antérieurs n’ont pas été supprimés.

## Actions distantes restantes — non exécutées, autorisation nécessaire

1. **Confirmer le compte et le rattachement au nom imposé `joyccelight-playbook`.** Le libellé du check `Workers Builds: ux-ui-playbook` ne change pas cette décision. En cas de désaccord CI, la commande s’arrête au lieu de renommer la cible ; aligner Workers Builds sur la ressource voulue dans une intervention autorisée, sans contournement des contrôles Cloudflare ni création/renommage implicite.
2. Confirmer branche, droits et réglages Workers Builds : build `npm run build`, publication **`npm run deploy:worker` uniquement quand elle est autorisée**, jamais un appel direct à Wrangler pour contourner le verrou, variable canonique en production et preview. Les workflows GitHub ne publient pas ; le service externe Workers Builds peut déployer lors d’un **push**. Cette intégration n’a pas été désactivée ou modifiée.
3. **Confirmer le domaine réellement servi.** La configuration canonique **`https://joyccelight-playbook.pages.dev` est volontairement inchangée** pour les liens imprimés des kits ; elle ne définit pas le domaine du Worker. Une autre origine implique une décision séparée sur kits, canonical et redirections entre hosts, sans modification DNS dans ce lot.
4. Après une publication autorisée, vérifier logs, réponses HTTP publiques, cache/Vary, 404, normalisations, téléchargements et en-têtes. Le local ne reproduit pas WAF, Access, robots géré, cache CDN ou géolocalisation réelle.
5. Conserver la revue humaine d’accessibilité et des langues. **Aucune optimisation ni nouvelle mesure Lighthouse n’est revendiquée** : les réserves TBT historiques restent ouvertes. Axe n’est pas une certification, Lighthouse n’est pas du terrain, TBT n’est pas INP. Indexation, crawls authentiques, citations IA et performances commerciales restent non établis.


## Addendum du 18 novembre 2026 : origine et édition augmentée

Les résultats et l’ancienne origine cités ci-dessus décrivent la passe historique ; ils ne sont pas réécrits. Pour la mise à jour issue du Drive du 9 novembre, le propriétaire a choisi **`https://joyccelight-playbook.uxplay.workers.dev`** comme origine officielle et **21 fichiers par langue et par achat**. Les valeurs courantes sont dans le README et le runbook ; les liens des kits gratuits sont régénérés. Voir le [rapport de mise à jour](EDITION_2026_UPDATE_REPORT.md) pour le diagnostic CI, les compteurs vérifiés et les validations de cette nouvelle révision. Aucune modification DNS ni publication distante n’est impliquée.
