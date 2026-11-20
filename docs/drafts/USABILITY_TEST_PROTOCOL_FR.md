# Préparer un test d’utilisabilité : protocole pour un export de factures

> **BROUILLON INTERNE — NON PUBLIÉ** · Version de travail du 18 novembre 2026.
> Support original du Playbook à relire et à prétester. **Aucune session n’a été menée, aucun participant n’a été recruté et aucun résultat utilisateur n’est présenté.** Ce document n’est ni un article du site, ni une pièce ajoutée au produit payant ou au répertoire gratuit.

## 1. Décision à éclairer

**Situation fictive.** Une application de gestion permet de préparer un export de factures pour la comptabilité. Le prototype et les données décrits ici sont à construire ou à adapter ; le bouton CSS du guide UI ne réalise pas cette fonction.

**Question principale :** une personne qui prépare réellement ce travail peut-elle sélectionner les bons documents, comprendre ce qui sera exporté et récupérer après un échec, sans consigne sur les commandes ?

**Décision envisagée :** modifier, conserver ou retirer l’organisation des filtres et les messages de préparation/reprise. Un parcours réussi dans un prototype ne validerait ni la demande commerciale ni la fiabilité du téléchargement en production.

Avant de recruter, compléter :

| Champ | À renseigner par l’équipe |
| --- | --- |
| Responsable de la recherche et contact participant | À attribuer |
| Décision, échéance et personnes qui l’arbitrent | À préciser |
| Révision du prototype et périmètre fonctionnel | À figer |
| Groupes de personnes concernés, contextes et besoins d’accès | À définir à partir de la tâche réelle |
| Hypothèse que l’on cherche à contredire | À écrire |
| Risque si la décision est erronée | À examiner |
| Moyens de recrutement, adaptations et compensation | À prévoir |
| Questions hors périmètre | À énumérer |

### Hypothèses de préparation, pas conclusions

- Le filtre de période peut être pris pour une date de paiement plutôt qu’une date d’émission.
- Le nom du fichier pourrait ne pas suffire pour connaître les documents inclus.
- Après un échec, une personne pourrait recommencer la sélection alors qu’elle a été conservée.

Ces propositions orientent des observations possibles. Elles ne doivent pas être annoncées comme des comportements déjà constatés ni être soufflées dans la consigne. Une idée générée par IA peut être ajoutée à cette liste avec son origine ; elle ne devient pas une donnée de recherche.

## 2. Pourquoi cette méthode, et ce qu’elle ne mesure pas

Un test d’utilisabilité permet d’observer l’interaction avec une proposition de produit. Un entretien sur un cas récent et, si possible, une observation du travail actuel éclairent plutôt les pratiques, les documents et les contraintes en amont. Des événements instrumentés peuvent ensuite décrire la fréquence d’une étape, sans expliquer à eux seuls les raisons d’un arrêt. La cartographie NN/g distingue ces dimensions ; le plan GOV.UK commence par les questions et les personnes concernées. [1] [2]

Le protocole ci-dessous vise une exploration qualitative. **Il ne fournit pas un taux de réussite représentatif ni une comparaison causale entre versions.** Pour mesurer un effet, prévoir séparément les variables, l’estimand, les critères de réussite, le recrutement, le calcul d’effectif et l’analyse d’incertitude ; faire revoir ce plan par une personne compétente avant le recueil.

Une inspection technique des labels, du clavier et des erreurs complète l’étude. Elle n’est pas une session utilisateur. Inversement, quelques sessions sans difficulté ne certifient pas l’accessibilité. Les outils automatiques ne peuvent pas tout évaluer. [3] [4]

## 3. Recrutement et dimensionnement

Rechercher des personnes qui préparent ou transmettent des factures dans un contexte pertinent. Ne pas substituer automatiquement des collègues designers ou des profils IA à cette population.

### Questions de sélection à adapter

1. Au cours de quelle activité avez-vous récemment préparé des documents pour la comptabilité ?
2. Quel était votre rôle dans cette préparation ? Quels documents aviez-vous à remettre ?
3. Quels outils et appareils utilisez-vous habituellement pour cette activité ?
4. Quelles adaptations permettraient de participer dans de bonnes conditions ? Cette question doit rester facultative et ne pas imposer de révéler un diagnostic médical.
5. Avez-vous participé à la conception de cette interface ou déjà vu ce prototype ?

