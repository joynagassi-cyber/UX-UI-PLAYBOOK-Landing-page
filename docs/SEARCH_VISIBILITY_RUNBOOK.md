# Runbook — validation technique et visibilité de recherche

## Règles de sécurité et de publication

Ce document est une procédure, **pas l’autorisation de publier**. Ne pas déployer, modifier des DNS, ouvrir un compte d’hébergement, toucher à Vercel, fusionner une PR ou supprimer une branche dans cette mission. Ne jamais placer une clé, cookie d’authentification, jeton Search Console ou export de compte dans le dépôt/chat.

La validation locale ne nécessite aucun compte Cloudflare. Le preview utilise `wrangler pages dev out`, jamais `wrangler deploy` ni `wrangler pages deploy`. Les deux workflows CI ne font que vérifier et conserver des rapports.

## 1. Préparer un environnement reproductible

- Node **22.19+ dans la branche 22** : Lighthouse 13 demande ce minimum ; `.nvmrc` reste sur 22. Aucun passage du site à Node 24.
- npm et verrou `package-lock.json` ; Python standard library 3.11+ (CI : 3.12).
- Chromium installé pour Playwright et Chrome/Chromium accessible à Lighthouse. Le rapport donne les versions réellement utilisées, pas une promesse de parité multi-navigateurs.

```bash
node --version
npm ci
npx playwright install --with-deps chromium
export NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev
```

Le téléchargement Playwright dépend de l’accès au CDN du navigateur. Dans le sandbox de cette mission, un Chromium portable a été installé **uniquement dans `.cache/`** depuis le registre npm autorisé. Alternative locale exactement utilisée, sans modifier les dépendances du produit :

```bash
npm install --prefix .cache/browser --no-save --package-lock=false --ignore-scripts @sparticuz/chromium@138.0.2
node -e 'require("./.cache/browser/node_modules/@sparticuz/chromium").executablePath().then(console.log)'
node -e 'const fs=require("fs"),z=require("zlib"); fs.writeFileSync(".cache/browser/al2023.tar",z.brotliDecompressSync(fs.readFileSync(".cache/browser/node_modules/@sparticuz/chromium/bin/al2023.tar.br")))'
mkdir -p .cache/browser/runtime
tar -xf .cache/browser/al2023.tar -C .cache/browser/runtime
export CHROMIUM_EXECUTABLE_PATH=/tmp/chromium
export LD_LIBRARY_PATH="$PWD/.cache/browser/runtime/lib${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
```

Ce navigateur portable ancien est un environnement de laboratoire borné au site local de confiance, pas une recommandation d’usage pour naviguer sur Internet ni la preuve d’un test du dernier Chrome. En CI et pour la revue humaine, utiliser les navigateurs supportés et à jour. Les artefacts de laboratoire conservent la version, le CPU simulé et le profil réseau.

## 2. Valider les sources, sans serveur

```bash
npm run check:preservation
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
git diff --check
```

- `npm test` réunit les tests unitaires de routage, contenu, ressources, captures hors réseau et SEO. Les alias `test:routing`, `test:content`, `check:resource` et `test:seo` permettent d’isoler un échec.
- `check:preservation` compare 108 fichiers à la base de cette mission et vérifie que l’inventaire des fichiers `page.tsx` n’a pas grandi. Il ne faut **pas** rafraîchir automatiquement la baseline pour faire passer un changement éditorial inattendu. Un futur changement intentionnel doit mettre à jour la baseline avec sa revue.
- `check:export` doit être exécuté après le build de la même révision. Ne pas valider un ancien `out/`.
- Les tests et builds créent `reports/`, `out/`, `.next/`, `.cache/`, etc., ignorés par Git. Aucun besoin de régénérer les kits ou de lancer Microlink.

