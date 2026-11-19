import type { Locale } from './content';

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'callout'; icon: string; title: string; text: string; tone?: 'neutral' | 'accent' | 'lime' }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'figure';
      src: string;
      alt: string;
      caption: string;
      sourceRef: string;
    }
  | {
      type: 'copyable';
      label: string;
      langTag: string;
      code: string;
      note?: string;
    }
  | {
      type: 'list';
      ordered?: boolean;
      items: Array<{ bold?: string; text: string }>;
    };

export interface ArticleSection {
  id: string;
  num: string;
  heading: string;
  blocks: ArticleBlock[];
}

export interface ArticleData {
  slug: 'ux-design-guide' | 'ui-design-system-tokens' | 'product-design-ai-agents';
  category: 'UX Design' | 'UI Design' | 'Product Design';
  icon: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  ogImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  title: string;
  subtitle: string;
  aeoSummaryTitle: string;
  aeoSummary: string;
  keyStats: Array<{ value: string; label: string; source: string }>;
  sections: ArticleSection[];
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaText: string;
  ctaBullets: string[];
}

export interface ArticlesIndexCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  heading: string;
  lede: string;
  readBtn: string;
  backHome: string;
  tocTitle: string;
  copyBtn: string;
  copiedBtn: string;
  sourcesBadge: string;
  relatedHeading: string;
  miniCtaTag: string;
  miniCtaTitle: string;
  miniCtaBtn: string;
}

export const ARTICLES_UI: Record<Locale, ArticlesIndexCopy> = {
  fr: {
    metaTitle: 'Guides UX Design, UI Design & Product Design 2026 — UX/UI Playbook',
    metaDescription:
      'Trois guides de référence tirés du UX/UI Playbook 2026 : lois cognitives et audit UX, design tokens et vrai Dark Mode WCAG 2.2, pipeline Product Design pour agents IA.',
    kicker: 'GUIDES DE RÉFÉRENCE · SOURCES PRIMAIRES DATÉES',
    heading: 'Apprendre les règles mesurables derrière les écrans qui tiennent.',
    lede:
      'Trois dossiers complets extraits et enrichis à partir des 97 sections du UX/UI Playbook 2026 : seuils chiffrés, études primaires (2024–2026), schémas réels du livre et encadrés prêts à copier dans vos projets.',
    readBtn: 'Lire le dossier complet',
    backHome: 'Retour au Playbook',
    tocTitle: 'Sommaire du dossier',
    copyBtn: 'Copier',
    copiedBtn: 'Copié !',
    sourcesBadge: 'Sources primaires vérifiées',
    relatedHeading: 'Continuer avec les autres dossiers du Playbook',
    miniCtaTag: 'SYSTÈME COMPLET · 29 $',
    miniCtaTitle: 'Les 148 pages, 12 fiches A4 & le scanner Python des 77 règles.',
    miniCtaBtn: 'Obtenir le Playbook FR →',
  },
  en: {
    metaTitle: 'UX Design, UI Design & Product Design Guides 2026 — UX/UI Playbook',
    metaDescription:
      'Three field guides drawn from the UX/UI Playbook 2026: cognitive UX laws and 20-minute audits, WCAG 2.2 design tokens and true Dark Mode, and deterministic AI agent product pipelines.',
    kicker: 'FIELD GUIDES · DATED PRIMARY SOURCES',
    heading: 'Master the measurable rules behind screens that hold up.',
    lede:
      'Three in-depth guides extracted and expanded from the 97 sections of the UX/UI Playbook 2026: exact thresholds, primary studies (2024–2026), real book diagrams, and copy-ready blocks for your repository.',
    readBtn: 'Read full guide',
    backHome: 'Back to Playbook',
    tocTitle: 'On this page',
    copyBtn: 'Copy',
    copiedBtn: 'Copied!',
    sourcesBadge: 'Verified primary sources',
    relatedHeading: 'Continue with the other Playbook field guides',
    miniCtaTag: 'COMPLETE SYSTEM · $29',
    miniCtaTitle: 'All 139 pages, 12 A4 sheets & the 77-rule Python scanner.',
    miniCtaBtn: 'Get the EN Playbook →',
  },
};