Décrire les variations qui peuvent changer la tâche : fréquence d’usage, délégation à un comptable, langue, appareil, connexion, technologie d’assistance. Ne pas multiplier les catégories démographiques sans lien avec la question.

**Effectif : à décider et à justifier.** Prévoir des séries permettant une correction puis un nouvel essai ; allouer les places selon les tâches, groupes pertinents et risques. Le nombre cinq n’est pas une garantie de couverture. Si le recrutement réel diffère du plan, le noter et restreindre les conclusions. Ne pas additionner artificiellement des groupes hétérogènes pour produire un pourcentage global.

## 4. Information, autorisations et gestion des données

À faire valider selon l’organisation et le droit applicable : ce document ne constitue pas une notice juridique prête à l’emploi.

- Expliquer l’objectif, la durée indicative, les activités proposées, la compensation éventuelle, le caractère volontaire et la possibilité d’arrêter sans avoir à justifier sa décision.
- Distinguer l’accord pour participer de l’autorisation d’enregistrer le son, l’écran ou la vidéo. Une absence d’enregistrement peut être compatible avec des notes si cela est prévu.
- Indiquer qui accède aux données, où elles sont conservées, pour quelle durée, comment demander des informations et quelles limites s’appliquent à un éventuel retrait après anonymisation.
- Utiliser uniquement des factures et identités de démonstration. Ne pas demander de connexion au compte professionnel ou de partage de documents clients.
- Séparer les coordonnées de recrutement des notes. Utiliser un identifiant pseudonymisé ; une voix, une vidéo ou un récit détaillé peut rester identifiable.
- Définir une date et une personne responsables de la suppression. Expurger les captures diffusées au-delà de l’équipe autorisée.
- N’envoyer aucun enregistrement ou verbatim dans un outil IA sans décision explicite sur les autorisations, les conditions du service et le traitement des données. Prévoir une solution sans ce transfert.
- Expliquer la présence des observateurs. Ne pas les laisser contacter directement le participant ni lui donner des indices.

## 5. Prototype, données fictives et prétest

### Jeu de démonstration proposé

Créer un jeu figé comportant des factures émises en octobre et en novembre d’une année indiquée à l’écran, ainsi qu’un document annulé. Écrire dans un fichier séparé la liste exacte attendue pour chaque tâche, sans la montrer au participant. Déterminer explicitement si les documents annulés sont inclus ou exclus : **le protocole ne doit pas inventer silencieusement cette règle métier.**

Les montants, noms, adresses et pièces doivent être fictifs. Le téléchargement simulé doit être annoncé lors du débriefing et ne jamais envoyer de document à un tiers.

### Conditions à préparer avant une vraie session

- Révision identique au début de chaque session ; réinitialisation entre les participants.
- Largeur, navigateur, appareil, langue et thème documentés. Si le contexte réel exige un téléphone ou une technologie d’assistance, ne pas remplacer systématiquement cet environnement par un ordinateur de laboratoire.
- État nominal, absence de résultat et erreur de service contrôlable ; aucune dépendance à un incident de production aléatoire.
- Effet réel de la commande « Réessayer » connu ; données conservées vérifiées ; absence de doublon ou d’envoi externe.
- Clavier, zoom et notifications examinés préalablement. Corriger les blocages techniques qui rendraient la session inexploitable, sans prétendre avoir supprimé tous les obstacles d’accessibilité.
- Liens et téléchargements compatibles avec les outils utilisés pendant la session. Prévoir l’interruption et le retour à l’état initial.

**Prétest : non exécuté.** Faire jouer les consignes à une personne non impliquée dans leur rédaction. Vérifier la compréhension du scénario, le temps disponible, la sortie attendue, l’outil d’enregistrement et la remise à zéro. Corriger le protocole avant de considérer ces observations comme une session de l’étude principale.

## 6. Déroulé indicatif

Une séance de 40 à 50 minutes pourrait comprendre une introduction, un bref échange sur le travail récent, deux tâches et un débriefing. Cette durée est une hypothèse logistique, pas une norme. Prévoir des pauses et adapter le rythme.

### Introduction à relire à voix haute

