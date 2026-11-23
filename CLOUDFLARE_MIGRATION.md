# Cloudflare — adaptation Workers et historique Pages

**Cible actuelle choisie : Next.js statique + Worker léger + Workers Static Assets.** La préparation est locale, sans publication. Les sections A à E ci-dessous sont **l’historique Pages**, y compris la correction documentaire de la PR #8 : leurs commandes Pages et recommandations ne sont plus la procédure courante. Les anciens résultats ne valident pas cette adaptation.

## Configuration Workers

Le build Next (`output: 'export'`) produit toujours **`out/`** : 14 URL éditoriales FR/EN et les endpoints statiques. Aucun serveur Next, adaptateur SSR, OpenNext/vinext, stockage ou appel distant n’est ajouté au runtime.

### Point d’entrée, assets et ordre de routage

- `wrangler.jsonc` déclare **`main: "worker/index.mjs"`** et **`assets: { directory: "./out", binding: "ASSETS" }`** ; `pages_build_output_dir` est supprimé.
- **`assets.run_worker_first: ["/", "/articles", "/articles/*"]`** donne la priorité au Worker seulement pour la négociation. Ces routes appellent le helper existant `lib/locale-routing.mjs`, dont la logique est préservée : cookie valide > `Accept-Language` pondéré/exclusions `q=0` > pays Cloudflare > anglais. `request.cf.country` est prioritaire sur l’en-tête de repli.
- Les réponses de négociation restent des **307**, même origine, query répétée/encodée intacte, `Cache-Control: private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`, trois en-têtes de sécurité et aucun cookie créé.
- Les pages explicitement `/fr/...` ou `/en/...` et les fichiers sont **asset-first**, sans négociation. Un chemin sans asset peut invoquer le Worker ; hors des trois motifs, il délègue la **Request d’origine** à `env.ASSETS.fetch(request)` sans transformation ni appel réseau externe.
- **`html_handling: "drop-trailing-slash"`**, **`not_found_handling: "404-page"`** et l’export `404.html` conservent les URL sans extension/slash et les vraies 404, pas de fallback SPA. Un article inconnu non localisé reçoit une 307 puis une 404 localisée.
- **`public/_redirects`** contient les **28 alias permanents des 14 pages** : `/fr.html` et `/en.html` restent en 301 ; les autres `.html` et les slashs finaux sont en 308. Les premiers essais ont révélé des 307 du service d’assets pour certaines normalisations. Ces règles explicites corrigent le comportement ; les tests ne sont pas assouplis pour accepter des redirections temporaires.
- **`public/_headers` reste intact** : sécurité, Content-Language, cache immutable des fichiers hashés, MIME robots/sitemap/LLM et téléchargements/noindex/Content-Disposition. Ces règles concernent les assets, pas les réponses personnalisées du Worker ; le helper fixe donc ses propres en-têtes.
- Les trois anciens wrappers `functions/` et `public/_routes.json` restent conservés comme historique, mais **ne participent plus au routage actif Workers**. `public/.assetsignore`, copié dans `out/`, exclut `_routes.json` de l’upload. Ni les sources Worker/Functions, ni les règles `_headers`/`_redirects`, ni le brouillon interne ne doivent être accessibles comme fichiers publics.

Le nom d’origine **`joyccelight-playbook` est imposé**, sans suffixe ni adaptation au libellé du check `Workers Builds: ux-ui-playbook`. La date de compatibilité **`2026-11-18`** est conservée.

**Garde-fou de publication :** `scripts/deploy_worker.cjs` vérifie le `name` du fichier Wrangler du dépôt, refuse une valeur contradictoire de `WRANGLER_CI_OVERRIDE_NAME` (que Wrangler privilégie même face à `--name`), refuse `CLOUDFLARE_ENV` et les surcharges CLI, puis transmet explicitement **`--name joyccelight-playbook`**. Seul l’argument `--dry-run` est accepté. Les variables de compte/tag CI restent intactes : on échoue en cas de conflit, on ne contourne pas les vérifications de Cloudflare.

