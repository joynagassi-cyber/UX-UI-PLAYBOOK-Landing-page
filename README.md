# UX/UI Playbook — Next.js bilingue

Site officiel : **https://joyccelight-playbook.vercel.app**

- **FR `/fr`** : manuel de 148 pages A4 + kit de 26 pages / 12 fiches + archive de 21 fichiers → [édition française, 29 USD](https://joyccelight.gumroad.com/l/uiuxplaybookfr).
- **EN `/en`** : manuel de 139 pages A4 + même structure de kit et d’archive → [English edition, $29 USD](https://joyccelight.gumroad.com/l/uxuiplaybook).
- Contact : **joynagassi@gmail.com**.

## Interface et contenu

- Next.js App Router, TypeScript, palette OLED noire `#000000` et mode clair `#FAF8F4`. Choix mémorisé, sinon préférence système ; initialisation du thème avant hydratation, sans changer le comportement existant.
- **Domine sur l’ensemble du site et des articles FR/EN**, y compris les contrôles, tableaux et blocs copiables. Deux WOFF2 variables locaux (400–700), `font-display: swap`, fallback serif ajusté par `next/font/local`. [Provenance et licence OFL](src/fonts/LICENSES.md).
- **Lucide uniquement pour les pictogrammes d’interface** : composant partagé `Icon`, tracé de 3 px, tailles 20 / 24 / 28 / 40 px selon le contexte, sans emoji ni noms d’icônes affichés comme texte. Les icônes décoratives sont masquées aux lecteurs d’écran ; les commandes gardent leur libellé et leur cible ≥ 44 px.
- Les chiffres des métriques, prix, dates et tableaux conservent un espacement fixe avec `TabularText` : Domine n’a pas de fonctionnalité OpenType `tnum`. Les extraits du livre dans la galerie de la landing conservent leurs images d’origine ; les articles utilisent désormais des schémas natifs HTML/CSS.
- Redirection `/` selon le cookie explicite, puis `Accept-Language`, puis le pays Vercel ; les chemins `/fr/...` et `/en/...` restent dédiés. Le sélecteur conserve l’article courant. Les liens d’achat restent liés à leur édition.
- Trois **articles** dans chaque langue : UX, UI/tokens, Product Design/agents IA. Paragraphes longs et développés (136 à 250 mots dans les explications actuelles), cas d’usage détaillés et **92 petits visuels explicatifs** sur les six articles (19 / 14 / 13 par langue), à côté du texte au-dessus de 760 px, dessous sur mobile. Deux schémas de synthèse compacts par article, agrandissables au clavier, complètent ces visuels. Les anciennes captures du livre sont retirées des articles et de leurs cartes de présentation.
- Références présentées simplement sous **Sources et références / Sources and references**, sans classification ni badge. Intitulés et navigation parlent d’articles. Pieds de page limités au copyright et aux liens utiles.
- Métadonnées localisées, canonical/hreflang, JSON-LD `Person`/`TechArticle`/citations, sitemap, `/llms.txt` et `/llms-full.txt`. Pas de `meta[name=keywords]` ; les tags thématiques restent des données d’article.
- Galerie de dix pages réelles, dialogue avec Échap/confinement/restauration du focus, filtres à boutons et onglets du sommaire utilisables au clavier.

### Une démonstration n’est pas une mesure

Le terminal du site est une **simulation annoncée**, pas une exécution Python dans le navigateur. Les compteurs illustratifs `9 automatisés + 6 à vérifier + 62 non applicables = 77` décrivent une méthode de vérification, pas 77 réussites automatiques. Sévérité (`bloquant`, `majeur`) et résultat (`réussi`, `échec`) restent séparés. Les défauts chiffrés de l’exemple concernent les fichiers témoins ; le schéma affiché reste lisible.

Le scanner du produit `agent_check.py` appartient à l’archive commerciale. Le script public ci-dessous est un **contrôle spécifique à ce dépôt**, sans prétendre reproduire les 77 règles ni certifier WCAG.

## Développement

Node.js 22 et Python 3.12 recommandés.

```bash
npm ci
npm run dev
```

Le serveur écoute sur `0.0.0.0:3000` pour fonctionner aussi dans un aperçu proxifié. Ouvrir `/fr` ou `/en`.

## Vérifications reproductibles

```bash
npm run typecheck
npm run build
npx playwright install --with-deps chromium
npm run test:ui
```

Playwright démarre le build de production sur le port 3100, sauf si `PLAYWRIGHT_BASE_URL` désigne un serveur déjà démarré. Pour le contrôle HTML, démarrer le site dans un autre terminal :

```bash
npm run start
python3 scripts/site_check.py --base-url http://127.0.0.1:3000
```

- `scripts/site_check.py` (stdlib Python, exécutable) : HTTP, éditions, canonical/hreflang, titres ≤ 60 caractères / descriptions de 135–155, H1, ancres, images restantes, deux schémas de synthèse, appariement de chaque explication à son visuel, présence de paragraphes développés sans plafond de longueur, non-régression des slogans retirés, retrait des anciennes mentions, tableau des dix principes, CTA, références/citations, Person, export de tous les paragraphes dans le corpus machine, licences et contraste des tokens opaques.
- `tests/ui.spec.ts` : dix routes × deux thèmes à 1280, 390 et 320 px ; axe WCAG A/AA à 1280 et 320 px ; texte utile ≥ 12 px, cibles autonomes ≥ 44 × 44 px, chargement Domine et famille effective sur chaque texte visible (code compris), vrais SVG Lucide ≥ 20 px / tracé 3 px, absence d’emojis d’interface, cellules numériques de largeur égale, absence de débordement, contrôles non coupés, fonctionnement clavier, copie et routage des achats. Six scénarios supplémentaires contrôlent aussi les paragraphes développés et l’appariement texte/visuel à 1280, 1024, 760, 390 et 320 px ; les schémas agrandis sont aussi contrôlés au clavier et avec axe dans les deux thèmes, sur mobile et bureau. Les liens dans une phrase relèvent de l’exception inline et ne sont pas des boutons de 44 px.
- `.github/workflows/ui-check.yml` : installation propre, compilation, vérifications HTML puis navigateur et conservation des preuves en artefact.
- Les rapports générés `reports/`, `test-results/` et `playwright-report/` sont ignorés par Git. Le JSON Python sépare `status` (`automated` / `to verify` / `not applicable`), `severity` et `outcome`. Le code de sortie devient 1 en cas d’échec bloquant automatisé.
- Un binaire Chromium déjà installé peut être fourni via `CHROMIUM_EXECUTABLE_PATH` ; aucune dépendance serverless n’est nécessaire dans le projet déployé.

Dernière exécution locale sur le build courant : **340 contrôles automatisés, aucun échec bloquant ; 32/32 tests navigateur réussis**. Détail et limites dans [docs/AUDIT.md](docs/AUDIT.md). Ces résultats ne sont pas un déploiement en production.

### Composants éditoriaux

- `src/i18n/articles/{fr,en}.ts` : contenu, paragraphes, légendes et libellés bilingues. Les blocs `explanation` associent le texte à un petit visuel ; `diagram` désigne les deux synthèses agrandissables.
- `src/i18n/articles/visual-types.ts` et `src/components/ArticleVisual.tsx` : vocabulaire visuel partagé, composé de texte sélectionnable, Lucide et CSS ; pas de texte incrusté dans des images.
- `src/components/ArticleCardVisual.tsx` : aperçus décoratifs des articles, dans le même système visuel.
- `src/components/NotionArticleReader.tsx` : sommaire, rendu des explications, copie, bibliographie et dialogue de schéma.
- [docs/EDITORIAL.md](docs/EDITORIAL.md) : périmètre de relecture, ressources stylistiques consultées et limites des tests de non-régression. La révision couvre aussi la landing, les FAQ, les légendes et les gabarits FR/EN ; elle ne prétend pas détecter l’origine d’un texte. Les temps de lecture affichés sont des estimations.
- `scripts/social_images.cjs` : régénère les huit JPEG Open Graph de 1200 × 630 à partir des données éditoriales, avec Domine et Lucide. Après installation de Chromium pour Playwright : `node scripts/social_images.cjs`. Ces aperçus ne sont plus des scans du livre ; les dix images de la galerie du livre restent inchangées.

## Limites explicites

Un résultat axe sans violation détectée n’est pas une certification d’accessibilité. Restent à vérifier par une personne : lecteur d’écran réel, compréhension FR/EN, confort de lecture et applicabilité juridique au projet du lecteur. Les Core Web Vitals terrain, l’indexation et les citations par des moteurs demandent des données de production ; ils ne découlent pas de tests locaux.

Les trois articles de chaque langue ont été publiés ensemble : leurs dates de première publication ne sont pas artificiellement décalées pour satisfaire un signal SEO. `publishedAt` et `updatedAt` sont des champs distincts ; une date différente nécessite un événement éditorial réel.

Réconciliation éditoriale : **13 prototypes avant/après + 11 planches de plateformes = 24 planches** ; **6 rôles typographiques sur 8 tokens** (`12, 14, 16, 20, 24, 32, 40, 64px`). Les proportions, timeboxes et prix de prestation sont des repères de méthode, pas des résultats garantis. Les obligations juridiques sont accompagnées des sources primaires et de leurs limites, dont la transition de l’AI Act dans le texte consolidé du 27 juillet 2026.


## Canonical domain

Set `NEXT_PUBLIC_SITE_URL` to the one public origin used for canonical URLs, Open Graph assets, robots.txt, the sitemap and LLM text endpoints. Include the scheme and omit the trailing slash. The Vercel URL remains the fallback until a production domain is configured.

```env
NEXT_PUBLIC_SITE_URL=https://your-canonical-domain.example
```

Configure alternate hostnames at the hosting layer to redirect to this canonical origin. Do not set different canonical origins for the French and English editions.