> Nous examinons l’interface, pas vos compétences. Certaines fonctions sont simulées. Vous pouvez vous arrêter ou faire une pause à tout moment. Effectuez les tâches comme vous le feriez habituellement ; vous pouvez décrire ce que vous cherchez et ce qui vous surprend. Je vous poserai parfois une question, sans nécessairement vous indiquer comment faire. N’utilisez aucune donnée de votre entreprise ou de vos clients.

Vérifier les autorisations et l’installation avant toute capture. Ne pas annoncer les problèmes que l’équipe s’attend à trouver.

### Guide de tâches

| Tâche | Consigne proposée, sans nommer un contrôle | Sortie à définir avant l’étude | Observation à conserver | Limite |
| --- | --- | --- | --- | --- |
| T1 — Préparer les documents | « Vous clôturez le mois d’octobre et devez transmettre les factures de cette période à votre comptable. Préparez ce dont elle a besoin. » | Liste exacte attendue selon la règle métier et fichier ou récapitulatif correspondant | Interprétation de la période, exploration, sélection finale, demande d’aide, explication du contenu | La bonne sélection peut être obtenue par hasard ; demander ensuite ce que la personne pense avoir préparé |
| T2 — Reprendre après une erreur | « La préparation n’a pas abouti. Vous avez toujours besoin des mêmes documents. Que faites-vous ? » | Reprise avec sélection conservée et absence d’opération indésirable, selon ce que le prototype permet | Compréhension du message, vérification des filtres, nouvelle tentative, changement de stratégie ou arrêt | Déclencher l’erreur seulement après une configuration comparable ; si T1 n’a pas abouti, noter la remise en contexte fournie |

Prévoir un cas sans résultat dans une **session ou tâche ultérieure** si cette question devient prioritaire. Ne pas transformer chaque séance en liste exhaustive de tous les états possibles.

### Relances neutres possibles

- « Que cherchez-vous à faire maintenant ? »
- « Qu’est-ce qui vous fait penser cela ? »
- « Que vous attendez-vous à obtenir ? »
- « Qu’est-ce qui vous indique que c’est terminé ? »

Éviter « Avez-vous vu le bouton Exporter ? », « C’est clair, non ? » ou toute phrase contenant la solution. Si une aide devient nécessaire pour continuer, l’apporter selon une règle prévue et la consigner. Une tâche achevée après un indice ne doit pas être comptée comme une réussite autonome.

### Arrêt, sécurité et incident

Arrêter sur demande, inconfort ou apparition de données non prévues. Suspendre l’enregistrement si une information sensible apparaît. En cas de défaut technique empêchant la tâche, distinguer cet incident d’une difficulté de compréhension ; proposer une pause ou arrêter plutôt que d’inventer un résultat.

## 7. Grille de notes vierge

Conserver les observations au niveau de la session, puis faire l’analyse transversale. Ne pas préremplir des citations ou des résultats pour rendre le rapport plus convaincant.

| Session | Tâche / état | Action ou événement observé | Parole exacte, seulement si recueillie | Aide fournie | Interprétation provisoire | Trace autorisée | Résultat de la tâche |
| --- | --- | --- | --- | --- | --- | --- | --- |
| À attribuer | À renseigner | Non observé | Non recueillie | À renseigner | À distinguer de l’observation | Aucune | Non exécutée |

**Résultats descriptifs possibles :** terminé sans aide ; terminé avec aide ; non terminé ; interrompu ; non exécutable pour cause technique. Définir les critères avant de les utiliser. Un temps de tâche n’est interprétable qu’avec des points de départ et de fin stables et une conduite comparable ; une verbalisation encouragée peut le modifier.

## 8. Analyse et décision

