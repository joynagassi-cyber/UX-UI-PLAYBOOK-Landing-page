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
      'UX Design : lois cognitives, états d’écran & audit | UX/UI Playbook',
    metaDescription:
      'Guide pratique d’UX Design : lois cognitives, cinq états d’écran, ergonomie du checkout et audit d’interface en 20 minutes.',
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
      'UX Design opérationnel : budget cognitif, parcours d’habitude, 5 états d’écran et audit en 20 minutes',
    subtitle:
      'L’UX n’est pas une couche de vernis qu’on pose la veille de la mise en production. C’est la mécanique qui permet à une personne pressée d’atteindre son objectif sans réfléchir — et de revenir d’elle-même sept jours plus tard.',
    aeoSummaryTitle: 'Synthèse exécutive — Ce qu’il faut retenir',
    aeoSummary:
      'Un écran performant obéit à quatre contraintes mesurables : un budget cognitif plafonné à 4 ± 1 blocs (Cowan, 2001) avec une seule action primaire, un premier succès atteint en moins de 60 secondes dès l’état vide, la conception systématique des 5 états (vide, chargement, idéal, débordement, erreur) et la conformité WCAG 2.2 AA (4,5:1 de contraste, cibles ≥ 44 px). Un test à 5 personnes détecte en moyenne 85 % des blocages (fourchette réelle 55–99 %), mais exige ~93 personnes pour trancher statistiquement entre deux variantes.',
    keyStats: [
      {
        value: '4 ± 1 blocs',
        label: 'Capacité réelle de la mémoire de travail en traitement actif (et non le mythe des 7 ± 2)',
        source: 'Nelson Cowan, Behavioral & Brain Sciences (2001) · Preuve établie',
        urls: ['https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory/44023F1147D4A1D44BDC0AD226838496'],
      },
      {
        value: '70,22 %',
        label: 'Taux moyen d’abandon de panier (23,48 champs affichés en moyenne alors que 12 à 14 suffisent)',
        source: 'Baymard Institute (28 oct. 2026, 50 études) · Preuve établie',
        urls: ['https://baymard.com/blog/cart-abandonment-rate'],
      },
      {
        value: '95,9 %',
        label: 'Des pages d’accueil échouent encore à WCAG 2.2 A/AA (56,1 erreurs détectables par page)',
        source: 'WebAIM Million (février 2026) · Preuve établie',
        urls: ['https://webaim.org/projects/million/'],
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
            text: 'Le protocole gratuit et sans pitié : le test des 5 secondes',
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
            text: '1. Cowan (2001) contre le mythe de Miller : votre vrai plafond est à 4 ± 1 blocs',
          },
          {
            type: 'p',
            text: 'En 1956, George Miller évoquait « 7 ± 2 éléments » dans un essai devenu célèbre, mais il décrivait la répétition immédiate d’items isolés sans traitement mental simultané. Lorsqu’un utilisateur réel lit des prix, compare des garanties et cherche un bouton d’action en même temps, sa mémoire de travail active plafonne à 4 ± 1 groupements (Nelson Cowan, Behavioral and Brain Sciences, 2001). En pratique : regroupez toujours vos cartes, vos arguments, vos colonnes de tarifs et vos sections de navigation par ensembles de 3 à 5 blocs. Un menu déroulant de 40 entrées non groupées n’est pas « complet » : c’est un refus de concevoir.',
          },
          {
            type: 'h3',
            text: '2. Hick-Hyman (1952–1953) : l’exception décisive de la mémoire spatiale',
          },
          {
            type: 'p',
            text: 'On résume souvent Hick par « moins il y a de boutons, plus vite on clique ». C’est inexact sur deux points majeurs. D’abord, le temps de décision croît logarithmiquement avec l’entropie d’information du choix (la difficulté à distinguer des options mal nommées), pas simplement avec le nombre brut d’éléments. Ensuite — nuance capitale démontrée dès l’article original — la loi ne s’applique presque plus lorsque la position spatiale est mémorisée par habitude ! Sur une landing page découverte une seule fois, réduisez impérativement à une seule action primaire. En revanche, dans la barre d’outils d’un logiciel métier ouvert six heures par jour, ne déplacez jamais et ne fusionnez jamais les raccourcis connus : le muscle gagne toujours sur le minimalisme.',
          },
          {
            type: 'h3',
            text: '3. Fitts (1954) : le glyphe n’est jamais la cible tactile',
          },
          {
            type: 'p',
            text: 'La loi de Fitts relie le temps de pointage au rapport entre la distance à parcourir et la largeur utile de la cible. Détail que beaucoup d’équipes ignorent : la largeur pertinente se mesure sur la dispersion réelle des impacts du doigt ou du curseur, pas sur le dessin de l’icône. Une croix de fermeture dessinée en 16 × 16 px qui n’a que 16 px de zone cliquable viole Fitts et provoque des erreurs de tapotement permanentes. Séparez systématiquement la boîte visuelle du glyphe (16–20 px) de la boîte d’interaction (`min-width: 44px; min-height: 44px` sur iOS/Web, `48 × 48 dp` sur Android).',
          },
          {
            type: 'table',
            caption: 'Synthèse opérationnelle des lois fondamentales (UX/UI Playbook · Section 03)',
            headers: ['Loi / Principe', 'Mécanisme cognitif réel', 'Traduction immédiate dans l’écran'],
            rows: [
              [
                'Loi de Jakob',
                'L’utilisateur passe 99 % de son temps sur d’autres produits que le vôtre.',
                'Respectez les conventions : logo en haut à gauche = accueil, panier en haut à droite, recherche reconnaissable.',
              ],
              [
                'Proximité (Gestalt)',
                'Deux objets proches sont interprétés comme un même concept avant même d’être lus.',
                'Écart interne 8 px (label → champ) contre écart externe 24 à 32 px entre deux groupes.',
              ],
              [
                'Similarité',
                'Ce qui partage la même forme visuelle promet le même comportement.',
                'Un lien texte ne doit jamais ressembler à un bouton ; un badge de statut ne doit jamais ressembler à un CTA.',
              ],
              [
                'Effet Von Restorff',
                'Seul l’élément qui rompt le motif ambiant capte la mémoire.',
                'Un seul bouton de couleur d’accent par écran. Trois boutons orange équivalent à zéro bouton orange.',
              ],
              [
                'Seuil de Doherty',
                'Au-delà d’environ 400 ms d’attente muette, le fil d’attention se rompt.',
                'Retour visuel instantané (< 100 ms à l’appui), squelette dimensionné dès 300 ms, progression explicite au-delà.',
              ],
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
                bold: 'Rupture n°1 — L’arrivée muette (> 60 % de rebond)',
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
            text: 'Pourquoi tant d’applications codées vite — à la main ou avec un agent IA — donnent-elles une impression d’inachevé dès la première minute d’usage réel ? Parce qu’on n’a dessiné que l’état « carte postale » : celui où la base de données contient pile six lignes propres, où les prénoms font douze lettres et où l’API répond en 40 millisecondes. En ingénierie d’interface, cet état idéal ne représente que 20 % du livrable.',
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ux-states.webp',
            alt: 'Planche des 5 états obligatoires de chaque écran issue du UX/UI Playbook Français : vide, chargement, idéal, partiel et erreur',
            caption:
              'Un écran n’est terminé que lorsque ses cinq états — vide, chargement sans saut CLS, idéal, débordement/partiel et erreur actionnable — sont spécifiés et codés.',
            sourceRef: 'UX/UI Playbook FR · Partie 01, Section 07 (p. 17)',
          },
          {
            type: 'h3',
            text: 'Cas pratique n°1 : réussir son état vide et passer sous la barre des 60 secondes',
          },
          {
            type: 'p',
            text: 'L’écran le plus stratégique de votre SaaS est celui que 100 % de vos nouveaux inscrits contemplent à la première seconde : l’état vide (Section 17). La plupart des produits y affichent un sinistre « Aucune donnée trouvée » ou une illustration géante qui repousse le bouton d’action sous la ligne de flottaison mobile. Un état vide qui convertit obéit à six règles strictes : 1) un constat factuel sans fausse blague (« Aucun tableau pour l’instant »), 2) une phrase expliquant la valeur une fois rempli, 3) un bouton primaire qui crée réellement le premier objet en un clic, 4) une voie rapide alternative (« Ou importer un CSV / partir d’un modèle »), 5) zéro illustration démesurée sur mobile, et 6) aucune barre d’outils grisée intimidante autour. Si l’utilisateur ne produit pas un premier résultat visible en 60 secondes, sa probabilité de retour s’effondre.',
          },
          {
            type: 'h3',
            text: 'Cas pratique n°2 : le Checkout, l’écran où chaque champ en trop détruit du chiffre d’affaires',
          },
          {
            type: 'p',
            text: 'La compilation de 50 études e-commerce par le Baymard Institute (mise à jour du 28 octobre 2026) établit le taux moyen d’abandon de panier à 70,22 % (fourchette observée de 55 % à 84 %). Surtout, Baymard mesure qu’un tunnel moyen impose 23,48 éléments de formulaire alors que 12 à 14 suffisent largement pour facturer et livrer une commande. Sur cet écran, la beauté décorative ne pèse rien face à la vitesse et à la réduction d’anxiété (Section 14) :',
          },
          {
            type: 'list',
            heading: 'Les 6 leviers mesurables d’un Checkout qui encaisse (Section 14)',
            items: [
              {
                bold: 'Invité par défaut, jamais de compte forcé',
                text: 'Exiger la création d’un mot de passe avant l’achat reste la cause n°1 d’abandon évitable. Proposez la création de compte en un clic sur la page de confirmation, une fois le paiement acquis.',
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
            text: 'En février 2026, le rapport annuel WebAIM Million montre que 95,9 % des pages d’accueil analysées échouent encore aux critères automatisables WCAG 2.2 niveaux A et AA, avec 56,1 erreurs par page (dominées par le texte gris trop pâle, les images sans alternative pertinente, les champs sans `<label>` relié et les boutons-icônes muets). Corriger ces six familles de défauts ne relève pas de la charité : cela rend l’interface plus nette au soleil sur mobile, pilotable au clavier pour vos power-users et conforme aux exigences contractuelles.',
          },
          {
            type: 'h3',
            text: 'Ce qui est réellement en vigueur en 2026 (et la nuance juridique qui sauve vos devis)',
          },
          {
            type: 'p',
            text: 'Beaucoup d’agences écrivent des bêtises juridiques dans leurs propositions commerciales en confondant une recommandation W3C, une norme technique européenne publiée et un texte cité au Journal officiel de l’Union européenne (Section 52). Voici l’état exact des textes en 2026 :',
          },
          {
            type: 'table',
            caption: 'Cadre réglementaire et normatif européen applicable en 2026 (Section 52 · p. 97)',
            headers: ['Référentiel / Texte', 'Date clé', 'Portée réelle pour vos projets et contrats'],
            rows: [
              [
                'European Accessibility Act — Directive (UE) 2019/882',
                'En application depuis le 28 juin 2025',
                'Obligatoire sur les produits et services visés (e-commerce, banque, transport, télécoms, liseuses). Exemption pour les micro-entreprises de services (< 10 salariés ET ≤ 2 M€ de CA ou bilan) — attention, les produits matériels restent couverts.',
              ],
              [
                'WCAG 2.2 (Recommandation W3C)',
                'Octobre 2023',
                'Le référentiel technique mondial visé au niveau AA (contraste 4,5:1, focus non masqué 2.4.11, cible minimale, alternative au glisser-déposer).',
              ],
              [
                'Norme EN 301 549 v4.1.1',
                'Publiée le 2 septembre 2026',
                'Aligne la norme européenne sur WCAG 2.2, mais ne vaut présomption légale de conformité qu’une fois citée au Journal officiel de l’UE (d’ici là, la v3.2.1 demeure la référence harmonisée).',
              ],
              [
                'WCAG 3.0 (W3C Working Draft)',
                'Projet de travail du 10 sept. 2026',
                'Aucune valeur obligatoire. Le W3C précise explicitement qu’il ne doit pas être cité en exigence contractuelle.',
              ],
              [
                'Règlement (UE) 2024/1689 (AI Act · art. 50)',
                'Applicable depuis le 2 août 2026',
                'Obligation de transparence : informer clairement l’utilisateur lorsqu’il interagit avec un système d’IA et baliser les contenus synthétiques.',
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
            text: 'Combien d’utilisateurs faut-il vraiment tester ? La formule binomiale de Nielsen et Landauer (CHI 1993), `1 - (1 - L)^n` avec une probabilité moyenne de découverte `L ≈ 31 %`, indique que 5 participants révèlent en moyenne 85 % des problèmes d’utilisabilité d’un parcours précis. Mais l’étude empirique de Laura Faulkner (2003) apporte le correctif que tout praticien honnête doit connaître : sur de vrais sous-échantillons aléatoires de 5 personnes, le taux réel observé oscille entre 55 % et 99 % !',
          },
          {
            type: 'p',
            text: 'La règle du Playbook (Sections 32 & 48) est donc limpide : 5 personnes en entretiens observés de 25 minutes suffisent pour trouver ce qui bloque et corriger immédiatement ce que 3 personnes sur 5 ratent. En revanche, 5 personnes ne permettent jamais d’affirmer « la variante B convertit mieux que A » — pour comparer un taux de réussite à ± 10 points de marge d’erreur (confiance 90 %), il faut environ 93 utilisateurs par groupe. Et ne remplacez jamais ces 5 humains par des « personas IA synthétiques » : les benchmarks 2026 (Kuric et al., 2026 ; Pew Research Center, 2026) montrent qu’ils divergent du comportement humain réel sur 53 % des tâches.',
          },
          {
            type: 'h3',
            text: 'Vendre et conduire un audit d’interface en 20 minutes (150 à 400 €)',
          },
          {
            type: 'p',
            text: 'Un audit court et structuré est la meilleure porte d’entrée commerciale d’un freelance ou d’un studio : le client constate votre rigueur avant de signer une refonte à plusieurs milliers d’euros (Section 33). Notez l’écran sur 10 critères (/50) — Clarté 5s, Hiérarchie, Action unique, Cohérence, 5 États, Feedback < 400 ms, Accessibilité, Micro-copie, Confiance (prix/frais), Mobile à une main — puis restituez uniquement les 3 problèmes majeurs selon la séquence : Constat factuel → Impact business → Correctif précis sur capture annotée. Terminez par une seule question : « Par lequel de ces trois chantiers voulez-vous commencer ? »',
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
- [ ] Les 5 états d'écran existent : vide, chargement, rempli, erreur, succès
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
        a: 'Parce que l’article de Miller (1956) portait sur la mémorisation immédiate de chiffres ou syllabes sans autre tâche concurrente. Sur une interface réelle où l’utilisateur lit, compare et décide simultanément, la méta-analyse de Nelson Cowan (2001) établit la mémoire de travail active à 4 ± 1 blocs. Structurer vos écrans par groupes de 3 à 5 éléments évite la paralysie cognitive.',
      },
      {
        q: 'Le European Accessibility Act (directive 2019/882) oblige-t-il tous les sites web en 2026 ?',
        a: 'La directive s’applique depuis le 28 juin 2025 aux produits et services numériques visés (notamment e-commerce, services bancaires, billetterie, télécoms). Les micro-entreprises fournissant des services (moins de 10 salariés ET chiffre d’affaires ou bilan ≤ 2 M€) bénéficient d’une exemption légale sur les services, mais attention : dès que vous vendez à des grands comptes ou au secteur public, le niveau WCAG 2.2 AA est exigé contractuellement.',
      },
      {
        q: 'Quel est le moyen le plus rapide et le moins cher d’augmenter la conversion d’un checkout ?',
        a: 'Trois actions immédiates sans refonte graphique : 1) autoriser l’achat en invité sans création de compte préalable, 2) supprimer les champs redondants pour redescendre de la moyenne de 23,48 éléments vers 12–14 éléments utiles (Baymard, oct. 2026), et 3) inscrire le montant exact sur le bouton final (« Payer 132,90 € ») avec un récapitulatif des frais visible dès la première seconde.',
      },
      {
        q: 'Peut-on valider un parcours UX uniquement avec des agents IA qui simulent des utilisateurs ?',
        a: 'Non. Les études empiriques de 2026 (Kuric et al., 2026 ; Pew Research Center, 2026) prouvent que les personas LLM divergent du comportement humain sur 53 % des tâches. Utilisez un script déterministe pour contrôler vos contrastes, tailles et balises, et observez 5 vrais humains pendant 25 minutes pour tester la compréhension.',
      },
    ],
    ctaTitle: 'Passez du cours aux 36 écrans annotés, aux 12 fiches A4 et au scanner Python.',
    ctaText:
      'Ce dossier résume une fraction de la méthode. Téléchargez l’édition française intégrale du UX/UI Playbook 2026 (148 pages A4), accompagnée du Kit Bonus imprimable de 26 pages (fiches d’audit, brief, handoff) et des 21 fichiers techniques incluant agent_check.py.',
    ctaBullets: [
      'Livre complet de 148 pages A4 en français (97 sections, 36 écrans décortiqués, 24 paires Avant/Après)',
      'Kit Bonus de 12 fiches A4 imprimables + gabarits Markdown prêts pour vos missions clients',
      'Scanner Python exécutable des 77 règles + Skill IA pour Claude Code, Cursor & Codex (29 $ paiement unique)',
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
      'UI Design : tokens, typographie & Dark Mode | UX/UI Playbook',
    metaDescription:
      'Construire un système UI cohérent : design tokens, contraste accessible, typographie, espacements, Dark Mode et handoff.',
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
      'UI Design & Design Tokens : hiérarchie en 4 leviers, échelle typographique, vrai Dark Mode, micro-copie et handoff',
    subtitle:
      'Une interface qui paraît « amateur » ne souffre presque jamais d’un manque d’illustrations. Elle souffre de cinq tailles de police choisies à l’œil, de marges à 13 et 19 px, d’accents colorés partout et d’un mode sombre bricolé par inversion.',
    aeoSummaryTitle: 'Synthèse exécutive — Les chiffres qui tiennent un Design System',
    aeoSummary:
      '80 % de la qualité visuelle perçue provient d’une échelle typographique fermée (base 16 px × ratio 1,25 arrondie en 12, 14, 16, 20, 24, 32, 40, 64 px) et de trois échelles d’espacement strictes en base 4/8 (interne 4–12 px, structurelle 16–32 px, macro 48–96 px). La couleur obéit au ratio 60 % surfaces neutres / 30 % encre lisible / 10 % accent unique (contraste WCAG 2.2 AA ≥ 4,5:1 sur texte et placeholders, ≥ 3:1 sur bordures et focus). Le Dark Mode ne s’obtient jamais par inversion : l’élévation se traduit par un éclaircissement progressif des surfaces (#121212 puis +4 % à +8 %) avec un texte blanc adouci à ~87 % pour supprimer le halo optique.',
    keyStats: [
      {
        value: '60 / 30 / 10',
        label: 'Proportion entre surfaces neutres calmes, structure foncée lisible et couleur d’action unique',
        source: 'UX/UI Playbook · Section 22 (Système chromatique)',
      },
      {
        value: '≥ 4,5 : 1',
        label: 'Contraste minimal WCAG 2.2 AA exigé sur tout texte < 24 px, y compris les placeholders',
        source: 'W3C WCAG 2.2 (critères 1.4.3 & 1.4.11) · Preuve établie',
        urls: ['https://www.w3.org/TR/WCAG22/'],
      },
      {
        value: '2025.10',
        label: 'Version stabilisée du standard interopérable des jetons de design (JSON → CSS / iOS / Android)',
        source: 'W3C Design Tokens Community Group (28 oct. 2025) · Preuve établie',
        urls: ['https://www.designtokens.org/TR/2025.10/format/'],
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
        tocLabel: 'Typographie : 2 familles & échelle 1,25',
        heading: 'Typographie sans hasard : deux familles maximum, une échelle mathématique et zéro texte sous 12 px',
        blocks: [
          {
            type: 'p',
            text: 'Une interface logicielle est constituée à 80 % de caractères écrits. Si votre typographie flotte, aucune palette de couleurs ne sauvera l’écran. Le remède tient en une contrainte libératrice (Section 21 & Annexe A4) : deux familles au grand maximum (une police de titrage expressive comme Sora + une sans-serif d’interface irréprochable comme Inter, complétée d’une chasse fixe pour le code et les identifiants), et six à sept tailles figées une fois pour toutes dans vos variables.',
          },
          {
            type: 'h3',
            text: 'Construire l’échelle en 30 secondes et régler l’interlignage optique',
          },
          {
            type: 'p',
            text: 'Partez d’un corps de lecture confortable à `16 px` et multipliez chaque palier par un ratio harmonique de `1,25` (Major Third, polyvalent pour SaaS et web) : vous obtenez `16 · 20 · 25 · 31,25 · 39 · 48,8 · 61`. Arrondissez simplement aux multiples de 4 les plus proches pour tomber juste sur votre grille verticale : `12 · 14 · 16 · 20 · 24 · 32 · 40 · 48 · 64 px`. Plus jamais personne dans l’équipe n’écrira `font-size: 17px` ou `23px`.',
          },
          {
            type: 'p',
            text: 'Deux réglages optiques séparent immédiatement le professionnel du débutant. Premièrement, l’interlignage (`line-height`) varie en sens inverse de la taille : un paragraphe de corps à 16 px a besoin d’air (`1,55` à `1,65`) sur une justification plafonnée entre `60 et 75 caractères` (`max-width: 68ch`), tandis qu’un grand titre Display à 48 px avec `line-height: 1.5` se disloque complètement — resserrez vos titres entre `1,05 et 1,15` avec une approche légèrement négative (`letter-spacing: -0.02em` à `-0.03em`). Deuxièmement, activez systématiquement `font-variant-numeric: tabular-nums` sur tous les montants, compteurs, dates et colonnes de tableaux pour que le chiffre `1` occupe exactement la même chasse que le `8` et que les décimales tombent au cordeau.',
          },
          {
            type: 'table',
            caption: 'Table de référence typographique prête à coder (Section 21 & Annexe A4)',
            headers: ['Rôle sémantique', 'Taille CSS', 'Interligne & approche', 'Usage strict & garde-fous'],
            rows: [
              ['Hero / H1', '40 à 64 px', '1,05–1,10 · -0,03em', 'Un seul par page, jamais deux H1 concurrents'],
              ['Section / H2', '28 à 32 px', '1,15–1,22 · -0,02em', 'Découpage majeur du document ou de la vue'],
              ['Carte / H3', '20 à 24 px', '1,30 · -0,015em', 'Sous-sections, en-têtes de modales et de cartes'],
              ['Corps courant', '15 à 16 px', '1,55–1,65 · normal', 'Lecture longue (largeur 60–75 ch max)'],
              ['Secondaire / UI', '13 à 14 px', '1,45 · normal', 'Libellés de formulaires, aides contextuelles, cellules'],
              ['Micro / Tag', '12 px (plancher)', '1,40 · +0,04em', 'Badges courts, horodatages — jamais une phrase entière'],
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
            text: 'Un générateur de palettes en ligne qui vous donne cinq carrés pastel côte à côte vous tend un piège. Une interface n’a pas besoin d’une « jolie harmonie » ; elle a besoin d’une répartition fonctionnelle 60 / 30 / 10 (Section 22) : 60 % de surfaces neutres calmes (fonds de page et cartes), 30 % de neutres sombres structurants (encre principale, encre secondaire, filets subtils) et seulement 10 % d’accent réservé à l’action.',
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
                text: 'Respiration franche entre deux chapitres majeurs d’une page. Remplace avantageusement 80 % des traits horizontaux `<hr>` inutiles.',
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
        tocLabel: 'Tokens CSS & vrai Dark Mode sans halation',
        heading: 'Tokens CSS & vrai Dark Mode : pourquoi inverser une maquette claire produit une interface illisible',
        blocks: [
          {
            type: 'p',
            text: 'Un écran isolé se jette à la refonte suivante ; un jeu de tokens se réutilise pendant cinq ans et fait votre marge dès le deuxième projet (Section 25). Un token n’est pas une variable `--blue-500` : c’est une décision de rôle (`--color-surface`, `--color-text`, `--color-accent`, `--space-6`), alignée sur la spécification W3C Design Tokens `2025.10`. Si votre code consomme exclusivement des rôles sémantiques, activer un mode sombre propre prend vingt lignes de CSS. Si vous avez codé `#FFFFFF` et `#F3F4F6` en dur dans cent composants React, c’est une réécriture complète.',
          },
          {
            type: 'h3',
            text: 'Les 4 lois physiques d’un Dark Mode confortable sur la durée (Section 56)',
          },
          {
            type: 'doDont',
            doTitle: '✓ Vrai Dark Mode par tokens',
            dontTitle: '✕ Inversion naïve (« filtre négatif »)',
            doItems: [
              'Éclaircir progressivement les surfaces élevées : base sombre (#0B0D12 ou #121212), carte à +4 % de clarté, modale ou menu déroulant à +8 %. En mode sombre, la lumière remplace l’ombre portée.',
              'Adoucir l’encre principale autour de #ECEEF4 (blanc à ~87 %) pour supprimer l’éblouissement sur lecture longue.',
              'Désaturer et relever d’un ton la couleur d’accent afin qu’elle ne « vibre » pas optiquement contre le fond sombre.',
              'Re-mesurer chaque paire texte secondaire / fond sur la carte la plus claire (là où le ratio chute le plus vite).',
            ],
            dontItems: [
              'Plaquer du texte blanc pur `#FFFFFF` en corps 15 px sur un fond `#000000` : provoque un halo optique (halation) très fatigant, surtout chez les lecteurs astigmates (~30–40 % des adultes).',
              'Conserver des `box-shadow: 0 10px 30px rgba(0,0,0,0.12)` invisibles sur fond sombre sans bordure subtile (`1px solid rgba(255,255,255,0.09)`).',
              'Garder le même rouge ou bleu saturé du mode clair, qui tombe souvent sous 3:1 de contraste une fois posé sur `#121212`.',
              'Utiliser `filter: invert(1)` sur la page, qui détruit les photos, les avatars et les couleurs sémantiques.',
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/fr/ui-sbs-dark.webp',
            alt: 'Prototype comparé du mode sombre tiré du UX/UI Playbook Français opposant une inversion brutale à une architecture de tokens par élévation',
            caption:
              'Prototype comparé (Section 61) : à gauche, l’inversion naïve qui aveugle et écrase les cartes ; à droite, la hiérarchie par surfaces progressives et accent désaturé.',
            sourceRef: 'UX/UI Playbook FR · Partie 07, Section 61 (p. 110)',
          },
          {
            type: 'copyable',
            label: 'tokens.css — Le socle complet (Clair + Dark Mode + Typo + Base 8 + Motion)',
            langTag: 'css',
            code: `/* UX/UI Playbook 2026 — tokens.css (couvre 90 % des produits web & SaaS) */
:root {
  /* 1. Surfaces & Encres — Mode Clair (validé WCAG 2.2 AA) */
  --color-bg:             #FFFFFF;
  --color-surface-1:      #F4F1EA;
  --color-surface-2:      #EAE5DA;
  --color-text:           #101319; /* > 16:1 sur bg */
  --color-text-2:         #343A46; /* > 10:1 sur bg */
  --color-muted:          #5B6170; /* ≥ 5.2:1 sur surface-1 */
  --color-line:           #DFDBD0;

  /* 2. Action unique & Canaux sémantiques distincts */
  --color-accent:         #F0512B;
  --color-accent-hover:   #B93314;
  --color-on-accent:      #101319;
  --color-success:        #0E7C6B;
  --color-danger:         #C62828;
  --color-info:           #2C5CE6;

  /* 3. Les 3 échelles d'espacement (Interne / Structurel / Macro) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* 4. Rayons & Échelle typographique fermée (ratio 1,25 arrondi) */
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
  --color-bg:             #0B0D12;
  --color-surface-1:      #131720; /* +claire que la base */
  --color-surface-2:      #1B202C; /* +claire pour modales/popovers */
  --color-text:           #ECEEF4; /* ~87% blanc : zéro halation */
  --color-text-2:         #B4BCCB;
  --color-muted:          #8E96A8; /* ≥ 4.6:1 vérifié sur surface-2 */
  --color-line:           rgba(255, 255, 255, 0.10);

  --color-accent:         #FF6B47; /* relevé d'un ton et adouci */
  --color-accent-hover:   #FF8566;
  --color-on-accent:      #0B0D12;
  --color-success:        #24D18A;
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
            text: 'Traduire en allemand ou en français allonge déjà les libellés courts anglais (« Save » → « Enregistrer les modifications ») de +30 à +40 % ; passer en arabe ou en hébreu (`dir="rtl"` sur `<html>`) miroite en plus tout l’axe horizontal. Si vous prenez l’habitude dès aujourd’hui de remplacer `margin-left` par `margin-inline-start`, `padding-right` par `padding-inline-end`, `left: 0` par `inset-inline-start: 0` et `text-align: left` par `text-align: start`, votre mise en page bascule gratuitement. Retenez enfin la frontière de miroitage : on inverse les flèches de suite/retour, les chevrons de fil d’Ariane et l’ordre des colonnes d’un tableau, mais on n’inverse jamais un logo, les aiguilles d’une horloge, les boutons de lecture vidéo ni l’ordre des chiffres à l’intérieur d’un nombre.',
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
            text: 'Un design magnifique qui sort défiguré de l’intégration n’est pas la faute du développeur : c’est presque toujours la faute d’une passation muette (Section 28). Si l’intégrateur — humain ou agent IA — doit ouvrir trois onglets, deviner ce qui se passe au clic sur « Payer » et inventer la couleur d’erreur, il improvisera. Avant de multiplier les pages exotiques, verrouillez les 12 composants qui fabriquent 95 % d’un logiciel (Bouton × 6 états, Champ × 5 états + label, Checkbox/Radio avec label cliquable, Switch, Select, Carte, Modale avec piégeage du focus et touche Échap, Toast/Alerte, Onglets, Tableau + état vide, Badge de statut, Squelette de chargement). Puis joignez une fiche de Handoff qui tient sur un seul bloc Markdown.',
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
- Bordure repos : 1px solid var(--color-line) · Focus clavier : outline 2px solid var(--color-accent); outline-offset: 2px
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
            note: 'Glissez ce bloc dans votre issue Linear/GitHub ou dans handoff.md : un développeur ou un agent Claude Code / Cursor dispose de 100 % des décisions implicites.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Pourquoi le blanc pur (#FFFFFF) sur noir pur (#000000) pose-t-il problème sur les textes longs ?',
        a: 'Un contraste maximal de 21:1 sur du texte courant crée un phénomène optique appelé halation : les lettres lumineuses semblent baver sur le fond noir, provoquant une fatigue rapide et un flou marqué chez les lecteurs astigmates. Gardez un fond sombre profond (#0B0D12 ou #121212) pour vos surfaces et utilisez un blanc cassé vers #ECEEF4 (~87 %) pour une lecture prolongée confortable tout en dépassant largement le seuil AAA.',
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
    ctaTitle: 'Récupérez les fichiers tokens.css, tokens.json, les 24 comparatifs Avant/Après et les 12 fiches.',
    ctaText:
      'Ne reconstruisez pas votre système de zéro à chaque nouveau dépôt : l’édition française du UX/UI Playbook 2026 livre les 148 pages illustrées ainsi que l’archive complète des tokens validés WCAG 2.2 AA (clair & sombre), les gabarits de handoff et le scanner Python.',
    ctaBullets: [
      'Archive prête à l’emploi : tokens.css, tokens.json (format W3C) et 4 gabarits Markdown pro',
      '24 prototypes comparés côte à côte (boutons, tableaux, formulaires, mode sombre, cibles tactiles)',
      'Licence commerciale illimitée pour vos SaaS et les projets de vos clients (29 $ une seule fois)',
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
      'Product Design : agents IA, SaaS & tarification | UX/UI Playbook',
    metaDescription:
      'Guide de Product Design : recherche rapide, pages tarifaires SaaS, workflows d’agents IA, vérification et cadrage des missions.',
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
      'Product Design, Revenus & Agents IA : cadrer la valeur, piloter Claude Code / Cursor sans « slop » et facturer proprement',
    subtitle:
      'Un agent de code écrit mille lignes en trente secondes, mais il ne prend aucune décision produit à votre place : sans fichier de contexte ni jalon en noir et blanc, il génère une interface générique bourrée de dettes cachées.',
    aeoSummaryTitle: 'Synthèse exécutive — Gouverner le produit, l’agent et la marge',
    aeoSummary:
      'En Product Design moderne, la qualité d’une interface générée ou codée est plafonnée par la précision écrite en amont. Un workflow fiable sépare la décision en cinq fichiers versionnés (brief.md → screens.md → wireframe.html en niveaux de gris → revue multi-tailles + axe-core → handoff.md) gouvernés par un fichier AGENTS.md de ~40 lignes et 3 prompts séquentiels. Côté produit et business : 2 heures de recherche express suffisent à cadrer le besoin, un rapport de vérification honnête ne comporte que 3 statuts (Automatisé, À vérifier, Non applicable), et la rentabilité repose sur une règle stricte : « structure validée par écrit avant style » et réduction du périmètre plutôt que remise sur votre tarif journalier.',
    keyStats: [
      {
        value: '84 %',
        label: 'Des sites générés par IA évalués présentent des violations d’accessibilité dès la sortie',
        source: 'Aljedaani et al. (ACM W4A, 2024) · Niveau de preuve : Probable',
        urls: ['https://doi.org/10.1145/3677846.3677854'],
      },
      {
        value: '2 heures',
        label: '45 min de brief structuré + 75 min de terrain (3 entretiens, 3 concurrents, 5 tickets support)',
        source: 'UX/UI Playbook · Section 29 (Brief & recherche express)',
      },
      {
        value: '1 sur 3',
        label: 'Proportion saine de propositions refusées sur le prix signalant que votre tarif a quitté la sous-évaluation',
        source: 'UX/UI Playbook · Section 36 (Fixer ses prix)',
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
            tag: 'La phrase contractuelle qui stoppe 80 % des refontes gratuites · Section 02 & 37',
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
            text: 'La recherche utilisateur n’est pas un comité de six semaines réservé aux banques. Deux heures chrono suffisent pour cesser de projeter vos propres goûts sur l’écran (Section 29). Découpez ces 120 minutes en deux blocs chirurgicaux : 45 minutes de cadrage contradictoire avec le décideur, suivies de 75 minutes de confrontation au réel.',
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
            text: 'Une fois le brief verrouillé, deux écrans concentrent l’essentiel des erreurs produit dans les logiciels B2B. Premier territoire : le Dashboard SaaS. Son ennemi mortel est la « densité décorative » — aligner 14 compteurs, deux jauges circulaires et un camembert simplement parce qu’il restait de la place sur un écran 27 pouces. Un tableau de bord n’affiche pas des données, il déclenche des décisions. Structurez-le en trois étages immuables : 1) trois KPIs maximum en haut, chacun affichant obligatoirement Valeur + Variation + Période de référence (car « 48,2 k€ » sans « ▲ +12,4 % vs sept. » est un chiffre muet), 2) un seul graphique temporel (courbe ou barres — bannissez les camemberts dès qu’on dépasse 3 parts), et 3) un tableau actionnable dont chaque ligne ouvre l’objet concerné.',
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
        heading: 'Déléguer l’interface à Claude Code ou Cursor sans récolter du « slop » : le pipeline en 5 fichiers',
        blocks: [
          {
            type: 'p',
            text: 'Pourquoi un prompt du type « Crée-moi le dashboard et la page de paiement de mon SaaS » produit-il systématiquement la même soupe visuelle reconnaissable entre mille (cartes violettes sur fond ardoise, icônes décoratives partout, aucun état d’erreur, contrastes défaillants sur 84 % des générations selon Aljedaani et al., W4A 2024) ? Parce qu’un agent ne rate pas la syntaxe React ou CSS : il rate toutes les décisions implicites que vous n’avez pas écrites. En l’absence de contraintes, le modèle récite la médiane statistique de GitHub.',
          },
          {
            type: 'figure',
            src: '/images/articles/fr/prod-pipeline.webp',
            alt: 'Schéma du pipeline déterministe en 5 étapes du UX/UI Playbook Français : brief.md, screens.md, wireframe.html, review et handoff.md',
            caption:
              'Le papier sert à diverger (5 croquis en 10 min) ; la chaîne de 5 fichiers versionnés sert à converger sans dérive entre deux sessions d’agent.',
            sourceRef: 'UX/UI Playbook FR · Partie 06, Section 43 (p. 81)',
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
- Zéro écran livré uniquement dans son état idéal : les 5 états (vide, chargement, rempli, erreur, succès) doivent exister et être testables.
- Zéro propriété directionnelle physique (margin-left/right) si l'équivalent logique CSS existe.

## Accessibilité (bloquant WCAG 2.2 AA)
- Chaque <input>/<select>/<textarea> possède un <label> visible relié (jamais de placeholder seul).
- Chaque bouton-icône possède un aria-label explicite ; cibles tactiles ≥ 44x44px.
- Contraste texte ≥ 4.5:1 et bordures/composants ≥ 3:1 sur leur surface réelle (clair ET sombre).
- Navigation clavier complète (Tab, Shift+Tab, Escape) + focus visible + prefers-reduced-motion.

## Format de sortie obligatoire
1. Code complet fonctionnel consommant exclusivement @tokens.css.
2. Bilan honnête en 3 lignes : Vérifié par script / À vérifier à l'écran / Non fait.
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
              rempli, erreur, succès) ; textes réels uniquement, zéro lorem ipsum ;
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
LIVRABLE    : audit.md (Bloquant / Majeur / Mineur + correctif exact) + handoff.md complet.`,
            note: 'Astuce Section 44 : lancez le Prompt 2 sur deux modèles différents et notez-les sur 4 critères fixes (respect tokens, zéro erreur axe, tenue à 390/1280 px, fidélité à screens.md).',
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
        heading: 'Vérifier un écran sorti d’une IA : pourquoi notre scanner refuse catégoriquement un quatrième statut',
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
              'Ce qu’un scanner attrape à coup sûr (labels manquants, contrastes en échec, sauts de Hn, absence de prefers-reduced-motion) face à ce qu’il laisse passer (promesse floue, mauvais prix, parcours absurde).',
            sourceRef: 'UX/UI Playbook FR · Partie 07, Section 53 (p. 99)',
          },
          {
            type: 'p',
            text: 'Dans les rapports générés par la checklist des 77 règles sur les 6 plateformes (Web, iOS, Android, Windows, macOS, Linux GNOME/KDE), seules trois colonnes existent — et jamais une quatrième colonne mensongère intitulée « 100 % Conforme » : 1) Automatisé (prouvé mathématiquement dans les fichiers lus avec ligne et valeur), 2) À vérifier à l’écran (exige d’ouvrir le vrai viewport ou l’appareil physique pour juger un geste, une zone sûre d’encoche ou la clarté d’un message), et 3) Non applicable (règle propre à une autre plateforme, écartée proprement par filtre). Un prestataire qui remet à son client un rapport disant « 42 règles prouvées par script, 3 bloquants corrigés, 11 points vérifiés manuellement sur iOS Safari » inspire dix fois plus confiance qu’un badge vert magique.',
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
            text: 'Deux profils techniques peuvent coder ou maquetter exactement le même écran ; celui qui sait défendre ses décisions en termes économiques remporte le contrat suivant et le facture le double (Partie 05, Sections 34 à 38). Bannissez à jamais de votre vocabulaire les expressions « c’est plus aéré », « c’est la tendance » ou « je le sens mieux comme ça ». Structurez chaque présentation autour du triptyque invariable : Constat indiscutable → Choix assumé → Conséquence business (« Sur iPhone, le bouton d’achat passait sous le clavier virtuel → je l’ai ancré hors de la zone de saisie → on supprime la friction n°1 au moment du paiement »).',
          },
          {
            type: 'h3',
            text: 'La formule mathématique du tarif plancher et la règle d’airain sur les remises (Section 36)',
          },
          {
            type: 'p',
            text: 'Votre prix n’est pas un jugement moral sur votre talent ; c’est la rémunération d’un risque et d’une valeur. Pour calculer votre tarif journalier plancher sans vous mentir : prenez votre besoin mensuel net + charges, et divisez-le par **12 jours réellement facturables par mois** (et jamais par 20, car la prospection, les devis, la comptabilité et les relances absorbent le reste). Ajoutez 30 % de marge de sécurité, puis chiffrez tout forfait selon `Prix = (Jours estimés × TJM) + 20 % d’aléas + Outils`. À chaque nouveau contrat signé facilement, relevez votre tarif jusqu’à ce qu’environ **1 proposition sur 3 soit déclinée pour raison budgétaire** : c’est le signal exact du prix de marché.',
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
   « Aujourd'hui, 68 % des visiteurs mobiles quittent votre tunnel à l'étape Livraison... »
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
        a: 'Parce que la vitesse de génération ne change rien à la psychologie humaine : dès qu’un client ou un cofondateur voit du bleu ou du orange, 90 % de la réunion dérive sur la couleur au lieu de vérifier si la promesse, les champs et les cas d’erreur tiennent debout. La classe .wire verrouille le fond avant la forme.',
      },
      {
        q: 'Pourquoi diviser son revenu mensuel cible par 12 jours facturables et non par 20 jours ouvrés ?',
        a: 'Parce qu’un indépendant qui facture 20 jours pleins chaque mois pendant un an n’a plus une seule heure pour prospecter, rédiger ses propositions, gérer sa facturation, se former et absorber les creux entre deux missions. Calculer son plancher sur 12 jours réels empêche l’épuisement à perte.',
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
  },
];
