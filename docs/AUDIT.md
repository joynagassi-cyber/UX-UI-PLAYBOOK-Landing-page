# Audit appliqué et preuves de vérification

## Périmètre conservé

- Site Next.js bilingue : `/fr` (148 pages, boutique française) et `/en` (139 pages, boutique anglaise), offre 29 USD, contact `joynagassi@gmail.com`.
- OLED `#000000` par défaut, mode clair `#FAF8F4`, aperçu de dix pages réelles, trois cours dans chaque langue, deux schémas compacts par cours, sommaires, copie et achats localisés.

## Corrections de fond

| Sujet | Décision implémentée |
| --- | --- |
| Typographie | Sora / Inter / JetBrains Mono en WOFF2 locaux ; OFL et provenance ; fallback ajusté ; pas de promesse de CLS non mesurée. |
| Lisibilité | Texte utile ≥ 12 px, cibles autonomes ≥ 44 × 44 px, chiffres tabulaires, focus et régions défilantes accessibles au clavier. |
| Palette | Accent Light `#c2320a` ; badge succès `#0b5f37`, avertissement `#804800` : les fonds composites sont aussi testés, pas seulement les valeurs isolées. |
| Comptages | 13 prototypes avant/après + 11 planches de plateformes = 24 ; 6 rôles typographiques sur 8 tokens de 12 à 64 px. |
| Vérification | Méthode `automated / to verify / not applicable`, sévérité et résultat séparés. Démonstration explicitement simulée, pas un rapport exécuté. |
| Contenu | Définitions d’entités, tableau HTML des dix principes cognitifs, recommandations contextualisées, promesses de revenu/conversion retirées, biographie sans qualification inventée, CTA contextuel. |
| Sources | Bibliographies HTTPS primaires, badges Établi/Probable et limites ; citations JSON-LD synchronisées ; Person avec les deux identités vérifiées (Gumroad/GitHub). |
| SEO / AEO / GEO | Titres ≤ 60 caractères, descriptions 135–155, canonical/hreflang, pas de meta keywords, sérialisation des nouveaux blocs/sources dans les deux endpoints LLM. Ces éléments ne garantissent ni indexation ni citation. |
| Dogfooding | Script Python public spécifique au site + tests Playwright/axe + workflow Actions. Ce n’est pas le scanner de 77 règles vendu avec le manuel. |

### Clarifications juridiques issues des sources primaires

- **EAA** : articles 2, 3(23), 4(5), 31–32 de la [directive 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng). Distinguer application des mesures nationales et entrée en vigueur ; l’exemption des micro-entreprises vise les services, pas les obligations produits.
- **AI Act** : [texte consolidé au 27 juillet 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), art. 50, 111(4), 113. La transition jusqu’au 2 décembre 2026 pour l’art. 50(2) de certains systèmes existants est distinguée de l’application générale au 2 août 2026. Toutes les sorties d’IA ne relèvent pas d’une même obligation.
- **WCAG 3** : [Working Draft du 10 septembre 2026](https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/), pas une Recommandation remplaçant WCAG 2.2.
- **EN 301 549** : version [ETSI 4.1.1, septembre 2026](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf) ; une publication technique et une citation au JO de l’UE sont deux événements distincts. La présomption applicable à un client reste à vérifier.
- **DTCG 2025.10** : [Final Community Group Report](https://www.designtokens.org/tr/2025.10/format/), pas une Recommandation W3C.

## Résultats exécutés localement

Sur un build de production Next.js, après **installation propre `npm ci`** :

| Commande / juge | Résultat observé |
| --- | --- |
| `npm run typecheck` | Réussi. |
| `npm run build` | Réussi ; les dix pages éditoriales localisées et les endpoints sont générés/compilés. |
| `npm audit --audit-level=moderate` | 0 vulnérabilité signalée sur les 40 paquets audités. |
| `python3 scripts/site_check.py --base-url http://127.0.0.1:3100` | 288 contrôles automatisés, 0 échec bloquant ; 4 points à vérifier ; 1 non applicable. |
| `npx playwright test` avec Chromium 153 | 24/24 tests réussis. Dix routes × deux thèmes à 320, 390 et 1280 px ; axe à 320/1280 px ; parcours clavier, copie, galerie et éditions. Aucune violation axe détectée dans les états testés. |
| `git diff --check` | Réussi. |

Contrastes de tokens calculés par le script : bouton principal **6,749:1 en Dark** et **5,593:1 en Light** ; badges Light sur le vrai fond `--s1: #f2eee6`, teinte composite comprise : succès **5,774:1**, avertissement **5,498:1**. Les tests axe contrôlent en plus le rendu des pages.

Les résultats machine détaillés vont dans `reports/`, `test-results/` et `playwright-report/` (ignorés par Git). Le workflow les conserve comme artefacts identifiés par le SHA du commit.

## Non vérifié / limites

- Parcours réel VoiceOver/NVDA, compréhension par des lecteurs FR/EN et confort de lecture : à valider avec des personnes et un protocole documenté.
- Applicabilité juridique à un client et transposition nationale : à confirmer avec un conseil qualifié.
- Core Web Vitals **terrain**, indexation, classement, citations par des moteurs et effet commercial : nécessitent des données de production ; les tests locaux ne les prouvent pas.
- Dates : les guides ont été diffusés ensemble. Aucun décalage artificiel de première publication n’est ajouté pour un signal SEO ; des dates différentes supposent des événements éditoriaux réels.
- Aucune réussite automatique, y compris axe, ne constitue une certification d’accessibilité ni une promesse de conformité intégrale.