La Deploy command à configurer est **`npm run deploy:worker`**. Ne pas appeler `npx wrangler deploy` directement pour contourner ce garde-fou. Si Workers Builds attend une autre ressource, rattacher le pipeline au Worker au nom imposé lors d’une intervention autorisée, sans renommer implicitement un projet existant. **Ce réglage distant n’a pas été changé ici** ; le compte, les droits et le rattachement effectif restent non vérifiés.

### Réglages Workers Builds à contrôler ultérieurement

| Réglage | Valeur / réserve |
| --- | --- |
| Racine | racine de ce dépôt, sans sous-dossier |
| Branche de production | `main`, à confirmer dans le compte ; branche de travail actuelle non publiée |
| Build command | `npm run build` |
| Deploy command | **`npm run deploy:worker`**, garde-fou puis Wrangler avec le nom imposé ; seulement dans une publication explicitement autorisée |
| Point d’entrée / assets | `worker/index.mjs` / `out`, déclarés dans Wrangler ; pas de `pages_build_output_dir` |
| Node | 22.19+ dans la branche 22 (`.nvmrc`, engines et CI) |
| Variable de build production et preview | **`NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev`** |
| Binding applicatif | `ASSETS`, géré avec les fichiers de la même version par Wrangler |
| Nom imposé | **`joyccelight-playbook`**, vérifié par les tests, l’export et le garde-fou |
| Compte / rattachement / droits | non vérifiés ; à aligner sur ce nom, pas l’inverse |
| Domaine public Workers | **non confirmé** ; aucune adresse `workers.dev` ou personnalisée inventée |

L’origine canonique de configuration **reste Pages pour préserver les liens imprimés des kits**. Ce choix ne fait pas pointer ce domaine vers le Worker et ne prouve pas qu’il est publiquement accessible. Avant une mise en service sur un domaine différent, décider séparément la convergence des origines et la mise à jour des kits ; aucun DNS, domaine, redirect entre hosts ou produit Gumroad n’est modifié ici.

### Vérification locale, sans publier

```bash
npm ci
npm run check:preservation
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm run check:worker
npm run preview:worker
```

`check:worker` lance **`node scripts/deploy_worker.cjs --dry-run`** : le même verrou de nom précède `wrangler deploy --config wrangler.jsonc --name joyccelight-playbook --dry-run --outdir .cache/worker-dry-run`. Empaquetage local et validation du binding, **pas un upload ni une publication**. `npm run deploy:worker` sans `--dry-run` est une vraie publication, jamais exécutée dans cette préparation. `preview:worker` utilise **`wrangler dev --local`**, `0.0.0.0:3100`, avec le véritable point d’entrée et le binding Static Assets. `npm start` lui délègue ; l’ancien `preview:pages` avertit puis lance le même Worker, **sans `wrangler pages dev`**.

Le wrapper `scripts/preview_worker.cjs` conserve la fixture géographique neutre `{}` dans `.wrangler/cf-worker-local.json`. Elle empêche le faux pays US de Miniflare de masquer les en-têtes `CF-IPCountry` des tests locaux. La priorité du vrai `request.cf.country` reste testée séparément en unitaire. Ce wrapper n’est pas exécuté en production et ne demande aucun compte.

Sur ce même serveur, dans un second terminal :

```bash
python3 scripts/site_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev
python3 scripts/seo_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
```

`test:routing` importe le **vrai Worker**, pas les anciens wrappers Pages : priorités, query, sécurité, HEAD/POST, délégation et configuration. `check:export` vérifie la configuration Workers, les aliases, les en-têtes et les 14 URL. Les tests HTTP couvrent les normalisations permanentes de toutes les pages, les téléchargements, les endpoints, les 404 et l’exclusion des fichiers internes ; Playwright conserve aussi les interfaces FR/EN, le clavier, l’absence de JS et les contrôles axe existants.

**Les workflows GitHub vérifient seulement** : l’export inclut le dry-run ; le workflow UI partage un vrai serveur Worker entre Python et Playwright. Aucun secret Cloudflare n’est requis. Le commit, le push de la branche de travail et l’ouverture d’une PR sont demandés séparément pour la livraison ; l’intégration **externe** Workers Builds peut publier en réaction à ce push. Cela ne constitue pas une commande manuelle de déploiement ni une validation de production. Aucune fusion ou modification de réglage Cloudflare/DNS n’est comprise dans cette livraison.

