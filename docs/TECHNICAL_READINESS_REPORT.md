# Rapport de remise — réserves TBT et intégration sûre

## 1. Décision et périmètre

**Les quatre réserves TBT ne sont pas déclarées corrigées.** Le profilage et les essais ont été réalisés, mais **aucune optimisation runtime de cette mission n’est retenue** : les variantes régressives ou fragiles ont été archivées puis annulées, sans retirer les acquis antérieurs. Un passage de budget isolé ne démontre pas un gain causal. L’état de livraison conserve les sources applicatives, les dépendances et la commande de build de l’entrée de mission.

- Série ciblée finale : **2/4 PASS, 2/4 REVIEW**, trois passages par route, code **1**. **Campagne complète non relancée : la condition de conformité des quatre routes ciblées n’est pas remplie.** Le précédent fichier `reports/performance-check.json` est historique ; il ne valide pas la révision finale.
- Contrôles locaux de la dernière révision : lint, TypeScript, build, **140 unitaires**, **262 contrôles d’export**, **108 fichiers protégés**, HTTP et SEO réellement réexécutés. Dernière suite navigateur : **82/82**, après un premier passage **81/82** et un diagnostic ; le timeout non reproduit reste signalé, pas effacé.
- Seul delta retenu dans cette mission : un outil de diagnostic sans modification de l’application, les assertions HTML sans JavaScript renforcées, ce rapport et la checklist associée. **Pas de score « corrigé » revendiqué.**
- Dépôt `joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page`, branche inchangée `arena/cf1c4a81-ux-ui-playbook-landing-page`, base et HEAD `0fb7adccbe5595ca4598c71a2e9faf1760db2873`.
- Origine de configuration : **https://joyccelight-playbook.pages.dev**, pas une preuve de déploiement ni un domaine personnalisé confirmé.
- Serveur testé : **Wrangler Pages local, export `out/`, véritables Functions locales, `0.0.0.0:3100`**. Pas de `next start` ni de publication.
- Aucun commit, push, PR, merge, changement de branche, déploiement, DNS ou accès Vercel. Aucun appel Microlink, acquisition/transformation/approbation de capture, publication Gumroad ou régénération de kit.

**Date de référence : 18 novembre 2026, UTC.** L’horloge du sandbox écrit des horodatages du 20 novembre dans les journaux et JSON. Ils restent bruts avec cet écart signalé, pas présentés comme dates publiques de consultation/publication ni utilisés pour le sitemap. L’ordre d’exécution et les empreintes permettent de rapprocher les preuves.

## 2. Entrée de mission et préservation

L’[inventaire historique](TECHNICAL_INVENTORY.md) recense **185 fichiers suivis à la base**. Contrairement à l’entrée de la passe technique précédente, **cette mission a commencé avec 28 fichiers suivis modifiés et 19 nouveaux fichiers non suivis, soit 47 chemins déjà en attente, index vide**. Tous ont été inspectés et sauvegardés avant la première modification applicative, avec leurs SHA-256, le diff initial, l’export et les résultats précédents dans `reports/performance-finalization/baseline/`.

La vérification de la relation avec `cloudflare-migration-v2` a été faite en lecture seule avant édition : pointe distante alors observée `d6d49a69e04084c0c2f23b3a97b6c1b44a6634da`, comparaison avec HEAD **diverged, 39 commits côté HEAD / 25 côté migration**, ancêtre commun `a707970e48c5aaa5ed3dd8374400cb13e1fd1f70`. Cette observation n’autorise ni transfert du travail, ni reset, ni cherry-pick, ni fusion ; elle ne préjuge pas d’une évolution distante ultérieure.

La nouvelle exécution de `npm run check:preservation` confirme :

- **108/108 SHA-256 protégés inchangés**, incluant l’éditorial FR/EN, les quatre guides de chaque langue, le brouillon interne non publié, produits, kits, images et captures gelés ;
- **14 URL canoniques et inventaire des pages inchangés**, sans guide/slug supplémentaire ;
- préfixe original du rapport concurrentiel conservé : **74 707 octets**, SHA-256 `d0e27a3048390103aeb6fa4f5b599c104f969b0befdd0d6b5d2f6e592e579d44` ; l’annexe technique préexistante de 1 537 octets n’est pas retouchée ;
- les **47 fichiers initialement en attente existent toujours**. À la remise, 44 sont octet pour octet identiques à l’entrée ; seuls ce rapport, la checklist de décision et `tests/technical.spec.ts` ont été actualisés parmi eux. Le seul chemin supplémentaire retenu est `scripts/profile_performance.cjs` ;
- après le dernier build, **14/14 textes HTML et leur ordre identiques à l’export d’entrée**, aucun slot de streaming caché, mêmes URL de scripts et **mêmes octets JavaScript** ; les 14 réponses HTTP locales correspondent exactement aux nouveaux fichiers `out/` (`final-static-comparison.json`). Ce contrôle complète, sans remplacer, la préservation SHA et les tests navigateur.

### URL conservées

Pour chaque langue `fr` et `en` :

```text
/{locale}
/{locale}/articles
/{locale}/articles/ux-design-guide
/{locale}/articles/ui-design-system-tokens
/{locale}/articles/product-design-ai-agents
/{locale}/articles/ux-ui-product-design
/{locale}/resources/ui-ux-directory
```

`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` sont les endpoints machine existants. `/`, `/articles` et `/articles/*` restent des points de négociation linguistique ; la 404 n’est pas une nouvelle page éditoriale indexable. Le brouillon d’utilisabilité demeure hors export et aucun test utilisateur réel n’est revendiqué.

### Hors mission conservé

Les 51 fiches, six familles, 75 destinations, six téléchargements et leurs fichiers de fabrication ne sont pas retouchés. Les **21 PNG externes en attente**, `pendingExternalImport`/`EIMPORTPENDING`, `products/` et `tools/microlink/` sont préservés. L’outil isolé Node 24+ n’est pas exécuté ; le site reste sous Node 22. Aucune clé n’est utilisée, répétée ou stockée ; rotation de la clé antérieurement exposée non confirmée. Les liens tiers et le checkout Gumroad ne sont pas déclarés validés.