Le lint utilise ESLint 10 et des plugins Next/hooks/TypeScript compatibles explicitement épinglés. Il ne désactive pas les règles de hooks pour cacher des erreurs. Les exceptions documentées concernent CommonJS dans les outils et les liens/images natifs intentionnels de l’export statique. La validation d’accessibilité n’est pas déléguée au lint.

## 3. Servir l’export réel, puis tester HTTP et navigateur

Dans un terminal/processus durable :

```bash
npm run preview:pages
```

Le serveur écoute `0.0.0.0:3100` et accepte le host de preview ; les appels navigateur restent relatifs/même origine. `CF-IPCountry` est une fixture locale ; `request.cf.country` réel et sa priorité sont testés séparément en unitaire. Le wrapper ne se connecte pas à un compte Cloudflare.

Dans un autre terminal :

```bash
python3 scripts/site_check.py --base-url http://127.0.0.1:3100 --expected-origin "$NEXT_PUBLIC_SITE_URL"
python3 scripts/seo_check.py --base-url http://127.0.0.1:3100 --expected-origin "$NEXT_PUBLIC_SITE_URL"
npm run test:ui
```

L’origine attendue est toujours celle du build, **pas** le host local. Avec `PLAYWRIGHT_BASE_URL` défini, le serveur doit déjà être lancé ; sinon Playwright peut lancer le wrapper local. Ne pas utiliser `next start`, incompatible avec ce mode d’export.

En cas de test intermittent : conserver la trace et le JSON avant de relancer ; diagnostiquer le test, l’animation ou l’environnement. Les reprises automatiques Playwright restent à zéro. Un succès isolé ne remplace pas une exécution finale de la suite entière.

### Matrice à contrôler

- 14 pages : HTTP 200, langue explicite, canonical unique propre, hreflang FR/EN/x-default, métadonnées/OG/Twitter, contenu substantiel avant JS.
- Racine et chemins non localisés : négociation cookie/langue/pays, 307, même origine, query conservée, cache privé interdit au partage.
- URL `.html` et slash final : normalisation, query intacte et aucune boucle.
- URL inconnues/locales non supportées : HTTP 404 réel, `noindex`, récupération bilingue, pas de fallback SPA ni canonical artificiel.
- Sitemap XML : 14 `loc`, alternates réciproques, pas de paramètres/téléchargements/404 ni `lastmod` non prouvés.
- Robots : les dix noms demandés et les deux contrôles étendus ; sitemap absolu de la bonne origine ; pas d’interdiction indirecte sur les pages.
- Chaque agent simulé : GET local des 14 pages et quatre endpoints, sans challenge ni variation du corps par rapport au client standard.
- Les six téléchargements : vrais octets/empreintes/MIME, `noindex` intentionnel des fichiers bruts ; les deux langues ne partagent pas le mauvais kit.
- En-têtes des assets et des Functions testés séparément ; `_headers` ne gouverne pas les réponses Functions.

## 4. Mesurer les performances sans fabriquer du terrain

Arrêter toute autre suite lourde ; conserver le serveur local. La mesure finale est séquentielle, pas concurrente d’axe ou d’un build :

```bash
npm run check:performance -- --runs 3
```

Cette commande couvre les 14 routes. Elle conserve 42 rapports Lighthouse bruts et 42 scénarios Event Timing, puis les médianes LCP/CLS/TBT par route et le pire candidat INP scripté. Pour diagnostiquer, pas pour remplacer la mesure finale :

```bash
npm run check:performance -- --runs 1 --route /fr --output reports/performance-diagnostic.json
```