Les preuves, différences avec la base `fa2f5dd46a10612b986eb4fb2aea7037657a670b` et réserves de ce lot figurent dans le [rapport Workers](docs/WORKERS_MIGRATION_REPORT.md). Les réserves TBT historiques restent ouvertes : cette adaptation du routage ne revendique aucune optimisation de performance, certification WCAG, indexation, citation IA ou validation de production.

## Historique Pages — sections A à E

**Archive de décisions remplacées par le choix Workers ci-dessus.** Les branches et commandes des sections suivantes sont historiques ; ne pas utiliser leur procédure de publication Pages pour la configuration actuelle.

## A. Diagnostic et causes

### Architecture retenue

**Next.js 16 + React 19 + export statique + Cloudflare Pages + trois Pages Functions**. Le site ne nécessite ni SSR, ni vinext, ni OpenNext, ni serveur Next dans un Worker. Les articles et les données produit sont connus au build ; galerie, copie, thème, sommaires et maquettes fonctionnent côté client.

La base de cette passe est `81a3e07cb7a323fc1ddac1d96c208364f71c5f23`. Elle utilisait un serveur Next pour le routage : `src/proxy.ts` importait `NextRequest/NextResponse`, consultait `x-vercel-ip-country` et redirigeait les chemins non localisés ; les redirections historiques étaient déclarées dans `next.config.mjs`. Ces fonctions ne sont pas exécutées par un simple hébergeur de fichiers statiques. L’optimisation d’images par défaut, les handlers non explicitement statiques et l’origine de repli Vercel devaient également être traités.

Le démarrage d’un serveur Next n’est donc pas un test du fonctionnement Pages d’un dossier `out`. Les scripts, Playwright et la CI utilisaient encore ce mode de démarrage ; ils servent désormais le résultat exporté avec **Wrangler Pages réel**, sur le même port 3100.

### Ce que les anciennes exécutions permettent de conclure

Pour l’ancienne PR #2, le job GitHub `135600148526` du run `44535631067` indique : typecheck/build réussis, étape de démarrage + contrôle Python en échec, Playwright ignoré. Le téléchargement des logs détaillés a échoué avec EOF. **Le message d’erreur historique précis n’a donc pas été établi** ; il ne faut pas présenter la correction actuelle comme sa reproduction exacte.

La référence `cloudflare-migration-v2` a été consultée au commit `d6d49a69e04084c0c2f23b3a97b6c1b44a6634da`. Une reprise globale aurait remplacé des choix éditoriaux et visuels plus récents. Les changements techniques utiles ont été adaptés sélectivement à la base actuelle pour conserver Domine, Lucide, les paragraphes développés et les contrôles existants.

### Particularité du test géographique local

Miniflare fournit par défaut un objet `request.cf` fictif contenant le pays **US**, y compris quand sa récupération réseau est désactivée. Comme le vrai pays Cloudflare doit rester prioritaire sur `CF-IPCountry`, injecter uniquement l’en-tête `BJ` ne permettait pas de simuler le Bénin dans ce contexte.

`preview:pages` écrit un fichier neutre `{}` dans `.wrangler/cf-local.json` et l’utilise comme cache `cf` local frais. Il évite ainsi la récupération réseau et le faux pays US. Ce wrapper ne fait que lancer `wrangler pages dev out` ; il n’intervient jamais dans les Functions publiées. Les tests HTTP examinent le repli `CF-IPCountry`, tandis que les tests unitaires vérifient séparément la priorité de `request.cf.country`, notamment US face à un en-tête BJ contradictoire.

## B. Modifications et suppressions

### Export et ressources