## 3. Acquis antérieurs préservés et delta retenu

Les corrections de la table suivante **préexistaient à cette mission TBT**. Elles font partie du travail en attente conservé, pas de nouvelles optimisations revendiquées ici.

| Domaine | Modification apportée / acquis vérifié | Fichiers principaux |
| --- | --- | --- |
| Origine | Une origine HTTPS publique délibérée, sans découverte depuis un provider ou une requête ; rejet d’une valeur vide explicite, de credentials, chemin/query/hash, port personnalisé et hosts locaux/preview connus. Erreur sans écho de valeur potentiellement sensible. | `src/config/site-policy.json`, `src/lib/site-config.ts`, `.env.example`, tests SEO |
| Dates / sitemap | Suppression des `lastmod` non justifiés et des fréquences/priorités spéculatives. 14 URL propres, alternates FR/EN/x-default réciproques. Les dates éditoriales restent gelées ; l’heure artificielle 08:00 n’est plus ajoutée aux métadonnées des guides. | `src/app/sitemap.ts`, page article, politique du site |
| Robots | Déclarations des dix agents demandés et des deux contrôles étendus ; rôles recherche/entraînement/récupération distingués. Politique permissive existante conservée. Retrait de `Host` et de l’ancien nom `Claude-Web`. | `src/config/crawler-policy.json`, `src/app/robots.ts` |
| Métadonnées / JSON-LD | Alternatives Twitter ajoutées aux quatre gabarits ; canonical/hreflang/OG cohérents. Retrait d’`inLanguage` sur `Product`, rattachement des articles originaux au site et non au livre. Échappement JSON-LD existant préservé et retesté ; FAQ désormais rapprochées de vrais `details` HTML hors scripts/RSC. | Quatre gabarits sous `src/app/[locale]/`, `scripts/seo_check.py`, `tests/seo.test.cjs` |
| 404 / export | Document d’erreur global bilingue, `noindex`, sans canonical/hreflang trompeur, récupération FR/EN ; statut HTTP réel 404 sur les chemins inconnus. Polices locales partagées avec ce document. | `src/app/global-not-found.tsx`, `src/lib/fonts.ts`, layout, `next.config.mjs`, CSS |
| Routage / en-têtes | Exclusions linguistiques et cas des deux langues exclues documentés/testés. Sécurité émise par les Functions elles-mêmes ; MIME/langues/sécurité des réponses statiques précisés. Le cache immutable reste limité aux assets Next hashés. | `lib/locale-routing.mjs`, `public/_headers`, tests de routage/HTTP |
| React / paramètres | Suppression de cascades de rendu dans des effets ; snapshots navigateur déterministes et tolérance au refus de stockage. Attribution Gumroad restreinte à l’allowlist existante ; préférence de langue host-only/SameSite, Secure sous HTTPS. | `src/lib/browser-stores.ts`, `GumroadButton.tsx`, `ThemeAndLangControls.tsx`, `DesignRolesLab.tsx` |
| Payload des guides | Les cartes liées transmettaient inutilement les trois autres guides complets au client. Projection sur les **six propriétés visibles** : slug/icon/category/readTime/title/subtitle ; import éditorial client plus ciblé. Aucun paragraphe des guides n’est supprimé. | `src/lib/article-summary.ts`, page article, `NotionArticleReader.tsx`, test de projection |
| Clavier / dialogues | `main` focalisables pour les skip links, marges de défilement ciblées sous la navigation fixe ; pas de double offset global sur les sections. Arrière-plan des modales réellement `inert`, restauration de l’état précédent et du focus à la fermeture. Couleurs système en forced-colors ; transitions/animations vraiment supprimées quand le mouvement est réduit, sans dépendance à un événement de fin. | Quatre gabarits, CSS, `useModalFocus.ts`, tests UI/techniques |
| Qualité / reproductibilité | ESLint 10 et plugins directs aux peers compatibles, sans forcer d’override ; Node minimum 22.19 dans la branche 22 pour Lighthouse. Scripts de conservation, SEO HTTP, sonde publique et performance ajoutés ; CI enrichie sans commande de publication. | `eslint.config.mjs`, manifests npm, nouveaux scripts/tests, deux workflows |

L’inventaire de **toutes les utilisations** de `NEXT_PUBLIC_SITE_URL`, y compris les consommateurs indirects et les générateurs de kits non exécutés, figure dans [l’audit SEO](SEO_AEO_GEO_AUDIT.md). Les références résiduelles à l’ancien provider dans les tests sont des assertions négatives, pas des paramètres actifs. Les anciens rapports de migration restent historiques.

### Choix de routage explicités

- Cookie valide > langue pondérée > pays > repli. Le pays n’est pas une langue personnelle.
- Anglais explicitement exclu et français disponible : FR ; les deux langues explicitement exclues : repli navigable EN documenté, sans inventer une nouvelle page 406.
- 307 de négociation : même origine, query répétée/encodée conservée, `private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`.
- URL déjà localisées non renégociées ; normalisation `.html`/slash final sans boucle ni perte des paramètres.
- Canonical, hreflang et liens de langue restent **propres** : le sélecteur de langue ne recopie volontairement ni query ni fragment. Il n’est pas revendiqué de conservation des paramètres par ce sélecteur.
- Les six fichiers bruts téléchargés gardent leur `noindex` intentionnel ; leurs pages de présentation restent indexables.

### Modifications effectivement retenues dans la présente passe

