# Audit appliqué et preuves de vérification

## Périmètre conservé

- Site Next.js bilingue : `/fr` (148 pages, boutique française) et `/en` (139 pages, boutique anglaise), offre 29 USD, contact `joynagassi@gmail.com`.
- Palettes OLED `#000000` et Light `#FAF8F4`, préférence système/choix mémorisé conservés ; aperçu de dix pages réelles, trois articles dans chaque langue, sommaires, copie et achats localisés. La galerie du livre reste distincte des visuels pédagogiques des articles.

## Corrections de fond

| Sujet | Décision implémentée |
| --- | --- |
| Typographie | Domine sur tous les textes HTML, titres, contrôles et blocs copiables FR/EN ; deux WOFF2 variables 400–700, OFL et provenance ; fallback serif ajusté ; pas de promesse de CLS non mesurée. Les images des documents d’origine ne sont pas retouchées. |
| Icônes | Lucide partagé, tracé de 3 px, tailles 20 / 24 / 28 / 40 px ; coches, croix, marqueurs de listes, FAQ, étapes du paiement, pieds de page, cartes et articles unifiés. Les noms `compass` / `palette` / `settings` ne sont jamais affichés à la place des SVG. |
| Lisibilité | Texte utile ≥ 12 px, cibles autonomes ≥ 44 × 44 px, focus et régions défilantes accessibles au clavier. Domine n’ayant pas de `tnum`, les chiffres des données utilisent de vraies cellules de `0.7em` mesurées dans le navigateur, sans substitution de police. |
| Palette | Accent Light `#c2320a` ; badge succès `#0b5f37`, avertissement `#804800` : les fonds composites sont aussi testés, pas seulement les valeurs isolées. |
| Comptages | 13 prototypes avant/après + 11 planches de plateformes = 24 ; 6 rôles typographiques sur 8 tokens de 12 à 64 px. |
| Vérification | Méthode `automated / to verify / not applicable`, sévérité et résultat séparés. Démonstration explicitement simulée, pas un rapport exécuté. |
| Contenu | Paragraphes longs et développés FR/EN, avec cas d’usage, raisonnement, conséquences et vérifications. Titres, listes, FAQ et modèles copiables relus ; seuils non sourcés de longueur d’AGENTS.md et promesses commerciales retirés. Définitions d’entités, tableau HTML des dix principes, sources et CTA conservés. |
| Révision globale | Landing, index, articles, légendes, FAQ, métadonnées et textes de vente repris dans les deux langues. Les superlatifs et oppositions promotionnelles sont remplacés par des informations sur les tâches et les livrables. Méthode et ressources de style consignées dans [EDITORIAL.md](EDITORIAL.md), sans prétention de détection d’IA. |
| Aperçus de partage | Huit JPEG Open Graph 1200 × 630 régénérés avec Domine, Lucide et les titres actuels ; plus de scan ni d’ancienne promesse dans ces aperçus. Générateur reproductible `scripts/social_images.cjs`, alimenté par les données du site. Galerie des dix pages du livre inchangée. |
| Visuels pédagogiques | 92 visuels HTML/CSS auprès des explications : 19 UX + 14 UI + 13 Produit dans chacune des deux langues. Deux synthèses supplémentaires par article, agrandissables. Les anciennes planches du livre ne sont plus affichées dans les articles ni leurs cartes ; la galerie de dix pages de la landing est conservée. |
| Mise en page | Colonne de texte de 65ch maximum, visuel de 232 px adjacent sur grand écran ; empilement à 760 px et moins. Largeur de lecteur ajustée pour éviter un vide entre le texte et le visuel. Marge/padding natifs des listes du sommaire réinitialisés, titres de section libérés de la largeur prévue pour la landing. |
| Terminologie et pied de page | Article dans les deux langues. Copyright et liens utiles seulement en pied de page ; notices commerciales, fiscales et d’autovalidation retirées. |
| Sources | Intitulé simple « Sources et références / Sources and references », sans badge ni classement. Les 11 / 4 / 4 URL de références par langue sont conservées ; citations JSON-LD et corpus LLM synchronisés. Person conserve les deux identités liées (Gumroad/GitHub). |
| SEO / AEO / GEO | Titres ≤ 60 caractères, descriptions 135–155, canonical/hreflang, pas de meta keywords, sérialisation des nouveaux blocs/sources dans les deux endpoints LLM. Ces éléments ne garantissent ni indexation ni citation. |
| Dogfooding | Script Python public spécifique au site + tests Playwright/axe + workflow Actions. Ce n’est pas le scanner de 77 règles vendu avec le manuel. |

### Clarifications juridiques issues des sources primaires

