# Migration Cloudflare Pages — diagnostic et état de livraison

> Les sections A à D conservent le compte rendu de la migration initiale : leurs branches et commits sont historiques. Le dépannage de l’échec de publication `wrangler deploy` après un build réussi figure en section E ; il ne change pas l’architecture Pages retenue.

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

- [Next.js — Static Exports](https://nextjs.org/docs/app/guides/static-exports) : capacités et fonctions serveur non prises en charge.
- [Cloudflare — Static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) : build et sortie statique.
- [Pages Functions — Local development](https://developers.cloudflare.com/pages/functions/local-development/) : assets et Functions dans le runtime local.
- [Pages Functions — Routing](https://developers.cloudflare.com/pages/functions/routing/) : index, catch-all et `_routes.json`.
- [Pages — Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/) : URLs sans extension et 404.
- [Pages — Redirects](https://developers.cloudflare.com/pages/configuration/redirects/) : règles statiques et séparation des Functions.