1. **`scripts/profile_performance.cjs`** : diagnostic local en lecture seule, traces/CPU/coverage compressés, longues tâches, scripts, styles/layout et thème standard/réduit ; refuse d’écraser un tag existant. Il n’est ni chargé par le site ni exécuté par son build.
2. **`tests/technical.spec.ts`** : sans JavaScript, H1 visible, absence de slots React cachés, **chaque section d’article** visible et d’opacité 1, sources visibles ; démo, galerie et sommaire de landing visibles. Pas d’assouplissement des assertions ou des seuils.
3. **Ce rapport et `docs/SEO_RELEASE_CHECKLIST.md`** : résultats finaux, essais refusés, limites, reproductibilité et inventaire Git exact ; la checklist ne reprend plus les 47 chemins ou 42 mesures historiques comme état final de cette passe.

`NotionArticleReader.tsx`, `DesignRolesLab.tsx`, `Icon.tsx`, CSS, trois composants de landing, page d’article, `package.json` et lockfile ont retrouvé leurs octets d’entrée après les essais. Aucun post-traitement HTML, nouveau format d’icônes, Suspense expérimental ou dépendance `parse5` ne subsiste dans les sources actives.

## 4. Validation finale de la dernière révision

Environnement inchangé : Node **22.22.3**, npm **10.9.8**, Python **3.11.2**, Next **16.4.6**, React **19.3.1**, Playwright **1.65.1**, ESLint **10.15.0**, Wrangler **4.165.0**, Lighthouse **13.6.0**, Chromium portable **138.0.7204.0**. Ce navigateur de laboratoire n’est pas le dernier Chrome et ne remplace pas une validation multi-navigateurs/appareils à jour.

```bash
export NEXT_PUBLIC_SITE_URL=https://joyccelight-playbook.pages.dev
export NEXT_TELEMETRY_DISABLED=1
export WRANGLER_SEND_METRICS=false
export CHROMIUM_EXECUTABLE_PATH=/tmp/chromium
export LD_LIBRARY_PATH="$PWD/.cache/browser/runtime/lib"
export PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100
```

Les commandes de `reports/final-commands.json` et leurs journaux `reports/final/` ont été exécutés **après le dernier retour aux sources sûres**, pas recyclés des variantes rejetées. Empreinte commune runtime/tests/config/outils recensés, **pas un commit** :

```text
5f75548fa20213611c76a68d5342332e4ac62963a09b2d1154c0c4838a9c9369
```

Les seuls changements ultérieurs sont rédactionnels et les inventaires/contrôleurs locaux ignorés. La CI a été préparée antérieurement mais n’a pas été exécutée sur GitHub dans cette mission.

| Commande | Résultat de la dernière révision | Code |
| --- | --- | ---: |
| `npm ci --no-audit --no-fund` | Installation verrouillée réussie ; aucune nouvelle dépendance retenue par cette mission. | 0 |
| `npm run lint` | Zéro erreur ou avertissement. | 0 |
| `npm run typecheck` | TypeScript sans émission réussi. | 0 |
| `npm test` | **140/140**, zéro échec/skip. Les 39 et 7 tests expérimentaux archivés ne sont pas ajoutés à ce total. | 0 |
| `python3 -m py_compile scripts/site_check.py scripts/seo_check.py scripts/check_public_access.py` | Trois scripts compilés. | 0 |
| `npm run build` | Export Next complet, 21 pages générées selon le journal, sans finaliseur React ajouté. | 0 |
| `npm run check:export` | **262/262**, origine et fichiers exportés contrôlés. | 0 |
| `npm run check:preservation` | **108/108**, préfixe stratégique et inventaire des pages conservés. | 0 |
| `npm audit --omit=dev --json` | Aucune vulnérabilité de production signalée par le registre ; pas un audit de tout le code ni des dépendances de développement. | 0 |
| `npm ls eslint --all` | Peers ESLint compatibles. | 0 |
| `python3 scripts/site_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev` | **778 contrôles automatisés**, zéro échec bloquant ; **4 à vérifier et 1 non applicable** restent ouverts/distincts. | 0 |
| `python3 scripts/seo_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev` | **462/462**, 248 requêtes locales dont 180 GET avec dix UA simulés. | 0 |
| `npm run test:ui`, passage 1 | **81/82**, timeout de 90 s sur l’attente polices/défilement de Product FR, thème sombre. Trace et rapport archivés. | **1** |
| `npm run test:ui`, passage 2 après diagnostic | **82/82**, 0 échec, 0 skip ; retries automatiques à zéro. Relance manuelle explicitement conservée. Durée ≈231,9 s. | 0 |
| Campagne ciblée `--runs 3` sur les quatre routes | **12/12 mesures**, 2/4 PASS, 2/4 REVIEW ; tous les runs sont publiés en section 5. | **1** |
| Sonde publique | **Non relancée** : la sonde historique avait échoué sur `/robots.txt` sans réponse HTTP (URLError, code 2). Aucun état public nouveau déduit du build local. | Historique 2 |
| `git diff --check` et contrôle de remise | Sources puis remise vérifiées ; voir inventaire et réserves en section 8. | 0 |

### Portée et limites des tests

- **14 pages HTML avant JavaScript**, canonical/hreflang/OG/Twitter, JSON-LD/FAQ visibles hors scripts/RSC, sitemap, robots/LLM, découverte/liens/ancres, variantes paramétrées, GET/HEAD, MIME/en-têtes/cache déclaré, téléchargements intègres, 404 et redirections locales. Assertions Schema.org ciblées, **pas un Google Rich Results Test** ni un audit exhaustif.
- **82 scénarios navigateur** : 4 éditoriaux, 25 techniques, 53 UI. Les parcours couvrent 14 routes, deux thèmes, 1280/390/320 px, clavier/skip/focus, TOC/copie/FAQ, modales inert/Tab/Escape/restauration, prototype fictif/refus/récupération, changement de langue, répertoire et téléchargements sans JS, couleurs forcées et mouvement réduit. Aucun achat tiers réel.
- Les **64 analyses axe conservées** ont zéro violation, mais **62 analyses comportent au moins un contraste incomplet**, à revoir humainement. Ce n’est ni 62 échecs démontrés ni une certification WCAG. Lecteurs d’écran réels, zoom/agrandissement, contrastes de fonds complexes et appareils/navigateurs récents restent à vérifier.
- Les deux régressions de mouvement réduit observent zéro transition/animation pendant deux bascules, sans casser les interactions. L’acquis CSS antérieur est conservé ; ce n’est pas une nouvelle correction TBT.
- Les quatre lignes « à vérifier » HTTP portent sur les technologies d’assistance réelles, la compréhension FR/EN, le juridique et les données terrain/indexation/citations ; le non-applicable concerne des contrôles natifs mobile/desktop.