| Élément | Mise en œuvre |
| --- | --- |
| Build | `npm run build`, `output: 'export'`, dossier `out` ; Next 16 / React 19 conservés. |
| Node | `.nvmrc` = 22 ; engines `>=22.17.0 <23` ; Node 22 dans les deux workflows. |
| Images | `images.unoptimized: true` ; fichiers locaux, pas d’URL `/_next/image`. |
| Routes dynamiques | `generateStaticParams` et `dynamicParams = false` pour FR/EN et tous les slugs du catalogue. |
| SEO/LLM | Robots, sitemap, `/llms.txt` et `/llms-full.txt` explicitement `force-static` ; `Response` Web standard pour les endpoints texte. |
| Origine | `src/lib/site-config.ts` : `NEXT_PUBLIC_SITE_URL` ou `https://joyccelight-playbook.pages.dev`, validation d’une origine HTTP(S) sans chemin, query, fragment ni identifiants. |
| Canonical et schémas | Même origine pour metadataBase, canonical/hreflang, OG/Twitter, Person, JSON-LD, robots, sitemap et corpus LLM. Aucun calcul à partir de l’hôte de test. |
| Aperçu local | Wrangler **4.165.0 exact**, en devDependency ; script `preview:pages`, IP `0.0.0.0`, port 3100 ; `start` délègue à ce script. |

**Supprimé :** `src/proxy.ts`, désormais inutile et incompatible avec la cible statique. Les redirections Next ont été remplacées par celles de Pages ; aucune dépendance `@vercel/*`, vinext ou OpenNext n’a été ajoutée.

**Conservé :** les deux WOFF2 Domine et leur notice OFL, Lucide, couvertures, galerie, images locales, les trois articles existants et toutes leurs références (11 / 4 / 4 par langue), les liens Gumroad, l’offre et le contact. La recherche d’empreintes SHA-256 identiques dans `public` n’a trouvé aucun doublon exact ; aucune ressource n’a été supprimée sur une simple supposition d’inutilité. Les anciens extraits conservés sur disque ne sont pas réintroduits dans les articles.

### Audit des dépendances au serveur

Inspection du code applicatif et build effectif :

- pas d’import `next/headers`, d’appel serveur à `cookies()`, `headers()` ou `draftMode()` ;
- pas de Proxy/Middleware restant, de Server Action, d’ISR, de `force-dynamic` ni de handler dépendant d’une `Request` Next ;
- `notFound()` ne sert qu’à protéger les paramètres invalides ; les paramètres valides sont entièrement générés ;
- les quatre endpoints machine sont statiques ; aucune base de données ni secret n’est nécessaire ;
- les commandes client utilisent les APIs du navigateur pour thème, cookie de langue, copie et simulation ;
- les dépendances d’outillage Node ne sont pas des dépendances d’exécution du site statique.

Le contrôle `check:export` scanne aussi les fichiers texte générés, dont les bundles JS/CSS et le corpus LLM, pour rejeter l’ancienne origine et les traces de découverte d’hôte Vercel.

### Functions et routage

La logique se trouve dans **`lib/locale-routing.mjs`**, importée par :

- `functions/index.js` → `/` ;
- `functions/articles/index.js` → `/articles`, avec slash accepté ;
- `functions/articles/[[catchall]].js` → `/articles/*`.

Priorité : **cookie `NEXT_LOCALE` valide > `Accept-Language` avec pondérations `q` valides > `request.cf.country`, sinon `CF-IPCountry` > EN**. Les langues non prises en charge et les valeurs `q` invalides sont ignorées ; `q=0` n’est pas sélectionné et exclut aussi le repli français. Si aucune langue disponible ne peut être retenue, le repli navigable reste anglais, sans page 406. Le cookie explicite conserve la priorité, même face à une autre préférence de navigateur.

Chaque réponse de négociation est une **307** sur la même origine, avec query répétée/encodée préservée, `Cache-Control: private, no-store` et `Vary: Cookie, Accept-Language, CF-IPCountry`. Aucun cookie n’est écrit par cette négociation. Le sélecteur client écrit le choix explicite et conserve l’article courant.

`public/_routes.json` inclut **seulement** `/`, `/articles`, `/articles/*`. Les pages `/fr/...`, `/en/...`, polices, images, fichiers Next statiques, OG, robots, sitemap et LLM n’invoquent donc pas les Functions. Un slug non localisé inconnu reçoit au plus une redirection, puis la 404 statique localisée ; un chemin inconnu hors de ces motifs reçoit directement une 404. `404.html` empêche le fallback SPA.