- Lighthouse : profil mobile 390 × 844, simulation RTT 150 ms/débit 1 638,4 kbit/s/CPU ×4. LCP, CLS et TBT sont **de laboratoire**.
- Interactions : vrai clavier/clic local sur le thème et un contrôle du contenu (toggle inactif préféré pour éviter un clic sans changement), CPU ×4, réseau HTTP local sans shaping, réduction des animations. Event Timing est regroupé par `interactionId` ; les délais d’entrée, traitement et présentation sont conservés. Ce petit scénario n’est pas représentatif de tous les parcours.
- Seuils de travail : LCP ≤2 500 ms, CLS ≤0,1, TBT ≤200 ms ; candidat scripté ≤200 ms. Le code de sortie 1 signale un budget dépassé ; il ne faut pas relever le seuil pour obtenir du vert.
- Un candidat nul signifie absence d’événement rapporté au-dessus du plancher de 16 ms ou mesure non rapportée, **pas une latence mesurée de zéro**. La capacité Event Timing et les événements bruts restent visibles.
- Pas de score « Core Web Vitals réels ». INP n’est pas remplacé par TBT. Un score Lighthouse élevé peut coexister avec un problème d’interaction.

Le profilage de cette passe a trouvé une tempête de `transitionrun`/`transitionstart`/`transitionend` lors des changements de thème avec des durées réduites à 0,001 ms. Le CSS supprime désormais les transitions/animations dans `prefers-reduced-motion: reduce` ; deux tests FR/EN exigent zéro événement sur deux bascules. Les traces avant/après sont des diagnostics ponctuels, pas une étude statistique : ne pas en déduire un pourcentage garanti de gain. Les interactions en mouvement standard et les autres parcours ne sont pas couverts par le candidat INP de ce petit scénario réduit ; les profiler séparément avec des personnes/appareils appropriés.

Le vrai diagnostic de terrain nécessite des données représentatives au 75e percentile, segmentées notamment mobile/desktop et sur une période suffisante. Absence de CrUX, faible trafic ou rapport GSC vide = **données insuffisantes**, pas « réussi ». Aucun RUM n’est ajouté sans décision et cadre de confidentialité appropriés.

## 5. Contrôles Cloudflare nécessitant un accès du propriétaire — non réalisés ici

Examiner en lecture seule et conserver une preuve horodatée/anonymisée avant toute modification future autorisée :

1. Projet Pages, branche de production, dossier `out`, commande de build, version Node 22.19+ et variable `NEXT_PUBLIC_SITE_URL` dans les contextes production **et** preview.
2. Domaine réellement choisi et certificat ; redirections entre ancien host, Pages et éventuel domaine personnalisé. Ne jamais mélanger plusieurs origines canoniques. **Ne pas changer les DNS dans cette mission.**
3. Cloudflare Access, WAF, règles personnalisées, rate limiting, Bot Fight/Super Bot Fight, blocage des robots IA et règles de challenge. Vérifier les chemins, méthodes et identités vérifiées sans créer une exemption générale sur simple User-Agent.
4. Robots géré, préfixes injectés, `Content-Signal`, AI Labyrinth et réglages IA disponibles dans le compte : rapprocher la réponse publique réelle de la politique du dépôt. Autoriser la recherche n’implique pas nécessairement autoriser l’entraînement, et inversement.
5. Cache Rules, Transform Rules, Redirect Rules/Bulk Redirects, Workers/routes hérités, Rocket Loader et réécriture de sécurité : aucun ne doit transformer une 404 en 200, cacher des en-têtes `noindex`, partager une redirection de langue privée ou casser les scripts statiques.
6. Réponses publiques aux assets hashés, HTML, sitemap, robots et téléchargements ; en-têtes de cache réellement délivrés, absence de cache partagé sur la négociation de langue, purge éventuelle à planifier lors d’une publication autorisée.
7. Analytics/logs disponibles : authentifier les robots avec les méthodes officielles de chaque fournisseur (IP publiées ou vérification DNS quand documentée), jamais avec le nom UA seul. Ne pas publier les IP individuelles ou identifiants de compte.

Aucune de ces étapes n’a été cochée à partir de l’existence d’un connecteur ou d’un fichier `wrangler.jsonc`. Le local ne reproduit pas le WAF/CDN public.

## 6. Sonde publique de lecture seule et convergence d’origine

