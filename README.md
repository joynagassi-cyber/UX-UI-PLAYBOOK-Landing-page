# UX/UI Playbook — Next.js statique sur Cloudflare Workers

**Origine canonique cible : https://joyccelight-playbook.uxplay.workers.dev**. Cette origine a été choisie explicitement pour cette mise à jour. Les liens des deux kits gratuits sont régénérés ; cela ne configure pas les anciens hosts et ne prouve pas la publication de ce code. La cible est désormais **Workers avec Static Assets**, sans serveur Next. Le nom du Worker est **imposé à `joyccelight-playbook`** ; le rattachement distant et le domaine restent à vérifier. Aucun compte, DNS ou service Vercel n’est modifié ici.

- **FR `/fr`** : manuel de 182 pages A4 + kit de 26 pages / 12 fiches + archive de 21 fichiers → [édition française, 29 USD](https://joyccelight.gumroad.com/l/uiuxplaybookfr).
- **EN `/en`** : manuel de 171 pages A4 + même structure de kit et d’archive → [English edition, $29 USD](https://joyccelight.gumroad.com/l/uxuiplaybook).
- Contact : **joynagassi@gmail.com**.

## Édition du 9 novembre 2026

Les deux livres ont **120 sections et neuf parties**, dont **22 sections de lexique et 56 entrées de vocabulaire**. Le kit reste à 26 pages et 12 fiches. Chaque achat comprend **21 fichiers dans sa langue**, pas les 42 fichiers du ZIP source bilingue. Les 24 paires comparées se répartissent en 13 thèmes et 11 cas de plateformes. Les anciens totaux globaux d’écrans ne sont pas réaffirmés, car les sources se contredisent.

[Compteurs et empreintes des sources](products/playbook-2026/counts.json) · [Rapport de mise à jour](docs/EDITION_2026_UPDATE_REPORT.md) · [Description Gumroad FR prête à copier](products/playbook-2026/gumroad-description-fr.md) · [EN](products/playbook-2026/gumroad-description-en.md).

Les PDF et le ZIP payants ne sont pas copiés dans `public/`. Les deux descriptions Gumroad sont préparées, pas publiées. Le rapport distingue le contrôle local des fichiers de l’ancien rapport QA de 36 contrôles, qui n’a pas été fourni.

## Interface et articles

Le site conserve **Domine sur tous les textes HTML**, y compris le code, les tableaux et les commandes : deux WOFF2 variables locaux, poids 400–700, chargés avec `next/font/local`. [Provenance et licence OFL](src/fonts/LICENSES.md). Les chiffres utilisent des cellules de `0.7em` dans `TabularText`, car Domine ne fournit pas de variante OpenType `tnum`. Les pictogrammes d’interface sont des SVG **Lucide**, tracé de 3 px, tailles 20 / 24 / 28 / 40 px ; les illustrations pédagogiques vectorielles originales sont distinguées des icônes dans les contrôles.

Le rendu initial est OLED noir `#000000`. Un choix sauvegardé est prioritaire, sinon la préférence système est respectée ; le mode clair utilise `#faf8f4`. Le thème est initialisé avant hydratation. Les contrôles autonomes visent au moins 44 × 44 px, le texte utile au moins 12 px. Cela ne constitue pas une certification d’accessibilité.

Quatre articles sont disponibles **dans chaque langue** sous `/{fr|en}/articles/` :

| Slug | Sujet | Explications par langue |
| --- | --- | ---: |
| `ux-design-guide` | Parcours UX, états d’écran, audit de 40 points | 19 |
| `ui-design-system-tokens` | Composants, typographie, couleurs et tokens CSS | 14 |
| `product-design-ai-agents` | Cadrage et revue du travail avec des agents IA | 13 |
| `ux-ui-product-design` | Comparaison des responsabilités sur une même application mobile | 14 |

Le libellé de navigation reste **« Article »**, sans nombre figé ; les index portent désormais un titre explicite **Guides UX, UI et Product Design / UX, UI and Product Design guides**. Les 120 explications FR/EN ont chacune leur visuel à proximité : côte à côte au-dessus de 760 px, dessous sur mobile. Deux synthèses supplémentaires par article sont agrandissables au clavier. Les sources figurent sous **Sources et références / Sources and references**, sans badge de classement. Les articles n’utilisent pas de scans du livre ; la galerie de dix extraits du manuel et du kit est actualisée avec les PDF de cette édition.

Le comparatif UX/UI/Product comprend le prototype local **Atelier** : offre, créneau et récapitulatif, trois regards qui conservent le même état, sélection, retour, confirmation simulée et reprise après un créneau refusé. L’offre de 39 € / 45 min et les horaires sont fictifs. Aucune donnée personnelle, réservation ou paiement n’est envoyé. Les six références consultées, les limites de la simulation et les essais à préparer sont indiqués dans l’article. [Choix éditoriaux](docs/EDITORIAL.md).

### Stratégie de contenu et ajouts pratiques

Le [rapport concurrentiel FR/EN](docs/COMPETITIVE_CONTENT_STRATEGY.md) distingue les observations de pages, les hypothèses éditoriales et la visibilité non mesurée. Les guides existants accueillent une matrice de choix de méthode UX, un consommateur HTML des tokens, une fiche de revue IA explicitement non exécutée et des liens de lecture contextuels dans chaque langue, sans nouvelle URL publique. Le [protocole de test complet](docs/drafts/USABILITY_TEST_PROTOCOL_FR.md) reste un brouillon interne non importé dans le site. Aucune étude utilisateur ni citation par un moteur IA n’est revendiquée.

## Livres gratuits FR/EN : livraison Gumroad hors du site

Le répertoire est désormais fabriqué pour deux produits Gumroad distincts : **51 fiches, 6 familles, 75 liens, 20 captures et 54 pages par livre**, plus une fiche de décision de **3 pages**. Chaque ZIP client contient **7 fichiers dans sa langue**. Les captures restent dans la langue de leur interface ; leur couverture est partielle, sans aperçu inventé.

- [Dossier et livrables français](products/ui-ux-directory/README.md), [version anglaise](products/ui-ux-directory/en/README.md).
- [Kit global FR/EN avec textes et visuels 0 $](products/ui-ux-directory/releases/Livres-UI-UX-Gratuits-FR-EN-Kit-Gumroad.zip). Les deux ZIP clients et les documents marketing y sont séparés.
- [Fiche Gumroad française](products/ui-ux-directory/gumroad-listing.md), [English listing](products/ui-ux-directory/en/gumroad-listing.md), [publication et test à 0](products/ui-ux-directory/publication-guide.md).
- [Import et revue des captures](products/ui-ux-directory/screenshots/README.md) : les **21 originaux** et le manifeste externe sont conservés inchangés, **20 dérivés approuvés** sont intégrés. La capture de chargement est écartée. Aucun appel de capture supplémentaire ; acquisition suspendue avant tout accès aux identifiants.

**À la demande du propriétaire, les pages, téléchargements, promotions et contenus de découverte du répertoire sont retirés du site source ; seuls leurs assets images sont conservés.** Aucun teaser ni fallback direct n’est maintenu. Les quatre guides éditoriaux par langue et le Playbook payant sont préservés. Les anciennes URL doivent répondre en vraie 404 tant que les deux URL Gumroad réelles ne sont pas fournies. Une modification locale n’est pas une preuve de retrait en production.

**Aucun produit Gumroad publié par cet agent. Deux vraies URL FR/EN attendues pour les redirections ultérieures.** Aucun slug gratuit n’est supposé et les anciennes variables de checkout gratuit ont été retirées, sans modification distante de configuration.

```bash
# Fabrication hors réseau, nécessite Chromium.
npm run generate:resource       # FR, mode partiel explicite
npm run generate:resource:en    # EN, mode partiel explicite
npm run check:resource
npm run package:resource       # archive propriétaire, pas une publication
```

Les PDF/ZIP/Markdown restent dans `products/ui-ux-directory/releases/`, jamais dans `public/downloads/`. Les manifestes indiquent les comptes, tailles et empreintes exacts. Un changement de `NEXT_PUBLIC_SITE_URL` impose de régénérer les deux langues pour actualiser les liens imprimés, puis de revoir les textes de publication. Le balisage PDF ne vaut pas certification PDF/UA ; aucune validation exhaustive des sites, de leurs droits ou de leur disponibilité n’est revendiquée.

## Architecture et langue

- **Next.js 16 / React 19 / TypeScript**, `output: 'export'`, sortie **`out`**, `images.unoptimized: true`. Aucun serveur Next en production.
- Toutes les pages localisées et tous les slugs du [catalogue partagé](src/i18n/article-catalog.json) sont générés au build avec `generateStaticParams` et `dynamicParams = false`.
- **`worker/index.mjs`** reprend les trois routes `/`, `/articles` et `/articles/*` avec le helper à logique conservée `lib/locale-routing.mjs` : cookie `NEXT_LOCALE` > `Accept-Language` pondéré par `q` > `request.cf.country` / `CF-IPCountry` > anglais. Le pays reste un repli heuristique, pas la langue réelle de la personne.
- Redirections **307**, même origine et query string intacte, `Cache-Control: private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`, sans `Set-Cookie`. Les pages explicitement `/fr/...` ou `/en/...` ne sont jamais renégociées.
- **`wrangler.jsonc`** déclare le vrai point d’entrée, le binding `ASSETS` sur `./out`, `html_handling: "drop-trailing-slash"` et `not_found_handling: "404-page"` (pas de fallback SPA). `assets.run_worker_first` réserve la priorité Worker aux trois motifs non localisés. Les pages localisées, images, polices et fichiers de découverte sont servis en priorité par les assets ; un chemin sans asset passe au Worker, qui le délègue tel quel à `ASSETS.fetch` pour une vraie 404.
- **`public/_redirects`** définit les 24 alias permanents des 12 pages conservées : `/fr.html` et `/en.html` en **301**, les autres `.html` et tous les slashs finaux en **308**. Aucun alias ne négocie la langue. Des règles explicites conservent les statuts permanents, car la normalisation Workers par défaut peut répondre 307.
- **`public/_headers`** est conservé : sécurité, Content-Language FR/EN, cache immutable des assets hashés, MIME des endpoints, sans anciennes règles de téléchargement. Les réponses personnalisées du Worker fixent leurs propres en-têtes de sécurité/confidentialité.
- Les anciens wrappers `functions/` et `public/_routes.json` sont conservés comme historique, **pas exécutés par Workers**. `.assetsignore` exclut `_routes.json` de l’upload ; le routage actif se trouve uniquement dans `wrangler.jsonc` et le Worker.
- `src/lib/site-config.ts` centralise l’origine publique. Canonical, hreflang, OG/Twitter, `Person`, JSON-LD/citations, robots, sitemap et endpoints LLM s’appuient sur cette origine. Les interactions client, achats localisés, galerie, copie et sommaires restent disponibles.

Détails du diagnostic, de l’audit d’export et des actions restantes : **[CLOUDFLARE_MIGRATION.md](CLOUDFLARE_MIGRATION.md)**.

## Publication Cloudflare : Workers Builds

L’erreur `Missing entry-point to Worker script or to assets directory` venait de `npx wrangler deploy` exécuté sur une configuration **Pages**. Le choix actuel est une **vraie adaptation à Workers** : `main` pointe sur le Worker de langue et `assets.directory` sur l’export. Ni SSR, ni OpenNext/vinext, ni upload du seul `out` ne sont nécessaires.

| Réglage Workers Builds à vérifier par le propriétaire | Valeur |
| --- | --- |
| Dépôt / racine | ce dépôt, racine sans sous-dossier |
| Branche de production | `main`, à confirmer dans le compte ; aucun déploiement manuel depuis cette branche de travail |
| Build command | `npm run build` |
| Deploy command de production, **seulement pour une publication autorisée** | `npm run deploy:worker` |
| Commande distante d’aperçu de branche, observée dans Workers Builds | `npx wrangler preview` ; nécessite le bloc racine `"previews": {}` |
| Assets / point d’entrée | `./out` / `worker/index.mjs`, déclarés dans `wrangler.jsonc` ; pas de champ Pages « output directory » |
| Node | `22` ; minimum `22.19.0`, comme les engines du dépôt |
| Variable de build, production et preview | `NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.uxplay.workers.dev` |
| Nom imposé du Worker | **`joyccelight-playbook`**, sans suffixe ni renommage automatique |

**Le nom d’origine est une contrainte, pas une suggestion.** `scripts/deploy_worker.cjs` impose `--name joyccelight-playbook` et le fichier Wrangler du dépôt. Il refuse un autre `wrangler.name`, une valeur contradictoire de `WRANGLER_CI_OVERRIDE_NAME`, un environnement nommé (`CLOUDFLARE_ENV`) ou une surcharge CLI. Les contrôles Cloudflare de compte/tag restent actifs : aucune variable d’identité CI n’est supprimée pour les contourner.

Le libellé historique **`Workers Builds: ux-ui-playbook`** ne doit pas remplacer ce nom. Si le pipeline cible une autre ressource, **la commande s’arrête** : il faut rattacher Workers Builds au Worker `joyccelight-playbook` dans une intervention distante autorisée, pas adapter le nom du dépôt à celui injecté. Configurer **`npm run deploy:worker`**, et non `npx wrangler deploy` directement, dans la Deploy command ; ce réglage du compte n’a pas été modifié ici. Compte, droits et domaine restent à vérifier, sans création/renommage implicite ni adresse `workers.dev` inventée.

Les aperçus **distants** de branche sont distincts de la publication de production et du serveur local `npm run preview:worker`. La commande `npx wrangler preview`, observée dans le journal Workers Builds fourni par le propriétaire, exige `"previews": {}` dans `wrangler.jsonc`. Ce bloc vide active les Previews sans recopier ni remplacer `name`, `main`, `assets` ou la date de compatibilité. Pour ce site statique, le binding `ASSETS` reste au niveau racine, comme le prescrit la [documentation Previews](https://developers.cloudflare.com/workers/previews/configuration/#wrangler-configuration-file). Ne pas remplacer la commande de production par cette commande d’aperçu, ni utiliser une publication de production pour tester une branche.

Pour valider le paquet **sans publier** : `npm run build && npm run check:worker`. Ce dernier utilise le même garde-fou, puis `wrangler deploy --name joyccelight-playbook --dry-run` avec la configuration verrouillée. Les tests lisent aussi le bloc Preview avec le parseur de la version Wrangler épinglée, sans authentification ni upload. Cela ne simule pas une création d’aperçu distante : `wrangler preview` ne propose pas de dry-run dans cette version. Le [guide de configuration Workers](CLOUDFLARE_MIGRATION.md#configuration-workers) distingue les preuves locales, les réglages distants restants et l’historique Pages.

**Aucun commit/push/déploiement n’est nécessaire à ces tests locaux.** Les workflows GitHub vérifient, sans publier ; l’intégration Workers Builds, elle, peut déployer à la réception d’un push. Préparer ce code ne désactive ni ne modifie cette intégration distante. L’origine canonique choisie est celle du Worker existant. Le réglage distant `NEXT_PUBLIC_SITE_URL` doit correspondre au dépôt lors du prochain build. Les redirections HTTP depuis les anciens hosts restent une vérification distincte, sans changement DNS ici.

## Développer et prévisualiser

Prérequis : **Node.js 22.19+ dans la branche 22** (`.nvmrc`, engines `>=22.19.0 <23` ; minimum de l’outil Lighthouse) et Python 3.11+ pour les contrôles HTML (CI : 3.12). Wrangler **4.165.0** est précisément épinglé en dépendance de développement ; aucun compte Cloudflare n’est nécessaire pour l’aperçu local.

```bash
npm ci
npm run dev
```

Le serveur de développement Next écoute sur `0.0.0.0:3000`. Ouvrir `/fr` ou `/en` ; le routage du Worker n’est pas exécuté par ce serveur.

Pour tester le fonctionnement cible, construire puis servir **l’export avec son vrai Worker et son binding d’assets** :

```bash
npm run typecheck
npm run test:routing
npm run test:content
npm run build
npm run check:export
npm run check:worker
npm run preview:worker
```

`preview:worker` lance `wrangler dev --local --ip 0.0.0.0 --port 3100` avec la configuration de production, inspecteur sur port automatique et sans interface interactive. `npm start` est un alias de cet aperçu, pas un serveur Next. L’ancien `preview:pages` avertit puis délègue au **même Worker**, sans lancer Pages. Le code navigateur reste relatif/même origine pour l’aperçu proxifié.

Le wrapper `scripts/preview_worker.cjs` écrit une **fixture géographique locale neutre** dans `.wrangler/`, puis indique ce fichier à Miniflare. Sans cela, son pays fictif US masquerait les en-têtes `CF-IPCountry` des tests. La priorité du vrai `request.cf.country` reste inchangée et est couverte séparément par les tests unitaires. Ce dispositif ne s’exécute jamais en production et n’exige aucun compte Cloudflare.

## Vérifications reproductibles

Dans un second terminal, sur le même serveur Worker 3100 :

```bash
python3 scripts/site_check.py \
  --base-url http://127.0.0.1:3100 \
  --expected-origin https://joyccelight-playbook.uxplay.workers.dev

npx playwright install --with-deps chromium
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
```

Sans `PLAYWRIGHT_BASE_URL`, Playwright lance lui-même `preview:worker` ; le build doit déjà exister. `CHROMIUM_EXECUTABLE_PATH` peut désigner un navigateur installé dans l’environnement. Le projet déployé n’a pas besoin de dépendance Chromium serverless.

- **`test:routing`** : règles de langue, cookies valides/inconnus, valeurs `q`, exclusions `q=0`, priorité du pays Cloudflare, query répétée/encodée, slash et corps HEAD/POST, délégation sans mutation aux assets et correspondance de la configuration ; le vrai Worker est importé.
- **`test:content`** : catalogue inchangé, liens contextuels et ancres FR/EN, export textuel, références numérotées, explications et limites existantes, modèle de revue non exécuté et protocole conservé hors publication. Ces contrôles de cohérence ne notent pas automatiquement la qualité éditoriale.
- **`check:export`** : toutes les pages du catalogue, titres/descriptions, canonical/hreflang, OG/Twitter et JPEG 1200 × 630, Person/citations, couvertures, liens/ressources/polices locales, sitemap/robots/LLM, configuration Worker/aliases/headers et absence de l’ancienne origine dans tout `out`.
- **Python, stdlib uniquement** : contrôle HTML/SEO/éditions/Gumroad, bibliographies, paragraphes et illustrations, corpus LLM complet, licences et contrastes des tokens ; matrice HTTP de redirections, cache, chemins explicites, slash, 404. `--expected-origin` (alias `--site-url`) ou `NEXT_PUBLIC_SITE_URL` définit l’origine attendue, **distincte** de `--base-url`.
- **Playwright + axe** : douze routes × deux thèmes aux largeurs 1280, 390 et 320 px ; axe à 1280/320, commandes, police effective, nombres, icônes/vecteurs, débordements et erreurs JavaScript. Les parcours couvrent aussi galerie, thèmes sauvegardés, clavier/focus, copie/checklist/FAQ, langue de l’article et achats ; le prototype est essayé dans ses neuf annotations, avec succès simulé et refus/récupération.
- **Workflows Actions** : `cloudflare-static-export.yml` et `ui-check.yml`, Node 22, installation verrouillée, build puis contrôles. Le workflow UI partage le même serveur Worker entre Python et Playwright. Rapports, captures et traces d’échec sont conservés 14 jours en artefact. **Aucun workflow GitHub ne publie le site** ; `check:worker` est un dry-run, distinct de l’intégration externe Workers Builds.

Les preuves détaillées sont décrites dans [docs/AUDIT.md](docs/AUDIT.md). `reports/`, `test-results/`, `playwright-report/`, `out/` et `.wrangler/` sont ignorés par Git. Les statuts `automated / to verify / not applicable`, la sévérité et le résultat restent distincts ; un échec bloquant automatisé produit un code de sortie 1.

### Origine publique du build

```env
NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.uxplay.workers.dev
```

Cette variable est résolue **au build** et doit être identique pour les deux langues. Sa valeur doit être une origine **HTTPS publique**, sans chemin, identifiants, port personnalisé, query ni fragment ; les valeurs locales/preview connues et la valeur vide explicite sont refusées. Le défaut est défini dans `src/config/site-policy.json`, sans détection depuis un provider ou l’hôte de requête. Le fichier `.env.example` et les deux workflows emploient la même cible. Un changement de domaine impose aussi de régénérer les deux kits et de contrôler séparément les redirections publiques, dans une mission autorisée.

### Fichiers éditoriaux et ressources

- `src/i18n/article-catalog.json` : slugs, nombres d’explications et clés des aperçus, partagés avec les outils et tests.
- `src/i18n/articles/{fr,en}.ts`, `comparison-{fr,en}.ts` : données bilingues ; blocs `explanation`, `diagram`, `mobileLab`, `readingLink`, références et FAQ.
- `src/components/{ArticleVisual,DesignVector,DesignRolesLab}.tsx` et `src/i18n/design-lab.ts` : illustrations originales, prototype et annotations bilingues. Le transcript complet des neuf annotations et des états est exporté dans `/llms-full.txt`.
- `src/components/NotionArticleReader.tsx` : sommaire, citations numérotées, copie, bibliographie et schémas agrandissables avec gestion du focus.
- `npm run generate:social` : dix JPEG Open Graph de 1200 × 630 à partir des mêmes données, avec Domine et Lucide. Nécessite Chromium, sans service distant. Les dix pages de la galerie et les fichiers/licences locaux sont conservés.

## Limites

Le terminal présenté sur la landing est une **simulation annoncée**, pas une exécution Python dans le navigateur. Ses compteurs `9 + 6 + 62 = 77` décrivent des statuts de vérification, pas 77 réussites automatiques. Le scanner commercial `agent_check.py` appartient à l’archive ; le contrôle public de ce dépôt n’en est pas une réplique.

Une réussite axe ne certifie pas WCAG. Lecteurs d’écran réels, compréhension et confort FR/EN, applicabilité juridique, Core Web Vitals terrain, indexation/citations et effets commerciaux restent à vérifier avec les personnes et données appropriées. Aucune étude utilisateur n’a été effectuée sur Atelier. Les trois articles initiaux conservent leurs dates ; le comparatif possède sa propre publication, sans décalage inventé pour le SEO.

## Finalisation technique SEO / AEO / GEO

La passe technique, distincte de la mission éditoriale, est documentée dans :

- [Inventaire initial et conservation](docs/TECHNICAL_INVENTORY.md) ;
- [Audit SEO/AEO/GEO et cinq niveaux de preuve robots](docs/SEO_AEO_GEO_AUDIT.md) ;
- [Runbook reproductible : local, compte Cloudflare, GSC et production](docs/SEARCH_VISIBILITY_RUNBOOK.md) ;
- [Checklist de décision](docs/SEO_RELEASE_CHECKLIST.md) ;
- [Rapport final, nouvelles exécutions et limites](docs/TECHNICAL_READINESS_REPORT.md).

Les commandes supplémentaires sont `check:preservation`, `lint`, `test:seo`, `check:seo`, `check:performance` et `check:public` ; `npm test` regroupe tous les tests unitaires/contenu/ressources/SEO. Après le build, `check:seo` s’exécute contre Wrangler et `test:ui` inclut aussi le contenu sans JS, le focus sous navigation sticky, la 404 et les couleurs forcées. Les mesures Lighthouse/Event Timing restent **du laboratoire**, pas des Core Web Vitals de terrain. Les budgets dépassés, contrôles humains et accès indisponibles restent explicites. La sonde publique retourne 2 si les preuves réseau sont incomplètes, sans conclure à une panne de production.

Le sitemap ne fabrique plus de `lastmod` à partir des dates éditoriales. Les dix agents de recherche/IA demandés sont explicitement déclarés, mais leur autorisation n’est pas une preuve d’exploration ou de citation. Aucun déploiement, changement DNS, accès Vercel ou publication n’est réalisé.
