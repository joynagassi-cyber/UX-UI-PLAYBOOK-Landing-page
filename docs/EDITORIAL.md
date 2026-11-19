# Relecture éditoriale FR/EN

## Périmètre

Les pages d’offre, les deux index et les six articles sont relus ensemble, y compris les titres, les légendes, les FAQ, les modèles à copier et les métadonnées. Les textes des endpoints LLM proviennent des mêmes données que les articles. Les fichiers du produit et les pages du livre présentées en images ne sont pas modifiés par cette réécriture ; les listes de sujets du site ne prétendent pas renommer les chapitres du PDF.

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

## Contrôles et limites

`CONTENT07` mesure la longueur de la prose rendue et vérifie qu’une explication n’a pas été remplacée par des fragments. `COPY03` et Playwright protègent contre le retour d’une sélection de slogans retirés. Ce sont des tests de non-régression, pas un jugement automatisé de qualité littéraire.

La relecture éditoriale et l’inspection du rendu complètent ces contrôles. La compréhension et le confort de lecture avec des lecteurs FR/EN restent à observer ; les mesures de longueur ne les prouvent pas. Les temps de lecture affichés sont des estimations calculées à partir du contenu, sur une base de 200 mots par minute, code et modèles compris. Ils ne mesurent ni le temps de mise en pratique ni celui d’un audit.