```bash
python3 scripts/check_public_access.py --origin "$NEXT_PUBLIC_SITE_URL"
```

Le script s’arrête au premier échec réseau ou statut non-200 ; il ne contourne pas un challenge et ne demande aucune clé. Code 2 : preuve publique incomplète/indisponible, distinct d’un échec des tests locaux. La sortie précise les chemins réellement essayés, pas une liste de requêtes supposées exécutées.

Si un domaine personnalisé est décidé **dans une mission ultérieure autorisée** : reconstruire avec la nouvelle origine, régénérer séparément les deux kits qui contiennent des liens imprimés, relire leurs manifestes et mettre à jour volontairement la baseline de conservation. `check:export` refuse un kit dont `generatedForOrigin` diffère. Le simple changement d’une variable ou l’ajout d’un canonical ne redirige pas les anciens hosts. Le propriétaire devra contrôler les redirections HTTP entre hosts tout en conservant chemins, langues et paramètres, sans boucle. Aucune commande DNS ou de déploiement n’est exécutée ici.

## 7. Google Search Console — accès/propriété nécessaires, non réalisé ici

- Faire vérifier au propriétaire une propriété appropriée, sans partager de token dans le dépôt. Aucune nouvelle vérification DNS n’est autorisée par ce runbook à elle seule.
- Inspecter les 14 URL cibles : statut réellement connu de Google, exploration, canonical déclaré **et choisi par Google**, rendu et éventuels blocages. Conserver le résultat et la date, pas seulement l’action « demander une indexation ».
- Soumettre le sitemap après une publication décidée ; « sitemap lu » ne signifie pas « toutes les URL indexées ».
- Examiner les motifs d’exclusion, 404, doublons, paramètres, couverture et données de performances disponibles, par URL/langue/pays/appareil et période. Ne pas inventer de volume, position, impressions ou clics en l’absence d’export.
- Examiner les rapports Core Web Vitals/CrUX quand ils disposent de données suffisantes ; distinguer groupes d’URL et mesure d’une URL particulière. Ne pas remplacer un rapport vide par le score Lighthouse local.
- Documenter le point de départ puis suivre des périodes comparables ; ne pas attribuer causalement une variation aux changements sans protocole adapté.

Même séparation pour Bing Webmaster Tools si le propriétaire y a accès. Aucun accès à l’un ou l’autre n’est revendiqué.

## 8. Explorations et citations génératives réellement observées

Pour chaque observation future, conserver séparément : fournisseur/produit/version affichée, requête exacte, langue/pays/état de connexion si connus, heure d’observation, URL citée, extrait réellement affiché, capture ou export de réponse et conditions de reproductibilité. Une réponse peut varier et ne prouve pas une présence persistante.

Distinguer **mention de marque**, **lien/citation d’une page**, **recommandation**, **exploration authentifiée** et **simple éligibilité technique**. Une requête contenant déjà l’URL ou le nom de marque ne démontre pas une recommandation spontanée. Ne pas produire de faux témoignage, de boucle de requêtes ou de citations hypothétiques. Cette mission ne collecte aucune de ces preuves.

`llms.txt` et `llms-full.txt` sont des aides de découverte/textes lisibles. Ils ne sont ni une obligation universelle des moteurs, ni un substitut au HTML indexable, ni une garantie de citation. Les FAQ, définitions et JSON-LD n’ajoutent pas de promesse de rich result ou de classement.

## 9. Artefacts et décision

Consulter [le rapport final](TECHNICAL_READINESS_REPORT.md), [l’audit](SEO_AEO_GEO_AUDIT.md) et [la checklist](SEO_RELEASE_CHECKLIST.md). Les artefacts JSON locaux sont ignorés ; la synthèse vérifiable est documentée dans Git. Si des fichiers sources changent après les tests, reconstruire et relancer les contrôles pertinents, puis la suite finale avant remise.
