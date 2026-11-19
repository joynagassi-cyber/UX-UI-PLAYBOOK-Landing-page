import { SITE_URL } from '@/lib/site-config';

export type Locale = 'fr' | 'en';

export interface PreviewPageItem {
  id: string;
  src: string;
  category: 'screens' | 'before-after' | 'system';
  badge: string;
  title: string;
  caption: string;
  alt: string;
}

export interface TocPart {
  num: string;
  title: string;
  page: string;
  sections: string[];
}

export interface BonusSheet {
  num: string;
  title: string;
  meta: string;
  page: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PlaybookContent {
  locale: Locale;
  otherLocale: Locale;
  gumroadUrl: string;
  otherGumroadUrl: string;
  siteUrl: string;
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogLocale: string;
    productName: string;
  };
  skipToContent: string;
  topBar: {
    badge: string;
    audienceHint: string;
    cta: string;
  };
  nav: {
    pillars: string;
    demo: string;
    inside: string;
    contents: string;
    guides: string;
    faq: string;
    buy: string;
    themeDarkLabel: string;
    themeLightLabel: string;
    switchLangTitle: string;
  };
  hero: {
    kicker: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
    proofs: string[];
    coverCaption: string;
    spreadCaption: string;
  };
  strip: Array<{
    num: string;
    label: string;
  }>;
  pillars: {
    kicker: string;
    heading: string;
    lede: string;
    cards: Array<{
      tag: string;
      title: string;
      subtitle: string;
      points: string[];
    }>;
  };
  agentDemo: {
    kicker: string;
    heading: string;
    lede: string;
    bullets: Array<{ bold: string; rest: string }>;
    tabBad: string;
    tabClean: string;
    fixAction: string;
    fixedBadge: string;
    copyCmd: string;
    copiedCmd: string;
    screenHeaderBad: string;
    screenHeaderClean: string;
    screenMock: {
      brand: string;
      stepLabel: string;
      steps: [string, string, string];
      emailLabel: string;
      emailVal: string;
      addressLabel: string;
      addressVal: string;
      cityLabel: string;
      zipLabel: string;
      cardLabel: string;
      expLabel: string;
      applePay: string;
      cardPill: string;
      payPrimary: string;
      saveSecondary: string;
      hiddenFeeBad: string;
      clearFeeClean: string;
      summaryClean: string;
      flaws: Array<{ code: string; text: string }>;
      improvements: Array<{ code: string; text: string }>;
    };
    terminal: {
      cmdBad: string;
      cmdClean: string;
      linesBad: Array<{ type: 'r' | 'w' | 'g' | 'c'; text: string }>;
      linesClean: Array<{ type: 'r' | 'w' | 'g' | 'c'; text: string }>;
      statusBlocking: string;
      statusAutomated: string;
      statusToVerify: string;
      statusNotApplicable: string;
    };
  };
  statesSection: {
    kicker: string;
    heading: string;
    lede: string;
    cards: Array<{
      tag: string;
      title: string;
      desc: string;
      hot?: boolean;
    }>;
  };
  insideSection: {
    kicker: string;
    heading: string;
    lede: string;
    openReaderBtn: string;
    filterAll: string;
    filterScreens: string;
    filterBeforeAfter: string;
    filterSystem: string;
    clickHint: string;
    note: string;
    readerClose: string;
    readerPrev: string;
    readerNext: string;
    readerBuy: string;
    pages: PreviewPageItem[];
  };
  contentsSection: {
    kicker: string;
    heading: string;
    lede: string;
    tabBook: string;
    tabKit: string;
    tabArchive: string;
    expandAll: string;
    collapseAll: string;
    parts: TocPart[];
    kitIntro: string;
    kitSheets: BonusSheet[];
    archiveIntro: string;
    archiveGroups: Array<{
      folder: string;
      desc: string;
      files: Array<{ name: string; info: string }>;
    }>;
  };
  comparison: {
    kicker: string;
    heading: string;
    lede: string;
    colFeature: string;
    colOthers: string;
    colPlaybook: string;
    rows: Array<{
      feature: string;
      others: string;
      playbook: string;
      highlight?: boolean;
    }>;
  };
  honesty: {
    kicker: string;
    heading: string;
    yesTitle: string;
    yesItems: string[];
    noTitle: string;
    noItems: string[];
  };
  author: {
    kicker: string;
    heading: string;
    role: string;
    p1: string;
    p2: string;
    signature: string;
  };
  faq: {
    kicker: string;
    heading: string;
    items: FaqItem[];
  };
  offer: {
    kicker: string;
    heading: string;
    lede: string;
    includedTitle: string;
    includedList: string[];
    priceDisplay: string;
    priceSub: string;
    buyBtn: string;
    licenseNote: string;
    guarantees: string[];
    crosslinkTag: string;
    crosslinkText: string;
    crosslinkBtn: string;
  };
  footer: {
    copyright: string;
    gumroadLinkLabel: string;
    otherEditionLabel: string;
  };
}