- **EAA** : articles 2, 3(23), 4(5), 31–32 de la [directive 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng). Distinguer application des mesures nationales et entrée en vigueur ; l’exemption des micro-entreprises vise les services, pas les obligations produits.
- **AI Act** : [texte consolidé au 27 juillet 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), art. 50, 111(4), 113. La transition jusqu’au 2 décembre 2026 pour l’art. 50(2) de certains systèmes existants est distinguée de l’application générale au 2 août 2026. Toutes les sorties d’IA ne relèvent pas d’une même obligation.
- **WCAG 3** : [Working Draft du 10 septembre 2026](https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/), pas une Recommandation remplaçant WCAG 2.2.
- **EN 301 549** : version [ETSI 4.1.1, septembre 2026](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf) ; une publication technique et une citation au JO de l’UE sont deux événements distincts. La présomption applicable à un client reste à vérifier.
- **DTCG 2025.10** : [Final Community Group Report](https://www.designtokens.org/tr/2025.10/format/), pas une Recommandation W3C.

## Résultats exécutés localement

Sur le build de production local Next.js **réécriture FR/EN en paragraphes longs + articles illustrés + Domine/Lucide** :

| Commande / juge | Résultat observé |
| --- | --- |
| `npm run typecheck` | Réussi. |
| `npm run build` | Réussi ; les dix pages éditoriales localisées et les endpoints sont générés/compilés. |
| `npm audit --audit-level=moderate` | 0 vulnérabilité signalée sur les 40 paquets audités. |
| `python3 scripts/site_check.py --base-url http://127.0.0.1:3100` | 340 contrôles automatisés, 0 échec bloquant ; 4 points à vérifier ; 1 non applicable. |
| `npx playwright test` avec Chromium 153 | 32/32 tests réussis. Dix routes × deux thèmes à 320, 390 et 1280 px ; axe à 320/1280 px ; parcours clavier, copie, galerie, éditions et préférences de thème. Six scénarios vérifient aussi la présence de paragraphes développés et la disposition texte/visuel à 1280, 1024, 760, 390 et 320 px et le nettoyage éditorial ; les schémas agrandis passent les contrôles de focus, de débordement et axe à 320/1280 px dans les deux thèmes et les deux langues. Les textes visibles (code compris) utilisent Domine chargée en 400/700 ; les icônes SVG mesurent au moins 20 px avec `stroke-width: 3` ; les cellules numériques mesurent `0.7em`. Aucune violation axe détectée dans les états testés. |
| `git diff --check` | Réussi. |
| `node scripts/social_images.cjs` avec Chromium | Huit images générées ; contrôle géométrique des titres, paragraphes, panneaux et pieds des aperçus sans débordement détecté. |

Contrastes de tokens calculés par le script : bouton principal **6,749:1 en Dark** et **5,593:1 en Light** ; badges Light sur le vrai fond `--s1: #f2eee6`, teinte composite comprise : succès **5,774:1**, avertissement **5,498:1**. Les tests axe contrôlent en plus le rendu des pages.

Les résultats machine détaillés vont dans `reports/`, `test-results/` et `playwright-report/` (ignorés par Git). Le workflow est configuré pour les conserver comme artefacts identifiés par le SHA du commit. Cette validation de la réécriture, des articles illustrés et de la version Domine/Lucide est locale ; aucune exécution GitHub ni mise en production de cette nouvelle branche n’est revendiquée ici.

Inspection visuelle locale complémentaire de cette passe : landing FR OLED à 1440 px et EN Light à 390 px ; articles UX FR OLED à 1440 px, UI FR Light et Produit EN OLED à 1280 px ; explications UI EN Light à 390 px et Produit FR OLED à 320 px ; index FR OLED à 1440 px. Deux aperçus Open Graph (offre FR et article Produit EN) ont également été inspectés visuellement. Les captures `reports/editorial-*.png` et le relevé géométrique associé sont ignorés par Git. Les synthèses et les bibliographies contrôlées lors de la passe précédente sont conservées ; leurs interactions ont été rejouées par la suite navigateur.

Comparaison avec la version précédant la demande de paragraphes longs. Comptages sur les seules explications en prose, hors code, tableaux, listes et légendes :

| Article | Paragraphes FR / EN | Mots FR, avant → après | Mots EN, avant → après | Mots par paragraphe FR / EN |
| --- | --- | --- | --- | --- |
| UX | 19 / 19 | 1 722 → 3 322 | 1 470 → 3 151 | 137–238 / 139–220 |
| UI | 14 / 14 | 1 446 → 2 463 | 1 177 → 2 271 | 148–250 / 140–226 |
| Produit | 13 / 13 | 1 316 → 2 330 | 1 082 → 2 142 | 136–247 / 136–226 |

La prose comporte désormais 92 paragraphes d’explication, de 136 à 250 mots. `CONTENT07` exige une explication développée pour chaque visuel et ne fixe plus de plafond à 130 mots ; la longueur ne prouve pas la compréhension. `COPY03` et Playwright empêchent le retour d’une sélection de slogans retirés, sans prétendre épuiser les questions de style. Les contrôles distinguent toujours les deux synthèses des petits visuels. Le corpus `/llms-full.txt` est comparé aux paragraphes réellement rendus, pas seulement aux liens des sources. Les durées affichées sont recalculées comme estimations de lecture sur une base de 200 mots par minute, code et modèles compris.

Les deux WOFF2 ont été inspectés avec FontTools : famille Domine, axe `wght` 400–700, glyphes français (`ÉèêàâùûîôçœŒïëÿ`) et devises présents dans le sous-ensemble latin. L’absence de `tnum` a été vérifiée dans les tables OpenType, d’où les cellules numériques explicites. L’intégrité SHA-512 du paquet Fontsource a été comparée à celle fournie par le registre npm ; les empreintes sont consignées dans `src/fonts/LICENSES.md`.

## Non vérifié / limites

- Parcours réel VoiceOver/NVDA, compréhension par des lecteurs FR/EN et confort de lecture : à valider avec des personnes et un protocole documenté.
- Applicabilité juridique à un client et transposition nationale : à confirmer avec un conseil qualifié.
- Core Web Vitals **terrain**, indexation, classement, citations par des moteurs et effet commercial : nécessitent des données de production ; les tests locaux ne les prouvent pas.
- Dates : les articles ont été diffusés ensemble. Aucun décalage artificiel de première publication n’est ajouté pour un signal SEO ; des dates différentes supposent des événements éditoriaux réels.
- Aucune réussite automatique, y compris axe, ne constitue une certification d’accessibilité ni une promesse de conformité intégrale.
