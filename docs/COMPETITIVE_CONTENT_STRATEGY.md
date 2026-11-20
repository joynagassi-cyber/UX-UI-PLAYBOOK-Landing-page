# Stratégie de contenu concurrentielle — JoyCeeLight UX/UI Playbook

**État de référence : 18 novembre 2026 (UTC).** Corpus français et anglais. Travail réalisé sur `arena/ee9c08d1-ux-ui-playbook-landing-page`, sans commit, push, publication commerciale ni déploiement.

## Synthèse et décisions

1. **Consolider avant de créer des URLs.** Le site avait déjà quatre articles par langue, des explications illustrées, un prototype fictif, des modèles copiables et des bibliographies. La recherche UX, les tests, les limites des petits échantillons et le statut du format DTCG n’étaient pas absents. Les lacunes utiles sont surtout des aides au choix et des traces de travail plus concrètes.
2. **Corriger les frontières trop rigides entre disciplines.** Les définitions des trois guides initiaux étaient moins nuancées que celles du comparatif : UI réduite à la présentation dans le résumé UX ; risque d’assimiler Product Design et priorisation unilatérale de la roadmap. Les définitions et introductions ont été alignées, sans imposer un organigramme universel. Voir [NN/g, C01](#c01--nielsen-norman-group).
3. **Positionnement proposé : décision → implémentation → contrôle du rendu → limites.** Sa valeur doit venir de cas originaux vérifiables et d’une continuité FR/EN. Ce territoire n’est pas vierge : Pascal Mietlicki, RGAA Checker, ClaudeCodeLab et d’autres publient déjà sur les interfaces IA, les tokens et les vérifications. Voir [D10–D12](#d10--claudecodelab-fr).
4. **Apports réalisés dans les huit pages existantes :** matrice de choix de méthode et mini-protocole UX ; consommateur HTML/CSS des tokens ; distinction entre agent de code, agent dans le produit et profil simulé ; fiche de revue à résultat explicitement non exécuté ; liens contextuels dans la langue courante. Le titre des index n’est plus le générique « Article ».
5. **Préparer, sans publier automatiquement :** un [protocole complet de test d’utilisabilité](drafts/USABILITY_TEST_PROTOCOL_FR.md), actuellement brouillon interne français. Aucune session utilisateur ni validation de marché n’a été effectuée.
6. **Visibilité non mesurée.** Les recherches ont permis de découvrir des pages, pas de mesurer leur classement Google. La tentative Google directe a renvoyé une page de consentement/vérification. Aucune réponse de Google AI Overviews, ChatGPT, Claude ou Perplexity avec citations n’a été directement observée. Ce rapport ne fournit donc ni classement, ni volume, ni difficulté, ni trafic, ni promesse de citation.
7. **Pas de production de contenu en série.** Aucune nouvelle route publique, aucun clone lexical « définition / différence / guide ultime », aucune nouvelle offre ou ressource payante n’est créé par cette passe.

## Sommaire

- [1. Méthode et limites d’observation](#1-méthode-et-limites-dobservation)
- [2. Couverture réelle du Playbook avant les ajouts](#2-couverture-réelle-du-playbook-avant-les-ajouts)
- [3. Références éditoriales et concurrents directs](#3-références-éditoriales-et-concurrents-directs)
- [4. Concurrents découverts par questions et thèmes](#4-concurrents-découverts-par-questions-et-thèmes)
- [5. Références primaires mobilisables](#5-références-primaires-mobilisables)
- [6. Positionnement, piliers et maillage](#6-positionnement-piliers-et-maillage)
- [7. Carte des opportunités priorisées](#7-carte-des-opportunités-priorisées)
- [8. Contenus complémentaires : préparer ou différer](#8-contenus-complémentaires--préparer-ou-différer)
- [9. Modifications effectivement réalisées](#9-modifications-effectivement-réalisées)
- [10. Visibilité Google et moteurs IA](#10-visibilité-google-et-moteurs-ia)
- [11. Vérifications et suites](#11-vérifications-et-suites)

## 1. Méthode et limites d’observation

### 1.1 Ce qui a été examiné

- Les données source des **quatre articles FR et quatre articles EN**, leurs sections, définitions, modèles, références, sommaires, liens de fin d’article et métadonnées.
- Les deux index, le lecteur d’article, les données structurées d’auteur et les exports textuels existants. Le texte exporté doit rester cohérent avec ce qui est lisible sur le site ; ce n’est pas une preuve de reprise par un moteur.
- Des pages des éditeurs demandés, des pages découvertes par questions thématiques et deux offres de livres particulièrement proches de l’audience développeur.
- Des sources institutionnelles et documentations produit pour distinguer une recommandation éditoriale, une possibilité d’outil, une étude et un référentiel.

Les observations externes ci-dessous portent sur du **texte extrait des pages**, avec leurs titres, liens, blocs de code, légendes et alternatives d’images accessibles à l’extraction. Ce n’est **pas un audit visuel complet** : une légende indiquant une capture annotée ne démontre pas sa lisibilité, et un extrait de code n’a pas été exécuté simplement parce qu’il était présent. Les parcours d’achat, cours, bibliothèques payantes, téléchargements de livres et conditions de toutes les ressources liées n’ont pas été audités.

### 1.2 Échantillon de requêtes effectivement utilisé

Recherches FR/EN par sujet, complétées par l’examen ciblé des éditeurs demandés. Les formulations suivantes sont des exemples du journal de recherche, **pas des mots-clés dotés de métriques** :

| Requête | Intention explorée | Lot thématique examiné ensuite, sans ordre de classement |
| --- | --- | --- |
| `UX design définition guide méthodes recherche utilisateur` | Comprendre la discipline et choisir une activité | Contentsquare, Polara Studio, La Fabrique du Net ; comparaison avec NN/g et IxDF |
| `UX UI product design differences responsibilities` | Distinguer les contributions et responsabilités | Great Learning ; comparaison avec le glossaire NN/g et les articles déjà présents sur le site |
| `product discovery methods assumptions evidence guide` | Réduire une incertitude avant de construire | Thiga, Glasgow ; rapprochement avec GOV.UK et le Double Diamond |
| `design tokens variables CSS mode sombre guide français` | Passer d’un système nommé au code | ClaudeCodeLab, RGAA Checker ; comparaison avec Figma Learn, Material, DTCG et Smashing |
| `audit interface générée IA accessibilité tests utilisateurs` | Contrôler un résultat généré | Pascal Mietlicki ; comparaison avec UX Collective, NN/g, WAI et la documentation des agents GitHub |
| `free UI UX design resources developers licenses directory` | Choisir une ressource et vérifier les conditions | Répertoire Brad Traversy, Dan Levy ; comparaison avec le répertoire gratuit existant |
| `UI design for developers book practical guide` | Chercher un accompagnement opérationnel ou un livre | Refactoring UI, Practical UI |

La colonne de droite décrit la sélection de travail par thème ; elle ne reconstitue pas une SERP complète et n’attribue pas un rang à ces pages. Les résultats d’un outil de recherche ne doivent pas être renommés « positions Google ». Les grands éditeurs demandés ont aussi été examinés volontairement : leur inclusion ne prouve pas qu’ils apparaissent pour toutes ces requêtes.

### 1.3 Date, profondeur et qualification des constats

**Date de consultation de référence de cette session : 18/11/2026.** Elle est répétée avec les URLs examinées. Les dates de publication ou de mise à jour mentionnées sont celles affichées dans le texte reçu, pas une certification de fraîcheur. Une date postérieure à la date de référence, rencontrée notamment chez Glasgow, est une anomalie à vérifier et non un avantage concurrentiel.

Les « blocs » sont les fragments de texte renvoyés par l’outil, numérotés à partir de zéro. « Blocs 0–1 sur 4 » signifie deux fragments lus sur quatre, pas une lecture intégrale. Même une extraction entièrement lue ne prouve pas l’exhaustivité de la page interactive.

Vocabulaire retenu :

- **Observé :** présent dans les passages effectivement reçus ou dans les fichiers locaux.
- **Non vérifié :** hors des passages lus, derrière un achat, non exécuté, ou dépendant d’une autre méthode d’observation.
- **Analyse éditoriale :** jugement argumenté sur ces passages, distinct de leur visibilité.
- **Hypothèse :** opportunité à confirmer avec des lecteurs, des données du site ou un protocole approprié.

L’absence d’auteur, de date, de référence ou d’exemple **dans un extrait** ne permet pas d’affirmer leur absence sur l’ensemble du site. Les points faibles ci-dessous restent limités aux pages et passages concernés.

### 1.4 Ce que cette étude ne permet pas de conclure

Pas de mesure Search Console ou analytique ; pas d’accès aux journaux de robots ; pas de suivi longitudinal ; pas de test de compréhension des articles auprès de lecteurs ; pas de mesure commerciale ; pas de test utilisateur des produits concurrents. Les exemples de questions et les volumes de publication observables ne donnent pas une demande chiffrée.

La tentative directe sur [Google en français](https://www.google.com/search?q=UX+design+d%C3%A9finition+guide&hl=fr), consultée le **18/11/2026**, a abouti à un écran de consentement/vérification, sans résultat exploitable. Aucun contournement n’a été tenté.

## 2. Couverture réelle du Playbook avant les ajouts

Inventaire réalisé à partir de `src/i18n/articles/{fr,en}.ts`, de `comparison-{fr,en}.ts`, du catalogue et du lecteur, le **18/11/2026**. Les slugs et grandes structures restent inchangés.

| Page existante, dans chaque langue | Intention principale déjà servie | Contenu déjà présent | Lacune réellement retenue |
| --- | --- | --- | --- |
| `/{locale}/articles/ux-ui-product-design` | Comparer UX, UI et Product Design | Huit sections, six références, neuf annotations et trois écrans du prototype fictif Atelier, états de refus et de confirmation simulés | Relier les décisions aux sections pratiques des trois autres guides, plutôt que créer une seconde page de différences |
| `/{locale}/articles/ux-design-guide` | Concevoir un parcours et préparer son audit | Six sections, onze références, dix principes cognitifs, états d’écran, paiement, observation, limites de l’échantillonnage, checklist de quarante points | Rendre le choix entre entretien, observation, test, analyse d’événements et inspection immédiatement utilisable ; préciser la préparation d’une session |
| `/{locale}/articles/ui-design-system-tokens` | Traduire des décisions UI en tokens CSS et thèmes | Six sections, quatre références, typographie, espacements, long fichier CSS clair/sombre, attention au rendu, aux consommateurs des tokens et au statut DTCG, modèle de passation | Ajouter un consommateur concret du CSS et une chaîne rôle → composant → état → contrôle ; documenter davantage les notions produit/format |
| `/{locale}/articles/product-design-ai-agents` | Cadrer et revoir le travail confié à un agent | Six sections, quatre références, brief, cinq fichiers, instructions, prompts, permissions ; distinction méthode/sévérité/résultat et statuts existants | Montrer une fiche remplissable sans inventer de résultats ; distinguer trois objets IA ; ne pas attribuer aux sources HAX/PAIR la validation du workflow à cinq fichiers |
| `/{locale}/articles` | S’orienter dans la collection | Quatre cartes et leurs liens, données `CollectionPage`, offre et ressource gratuite | H1 « Article » trop générique, introduction longue, absence de recommandation de départ explicite |
| `/{locale}/resources/ui-ux-directory` | Choisir une ressource de conception | 51 fiches, six familles, 75 destinations, onze références, usages par profil et vigilances ; éditions FR et EN distinctes | Entretenir les conditions et disponibilités sans promettre un audit exhaustif ; pas besoin d’un second « top outils » |

### Atouts à conserver

- Des paragraphes développés, avec explications et illustrations natives, plutôt qu’un assemblage de listes. Les garde-fous existants protègent **19 / 14 / 13 / 14 explications illustrées** et deux schémas de synthèse par article ; ces nombres ne sont pas des objectifs de référencement.
- Un même cas fictif pour discuter les contributions, sans faux témoignages de participants ni gains de conversion inventés.
- Des mises en garde déjà présentes : cinq participants ne garantissent pas une proportion fixe de défauts ; un scan sans erreur ne certifie pas l’accessibilité ; le format DTCG n’est pas une Recommandation W3C.
- Des cartes « À lire aussi » et des bibliographies déjà rendues. Le besoin concernait un **maillage en contexte**, pas la création de tout lien interne.
- Une identité d’auteur reliée aux profils fournis, sans qualifications ou affiliations inventées. Un ajout de badge « expert » ne remplacerait pas une méthode ou une preuve d’exécution.

### Écarts transversaux

Les trois définitions initiales schématisaient davantage les métiers que le comparatif. L’UI inclut des décisions d’interaction et de retour, et non seulement une couche de présentation. Le Product Design collabore avec le product management, la recherche et l’ingénierie : il ne possède pas automatiquement la vision ou la roadmap. Le [glossaire NN/g](https://www.nngroup.com/articles/ux-disciplines-glossary/), consulté le **18/11/2026**, étaye cette correction, tout en soulignant la variabilité des intitulés.

L’architecture publique mélangeait dans un même guide Product les agents de code, l’expérience d’un agent intégré au produit et la question des utilisateurs simulés, sans tableau d’orientation immédiatement visible. Les contenus sur la recherche réelle et les permissions existaient ; le besoin était de **séparer les objets et les conclusions permises**, pas de découvrir ces précautions pour la première fois.

## 3. Références éditoriales et concurrents directs

Ces fiches évaluent l’utilité éditoriale des pages lues. Elles ne constituent ni un classement SEO ni une recommandation d’achat issue d’un test complet.

### C01 — Nielsen Norman Group

**URLs et consultation — 18/11/2026 :**

- [When to Use Which User-Experience Research Methods](https://www.nngroup.com/articles/which-ux-research-methods/) : Christian Rohrer ; publication indiquée en 2022, revue affichée au 15/07/2026 ; blocs 0–1 sur 4.
- [UX Disciplines: Glossary](https://www.nngroup.com/articles/ux-disciplines-glossary/) : Raluca Budiu ; date affichée 23/10/2026 ; blocs 0, 2 et 3 sur 5.
- [Usability (User) Testing 101](https://www.nngroup.com/articles/usability-testing-101/) : Kate Moran ; publication affichée 01/12/2019, revue 15/07/2026 ; bloc 0 sur 3.
- [Synthetic Users](https://www.nngroup.com/articles/synthetic-users/) : Maria Rosala et Kate Moran ; 21/06/2024 ; blocs 0–2 sur 4.
- [Generative UI and Outcome-Oriented Design](https://www.nngroup.com/articles/generative-ui/) : Kate Moran et Sarah Gibbons ; 22/03/2024 ; bloc 0 sur 3.

**Intentions et structure.** Répondre à une question précise par article, avec résumé, sommaire, définition et renvois méthodologiques. La carte de méthodes sépare comportement/déclaration et qualitatif/quantitatif, puis le contexte et la phase de développement. Le glossaire évite de déduire une répartition universelle des métiers à partir des titres.

**Exemples, preuves et matériaux.** Schémas et captures décrits dans l’extraction ; article sur les profils synthétiques confrontant des sorties à des études humaines ; liens vers des articles complémentaires. Auteurs et dates visibles. La comparaison détaillée de toute la méthodologie et de toutes les références n’a pas été menée.

**Force éditoriale.** Les distinctions aident à choisir ou à invalider une méthode ; elles sont plus utiles qu’une liste indifférenciée de techniques. **Limite pour notre audience :** le passage de ces distinctions à un exemple HTML/CSS et à un rapport de revue de code n’est pas l’objet des extraits examinés. Le scénario de Generative UI est prospectif ; il ne démontre pas la maturité générale des outils actuels.

**Réponse Playbook.** Citer ces distinctions et proposer une adaptation originale, bornée : matrice sur l’export de factures, critères de préparation et rapports séparant contrôles techniques et observations. Ne pas redessiner leur carte ni reprendre leurs résultats comme nos propres expériences.

### C02 — Interaction Design Foundation / IxDF

**URL :** [UX Design](https://ixdf.org/literature/topics/ux-design), consultée le **18/11/2026**, blocs 0–1 sur 8 ; redirection depuis le domaine Interaction Design Foundation.

**Observé.** Page d’entrée pédagogique dense, définition large de l’expérience, processus itératif, FAQ et liens vers des cours et sujets voisins. Des illustrations créditées avec mention de licence apparaissent dans l’extraction. L’auteur et la date de l’ensemble n’ont pas été vérifiés dans les fragments lus.

**Analyse.** Forte couverture introductive et maillage de formation ; densité et appels aux cours peuvent rendre la réponse opérationnelle plus dispersée pour un développeur pressé. Cela ne permet pas de juger les cours ou les sept autres fragments non entièrement examinés.

**Réponse.** Garder une définition courte et nuancée, puis orienter vers une décision, un exemple et une limite. Ne pas concurrencer le volume encyclopédique pour lui-même.

### C03 — Baymard Institute

**URLs :** [Current State of Checkout UX](https://baymard.com/research-articles/current-state-of-checkout-ux), Edward Scott, publication affichée 13/11/2024, mise à jour 03/11/2026, blocs 0–1 sur 7 ; [Cart Abandonment Rate](https://baymard.com/blog/cart-abandonment-rate), mise à jour affichée 28/10/2026, bloc 0 sur 3. **Consultation : 18/11/2026.**

**Observé.** Problèmes de paiement reliés à des exemples de boutiques, captures annotées décrites, paroles de participants et liens méthodologiques. La compilation sur l’abandon précise cinquante études et une moyenne non pondérée de 70,22 %. Des contenus complémentaires relèvent de la recherche payante.

**Analyse.** Modèle fort pour relier une recommandation à son contexte empirique ; pas une autorisation de généraliser un résultat e-commerce à un autre service. Les éléments de formulaire ne sont pas tous des champs, et la moyenne d’abandon n’est pas un gain de conversion à promettre. La totalité des études, des annotations et de l’offre payante n’a pas été inspectée.

**Réponse.** Améliorer les questions de revue du paiement existant, expliquer le dénominateur et mesurer le parcours propre au produit. Ne pas prétendre disposer d’un benchmark original de boutiques ni du corpus Baymard.

### C04 — Smashing Magazine

**URL :** [Automating Design Systems: Tips And Resources](https://www.smashingmagazine.com/2025/08/automating-design-systems-tips-resources/), Joas Pambou ; **consultée le 18/11/2026**, blocs 0–2 sur 4.

**Observé.** Workflow illustré reliant conception, tokens, Supernova, code et documentation ; intertitres pratiques, ressources et liens d’outils. L’angle est l’automatisation du système, pas seulement la définition de token.

**Analyse.** Bonne continuité entre outils et livrables. Les images n’ont pas été vérifiées visuellement ; le workflow, les offres et les compatibilités n’ont pas été exécutés. Un tutoriel dépendant d’un service peut vieillir autrement qu’un principe de nommage.

**Réponse.** Proposer un petit exemple indépendant d’un abonnement : variables déjà fournies, bouton consommateur, états et mesures du rendu. Pour une future intégration Figma → build, prévoir des versions et un test réel avant publication.

### C05 — A List Apart

**URL :** [Standards for Writing Accessibly](https://alistapart.com/article/standards-for-writing-accessibly/), extrait d’ouvrage de Metts et Welfle ; **consultée le 18/11/2026**, deux blocs extraits lus.

**Observé.** Angle éditorial spécialisé : ordre des informations, verbes d’action, instructions et erreurs ; exemples de formulation et articulation avec le travail d’équipe. Le contexte d’extrait d’ouvrage donne une provenance, sans transformer toutes les recommandations en critères normatifs actuels.

**Analyse.** Plus précis et réutilisable qu’un simple « soyez clair ». La date et toute actualisation de la page n’ont pas été établies dans ce relevé. Les obligations techniques doivent être vérifiées dans WAI/WCAG et dans le produit, plutôt que déduites d’un texte de pratique rédactionnelle.

**Réponse.** Renforcer la microcopie du guide UI par la distinction erreur de saisie / panne du service, avec les sources primaires et le comportement réellement disponible. Pas de nouvel article générique de microcopie à ce stade.

### C06 — UX Collective

**URL :** [Human + Machine: Responsible AI Workflows for UX Research](https://uxdesign.cc/human-machine-responsible-ai-workflows-for-ux-research-22a5c39ac0ec), Sahil Afrid Farookhi, date affichée 07/09/2025 ; **consultée le 18/11/2026**, blocs 0–1 sur 4.

**Observé.** Découpage du workflow, risques et outils ; diagramme explicitement identifié comme généré avec ChatGPT ; liens vers des services et ressources complémentaires. Une attribution secondaire sur le tree testing apparaît, mais la recherche originale correspondante n’a pas été vérifiée.

**Analyse.** Utile pour la lecture d’un processus, moins solide comme source unique d’un résultat empirique ou d’une capacité fournisseur. La mention d’un diagramme généré est une transparence, pas un défaut de qualité automatique. Ne pas généraliser cette évaluation à tous les auteurs du média.

**Réponse.** Conserver la provenance des hypothèses, séparer le travail assisté et les données de participants, préférer l’original lorsqu’un résultat d’étude soutient une recommandation.

### C07 — Figma Resource Library et Figma Learn

**URLs :** [What is UX design?](https://www.figma.com/resource-library/what-is-ux-design/), blocs 0–1 sur 3 ; [Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections), bloc 0 sur 2. **Consultation : 18/11/2026.**

**Observé.** Le premier contenu sert l’initiation, avec étapes, exemples, liens méthodologiques et appels vers Figma. Le second est une documentation produit : collections, variables, alias, modes, portée et syntaxe de code. L’auteur individuel et la date du premier n’ont pas été vérifiés.

**Analyse.** Le maillage « notion → action dans l’outil » est pertinent ; les deux pages ne constituent pas la même preuve. La documentation est primaire pour les fonctionnalités de Figma, pas pour établir un résultat d’utilisabilité ou garantir la synchronisation d’une application. Plans et droits d’accès restent à vérifier. L’URL générique `/learn/` n’a pas fourni de page exploitable ; la documentation Help accessible a été examinée à sa place.

**Réponse.** Expliquer la différence entre une décision tokenisée, une variable Figma, une propriété personnalisée CSS et le format d’échange. Montrer explicitement ce qui doit être branché ou testé.

### C08 — Material Design

**URL :** [Design tokens — Overview](https://m3.material.io/foundations/design-tokens/overview), Google Material Design 3 ; **consultée le 18/11/2026**, blocs 0–1 sur 3.

**Observé.** Classes de tokens de référence, système et composant ; organisation par rôle et adaptation des thèmes ; renvois documentaires internes. Auteur individuel/date non établis dans les passages lus.

**Analyse.** Modèle de système plus précis qu’une palette de couleurs. C’est l’architecture d’un système donné, pas une obligation de créer trois couches partout. La documentation ne remplace pas l’examen des compositions, surcharges et états du composant final.

**Réponse.** Relier un rôle à un vrai consommateur CSS, puis mesurer le texte sur son fond au repos et au survol. Ne pas présenter le nom `on-*` comme une garantie universelle de contraste.

### C09 — Refactoring UI

**URL :** [Refactoring UI](https://refactoringui.com/), Adam Wathan et Steve Schoger ; **consultée le 18/11/2026**, bloc 0 sur 3.

**Observé.** Offre orientée développeurs, conseils visuels concrets, exemples et sommaire détaillé sur la page de vente. La progression par problèmes d’interface est plus proche d’un besoin d’exécution que d’un dictionnaire des métiers.

**Analyse.** Concurrence commerciale directe pour l’attention d’un développeur qui veut améliorer ses écrans. Les extraits et promesses de la landing page ne permettent pas d’auditer tout le livre, son efficacité pédagogique ou ses fichiers. Aucun achat, prix ou contenu complet n’est vérifié ici.

**Réponse.** Rendre visible notre continuité entre recherche, composants, revue avec agent et limites des contrôles, sans prétendre être « meilleur » sur la seule base d’un sommaire.

### C10 — Practical UI

**URL :** [Practical UI](https://www.practical-ui.com/), Adham Dannaway ; **consultée le 18/11/2026**, bloc 0 sur 3.

**Observé.** Huit chapitres et plus de trois cents visuels annoncés, recommandations justifiées, exemple de transformation d’une application d’entraînement et tutoriel. Ce sont des caractéristiques affichées par la page de vente ; l’aperçu n’a pas été téléchargé.

**Analyse.** La démonstration avant/après et l’explication du pourquoi répondent à la même audience pratique. Le nombre de visuels ne prouve pas à lui seul l’apprentissage ; ni le livre complet, ni le prix, ni les résultats des acheteurs ne sont vérifiés.

**Réponse.** Privilégier un exemple original cohérent avec ses états et ses critères d’essai. Les futurs avant/après doivent indiquer ce qui est réellement mesuré et ce qui reste une hypothèse de conception.

## 4. Concurrents découverts par questions et thèmes

Cette sélection complète les grands éditeurs ; elle ne prétend pas recenser tout le marché francophone ou anglophone. Chaque fiche indique **URL, consultation et profondeur**. Les liens de conversion ou de maillage sont des observations éditoriales, pas des preuves de trafic.

### D01 — Contentsquare (FR)

[Les étapes / méthodologie UX Design](https://contentsquare.com/fr-fr/blog/methodologie-ux-design/) — **18/11/2026**, bloc 0 sur 2. Marie Jehanne identifiée ; date non établie dans l’extrait. Introduction accessible, étapes et maillage vers l’écosystème de l’outil. La répétition de définitions et le cadre général apportent moins d’aide à une décision précise dans les passages lus. **À retenir :** une entrée claire ; **à dépasser :** choisir une méthode avec ses limites, pas seulement décrire un processus.

### D02 — Polara Studio (FR)

[Glossaire UX Design](https://www.polarastudio.fr/glossaire/ux-design) — **18/11/2026**, bloc 0 sur 3. Équipe et actualisation affichée 10/10/2026. Questions concrètes SaaS et liens de glossaire ; raccourcis sur l’UI comme apparence et sur cinq utilisateurs / 85 % dans le passage reçu. Ce n’est pas un audit de toutes les autres pages de l’agence. **Réponse :** conserver les nuances que notre comparatif et nos précautions d’échantillonnage possédaient déjà.

### D03 — La Fabrique du Net (FR)

[Techniques et méthodes UX](https://www.lafabriquedunet.fr/logiciels/tendances/les-meilleures-techniques-et-methodes-ux) — **18/11/2026**, bloc 0 sur 3. Camille Deneu, date affichée 07/07/2026. Panorama en trois phases, visuels décrits, lien NN/g et renvois aux comparatifs logiciels. Utile pour découvrir le vocabulaire ; la sélection d’une activité selon une question et une décision mérite un traitement plus fin que le panorama lu. **Réponse :** matrice courte, pas une autre liste de « meilleures méthodes ».

### D04 — Userlynx (FR)

[Protocole de test utilisateur](https://www.userlynx.com/protocole-test-utilisateur/) — **18/11/2026**, bloc 0 sur 2. Sept étapes, tâches, prétest, consentement et analyse visibles ; auteur/date non vérifiés dans ce fragment. Le repère « souvent cinq » demande d’expliciter populations, tâches et risques plutôt que de l’employer comme seuil universel. **Réponse :** préparer un protocole appliqué avec recrutement, critères de sortie et grille de notes ; ne pas prétendre être le premier à traiter le protocole.

### D05 — Lyssna (EN)

[UX research guide](https://www.lyssna.com/guides/ux-research-guide/) — **18/11/2026**, bloc 0 sur 35 ; redirection depuis une sous-page de processus. Date affichée 29/09/2023, durée annoncée de 139 minutes, architecture de guide et nombreux sous-thèmes. Le document n’a pas été lu intégralement : aucun jugement global sur sa profondeur réelle ou ses références. **Réponse :** reprendre le principe d’orientation par question, pas son volume ni son découpage en nombreuses URLs sans besoin distinct.

### D06 — Great Learning (EN)

[UI, UX and Product Design: understand the difference](https://www.mygreatlearning.com/blog/ui-ux-and-product-design-understand-the-difference/) — **18/11/2026**, bloc 0 sur 2. Editorial Team, publication affichée 13/12/2021, mise à jour 20/06/2025. Sommaire lisible ; analogie de l’UI-décoration et attribution large de vision/roadmap au Product Design dans le passage reçu. **Réponse :** utiliser un même produit fictif pour montrer les contributions et les recouvrements plutôt que fixer des cases universelles.

### D07 — Thiga (EN)

[How to industrialize Product Discovery](https://www.media.thiga.co/en/how-to-industrialize-product-discovery) — **18/11/2026**, bloc 0 sur 3. Alexandre Irrmann-Tézé, actualisation affichée 22/08/2026. Hypothèses, canvas et organisation à l’échelle ; liens vers l’accompagnement produit. **Force :** relier découverte et organisation. **Limite de transposition :** le contexte d’équipes à l’échelle ne constitue pas l’organigramme de toute petite équipe. Préparer un support de décision plus léger pour notre audience avant d’ouvrir un nouveau guide Discovery.

### D08 — Glasgow (EN)

[Product discovery](https://blog.glasgow.works/blog/product-discovery/) — **18/11/2026**, bloc 0 sur 2. Vadim Glazkov ; publication affichée 18/05/2026, mise à jour reçue au 19/11/2026, **postérieure à la date de référence et donc à vérifier**. Questions courtes, hypothèses, exemple de facturation présenté comme hypothétique et liens contextuels. **Force éditoriale observée :** aller vers une décision. **Réponse :** une fiche originale question → risque → donnée attendue → décision, sans revendiquer une « fraîcheur » à partir de la date incohérente.

### D09 — ROSSUL (EN)

[Design system components and tokens](https://www.rossul.com/2026/blog/design-system-components-tokens/) — **18/11/2026**, bloc 0 sur 4. Date affichée 06/11/2026. Architecture, gouvernance et exemple de données DTCG ; renvois commerciaux. **Force :** rapprocher tokens, composants et maintenance. **Réserve :** trois niveaux de tokens et restrictions de forfait ne se généralisent pas sans vérification ; le code n’a pas été exécuté. **Réponse :** commencer par un petit consommateur et sa revue, puis n’étendre l’automatisation qu’avec un exemple testé.

### D10 — ClaudeCodeLab (FR)

[Claude Code et design tokens](https://claudecode-lab.com/fr/blog/claude-code-design-tokens/) — **18/11/2026**, bloc 0 sur 2. Workflow de passation conception → JSON/CSS → Tailwind/React et liens primaires. Auteur/date non établis dans ce relevé. **Force :** séquence concrète pour développeurs avec agent. **Réserve :** commandes, transformations et conformité des données au format DTCG non exécutées/vérifiées. **Réponse :** ne pas annoncer notre combinaison tokens + agent comme exclusive ; apporter un exemple autonome effectivement rejouable.

### D11 — RGAA Checker (FR)

[Design tokens et accessibilité : les contrastes dans le design system](https://rgaa-checker.com/blog/design-tokens-accessibilite-contrastes) — **18/11/2026**, deux blocs extraits lus. Paires sémantiques, code, contrôles CI et liens RGAA ; appels au scanner. **Force :** expliciter les paires et recommander aussi une vérification du rendu en production. Ce dernier avertissement est bien présent : il ne faut pas lui attribuer l’idée que les tokens suffisent toujours.

**Points à ne pas reprendre sans correction :** la conclusion parle néanmoins de conformité « garantie par construction » ; un commentaire de code traite 18 px comme du grand texte à 3:1, et les `rem` sont présentés comme respectant nativement l’agrandissement sans perte. Les explications WAI [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) et [SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), consultées le **18/11/2026**, demandent de distinguer points/pixels, graisse et comportement après agrandissement. Des unités relatives ne prouvent pas à elles seules l’absence de perte de contenu. Les affirmations prospectives sur APCA ne doivent pas remplacer le référentiel applicable.

**Réponse :** mesurer les bonnes paires dans les états réels et conserver les limites, sans promettre la conformité complète à partir d’un nom de token ou d’un scan.

### D12 — Pascal Mietlicki (FR)

[Code généré par IA : accessibilité, WCAG et tests](https://blog.pascal-mietlicki.fr/code-genere-ia-accessibilite-wcag-tests/) — **18/11/2026**, bloc 0 sur 2. HTML natif, contrôles automatiques, revue manuelle et tests avec des personnes ; liens WAI. **Concurrent éditorial particulièrement pertinent :** le principe de vérification en couches existe déjà en français. Auteur identifiable par le site ; date exacte et totalité des exemples non vérifiées ici. **Réponse :** différencier par une fiche de revue, des snippets et leurs traces d’exécution, pas par une revendication d’invention du sujet.

### D13 — Brad Traversy / communauté (EN)

[Design Resources for Developers](https://github.com/bradtraversy/design-resources-for-developers) — **18/11/2026**, bloc 0 sur 24. Répertoire communautaire structuré par catégories ; annonce du 18/10/2026 suspendant les nouvelles propositions tout en maintenant l’entretien. **Force :** largeur de découverte et navigation par besoin. Les licences de chaque ressource liée n’ont pas été auditées ; la licence du dépôt n’accorde pas automatiquement les droits sur tous les actifs tiers. **Réponse :** garder notre sélection limitée, contextualiser les usages et les points à vérifier, sans allonger le catalogue pour battre un nombre de liens.

### D14 — Dan Levy (EN)

[Best Free UI Design Resources for Developers](https://danlevy.net/amazing-resources/) — **18/11/2026**, deux blocs extraits lus. Mise à jour affichée avril 2026 ; sélection de départ, catégories et journal de changements. Une section **Licensing and Usage Tips** rappelle attribution et restrictions de marque : elle existe et ne doit pas être présentée comme une lacune du concurrent. **Réserve :** ces conseils ne valent pas vérification de chaque condition. **Réponse :** montrer comment prendre une décision documentée sur une ressource, sans inventer un droit d’usage « gratuit = libre ».

### D15 — Usabilis (FR)

[Interface générative / Gen UI](https://usabilis.com/interface-generative-gen-ui/) — **18/11/2026**, bloc 0 sur 4. Maxence Freixa identifié ; distinction conception/exécution et discussion de coûts. Des pourcentages présents dans le passage reçu n’ont pas été reliés ici à leurs études originales et ne sont pas repris. **Réponse :** séparer la génération pendant le développement de la génération à l’exécution ; différer un guide GenUI autonome jusqu’à disposer d’un cas et de contraintes réellement démontrés.

## 5. Références primaires mobilisables

Ce sont des appuis pour les explications et les limites, pas nécessairement des concurrents commerciaux. **Toutes consultées le 18/11/2026.**

| ID | URL examinée et profondeur | Apport utilisable | Limite de portée |
| --- | --- | --- | --- |
| R01 | [GOV.UK — Plan user research](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service), blocs 0–1 sur 2, date de mise à jour affichée 15/10/2026 | Questions, recrutement inclusif, séries, analyse et restitution | Contexte du service public britannique ; effectif et cadence non universels |
| R02 | [GOV.UK Design System — Error message](https://design-system.service.gov.uk/components/error-message/), bloc 0 sur 3 | Quand employer un message de champ, exemples HTML/Nunjucks, conservation des réponses, distinction panne/validation | Exemples à adapter ; non-exécution de tous les composants dans notre étude |
| R03 | [W3C WAI — Forms: Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/), bloc 0 sur 1 | Résumés d’erreurs, association aux champs, notifications et annonces | Tutoriel informatif, pas certification d’une implémentation |
| R04 | [Design Council — The Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/), bloc 0 sur 2 | Découvrir, définir, développer, livrer, avec retours et itérations | Pas une cascade obligatoire ni un organigramme ; visuel original non reproduit |
| R05 | [DTCG — Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/), bloc 0 sur 11 | Statut de rapport final communautaire stable, daté du 28/10/2025 ; format d’échange | Explicitement pas un standard W3C ; pas une validation complète de schéma de nos snippets CSS |
| R06 | [Microsoft Research — Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/), extraction entière lue | Comportement initial, en usage, en cas d’erreur et dans la durée ; provenance et processus de validation des guidelines décrits | Porte sur l’interaction humain–IA ; ne valide pas les cinq fichiers de travail du Playbook |
| R07 | [Google PAIR — People + AI Guidebook](https://pair.withgoogle.com/guidebook/), page d’accueil extraite entièrement lue | Besoins, attentes, explications, contrôle, erreurs ; chapitres, ateliers et applications explicitement hypothétiques | Ni lecture intégrale de tous les chapitres ni preuve empirique de nos exemples ; exemples fictifs ≠ études terrain |
| R08 | [GitHub — Application card: Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents), blocs 0, 2 et 3 sur 7 | Capacités/environnements, supervision, permissions, commandes, omissions, hallucinations et code potentiellement incorrect | Documentation fournisseur ; résultats et risques variables selon surface et configuration ; pas validation du pipeline Playbook |
| R09 | [W3C WAI — Selecting Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/), bloc 0 sur 2 | Les outils assistent l’évaluation ; jugement humain et erreurs possibles | Ne permet pas de certifier un produit à partir d’un scan |
| R10 | [WAI — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), bloc 0 sur 5 ; [Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), bloc 0 sur 3 | Seuils et distinction grand texte ; agrandissement jusqu’à 200 % sans perte | Documents explicatifs des critères ; contrôle isolé d’une paire ou choix des unités insuffisant pour la conformité globale |

Les références juridiques et études cognitives déjà présentes dans le guide UX n’ont pas fait l’objet d’un nouvel audit exhaustif lors de cette étude concurrentielle. Leur présence ne permet pas d’annoncer une consultation juridique ou un nouveau contrôle de conformité.

## 6. Positionnement, piliers et maillage

### 6.1 Audience et promesse soutenable

**Audience prioritaire :** développeurs, personnes construisant avec un agent IA, designers généralistes ou responsables d’une petite équipe qui doivent relier une question produit à un livrable et à sa revue. L’initiation aux disciplines sert de porte d’entrée ; elle ne doit pas absorber toute la collection.

**Proposition de positionnement :**

> Passer d’une question produit à un écran implémenté et vérifiable, en distinguant hypothèses, contrôles techniques et observations de personnes.

Il s’agit d’un choix éditorial à éprouver, pas d’une exclusivité démontrée ni d’une promesse de performance commerciale. L’avantage potentiel réside dans **la continuité de l’exemple, les sorties réutilisables, le bilinguisme et la transparence sur ce qui n’a pas été testé**. Les grands éditeurs sont souvent plus complets sur leur domaine ; les concurrents spécialisés sont parfois déjà très concrets.

### 6.2 Architecture recommandée, sans nouvelle route

```text
/{locale}/articles
  └─ /ux-ui-product-design            [comparatif, point d’entrée transversal]
       ├─ /ux-design-guide            [question, méthode, tâche, audit]
       ├─ /ui-design-system-tokens     [rôle, variable, composant, états]
       └─ /product-design-ai-agents    [brief, permissions, revue, passation]

/{locale}/resources/ui-ux-directory   [choix d’une ressource ; gratuit distinct]
/{locale}                            [présentation du livre payant et de son périmètre]
```

`{locale}` vaut `fr` ou `en`. Ce schéma abrège les chemins des articles sous `/{locale}/articles/` ; il ne propose pas de slugs à la racine.

- **Pôle UX :** besoins/contexte → choix de méthode → protocole → observations → décision. Réutiliser le guide, puis envisager un support autonome de protocole seulement s’il apporte une intention réellement distincte.
- **Pôle UI :** rôle → token/variable → composant → états/thèmes → contrôle du rendu → maintenance. Ne pas ouvrir une page pour chaque variante lexicale de « token ».
- **Pôle Product :** décision et responsabilité → brief → travail assisté → permissions → revue et suivi. Discovery devient un approfondissement de la réduction d’incertitude, pas un synonyme vague du développement.
- **Pont de comparaison :** mêmes décisions examinées sur Atelier, avec liens vers les méthodes et implémentations. Pas de seconde page « UX vs UI vs Product ».

### 6.3 Maillage contextuel mis en place

**Neuf liens dans les articles par langue**, en plus des cartes de lecture déjà présentes :

| Depuis | Vers | Pourquoi à cet endroit |
| --- | --- | --- |
| Comparatif, parcours UX | Guide UX, section tests/audit | Passer de la décision de parcours à la méthode qui peut l’éprouver |
| Comparatif, interface UI | Guide UI, tokens/thèmes | Traduire une décision en variables et en styles de composant |
| Comparatif, passation | Guide Product, vérification | Garder les contrôles et les questions ouverts lors de la livraison |
| Guide UX, introduction | Comparatif, responsabilités | Corriger une lecture trop rigide des métiers |
| Guide UX, fin de l’audit | Guide Product, vérification | Conserver méthode, résultat et trace, sans transformer l’audit en étude utilisateur |
| Guide UI, introduction | Comparatif, interface | Rappeler que l’UI porte aussi les interactions et retours |
| Guide UI, passation | Guide Product, pipeline | Relier spécification et revue d’implémentation |
| Guide Product, introduction | Comparatif, responsabilités | Situer le designer parmi les contributions de l’équipe |
| Guide Product, revue | Guide UX, tests/audit | Revenir aux personnes et à la question de recherche lorsque le scan ne répond pas |

Les index ajoutent un lien de départ vers le comparatif. Les ancres sont propres à chaque langue et le texte explicite le motif de lecture. Ces liens existent aussi dans `/llms-full.txt`, sans prétendre améliorer automatiquement une citation générative.

### 6.4 Éviter cannibalisation et dispersion

- Une intention principale par page existante ; les définitions courtes restent dans les trois guides mais le comparatif porte la comparaison détaillée.
- Ajouter une section lorsqu’un contenu aide la même décision ; créer une page seulement si elle a une tâche, un livrable et une profondeur autonomes.
- Ne pas publier simultanément « guide UX complet », « définition UX », « méthodes UX » et une traduction artificielle visant la même question. Les versions FR/EN doivent servir leurs lecteurs, pas créer des variantes de pays sans adaptation.
- Conserver canonicals, alternances de langue et catalogue commun ; aucune nouvelle variante d’URL n’est nécessaire pour cette passe.
- Les métadonnées, FAQ, données structurées et fichiers textuels doivent refléter les contenus visibles. Un changement cosmétique de date ou un nombre de mots arbitraire ne constitue pas une amélioration éditoriale.

## 7. Carte des opportunités priorisées

**Priorité :** P0 = corriger une confusion ou rendre exploitable une page déjà centrale ; P1 = approfondissement proche avec apport concret ; P2 = entretien ou extension à valider ; P3 = travail exploratoire dépendant d’une démonstration ou d’une recherche plus lourde.

**Effort relatif :** S = passe ciblée de rédaction/relecture ; M = exemple ou modèle avec traduction et vérifications ; L = démonstration complète, intégration ou étude. Il ne s’agit ni d’un coût chiffré, ni d’une difficulté SEO. Les références C/D/R renvoient aux URLs et dates de consultation ci-dessus.

| ID | Sujet et intention | Public | Format | Destination, priorité / effort | État de cette passe |
| --- | --- | --- | --- | --- | --- |
| O01 | Comprendre les responsabilités UX/UI/Product et où commencer | Débutant, développeur, petite équipe | Définitions cohérentes, introduction d’index, cas commun | Comparatif + résumés existants ; **P0 / S** | Réalisé FR/EN |
| O02 | Choisir une méthode pour une décision de recherche | Designer généraliste, responsable produit | Matrice question → activité → limite, mini-protocole | Guide UX existant ; **P0 / M** | Réalisé FR/EN |
| O03 | Relier tokens, variables et composant en deux thèmes | Développeur, designer UI | Snippets CSS/HTML, tableau de rôles, critères d’essai | Guide UI existant ; **P0 / M** | Réalisé FR/EN |
| O04 | Revoir une interface issue d’un agent sans inventer de validation | Développeur avec agent, reviewer | Trois usages IA, tableau de méthodes, fiche vierge de revue | Guide Product existant ; **P0 / M** | Réalisé FR/EN |
| O05 | Conduire un test d’utilisabilité de bout en bout | Équipe débutant une étude | Protocole, tâches, notes, analyse et limites | Support interne, puis décision d’intégration/article autonome ; **P1 / M** | Brouillon FR préparé, non publié |
| O06 | Décider quoi apprendre avant de construire | Product designer, PM, développeur fondateur | Fiche hypothèse → risque → activité → seuil de décision | D’abord section/fiche liée au brief Product ; **P1 / M** | Brief préparatoire ci-dessous, pas de nouvelle page |
| O07 | Rédiger l’erreur et la reprise réelles | Designer, développeur, rédacteur | Cas saisie vs service, comportement et association au champ | Microcopie du guide UI ; **P1 / S** | Ajout ciblé réalisé FR/EN |
| O08 | Interpréter les résultats de paiement sans fausse promesse | Équipe e-commerce | Exemple de mesure et dénominateurs, limites du benchmark | Guide UX, pas un nouveau « checkout ultime » ; **P2 / M** | Couverture existante conservée ; approfondissement différé |
| O09 | Choisir une ressource et documenter ses conditions | Non-designer, développeur, agent supervisé | Fiche de décision appliquée, vérification à date | Répertoire gratuit existant ; **P2 / S** | Pas de nouveau catalogue ni d’audit de licence annoncé |
| O10 | Adapter typographie, contenu long et responsive | Développeur/UI généraliste | Variantes de composants et critères de lecture | Guide UI existant ; **P2 / S** | Déjà largement traité ; enrichir seulement sur difficulté observée |
| O11 | Faire évoluer les tokens sans casser leurs consommateurs | Équipe avec design system | Petit changement versionné, recherche des usages, contre-tests | D’abord exemple dans le guide UI ; **P2 / M** | À préparer après validation du besoin |
| O12 | Concevoir une UI générée à l’exécution avec contrôle utilisateur | Équipe produit IA | Démonstration bornée, permissions et cas d’échec | Nouvelle page seulement si cas autonome ; **P3 / L** | Différé ; pas de publication de tendance seule |

### Justification et valeur originale, opportunité par opportunité

**O01.** Concurrence : [NN/g, glossaire](https://www.nngroup.com/articles/ux-disciplines-glossary/), [Great Learning](https://www.mygreatlearning.com/blog/ui-ux-and-product-design-understand-the-difference/), [Figma](https://www.figma.com/resource-library/what-is-ux-design/). **Valeur :** relier des responsabilités variables aux mêmes écrans Atelier et non à une analogie décorateur/architecte. **Références requises :** glossaire NN/g, Double Diamond (R04), critères techniques du cas. Pas besoin d’une nouvelle définition longue.

**O02.** Concurrence : [NN/g, méthodes](https://www.nngroup.com/articles/which-ux-research-methods/), [La Fabrique du Net](https://www.lafabriquedunet.fr/logiciels/tendances/les-meilleures-techniques-et-methodes-ux), [Lyssna](https://www.lyssna.com/guides/ux-research-guide/). **Valeur :** utiliser un même problème d’export pour montrer ce que chaque activité permet et ne permet pas de conclure. **Références requises :** cartographie Rohrer, GOV.UK (R01), tests NN/g ; conserver Nielsen/Landauer et Faulkner déjà cités sur l’échantillonnage. Une matrice originale n’est pas une nouvelle étude empirique.

**O03.** Concurrence : [Smashing](https://www.smashingmagazine.com/2025/08/automating-design-systems-tips-resources/), [ClaudeCodeLab](https://claudecode-lab.com/fr/blog/claude-code-design-tokens/), [RGAA Checker](https://rgaa-checker.com/blog/design-tokens-accessibilite-contrastes), [Material](https://m3.material.io/foundations/design-tokens/overview). **Valeur :** un consommateur du CSS réellement fourni, vérifiable dans le navigateur dans les deux thèmes, sans abonnement requis. **Références requises :** DTCG (R05), documentation Figma, Material, WCAG/WAI (R10). Distinguer format d’échange, variables et résultat composé.

**O04.** Concurrence : [Pascal Mietlicki](https://blog.pascal-mietlicki.fr/code-genere-ia-accessibilite-wcag-tests/), [UX Collective](https://uxdesign.cc/human-machine-responsible-ai-workflows-for-ux-research-22a5c39ac0ec), [NN/g, utilisateurs synthétiques](https://www.nngroup.com/articles/synthetic-users/). **Valeur :** une fiche où environnement, attendu, observé, trace et contre-test sont séparés et initialement vides ; pas de note globale trompeuse. **Références requises :** WAI (R09), GitHub (R08), NN/g ; HAX/PAIR (R06–R07) pour l’interaction avec un produit IA, pas pour certifier notre organisation de fichiers.

**O05.** Concurrence : [Userlynx](https://www.userlynx.com/protocole-test-utilisateur/), [NN/g, Usability Testing 101](https://www.nngroup.com/articles/usability-testing-101/), [Lyssna](https://www.lyssna.com/guides/ux-research-guide/). **Valeur :** jeu fictif explicitement à préparer, tâches neutres, reprise après erreur, critères de sortie, aide consignée, notes séparées des interprétations et plan de conservation des données. **Références requises :** R01, NN/g, R09 ; relecture recherche et protection des données avant mise en œuvre. Le support complet justifie une préparation, pas encore une URL publique supplémentaire.

**O06.** Concurrence : [Thiga](https://www.media.thiga.co/en/how-to-industrialize-product-discovery), [Glasgow](https://blog.glasgow.works/blog/product-discovery/), [Design Council](https://www.designcouncil.org.uk/resources/the-double-diamond/). **Valeur :** limiter une décision de petite équipe, expliciter le risque et le constat qui ferait changer d’avis. **Références requises :** R01, R04, méthodes NN/g ; vérifier les références originales avant d’attribuer un canvas à un auteur. La discovery ne doit pas devenir une nouvelle liste rituelle d’ateliers.

**O07.** Concurrence : [A List Apart](https://alistapart.com/article/standards-for-writing-accessibly/), [Pascal Mietlicki](https://blog.pascal-mietlicki.fr/code-genere-ia-accessibilite-wcag-tests/). **Valeur :** montrer la différence entre correction d’un champ et indisponibilité du service, avec conservation des informations et action réellement disponible. **Références requises :** GOV.UK Error message (R02), WAI notifications (R03). Ne pas proposer « Réessayer » si le système ne sait pas reprendre sans risque.

**O08.** Concurrence : [Baymard, checkout](https://baymard.com/research-articles/current-state-of-checkout-ux), [Baymard, abandon](https://baymard.com/blog/cart-abandonment-rate). **Valeur :** une mesure propre au parcours et ses limites plutôt qu’une statistique globale transformée en recette. **Références requises :** méthodologie originale des données utilisées, définition des événements/dénominateurs et plan d’analyse. Un exemple de calcul fictif doit être étiqueté ; un gain réel demande des observations propres.

**O09.** Concurrence : [Brad Traversy](https://github.com/bradtraversy/design-resources-for-developers), [Dan Levy](https://danlevy.net/amazing-resources/). **Valeur :** sélection contextualisée pour trois profils et conservation d’une trace de vérification des conditions. **Références requises :** conditions officielles à jour de chaque ressource examinée ; un répertoire tiers ou une capture ne les remplace pas. Préserver le périmètre de 51 fiches / six familles / onze références tant qu’une modification du catalogue n’est pas justifiée.

**O10.** Concurrence : [Refactoring UI](https://refactoringui.com/), [Practical UI](https://www.practical-ui.com/). **Valeur :** variantes réelles FR/EN, nombres, contenus longs, largeurs intermédiaires et clavier, avec limites de l’exemple. **Références requises :** WCAG/WAI selon le critère et documentation des fonctionnalités typographiques utilisées. Aucun motif de réécrire une introduction générale déjà présente.

**O11.** Concurrence : [ROSSUL](https://www.rossul.com/2026/blog/design-system-components-tokens/), [Smashing](https://www.smashingmagazine.com/2025/08/automating-design-systems-tips-resources/). **Valeur :** montrer un changement, ses consommateurs, une suppression/dépréciation et les contre-tests plutôt qu’un schéma de gouvernance abstrait. **Références requises :** R05, documentation versionnée du transformateur retenu et CI effectivement exécutée. La centralisation existante ne doit pas être présentée comme une absence de gouvernance totale.

**O12.** Concurrence : [NN/g, Generative UI](https://www.nngroup.com/articles/generative-ui/), [Usabilis](https://usabilis.com/interface-generative-gen-ui/). **Valeur éventuelle :** un scénario d’exécution réellement borné, erreurs, arrêt et annulation explicités. **Références requises :** HAX/PAIR, documentation de la surface choisie, modèle de permissions et observations du cas. Sans cela, conserver une clarification dans le guide Product plutôt qu’un article prospectif supplémentaire.

## 8. Contenus complémentaires : préparer ou différer

### 8.1 Priorité préparée : protocole de test, non publié

Fichier : [`docs/drafts/USABILITY_TEST_PROTOCOL_FR.md`](drafts/USABILITY_TEST_PROTOCOL_FR.md).

- Question et décision, hypothèses falsifiables, recrutement, besoins d’accès, effectif à justifier.
- Information des participants, autorisation d’enregistrer, conservation, séparation des coordonnées et des notes, absence de données clients réelles.
- Prototype et jeu de démonstration à figer ; prétest explicitement non exécuté.
- Consignes d’export et de reprise sans indiquer le contrôle à utiliser ; critère de sortie, relances neutres et aide consignée.
- Grille vierge, distinction observation / parole recueillie / interprétation, fiche de problème et limites de restitution.
- Conditions de publication : relecture compétente, prétest, cohérence de l’exemple, version EN et décision qu’une section du guide ne suffit plus.

**Aucune session, citation de participant, fréquence ou preuve de succès n’est inventée.** L’exemple reste hypothétique ; le bouton CSS isolé ne simule pas tout ce parcours. Le brouillon n’est importé ni dans le catalogue, ni dans le sitemap, ni dans les endpoints textuels ou les téléchargements publics.

### 8.2 Brief de prochain support : décider quoi apprendre

Avant toute nouvelle page Discovery, préparer une fiche de travail contenant :

| Champ | Consigne de rédaction |
| --- | --- |
| Décision | Décrire un choix concret et son responsable ; ne pas confondre une roadmap complète avec la question de cette semaine |
| Hypothèse | Écrire ce qui est supposé vrai sur le besoin, l’usage ou la faisabilité |
| Risque | Décrire la conséquence si cette supposition est fausse ; distinguer un coût réversible d’une action engageante |
| Information manquante | Dire quelle observation peut réellement changer la décision |
| Activité | Choisir entretien, observation, test, essai technique ou mesure selon cette information |
| Critère de décision | Définir à l’avance comment la suite sera arbitrée, sans convertir un jugement qualitatif en seuil statistique arbitraire |
| Résultat | Laisser vide avant recueil ; séparer donnée, interprétation et décision |
| Suite | Attribution, correction, nouvel essai ou arrêt |

**Ancrage :** guide Product, section du brief. **Sources de travail :** Thiga, Glasgow, R01/R04 et carte de méthodes NN/g, consultés le 18/11/2026. **Différenciation :** une seule décision et un livrable utilisable par une petite équipe. Ce brief dans le rapport n’est pas une étude réalisée ni un article déjà prêt à publier.

### 8.3 Travaux à ne pas lancer automatiquement

- Un guide encyclopédique UX supplémentaire ; des pages presque identiques sur chaque métier ; un calendrier de dizaines d’articles générés.
- Une promesse de conformité, de réussite d’un paiement ou de gain de conversion basée uniquement sur une checklist ou les chiffres d’un tiers.
- Un tutoriel d’intégration propriétaire non exécuté, un comparatif de prix non vérifiés ou une liste de ressources dont les licences seraient supposées.
- Une page « être cité par ChatGPT » présentée comme un mécanisme garanti ; les observations directes nécessaires ne sont pas disponibles.
- Un guide GenUI autonome sans exemple à l’exécution, ou l’usage d’agents simulés pour fabriquer les preuves manquantes.

## 9. Modifications effectivement réalisées

### 9.1 Contenu public, toujours dans les routes existantes

| Emplacement | Changement | Justification et garde-fous |
| --- | --- | --- |
| Trois guides FR/EN | Définitions, résumés et métadonnées ciblés ; distinction UI/interactions et Product/PM ; terme DTCG corrigé dans les mots-clés internes | Alignement avec le comparatif et C01 ; pas de nouvelle autorité professionnelle inventée |
| Guide UX, tests/audit | Matrice de six questions, séparation des axes de méthodes, quatre étapes de mini-protocole, attention aux données et profils simulés | C01/R01 ; les mises en garde sur cinq participants et la checklist existaient et sont conservées |
| Guide UI, tokens/thèmes | Tableau de rôles clair/sombre, vrai bouton HTML/CSS consommant le fichier de tokens, focus et états à contrôler ; liens Material/Figma | C04/C07/C08/R05/R10 ; CSS ≠ fichier DTCG ; le bouton n’effectue aucun export |
| Guide UI, microcopie | Saisie incorrecte vs panne du service, association et notification | R02/R03 ; pas de nouvelle promesse d’accessibilité globale |
| Guide Product | Trois objets IA ; périmètre original du workflow à cinq fichiers ; tableau des méthodes et fiche YAML à intégrer dans `review.md` | C01/C06/D12/R08/R09 ; `non_execute` / `not_run`, observation et preuve à `null` |
| Comparatif et guides | Neuf liens contextuels par langue, vers des sections existantes | Lecture guidée sans multiplication de pages ; les cartes de fin ne sont pas supprimées |
| Index FR/EN | H1 et description explicites, introduction resserrée, départ vers le comparatif ; titres de cartes H2 | Orientation plus précise et hiérarchie sans saut H1 → H3 |

Bibliographies par langue : **UX 11 → 15 ; UI 4 → 8 ; Product 4 → 9 ; comparatif 6 → 6**, soit treize entrées ajoutées par langue, et non treize sources uniques nouvelles sur le Web. Les appels numérotés existants ne sont pas décalés. Les paragraphes d’explication illustrés existants sont conservés ; les ajouts sont ciblés.

Les temps de lecture restent indicatifs et ont été ajustés aux ajouts ; ils ne mesurent pas le temps de mise en pratique. Les visuels sociaux des articles concernés sont régénérés depuis les mêmes données. Les dates d’édition ne sont pas artificiellement avancées pour donner une impression de fraîcheur.

### 9.2 Implémentation et contrôles de cohérence

- Nouveau bloc typé `readingLink`, rendu dans le lecteur et sérialisé dans `/llms-full.txt` ; générateur commun d’URL conservant la langue et encodant le fragment.
- Styles de lecture contextuelle ; liens autonomes d’au moins 44 px de hauteur selon le choix du site, sans présenter ce choix comme le minimum WCAG universel.
- Tests de contenu : catalogue inchangé, cibles et ancres réelles, références numérotées, garde-fous existants, statut des modèles et équivalence textuelle.
- Tests navigateur : orientation d’index, parcours de liens, copie du modèle et exécution des snippets réellement présents dans l’article, avec vérification des couleurs attendues par thème/état.
- Les nouveaux tests de contenu sont intégrés aux deux workflows de vérification existants. Il s’agit de contrôles CI, pas d’une action de déploiement.
- Suppression d’un commentaire technique présentant le résumé comme une cible de Featured Snippet / AI Overview : une structure de résumé n’offre aucune garantie d’inclusion.

### 9.3 Préservation des travaux et périmètres voisins

Les travaux précédents du répertoire anglais et de l’outillage Microlink sont conservés. Les 51 fiches, six catégories, onze références et distinctions gratuit/payant ne sont pas refondus par cette mission. Aucun fichier du livre payant n’est modifié, aucun pack tiers n’est redistribué et aucune publication Gumroad n’est effectuée.

Les captures Microlink restent un chantier séparé : **aucune capture réelle ou approbation nouvelle n’est obtenue par cette étude**. Une illustration de concurrent présente dans une extraction de texte n’est pas une capture livrable. Aucun appel à Vercel ni changement d’hébergement n’est effectué.

## 10. Visibilité Google et moteurs IA

### 10.1 Tableau de ce qui est et n’est pas observé

| Canal | Observation directe de cette session | Conclusion permise |
| --- | --- | --- |
| Outil de recherche Web | Pages découvertes par questions FR/EN, puis texte de plusieurs pages lu | Corpus pertinent à comparer ; pas un classement Google vérifié |
| Google Search | Tentative directe, consentement/vérification, pas de SERP exploitable | Position, extrait affiché et présence d’un AI Overview inconnus |
| Google AI Overviews / AI Mode | Aucune réponse avec citations directement examinée | Aucune citation observée dans ce protocole ; présence réelle inconnue |
| ChatGPT | Aucune réponse de l’interface avec citations directement examinée | Citations et visibilité inconnues ; la documentation de bots n’y répond pas |
| Claude | Aucune réponse de l’interface avec citations directement examinée | Citations et visibilité inconnues |
| Perplexity | Aucune réponse de l’interface avec citations directement examinée | Citations et visibilité inconnues |

« Aucune citation observée » n’est **pas** « aucun moteur ne cite ce site ». Les interfaces non testées ne constituent pas un test négatif. La connaissance générale d’un éditeur ou sa présence dans un résultat de recherche ne prouve pas une citation par un système génératif.

### 10.2 Documentation officielle examinée, distincte d’une étude de citations

**Consultation : 18/11/2026.**

- [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), deux blocs extraits lus, dernière mise à jour affichée 10/12/2025 : principes SEO habituels, éligibilité à l’indexation/extrait, aucun fichier ou schéma spécial requis pour ces fonctionnalités ; données intégrées au type Web de Search Console. L’éligibilité ne garantit pas l’affichage.
- [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), blocs 0–1 sur 4 : utilité, apport original, provenance et auteurs ; pas de longueur préférée imposée ni de simple changement de date pour simuler une actualisation.
- [OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots), bloc 0 sur 2 : distinguer OAI-SearchBot et GPTBot, recherche et entraînement, contrôles indépendants. Cette documentation ne montre aucune réponse ChatGPT citant un concurrent.
- [Anthropic — Web crawling and crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), extraction lue : ClaudeBot, Claude-SearchBot et Claude-User ont des finalités distinctes. Autorisation d’exploration ≠ présence dans une réponse.
- [Perplexity — Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), bloc 0 sur 8 : distinguer bot de recherche et récupération à la demande ; recommandations de contrôle réseau documentées, sans modification de notre hébergement.

Un passage de robot, une indexation, un clic référent et une **citation affichée** sont quatre événements différents. `/llms.txt` et `/llms-full.txt` sont déjà des supports du site ; leur présence n’est pas un résultat mesuré de visibilité et ne remplace ni le contenu HTML ni la vérification d’indexation. Aucun nouveau fichier « spécial IA », schéma ou changement de robots n’est ajouté dans l’espoir d’une citation garantie.

### 10.3 Protocole de mesure ultérieur, sans promesse de résultat

1. **Établir un état avant changement publié.** Avec l’accès autorisé aux données du propriétaire : URLs indexées, impressions/clics par requête-page-langue-pays, périodes et éventuels problèmes techniques. Ne pas inventer un état zéro si ces données manquent.
2. **Garder un petit échantillon stable de questions.** Définitions comparées, choix d’une méthode, tokens/deux thèmes, contrôle d’une interface IA et ressource/licence. Les adapter en français et anglais pour le sens, sans les considérer comme des doublons parfaits.
3. **Observer les résultats réels.** Noter date/heure, pays réellement utilisé, langue, appareil, compte ou absence de connexion, moteur, mode et question exacte. Conserver capture et URL de résultat lorsque permis. Ne pas contourner les contrôles d’accès ni supposer une localisation à partir de la langue seule.
4. **Pour une réponse IA, relever chaque citation affichée.** URL exacte, passage soutenu et correspondance réelle entre l’affirmation et la source. Une réponse sans navigation ne prouve pas la même chose qu’une recherche activée. Répéter sur plusieurs jours et qualifier la variabilité ; ne pas transformer un petit échantillon de prompts en « part de marché IA ».
5. **Mesurer l’usage du contenu utile.** Parcours vers un exemple, copie d’un modèle, lecture du comparatif, passage au répertoire ou à l’offre, dans le respect des choix de confidentialité. Un clic ou une copie ne démontre pas l’apprentissage. N’ajouter une instrumentation qu’après décision et information adaptées.
6. **Décider d’une extension sur observations convergentes.** Questions des lecteurs, difficulté précise, requêtes pertinentes et besoin de livrable peuvent justifier O05/O06/O11. Aucun objectif de trafic chiffré ni effet causal n’est fixé sans référence de départ et protocole approprié.

La contribution de cette passe est éditoriale et technique. Aucun résultat de référencement ou commercial après mise en ligne ne peut être attribué à des changements qui n’ont pas été déployés.

## 11. Vérifications et suites

### 11.1 Contrôles de cette révision

Contrôles **réexécutés sur les sources enrichies**, avec Node 22 et l’export servi par Pages en local sur le port 3100. Les résultats antérieurs du répertoire ne sont pas utilisés comme validation de cette passe.

| Contrôle | Résultat effectif |
| --- | --- |
| `npm run test:content` | **21/21** : catalogue, liens/ancres, références, explications préservées, statut des modèles et brouillon interne |
| `npm run typecheck` | Réussi |
| `npm run test:routing` | **34/34** |
| `npm run check:resource` | **48/48**, hors réseau : intégrité des deux kits et garde-fous de captures préservés |
| `npm run build` | Réussi, **21 sorties statiques** générées |
| `npm run check:export` | **259/259** |
| `python3 scripts/site_check.py --base-url http://127.0.0.1:3100 --expected-origin https://joyccelight-playbook.pages.dev` | **746 contrôles automatisés**, zéro échec bloquant ; **4 à vérifier, 1 non applicable** restent distincts |
| `npm run test:ui` avec le Chromium disponible | **57/57**, zéro ignoré et zéro instable ; dont quatre nouveaux scénarios sur l’orientation, les liens, la copie et les snippets des articles |
| `git diff --check` | Réussi |

Les scénarios navigateur existants couvrent les pages FR/EN, les deux thèmes, le responsive, le clavier, les simulations et axe ; leur réussite ne certifie pas l’accessibilité. L’inspection visuelle locale a également porté sur les nouveaux index à 320 px, une fixture du composant et le visuel social UX français. Elle ne constitue pas une inspection visuelle exhaustive des concurrents.

**Exemple réellement exécuté :** les snippets CSS et HTML du guide UI sont chargés ensemble dans une fixture Chromium, pour chaque langue, aux largeurs 1280 et 320 px. Les couleurs attendues sont vérifiées avant la mesure, afin de ne pas lire l’état précédent pendant une transition. Dans cette fixture opaque et isolée, les ratios texte/fond calculés sont :

| Thème | Repos | Survol |
| --- | ---: | ---: |
| Clair : texte `#FFFFFF` | `#C2320A` : **5,59:1** | `#A62806` : **7,17:1** |
| Sombre : texte `#0B0D12` | `#FF6B47` : **6,89:1** | `#FF8566` : **8,14:1** |

Les valeurs sont arrondies ici pour lecture ; les assertions utilisent les valeurs non arrondies. Le test examine aussi le focus visible de 3 px, la hauteur minimale du bouton, l’absence de débordement et l’agrandissement du texte à 200 % dans la fixture. **Ce n’est ni un audit complet des états d’un produit, ni un test d’usage, ni une validation d’export de factures.**

Artefacts locaux régénérables, ignorés par Git : `reports/static-export-check.json`, `reports/site-check.json`, `reports/browser-check.json`, `reports/competitive-token-example-check.json`, captures `reports/editorial-*.png`, traces Playwright et `out/`. Les horodatages techniques bruts sont conservés tels quels dans les rapports ; la date éditoriale de référence de ce document reste celle indiquée en tête. Aucune preuve de déploiement ou de résultat SEO n’en est déduite.

### 11.2 Limites qui subsistent

- Les pages externes sont changeantes ; leur extraction, parfois partielle, n’est pas une archive visuelle complète. Ni les livres complets ni les ressources payantes n’ont été achetés/audités.
- Les exemples HTML/CSS et contrôles de rendu sont bornés à leur environnement ; ils ne mesurent pas la compréhension, l’accessibilité complète d’un parcours ou l’efficacité commerciale.
- Les études réelles avec participants, leur consentement et leur analyse restent à réaliser. Les modèles volontairement vierges ne doivent pas être présentés comme des résultats.
- La date de référence du rapport et une date affichée par une page sont différentes ; les anomalies de date sont signalées, sans en tirer de conclusion de fraîcheur.
- La pertinence des pages et les hypothèses de positionnement ne sont pas une mesure de visibilité. Aucun classement, volume ou citation générative n’est inventé.

### 11.3 Ordre de suite recommandé

1. Relire les ajouts FR/EN et les sources associées ; recueillir les incompréhensions réelles de lecteurs plutôt que rallonger les textes par défaut.
2. Faire relire et prétester le protocole interne, puis décider s’il reste une fiche ou devient un article autonome traduit.
3. Éprouver la fiche Discovery sur une vraie décision de l’équipe, sans publier de données confidentielles ni inventer de résultats.
4. Entretenir le petit exemple tokens/composant et ses contrôles ; étendre à la gouvernance seulement en présence d’un besoin distinct.
5. Mesurer la visibilité par le protocole ci-dessus après une publication explicitement décidée. **Aucune publication ou action d’hébergement n’est incluse dans cette remise.**