export const CONTENT: Record<Locale, PlaybookContent> = {
  fr: {
    locale: 'fr',
    otherLocale: 'en',
    gumroadUrl: 'https://joyccelight.gumroad.com/l/uiuxplaybookfr',
    otherGumroadUrl: 'https://joyccelight.gumroad.com/l/uxuiplaybook',
    siteUrl: SITE_URL,
    meta: {
      title: "UX/UI Playbook — Manuel, kit et Skill IA · FR",
      description:
        "Le UX/UI Playbook réunit 148 pages, 12 fiches A4 et 21 fichiers : tokens CSS/JSON, scanner Python et règles pour vos agents IA. Édition FR à 29 $.",
      ogTitle: 'UX/UI Playbook — Édition française 2026 + Kit bonus',
      ogDescription:
        "Manuel UX, UI et Product Design de 148 pages, kit de 12 fiches A4 et archive de 21 fichiers : tokens, gabarits et scanner Python. Édition FR à 29 USD.",
      ogImage: `${SITE_URL}/og-fr.jpg`,
      ogLocale: 'fr_FR',
      productName: 'UX/UI Playbook 2026 + Kit bonus (Édition française)',
    },
    skipToContent: 'Aller au contenu principal',
    topBar: {
      badge: "ÉDITION FRANÇAISE 2026 · PDF, KIT A4 ET FICHIERS",
      audienceHint: "Manuel, fiches et instructions en français",
      cta: 'Obtenir le Playbook — 29 $',
    },
    nav: {
      pillars: "Livre et fichiers",
      demo: "Démo du contrôle",
      inside: 'Pages réelles',
      contents: 'Sommaire',
      guides: 'Article',
      faq: 'FAQ',
      buy: 'Acheter — 29 $',
      themeDarkLabel: 'Passer en mode clair',
      themeLightLabel: 'Passer en mode noir OLED',
      switchLangTitle: 'Switch to the English edition (139 pages)',
    },
    hero: {
      kicker: "UX, UI ET PRODUCT DESIGN POUR LES DÉVELOPPEURS",
      titleBefore: "Concevoir et vérifier ",
      titleAccent: "vos interfaces",
      titleAfter: '.',
      lede:
        "Le UX/UI Playbook de Joy N. accompagne la conception d’une interface, depuis la définition du parcours jusqu’aux états d’erreur et à la passation. Le manuel explique les choix de typographie, de couleur et d’espacement avec des écrans annotés. Les fiches A4 servent à préparer un brief ou une revue ; les tokens et le scanner Python permettent ensuite de reprendre certaines décisions dans le code. Les points qui demandent une observation du rendu ou un essai avec des utilisateurs restent à vérifier.",
      primaryCta: 'Obtenir l’édition française · 29 $',
      secondaryCta: 'Feuilleter 10 pages réelles',
      note: "29 USD, paiement unique. Téléchargement après achat : PDF français de 148 pages, kit A4 de 26 pages et archive de 21 fichiers.",
      proofs: [
        '148 pages A4 en français',
        "77 règles : contrôles auto + humains",
        '12 fiches + 21 fichiers & Skill IA',
        'Remboursé sous 7 jours',
      ],
      coverCaption: 'Édition FR · 148 pages',
      spreadCaption: "Exemples annotés et consignes de revue",
    },
    strip: [
      { num: '148', label: "pages dans le manuel français" },
      { num: '36', label: "écrans annotés + 13 prototypes avant/après + 11 planches de plateformes" },
      { num: '77', label: "règles sur 6 plateformes, avec leurs méthodes de contrôle" },
      { num: '21', label: 'fichiers livrés : tokens, script Python & skill IA' },
    ],
    pillars: {
      kicker: "LE CONTENU DU TÉLÉCHARGEMENT",
      heading: "Le manuel, les fiches A4 et les fichiers de travail.",
      lede:
        "Le livre présente les décisions de conception et leurs exemples d’écran. Le kit séparé regroupe les fiches à remplir pour cadrer, examiner et transmettre un projet. L’archive contient les valeurs de design, les gabarits et les instructions destinées aux agents de code. Vous pouvez commencer par une page du manuel correspondant à votre écran, puis utiliser la fiche associée pour consigner les choix et les vérifications restantes.",
      cards: [
        {
          tag: '01 · APPRENDRE',
          title: "Le manuel visuel · 148 pages",
          subtitle: "97 sections · 36 écrans annotés · 13 avant/après + 11 planches de plateformes",
          points: [
            "Des principes accompagnés de maquettes annotées, d’erreurs à examiner et d’espace pour les notes.",
            "Dix types d’écrans : landing page, tableau de bord, paiement, application mobile, tarifs et back-office notamment.",
            "Typographie, couleurs, grille 4/8, accessibilité et conventions des six plateformes couvertes.",
          ],
        },
        {
          tag: "02 · PRÉPARER LA LIVRAISON",
          title: "Les fiches et les design tokens",
          subtitle: 'Kit A4 de 26 pages (12 fiches) + gabarits + CSS/JSON',
          points: [
            '12 fiches imprimables A4 suivies chacune d’une page de notes réglée pour vos réunions.',
            "Quatre gabarits éditables : brief de 12 questions, proposition en une page, passation développeur et audit de 40 points.",
            "Variables CSS et tokens JSON pour préparer les valeurs des thèmes clair et sombre, à adapter à votre projet.",
          ],
        },
        {
          tag: "03 · EXÉCUTER DES CONTRÔLES",
          title: "Le scanner Python et les instructions IA",
          subtitle: 'agent_check.py · 77 règles · Claude Code, Cursor, Codex, CI',
          points: [
            'Un scanner Python qui lit votre HTML/CSS, tranche ce qui est mesurable dans le code et renvoie un code de sortie.',
            "Trois statuts : Automatisé, À vérifier, Non applicable. Sévérité (Bloquant, Majeur) et résultat restent séparés.",
            "AGENTS.md et SKILL.md pour documenter les règles que votre agent doit consulter et les contrôles qu’il doit exécuter.",
          ],
        },
      ],
    },
    agentDemo: {
      kicker: "DÉMONSTRATION INTERACTIVE · RAPPORT ILLUSTRATIF",
      heading: "Comparer un fichier en échec et un exemple corrigé.",
      lede:
        "Ce comparatif simule un rapport de contrôle : aucun script Python ne s’exécute dans cette page. Copiez la commande pour lancer agent_check.py sur les fichiers témoins de l’archive, puis distinguez le résultat automatique de la revue humaine. Le schéma reste lisible ici : les défauts chiffrés décrivent les fichiers témoins, pas les tailles et contrastes de cette page.",
      bullets: [
        {
          bold: 'Intégrable en CI/CD :',
          rest: "l’option --fail-on blocking renvoie un code de sortie non nul lorsqu’un contrôle automatisé de sévérité bloquante échoue. Le pipeline doit utiliser ce code pour arrêter la livraison.",
        },
        {
          bold: "Méthode, sévérité et résultat :",
          rest: "Automatisé / À vérifier / Non applicable décrivent la méthode de contrôle. Une règle automatisée peut échouer ; « Bloquant » décrit sa sévérité, pas un quatrième statut.",
        },
        {
          bold: 'Deux fichiers témoins inclus :',
          rest: 'test/bad.html échoue immédiatement ; test/clean.html passe sans erreur bloquante.',
        },
      ],
      tabBad: "1. Fichier témoin bad.html",
      tabClean: '2. Écran corrigé (clean.html)',
      fixAction: "Afficher l’exemple corrigé",
      fixedBadge: "Exemple corrigé · revue humaine toujours requise",
      copyCmd: 'Copier la commande',
      copiedCmd: 'Commande copiée !',
      screenHeaderBad: 'AVANT · 6 champs · 2 boutons égaux · 4 erreurs bloquantes',
      screenHeaderClean: "APRÈS · champs utiles · 1 action primaire · exemple corrigé",
      screenMock: {
        brand: 'ATELIER NORD · PAIEMENT',
        stepLabel: 'Étapes du paiement',
        steps: ['Panier', 'Livraison', 'Paiement'],
        emailLabel: 'E-mail',
        emailVal: 'maya@atelier-nord.fr',
        addressLabel: 'Adresse de livraison',
        addressVal: '12 rue des Palmiers, Cotonou',
        cityLabel: 'Ville',
        zipLabel: 'Code postal',
        cardLabel: 'Numéro de carte',
        expLabel: 'Expiration',
        applePay: 'Apple Pay',
        cardPill: 'Carte / Mobile Money',
        payPrimary: 'Payer 132,90 €',
        saveSecondary: 'Enregistrer',
        hiddenFeeBad: '* Des frais de livraison et de dossier seront calculés à l’étape suivante.',
        clearFeeClean: 'Total TTC : 132,90 € (livraison 4,90 € incluse · retour gratuit 30 j)',
        summaryClean: '1× Sac cuir noir (98 €) + Ceinture (30 €) + Livraison (4,90 €)',
        flaws: [
          { code: 'C01 BLOQUANT', text: "Fichier témoin : textes en 9 et 10 px, sous le seuil Playbook de 12 px" },
          { code: 'B01 BLOQUANT', text: "Fichier témoin : contraste insuffisant ; comparer au seuil texte de 4,5:1" },
          { code: 'A06 BLOQUANT', text: 'Deux boutons pleins de même poids (« Payer » vs « Enregistrer »)' },
          { code: "K03 MAJEUR", text: 'Montant final et frais découverts après la saisie des 6 champs' },
        ],
        improvements: [
          { code: "C01 · AUTOMATISÉ", text: "Taille minimale déclarée de l’exemple : 13 px" },
          { code: "B01 · AUTOMATISÉ", text: "Paire texte/fond de l’exemple contrôlée ; surfaces réelles à mesurer" },
          { code: "A06 · À VÉRIFIER", text: "Action primaire distincte ; confirmer la compréhension avec un humain" },
          { code: "K03 · À VÉRIFIER", text: "Total et frais visibles ; vérifier le parcours complet avant engagement" },
        ],
      },
      terminal: {
        cmdBad:
          'python3 agent_check.py --target test/bad.html \\\n    --platform web --lang fr --fail-on blocking',
        cmdClean:
          'python3 agent_check.py --target test/clean.html \\\n    --platform web --lang fr --fail-on blocking',
        linesBad: [
          { type: 'r', text: "C01 AUTOMATISÉ · BLOQUANT · échec : texte sous 12 px" },
          { type: 'r', text: "B01 AUTOMATISÉ · BLOQUANT · échec : contraste sous 4.5:1" },
          { type: 'r', text: "A01 AUTOMATISÉ · BLOQUANT · échec : H1 absent" },
          { type: 'r', text: "F01 AUTOMATISÉ · BLOQUANT · échec : label non relié" },
          { type: 'w', text: "D01 À VÉRIFIER · cible web : 24 px AA, 44 px recommandés" },
          { type: 'w', text: "H01 À VÉRIFIER · parcours clavier et focus réel" },
          { type: 'g', text: "Exemple : 9 automatisés · 6 à vérifier · 62 non applicables" },
          { type: 'c', text: "Sévérité séparée : 4 échecs bloquants → sortie 1" },
        ],
        linesClean: [
          { type: 'g', text: "A01 AUTOMATISÉ · réussi : titre H1 unique dans le fichier" },
          { type: 'g', text: "B01 AUTOMATISÉ · réussi : paire de couleurs de l’exemple" },
          { type: 'g', text: "C01 AUTOMATISÉ · réussi : tailles déclarées ≥ 12 px" },
          { type: 'g', text: "F01 AUTOMATISÉ · réussi : label relié au champ" },
          { type: 'w', text: "D01 À VÉRIFIER · mesurer la cible dans le rendu" },
          { type: 'w', text: "H01 À VÉRIFIER · tester clavier et lecteur d’écran" },
          { type: 'g', text: "Exemple : 9 automatisés · 6 à vérifier · 62 non applicables" },
          { type: 'c', text: "0 échec bloquant automatique → sortie 0 ≠ conformité" },
        ],
        statusBlocking: 'Bloquants',
        statusAutomated: "Automatisés",
        statusToVerify: 'À vérifier',
        statusNotApplicable: "Non applicables",
      },
    },
    statesSection: {
      kicker: "ÉTATS D’ÉCRAN À PRÉPARER",
      heading: "Que voit la personne quand les données manquent ou échouent ?",
      lede:
        "La maquette avec des données complètes ne couvre qu’une partie du parcours. Il faut aussi décrire l’arrivée sans contenu, l’attente d’une requête et la reprise après un échec. Pour chaque situation, nommez le déclencheur, les informations conservées et les actions disponibles. Les exemples ci-dessous montrent trois états à préciser dans la spécification, puis à essayer dans le navigateur avec le clavier et sur téléphone.",
      cards: [
        {
          tag: 'ÉTAT VIDE · EMPTY STATE',
          title: 'Rien à afficher au premier lancement',
          desc: "Expliquez pourquoi la liste est vide et ce qu’elle pourra contenir. Proposez la création ou l’import lorsqu’ils sont disponibles ; distinguez cet état d’une recherche sans résultat.",
        },
        {
          tag: "CHARGEMENT · ESPACE RÉSERVÉ",
          title: "La requête est en cours",
          desc: "Accusez réception de l’action et conservez le contexte. Un squelette peut réserver la place du contenu ; vérifiez les déplacements à l’arrivée des données au lieu de supposer un CLS nul.",
        },
        {
          tag: 'ERREUR CRITIQUE · PAIEMENT',
          title: 'La carte a été refusée',
          desc: "Expliquez ce qui est connu du refus et la reprise disponible, sans attribuer une cause inconnue. Conservez les données autorisées et vérifiez qu’une relance ne peut pas dupliquer le paiement.",
          hot: true,
        },
      ],
    },
    insideSection: {
      kicker: 'FEUILLETER L’ÉDITION FRANÇAISE',
      heading: "Dix pages du manuel et du kit à consulter.",
      lede:
        "Ouvrez les pages en grand pour lire les annotations et examiner les exemples avant l’achat. La sélection comprend le sommaire, des écrans de paiement, des comparaisons et une page de la checklist. Les filtres séparent les écrans annotés, les avant/après et les pages du système.",
      openReaderBtn: 'Ouvrir la liseuse plein écran (10 pages)',
      filterAll: 'Tout voir (10)',
      filterScreens: 'Écrans annotés',
      filterBeforeAfter: 'Avant / Après',
      filterSystem: 'Checklist & Kit Bonus',
      clickHint: 'Cliquer pour zoomer',
      note: "L’édition française contient un PDF de 148 pages avec signets cliquables, le kit A4 séparé de 26 pages et l’archive de 21 fichiers. Les pages présentées ici sont des extraits de ces documents.",
      readerClose: 'Fermer',
      readerPrev: 'Page précédente',
      readerNext: 'Page suivante',
      readerBuy: 'Obtenir les 148 pages · 29 $',
      pages: [
        {
          id: 'cover',
          src: '/images/fr/cover.webp',
          category: 'system',
          badge: 'Couverture FR',
          title: 'Couverture · Édition française 2026',
          caption: '148 pages, 97 sections, 36 écrans annotés, 77 règles et kit de 12 fiches.',
          alt: 'Couverture française du UX/UI Playbook 2026 par Joy N.',
        },
        {
          id: 'contents',
          src: '/images/fr/contents.webp',
          category: 'system',
          badge: 'p. 04 · Sommaire',
          title: 'Sommaire général',
          caption: "Huit parties et 97 sections : parcours, conception visuelle, livraison, plateformes et outils.",
          alt: 'Page sommaire du UX/UI Playbook en français',
        },
        {
          id: 'landing',
          src: '/images/fr/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 24 · Landing page',
          title: "Structure d’une landing page",
          caption: "Maquette B2B annotée en six zones : ordre de lecture, contenu du premier écran et place de l’action.",
          alt: 'Page annotée sur la structure d’une landing page en français',
        },
        {
          id: 'checkout',
          src: '/images/fr/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 30 · Checkout',
          title: "Organisation d’un écran de paiement",
          caption: "Exemple avec formulaire à gauche et récapitulatif à droite pour garder le total consultable.",
          alt: 'Page annotée sur l’écran de paiement checkout en français',
        },
        {
          id: 'questions',
          src: '/images/fr/eight-questions.webp',
          category: 'screens',
          badge: 'p. 22 · Méthode',
          title: 'Les 8 questions avant de dessiner',
          caption: "Questions sur la tâche, les données nécessaires et les conditions d’usage avant la maquette.",
          alt: 'Les 8 questions avant de dessiner un écran',
        },
        {
          id: 'sbs-checkout',
          src: '/images/fr/before-after-checkout.webp',
          category: 'before-after',
          badge: 'p. 88 · Avant / Après',
          title: 'Prototype comparé : le paiement',
          caption: '6 champs et 2 boutons égaux contre 4 champs, Apple Pay en tête et 1 action claire.',
          alt: 'Comparaison avant et après d’un écran de paiement en français',
        },
        {
          id: 'sbs-loading',
          src: '/images/fr/before-after-loading.webp',
          category: 'before-after',
          badge: 'p. 112 · Avant / Après',
          title: 'Prototype comparé : le chargement',
          caption: "Comparaison d’une attente sur page vide et d’un squelette qui réserve l’espace du contenu.",
          alt: 'Comparaison avant et après de l’état de chargement en français',
        },
        {
          id: 'revenue',
          src: '/images/fr/part-05-revenue.webp',
          category: 'screens',
          badge: 'p. 67 · Partie 05',
          title: 'Le design comme revenu',
          caption: 'Vendre, chiffrer, cadrer la mission et défendre ses choix sans jargon devant un client.',
          alt: 'Ouverture de la partie 05 : Le design comme revenu',
        },
        {
          id: 'checklist',
          src: '/images/fr/checklist-rules.webp',
          category: 'system',
          badge: 'p. 140 · 77 Règles',
          title: 'Checklist agent 1/4 · règles A à C',
          caption: "Identifiant de règle, sévérité, plateforme concernée et méthode de contrôle.",
          alt: 'Page de la checklist des 77 règles en français',
        },
        {
          id: 'bonus-cover',
          src: '/images/fr/bonus-cover.webp',
          category: 'system',
          badge: 'Kit Bonus · 26 pages',
          title: 'Kit bonus de livraison (12 fiches A4)',
          caption: 'Audit 40 points, brief client, passation dev, grille IA et rapport d’agent à 3 statuts.',
          alt: 'Couverture du Kit bonus de livraison 12 fiches en français',
        },
      ],
    },
    contentsSection: {
      kicker: "THÈMES DU LIVRE ET FICHIERS INCLUS",
      heading: "Parcourir le livre, le kit et l’archive.",
      lede: "Les huit parties ci-dessous regroupent les sujets du manuel français de 148 pages. Les deux autres onglets présentent les douze fiches imprimables et une sélection des fichiers techniques de l’archive. Les repères de pages permettent de situer les parties du livre.",
      tabBook: 'Le Livre (8 parties · 97 sections)',
      tabKit: 'Le Kit Bonus (12 fiches A4)',
      tabArchive: 'L’Archive Technique (21 fichiers)',
      expandAll: 'Tout déplier',
      collapseAll: 'Tout replier',
      parts: [
        {
          num: '01',
          title: 'Comprendre avant de dessiner',
          page: 'p. 9',
          sections: [
            "Objectifs utilisateurs et conception du parcours",
            "Répartition des décisions UX, UI et produit",
            "Dix lois et principes cognitifs",
            "Charge cognitive et informations à conserver",
            "Arrivée, action, confirmation et retour",
            "Hiérarchie visuelle et cinq états d’écran",
            "Accessibilité : référentiels et périmètre de revue",
            "Structure d’un écran et huit questions de cadrage",
          ],
        },
        {
          num: '02',
          title: "Dix types d’écrans",
          page: 'p. 23',
          sections: [
            "Landing page : contenu et hiérarchie",
            "Tableau de bord SaaS : données et actions",
            "Application mobile : tâche et navigation",
            "Paiement : formulaire et récapitulatif",
            "Tarifs, connexion et inscription",
            "États vides, première utilisation et formulaires longs",
            "Tableaux, back-office, réservation et rendez-vous",
          ],
        },
        {
          num: '03',
          title: "Typographie, couleurs et composants",
          page: 'p. 44',
          sections: [
            "Typographie : échelle et familles",
            "Couleur : valeurs et rôles",
            "Espacement : échelle de 4 et 8",
            "Grilles, points de rupture et responsive",
            "Tokens et composants",
            "Iconographie, micro-copie et passation développeur",
          ],
        },
        {
          num: '04',
          title: 'Du brief au livrable',
          page: 'p. 59',
          sections: [
            "Brief et recherche : exemple de créneau de deux heures",
            "Wireframes : structure et ordre du contenu",
            "Passage à la présentation visuelle",
            "Prototypes et observation des usages",
            "Première passe d’audit de vingt minutes",
          ],
        },
        {
          num: '05',
          title: 'Le design comme revenu',
          page: 'p. 67',
          sections: [
            "Présenter une décision à un commanditaire",
            "Portfolio : choix et description des projets",
            "Trois modèles de facturation",
            "Proposition commerciale en une page",
            "Périmètre, livraison, retours et maintenance",
          ],
        },
        {
          num: '06',
          title: 'Outils & workflow',
          page: 'p. 77',
          sections: [
            "Outils par phase et modèle économique",
            "Choix d’outils selon le budget",
            "Formats de fichiers et destinataires",
            "Pipeline du brief à la revue du code",
            "Trois prompts, couleurs et dégradés",
            "Délégation à un agent et défauts à rechercher",
          ],
        },
        {
          num: '07',
          title: "Sources, droit, IA et prototypes comparés",
          page: 'p. 86',
          sections: [
            "Recherche, questions et attribution des chiffres",
            "Mesures, accessibilité et textes applicables en 2026",
            "Revue d’un écran généré et interfaces d’agents",
            "Instructions dans le fichier AGENTS.md",
            "Thèmes de couleur, mouvement et RTL",
            "Treize avant/après : paiement, contraste, tableaux, états, cibles et chargement",
          ],
        },
        {
          num: '08',
          title: 'Plateformes et boîte à outils (6 OS + 77 règles)',
          page: 'p. 116',
          sections: [
            "Android, iOS, Windows, macOS, GNOME, KDE et Web avec encoche",
            "Organisation de la checklist agent",
            "Méthode de contrôle, sévérité et résultat par plateforme",
            "Annexes A1–A6 : audit, brief, passation, barèmes et protocoles",
            "Annexes A14–A17 : détail des 77 règles A à L",
          ],
        },
      ],
      kitIntro:
        'Un PDF A4 séparé de 26 pages : chacune des 12 fiches tient sur une page, suivie d’une page de notes réglée (26 lignes) pour travailler au stylo ou sur tablette.',
      kitSheets: [
        { num: '01', title: 'Audit UX/UI en 40 points', meta: 'Évaluer un existant', page: 'p. 02' },
        { num: '02', title: 'Fiche de passation', meta: 'Prêt à livrer ?', page: 'p. 04' },
        { num: '03', title: 'Brief projet — 12 questions', meta: 'Cadrage client', page: 'p. 06' },
        { num: '04', title: 'Fiche de spécification développeur', meta: 'Handoff 1 page', page: 'p. 08' },
        { num: '05', title: 'Proposition en une page', meta: "Périmètre et prix", page: 'p. 10' },
        { num: '06', title: 'Contrôle final — 12 points', meta: 'Avant envoi', page: 'p. 12' },
        { num: '07', title: 'Grille de vérification — écran IA', meta: '8 + 4 points critiques', page: 'p. 14' },
        { num: '08', title: 'Checklist agent — 77 règles', meta: 'Six plateformes', page: 'p. 16' },
        { num: '09', title: 'Brief à coller pour un agent', meta: 'Prompt structuré', page: 'p. 18' },
        { num: '10', title: 'Rapport d’agent — trois statuts', meta: "Constats et résultats", page: 'p. 20' },
        { num: '11', title: 'Quelle cible, sur quelle plateforme', meta: 'Web, iOS, Android, Desktop', page: 'p. 22' },
        { num: '12', title: 'Cadrer le périmètre de l’agent', meta: 'Ce qu’il mesure ou non', page: 'p. 24' },
      ],
      archiveIntro:
        "En plus des deux PDF, l’offre comprend une archive de 21 fichiers opérationnels. Voici une sélection regroupée par usage :",
      archiveGroups: [
        {
          folder: 'agent-skill/',
          desc: 'Contrôle automatisé & instructions pour agents IA',
          files: [
            { name: 'agent_check.py', info: 'Scanner exécutable localement ou en CI (--fail-on blocking)' },
            { name: 'rules_77.json', info: 'Les 77 règles structurées par ID, sévérité et plateforme' },
            { name: 'SKILL.md & AGENTS.md', info: "Instructions à adapter au format de contexte de votre agent" },
            { name: 'test/bad.html & clean.html', info: "Fichiers témoins pour comparer les résultats du scanner" },
          ],
        },
        {
          folder: 'tokens/',
          desc: "Valeurs visuelles à adapter au projet",
          files: [
            { name: 'tokens.css', info: 'Variables CSS (échelle typo, grille 4/8, surfaces OLED & clair)' },
            { name: 'tokens.json', info: "Tokens structurés à adapter à vos outils et à votre pipeline" },
          ],
        },
        {
          folder: 'templates/',
          desc: 'Gabarits éditables pour vos missions',
          files: [
            { name: 'brief-client-12q.md', info: "Questionnaire pour préparer le cadrage du projet" },
            { name: 'proposition-1-page.md', info: 'Structure d’offre chiffrée à 3 options' },
            { name: 'handoff-spec.md & audit-40.md', info: "Documents de passation et de revue d’interface" },
          ],
        },
      ],
    },
    comparison: {
      kicker: "RÉPARTITION DES LIVRABLES",
      heading: "Où trouver les exemples et les documents de travail.",
      lede:
        "Les exemples annotés et les explications se trouvent dans le manuel. Les fiches à remplir sont regroupées dans le PDF A4 séparé ; les fichiers modifiables et le scanner sont dans l’archive. Le tableau situe chaque livrable dans l’offre à 29 USD. Le manuel n’est pas proposé séparément dans cette offre.",
      colFeature: 'Ce que vous obtenez',
      colOthers: "Dans le manuel PDF",
      colPlaybook: "Offre complète · 29 $",
      rows: [
        {
          feature: 'Exemples visuels annotés & comparaisons Avant / Après',
          others: "36 écrans + 13 prototypes avant/après + 11 planches de plateformes",
          playbook: "Le même manuel + kit et archive",
        },
        {
          feature: 'Kit de 12 fiches A4 imprimables + gabarits commerciaux',
          others: "Méthode expliquée dans le livre",
          playbook: 'Inclus (26 pages A4 + 4 gabarits éditables)',
          highlight: true,
        },
        {
          feature: "Design tokens CSS et JSON pour thèmes clair et sombre",
          others: "Méthode expliquée dans le livre",
          playbook: 'Inclus dans l’archive',
          highlight: true,
        },
        {
          feature: 'Scanner Python exécutable (agent_check.py) + 77 règles JSON',
          others: "Méthode expliquée dans le livre",
          playbook: 'Inclus (utilisable en terminal & CI/CD)',
          highlight: true,
        },
        {
          feature: 'Skill IA (SKILL.md / AGENTS.md) pour Claude Code, Cursor, Codex',
          others: "Méthode expliquée dans le livre",
          playbook: 'Inclus — l’agent vérifie et rend un rapport',
          highlight: true,
        },
        {
          feature: 'Couverture multi-plateforme (Web, iOS, Android, macOS, Windows, Linux)',
          others: "Conventions des 6 plateformes",
          playbook: 'Les 6 plateformes comparées écran par écran',
        },
        {
          feature: 'Tarif complet sans abonnement',
          others: "PDF non vendu séparément dans cette offre",
          playbook: '29 $ USD · paiement unique',
          highlight: true,
        },
      ],
    },
    honesty: {
      kicker: 'AVANT D’ACHETER',
      heading: "À quels usages le manuel répond-il ?",
      yesTitle: 'C’est fait pour vous si',
      yesItems: [
        "Vous développez une application seul ou en équipe et prenez aussi des décisions d’interface.",
        "Vous utilisez un agent de code et voulez documenter ses contraintes visuelles et ses contrôles.",
        "Vous devez expliquer à un client ou à une équipe les choix d’un écran.",
        "Vous préparez des briefs, des propositions et des passations pour vos missions.",
        "Vous cherchez des exemples d’écrans annotés et des fichiers à adapter à votre système.",
      ],
      noTitle: "Ce que l’offre ne comprend pas",
      noItems: [
        "Un cours vidéo, un accompagnement individuel ou une prestation de conception.",
        "Une garantie de conversion ou une validation du marché de votre produit.",
        "Une certification automatique d’accessibilité : les contrôles ne couvrent pas toutes les tâches ni tous les critères.",
        "Un diplôme ou une certification professionnelle.",
      ],
    },
    author: {
      kicker: 'L’AUTEUR',
      heading: "Joy N., auteur du UX/UI Playbook.",
      role: "Joy N. · Auteur du UX/UI Playbook et créateur de solutions numériques.",
      p1: "Joy N. est l’auteur de ce manuel consacré à l’UX, à l’UI et au Product Design. Le livre suit le déroulement d’un projet : décrire le besoin, préparer les parcours, définir les composants et transmettre les décisions à la personne qui développe. Les exemples d’écrans permettent d’examiner des choix de contenu, de disposition et de comportement dans ce contexte.",
      p2: "Les documents associés reprennent ces sujets sous forme de fiches et de fichiers modifiables : brief, audit, passation, tokens et règles pour agents de code. Pour une question sur le contenu ou le téléchargement, vous pouvez écrire à joynagassi@gmail.com.",
      signature: 'Joy N. · Édition française 2026',
    },
    faq: {
      kicker: 'QUESTIONS FRÉQUENTES',
      heading: "Questions sur les fichiers et l’achat.",
      items: [
        {
          q: 'Que contient exactement le téléchargement à 29 $ ?',
          a: 'Trois éléments disponibles immédiatement après paiement : 1) le UX/UI Playbook complet en français (PDF A4 de 148 pages avec sommaire interactif), 2) le Kit Bonus de livraison (PDF A4 de 26 pages contenant 12 fiches pratiques et leurs pages de notes), et 3) l’archive ZIP des 21 fichiers de travail (design tokens CSS/JSON, 4 gabarits, les 77 règles en JSON, le script Python agent_check.py et le skill IA).',
        },
        {
          q: 'Avec quels outils IA fonctionnent la checklist et le skill ?',
          a: "Le scanner s’exécute avec Python 3, dans un terminal ou une CI qui peut lancer cette commande. Les fichiers Markdown/JSON servent d’instructions et de données aux agents capables de les lire. Adaptez le format de contexte reconnu par votre outil, notamment Claude Code, Cursor ou Codex, ainsi que les chemins vers le projet ; l’exécution dépend aussi des permissions accordées à l’agent.",
        },
        {
          q: 'Faut-il savoir utiliser Figma ou être designer pour en profiter ?',
          a: "Non. Les exemples portent sur les décisions d’interface et peuvent être repris dans du code, dans un outil de maquette ou sur papier. Les tailles, espacements, contrastes et états fournissent des éléments de revue. Leur application demande de connaître votre contenu et votre parcours, puis de vérifier le résultat rendu ; aucune maîtrise préalable de Figma n’est requise.",
        },
        {
          q: 'Puis-je utiliser les gabarits, tokens et scripts sur des projets clients facturés ?',
          a: 'Oui, sans aucune limite de nombre de projets. L’usage commercial est inclus pour vos propres produits et les missions de vos clients. Seule la revente ou la redistribution publique des fichiers du playbook eux-mêmes est interdite.',
        },
        {
          q: 'Quelle est la différence entre l’édition française (148 pages) et l’édition anglaise (139 pages) ?',
          a: "Les deux éditions reprennent la même méthode, les 97 sections, les 77 règles et les 21 fichiers traduits. La composition et les retours à la ligne diffèrent selon la langue : le PDF français compte 148 pages et le PDF anglais 139.",
        },
        {
          q: 'Et si le playbook ne correspond pas à mon besoin ?',
          a: "Vous pouvez demander un remboursement dans les sept jours suivant l’achat en écrivant à joynagassi@gmail.com. Indiquez l’adresse utilisée pour la commande afin de permettre de la retrouver.",
        },
      ],
    },
    offer: {
      kicker: "ÉDITION FRANÇAISE",
      heading: "Le livre, le kit et l’archive pour 29 USD.",
      lede:
        "L’achat donne accès au manuel français de 148 pages, au kit imprimable et aux fichiers techniques présentés sur cette page. Utilisez le livre pour préparer les décisions d’un écran, puis conservez vos observations et vos corrections dans les gabarits du projet. Les dix pages d’aperçu restent consultables avant de choisir cette édition.",
      includedTitle: 'Inclus instantanément dans l’édition française :',
      includedList: [
        'UX/UI Playbook 2026 — PDF A4 de 148 pages (97 sections, 36 écrans annotés)',
        'Kit Bonus Imprimable — PDF A4 de 26 pages (12 fiches d’atelier & notes)',
        'Scanner Python agent_check.py + base JSON des 77 règles (6 plateformes)',
        'Skill IA (SKILL.md + AGENTS.md) pour Claude Code, Cursor & Codex',
        "Design tokens CSS et JSON à adapter + quatre gabarits de projet",
        'Licence d’utilisation commerciale sur vos projets & missions clients',
      ],
      priceDisplay: '29 $',
      priceSub: 'USD · paiement unique · 0 abonnement (ou prix libre supérieur)',
      buyBtn: 'Obtenir l’édition française · 29 $',
      licenseNote:
        "Documents PDF consultables sur ordinateur ou tablette, imprimables en A4. Le paiement et la remise des fichiers passent par Gumroad ; les moyens de paiement disponibles sont affichés lors de la commande.",
      guarantees: ['Téléchargement immédiat', 'Remboursé sous 7 jours', 'Paiement sécurisé Gumroad'],
      crosslinkTag: 'VOUS TRAVAILLEZ EN ANGLAIS ?',
      crosslinkText:
        "L’édition anglaise est vendue séparément : manuel de 139 pages, kit A4 et archive de 21 fichiers en anglais. Le sélecteur de langue ouvre les pages et les liens d’achat de cette édition.",
      crosslinkBtn: 'Voir l’édition anglaise (EN)',
    },
    footer: {
      copyright: '© 2026 UX/UI Playbook · Édition 2026 par Joy N.',
      gumroadLinkLabel: 'Boutique française (Gumroad)',
      otherEditionLabel: 'English edition',
    },
  },

  en: {
    locale: 'en',
    otherLocale: 'fr',
    gumroadUrl: 'https://joyccelight.gumroad.com/l/uxuiplaybook',
    otherGumroadUrl: 'https://joyccelight.gumroad.com/l/uiuxplaybookfr',
    siteUrl: SITE_URL,
    meta: {
      title: "UX/UI Playbook — Manual, Kit and AI Skill · EN",
      description:
        "UX/UI Playbook combines 139 pages, 12 A4 sheets and 21 files: CSS/JSON tokens, a Python scanner and AI-agent rules. Get the English edition for $29.",
      ogTitle: 'UX/UI Playbook — 2026 English Edition + Bonus Kit',
      ogDescription:
        "A 139-page UX, UI and Product Design manual, 12 A4 worksheets and a 21-file archive with tokens, templates and a Python scanner. English edition: $29 USD.",
      ogImage: `${SITE_URL}/og-en.jpg`,
      ogLocale: 'en_US',
      productName: 'UX/UI Playbook 2026 + Bonus Kit (English Edition)',
    },
    skipToContent: 'Skip to main content',
    topBar: {
      badge: "2026 ENGLISH EDITION · PDF, A4 KIT AND FILES",
      audienceHint: "Manual, worksheets and instructions in English",
      cta: 'Get the Playbook — $29',
    },
    nav: {
      pillars: "Book and files",
      demo: "Check demo",
      inside: 'Inside Pages',
      contents: 'Contents',
      guides: 'Article',
      faq: 'FAQ',
      buy: 'Buy — $29',
      themeDarkLabel: 'Switch to light mode',
      themeLightLabel: 'Switch to pure OLED dark mode',
      switchLangTitle: 'Voir l’édition française (148 pages)',
    },
    hero: {
      kicker: "UX, UI AND PRODUCT DESIGN FOR DEVELOPERS",
      titleBefore: "Design and review ",
      titleAccent: "your interfaces",
      titleAfter: ".",
      lede:
        "Joy N.’s UX/UI Playbook follows interface design from defining a journey to preparing error states and developer handoff. The manual explains typography, colour and spacing decisions through annotated screens. A4 worksheets support briefing and review, while tokens and a Python scanner carry some of those decisions into code. Checks requiring inspection of the rendered interface or observation with users remain open for review. The book is intended for developers and teams preparing screens alongside their implementation.",
      primaryCta: 'Get the English edition · $29',
      secondaryCta: 'Read 10 sample pages',
      note: "One-time payment of $29 USD. After purchase: 139-page English PDF, 26-page A4 kit and 21-file archive.",
      proofs: [
        '139 A4 pages in English',
        "77 rules: automated + human checks",
        '12 sheets + 21 files & AI Skill',
        '7-day refund guarantee',
      ],
      coverCaption: 'EN Edition · 139 pages',
      spreadCaption: "Annotated examples and review guidance",
    },
    strip: [
      { num: '139', label: "pages in the English manual" },
      { num: '36', label: "annotated screens + 13 before/after prototypes + 11 platform spreads" },
      { num: '77', label: "rules across 6 platforms, with verification methods" },
      { num: '21', label: 'working files: tokens, Python scanner & AI skill' },
    ],
    pillars: {
      kicker: "DOWNLOAD CONTENTS",
      heading: "The manual, A4 worksheets and working files.",
      lede:
        "The book explains design decisions through screen examples. The separate kit contains worksheets for framing, reviewing and handing over a project. The archive holds design values, templates and coding-agent instructions. Start with a manual topic relevant to your screen, then use a worksheet to record decisions and remaining checks. The three parts are supplied together, so the examples and the files can be used during the same review.",
      cards: [
        {
          tag: '01 · LEARN',
          title: "The illustrated manual · 139 pages",
          subtitle: "97 sections · 36 annotated screens · 13 before/after + 11 platform spreads",
          points: [
            "Principles accompanied by annotated mockups, issues to examine and space for notes.",
            "Ten screen types, including landing pages, dashboards, checkout, mobile apps, pricing and admin views.",
            "Typography, colour, 4/8 spacing, accessibility and conventions for the six platforms covered.",
          ],
        },
        {
          tag: "02 · PREPARE DELIVERY",
          title: "Worksheets and design tokens",
          subtitle: '26-page A4 Bonus Kit (12 sheets) + templates + CSS/JSON',
          points: [
            '12 printable A4 working sheets, each paired with a 26-line ruled notes page for live reviews.',
            "Four editable templates: a 12-question brief, one-page proposal, developer handoff and 40-point audit.",
            "CSS variables and JSON tokens for light and dark theme values, to adapt to your project.",
          ],
        },
        {
          tag: "03 · RUN CHECKS",
          title: "Python scanner and AI instructions",
          subtitle: 'agent_check.py · 77 rules · Claude Code, Cursor, Codex, CI',
          points: [
            'A Python scanner that parses your HTML/CSS, settles what can be measured in source, and returns an exit code.',
            "Three statuses: Automated, To verify, Not applicable. Severity (Blocking, Major) and outcome are separate fields.",
            "AGENTS.md and SKILL.md to document rules an agent should read and checks it should run.",
          ],
        },
      ],
    },
    agentDemo: {
      kicker: "INTERACTIVE DEMO · ILLUSTRATIVE REPORT",
      heading: "Compare a failing file with a corrected example.",
      lede:
        "This comparison simulates a check report: no Python script runs in this page. Copy the command to run agent_check.py on the archive’s sample files, then separate automated outcomes from human review. This diagram stays readable: the numeric defects describe the sample files, not this page’s font sizes or colours.",
      bullets: [
        {
          bold: 'Usable in CI/CD:',
          rest: "--fail-on blocking returns a non-zero exit code when an automated check with blocking severity fails. The pipeline needs to use that code to stop delivery.",
        },
        {
          bold: "Method, severity and outcome:",
          rest: "Automated / To verify / Not applicable describe verification. An automated rule can fail; Blocking is severity, not a fourth status.",
        },
        {
          bold: 'Ships with test fixtures:',
          rest: 'point it at test/bad.html in the archive and it exits 1; point it at test/clean.html and it exits 0.',
        },
      ],
      tabBad: "1. Sample file bad.html",
      tabClean: '2. Fixed Screen (clean.html)',
      fixAction: "Show the corrected example",
      fixedBadge: "Corrected example · human review still required",
      copyCmd: 'Copy CLI command',
      copiedCmd: 'Command copied!',
      screenHeaderBad: 'BEFORE · 6 fields · 2 equal buttons · 4 blocking failures',
      screenHeaderClean: "AFTER · useful fields · 1 primary action · corrected example",
      screenMock: {
        brand: 'NORTH STUDIO · CHECKOUT',
        stepLabel: 'Checkout steps',
        steps: ['Cart', 'Shipping', 'Payment'],
        emailLabel: 'Email',
        emailVal: 'maya@north.app',
        addressLabel: 'Shipping address',
        addressVal: '12 Elm Street, Suite 4B',
        cityLabel: 'City',
        zipLabel: 'Postal code',
        cardLabel: 'Card number',
        expLabel: 'Expiry',
        applePay: 'Apple Pay',
        cardPill: 'Card / Local Wallet',
        payPrimary: 'Pay $132.90',
        saveSecondary: 'Save draft',
        hiddenFeeBad: '* Shipping & handling fees will be calculated on the final confirmation step.',
        clearFeeClean: 'Total due: $132.90 (includes $4.90 shipping · free 30-day returns)',
        summaryClean: '1× Leather Tote ($98) + Belt ($30) + Tracked Shipping ($4.90)',
        flaws: [
          { code: 'C01 BLOCKING', text: "Sample file: 9 and 10 px text, below the Playbook’s 12 px floor" },
          { code: 'B01 BLOCKING', text: "Sample file: insufficient contrast; compare with the 4.5:1 text threshold" },
          { code: 'A06 BLOCKING', text: 'Two competing solid primary buttons ("Pay" vs "Save draft")' },
          { code: "K03 MAJOR", text: 'Final amount & shipping fees hidden until after 6 form fields' },
        ],
        improvements: [
          { code: "C01 · AUTOMATED", text: "Example’s minimum declared font size: 13 px" },
          { code: "B01 · AUTOMATED", text: "Example text/background pair checked; measure actual surfaces" },
          { code: "A06 · TO VERIFY", text: "Distinct primary action; confirm comprehension with a person" },
          { code: "K03 · TO VERIFY", text: "Total and fees visible; review the full path before commitment" },
        ],
      },
      terminal: {
        cmdBad:
          'python3 agent_check.py --target test/bad.html \\\n    --platform web --lang en --fail-on blocking',
        cmdClean:
          'python3 agent_check.py --target test/clean.html \\\n    --platform web --lang en --fail-on blocking',
        linesBad: [
          { type: 'r', text: "C01 AUTOMATED · BLOCKING · fail: text below 12 px" },
          { type: 'r', text: "B01 AUTOMATED · BLOCKING · fail: contrast below 4.5:1" },
          { type: 'r', text: "A01 AUTOMATED · BLOCKING · fail: missing H1" },
          { type: 'r', text: "F01 AUTOMATED · BLOCKING · fail: unlinked label" },
          { type: 'w', text: "D01 TO VERIFY · web target: 24 px AA, 44 px recommended" },
          { type: 'w', text: "H01 TO VERIFY · real keyboard path and focus" },
          { type: 'g', text: "Example: 9 automated · 6 to verify · 62 not applicable" },
          { type: 'c', text: "Separate severity: 4 blocking failures → exit 1" },
        ],
        linesClean: [
          { type: 'g', text: "A01 AUTOMATED · pass: one H1 in the source file" },
          { type: 'g', text: "B01 AUTOMATED · pass: this example’s colour pair" },
          { type: 'g', text: "C01 AUTOMATED · pass: declared font sizes ≥ 12 px" },
          { type: 'g', text: "F01 AUTOMATED · pass: label linked to input" },
          { type: 'w', text: "D01 TO VERIFY · measure targets in the rendered page" },
          { type: 'w', text: "H01 TO VERIFY · test keyboard and screen reader" },
          { type: 'g', text: "Example: 9 automated · 6 to verify · 62 not applicable" },
          { type: 'c', text: "0 automated blocking failures → exit 0 ≠ conformance" },
        ],
        statusBlocking: 'Blocking',
        statusAutomated: "Automated",
        statusToVerify: 'To verify',
        statusNotApplicable: "Not applicable",
      },
    },
    statesSection: {
      kicker: "SCREEN STATES TO PREPARE",
      heading: "What appears when data is missing or a request fails?",
      lede:
        "A mockup with complete data covers only part of the journey. Describe arrival without content, the wait for a request and recovery after failure as well. For each situation, identify its trigger, the information preserved and the available actions. The examples below show three states to specify and then try in the browser, including keyboard use and a phone-sized layout.",
      cards: [
        {
          tag: 'EMPTY STATE',
          title: 'Nothing to show on day one',
          desc: "Explain why the list is empty and what it can contain. Offer creation or import where available; distinguish this state from a search without results.",
        },
        {
          tag: "LOADING · RESERVED SPACE",
          title: "The request is running",
          desc: "Acknowledge the action and preserve context. A skeleton can reserve content space; check movement when data arrives rather than assuming zero layout shift.",
        },
        {
          tag: 'CRITICAL ERROR · PAYMENT',
          title: 'The card was declined',
          desc: "Explain what is known about the decline and the recovery available without inventing a cause. Preserve permitted data and check that a retry cannot duplicate the payment.",
          hot: true,
        },
      ],
    },
    insideSection: {
      kicker: 'LOOK INSIDE THE ENGLISH EDITION',
      heading: "Ten pages from the manual and kit to inspect.",
      lede:
        "Open a page at reading size to inspect its annotations and examples before buying. The selection includes contents, checkout screens, comparisons and a checklist page. Filters separate annotated screens, before/after examples and system pages.",
      openReaderBtn: 'Open fullscreen reader (10 pages)',
      filterAll: 'All pages (10)',
      filterScreens: 'Annotated screens',
      filterBeforeAfter: 'Before / After',
      filterSystem: 'Checklist & Bonus Kit',
      clickHint: 'Click to inspect',
      note: "The English edition contains a 139-page PDF with clickable bookmarks, a separate 26-page A4 kit and the 21-file archive. The pages shown here are extracts from those documents.",
      readerClose: 'Close',
      readerPrev: 'Previous page',
      readerNext: 'Next page',
      readerBuy: 'Get all 139 pages · $29',
      pages: [
        {
          id: 'cover',
          src: '/images/en/cover.webp',
          category: 'system',
          badge: 'EN Cover',
          title: 'Cover · 2026 English Edition',
          caption: '139 pages, 97 sections, 36 annotated screens, 77 rules and the 12-sheet kit.',
          alt: 'Cover of the UX/UI Playbook 2026 English Edition by Joy N.',
        },
        {
          id: 'contents',
          src: '/images/en/contents.webp',
          category: 'system',
          badge: 'p. 04 · Contents',
          title: 'Full Table of Contents',
          caption: "Eight parts and 97 sections covering journeys, visual design, delivery, platforms and tools.",
          alt: 'Contents page of the UX/UI Playbook in English',
        },
        {
          id: 'landing',
          src: '/images/en/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 23 · Landing page',
          title: "Landing-page structure",
          caption: "B2B mockup annotated in six areas: reading order, first-screen content and action placement.",
          alt: 'Annotated landing page blueprint from the playbook',
        },
        {
          id: 'checkout',
          src: '/images/en/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 29 · Checkout',
          title: "Checkout-screen layout",
          caption: "Example with a form on the left and a summary on the right to keep the total available.",
          alt: 'Annotated checkout screen page from the playbook',
        },
        {
          id: 'questions',
          src: '/images/en/eight-questions.webp',
          category: 'screens',
          badge: 'p. 21 · Foundations',
          title: 'The 8 questions before you draw',
          caption: "Questions about the task, required data and conditions of use before making a mockup.",
          alt: 'Page showing the eight questions to ask before drawing',
        },
        {
          id: 'sbs-checkout',
          src: '/images/en/before-after-checkout.webp',
          category: 'before-after',
          badge: 'p. 80 · Side-by-side',
          title: 'Side-by-side: checkout',
          caption: '6 fields and 2 equal buttons vs. 4 fields, system wallet first, and 1 clear action.',
          alt: 'Before and after comparison of a checkout interface',
        },
        {
          id: 'sbs-loading',
          src: '/images/en/before-after-loading.webp',
          category: 'before-after',
          badge: 'p. 103 · Side-by-side',
          title: 'Side-by-side: loading',
          caption: "Comparison of a wait on an empty page with a skeleton that reserves content space.",
          alt: 'Before and after comparison of loading states',
        },
        {
          id: 'revenue',
          src: '/images/en/part-05-revenue.webp',
          category: 'screens',
          badge: 'p. 62 · Part 05',
          title: 'Design as revenue',
          caption: 'Pitching, pricing, writing a one-page proposal, and defending decisions without jargon.',
          alt: 'Opening page of Part 05: Design as revenue',
        },
        {
          id: 'checklist',
          src: '/images/en/checklist-rules.webp',
          category: 'system',
          badge: 'p. 131 · 77 Rules',
          title: 'Checklist 1/4 · rules A to C',
          caption: "Rule identifier, severity, relevant platform and verification method.",
          alt: 'Page of the 77-rule checklist in English',
        },
        {
          id: 'bonus-cover',
          src: '/images/en/bonus-cover.webp',
          category: 'system',
          badge: 'Bonus Kit · 26 pages',
          title: 'Delivery Bonus Kit (12 A4 sheets)',
          caption: '40-point audit, project brief, dev handoff, AI screen grid, and 3-status agent report.',
          alt: 'Cover of the 12-sheet printable Bonus Kit in English',
        },
      ],
    },
    contentsSection: {
      kicker: "BOOK TOPICS AND INCLUDED FILES",
      heading: "Browse the book, kit and archive.",
      lede: "The eight parts below group the topics in the 139-page English manual. The other tabs describe the twelve printable worksheets and a selection of technical archive files. Page references locate each part in the book.",
      tabBook: 'The Book (8 parts · 97 sections)',
      tabKit: 'Bonus Kit (12 A4 sheets)',
      tabArchive: 'Working Archive (21 files)',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
      parts: [
        {
          num: '01',
          title: 'Understand before you draw',
          page: 'p. 9',
          sections: [
            "User goals and journey design",
            "Product, UX and UI decision responsibilities",
            "Ten cognitive laws and principles",
            "Cognitive load and information to preserve",
            "Arrival, action, confirmation and return",
            "Visual hierarchy and five screen states",
            "Accessibility references and review scope",
            "Screen structure and eight framing questions",
          ],
        },
        {
          num: '02',
          title: "Ten screen types",
          page: 'p. 22',
          sections: [
            "Landing page: content and hierarchy",
            "SaaS dashboard: data and actions",
            "Mobile application: task and navigation",
            "Checkout: form and summary",
            "Pricing, login and registration",
            "Empty states, first use and long forms",
            "Tables, admin views, booking and appointments",
          ],
        },
        {
          num: '03',
          title: "Typography, colour and components",
          page: 'p. 40',
          sections: [
            "Typography: scale and families",
            "Colour: values and roles",
            "Spacing: 4 and 8 point scale",
            "Grids, breakpoints and responsive design",
            "Tokens and components",
            "Icons, microcopy and developer handoff",
          ],
        },
        {
          num: '04',
          title: 'From brief to deliverable',
          page: 'p. 54',
          sections: [
            "Brief and research: a two-hour session example",
            "Wireframes: structure and content order",
            "Moving to visual presentation",
            "Prototypes and observation of use",
            "An initial twenty-minute audit pass",
          ],
        },
        {
          num: '05',
          title: 'Design as revenue',
          page: 'p. 62',
          sections: [
            "Presenting a decision to a stakeholder",
            "Portfolio: selecting and describing projects",
            "Three billing models",
            "One-page client proposal",
            "Scope, delivery, feedback and maintenance",
          ],
        },
        {
          num: '06',
          title: 'Tools & workflow',
          page: 'p. 70',
          sections: [
            "Tools by phase and business model",
            "Tool choices for different budgets",
            "File formats and recipients",
            "Pipeline from brief to code review",
            "Three prompts, colours and gradients",
            "Agent delegation and defects to examine",
          ],
        },
        {
          num: '07',
          title: "Sources, law, AI and comparative prototypes",
          page: 'p. 78',
          sections: [
            "Research, questions and attribution of figures",
            "Measurements, accessibility and legislation in 2026",
            "Reviewing generated screens and agent interfaces",
            "Instructions in AGENTS.md",
            "Colour themes, motion and RTL",
            "Thirteen before/after examples: checkout, contrast, tables, states, targets and loading",
          ],
        },
        {
          num: '08',
          title: 'Platforms and toolbox (6 OS + 77 rules)',
          page: 'p. 107',
          sections: [
            "Android, iOS, Windows, macOS, GNOME, KDE and notched web views",
            "Agent checklist organisation",
            "Check method, severity and outcome by platform",
            "Appendices A1–A6: audit, brief, handoff, rates and protocols",
            "Appendices A14–A17: all 77 rules A to L",
          ],
        },
      ],
      kitIntro:
        'A separate 26-page A4 PDF: each of the 12 working sheets fits on one page, followed by a 26-line ruled notes page for pen-and-paper or tablet reviews.',
      kitSheets: [
        { num: '01', title: '40-point UX/UI audit', meta: 'Review existing UI', page: 'p. 02' },
        { num: '02', title: 'Delivery sign-off sheet', meta: 'Ready to ship?', page: 'p. 04' },
        { num: '03', title: 'Project brief — 12 questions', meta: 'Client scoping', page: 'p. 06' },
        { num: '04', title: 'Developer specification sheet', meta: '1-page handoff', page: 'p. 08' },
        { num: '05', title: 'One-page proposal', meta: "Scope and price", page: 'p. 10' },
        { num: '06', title: 'Final check — 12 points', meta: 'Pre-delivery gate', page: 'p. 12' },
        { num: '07', title: 'Verification grid — AI screen', meta: '8 + 4 critical checks', page: 'p. 14' },
        { num: '08', title: 'Agent checklist — 77 rules', meta: 'Six platforms', page: 'p. 16' },
        { num: '09', title: 'Brief to paste to an agent', meta: 'Structured prompt', page: 'p. 18' },
        { num: '10', title: 'Agent report — three statuses', meta: "Findings and results", page: 'p. 20' },
        { num: '11', title: 'Which target, on which platform', meta: 'Web, iOS, Android, Desktop', page: 'p. 22' },
        { num: '12', title: 'Scoping what the agent checks', meta: 'Limits & human checks', page: 'p. 24' },
      ],
      archiveIntro:
        "Alongside the two PDFs, the offer includes a 21-file working archive. Here is a selection grouped by use:",
      archiveGroups: [
        {
          folder: 'agent-skill/',
          desc: 'Automated verification & AI coding agent instructions',
          files: [
            { name: 'agent_check.py', info: 'CLI & CI scanner (--fail-on blocking returns non-zero exit code)' },
            { name: 'rules_77.json', info: 'All 77 rules structured as machine-readable data' },
            { name: 'SKILL.md & AGENTS.md', info: "Instructions to adapt to your agent’s context format" },
            { name: 'test/bad.html & clean.html', info: "Sample files for comparing scanner results" },
          ],
        },
        {
          folder: 'tokens/',
          desc: "Visual values to adapt to the project",
          files: [
            { name: 'tokens.css', info: 'CSS custom properties (type scale, 4/8 spacing, dark & light tokens)' },
            { name: 'tokens.json', info: "Structured tokens to adapt to your tools and pipeline" },
          ],
        },
        {
          folder: 'templates/',
          desc: 'Editable client & product templates',
          files: [
            { name: 'brief-12q.md', info: "Questionnaire for preparing project scope" },
            { name: 'one-page-proposal.md', info: '3-option pricing & scope template' },
            { name: 'handoff-spec.md & audit-40.md', info: "Developer handoff and interface-review documents" },
          ],
        },
      ],
    },
    comparison: {
      kicker: "DELIVERABLES",
      heading: "Where to find examples and working documents.",
      lede:
        "Annotated examples and explanations are in the manual. Worksheets are grouped in the separate A4 PDF; editable files and the scanner are in the archive. The table locates each deliverable within the $29 USD offer. The manual is not sold separately in this package.",
      colFeature: 'What is included',
      colOthers: "In the PDF manual",
      colPlaybook: "Complete offer · $29",
      rows: [
        {
          feature: 'Annotated screens & Before / After visual comparisons',
          others: "36 screens + 13 before/after prototypes + 11 platform spreads",
          playbook: "The same manual + kit and archive",
        },
        {
          feature: '12 printable A4 working sheets + commercial templates',
          others: "Method explained in the book",
          playbook: 'Included (26-page A4 kit + 4 editable templates)',
          highlight: true,
        },
        {
          feature: "CSS and JSON design tokens for light and dark themes",
          others: "Method explained in the book",
          playbook: 'Included in the ZIP archive',
          highlight: true,
        },
        {
          feature: 'Runnable Python scanner (agent_check.py) + 77 JSON rules',
          others: "Method explained in the book",
          playbook: 'Included (runs locally & in CI/CD)',
          highlight: true,
        },
        {
          feature: 'AI Agent Skill (SKILL.md / AGENTS.md) for Claude Code, Cursor, Codex',
          others: "Method explained in the book",
          playbook: 'Included — agents check rules & output a report',
          highlight: true,
        },
        {
          feature: 'Cross-platform native coverage (Web, iOS, Android, macOS, Windows, Linux)',
          others: "Conventions for 6 platforms",
          playbook: 'All 6 platforms compared screen by screen',
        },
        {
          feature: 'Complete one-time price (no subscription)',
          others: "PDF not sold separately in this offer",
          playbook: '$29 USD · one-time payment',
          highlight: true,
        },
      ],
    },
    honesty: {
      kicker: 'BEFORE YOU BUY',
      heading: "Which uses does the manual address?",
      yesTitle: 'It is for you if',
      yesItems: [
        "You develop an application alone or in a team and also make interface decisions.",
        "You use a coding agent and need to document visual constraints and checks.",
        "You need to explain screen decisions to a client or team.",
        "You prepare briefs, proposals and handoffs for projects.",
        "You need annotated screen examples and files to adapt to your system.",
      ],
      noTitle: "What the offer does not include",
      noItems: [
        "A video course, individual coaching or a design service.",
        "A conversion guarantee or validation of your product’s market.",
        "Automatic accessibility certification: checks do not cover every task or criterion.",
        "A diploma or professional certification.",
      ],
    },
    author: {
      kicker: 'THE AUTHOR',
      heading: "Joy N., author of UX/UI Playbook.",
      role: "Joy N. · UX/UI Playbook author and digital product builder.",
      p1: "Joy N. is the author of this manual on UX, UI and Product Design. The book follows a project through describing the need, preparing journeys, defining components and handing decisions to the developer. Screen examples provide material for examining content, layout and behaviour within that process.",
      p2: "The accompanying documents cover the same subjects through worksheets and editable files: briefs, audits, handoffs, tokens and coding-agent rules. For questions about the content or download, contact joynagassi@gmail.com.",
      signature: 'Joy N. · 2026 English Edition',
    },
    faq: {
      kicker: 'FREQUENTLY ASKED QUESTIONS',
      heading: "Questions about the files and purchase.",
      items: [
        {
          q: 'What exact files do I get right after paying $29?',
          a: 'Three instant downloads: 1) the complete UX/UI Playbook 2026 in English (139-page A4 PDF with clickable contents and bookmarks), 2) the Printable Delivery Bonus Kit (26-page A4 PDF with 12 working sheets + ruled note pages), and 3) the 21-file ZIP archive (CSS/JSON design tokens, 4 markdown templates, 77 rules as JSON, the runnable Python scanner agent_check.py, and the AI agent skill).',
        },
        {
          q: 'Which AI coding tools work with the checklist and skill?',
          a: "The scanner runs with Python 3 in a terminal or CI environment able to execute the command. Markdown/JSON files provide instructions and data to agents able to read them. Adapt the context format recognised by your tool, including Claude Code, Cursor or Codex, and the project paths; execution also depends on the permissions granted to the agent.",
        },
        {
          q: 'Do I need Figma experience or a design background?',
          a: "No. The examples address interface decisions and can be used in code, a mockup tool or on paper. Sizes, spacing, contrast and states provide review material. Applying them requires knowing your content and journey, then examining the rendered result; prior Figma knowledge is not required.",
        },
        {
          q: 'Can I use the templates, tokens, and scripts on paid client work?',
          a: 'Yes, across unlimited personal and client projects. Commercial use on your own products and client deliverables is included. Only reselling or redistributing the playbook files themselves is prohibited.',
        },
        {
          q: 'Why is the English edition 139 pages while the French edition is 148 pages?',
          a: "Both editions cover the same method, 97 sections, 77 rules and 21 translated files. Typesetting and line breaks differ by language: the French PDF has 148 pages and the English PDF has 139.",
        },
        {
          q: 'What is the refund policy?',
          a: "You can request a refund within seven days of purchase by emailing joynagassi@gmail.com. Include the email address used for the order so it can be located.",
        },
      ],
    },
    offer: {
      kicker: "ENGLISH EDITION",
      heading: "The book, kit and archive for $29 USD.",
      lede:
        "The purchase includes the 139-page English manual, printable kit and technical files described on this page. Use the book to prepare screen decisions, then keep observations and corrections in the project templates. The ten-page preview remains available before you choose this edition.",
      includedTitle: 'Included immediately in the English edition:',
      includedList: [
        'UX/UI Playbook 2026 — 139-page A4 PDF (97 sections, 36 annotated screens)',
        'Printable Bonus Kit — 26-page A4 PDF (12 working sheets & note pages)',
        'Runnable Python scanner agent_check.py + 77-rule JSON dataset (6 platforms)',
        'AI Agent Skill (SKILL.md + AGENTS.md) for Claude Code, Cursor & Codex',
        "CSS and JSON design tokens to adapt + four project templates",
        'Commercial license for unlimited personal & client projects',
      ],
      priceDisplay: '$29',
      priceSub: 'USD · one-time payment · zero subscription (pay more if you choose)',
      buyBtn: 'Get the English edition · $29',
      licenseNote:
        "PDF documents for reading on a computer or tablet and printing on A4. Gumroad handles payment and file delivery; available payment methods are shown at checkout.",
      guarantees: ['Instant download', '7-day refund policy', 'Secure Gumroad checkout'],
      crosslinkTag: 'WORKING IN FRENCH?',
      crosslinkText:
        "The French edition is sold separately: a 148-page manual, A4 kit and 21-file archive in French. The language selector opens that edition’s pages and purchase links.",
      crosslinkBtn: 'See the French edition (FR)',
    },
    footer: {
      copyright: '© 2026 UX/UI Playbook · 2026 edition by Joy N.',
      gumroadLinkLabel: 'English store (Gumroad)',
      otherEditionLabel: 'Édition française',
    },
  },
};