`public/_redirects` ne contient que les redirections **301** `/fr.html → /fr` et `/en.html → /en`. Elles ne chevauchent pas les Functions. `_headers` fixe `text/plain; charset=utf-8` sur les deux endpoints LLM. Ces trois fichiers sont copiés et contrôlés dans `out`.

### Quatrième article et interfaces

Le libellé « Trois articles » est remplacé par **« Article »**, sans nouveau compteur dans l’intitulé. Le catalogue commun `src/i18n/article-catalog.json` ajoute `ux-ui-product-design`, en FR et EN, sans déplacer les anciens slugs.

Le comparatif suit l’application fictive **Atelier**, une prestation de 39 € / 45 min, à travers huit sections : responsabilités, offre, UX, UI, maquettes, passation, preuves et répartition du travail. Chaque langue comporte 14 explications développées avec leur visuel, deux synthèses vectorielles originales, six références, cinq FAQ et un modèle de revue copiable. Les définitions sont distinguées des choix pédagogiques et des résultats encore à observer.

Le prototype `DesignRolesLab` montre la même offre, le même créneau et le même récapitulatif sous trois regards. Il conserve les choix quand le regard change, permet de revenir en arrière, simule une confirmation et un refus de disponibilité, puis une reprise. Les commandes, états sélectionnés/indisponibles et messages sont textuels et programmatiques, pas seulement colorés. Aucune donnée n’est transmise. Le transcript LLM contient les neuf annotations et les états cachés, pas uniquement le premier écran.

Deux JPEG OG 1200 × 630 complètent les huit existants. Le générateur utilise les données éditoriales partagées. Les cartes d’articles et les schémas sont natifs et reflowables ; la galerie des dix pages réelles reste distincte.

## C. Commandes, preuves et limites

Les commandes à rejouer, après installation de Node 22 et Chromium :

```bash
npm ci
npm run typecheck
npm run test:routing
npm run build
npm run check:export
npm run preview:pages
```

Puis, dans un second terminal, **sur ce même serveur Pages** :

```bash
python3 scripts/site_check.py \
  --base-url http://127.0.0.1:3100 \
  --expected-origin https://joyccelight-playbook.pages.dev
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
npm audit --audit-level=moderate
git diff --check
```

Les résultats exécutés et les défauts rencontrés sont consignés dans **[docs/AUDIT.md](docs/AUDIT.md)**. Les rapports machine sont ignorés par Git et conservés par les workflows : `reports/static-export-check.json`, `site-check.json`, `browser-check.json`, logs Pages, rapport HTML Playwright, captures et traces d’échec. Un build réussi n’est pas à lui seul une validation du routage ; les essais HTTP et navigateur utilisent bien les Functions compilées par Wrangler.

Limites : pas de compte Cloudflare consulté, de publication distante, de vérification du routage dans le réseau Cloudflare ni de géolocalisation réelle d’un visiteur. La priorité du pays est testée par injection unitaire et son repli par le runtime local. Lecteurs d’écran réels, compréhension FR/EN, obligations juridiques et mesures de terrain restent à vérifier ; axe n’est pas une certification.

## D. Branche, PR et workflows

Cette session travaille uniquement sur **`arena/b41a2b1b-ux-ui-playbook-landing-page`**, issue de `81a3e07`. La demande de mise à jour directe de `cloudflare-migration-v2` / PR #2 entre en conflit avec cette branche de session fixe. **Aucun changement de branche, push vers `cloudflare-migration-v2`, réécriture d’historique ou mise à jour du code de PR #2 n’est effectué.** Les résultats de cette branche ne sont pas attribués à PR #2.