### Timeout navigateur final : conservé, cause non démontrée

Le premier passage final a expiré dans `revealAndLoad`, avant axe, sur Product FR sombre. La trace montre les onze requêtes locales répondant 200, y compris CSS, polices et scripts ; elle ne permet pas de départager une attente de `document.fonts.ready`, un `requestAnimationFrame` bloqué ou une autre cause de suspension. **Aucun défaut applicatif précis n’a été prouvé ni corrigé arbitrairement.**

Le diagnostic isolé avec les mêmes paramètres termine : polices chargées, page visible, **33 étapes de défilement en ≈547 ms**, aucune section non révélée. Une seule nouvelle suite complète est ensuite exécutée, sans augmenter les 90 s ni ajouter de retry automatique. Le premier **81/82**, sa trace, le rapport et le diagnostic restent dans `reports/performance-finalization/browser-timeout/`. Même si le dernier passage passe, **la stabilité parfaite de ce scénario ne peut pas être garantie** ; ce point reste à surveiller.

## 5. TBT — diagnostic, essais et mesures finales de laboratoire

**Campagne complète non relancée : la condition de conformité des quatre routes ciblées n’est pas remplie.** Le précédent fichier `reports/performance-check.json` est historique ; il ne valide pas la révision finale.

**Lecture correcte :** la baseline fraîche, prise avant toute correction, passait déjà les quatre médianes, contrairement à la précédente campagne complète. Les sources applicatives et le JS final sont identiques à cette baseline. Les variations finales ne sont donc **pas présentées comme l’effet d’une optimisation**. Aucun meilleur run n’est sélectionné, aucune réserve n’est fermée sur la seule base d’un passage favorable.

### Protocole strictement inchangé

Lighthouse **13.6.0**, Chromium **138.0.7204.0**, mobile **390×844**, throttling **simulate**, RTT **150 ms**, débit **1 638,4 kbit/s**, CPU **×4**, trois runs séquentiels par route. Pas de build, axe ou autre campagne de profilage concurrente pendant les mesures. Budgets : **LCP ≤2 500 ms, CLS ≤0,1, TBT ≤200 ms**, pire candidat d’interaction scriptée **≤200 ms**. Les valeurs brutes déterminent le statut, pas les arrondis.

Le scénario Event Timing est exécuté séparément, CPU ×4, réseau **HTTP local sans shaping**, mouvement réduit, deux bascules Space du thème puis un vrai contrôle de contenu. Les cibles, délais d’entrée/traitement/présentation et `interactionId` sont conservés. Un candidat nul ne signifie pas un zéro mesuré. **TBT ≠ INP ; ce scénario bref ≠ INP terrain.** Aucun CrUX/RUM/Search Console ou Core Web Vitals réel n’est mesuré. Le mode standard n’est pas couvert par ce budget d’interaction réduit.

### Baseline historique des quatre réserves

La campagne complète antérieure était à **10/14 PASS, code 1**. Elle est gelée sous `baseline/performance-check.json` et ses 42 rapports bruts, pas réécrite par les nouvelles séries.

| Série / route | TBT runs 1 / 2 / 3 (ms) | Médiane TBT | Min–max TBT | LCP runs 1 / 2 / 3 (ms) | Médiane LCP | CLS runs 1 / 2 / 3 | Candidat max. (ms) | Budget |
| --- | --- | ---: | --- | --- | ---: | --- | ---: | --- |
| Historique · `/fr` | 86,50 / 337,50 / 204,50 | 204,50 | 86,50–337,50 | 967,81 / 984,22 / 964,44 | 967,81 | 0,000 / 0,000 / 0,000 | 96 | REVIEW |
| Historique · `/fr/articles/ux-design-guide` | 243,00 / 203,00 / 213,00 | 213,00 | 203,00–243,00 | 1170,46 / 1158,85 / 1179,40 | 1170,46 | 0,000 / 0,000 / 0,000 | 160 | REVIEW |
| Historique · `/fr/articles/product-design-ai-agents` | 313,00 / 266,00 / 290,00 | 290,00 | 266,00–313,00 | 1147,35 / 1178,57 / 1138,79 | 1147,35 | 0,000 / 0,000 / 0,000 | 152 | REVIEW |
| Historique · `/en/articles/product-design-ai-agents` | 174,57 / 261,00 / 236,42 | 236,42 | 174,57–261,00 | 1118,85 / 1121,86 / 1095,17 | 1118,85 | 0,000 / 0,000 / 0,000 | 136 | REVIEW |

### Baseline fraîche avant édition vs état final restauré

Chaque cellule de runs conserve l’ordre d’exécution, avec médiane et min–max TBT. Toutes les observations CLS, LCP, interactions et rapports Lighthouse bruts sont disponibles dans `before-targeted.json` et `final-targeted.json` et leurs répertoires `*-lighthouse/`.

