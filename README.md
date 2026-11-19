# UX/UI Playbook — Next.js bilingue

Site officiel : **https://joyccelight-playbook.vercel.app**

- **FR `/fr`** : manuel de 148 pages A4 + kit de 26 pages / 12 fiches + archive de 21 fichiers → [édition française, 29 USD](https://joyccelight.gumroad.com/l/uiuxplaybookfr).
- **EN `/en`** : manuel de 139 pages A4 + même structure de kit et d’archive → [English edition, $29 USD](https://joyccelight.gumroad.com/l/uxuiplaybook).
- Contact : **joynagassi@gmail.com**.

## Interface et contenu

- Next.js App Router, TypeScript, OLED noir `#000000` par défaut ; mode clair `#FAF8F4` mémorisé. Initialisation du thème avant hydratation.
- Sora pour le titrage, Inter pour le texte/les contrôles et JetBrains Mono pour le code. Six WOFF2 locaux, `font-display: swap`, fallbacks ajustés par `next/font/local`. [Provenance et licences OFL](src/fonts/LICENSES.md).
- Redirection `/` selon le cookie explicite, puis `Accept-Language`, puis le pays Vercel ; les chemins `/fr/...` et `/en/...` restent dédiés. Le sélecteur conserve le guide courant. Les liens d’achat restent liés à leur édition.
- Trois cours de terrain dans chaque langue : UX, UI/tokens, Product Design/agents IA. Sommaire cliquable, boîtes copiables, **exactement deux schémas compacts par guide**, bibliographie primaire liée, définitions d’entités, niveaux de preuve et CTA contextuel.
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

- `scripts/site_check.py` (stdlib Python, exécutable) : HTTP, éditions, canonical/hreflang, titres ≤ 60 caractères / descriptions de 135–155, H1, ancres, images, deux schémas, tableau des dix principes, CTA, références/citations, Person, sources machine, licences et contraste des tokens opaques.
- `tests/ui.spec.ts` : dix routes × deux thèmes à 1280, 390 et 320 px ; axe WCAG A/AA à 1280 et 320 px ; texte utile ≥ 12 px, cibles autonomes ≥ 44 × 44 px, chiffres tabulaires, absence de débordement, contrôles non coupés, fonctionnement clavier, copie et routage des achats. Les liens dans une phrase relèvent de l’exception inline et ne sont pas des boutons de 44 px.
- `.github/workflows/ui-check.yml` : installation propre, compilation, vérifications HTML puis navigateur et conservation des preuves en artefact.
- Les rapports générés `reports/`, `test-results/` et `playwright-report/` sont ignorés par Git. Le JSON Python sépare `status` (`automated` / `to verify` / `not applicable`), `severity` et `outcome`. Le code de sortie devient 1 en cas d’échec bloquant automatisé.
- Un binaire Chromium déjà installé peut être fourni via `CHROMIUM_EXECUTABLE_PATH` ; aucune dépendance serverless n’est nécessaire dans le projet déployé.

## Limites explicites

Un résultat axe sans violation détectée n’est pas une certification d’accessibilité. Restent à vérifier par une personne : lecteur d’écran réel, compréhension FR/EN, confort de lecture et applicabilité juridique au projet du lecteur. Les Core Web Vitals terrain, l’indexation et les citations par des moteurs demandent des données de production ; ils ne découlent pas de tests locaux.

Les trois guides ont été publiés ensemble : leurs dates de première publication ne sont pas artificiellement décalées pour satisfaire un signal SEO. `publishedAt` et `updatedAt` sont des champs distincts ; une date différente nécessite un événement éditorial réel.

Réconciliation éditoriale : **13 prototypes avant/après + 11 planches de plateformes = 24 planches** ; **6 rôles typographiques sur 8 tokens** (`12, 14, 16, 20, 24, 32, 40, 64px`). Les proportions, timeboxes et prix de prestation sont des repères de méthode, pas des résultats garantis. Les obligations juridiques sont accompagnées des sources primaires et de leurs limites, dont la transition de l’AI Act dans le texte consolidé du 27 juillet 2026.
