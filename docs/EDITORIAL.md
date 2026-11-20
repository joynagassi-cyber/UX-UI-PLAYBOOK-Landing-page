# Relecture éditoriale FR/EN

## Périmètre

Les pages d’offre, les deux index et les huit articles FR/EN sont traités dans le même système éditorial, y compris les titres, les légendes, les FAQ, les modèles à copier et les métadonnées. Cette passe conserve les trois articles initiaux et ajoute le comparatif UX/UI/Product dans les deux langues. Les textes des endpoints LLM proviennent des mêmes données que les articles. Les fichiers du produit et les pages du livre présentées en images ne sont pas modifiés par cette réécriture ; les listes de sujets du site ne prétendent pas renommer les chapitres du PDF.

La consigne actuelle demande des **paragraphes longs et développés**. Un passage doit expliquer le raisonnement, le cas d’usage et les conséquences d’une décision. Les listes conservent leur utilité pour les procédures et les critères de revue ; elles ne remplacent pas l’explication. Les tailles de paragraphes peuvent varier selon le sujet. Les exemples plus longs portent notamment sur les transitions d’état, les informations à mémoriser, les tokens et les permissions d’un agent.

## Méthode de réécriture

- Remplacer une ouverture vague par la tâche ou la décision à examiner. Nommer les informations et les comportements concernés.
- Retirer les superlatifs sans mesure, les promesses de résultat commercial et les oppositions qui ne servent qu’à produire un slogan.
- Examiner les structures répétées et les transitions sans apport. Ne pas interdire automatiquement une ponctuation, un mot courant ou une liste de trois éléments.
- Développer les explications avec des exemples présentés comme tels. Ne pas inventer d’expérience personnelle, de citation, de statistique ou de résultat de test.
- Relier les recommandations aux conditions de leur emploi. Conserver les différences entre résultat de recherche, choix de projet et obligation juridique.
- Donner aux modèles copiables des instructions observables, des entrées et des sorties identifiables. Un contrôle demandé dans un prompt n’est pas un contrôle exécuté.
- Relire les deux langues pour le sens, sans imposer à l’anglais le rythme de la phrase française.