| Série / route | TBT runs 1 / 2 / 3 (ms) | Médiane TBT | Min–max TBT | LCP runs 1 / 2 / 3 (ms) | Médiane LCP | CLS runs 1 / 2 / 3 | Candidat max. (ms) | Budget |
| --- | --- | ---: | --- | --- | ---: | --- | ---: | --- |
| Avant · `/fr` | 128,54 / 203,00 / 85,81 | 128,54 | 85,81–203,00 | 938,93 / 989,20 / 945,37 | 945,37 | 0,000 / 0,000 / 0,000 | 112 | PASS local |
| Avant · `/fr/articles/ux-design-guide` | 131,00 / 156,00 / 209,00 | 156,00 | 131,00–209,00 | 1152,19 / 1141,96 / 1133,66 | 1141,96 | 0,000 / 0,000 / 0,000 | 128 | PASS local |
| Avant · `/fr/articles/product-design-ai-agents` | 192,00 / 211,00 / 125,00 | 192,00 | 125,00–211,00 | 1136,61 / 1144,31 / 1128,52 | 1136,61 | 0,000 / 0,000 / 0,000 | 104 | PASS local |
| Avant · `/en/articles/product-design-ai-agents` | 221,21 / 113,00 / 144,00 | 144,00 | 113,00–221,21 | 1099,57 / 1100,33 / 1101,87 | 1100,33 | 0,000 / 0,000 / 0,000 | 120 | PASS local |
| Final restauré · `/fr` | 138,14 / 88,25 / 102,47 | 102,47 | 88,25–138,14 | 942,71 / 950,51 / 950,06 | 950,06 | 0,000 / 0,000 / 0,000 | 104 | PASS local |
| Final restauré · `/fr/articles/ux-design-guide` | 259,00 / 220,00 / 308,00 | 259,00 | 220,00–308,00 | 2693,76 / 1244,12 / 1311,47 | 1311,47 | 0,000 / 0,000 / 0,000 | 168 | REVIEW |
| Final restauré · `/fr/articles/product-design-ai-agents` | 207,00 / 171,31 / 198,00 | 198,00 | 171,31–207,00 | 1125,14 / 1123,38 / 1094,79 | 1123,38 | 0,000 / 0,000 / 0,000 | 144 | PASS local |
| Final restauré · `/en/articles/product-design-ai-agents` | 214,00 / 240,00 / 154,95 | 214,00 | 154,95–240,00 | 1177,08 / 1102,73 / 1104,10 | 1104,10 | 0,000 / 0,000 / 0,000 | 160 | REVIEW |

Le dernier état restauré présente **259 ms de TBT médian sur UX FR (220–308 ms, trois runs >200)** et **214 ms sur Product EN (154,95–240 ms)**. Product FR passe sa médiane à **198 ms**, mais un run atteint **207 ms**. Le premier run UX FR présente aussi un **LCP de 2 693,76 ms**, au-delà de 2 500 ms malgré sa médiane LCP conforme : cet incident n’est pas masqué. CLS vaut 0 sur les douze runs et les candidats scriptés restent ≤168 ms.

La dispersion de la baseline fraîche comprend déjà **un TBT >200 ms sur chacune des quatre routes**, malgré ses quatre médianes PASS. L’échantillon de trois runs est trop petit pour une inférence statistique ou une promesse de stabilité. La différence avec la campagne historique ne peut être imputée à un changement de code : elle était constatée avant optimisation. Les mécanismes de scheduling/simulation et l’environnement local contribuent potentiellement à la variabilité, sans attribution quantitative prouvée.

### Profilage causal préalable des quatre routes

Outil conservé : `scripts/profile_performance.cjs`. Quatre profils avant modification : CPU/trace/coverage compressés et `summary.json` **par route**, sous `profiles/before/`. Instrumentation **CPU ×4, cache navigateur froid, HTTP local non façonné**, mouvement standard au chargement ; ce ne sont **pas** des TBT Lighthouse. Durées CDP script/style/layout distinctes ; les catégories de trace inclusives se chevauchent et ne doivent pas être additionnées.

| Route | DOM / SVG observés | Longues tâches initiales observées (ms) | Script CDP (ms) | Style CDP (ms) | Layout CDP (ms) | Recalculs style / layouts |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| `/fr` | 1155 / 89 | 290 / 211 | 283,05 | 67,10 | 167,26 | 4 / 5 |
| `/fr/articles/ux-design-guide` | 1552 / 96 | 387 / 166 / 269 | 330,46 | 112,08 | 375,96 | 3 / 3 |
| `/fr/articles/product-design-ai-agents` | 1115 / 83 | 221 / 114 / 175 / 127 | 348,76 | 49,19 | 243,80 | 5 / 5 |
| `/en/articles/product-design-ai-agents` | 1115 / 83 | 103 / 224 / 294 | 340,08 | 87,28 | 210,31 | 4 / 4 |

**Scripts réellement demandés/exécutés.** Coverage et CPU identifient le bootstrap Next (`06ucopv9oh05a.js`), React/React DOM (`39_j1bdzreq0m.js`), le runtime Turbopack (`turbopack-2u1d16houkiyo.js`), les modules communs (`3qfy96eoyh-ek.js`, `41mprv1-o9284.js`) et le code de page : `1oc8ikqkej-eo.js` pour `/fr`, `3hlb9mz7hqw2j.js` et `2z3sfjah4ge7o.js` pour les trois articles. Les URL complètes, fonctions couvertes et offsets minifiés sont archivés, y compris les scripts inline thème/Flight. Le polyfill `0cz1d0mv5g_q7.js`, présent en `nomodule`, n’est pas exécuté par ce Chromium moderne et n’est pas compté dans le JS initial moderne.

| Routes | Scripts externes modernes initiaux | Octets JS bruts | Somme gzip locale indicative | État final |
| --- | ---: | ---: | ---: | --- |
| `/fr` | 6 | 488 199 | 143 380 | Identiques à l’entrée |
| Trois routes d’articles ciblées | 7 chacune | 522 523 chacune | 153 172 chacune | Identiques à l’entrée |

Les tailles gzip sont des estimations déterministes des fichiers, **pas** une mesure de compression HTTP publique. Le polyfill nomodule ajoute 112 594 octets si l’on somme tous les tags sans tenir compte du navigateur.