1. Relire chaque session et corriger les notes avec les traces autorisées. Distinguer un fait observé, une explication donnée par le participant et une hypothèse de l’équipe.
2. Regrouper les difficultés liées à la même tâche sans fusionner des causes différentes. Garder les contre-exemples et les cas où un autre chemin a fonctionné.
3. Décrire la conséquence : impossibilité d’achever, mauvais ensemble de documents, perte de sélection, délai, hésitation sans erreur. La sévérité est une décision argumentée, pas le simple nombre de mentions.
4. Donner les nombres bruts et leurs dénominateurs lorsqu’ils sont utiles : « observé dans x des y sessions où cet état a été présenté ». Ne remplir ces variables qu’après l’étude ; ne pas transformer ce comptage qualitatif en prévalence de la population.
5. Relier chaque recommandation à une observation retrouvable, à une règle métier ou à un critère technique. Une préférence de l’équipe doit être identifiée comme telle.
6. Attribuer l’action, la décision et le scénario de contre-test. Conserver les points non tranchés et les limites de recrutement, de prototype et d’environnement.

### Fiche de problème à remplir après observation

```yaml
# Exemple de structure uniquement — aucune observation réelle.
probleme: a_nommer
question_recherche: a_relier
tache_et_etat: a_preciser
sessions_concernees: []
observation: null
interpretation: null
consequence: a_examiner
severite: a_decider
trace_autorisee: null
proposition: a_discuter
responsable: a_attribuer
contre_test: non_execute
```

Le champ `a_discuter` désigne une proposition en attente, pas une correction approuvée.

## 9. Restitution et liens avec les guides

La restitution doit montrer la question initiale, le protocole effectivement utilisé, les personnes/contextes couverts sans données identifiantes, les observations, les décisions et leurs limites. Une capture ou un extrait de code peut compléter une observation, sans la remplacer.

- **Guide UX**, section « Tests et audit » : matrice de choix de méthode et précautions d’échantillonnage.
- **Guide UI**, section « Tokens et thèmes » : vérifier le composant et les paires de couleur réellement rendues.
- **Guide Product Design**, section « Vérification des sorties » : séparer méthode, sévérité, résultat et trace. Les champs du rapport technique ne doivent pas recevoir une réussite « utilisateur » issue d’un agent.
- **Comparatif**, section « Preuves » : choisir une vérification capable de contredire une décision.

Ces liens sont une organisation éditoriale interne ; aucun nouvel URL public n’est créé par ce brouillon.

## 10. Conditions avant publication éventuelle

- [ ] Relire le protocole avec une personne compétente en recherche et avec les responsables des données.
- [ ] Disposer d’un prototype et d’un jeu de démonstration stables ; exécuter et documenter le prétest.
- [ ] Vérifier la neutralité des consignes, les adaptations et la sécurité de la simulation d’erreur.
- [ ] Décider si une fiche intégrée au guide UX suffit. N’ouvrir un article distinct que si le protocole complet répond à une intention autonome, sans réécrire une nouvelle introduction générale à l’UX.
- [ ] Distinguer clairement « modèle prêt à adapter », « exemple fictif » et toute future observation réelle autorisée à la publication.
- [ ] Préparer la version anglaise et une relecture de sens avant une publication bilingue.
- [ ] Mettre à jour les sources et les liens contextuels si la version publique apporte effectivement un contenu nouveau.

## Sources consultées

Consultation : **18 novembre 2026**, texte extrait des pages, pas observation de sessions conduites par ces organismes.

1. Christian Rohrer, NN/g — [When to Use Which User-Experience Research Methods](https://www.nngroup.com/articles/which-ux-research-methods/). Axes déclaratif/comportemental et qualitatif/quantitatif, contexte et phase ; lecture partielle, blocs 0–1 sur 4.
2. GOV.UK — [Plan user research for your service](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service). Questions, recrutement inclusif, séries et restitution ; texte extrait lu dans ses deux blocs.
3. Kate Moran, NN/g — [Usability (User) Testing 101](https://www.nngroup.com/articles/usability-testing-101/). Participants, tâches réalistes et facilitation ; lecture partielle, bloc 0 sur 3.
4. W3C WAI — [Selecting Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/). Les outils assistent l’évaluation sans déterminer seuls l’accessibilité ; lecture partielle, bloc 0 sur 2.
5. Maria Rosala et Kate Moran, NN/g — [Synthetic Users](https://www.nngroup.com/articles/synthetic-users/). Hypothèses de préparation et limites des profils simulés ; lecture partielle, blocs 0–2 sur 4.

Ce protocole, ses consignes et ses grilles sont des propositions originales du Playbook. Ils ne reproduisent pas un modèle propriétaire et ne sont pas présentés comme une méthode certifiée par les sources citées.