export const ARTICLES: Record<Locale, ArticleData[]> = {
  fr: [
    /* ============================================================================
     * ARTICLE 1 (FR) — UX DESIGN
     * ========================================================================== */
    {
      slug: 'ux-design-guide',
      category: 'UX Design',
      icon: '🧭',
      readTime: '11 min de lecture',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-ux-fr.jpg',
      metaTitle:
        'UX Design en 2026 : 10 lois cognitives, 5 états d’écran et audit en 20 min | UX/UI Playbook',
      metaDescription:
        'Pourquoi l’UX n’est pas de la décoration : mémoire de travail (4±1 blocs, Cowan 2001), les 5 états obligatoires d’un écran, psychologie du checkout (70,22 % d’abandon) et protocole de test à 5 utilisateurs.',
      keywords: [
        'UX Design',
        'lois UX',
        'charge cognitive interface',
        'audit UX 20 minutes',
        '5 états d’un écran',
        'test utilisateur 5 personnes',
        'optimisation checkout UX',
      ],
      title: 'UX Design en 2026 : lois cognitives, 5 états d’écran et preuves mesurables',
      subtitle:
        'L’UX n’est pas une couche de vernis ajoutée après le code : c’est la somme des décisions mesurables qui permettent à un utilisateur d’atteindre son verbe d’action sans réfléchir.',
      aeoSummaryTitle: 'En bref — Qu’est-ce qu’un bon UX Design en 2026 ?',
      aeoSummary:
        'Un bon UX Design se mesure en tâches réussies, en temps de décision et en erreurs évitées — jamais en adjectifs flous comme « moderne » ou « épuré ». Il repose sur 4 règles opératoires : respecter le plafond de mémoire de travail de 4 ± 1 blocs (Cowan, 2001), n’imposer qu’une seule action primaire par écran, spécifier les 5 états de chaque vue (vide, chargement, rempli, erreur, succès) et valider le parcours sur 5 vrais humains avant de coder le style.',
      keyStats: [
        {
          value: '4 ± 1',
          label: 'blocs retenus en mémoire de travail',
          source: 'Cowan, 2001 (niveau : Établi)',
        },
        {
          value: '70,22 %',
          label: 'taux moyen d’abandon de panier web',
          source: 'Baymard Institute, oct. 2026 (50 études)',
        },
        {
          value: '400 ms',
          label: 'seuil au-delà duquel l’attention décroche',
          source: 'Seuil de Doherty / Nielsen 1993',
        },
      ],
      sections: [
        {
          id: 'ux-pas-decoration',
          num: '01',
          heading: 'Pourquoi l’UX n’est jamais de la décoration (et le test des 5 secondes)',
          blocks: [
            {
              type: 'p',
              text: 'Trois mots reviennent dans presque tous les cahiers des charges : « moderne », « épuré », « intuitif ». Aucun des trois n’est un critère vérifiable. Une interface n’est jamais intuitive dans l’absolu : elle l’est pour une personne précise, dans un état d’esprit précis (pressée dans la rue, inquiète devant un paiement refusé, curieuse devant un tableau de bord), avec une intention formulable par un seul verbe.',
            },
            {
              type: 'callout',
              icon: '⏱️',
              tone: 'accent',
              title: 'Le protocole gratuit du test des 5 secondes',
              text: 'Affichez votre écran à quelqu’un qui ne l’a jamais vu pendant exactement 5 secondes, puis masquez-le. Posez deux questions : 1) « Que fait ce produit ? » 2) « Quelle action pouvez-vous accomplir ici ? ». S’il hésite, aucun dégradé ni aucune refonte typographique ne sauvera la page : le défaut est structurel.',
            },
            {
              type: 'p',
              text: 'Deux écrans pixel-pour-pixel identiques en style peuvent produire une UX diamétralement opposée. Un bouton primaire rouge vif, large et placé en bas à droite est excellent pour confirmer une commande urgente ; ce même bouton appliqué à « Supprimer définitivement mon espace de travail » devient un piège destructeur. Avant d’ouvrir Figma ou de lancer un prompt dans Cursor, répondez par écrit aux quatre questions fondatrices.',
            },
            {
              type: 'copyable',
              label: 'Encadré à copier — Les 4 questions avant de dessiner le moindre rectangle',
              langTag: 'markdown',
              code: `# Pré-cadrage UX d'un écran (à remplir avant toute maquette)
1. QUI ouvre cet écran, et dans quel état d'esprit ? (pressé, inquiet, méfiant, quotidien)
2. QUEL VERBE unique doit-il réussir à accomplir ici ? (ex. "Payer sa commande", pas "Gérer")
3. QUEL EST le chemin minimal (en champs et en clics) jusqu'à ce verbe ?
4. QUE SE PASSE-T-IL quand ce chemin échoue ? (0 donnée, réseau lent > 400 ms, refus serveur)`,
              note: 'Tiré de la Partie 01, Section 01 du UX/UI Playbook 2026.',
            },
          ],
        },
        {
          id: 'dix-lois-cognitives',
          num: '02',
          heading: 'Les 10 lois cognitives (et pourquoi le fameux « 7 ± 2 » de Miller vous trompe)',
          blocks: [
            {
              type: 'p',
              text: 'Les lois de l’UX ne sont pas des conventions artistiques : ce sont des limites neurobiologiques du système visuel et de la mémoire humaine. La confusion la plus répandue sur le web concerne la loi de Miller (1956) : on répète partout que l’humain retient « 7 ± 2 éléments ». Or Miller mesurait la répétition immédiate de chiffres isolés. Lorsque l’utilisateur doit traiter et comparer des blocs d’interface tout en poursuivant un but, les travaux de Nelson Cowan (2001) établissent la capacité réelle de la mémoire de travail à 4 ± 1 blocs.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ux-laws.webp',
              alt: 'Tableau des 10 lois cognitives du UX/UI Playbook : Jakob, Fitts, Hick-Hyman, Cowan, Proximité, Similarité, Von Restorff, Pareto, Doherty, Aesthetic-Usability',
              caption:
                'Les 10 lois qui gouvernent la lecture d’un écran et leur traduction immédiate en décisions d’interface.',
              sourceRef: 'UX/UI Playbook FR · Partie 01, Section 03 (p. 12)',
            },
            {
              type: 'p',
              text: 'La seconde subtilité décisive touche la loi de Hick-Hyman (1952–1953) : le temps de décision croît logarithmiquement avec l’entropie du choix pour un visiteur novice (sur une landing page ou un écran de tarifs, gardez une seule action primaire !), mais cette loi s’effondre dès que la position spatiale est mémorisée. Dans un outil métier ouvert 40 fois par jour, cacher des commandes fréquentes dans des sous-menus « pour épurer » ralentit l’expert au lieu de l’aider.',
            },
            {
              type: 'table',
              caption: 'Budget réel de densité par type d’écran (d’après Cowan, 2001 & Section 04)',
              headers: ['Type d’écran', 'Plafond d’éléments visibles', 'Règle d’arbitrage UX'],
              rows: [
                ['Landing page', '1 promesse, 1 CTA primaire, 3 preuves', 'Une seule idée directrice par hauteur d’écran'],
                ['Formulaire / Checkout', '5 à 7 champs max par étape', 'Au-delà, regrouper logiquement ou supprimer'],
                ['Dashboard SaaS', '3 KPIs clés, 1 graphique, 1 liste actionnable', 'Chaque bloc doit déclencher une décision identifiable'],
                ['Navigation principale', '3 à 5 entrées maximum', 'Un menu déroulant de 40 liens est un aveu d’indécision'],
              ],
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ux-cognitive.webp',
              alt: 'Page du Playbook sur la charge cognitive et le budget réel des écrans',
              caption:
                'Le test du comptoir : si vous devez ajouter une phrase pour expliquer où cliquer, changez l’écran, pas l’utilisateur.',
              sourceRef: 'UX/UI Playbook FR · Partie 01, Section 04 (p. 13)',
            },
            {
              type: 'copyable',
              label: 'Script de réunion — Défendre un choix UX devant un client sans avis subjectif',
              langTag: 'text',
              code: `❌ Ne dites jamais : "Je préfère qu'il n'y ait qu'un seul bouton orange, c'est plus aéré."
✅ Dites : "Actuellement, l'écran affiche trois boutons pleins de même poids visuel. Cela viole l'effet Von Restorff et la loi de Hick-Hyman : trois priorités égales équivalent à zéro priorité. On garde l'action qui génère le revenu en bouton plein, et on passe les deux actions secondaires en contour neutre."`,
            },
          ],
        },
        {
          id: 'cinq-etats-ecran',
          num: '03',
          heading: 'Les 5 états de chaque écran : là où 90 % des maquettes échouent en production',
          blocks: [
            {
              type: 'p',
              text: 'Un écran « fini » dans Figma ou généré en 30 secondes par un LLM ne montre presque toujours qu’un seul cas : l’état nominal idéalement rempli (« Maya Thompson, 12 transactions, connexion fibre parfaite »). En production, chaque écran existe sous cinq formes distinctes. Oublier les quatre autres oblige le développeur — ou l’agent de code — à improviser sous pression le soir du déploiement.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ux-states.webp',
              alt: 'Schéma des 5 états de chaque écran : Vide, Chargement, Rempli, Erreur, Succès',
              caption:
                'Aucun écran n’est livrable tant que ses 5 états (et les 6 états de ses boutons) ne sont pas dessinés à la même échelle.',
              sourceRef: 'UX/UI Playbook FR · Partie 01, Section 07 (p. 17)',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                {
                  bold: '1. L’état vide (Empty State) :',
                  text: 'Premier lancement, recherche à zéro résultat ou filtre trop restrictif. Un tableau blanc muet ressemble à un bug. Affichez toujours : une phrase neutre, un modèle d’exemple en 1 clic et le bouton primaire de création.',
                },
                {
                  bold: '2. L’état de chargement (Loading · CLS ≤ 0,1) :',
                  text: 'Passé 400 ms sans retour visuel, l’utilisateur reclique. Bannissez le spinner centré sur page blanche qui provoque un saut de mise en page (Layout Shift) à l’arrivée des données : réservez l’empreinte exacte avec un squelette (skeleton) et désactivez le bouton en état occupé.',
                },
                {
                  bold: '3. L’état rempli (cas nominal + cas extrêmes) :',
                  text: 'Testez-le avec un nom de famille de 42 caractères, un titre sur trois lignes, 0 € et 1 250 000,00 €.',
                },
                {
                  bold: '4. L’état d’erreur (sans punition) :',
                  text: 'Coupure réseau, permission refusée ou carte rejetée. Trois obligations : dire ce qui s’est passé sans code cryptique, garantir que les champs déjà saisis sont conservés, et offrir l’action immédiate pour réessayer.',
                },
                {
                  bold: '5. L’état de succès (preuve immédiate) :',
                  text: 'Ne laissez jamais l’utilisateur demander « C’est bon, c’est envoyé ? ». L’élément créé apparaît dans la liste, le compteur s’incrémente ou le reçu s’affiche avec son numéro.',
                },
              ],
            },
            {
              type: 'copyable',
              label: 'Critères d’acceptation — Définition du « Prêt à livrer » (5 états)',
              langTag: 'markdown',
              code: `## Critères d'acceptation UX de l'écran (bloquant avant merge)
- [ ] ?state=empty   : message explicite + 1 CTA primaire (aucun conteneur blanc muet)
- [ ] ?state=loading : skeleton aux dimensions finales (CLS <= 0.1), bouton en aria-busy="true"
- [ ] ?state=filled  : testé avec chaînes longues (80+ car.) et 0 débordement à 375 px
- [ ] ?state=error   : cause humaine claire + données saisies préservées + action de reprise
- [ ] ?state=success : confirmation visuelle persistante ou mise à jour immédiate de l'objet`,
            },
          ],
        },
        {
          id: 'checkout-et-tests',
          num: '04',
          heading: 'Checkout (70,22 % d’abandon) et vraie mathématique du test à 5 utilisateurs',
          blocks: [
            {
              type: 'p',
              text: 'Le paiement (checkout) est l’écran où l’esthétique pure pèse le moins face à la confiance et à la vitesse. Selon la compilation de 50 études du Baymard Institute (mise à jour du 28 octobre 2026), le taux moyen d’abandon de panier atteint 70,22 % (plage observée : 55 % à 84 %). La cause structurelle numéro un mesurée sur les sites e-commerce n’est pas la couleur du bouton : un checkout moyen impose 23,48 éléments de formulaire là où 12 à 14 suffisent, et dissimule les frais annexes jusqu’à la dernière étape.',
            },
            {
              type: 'callout',
              icon: '⚖️',
              tone: 'lime',
              title: 'Hygiène de la preuve : savoir lire un chiffre UX sans mentir',
              text: 'Dans l’Annexe A5 du Playbook, chaque statistique reçoit un niveau de preuve : « Établi » (mesure primaire datée), « Probable » (étude dépendante du contexte) ou « À vérifier » (argument commercial). Ainsi, les 70,22 % d’abandon et les 23,48 champs sont « Établis », tandis que la promesse générique de « +35,26 % de conversion » souvent citée sans contexte est classée « À vérifier » : aucune mise en page ne garantit mécaniquement un tel gain sur votre offre.',
            },
            {
              type: 'p',
              text: 'Comment détecter vos frictions réelles sans laboratoire ? La formule classique de Nielsen et Landauer (1993), P(n) = 1 − (1 − L)ⁿ avec une probabilité moyenne de découverte L ≈ 31 %, indique que 5 testeurs révèlent en moyenne ~85 % des problèmes fréquents. Mais attention au piège statistique démontré par Laura Faulkner (2003) : sur 100 tirages aléatoires de 5 personnes, la découverte réelle oscille entre 55 % et 99 % ! Cinq personnes constituent donc une excellente règle d’arrêt itérative (3 rondes de 5 personnes après correction battent largement 1 session unique de 15), jamais un sondage quantitatif (mesurer un taux de réussite à ±10 points exige ~93 participants). Et ne remplacez pas ces 5 humains par un LLM : en 2026, les « utilisateurs synthétiques » IA divergent encore des humains réels sur 53 % des tâches (Kuric et al., 2026).',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ux-testing.webp',
              alt: 'Protocole de test utilisateur en 40 minutes avec 5 personnes et grille d’interprétation des signaux',
              caption:
                'Protocole de test en 40 minutes : ce que vous observez en silence et la correction exacte associée.',
              sourceRef: 'UX/UI Playbook FR · Partie 04, Section 32 (p. 64)',
            },
            {
              type: 'copyable',
              label: 'Grille prête à l’emploi — Audit UX d’interface en 20 minutes (noté sur 50)',
              langTag: 'markdown',
              code: `# Grille d'Audit UX Express (20 min · chaque ligne sur /5)
01. Clarté        : Comprend-on l'objectif de l'écran en moins de 5 secondes ?       [ /5]
02. Hiérarchie    : L'œil voit-il dans l'ordre : titre -> preuve -> action unique ?  [ /5]
03. Action        : Un seul bouton primaire plein par écran, formulé avec un verbe ? [ /5]
04. Cohérence     : Espacements, rayons et composants identiques d'une vue à l'autre?[ /5]
05. Les 5 états   : Vide, chargement (skeleton), erreur et succès sont-ils conçus ?  [ /5]
06. Feedback      : Toute action produit-elle une réponse visible en < 400 ms ?      [ /5]
07. Accessibilité : Contraste >= 4.5:1, labels liés, navigation Tab complète ?       [ /5]
08. Micro-copie   : Zéro jargon interne, libellés orientés résultat utilisateur ?    [ /5]
09. Confiance     : Prix total TTC, frais, délais et garantie lisibles avant saisie ?[ /5]
10. Mobile        : Cibles >= 44x44 px atteignables au pouce à une main (375 px) ?   [ /5]
---
RESTITUTION CLIENT : Ne livrez jamais 40 remarques diluées. Présentez les 3 problèmes les plus coûteux (Constat -> Impact business -> Capture annotée + Correctif).`,
              note: 'Ce livrable d’entrée se facture couramment entre 150 € et 400 € avant une refonte complète (Section 33, p. 66).',
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la différence concrète entre UX Design et UI Design ?',
          a: 'L’UX Design décide de la logique, de l’ordre des étapes, du budget d’attention et de la gestion des cas d’erreur (se mesure en tâches réussies et en temps). L’UI Design traduit cette structure en typographie, contrastes, grille 8 pt et composants réutilisables (se mesure en lisibilité et cohérence). Une belle UI sur un parcours confus ne fait qu’accélérer le constat d’échec.',
        },
        {
          q: 'Pourquoi la règle des 4 ± 1 blocs (Cowan) remplace-t-elle le 7 ± 2 de Miller en UX ?',
          a: 'L’article de Miller (1956) portait sur la mémorisation séquentielle court terme sans traitement complexe. Face à un écran où l’utilisateur doit lire, comparer des prix ou filtrer des options, Cowan (2001) a établi que la mémoire de travail sature au-delà de 3 à 5 groupements distincts.',
        },
        {
          q: 'Cinq utilisateurs suffisent-ils vraiment pour tester une application ?',
          a: 'Cinq personnes suffisent pour repérer vite les blocages majeurs d’un parcours (environ 85 % en moyenne, mais avec une variance de 55 % à 99 % selon Faulkner, 2003), à condition de corriger les défauts puis de refaire un second tour de 5 personnes. En revanche, 5 personnes ne permettent jamais de prouver statistiquement un taux de conversion.',
        },
        {
          q: 'Peut-on remplacer les tests utilisateurs par une IA en 2026 ?',
          a: 'Non pour le comportement humain : les études de 2026 (Kuric et al. ; Pew Research Center) montrent que les personas synthétiques divergent des vrais utilisateurs sur 53 % des tâches. En revanche, un script et un agent IA excellent pour vérifier mécaniquement les contrastes, les tailles minimales, les labels et la présence des 5 états.',
        },
      ],
      ctaTitle: 'Passez des principes UX aux 36 écrans cotés et aux 12 fiches d’audit.',
      ctaText:
        'Ce dossier couvre 5 sections sur les 97 du UX/UI Playbook 2026. L’édition française complète réunit les 148 pages A4, les 24 comparaisons Avant/Après, le kit imprimable de 12 fiches (dont l’Audit 40 points) et le scanner Python des 77 règles.',
      ctaBullets: [
        'PDF A4 de 148 pages en français + Kit Bonus de 26 pages',
        'Grille complète d’audit 40 points & gabarit de brief 12 questions',
        'Scanner Python agent_check.py + Skill IA inclus (29 $ paiement unique)',
      ],
    },

    /* ============================================================================
     * ARTICLE 2 (FR) — UI DESIGN
     * ========================================================================== */
    {
      slug: 'ui-design-system-tokens',
      category: 'UI Design',
      icon: '🎨',
      readTime: '12 min de lecture',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-ui-fr.jpg',
      metaTitle:
        'UI Design & Design Tokens 2026 : typographie, contraste WCAG 2.2, grille 8 pt & Dark Mode | UX/UI Playbook',
      metaDescription:
        'Construisez une interface irréprochable avec des règles mathématiques : échelle typographique, système de couleurs 60/30/10, grille d’espacement 8 pt, jetons CSS/JSON et vrai Dark Mode sans halo.',
      keywords: [
        'UI Design',
        'design tokens CSS',
        'échelle typographique web',
        'grille 8 points UI',
        'contraste WCAG 2.2 AA',
        'dark mode design system',
        'cibles tactiles 44px',
      ],
      title:
        'UI Design & Design Tokens : échelle typographique, contraste WCAG 2.2, grille 8 pt et vrai Dark Mode',
      subtitle:
        'Une interface propre ne repose jamais sur « l’œil artistique » : elle découle de six tailles de texte, d’une grille multiple de 8, de contrastes mesurés et d’un jeu de jetons sémantiques.',
      aeoSummaryTitle: 'En bref — Comment réussir son UI Design sans être graphiste ?',
      aeoSummary:
        'La qualité visuelle d’une interface repose à 80 % sur la typographie et l’espacement régulier. Fixez une échelle de 6 à 7 tailles (plancher strict à 12 px), séparez vos espacements en trois niveaux multiples de 4 et 8 px (interne 4–12 px, structurel 16–32 px, macro 48–64 px), appliquez la répartition chromatique 60 / 30 / 10 avec un contraste minimal de 4,5:1 (WCAG 2.2 AA), et implémentez le mode sombre comme un second jeu de design tokens plutôt qu’une inversion de couleurs.',
      keyStats: [
        {
          value: '95,9 %',
          label: 'des pages d’accueil en échec WCAG 2.2 A/AA',
          source: 'WebAIM Million, février 2026 (56,1 erreurs/page)',
        },
        {
          value: '≥ 4,5:1',
          label: 'ratio minimal de contraste du texte courant',
          source: 'Critère W3C WCAG 2.2 AA (1.4.3)',
        },
        {
          value: '44 × 44',
          label: 'taille minimale d’une cible au pouce (px / pt)',
          source: 'Apple HIG (44 pt) · Web · Android (48 dp)',
        },
      ],
      sections: [
        {
          id: 'echelle-typographique',
          num: '01',
          heading: 'Typographie : deux familles, six tailles décidées une fois, zéro hasard',
          blocks: [
            {
              type: 'p',
              text: 'Lorsqu’un développeur trouve son écran « amateur » sans savoir pourquoi, la coupable est presque toujours une collection arbitraire de tailles de police (11 px, 13 px, 14 px, 15 px, 17 px, 19 px, 22 px) combinée à des longueurs de ligne de 120 caractères. La typographie porte à elle seule 80 % de la perception de maîtrise d’un produit.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ui-typography.webp',
              alt: 'Échelle typographique du UX/UI Playbook : rôles Display, H2, H3, Corps, Petit et Micro avec interlignes',
              caption:
                'Construire une échelle par ratio géométrique (1,25 ou 1,333) puis arrondir aux entiers pairs : 16 · 20 · 24 · 32 · 40 · 48 · 64 px.',
              sourceRef: 'UX/UI Playbook FR · Partie 03, Section 21 (p. 45)',
            },
            {
              type: 'list',
              items: [
                {
                  bold: 'Un seul H1 par écran (40–64 px, interligne serré 1,05–1,1, approche −3 %) :',
                  text: 'Plus une police est grande, plus son interligne et son interlettrage doivent être resserrés.',
                },
                {
                  bold: 'Corps de lecture entre 15 et 17 px (interligne 1,5 à 1,65, largeur 60–75 caractères) :',
                  text: 'Au-delà de 75 caractères par ligne, l’œil perd le début de la ligne suivante.',
                },
                {
                  bold: 'Règle bloquante C01 — Rien d’utile sous 12 px :',
                  text: 'Les tailles 11–12 px sont réservées aux étiquettes techniques courtes en chasse fixe ; jamais à une condition tarifaire ou un message d’aide.',
                },
                {
                  bold: 'Chiffres tabulaires obligatoires (font-variant-numeric: tabular-nums) :',
                  text: 'Dans un tableau de bord, un comparateur de prix ou un compteur, chaque chiffre doit occuper exactement la même largeur pour s’aligner verticalement.',
                },
              ],
            },
          ],
        },
        {
          id: 'systeme-couleur-contraste',
          num: '02',
          heading: 'Couleur et contraste WCAG 2.2 : pourquoi 95,9 % du web échoue encore en 2026',
          blocks: [
            {
              type: 'p',
              text: 'Les générateurs de « palettes harmonieuses » à cinq pastilles pastel ne servent à rien pour concevoir un logiciel. Une application a besoin d’un système fonctionnel : une rampe de neutres (fonds, surfaces, bordures, encres), une couleur unique d’action primaire (l’accent), et trois couleurs sémantiques réservées aux états (succès, avertissement, danger) — chacune dotée d’une variante douce pour les arrière-plans de bannières.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ui-color.webp',
              alt: 'Système de couleur sémantique du Playbook, règle 60/30/10 et test des niveaux de gris',
              caption:
                'La règle 60 / 30 / 10 et la distinction absolue entre la couleur d’action (bouton) et la couleur de validation (statut).',
              sourceRef: 'UX/UI Playbook FR · Partie 03, Section 22 (p. 47)',
            },
            {
              type: 'p',
              text: 'En février 2026, l’étude WebAIM Million a mesuré que 95,9 % du million de pages d’accueil les plus visitées échouent encore aux critères automatisables WCAG 2.2 A/AA, avec une moyenne de 56,1 erreurs par page — le manque de contraste du texte gris clair arrivant systématiquement en tête. Trois seuils suffisent pourtant à rendre votre interface inattaquable : ≥ 4,5:1 pour tout texte courant (< 24 px), ≥ 3:1 pour les grands titres (≥ 24 px ou 19 px gras), et ≥ 3:1 pour les bordures de champs de saisie, icônes porteuses de sens et anneaux de focus clavier.',
            },
            {
              type: 'callout',
              icon: '👁️',
              tone: 'neutral',
              title: 'Le test infaillible des niveaux de gris (Règle B04)',
              text: 'Passez votre écran en noir et blanc pendant 10 secondes. Si vous ne distinguez plus un champ en erreur d’un champ valide, ou l’onglet actif des onglets passifs, votre interface repose sur la couleur seule. Ajoutez systématiquement une icône, un préfixe textuel ou une bordure d’épaisseur distincte.',
            },
          ],
        },
        {
          id: 'espacement-base-8-et-tokens',
          num: '03',
          heading: 'La grille de 8 points et le fichier tokens.css qui suffit à 90 % des projets',
          blocks: [
            {
              type: 'p',
              text: 'L’espacement est la différence immédiate entre un assemblage bricolé et un produit calme. Plutôt que d’inventer des marges de 7 px, 13 px ou 21 px, verrouillez trois échelles distinctes construites sur les multiples de 4 et 8 : l’échelle interne (4 · 8 · 12 px à l’intérieur d’un bouton ou d’un badge), l’échelle structurelle (16 · 24 · 32 px dans et entre les cartes) et l’échelle macro (48 · 64 · 96 px entre grandes sections).',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ui-spacing.webp',
              alt: 'Système d’espacement base 8 du Playbook : échelles interne, structurelle et macro',
              caption:
                'Asymétrie de proximité : un intertitre doit toujours être plus proche du paragraphe qu’il introduit (8 px) que du bloc précédent (32 px).',
              sourceRef: 'UX/UI Playbook FR · Partie 03, Section 23 (p. 49)',
            },
            {
              type: 'copyable',
              label: 'tokens.css — Fondation minimale prête à copier (validée contraste WCAG AA)',
              langTag: 'css',
              code: `/* tokens.css — Extrait de la Section 25 du UX/UI Playbook 2026 */
:root {
  /* Couleurs mode clair (contrastes mesurés >= 4.5:1) */
  --color-bg:             #FFFFFF;
  --color-surface:        #F4F1EA;
  --color-text:           #101319; /* 18.6:1 sur #FFF */
  --color-text-2:         #343A46; /* 11.4:1 sur #FFF */
  --color-muted:          #5B6170; /*  6.2:1 sur #FFF */
  --color-line:           #E3DFD6;
  --color-accent:         #D63B10;
  --color-on-accent:      #FFFFFF;
  --color-success:        #0E7C6B;
  --color-danger:         #C62828;

  /* Espacement : 4 px interne, 8 px structurel */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px;

  /* Rayons & Échelle typographique */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px;  --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;   --text-4xl: 64px;
}`,
              note: 'Aligné sur l’esprit de la spécification W3C Design Tokens Community Group (version 2025.10).',
            },
          ],
        },
        {
          id: 'dark-mode-et-plateformes',
          num: '04',
          heading: 'Vrai Dark Mode (OLED vs #121212) et règles physiques des 6 plateformes',
          blocks: [
            {
              type: 'p',
              text: 'Appliquer un filtre d’inversion à une maquette claire produit immédiatement un mode sombre qui vibre et fatigue la rétine. En mode sombre, trois lois physiques changent : 1) les ombres portées deviennent invisibles, donc l’élévation d’une carte ou d’une modale se traduit par une surface légèrement plus claire que le fond ; 2) du texte blanc pur (#FFFFFF) sur noir pur crée un phénomène optique de bavure lumineuse (halation), particulièrement pénible pour les ~30 à 40 % d’adultes astigmates — préférez un blanc adouci (#F5F5F7 ou blanc à 87 %) ; 3) l’accent saturé du mode clair doit être légèrement éclairci et désaturé pour ne pas vibrer.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/ui-sbs-dark.webp',
              alt: 'Comparaison Avant / Après du mode sombre : inversion naïve contre jetons sombres dédiés',
              caption:
                'Prototype comparé n°61 : même composant, inversion mécanique à gauche contre second jeu de jetons mesurés à droite.',
              sourceRef: 'UX/UI Playbook FR · Partie 07, Section 61 (p. 110)',
            },
            {
              type: 'p',
              text: 'Sur écran OLED, éteindre totalement les pixels de fond (#000000) offre une profondeur infinie et une économie d’énergie réelle, à condition d’étager vos surfaces élevées (#09090B → #111115 → #17171D), d’utiliser des bordures lumineuses subtiles (1 px) pour délimiter les cartes, et de calmer le blanc du texte courant. Enfin, n’oubliez jamais que la cible cliquable n’est pas le glyphe de l’icône (souvent 16 ou 20 px), mais la boîte invisible qui reçoit le doigt.',
            },
            {
              type: 'table',
              caption: 'Seuils physiques et conventions natives sur les 6 plateformes (Partie 08)',
              headers: ['Plateforme', 'Cible minimale', 'Piège fréquent à éviter en UI'],
              rows: [
                ['iOS / iPadOS', '44 × 44 pt', 'Confondre la taille du symbole SF (17 pt) avec la boîte tactile (44 pt)'],
                ['Android (Material 3)', '48 × 48 dp', 'Coller une barre d’action sous les WindowInsets du geste retour prédictif'],
                ['Web Mobile & Desktop', '44 × 44 px (WCAG 2.5.5 AAA / 24 px AA)', 'Oublier env(safe-area-inset-bottom) sur les téléphones à barre d’accueil'],
                ['macOS / Windows / Linux', '24–32 px pointeur + raccourcis', 'Ignorer les menus natifs macOS ou forcer une couleur qui casse le thème système'],
              ],
            },
            {
              type: 'copyable',
              label: 'CSS — Cible tactile de 44 px sur un bouton-icône de 18 px + zone sûre mobile',
              langTag: 'css',
              code: `/* Le glyphe mesure 18 px, mais le pouce dispose toujours d'au moins 44x44 px */
.icon-action {
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border-radius: var(--radius-md);
}

/* Barre d'action collante en bas d'écran mobile respectant l'encoche / home indicator */
.sticky-mobile-cta {
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
}`,
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'Quelle est la taille minimale de police recommandée en UI Design en 2026 ?',
          a: 'Pour le corps de texte courant sur le web et mobile, visez 15 à 17 px. Fixez un plancher absolu à 12 px uniquement pour les badges ou en-têtes techniques courts : tout texte utile sous 12 px dégrade immédiatement la lisibilité et échoue aux contrôles qualité du Playbook (règle C01).',
        },
        {
          q: 'Faut-il utiliser du noir pur #000000 ou du gris foncé #121212 en Dark Mode ?',
          a: 'Les deux sont valides s’ils sont traités comme des systèmes complets : #121212 (recommandation Material) limite la traînée OLED au défilement rapide, tandis que le noir pur #000000 (OLED) crée un contraste éditorial saisissant à condition d’adoucir le blanc du texte (#F5F5F7 au lieu de #FFFFFF) et de délimiter les cartes par des surfaces étagées (#09090B, #111115) et des filets de 1 px.',
        },
        {
          q: 'Comment fonctionne la règle d’espacement en base 8 (8-point grid) ?',
          a: 'Toutes vos marges, paddings et hauteurs de blocs utilisent des multiples de 8 px (8, 16, 24, 32, 48, 64 px), avec un demi-pas autorisé à 4 px et 12 px uniquement à l’intérieur des petits composants (boutons, tags). Cela élimine les décalages visuels et s’adapte parfaitement aux écrans Retina (@1.5x, @2x, @3x).',
        },
        {
          q: 'Quelles obligations légales d’accessibilité UI s’appliquent en 2026 ?',
          a: 'Avec l’entrée en application de l’Acte Européen sur l’Accessibilité (Directive 2019/882 / norme EN 301 549 alignée sur WCAG 2.1/2.2 AA), les services numériques commerciaux (hors micro-entreprises de moins de 10 salariés et ≤ 2 M€ de CA) doivent respecter les seuils de contraste, la navigation clavier et le balisage sémantique.',
        },
      ],
      ctaTitle: 'Téléchargez les Design Tokens complets (CSS + JSON) et les 77 règles UI.',
      ctaText:
        'Gagnez des dizaines d’heures sur votre prochain projet : le UX/UI Playbook 2026 inclut les fichiers tokens.css et tokens.json prêts à importer, les 24 prototypes comparés Avant/Après et le scanner Python qui vérifie vos contrastes et tailles automatiquement.',
      ctaBullets: [
        'Fichiers tokens.css & tokens.json (mode clair + mode sombre) inclus',
        'Comparatif détaillé des 6 plateformes (Web, iOS, Android, macOS, Windows, Linux)',
        '148 pages A4 + 12 fiches imprimables + Skill IA pour 29 $',
      ],
    },

    /* ============================================================================
     * ARTICLE 3 (FR) — PRODUCT DESIGN & AGENTS IA
     * ========================================================================== */
    {
      slug: 'product-design-ai-agents',
      category: 'Product Design',
      icon: '⚡',
      readTime: '13 min de lecture',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-product-fr.jpg',
      metaTitle:
        'Product Design & Agents IA 2026 : pipeline brief → code vérifiable, AGENTS.md & prix | UX/UI Playbook',
      metaDescription:
        'Le code n’est plus le goulot d’étranglement, c’est la décision. Découvrez le pipeline en 5 fichiers (brief.md, screens.md, AGENTS.md), les prompts prêts à copier et les modèles de tarification Product Design.',
      keywords: [
        'Product Design',
        'design avec IA',
        'AGENTS.md UI',
        'vérifier interface générée par IA',
        'pipeline product design',
        'tarifs freelance UX UI',
        'Claude Code Cursor UI',
      ],
      title:
        'Product Design à l’ère des agents IA : du brief au code vérifiable sans « UI Slop »',
      subtitle:
        'On peut désormais générer une application fonctionnelle en une soirée. Ce qui reste rare — et ce que les clients paient — ce n’est plus la syntaxe du code : c’est la justesse de la décision produit.',
      aeoSummaryTitle: 'En bref — Comment réussir son Product Design avec un agent IA en 2026 ?',
      aeoSummary:
        'Un agent de code (Claude Code, Cursor, Codex) reproduit la médiane statistique du web — or 84 % des interfaces générées sans garde-fous comportent des défauts d’accessibilité (Aljedaani et al., 2024). Pour livrer un vrai produit, séparez les décisions en 5 fichiers versionnés : brief.md (objectif chiffré), screens.md (un verbe et 5 états par écran), AGENTS.md (tokens et interdits), wireframe.html en niveaux de gris avant la couleur, puis un contrôle automatisé à 3 statuts stricts (Automatisé, À vérifier, Non applicable).',
      keyStats: [
        {
          value: '84 %',
          label: 'des sites générés par IA comportent des violations a11y',
          source: 'Aljedaani et al., W4A 2024 (niveau : Probable)',
        },
        {
          value: '5 fichiers',
          label: 'pour rendre un agent de code déterministe',
          source: 'Pipeline UX/UI Playbook · Section 43',
        },
        {
          value: '1 sur 3',
          label: 'taux de refus signalant un tarif freelance bien calibré',
          source: 'Modèle économique · Section 36',
        },
      ],
      sections: [
        {
          id: 'code-plus-goulot',
          num: '01',
          heading: 'UX, UI, Produit : qui décide quoi quand le code ne coûte presque plus rien ?',
          blocks: [
            {
              type: 'p',
              text: 'Le « vibe coding » fait vivre la même désillusion à des milliers de fondateurs et de développeurs : en quatre heures, l’agent assemble une base de données, une authentification et dix routes. Puis un premier vrai prospect ouvre l’écran : trois boutons rivalisent en haut de page, les chiffres semblent inventés, le formulaire perd tout au moindre rechargement, et l’application ressemble trait pour trait à mille autres démos générées la même semaine.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/prod-roles.webp',
              alt: 'Tableau comparatif UX, UI et Produit : quelle question chaque discipline tranche et dans quel ordre',
              caption:
                'Cumuler les trois casquettes en solo est une force — les mélanger au même instant est la source numéro un de réécriture.',
              sourceRef: 'UX/UI Playbook FR · Partie 01, Section 02 (p. 11)',
            },
            {
              type: 'p',
              text: 'La règle d’or de séquence tient en six mots à inscrire dans chaque proposition client comme dans votre propre discipline : « structure validée avant style, par écrit ». Tant que le problème produit (quel objectif chiffré, pour qui, à quel prix) et le flux UX en noir et blanc ne sont pas tranchés, discuter de teintes violettes ou d’animations est une fuite en avant.',
            },
          ],
        },
        {
          id: 'pipeline-cinq-fichiers',
          num: '02',
          heading: 'Le pipeline déterministe : 5 fichiers pour dompter Claude Code, Cursor ou Codex',
          blocks: [
            {
              type: 'p',
              text: 'Une conversation de chat se dilue au bout de quinze messages ; un fichier dans votre dépôt se relit à chaque exécution. Pour empêcher un agent d’improviser des fonctionnalités, d’inventer de faux témoignages ou d’écrire des couleurs en dur, enchaînez cinq artefacts courts avec validation humaine entre chaque étape (prompts phase-gated).',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/prod-pipeline.webp',
              alt: 'Schéma du pipeline en 5 étapes : brief.md, screens.md, wireframe.html, review et handoff.md',
              caption:
                'Le papier pour diverger (5 croquis rapides), le HTML en niveaux de gris (.wire) pour converger, les tokens pour systématiser.',
              sourceRef: 'UX/UI Playbook FR · Partie 06, Section 43 (p. 81)',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/prod-agent-breaks.webp',
              alt: 'Tableau des 6 pannes récurrentes quand on délègue une interface à un agent IA et leurs correctifs',
              caption:
                'Les 6 dérives classiques d’un agent IA (UI slop, faux contenu, états oubliés, dérive CSS) et la règle de processus qui les coupe à la racine.',
              sourceRef: 'UX/UI Playbook FR · Partie 06, Section 46 (p. 85)',
            },
            {
              type: 'copyable',
              label: 'AGENTS.md (ou CLAUDE.md) — Le fichier de contexte minimal (~35 lignes) à déposer à la racine',
              langTag: 'markdown',
              code: `# AGENTS.md — Règles d'interface non négociables

## Sources de vérité (ne jamais réinventer)
- @tokens.css : seules couleurs, tailles typo, rayons et espacements autorisés.
- @screens.md : contenu réel, verbe unique par écran et cas limites.
- Toute valeur absente de tokens.css doit être signalée en question ouverte, jamais codée en dur.

## Interdits (échec immédiat de la tâche)
- Aucun "Lorem ipsum", aucun témoignage, statistique ou tarif inventé.
- Aucun bouton sans verbe d'action explicite ; un seul bouton primaire plein par écran.
- Aucun écran livré sans ses 5 états : vide, chargement (skeleton), rempli, erreur, succès.
- Rien d'utile sous 12 px ; chiffres alignés en tabular-nums.

## Accessibilité & Plateforme (bloquant)
- Chaque champ possède un <label> visible et relié ; chaque bouton-icône a un aria-label précis.
- Contraste mesuré >= 4.5:1 sur texte courant, >= 3:1 sur bordures utiles et grands titres.
- Cibles interactives >= 44x44 px ; navigation clavier Tab complète avec :focus-visible net.
- Respecter @media (prefers-reduced-motion: reduce).

## Format de rapport attendu en fin de réponse
1. Fichiers modifiés.
2. Trois colonnes strictes : Vérifié par script / À vérifier à l'écran / Questions ouvertes.`,
              note: 'Adapté de la Section 55 (p. 103) du UX/UI Playbook 2026.',
            },
          ],
        },
        {
          id: 'prompts-et-controle-ia',
          num: '03',
          heading: 'Prompts prêts à copier et protocole de vérification à 3 statuts',
          blocks: [
            {
              type: 'p',
              text: 'Pourquoi un LLM génère-t-il spontanément des placeholders en guise de labels ou des gris illisibles à 2,4:1 ? Par pure mécanique statistique : il apprend la distribution du code existant sur le web, qui échoue à 95,9 % aux tests WCAG (WebAIM, fév. 2026). Un bon prompt ne lui demande jamais « d’être créatif et moderne » : il fixe un rôle, des fichiers d’entrée, des interdits et des critères d’acceptation binaires.',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/prod-verify-ai.webp',
              alt: 'Les 8 contrôles de sortie pour vérifier un écran généré par une IA',
              caption:
                'Ce que l’audit automatisé attrape immédiatement contre ce que seul un jugement produit humain peut trancher.',
              sourceRef: 'UX/UI Playbook FR · Partie 07, Section 53 (p. 99)',
            },
            {
              type: 'copyable',
              label: 'Prompts Phase-Gated — Du brief à la spécification puis à l’audit WCAG 2.2 AA',
              langTag: 'text',
              code: `/ PROMPT 1 — Transformer brief.md en spécification d'écrans (screens.md)
RÔLE        : Vous êtes Product Designer senior rédigeant des spécifications d'interface.
ENTRÉES     : @brief.md
CONTRAINTES : 1 écran = 1 verbe principal ; spécifier les 5 états (vide, chargement, rempli,
              erreur, succès) ; contenu réel uniquement ; zéro fonctionnalité hors brief.
LIVRABLE    : screens.md (verbe, entrée, sortie, 5 états avec déclencheurs, cas limites).
INTERDIT    : Proposer des couleurs, polices ou effets visuels à cette étape.

/ PROMPT 2 — Auditer un écran existant sans complaisance
RÔLE        : Vous êtes auditeur accessibilité WCAG 2.2 AA et qualité UI.
ENTRÉES     : @ecran.tsx (ou .html), @tokens.css
CONTRAINTES : Ne signalez que ce qui est prouvable dans le code source ; citez la ligne
              exacte et le critère violé (ex. WCAG 1.4.3, C01 < 12px, cible < 44px).
LIVRABLE    : Tableau à 3 statuts stricts (BLOQUANT / À VÉRIFIER À L'ÉCRAN / CONFORME)
              + correctif de code minimal pour chaque bloquant.`,
              note: 'Tiré de la Section 44 (p. 83) et de la Section 84 (p. 129) du Playbook.',
            },
          ],
        },
        {
          id: 'design-comme-revenu',
          num: '04',
          heading: 'Le design comme revenu : chiffrer, cadrer et défendre la valeur produit',
          blocks: [
            {
              type: 'p',
              text: 'Que vous vendiez des missions en freelance ou que vous arbitriez la feuille de route de votre propre SaaS, le Product Design n’a de sens que relié à une équation économique. En prestation client, baisser son tarif journalier pour emporter un contrat installe une ancre basse dont vous ne sortirez plus. La règle professionnelle est inverse : si le budget du client est inférieur, gardez votre tarif unitaire intact et réduisez le périmètre (moins d’écrans secondaires, pas d’animations sur mesure, v1 focalisée sur le flux critique).',
            },
            {
              type: 'figure',
              src: '/images/articles/fr/prod-pricing.webp',
              alt: 'Les modèles de tarification du design, la formule du prix plancher et les paliers indicatifs',
              caption:
                'Forfait, régie, abonnement (retainer) ou value-based : choisir le modèle selon le risque de dérive du périmètre.',
              sourceRef: 'UX/UI Playbook FR · Partie 05, Section 36 (p. 71)',
            },
            {
              type: 'callout',
              icon: '💼',
              tone: 'accent',
              title: 'La formule du juste prix (Section 36)',
              text: 'Prix d’un projet = (Jours estimés × Taux journalier) + Provision de risque (20 %) + Licences/Outils. Pour calculer votre plancher absolu au démarrage : divisez vos charges mensuelles cibles par 12 jours réellement facturables (les autres jours passent en prospection, gestion et imprévus), ajoutez 30 % de marge, puis relevez vos tarifs à chaque nouveau contrat jusqu’à ce qu’environ 1 proposition sur 3 soit refusée.',
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'Qu’est-ce qu’un fichier AGENTS.md pour le Product Design ?',
          a: 'C’est un fichier Markdown versionné à la racine du projet lu automatiquement par les agents de programmation (Claude Code, Cursor, Codex). En y inscrivant vos design tokens, l’obligation des 5 états d’écran et vos seuils WCAG bloquants, vous empêchez l’IA de réinventer des styles incohérents à chaque prompt.',
        },
        {
          q: 'Pourquoi imposer une étape wireframe HTML en niveaux de gris avant le design final ?',
          a: 'Dès qu’une maquette comporte des couleurs et des ombres, les parties prenantes débattent de leurs goûts esthétiques (« je n’aime pas ce bleu ») au lieu de valider la hiérarchie de l’information et les libellés. Un wireframe HTML gris utilisant déjà vos espacements valide le fond avant la forme.',
        },
        {
          q: 'Pourquoi un rapport d’audit IA doit-il avoir exactement 3 statuts ?',
          a: 'Par honnêteté technique : un script statique peut prouver qu’une police fait 10 px ou qu’un attribut alt manque (« Automatisé / Bloquant »), mais il ne peut pas prouver qu’un parcours est compréhensible ou qu’une zone tactile est confortable au pouce (« À vérifier à l’écran »). Prétendre que « tout est 100 % valide » par simple lecture du code est un mensonge.',
        },
        {
          q: 'Comment éviter le scope creep (dérive du périmètre) sur un forfait design + dev ?',
          a: 'Listez explicitement les écrans dans screens.md, incluez un nombre borné d’allers-retours (ex. 2 cycles de révision groupés par écrit), faites valider la structure en noir et blanc avant le style, et prévoyez par écrit que tout nouvel écran fait l’objet d’un avenant chiffré.',
        },
      ],
      ctaTitle: 'Équipez votre repo du Skill IA complet, du scanner Python et des 4 gabarits.',
      ctaText:
        'Ne repartez pas d’une page blanche : téléchargez l’édition française du UX/UI Playbook 2026 (148 pages) avec l’archive complète des 21 fichiers — agent_check.py, rules_77.json, SKILL.md, AGENTS.md, proposition commerciale 1 page et fiches de handoff.',
      ctaBullets: [
        'Skill IA prêt à brancher dans Claude Code, Cursor, Windsurf & Codex',
        'Scanner Python des 77 règles utilisable en local et en CI (--fail-on blocking)',
        '4 gabarits commerciaux & techniques + licence projets clients incluse (29 $)',
      ],
    },
  ],

  en: [
    /* ============================================================================
     * ARTICLE 1 (EN) — UX DESIGN
     * ========================================================================== */
    {
      slug: 'ux-design-guide',
      category: 'UX Design',
      icon: '🧭',
      readTime: '11 min read',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-ux-en.jpg',
      metaTitle:
        'UX Design Guide 2026: 10 Cognitive Laws, the 5 Screen States & 20-Min Audit | UX/UI Playbook',
      metaDescription:
        'Why UX is not decoration: working-memory limits (4±1 chunks, Cowan 2001), the 5 mandatory states of every screen, checkout psychology (70.22% cart abandonment), and the true math of 5-user testing.',
      keywords: [
        'UX Design guide',
        'cognitive load UX',
        'laws of UX',
        '5 states of every screen',
        '20 minute UX audit',
        '5 user usability testing',
        'checkout UX optimization',
      ],
      title: 'UX Design in 2026: Cognitive Laws, the 5 Screen States & Measurable Proof',
      subtitle:
        'UX is not a coat of paint applied after the code compiles: it is the set of measurable structural decisions that let a human reach a clear verb without stopping to think.',
      aeoSummaryTitle: 'Key Takeaway — What defines effective UX Design in 2026?',
      aeoSummary:
        'Effective UX Design is measured in completed tasks, time-to-action, and prevented errors — never in vague adjectives like "modern", "clean", or "intuitive". It rests on four operational rules: stay within the human working-memory ceiling of 4 ± 1 chunks (Cowan, 2001), enforce a single primary action per screen, design all 5 states of every view (empty, loading, filled, error, success), and test hypotheses on 5 real people before polishing visual style.',
      keyStats: [
        {
          value: '4 ± 1',
          label: 'chunks held in working memory',
          source: 'Cowan, 2001 (Evidence: Established)',
        },
        {
          value: '70.22%',
          label: 'average online cart abandonment rate',
          source: 'Baymard Institute, Oct 2026 (50 studies)',
        },
        {
          value: '400 ms',
          label: 'latency ceiling before attention drops',
          source: 'Doherty Threshold / Nielsen 1993',
        },
      ],
      sections: [
        {
          id: 'ux-pas-decoration',
          num: '01',
          heading: 'Why UX is never decoration (and the ruthless 5-second test)',
          blocks: [
            {
              type: 'p',
              text: 'Three words show up in almost every client brief: "modern", "clean", and "intuitive". None of the three is a measurable target. An interface is never intuitive in the abstract — it is intuitive for a specific person, in a specific frame of mind (rushed on a train, anxious after a declined card, sceptical on a pricing page), trying to complete an action you can state in one verb.',
            },
            {
              type: 'callout',
              icon: '⏱️',
              tone: 'accent',
              title: 'The zero-cost 5-second test',
              text: 'Show your screen to someone unfamiliar with the project for exactly 5 seconds, then hide it. Ask two questions: 1) "What does this product do?" 2) "What is the main thing you can do here?" If they hesitate, changing the font or adding subtle glassmorphism will fix nothing — the hierarchy itself is broken.',
            },
            {
              type: 'p',
              text: 'Two screens can look visually identical and deliver opposite UX outcomes. A large, high-contrast red button on the bottom right works well for an urgent checkout confirmation; that exact same treatment on "Permanently delete workspace" becomes a catastrophic trap. Before opening Figma or prompting a coding agent, answer four structural questions in plain text.',
            },
            {
              type: 'copyable',
              label: 'Copy-ready pre-flight — The 4 questions before drawing a single box',
              langTag: 'markdown',
              code: `# UX Screen Pre-Flight (complete before any mockup or prompt)
1. WHO opens this screen, and in what state of mind? (rushed, anxious, comparing, daily habit)
2. WHAT SINGLE VERB must they succeed at here? (e.g. "Pay invoice", never "Manage stuff")
3. WHAT IS the shortest path (in fields and taps) to complete that verb?
4. WHAT HAPPENS when that path fails? (zero data, 2s network lag, declined payment)`,
              note: 'From Part 01, Section 01 of the UX/UI Playbook 2026.',
            },
          ],
        },
        {
          id: 'dix-lois-cognitives',
          num: '02',
          heading: 'The 10 cognitive laws (and why Miller’s famous “7 ± 2” misleads designers)',
          blocks: [
            {
              type: 'p',
              text: 'UX laws are not aesthetic preferences — they describe hardware constraints of human vision and memory. The most repeated myth in interface articles is Miller’s Law (1956), cited to justify 7-item navigation bars. Miller measured immediate recall of isolated digits. When users must actively process, compare, and decide on screen elements, Nelson Cowan’s landmark research (2001) establishes true working-memory capacity at 4 ± 1 chunks.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ux-laws.webp',
              alt: 'Table of the 10 UX laws from the UX/UI Playbook: Jakob, Fitts, Hick-Hyman, Cowan, Proximity, Similarity, Von Restorff, Pareto, Doherty, Aesthetic-Usability',
              caption:
                'The 10 cognitive laws behind readable interfaces — and the concrete UI rule each law dictates.',
              sourceRef: 'UX/UI Playbook EN · Part 01, Section 03 (p. 12)',
            },
            {
              type: 'p',
              text: 'Equally misunderstood is the Hick-Hyman Law (1952–1953): decision time rises with choice entropy for first-time visitors (keep one unambiguous primary CTA on landing and pricing pages!), yet drops to near zero once spatial position is memorised in muscle memory. Hiding daily tools inside deep menus in a B2B SaaS app "to make it look clean" slows down power users every hour.',
            },
            {
              type: 'table',
              caption: 'Cognitive density budget by screen territory (Cowan, 2001 & Section 04)',
              headers: ['Screen Territory', 'Visible Element Budget', 'Operational UX Rule'],
              rows: [
                ['Landing page', '1 promise, 1 primary CTA, 3 proof points', 'One core idea per viewport scroll'],
                ['Form / Checkout', '5 to 7 fields max per step', 'Split or cut anything non-essential'],
                ['SaaS Dashboard', '3 top KPIs, 1 primary chart, 1 action list', 'Every widget must map to a clear user action'],
                ['Primary Navigation', '3 to 5 top-level destinations', 'A 40-item mega-menu is an admission of indecision'],
              ],
            },
            {
              type: 'figure',
              src: '/images/articles/en/ux-cognitive.webp',
              alt: 'Cognitive load page from the UX/UI Playbook showing the counter test and screen budgets',
              caption:
                'The bank-counter test: read your screen aloud as if speaking to a customer at a counter. Every extra explanatory sentence points to a flawed label.',
              sourceRef: 'UX/UI Playbook EN · Part 01, Section 04 (p. 13)',
            },
            {
              type: 'copyable',
              label: 'Stakeholder script — Defending UX decisions without subjective taste',
              langTag: 'text',
              code: `❌ Never say: "I feel one orange button looks cleaner than three."
✅ Say instead: "Right now three solid buttons share identical visual weight. That breaks both Von Restorff isolation and Hick-Hyman choice hierarchy: three equal priorities read as zero priority. Let's keep the revenue-driving verb solid and demote secondary actions to neutral outlines."`,
            },
          ],
        },
        {
          id: 'cinq-etats-ecran',
          num: '03',
          heading: 'The 5 states of every screen: where 90% of mockups break in production',
          blocks: [
            {
              type: 'p',
              text: 'A screen that "looks finished" in Figma or in a single AI prompt almost always shows one happy state: ideal sample records, short names, instant Wi-Fi. In production, every screen is at least five screens. Leaving the other four unspecified forces developers — or coding agents — to improvise under deadline pressure.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ux-states.webp',
              alt: 'Diagram of the 5 states of every screen: Empty, Loading, Filled, Error, Success',
              caption:
                'No screen is deliverable until all 5 states (plus all 6 button interaction states) exist at full scale.',
              sourceRef: 'UX/UI Playbook EN · Part 01, Section 07 (p. 16)',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                {
                  bold: '1. Empty state:',
                  text: 'First-run onboarding, zero search matches, or strict filters. A blank table looks broken. Ship one clear sentence, starter sample data, and one primary creation CTA.',
                },
                {
                  bold: '2. Loading state (CLS ≤ 0.1):',
                  text: 'Past 400 ms of silence, users click again. Replace blank-page spinners that trigger layout shifts with final-size skeletons, and lock the clicked button into a busy state.',
                },
                {
                  bold: '3. Filled state (nominal + edge cases):',
                  text: 'Test with 45-character surnames, three-line titles, $0.00 balances, and $1,250,000.00 totals.',
                },
                {
                  bold: '4. Error state (zero blame, zero lost work):',
                  text: 'State what failed in plain language, preserve every character the user already typed, and provide an immediate recovery button.',
                },
                {
                  bold: '5. Success / confirmation state:',
                  text: 'Never make the user wonder "Did it go through?" Show the newly added row, updated total, or receipt reference immediately.',
                },
              ],
            },
            {
              type: 'copyable',
              label: 'PR / Ticket Gate — The 5-State Definition of Done',
              langTag: 'markdown',
              code: `## Screen UX Acceptance Criteria (blocking before merge)
- [ ] ?state=empty   : clear explanation + 1 primary CTA (zero blank white containers)
- [ ] ?state=loading : layout-matching skeleton (CLS <= 0.1) + button aria-busy="true"
- [ ] ?state=filled  : verified with 80+ char strings and zero horizontal overflow at 375px
- [ ] ?state=error   : plain-language cause + user input preserved + one-click retry
- [ ] ?state=success : visible state change or receipt without requiring a page refresh`,
            },
          ],
        },
        {
          id: 'checkout-et-tests',
          num: '04',
          heading: 'Checkout UX (70.22% abandonment) & the real math of 5-user testing',
          blocks: [
            {
              type: 'p',
              text: 'Checkout is the single screen where visual flair matters least and friction costs money immediately. Across 50 aggregated studies compiled by the Baymard Institute (list of 28 October 2026), average cart abandonment sits at 70.22% (spread: 55%–84%). Measurable culprit #1: the average checkout presents 23.48 form elements when only 12–14 are genuinely needed, while hiding shipping and tax fees until the final step.',
            },
            {
              type: 'callout',
              icon: '⚖️',
              tone: 'lime',
              title: 'Evidence discipline: citing UX numbers without lying',
              text: 'Appendix A5 of the Playbook grades every statistic as "Established" (dated primary source), "Probable" (context-dependent), or "To verify" (vendor claim). While 70.22% abandonment and 23.48 form elements are Established, generic headlines promising a guaranteed "+35.26% conversion uplift" are flagged "To verify" — no layout rescues an unwanted offer.',
            },
            {
              type: 'p',
              text: 'How many people do you need to find usability blockers? Nielsen and Landauer’s coverage formula, P(n) = 1 − (1 − L)ⁿ with L ≈ 31% (1993), yields ~85% on average for 5 users. Yet Laura Faulkner (2003) proved by running 100 random 5-user samples that single-round discovery varies wildly from 55% to 99%! Treat 5 users as an iterative stopping rule (three rounds of 5 users after fixing issues beat one round of 15), never as quantitative proof (which takes ~93 users for a ±10-point confidence interval). And do not swap real humans for LLM personas: in 2026 studies, synthetic AI users diverge from real human behaviour on 53% of tasks (Kuric et al., 2026).',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ux-testing.webp',
              alt: '40-minute 5-user usability testing protocol and signal interpretation table from the UX/UI Playbook',
              caption:
                'The 40-minute usability protocol: five observable user behaviours and the exact structural fix each one calls for.',
              sourceRef: 'UX/UI Playbook EN · Part 04, Section 32 (p. 59)',
            },
            {
              type: 'copyable',
              label: 'Copy-ready scorecard — The 20-Minute Interface UX Audit (/50 points)',
              langTag: 'markdown',
              code: `# 20-Minute UX Audit Scorecard (score each row /5)
01. Clarity       : Can a stranger state the screen's purpose in 5 seconds?          [ /5]
02. Hierarchy     : Does the eye read headline -> proof -> single CTA in order?      [ /5]
03. Primary Action: Exactly one solid primary button per view, written with a verb?  [ /5]
04. Consistency   : Identical spacing, radii, and component behaviour across views?  [ /5]
05. Five States   : Are empty, loading (skeleton), error, and success states built?  [ /5]
06. Feedback      : Does every click/tap trigger visible feedback under 400 ms?      [ /5]
07. Accessibility : Contrast >= 4.5:1, linked labels, full keyboard Tab path?        [ /5]
08. Micro-copy    : Zero internal jargon; labels describe user outcomes?             [ /5]
09. Trust         : Full total, shipping, refund terms visible before first input?   [ /5]
10. Mobile        : All interactive targets >= 44x44 px reachable one-handed?        [ /5]
---
CLIENT DELIVERY RULE: Never dump 40 minor nitpicks. Deliver the top 3 revenue-blocking findings (Observation -> Business Impact -> Annotated Screenshot + Concrete Fix).`,
              note: 'A standalone 20-minute audit report routinely sells for $150–$400 as a paid discovery wedge (Section 33).',
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the practical difference between UX Design and UI Design?',
          a: 'UX Design governs task flow, information priority, working-memory budget, and failure recovery (measured in task completion and time). UI Design governs typography, contrast ratios, 8-pt spacing, and reusable tokens (measured in legibility and consistency). Great UI cannot rescue a broken flow — it only lets users notice faster that they are stuck.',
        },
        {
          q: 'Why does Cowan’s 4 ± 1 rule replace Miller’s 7 ± 2 law in modern UX?',
          a: 'Miller (1956) studied passive short-term recall of isolated digits. When users evaluate unfamiliar navigation items, pricing tiers, or dashboard widgets simultaneously, Cowan (2001) demonstrated that working memory reliably holds only 3 to 5 chunks.',
        },
        {
          q: 'Are 5 usability test participants really enough?',
          a: 'Five participants are ideal as an iterative stopping rule to expose obvious blockers quickly (~85% on average, though single samples range from 55% to 99% per Faulkner, 2003) — provided you fix what broke and run another 5-person round. Five users can never establish statistical conversion metrics (~93 users are needed for ±10 points).',
        },
        {
          q: 'Can AI synthetic users replace real usability testing in 2026?',
          a: 'Not for human behaviour: 2026 empirical benchmarks (Kuric et al., 2026; Pew Research Center, 2026) show LLM synthetic users diverge from real humans on 53% of tasks. Use Python scripts and AI agents to verify deterministic UI rules (contrast, font sizes, missing labels), and real humans to test comprehension.',
        },
      ],
      ctaTitle: 'Go from UX principles to 36 annotated screens and 12 printable working sheets.',
      ctaText:
        'This guide covers 5 of the 97 sections inside the UX/UI Playbook 2026. Download the full 139-page English edition alongside the 24 side-by-side prototypes, the 26-page A4 Bonus Kit, and the runnable 77-rule Python scanner.',
      ctaBullets: [
        '139-page A4 Playbook PDF + 26-page printable Bonus Kit (12 sheets)',
        'Full 40-point UX/UI audit sheet & 12-question client brief template',
        'Runnable agent_check.py scanner + AI Agent Skill ($29 one-time)',
      ],
    },

    /* ============================================================================
     * ARTICLE 2 (EN) — UI DESIGN
     * ========================================================================== */
    {
      slug: 'ui-design-system-tokens',
      category: 'UI Design',
      icon: '🎨',
      readTime: '12 min read',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-ui-en.jpg',
      metaTitle:
        'UI Design & Design Tokens 2026: Type Scale, WCAG 2.2 Contrast, 8-pt Grid & Dark Mode | UX/UI Playbook',
      metaDescription:
        'Build crisp software interfaces using objective numbers: 6-step type scales, 60/30/10 semantic colour tokens, 8-point spacing grids, WCAG 2.2 AA contrast, and true halation-free Dark Mode.',
      keywords: [
        'UI Design system',
        'CSS design tokens',
        'typography scale UI',
        '8 point grid spacing',
        'WCAG 2.2 contrast ratios',
        'dark mode tokens vs filter',
        '44px touch targets',
      ],
      title:
        'UI Design & Design Tokens: Type Scale, WCAG 2.2 Contrast, 8-pt Grid & True Dark Mode',
      subtitle:
        'Crisp UI has very little to do with artistic talent: it comes from six locked font sizes, an 8-point spatial rhythm, measured contrast pairs, and semantic tokens.',
      aeoSummaryTitle: 'Key Takeaway — How do you build professional UI without being a designer?',
      aeoSummary:
        'Roughly 80% of perceived UI quality comes from disciplined typography and consistent spacing. Lock a 6-to-7 step type scale with a hard 12 px floor, split spacing into three 4/8-px tiers (internal 4–12 px, structural 16–32 px, macro 48–64 px), apply the 60 / 30 / 10 semantic colour budget verified at ≥ 4.5:1 WCAG 2.2 AA contrast, and build Dark Mode as a dedicated second token set rather than inverting colours.',
      keyStats: [
        {
          value: '95.9%',
          label: 'of home pages failing WCAG 2.2 A/AA',
          source: 'WebAIM Million, Feb 2026 (56.1 errors/page)',
        },
        {
          value: '≥ 4.5:1',
          label: 'minimum contrast ratio for body text',
          source: 'W3C WCAG 2.2 AA Criterion 1.4.3',
        },
        {
          value: '44 × 44',
          label: 'minimum finger touch target (px / pt)',
          source: 'Apple HIG (44 pt) · Web · Android (48 dp)',
        },
      ],
      sections: [
        {
          id: 'echelle-typographique',
          num: '01',
          heading: 'Typography: one scale, two font families, zero guesswork',
          blocks: [
            {
              type: 'p',
              text: 'When a developer senses a screen "looks off" without knowing why, the culprit is almost always twelve accidental font sizes (11 px, 13 px, 14 px, 15 px, 17 px, 19 px, 22 px) paired with 115-character lines of text. Typography carries 80% of perceived craft.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ui-typography.webp',
              alt: 'Typography scale page from the UX/UI Playbook showing Display, H2, H3, Body, Small, and Micro roles',
              caption:
                'Multiply a 16 px base by 1.25 or 1.333, then round to clean integers: 16 · 20 · 24 · 32 · 40 · 48 · 64 px.',
              sourceRef: 'UX/UI Playbook EN · Part 03, Section 21 (p. 41)',
            },
            {
              type: 'list',
              items: [
                {
                  bold: 'One H1 per screen (40–64 px, tight 1.05–1.1 line-height, −0.03em tracking):',
                  text: 'As type gets larger, tighten both line-height and letter-spacing so headlines hold together as a block.',
                },
                {
                  bold: 'Body copy at 15–17 px (1.5–1.65 line-height, 60–75 characters per line):',
                  text: 'Wider than 75 characters, the human eye loses track of the next line start.',
                },
                {
                  bold: 'Blocking Rule C01 — Nothing useful under 12 px:',
                  text: 'Reserve 11–12 px strictly for short uppercase monospace tags — never for pricing terms, form hints, or body text.',
                },
                {
                  bold: 'Tabular numerals everywhere numbers align (font-variant-numeric: tabular-nums):',
                  text: 'Prices, metrics, and table columns must never jitter horizontally when digits change.',
                },
              ],
            },
          ],
        },
        {
          id: 'systeme-couleur-contraste',
          num: '02',
          heading: 'Semantic colour & WCAG 2.2 contrast: why 95.9% of home pages still fail',
          blocks: [
            {
              type: 'p',
              text: 'Five-swatch pastel palette generators are useless for product UI. Real interfaces require a semantic system: a neutral ramp (page background, card surface, hairline border, primary/secondary/muted ink), one unmistakable action accent, and dedicated status hues (success, warning, danger) each paired with a soft tint for alert backgrounds.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ui-color.webp',
              alt: 'Semantic colour system page from the UX/UI Playbook showing the 60/30/10 rule and grayscale test',
              caption:
                'The 60 / 30 / 10 budget — and why your action accent must never double as your success status colour.',
              sourceRef: 'UX/UI Playbook EN · Part 03, Section 22 (p. 43)',
            },
            {
              type: 'p',
              text: 'In February 2026, the WebAIM Million report found that 95.9% of the top one million home pages failed automated WCAG 2.2 A/AA checks, averaging 56.1 errors per page — led overwhelmingly by low-contrast grey text. Three objective thresholds protect every screen you ship: ≥ 4.5:1 for normal text (< 24 px), ≥ 3:1 for large headings (≥ 24 px or 19 px bold), and ≥ 3:1 for input borders, meaningful icons, and focus rings.',
            },
            {
              type: 'callout',
              icon: '👁️',
              tone: 'neutral',
              title: 'The 10-second grayscale test (Rule B04)',
              text: 'View your interface in pure grayscale. If an invalid input looks identical to a valid one, or if the active tab disappears, you encoded meaning through colour alone. Add an icon, explicit label, or distinct stroke weight.',
            },
          ],
        },
        {
          id: 'espacement-base-8-et-tokens',
          num: '03',
          heading: 'The 8-point spacing base & the minimal tokens.css that powers 90% of apps',
          blocks: [
            {
              type: 'p',
              text: 'Spacing is the least taught and most visible UI skill. Eliminate arbitrary numbers like 7 px, 13 px, and 21 px by locking three non-overlapping tiers built on multiples of 4 and 8: internal spacing (4 · 8 · 12 px inside buttons and pills), structural spacing (16 · 24 · 32 px inside and between cards), and macro spacing (48 · 64 · 96 px separating page sections).',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ui-spacing.webp',
              alt: '8-point spacing page from the UX/UI Playbook showing internal, structural, and macro tiers',
              caption:
                'Proximity asymmetry: a heading must sit closer to the paragraph below it (8 px) than to the preceding block above it (32 px).',
              sourceRef: 'UX/UI Playbook EN · Part 03, Section 23 (p. 45)',
            },
            {
              type: 'copyable',
              label: 'tokens.css — Production starter tokens (WCAG AA contrast-verified)',
              langTag: 'css',
              code: `/* tokens.css — From Section 25 of the UX/UI Playbook 2026 */
:root {
  /* Light mode semantic colours (verified >= 4.5:1 contrast) */
  --color-bg:             #FFFFFF;
  --color-surface:        #F4F1EA;
  --color-text:           #101319; /* 18.6:1 on #FFF */
  --color-text-2:         #343A46; /* 11.4:1 on #FFF */
  --color-muted:          #5B6170; /*  6.2:1 on #FFF */
  --color-line:           #E3DFD6;
  --color-accent:         #D63B10;
  --color-on-accent:      #FFFFFF;
  --color-success:        #0E7C6B;
  --color-danger:         #C62828;

  /* Spacing: 4px internal, 8px structural */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px;

  /* Radii & 7-step Type Scale */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px;  --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;   --text-4xl: 64px;
}`,
              note: 'Aligned with the W3C Design Tokens Community Group specification (v2025.10).',
            },
          ],
        },
        {
          id: 'dark-mode-et-plateformes',
          num: '04',
          heading: 'True Dark Mode (OLED #000 vs #121212) & native rules across 6 platforms',
          blocks: [
            {
              type: 'p',
              text: 'Inverting a light screen produces harsh, vibrating dark interfaces. Three optical rules govern real dark mode: 1) drop shadows vanish against dark backgrounds, so elevation is communicated by making closer surfaces progressively lighter; 2) pure #FFFFFF text on pure black triggers optical halation (blurring letter edges, especially for astigmatic readers) — soften primary ink to #F5F5F7 or 87% white; 3) desaturate and slightly lighten your brand accent so it does not buzz against dark cards.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/ui-sbs-dark.webp',
              alt: 'Side-by-side comparison of naive colour inversion versus dedicated dark mode design tokens',
              caption:
                'Prototype #61: naive inversion on the left (halation & muddy contrast) versus calibrated dark tokens on the right.',
              sourceRef: 'UX/UI Playbook EN · Part 07, Section 61 (p. 101)',
            },
            {
              type: 'p',
              text: 'On OLED panels, true #000000 black turns background pixels completely off for infinite depth, provided you step up elevated card surfaces (#09090B → #111115 → #17171D), separate containers with crisp 1 px hairlines, and avoid pure #FFFFFF body copy. Finally, remember across platforms that the visual icon glyph is never the touch target.',
            },
            {
              type: 'table',
              caption: 'Physical targets & native conventions across 6 platforms (Part 08)',
              headers: ['Platform', 'Minimum Target', 'Classic UI Trap to Avoid'],
              rows: [
                ['iOS / iPadOS', '44 × 44 pt', 'Sizing the tap box to a 17 pt SF Symbol glyph instead of 44 pt'],
                ['Android (Material 3)', '48 × 48 dp', 'Placing bottom buttons inside system gesture WindowInsets'],
                ['Mobile & Desktop Web', '44 × 44 px (WCAG 2.5.5 / 24 px AA)', 'Forgetting env(safe-area-inset-bottom) on notched phones'],
                ['macOS / Windows / Linux', '24–32 px pointer + shortcuts', 'Skipping macOS menu bar commands or hardcoding colours over OS themes'],
              ],
            },
            {
              type: 'copyable',
              label: 'CSS — Guaranteeing a 44×44 px hit area around an 18 px icon + safe-area padding',
              langTag: 'css',
              code: `/* The SVG icon stays 18px, while the finger gets a full 44x44px target */
.icon-action {
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border-radius: var(--radius-md);
}

/* Sticky bottom mobile bar respecting iOS/Android gesture safe areas */
.sticky-mobile-cta {
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px));
}`,
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'What is the minimum readable font size in modern UI Design?',
          a: 'Set body copy between 15 px and 17 px, and enforce a strict 12 px floor (Playbook Rule C01) reserved only for compact technical tags or table headers. Any meaningful copy below 12 px fails legibility checks immediately.',
        },
        {
          q: 'Should Dark Mode use pure OLED black (#000000) or dark grey (#121212)?',
          a: 'Both work when engineered as semantic token sets: #121212 (Material guidance) reduces OLED black-smearing on fast scroll, while pure #000000 OLED black delivers razor-sharp contrast when paired with stepped obsidian card surfaces (#09090B, #111115), 1 px hairlines, and softened off-white ink (#F5F5F7 instead of #FFFFFF).',
        },
        {
          q: 'Why use an 8-point grid for UI spacing?',
          a: 'Using multiples of 8 px (8, 16, 24, 32, 48, 64 px — with 4 px and 12 px reserved for tight internal component padding) eliminates visual guesswork, keeps card alignment crisp, and scales cleanly across fractional device pixel ratios (1.5x, 2x, 3x).',
        },
        {
          q: 'Which accessibility rules are legally mandatory in 2026?',
          a: 'Under the European Accessibility Act (Directive 2019/882 / EN 301 549 aligned with WCAG 2.1/2.2 AA), commercial digital products serving EU consumers (excluding micro-enterprises under 10 staff and ≤ €2M turnover) must meet objective contrast, keyboard navigation, and programmatic label requirements.',
        },
      ],
      ctaTitle: 'Get the complete CSS + JSON Design Tokens and all 77 measurable UI rules.',
      ctaText:
        'Skip weeks of trial and error: the UX/UI Playbook 2026 ships with production-ready tokens.css and tokens.json files, 24 side-by-side Before/After comparisons, and the runnable Python scanner.',
      ctaBullets: [
        'Production tokens.css & tokens.json (Dark + Light) ready to import',
        'Screen-by-screen native rules for Web, iOS, Android, macOS, Windows & Linux',
        '139 A4 pages + 12 printable sheets + AI Agent Skill ($29 one-time)',
      ],
    },

    /* ============================================================================
     * ARTICLE 3 (EN) — PRODUCT DESIGN & AI AGENTS
     * ========================================================================== */
    {
      slug: 'product-design-ai-agents',
      category: 'Product Design',
      icon: '⚡',
      readTime: '13 min read',
      publishedAt: '2026-11-18',
      updatedAt: '2026-11-18',
      ogImage: '/og-article-product-en.jpg',
      metaTitle:
        'Product Design with AI Agents 2026: Brief-to-Code Pipeline, AGENTS.md & Pricing | UX/UI Playbook',
      metaDescription:
        'Code is no longer the bottleneck — decisions are. Learn the 5-file deterministic UI pipeline (brief.md, screens.md, AGENTS.md), copy-ready prompts, and product design pricing models.',
      keywords: [
        'Product Design workflow',
        'AI agent UI design',
        'AGENTS.md template',
        'avoid AI UI slop',
        'verify AI generated UI',
        'product design pricing',
        'Claude Code Cursor UI rules',
      ],
      title:
        'Product Design in the Age of AI Agents: From Brief to Verifiable Code Without UI Slop',
      subtitle:
        'Anyone can prompt a working app into existence in an evening. What remains scarce — and what customers actually pay for — is no longer code syntax: it is the product decision.',
      aeoSummaryTitle: 'Key Takeaway — How do you ship high-craft Product Design with AI coding agents?',
      aeoSummary:
        'Left unconstrained, AI coding agents reproduce the statistical median of public repositories — where 84% of AI-generated sites contain accessibility violations (Aljedaani et al., 2024). To ship professional product UI, lock decisions across 5 versioned files: brief.md (measurable goal), screens.md (one verb and 5 states per screen), AGENTS.md (tokens and hard prohibitions), grayscale wireframe.html before brand styling, and an automated 3-status audit report (Automated, To Verify, Not Applicable).',
      keyStats: [
        {
          value: '84%',
          label: 'of AI-generated sites ship with accessibility violations',
          source: 'Aljedaani et al., W4A 2024 (Evidence: Probable)',
        },
        {
          value: '5 files',
          label: 'to make an AI coding agent deterministic',
          source: 'UX/UI Playbook Pipeline · Section 43',
        },
        {
          value: '1 in 3',
          label: 'proposal rejection rate signalling healthy pricing',
          source: 'Pricing Economics · Section 36',
        },
      ],
      sections: [
        {
          id: 'code-plus-goulot',
          num: '01',
          heading: 'UX, UI, Product: who decides what when writing code is no longer the bottleneck?',
          blocks: [
            {
              type: 'p',
              text: 'Thousands of builders discover "vibe coding" in a single night: you describe an app, the agent writes 4,000 lines, and the server boots. Then a real buyer opens the first screen: three buttons compete for attention, empty states are blank, numbers are hallucinated, and the layout looks identical to every other AI demo launched that week. "It runs" does not mean "it reads clearly, converts, and holds up in review."',
            },
            {
              type: 'figure',
              src: '/images/articles/en/prod-roles.webp',
              alt: 'Comparison table of UX, UI, and Product disciplines showing what each decides and when',
              caption:
                'Wearing all three hats solo is normal — confusing them at the same moment is what triggers endless rewrites.',
              sourceRef: 'UX/UI Playbook EN · Part 01, Section 02 (p. 11)',
            },
            {
              type: 'p',
              text: 'One six-word clause saves weeks of wasted rework, both in client contracts and solo builds: "structure approved in writing before style." Until the product bet (who pays, for what outcome) and the black-and-white screen flow are settled, debating gradients or animations only builds emotional attachment to the wrong screen.',
            },
          ],
        },
        {
          id: 'pipeline-cinq-fichiers',
          num: '02',
          heading: 'The 5-file deterministic pipeline for Claude Code, Cursor & Codex',
          blocks: [
            {
              type: 'p',
              text: 'Chat threads drift and get truncated; files in your repository get re-read on every run. To stop coding agents from inventing features, fabricating fake testimonials, or hardcoding random hex colours, chain five lightweight files with phase-gated prompts between each step.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/prod-pipeline.webp',
              alt: '5-step deterministic pipeline diagram: brief.md, screens.md, wireframe.html, review, handoff.md',
              caption:
                'Paper to diverge (5 quick sketches), grayscale HTML (.wire) to converge on hierarchy, tokens to systematise.',
              sourceRef: 'UX/UI Playbook EN · Part 06, Section 43 (p. 74)',
            },
            {
              type: 'figure',
              src: '/images/articles/en/prod-agent-breaks.webp',
              alt: 'Table of the 6 recurring failures when delegating UI to an AI agent and their process fixes',
              caption:
                'The 6 predictable failure modes of AI-generated UI (generic slop, invented copy, missing states, token drift) and how file constraints eliminate them.',
              sourceRef: 'UX/UI Playbook EN · Part 06, Section 46 (p. 77)',
            },
            {
              type: 'copyable',
              label: 'AGENTS.md (or CLAUDE.md) — The ~35-line root context file ready to paste',
              langTag: 'markdown',
              code: `# AGENTS.md — Non-negotiable Interface Rules

## Sources of truth (never reinvent)
- @tokens.css: sole permitted colours, type sizes, radii, and spacing multiples.
- @screens.md: real copy, one primary verb per screen, and edge cases.
- Any value missing from tokens.css must be flagged as an open question, never hardcoded.

## Prohibited (automatic task failure)
- Zero "Lorem ipsum", zero invented testimonials, metrics, or pricing tiers.
- Zero button labels without an explicit verb; max one solid primary button per screen.
- Zero screens shipped without all 5 states: empty, loading (skeleton), filled, error, success.
- Nothing meaningful below 12px; align dynamic numbers with tabular-nums.

## Accessibility & Platform Gates (blocking)
- Every input has a visible linked <label>; every icon button has a specific accessible name.
- Measured contrast >= 4.5:1 on body text; >= 3:1 on meaningful borders and large headings.
- Interactive hit targets >= 44x44px; full Tab path with visible :focus-visible outline.
- Respect @media (prefers-reduced-motion: reduce).

## Required output footer
1. Files changed.
2. Strict 3-column summary: Verified by script / To verify on screen / Open questions.`,
              note: 'Adapted from Section 55 (p. 95) of the UX/UI Playbook 2026.',
            },
          ],
        },
        {
          id: 'prompts-et-controle-ia',
          num: '03',
          heading: 'Copy-ready phase-gated prompts & the honest 3-status verification protocol',
          blocks: [
            {
              type: 'p',
              text: 'Why do LLMs routinely drop input labels or output 2.4:1 low-contrast text? Because models learn the median of public code — and 95.9% of public home pages fail WCAG 2.2 AA (WebAIM, Feb 2026). Useful prompts never ask an agent to "make it sleek and modern"; they specify role, exact input files, hard prohibitions, and binary acceptance criteria.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/prod-verify-ai.webp',
              alt: 'The 8 exit checks for verifying an AI-generated screen from the UX/UI Playbook',
              caption:
                'What automated exit checks catch immediately versus what still requires human product judgement.',
              sourceRef: 'UX/UI Playbook EN · Part 07, Section 53 (p. 91)',
            },
            {
              type: 'copyable',
              label: 'Phase-Gated Prompts — Spec generation & merciless WCAG 2.2 AA code audit',
              langTag: 'text',
              code: `/ PROMPT 1 — Turn brief.md into screen specifications (screens.md)
ROLE        : You are a senior product designer writing deterministic screen specs.
INPUTS      : @brief.md
CONSTRAINTS : 1 screen = 1 primary verb; specify all 5 states (empty, loading, filled,
              error, success); real copy only; invent zero features outside brief.md.
DELIVERABLE : screens.md (verb, input, output, 5 states with triggers, edge cases).
FORBIDDEN   : Proposing colours, font pairings, or visual art direction at this stage.

/ PROMPT 2 — Audit an existing screen without flattery
ROLE        : You are a WCAG 2.2 AA accessibility and UI systems auditor.
INPUTS      : @screen.tsx (or .html), @tokens.css
CONSTRAINTS : Report only what is provable in the file; cite the exact line number
              and violated rule (e.g. WCAG 1.4.3, Rule C01 < 12px, target < 44px).
DELIVERABLE : Strict 3-status table (BLOCKING / TO VERIFY ON SCREEN / VERIFIED)
              + minimal code patch for each blocking defect.`,
              note: 'From Section 44 (p. 75) and Section 84 (p. 120) of the Playbook.',
            },
          ],
        },
        {
          id: 'design-comme-revenu',
          num: '04',
          heading: 'Design as revenue: pricing models, scope control & defending product value',
          blocks: [
            {
              type: 'p',
              text: 'Whether you bill clients or allocate engineering sprints on your own SaaS, Product Design is an economic decision. When a prospective client’s budget is tight, cutting your day rate sets a low anchor you will struggle to escape. Keep your rate intact and trim scope instead: ship fewer secondary screens, defer custom motion, and focus v1 on the revenue-critical flow.',
            },
            {
              type: 'figure',
              src: '/images/articles/en/prod-pricing.webp',
              alt: 'Pricing models page from the UX/UI Playbook showing fixed-fee, time-and-materials, retainer, and value-based pricing',
              caption:
                'Fixed-fee, day-rate, retainer, or value-based: matching your billing model to scope certainty.',
              sourceRef: 'UX/UI Playbook EN · Part 05, Section 36 (p. 66)',
            },
            {
              type: 'callout',
              icon: '💼',
              tone: 'accent',
              title: 'The floor-price formula (Section 36)',
              text: 'Project Price = (Estimated days × Day rate) + Risk buffer (20%) + Tooling. To compute your starting floor: divide your monthly living target by 12 realistic billable days (the rest goes to sales, admin, and context switching), add a 30% margin, then raise your rate with every new client until roughly 1 in 3 proposals is declined on price.',
            },
          ],
        },
      ],
      faqs: [
        {
          q: 'What belongs inside an AGENTS.md file for UI and Product Design?',
          a: 'Keep it around 40 high-signal lines: pointers to your source-of-truth files (@tokens.css, @screens.md), automatic-failure prohibitions (no Lorem ipsum, no missing states, no text < 12 px), blocking WCAG 2.2 AA thresholds, and a mandatory 3-column verification summary.',
        },
        {
          q: 'Why build a grayscale HTML wireframe before applying brand colours?',
          a: 'Colour triggers subjective taste debates ("make it pop") before anyone checks whether the headline, call-to-action, and empty states make sense. A grayscale wireframe using your real spacing tokens forces stakeholders to approve hierarchy and copy first.',
        },
        {
          q: 'Why does the Playbook’s AI agent report refuse a fourth status?',
          a: 'Static source analysis can prove a font is 10 px or a label is missing ("Automated / Blocking"), but it cannot prove a touch target feels comfortable or a flow matches real intent ("To verify on screen"). Claiming "100% compliant" from source code alone is dishonest.',
        },
        {
          q: 'How do you prevent scope creep on fixed-price product design engagements?',
          a: 'Enumerate every screen and its 5 states inside screens.md, cap feedback to two consolidated written rounds, require written sign-off on grayscale structure before visual styling, and price any net-new screen as a separate add-on.',
        },
      ],
      ctaTitle: 'Equip your repo with the full AI Agent Skill, Python scanner & 4 client templates.',
      ctaText:
        'Stop debugging generic AI screens by hand: get the 139-page UX/UI Playbook 2026 in English plus the 21-file working archive — agent_check.py, rules_77.json, SKILL.md, AGENTS.md, one-page proposal, and handoff specs.',
      ctaBullets: [
        'Drop-in AI Skill for Claude Code, Cursor, Windsurf & OpenAI Codex',
        'Runnable 77-rule Python scanner for local dev & CI (--fail-on blocking)',
        '4 client & handoff templates + commercial license included ($29)',
      ],
    },
  ],
};

export const ARTICLE_SLUGS = [
  'ux-design-guide',
  'ui-design-system-tokens',
  'product-design-ai-agents',
] as const;

export function getArticleBySlug(locale: Locale, slug: string): ArticleData | undefined {
  return ARTICLES[locale].find((a) => a.slug === slug);
}