**Composants et gestionnaires examinés.** `/fr` hydrate galerie, démo et explorateur de sommaire dans la racine existante. Les trois articles passent par `NotionArticleReader`, rendu client de tous les paragraphes/visuels, états de progression et scroll-spy au-dessus du document, import du simulateur `DesignRolesLab` même sur les guides sans bloc `mobileLab`, avec ses deux langues. Ce sont des coûts candidats confirmés par le graphe et l’exécution, pas une durée exclusive prouvée pour chaque composant. Les gestionnaires de scroll/TOC, observer d’intersection, copie, modales et thème ont été inspectés ; **le profil ne démontre pas qu’un clic/copie ou une modale inactive cause le TBT de navigation**. Les implémentations inutilisées restent des possibilités de découpage futur, pas des suppressions fonctionnelles autorisées.

**Layout et thème.** Les principales mises en page initiales observées sont des layouts du document : environ **147 ms** sur FR, **266+107 ms** sur UX FR, **150+84 ms** sur Product FR et **162 ms** sur Product EN. L’analyse de ces événements ne trouve pas d’ancêtre `FunctionCall`/`EvaluateScript` identifié : cela oriente vers la mise en page initiale du document, sans prouver l’absence absolue de JavaScript causal. **Zéro transition/animation au chargement initial** sur les quatre routes ; le thème n’est donc pas accusé sans preuve de ces TBT. Sur deux bascules ultérieures en mode standard, 320/132/112/112 `transitionrun` sont observés ; en mouvement réduit, zéro. Ces interactions restent distinctes du chargement et des données terrain.

### Variantes essayées, mesurées et refusées

- **01 — `iterations/01-streaming-rejected/`** : frontières Suspense/streaming avec slots cachés dépendant de JS. Rejet sur contenu sans JS/ordre HTML, avant acceptation de performance. Aucun masquage SSR ou `ssr:false` retenu.
- **02 — `iterations/02-server-islands-rejected/`** : texte/visuels serveur, petits îlots clients, simulateur localisé et projection d’icônes. Malgré **−32 322 octets JS bruts / −8 583 gzip par article**, HTML gzip accru de **7,7 à 11 Ko**, nouvelle hydratation/Flight non gagnante. Série **1/4 PASS, 3/4 REVIEW, code 1**, trois médianes d’articles régressives. **232 ms** pour un candidat UX FR et **2 719,95 ms LCP** sur un run Product FR, visibles ci-dessous. Les 39 tests et 16 smokes passés concernaient cette variante désormais retirée, pas la validation finale.
- **03 — `iterations/03-complete-boundaries-rejected/`** : hydratation par sections/mémoïsation et post-traitement HTML pour résoudre les paquets de streaming à la construction. Les 22 smokes sans JS/clavier/modales/simulateur et 7 tests synthétiques passent ; la série ciblée passe **4/4**, mais trois médianes TBT sont moins bonnes que la baseline fraîche. **Refusée** : gain global non démontré et dépendance au transport interne React non justifiée pour une intégration sûre. Le finaliseur, ses tests expérimentaux et `parse5` ont été archivés puis retirés ; la commande de build initiale est restaurée.

Toutes les mesures de ces variantes sont conservées ; elles ne sont ni écartées des conclusions ni mélangées aux valeurs finales :

| Série / route | TBT runs 1 / 2 / 3 (ms) | Médiane TBT | Min–max TBT | LCP runs 1 / 2 / 3 (ms) | Médiane LCP | CLS runs 1 / 2 / 3 | Candidat max. (ms) | Budget |
| --- | --- | ---: | --- | --- | ---: | --- | ---: | --- |
| 02 rejetée · `/fr` | 189,50 / 125,59 / 189,00 | 189,00 | 125,59–189,50 | 986,63 / 958,81 / 957,69 | 958,81 | 0,000 / 0,000 / 0,000 | 144 | PASS local |
| 02 rejetée · `/fr/articles/ux-design-guide` | 266,00 / 316,50 / 346,10 | 316,50 | 266,00–346,10 | 1145,43 / 1181,52 / 1109,79 | 1145,43 | 0,000 / 0,000 / 0,000 | 232 | REVIEW |
| 02 rejetée · `/fr/articles/product-design-ai-agents` | 225,00 / 255,00 / 250,00 | 250,00 | 225,00–255,00 | 1141,60 / 1114,62 / 2719,95 | 1141,60 | 0,000 / 0,000 / 0,000 | 176 | REVIEW |
| 02 rejetée · `/en/articles/product-design-ai-agents` | 317,50 / 217,00 / 240,00 | 240,00 | 217,00–317,50 | 1125,34 / 1141,31 / 1096,56 | 1125,34 | 0,000 / 0,000 / 0,000 | 128 | REVIEW |
| 03 rejetée · `/fr` | 190,50 / 151,00 / 153,50 | 153,50 | 151,00–190,50 | 978,11 / 974,01 / 947,51 | 974,01 | 0,000 / 0,000 / 0,000 | 104 | PASS local |
| 03 rejetée · `/fr/articles/ux-design-guide` | 179,00 / 312,00 / 153,00 | 179,00 | 153,00–312,00 | 1129,94 / 1152,40 / 1156,64 | 1152,40 | 0,000 / 0,000 / 0,000 | 144 | PASS local |
| 03 rejetée · `/fr/articles/product-design-ai-agents` | 126,89 / 221,00 / 121,00 | 126,89 | 121,00–221,00 | 1120,22 / 1163,65 / 1132,02 | 1132,02 | 0,000 / 0,000 / 0,000 | 88 | PASS local |
| 03 rejetée · `/en/articles/product-design-ai-agents` | 183,00 / 182,73 / 224,95 | 183,00 | 182,73–224,95 | 1099,59 / 1094,53 / 1132,10 | 1099,59 | 0,000 / 0,000 / 0,000 | 120 | PASS local |

**Diagnostic CSS non concluant, aucune règle appliquée.** Le test A/B lecture seule `text-wrap: balance` vs `wrap` comprend 24 échantillons (4 routes ×3 ×2 bras, ordre alterné). Médianes style+layout originales→wrap : **213,956→248,175 ; 395,926→400,118 ; 324,191→285,692 ; 282,585→303,859 ms**. Un bénéfice isolé sur Product FR ne justifie pas un changement général. `layout-ab.json` et son journal sont conservés ; ce ne sont pas des TBT Lighthouse.

