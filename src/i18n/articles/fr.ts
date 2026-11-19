import type { ArticleData } from './types';

export const ARTICLES_FR: ArticleData[] = [
  /* ============================================================================
   * COURS 1 (FR) — UX DESIGN OPÉRATIONNEL
   * ========================================================================== */
  {
    slug: 'ux-design-guide',
    category: 'UX Design',
    icon: '🧭',
    readTime: '18 min de lecture',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-ux-fr.jpg',
    metaTitle:
      "Guide UX Design : parcours et audit | UX/UI Playbook",
    metaDescription:
      "Concevez un parcours UX clair : 10 lois et principes, 5 états d’écran, checkout accessible et checklist de 40 points à appliquer avant livraison.",
    keywords: [
      'UX Design opérationnel',
      'charge cognitive Cowan 4 blocs',
      'loi de Fitts loi de Hick',
      '5 états écran UX',
      'optimisation checkout Baymard',
      'accessibilité EAA WCAG 2.2 2026',
      'checklist audit UX 40 points',
    ],
    title:
      "UX Design : concevoir un parcours clair et auditer vos écrans",
    subtitle:
      "Passez d’un brief flou à des écrans testables : objectifs utilisateur, lois cognitives, états limites et audit avant livraison. Les seuils du Playbook sont des points de départ à vérifier dans votre contexte.",
    aeoSummaryTitle: 'Synthèse exécutive — Ce qu’il faut retenir',
    aeoSummary:
      "Commencez par un objectif utilisateur et une action primaire. Prévoyez les 5 états d’écran du guide : vide, chargement, idéal, partiel/débordement et erreur, avec confirmation après une action réussie. Les 4 ± 1 blocs de Cowan éclairent la mémoire de travail ; leur traduction en groupes d’interface est une heuristique à tester. Mesurez le contraste WCAG 2.2 AA (4,5:1 pour le texte courant) et visez des cibles de 44 × 44 px selon le Playbook ; le minimum web AA est 24 × 24 px avec exceptions. Quelques tests observés révèlent des problèmes, mais ne prouvent ni l’exhaustivité ni un gain de conversion.",
    keyStats: [
      {
        value: '4 ± 1 blocs',
        label: "Estimation de mémoire de travail dans les conditions étudiées, pas un plafond universel de boutons",
        source: "Nelson Cowan · Behavioral and Brain Sciences (2001)",
        evidence: "established",
        url: "https://doi.org/10.1017/S0140525X01003922",
      },
      {
        value: '70,22 %',
        label: "Abandon moyen de panier : moyenne non pondérée de 50 études, pas le taux de votre checkout",
        source: "Baymard Institute · 28 octobre 2026",
        evidence: "established",
        url: "https://baymard.com/blog/cart-abandonment-rate",
      },
      {
        value: '95,9 %',
        label: "Pages d’accueil de l’échantillon avec échecs WCAG détectables automatiquement",
        source: "WebAIM Million · février 2026",
        evidence: "established",
        url: "https://webaim.org/projects/million/",
      },
    ],
    sections: [
      {
        id: 'ux-pas-decoration',
        num: '01',
        tocLabel: 'Tuer le flou : les 4 questions & le test des 5 s',
        heading: 'Pourquoi l’UX n’est pas de la décoration (et comment désarmer les briefs flous)',
        blocks: [
          {
            type: 'p',
            text: 'Trois adjectifs reviennent dans presque tous les cahiers des charges : « moderne », « épuré », « intuitif ». Aucun des trois n’est un critère d’ingénierie. On ne peut ni coder « épuré », ni écrire un test unitaire pour « moderne ». Surtout, un écran intuitif n’existe jamais dans l’absolu : il n’est intuitif que pour une personne donnée, dans un état émotionnel donné, face à une tâche précise.',
          },
          {
            type: 'quote',
            tag: 'Règle d’or · Partie 00 & Section 01',
            text: 'Un écran n’est pas « beau » ou « moche ». Il est lisible, prévisible, cohérent et rapide. Le reste est du style — et le style se change en 20 minutes.',
          },
          {
            type: 'p',
            text: 'Pour comprendre la frontière entre esthétique (UI) et expérience (UX), prenez deux écrans visuellement jumeaux : même typographie soignée, même carte centrée, même gros bouton rouge vif en bas à droite. Sur un écran de paiement final (« Payer 132,90 € »), cette proéminence rassure et accélère la conclusion. Sur un écran de paramètres où ce même bouton signifie « Supprimer définitivement mon compte », la même esthétique devient un piège destructeur. Le dessin n’a pas bougé ; le contexte d’intention a tout inversé.',
          },
          {
            type: 'h3',
            text: 'Les quatre questions qui verrouillent un écran avant d’ouvrir Figma ou un éditeur',
          },
          {
            type: 'p',
            text: 'L’erreur la plus coûteuse d’un développeur ou d’un fondateur solo consiste à dessiner des rectangles avant d’avoir écrit les règles du parcours. Avant de tracer la moindre bordure, chaque écran doit répondre par écrit à quatre questions non négociables :',
          },
          {
            type: 'steps',
            title: 'Cadrage pré-dessin d’un écran (Section 01)',
            steps: [
              {
                bold: 'Qui ouvre cet écran, et dans quel état d’esprit ?',
                text: 'Un comptable qui rapproche 80 factures le vendredi soir (pressé, expert, clavier) n’a pas le même besoin qu’un acheteur mobile dans le métro (distrait, une seule main, réseau instable) ou qu’un utilisateur confronté à un rejet bancaire (inquiet, méfiant).',
              },
              {
                bold: 'Quel verbe unique doit-il accomplir ici ?',
                text: 'Formulez l’objectif en une phrase contenant un seul verbe d’action : « comparer trois formules », « confirmer son créneau », « exporter le relevé mensuel ». Si votre phrase contient la conjonction « et », vous avez probablement deux écrans fusionnés de force.',
              },
              {
                bold: 'Quel est le chemin physique et cognitif le plus court vers ce verbe ?',
                text: 'Comptez chaque champ à lire, chaque menu à dérouler, chaque décision intermédiaire. Tout élément qui ne rapproche pas l’utilisateur de ce verbe prélève une taxe d’attention.',
              },
              {
                bold: 'Que se passe-t-il quand ce chemin échoue ?',
                text: 'Liste vide au premier lancement, API qui met six secondes à répondre, nom de famille à 42 caractères, carte refusée : c’est la tenue dans l’échec qui distingue un produit professionnel d’une démo.',
              },
            ],
          },
          {
            type: 'h3',
            text: "Le diagnostic rapide : le test des 5 secondes",
          },
          {
            type: 'p',
            text: 'Vous voulez savoir immédiatement si votre page d’accueil ou votre tableau de bord fonctionne ? Montrez l’écran à une personne extérieure au projet pendant exactement cinq secondes, refermez l’ordinateur, puis posez deux questions : « Que fait ce produit ? » et « Sur quoi cliqueriez-vous pour commencer ? ». Si votre interlocuteur hésite, récite un slogan vague ou n’a pas repéré l’action primaire, inutile de retoucher les ombres ou les dégradés : votre problème est structurel. Refaites ce test après chaque itération.',
          },
        ],
      },

      {
        id: 'lois-cognitives-reelles',
        num: '02',
        tocLabel: 'Les vraies lois du cerveau (Cowan, Hick, Fitts)',
        heading: 'Les lois cognitives telles que la recherche les formule vraiment (et comment les citer)',
        blocks: [
          {
            type: 'p',
            text: 'La plupart des articles de vulgarisation répètent des lois tronquées. Or une loi mal comprise conduit à de mauvaises décisions d’interface — par exemple cacher des outils quotidiens derrière trois sous-menus au nom d’une lecture simpliste de la loi de Hick, ou tolérer des grilles de sept colonnes au nom du vieux chiffre de Miller (1956). Voici ce que disent réellement les publications primaires et comment les traduire dans votre code.',
          },
          {
            type: 'h3',
            text: "1. Cowan (2001) : environ 4 blocs en mémoire de travail",
          },
          {
            type: 'p',
            text: "Miller (1956) et Cowan (2001) ne mesurent pas une règle de mise en page. Cowan rassemble des résultats suggérant environ 4 ± 1 blocs lorsque les stratégies de regroupement et de répétition sont contrôlées. Cela justifie de limiter ce qu’une personne doit retenir pendant une tâche, mais pas de décréter qu’un écran ne doit jamais contenir plus de cinq éléments. Le Playbook propose des groupes de 3 à 5 pour amorcer la hiérarchie : vérifiez ensuite la compréhension avec les personnes concernées.",
          },
          {
            type: 'h3',
            text: '2. Hick-Hyman (1952–1953) : l’exception décisive de la mémoire spatiale',
          },
          {
            type: 'p',
            text: "La loi de Hick-Hyman décrit la relation entre temps de choix et quantité d’information dans une tâche expérimentale. Le nombre d’options ne suffit donc pas à prédire un parcours réel : libellés, probabilité des choix, regroupement et apprentissage comptent aussi. Rendez l’action principale reconnaissable au premier usage et préservez les raccourcis connus des utilisateurs réguliers. Ce sont des décisions de conception à observer, pas une preuve qu’un menu quotidien échappe à toute contrainte cognitive.",
          },
          {
            type: 'h3',
            text: '3. Fitts (1954) : le glyphe n’est jamais la cible tactile',
          },
          {
            type: 'p',
            text: "La loi de Fitts relie le temps de pointage au rapport entre la distance à parcourir et la largeur utile de la cible. Détail que beaucoup d’équipes ignorent : la largeur pertinente se mesure sur la dispersion réelle des impacts du doigt ou du curseur, pas sur le dessin de l’icône. Une croix de fermeture dessinée en 16 × 16 px qui n’a que 16 px de zone cliquable viole Fitts et provoque des erreurs de tapotement permanentes. Séparez systématiquement la boîte visuelle du glyphe (16–20 px) de la boîte d’interaction (`min-width: 44px; min-height: 44px` sur le web, `44 × 44 pt` sur iOS, `48 × 48 dp` sur Android).",
          },
          {
            type: 'table',
            caption: "Les 10 lois et principes de la Section 03 : résultats de recherche et heuristiques de conception ne sont pas interchangeables.",
            headers: ['Loi / Principe', 'Mécanisme cognitif réel', 'Traduction immédiate dans l’écran'],
            rows: [
                    [
                      "Jakob",
                      "Les habitudes acquises sur d’autres produits influencent les attentes.",
                      "Conservez les conventions familières ; vérifiez-les avec votre public."
                    ],
                    [
                      "Fitts (1954)",
                      "Le temps de pointage dépend notamment de la distance et de la largeur de cible.",
                      "Découplez le glyphe de sa zone d’interaction ; visez 44 × 44 px sur ce projet web."
                    ],
                    [
                      "Hick-Hyman (1952–1953)",
                      "Le temps de choix varie avec l’information à traiter ; contexte et apprentissage comptent.",
                      "Nommez et regroupez les choix. Préservez les raccourcis appris."
                    ],
                    [
                      "Cowan (2001)",
                      "Environ 4 ± 1 blocs en mémoire de travail dans les conditions étudiées.",
                      "Réduisez la mémorisation imposée ; commencez par des groupes de 3 à 5, puis testez."
                    ],
                    [
                      "Proximité (Gestalt)",
                      "Des éléments proches sont perçus comme liés.",
                      "Exemple de rythme : 8 px dans un groupe, 24–32 px entre groupes."
                    ],
                    [
                      "Similarité",
                      "Des éléments visuellement proches suggèrent une fonction commune.",
                      "Rendez les mêmes actions cohérentes ; distinguez statut passif et contrôle."
                    ],
                    [
                      "Effet Von Restorff",
                      "Un élément distinctif peut être mieux mémorisé dans son contexte.",
                      "Réservez la plus forte saillance à l’action primaire."
                    ],
                    [
                      "Pareto — heuristique",
                      "Une partie des fonctions peut concentrer l’usage ; aucun ratio fixe n’est garanti.",
                      "Mesurez les tâches fréquentes et optimisez-les avant les fonctions secondaires."
                    ],
                    [
                      "Seuil de Doherty — repère",
                      "Une attente sans retour peut interrompre la continuité de la tâche.",
                      "Accusez réception immédiatement ; utilisez 400 ms comme repère de méthode, pas comme limite universelle."
                    ],
                    [
                      "Effet esthétique-utilisabilité",
                      "L’apparence peut influencer l’utilisabilité perçue sans prouver l’efficacité réelle.",
                      "Soignez le premier écran et mesurez séparément réussite, erreurs et temps de tâche."
                    ]
                  ],
          },
          {
            type: 'callout',
            icon: '🗣️',
            tone: 'accent',
            title: 'Comment transformer une critique subjective en arbitrage objectif',
            text: 'En revue client ou produit, ne répondez jamais « je trouve ça plus lisible ». Dites : « Sur cet écran, nous avons six boutons de même poids visuel ; l’effet Von Restorff est annulé et l’entropie de Hick-Hyman ralentit le premier clic. On garde le verbe principal en plein et on passe les cinq autres en secondaire. » Vous déplacez instantanément la discussion du goût personnel vers la mécanique.',
          },
        ],
      },

      {
        id: 'budget-cognitif-parcours',
        num: '03',
        tocLabel: 'Budget d’écran & parcours jusqu’à J+7',
        heading: 'Charge cognitive & parcours complet : de l’intention initiale au retour sans relance à J+7',
        blocks: [
          {
            type: 'p',
            text: 'Chaque écran consomme un carburant que vous ne pouvez pas fabriquer : l’attention disponible de votre utilisateur. Vous ne pouvez qu’en gaspiller moins que vos concurrents. Sur le terrain, la surcharge vient presque toujours des trois mêmes fuites : le texte qui explique l’interface (« Cliquez sur le bouton ci-dessous pour valider votre demande » prouve simplement que le bouton est mal nommé), les synonymes concurrents (« Enregistrer », « Valider » et « Confirmer » dans le même produit), et les décorations muettes (compteurs, badges et jauges qui ne déclenchent aucune décision).',
          },
          {
            type: 'h3',
            text: 'Le test du comptoir et les budgets de densité par famille d’écran',
          },
          {
            type: 'p',
            text: 'Appliquez le test du comptoir (Section 04) : lisez les libellés de votre écran à voix haute comme si vous parliez à un client debout face à vous au guichet d’une agence. Si vous ressentez le besoin d’ajouter une phrase orale pour expliquer ce qu’il faut faire (« en fait là il faut d’abord choisir la devise avant de saisir le montant »), votre interface ment par omission. Corrigez l’ordre ou le libellé directement dans l’écran.',
          },
          {
            type: 'doDont',
            doTitle: '✓ Ce qui protège l’attention',
            dontTitle: '✕ Ce qui épuise l’utilisateur',
            doItems: [
              'Une seule action primaire par vue ; toutes les actions secondaires en contour ou texte discret.',
              'Des verbes qui annoncent le résultat concret : « Créer mon espace » ou « Télécharger le reçu PDF ».',
              'Des valeurs par défaut pré-remplies selon le cas le plus fréquent (pays, période, formule recommandée).',
              'Divulgation progressive : ne demander une donnée qu’à la seconde exacte où elle débloque de la valeur.',
            ],
            dontItems: [
              'Trois boutons pleins côte à côte (« Annuler », « Sauvegarder brouillon », « Publier ») de même intensité.',
              'Un formulaire d’inscription de 12 champs avant que la personne ait vu la moindre utilité du produit.',
              'Des infobulles `(?)` ajoutées partout pour rattraper des intitulés de colonnes incompréhensibles.',
              'Tout afficher « au cas où un utilisateur avancé en aurait besoin un jour ».',
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ux-cognitive.webp',
            alt: 'Planche extraite du UX/UI Playbook Français détaillant les plafonds de densité par type d’écran et la réduction de charge cognitive',
            caption:
              'Plafonds de densité recommandés par territoire : page d’accueil (1 promesse, 1 action, 3 preuves), formulaire (5 à 7 champs par étape), dashboard (3 KPI, 1 graphique, 1 liste).',
            sourceRef: 'UX/UI Playbook FR · Partie 01, Section 04 (p. 13)',
            width: 1080,
            height: 1527,
          },
          {
            type: 'h3',
            text: 'Un écran isolé ne veut rien dire : la séquence A → E et les 5 points de rupture',
          },
          {
            type: 'p',
            text: 'Juger une capture PNG hors de sa séquence est une illusion d’atelier. Un utilisateur traverse toujours cinq temps : A. Déclencheur (une raison concrète d’ouvrir) → B. Compréhension (savoir en 5 secondes ce que fait l’écran) → C. Action (agir sans friction) → D. Preuve (voir immédiatement que l’action a abouti) → E. Retour (revenir sans effort avec son contexte intact).',
          },
          {
            type: 'steps',
            title: 'Les 5 moments exacts où un produit perd ses utilisateurs (Section 05)',
            steps: [
              {
                bold: "Rupture n°1 — L’arrivée peu claire",
                text: 'Le titre parle de la vision philosophique de l’entreprise au lieu de nommer le problème résolu en cinq secondes.',
              },
              {
                bold: 'Rupture n°2 — Le péage prématuré à l’inscription',
                text: 'Exiger téléphone, société, taille d’équipe et carte bancaire avant d’avoir livré le moindre aperçu de valeur.',
              },
              {
                bold: 'Rupture n°3 — Le premier succès silencieux',
                text: 'L’utilisateur clique sur « Enregistrer » ; rien ne bouge, ou un toast furtif disparaît en une seconde. Dans le doute, il revient en arrière pour vérifier.',
              },
              {
                bold: 'Rupture n°4 — L’amnésie au retour',
                text: 'À la reconnexion le lendemain, ses filtres, son brouillon ou son étape en cours ont disparu.',
              },
              {
                bold: 'Rupture n°5 — L’erreur accusatrice et sans issue',
                text: 'Un bandeau rouge « Requête invalide (422) » blâme l’utilisateur sans lui indiquer quel champ corriger ni comment.',
              },
            ],
          },
          {
            type: 'quote',
            tag: 'Le seul juge final de l’UX · Section 05',
            text: 'Le meilleur indicateur UX du marché est le retour spontané à J+7 sans e-mail de relance ni notification push. Un produit dont on se souvient parce qu’il a résolu un vrai problème en moins de 60 secondes a gagné.',
          },
        ],
      },

      {
        id: 'cinq-etats-checkout-vide',
        num: '04',
        tocLabel: 'Les 5 états, l’onboarding & le Checkout',
        heading: 'Anatomie des écrans critiques : les 5 états obligatoires, l’état vide et le Checkout',
        blocks: [
          {
            type: 'p',
            text: "Pourquoi tant d’applications codées vite — à la main ou avec un agent IA — donnent-elles une impression d’inachevé dès la première minute d’usage réel ? Parce qu’on n’a dessiné que l’état « carte postale » : celui où la base de données contient pile six lignes propres, où les prénoms font douze lettres et où l’API répond en 40 millisecondes. En ingénierie d’interface, cet état idéal n’est qu’une partie du livrable.",
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ux-states.webp',
            alt: 'Planche des 5 états obligatoires de chaque écran issue du UX/UI Playbook Français : vide, chargement, idéal, partiel et erreur',
            caption:
              'Un écran n’est terminé que lorsque ses cinq états — vide, chargement sans saut CLS, idéal, débordement/partiel et erreur actionnable — sont spécifiés et codés.',
            sourceRef: 'UX/UI Playbook FR · Partie 01, Section 07 (p. 17)',
            width: 1080,
            height: 1246,
          },
          {
            type: 'h3',
            text: 'Cas pratique n°1 : réussir son état vide et passer sous la barre des 60 secondes',
          },
          {
            type: 'p',
            text: "L’écran le plus stratégique de votre SaaS est celui que vos nouveaux inscrits découvrent avant d’avoir créé leurs données : l’état vide (Section 17). La plupart des produits y affichent un sinistre « Aucune donnée trouvée » ou une illustration géante qui repousse le bouton d’action sous la ligne de flottaison mobile. Un état vide qui convertit obéit à six règles strictes : 1) un constat factuel sans fausse blague (« Aucun tableau pour l’instant »), 2) une phrase expliquant la valeur une fois rempli, 3) un bouton primaire qui crée réellement le premier objet en un clic, 4) une voie rapide alternative (« Ou importer un CSV / partir d’un modèle »), 5) zéro illustration démesurée sur mobile, et 6) aucune barre d’outils grisée intimidante autour. Visez un premier résultat visible en moins de 60 secondes, puis testez cet objectif sur votre propre parcours : c’est un repère du Playbook, pas un seuil de rétention universel.",
          },
          {
            type: 'h3',
            text: 'Cas pratique n°2 : le Checkout, l’écran où chaque champ en trop détruit du chiffre d’affaires',
          },
          {
            type: 'p',
            text: "La compilation Baymard de 50 études e-commerce, mise à jour le 28 octobre 2026, donne un abandon moyen non pondéré de 70,22 % (fourchette 55–84 %). Ses recherches de checkout comptent 23,48 éléments de formulaire en moyenne, contre 12 à 14 dans les parcours simplifiés étudiés. Il s’agit d’éléments, pas de champs, et non d’un objectif valable pour chaque boutique. Réduisez les demandes inutiles et testez la compréhension du montant final (Section 14) :",
          },
          {
            type: 'list',
            heading: 'Les 6 leviers mesurables d’un Checkout qui encaisse (Section 14)',
            items: [
              {
                bold: 'Invité par défaut, jamais de compte forcé',
                text: "La création de compte obligatoire ajoute une étape avant l’achat. Proposez la création de compte en un clic sur la page de confirmation, une fois le paiement acquis.",
              },
              {
                bold: 'Zéro frais découverts à la dernière étape',
                text: 'Affichez un récapitulatif persistant (collant à droite sur desktop, dépliable en haut sur mobile) détaillant sous-total, livraison et taxes dès le début.',
              },
              {
                bold: 'Une logique par ligne',
                text: 'Prénom et nom côte à côte sur desktop, adresse sur toute la largeur, téléphone uniquement si le transporteur l’exige (avec explication en 5 mots sous le champ).',
              },
              {
                bold: 'Trois moyens de paiement maximum en tuiles claires',
                text: 'Présélectionnez la méthode majoritaire de votre marché (Carte / Apple Pay en Europe, Mobile Money + Carte en Afrique francophone).',
              },
              {
                bold: 'Le bouton primaire répète le montant exact',
                text: 'Écrivez « Payer 132,90 € » et jamais « Continuer » ou « Soumettre ». Nommer la somme exacte sur le bouton lève l’incertitude « vais-je être débité maintenant ou à l’écran suivant ? » — c’est la réduction d’anxiété la moins chère du web.',
              },
              {
                bold: 'Validation au blur, jamais à la première frappe',
                text: 'N’affichez pas « Format d’e-mail invalide » en rouge pendant que la personne est encore en train de taper la troisième lettre de son prénom.',
              },
            ],
          },
          {
            "type": "inlineCta",
            "title": "Passez de ces règles à votre prochain audit.",
            "text": "Le Playbook FR réunit 36 écrans annotés, la checklist d’audit de 40 points et 12 fiches A4 pour préparer votre revue.",
            "buttonLabel": "Obtenir le Playbook FR · 29 $"
          },
        ],
      },

      {
        id: 'accessibilite-droit-2026',
        num: '05',
        tocLabel: 'Accessibilité & cadre légal réel en 2026',
        heading: 'Accessibilité vendable & cadre légal réel en 2026 : ne confondez plus « publié » et « obligatoire »',
        blocks: [
          {
            type: 'p',
            text: "Le WebAIM Million de février 2026 détecte des erreurs WCAG 2 de niveaux A ou AA sur 95,9 % du million de pages d’accueil analysées, avec 56,1 erreurs détectées par page en moyenne. Le rapport examine un sous-ensemble automatisable : contraste, alternatives textuelles, noms accessibles et labels font partie des points à vérifier. Ces résultats ne décrivent ni chaque site ni toute l’accessibilité ; un scan sans erreur ne vaut pas conformité. Complétez-le par un parcours clavier, un lecteur d’écran et une vérification des tâches réelles.",
          },
          {
            type: 'h3',
            text: 'Ce qui est réellement en vigueur en 2026 (et la nuance juridique qui sauve vos devis)',
          },
          {
            type: 'p',
            text: "Une recommandation W3C, une norme ETSI publiée et un texte cité au Journal officiel n’ont pas la même portée (Section 52). Le tableau distingue leurs statuts au 18 novembre 2026 ; vérifiez ensuite le secteur, le rôle de votre client et le droit national applicable. Il ne remplace pas un avis juridique.",
          },
          {
            type: 'table',
            caption: 'Cadre réglementaire et normatif européen applicable en 2026 (Section 52 · p. 97)',
            headers: ['Référentiel / Texte', 'Date clé', 'Portée réelle pour vos projets et contrats'],
            rows: [
              [
                'European Accessibility Act — Directive (UE) 2019/882',
                "Mesures nationales applicables dès le 28 juin 2025",
                "Vise les produits et services définis à l’article 2, pas tous les sites. L’art. 4(5) exempte les micro-entreprises de services : moins de 10 personnes et CA annuel ou bilan ≤ 2 M€. Cette exemption ne porte pas sur les obligations relatives aux produits. Vérifier transposition et transitions (art. 31–32).",
              ],
              [
                'WCAG 2.2 (Recommandation W3C)',
                'Octobre 2023',
                'Le référentiel technique mondial visé au niveau AA (contraste 4,5:1, focus non masqué 2.4.11, cible minimale, alternative au glisser-déposer).',
              ],
              [
                'Norme EN 301 549 v4.1.1',
                "Version publiée en septembre 2026",
                "L’EN 301 549 v4.1.1 est publiée par ETSI et reprend WCAG 2.2 pour le Web. Sa publication ne suffit pas : vérifier la citation au Journal officiel pour la directive et les exigences concernées avant d’invoquer une présomption de conformité.",
              ],
              [
                'WCAG 3.0 (W3C Working Draft)',
                'Projet de travail du 10 sept. 2026',
                "Projet de travail susceptible de changer, et non une Recommandation W3C. Le W3C demande de le citer uniquement comme travail en cours ; ne le présentez pas comme un remplacement de WCAG 2.2.",
              ],
              [
                'Règlement (UE) 2024/1689 (AI Act · art. 50)',
                "Calendrier à vérifier : art. 50, 111(4) et 113",
                "Art. 50 : information sur certaines interactions IA et marquage/divulgation selon le rôle, le contenu et les exceptions. Application générale au 2 août 2026 ; la version consolidée du 27 juillet 2026 donne jusqu’au 2 décembre 2026 pour l’art. 50(2) aux systèmes déjà commercialisés avant le 2 août. Ne pas assimiler toutes les sorties IA à une même obligation.",
              ],
            ],
          },
          {
            type: 'copyable',
            label: 'Clause de cadrage accessibilité à insérer dans vos propositions (Section 52)',
            langTag: 'text',
            code: ` Périmètre d'évaluation accessibilité :
« La livraison inclut un rapport d'évaluation technique portant sur les parcours
listés en Annexe 1, vérifiés selon le référentiel W3C WCAG 2.2 niveau AA à la date
du [JJ/MM/2026] (analyse statique automatisée + parcours clavier et lecteur d'écran).
Le périmètre exact, la méthode de test et les limites d'échantillonnage sont détaillés
dans le rapport joint. Ce livrable constitue un contrôle d'ingénierie et ne se substitue
ni à une certification officielle ni à un avis juridique sur vos obligations sectorielles. »`,
            note: 'Ne promettez jamais « 100 % conforme à vie » sans périmètre, version du référentiel ni date : le moindre contenu éditorial publié le lendemain par le client pourrait engager votre responsabilité.',
          },
        ],
      },

      {
        id: 'audit-20-min-checklist-40',
        num: '06',
        tocLabel: 'Tests à 5 personnes & Checklist 40 points',
        heading: 'Tests utilisateurs sans mensonge statistique, audit en 20 minutes et Checklist des 40 points',
        blocks: [
          {
            type: 'p',
            text: "Le modèle de Nielsen et Landauer (CHI 1993) estime la découverte cumulée par 1 − (1 − L)^n. Avec L ≈ 31 %, cinq participants donnent environ 84 %, souvent arrondis à 85 %. Ce calcul est conditionnel : il ne garantit pas de découvrir tous les problèmes d’un parcours. Faulkner (2003), sur une étude de 60 utilisateurs, observe des sous-échantillons de cinq révélant entre 55 % et 99 % des problèmes de cette étude (niveau de preuve : Probable pour la généralisation à votre produit).",
          },
          {
            type: 'p',
            text: "Commencez par une petite série de sessions observées sur une tâche et une population définies. Corrigez les blocages répétés, puis testez à nouveau. Pour comparer deux taux de réussite ou de conversion, calculez la taille d’échantillon à partir du taux de départ, de l’écart minimal à détecter, du risque d’erreur et de la puissance souhaitée : aucun nombre unique ne convient à tous les tests A/B. Les personas IA peuvent aider à formuler des hypothèses, mais ne constituent pas des observations d’utilisateurs réels.",
          },
          {
            type: 'h3',
            text: "Conduire un audit de 20 minutes avant de coder un correctif",
          },
          {
            type: 'p',
            text: "Pour un développeur, cet audit sert d’abord à ordonner les corrections avant d’ouvrir un ticket. Notez l’écran sur 10 axes (/50) : clarté en 5 s, hiérarchie, action primaire, cohérence, 5 états, feedback, accessibilité, micro-copie, frais/prix et usage mobile. Restituez les 3 priorités sous la forme Constat → Risque pour l’utilisateur → Correctif sur capture annotée. Les 20 minutes désignent la passe de diagnostic, pas une certification d’accessibilité. Si vous en faites une prestation, la fourchette illustrative de 150–400 USD du manuel n’est ni une moyenne de marché ni une promesse de revenu : chiffrez le périmètre, l’analyse et la restitution.",
          },
          {
            type: 'copyable',
            label: 'Annexe A1 intégrale — La Checklist d’audit en 40 points (à passer avant toute livraison)',
            langTag: 'markdown',
            code: `# CHECKLIST D'AUDIT UX/UI — 40 POINTS (UX/UI Playbook · Annexe A1)

## 1. Structure & parcours (10 points)
- [ ] L'objectif de l'écran est compris en moins de 5 secondes (test réel)
- [ ] Une seule action primaire, visuellement dominante sur la vue
- [ ] Chaque écran possède une entrée claire et une sortie identifiable
- [ ] La navigation indique l'emplacement courant autrement que par la couleur seule
- [ ] Le bouton Retour ne détruit jamais les données déjà saisies dans un formulaire
- [ ] Les conventions acquises sont respectées (logo, panier, menu, recherche)
- [ ] Le parcours quotidien le plus fréquent est le plus court en clics
- [ ] Aucune fonction secondaire ne rivalise visuellement avec l'action clé
- [ ] Les liens de navigation ne ressemblent pas aux boutons d'action
- [ ] Le premier usage produit un résultat concret visible en < 60 secondes

## 2. Contenu & micro-copie (10 points)
- [ ] Zéro « Lorem ipsum », zéro donnée factice irréaliste
- [ ] Tous les boutons commencent par un verbe d'action précis (jamais « Valider / OK »)
- [ ] Chaque message d'erreur explique la cause et l'action immédiate pour réparer
- [ ] Le prix total, les taxes et les frais sont visibles avant l'engagement
- [ ] Les textes d'aide secondaires conservent un contraste ≥ 4,5:1
- [ ] Les dates, devises et nombres respectent la locale de l'utilisateur
- [ ] Les cas extrêmes sont testés (nom de 40 caractères, titre sur 3 lignes, 0 item)
- [ ] Les états vides expliquent la valeur et offrent une action + une alternative (import)
- [ ] Aucune phrase longue composée intégralement en MAJUSCULES
- [ ] Langue unique et accents typographiques cohérents d'un bout à l'autre

## 3. Visuel & système (10 points)
- [ ] Deux familles typographiques maximum (ou une seule + chasse fixe)
- [ ] Toutes les tailles de police proviennent strictement de l'échelle définie
- [ ] Tous les espacements sont des multiples de 4 px (8 px pour la structure)
- [ ] Un seul accent de couleur vive réservé à l'action primaire
- [ ] Les composants identiques ont exactement le même style sur toutes les pages
- [ ] Les rayons de bordure et niveaux d'élévation sont constants
- [ ] L'ordre de lecture survit au test des yeux plissés à trois pas
- [ ] Longueur de ligne du texte courant maintenue entre 60 et 75 caractères
- [ ] Cadrage et traitement homogènes des visuels et icônes
- [ ] Fichiers, tokens et composants nommés proprement sans styles détachés

## 4. États, accessibilité & technique (10 points)
- [ ] Les 5 états d'écran existent : vide, chargement, idéal, partiel/débordement, erreur
- [ ] Les 6 états interactifs des boutons existent (repos, survol, appui, focus, chargement, désactivé)
- [ ] Chaque champ possède un <label> visible relié (jamais un placeholder seul)
- [ ] Contraste texte ≥ 4,5:1 et bordures/icônes utiles ≥ 3:1 vérifiés sur la vraie surface
- [ ] Cibles tactiles ≥ 44 × 44 px sur mobile (48 × 48 dp sur Android)
- [ ] Parcours complet au clavier (Tab / Shift+Tab / Escape) avec anneau de focus net
- [ ] Aucune information critique codée uniquement par la couleur (rouge/vert)
- [ ] Images décoratives en alt="", images informatives décrites avec concision
- [ ] Comportement dégradé prévu sur réseau lent (> 400 ms) ou perte de connexion
- [ ] Spécification de handoff écrite (structure, tokens, comportements, cas limites)`,
            note: 'Copiez ce fichier dans votre dépôt (.github/PULL_REQUEST_TEMPLATE.md ou docs/audit-40.md) : une passe complète prend 15 minutes avec l’habitude.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Pourquoi le Playbook utilise-t-il la limite de 4 ± 1 blocs (Cowan) plutôt que la règle des 7 ± 2 de Miller ?',
        a: "Cowan (2001) décrit une capacité d’environ 4 ± 1 blocs lorsque répétition et regroupement sont contrôlés. Ce n’est pas un maximum universel d’éléments à l’écran. Utilisez des groupes lisibles, limitez les informations à mémoriser et vérifiez la compréhension pendant des tests.",
      },
      {
        q: 'Le European Accessibility Act (directive 2019/882) oblige-t-il tous les sites web en 2026 ?',
        a: "La directive vise certains produits et services depuis le 28 juin 2025, pas tous les sites indistinctement. Les articles 3(23) et 4(5) prévoient une exemption pour les micro-entreprises fournissant des services (moins de 10 personnes et chiffre d’affaires annuel ou bilan ≤ 2 M€). Vérifiez le secteur, la transposition nationale, les contrats et les autres obligations applicables avec un conseil compétent.",
      },
      {
        q: 'Quel est le moyen le plus rapide et le moins cher d’augmenter la conversion d’un checkout ?',
        a: 'Trois actions immédiates sans refonte graphique : 1) autoriser l’achat en invité sans création de compte préalable, 2) supprimer les champs redondants pour redescendre de la moyenne de 23,48 éléments vers 12–14 éléments utiles (Baymard, oct. 2026), et 3) inscrire le montant exact sur le bouton final (« Payer 132,90 € ») avec un récapitulatif des frais visible dès la première seconde.',
      },
      {
        q: 'Peut-on valider un parcours UX uniquement avec des agents IA qui simulent des utilisateurs ?',
        a: "Non. Un agent peut vérifier des règles déterministes et aider à préparer des hypothèses ; il ne montre pas comment une personne réelle comprend votre offre ou récupère après une erreur. Observez de vrais utilisateurs sur une tâche définie, puis itérez.",
      },
    ],
    ctaTitle: 'Passez du cours aux 36 écrans annotés, aux 12 fiches A4 et au scanner Python.',
    ctaText:
      'Ce dossier résume une fraction de la méthode. Téléchargez l’édition française intégrale du UX/UI Playbook 2026 (148 pages A4), accompagnée du Kit Bonus imprimable de 26 pages (fiches d’audit, brief, handoff) et des 21 fichiers techniques incluant agent_check.py.',
    ctaBullets: [
      "Livre complet de 148 pages A4 en français (97 sections, 36 écrans décortiqués, 13 prototypes Avant/Après + 11 planches de plateformes)",
      'Kit Bonus de 12 fiches A4 imprimables + gabarits Markdown prêts pour vos missions clients',
      'Scanner Python exécutable des 77 règles + Skill IA pour Claude Code, Cursor & Codex (29 $ paiement unique)',
    ],
    entityDefinition: "Le design d’expérience utilisateur organise les parcours, les contenus et les interactions pour permettre à une personne d’atteindre son objectif. Il se distingue de l’UI, qui en définit la présentation visuelle, et du Product Design, qui arbitre aussi la valeur et le périmètre.",
    references: [
                  {
                    "title": "The magical number 4 in short-term memory",
                    "url": "https://doi.org/10.1017/S0140525X01003922",
                    "publisher": "Nelson Cowan · Behavioral and Brain Sciences",
                    "date": "2001",
                    "evidence": "established",
                    "note": "Capacité d’environ 4 blocs sous certaines conditions expérimentales. Les groupes de 3 à 5 dans une UI sont une transposition de méthode."
                  },
                  {
                    "title": "Cart Abandonment Rate: 50 Statistics",
                    "url": "https://baymard.com/blog/cart-abandonment-rate",
                    "publisher": "Baymard Institute",
                    "date": "2026-10-28",
                    "evidence": "established",
                    "note": "70,22 % : moyenne non pondérée de 50 études (2006–2025). Éléments de formulaire : 23,48 observés contre 12–14 dans un parcours simplifié."
                  },
                  {
                    "title": "The WebAIM Million — 2026 report",
                    "url": "https://webaim.org/projects/million/",
                    "publisher": "WebAIM",
                    "date": "2026-02",
                    "evidence": "established",
                    "note": "1 million de pages d’accueil, 95,9 % avec erreurs détectées, 56,1 erreurs par page. Un scan sans erreur ne prouve pas la conformité."
                  },
                  {
                    "title": "Web Content Accessibility Guidelines 2.2",
                    "url": "https://www.w3.org/TR/WCAG22/",
                    "publisher": "W3C",
                    "date": "2024-12-12",
                    "evidence": "established",
                    "note": "Texte normatif : distinguer texte courant, grand texte et composants non textuels."
                  },
                  {
                    "title": "Understanding SC 2.5.8: Target Size (Minimum)",
                    "url": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
                    "publisher": "W3C WAI",
                    "date": "WCAG 2.2",
                    "evidence": "established",
                    "note": "AA : 24 × 24 CSS px avec exceptions. 44 × 44 px est la recommandation retenue ici, pas le minimum AA."
                  },
                  {
                    "title": "A mathematical model of the finding of usability problems",
                    "url": "https://doi.org/10.1145/169059.169166",
                    "publisher": "Jakob Nielsen & Thomas K. Landauer · CHI",
                    "date": "1993",
                    "evidence": "established",
                    "note": "Le modèle dépend du taux de découverte de chaque problème ; 5 personnes ne garantissent pas un pourcentage fixe."
                  },
                  {
                    "title": "Beyond the five-user assumption",
                    "url": "https://doi.org/10.3758/BF03195514",
                    "publisher": "Laura Faulkner · Behavior Research Methods",
                    "date": "2003",
                    "evidence": "probable",
                    "note": "Étude originale sur 60 personnes ; les sous-échantillons de 5 révèlent 55–99 % des problèmes de cette étude. Généralisation à votre produit : à tester."
                  },
                  {
                    "title": "Directive (EU) 2019/882 — European Accessibility Act",
                    "url": "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
                    "publisher": "EUR-Lex · Union européenne",
                    "date": "2019",
                    "evidence": "established",
                    "note": "Articles 2, 3(23), 4(5) et 31 : champ, micro-entreprises et application. Vérifier la transposition nationale et votre secteur."
                  },
                  {
                    "title": "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
                    "url": "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
                    "publisher": "EUR-Lex · Union européenne",
                    "date": "2026-07-27",
                    "evidence": "established",
                    "note": "Texte consolidé : art. 50 (obligations et exceptions), 111(4) (transition au 2 décembre 2026 pour certains systèmes existants) et 113 (application). Vérifier le rôle et l’usage concernés."
                  },
                  {
                    "title": "W3C Accessibility Guidelines (WCAG) 3.0 — Working Draft",
                    "url": "https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/",
                    "publisher": "W3C",
                    "date": "2026-09-10",
                    "evidence": "established",
                    "note": "Statut de projet uniquement : ne remplace pas WCAG 2.2 et peut évoluer."
                  },
                  {
                    "title": "EN 301 549 V4.1.1 — Accessibility requirements for ICT products and services",
                    "url": "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf",
                    "publisher": "ETSI · CEN · CENELEC",
                    "date": "2026-09",
                    "evidence": "established",
                    "note": "Version publiée de la norme. Une citation au JO de l’UE et son champ d’application doivent être vérifiés séparément."
                  }
                ],
  },

  /* ============================================================================
   * COURS 2 (FR) — UI DESIGN & DESIGN TOKENS
   * ========================================================================== */
  {
    slug: 'ui-design-system-tokens',
    category: 'UI Design',
    icon: '🎨',
    readTime: '19 min de lecture',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-ui-fr.jpg',
    metaTitle:
      "UI Design : tokens CSS et Dark Mode | UX/UI Playbook",
    metaDescription:
      "Créez un système UI cohérent : 6 rôles typographiques, 8 tokens de taille, grille 4/8, couleurs accessibles et code CSS clair/sombre prêt à copier.",
    keywords: [
      'UI Design system CSS',
      'design tokens W3C 2025.10',
      'échelle typographique 1.25',
      'grille espacement 8px',
      'dark mode tokens halation',
      'micro-copie interface',
      'propriétés logiques CSS RTL',
      'spécification handoff développeur',
    ],
    title:
      "UI Design : créer vos tokens CSS et un mode sombre lisible",
    subtitle:
      "Une base réutilisable pour vos interfaces : hiérarchie, typographie, espacement et couleurs sémantiques, avec un fichier tokens.css et une fiche de passation à copier.",
    aeoSummaryTitle: 'Synthèse exécutive — Les chiffres qui tiennent un Design System',
    aeoSummary:
      "Un système UI cohérent relie 6 rôles sémantiques à 8 tokens de taille : 12, 14, 16, 20, 24, 32, 40 et 64 px. Le ratio 1,25 inspire la progression, sans imposer une formule d’arrondi exacte. Séparez espacements internes, structurels et macro sur une base 4/8. Le repère 60/30/10 organise les rôles de couleur ; ce n’est pas un résultat scientifique. Pour le mode sombre OLED, gardez une base #000000, relevez les surfaces et adoucissez l’encre. Mesurez les contrastes sur chaque fond réel et proposez aussi un mode clair : le confort reste à vérifier avec les lecteurs.",
    keyStats: [
      {
        value: "6 rôles · 8 tokens",
        label: "Tailles CSS 12, 14, 16, 20, 24, 32, 40 et 64 px : échelle retenue dans ce guide",
        source: "UX/UI Playbook · Sections 21 & 25 · Repère de méthode",
        evidence: "probable",
      },
      {
        value: '≥ 4,5 : 1',
        label: "Contraste AA du texte courant ; grand texte et composants utiles : 3:1 selon leur critère",
        source: "W3C WCAG 2.2 · 1.4.3 & 1.4.11",
        evidence: "established",
        url: "https://www.w3.org/TR/WCAG22/",
      },
      {
        value: '2025.10',
        label: "Rapport final stable du Design Tokens Community Group ; ce n’est pas une Recommandation W3C",
        source: "Design Tokens Community Group · 2025-10-28",
        evidence: "established",
        url: "https://www.designtokens.org/tr/2025.10/format/",
      },
    ],
    sections: [
      {
        id: 'hierarchie-quatre-leviers',
        num: '01',
        tocLabel: 'La hiérarchie en 4 leviers (test du plissement)',
        heading: 'La hiérarchie visuelle en 4 leviers : utilisez-les dans l’ordre exact où l’œil les traite',
        blocks: [
          {
            type: 'p',
            text: 'Quand un développeur veut faire ressortir une information importante, son premier réflexe est presque toujours d’ajouter une couleur vive, un encadré ou un badge. Au bout de trois ajouts, la page ressemble à un tableau de bord d’avion en panne : tout crie, donc plus rien ne s’entend. On ne hiérarchise pas avec de la peinture ; on hiérarchise avec des écarts nets sur quatre leviers, mobilisés rigoureusement dans cet ordre (Section 06) :',
          },
          {
            type: 'steps',
            title: 'L’ordre de priorité des 4 leviers visuels (Section 06)',
            steps: [
              {
                bold: 'Levier 1 — La taille (le plus puissant, le plus timidement utilisé)',
                text: 'Un titre à 18 px au-dessus d’un paragraphe à 16 px n’est pas un titre, c’est une hésitation. Visez un rapport franc d’au moins ×2 entre le titre maître de la vue (32–40 px) et le corps courant (15–16 px).',
              },
              {
                bold: 'Levier 2 — Le poids typographique (gras contre régulier)',
                text: 'Idéal lorsque la taille ne doit pas grossir : un libellé de champ en `600 SemiBold` à 14 px domine proprement une valeur saisie en `400 Regular` à 15 px.',
              },
              {
                bold: 'Levier 3 — L’espace blanc (gratuit et presque toujours oublié)',
                text: 'Entourer un chiffre clé ou un appel à l’action de 48 px de respiration le met davantage en majesté que n’importe quelle bordure épaisse.',
              },
              {
                bold: 'Levier 4 — La couleur (le levier le plus bruyant, en dernier recours)',
                text: 'N’introduisez la couleur d’accent qu’une fois que la page tient déjà debout intégralement en niveaux de gris. Réservez-la à l’unique action primaire et aux signaux d’état.',
              },
            ],
          },
          {
            type: 'quote',
            tag: 'Diagnostic express · Le test du plissement (Section 06)',
            text: 'Reculez de trois pas devant votre moniteur et plissez les yeux jusqu’à rendre le texte flou. Vous devez encore distinguer instantanément : 1) de quoi parle la page, 2) où agir. Si l’écran s’aplatit en une nappe grise uniforme, vous avez empilé des boîtes — vous n’avez aucune hiérarchie.',
          },
        ],
      },

      {
        id: 'typographie-sans-hasard',
        num: '02',
        tocLabel: "Typographie : 6 rôles, 8 tailles",
        heading: "Typographie : deux familles de lecture, une monospace et huit tailles",
        blocks: [
          {
            type: 'p',
            text: "La typographie porte une grande part de la lisibilité d’une interface. Fixez les choix une fois dans le dépôt : Sora pour le titrage, Inter pour le texte et les contrôles, JetBrains Mono pour le code et les identifiants. Le guide distingue 6 rôles sémantiques — Display/H1, H2, H3, Body, Small et Micro — mappés sur 8 tokens CSS de taille, de 12 à 64 px (Sections 21 & 25). Ce sont deux niveaux différents, pas deux décomptes concurrents.",
          },
          {
            type: 'h3',
            text: 'Construire l’échelle en 30 secondes et régler l’interlignage optique',
          },
          {
            type: 'p',
            text: "Une base de 16 px et un ratio indicatif de 1,25 donnent une progression utile, mais les valeurs finales sont un choix de système, pas l’arrondi mécanique de chaque palier. Retenez ici exactement 8 tokens : 12 · 14 · 16 · 20 · 24 · 32 · 40 · 64 px. Un rôle peut utiliser deux tokens selon le viewport ; une variation fluide entre deux bornes documentées est également possible. Documentez les exceptions plutôt que d’ajouter une neuvième taille sans décision.",
          },
          {
            type: 'p',
            text: "Réglez l’interlignage avec la taille et la famille choisies : partez de `1,55–1,65` pour un corps de 16 px sur environ `60–75 caractères` (`max-width: 68ch`) et de `1,05–1,15` pour un titre de 64 px, avec une approche de `-0.02em` à `-0.03em` à tester. Ce sont des points de départ, pas des constantes perceptives. Activez `font-variant-numeric: tabular-nums` pour aligner montants, compteurs, dates et colonnes numériques.",
          },
          {
            type: 'table',
            caption: "6 rôles sémantiques mappés sur 8 tokens : les bornes et tailles ci-dessous sont celles retenues dans ce guide.",
            headers: ['Rôle sémantique', 'Taille CSS', 'Interligne & approche', 'Usage strict & garde-fous'],
            rows: [
              ["Display / H1", "40 ou 64 px", '1,05–1,10 · -0,03em', "Un H1 par page ; adaptation fluide possible entre ces bornes"],
              ["H2", "32 px", '1,15–1,22 · -0,02em', "Sections majeures"],
              ["H3", "20 ou 24 px", '1,30 · -0,015em', "Sous-sections et titres de cartes"],
              ["Body", "16 px", '1,55–1,65 · normal', "Texte courant ; largeur de lecture à tester"],
              ["Small", "14 px", '1,45 · normal', "Labels, aide, cellules"],
              ["Micro", '12 px (plancher)', '1,40 · +0,04em', "Badges courts et horodatages"],
            ],
          },
        ],
      },

      {
        id: 'couleur-60-30-10-base-8',
        num: '03',
        tocLabel: 'Système 60/30/10, base 8 & Mobile-First',
        heading: 'Système couleur 60 / 30 / 10, espacement en base 8 et architecture Mobile-First',
        blocks: [
          {
            type: 'p',
            text: "Attribuez d’abord des rôles à vos couleurs : surfaces, texte, action et statuts. La règle 60 / 30 / 10 du manuel est un repère de composition (Section 22), pas une proportion à mesurer pixel par pixel ni une preuve d’efficacité : gardez les surfaces calmes, une structure lisible et un accent d’action peu concurrentiel. Testez ensuite les paires de couleurs et la reconnaissance des statuts, y compris sans couleur.",
          },
          {
            type: 'h3',
            text: 'Séparer les canaux de sens et réussir le test des niveaux de gris',
          },
          {
            type: 'p',
            text: 'Ne mélangez jamais vos canaux sémantiques : si la couleur primaire de vos boutons d’action est le vert émeraude, comment distinguerez-vous un bouton cliquable d’un badge passif « Payé ✓ » ? Séparez net la couleur d’action (par exemple vermillon ou indigo), le succès (vert sarcelle + icône `✓`), l’alerte destructive (rouge dense + icône `!`), l’information (bleu distinct des liens soulignés) et l’état désactivé (gris franc opaque — n’utilisez jamais `opacity: 0.4`, qui détruit le contraste sur les fonds teintés). Vérifiez ensuite votre écran en passant votre OS en filtre niveaux de gris : si deux statuts deviennent indiscernables, vous avez violé WCAG 1.4.1 en codant le sens par la couleur seule.',
          },
          {
            type: 'h3',
            text: 'Les trois échelles d’espacement en base 8 (et pourquoi vos cartes semblent « sales »)',
          },
          {
            type: 'p',
            text: 'L’espacement est la discipline la moins enseignée et pourtant la plus immédiatement visible. Une interface espacée avec `7px`, `13px`, `19px` et `27px` trahit une absence totale de système en un dixième de seconde. Mais même avec une échelle `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px`, tout s’effondre si vous confondez les trois paliers d’échelle (Section 23) :',
          },
          {
            type: 'list',
            heading: 'Les 3 paliers d’espacement à ne jamais intervertir (Section 23)',
            items: [
              {
                bold: 'Échelle interne (4 · 8 · 12 px)',
                text: 'À l’intérieur d’un atome : écart entre une icône et le texte d’un bouton (8 px), écart entre un `<label>` et son `<input>` (6 ou 8 px), padding vertical d’un badge.',
              },
              {
                bold: 'Échelle structurelle (16 · 24 · 32 px)',
                text: 'Padding interne constant de vos cartes (16 px sur mobile, 24 px sur desktop) et gouttière entre deux cartes ou deux groupes de champs.',
              },
              {
                bold: 'Échelle macro (48 · 64 · 96 px)',
                text: "Respiration franche entre deux chapitres majeurs d’une page. Permet souvent de supprimer des séparateurs `<hr>` sans fonction.",
              },
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ui-spacing.webp',
            alt: 'Planche de la base 8 du UX/UI Playbook Français montrant la progression géométrique 4, 8, 12, 16, 24, 32, 48, 64 px et la loi d’asymétrie de proximité',
            caption:
              'La loi d’asymétrie : un sous-titre doit toujours être nettement plus proche du paragraphe qu’il annonce (8–12 px) que du paragraphe précédent (32 px).',
            sourceRef: 'UX/UI Playbook FR · Partie 03, Section 23 (p. 49)',
            width: 1080,
            height: 1527,
          },
          {
            type: 'h3',
            text: 'Responsive : dessinez à 375 px d’abord et testez la casse à 320 px',
          },
          {
            type: 'p',
            text: 'Le responsive ne signifie pas « faire rentrer quatre colonnes desktop au chausse-pied sur un téléphone ». Si vous concevez en 1440 px d’abord, votre mobile sera une compression pénible (Section 24). Commencez à `375 px` sur une seule colonne et sans aucun état de survol (`:hover` n’existe pas au doigt) : vous serez contraint d’ordonner le contenu par importance réelle. Sur mobile, la barre latérale devient une barre basse à 4–5 entrées maximum, et un tableau de back-office ne se rétrécit pas en police 9 px — chaque ligne se transforme en carte empilée affichant l’identifiant à gauche et le montant ou statut à droite. Enfin, réduisez toujours la fenêtre à `320 px` avant de livrer : c’est exactement là que les boutons côte à côte et les titres longs explosent.',
          },
        ],
      },

      {
        id: 'tokens-vrai-dark-mode',
        num: '04',
        tocLabel: "Tokens CSS & mode sombre OLED",
        heading: "Tokens CSS et mode sombre OLED : séparer les rôles plutôt qu’inverser les couleurs",
        blocks: [
          {
            type: 'p',
            text: "Un jeu de tokens facilite la réutilisation des décisions d’un projet à l’autre (Section 25), sans garantir une durée de vie ou une marge. Séparez les valeurs primitives (`--blue-500`) des rôles sémantiques (`--color-surface`, `--color-text`, `--color-accent`, `--space-6`). Le format Design Tokens 2025.10 est un rapport final du Design Tokens Community Group, pas une Recommandation W3C ; le CSS ci-dessous illustre les rôles, sans prétendre être un fichier JSON DTCG. Un changement de thème demande aussi de tester les composants, images et états.",
          },
          {
            type: 'h3',
            text: "Quatre réglages de mode sombre à tester avec vos lecteurs",
          },
          {
            type: 'doDont',
            doTitle: '✓ Vrai Dark Mode par tokens',
            dontTitle: '✕ Inversion naïve (« filtre négatif »)',
            doItems: [
              "Conserver une base OLED #000000 et distinguer les cartes et modales par des surfaces progressivement plus claires. Mesurer chaque niveau.",
              "Essayer une encre blanc cassé (#ECEEF4 par exemple), puis demander un retour de lecture. Aucune couleur ne garantit l’absence de halo pour tous.",
              'Désaturer et relever d’un ton la couleur d’accent afin qu’elle ne « vibre » pas optiquement contre le fond sombre.',
              'Re-mesurer chaque paire texte secondaire / fond sur la carte la plus claire (là où le ratio chute le plus vite).',
            ],
            dontItems: [
              "Imposer du blanc pur sur noir pur à tous les lecteurs sans essai de lecture ni mode clair alternatif.",
              'Conserver des `box-shadow: 0 10px 30px rgba(0,0,0,0.12)` invisibles sur fond sombre sans bordure subtile (`1px solid rgba(255,255,255,0.09)`).',
              'Garder le même rouge ou bleu saturé du mode clair, qui tombe souvent sous 3:1 de contraste une fois posé sur `#121212`.',
              'Utiliser `filter: invert(1)` sur la page, qui détruit les photos, les avatars et les couleurs sémantiques.',
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ui-sbs-dark.webp',
            alt: "Prototype comparé du mode sombre tiré du UX/UI Playbook Français opposant une inversion directe à une architecture de tokens par élévation",
            caption:
              "Prototype comparé (Section 61) : inversion de couleurs à gauche, surfaces et accents sémantiques à droite. Le confort doit aussi être testé en lecture réelle.",
            sourceRef: 'UX/UI Playbook FR · Partie 07, Section 61 (p. 110)',
            width: 1080,
            height: 755,
          },
          {
            type: 'copyable',
            label: 'tokens.css — Le socle complet (Clair + Dark Mode + Typo + Base 8 + Motion)',
            langTag: 'css',
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

  /* 2. Action unique & Canaux sémantiques distincts */
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
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Sora", var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px; --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;  --text-4xl: 64px;

  /* 5. Jetons de mouvement (Section 57) */
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

/* Droit de veto système non négociable sur le mouvement */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
            note: 'Copiez ce fichier à la racine de votre projet : chaque composant consomme uniquement var(--color-*) et var(--space-*), sans aucune valeur hexadécimale orpheline.',
          },
          {
            "type": "inlineCta",
            "title": "Gardez les tokens et la fiche de handoff dans votre dépôt.",
            "text": "L’archive du Playbook fournit tokens.css, tokens.json et les gabarits éditables, avec 13 prototypes Avant/Après et 11 planches de plateformes dans le manuel.",
            "buttonLabel": "Obtenir les fichiers FR · 29 $"
          },
        ],
      },

      {
        id: 'microcopie-motion-rtl',
        num: '05',
        tocLabel: 'Micro-copie, Motion & CSS logique (RTL)',
        heading: 'Micro-copie, Motion utile et Internationalisation (RTL) : les trois finitions qui signent un senior',
        blocks: [
          {
            type: 'p',
            text: 'La moitié de votre UI ne se dessine pas dans Figma : elle s’écrit avec le clavier et se ressent au mouvement. Un bouton flou oblige à rajouter une phrase d’aide ; une transition lente rend une app rapide mollassonne ; un `margin-left` en dur casse votre produit le jour où un client international demande l’arabe ou l’allemand.',
          },
          {
            type: 'h3',
            text: '1. Micro-copie : le design qui s’écrit (Section 27)',
          },
          {
            type: 'p',
            text: 'Appliquez systématiquement le test de la suppression : masquez la petite phrase grise sous votre titre de section. Si l’écran reste limpide, supprimez-la pour de bon ; s’il devient incompréhensible, c’est que votre titre ou votre bouton était mal écrit. Obéissez à quatre règles : 1) toujours un verbe d’action précis sur un bouton (jamais un substantif administratif comme « Validation » ni un passe-partout comme « Continuer »), 2) parler de la personne et non du serveur (« Votre paiement n’est pas passé » plutôt que « Échec de la transaction 502 »), 3) zéro humour dans les messages d’erreur (« Oups, nos lutins ont perdu votre fichier ! » est insupportable quand on vient de perdre vingt minutes de saisie), et 4) traduire le jargon technique en bénéfice concret.',
          },
          {
            type: 'table',
            caption: 'Remplacer la micro-copie paresseuse et le jargon technique (Section 27 · p. 55)',
            headers: ['Contexte UI', 'Libellé faible / jargon serveur', 'Réécriture orientée utilisateur'],
            rows: [
              ['Bouton primaire', 'Valider / OK / Soumettre', 'Créer mon compte · Enregistrer les modifications'],
              ['Action destructive', 'Supprimer', 'Supprimer définitivement ce projet et ses 42 fichiers'],
              ['Erreur de saisie', 'Erreur 422 : conflit d’entité', 'Cet e-mail est déjà utilisé. Essayez de vous connecter →'],
              ['Chargement long', 'Veuillez patienter…', 'Récupération de vos 128 factures en cours… (≈ 4 s)'],
              ['Argument produit', 'Synchronisation bidirectionnelle AES-256', 'Vos modifications apparaissent partout et restent privées'],
            ],
          },
          {
            type: 'h3',
            text: '2. Motion : expliquer l’espace sans jamais confisquer le contrôle (Section 57)',
          },
          {
            type: 'p',
            text: 'Une animation d’interface ne sert pas à épater la galerie : elle explique d’où vient un panneau et où est parti un élément supprimé. Tenez-vous à trois plages temporelles strictes : `50 à 200 ms` en `ease-out` pour un appui de bouton ou un survol, `250 à 400 ms` pour l’ouverture d’un tiroir ou d’une modale (`ease-out` à l’entrée, `ease-in` plus vif à la sortie), et `450 à 600 ms` maximum pour une transition de page complète. N’animez que `transform` et `opacity` (jamais `width`, `height` ou `top`, qui déclenchent un recalcul coûteux de mise en page à chaque image), n’utilisez jamais de courbe `linear` hors barre de progression, et respectez inconditionnellement `@media (prefers-reduced-motion: reduce)`.',
          },
          {
            type: 'h3',
            text: '3. Internationalisation & RTL : écrivez du CSS logique dès le premier jour (Section 58)',
          },
          {
            type: 'p',
            text: "Traduire en allemand ou en français peut fortement allonger un libellé court anglais ; passer en arabe ou en hébreu (`dir=\"rtl\"` sur `<html>`) miroite en plus tout l’axe horizontal. Si vous prenez l’habitude dès aujourd’hui de remplacer `margin-left` par `margin-inline-start`, `padding-right` par `padding-inline-end`, `left: 0` par `inset-inline-start: 0` et `text-align: left` par `text-align: start`, votre mise en page bascule gratuitement. Retenez enfin la frontière de miroitage : on inverse les flèches de suite/retour, les chevrons de fil d’Ariane et l’ordre des colonnes d’un tableau, mais on n’inverse jamais un logo, les aiguilles d’une horloge, les boutons de lecture vidéo ni l’ordre des chiffres à l’intérieur d’un nombre.",
          },
        ],
      },

      {
        id: 'handoff-une-page',
        num: '06',
        tocLabel: 'Les 12 composants & le Handoff en 1 page',
        heading: 'Livrer pour que ce soit réellement construit : les 12 composants socles et la spec de Handoff',
        blocks: [
          {
            type: 'p',
            text: "Un design magnifique qui sort défiguré de l’intégration n’est pas la faute du développeur : c’est presque toujours la faute d’une passation muette (Section 28). Si l’intégrateur — humain ou agent IA — doit ouvrir trois onglets, deviner ce qui se passe au clic sur « Payer » et inventer la couleur d’erreur, il improvisera. Avant de multiplier les pages exotiques, verrouillez les 12 composants réutilisés dans de nombreux logiciels (Bouton × 6 états, Champ × 5 états + label, Checkbox/Radio avec label cliquable, Switch, Select, Carte, Modale avec piégeage du focus et touche Échap, Toast/Alerte, Onglets, Tableau + état vide, Badge de statut, Squelette de chargement). Puis joignez une fiche de Handoff qui tient sur un seul bloc Markdown.",
          },
          {
            type: 'copyable',
            label: 'Gabarit de Handoff prêt à copier dans vos tickets ou PRs (Section 28 & Annexe A3)',
            langTag: 'markdown',
            code: `# HANDOFF — Écran « Checkout / Étape 2 : Paiement »

## 1. Structure & Responsive
- Conteneur centré max-width: 1200px, padding inline var(--space-8) desktop / var(--space-4) mobile
- Grille desktop (≥ 1024px) : 2 colonnes — Formulaire 62% · Récapitulatif 38% (position: sticky; top: 24px)
- Mobile (< 1024px) : 1 colonne — Récapitulatif repliable en haut + bouton final visible sans piéger le clavier

## 2. Tokens consommés (zéro valeur en dur)
- Action primaire : var(--color-accent) · hover var(--color-accent-hover) · texte var(--color-on-accent)
- Bordure repos : 1px solid var(--color-control-line) · Focus clavier : outline 2px solid var(--color-accent); outline-offset: 2px
- Espacements autorisés : var(--space-2), var(--space-4), var(--space-6), var(--space-8) uniquement

## 3. Les 6 états à implémenter impérativement
1. Repos (méthode majoritaire présélectionnée)
2. Focus clavier visible sur chaque champ et tuile de paiement
3. Erreur champ au blur (bordure var(--color-danger) + texte explicite relié via aria-describedby)
4. Soumission en cours (bouton verrouillé contre le double-clic + libellé « Vérification bancaire… »)
5. Échec carte (bandeau inline au-dessus du bouton conservant toutes les saisies + action « Réessayer »)
6. Succès (redirection vers /confirmation + proposition de création de compte facultative en 1 clic)

## 4. Accessibilité & Contenu (critères bloquants)
- Ordre Tab strict : Prénom → Nom → Adresse → Ville → Code postal → Moyen de paiement → « Payer [Montant] »
- Focus déplacé automatiquement sur le premier champ invalide à la soumission
- Récapitulatif balisé en <aside aria-labelledby="summary-heading">
- Prévoir +35 % de largeur sur les libellés sans troncature ni débordement à 320 px`,
            note: "Glissez ce bloc dans votre issue Linear/GitHub ou dans handoff.md : un développeur ou un agent Claude Code / Cursor dispose des décisions de structure et des cas limites documentés.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Comment rendre un mode sombre OLED plus confortable à lire ?",
        a: "Conservez la base #000000 si l’OLED est votre objectif, relevez les surfaces pour montrer la hiérarchie et essayez une encre adoucie plutôt que du blanc pur. Vérifiez chaque contraste et faites lire un vrai paragraphe : le confort varie selon les personnes, l’écran et la lumière. Proposez un mode clair plutôt que de promettre zéro halation.",
      },
      {
        q: 'Faut-il aussi respecter un contraste de 4,5:1 sur le texte placeholder d’un champ ?',
        a: 'Dès lors que ce texte porte une indication utile (format attendu, exemple nécessaire), WCAG 2.2 niveau AA lui applique le seuil de 4,5:1 — et c’est l’un des échecs les plus fréquents du web. Mieux encore : ne mettez jamais l’intitulé ni une consigne indispensable dans le placeholder, car elle disparaît à la première lettre tapée ; placez un <label> permanent au-dessus et une ligne d’aide dessous.',
      },
      {
        q: 'Quelle est la différence entre une grille de 4 px et une grille de 8 px ?',
        a: 'C’est le même système harmonique : la base structurelle est de 8 px (8, 16, 24, 32, 48, 64 px) pour tous les paddings de cartes, marges et gouttières, tandis que le demi-pas de 4 px (4 px, 12 px) sert exclusivement aux micro-ajustements optiques internes (écart icône-texte, badges compacts).',
      },
      {
        q: 'Quelles propriétés CSS faut-il bannir pour ne pas casser une interface multilingue (RTL) ?',
        a: 'Remplacez systématiquement les directions physiques gauche/droite (margin-left, padding-right, left, right, border-left, text-align: left) par les propriétés logiques CSS (margin-inline-start, padding-inline-end, inset-inline-start, border-inline-start, text-align: start), et prévoyez +30 à +40 % d’élasticité horizontale sur vos boutons.',
      },
    ],
    ctaTitle: "Récupérez les fichiers tokens.css, tokens.json, les 13 prototypes Avant/Après et les 11 planches de plateformes et les 12 fiches.",
    ctaText:
      "Réutilisez une base documentée au prochain dépôt : l’édition française du UX/UI Playbook 2026 réunit 148 pages illustrées, des tokens clair/sombre, des gabarits de handoff et le scanner Python. Vérifiez ensuite les contrastes et composants dans votre propre rendu.",
    ctaBullets: [
      'Archive prête à l’emploi : tokens.css, tokens.json (format W3C) et 4 gabarits Markdown pro',
      "13 prototypes Avant/Après + 11 planches de plateformes : 24 planches au total",
      'Licence commerciale illimitée pour vos SaaS et les projets de vos clients (29 $ une seule fois)',
    ],
    entityDefinition: "Le design d’interface utilisateur définit la hiérarchie visuelle et les composants interactifs d’un produit : typographie, couleur, espacement et états. Un design system conserve ces décisions dans des tokens et des composants réutilisables.",
    references: [
      {
        "title": "Web Content Accessibility Guidelines 2.2",
        "url": "https://www.w3.org/TR/WCAG22/",
        "publisher": "W3C",
        "date": "2024-12-12",
        "evidence": "established",
        "note": "1.4.3 : texte courant 4,5:1, grand texte 3:1. 1.4.11 : composants et informations graphiques utiles 3:1."
      },
      {
        "title": "Understanding SC 2.5.8: Target Size (Minimum)",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        "publisher": "W3C WAI",
        "date": "WCAG 2.2",
        "evidence": "established",
        "note": "Le minimum AA web est 24 × 24 CSS px avec exceptions ; le Playbook recommande ici 44 × 44 px."
      },
      {
        "title": "Design Tokens Format Module 2025.10",
        "url": "https://www.designtokens.org/tr/2025.10/format/",
        "publisher": "Design Tokens Community Group",
        "date": "2025-10-28",
        "evidence": "established",
        "note": "Rapport final communautaire stable pour l’échange de tokens ; ne pas le présenter comme une norme W3C."
      },
      {
        "title": "The WebAIM Million — 2026 report",
        "url": "https://webaim.org/projects/million/",
        "publisher": "WebAIM",
        "date": "2026-02",
        "evidence": "established",
        "note": "Les contrastes insuffisants figurent parmi les erreurs automatiquement détectées les plus fréquentes de l’échantillon."
      }
    ],
  },

  /* ============================================================================
   * COURS 3 (FR) — PRODUCT DESIGN, REVENUS & AGENTS IA
   * ========================================================================== */
  {
    slug: 'product-design-ai-agents',
    category: 'Product Design',
    icon: '⚙️',
    readTime: '20 min de lecture',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-product-fr.jpg',
    metaTitle:
      "Product Design & agents IA | UX/UI Playbook",
    metaDescription:
      "Cadrez votre produit avant de coder : brief, pipeline IA en 5 fichiers, AGENTS.md, 3 prompts à copier et vérification à 3 statuts, sans faux feu vert.",
    keywords: [
      'Product Design développeur solo',
      'AGENTS.md Claude Code Cursor UI',
      'pipeline wireframe HTML IA',
      'patterns interface agentique HAX',
      'dashboard SaaS page tarifs UX',
      'fixer ses prix freelance design',
      'proposition commerciale 1 page',
    ],
    title:
      "Product Design : cadrer votre produit et guider vos agents IA",
    subtitle:
      "Écrivez les décisions avant de déléguer le code : brief, wireframes en niveaux de gris, règles d’interface et rapport de preuve. Puis protégez le périmètre de livraison et le temps de votre équipe.",
    aeoSummaryTitle: 'Synthèse exécutive — Gouverner le produit, l’agent et la marge',
    aeoSummary:
      "Un workflow de Product Design assisté par IA conserve ses décisions dans 5 fichiers : brief.md → screens.md → wireframe.html → review.md → handoff.md. AGENTS.md et tokens.css encadrent les contraintes communes. Les 3 prompts séparent spécification, structure et contrôle. Une recherche courte produit des hypothèses à vérifier, pas une validation de marché. Le rapport distingue les statuts Automatisé / À vérifier / Non applicable ; la sévérité Bloquant / Majeur reste une colonne séparée. Enfin, faites approuver la structure avant le style et ajustez le périmètre plutôt que de promettre un revenu ou une conformité sur la seule base d’un scan.",
    keyStats: [
      {
        value: "3 statuts",
        label: "Automatisé / À vérifier / Non applicable ; sévérité et résultat séparés",
        source: "UX/UI Playbook · Section 84 · Protocole de rapport",
        evidence: "probable",
      },
      {
        value: '2 heures',
        label: "Exemple de recherche express : 45 min de brief puis 75 min de terrain, à adapter au risque",
        source: "UX/UI Playbook · Section 29 · Repère de méthode",
        evidence: "probable",
      },
      {
        value: "6 patterns",
        label: "Synthèse Playbook : clarification, plan, périmètre, permissions, journal et bilan",
        source: "Microsoft HAX + Google PAIR · UX/UI Playbook §54",
        evidence: "probable",
        url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
      },
    ],
    sections: [
      {
        id: 'qui-decide-quoi-sequence',
        num: '01',
        tocLabel: 'UX, UI, Produit : l’ordre qui évite les reprises',
        heading: 'UX, UI, Produit : qui décide quoi (et pourquoi ouvrir Figma ou un prompt en premier ruine vos semaines)',
        blocks: [
          {
            type: 'p',
            text: 'Quand vous construisez un SaaS en solo ou que vous livrez pour un client, vous portez trois casquettes sur la même tête. Le danger n’est jamais de les cumuler ; le danger est de répondre à une question d’UI alors que la question Produit n’est pas tranchée (Section 02). Le Produit tranche « Faut-il construire cette fonction, pour qui, dans quel ordre et à quel prix ? ». L’UX tranche « Quel est le flux le plus court et que se passe-t-il en cas d’erreur ? ». L’UI tranche « Comment rendre cet écran lisible, cohérent et accessible ? ».',
          },
          {
            type: 'p',
            text: 'Observez le piège de séquence le plus répandu du métier : un client ou un cofondateur demande « une première maquette pour demain histoire de se projeter ». Vous ouvrez Figma ou lancez v0 / Claude Code ; en deux heures, vous sortez un bel écran coloré. Il le montre à son associé, qui remet en cause la cible, rajoute un système de rôles et change le modèle tarifaire. Trois semaines plus tard, vous en êtes à la septième version gratuite parce qu’une heure passée à produire du beau crée de l’attachement émotionnel et détourne tout le monde du vrai problème.',
          },
          {
            type: 'quote',
            tag: "La clause qui limite les reprises hors périmètre · Section 02 & 37",
            text: '« Structure validée avant style, par écrit. » Tant que le périmètre fonctionnel (brief.md) et le squelette en niveaux de gris (wireframe) ne sont pas signés, aucune couleur de marque ni direction artistique n’entre dans la discussion.',
          },
        ],
      },

      {
        id: 'brief-2h-saas-tarifs',
        num: '02',
        tocLabel: 'Recherche en 2h, Dashboard SaaS & Page Tarifs',
        heading: 'Cadrer juste en 2 heures et concevoir les deux écrans où se joue la valeur d’un SaaS',
        blocks: [
          {
            type: 'p',
            text: "Une recherche express de deux heures aide à sortir des hypothèses internes, sans remplacer une étude adaptée à un risque élevé. Le protocole du Playbook (Section 29) propose 45 minutes de cadrage et 75 minutes de confrontation au réel ; rallongez-le si vous n’avez pas accès aux bonnes personnes ou aux données nécessaires.",
          },
          {
            type: 'steps',
            title: 'Le protocole de recherche express en 120 minutes (Section 29)',
            steps: [
              {
                bold: 'Minutes 0 à 45 — Le brief à signaux d’alarme',
                text: 'Exigez un objectif chiffré à 30 jours (si l’on vous répond « avoir un site moderne », alerte rouge), un segment précis avec deux vrais profils nommés (si l’on répond « tout le monde », alerte rouge), une seule action clé et un seul arbitre final identifié.',
              },
              {
                bold: 'Minutes 45 à 90 — Trois entretiens de 15 minutes orientés récit',
                text: 'Ne demandez jamais « aimeriez-vous un bouton X ? » (tout le monde ment par politesse sur le futur). Posez une seule question sur le passé réel : « Racontez-moi la dernière fois que vous avez dû accomplir [tâche] : comment avez-vous fait et où avez-vous pesté ? ».',
              },
              {
                bold: 'Minutes 90 à 120 — Trois concurrents + les 5 derniers tickets de support',
                text: 'Capturez trois concurrents directs pour repérer les conventions attendues par le marché (pas pour copier leurs dégradés), puis lisez les cinq dernières plaintes reçues au support : elles contiennent presque toujours votre plan de refonte prioritaire.',
              },
            ],
          },
          {
            type: 'h3',
            text: 'Deux territoires produit décisifs : le Dashboard SaaS (Section 12) et la Page Tarifs (Section 15)',
          },
          {
            type: 'p',
            text: "Une fois le brief verrouillé, deux écrans concentrent l’essentiel des erreurs produit dans les logiciels B2B. Premier territoire : le Dashboard SaaS. Son principal écueil est la « densité décorative » — aligner 14 compteurs, deux jauges circulaires et un camembert simplement parce qu’il restait de la place sur un écran 27 pouces. Un tableau de bord n’affiche pas des données, il déclenche des décisions. Structurez-le en trois étages immuables : 1) trois KPIs maximum en haut, chacun affichant obligatoirement Valeur + Variation + Période de référence (car « 48,2 k€ » sans « ▲ +12,4 % vs sept. » est un chiffre muet), 2) un seul graphique temporel (courbe ou barres — bannissez les camemberts dès qu’on dépasse 3 parts), et 3) un tableau actionnable dont chaque ligne ouvre l’objet concerné.",
          },
          {
            type: 'p',
            text: 'Second territoire : la Page Tarifs. Un prospect qui ouvre `/pricing` ne cherche pas nécessairement l’offre gratuite ; il cherche la certitude de ne pas se tromper de palier. Limitez-vous à trois colonnes (Starter, Pro, Team), affichez explicitement l’unité de facturation sous le gros chiffre (« par mois, par siège »), mettez l’offre centrale en avant par deux signaux calmes (bordure + badge « Populaire » + seul bouton plein de la rangée), listez 3 à 5 bénéfices orientés résultat dans le même ordre exact d’une carte à l’autre pour permettre le balayage horizontal, et préférez une remise annuelle honnête (`-20 %`) aux faux comptes à rebours qui détruisent la confiance.',
          },
        ],
      },

      {
        id: 'pipeline-5-fichiers-agents',
        num: '03',
        tocLabel: 'Pipeline IA en 5 fichiers & 3 Prompts prêts à copier',
        heading: "Déléguer l’interface à Claude Code ou Cursor avec un pipeline en 5 fichiers",
        blocks: [
          {
            type: 'p',
            text: "Un prompt comme « Crée le dashboard et la page de paiement de mon SaaS » laisse l’agent deviner la hiérarchie, les labels, les permissions et les états d’erreur. Le résultat peut être compilable tout en restant inadapté à la tâche. Réduisez cette ambiguïté en décrivant les décisions produit et en vérifiant le code généré ; ne supposez pas qu’une génération rapide remplace cette revue.",
          },
          {
            type: 'figure',
            src: '/images/articles/fr/prod-pipeline.webp',
            alt: 'Schéma du pipeline déterministe en 5 étapes du UX/UI Playbook Français : brief.md, screens.md, wireframe.html, review et handoff.md',
            caption:
              'Le papier sert à diverger (5 croquis en 10 min) ; la chaîne de 5 fichiers versionnés sert à converger sans dérive entre deux sessions d’agent.',
            sourceRef: 'UX/UI Playbook FR · Partie 06, Section 43 (p. 81)',
            width: 1080,
            height: 1527,
          },
          {
            type: 'p',
            text: 'La règle d’or de l’ingénierie assistée par agent (Sections 43, 46 & 55) tient en une phrase : une conversation s’oublie et dérive ; un fichier se versionne et fait foi. Ne corrigez jamais à la main ou au fil du chat un défaut récurrent sur un écran généré sans d’abord inscrire la règle manquante dans `AGENTS.md` ou `tokens.css` — sinon vous repaierez exactement le même défaut au prompt suivant.',
          },
          {
            type: 'copyable',
            label: 'AGENTS.md (~40 lignes) — Le fichier de contexte à poser à la racine du dépôt (Section 55)',
            langTag: 'markdown',
            code: `# AGENTS.md — Règles d'interface non négociables

## Sources de vérité (interdiction de réinventer)
- @tokens.css : couleurs sémantiques, espacements base 4/8, rayons, échelle typo, durées motion.
- @screens.md : verbe unique de chaque écran, entrées/sorties, 5 états, cas limites, textes réels.
- Toute valeur absente de tokens.css doit être signalée en fin de réponse, jamais codée en dur.

## Interdits absolus (échec automatique de la tâche)
- Zéro « Lorem ipsum », zéro témoignage inventé, zéro statistique fictive.
- Zéro texte utile < 12px ; corps courant ≥ 15px ; largeur de lecture ≤ 70ch.
- Zéro bouton sans verbe d'action précis ; un seul bouton primaire accentué par vue.
- Zéro écran livré uniquement dans son état idéal : les 5 états (vide, chargement, idéal, partiel/débordement, erreur) doivent exister et être testables.
- Zéro propriété directionnelle physique (margin-left/right) si l'équivalent logique CSS existe.

## Accessibilité (bloquant WCAG 2.2 AA)
- Chaque <input>/<select>/<textarea> possède un <label> visible relié (jamais de placeholder seul).
- Chaque bouton-icône possède un aria-label explicite ; cibles tactiles ≥ 44x44px.
- Contraste texte ≥ 4.5:1 et bordures/composants ≥ 3:1 sur leur surface réelle (clair ET sombre).
- Navigation clavier complète (Tab, Shift+Tab, Escape) + focus visible + prefers-reduced-motion.

## Format de sortie obligatoire
1. Code complet fonctionnel consommant exclusivement @tokens.css.
2. Bilan honnête en 3 lignes : Vérifié (avec preuve) / Estimé (hypothèses) / Non fait.
   Pour chaque règle : statut Automatisé / À vérifier / Non applicable ; sévérité et résultat séparés.
3. Questions ouvertes numérotées (sans inventer la réponse produit).`,
            note: 'Compatible nativement avec Claude Code (CLAUDE.md), Cursor (.cursor/rules), OpenAI Codex, Windsurf et Cline.',
          },
          {
            type: 'h3',
            text: 'Les 3 prompts « phase-gated » qui remplacent le prompt magique unique',
          },
          {
            type: 'p',
            text: 'Ne demandez jamais la spécification, la structure et le style dans le même tour de parole. Découpez l’exécution en trois portes de validation successives (Section 44) — en imposant notamment la classe `<body class="wire">` (niveaux de gris, polices système, images grisées) à l’étape 2 pour obliger tout le monde à juger l’architecture d’information avant la peinture :',
          },
          {
            type: 'copyable',
            label: 'Les 3 Prompts séquentiels prêts à copier (Section 44 · p. 83)',
            langTag: 'text',
            code: `=== PROMPT 1 : De brief.md vers screens.md ===
RÔLE        : Designer produit senior rédigeant des spécifications d'écrans.
ENTRÉES     : @brief.md
CONTRAINTES : 1 écran = 1 verbe utilisateur ; définir les 5 états (vide, chargement,
              idéal, partiel/débordement, erreur) ; textes réels uniquement, zéro lorem ipsum ;
              n'inventer aucune fonctionnalité hors brief.md.
LIVRABLE    : screens.md contenant pour chaque écran : verbe, entrée, sortie,
              déclencheur + message des 5 états, cas limites (texte long, 0 résultat), textes.
INTERDIT    : Proposer des couleurs, polices ou effets visuels. Termine par les questions ouvertes.

=== PROMPT 2 : De screens.md vers wireframe.html (niveaux de gris) ===
RÔLE        : Développeur front-end spécialisé en maquettes structurelles accessibles.
ENTRÉES     : @screens.md, @tokens.css, @AGENTS.md
CONTRAINTES : <body class="wire"> en niveaux de gris stricts, sémantique HTML5 native,
              espacements issus de @tokens.css, chaque état de screens.md testable via ?state=.
LIVRABLE    : wireframe-<ecran>.html prêt pour captures à 390px, 768px et 1280px + passe axe-core.
INTERDIT    : Ajouter un seul bloc ou libellé absent de screens.md.

=== PROMPT 3 : Audit WCAG 2.2 AA & Spécification de Handoff ===
RÔLE        : Auditeur accessibilité WCAG 2.2 AA et rédacteur technique.
ENTRÉES     : @wireframe-<ecran>.html, @tokens.css
CONTRAINTES : Ne citer que des constats prouvables dans le code source avec numéro de ligne
              et critère WCAG exact (ex. 1.4.3, 1.4.11, 2.4.7, 2.5.8). Zéro avis esthétique.
LIVRABLE    : review.md (règle, statut, sévérité, résultat, preuve, correctif) + handoff.md complet.`,
            note: 'Astuce Section 44 : lancez le Prompt 2 sur deux modèles différents et notez-les sur 4 critères fixes (respect tokens, zéro erreur axe, tenue à 390/1280 px, fidélité à screens.md).',
          },
          {
            "type": "inlineCta",
            "title": "Réutilisez le protocole au prochain tour d’agent.",
            "text": "Le Skill IA, le scanner agent_check.py et les 77 règles sont livrés dans l’archive, avec les gabarits de brief, de revue et de handoff.",
            "buttonLabel": "Équiper mon dépôt · 29 $"
          },
        ],
      },

      {
        id: 'patterns-interface-agentique',
        num: '04',
        tocLabel: 'Les 6 patterns d’UX pour produits IA',
        heading: 'Concevoir des interfaces agentiques utilisables : un agent n’est pas un chat avec un spinner',
        blocks: [
          {
            type: 'p',
            text: 'Si vous intégrez vous-même de l’IA dans votre produit SaaS, retenez la convergence majeure des 18 directives HAX de Microsoft et du référentiel People + AI de Google analysés à la Section 54 : la confiance d’un utilisateur envers un agent ne dépend pas du QI brut du modèle, mais de trois pouvoirs concrets — prévoir ce qu’il va toucher, inspecter ce qu’il fait, et l’arrêter proprement à tout instant.',
          },
          {
            type: 'table',
            caption: 'Les 6 patterns d’interface agentique qui remplacent la boîte de chat opaque (Section 54 · p. 101)',
            headers: ['Pattern d’interface', 'Défaillance humaine ou IA résolue', 'Règle d’implémentation concrète'],
            rows: [
              [
                '1. Clarification bornée',
                'Une consigne d’une ligne cache dix hypothèses implicites.',
                'Poser au maximum 3 questions courtes avant d’agir, avec une valeur par défaut pré-cochée sur la troisième.',
              ],
              [
                '2. Plan éditable avant action',
                'L’agent part dix minutes dans la mauvaise direction et brûle des crédits.',
                'Afficher la liste des étapes prévues et permettre de décocher ou réordonner une étape avant exécution.',
              ],
              [
                '3. Périmètre d’accès visible',
                'L’utilisateur ignore quels dossiers, tables ou budgets sont exposés.',
                'Afficher sous forme de puces retirables en un clic les ressources autorisées pour la session.',
              ],
              [
                '4. Permissions à 3 paliers',
                'Demander « Confirmer ? » 18 fois de suite crée une cécité d’approbation.',
                'Lecture : libre · Écriture réversible : accordée une fois par session · Action destructive/externe : confirmation explicite systématique.',
              ],
              [
                '5. Journal d’étapes granulaire',
                'Un spinner « L’IA réfléchit… » pendant 25 s génère de l’anxiété.',
                'Une ligne horodatée par action réelle avec statut explicite (en attente, en cours, fait, ignoré, échec) + bouton Stop permanent.',
              ],
              [
                '6. Triplet final d’honnêteté',
                'Un modèle annonce une supposition du même ton assuré qu’un fait testé.',
                'Toujours conclure chaque exécution par trois compteurs distincts : Vérifié / Estimé / Non fait.',
              ],
            ],
          },
        ],
      },

      {
        id: 'verifier-ia-trois-statuts',
        num: '05',
        tocLabel: 'Contrôler la sortie IA : 3 statuts, pas 4',
        heading: "Contrôler une sortie IA : méthode, sévérité et résultat séparés",
        blocks: [
          {
            type: 'p',
            text: 'Un contrôle automatisé honnête ne prétend jamais remplacer l’œil humain : il élimine le bruit mécanique pour que l’humain consacre ses dix minutes d’attention à ce que seul un humain peut trancher. C’est tout l’objet des Sections 53, 83 et 84 du Playbook et du script `agent_check.py` livré dans l’archive.',
          },
          {
            type: 'figure',
            src: '/images/articles/fr/prod-verify-ai.webp',
            alt: 'Planche des 8 contrôles de sortie d’un écran généré par IA extraite du UX/UI Playbook Français',
            caption:
              "Un contrôle statique signale certains défauts de labels, tailles ou balises. Les fonds composites, l’ordre de lecture, les gestes et la clarté de l’offre demandent aussi un contrôle du rendu.",
            sourceRef: 'UX/UI Playbook FR · Partie 07, Section 53 (p. 99)',
            width: 1080,
            height: 1527,
          },
          {
            type: 'p',
            text: "La checklist définit 3 statuts de vérification, pas 3 colonnes exclusives de tout autre champ : Automatisé (une règle décidée sur les fichiers lus, avec preuve et résultat), À vérifier (contrôle du rendu ou jugement requis) et Non applicable (hors plateforme ou périmètre, avec raison). La sévérité — Bloquant, Majeur ou Mineur — et le résultat — réussi ou échoué — sont séparés du statut. Une règle automatisée peut donc échouer et bloquer la CI. L’épilogue d’un agent « Vérifié / Estimé / Non fait » répond à une autre question : il résume une exécution, pas la checklist.",
          },
        ],
      },

      {
        id: 'design-revenu-prix-cadrage',
        num: '06',
        tocLabel: 'Vendre, chiffrer & survivre aux retours clients',
        heading: 'Le design comme revenu : argumenter sans jargon, calculer son plancher et cadrer les retours',
        blocks: [
          {
            type: 'p',
            text: "Défendre une décision signifie rendre son raisonnement vérifiable, pas garantir une hausse de conversion ou un tarif supérieur. Présentez le constat, le choix puis l’effet attendu : « Sur mobile, le bouton de paiement passe sous le clavier → nous le rendons accessible sans masquer le champ → nous cherchons à réduire la friction ». Distinguez cet effet attendu d’un résultat mesuré après livraison (Sections 34 à 38).",
          },
          {
            type: 'h3',
            text: 'La formule mathématique du tarif plancher et la règle d’airain sur les remises (Section 36)',
          },
          {
            type: 'p',
            text: "Un tarif plancher part de vos coûts et de votre capacité facturable réelle. Les 12 jours facturables par mois, 30 % de marge et 20 % d’aléas du manuel sont des hypothèses de simulation, pas des constantes de marché. Remplacez-les par vos propres relevés, puis calculez Prix = (Jours estimés × TJM) + Réserve de risque + Outils. Observez aussi les refus et les raisons données ; aucun ratio de refus ne prouve à lui seul que vous avez trouvé le bon prix.",
          },
          {
            type: 'doDont',
            doTitle: '✓ Si le budget du client est trop court',
            dontTitle: '✕ Ce qui détruit votre rentabilité',
            doItems: [
              'Maintenir votre taux journalier intact et réduire le périmètre : livrer 4 écrans cœurs au lieu de 9, reporter le mode sombre en phase 2.',
              'Découper le paiement en 3 jalons protecteurs : 40 % à la signature, 30 % à la validation écrite des wireframes, 30 % à la livraison.',
              'Exiger un interlocuteur décisionnaire unique et limiter le forfait à 2 tours de retours groupés par écrit.',
            ],
            dontItems: [
              'Accorder -35 % sur le même périmètre « pour lancer la relation » : vous ancrez un tarif bas dont ce client ne sortira jamais.',
              'Envoyer un devis flou de 14 pages sans liste explicite de ce qui est « Non inclus ».',
              'Traiter 38 messages WhatsApp ou Slack éparpillés au fil de l’eau sans regrouper ni chiffrer les demandes hors périmètre.',
            ],
          },
          {
            type: 'copyable',
            label: 'Trame de Proposition en 1 page + Les 5 phrases de survie aux retours (Sections 37 & 38)',
            langTag: 'markdown',
            code: `# PROPOSITION COMMERCIALE EN 1 PAGE (les 7 blocs qui font signer)
1. PROBLÈME COMPRIS (3 lignes avec les mots exacts du client) :
   « Sur [période], [taux mesuré] des visiteurs mobiles quittent l’étape Livraison (source : [rapport]). »
2. LIVRABLES EXACTS :
   4 écrans (Panier, Livraison, Paiement, Confirmation) × 5 états + tokens.css + handoff.md + rapport WCAG 2.2 AA.
3. NON INCLUS (protège votre marge) :
   Développement back-end, rédaction CGV, shooting photo, au-delà de 2 tours de retours consolidés.
4. CALENDRIER & JALONS :
   S1 Brief & Wireframes gris (validation écrite requise) · S2 UI haute fidélité & états · S3 Handoff & revue.
5. INVESTISSEMENT : [Montant unique ferme — pas de fourchette hésitante]
6. RÈGLEMENT : 40 % commande · 30 % validation wireframes · 30 % livraison finale.
7. PROCHAINE ÉTAPE : Accord par retour d'e-mail avant le [Date, validité 15 jours] pour bloquer le créneau du [Date].

---
# LES 5 PHRASES DE CADRAGE À COPIER-COLLER EN COURS DE MISSION
- Retours dispersés : « Je regroupe l'ensemble des retours de votre équipe dans un document unique avant mercredi pour éviter toute contradiction. »
- Dérive de périmètre : « Excellente idée ; comme la structure a été validée le [Date], ce nouvel écran fait l'objet d'un avenant dédié de 2 jours. On l'ajoute maintenant ou en lot 2 ? »
- Silence client : « Pour tenir notre mise en ligne du [Date], j'ai besoin de votre validation avant vendredi ; au-delà, le planning se décalera d'autant de jours ouvrés. »
- Débat d'opinion : « Plutôt que de trancher entre nos deux avis, soumettons ce libellé à 5 utilisateurs cibles demain matin pendant 15 minutes. »
- Goût flou (« je n'aime pas ») : « Qu'est-ce qui vous inquiète sur cet écran ? Si l'action principale ressort deux fois plus fort, est-ce que cela règle votre crainte ? »`,
            note: 'Dans le Kit Bonus imprimable du Playbook, ces trames sont livrées en fiches A4 prêtes à remplir pendant vos appels clients.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Quelle taille idéale doit faire un fichier AGENTS.md ou CLAUDE.md pour le design d’interface ?',
        a: 'Environ 40 à 60 lignes denses et vérifiables. Au-delà de 300 lignes remplies de conseils vagues (« fais un design moderne et harmonieux »), l’attention du modèle se dilue. Contentez-vous de pointer vers vos fichiers de vérité (@tokens.css, @screens.md), de lister les échecs automatiques (pas de Lorem ipsum, 5 états obligatoires, plancher 12 px) et d’imposer le rapport final en 3 lignes.',
      },
      {
        q: 'Pourquoi forcer une étape wireframe HTML en niveaux de gris alors que l’IA peut générer la couleur tout de suite ?',
        a: "Parce que la vitesse de génération ne change rien à la psychologie humaine : dès qu’un client ou un cofondateur voit du bleu ou du orange, la discussion peut dériver sur la couleur au lieu de vérifier si la promesse, les champs et les cas d’erreur tiennent debout. La classe .wire verrouille le fond avant la forme.",
      },
      {
        q: "Comment choisir le nombre de jours facturables pour calculer mon tarif ?",
        a: "Utilisez vos jours réellement facturés sur plusieurs mois et provisionnez prospection, administration, apprentissage et périodes sans contrat. Les 12 jours de l’exemple ne sont pas une obligation : recalculez le modèle avec votre activité et vos charges.",
      },
      {
        q: 'Que faire lorsqu’un client impose un changement que vous savez mauvais pour la conversion ?',
        a: 'Pratiquez le « désaccord documenté » (Section 38) : proposez d’abord un test éclair sur 5 utilisateurs ; si le client maintient son choix pour des raisons internes, consignez sobrement par écrit « Décision du [Date] : retenir l’option B à la demande du client malgré le risque identifié sur la lisibilité mobile ». Vous protégez votre réputation sans entrer en conflit d’ego.',
      },
    ],
    ctaTitle: 'Équipez votre dépôt du Skill IA complet, du scanner Python des 77 règles et du Kit Pro.',
    ctaText:
      'Obtenez immédiatement les trois couches opérationnelles du UX/UI Playbook 2026 en français : le manuel de 148 pages, le Kit Bonus imprimable de 26 pages (brief, proposition 1 page, audit 40 points, handoff) et l’archive ZIP des 21 fichiers techniques.',
    ctaBullets: [
      'Skill IA prêt à déposer (SKILL.md + AGENTS.md) pour Claude Code, Cursor, Windsurf & Codex',
      'Script exécutable agent_check.py + base JSON des 77 règles multi-plateformes pour votre CI',
      'Les 4 gabarits commerciaux & techniques + garantie satisfait ou remboursé 7 jours (29 $)',
    ],
    entityDefinition: "Le design produit relie les besoins des utilisateurs, les objectifs de l’activité et les contraintes techniques pour décider quoi construire et dans quel ordre. L’UX organise le parcours ; l’UI matérialise les interactions. Un agent IA exécute dans ce cadre sans remplacer l’arbitrage produit.",
    references: [
      {
        "title": "Guidelines for Human-AI Interaction",
        "url": "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
        "publisher": "Microsoft Research · Amershi et al.",
        "date": "2019",
        "evidence": "established",
        "note": "18 recommandations, validées selon le protocole de l’article CHI 2019 ; elles ne prescrivent pas mot pour mot les 6 patterns du Playbook."
      },
      {
        "title": "People + AI Guidebook",
        "url": "https://pair.withgoogle.com/guidebook/",
        "publisher": "Google PAIR",
        "date": "2024",
        "evidence": "established",
        "note": "Guide vivant sur besoins, modèles mentaux, contrôle et gestion des erreurs ; les patterns ci-dessus en sont une synthèse pratique."
      },
      {
        "title": "Web Content Accessibility Guidelines 2.2",
        "url": "https://www.w3.org/TR/WCAG22/",
        "publisher": "W3C",
        "date": "2024-12-12",
        "evidence": "established",
        "note": "Critères normatifs à tester ; une passe axe-core ne suffit pas à conclure à la conformité."
      },
      {
        "title": "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        "url": "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
        "publisher": "EUR-Lex · Union européenne",
        "date": "2026-07-27",
        "evidence": "established",
        "note": "Texte consolidé : art. 50 (obligations et exceptions), 111(4) (transition au 2 décembre 2026 pour certains systèmes existants) et 113 (application). Vérifier le rôle et l’usage concernés."
      }
    ],
  },
];
