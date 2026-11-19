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
    license: string;
    gumroadLinkLabel: string;
    otherEditionLabel: string;
    builtWithRule: string;
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
        'Vous avez codé l’application. Puis quelqu’un l’a ouverte. 148 pages, 77 règles vérifiables par un agent IA, 12 fiches A4 et 21 fichiers de travail.',
      ogImage: `${SITE_URL}/og-fr.jpg`,
      ogLocale: 'fr_FR',
      productName: 'UX/UI Playbook 2026 + Kit bonus (Édition française)',
    },
    skipToContent: 'Aller au contenu principal',
    topBar: {
      badge: 'ÉDITION FRANÇAISE 2026 · TÉLÉCHARGEMENT IMMÉDIAT (PDF + KIT + SKILL IA)',
      audienceHint: 'Livre, fiches & checklist 100 % en français',
      cta: 'Obtenir le Playbook — 29 $',
    },
    nav: {
      pillars: 'L’offre 3-en-1',
      demo: 'Checklist IA',
      inside: 'Pages réelles',
      contents: 'Sommaire',
      guides: 'Guides gratuits',
      faq: 'FAQ',
      buy: 'Acheter — 29 $',
      themeDarkLabel: 'Passer en mode clair',
      themeLightLabel: 'Passer en mode noir OLED',
      switchLangTitle: 'Switch to the English edition (139 pages)',
    },
    hero: {
      kicker: 'POUR LES DÉVELOPPEURS, BUILDERS IA & NON-DESIGNERS',
      titleBefore: 'Vous avez codé l’app. Puis quelqu’un l’a ',
      titleAccent: 'ouverte',
      titleAfter: '.',
      lede:
        'Trois secondes sur le premier écran, et la question tombe : où est-ce que je clique ? Le code tournait. L’écran, non. Ce playbook vous donne les décisions visuelles, les 12 fiches pros et le script Python que votre agent IA exécute pour livrer propre.',
      primaryCta: 'Obtenir l’édition française · 29 $',
      secondaryCta: 'Feuilleter 10 pages réelles',
      note: 'Paiement unique (29 USD). Le PDF de 148 pages, le kit bonus imprimable de 26 pages et l’archive de 21 fichiers à la seconde où vous validez.',
      proofs: [
        '148 pages A4 en français',
        "77 règles : contrôles auto + humains",
        '12 fiches + 21 fichiers & Skill IA',
        'Remboursé sous 7 jours',
      ],
      coverCaption: 'Édition FR · 148 pages',
      spreadCaption: '1 page = 1 maquette + 1 règle',
    },
    strip: [
      { num: '148', label: 'pages en français, une section par page' },
      { num: '36', label: "écrans annotés + 13 prototypes avant/après + 11 planches de plateformes" },
      { num: '77', label: "règles sur 6 plateformes, avec leurs méthodes de contrôle" },
      { num: '21', label: 'fichiers livrés : tokens, script Python & skill IA' },
    ],
    pillars: {
      kicker: 'PLUS QU’UN EBOOK : UN SYSTÈME D’EXÉCUTION',
      heading: 'Trois briques dans un seul téléchargement.',
      lede:
        "UX/UI Playbook est un manuel UX, UI et Product Design de Joy N., accompagné d’un kit de livraison et d’outils pour agents de code. Il s’adresse aux développeurs, indépendants et équipes qui veulent documenter leurs décisions puis vérifier leurs interfaces.",
      cards: [
        {
          tag: '01 · APPRENDRE',
          title: 'Le Playbook Visuel (148 p.)',
          subtitle: "97 sections · 36 écrans annotés · 13 avant/après + 11 planches de plateformes",
          points: [
            'Une règle par page : principe, maquette cotée, erreurs à bannir et lignes de notes.',
            'Dix territoires d’écrans décortiqués : landing, dashboard SaaS, checkout, mobile, tarifs, back-office.',
            'Typographie, système de couleurs, grille 8 pt, accessibilité vendable et conventions des 6 OS.',
          ],
        },
        {
          tag: '02 · LIVRER & FACTURER',
          title: 'Le Kit Pro & Design Tokens',
          subtitle: 'Kit A4 de 26 pages (12 fiches) + gabarits + CSS/JSON',
          points: [
            '12 fiches imprimables A4 suivies chacune d’une page de notes réglée pour vos réunions.',
            'Gabarits prêts à copier : brief 12 questions, proposition commerciale 1 page, passation dev, audit 40 points.',
            'Jetons de design (CSS variables & JSON) calibrés pour le mode clair et le mode sombre.',
          ],
        },
        {
          tag: '03 · AUTOMATISER AVEC L’IA',
          title: 'La Checklist Exécutable & Skill IA',
          subtitle: 'agent_check.py · 77 règles · Claude Code, Cursor, Codex, CI',
          points: [
            'Un scanner Python qui lit votre HTML/CSS, tranche ce qui est mesurable dans le code et renvoie un code de sortie.',
            "Trois statuts : Automatisé, À vérifier, Non applicable. Sévérité (Bloquant, Majeur) et résultat restent séparés.",
            'Fichiers AGENTS.md et SKILL.md prêts à glisser dans vos dépôts pour brider les dérives visuelles des agents IA.',
          ],
        },
      ],
    },
    agentDemo: {
      kicker: "DÉMONSTRATION INTERACTIVE · RAPPORT ILLUSTRATIF",
      heading: "Avant / après : comprendre ce que le contrôle prouve.",
      lede:
        "Ce comparatif simule un rapport de contrôle : aucun script Python ne s’exécute dans cette page. Copiez la commande pour lancer agent_check.py sur les fichiers témoins de l’archive, puis distinguez le résultat automatique de la revue humaine. Le schéma reste lisible ici : les défauts chiffrés décrivent les fichiers témoins, pas les tailles et contrastes de cette page.",
      bullets: [
        {
          bold: 'Intégrable en CI/CD :',
          rest: 'l’option --fail-on blocking bloque une livraison dès qu’un seuil mesurable (contraste, taille < 12 px, hiérarchie H1) échoue.',
        },
        {
          bold: 'Trois statuts, jamais un quatrième :',
          rest: "Automatisé / À vérifier / Non applicable décrivent la méthode de contrôle. Une règle automatisée peut échouer ; « Bloquant » décrit sa sévérité, pas un quatrième statut.",
        },
        {
          bold: 'Deux fichiers témoins inclus :',
          rest: 'test/bad.html échoue immédiatement ; test/clean.html passe sans erreur bloquante.',
        },
      ],
      tabBad: '1. Écran brut IA (bad.html)',
      tabClean: '2. Écran corrigé (clean.html)',
      fixAction: 'Appliquer les règles du Playbook →',
      fixedBadge: "Exemple corrigé · revue humaine toujours requise",
      copyCmd: 'Copier la commande',
      copiedCmd: 'Commande copiée !',
      screenHeaderBad: 'AVANT · 6 champs · 2 boutons égaux · 4 erreurs bloquantes',
      screenHeaderClean: "APRÈS · champs utiles · 1 action primaire · exemple corrigé",
      screenMock: {
        brand: 'ATELIER NORD · PAIEMENT',
        stepLabel: 'Panier ✓  →  Livraison  →  Paiement',
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
      kicker: 'CE QUI CASSE VRAIMENT EN PRODUCTION',
      heading: 'Un écran n’est pas fini quand il est joli sur Dribbble.',
      lede:
        'Il est fini quand il tient debout sans données, avec trop de données, et quand le réseau échoue. C’est exactement là que vos utilisateurs et vos clients perdent confiance — et ce n’est presque jamais une affaire de goût.',
      cards: [
        {
          tag: 'ÉTAT VIDE · EMPTY STATE',
          title: 'Rien à afficher au premier lancement',
          desc: 'Un tableau vide qui ne dit rien ressemble à un bug. Une phrase d’explication, un exemple pré-rempli et un bouton d’action transforment le vide en onboarding.',
        },
        {
          tag: 'CHARGEMENT · CLS = 0',
          title: 'Quelque chose est en train de se passer',
          desc: '400 ms de silence après un clic donnent l’impression d’un bouton mort. Le squelette réserve l’espace exact du contenu final pour éviter tout saut de mise en page.',
        },
        {
          tag: 'ERREUR CRITIQUE · PAIEMENT',
          title: 'La carte a été refusée',
          desc: 'L’état qui coûte directement du chiffre d’affaires. Il exige trois éléments : la cause précise, la prochaine action immédiate, et zéro reproche à l’utilisateur — sans vider le formulaire.',
          hot: true,
        },
      ],
    },
    insideSection: {
      kicker: 'FEUILLETER L’ÉDITION FRANÇAISE',
      heading: 'Dix vraies pages extraites du livre et du kit, sans mise en scène.',
      lede:
        'Voici les pages exactes que vous recevez en français. Cliquez sur n’importe quelle page pour l’ouvrir en grand format de lecture et juger la densité par vous-même avant d’acheter.',
      openReaderBtn: 'Ouvrir la liseuse plein écran (10 pages)',
      filterAll: 'Tout voir (10)',
      filterScreens: 'Écrans annotés',
      filterBeforeAfter: 'Avant / Après',
      filterSystem: 'Checklist & Kit Bonus',
      clickHint: 'Cliquer pour zoomer',
      note: 'Édition intégralement rédigée en français : un fichier PDF unique de 148 pages avec signets cliquables, accompagné du Kit Bonus A4 de 26 pages et de l’archive ZIP des 21 fichiers.',
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
          caption: '8 parties numérotées et 97 sections : de la psychologie visuelle au code vérifiable.',
          alt: 'Page sommaire du UX/UI Playbook en français',
        },
        {
          id: 'landing',
          src: '/images/fr/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 24 · Landing page',
          title: 'Landing page : la promesse avant la beauté',
          caption: 'Maquette B2B cotée en 6 zones, hiérarchie du premier écran et erreurs qui tuent le clic.',
          alt: 'Page annotée sur la structure d’une landing page en français',
        },
        {
          id: 'checkout',
          src: '/images/fr/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 30 · Checkout',
          title: 'Checkout : l’écran le plus rentable du web',
          caption: 'Formulaire à gauche, récapitulatif collant à droite, total affiché dès la première seconde.',
          alt: 'Page annotée sur l’écran de paiement checkout en français',
        },
        {
          id: 'questions',
          src: '/images/fr/eight-questions.webp',
          category: 'screens',
          badge: 'p. 22 · Méthode',
          title: 'Les 8 questions avant de dessiner',
          caption: 'Le filtre qui évite de dessiner le bon écran pour le mauvais problème.',
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
          caption: 'Spinner sur page blanche (saut CLS) contre squelette à taille réelle (CLS ≤ 0,1).',
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
          caption: 'Identifiant stable, niveau (BLOQUANT / MAJEUR), plateforme cible et type de preuve.',
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
      kicker: 'ARCHITECTURE COMPLÈTE DE L’OFFRE',
      heading: '8 parties dans le livre, 12 fiches sur votre bureau, 21 fichiers dans votre repo.',
      lede: 'Explorez le sommaire exact de l’édition française (148 pages), le détail du kit imprimable et l’arborescence des fichiers techniques inclus.',
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
            'Pourquoi l’UX n’est pas de la décoration',
            'UX, UI, produit : qui décide quoi',
            'Les 10 lois qui expliquent la plupart des interfaces',
            'Charge cognitive : le vrai budget de vos écrans',
            'Le parcours : de l’intention à l’habitude',
            'La hiérarchie visuelle en 4 leviers & les 5 états de chaque écran',
            'Accessibilité : le niveau minimum vendable',
            'Anatomie d’un écran qui convertit & les 8 questions avant de dessiner',
          ],
        },
        {
          num: '02',
          title: 'Dix écrans, dix logiques',
          page: 'p. 23',
          sections: [
            'Landing page : la promesse avant la beauté',
            'Dashboard SaaS : la densité maîtrisée',
            'App mobile : un écran, un objectif',
            'Checkout : l’écran le plus rentable du web',
            'Page tarifs : guider le choix · Connexion et inscription',
            'États vides et onboarding · Paramètres et formulaires longs',
            'Tableaux et back-office · Réservation et prise de rendez-vous',
          ],
        },
        {
          num: '03',
          title: 'Le métier du pixel',
          page: 'p. 44',
          sections: [
            'Typographie : une échelle, deux familles, zéro hasard',
            'Couleur : un système, pas une palette',
            'Espacement : la base 8 qui change tout',
            'Grilles, breakpoints et responsive',
            'Tokens et composants : votre vrai livrable',
            'Iconographie, micro-copie et handoff développeur',
          ],
        },
        {
          num: '04',
          title: 'Du brief au livrable',
          page: 'p. 59',
          sections: [
            'Brief et recherche express : 2 heures bien investies',
            'Wireframes : décider en noir et blanc',
            'Du wireframe au visuel : dans quel ordre',
            'Prototype et tests : 5 personnes pour trouver, pas pour mesurer',
            'Audit d’interface en 20 minutes',
          ],
        },
        {
          num: '05',
          title: 'Le design comme revenu',
          page: 'p. 67',
          sections: [
            'Parler design sans jargon face à un décideur',
            'Portfolio : trois projets suffisent',
            'Fixer ses prix : trois modèles de facturation',
            'La proposition commerciale en 1 page',
            'Cadrer, livrer, survivre aux retours & facturer la maintenance',
          ],
        },
        {
          num: '06',
          title: 'Outils & workflow',
          page: 'p. 77',
          sections: [
            'La matrice : quel outil pour quelle phase (et quel modèle économique)',
            'L’arbre de décision pour trois budgets',
            'Formats de fichiers : ce que vous livrez, à qui',
            'Le pipeline : du brief.md au code vérifiable',
            'Trois prompts prêts à copier · Couleurs et dégradés précis',
            'Ce qui casse quand on délègue à un agent',
          ],
        },
        {
          num: '07',
          title: 'Preuves, droit et IA (avec 13 prototypes comparés)',
          page: 'p. 86',
          sections: [
            'Chercher avant de dessiner : 20 questions · Citer un chiffre sans mentir',
            'Mesurer l’interface : seuils réels, audit d’accessibilité & obligations 2026',
            'Vérifier un écran sorti d’une IA & patterns d’interface agentique',
            'Le fichier de contexte (AGENTS.md) : ce qui doit y être',
            'Dark mode (un mode de vos tokens, pas un filtre), motion & RTL',
            '13 prototypes Avant/Après : paiement, contraste, tableaux, états, cibles tactiles, chargement',
          ],
        },
        {
          num: '08',
          title: 'Plateformes et boîte à outils (6 OS + 77 règles)',
          page: 'p. 116',
          sections: [
            'Android, iOS, Windows, macOS, GNOME, KDE et Web à encoche comparés',
            'La checklist agent, et ce qu’elle change',
            'Trois statuts, jamais un quatrième · La preuve par plateforme',
            'Annexes A1–A6 : audit 40 points, brief, handoff, barèmes et protocoles',
            'Annexes A14–A17 : les 77 règles complètes (règles A à L)',
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
        { num: '05', title: 'Proposition en une page', meta: 'Vendre sans roman', page: 'p. 10' },
        { num: '06', title: 'Contrôle final — 12 points', meta: 'Avant envoi', page: 'p. 12' },
        { num: '07', title: 'Grille de vérification — écran IA', meta: '8 + 4 points critiques', page: 'p. 14' },
        { num: '08', title: 'Checklist agent — 77 règles', meta: 'Six plateformes', page: 'p. 16' },
        { num: '09', title: 'Brief à coller pour un agent', meta: 'Prompt structuré', page: 'p. 18' },
        { num: '10', title: 'Rapport d’agent — trois statuts', meta: 'Modèle de preuve', page: 'p. 20' },
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
            { name: 'SKILL.md & AGENTS.md', info: 'Skill prêt à brancher dans Claude Code, Cursor ou Codex' },
            { name: 'test/bad.html & clean.html', info: 'Écrans témoins pour vérifier le scanner immédiatement' },
          ],
        },
        {
          folder: 'tokens/',
          desc: 'Fondations visuelles prêtes à importer',
          files: [
            { name: 'tokens.css', info: 'Variables CSS (échelle typo, grille 4/8, surfaces OLED & clair)' },
            { name: 'tokens.json', info: "Tokens structurés à adapter à vos outils et à votre pipeline" },
          ],
        },
        {
          folder: 'templates/',
          desc: 'Gabarits éditables pour vos missions',
          files: [
            { name: 'brief-client-12q.md', info: 'Questionnaire de cadrage express en 2 heures' },
            { name: 'proposition-1-page.md', info: 'Structure d’offre chiffrée à 3 options' },
            { name: 'handoff-spec.md & audit-40.md', info: 'Livrables de passation et de revue d’interface' },
          ],
        },
      ],
    },
    comparison: {
      kicker: 'POSITIONNEMENT CLAIR',
      heading: "Ce qui se lit dans le manuel. Ce qui s’utilise dans le kit.",
      lede:
        "Voici la répartition des livrables de cette offre, sans comparaison invérifiable avec d’autres livres. Le PDF, le kit et l’archive sont livrés ensemble pour 29 USD.",
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
          feature: 'Design tokens prêts à brancher (CSS & JSON, Dark + Light)',
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
      heading: 'Ce que ce livre fait — et ce qu’il refuse de promettre.',
      yesTitle: 'C’est fait pour vous si',
      yesItems: [
        'Vous développez un SaaS ou une app seul ou en petite équipe, sans designer attitré.',
        'Vous générez du code avec Claude Code, Cursor, v0 ou Lovable et voulez dépasser le rendu « générique IA ».',
        'Vous devez présenter et défendre un écran devant un client, un associé ou un investisseur.',
        'Vous êtes freelance et voulez livrer des interfaces propres avec une méthode reproductible.',
        'Vous êtes designer et cherchez des seuils objectifs et sourcés plutôt que des débats d’opinion.',
      ],
      noTitle: 'Ce n’est pas pour vous si',
      noItems: [
        'Vous cherchez un cours universitaire d’histoire du design en 40 heures de vidéo.',
        'Vous attendez une promesse magique de conversion : aucune mise en page ne sauve une offre dont personne ne veut.',
        'Vous voulez un outil qui prétend tout valider à 100 % sans humain : ce qui exige un vrai œil reste marqué « À vérifier ».',
        'Vous cherchez un diplôme ou une certification officielle. Il n’y en a pas.',
      ],
    },
    author: {
      kicker: 'L’AUTEUR',
      heading: 'Qui a écrit ce manuel, et pourquoi il existe.',
      role: "Joy N. · Auteur du UX/UI Playbook et créateur de solutions numériques.",
      p1: "Joy N. transforme les décisions d’interface en fichiers réutilisables : tokens CSS/JSON, brief, handoff et règles pour agents IA. Le UX/UI Playbook rassemble cette méthode pour aider les développeurs à livrer au-delà du seul écran idéal.",
      p2: "La démarche sépare ce qui se mesure dans le code, ce qui exige le rendu réel et ce qui reste une hypothèse produit. Les sources, exemples annotés et limites de contrôle rendent les décisions discutables et vérifiables, sans diplôme ni gain de conversion promis.",
      signature: 'Joy N. · Édition française 2026',
    },
    faq: {
      kicker: 'QUESTIONS FRÉQUENTES',
      heading: 'Tout savoir avant de télécharger.',
      items: [
        {
          q: 'Que contient exactement le téléchargement à 29 $ ?',
          a: 'Trois éléments disponibles immédiatement après paiement : 1) le UX/UI Playbook complet en français (PDF A4 de 148 pages avec sommaire interactif), 2) le Kit Bonus de livraison (PDF A4 de 26 pages contenant 12 fiches pratiques et leurs pages de notes), et 3) l’archive ZIP des 21 fichiers de travail (design tokens CSS/JSON, 4 gabarits, les 77 règles en JSON, le script Python agent_check.py et le skill IA).',
        },
        {
          q: 'Avec quels outils IA fonctionnent la checklist et le skill ?',
          a: 'Avec tout agent capable de lire un fichier Markdown/JSON et d’exécuter Python 3 : Claude Code, Cursor, Windsurf, OpenAI Codex, GitHub Copilot, Cline, Aider, ou directement dans votre terminal et vos pipelines GitHub Actions / GitLab CI.',
        },
        {
          q: 'Faut-il savoir utiliser Figma ou être designer pour en profiter ?',
          a: 'Non. Le playbook a été pensé spécifiquement pour les profils techniques, builders et non-designers qui veulent des règles chiffrées (tailles, espacements 8 pt, ratios de contraste, états d’écran) applicables directement dans le code ou sur papier.',
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
          a: 'Vous disposez d’une garantie de remboursement simple sous 7 jours après l’achat. Un simple message à joynagassi@gmail.com suffit.',
        },
      ],
    },
    offer: {
      kicker: 'PASSER À L’ACTION',
      heading: 'L’écran est le produit. Faites-le tenir debout.',
      lede:
        'Arrêtez de deviner vos espacements, vos contrastes et vos parcours de paiement. Téléchargez le système complet en français et passez votre prochain écran au crible dès aujourd’hui.',
      includedTitle: 'Inclus instantanément dans l’édition française :',
      includedList: [
        'UX/UI Playbook 2026 — PDF A4 de 148 pages (97 sections, 36 écrans annotés)',
        'Kit Bonus Imprimable — PDF A4 de 26 pages (12 fiches d’atelier & notes)',
        'Scanner Python agent_check.py + base JSON des 77 règles (6 plateformes)',
        'Skill IA (SKILL.md + AGENTS.md) pour Claude Code, Cursor & Codex',
        'Design Tokens prêts à l’emploi (CSS & JSON) + 4 gabarits clients',
        'Licence d’utilisation commerciale sur vos projets & missions clients',
      ],
      priceDisplay: '29 $',
      priceSub: 'USD · paiement unique · 0 abonnement (ou prix libre supérieur)',
      buyBtn: 'Obtenir l’édition française · 29 $',
      licenseNote:
        'Lisible sur ordinateur, tablette, mobile et liseuse, ou imprimable en A4. Paiement sécurisé via Gumroad (Carte bancaire, Apple Pay, Google Pay, PayPal).',
      guarantees: ['Téléchargement immédiat', 'Remboursé sous 7 jours', 'Paiement sécurisé Gumroad'],
      crosslinkTag: 'VOUS TRAVAILLEZ EN ANGLAIS ?',
      crosslinkText:
        'La même exigence existe dans une édition anglaise dédiée (139 pages, kit A4 et 21 fichiers intégralement en anglais).',
      crosslinkBtn: 'Voir l’édition anglaise (EN)',
    },
    footer: {
      copyright: '© 2026 UX/UI Playbook · Édition 2026 par Joy N.',
      license:
        'Usage commercial autorisé sur vos propres projets et ceux de vos clients. La revente ou redistribution des fichiers est interdite. La TVA éventuelle est gérée par Gumroad en tant que revendeur officiel.',
      gumroadLinkLabel: 'Boutique française (Gumroad)',
      otherEditionLabel: 'English edition',
      builtWithRule: "Contrôles du site rejouables dans le dépôt ; mesures automatiques et revue humaine distinguées.",
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
        'You wrote the app. Then somebody opened it. 139 pages, 77 rules an AI agent can check, 12 printable A4 sheets and 21 working files.',
      ogImage: `${SITE_URL}/og-en.jpg`,
      ogLocale: 'en_US',
      productName: 'UX/UI Playbook 2026 + Bonus Kit (English Edition)',
    },
    skipToContent: 'Skip to main content',
    topBar: {
      badge: '2026 ENGLISH EDITION · INSTANT DOWNLOAD (PDF + BONUS KIT + AI SKILL)',
      audienceHint: 'Book, sheets & runnable checklist 100% in English',
      cta: 'Get the Playbook — $29',
    },
    nav: {
      pillars: '3-in-1 System',
      demo: 'Live Checklist',
      inside: 'Inside Pages',
      contents: 'Contents',
      guides: 'Free Guides',
      faq: 'FAQ',
      buy: 'Buy — $29',
      themeDarkLabel: 'Switch to light mode',
      themeLightLabel: 'Switch to pure OLED dark mode',
      switchLangTitle: 'Voir l’édition française (148 pages)',
    },
    hero: {
      kicker: 'FOR DEVELOPERS, AI BUILDERS & NON-DESIGNERS',
      titleBefore: 'You wrote the app. Then somebody ',
      titleAccent: 'opened',
      titleAfter: ' it.',
      lede:
        'Three seconds on the first screen, and the question lands: where do I click? The code was fine. The screen was not. This playbook hands you the visual rules, the 12 client sheets, and the runnable Python checklist your AI coding agent uses to ship professional UI.',
      primaryCta: 'Get the English edition · $29',
      secondaryCta: 'Read 10 sample pages',
      note: 'One-time payment ($29 USD). The 139-page PDF, the 26-page printable kit and all 21 working files, the second you buy.',
      proofs: [
        '139 A4 pages in English',
        "77 rules: automated + human checks",
        '12 sheets + 21 files & AI Skill',
        '7-day refund guarantee',
      ],
      coverCaption: 'EN Edition · 139 pages',
      spreadCaption: '1 page = 1 mockup + 1 rule',
    },
    strip: [
      { num: '139', label: 'pages in English, one section per page' },
      { num: '36', label: "annotated screens + 13 before/after prototypes + 11 platform spreads" },
      { num: '77', label: "rules across 6 platforms, with verification methods" },
      { num: '21', label: 'working files: tokens, Python scanner & AI skill' },
    ],
    pillars: {
      kicker: 'MORE THAN AN EBOOK: AN EXECUTION SYSTEM',
      heading: 'Three operational layers in one download.',
      lede:
        "UX/UI Playbook is a UX, UI and Product Design manual by Joy N., paired with a delivery kit and coding-agent tools. It is for developers, freelancers and teams who want to document decisions and check their interfaces.",
      cards: [
        {
          tag: '01 · LEARN',
          title: 'The Visual Playbook (139 p.)',
          subtitle: "97 sections · 36 annotated screens · 13 before/after + 11 platform spreads",
          points: [
            'One rule per page: the principle, a measured mockup, what breaks it, and space for notes.',
            'Ten core screen territories dissected: landing page, SaaS dashboard, checkout, mobile, pricing, admin tables.',
            'Type scale, colour tokens, 8-pt spacing, sellable accessibility, and native rules for 6 platforms.',
          ],
        },
        {
          tag: '02 · SHIP & BILL',
          title: 'The Pro Kit & Design Tokens',
          subtitle: '26-page A4 Bonus Kit (12 sheets) + templates + CSS/JSON',
          points: [
            '12 printable A4 working sheets, each paired with a 26-line ruled notes page for live reviews.',
            'Ready-to-copy templates: 12-question brief, one-page proposal, dev handoff spec, 40-point UX audit.',
            'Production design tokens (CSS variables & JSON) calibrated for both dark mode and light mode.',
          ],
        },
        {
          tag: '03 · ENFORCE WITH AI',
          title: 'Runnable Checklist & AI Skill',
          subtitle: 'agent_check.py · 77 rules · Claude Code, Cursor, Codex, CI',
          points: [
            'A Python scanner that parses your HTML/CSS, settles what can be measured in source, and returns an exit code.',
            "Three statuses: Automated, To verify, Not applicable. Severity (Blocking, Major) and outcome are separate fields.",
            'Ready-to-drop AGENTS.md and SKILL.md files so coding agents apply objective UI rules before handing back code.',
          ],
        },
      ],
    },
    agentDemo: {
      kicker: "INTERACTIVE DEMO · ILLUSTRATIVE REPORT",
      heading: "Before / after: understand what a check proves.",
      lede:
        "This comparison simulates a check report: no Python script runs in this page. Copy the command to run agent_check.py on the archive’s sample files, then separate automated outcomes from human review. This diagram stays readable: the numeric defects describe the sample files, not this page’s font sizes or colours.",
      bullets: [
        {
          bold: 'Usable in CI/CD:',
          rest: 'passing --fail-on blocking stops a build or PR the moment a measurable threshold (contrast, font < 12 px, missing H1) fails.',
        },
        {
          bold: 'Three statuses, never a fourth:',
          rest: "Automated / To verify / Not applicable describe verification. An automated rule can fail; Blocking is severity, not a fourth status.",
        },
        {
          bold: 'Ships with test fixtures:',
          rest: 'point it at test/bad.html in the archive and it exits 1; point it at test/clean.html and it exits 0.',
        },
      ],
      tabBad: '1. Raw AI Screen (bad.html)',
      tabClean: '2. Fixed Screen (clean.html)',
      fixAction: 'Apply Playbook rules →',
      fixedBadge: "Corrected example · human review still required",
      copyCmd: 'Copy CLI command',
      copiedCmd: 'Command copied!',
      screenHeaderBad: 'BEFORE · 6 fields · 2 equal buttons · 4 blocking failures',
      screenHeaderClean: "AFTER · useful fields · 1 primary action · corrected example",
      screenMock: {
        brand: 'NORTH STUDIO · CHECKOUT',
        stepLabel: 'Cart ✓  →  Shipping  →  Payment',
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
      kicker: 'WHAT ACTUALLY BREAKS IN PRODUCTION',
      heading: 'A screen is not finished when it looks right in a screenshot.',
      lede:
        'It is finished when it still holds with nothing, with too much, and with a failure. That is where users and paying clients lose confidence — and it is almost never a matter of artistic taste.',
      cards: [
        {
          tag: 'EMPTY STATE',
          title: 'Nothing to show on day one',
          desc: 'An empty table that says nothing reads as a broken app. One clear sentence, sample data or a single primary action turns silence into onboarding.',
        },
        {
          tag: 'LOADING · CLS = 0',
          title: 'Something is happening',
          desc: 'Silence for 400 ms after a click reads as a dead button. A skeleton sized to the final content holds the layout space so nothing jumps when data lands.',
        },
        {
          tag: 'CRITICAL ERROR · PAYMENT',
          title: 'The card was declined',
          desc: 'The one screen state that directly costs revenue. It needs the exact cause, the immediate next step, preserved inputs, and zero blame.',
          hot: true,
        },
      ],
    },
    insideSection: {
      kicker: 'LOOK INSIDE THE ENGLISH EDITION',
      heading: 'Ten real pages taken straight from the book and kit, unstaged.',
      lede:
        'These are real pages at reading clarity. Click any page below to open the fullscreen sample reader and judge the precision for yourself before buying.',
      openReaderBtn: 'Open fullscreen reader (10 pages)',
      filterAll: 'All pages (10)',
      filterScreens: 'Annotated screens',
      filterBeforeAfter: 'Before / After',
      filterSystem: 'Checklist & Bonus Kit',
      clickHint: 'Click to inspect',
      note: 'Written in crisp English: a single 139-page A4 PDF with clickable bookmarks, paired with the 26-page printable Bonus Kit and the 21-file ZIP archive.',
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
          caption: '8 numbered parts and 97 sections: from cognitive load to verifiable code.',
          alt: 'Contents page of the UX/UI Playbook in English',
        },
        {
          id: 'landing',
          src: '/images/en/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 23 · Landing page',
          title: 'Landing page: the promise before the beauty',
          caption: 'Six-zone B2B structure, above-the-fold hierarchy, and the mistakes that kill clicks.',
          alt: 'Annotated landing page blueprint from the playbook',
        },
        {
          id: 'checkout',
          src: '/images/en/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 29 · Checkout',
          title: 'Checkout: the most profitable screen on the web',
          caption: 'Single-page checkout: form on the left, persistent total on the right, zero surprise fees.',
          alt: 'Annotated checkout screen page from the playbook',
        },
        {
          id: 'questions',
          src: '/images/en/eight-questions.webp',
          category: 'screens',
          badge: 'p. 21 · Foundations',
          title: 'The 8 questions before you draw',
          caption: 'The pre-flight check that stops you from designing a clean screen for the wrong problem.',
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
          caption: 'Centred spinner on a blank page (layout shift) vs. space-holding skeleton (CLS ≤ 0.1).',
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
          caption: 'Stable rule ID, severity (BLOCKING / MAJOR), target platform, and required proof.',
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
      kicker: 'COMPLETE PACKAGE ARCHITECTURE',
      heading: '8 parts in the book, 12 sheets on your desk, 21 files in your repo.',
      lede: 'Browse every part of the 139-page English playbook, the 12 printable A4 working sheets, and the exact technical files inside the ZIP archive.',
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
            'Why UX is not decoration',
            'UX, UI, product: who decides what',
            'The 10 laws behind most interfaces',
            'Cognitive load: the real budget of a screen',
            'The journey: from intent to habit',
            'Visual hierarchy in 4 levers & the 5 states of every screen',
            'Accessibility: the minimum sellable level',
            'Anatomy of a screen that converts & the 8 questions before you draw',
          ],
        },
        {
          num: '02',
          title: 'Ten screens, ten logics',
          page: 'p. 22',
          sections: [
            'Landing page: the promise before the beauty',
            'SaaS dashboard: controlled density',
            'Mobile app: one screen, one objective',
            'Checkout: the most profitable screen on the web',
            'Pricing page: guide the choice · Login and sign-up',
            'Empty states and onboarding · Settings and long forms',
            'Tables and back office · Booking and appointments',
          ],
        },
        {
          num: '03',
          title: 'The craft of the pixel',
          page: 'p. 40',
          sections: [
            'Typography: one scale, two families, zero chance',
            'Colour: a system, not a palette',
            'Spacing: the 8-point base that changes everything',
            'Grids, breakpoints and responsive',
            'Tokens and components: your real deliverable',
            'Iconography, micro-copy and developer handoff',
          ],
        },
        {
          num: '04',
          title: 'From brief to deliverable',
          page: 'p. 54',
          sections: [
            'Brief and express research: 2 hours well spent',
            'Wireframes: decide in black and white',
            'From wireframe to visual: in what order',
            'Prototyping and testing: 5 people to find, not to measure',
            '20-minute interface audit',
          ],
        },
        {
          num: '05',
          title: 'Design as revenue',
          page: 'p. 62',
          sections: [
            'Talking design without jargon',
            'Portfolio: three projects are enough',
            'Setting your price: three billing models',
            'The one-page proposal',
            'Scope, deliver, survive feedback & bill recurring maintenance',
          ],
        },
        {
          num: '06',
          title: 'Tools & workflow',
          page: 'p. 70',
          sections: [
            'The phase → tool matrix, with business models',
            'The decision tree for three budgets',
            'File formats: what you hand over, to whom',
            'The pipeline: from brief.md to verifiable code',
            'Three prompts ready to copy · Choosing colours and gradients with precision',
            'What breaks when you delegate to an agent',
          ],
        },
        {
          num: '07',
          title: 'Evidence, law and AI (with 13 side-by-side prototypes)',
          page: 'p. 78',
          sections: [
            'Research before you draw: 20 questions · Citing a number without lying',
            'Measuring the interface: real thresholds, accessibility audits & 2026 mandates',
            'Verifying an AI-generated screen & agentic interface patterns',
            'The context file (AGENTS.md): what belongs in it',
            'Dark mode (a mode of your tokens, not a filter), motion & RTL',
            '13 Before/After prototypes: checkout, contrast, tables, states, touch targets, loading',
          ],
        },
        {
          num: '08',
          title: 'Platforms and toolbox (6 OS + 77 rules)',
          page: 'p. 107',
          sections: [
            'Android, iOS, Windows, macOS, GNOME, KDE and notched Web compared',
            'The agent checklist, and what it changes',
            'Three statuses, never a fourth · Proof, platform by platform',
            'Appendices A1–A6: 40-point audit, brief, handoff, scales and protocols',
            'Appendices A14–A17: all 77 checklist rules (rules A to L)',
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
        { num: '05', title: 'One-page proposal', meta: 'Pitch & price cleanly', page: 'p. 10' },
        { num: '06', title: 'Final check — 12 points', meta: 'Pre-delivery gate', page: 'p. 12' },
        { num: '07', title: 'Verification grid — AI screen', meta: '8 + 4 critical checks', page: 'p. 14' },
        { num: '08', title: 'Agent checklist — 77 rules', meta: 'Six platforms', page: 'p. 16' },
        { num: '09', title: 'Brief to paste to an agent', meta: 'Structured prompt', page: 'p. 18' },
        { num: '10', title: 'Agent report — three statuses', meta: 'Evidence template', page: 'p. 20' },
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
            { name: 'SKILL.md & AGENTS.md', info: 'Drop-in skill for Claude Code, Cursor, Windsurf or Codex' },
            { name: 'test/bad.html & clean.html', info: 'Reference screens to test the scanner in 5 seconds' },
          ],
        },
        {
          folder: 'tokens/',
          desc: 'Production visual foundations',
          files: [
            { name: 'tokens.css', info: 'CSS custom properties (type scale, 4/8 spacing, dark & light tokens)' },
            { name: 'tokens.json', info: "Structured tokens to adapt to your tools and pipeline" },
          ],
        },
        {
          folder: 'templates/',
          desc: 'Editable client & product templates',
          files: [
            { name: 'brief-12q.md', info: '2-hour express discovery questionnaire' },
            { name: 'one-page-proposal.md', info: '3-option pricing & scope template' },
            { name: 'handoff-spec.md & audit-40.md', info: 'Developer handoff & 20-minute UI review sheets' },
          ],
        },
      ],
    },
    comparison: {
      kicker: 'CLEAR POSITIONING',
      heading: "What you read in the manual. What you use in the kit.",
      lede:
        "Here is how this offer’s deliverables are organised, without unverifiable comparisons to other books. The PDF, kit and archive are delivered together for $29 USD.",
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
          feature: 'Ready-to-import Design Tokens (CSS & JSON, Dark + Light)',
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
      heading: 'What this book delivers — and what it refuses to promise.',
      yesTitle: 'It is for you if',
      yesItems: [
        'You build a SaaS or app solo or in a small team, and design is not your day job.',
        'You ship code with Claude Code, Cursor, v0 or Lovable and want better than generic AI screens.',
        'You have to present and defend an interface to a client, co-founder or investor.',
        'You bill for development and want a repeatable system to ship clean, trustworthy UI.',
        'You are a designer who prefers measurable thresholds over subjective taste debates.',
      ],
      noTitle: 'It is not for you if',
      noItems: [
        'You want an academic design theory course in 12 chapters and 40 hours of video.',
        'You want a guaranteed conversion rate: no layout saves an offer nobody wants.',
        'You want fake automation that claims 100% certainty: human checks stay marked "To verify".',
        'You expect a certificate or diploma. There is none, and there will not be.',
      ],
    },
    author: {
      kicker: 'THE AUTHOR',
      heading: 'Who wrote this playbook, and why it exists.',
      role: "Joy N. · UX/UI Playbook author and digital product builder.",
      p1: "Joy N. turns interface decisions into reusable files: CSS/JSON tokens, briefs, handoffs and rules for AI agents. UX/UI Playbook brings this method together so developers can deliver more than a happy-path screen.",
      p2: "The method separates what can be measured in code, what needs a rendered check and what remains a product hypothesis. Sources, annotated examples and verification limits make decisions inspectable without promising a qualification or conversion uplift.",
      signature: 'Joy N. · 2026 English Edition',
    },
    faq: {
      kicker: 'FREQUENTLY ASKED QUESTIONS',
      heading: 'Everything you need to know before downloading.',
      items: [
        {
          q: 'What exact files do I get right after paying $29?',
          a: 'Three instant downloads: 1) the complete UX/UI Playbook 2026 in English (139-page A4 PDF with clickable contents and bookmarks), 2) the Printable Delivery Bonus Kit (26-page A4 PDF with 12 working sheets + ruled note pages), and 3) the 21-file ZIP archive (CSS/JSON design tokens, 4 markdown templates, 77 rules as JSON, the runnable Python scanner agent_check.py, and the AI agent skill).',
        },
        {
          q: 'Which AI coding tools work with the checklist and skill?',
          a: 'Any coding agent that reads Markdown/JSON context files and runs Python 3: Claude Code, Cursor, Windsurf, OpenAI Codex, GitHub Copilot, Cline, Aider — as well as standard GitHub Actions or GitLab CI pipelines.',
        },
        {
          q: 'Do I need Figma experience or a design background?',
          a: 'No. Every rule is expressed in concrete numbers and decisions (px floors, 8-pt spacing, contrast ratios, empty/loading/error states) that you can apply directly in HTML/CSS/React/Tailwind or on paper.',
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
          a: 'If the playbook does not earn its keep on your very first screen review, email joynagassi@gmail.com within 7 days of purchase for a straightforward refund.',
        },
      ],
    },
    offer: {
      kicker: 'SHIP SCREENS THAT HOLD UP',
      heading: 'The screen is the product. Make it hold.',
      lede:
        'Stop guessing your spacing, contrast, and checkout flows. Download the complete English edition and run the 77-rule check on your own interface today.',
      includedTitle: 'Included immediately in the English edition:',
      includedList: [
        'UX/UI Playbook 2026 — 139-page A4 PDF (97 sections, 36 annotated screens)',
        'Printable Bonus Kit — 26-page A4 PDF (12 working sheets & note pages)',
        'Runnable Python scanner agent_check.py + 77-rule JSON dataset (6 platforms)',
        'AI Agent Skill (SKILL.md + AGENTS.md) for Claude Code, Cursor & Codex',
        'Production Design Tokens (CSS & JSON) + 4 client & handoff templates',
        'Commercial license for unlimited personal & client projects',
      ],
      priceDisplay: '$29',
      priceSub: 'USD · one-time payment · zero subscription (pay more if you choose)',
      buyBtn: 'Get the English edition · $29',
      licenseNote:
        'Reads cleanly on desktop, tablet, phone and e-reader, and prints sharp on A4. Secure checkout via Gumroad (Card, Apple Pay, Google Pay, PayPal).',
      guarantees: ['Instant download', '7-day refund policy', 'Secure Gumroad checkout'],
      crosslinkTag: 'WORKING IN FRENCH?',
      crosslinkText:
        'A dedicated French edition is available separately: 148 pages, the 12-sheet A4 kit and all 21 working files written entirely in French.',
      crosslinkBtn: 'See the French edition (FR)',
    },
    footer: {
      copyright: '© 2026 UX/UI Playbook · 2026 edition by Joy N.',
      license:
        'Commercial use permitted on your own projects and your clients’. Resale or redistribution of the files is not permitted. Applicable VAT is handled by Gumroad as seller of record.',
      gumroadLinkLabel: 'English store (Gumroad)',
      otherEditionLabel: 'Édition française',
      builtWithRule: "Reproducible site checks in the repository; automated measurements and human review kept separate.",
    },
  },
};