## Repères consultés pour cette passe

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) : conseils du WikiProject AI Cleanup, pas une politique officielle ni un test d’origine. Repères de relecture : emphase injustifiée, promotion, oppositions artificielles, structures mécaniques et analyses superficielles.
- [ETBI Library — Signs of AI Writing](https://library.etbi.ie/cs/sources2/aisigns) : guide de bibliothèque sur les ouvertures génériques, répétitions, transitions et conclusions redondantes. Ces traits peuvent aussi apparaître dans des textes humains.
- [Contenax — Reconnaître un texte généré par IA](https://contenax.com/blog/reconnaitre-un-texte-genere-par-ia/) : article éditorial commercial en français, pas une étude de détection. Les exemples de fausses antithèses et de superlatifs servent à examiner le contenu, sans fabriquer de faits pour le rendre plus personnel.

Ces ressources concernent le style. Elles ne remplacent pas les références primaires des articles et ne permettent pas d’affirmer qu’un texte provient d’une IA. Aucun détecteur ni skill supplémentaire n’est installé pour cette passe.

## Comparatif UX, UI et Product Design

Le nouvel article `ux-ui-product-design` suit une même application mobile fictive, **Atelier**, pour distinguer les décisions plutôt que d’attribuer un écran entier à chaque profession. Le prototype comporte trois écrans et neuf annotations : les regards Product, UX et UI peuvent être comparés sans changer la prestation ou le créneau. Une confirmation et un refus de disponibilité sont simulés localement. Le prix, les horaires, l’adresse et la prestation sont explicitement fictifs ; aucun participant, atelier réel ou résultat de conversion n’est inventé.

Sources primaires et professionnelles effectivement consultées pour ce contenu :

- [Norman et Nielsen — The Definition of User Experience](https://www.nngroup.com/articles/definition-user-experience/) : expérience au-delà de l’interface ; l’UX n’est pas réduite à l’utilisabilité.
- [Raluca Budiu — UX Disciplines: Glossary](https://www.nngroup.com/articles/ux-disciplines-glossary/) : UI et interaction, Product Design numérique, distinction du Product Management et variabilité des intitulés. La date de publication indiquée par la page est le 23 octobre 2026.
- [GOV.UK — What each role does in a service team](https://www.gov.uk/service-manual/the-team/what-each-role-does-in-service-team) : responsabilités multidisciplinaires dans un contexte de service public britannique, sans en faire un organigramme universel.
- [Design Council — The Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/) : découverte, définition, développement, livraison et retours au problème. Les deux synthèses de l’article sont originales, pas des reproductions du visuel du Design Council.
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) et [Understanding Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) : distinguer le minimum AA de 24 × 24 pixels CSS et ses exceptions du critère renforcé de 44 × 44. Le site choisit des contrôles d’au moins 44 px ; il ne présente pas ce choix comme la définition du minimum AA.
- [Kate Moran — Usability (User) Testing 101](https://www.nngroup.com/articles/usability-testing-101/) : tâches réalistes, observation sans guider les commandes, limites d’un prototype. La page mentionne une révision au 15 juillet 2026 ; aucune session utilisateur n’a été menée pour Atelier.

Les appels numérotés dans la prose renvoient à six entrées de bibliographie par langue ; le document explicatif W3C sur les cibles a servi à préciser le critère normatif. Les annotations, la grille de contributions et le contrat de revue restent des propositions pédagogiques du Playbook, pas des citations de processus imposés par ces sources. Le corpus `/llms-full.txt` inclut aussi les annotations et états non sélectionnés à l’écran.

## Contrôles et limites

`CONTENT07` mesure la longueur de la prose rendue et vérifie qu’une explication n’a pas été remplacée par des fragments. `COPY03` et Playwright protègent contre le retour d’une sélection de slogans retirés. Ce sont des tests de non-régression, pas un jugement automatisé de qualité littéraire.

La relecture éditoriale et l’inspection du rendu complètent ces contrôles. La compréhension et le confort de lecture avec des lecteurs FR/EN restent à observer ; les mesures de longueur ne les prouvent pas. Les temps de lecture affichés sont des estimations éditoriales ajustées au volume de contenu, avec un repère d’environ 200 mots par minute, code et modèles compris. Ils ne mesurent ni le temps de mise en pratique ni celui d’un audit.

## Veille concurrentielle et consolidation des guides

Le [rapport de stratégie concurrentielle](COMPETITIVE_CONTENT_STRATEGY.md), daté du 18 novembre 2026 comme référence éditoriale, documente les pages effectivement examinées, la profondeur de lecture et les limites. Les recherches thématiques ne sont pas présentées comme des positions Google ; aucune citation par Google AI Overviews, ChatGPT, Claude ou Perplexity n’a été directement observée dans ce protocole.

Les définitions des trois guides sont alignées avec le comparatif : l’UI porte aussi les interactions et leurs retours ; le Product Design collabore avec le product management, la recherche et l’ingénierie. La matrice de méthodes et le mini-protocole UX complètent les précautions de recherche et d’échantillonnage déjà présentes. Le guide UI conserve son CSS et la nuance sur le statut DTCG, puis ajoute un consommateur HTML et ses vérifications. Le guide Product identifie le workflow à cinq fichiers comme une proposition du Playbook, sépare trois usages IA et fournit une fiche de revue volontairement non exécutée. Les références ajoutées étayent ces points sans valider à leur place une méthode originale.

Les quatre articles par langue et leurs explications illustrées sont conservés. Neuf liens contextuels par langue relient les décisions aux autres guides ; les cartes de fin restent disponibles. Le nouveau bloc `readingLink` est rendu en HTML et dans `/llms-full.txt`. Les index sont mieux titrés, sans renommer le libellé de navigation « Article ». Le [protocole détaillé](drafts/USABILITY_TEST_PROTOCOL_FR.md) reste un brouillon interne français, non importé dans le catalogue ou les fichiers publics. Aucun résultat utilisateur n’est simulé comme une observation réelle et aucune nouvelle URL publique n’est créée.

`test:content` protège les cibles, les références et ces limites ; les tests navigateur chargent les snippets réels de tokens/composant et vérifient les états attendus avant mesure. Ces tests ne déterminent ni la compréhension des lecteurs, ni un résultat commercial, ni une conformité complète. Aucun déploiement n’accompagne cette passe.

## Répertoire gratuit : traduction anglaise et aperçus demandés

L’édition anglaise traduit les **51 fiches**, leurs descriptions, les trois usages par profil, les vigilances, les six familles et les onze références. Les IDs et les **75 URLs** sont conservés. La date d’édition reste celle de la source française, le 18 novembre 2026 : la traduction ne prétend pas à une nouvelle vérification exhaustive des sites ou licences. Guide, fiche, grille, visuels et documents Gumroad sont anglais ; chaque page du site fournit désormais les fichiers de sa langue.

La demande suivante porte sur des captures Microlink cliquables. **Elles ne sont pas encore obtenues.** L’outillage sépare une image de site, ses conditions de diffusion et le droit de réutiliser les ressources montrées. Les légendes préparées parlent de date d’obtention, car l’API peut renvoyer une image en cache. Une réponse API réussie ne vaut pas revue visuelle ; connexion, CAPTCHA et pages d’erreur ne doivent pas être validés comme aperçus. Aucun contournement automatique, scraping de packs, proxy ou transmission de clé à un site tiers n’est ajouté. Les tests de mise en page utilisent des fixtures explicitement distinctes des livrables ; aucune n’est installée comme vraie capture.