**Limite restante :** la baisse de JS seule n’a pas réduit de façon répétable l’ensemble des TBT, et les layouts du document restent importants. Sans simplification testée de rendu/mise en page, preuve par composant plus fine ou changement d’architecture séparément validé, une nouvelle optimisation serait spéculative. Le choix sûr est de conserver le comportement connu et de laisser les réserves visibles, pas de relever un seuil, supprimer un contenu utile, différer l’interactivité accessible ou manipuler le HTML du framework pour obtenir du vert.

### Reproduire sans écraser les preuves

```bash
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm run check:preservation
# Dans un processus séparé durable :
npm run preview:pages
# Puis, avec le navigateur/configuration de laboratoire documentés :
npm run test:ui
node scripts/profile_performance.cjs --tag diagnostic-nouveau
node scripts/check_performance.cjs --runs 3 \
  --route /fr --route /fr/articles/ux-design-guide \
  --route /fr/articles/product-design-ai-agents \
  --route /en/articles/product-design-ai-agents \
  --output reports/performance-finalization/reproduction-ciblee-nouvelle.json
# Si les quatre routes passent, reproduire l'ensemble, sans concurrence :
node scripts/check_performance.cjs --runs 3 \
  --output reports/performance-finalization/reproduction-complete-nouvelle.json
```

Utiliser un **nouveau tag et de nouveaux noms de sortie** pour conserver les campagnes existantes. Le profilage et Lighthouse sont séquentiels, jamais additionnés ni exécutés en concurrence. Les bibliothèques et Chromium portables de `.cache/`/`/tmp` ne sont pas des livrables Git ; dans un autre environnement, installer un navigateur compatible et consigner sa version avant comparaison. Une version différente exige une nouvelle baseline, pas une comparaison de scores à configuration différente.

## 6. Robots : cinq niveaux de preuve strictement séparés

| Niveau | État de cette mission |
| --- | --- |
| **1 — robots déclaré** | Autorisation `/` explicite pour Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot et Perplexity-User ; contrôles étendus conservés. |
| **2 — HTTP local** | Dix chaînes UA simulées × 18 chemins : **180/180 GET locaux** réussis dans la matrice SEO ; corps identiques au client standard, pas de blocage indirect observé sur les pages locales. Ce n’est pas une authentification du client. |
| **3 — compte Cloudflare** | **Non vérifié** : aucune lecture du compte/WAF/Access/cache/règles IA/robots géré ni des paramètres de domaine. |
| **4 — HTTP public** | **Inconnu** : sonde historique non relancée, GET de `/robots.txt` interrompu sur `URLError`, aucune réponse HTTP obtenue ; les 17 autres chemins prévus ne sont pas testés. Aucune conclusion de panne ou de blocage de crawler tirée de la restriction réseau du sandbox. |
| **5 — robots/citations réellement observés** | **Aucune preuve collectée** : aucun crawl authentifié, indexation/classement Google, trafic, recommandation ou citation générative revendiqué. |

Les fichiers LLM et les données structurées ne garantissent ni citation, ni rich result, ni classement. L’autorisation d’un agent d’entraînement n’est pas une condition démontrée d’éligibilité à la recherche ; le choix permissif antérieur n’est pas changé implicitement.

## 7. Réserves et décisions restant au propriétaire

| Priorité | Suite / preuve requise | État à la remise |
| --- | --- | --- |
| P1 | Réduire le coût de layout/hydratation avec une expérience isolée, sans contenu caché ni régression, nouvelle baseline comparable et 3 runs/route puis campagne complète. Revue des traces sur navigateur actuel et appareils représentatifs. | **Quatre réserves initiales non déclarées corrigées** ; aucun gain runtime de cette mission retenu. Les autres routes ne bénéficient pas d’une nouvelle validation de performance complète ; les réserves historiques restent distinctes. |
| P1 | Surveiller/reproduire le timeout de préparation du scan navigateur, en distinguant fonts/frames/scroll. | Premier passage **81/82** conservé ; diagnostic isolé non reproduit. Pas de garantie de stabilité parfaite. |
| P1 | Revue humaine WCAG : contrastes incomplets, lecteurs d’écran, zoom/appareils réels et critères applicables. | **62 analyses axe incomplètes**, aucun certificat. |
| P1 | Contrôler projet Pages, domaine, Node/env, Access/WAF/cache/bots/IA/robots géré ; réponses publiques complètes et edge. | **Non vérifié** ; aucun déploiement autorisé ou effectué. |
| P2 | Search Console, indexation/canonical choisi par Google, sitemap, données de terrain LCP/INP/CLS. | Aucun accès ni donnée collectée, absence de preuve ≠ réussite. |
| P2 | Authentifier de vrais crawls puis consigner séparément citations/recommandations réelles avec requête, langue, date et réponse. | Aucune observation ; UA simulé ≠ robot authentifié/citation. |
| Séparé | Réconciliation Microlink, rotation de clé, publication éventuelle de produits gratuits. | Hors mission, aucune clé utilisée, rotation non confirmée. |

Le [runbook](SEARCH_VISIBILITY_RUNBOOK.md) et la [checklist](SEO_RELEASE_CHECKLIST.md) gardent les étapes compte/public/humain ouvertes. Aucun classement, trafic, volume, achat, indexation Google ou recommandation/citation IA n’est revendiqué. Les fichiers LLM, robots et schémas ne les garantissent pas.

## 8. Préparation Git et artefacts de remise

**Branche imposée conservée** : `arena/cf1c4a81-ux-ui-playbook-landing-page`. HEAD/base toujours `0fb7adccbe5595ca4598c71a2e9faf1760db2873`. **28 fichiers suivis modifiés +20 nouveaux non suivis =48 chemins**, **0 suppression, 0 renommage, index vide**. Aucun commit/push/PR/merge/déploiement. La divergence avec `cloudflare-migration-v2` reste une donnée de revue, pas une intégration effectuée ou autorisée.

