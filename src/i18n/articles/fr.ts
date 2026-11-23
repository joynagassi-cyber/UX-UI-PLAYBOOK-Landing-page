import type { ArticleData } from './types';
import { COMPARISON_FR } from './comparison-fr';

export const ARTICLES_FR: ArticleData[] = [
  {
    slug: "ux-design-guide",
    category: "UX Design",
    icon: "compass",
    readTime: "Environ 36 min de lecture",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-ux-fr.jpg",
    metaTitle: "UX Design : méthodes, parcours et audit | UX/UI Playbook",
    metaDescription: "Méthodes de recherche UX, parcours, états d’écran et audit de 40 points : choisissez vos contrôles et distinguez observation, hypothèse et mesure.",
    keywords: [
      "UX Design opérationnel",
      "charge cognitive Cowan 4 blocs",
      "loi de Fitts loi de Hick",
      "5 états écran UX",
      "optimisation checkout Baymard",
      "accessibilité EAA WCAG 2.2 2026",
      "checklist audit UX 40 points",
    ],
    title: "UX Design : concevoir un parcours clair et auditer vos écrans",
    subtitle: "Choisir une méthode de recherche, décrire une tâche et préparer les erreurs. Principes cognitifs, paiement, accessibilité et checklist d’audit de 40 points.",
    aeoSummaryTitle: "L’essentiel",
    aeoSummary: "Partez de la décision à éclairer : un entretien explore un récit d’usage, une observation montre une tâche en contexte et un test d’utilisabilité examine l’interaction avec un produit. Une mesure de fréquence ou d’effet demande un protocole quantitatif adapté. Concevez ensuite les parcours et leurs états, y compris l’attente et la reprise après erreur. L’audit de 40 points complète ces méthodes sans remplacer la recherche avec des participants. Les principes cognitifs guident des hypothèses de conception ; les contrôles de contraste, de clavier et de rendu doivent porter sur l’interface réellement utilisée. Ni cinq participants ni un scan sans erreur ne garantissent l’exhaustivité ou un gain de conversion.",
    keyStats: [
      {
        value: "4 ± 1 blocs",
        label: "Estimation de mémoire de travail dans les conditions étudiées, pas un plafond universel de boutons",
        source: "Nelson Cowan · Behavioral and Brain Sciences (2001)",
        url: "https://doi.org/10.1017/S0140525X01003922",
      },
      {
        value: "70,22 %",
        label: "Abandon moyen de panier : moyenne non pondérée de 50 études, pas le taux de votre checkout",
        source: "Baymard Institute · 28 octobre 2026",
        url: "https://baymard.com/blog/cart-abandonment-rate",
      },
      {
        value: "95,9 %",
        label: "Pages d’accueil de l’échantillon avec échecs WCAG détectables automatiquement",
        source: "WebAIM Million · février 2026",
        url: "https://webaim.org/projects/million/",
      },
    ],
    sections: [
      {
        id: "ux-pas-decoration",
        num: "01",
        tocLabel: "Tâche et contexte",
        heading: "Décrire la tâche et ses conditions d’usage",
        blocks: [
          {
            type: "p",
            text: "L’UX ne désigne pas seulement une étape avant les maquettes : l’expérience se poursuit pendant l’usage, l’assistance et les changements du service. L’UI influence aussi cette expérience par ses interactions et ses retours ; la séparer de l’UX ne signifie pas opposer apparence et fonctionnement. Les intitulés de poste ne suffisent pas à répartir les responsabilités. [12]",
          },
          {
            type: "readingLink",
            slug: "ux-ui-product-design",
            sectionId: "responsabilites",
            label: "Comparer les responsabilités UX, UI et Product Design",
            text: "Pour situer ces décisions dans une équipe, le comparatif les applique à une seule application fictive.",
          },
          {
            type: "explanation",
            paragraphs: [
              "Un brief qui demande une interface « moderne » laisse plusieurs décisions ouvertes : la personne qui utilisera l’écran, les informations dont elle dispose et le résultat qu’elle cherche à obtenir. Pour un export de factures, la difficulté peut venir du choix de la période, du nom du fichier téléchargé ou de l’impossibilité de retrouver une opération interrompue. Modifier la typographie ne répond pas à ces questions. La description du besoin doit donc préciser la tâche et les conditions dans lesquelles elle se déroule. Un comptable qui prépare une clôture sur ordinateur a besoin de filtres conservés et de commandes accessibles au clavier ; une personne qui cherche un reçu sur son téléphone doit pouvoir identifier la bonne transaction avec peu d’informations. Ces situations donnent des critères de conception et des scénarios d’essai. Le mot « intuitif », employé seul dans le brief, ne permet pas de décider entre ces comportements. Le fichier obtenu fournit également une sortie vérifiable : sa période, ses colonnes et son nom doivent correspondre à la demande. Si la revue se limite au bouton d’export, elle peut manquer une erreur située dans ce résultat. Préparez donc un petit jeu de factures connu et comparez le document téléchargé aux éléments sélectionnés.",
            ],
            visual: {
              kind: "hierarchy",
              title: "Une tâche, une action",
              caption: "Le titre et le bouton décrivent le même résultat.",
              labels: ["Mes factures", "Exporter octobre", "Télécharger le PDF"],
            },
          },
          {
            type: "quote",
            tag: "Point de départ",
            text: "Avant de juger le style, vérifiez si la personne comprend l’écran, repère son action et peut corriger une erreur.",
          },
          {
            type: "explanation",
            paragraphs: [
              "La présentation d’une action dépend aussi de ses conséquences. Un bouton très visible convient pour confirmer un paiement lorsque le montant, le destinataire et le moment du débit sont déjà expliqués. La même importance visuelle, appliquée à la suppression d’un compte, demande d’autres précautions : nommer ce qui sera supprimé, distinguer cette commande des réglages ordinaires et demander une confirmation adaptée à la perte possible. Considérez, par exemple, un espace partagé contenant des documents de plusieurs collègues. Le libellé « Supprimer » ne permet pas de savoir si l’action retire un document, un projet ou l’espace entier. La revue doit examiner le texte et les autorisations, puis le moyen de revenir en arrière lorsqu’il existe. Deux écrans composés des mêmes cartes et des mêmes boutons peuvent ainsi demander des comportements différents. Le dessin fournit des repères ; la spécification explique les effets du clic et la récupération prévue en cas d’erreur.",
            ],
            visual: {
              kind: "compare",
              title: "Le contexte change le risque",
              caption: "Une action irréversible demande une protection adaptée.",
              labels: ["Suppression immédiate", "Confirmer le projet à supprimer"],
            },
          },
          {
            type: "h3",
            text: "Quatre questions avant de dessiner",
          },
          {
            type: "explanation",
            paragraphs: [
              "Avant de dessiner un écran, rédigez son scénario sous une forme qu’un développeur et la personne chargée de la revue pourront interpréter de la même façon. Indiquez qui arrive sur la page, depuis quelle étape et avec quelles données déjà connues. Décrivez ensuite le résultat attendu : télécharger les factures d’octobre, modifier une adresse de livraison ou confirmer un rendez-vous. Les demandes qui réunissent plusieurs opérations doivent être examinées séparément, car elles peuvent nécessiter des informations ou des droits différents. Ajoutez les conditions de sortie et les incidents prévisibles, notamment une session expirée ou un enregistrement refusé. Ce document peut tenir dans un ticket ; sa longueur compte moins que les décisions qu’il permet de retrouver. Les quatre questions ci-dessous servent à repérer les éléments manquants avant que les choix de mise en page ne soient discutés.",
            ],
            visual: {
              kind: "research",
              title: "Avant de dessiner",
              caption: "Écrivez une réponse courte pour chaque point.",
              labels: ["Personne et contexte", "Action attendue", "Chemin et récupération"],
            },
          },
          {
            type: "steps",
            title: "Questions de cadrage d’un écran",
            steps: [
              {
                bold: "Qui utilise cet écran et dans quelles conditions ?",
                text: "Décrivez la tâche, les connaissances nécessaires et les contraintes matérielles. Un rapprochement de factures au clavier et une recherche de reçu sur téléphone demandent des essais différents.",
              },
              {
                bold: "Quel résultat doit être obtenu ?",
                text: "Écrivez le résultat observable : exporter les factures d’octobre ou confirmer un créneau. Si la demande réunit plusieurs opérations, examinez leur dépendance avant de les regrouper sur un écran.",
              },
              {
                bold: "Quelles informations et étapes sont nécessaires ?",
                text: "Relevez les données à lire ou à saisir, les décisions intermédiaires et les détails qui doivent rester visibles pour vérifier le résultat. Justifiez les demandes d’informations supplémentaires.",
              },
              {
                bold: "Comment reprendre après une interruption ?",
                text: "Prévoyez un premier compte sans données, une requête lente, un nom long et un refus de paiement. Pour chaque cas, précisez ce qui est conservé et l’action proposée.",
              },
            ],
          },
          {
            type: "h3",
            text: "Un premier diagnostic en cinq secondes",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le test des cinq secondes examine ce qu’une personne retient d’un premier aperçu. Préparez un écran avec ses textes réels, montrez-le brièvement à quelqu’un qui ne connaît pas le projet, puis masquez-le avant de poser vos questions. Demandez ce que le produit permet de faire et quelle action la personne a repérée. Notez sa réponse exacte : « je peux envoyer une facture » renseigne davantage qu’un simple « c’est clair ». Si elle décrit une fonction secondaire, examinez le titre, le regroupement du contenu et la place des commandes. Évitez d’expliquer l’intention pendant l’essai, car cette aide modifierait ce que vous cherchez à observer. Une seconde présentation permet de vérifier une reformulation, mais le souvenir du premier écran influence alors la réponse. Ce diagnostic doit être complété par une tâche entière : avoir vu le bouton de création ne montre pas encore que l’inscription, l’envoi ou le paiement pourront être terminés.",
            ],
            visual: {
              kind: "hierarchy",
              title: "Le test de compréhension",
              caption: "Après cinq secondes, demandez ce qui a été compris.",
              labels: ["Aperçu · 5 secondes", "Que permet ce produit ?", "Par où commencer ?"],
            },
          },
        ],
      },
      {
        id: "lois-cognitives-reelles",
        num: "02",
        tocLabel: "Principes cognitifs",
        heading: "Relier les principes cognitifs à une décision d’interface",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Les recherches sur la mémoire et le pointage décrivent des situations précises, avec des tâches et des participants définis. Une équipe de conception doit expliquer le passage entre ces résultats et son propre écran. Supprimer des entrées d’un menu, par exemple, réduit le nombre d’options visibles tout en ajoutant parfois une étape pour les personnes qui utilisent ces commandes chaque jour. À l’inverse, laisser toutes les fonctions au même niveau peut compliquer la première utilisation. La revue gagne à comparer des parcours observables : trouver une commande connue, comprendre une catégorie ou reprendre une opération abandonnée. Les principes ci-dessous aident à formuler ces questions. Pour chaque changement envisagé, gardez une trace du problème constaté, de l’interprétation proposée et de l’essai qui permettra d’examiner le résultat. Vous pourrez ainsi réviser une décision sans transformer un nom de chercheur en argument d’autorité.",
            ],
            visual: {
              kind: "compare",
              title: "Observer avant de conclure",
              caption: "Une règle de conception n’est pas une mesure d’usage.",
              labels: ["« Il y a trop de boutons »", "« L’action cherchée n’a pas été trouvée »"],
            },
          },
          {
            type: "h3",
            text: "1. Cowan (2001) : environ 4 blocs en mémoire de travail",
          },
          {
            type: "explanation",
            paragraphs: [
              "Cowan (2001) rassemble des résultats suggérant une capacité d’environ 4 ± 1 blocs en mémoire de travail lorsque les stratégies de répétition et de regroupement sont contrôlées. Le bloc désigne une unité retenue dans les conditions de l’expérience ; il ne correspond pas automatiquement à un bouton ou à une carte. Une page contenant dix champs reste utilisable si la personne voit les informations dont elle a besoin et peut les traiter successivement. La difficulté augmente lorsqu’elle doit mémoriser un montant sur une page, retrouver un bénéficiaire sur la suivante, puis comparer les deux sans récapitulatif. Dans un formulaire de virement, conserver le nom du bénéficiaire et la somme pendant la confirmation réduit cette demande de mémoire. La revue peut alors porter sur les informations qui disparaissent au changement d’étape, les valeurs à ressaisir et les effets du clavier mobile. Un comptage des éléments de l’écran ne décrit pas ces contraintes. Distinguez aussi reconnaissance et rappel dans vos notes. Si le bénéficiaire reste affiché, une personne peut reconnaître le nom et le compte qu’elle vient de choisir. Si un code lui est demandé après la fermeture du récapitulatif, elle doit le retrouver ou le retenir. Le comportement peut donc changer sans qu’un seul champ supplémentaire soit ajouté. Dans la spécification, indiquez quelles valeurs restent consultables et lesquelles peuvent être corrigées, puis essayez une correction suivie d’un retour à la confirmation.",
            ],
            visual: {
              kind: "memory",
              title: "Éviter la mémorisation",
              caption: "Gardez les données utiles visibles pendant la tâche.",
              labels: ["Montant", "Devise", "Bénéficiaire", "Date", "Récapitulatif visible"],
            },
          },
          {
            type: "h3",
            text: "2. Hick-Hyman : choix, regroupement et apprentissage",
          },
          {
            type: "explanation",
            paragraphs: [
              "La loi de Hick-Hyman relie le temps de choix à la quantité d’information d’une tâche expérimentale. Dans une interface, le nombre d’options visibles intervient avec leur probabilité d’usage, les mots employés et l’apprentissage de leur position. Un menu d’export contenant PDF, CSV et plusieurs formats métier doit aider à reconnaître le bon résultat ; remplacer ces libellés par trois icônes ne garantit aucun progrès. Les personnes habituées au logiciel peuvent aussi dépendre d’un raccourci ou d’un emplacement stable. Pour revoir ce menu, décrivez les tâches fréquentes, séparez les formats dont les usages sont différents et vérifiez les intitulés avec des fichiers réels. Lors de l’essai, relevez les ouvertures de sous-menus, les retours en arrière et les choix corrigés. Ces observations permettent de comprendre le coût d’un regroupement. Le gain recherché doit être formulé pour une tâche donnée, sans déduire la qualité du parcours du seul nombre de choix affichés. Pour un export destiné à la comptabilité, une description du type « CSV — ouvrir dans un tableur » peut être essayée à côté du nom du format, à condition qu’elle corresponde au fichier produit. Si plusieurs formats portent des noms inconnus, demandez à la personne quel document elle veut obtenir avant de montrer le menu. Ses mots peuvent guider les regroupements. Gardez cependant les noms techniques utiles aux échanges avec les autres logiciels : les supprimer ferait perdre une information nécessaire aux utilisateurs qui connaissent déjà leur destination.",
            ],
            visual: {
              kind: "choices",
              title: "Nommer les choix",
              caption: "Une action principale, puis des alternatives reconnaissables.",
              labels: ["Publier", "Enregistrer le brouillon", "Annuler"],
            },
          },
          {
            type: "h3",
            text: "3. Fitts (1954) : distance et surface de pointage",
          },
          {
            type: "explanation",
            paragraphs: [
              "La loi de Fitts décrit le temps de pointage en fonction, notamment, de la distance à parcourir et de la largeur utile de la cible. La surface qui reçoit le clic ou le toucher doit donc être examinée indépendamment du tracé de l’icône. Sur ce projet web, une croix de `20 px` est placée dans une zone d’au moins `44 × 44 px`. Ce choix dépasse le minimum WCAG 2.2 AA de `24 × 24 CSS px`, qui comporte des exceptions ; les unités des autres plateformes restent distinctes, avec des points sur iOS et des dp sur Android. Dans le navigateur, affichez la boîte réelle du bouton et vérifiez qu’un appui près du bord déclenche la bonne commande. Contrôlez également l’espacement avec le bouton voisin, le contour de focus et les zones recouvertes par un élément fixe. Agrandir une cible dans la feuille de style ne suffit pas si une autre couche intercepte les interactions.",
            ],
            visual: {
              kind: "target",
              title: "Glyphe et cible",
              caption: "Schéma de principe, pas une mesure à l’échelle.",
              labels: ["Cible · 44 × 44 px", "Icône · 20 × 20 px"],
            },
          },
          {
            type: "table",
            caption: "Dix lois et principes : relier chaque idée à une décision de conception et à un essai.",
            headers: ["Loi ou principe", "Résultat ou mécanisme décrit", "Question à examiner sur l’écran"],
            rows: [
              [
                "Jakob",
                "Les habitudes acquises sur d’autres produits influencent les attentes.",
                "Conservez les conventions familières ; vérifiez-les avec votre public.",
              ],
              [
                "Fitts (1954)",
                "Le temps de pointage dépend notamment de la distance et de la largeur de cible.",
                "Découplez le glyphe de sa zone d’interaction ; visez 44 × 44 px sur ce projet web.",
              ],
              [
                "Hick-Hyman (1952–1953)",
                "Le temps de choix varie avec l’information à traiter ; contexte et apprentissage comptent.",
                "Nommez et regroupez les choix. Préservez les raccourcis appris.",
              ],
              [
                "Cowan (2001)",
                "Environ 4 ± 1 blocs en mémoire de travail dans les conditions étudiées.",
                "Gardez les données de comparaison visibles ; testez les regroupements et les changements d’étape.",
              ],
              [
                "Proximité (Gestalt)",
                "Des éléments proches sont perçus comme liés.",
                "Exemple de rythme : 8 px dans un groupe, 24–32 px entre groupes.",
              ],
              [
                "Similarité",
                "Des éléments visuellement proches suggèrent une fonction commune.",
                "Rendez les mêmes actions cohérentes ; distinguez statut passif et contrôle.",
              ],
              [
                "Effet Von Restorff",
                "Un élément distinctif peut être mieux mémorisé dans son contexte.",
                "Réservez la plus forte saillance à l’action primaire.",
              ],
              [
                "Pareto — heuristique",
                "Une partie des fonctions peut concentrer l’usage ; aucun ratio fixe n’est garanti.",
                "Mesurez les tâches fréquentes et optimisez-les avant les fonctions secondaires.",
              ],
              [
                "Seuil de Doherty — repère",
                "Une attente sans retour peut interrompre la continuité de la tâche.",
                "Accusez réception immédiatement ; utilisez 400 ms comme repère de méthode, pas comme limite universelle.",
              ],
              [
                "Effet esthétique-utilisabilité",
                "L’apparence peut influencer l’utilisabilité perçue sans prouver l’efficacité réelle.",
                "Soignez le premier écran et mesurez séparément réussite, erreurs et temps de tâche.",
              ],
            ],
          },
          {
            type: "callout",
            icon: "message-circle",
            tone: "accent",
            title: "Formuler une observation à tester",
            text: "« Ces quatre actions ont le même poids visuel ; essayons d’accentuer Publier et observons si l’action est mieux repérée. » Cette proposition nomme un changement et une observation attendue. Le compte rendu doit ensuite préciser ce qui a été vu pendant l’essai, y compris si la modification n’a pas aidé.",
          },
        ],
      },
      {
        id: "budget-cognitif-parcours",
        num: "03",
        tocLabel: "Attention et parcours",
        heading: "Réduire la charge cognitive sur tout le parcours",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Chaque information affichée doit être reliée à une décision ou à une opération du parcours. Sur une page de factures, un compteur d’impayés aide à choisir les dossiers à traiter ; un compteur de visites du compte n’a pas la même utilité pour cette tâche. L’examen commence par les éléments que la personne doit lire avant d’agir. Des boutons nommés « Enregistrer », « Appliquer » et « Confirmer » peuvent désigner des comportements différents, mais cette différence doit être expliquée par le contexte et rester cohérente entre les pages. Les options rarement utilisées peuvent être regroupées dans un niveau secondaire à condition que leur présence soit compréhensible. Gardez aussi les informations nécessaires à la vérification, comme la période sélectionnée et le total. Une interface moins chargée visuellement peut exiger davantage de mémoire si elle les masque. Comparez donc les étapes réellement effectuées, y compris les ouvertures de menus et les retours vers une page précédente.",
            ],
            visual: {
              kind: "choices",
              title: "Donner un ordre de lecture",
              caption: "Les options secondaires ne rivalisent pas avec l’action attendue.",
              labels: ["Créer un projet", "Importer des données", "Voir les modèles"],
            },
          },
          {
            type: "h3",
            text: "Relire les libellés à voix haute",
          },
          {
            type: "explanation",
            paragraphs: [
              "Lire les libellés à voix haute permet de repérer des instructions qui manquent dans l’écran. Pour un transfert, essayez de décrire l’opération avec les mots affichés, sans ajouter oralement qu’il faut choisir la devise avant de saisir le montant. Si cette précision est nécessaire, examinez l’ordre des champs ou la dépendance entre les deux contrôles. Une aide reste justifiée lorsqu’elle explique une règle que le libellé ne peut pas contenir, par exemple le délai d’un virement international ou le format d’un identifiant. Elle doit être placée à l’endroit où cette règle devient utile et rester disponible après la saisie. Le test porte aussi sur les messages de sortie : « Demande reçue » ne dit pas si le fichier a été envoyé au client ou seulement enregistré en brouillon. Une relecture menée avec une personne du métier aide à vérifier le vocabulaire, mais elle doit ensuite être complétée par l’observation de la tâche dans l’interface.",
            ],
            visual: {
              kind: "compare",
              title: "Dire ce qui va se passer",
              caption: "Le bouton nomme l’opération et l’aide précise ses conditions.",
              labels: ["Valider", "Envoyer la facture au client"],
            },
          },
          {
            type: "doDont",
            doTitle: "Décisions à essayer",
            dontTitle: "Situations à examiner",
            doItems: [
              "Donner la priorité visuelle à l’action attendue dans le contexte de la page.",
              "Nommer le résultat du clic : « Télécharger le reçu PDF » ou « Envoyer la facture ».",
              "Préremplir une valeur connue et modifiable lorsque cela évite une ressaisie.",
              "Demander une information à l’étape où elle devient nécessaire et expliquer son usage.",
            ],
            dontItems: [
              "Annuler, Enregistrer le brouillon et Publier présentés comme trois commandes de même importance.",
              "Une inscription qui demande des données sans en expliquer la nécessité.",
              "Des intitulés de colonnes compris seulement après ouverture d’une infobulle.",
              "Des options rares placées avant celles dont la tâche courante dépend.",
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "journey",
              title: "Lire le parcours de bout en bout",
              caption: "À chaque étape, cherchez l’information nécessaire, l’action possible et la sortie en cas d’échec.",
              labels: ["Déclencheur", "Compréhension", "Action", "Confirmation", "Retour"],
            },
          },
          {
            type: "h3",
            text: "Relier l’arrivée, l’action et le retour",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le parcours comprend ce qui précède et ce qui suit l’écran examiné. Une personne ouvre le produit pour une raison, identifie l’opération disponible, agit, vérifie le résultat puis revient éventuellement avec un contexte à retrouver. Pour une facture, la confirmation doit permettre de distinguer un document enregistré d’un envoi réellement terminé. Si l’envoi est différé, son état doit rester consultable après la fermeture de l’onglet. Les interruptions fournissent des scénarios de revue utiles : connexion perdue pendant la saisie, retour après expiration de la session ou passage du téléphone à l’ordinateur. Notez quelles données sont conservées et quelle action est nécessaire pour reprendre. L’équipe peut alors décider d’enregistrer un brouillon, de mémoriser les filtres ou d’expliquer qu’une nouvelle authentification est requise. La fréquence de retour dépend du service : un usage hebdomadaire et une déclaration annuelle ne se jugent pas avec le même indicateur de rétention. La conservation du contexte demande toutefois un périmètre explicite. Un filtre de période et une donnée bancaire n’ont pas les mêmes exigences de stockage et de confidentialité. La revue doit identifier ce qui reste seulement pendant la session, ce qui est enregistré avec le compte et ce qui ne doit pas être conservé. Le message de reprise doit correspondre à ces choix ; il ne peut pas annoncer un brouillon sauvegardé si seules certaines valeurs ont été retenues.",
            ],
            visual: {
              kind: "journey",
              title: "Après le clic",
              caption: "La confirmation et la reprise font partie du parcours.",
              labels: ["Ouvrir", "Comprendre", "Agir", "Vérifier le résultat", "Reprendre plus tard"],
            },
          },
          {
            type: "steps",
            title: "Cinq points de rupture à rechercher",
            steps: [
              {
                bold: "Arrivée sur le produit",
                text: "Vérifiez si le titre et le contenu permettent d’identifier le service et le point de départ. Relevez les termes que la personne ne comprend pas.",
              },
              {
                bold: "Inscription",
                text: "Examinez la nécessité des informations demandées et la possibilité d’apercevoir le service avant de créer un compte. Les contraintes de sécurité doivent être expliquées.",
              },
              {
                bold: "Première action terminée",
                text: "Après Enregistrer ou Envoyer, montrez ce qui a changé et où retrouver le résultat. Une confirmation doit aussi être disponible pour les technologies d’assistance.",
              },
              {
                bold: "Retour après interruption",
                text: "Retrouvez les filtres et les brouillons lorsque leur conservation est prévue. Si la session a expiré, expliquez la réauthentification et les données récupérables.",
              },
              {
                bold: "Erreur et correction",
                text: "Remplacez le seul code 422 par une explication liée au champ ou à l’opération. Gardez les valeurs utiles et proposez une reprise qui ne duplique pas l’action.",
              },
            ],
          },
          {
            type: "quote",
            tag: "Observer le retour",
            text: "Le retour à J+7 peut être utile pour un produit utilisé chaque semaine. Choisissez surtout une mesure liée à la fréquence et à la valeur de la tâche réelle.",
          },
        ],
      },
      {
        id: "cinq-etats-checkout-vide",
        num: "04",
        tocLabel: "États et paiement",
        heading: "Préparer les états vides, les erreurs et le paiement",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Une spécification d’écran doit décrire les situations où les données attendues manquent ou arrivent différemment. L’état vide correspond, par exemple, à un compte sans projet ; le chargement à une requête dont le résultat n’est pas encore connu. L’état idéal présente les données prévues, tandis qu’un résultat partiel peut provenir d’un filtre ou d’un service indisponible. L’erreur doit expliquer la reprise possible. Pour chacun de ces cinq états, écrivez le déclencheur, le contenu affiché et les commandes disponibles, puis examinez les transitions entre eux. Une relance ne doit pas effacer la saisie ni envoyer deux fois une commande déjà reçue. Quand le navigateur ignore si un paiement a abouti, l’interface doit proposer une vérification de son état plutôt qu’un nouvel envoi sans précaution. La confirmation d’une action réussie mérite également une réponse explicite, même lorsque la liste de données se met à jour automatiquement. Un tableau de transitions aide à repérer les cas oubliés : pour chaque événement, indiquez l’état de départ, la réponse connue du service et l’état présenté ensuite. Un délai dépassé côté navigateur et un refus explicite du serveur ne donnent pas la même information. La prévention d’une double opération doit être assurée avec le serveur ; désactiver le bouton protège seulement une partie du scénario. Demandez donc au développeur comment une opération déjà reçue est identifiée lorsqu’une requête est renvoyée, puis intégrez cette réponse au parcours de reprise.",
            ],
            visual: {
              kind: "states",
              title: "Les cas à préparer",
              caption: "Chaque état garde une prochaine étape compréhensible.",
              labels: ["Vide · créer", "Chargement · patienter", "Idéal · consulter", "Partiel · compléter", "Erreur · réessayer"],
            },
          },
          {
            type: "diagram",
            visual: {
              kind: "states",
              title: "Un écran, cinq situations",
              caption: "Conservez le contexte pendant l’attente ou l’échec, et confirmez séparément les actions réussies.",
              labels: [
                "Vide · proposer de créer",
                "Chargement · annoncer l’attente",
                "Idéal · permettre la tâche",
                "Partiel · expliquer ce qui manque",
                "Erreur · offrir une reprise",
              ],
            },
          },
          {
            type: "h3",
            text: "Un état vide qui donne un point de départ",
          },
          {
            type: "explanation",
            paragraphs: [
              "L’état vide donne les premières instructions d’un espace que la personne ne connaît pas encore. « Aucun projet pour l’instant » décrit la situation ; une phrase supplémentaire peut préciser qu’un projet rassemble des tâches et des documents. L’action de création doit mener à une étape où le premier objet peut effectivement être préparé. Un import ou un modèle constitue une alternative si ces chemins correspondent aux usages du produit. En revanche, une longue illustration et une barre d’outils désactivée peuvent éloigner l’explication et compliquer l’identification du point de départ sur téléphone. Il faut aussi distinguer l’absence de données d’une recherche sans résultat : cette dernière demande souvent de modifier un filtre plutôt que de créer un objet. Vous pouvez fixer un objectif de premier résultat, puis mesurer le temps nécessaire sur un parcours défini. Les soixante secondes parfois proposées sont un objectif de travail à adapter, sans valeur universelle pour la rétention.",
            ],
            visual: {
              kind: "empty",
              title: "Un premier écran utile",
              caption: "La création et l’import restent visibles sans grande illustration.",
              labels: ["Aucun projet pour l’instant", "Regroupez ici vos tâches.", "Créer un projet", "Ou importer un fichier"],
            },
          },
          {
            type: "h3",
            text: "Un paiement sans montant ni étape cachés",
          },
          {
            type: "explanation",
            paragraphs: [
              "La compilation Baymard de cinquante études e-commerce, mise à jour le 28 octobre 2026, donne un abandon moyen de panier non pondéré de 70,22 %, avec une fourchette de 55 à 84 %. Ses recherches sur les formulaires comptent 23,48 éléments en moyenne, contre douze à quatorze dans les parcours simplifiés étudiés. Le terme « élément » comprend davantage que les champs de saisie ; ces nombres ne fixent donc pas un formulaire idéal pour chaque boutique. Ils conduisent à examiner les demandes de données et leur moment d’apparition. Dans un essai, demandez à la personne d’expliquer le total et le moment du débit avant l’action finale. Une ambiguïté sur les frais, la création de compte ou l’adresse utilisée peut être corrigée dans le contenu et l’ordre des étapes. Après un refus bancaire, le panier et les données utiles doivent rester disponibles. La reprise doit préciser ce qui a échoué et les moyens de paiement encore accessibles.",
            ],
            visual: {
              kind: "checkout",
              title: "Avant l’engagement",
              caption: "Exemple de récapitulatif ; les montants réels dépendent de la commande.",
              labels: ["Votre commande", "Articles · 29 $", "Frais · affichés ici", "Payer le total indiqué"],
            },
          },
          {
            type: "list",
            heading: "Six décisions à revoir dans un paiement",
            items: [
              {
                bold: "Accès sans compte",
                text: "Proposez l’achat en invité lorsqu’il est compatible avec le service. Si un compte est nécessaire, expliquez pourquoi avant de demander sa création.",
              },
              {
                bold: "Total avant engagement",
                text: "Affichez le sous-total, la livraison et les taxes disponibles. Si un montant dépend de l’adresse, indiquez cette dépendance avant la saisie et actualisez le total.",
              },
              {
                bold: "Regroupement des champs",
                text: "Conservez les labels visibles et regroupez les informations liées. Demandez le téléphone seulement lorsque son usage est justifié et expliqué.",
              },
              {
                bold: "Moyens de paiement disponibles",
                text: "Présentez les méthodes réellement prises en charge pour la commande et le pays concernés. Ne déduisez pas la préférence d’une personne de sa seule région.",
              },
              {
                bold: "Effet du bouton final",
                text: "Un libellé comme « Payer 132,90 € » précise l’opération et le montant. Si le clic ouvre une vérification bancaire, expliquez cette étape à proximité.",
              },
              {
                bold: "Moment de validation",
                text: "Évitez une erreur prématurée pendant une saisie encore incomplète. Essayez la validation à la sortie du champ et à la soumission ; conservez les valeurs et reliez le message au champ.",
              },
            ],
          },
          {
            type: "inlineCta",
            title: "Le livre et les fiches d’audit",
            text: "Le Playbook FR réunit des maquettes annotées, un lexique de 56 composants, la checklist d’audit de 40 points et 12 fiches A4 pour préparer votre revue.",
            buttonLabel: "Obtenir le Playbook FR · 29 $",
          },
        ],
      },
      {
        id: "accessibilite-droit-2026",
        num: "05",
        tocLabel: "Accessibilité et périmètre",
        heading: "Définir les contrôles d’accessibilité et leur périmètre",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Le WebAIM Million de février 2026 détecte des erreurs WCAG 2 de niveaux A ou AA sur 95,9 % du million de pages d’accueil analysées, avec 56,1 erreurs détectées par page en moyenne. Le rapport porte sur les défauts que l’outil peut identifier dans cet échantillon. Pour votre projet, un rapport automatique aide notamment à retrouver des contrastes insuffisants ou des champs sans nom accessible, mais le parcours doit aussi être essayé au clavier et avec un lecteur d’écran. Préparez un scénario qui comporte une saisie correcte, une erreur provoquée et sa correction. Relevez l’ordre du focus, l’annonce du message et les commandes que des éléments fixes peuvent masquer. L’essai doit se poursuivre jusqu’à la confirmation de l’opération, car une page isolée ne montre pas la continuité entre les étapes. Un scan sans erreur ne permet pas, à lui seul, de conclure à la conformité de l’ensemble du service. Lorsqu’un message apparaît sans changement de page, vérifiez son annonce sans déplacer le focus de manière imprévisible. Pour une erreur de saisie, la personne doit pouvoir comprendre le champ concerné et retrouver l’instruction pendant la correction. Après fermeture d’une modale, contrôlez le retour du focus vers une commande encore présente. Si cette commande disparaît après l’action, définissez une autre destination cohérente dans la liste mise à jour. Ces scénarios doivent figurer dans la revue du composant pour être repris sur les autres pages qui l’utilisent.",
            ],
            visual: {
              kind: "checklist",
              title: "Compléter le scan",
              caption: "Les tâches réelles complètent les contrôles automatiques.",
              labels: ["Contrastes et libellés", "Parcours au clavier", "Lecture et annonces", "Réussite de la tâche"],
            },
          },
          {
            type: "h3",
            text: "Distinguer référentiel technique et obligation juridique",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le choix du référentiel technique et la détermination des obligations juridiques demandent des informations différentes. L’équipe peut convenir d’une évaluation WCAG 2.2 AA sur un ensemble de parcours, alors que l’applicabilité d’une directive dépend du service fourni, de l’organisation concernée et de sa transposition nationale. Une recommandation W3C, une norme ETSI publiée et une référence citée au Journal officiel de l’Union européenne ont des portées qu’il faut vérifier séparément. Le tableau ci-dessous distingue leurs statuts au 18 novembre 2026 et renvoie aux textes correspondants. Dans la proposition, nommez les pages et les tâches évaluées, la version du référentiel et les méthodes prévues. Le rapport de livraison doit reprendre ce périmètre, dater les vérifications et indiquer les défauts restants. Les clauses fournies servent de support de rédaction ; leur adéquation au contrat et au secteur doit être examinée avec un conseil compétent.",
            ],
            visual: {
              kind: "research",
              title: "Du texte au projet",
              caption: "Vérifiez le champ et la version applicables avant de conclure.",
              labels: ["Identifier le texte", "Vérifier le secteur", "Définir le périmètre", "Documenter les contrôles"],
            },
          },
          {
            type: "table",
            caption: "Textes européens et référentiels : statut et périmètre au 18 novembre 2026",
            headers: ["Texte ou référentiel", "Date ou statut", "Périmètre et précautions"],
            rows: [
              [
                "European Accessibility Act — Directive (UE) 2019/882",
                "Mesures nationales applicables dès le 28 juin 2025",
                "Vise les produits et services définis à l’article 2, pas tous les sites. L’art. 4(5) exempte les micro-entreprises de services : moins de 10 personnes et CA annuel ou bilan ≤ 2 M€. Cette exemption ne porte pas sur les obligations relatives aux produits. Vérifier transposition et transitions (art. 31–32).",
              ],
              [
                "WCAG 2.2 (Recommandation W3C)",
                "Octobre 2023",
                "Le référentiel technique mondial visé au niveau AA (contraste 4,5:1, focus non masqué 2.4.11, cible minimale, alternative au glisser-déposer).",
              ],
              [
                "Norme EN 301 549 v4.1.1",
                "Version publiée en septembre 2026",
                "L’EN 301 549 v4.1.1 est publiée par ETSI et reprend WCAG 2.2 pour le Web. Sa publication ne suffit pas : vérifier la citation au Journal officiel pour la directive et les exigences concernées avant d’invoquer une présomption de conformité.",
              ],
              [
                "WCAG 3.0 (W3C Working Draft)",
                "Projet de travail du 10 sept. 2026",
                "Projet de travail susceptible de changer, et non une Recommandation W3C. Le W3C demande de le citer uniquement comme travail en cours ; ne le présentez pas comme un remplacement de WCAG 2.2.",
              ],
              [
                "Règlement (UE) 2024/1689 (AI Act · art. 50)",
                "Calendrier à vérifier : art. 50, 111(4) et 113",
                "Art. 50 : information sur certaines interactions IA et marquage/divulgation selon le rôle, le contenu et les exceptions. Application générale au 2 août 2026 ; la version consolidée du 27 juillet 2026 donne jusqu’au 2 décembre 2026 pour l’art. 50(2) aux systèmes déjà commercialisés avant le 2 août. Ne pas assimiler toutes les sorties IA à une même obligation.",
              ],
            ],
          },
          {
            type: "copyable",
            label: "Exemple de clause de périmètre pour une évaluation d’accessibilité",
            langTag: "text",
            code: ` Périmètre d'évaluation accessibilité :
« La livraison inclut un rapport d'évaluation technique portant sur les parcours
listés en Annexe 1, vérifiés selon le référentiel W3C WCAG 2.2 niveau AA à la date
du [JJ/MM/2026] (analyse statique automatisée + parcours clavier et lecteur d'écran).
Le périmètre exact, la méthode de test et les limites d'échantillonnage sont détaillés
dans le rapport joint. Ce livrable constitue un contrôle d'ingénierie et ne se substitue
ni à une certification officielle ni à un avis juridique sur vos obligations sectorielles. »`,
            note: "Adaptez cette clause aux parcours et aux méthodes réellement inclus. Faites examiner les engagements contractuels et les obligations du secteur avec un conseil compétent.",
          },
        ],
      },
      {
        id: "audit-20-min-checklist-40",
        num: "06",
        tocLabel: "Tests et audit",
        heading: "Observer les usages et organiser un audit",
        blocks: [
          {
            type: "h3",
            text: "Quelle méthode répond à votre question UX ?",
          },
          {
            type: "p",
            text: "Un audit, un entretien et un test d’utilisabilité ne produisent pas les mêmes informations. Définissez d’abord la décision à éclairer, puis choisissez une activité susceptible de contredire votre hypothèse. La cartographie de Rohrer distingue le déclaratif du comportemental, indépendamment du qualitatif et du quantitatif. GOV.UK relie ce choix aux questions de recherche, aux personnes concernées et à la restitution des résultats. La matrice suivante est une adaptation pour un exemple d’export de factures, pas une étude déjà réalisée. [13] [14]",
          },
          {
            type: "table",
            caption: "Choisir une activité pour l’export de factures — exemple hypothétique",
            headers: [
              "Question à éclairer",
              "Activité adaptée",
              "Information et limite",
            ],
            rows: [
              [
                "Comment la clôture est-elle préparée aujourd’hui ?",
                "Entretien sur un cas récent, complété par une observation en contexte.",
                "Récit et contraintes de travail ; un souvenir déclaré ne montre pas à lui seul le comportement.",
              ],
              [
                "La personne trouve-t-elle et termine-t-elle l’export ?",
                "Test d’utilisabilité sur une tâche et un jeu de factures connus.",
                "Hésitations, erreurs et reprise observées ; pas une estimation représentative du taux d’échec.",
              ],
              [
                "Où les personnes s’arrêtent-elles dans le produit ?",
                "Analyse d’événements dont le déclenchement et le dénominateur sont vérifiés.",
                "Répartition des événements instrumentés ; ne révèle pas à elle seule les raisons d’un abandon.",
              ],
              [
                "Quel libellé est compris pour classer les documents ?",
                "Tri de cartes pour explorer les regroupements, puis test d’arborescence pour une structure candidate.",
                "Organisation et recherche d’information ; ne valide pas toute la mise en page ou le téléchargement.",
              ],
              [
                "Une nouvelle version modifie-t-elle le taux de réussite ?",
                "Comparaison quantitative ou expérimentation conçue avec hypothèse, échantillon et métrique prévus.",
                "Estimation et incertitude dans le protocole retenu ; quelques retours positifs ne mesurent pas un effet.",
              ],
              [
                "Les labels, états et contrôles attendus sont-ils présents ?",
                "Inspection de l’interface et contrôles techniques, puis revue manuelle.",
                "Défauts identifiables selon les critères inspectés ; ce n’est pas une observation d’usage.",
              ],
            ],
          },
          {
            type: "p",
            text: "Qualitatif ne signifie pas « ce que les gens disent », et quantitatif ne signifie pas « ce qu’ils font ». Un test d’utilisabilité peut produire des observations qualitatives ou des mesures quantitatives selon son protocole ; un questionnaire peut recueillir des réponses ouvertes et des réponses chiffrées. La méthode doit être décrite avec la nature des données et les limites de l’échantillon. [13]",
          },
          {
            type: "h3",
            text: "Préparer une session avant de recruter",
          },
          {
            type: "steps",
            title: "Mini-protocole à adapter à votre recherche",
            steps: [
              {
                bold: "Question et décision",
                text: "Écrivez ce que vous cherchez à comprendre et quelle décision dépend de la réponse. Nommez aussi un constat qui vous ferait changer d’avis.",
              },
              {
                bold: "Personnes et données",
                text: "Recrutez selon la tâche réellement pratiquée, les contextes et les besoins d’accès. Prévoyez les adaptations utiles, l’information des participants, les autorisations d’enregistrement et la durée de conservation ; utilisez des données de démonstration.",
              },
              {
                bold: "Tâche et conduite",
                text: "Préparez une consigne sans nommer le contrôle attendu : « Vous devez transmettre les factures d’octobre à votre comptable. Préparez ce dont elle a besoin. » Définissez une sortie observable, prétestez la consigne et notez toute aide fournie.",
              },
              {
                bold: "Notes et suite",
                text: "Séparez action observée, parole rapportée et interprétation. Reliez chaque problème à la tâche, à un identifiant pseudonymisé et au contexte ; attribuez la correction et prévoyez un nouvel essai.",
              },
            ],
          },
          {
            type: "p",
            text: "N’envoyez pas de verbatims, d’enregistrements ou de données de facturation dans un service IA sans avoir vérifié les autorisations, les conditions de traitement et les exigences applicables. Un identifiant pseudonymisé ne rend pas un enregistrement anonyme. Un profil généré peut aider à préparer des questions, mais ne compte ni comme participant ni comme résultat de recherche. [14] [15]",
          },
          {
            type: "h3",
            text: "Combien de participants : distinguer exploration et mesure",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le modèle de Nielsen et Landauer (CHI 1993) exprime la découverte cumulée de problèmes par `1 − (1 − L)^n`. Avec un taux de découverte `L` d’environ 31 %, cinq participants donnent un résultat proche de 84 %, souvent arrondi à 85 %. Ce calcul dépend des hypothèses du modèle et du taux associé aux problèmes ; il ne garantit pas qu’un groupe de cinq personnes trouvera une proportion fixe des défauts de votre produit. Dans l’étude de Faulkner (2003), menée avec soixante utilisateurs, les sous-échantillons de cinq personnes révélaient de 55 à 99 % des problèmes de cette étude. Ces écarts comptent pour organiser les sessions : une première série peut révéler des obstacles à corriger, puis une autre série examine le parcours modifié. La diversité des tâches, les populations concernées et la gravité des erreurs doivent aussi être prises en compte. Une opération médicale ou un paiement engageant demande une stratégie d’évaluation adaptée à ses conséquences.",
            ],
            visual: {
              kind: "research",
              title: "Tester puis corriger",
              caption: "Un petit échantillon fait émerger des problèmes, pas une garantie.",
              labels: ["Observer une tâche", "Noter les blocages", "Corriger", "Tester à nouveau"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Une session d’observation commence par une tâche formulée sans donner le chemin attendu. Pour un export, demandez de préparer les factures d’une période à transmettre à la comptabilité, plutôt que de cliquer sur le menu Export. Laissez la personne choisir ses étapes et notez l’endroit où elle hésite, revient en arrière ou demande de l’aide. Séparez dans les notes ce qui a été vu de l’explication que vous en proposez. Si plusieurs personnes manquent le filtre de période, une modification de son emplacement peut être essayée, puis revue dans une autre session. La comparaison de taux de réussite ou de conversion nécessite un calcul d’échantillon tenant compte du taux initial, de l’écart recherché et du risque d’erreur accepté. Une série qualitative courte ne remplace pas ce calcul. Des personas générés par IA peuvent préparer des questions de recherche ; ils ne fournissent aucune observation de l’utilisation réelle du produit.",
            ],
            visual: {
              kind: "compare",
              title: "Des observations concrètes",
              caption: "Notez l’action, l’hésitation et ce qui permet de repartir.",
              labels: ["« Les gens préfèrent A »", "« 3 personnes ont manqué le lien Retour »"],
            },
          },
          {
            type: "h3",
            text: "Organiser une première passe d’audit de vingt minutes",
          },
          {
            type: "explanation",
            paragraphs: [
              "Une première passe d’audit sert à préparer les corrections et les investigations suivantes. Elle peut examiner la compréhension de la page, la hiérarchie, l’action principale, la cohérence des composants, les états, les réponses du système, l’accessibilité, les libellés, le prix et l’usage mobile. Pour chaque problème retenu, gardez une capture ou un scénario de reproduction, décrivez son effet sur la tâche et proposez un changement vérifiable. « Le total disparaît lorsque le clavier s’ouvre » donne une base de travail plus précise qu’une note de lisibilité. Un créneau de vingt minutes convient à une passe limitée dont les résultats sont présentés comme tels ; il ne couvre pas une étude d’usage ou une évaluation complète d’accessibilité. Si cette intervention est facturée, le devis doit inclure la préparation, les parcours examinés et la restitution. La checklist ci-dessous aide à parcourir les sujets, mais chaque réponse doit rester liée à ce qui a réellement été contrôlé.",
            ],
            visual: {
              kind: "report",
              title: "Un constat exploitable",
              caption: "Reliez le problème à un correctif et à une nouvelle vérification.",
              labels: ["Constat", "Risque", "Correctif", "Prix masqué", "Montant incertain", "Récapitulatif visible"],
            },
          },
          {
            type: "copyable",
            label: "Checklist de revue UX/UI en 40 points",
            langTag: "markdown",
            code: `# REVUE UX/UI — 40 POINTS
Parcours : [nom] · Date : [date] · Relecteur : [nom]
Pour chaque point : résultat, observation et lien vers le test ou la capture.

## 1. Structure et parcours (10 points)
- [ ] Compréhension du premier écran observée avec une personne extérieure au projet
- [ ] Action attendue identifiable dans la hiérarchie de la page
- [ ] Entrée, sortie et retour définis pour chaque étape
- [ ] Emplacement courant indiqué autrement que par la couleur seule
- [ ] Retour arrière essayé sans perte inattendue de saisie
- [ ] Conventions de navigation examinées avec le public concerné
- [ ] Détours du parcours fréquent relevés et justifiés
- [ ] Fonctions secondaires accessibles sans masquer l’action courante
- [ ] Liens de navigation et commandes distinguables dans leur contexte
- [ ] Temps de premier résultat mesuré sur une tâche définie, sans seuil universel

## 2. Contenu et messages (10 points)
- [ ] Textes de production ou exemples identifiés comme tels, sans faux témoignages
- [ ] Libellés de commandes décrivant l’opération dans son contexte
- [ ] Erreurs expliquant la situation connue et une récupération possible
- [ ] Prix total et conditions compris avant engagement
- [ ] Contraste du texte d’aide mesuré sur son fond réel
- [ ] Dates, devises et nombres adaptés à la langue et à la région
- [ ] Textes longs, titres multilignes et absence de résultats essayés
- [ ] État vide expliquant la situation et les actions disponibles
- [ ] Capitales réservées aux textes courts où elles restent lisibles
- [ ] Traductions et vocabulaire cohérents entre les étapes

## 3. Système visuel (10 points)
- [ ] Famille et graisses chargées conformes au système du projet
- [ ] Tailles de texte issues des tokens, exceptions documentées
- [ ] Espacements internes et structurels cohérents avec l’échelle retenue
- [ ] Couleur d’action distinguable des statuts et alertes
- [ ] Composants récurrents cohérents entre les pages
- [ ] Rayons, bordures et niveaux de surface définis
- [ ] Hiérarchie revue avec les textes et montants réels
- [ ] Largeur de lecture et interlignage essayés sur des paragraphes entiers
- [ ] Visuels et pictogrammes lisibles dans les deux thèmes
- [ ] Tokens et composants nommés ; styles locaux justifiés

## 4. États, accessibilité et technique (10 points)
- [ ] Cinq états préparés : vide, chargement, idéal, partiel/débordement, erreur
- [ ] Repos, survol, appui, focus, chargement et désactivation des contrôles examinés
- [ ] Champs avec label visible relié et aide disponible après saisie
- [ ] Contrastes WCAG mesurés : texte courant 4,5:1 ; éléments non textuels utiles 3:1
- [ ] Cibles web de 44 × 44 CSS px visées selon le projet ; unités natives distinguées
- [ ] Parcours clavier complet, focus visible, fermeture et retour du focus essayés
- [ ] Informations importantes compréhensibles sans dépendre uniquement de la couleur
- [ ] Alternatives textuelles adaptées aux images informatives ; décoration ignorée
- [ ] Réseau lent, interruption et reprise essayés sans duplication de l’opération
- [ ] Spécification de livraison à jour avec cas limites et vérifications restantes`,
            note: "Placez ce fichier dans docs/audit-40.md ou dans le modèle de pull request. Renseignez le parcours, la date et les résultats ; laissez ouverts les points non examinés. Le temps nécessaire dépend du périmètre.",
          },
          {
            type: "readingLink",
            slug: "product-design-ai-agents",
            sectionId: "verifier-ia-trois-statuts",
            label: "Documenter les contrôles et leurs limites dans review.md",
            text: "L’audit révèle des points à examiner. Le rapport de revue conserve la méthode exécutée et ce qui reste à observer avec des personnes.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Que décrit l’estimation de 4 ± 1 blocs de Cowan ?",
        a: "Elle porte sur la mémoire de travail dans les conditions étudiées, lorsque répétition et regroupement sont contrôlés. Un bloc n’est pas un élément d’interface défini à l’avance. Pour un formulaire, examinez ce qui doit être retenu entre les étapes et gardez les données nécessaires à la comparaison visibles. Les regroupements proposés doivent ensuite être essayés sur la tâche réelle.",
      },
      {
        q: "L’European Accessibility Act concerne-t-il tous les sites web ?",
        a: "La directive 2019/882 vise les produits et services définis dans son champ depuis le 28 juin 2025. Les articles 3(23) et 4(5) prévoient une exemption pour les micro-entreprises fournissant des services : moins de dix personnes et chiffre d’affaires annuel ou bilan inférieur ou égal à 2 M€. Cette exemption ne couvre pas les obligations produits. Le secteur, la transposition nationale, les transitions et les autres obligations restent à examiner avec un conseil compétent.",
      },
      {
        q: "Par où commencer la revue d’un paiement ?",
        a: "Faites accomplir un achat défini et vérifiez la compréhension du total avant engagement. Relevez les données demandées, la nécessité du compte et la réponse après un refus. Les résultats Baymard donnent des questions à examiner, sans prescrire un nombre de champs idéal. Après une correction, rejouez le parcours et conservez les observations ; un effet sur la conversion demande des mesures propres à la boutique.",
      },
      {
        q: "Un agent IA peut-il remplacer les essais avec des utilisateurs ?",
        a: "Un agent peut analyser du code, exécuter des contrôles disponibles et aider à préparer des scénarios. Ses réponses ne montrent pas comment une personne comprend le vocabulaire du produit ou reprend après une erreur. Les personas simulés doivent rester des hypothèses de préparation. Pour observer ces comportements, recrutez des personnes concernées et donnez-leur une tâche sans indiquer le chemin à suivre.",
      },
    ],
    ctaTitle: "Pour préparer votre prochain audit",
    ctaText: "L’édition française du UX/UI Playbook comprend le livre de 182 pages, le kit imprimable de 26 pages et une archive de 21 fichiers de travail.",
    ctaBullets: [
      "Livre en français avec exemples d’écrans annotés",
      "12 fiches A4 pour le brief, l’audit et la passation",
      "Tokens, gabarits, règles et scanner Python dans l’archive",
    ],
    entityDefinition: "Le design d’expérience utilisateur conçoit et améliore des produits et services à partir des besoins, des usages et du contexte des personnes. Il articule recherche, contenus, parcours et interactions, puis évalue les choix réalisés. L’UI en précise les composants visuels et interactifs ; les responsabilités se recouvrent et varient selon les équipes.",
    references: [
      {
        title: "The magical number 4 in short-term memory",
        url: "https://doi.org/10.1017/S0140525X01003922",
        publisher: "Nelson Cowan · Behavioral and Brain Sciences",
        date: "2001",
        note: "Capacité d’environ 4 blocs sous certaines conditions expérimentales. Les groupes de 3 à 5 dans une UI sont une transposition de méthode.",
      },
      {
        title: "Cart Abandonment Rate: 50 Statistics",
        url: "https://baymard.com/blog/cart-abandonment-rate",
        publisher: "Baymard Institute",
        date: "2026-10-28",
        note: "70,22 % : moyenne non pondérée de 50 études (2006–2025). Éléments de formulaire : 23,48 observés contre 12–14 dans un parcours simplifié.",
      },
      {
        title: "The WebAIM Million — 2026 report",
        url: "https://webaim.org/projects/million/",
        publisher: "WebAIM",
        date: "2026-02",
        note: "1 million de pages d’accueil, 95,9 % avec erreurs détectées, 56,1 erreurs par page. Un scan sans erreur ne prouve pas la conformité.",
      },
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "Texte normatif : distinguer texte courant, grand texte et composants non textuels.",
      },
      {
        title: "Understanding SC 2.5.8: Target Size (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        publisher: "W3C WAI",
        date: "WCAG 2.2",
        note: "AA : 24 × 24 CSS px avec exceptions. 44 × 44 px est la recommandation retenue ici, pas le minimum AA.",
      },
      {
        title: "A mathematical model of the finding of usability problems",
        url: "https://doi.org/10.1145/169059.169166",
        publisher: "Jakob Nielsen & Thomas K. Landauer · CHI",
        date: "1993",
        note: "Le modèle dépend du taux de découverte de chaque problème ; 5 personnes ne garantissent pas un pourcentage fixe.",
      },
      {
        title: "Beyond the five-user assumption",
        url: "https://doi.org/10.3758/BF03195514",
        publisher: "Laura Faulkner · Behavior Research Methods",
        date: "2003",
        note: "Étude originale sur 60 personnes ; les sous-échantillons de 5 révèlent 55–99 % des problèmes de cette étude. Généralisation à votre produit : à tester.",
      },
      {
        title: "Directive (EU) 2019/882 — European Accessibility Act",
        url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
        publisher: "EUR-Lex · Union européenne",
        date: "2019",
        note: "Articles 2, 3(23), 4(5) et 31 : champ, micro-entreprises et application. Vérifier la transposition nationale et votre secteur.",
      },
      {
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
        publisher: "EUR-Lex · Union européenne",
        date: "2026-07-27",
        note: "Texte consolidé : art. 50 (obligations et exceptions), 111(4) (transition au 2 décembre 2026 pour certains systèmes existants) et 113 (application). Vérifier le rôle et l’usage concernés.",
      },
      {
        title: "W3C Accessibility Guidelines (WCAG) 3.0 — Working Draft",
        url: "https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/",
        publisher: "W3C",
        date: "2026-09-10",
        note: "Statut de projet uniquement : ne remplace pas WCAG 2.2 et peut évoluer.",
      },
      {
        title: "EN 301 549 V4.1.1 — Accessibility requirements for ICT products and services",
        url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf",
        publisher: "ETSI · CEN · CENELEC",
        date: "2026-09",
        note: "Version publiée de la norme. Une citation au JO de l’UE et son champ d’application doivent être vérifiés séparément.",
      },
      {
        title: "UX Disciplines: Glossary",
        url: "https://www.nngroup.com/articles/ux-disciplines-glossary/",
        publisher: "Raluca Budiu · Nielsen Norman Group",
        date: "2026-10-23",
        note: "Consulté le 18 novembre 2026. UI visuelle et interactive ; responsabilités variables selon les organisations ; Product Design distinct du Product Management.",
      },
      {
        title: "When to Use Which User-Experience Research Methods",
        url: "https://www.nngroup.com/articles/which-ux-research-methods/",
        publisher: "Christian Rohrer · Nielsen Norman Group",
        date: "2026-07-15",
        note: "Publié en 2022, revu le 15 juillet 2026, consulté le 18 novembre 2026. Distingue déclaratif/comportemental, qualitatif/quantitatif et contexte d’usage ; ces axes ne se confondent pas.",
      },
      {
        title: "Plan user research for your service",
        url: "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service",
        publisher: "GOV.UK · Service Manual",
        date: "2026-10-15",
        note: "Consulté le 18 novembre 2026. Questions, recrutement inclusif, activités et restitution. Recommandations du service public britannique, pas un effectif ou une cadence universels.",
      },
      {
        title: "Synthetic Users: If, When, and How to Use AI-Generated “Research”",
        url: "https://www.nngroup.com/articles/synthetic-users/",
        publisher: "Maria Rosala & Kate Moran · Nielsen Norman Group",
        date: "2024-06-21",
        note: "Consulté le 18 novembre 2026. Évaluation de profils simulés et limites méthodologiques : des hypothèses de préparation ne sont pas des observations de participants.",
      },
    ],
  },
  {
    slug: "ui-design-system-tokens",
    category: "UI Design",
    icon: "palette",
    readTime: "Environ 26 min de lecture",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-ui-fr.jpg",
    metaTitle: "UI Design : tokens CSS et Dark Mode | UX/UI Playbook",
    metaDescription: "Design tokens, variables CSS et composants : exemple clair/sombre à copier, paires de contraste à vérifier et fiche de passation développeur.",
    keywords: [
      "UI Design system CSS",
      "design tokens DTCG 2025.10",
      "échelle typographique 1.25",
      "grille espacement 8px",
      "dark mode tokens halation",
      "micro-copie interface",
      "propriétés logiques CSS RTL",
      "spécification handoff développeur",
    ],
    title: "UI Design : créer vos tokens CSS et un mode sombre lisible",
    subtitle: "Des choix de typographie aux états des composants : organiser les couleurs, les espacements et les thèmes. Exemples CSS, chiffres Domine et fiche de passation.",
    aeoSummaryTitle: "L’essentiel",
    aeoSummary: "Un système UI cohérent relie 6 rôles sémantiques à 8 tokens de taille : 12, 14, 16, 20, 24, 32, 40 et 64 px. Le ratio 1,25 inspire la progression, sans imposer une formule d’arrondi exacte. Séparez espacements internes, structurels et macro sur une base 4/8. Le repère 60/30/10 organise les rôles de couleur ; ce n’est pas un résultat scientifique. Pour le mode sombre OLED, gardez une base #000000, relevez les surfaces et adoucissez l’encre. Mesurez les contrastes sur chaque fond réel et proposez aussi un mode clair : le confort reste à vérifier avec les lecteurs.",
    keyStats: [
      {
        value: "6 rôles · 8 tokens",
        label: "Tailles CSS 12, 14, 16, 20, 24, 32, 40 et 64 px : échelle utilisée dans cet article",
        source: "Exemple de système typographique",
      },
      {
        value: "≥ 4,5 : 1",
        label: "Contraste AA du texte courant ; grand texte et composants utiles : 3:1 selon leur critère",
        source: "W3C WCAG 2.2 · 1.4.3 & 1.4.11",
        url: "https://www.w3.org/TR/WCAG22/",
      },
      {
        value: "2025.10",
        label: "Rapport final stable du Design Tokens Community Group ; ce n’est pas une Recommandation W3C",
        source: "Design Tokens Community Group · 2025-10-28",
        url: "https://www.designtokens.org/tr/2025.10/format/",
      },
    ],
    sections: [
      {
        id: "hierarchie-quatre-leviers",
        num: "01",
        tocLabel: "Hiérarchie visuelle",
        heading: "Construire une hiérarchie visuelle",
        blocks: [
          {
            type: "readingLink",
            slug: "ux-ui-product-design",
            sectionId: "interface-ui",
            label: "Voir les décisions UI dans le prototype Atelier",
            text: "Les couleurs et les espacements ne résument pas l’UI. Le comparatif montre aussi les commandes, leurs états et leurs retours dans une même application.",
          },
          {
            type: "explanation",
            paragraphs: [
              "La hiérarchie visuelle organise l’ordre dans lequel les informations peuvent être repérées. Sur une page de factures, le montant à traiter, la période sélectionnée et l’action disponible n’ont pas tous besoin du même traitement. Commencez par comparer les tailles, les graisses et les distances entre les groupes, puis utilisez la couleur lorsque celle-ci apporte un repère supplémentaire. Un bouton ne devient pas plus compréhensible parce qu’il est très saturé ; son intitulé et sa position par rapport à l’objet concerné comptent aussi. Faites une première revue avec les textes et les montants réels, y compris un titre sur plusieurs lignes. Une maquette qui fonctionne avec « Projet A » peut se déséquilibrer avec un nom de client long. Les quatre leviers ci-dessous décrivent des moyens de réglage. Leur combinaison dépend de la densité du contenu, de l’espace disponible et des tâches à effectuer sur la page. Pour préparer la comparaison, gardez le contenu identique entre deux versions et modifiez seulement le réglage discuté. Vous pourrez alors demander où commence la lecture et quelle commande a été repérée sans mélanger une réécriture, un changement de grille et une nouvelle palette. Les notes d’observation doivent décrire le parcours du regard ou les choix exprimés, sans déduire un gain de réussite du seul aspect plus ordonné de la page.",
            ],
            visual: {
              kind: "hierarchy",
              title: "Construire la priorité",
              caption: "La taille, la graisse et l’espace fonctionnent avant la couleur.",
              labels: ["Factures à traiter", "3 paiements en attente", "Consulter les factures"],
            },
          },
          {
            type: "steps",
            title: "Quatre réglages de hiérarchie à comparer",
            steps: [
              {
                bold: "Taille",
                text: "Dans une page avec un corps à 16 px, essayez un titre principal à 32 ou 40 px selon le contenu. Comparez les retours à la ligne et la place laissée aux données utiles.",
              },
              {
                bold: "Graisse",
                text: "Un label à 14 px en 600 peut être distingué d’une valeur en 400 sans changer la structure du champ. Vérifiez que ces graisses existent dans les fichiers chargés.",
              },
              {
                bold: "Distances",
                text: "Éloignez deux groupes indépendants et rapprochez un titre du contenu qu’il présente. Reprenez la revue avec un titre long pour vérifier que le lien reste visible.",
              },
              {
                bold: "Couleur",
                text: "Attribuez un rôle à l’accent et aux couleurs de statut. Mesurez les contrastes puis vérifiez que les commandes restent compréhensibles sans ces seules couleurs.",
              },
            ],
          },
          {
            type: "quote",
            tag: "Un test rapide de hiérarchie",
            text: "En regardant l’écran de loin ou en plissant les yeux, cherchez le titre et l’action principale. Revenez ensuite au texte réel pour vérifier la lisibilité et la compréhension.",
          },
        ],
      },
      {
        id: "typographie-sans-hasard",
        num: "02",
        tocLabel: "Typographie",
        heading: "Typographie : une famille, six rôles et huit tailles",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Le système typographique peut employer une seule famille sans rendre tous les niveaux semblables. Ce site utilise Domine pour les titres, les paragraphes, les contrôles et les exemples de code. Les rôles sémantiques décrivent la fonction du texte : Display/H1 pour le titre de page, H2 et H3 pour les sections, Body pour la lecture suivie, Small pour l’aide et Micro pour les indications courtes. Les tokens de taille fournissent les valeurs que ces rôles consomment. Cette séparation permet d’adapter un H1 au téléphone sans inventer une nouvelle catégorie de titre et de conserver le même rôle dans le balisage HTML. La graisse doit provenir des fichiers réellement chargés ; un poids absent peut être simulé par le navigateur avec un résultat différent. Vérifiez l’ensemble sur un écran comportant plusieurs paragraphes, un formulaire et un tableau, car une planche de titres ne montre ni la fatigue de lecture ni les conflits de densité. Le nom du rôle ne doit pas non plus choisir seul le niveau de titre HTML. Une carte peut reprendre la présentation d’un H3 tout en nécessitant un autre niveau selon sa position dans la page. Documentez le style et la structure séparément, puis examinez le plan des titres dans le navigateur. Cette distinction permet de réutiliser un composant dans un article ou un tableau de bord sans sauter un niveau de navigation au lecteur d’écran.",
            ],
            visual: {
              kind: "type",
              title: "Une famille, plusieurs rôles",
              caption: "Domine reste la même ; taille, graisse et rythme changent.",
              labels: ["Titre · 24 px", "Texte · 16 px", "Légende · 12 px", "1 024,00 · 999,00"],
            },
          },
          {
            type: "h3",
            text: "Choisir l’échelle et régler le rythme de lecture",
          },
          {
            type: "explanation",
            paragraphs: [
              "L’échelle retenue ici comporte huit tailles : `12`, `14`, `16`, `20`, `24`, `32`, `40` et `64 px`. Une base de 16 px et un ratio indicatif de 1,25 peuvent guider le choix initial, mais ces valeurs ne sont pas l’arrondi successif d’une formule unique. Leur intérêt est d’être nommées et réutilisées. Un composant de titre peut passer de 40 à 64 px selon l’espace disponible ; une légende reste rattachée à son rôle même lorsque son contenu change de longueur. Réglez aussi l’interlignage et la largeur de lecture avec la famille choisie. Un paragraphe à 16 px peut demander davantage de hauteur de ligne lorsqu’il contient des termes techniques et des liens. Essayez les valeurs sur une page remplie, puis observez les sauts de ligne et les espaces entre sections. Toute exception ajoutée au système doit répondre à un besoin identifié et être documentée dans le composant concerné.",
            ],
            visual: {
              kind: "spacing",
              title: "Une échelle décidée",
              caption: "Les rôles s’appuient sur des tailles nommées, pas sur huit nouvelles polices.",
              labels: ["Corps · 16 px", "Sous-titre · 24 px", "Titre · 40–64 px"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "L’alignement des nombres demande une vérification de la police, pas seulement une déclaration CSS. `font-variant-numeric: tabular-nums` sélectionne des chiffres de même chasse lorsque la famille fournit cette fonction OpenType. Domine ne la possède pas dans les fichiers utilisés ici ; appliquer la propriété seule laisse donc les montants se décaler selon les chiffres affichés. Le composant `TabularText` du site place chaque chiffre dans une cellule de `0.7em`, tout en conservant les glyphes Domine et la chaîne copiée. Comparez des valeurs comme `1 111,00` et `8 888,00` dans la même colonne pour examiner le résultat. Les séparateurs décimaux, le signe négatif et le symbole monétaire ont aussi besoin d’une convention cohérente. Une colonne numérique alignée à droite facilite la comparaison des montants, mais ne dispense pas d’expliquer la devise ou la période. Vérifiez enfin le rendu avec le zoom et la copie vers un tableur, afin que l’adaptation visuelle n’altère pas les données.",
            ],
            visual: {
              kind: "type",
              title: "Vérifier les chiffres",
              caption: "Des cellules de même largeur alignent les chiffres de Domine.",
              labels: ["Montants", "1 111,00", "8 888,00", "Même largeur par chiffre"],
            },
          },
          {
            type: "table",
            caption: "6 rôles sémantiques mappés sur 8 tokens : les bornes et tailles ci-dessous sont celles retenues dans cet article.",
            headers: ["Rôle sémantique", "Taille CSS", "Interligne et approche", "Usage retenu"],
            rows: [
              [
                "Display / H1",
                "40 ou 64 px",
                "1,05–1,10 · -0,03em",
                "Un H1 par page ; adaptation fluide possible entre ces bornes",
              ],
              ["H2", "32 px", "1,15–1,22 · -0,02em", "Sections majeures"],
              ["H3", "20 ou 24 px", "1,30 · -0,015em", "Sous-sections et titres de cartes"],
              ["Body", "16 px", "1,55–1,65 · normal", "Texte courant ; largeur de lecture à tester"],
              ["Small", "14 px", "1,45 · normal", "Labels, aide, cellules"],
              ["Micro", "12 px (plancher)", "1,40 · +0,04em", "Badges courts et horodatages"],
            ],
          },
        ],
      },
      {
        id: "couleur-60-30-10-base-8",
        num: "03",
        tocLabel: "Couleurs et espacements",
        heading: "Donner des rôles aux couleurs et aux espacements",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Une palette doit nommer l’usage des couleurs avant de répartir les valeurs. Le fond de page, la surface d’une carte, le texte secondaire et le bouton principal ont des fonctions différentes, même lorsque deux d’entre eux partagent une teinte. Le repère 60/30/10 peut aider à discuter la place des grandes surfaces et de l’accent ; il ne définit ni une proportion à mesurer pixel par pixel ni un résultat d’utilisabilité. Pour contrôler le système, dressez la liste des paires effectivement affichées : texte sur carte, aide sous un champ, texte dans le bouton et message d’erreur sur sa surface. Mesurez le contraste après les transparences et les superpositions, car une couleur lisible sur le fond de page peut échouer dans une carte plus claire. Les rôles doivent également exister dans les deux thèmes et dans les états de survol ou de focus. Cette liste rend un changement de palette plus facile à examiner composant par composant.",
            ],
            visual: {
              kind: "colour",
              title: "Attribuer des rôles",
              caption: "Une palette décrit d’abord l’usage de chaque couleur.",
              labels: ["Surface", "Texte", "Action", "Confirmation"],
            },
          },
          {
            type: "h3",
            text: "Distinguer les statuts et les commandes sans la couleur seule",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le traitement d’un statut doit permettre de comprendre sa signification et de le distinguer d’une commande. Un badge « Payé » vert et un bouton vert de même forme peuvent entretenir une hésitation sur ce qui est cliquable. Le texte, la forme et l’icône fournissent d’autres repères : une erreur de paiement peut afficher un symbole d’alerte et une explication, tandis que l’action de reprise reste un bouton identifié. Les statuts ne doivent pas dépendre uniquement du rouge et du vert. Le passage en niveaux de gris aide à repérer certaines ambiguïtés, mais l’examen doit aussi porter sur les noms accessibles et les messages transmis aux technologies d’assistance. Mesurez le contraste sur la surface utilisée par le composant, y compris si elle contient une teinte de fond. Un état désactivé demande une décision distincte sur sa présence et son explication ; une baisse d’opacité appliquée sans examen peut rendre les informations nécessaires difficiles à lire.",
            ],
            visual: {
              kind: "feedback",
              title: "Un sens lisible sans couleur",
              caption: "L’icône et le texte rendent le statut reconnaissable.",
              labels: ["Paiement refusé", "Choisir une autre carte", "Paiement confirmé"],
            },
          },
          {
            type: "h3",
            text: "Trois niveaux d’espacement",
          },
          {
            type: "explanation",
            paragraphs: [
              "L’espacement décrit les relations entre les éléments. Le titre d’une carte doit rester proche du contenu qu’il présente, tandis qu’une distance plus grande peut séparer cette carte des actions qui concernent toute la page. Une échelle telle que `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px` fournit des valeurs communes, mais elle ne choisit pas ces relations à votre place. Distinguez les écarts internes d’un composant, les gouttières entre groupes et les marges entre grandes sections. Sur une fiche client, rapprochez l’adresse du nom du client et laissez davantage de place avant le groupe de boutons. Essayez ensuite de retirer une bordure : le regroupement devrait rester compréhensible grâce aux distances et aux titres. Les ajustements optiques peuvent demander un demi-pas ; ils doivent être expliqués dans le composant au lieu de produire une suite de valeurs isolées que personne ne sait réutiliser.",
            ],
            visual: {
              kind: "spacing",
              title: "Trois distances, trois liens",
              caption: "Les éléments liés restent plus proches entre eux.",
              labels: ["8 px · icône et texte", "24 px · contenu de carte", "64 px · sections"],
            },
          },
          {
            type: "list",
            heading: "Exemples d’espacement selon la relation",
            items: [
              {
                bold: "Interne : 4, 8 ou 12 px",
                text: "Écart entre l’icône et le texte d’un bouton, ou entre un label et son champ. Choisissez une valeur commune pour les composants qui remplissent la même fonction.",
              },
              {
                bold: "Structure : 16, 24 ou 32 px",
                text: "Padding d’une carte ou gouttière entre groupes de champs. Une carte peut utiliser 16 px sur mobile et 24 px lorsque la largeur augmente.",
              },
              {
                bold: "Sections : 48, 64 ou 96 px",
                text: "Distance entre groupes indépendants d’une page. Vérifiez le résultat avec les titres et les paragraphes réels avant de retirer un séparateur.",
              },
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "spacing",
              title: "Des espacements qui montrent les groupes",
              caption: "Rapprochez le titre du contenu qu’il annonce ; séparez davantage deux groupes indépendants. Les distances illustrées ne sont pas à l’échelle.",
              labels: ["Interne · 4 / 8 / 12 px", "Structure · 16 / 24 / 32 px", "Sections · 48 / 64 / 96 px"],
            },
          },
          {
            type: "h3",
            text: "Vérifier la mise en page à 375 puis 320 px",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le responsive réorganise le contenu en fonction de la place disponible et des tâches à conserver. Commencer par une colonne à `375 px` oblige à choisir l’ordre de lecture et à prévoir les actions sans survol. La revue à `320 px` révèle ensuite des problèmes de retour à la ligne, notamment dans les boutons, les dates et les groupes de champs. Une barre latérale peut devenir un menu si l’accès aux destinations reste compréhensible. Un tableau peut défiler dans une région nommée et accessible au clavier ; le transformer en cartes n’est adapté que si les comparaisons entre lignes restent possibles. Testez aussi le zoom, les libellés traduits et l’ouverture du clavier mobile. Le champ actif, son erreur et l’action suivante doivent rester accessibles sans déplacement latéral imposé. Choisissez les points de rupture lorsque le contenu en a besoin, puis examinez les largeurs intermédiaires : une mise en page peut fonctionner aux deux extrémités et échouer entre elles.",
            ],
            visual: {
              kind: "responsive",
              title: "Adapter les colonnes à l’espace disponible",
              caption: "La priorité de lecture reste la même quand les colonnes changent.",
              labels: ["Large", "Étroit"],
            },
          },
        ],
      },
      {
        id: "tokens-vrai-dark-mode",
        num: "04",
        tocLabel: "Tokens et thèmes",
        heading: "Créer des tokens pour les thèmes clair et sombre",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Les tokens associent un nom réutilisable à une décision de présentation. Une valeur primitive comme `--orange-600` décrit une teinte ; un rôle comme `--color-accent` indique son emploi dans l’interface. Les composants doivent consommer le rôle pour qu’un changement de thème puisse modifier sa valeur sans réécrire chaque bouton. Le format Design Tokens 2025.10 est un rapport final du Design Tokens Community Group, distinct d’une Recommandation W3C ; l’exemple CSS ci-dessous illustre cette organisation et ne constitue pas un fichier JSON DTCG. Commencez par une carte témoin avec titre, aide, champ et bouton. Vérifiez ses états dans les thèmes clair et sombre, puis étendez la même méthode aux autres composants. Les surfaces, les illustrations et les indicateurs de focus doivent être examinés avec le texte. Une inversion de couleurs ne préserve pas automatiquement leur sens ou leur contraste. Le confort de lecture demande aussi un essai avec des personnes et la possibilité de choisir un autre thème. Un changement de token mérite une revue de ses usages. Modifier --color-muted pour corriger l’aide d’un formulaire peut affecter les horodatages, les tableaux et les légendes d’un graphique. Recherchez les composants consommateurs et gardez une page témoin qui réunit ces usages. La convention de nommage doit aussi permettre de retirer une valeur devenue inutile : si chaque écran conserve son propre alias après une correction, la palette peut rester techniquement centralisée tout en cessant d’être compréhensible. La revue de code doit donc examiner les noms ajoutés et leurs références, pas seulement la capture finale.",
            ],
            visual: {
              kind: "tokens",
              title: "Une valeur, un rôle, un usage",
              caption: "Le composant consomme le rôle ; le thème change sa valeur.",
              labels: ["#c2320a", "--color-accent", "Bouton primaire"],
            },
          },
          {
            type: "h3",
            text: "Quatre réglages de mode sombre à tester avec vos lecteurs",
          },
          {
            type: "doDont",
            doTitle: "Choix à essayer dans les tokens",
            dontTitle: "Cas à vérifier dans le rendu",
            doItems: [
              "Conserver #000000 comme base OLED et donner des valeurs distinctes aux surfaces des cartes et des modales.",
              "Essayer une encre adoucie, par exemple #ECEEF4, et recueillir des retours sur un texte entier.",
              "Choisir l’accent dans chaque thème en fonction de son fond et de la couleur du texte du bouton.",
              "Mesurer le texte secondaire sur chaque niveau de surface, y compris les cartes superposées.",
            ],
            dontItems: [
              "Un texte dont le contraste passe, mais que certains lecteurs trouvent inconfortable : prévoir un choix de thème.",
              "Une ombre noire invisible sur une carte sombre : examiner le besoin d’une bordure ou d’une autre surface.",
              "Un accent repris du thème clair sans mesure de ses nouveaux contrastes.",
              "Une inversion CSS globale qui modifie aussi les photos, les logos et les couleurs de statut.",
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "themes",
              title: "Deux thèmes, les mêmes rôles",
              caption: "Le fond, la carte, le texte et l’action changent de valeur, pas de fonction. Mesurez les contrastes et essayez la lecture dans les deux thèmes.",
              labels: ["Clair", "OLED"],
            },
          },
          {
            type: "copyable",
            label: "tokens.css — couleurs, typographie, espacements et thèmes",
            langTag: "css",
            code: `/* UX/UI Playbook 2026 — tokens.css (socle de départ pour un produit web ou SaaS) */
:root {
  /* 1. Surfaces & Encres — Mode Clair (paires à mesurer sur les surfaces utilisées) */
  --color-bg:             #FFFFFF;
  --color-surface-1:      #F4F1EA;
  --color-surface-2:      #EAE5DA;
  --color-text:           #101319; /* > 16:1 sur bg */
  --color-text-2:         #343A46; /* > 10:1 sur bg */
  --color-muted:          #5B6170; /* ≥ 5.2:1 sur surface-1 */
  --color-line:           #DFDBD0; /* decorative */
  --color-control-line:   #737987; /* meaningful controls */

  /* 2. Accent d’action et couleurs de statut */
  --color-accent:         #C2320A;
  --color-accent-hover:   #A62806;
  --color-on-accent:      #FFFFFF;
  --color-success:        #137347;
  --color-warning:        #9A5B00;
  --color-danger:         #C62828;
  --color-info:           #2C5CE6;

  /* 3. Les 3 échelles d'espacement (Interne / Structurel / Macro) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* 4. Rayons, 6 rôles sémantiques, 8 tokens de taille */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --font-body: "Domine", Georgia, serif;
  --font-display: var(--font-body);
  --font-mono: var(--font-body);
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px; --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;  --text-4xl: 64px;

  /* 5. Jetons de mouvement */
  --dur-fast: 120ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:  cubic-bezier(0.4, 0, 1, 1);
}

/* Mode Sombre : élévation par clarté + encre adoucie + accent désaturé */
[data-theme="dark"] {
  --color-bg:             #000000;
  --color-surface-1:      #131720; /* +claire que la base */
  --color-surface-2:      #1B202C; /* +claire pour modales/popovers */
  --color-text:           #ECEEF4; /* encre adoucie, confort à tester */
  --color-text-2:         #B4BCCB;
  --color-muted:          #8E96A8; /* ≥ 4.6:1 vérifié sur surface-2 */
  --color-line:           rgba(255, 255, 255, 0.10);
  --color-control-line:   #8E96A8;

  --color-accent:         #FF6B47; /* relevé d'un ton et adouci */
  --color-accent-hover:   #FF8566;
  --color-on-accent:      #0B0D12;
  --color-success:        #24D18A;
  --color-warning:        #F5B544;
  --color-danger:         #FF6B6B;
  --color-info:           #6EA0FF;
}

/* Préférence système de réduction des animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
            note: "Chargez Domine depuis vos fichiers locaux, puis adaptez ces tokens. Mesurez chaque paire de couleurs sur les surfaces réellement utilisées.",
          },
          {
            type: "h3",
            text: "Du rôle nommé au composant rendu",
          },
          {
            type: "p",
            text: "Un token exprime une décision nommée ; une propriété personnalisée CSS est un moyen de la distribuer dans le navigateur. Les variables Figma permettent aussi de porter des valeurs et des alias, mais leur présence ne synchronise pas automatiquement une application. Material documente des tokens de référence, de système et de composant : cette architecture est un exemple, pas une obligation de créer trois couches pour chaque projet. Le format DTCG concerne l’échange de données ; le CSS ci-dessus en est une implémentation de présentation, pas un fichier conforme à ce format. [3] [5] [6]",
          },
          {
            type: "table",
            caption: "Une paire de rôles conservée dans les deux thèmes",
            headers: [
              "Rôle",
              "Mode clair dans cet exemple",
              "Mode sombre dans cet exemple",
            ],
            rows: [
              [
                "--color-accent",
                "#C2320A",
                "#FF6B47",
              ],
              [
                "--color-on-accent",
                "#FFFFFF",
                "#0B0D12",
              ],
              [
                "Consommateur",
                ".export-action",
                ".export-action",
              ],
            ],
          },
          {
            type: "copyable",
            label: "composant.html — consommer les tokens.css ci-dessus",
            langTag: "html",
            code: `<button type="button" class="export-action">Exporter les factures</button>

<style>
.export-action {
  font: inherit;
  min-block-size: 44px;
  max-inline-size: 100%;
  padding: var(--space-3) var(--space-4);
  border: 0;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: var(--color-on-accent);
}
.export-action:hover {
  background: var(--color-accent-hover);
}
.export-action:focus-visible {
  outline: 3px solid var(--color-text);
  outline-offset: 3px;
}
</style>`,
            note: "Chargez d’abord le tokens.css de cet article. Pour comparer les thèmes, appliquez data-theme=\"dark\" à l’élément html, puis retirez cet attribut. Ce bouton montre les styles et le focus ; il ne déclenche aucun export.",
          },
          {
            type: "p",
            text: "Mesurez le texte sur son fond au repos et au survol, dans les deux thèmes ; vérifiez ensuite le focus, sa visibilité et l’absence de masquage dans la page complète. Une paire valide peut être dégradée par l’opacité, une image ou une surcharge locale. Les noms des tokens ne garantissent donc pas le contraste, et ce composant isolé ne prouve ni l’accessibilité d’un parcours ni la compréhension de son libellé. [1]",
          },
          {
            type: "inlineCta",
            title: "Fichiers de tokens et gabarits dans l’archive",
            text: "L’archive du Playbook fournit tokens.css, tokens.json et les gabarits éditables, avec 13 paires avant/après et 11 comparaisons de plateformes dans le manuel.",
            buttonLabel: "Obtenir les fichiers FR · 29 $",
          },
        ],
      },
      {
        id: "microcopie-motion-rtl",
        num: "05",
        tocLabel: "Mots, motion et RTL",
        heading: "Rédiger les messages et préparer mouvement et traduction",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Les composants contiennent des décisions de langage et de comportement que la maquette fixe ne montre qu’en partie. Un bouton d’envoi doit préciser le résultat attendu, un message d’erreur doit indiquer si la saisie est conservée et une modale doit définir où le focus se déplace à son ouverture. La traduction et le mouvement interviennent dans ces mêmes décisions. Un libellé anglais court peut occuper deux lignes en français ; une fermeture animée peut retarder inutilement le retour au formulaire si l’implémentation attend la fin de la transition. Préparez ces variantes avec les composants réutilisés sur plusieurs écrans. La revue pourra alors essayer le texte long, la réduction des animations et un sens de lecture différent sans découvrir ces contraintes à la fin du projet. Les trois sujets qui suivent demandent des essais distincts, car une correction de mise en page ne garantit pas la qualité du message ou le fonctionnement du clavier.",
            ],
            visual: {
              kind: "feedback",
              title: "Les mots font partie de l’UI",
              caption: "Le message explique la situation et laisse une issue.",
              labels: ["Envoi interrompu", "Votre texte est conservé", "Réessayer l’envoi"],
            },
          },
          {
            type: "h3",
            text: "1. Micro-copie : annoncer le résultat",
          },
          {
            type: "explanation",
            paragraphs: [
              "La micro-copie doit donner assez d’informations pour choisir une action et en comprendre les conséquences. « Enregistrer les modifications » explique ce que fait le bouton ; « Valider » peut convenir seulement si l’objet validé est évident dans le contexte. Une phrase d’aide est utile lorsqu’elle donne un format attendu, un délai ou une conséquence qui ne tient pas dans le libellé. Elle devient superflue lorsqu’elle répète simplement l’instruction de cliquer. Dans un formulaire, gardez le label visible pendant la saisie et placez l’explication de l’erreur près du champ concerné. Un message comme « Cet e-mail est déjà utilisé » doit proposer une issue adaptée, telle que se connecter ou utiliser une autre adresse. La rédaction doit également préciser ce qui est arrivé aux données : après un échec d’envoi, savoir que le texte est conservé change la décision suivante. Les exemples du tableau servent à discuter ces comportements ; leur formulation doit rester conforme aux actions effectivement disponibles.",
            ],
            visual: {
              kind: "compare",
              title: "Nommer le résultat",
              caption: "Le bouton annonce ce qui change après le clic.",
              labels: ["Valider", "Enregistrer les modifications"],
            },
          },
          {
            type: "table",
            caption: "Exemples de libellés à adapter aux opérations disponibles",
            headers: ["Contexte", "Texte à préciser", "Exemple de formulation"],
            rows: [
              ["Bouton d’enregistrement", "Valider", "Enregistrer les modifications"],
              ["Confirmation destructive", "Supprimer", "Supprimer ce projet et ses 42 fichiers — si ce nombre est réel"],
              [
                "Adresse déjà enregistrée",
                "Erreur 422",
                "Cet e-mail est déjà utilisé. Se connecter ou choisir une autre adresse.",
              ],
              ["Attente de données", "Veuillez patienter…", "Chargement des factures… Ajouter un délai seulement s’il est connu."],
              [
                "Synchronisation",
                "Synchronisation bidirectionnelle",
                "Les modifications sont synchronisées sur vos appareils. Préciser les délais et les limites réels.",
              ],
            ],
          },
          {
            type: "p",
            text: "Distinguez une erreur de saisie que la personne peut corriger d’un problème du service. « La date doit précéder aujourd’hui » peut être associé au champ concerné ; « L’export est indisponible, vos filtres sont conservés » décrit une panne et doit proposer une suite réellement prise en charge. Ne présentez pas une indisponibilité comme une faute de saisie. Reliez les erreurs aux champs, préservez les réponses utiles et rendez la notification perceptible sans dépendre de la couleur seule. [7] [8]",
          },
          {
            type: "h3",
            text: "2. Motion : expliquer un changement",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le mouvement peut indiquer l’origine d’un panneau ou aider à suivre un objet déplacé, mais sa durée et son utilité doivent être essayées dans le composant concerné. Des valeurs de `120 ms` pour une réponse d’appui et de `250 ms` pour un panneau sont des exemples de départ, sans statut de seuil universel. Préférez les propriétés `transform` et `opacity` lorsqu’elles répondent au besoin, afin d’éviter des recalculs de mise en page inutiles. L’ouverture ou la fermeture doit continuer à fonctionner lorsque les animations sont réduites. Une modale doit donc recevoir le focus, annoncer son titre et rendre le focus à son bouton d’ouverture indépendamment de l’événement de fin d’animation. Avec `prefers-reduced-motion: reduce`, retirez les déplacements non essentiels tout en conservant les changements d’état et leurs messages. Examinez aussi les actions répétées : un effet supportable une fois peut ralentir un travail où le même panneau est ouvert plusieurs dizaines de fois.",
            ],
            visual: {
              kind: "motion",
              title: "Prévoir la réduction des déplacements",
              caption: "Exemples de durées ; le schéma reste volontairement statique.",
              labels: ["Appui · 120 ms", "Panneau · 250 ms", "Réduction · sans déplacement"],
            },
          },
          {
            type: "h3",
            text: "3. Internationalisation : prévoir l’autre sens de lecture",
          },
          {
            type: "explanation",
            paragraphs: [
              "L’internationalisation demande de préparer la longueur des contenus et leur sens de lecture. Les propriétés logiques comme `margin-inline-start`, `padding-inline-end` et `text-align: start` adaptent les distances à la direction du texte, sans dupliquer toutes les règles de style. Elles ne règlent pas à elles seules les icônes directionnelles, les contenus mêlant plusieurs écritures ou la présentation des nombres. Un logo et un symbole de lecture vidéo ne doivent pas être retournés simplement parce que la page passe en RTL ; une flèche de navigation doit être examinée selon son sens. Préparez des exemples avec un nom long, une adresse e-mail, une date et un montant. Vérifiez le retour à la ligne, la sélection et la copie de chaque donnée. Les boutons doivent pouvoir grandir ou revenir à la ligne sans masquer une commande voisine. Ces essais sont plus fiables qu’une marge de largeur supposée suffisante pour toutes les langues. Les contraintes viennent parfois des données plutôt que de la traduction. Une référence de commande sans espace peut nécessiter une règle de césure différente du paragraphe voisin. Dans une adresse ou un identifiant, la position des caractères reste importante pour la copie et la vérification. Gardez le contenu complet accessible et choisissez le comportement au niveau du composant concerné. Une troncature globale appliquée pour faire disparaître un débordement peut masquer précisément la partie qui distingue deux enregistrements.",
            ],
            visual: {
              kind: "direction",
              title: "Raisonner en début et fin",
              caption: "Les propriétés logiques suivent le sens de lecture.",
              labels: ["LTR · début à gauche", "RTL · début à droite", "padding-inline-start"],
            },
          },
        ],
      },
      {
        id: "handoff-une-page",
        num: "06",
        tocLabel: "Composants et passation",
        heading: "Préparer les composants et leur passation",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "La passation décrit les décisions dont l’implémentation a besoin. Pour les composants récurrents, documentez les états visibles, l’ordre au clavier et la réponse aux contenus absents ou trop longs. Le jeu de départ peut comprendre un bouton, un champ avec label, une case à cocher, un radio, un switch, un select, une carte, une modale, une alerte, des onglets, un tableau et un squelette de chargement. Chaque comportement important doit être formulé de façon observable. « Échap ferme la modale et rend le focus au bouton qui l’a ouverte » indique ce qu’il faudra essayer ; « modale accessible » ne donne pas ce scénario. La fiche ci-dessous relie ensuite la structure d’un écran aux tokens qu’il utilise et aux incidents à traiter. Joignez les liens vers les composants et les décisions de revue, puis identifiez les questions encore ouvertes. La personne qui développe pourra ainsi demander un arbitrage plutôt que choisir silencieusement un comportement absent de la maquette.",
            ],
            visual: {
              kind: "handoff",
              title: "Transmettre les décisions",
              caption: "La fiche relie le composant aux cas à implémenter.",
              labels: ["Structure et ordre", "Tokens utilisés", "États et interactions", "Tests et cas limites"],
            },
          },
          {
            type: "copyable",
            label: "Exemple de fiche de passation pour un écran de paiement",
            langTag: "markdown",
            code: `# PASSATION — Exemple « Paiement »

## 1. Structure et responsive
- Conteneur : max-width 1200px ; padding var(--space-8) bureau, var(--space-4) mobile.
- À partir de 1024px : colonnes minmax(0, 1.6fr) minmax(0, 1fr), avec gouttière issue des tokens.
- Sous 1024px : une colonne ; récapitulatif repliable avant le formulaire.
- Essayer le bouton final et le champ actif avec le clavier mobile ouvert.

## 2. Tokens utilisés
- Action : --color-accent ; survol : --color-accent-hover ; texte : --color-on-accent.
- Champs : --color-control-line ; focus visible et non masqué, dans les deux thèmes.
- Espacements : échelle du projet ; documenter les exceptions nécessaires.

## 3. États du paiement
1. Repos : méthodes prises en charge affichées ; sélection initiale justifiée.
2. Focus : ordre logique, accès à tous les champs et moyens de paiement.
3. Erreur de saisie : message relié au champ avec aria-describedby ; correction possible.
4. Envoi : état annoncé et prévention des doubles opérations côté interface et serveur.
5. Refus : conserver les données autorisées ; préciser les moyens de reprise disponibles.
6. Succès : confirmation durable, montant et référence consultables.

## 4. Scénarios de revue
- Parcourir au clavier : coordonnées → méthode → action finale, selon les champs réellement requis.
- À la soumission invalide, annoncer les erreurs et guider vers la correction.
- Nommer le récapitulatif avec <aside aria-labelledby="summary-heading">.
- Essayer les traductions et les libellés longs à 320px, sans largeur d’expansion supposée.
- Reprendre après perte de réseau sans renvoyer un paiement dont l’état est inconnu.
- Noter les commandes exécutées, résultats et vérifications encore nécessaires.`,
            note: "Ajoutez les liens vers les composants, les maquettes et les résultats des tests. Les valeurs de cette fiche sont des choix d’exemple à adapter au produit.",
          },
          {
            type: "readingLink",
            slug: "product-design-ai-agents",
            sectionId: "pipeline-5-fichiers-agents",
            label: "Relier la passation au brief et à la revue d’implémentation",
            text: "La fiche de passation ne clôt pas la vérification. Le workflow produit indique où garder les décisions et les contrôles restant à réaliser.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Comment examiner le confort d’un mode sombre OLED ?",
        a: "Conservez la base #000000 si elle correspond au choix du produit, distinguez les surfaces et mesurez les paires de contraste. Faites ensuite lire un passage entier, avec des liens et de l’aide de formulaire, dans les conditions d’usage prévues. Une encre adoucie peut être essayée sans promettre l’absence de halo pour chaque personne. Le choix d’un mode clair doit rester disponible.",
      },
      {
        q: "Le placeholder remplace-t-il le label d’un champ ?",
        a: "Le placeholder disparaît pendant la saisie et ne remplace pas un label visible relié au champ. Une indication nécessaire doit rester disponible, par exemple sous le contrôle et reliée par aria-describedby. Le texte utile reste soumis aux exigences de contraste applicables ; le seuil de 4,5:1 concerne le texte courant. Vérifiez la paire sur le fond réel et dans les états du champ.",
      },
      {
        q: "Comment utiliser une échelle de 4 et 8 px ?",
        a: "Dans l’exemple de cet article, les valeurs 4, 8 et 12 px servent aux distances internes, tandis que 16, 24 et 32 px organisent cartes et groupes. Ce choix fournit un vocabulaire commun et peut être adapté. La relation entre les éléments compte autant que la valeur : un titre doit rester lié à son contenu quand celui-ci change de longueur.",
      },
      {
        q: "Les propriétés logiques suffisent-elles pour une interface RTL ?",
        a: "Elles adaptent les directions liées au texte, par exemple margin-inline-start et text-align: start. Il faut aussi examiner les icônes directionnelles, les nombres et les données mêlant plusieurs écritures. Essayez une adresse e-mail, une date et des noms longs dans des composants complets. Une largeur supplémentaire fixée à l’avance ne garantit pas que les traductions resteront lisibles.",
      },
    ],
    ctaTitle: "Des tokens et des gabarits à réutiliser",
    ctaText: "L’édition française du UX/UI Playbook comprend le livre de 182 pages, le kit imprimable de 26 pages et une archive de 21 fichiers de travail.",
    ctaBullets: [
      "Livre en français avec exemples d’écrans annotés",
      "12 fiches A4 pour le brief, l’audit et la passation",
      "Tokens, gabarits, règles et scanner Python dans l’archive",
    ],
    entityDefinition: "Le design d’interface utilisateur définit la présentation et le comportement des composants : hiérarchie, typographie, couleur, commandes, états et retours. Il ne se réduit pas à la décoration. Les tokens expriment des décisions réutilisables ; un design system comprend aussi les composants, leurs règles d’usage, leur documentation et leur évolution.",
    references: [
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "1.4.3 : texte courant 4,5:1, grand texte 3:1. 1.4.11 : composants et informations graphiques utiles 3:1.",
      },
      {
        title: "Understanding SC 2.5.8: Target Size (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        publisher: "W3C WAI",
        date: "WCAG 2.2",
        note: "Le minimum AA web est 24 × 24 CSS px avec exceptions ; le Playbook recommande ici 44 × 44 px.",
      },
      {
        title: "Design Tokens Format Module 2025.10",
        url: "https://www.designtokens.org/tr/2025.10/format/",
        publisher: "Design Tokens Community Group",
        date: "2025-10-28",
        note: "Rapport final communautaire stable pour l’échange de tokens ; ne pas le présenter comme une norme W3C.",
      },
      {
        title: "The WebAIM Million — 2026 report",
        url: "https://webaim.org/projects/million/",
        publisher: "WebAIM",
        date: "2026-02",
        note: "Les contrastes insuffisants figurent parmi les erreurs automatiquement détectées les plus fréquentes de l’échantillon.",
      },
      {
        title: "Design tokens — Overview",
        url: "https://m3.material.io/foundations/design-tokens/overview",
        publisher: "Google · Material Design 3",
        date: "Consulté le 18 novembre 2026",
        note: "Valeurs, rôles et classes de tokens dans Material. Exemple d’architecture de système, pas une règle universelle.",
      },
      {
        title: "Create and manage variables and collections",
        url: "https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections",
        publisher: "Figma Learn · Help Center",
        date: "Consulté le 18 novembre 2026",
        note: "Variables, collections, alias et correspondances de code. Les fonctions et droits d’accès dépendent du produit et de ses offres.",
      },
      {
        title: "Error message",
        url: "https://design-system.service.gov.uk/components/error-message/",
        publisher: "GOV.UK · Design System",
        date: "Consulté le 18 novembre 2026",
        note: "Distingue erreur de saisie et incident du service ; messages associés aux champs et conservation des réponses. Contexte GOV.UK à adapter.",
      },
      {
        title: "User Notification — Forms Tutorial",
        url: "https://www.w3.org/WAI/tutorials/forms/notifications/",
        publisher: "W3C · Web Accessibility Initiative",
        date: "Consulté le 18 novembre 2026",
        note: "Tutoriel informatif sur notifications, erreurs et associations aux champs ; complète les critères normatifs WCAG.",
      },
    ],
  },
  {
    slug: "product-design-ai-agents",
    category: "Product Design",
    icon: "settings",
    readTime: "Environ 26 min de lecture",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-product-fr.jpg",
    metaTitle: "Product Design & agents IA | UX/UI Playbook",
    metaDescription: "Du brief à la revue d’une interface générée par IA : rôles, permissions, fichiers de travail et modèle de rapport avec preuves et limites.",
    keywords: [
      "Product Design développeur solo",
      "AGENTS.md Claude Code Cursor UI",
      "pipeline wireframe HTML IA",
      "patterns interface agentique HAX",
      "dashboard SaaS page tarifs UX",
      "fixer ses prix freelance design",
      "proposition commerciale 1 page",
    ],
    title: "Product Design : cadrer votre produit et guider vos agents IA",
    subtitle: "Définir le périmètre, consigner les décisions et préparer la revue du code généré. Un pipeline en cinq fichiers, trois prompts et des exemples de permissions et de devis.",
    aeoSummaryTitle: "L’essentiel",
    aeoSummary: "Le workflow proposé par le Playbook conserve les décisions dans cinq fichiers : brief.md, screens.md, wireframe.html, review.md et handoff.md. Ce format d’organisation n’est pas une norme imposée par un fournisseur. Distinguez l’agent qui aide l’équipe à coder, l’agent utilisé dans le produit et les profils simulés pour préparer une recherche. Le rapport de revue sépare méthode, sévérité, résultat et preuve, et laisse visibles les contrôles non exécutés. L’équipe garde la responsabilité des permissions, des arbitrages et des études avec les personnes concernées.",
    keyStats: [
      {
        value: "3 statuts",
        label: "Automatisé / À vérifier / Non applicable ; sévérité et résultat séparés",
        source: "Exemple de rapport de contrôle",
      },
      {
        value: "2 heures",
        label: "Exemple de recherche express : 45 min de brief puis 75 min de terrain, à adapter au risque",
        source: "Exemple de recherche courte",
      },
      {
        value: "6 patterns",
        label: "Clarification, plan, périmètre, permissions, journal et bilan",
        source: "Microsoft HAX · Google PAIR",
        url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
      },
    ],
    sections: [
      {
        id: "qui-decide-quoi-sequence",
        num: "01",
        tocLabel: "Produit, UX et UI",
        heading: "Distinguer les décisions produit, UX et UI",
        blocks: [
          {
            type: "p",
            text: "Le titre Product Designer ne désigne pas partout le même périmètre. La conception participe à l’exploration des problèmes et des solutions ; le product management porte habituellement la vision et la priorisation avec ses partenaires. Décrivez qui décide, qui contribue et qui vérifie dans votre équipe, plutôt que d’attribuer toute la roadmap au designer. UX et UI ne forment pas non plus deux services qui se transmettent un écran une seule fois. [5]",
          },
          {
            type: "readingLink",
            slug: "ux-ui-product-design",
            sectionId: "responsabilites",
            label: "Situer le Product Design parmi les responsabilités de l’équipe",
            text: "Le comparatif précise ces recouvrements avant d’examiner le travail confié à un agent.",
          },
          {
            type: "explanation",
            paragraphs: [
              "Une demande de fonctionnalité contient plusieurs types de décisions, même lorsqu’une seule personne assure tout le projet. Pour un export de factures, le travail produit consiste à préciser les utilisateurs concernés, les données exportées et la raison de construire cette fonction maintenant. Le travail UX décrit le choix de la période, les informations à vérifier et la récupération après un échec. Le travail UI donne une présentation lisible à ces opérations et définit les états des contrôles. Ces décisions peuvent se répondre : un essai de parcours peut révéler qu’un droit d’accès manque au périmètre initial. Les distinguer permet surtout de savoir quelle question est en discussion et qui peut la trancher. Une demande de bouton supplémentaire ne devrait pas être traitée uniquement comme un ajustement graphique si elle ajoute une opération, une autorisation ou une nouvelle responsabilité de support. Le brief doit garder la trace de ces changements et de leur validation.",
            ],
            visual: {
              kind: "roles",
              title: "Trois questions distinctes",
              caption: "Les décisions de périmètre, de parcours et de présentation se répondent pendant la revue.",
              labels: ["Produit · quoi et pourquoi ?", "UX · quel chemin ?", "UI · quelle présentation ?"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Une première maquette fournit un support de discussion, mais son niveau de détail doit correspondre aux décisions déjà prises. Si la cible, les rôles et le modèle de facturation sont encore incertains, une page très aboutie visuellement peut détourner la revue vers des détails qui seront repris ensuite. Présentez d’abord un schéma ou un wireframe avec les contenus et les commandes envisagés. Faites nommer les points acceptés et les questions restantes : qui peut inviter un collègue, à quel moment la carte est débitée, ou comment un projet archivé est retrouvé. L’accord doit porter sur ces comportements et être conservé dans un document accessible à l’équipe. Lorsqu’une demande arrive après cet accord, son effet sur les écrans et sur le calendrier peut être examiné. Il reste possible de modifier la structure ; le changement devient alors une décision explicite, avec un coût et une date, plutôt qu’une correction graphique absorbée sans discussion.",
            ],
            visual: {
              kind: "scope",
              title: "Valider avant d’affiner",
              caption: "Un accord porte sur une décision précise, pas sur une impression.",
              labels: ["Brief accepté", "Structure relue", "Style appliqué"],
            },
          },
          {
            type: "quote",
            tag: "Exemple de jalon de validation",
            text: "« Le périmètre et les parcours sont relus avant la revue visuelle. L’accord consigne les décisions acceptées et les questions restantes ; une demande ultérieure fait l’objet d’une estimation de ses effets sur les livrables et le calendrier. »",
          },
        ],
      },
      {
        id: "brief-2h-saas-tarifs",
        num: "02",
        tocLabel: "Recherche et écrans SaaS",
        heading: "Cadrer le besoin, le tableau de bord et les tarifs",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Une recherche courte est utile lorsqu’elle répond à une question limitée et que les personnes ou les données nécessaires sont accessibles. Le créneau de deux heures proposé ici répartit quarante-cinq minutes de cadrage et soixante-quinze minutes d’entretiens ou de consultation de documents. Préparer le recrutement et les accès peut demander du temps en dehors de ce créneau. Pendant le brief, précisez la tâche à étudier, la population concernée et la décision que l’équipe souhaite prendre. Les entretiens doivent porter sur un épisode réel : comment une facture a été corrigée la dernière fois, quels documents ont été utilisés et à quel moment une autre personne est intervenue. Les tickets de support et les produits comparables apportent du contexte, mais ne remplacent pas ces récits. Terminez par une note séparant les observations, les décisions prises et les questions sans réponse. Un risque élevé, un accès incomplet aux utilisateurs ou des résultats contradictoires justifient de prolonger l’enquête. Le compte rendu peut être organisé par question plutôt que par participant pour préparer l’arbitrage, à condition de conserver le lien vers la note d’origine. Si un ticket évoque une perte de données alors qu’un entretien décrit seulement une difficulté à retrouver un document, ne fusionnez pas les deux en une cause certaine. La prochaine étape peut être une reproduction technique ou une session plus ciblée. Cette distinction évite de commander une refonte pour résoudre un défaut dont le mécanisme n’a pas encore été identifié.",
            ],
            visual: {
              kind: "research",
              title: "Un exemple de recherche courte",
              caption: "Adaptez ce créneau aux risques et à l’accès aux personnes.",
              labels: ["45 min · cadrage", "45 min · entretiens", "30 min · tickets et contexte"],
            },
          },
          {
            type: "steps",
            title: "Exemple de répartition d’un créneau de recherche",
            steps: [
              {
                bold: "0 à 45 minutes : cadrage",
                text: "Nommez la tâche, la population concernée, les données disponibles et la décision attendue. Identifiez la personne responsable de l’arbitrage et les hypothèses encore sans observation.",
              },
              {
                bold: "45 à 90 minutes : entretiens préparés",
                text: "Avec des participants déjà recrutés, trois échanges de quinze minutes peuvent documenter des épisodes récents. Demandez les étapes suivies et les difficultés rencontrées, puis conservez les notes sans généraliser à tous les utilisateurs.",
              },
              {
                bold: "90 à 120 minutes : contexte et synthèse",
                text: "Consultez des produits comparables et des tickets de support accessibles. Relevez les convergences et les contradictions, puis décidez quelles questions nécessitent davantage de recherche.",
              },
            ],
          },
          {
            type: "h3",
            text: "Tableau de bord et page de tarifs",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le contenu d’un tableau de bord se choisit à partir des décisions prises par ses utilisateurs. Un responsable qui examine les factures en attente doit connaître le montant concerné, la période et les objets à ouvrir pour agir. Dans l’exemple illustratif « 48,2 k€ · +12,4 % par rapport à septembre », la comparaison donne un contexte au chiffre ; elle doit utiliser une période définie et une base de calcul cohérente. Un graphique est utile lorsque l’évolution répond à une question, tandis qu’une liste actionnable permet de retrouver les factures qui expliquent la valeur. Trois indicateurs peuvent servir de point de départ pour une première maquette, mais le nombre dépend du travail à effectuer. Vérifiez les unités, les filtres actifs et l’heure de mise à jour. Si une source de données manque, le tableau de bord doit signaler ce qui est incomplet sans présenter un zéro comme une mesure réelle. L’accès au détail permet ensuite de contrôler et de traiter les résultats affichés.",
            ],
            visual: {
              kind: "dashboard",
              title: "Un chiffre qui aide à décider",
              caption: "Données illustratives : valeur, évolution, période et accès au détail.",
              labels: ["48,2 k€", "+12,4 % · vs septembre", "Voir les factures"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "La page de tarifs doit permettre de calculer ce qui sera facturé et de choisir une formule adaptée à un usage. Placez l’unité près du montant : par utilisateur, par mois, par volume ou par opération. Si le prix affiché dépend d’un paiement annuel, le total et la fréquence du prélèvement doivent être compris avant l’engagement. Pour comparer des formules Starter, Pro et Team, gardez le même ordre de caractéristiques et expliquez les limites qui changent réellement l’usage, comme le nombre de collaborateurs ou l’accès aux exports. Trois colonnes constituent un exemple de présentation, à adapter aux offres disponibles. Une formule mise en avant doit être accompagnée d’une raison de la choisir ; un badge « Populaire » demande des données qui le justifient. Faites essayer la page avec un scénario concret et demandez quel montant serait payé pour l’équipe concernée. Les hésitations révèlent les unités, les conditions ou les différences qui manquent à l’explication.",
            ],
            visual: {
              kind: "pricing",
              title: "Rendre les offres comparables",
              caption: "Même ordre de bénéfices et même unité de facturation.",
              labels: ["Starter", "Pro", "Team", "Prix par siège et par mois"],
            },
          },
        ],
      },
      {
        id: "pipeline-5-fichiers-agents",
        num: "03",
        tocLabel: "Fichiers et prompts",
        heading: "Guider un agent avec des fichiers et des étapes",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Pour déléguer la construction d’une interface, l’agent doit pouvoir retrouver les décisions que l’équipe a prises et les questions qui restent ouvertes. Le pipeline présenté ici répartit ces informations entre cinq fichiers : `brief.md` décrit le besoin et le périmètre, `screens.md` détaille les parcours et les états, `wireframe.html` rend la structure testable, `review.md` conserve les défauts relevés et `handoff.md` prépare la livraison. Les règles communes d’`AGENTS.md` et les valeurs de `tokens.css` s’appliquent à ces étapes sans ajouter une nouvelle décision produit. Pour un écran de paiement, les entrées doivent préciser le montant, les moyens acceptés, les permissions et la reprise après refus. Lorsqu’une information manque, la sortie attendue est une question adressée à l’équipe. Une fonction ajoutée par supposition doit être repérée avant la revue visuelle, car elle peut modifier le périmètre et les données traitées.",
            ],
            visual: {
              kind: "pipeline",
              title: "Les décisions deviennent des fichiers",
              caption: "Le prochain passage reprend les décisions écrites, pas un souvenir du chat.",
              labels: ["brief.md", "screens.md", "wireframe.html"],
            },
          },
          {
            type: "p",
            text: "Les cinq fichiers ci-dessous constituent un format d’organisation proposé par le Playbook, pas une norme HAX, PAIR ou un protocole imposé aux agents de code. Adaptez-les au dépôt et à la manière dont votre outil charge le contexte. Les instructions ne remplacent ni des permissions techniques limitées, ni la revue du diff et des commandes exécutées. La documentation GitHub distingue également capacités, environnements et risques des agents ; elle ne valide pas ce workflow particulier. [8]",
          },
          {
            type: "diagram",
            visual: {
              kind: "pipeline",
              title: "Le pipeline en cinq fichiers",
              caption: "Chaque fichier porte une décision relue. AGENTS.md et tokens.css fournissent les contraintes communes aux cinq étapes.",
              labels: [
                "brief.md · objectif",
                "screens.md · parcours",
                "wireframe.html · structure",
                "review.md · corrections",
                "handoff.md · livraison",
              ],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Les corrections qui concernent plusieurs écrans doivent rejoindre le fichier ou le composant qui les gouverne. Si l’agent utilise plusieurs couleurs pour la même action, corrigez le rôle dans les tokens et indiquez son emploi dans les instructions, puis recherchez les occurrences déjà produites. Une modification faite uniquement sur la dernière capture laisse les autres écrans et les générations suivantes sans règle commune. Le fichier de contexte doit pointer vers les documents du projet, définir les actions autorisées et préciser les vérifications attendues. Sa longueur dépend de la quantité de décisions utiles ; une limite de lignes ne garantit pas que le modèle suivra les consignes. Après la correction, ajoutez un test ou un exemple de résultat attendu, puis demandez le résultat de cette vérification lors du passage suivant. Les fichiers versionnés permettent de relire le changement et de comprendre quand une règle a été introduite, à condition que la revue porte aussi sur le code effectivement livré. Lorsque la règle modifiée affecte le comportement, ajoutez au fichier de revue les écrans concernés et les tests à rejouer. Une nouvelle exigence de confirmation de suppression, par exemple, doit se retrouver dans le composant, dans l’ordre au clavier et dans le scénario de récupération. Les changements déjà présents dans la branche doivent être conservés et examinés avant toute génération. Cette précaution limite les corrections qui remplacent involontairement une autre décision validée par l’équipe.",
            ],
            visual: {
              kind: "tokens",
              title: "Corriger la règle partagée",
              caption: "Une correction récurrente rejoint le fichier qui la gouverne.",
              labels: ["Défaut récurrent", "AGENTS.md / tokens.css", "Nouvelle vérification"],
            },
          },
          {
            type: "copyable",
            label: "Exemple d’AGENTS.md pour un projet d’interface",
            langTag: "markdown",
            code: `# AGENTS.md — Instructions d’interface du projet

## Documents à consulter
- tokens.css : couleurs, espacements, rayons, tailles et durées retenus.
- screens.md : tâche, entrée, sortie, états, cas limites et textes de chaque écran.
- Signaler une décision absente avant d’ajouter une fonction ou une valeur partagée.

## Règles de ce projet
- Utiliser les contenus fournis ; identifier les exemples et ne fabriquer aucun témoignage.
- Texte utile ≥ 12px, corps ≥ 15px ; vérifier la lecture sur des paragraphes entiers.
- Libellés décrivant les actions et priorité visuelle adaptée à la tâche.
- Préparer vide, chargement, idéal, partiel/débordement et erreur ; confirmer les réussites.
- Employer les propriétés logiques lorsque l’espacement suit le sens de lecture.

## Accessibilité et contrôles
- Labels visibles reliés aux champs, noms accessibles pour les boutons-icônes.
- Cibles web visées : 44 × 44 CSS px, choix du projet au-delà du minimum AA avec exceptions.
- Contrastes : texte courant ≥ 4,5:1 ; éléments non textuels utiles ≥ 3:1 sur leur fond réel.
- Tester clavier, focus, fermeture des modales et réduction des animations.
- Renseigner ici les commandes réellement disponibles : [typecheck], [build], [tests].

## Rapport de passage
- Lister fichiers modifiés, commandes exécutées, résultats et questions ouvertes.
- Distinguer observations, hypothèses et travail restant, avec liens vers les preuves.
- Pour la checklist : Automatisé / À vérifier / Non applicable ; sévérité et résultat séparés.
- Ne pas annoncer la réussite d’un contrôle indisponible ou non exécuté.`,
            note: "Adaptez les chemins, les règles et les commandes au dépôt. Vérifiez le format d’instructions reconnu par votre outil : AGENTS.md, CLAUDE.md et les règles Cursor ne sont pas interchangeables sans examen.",
          },
          {
            type: "h3",
            text: "Trois prompts pour trois étapes",
          },
          {
            type: "explanation",
            paragraphs: [
              "Séparer la spécification, la construction et la revue permet d’examiner les décisions à un moment où elles restent peu coûteuses à modifier. Le premier prompt produit une liste d’écrans à partir du brief et signale les questions fonctionnelles. Le deuxième transforme cette liste en structure HTML testable avec les contenus et les états prévus. Une présentation en niveaux de gris concentre cette revue sur l’ordre et les interactions, même si les tokens d’espacement sont déjà utilisés. Le troisième prompt prépare un rapport reliant chaque défaut à une règle, une situation de reproduction et un correctif. Aucun de ces passages ne doit valider automatiquement le suivant : l’équipe peut refuser un écran incomplet ou rouvrir une question du brief. Les commandes de test et les résultats doivent accompagner la revue pour distinguer un contrôle exécuté d’une suggestion. Les trois gabarits ci-dessous décrivent les entrées et les sorties attendues ; ils doivent être adaptés au dépôt et à ses moyens de vérification.",
            ],
            visual: {
              kind: "research",
              title: "Trois portes de validation",
              caption: "Chaque étape est relue avant d’ouvrir la suivante.",
              labels: ["Spécifier les écrans", "Construire en gris", "Contrôler et transmettre"],
            },
          },
          {
            type: "copyable",
            label: "Trois gabarits de prompts pour spécifier, construire et revoir",
            langTag: "text",
            code: `=== PROMPT 1 : brief.md → screens.md ===
ENTRÉE : brief.md.
Décrire les écrans et leurs tâches, les entrées/sorties, les données et les textes fournis.
Pour chacun : vide, chargement, idéal, partiel/débordement, erreur et confirmation des actions.
Signaler les rôles, permissions ou fonctionnalités non précisés ; ne pas les inventer.
SORTIE : screens.md et questions à faire trancher avant construction.

=== PROMPT 2 : screens.md → wireframe.html ===
ENTRÉES : screens.md, tokens.css, AGENTS.md.
Construire le HTML sémantique avec les contenus et états convenus.
Utiliser les espacements du projet ; la classe wire applique la présentation en niveaux de gris.
Rendre les états testables, par exemple via ?state=, sans ajouter de données présentées comme réelles.
Essayer le clavier et les largeurs 390, 768 et 1280px ; lancer les contrôles disponibles.
SORTIE : wireframe-<ecran>.html, commandes et résultats, limites et questions restantes.

=== PROMPT 3 : revue et passation ===
ENTRÉES : wireframe-<ecran>.html, screens.md, tokens.css et résultats disponibles.
Relier chaque défaut à un extrait de code ou à un scénario reproduit dans le navigateur.
Citer les critères WCAG pertinents sans déduire le contraste ou la taille réelle du seul nom d’un token.
Distinguer méthode, sévérité et résultat ; laisser les contrôles indisponibles à vérifier.
SORTIES : review.md avec constat, preuve et correctif ; handoff.md avec états et tests restants.`,
            note: "Remplacez les chemins et les commandes selon le projet. Comparez les sorties à screens.md et conservez les résultats de tests ; un prompt ne prouve pas que les vérifications demandées ont été exécutées.",
          },
          {
            type: "inlineCta",
            title: "Instructions et scanner dans l’archive",
            text: "Le Skill IA, le scanner agent_check.py et les 77 règles sont livrés dans l’archive, avec les gabarits de brief, de revue et de handoff.",
            buttonLabel: "Voir l’édition française · 29 $",
          },
        ],
      },
      {
        id: "patterns-interface-agentique",
        num: "04",
        tocLabel: "Contrôle de l’agent",
        heading: "Garder le contrôle sur les actions de l’agent",
        blocks: [
          {
            type: "h3",
            text: "Trois usages de l’IA à ne pas confondre",
          },
          {
            type: "p",
            text: "Faire produire une interface pendant le développement, intégrer un agent dans un produit et simuler un profil utilisateur posent des questions différentes. NN/g distingue notamment le design assisté de l’interface générée à l’exécution, et traite séparément les limites des utilisateurs synthétiques. La revue doit annoncer lequel de ces objets elle examine. [6] [7]",
          },
          {
            type: "table",
            caption: "Objet de la revue et conclusion permise",
            headers: [
              "Usage",
              "Ce qu’il faut examiner",
              "Ce que cela ne prouve pas",
            ],
            rows: [
              [
                "Agent de code pour l’équipe",
                "Diff, dépendances, commandes, tests et rendu produit.",
                "Que le besoin existe ou que des personnes comprennent le parcours.",
              ],
              [
                "Agent dans le produit",
                "Permissions, accord, journal réel, arrêt et reprise des actions ; génération d’UI éventuelle à l’exécution.",
                "Qu’une démonstration couvre les conséquences réelles ou tous les cas d’échec.",
              ],
              [
                "Profil utilisateur simulé",
                "Origine des données et statut d’hypothèse ; questions à examiner ensuite avec des personnes.",
                "Une observation de participant, une fréquence d’usage ou une validation du marché.",
              ],
            ],
          },
          {
            type: "h3",
            text: "Contrôler les actions de l’agent dans le produit",
          },
          {
            type: "explanation",
            paragraphs: [
              "Les recommandations Microsoft HAX et Google PAIR abordent la compréhension des capacités, la correction des erreurs et le contrôle laissé à la personne. Les six patterns ci-dessous en sont une synthèse de conception, à adapter aux permissions et aux conséquences du produit. Avant l’exécution, l’interface doit montrer les ressources auxquelles l’agent aura accès et les actions prévues. Lire un brouillon, modifier un document et envoyer un e-mail demandent des accords qui peuvent différer. Pendant l’exécution, un journal compréhensible indique ce qui est terminé, en attente ou en échec ; il doit décrire des opérations réelles plutôt qu’un texte de progression inventé. La commande d’arrêt doit être accessible et préciser ses limites. Si un e-mail est déjà parti, arrêter la tâche suivante ne le rappelle pas. Le bilan doit donc présenter ce qui a été exécuté, les changements réversibles et les opérations qui nécessitent encore une décision, avec un accès aux résultats concernés. Un essai utile consiste à interrompre une série d’actions après la première écriture. Le journal doit permettre de retrouver le document modifié et de savoir si les étapes suivantes ont commencé. Si une annulation est proposée, elle doit décrire son périmètre : restaurer une version précédente peut écraser des modifications faites entre-temps par un collègue. Présentez donc les effets de cette restauration avant de l’exécuter et conservez un résultat vérifiable après l’opération. Ce scénario exige la participation de l’équipe technique pour distinguer ce que le système peut annuler de ce que l’interface peut seulement expliquer.",
            ],
            visual: {
              kind: "permissions",
              title: "Adapter l’accord au risque",
              caption: "Le périmètre reste visible et l’arrêt reste accessible.",
              labels: ["Lire · périmètre défini", "Écrire · accord explicite", "Détruire · confirmation dédiée"],
            },
          },
          {
            type: "table",
            caption: "Six patterns de conception adaptés des recommandations HAX et PAIR",
            headers: ["Pattern", "Situation à traiter", "Comportement à spécifier"],
            rows: [
              [
                "Clarification",
                "La consigne laisse une décision fonctionnelle ouverte.",
                "Poser les questions qui empêchent une exécution sûre et expliquer les hypothèses proposées.",
              ],
              [
                "Plan relisible",
                "La personne veut examiner les actions avant de les lancer.",
                "Afficher les étapes et leurs dépendances ; permettre une modification quand elle est prise en charge.",
              ],
              [
                "Accès visibles",
                "Les ressources autorisées ne sont pas évidentes.",
                "Nommer les fichiers, services et limites d’accès ; permettre de retirer une permission et expliquer l’effet.",
              ],
              [
                "Permissions selon le risque",
                "Les actions ont des conséquences et une réversibilité différentes.",
                "Définir l’accord pour lecture, écriture et actions externes ou destructives ; confirmer les opérations à risque selon le produit.",
              ],
              [
                "Journal et arrêt",
                "Une opération longue doit rester suivie et contrôlable.",
                "Afficher les actions réelles avec état et résultat ; garder un arrêt accessible et préciser ce qu’il ne peut plus annuler.",
              ],
              [
                "Bilan consultable",
                "Le résultat contient des opérations terminées, des hypothèses et des échecs.",
                "Relier le bilan aux éléments modifiés ; identifier les vérifications faites, les incertitudes et le travail restant.",
              ],
            ],
          },
        ],
      },
      {
        id: "verifier-ia-trois-statuts",
        num: "05",
        tocLabel: "Vérification des sorties",
        heading: "Séparer méthode de contrôle, sévérité et résultat",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "La vérification d’une interface générée doit préciser les données examinées et les défauts qu’elle peut identifier. Une analyse du code peut retrouver un label manquant, tandis qu’un contrôle dans le navigateur mesure les couleurs composées et la position réelle d’un élément. Le parcours au clavier révèle d’autres problèmes, comme un focus bloqué derrière une modale ou un bouton masqué par une barre fixe. Ces contrôles doivent être préparés avec les états de l’écran, les deux thèmes et des contenus de longueur différente. Pour chaque échec, gardez la commande ou le scénario utilisé et l’endroit où le défaut a été observé. Après correction, rejouez le cas et examinez les composants qui partagent la règle modifiée. La compréhension de l’offre et la récupération après une erreur demandent aussi des essais avec des personnes. Le rapport final doit identifier ces vérifications restantes sans leur attribuer le résultat d’un scan technique.",
            ],
            visual: {
              kind: "checklist",
              title: "Contrôler le rendu réel",
              caption: "La compilation ne remplace pas le parcours de vérification.",
              labels: ["Lire le code", "Ouvrir les deux thèmes", "Parcourir au clavier", "Essayer un cas d’erreur"],
            },
          },
          {
            type: "diagram",
            visual: {
              kind: "checklist",
              title: "Du code à une tâche complète",
              caption: "Un rapport indique le périmètre testé, la méthode, les échecs et les vérifications restantes ; il ne conclut pas à la place des tests manquants.",
              labels: [
                "Structure et noms accessibles",
                "Contrastes sur les vrais fonds",
                "Clavier, focus et fermeture",
                "États vides, longs et en erreur",
                "Compréhension avec des personnes",
              ],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Le rapport sépare la méthode de contrôle, la sévérité du défaut et le résultat obtenu. Dans la checklist utilisée ici, les statuts sont Automatisé, À vérifier et Non applicable. Le premier désigne une règle décidée par le contrôle exécuté ; le deuxième signale une mesure du rendu ou un jugement encore nécessaire ; le dernier demande une raison liée au périmètre ou à la plateforme. Une vérification automatisée de contraste peut donc avoir une sévérité Bloquant et un résultat Échoué. Elle doit arrêter la livraison si cette politique a été choisie dans le projet. Un contrôle non applicable n’est pas une réussite, et une tâche à vérifier ne doit pas disparaître du rapport parce que le build compile. Le résumé d’exécution d’un agent peut aussi distinguer ce qui a été vérifié, supposé ou laissé en attente, mais ce résumé doit renvoyer aux commandes et aux scénarios concernés. Ces champs permettent de reprendre le travail sans confondre l’état du contrôle avec celui de l’interface.",
            ],
            visual: {
              kind: "report",
              title: "Trois colonnes différentes",
              caption: "Un contrôle automatique peut échouer et bloquer une livraison.",
              labels: ["Méthode", "Sévérité", "Résultat", "Automatisé", "Bloquant", "Échoué"],
            },
          },
          {
            type: "h3",
            text: "Relier chaque conclusion à sa méthode",
          },
          {
            type: "p",
            text: "Une preuve de compilation, une mesure de contraste et une observation de participant répondent à des questions différentes. Les outils ne déterminent pas à eux seuls l’accessibilité ; un agent capable de parcourir le navigateur ne devient pas pour autant un participant représentatif. Conservez l’environnement, le scénario, le résultat observé et l’élément qui permet de le retrouver. Les sorties simulées restent des hypothèses, même lorsqu’elles sont plausibles. [6] [9]",
          },
          {
            type: "table",
            caption: "Une conclusion limitée au contrôle réellement effectué",
            headers: [
              "Contrôle",
              "Trace à conserver",
              "Limite à annoncer",
            ],
            rows: [
              [
                "Build et analyse statique",
                "Commande, révision, résultat et journal expurgé des secrets.",
                "La compilation ne montre pas l’usage, le clavier ou la lisibilité.",
              ],
              [
                "Contraste et mise en page",
                "Navigateur, largeur, thème, état, couleurs composées et scénario.",
                "Une capture seule ne mesure pas toutes les propriétés ; un état ne couvre pas les autres.",
              ],
              [
                "Revue manuelle clavier et technologie d’assistance",
                "Parcours, outil et version, action, comportement attendu et observé.",
                "Résultat limité à l’environnement et au scénario ; pas une certification complète.",
              ],
              [
                "Étude avec des participants",
                "Protocole, recrutement, contexte, notes pseudonymisées et limites de l’échantillon.",
                "Ne pas convertir une série qualitative en taux représentatif ni une simulation en témoignage.",
              ],
            ],
          },
          {
            type: "copyable",
            label: "review.md — fiche YAML à intégrer (contrôle non exécuté)",
            langTag: "yaml",
            code: `# Gabarit uniquement : aucune vérification n’a été exécutée ici.
scenario: reprise_export_apres_erreur
contexte:
  revision: a_renseigner
  navigateur_et_version: a_renseigner
  largeur_css_px: null
  theme_et_etat: a_renseigner
controle:
  methode: a_verifier
  severite_si_echec: a_decider
  resultat: non_execute
  attendu: "Les filtres sont conservés après l’échec."
  observe: null
  preuve: null
suivi:
  responsable: a_attribuer
  action: a_decider
  contre_test: non_execute`,
            note: "Ce bloc peut être intégré à review.md. Le résultat est volontairement non exécuté : remplacez les champs après le contrôle réel, sans données de participant ni secret dans un rapport public.",
          },
          {
            type: "readingLink",
            slug: "ux-design-guide",
            sectionId: "audit-20-min-checklist-40",
            label: "Choisir la méthode et préparer une session avec des participants",
            text: "Pour comprendre une hésitation ou une erreur d’usage, revenez à la question de recherche plutôt que de demander une validation à un profil simulé.",
          },
        ],
      },
      {
        id: "design-revenu-prix-cadrage",
        num: "06",
        tocLabel: "Argumentation et budget",
        heading: "Argumenter les choix et chiffrer le périmètre",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Une décision de conception se présente avec le problème observé, la modification proposée et le moyen d’en examiner l’effet. Sur téléphone, une capture peut montrer que le clavier recouvre le bouton de paiement. La proposition décrit alors un placement qui garde le champ actif et l’action accessibles, puis un scénario de revue avec le clavier ouvert. Le résultat commercial reste à mesurer après livraison sur une période et une population définies. Si les tarifs, l’acquisition ou le formulaire ont changé en même temps, toute l’évolution du taux de conversion ne peut pas être attribuée au déplacement du bouton. En réunion, formulez la décision attendue et les contraintes qui restent à arbitrer, notamment le délai et les dépendances techniques. La trace écrite doit permettre de retrouver pourquoi l’option a été retenue. Un désaccord peut être consigné avec les risques discutés et la personne qui a décidé, sans transformer cette note en jugement sur ses compétences.",
            ],
            visual: {
              kind: "journey",
              title: "Présenter un raisonnement",
              caption: "L’effet attendu reste distinct du résultat observé après livraison.",
              labels: ["Constat sur l’écran", "Changement proposé", "Effet attendu", "Mesure après livraison"],
            },
          },
          {
            type: "h3",
            text: "Calculer un prix avec ses propres hypothèses",
          },
          {
            type: "explanation",
            paragraphs: [
              "Le prix d’une mission dépend du temps disponible, des charges et des travaux effectivement inclus. Commencez par vos jours facturés sur plusieurs mois, puis distinguez la production de la prospection, de l’administration et des périodes sans contrat. Les douze jours facturables par mois, les 30 % de marge et les 20 % d’aléas parfois utilisés dans une simulation sont des hypothèses à remplacer par vos données. Pour un projet, la formule `Prix = Jours estimés × TJM + Réserve de risque + Outils` oblige à expliciter ce qui est couvert. Ajoutez les dépendances : contenus fournis par le client, accès aux environnements et dates de validation. Une demande de nouvel écran peut déplacer le calendrier même si le dessin paraît simple. Si le budget baisse, discutez des livrables reportés et des conséquences sur le parcours avant de modifier le prix. Le devis doit ensuite reprendre le périmètre convenu, les exclusions et la manière de traiter une demande supplémentaire. La réserve de risque doit correspondre à des incertitudes nommées, par exemple une intégration non documentée ou une validation externe. Si ces risques se réalisent, le suivi de mission permet de comparer le temps prévu au temps consommé et d’améliorer l’estimation suivante. Séparez enfin le calcul interne du prix proposé : l’offre doit surtout permettre au client de comprendre les livrables, leurs conditions et les étapes de paiement convenues.",
            ],
            visual: {
              kind: "scope",
              title: "Chiffrer un périmètre",
              caption: "Temps, risque et outils sont explicités avant l’accord.",
              labels: ["Jours estimés × TJM", "Réserve de risque", "Outils et livrables", "Total et exclusions"],
            },
          },
          {
            type: "doDont",
            doTitle: "Points à négocier si le budget baisse",
            dontTitle: "Engagements à éviter sans examen",
            doItems: [
              "Identifier les parcours qui doivent rester complets et les fonctions qui peuvent être reportées.",
              "Définir des jalons de validation et un échéancier de paiement adapté au contrat.",
              "Convenir d’un interlocuteur pour les arbitrages et du traitement des retours consolidés.",
            ],
            dontItems: [
              "Réduire le prix sans recalculer le temps, les charges et les livrables inclus.",
              "Accepter un forfait sans exclusions ni procédure de demande supplémentaire.",
              "Intégrer des consignes contradictoires reçues sur plusieurs canaux sans arbitrage.",
            ],
          },
          {
            type: "copyable",
            label: "Exemple de proposition et de réponses aux demandes de changement",
            langTag: "markdown",
            code: `# PROPOSITION — Exemple de structure en une page
1. BESOIN : tâche, public, problème observé et source de l’observation.
2. LIVRABLES : écrans et états nommés, fichiers, méthodes et périmètre d’évaluation.
3. EXCLUSIONS : fonctions, contenus et travaux non compris ; procédure de changement.
4. CALENDRIER : étapes, dépendances et validations attendues de chaque partie.
5. PRIX : montant, devise, hypothèses et durée de validité de l’offre.
6. PAIEMENT : échéancier convenu ; 40/30/30 constitue un exemple à négocier.
7. ACCORD : décision attendue, interlocuteur et prochaine date.

# EXEMPLES DE RÉPONSES À ADAPTER
- Retours dispersés : « Je regroupe les demandes dans un document ; pouvez-vous arbitrer les points contradictoires avant [date] ? »
- Nouvel écran : « Cette demande ajoute [travail] au périmètre validé. Je prépare une estimation du coût et du délai avant de l’intégrer. »
- Validation manquante : « L’étape suivante dépend de votre accord sur [décision]. Sans réponse au [date], nous devrons revoir le calendrier. »
- Choix incertain : « Nous pouvons observer la compréhension de ces deux libellés sur [tâche]. Pour comparer des taux, il faudra un autre protocole. »
- Retour imprécis : « Quelle information manque ou quelle action vous paraît difficile à repérer sur cet écran ? »`,
            note: "Adaptez livrables, montants, délais et conditions au contrat. Le kit A4 comprend des fiches de brief, de proposition et de passation à remplir.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Quelle longueur donner à un fichier AGENTS.md ?",
        a: "La longueur utile dépend des décisions du projet et de la manière dont l’outil charge ses instructions. Une limite de lignes ne garantit pas le respect des règles. Nommez les fichiers de référence, les règles observables, les actions autorisées et les commandes de contrôle. Retirez les répétitions et les consignes contradictoires, puis vérifiez le comportement sur une tâche réelle.",
      },
      {
        q: "Quand utiliser un wireframe HTML en niveaux de gris ?",
        a: "Il est utile lorsque l’équipe doit encore examiner l’ordre du contenu, les champs et les états. Le navigateur permet déjà d’essayer le clavier, les textes longs et les points de rupture. Ce jalon ne garantit pas la qualité de la structure : il faut nommer les décisions relues et les questions ouvertes. Si le système visuel est déjà stabilisé, adaptez la présentation au projet.",
      },
      {
        q: "Comment choisir les jours facturables pour un calcul de tarif ?",
        a: "Utilisez les jours réellement facturés sur plusieurs mois. Distinguez le temps de production, la prospection, l’administration et les périodes sans contrat, puis ajoutez vos charges et outils. Douze jours mensuels est une hypothèse d’exemple à remplacer. Recalculez si le périmètre, les dépendances ou le calendrier changent.",
      },
      {
        q: "Comment traiter un désaccord avec un client sur un écran ?",
        a: "Décrivez le problème observé et séparez-le de l’effet commercial que vous anticipez. Proposez une vérification adaptée : observation de la tâche pour la compréhension, protocole chiffré pour comparer des taux. Si une autre option est retenue, consignez la décision, les risques discutés et le responsable de l’arbitrage. Ce document aide à suivre le projet ; il ne garantit ni le résultat ni la relation commerciale.",
      },
    ],
    ctaTitle: "Un kit pour votre prochain projet",
    ctaText: "L’édition française du UX/UI Playbook comprend le livre de 182 pages, le kit imprimable de 26 pages et une archive de 21 fichiers de travail.",
    ctaBullets: [
      "Livre en français avec exemples d’écrans annotés",
      "12 fiches A4 pour le brief, l’audit et la passation",
      "Tokens, gabarits, règles et scanner Python dans l’archive",
    ],
    entityDefinition: "Le design produit contribue à la conception et à l’évolution d’un produit en reliant besoins des utilisateurs, objectifs de l’activité et contraintes techniques. Il travaille avec le product management, la recherche et l’ingénierie ; il ne possède pas seul la stratégie ni la roadmap. Un agent IA assiste ce travail sans remplacer les décisions de l’équipe.",
    references: [
      {
        title: "Guidelines for Human-AI Interaction",
        url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
        publisher: "Microsoft Research · Amershi et al.",
        date: "2019",
        note: "18 recommandations, validées selon le protocole de l’article CHI 2019 ; elles ne prescrivent pas mot pour mot les 6 patterns du Playbook.",
      },
      {
        title: "People + AI Guidebook",
        url: "https://pair.withgoogle.com/guidebook/",
        publisher: "Google PAIR",
        date: "2024",
        note: "Guide vivant sur besoins, modèles mentaux, contrôle et gestion des erreurs ; les patterns ci-dessus en sont une synthèse pratique.",
      },
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "Critères normatifs à tester ; une passe axe-core ne suffit pas à conclure à la conformité.",
      },
      {
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
        publisher: "EUR-Lex · Union européenne",
        date: "2026-07-27",
        note: "Texte consolidé : art. 50 (obligations et exceptions), 111(4) (transition au 2 décembre 2026 pour certains systèmes existants) et 113 (application). Vérifier le rôle et l’usage concernés.",
      },
      {
        title: "UX Disciplines: Glossary",
        url: "https://www.nngroup.com/articles/ux-disciplines-glossary/",
        publisher: "Raluca Budiu · Nielsen Norman Group",
        date: "2026-10-23",
        note: "Consulté le 18 novembre 2026. UI visuelle et interactive ; responsabilités variables selon les organisations ; Product Design distinct du Product Management.",
      },
      {
        title: "Synthetic Users: If, When, and How to Use AI-Generated “Research”",
        url: "https://www.nngroup.com/articles/synthetic-users/",
        publisher: "Maria Rosala & Kate Moran · Nielsen Norman Group",
        date: "2024-06-21",
        note: "Consulté le 18 novembre 2026. Évaluation de profils simulés et limites méthodologiques : des hypothèses de préparation ne sont pas des observations de participants.",
      },
      {
        title: "Generative UI and Outcome-Oriented Design",
        url: "https://www.nngroup.com/articles/generative-ui/",
        publisher: "Kate Moran & Sarah Gibbons · Nielsen Norman Group",
        date: "2024-03-22",
        note: "Consulté le 18 novembre 2026. Distingue design assisté et génération à l’exécution. Le scénario prospectif présenté n’est pas une preuve de maturité de tous les outils actuels.",
      },
      {
        title: "Application card: GitHub Copilot Agents",
        url: "https://docs.github.com/en/copilot/responsible-use/agents",
        publisher: "GitHub Docs",
        date: "Consulté le 18 novembre 2026",
        note: "Capacités, permissions et limites des agents ; supervision humaine et responsabilité des commandes. Documentation d’un fournisseur, pas validation du workflow Playbook.",
      },
      {
        title: "Selecting Web Accessibility Evaluation Tools",
        url: "https://www.w3.org/WAI/test-evaluate/tools/selecting/",
        publisher: "W3C · Web Accessibility Initiative",
        date: "Consulté le 18 novembre 2026",
        note: "Les outils assistent l’évaluation ; certaines vérifications demandent un jugement humain et des résultats peuvent être inexacts.",
      },
    ],
  },
  COMPARISON_FR,
];
