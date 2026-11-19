# UX/UI Playbook — Next.js statique et Cloudflare Pages

**Origine canonique cible : https://joyccelight-playbook.pages.dev**. Cette valeur est la configuration du build, pas l’annonce d’un déploiement : la migration est préparée et testée localement, sans publication Cloudflare ni modification de Vercel.

- **FR `/fr`** : manuel de 148 pages A4 + kit de 26 pages / 12 fiches + archive de 21 fichiers → [édition française, 29 USD](https://joyccelight.gumroad.com/l/uiuxplaybookfr).
- **EN `/en`** : manuel de 139 pages A4 + même structure de kit et d’archive → [English edition, $29 USD](https://joyccelight.gumroad.com/l/uxuiplaybook).
- Contact : **joynagassi@gmail.com**.

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

Le libellé de navigation et de section est **« Article »**, sans nombre figé. Les 120 explications FR/EN ont chacune leur visuel à proximité : côte à côte au-dessus de 760 px, dessous sur mobile. Deux synthèses supplémentaires par article sont agrandissables au clavier. Les sources figurent sous **Sources et références / Sources and references**, sans badge de classement. Les articles n’utilisent pas de scans du livre ; la galerie de dix pages réelles sur la landing est conservée.

Le comparatif UX/UI/Product comprend le prototype local **Atelier** : offre, créneau et récapitulatif, trois regards qui conservent le même état, sélection, retour, confirmation simulée et reprise après un créneau refusé. L’offre de 39 € / 45 min et les horaires sont fictifs. Aucune donnée personnelle, réservation ou paiement n’est envoyé. Les six références consultées, les limites de la simulation et les essais à préparer sont indiqués dans l’article. [Choix éditoriaux](docs/EDITORIAL.md).

## Architecture et langue

- **Next.js 16 / React 19 / TypeScript**, `output: 'export'`, sortie **`out`**, `images.unoptimized: true`. Aucun serveur Next en production.
- Toutes les pages localisées et tous les slugs du [catalogue partagé](src/i18n/article-catalog.json) sont générés au build avec `generateStaticParams` et `dynamicParams = false`.
- Les trois **Pages Functions** `/`, `/articles` et `/articles/*` emploient `lib/locale-routing.mjs` : cookie `NEXT_LOCALE` > `Accept-Language` pondéré par `q` > `request.cf.country` / `CF-IPCountry` > anglais. Le pays n’est qu’un repli heuristique, pas la langue réelle de la personne.
- Redirections 307, query string conservée, `Cache-Control: private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`. Les URLs `/fr/...` et `/en/...` ne sont pas renégociées ; un slug inconnu finit en 404, sans boucle. `_routes.json` réserve les Functions aux trois motifs non localisés ; les ressources, pages localisées et endpoints SEO sont servis statiquement.
- `_redirects` traite uniquement `/fr.html → /fr` et `/en.html → /en` en 301, sans chevaucher les Functions.
- `src/lib/site-config.ts` centralise l’origine publique. Canonical, hreflang, OG/Twitter, `Person`, JSON-LD/citations, robots, sitemap et endpoints LLM s’appuient sur cette origine. Les interactions client, achats localisés, galerie, copie et sommaires restent disponibles.

Détails du diagnostic, de l’audit d’export et des actions restantes : **[CLOUDFLARE_MIGRATION.md](CLOUDFLARE_MIGRATION.md)**.

## Développer et prévisualiser

Prérequis : **Node.js 22** (`.nvmrc`, engines `>=22.17.0 <23`) et Python 3.12 pour les contrôles HTML. Wrangler **4.165.0** est précisément épinglé en dépendance de développement ; aucun compte Cloudflare n’est nécessaire pour l’aperçu local.

```bash
npm ci
npm run dev
```

Le serveur de développement Next écoute sur `0.0.0.0:3000`. Ouvrir `/fr` ou `/en` ; les redirections Pages ne sont pas exécutées par ce serveur.

Pour tester le fonctionnement cible, construire puis servir **l’export avec ses véritables Functions locales** :

```bash
npm run typecheck
npm run test:routing
npm run build
npm run check:export
npm run preview:pages
```

`preview:pages` lance `wrangler pages dev out --ip 0.0.0.0 --port 3100` avec inspecteur sur port automatique et sans interface interactive. `npm start` est un alias de cet aperçu, pas un serveur Next. L’écoute publique du sandbox permet l’aperçu proxifié ; le code navigateur n’appelle aucun serveur sur `localhost`.

Le wrapper `scripts/preview_pages.cjs` écrit une **fixture géographique locale neutre** dans `.wrangler/`, puis indique ce fichier à Miniflare. Sans cela, son pays fictif US masquerait les en-têtes `CF-IPCountry` des tests. La priorité du vrai `request.cf.country` reste inchangée et est couverte séparément par les tests unitaires. Ce dispositif ne s’exécute jamais en production.

## Vérifications reproductibles

Dans un second terminal, sur le même serveur Pages 3100 :

```bash
python3 scripts/site_check.py \
  --base-url http://127.0.0.1:3100 \
  --expected-origin https://joyccelight-playbook.pages.dev

npx playwright install --with-deps chromium
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:ui
```

Sans `PLAYWRIGHT_BASE_URL`, Playwright lance lui-même `preview:pages` ; le build doit déjà exister. `CHROMIUM_EXECUTABLE_PATH` peut désigner un navigateur installé dans l’environnement. Le projet déployé n’a pas besoin de dépendance Chromium serverless.

- **`test:routing`** : règles de langue, cookies valides/inconnus, valeurs `q`, exclusions `q=0`, priorité du pays Cloudflare, query répétée/encodée, slash et corps HEAD ; les handlers réels sont importés.
- **`check:export`** : toutes les pages du catalogue, titres/descriptions, canonical/hreflang, OG/Twitter et JPEG 1200 × 630, Person/citations, couvertures, liens/ressources/polices locales, sitemap/robots/LLM, fichiers Pages et absence de l’ancienne origine dans tout `out`.
- **Python, stdlib uniquement** : contrôle HTML/SEO/éditions/Gumroad, bibliographies, paragraphes et illustrations, corpus LLM complet, licences et contrastes des tokens ; matrice HTTP de redirections, cache, chemins explicites, slash, 404. `--expected-origin` (alias `--site-url`) ou `NEXT_PUBLIC_SITE_URL` définit l’origine attendue, **distincte** de `--base-url`.
- **Playwright + axe** : douze routes × deux thèmes aux largeurs 1280, 390 et 320 px ; axe à 1280/320, commandes, police effective, nombres, icônes/vecteurs, débordements et erreurs JavaScript. Les parcours couvrent aussi galerie, thèmes sauvegardés, clavier/focus, copie/checklist/FAQ, langue de l’article et achats ; le prototype est essayé dans ses neuf annotations, avec succès simulé et refus/récupération.
- **Workflows Actions** : `cloudflare-static-export.yml` et `ui-check.yml`, Node 22, installation verrouillée, build puis contrôles. Le workflow UI partage le même serveur Pages entre Python et Playwright. Rapports, captures et traces d’échec sont conservés 14 jours en artefact. **Aucun workflow ne publie le site.**

Les preuves détaillées sont décrites dans [docs/AUDIT.md](docs/AUDIT.md). `reports/`, `test-results/`, `playwright-report/`, `out/` et `.wrangler/` sont ignorés par Git. Les statuts `automated / to verify / not applicable`, la sévérité et le résultat restent distincts ; un échec bloquant automatisé produit un code de sortie 1.

### Origine publique du build

```env
NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev
```

Cette variable est résolue **au build** et doit être identique pour les deux langues. Sa valeur est validée comme origine HTTP(S), sans chemin, identifiants, query ni fragment. Ne pas utiliser l’adresse locale de test comme canonical. Le fichier `.env.example` et les deux workflows emploient la même valeur ; aucune détection d’origine Vercel ne subsiste.

### Fichiers éditoriaux et ressources

- `src/i18n/article-catalog.json` : slugs, nombres d’explications et clés des aperçus, partagés avec les outils et tests.
- `src/i18n/articles/{fr,en}.ts`, `comparison-{fr,en}.ts` : données bilingues ; blocs `explanation`, `diagram`, `mobileLab`, références et FAQ.
- `src/components/{ArticleVisual,DesignVector,DesignRolesLab}.tsx` et `src/i18n/design-lab.ts` : illustrations originales, prototype et annotations bilingues. Le transcript complet des neuf annotations et des états est exporté dans `/llms-full.txt`.
- `src/components/NotionArticleReader.tsx` : sommaire, citations numérotées, copie, bibliographie et schémas agrandissables avec gestion du focus.
- `npm run generate:social` : dix JPEG Open Graph de 1200 × 630 à partir des mêmes données, avec Domine et Lucide. Nécessite Chromium, sans service distant. Les dix pages de la galerie et les fichiers/licences locaux sont conservés.

## Limites

Le terminal présenté sur la landing est une **simulation annoncée**, pas une exécution Python dans le navigateur. Ses compteurs `9 + 6 + 62 = 77` décrivent des statuts de vérification, pas 77 réussites automatiques. Le scanner commercial `agent_check.py` appartient à l’archive ; le contrôle public de ce dépôt n’en est pas une réplique.

Une réussite axe ne certifie pas WCAG. Lecteurs d’écran réels, compréhension et confort FR/EN, applicabilité juridique, Core Web Vitals terrain, indexation/citations et effets commerciaux restent à vérifier avec les personnes et données appropriées. Aucune étude utilisateur n’a été effectuée sur Atelier. Les trois articles initiaux conservent leurs dates ; le comparatif possède sa propre publication, sans décalage inventé pour le SEO.