### Diff de cette mission vs diff cumulé

- **Entrée 47 fichiers → sortie 48** : les 47 précédents sont conservés, 44 identiques ; delta de mission limité au rapport, à `docs/SEO_RELEASE_CHECKLIST.md`, aux assertions renforcées de `tests/technical.spec.ts` et au nouveau diagnostic `scripts/profile_performance.cjs`.
- **Diff avec HEAD initial**, incluant le travail antérieur non suivi : `reports/performance-finalization/final-head-diff.patch` et inventaire SHA/tailles/statuts `final-git-inventory.json`. Rien n’a été stagé pour les produire.
- **Diff entrée de mission→remise** : `reports/performance-finalization/mission-only-diff.patch` ; snapshots gzip initiaux et archives des expériences refusées permettent de vérifier les retours exacts.
- Tous les fichiers applicatifs modifiés expérimentalement sont restaurés. Les seuls fichiers retirés pendant le nettoyage étaient **créés par ces expériences**, après archivage ; aucune suppression Git ni suppression du travail antérieur.

### Inventaire exact des fichiers suivis modifiés

```text
.env.example
.github/workflows/cloudflare-static-export.yml
.github/workflows/ui-check.yml
README.md
docs/COMPETITIVE_CONTENT_STRATEGY.md
lib/locale-routing.mjs
next.config.mjs
package-lock.json
package.json
public/_headers
scripts/check_static_export.cjs
scripts/site_check.py
src/app/[locale]/articles/[slug]/page.tsx
src/app/[locale]/articles/page.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/app/[locale]/resources/ui-ux-directory/page.tsx
src/app/globals.css
src/app/robots.ts
src/app/sitemap.ts
src/components/DesignRolesLab.tsx
src/components/GumroadButton.tsx
src/components/NotionArticleReader.tsx
src/components/ThemeAndLangControls.tsx
src/components/useModalFocus.ts
src/lib/site-config.ts
tests/locale-routing.test.mjs
tests/ui.spec.ts
```

### Inventaire exact des nouveaux fichiers non suivis

```text
docs/SEARCH_VISIBILITY_RUNBOOK.md
docs/SEO_AEO_GEO_AUDIT.md
docs/SEO_RELEASE_CHECKLIST.md
docs/TECHNICAL_INVENTORY.md
docs/TECHNICAL_READINESS_REPORT.md
docs/technical-baseline.json
eslint.config.mjs
scripts/check_performance.cjs
scripts/check_preservation.cjs
scripts/check_public_access.py
scripts/profile_performance.cjs
scripts/seo_check.py
src/app/global-not-found.tsx
src/config/crawler-policy.json
src/config/site-policy.json
src/lib/article-summary.ts
src/lib/browser-stores.ts
src/lib/fonts.ts
tests/seo.test.cjs
tests/technical.spec.ts
```

### Temporaires et travaux hors mission

`reports/`, `.cache/`, `.next/`, `out/`, `node_modules/`, `.wrangler/`, `playwright-report/` et `test-results/` restent ignorés selon les conventions existantes ; pas de build, traces, navigateur ou données volumineuses ajoutés à Git. Les archives d’expériences restent compressées pour ne pas être compilées par TypeScript. Les produits et le lot Microlink préexistants sont hors mission et conservés, pas « nettoyés ».

Principaux résultats **finaux** :

```text
reports/final-commands.json
reports/final/*.log
reports/delivery-check.json
reports/preservation-check.json
reports/static-export-check.json
reports/site-check.json
reports/seo-check.json
reports/browser-check.json
reports/performance-finalization/final-targeted.json
reports/performance-finalization/final-targeted-lighthouse/*.json
reports/performance-finalization/final-static-comparison.json
reports/performance-finalization/final-git-inventory.json
reports/performance-finalization/final-head-diff.patch
reports/performance-finalization/mission-only-diff.patch
```

Preuves historiques clairement séparées : `baseline/` (entrée et campagne précédente), `before-targeted*` (nouvelle baseline avant correction), `after-targeted*` (variante 02 rejetée), `after-complete-boundaries*` (variante 03 rejetée), `profiles/after-server-islands/`, `iterations/`, `layout-ab*` et `browser-timeout/`. Les anciens `static-text-comparison.json`, logs 39/16/22/7 expérimentaux et profils serveur ne sont pas utilisés comme validation finale. La sonde publique `reports/public-access-check.json` reste historique et inconnue côté HTTP.

Le contrôle de remise vérifie la cohérence des sources/commandes, preuves, préservation, inventaires, liens documentaires et index vide. Son succès ne transforme **ni un REVIEW TBT, ni le timeout antérieur, ni une preuve publique/terrain manquante en validation**. Les résultats locaux sont reproductibles selon le protocole documenté, pas une promesse que chaque valeur fluctuante sera identique.

**Prochaine étape Git : revue humaine du patch cumulé et des réserves, puis instruction explicite avant toute opération d’écriture distante ou commit.** Aucun transfert vers la branche de migration n’est préparé automatiquement. Le serveur local sur 3100 reste un aperçu, pas une publication.


## Addendum du 18 novembre 2026 : origine et édition augmentée

Les résultats et l’ancienne origine cités ci-dessus décrivent la passe historique ; ils ne sont pas réécrits. Pour la mise à jour issue du Drive du 9 novembre, le propriétaire a choisi **`https://joyccelight-playbook.uxplay.workers.dev`** comme origine officielle et **21 fichiers par langue et par achat**. Les valeurs courantes sont dans le README et le runbook ; les liens des kits gratuits sont régénérés. Voir le [rapport de mise à jour](EDITION_2026_UPDATE_REPORT.md) pour le diagnostic CI, les compteurs vérifiés et les validations de cette nouvelle révision. Aucune modification DNS ni publication distante n’est impliquée.