- [PR #2](https://github.com/joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page/pull/2) : ancienne tête `d6d49a6`, pas mise à jour par cette passe.
- `.github/workflows/cloudflare-static-export.yml` : npm ci, TypeScript, tests de langue, build et contrôle de tout le catalogue.
- `.github/workflows/ui-check.yml` : même export, un serveur local Pages partagé entre Python et Playwright, artefacts 14 jours.
- Déclenchement sur PR, branches `main`, `cloudflare-migration-v2`, `arena/**` et manuel. Aucune étape de publication et aucun secret Cloudflare requis.

Les identifiants de commits et les conclusions GitHub éventuelles sont donnés dans le compte rendu de livraison. Une configuration de workflow écrite ne constitue pas une exécution réussie ; les preuves locales ci-dessus restent distinctes des checks distants.

## E. Configuration Cloudflare restante — non exécutée

### Échec de `wrangler deploy` après un build réussi

Le journal de publication transmis montre successivement :

```text
Success: Build command completed
Executing user deploy command: npx wrangler deploy
It seems that you have run `wrangler deploy` on a Pages project
Missing entry-point to Worker script or to assets directory
```

**Cause établie par le journal et le dépôt :** la génération des 21 pages statiques et TypeScript réussissent ; l’échec concerne ensuite l’usage de la commande **Workers** `wrangler deploy` avec une configuration **Pages** (`pages_build_output_dir: "./out"`). Le projet n’a volontairement ni script Worker `main` ni configuration Workers `assets`. Les avertissements de cache Next absent, de télémétrie et de dépréciation `node-domexception` ne sont pas l’erreur bloquante de ce journal.

Le champ **Deploy command** et cette séquence de logs indiquent un flux de publication de type **Workers Builds** ; le compte n’ayant pas été consulté, le type exact du projet et ses autorisations restent à confirmer dans le tableau de bord. Changer seulement le code React, la version Node ou le nom du fichier Wrangler ne corrige pas ce décalage.

**Correction recommandée — intégration Git Pages :**

1. Dans **Workers & Pages**, ouvrir le projet **Pages** voulu. S’il n’existe pas, la personne responsable peut créer une application en choisissant explicitement **Pages** et l’intégration Git, pas un nouveau Worker ; ne pas supprimer le projet existant ni modifier les DNS.
2. Sélectionner le dépôt `joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page` et la branche de production `main` ; conserver la racine du dépôt, sans sous-dossier.
3. Choisir le preset **Next.js (Static HTML Export)**, ou **None** avec `npm run build` comme commande de build et **`out`** comme dossier de sortie. Garder Node 22.19+ dans la branche 22 et l’origine canonique de la table ci-dessous. Le nom `joyccelight-playbook` et l’adresse Pages attendue restent à confirmer ; ne pas substituer silencieusement un autre domaine aux liens déjà imprimés dans les kits.
4. **Ne pas renseigner `npx wrangler deploy` comme commande de publication.** L’intégration Git Pages prend en charge la publication après le build, y compris les trois handlers de `functions/` ; un écran imposant une Deploy command Workers n’est pas la configuration Git Pages décrite ici.
5. La personne responsable peut alors relancer une publication Pages. Son succès doit être établi par les nouveaux logs puis les contrôles HTTP publics, pas par le seul succès du build.

**Alternative CLI, uniquement pour une publication explicitement autorisée vers un projet Pages existant :**

```bash
# Depuis la racine du dépôt, après validation du build :
# Vraie publication distante, pas une commande de diagnostic local.
npx wrangler pages deploy out --project-name=joyccelight-playbook --branch=main
```

Confirmer d’abord le compte, le nom du projet, les droits Pages et que `main` est bien sa branche de production. L’authentification reste dans l’environnement du propriétaire ; aucune clé ne doit être copiée dans le chat, Git ou une URL. Une commande Pages exécutée dans un pipeline Workers n’établit pas que le jeton de ce pipeline dispose des permissions Pages : l’intégration Git Pages reste la voie recommandée ici.

Exécuter la commande depuis la **racine** permet à Wrangler de trouver et compiler `functions/`. Le glisser-déposer du seul `out` dans le tableau de bord ne compile pas ces Functions ; `wrangler deploy --assets=out` n’est pas un remplacement équivalent. Ajouter un faux `main` ou migrer vers Workers/OpenNext/vinext serait un autre projet d’architecture, pas la correction de ce journal.

La documentation officielle distingue [l’export Next statique sur Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [l’intégration Git Pages](https://developers.cloudflare.com/pages/get-started/git-integration/) et [l’envoi avec Wrangler et les limites du glisser-déposer pour les Functions](https://developers.cloudflare.com/pages/get-started/direct-upload/).

**Portée de cette correction : documentation uniquement.** `wrangler.jsonc`, `next.config.mjs`, les scripts npm, les Functions, les workflows et l’éditorial ne changent pas. Aucun compte Cloudflare, DNS ou domaine n’est modifié ; aucune commande de publication n’est lancée. Ce diagnostic ne lève ni les réserves TBT ni les vérifications de production restant à faire.

### Réglages attendus du projet Pages

La configuration locale attend :

| Réglage Pages | Valeur |
| --- | --- |
| Projet attendu | `joyccelight-playbook` — existence et accès distants non vérifiés |
| Branche de production | `main`, à confirmer dans le projet Pages |
| Racine du dépôt | racine ; champ vide si c’est le réglage par défaut |
| Framework preset | Next.js Static HTML Export, ou réglages manuels équivalents |
| Build command | `npm run build` |
| Build output directory | `out` |
| Deploy command | aucune dans l’intégration Git Pages ; pas de `npx wrangler deploy` |
| Node | `22` (`NODE_VERSION=22`, `.nvmrc` déjà présent) |
| Variable de build, production et preview | `NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev` |
| Functions | dossier `functions/` à la racine ; motifs définis par `out/_routes.json` |
| Compatibilité | `2026-11-18`, déclarée dans `wrangler.jsonc` |
| Secrets / bindings applicatifs | aucun nécessaire pour le fonctionnement actuel |

À faire **ultérieurement avec autorisation**, par la personne responsable de Cloudflare :

1. Confirmer le projet, les droits et la branche à publier, puis résoudre le rattachement de cette livraison à la branche/PR souhaitée. Ne pas activer de publication Git automatique sans accord.
2. Renseigner les réglages ci-dessus. Ne pas remplacer cette cible par Next SSR, OpenNext ou Workers sans besoin démontré.
3. Après une publication autorisée, rejouer les contrôles HTTP sur l’adresse Pages, tout en gardant l’origine canonique attendue séparée de l’adresse ciblée. Vérifier les Functions, cache/Vary, 404, slashes, MIME des LLM et les aperçus de partage dans cet environnement réel.
4. Faire examiner les langues, le contenu et l’accessibilité par des personnes ; contrôler ensuite les données de terrain si le site est effectivement mis en service.

**Rien de distant n’a été modifié ici :** pas de login/token Cloudflare, création de projet, commande de déploiement, DNS, domaine personnalisé, bascule de trafic, suppression de déploiement Vercel ou fusion de PR. Vercel reste intact ; il n’y a pas de retour arrière d’infrastructure à effectuer pour ces modifications locales.

## Documentation primaire consultée

**Cible actuelle Workers :**

- [Workers — Static Assets](https://developers.cloudflare.com/workers/static-assets/) : export statique avec script Worker et binding d’assets.
- [Workers — Worker script routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/) : asset-first, motifs `run_worker_first` et délégation au binding.
- [Workers — HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) : normalisation HTML/slash.
- [Workers — Redirects](https://developers.cloudflare.com/workers/static-assets/redirects/) : règles permanentes des assets, distinctes des réponses Worker.
- [Workers — Headers](https://developers.cloudflare.com/workers/static-assets/headers/) : en-têtes statiques et limites de `_headers`.

**Références de l’historique Pages :**

- [Next.js — Static Exports](https://nextjs.org/docs/app/guides/static-exports) : capacités et fonctions serveur non prises en charge.
- [Cloudflare — Static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) : build et sortie statique.
- [Pages Functions — Local development](https://developers.cloudflare.com/pages/functions/local-development/) : assets et Functions dans le runtime local.
- [Pages Functions — Routing](https://developers.cloudflare.com/pages/functions/routing/) : index, catch-all et `_routes.json`.
- [Pages — Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/) : URLs sans extension et 404.
- [Pages — Redirects](https://developers.cloudflare.com/pages/configuration/redirects/) : règles statiques et séparation des Functions.
