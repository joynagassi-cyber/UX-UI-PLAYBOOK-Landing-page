import { SITE_URL } from '@/lib/site-config';
import { PLAYBOOK_COUNTS, playbookPages } from '@/lib/playbook-edition';

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
    freeDirectory: string;
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
    illustrationLabel: string;
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
    previewLabel: string;
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
      title: `UX/UI Playbook 2026 · ${playbookPages('fr')} pages, 120 sections · FR`,
      description:
        `120 sections, ${playbookPages('fr')} pages et un lexique de 56 composants. Manuel UX/UI, kit de 12 fiches A4 et 21 fichiers en français. Paiement unique : 29 USD.`,
      ogTitle: 'UX/UI Playbook 2026 · Édition française',
      ogDescription:
        `${playbookPages('fr')} pages, 120 sections et 56 entrées de lexique. Kit de 26 pages et archive de 21 fichiers en français. 29 USD, paiement unique.`,
      ogImage: `${SITE_URL}/og-fr.jpg`,
      ogLocale: 'fr_FR',
      productName: 'UX/UI Playbook 2026 + Kit bonus (Édition française)',
    },
    skipToContent: 'Aller au contenu principal',
    topBar: {
      badge: "ÉDITION FRANÇAISE 2026 · PDF, KIT A4 ET FICHIERS",
      audienceHint: "Manuel, fiches et instructions en français",
      cta: 'Obtenir le Playbook · 29 $',
    },
    nav: {
      pillars: "Livre et fichiers",
      demo: "Démo du contrôle",
      inside: 'Extraits du livre',
      contents: 'Sommaire',
      guides: 'Articles',
      freeDirectory: 'Répertoire gratuit',
      faq: 'FAQ',
      buy: 'Acheter · 29 $',
      themeDarkLabel: 'Passer en mode clair',
      themeLightLabel: 'Passer en mode sombre',
      switchLangTitle: `Switch to the English edition (${playbookPages('en')} pages)`,
    },
    hero: {
      kicker: "UX, UI ET PRODUCT DESIGN POUR LES DÉVELOPPEURS",
      titleBefore: "Concevoir et vérifier ",
      titleAccent: "vos interfaces",
      titleAfter: '.',
      lede:
        "Le UX/UI Playbook de Joy N. accompagne la conception d’une interface, depuis la définition du parcours jusqu’aux états d’erreur et à la passation. Le manuel explique les choix de typographie, de couleur et d’espacement avec des écrans annotés. Les fiches A4 servent à préparer un brief ou une revue ; les tokens et le scanner Python permettent ensuite de reprendre certaines décisions dans le code. Les points qui demandent une observation du rendu ou un essai avec des utilisateurs restent à vérifier.",
      primaryCta: 'Obtenir l’édition française · 29 $',
      secondaryCta: 'Feuilleter les 10 extraits',
      note: `29 USD, paiement unique. Téléchargement après achat : PDF français de ${playbookPages('fr')} pages, kit A4 de 26 pages et archive de 21 fichiers.`,
      proofs: [
        `${playbookPages('fr')} pages A4 en français`,
        "77 règles : contrôles auto + humains",
        '12 fiches + 21 fichiers & Skill IA',
        'Demande de remboursement sous 7 jours',
      ],
      coverCaption: `Édition FR · ${playbookPages('fr')} pages`,
      spreadCaption: "Exemples annotés et consignes de revue",
    },
    strip: [
      { num: String(playbookPages('fr')), label: "pages dans le manuel français" },
      { num: String(PLAYBOOK_COUNTS.sections), label: "sections réparties en neuf parties, dont le lexique des composants" },
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
          title: `Le manuel visuel · ${playbookPages('fr')} pages`,
          subtitle: "120 sections · 9 parties · lexique de 56 composants · 24 comparaisons",
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
            "Quatre gabarits éditables : brief client, passation développeur, audit de 40 points et journal de preuves. La proposition en une page figure dans le kit PDF.",
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
      kicker: "DÉMONSTRATION · RÉSULTATS DES FICHIERS TÉMOINS",
      heading: "Comparer un fichier en échec et un exemple corrigé.",
      lede:
        'Aucun script Python ne s’exécute dans cette page. À gauche, une maquette de paiement illustre des décisions à examiner. À droite, les résumés de rapports viennent des contrôles des fichiers test/bad.html et test/good.html de l’archive, pas de cette maquette. Ouvrez un terminal dans checklist-agent/ et copiez la commande pour reproduire le contrôle des fichiers témoins.',
      bullets: [
        { bold: 'Une commande reproductible :', rest: 'avec --platform web, 57 des 77 règles entrent dans le périmètre. Le script examine 9 lignes sur bad.html et 8 sur good.html ; les autres restent à vérifier.' },
        { bold: 'Un code de sortie pour la CI :', rest: '--fail-on blocking renvoie 1 pour bad.html, qui présente sept échecs bloquants, et 0 pour good.html. Ce résultat ne certifie ni le rendu ni l’accessibilité.' },
        { bold: 'Méthode, sévérité et résultat :', rest: 'Automatisé / À vérifier décrivent le contrôle. Bloquant / Majeur décrivent la sévérité. Réussi / Échec sont les résultats ; une ligne peut aussi rester informative.' },
      ],
      tabBad: "1. Fichier témoin bad.html",
      tabClean: '2. Fichier témoin good.html',
      fixAction: "Afficher l’exemple corrigé",
      fixedBadge: "Exemple corrigé · revue humaine toujours requise",
      copyCmd: 'Copier la commande',
      copiedCmd: 'Commande copiée !',
      illustrationLabel: 'MAQUETTE',
      screenHeaderBad: 'ILLUSTRATION · AVANT',
      screenHeaderClean: 'ILLUSTRATION · APRÈS',
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
          { code: 'C01 · REVUE', text: 'Vérifier les petites tailles de texte dans le rendu réel' },
          { code: 'B01 · REVUE', text: 'Mesurer les contrastes sur chaque surface et dans chaque état' },
          { code: 'A06 · REVUE', text: 'Deux boutons pleins de même poids : clarifier l’action principale' },
          { code: 'K03 · REVUE', text: 'Rendre le total et les frais consultables avant l’engagement' },
        ],
        improvements: [
          { code: 'C01 · À VÉRIFIER', text: 'Examiner les tailles de texte avec le zoom et sur téléphone' },
          { code: 'B01 · À VÉRIFIER', text: 'Mesurer texte, fond, focus et états dans le projet' },
          { code: 'A06 · À VÉRIFIER', text: 'Action primaire distincte ; observer la compréhension' },
          { code: 'K03 · À VÉRIFIER', text: 'Total et frais visibles ; essayer le parcours complet' },
        ],
      },
      terminal: {
        cmdBad:
          'python3 agent_check.py --target test/bad.html \\\n    --platform web --lang fr --fail-on blocking',
        cmdClean:
          'python3 agent_check.py --target test/good.html \\\n    --platform web --lang fr --fail-on blocking',
        linesBad: [
          { type: 'c', text: 'Résumé d’exécution · test/bad.html · périmètre web' },
          { type: 'r', text: 'G01 · BLOQUANT · échec : attribut lang absent' },
          { type: 'r', text: 'H02 · BLOQUANT · échec : image sans alt' },
          { type: 'r', text: 'F01 · BLOQUANT · échec : champ sans id ni aria-label' },
          { type: 'r', text: 'I03 · BLOQUANT · échec : réduction du mouvement absente' },
          { type: 'w', text: 'Contraste, cibles et clavier : revue du rendu requise' },
          { type: 'c', text: '9 lignes automatiques : 8 échecs, 1 information' },
          { type: 'r', text: '7 échecs bloquants, 1 majeur · sortie 1' },
        ],
        linesClean: [
          { type: 'c', text: 'Résumé d’exécution · test/good.html · périmètre web' },
          { type: 'g', text: 'G01 · réussi : lang="en" sur le fichier témoin' },
          { type: 'g', text: 'H02 · réussi : attribut alt présent sur l’image' },
          { type: 'g', text: 'F01 · réussi : point d’accroche du libellé présent' },
          { type: 'g', text: 'I03 · réussi : prefers-reduced-motion présent' },
          { type: 'w', text: 'Contraste, cibles et clavier : revue du rendu requise' },
          { type: 'g', text: '8 lignes automatiques, aucun échec signalé' },
          { type: 'c', text: '49 règles web restent à vérifier · sortie 0 ≠ conformité' },
        ],
        statusBlocking: 'Bloquants',
        statusAutomated: "Automatisés",
        statusToVerify: 'À vérifier',
        statusNotApplicable: 'Hors périmètre web',
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
        "Ouvrez les pages en grand pour lire les annotations et examiner les exemples avant l’achat. La sélection comprend le sommaire, le lexique des composants, une page de sources, des écrans de paiement, des comparaisons et une page de la checklist. Les filtres séparent les écrans annotés, les avant/après et les pages du système.",
      openReaderBtn: 'Ouvrir la liseuse plein écran (10 pages)',
      filterAll: 'Tout voir (10)',
      filterScreens: 'Écrans annotés',
      filterBeforeAfter: 'Avant / Après',
      filterSystem: 'Checklist & Kit Bonus',
      previewLabel: 'Extrait du livre',
      clickHint: 'Cliquer pour zoomer',
      note: `L’édition française contient un PDF de ${playbookPages('fr')} pages avec signets cliquables, le kit A4 séparé de 26 pages et l’archive de 21 fichiers. Les pages présentées ici sont des extraits de ces documents.`,
      readerClose: 'Fermer',
      readerPrev: 'Page précédente',
      readerNext: 'Page suivante',
      readerBuy: `Obtenir les ${playbookPages('fr')} pages · 29 $`,
      pages: [
        {
          id: 'cover',
          src: '/images/fr/cover.webp',
          category: 'system',
          badge: 'Couverture FR',
          title: 'Couverture · Édition française 2026',
          caption: `${playbookPages('fr')} pages et 120 sections. Neuf parties, dont le lexique des composants et les comparaisons de plateformes.`,
          alt: 'Couverture française du UX/UI Playbook 2026 par Joy N.',
        },
        {
          id: 'contents',
          src: '/images/fr/contents.webp',
          category: 'system',
          badge: 'p. 04 · Sommaire',
          title: 'Sommaire : première page',
          caption: "Neuf parties et 120 sections : parcours, conception visuelle, livraison, plateformes et outils.",
          alt: 'Page sommaire du UX/UI Playbook en français',
        },
        {
          id: 'landing',
          src: '/images/fr/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 30 · Landing page',
          title: "Structure d’une landing page",
          caption: "Maquette B2B annotée en six zones : ordre de lecture, contenu du premier écran et place de l’action.",
          alt: 'Page annotée sur la structure d’une landing page en français',
        },
        {
          id: 'checkout',
          src: '/images/fr/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 36 · Checkout',
          title: "Organisation d’un écran de paiement",
          caption: "Exemple avec formulaire à gauche et récapitulatif à droite pour garder le total consultable.",
          alt: 'Page annotée sur l’écran de paiement checkout en français',
        },
        {
          id: 'evidence',
          src: '/images/fr/evidence-sources.webp',
          category: 'screens',
          badge: 'p. 26 · Sources',
          title: 'Ce que les chiffres disent vraiment',
          caption: "Section X, repère 09b : attention et abandon de panier, avec la source et la date sous les chiffres. La section se poursuit p. 27.",
          alt: 'Extrait de la section X, Ce que les chiffres disent vraiment, p. 26 du PDF français',
        },
        {
          id: 'sbs-checkout',
          src: '/images/fr/before-after-checkout.webp',
          category: 'before-after',
          badge: 'p. 96 · Avant / Après',
          title: 'Prototype comparé : le paiement',
          caption: '6 champs et 2 boutons égaux contre 4 champs, Apple Pay en tête et 1 action claire.',
          alt: 'Comparaison avant et après d’un écran de paiement en français',
        },
        {
          id: 'sbs-loading',
          src: '/images/fr/before-after-loading.webp',
          category: 'before-after',
          badge: 'p. 120 · Avant / Après',
          title: 'Prototype comparé : le chargement',
          caption: "Comparaison d’une attente sur page vide et d’un squelette qui réserve l’espace du contenu.",
          alt: 'Comparaison avant et après de l’état de chargement en français',
        },
        {
          id: 'lexicon',
          src: '/images/fr/component-lexicon.webp',
          category: 'screens',
          badge: 'p. 127 · Lexique',
          title: 'Nommer les composants web',
          caption: 'Section LXXVI, repère L3 : barre latérale, onglets, menu déroulant et bouton, avec exemples de consignes.',
          alt: 'Lexique des composants web, section LXXVI, p. 127 du PDF français',
        },
        {
          id: 'checklist',
          src: '/images/fr/checklist-rules.webp',
          category: 'system',
          badge: 'p. 174 · Checklist',
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
      lede: `Les neuf parties ci-dessous regroupent les sujets du manuel français de ${playbookPages('fr')} pages. Les deux autres onglets présentent les douze fiches imprimables et une sélection des fichiers techniques de l’archive. Les repères indiquent la page d’ouverture de chaque partie dans le PDF. Les listes résument les thèmes, pas les 120 titres de section.`,
      tabBook: 'Le Livre (9 parties · 120 sections)',
      tabKit: 'Le Kit Bonus (12 fiches A4)',
      tabArchive: 'L’Archive Technique (21 fichiers)',
      expandAll: 'Tout déplier',
      collapseAll: 'Tout replier',
      parts: [
        {
          num: "01",
          title: "Comprendre avant de dessiner",
          page: "p. 10",
          sections: [
            "Objectifs utilisateurs et répartition des décisions UX, UI et produit",
            "Lois cognitives, parcours et hiérarchie visuelle",
            "États d’écran et accessibilité : référentiels et périmètre",
            "Anatomie d’un écran et huit questions de cadrage",
            "Section X (repère 09b) : Ce que les chiffres disent vraiment",
          ],
        },
        {
          num: "02",
          title: "Dix écrans, dix logiques",
          page: "p. 29",
          sections: [
            "Landing page, tableau de bord SaaS et application mobile",
            "Paiement et tarifs : formulaire, total et récapitulatif",
            "Connexion, inscription, états vides et première utilisation",
            "Paramètres, formulaires longs, tableaux et back-office",
            "Réservation et prise de rendez-vous",
          ],
        },
        {
          num: "03",
          title: "Le métier du pixel",
          page: "p. 50",
          sections: [
            "Typographie : échelle et familles",
            "Couleur, espacement et grille responsive",
            "Tokens et composants",
            "Iconographie et micro-copie",
            "Passation au développement",
          ],
        },
        {
          num: "04",
          title: "Du brief au livrable",
          page: "p. 66",
          sections: [
            "Brief et recherche : exemple de créneau de deux heures",
            "Wireframes : structure et ordre du contenu",
            "Passage à la présentation visuelle",
            "Prototypes et observation des usages",
            "Première passe d’audit de vingt minutes",
          ],
        },
        {
          num: "05",
          title: "Le design comme revenu",
          page: "p. 74",
          sections: [
            "Présenter une décision à un commanditaire",
            "Portfolio et description des projets",
            "Modèles de facturation et proposition en une page",
            "Périmètre, livraison et retours",
            "Design system et maintenance",
          ],
        },
        {
          num: "06",
          title: "Outils & workflow",
          page: "p. 85",
          sections: [
            "Outils par phase et choix selon le budget",
            "Formats de fichiers et destinataires",
            "Pipeline du brief à la revue du code",
            "Trois prompts, couleurs et dégradés",
            "Délégation à un agent et défauts à rechercher",
          ],
        },
        {
          num: "07",
          title: "Preuves, droit et IA",
          page: "p. 94",
          sections: [
            "Recherche, questions et attribution des chiffres",
            "Mesures, accessibilité et textes applicables en 2026",
            "Revue d’un écran généré et interfaces d’agents",
            "Instructions dans le fichier AGENTS.md",
            "Thèmes de couleur, mouvement et RTL",
            "Treize paires avant/après : paiement, contraste, tableaux, états, cibles et chargement",
          ],
        },
        {
          num: "08",
          title: "Lexique des composants",
          page: "p. 124",
          sections: [
            "22 sections, repères L1–L22 et numéros romains LXXIV–XCV",
            "56 entrées : nom, définition, contexte et consigne",
            "Web : en-tête, fil d’Ariane, champs, modales et tableaux",
            "Téléphone : navigation basse, feuille modale, gestes et clavier",
            "Tableau de bord : indicateurs, filtres, actions groupées et journal d’audit",
            "Planches sur les moments du parcours et les erreurs de hiérarchie",
          ],
        },
        {
          num: "09",
          title: "Plateformes et boîte à outils",
          page: "p. 149",
          sections: [
            "Onze comparaisons de plateformes : Android, iOS, Windows, macOS, GNOME, KDE et Web",
            "Organisation des 77 règles, méthodes de contrôle et sévérités",
            "Preuves et périmètre par plateforme",
            "Annexes A1–A6 : audit, brief, passation, références, sources et protocoles",
            "Annexes A14–A17 : détail des règles A à L",
          ],
        },
      ],
      kitIntro:
        'Un PDF A4 séparé de 26 pages : chacune des 12 fiches tient sur une page, suivie d’une page de notes réglée (26 lignes) pour travailler au stylo ou sur tablette.',
      kitSheets: [
        { num: '01', title: 'Audit UX/UI en 40 points', meta: 'Évaluer un existant', page: 'p. 02' },
        { num: '02', title: 'Fiche de passation', meta: 'Prêt à livrer ?', page: 'p. 04' },
        { num: '03', title: 'Brief projet · 12 questions', meta: 'Cadrage client', page: 'p. 06' },
        { num: '04', title: 'Fiche de spécification développeur', meta: 'Handoff 1 page', page: 'p. 08' },
        { num: '05', title: 'Proposition en une page', meta: "Périmètre et prix", page: 'p. 10' },
        { num: '06', title: 'Contrôle final · 12 points', meta: 'Avant envoi', page: 'p. 12' },
        { num: '07', title: 'Grille de vérification · écran IA', meta: '8 + 4 points critiques', page: 'p. 14' },
        { num: '08', title: 'Checklist agent · 77 règles', meta: 'Six plateformes', page: 'p. 16' },
        { num: '09', title: 'Brief à coller pour un agent', meta: 'Prompt structuré', page: 'p. 18' },
        { num: '10', title: 'Rapport d’agent · trois statuts', meta: "Constats et résultats", page: 'p. 20' },
        { num: '11', title: 'Quelle cible, sur quelle plateforme', meta: 'Web, iOS, Android, Desktop', page: 'p. 22' },
        { num: '12', title: 'Cadrer le périmètre de l’agent', meta: 'Ce qu’il mesure ou non', page: 'p. 24' },
      ],
      archiveIntro:
        "En plus du livre et du kit PDF, cette édition inclut les 21 fichiers du dossier FR de l’archive source. Ce total comprend les copies des scripts et des tokens intégrées au skill. Les fichiers anglais sont livrés avec l’édition anglaise, vendue séparément. Voici les dossiers et leurs usages :",
      archiveGroups: [
        {
          "folder": "checklist-agent/",
          "desc": "Scanner Python, règles et instructions de revue",
          "files": [
            {
              "name": "agent_check.py",
              "info": "Commande locale ou CI, avec --fail-on blocking et sortie JSON en option"
            },
            {
              "name": "rules.py",
              "info": "77 règles structurées dans un module Python, catégories A à L"
            },
            {
              "name": "AGENTS.md & RAPPORT-TYPE.md",
              "info": "Instructions de contexte et gabarit de rapport"
            },
            {
              "name": "test/bad.html & test/good.html",
              "info": "Deux fichiers témoins pour comparer les codes de sortie"
            }
          ]
        },
        {
          "folder": "skill/ux-ui-checklist/",
          "desc": "Le skill et ses copies de scripts et de tokens",
          "files": [
            {
              "name": "SKILL.md & references/rules.md",
              "info": "Instructions à adapter au format de contexte de votre agent"
            },
            {
              "name": "scripts/",
              "info": "Copies du scanner, des règles, des fichiers témoins et des tokens, comptées dans les 21 fichiers"
            }
          ]
        },
        {
          "folder": "tokens/",
          "desc": "Valeurs visuelles à adapter au projet",
          "files": [
            {
              "name": "tokens.css",
              "info": "Variables CSS pour les couleurs, espacements, textes et mouvements"
            },
            {
              "name": "tokens.json",
              "info": "Tokens structurés à adapter à vos outils et à votre pipeline"
            }
          ]
        },
        {
          "folder": "templates/",
          "desc": "Quatre documents Markdown modifiables",
          "files": [
            {
              "name": "brief-client.md & audit-40-points.md",
              "info": "Cadrage du projet et revue d’un écran"
            },
            {
              "name": "handoff-developpeur.md & journal-de-preuves.md",
              "info": "Passation et traçabilité des sources, dates et observations"
            }
          ]
        }
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
          others: "24 paires comparées : 13 thèmes et 11 cas de plateformes",
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
          feature: 'Scanner Python exécutable (agent_check.py) + 77 règles dans rules.py',
          others: "Méthode expliquée dans le livre",
          playbook: 'Inclus (utilisable en terminal & CI/CD)',
          highlight: true,
        },
        {
          feature: 'Skill IA (SKILL.md / AGENTS.md) pour Claude Code, Cursor, Codex',
          others: "Méthode expliquée dans le livre",
          playbook: 'Instructions Markdown à fournir à l’agent',
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
      role: "Joy N. · Auteur du manuel, des fiches A4 et des fichiers de travail.",
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
          a: `Trois éléments à télécharger après l’achat : 1) le UX/UI Playbook complet en français (PDF A4 de ${playbookPages('fr')} pages avec sommaire interactif), 2) le Kit Bonus de livraison (PDF A4 de 26 pages contenant 12 fiches pratiques et leurs pages de notes), et 3) l’archive ZIP des 21 fichiers de travail (design tokens CSS/JSON, 4 gabarits, les 77 règles dans rules.py, le script Python agent_check.py et le skill IA).`,
        },
        {
          q: 'Avec quels outils IA fonctionnent la checklist et le skill ?',
          a: "Le scanner s’exécute avec Python 3, dans un terminal ou une CI qui peut lancer cette commande. Les fichiers Markdown et Python servent d’instructions et de données aux agents capables de les lire. Adaptez le format de contexte reconnu par votre outil, notamment Claude Code, Cursor ou Codex, ainsi que les chemins vers le projet ; l’exécution dépend aussi des permissions accordées à l’agent.",
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
          q: `Quelle est la différence entre l’édition française (${playbookPages('fr')} pages) et l’édition anglaise (${playbookPages('en')} pages) ?`,
          a: `Les deux éditions reprennent la même méthode, les 120 sections, les 77 règles et les 21 fichiers traduits. La composition et les retours à la ligne diffèrent selon la langue : le PDF français compte ${playbookPages('fr')} pages et le PDF anglais ${playbookPages('en')}.`,
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
        `L’achat donne accès au manuel français de ${playbookPages('fr')} pages, au kit imprimable et aux fichiers techniques présentés sur cette page. Utilisez le livre pour préparer les décisions d’un écran, puis conservez vos observations et vos corrections dans les gabarits du projet. Les dix pages d’aperçu restent consultables avant de choisir cette édition.`,
      includedTitle: 'Les fichiers de l’édition française :',
      includedList: [
        `UX/UI Playbook 2026 · PDF A4 de ${playbookPages('fr')} pages (120 sections, 9 parties, lexique de 56 composants)`,
        'Kit Bonus Imprimable · PDF A4 de 26 pages (12 fiches d’atelier & notes)',
        'Scanner Python agent_check.py + 77 règles dans rules.py (6 plateformes)',
        'Skill IA (SKILL.md + AGENTS.md) pour Claude Code, Cursor & Codex',
        "Design tokens CSS et JSON à adapter + quatre gabarits de projet",
        'Licence d’utilisation commerciale sur vos projets & missions clients',
      ],
      priceDisplay: '29 $',
      priceSub: 'USD · paiement unique · 0 abonnement (ou prix libre supérieur)',
      buyBtn: 'Obtenir l’édition française · 29 $',
      licenseNote:
        "Documents PDF consultables sur ordinateur ou tablette, imprimables en A4. Le paiement et la remise des fichiers passent par Gumroad ; les moyens de paiement disponibles sont affichés lors de la commande.",
      guarantees: ['Téléchargement après achat', 'Demande de remboursement sous 7 jours', 'Paiement via Gumroad'],
      crosslinkTag: 'VOUS TRAVAILLEZ EN ANGLAIS ?',
      crosslinkText:
        `L’édition anglaise est vendue séparément : manuel de ${playbookPages('en')} pages, kit A4 et archive de 21 fichiers en anglais. Le sélecteur de langue ouvre les pages et les liens d’achat de cette édition.`,
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
      title: `UX/UI Playbook 2026 · ${playbookPages('en')} pages, 120 sections · EN`,
      description:
        `120 sections, ${playbookPages('en')} pages and a 56-component glossary. UX/UI manual, 12 A4 worksheets and 21 English working files. One-time payment: $29 USD.`,
      ogTitle: 'UX/UI Playbook 2026 · English edition',
      ogDescription:
        `${playbookPages('en')} pages, 120 sections and 56 glossary entries. A 26-page kit and a 21-file archive in English. $29 USD, one-time payment.`,
      ogImage: `${SITE_URL}/og-en.jpg`,
      ogLocale: 'en_US',
      productName: 'UX/UI Playbook 2026 + Bonus Kit (English Edition)',
    },
    skipToContent: 'Skip to main content',
    topBar: {
      badge: "2026 ENGLISH EDITION · PDF, A4 KIT AND FILES",
      audienceHint: "Manual, worksheets and instructions in English",
      cta: 'Get the Playbook · $29',
    },
    nav: {
      pillars: "Book and files",
      demo: "Check demo",
      inside: 'Book excerpts',
      contents: 'Contents',
      guides: 'Articles',
      freeDirectory: 'Free Directory',
      faq: 'FAQ',
      buy: 'Buy · $29',
      themeDarkLabel: 'Switch to light mode',
      themeLightLabel: 'Switch to dark mode',
      switchLangTitle: `Voir l’édition française (${playbookPages('fr')} pages)`,
    },
    hero: {
      kicker: "UX, UI AND PRODUCT DESIGN FOR DEVELOPERS",
      titleBefore: "Design and review ",
      titleAccent: "your interfaces",
      titleAfter: ".",
      lede:
        "Joy N.’s UX/UI Playbook follows interface design from defining a journey to preparing error states and developer handoff. The manual explains typography, colour and spacing decisions through annotated screens. A4 worksheets support briefing and review, while tokens and a Python scanner carry some of those decisions into code. Checks requiring inspection of the rendered interface or observation with users remain open for review. The book is intended for developers and teams preparing screens alongside their implementation.",
      primaryCta: 'Get the English edition · $29',
      secondaryCta: 'Read the 10 book excerpts',
      note: `One-time payment of $29 USD. After purchase: ${playbookPages('en')}-page English PDF, 26-page A4 kit and 21-file archive.`,
      proofs: [
        `${playbookPages('en')} A4 pages in English`,
        "77 rules: automated + human checks",
        '12 sheets + 21 files & AI Skill',
        'Refund requests within 7 days',
      ],
      coverCaption: `EN Edition · ${playbookPages('en')} pages`,
      spreadCaption: "Annotated examples and review guidance",
    },
    strip: [
      { num: String(playbookPages('en')), label: "pages in the English manual" },
      { num: String(PLAYBOOK_COUNTS.sections), label: "sections across nine parts, including the component glossary" },
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
          title: `The illustrated manual · ${playbookPages('en')} pages`,
          subtitle: "120 sections · 9 parts · 56-component glossary · 24 comparisons",
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
            '12 printable A4 working sheets, each paired with a ruled notes page for live reviews.',
            "Four editable templates: client brief, developer handoff, 40-point audit and evidence log. The one-page proposal is in the PDF kit.",
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
      kicker: 'DEMONSTRATION · TEST-FIXTURE RESULTS',
      heading: 'Compare a failing fixture with a corrected example.',
      lede:
        'No Python runs in this page. On the left, a checkout mockup illustrates design decisions to examine. On the right, report summaries come from checks of the archive’s test/bad.html and test/good.html fixtures, not that mockup. Open a terminal in checklist-agent/ and copy the command to reproduce the fixture check.',
      bullets: [
        { bold: 'A reproducible command:', rest: 'with --platform web, 57 of the 77 rules enter scope. The script examines 9 lines on bad.html and 8 on good.html; the remaining rules stay open for review.' },
        { bold: 'An exit code for CI:', rest: '--fail-on blocking returns 1 for bad.html, with seven blocking failures, and 0 for good.html. This result certifies neither rendering nor accessibility.' },
        { bold: 'Method, severity and outcome:', rest: 'Automated / To verify describe the check. Blocking / Major describe severity. Pass / Fail are outcomes; a line can also remain informational.' },
      ],
      tabBad: "1. Sample file bad.html",
      tabClean: '2. Sample file good.html',
      fixAction: "Show the corrected example",
      fixedBadge: "Corrected example · human review still required",
      copyCmd: 'Copy CLI command',
      copiedCmd: 'Command copied!',
      illustrationLabel: 'MOCKUP',
      screenHeaderBad: 'ILLUSTRATION · BEFORE',
      screenHeaderClean: 'ILLUSTRATION · AFTER',
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
          { code: 'C01 · REVIEW', text: 'Examine small text sizes in the actual rendered interface' },
          { code: 'B01 · REVIEW', text: 'Measure contrast on each surface and in each state' },
          { code: 'A06 · REVIEW', text: 'Two equally filled buttons: distinguish the main action' },
          { code: 'K03 · REVIEW', text: 'Make the total and fees available before committing' },
        ],
        improvements: [
          { code: 'C01 · TO VERIFY', text: 'Review text at zoom and on a phone' },
          { code: 'B01 · TO VERIFY', text: 'Measure text, backgrounds, focus and states in the project' },
          { code: 'A06 · TO VERIFY', text: 'Distinct primary action; observe comprehension' },
          { code: 'K03 · TO VERIFY', text: 'Visible total and fees; try the complete journey' },
        ],
      },
      terminal: {
        cmdBad:
          'python3 agent_check.py --target test/bad.html \\\n    --platform web --lang en --fail-on blocking',
        cmdClean:
          'python3 agent_check.py --target test/good.html \\\n    --platform web --lang en --fail-on blocking',
        linesBad: [
          { type: 'c', text: 'Execution summary · test/bad.html · web scope' },
          { type: 'r', text: 'G01 · BLOCKING · fail: no lang attribute' },
          { type: 'r', text: 'H02 · BLOCKING · fail: image without alt' },
          { type: 'r', text: 'F01 · BLOCKING · fail: input without id or aria-label' },
          { type: 'r', text: 'I03 · BLOCKING · fail: no reduced-motion handling' },
          { type: 'w', text: 'Contrast, targets and keyboard: rendered review required' },
          { type: 'c', text: '9 automated lines: 8 failures, 1 informational result' },
          { type: 'r', text: '7 blocking failures, 1 major · exit 1' },
        ],
        linesClean: [
          { type: 'c', text: 'Execution summary · test/good.html · web scope' },
          { type: 'g', text: 'G01 · pass: lang="en" on the fixture' },
          { type: 'g', text: 'H02 · pass: alt attribute present on the image' },
          { type: 'g', text: 'F01 · pass: label hook present' },
          { type: 'g', text: 'I03 · pass: prefers-reduced-motion present' },
          { type: 'w', text: 'Contrast, targets and keyboard: rendered review required' },
          { type: 'g', text: '8 automated lines, no reported failure' },
          { type: 'c', text: '49 web rules remain to verify · exit 0 ≠ conformance' },
        ],
        statusBlocking: 'Blocking',
        statusAutomated: "Automated",
        statusToVerify: 'To verify',
        statusNotApplicable: 'Outside web scope',
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
        "Open a page at reading size to inspect its annotations and examples before buying. The selection includes contents, the component glossary, a page of sources, checkout screens, comparisons and a checklist page. Filters separate annotated screens, before/after examples and system pages.",
      openReaderBtn: 'Open fullscreen reader (10 pages)',
      filterAll: 'All pages (10)',
      filterScreens: 'Annotated screens',
      filterBeforeAfter: 'Before / After',
      filterSystem: 'Checklist & Bonus Kit',
      previewLabel: 'Book excerpt',
      clickHint: 'Click to inspect',
      note: `The English edition contains a ${playbookPages('en')}-page PDF with clickable bookmarks, a separate 26-page A4 kit and the 21-file archive. The pages shown here are extracts from those documents.`,
      readerClose: 'Close',
      readerPrev: 'Previous page',
      readerNext: 'Next page',
      readerBuy: `Get all ${playbookPages('en')} pages · $29`,
      pages: [
        {
          id: 'cover',
          src: '/images/en/cover.webp',
          category: 'system',
          badge: 'EN Cover',
          title: 'Cover · 2026 English Edition',
          caption: `${playbookPages('en')} pages and 120 sections. Nine parts, including the component glossary and platform comparisons.`,
          alt: 'Cover of the UX/UI Playbook 2026 English Edition by Joy N.',
        },
        {
          id: 'contents',
          src: '/images/en/contents.webp',
          category: 'system',
          badge: 'p. 04 · Contents',
          title: 'Contents: first page',
          caption: "Nine parts and 120 sections covering journeys, visual design, delivery, platforms and tools.",
          alt: 'Contents page of the UX/UI Playbook in English',
        },
        {
          id: 'landing',
          src: '/images/en/landing-annotated.webp',
          category: 'screens',
          badge: 'p. 28 · Landing page',
          title: "Landing-page structure",
          caption: "B2B mockup annotated in six areas: reading order, first-screen content and action placement.",
          alt: 'Annotated landing page blueprint from the playbook',
        },
        {
          id: 'checkout',
          src: '/images/en/checkout-annotated.webp',
          category: 'screens',
          badge: 'p. 34 · Checkout',
          title: "Checkout-screen layout",
          caption: "Example with a form on the left and a summary on the right to keep the total available.",
          alt: 'Annotated checkout screen page from the playbook',
        },
        {
          id: 'evidence',
          src: '/images/en/evidence-sources.webp',
          category: 'screens',
          badge: 'p. 24 · Sources',
          title: 'What the numbers actually say',
          caption: 'Section X, reference 09b: attention and cart abandonment, with a source and date beneath the figures. The section continues on p. 25.',
          alt: 'Excerpt from section X, What the numbers actually say, p. 24 of the English PDF',
        },
        {
          id: 'sbs-checkout',
          src: '/images/en/before-after-checkout.webp',
          category: 'before-after',
          badge: 'p. 85 · Before / After',
          title: 'Side-by-side: checkout',
          caption: '6 fields and 2 equal buttons vs. 4 fields, system wallet first, and 1 clear action.',
          alt: 'Before and after comparison of a checkout interface',
        },
        {
          id: 'sbs-loading',
          src: '/images/en/before-after-loading.webp',
          category: 'before-after',
          badge: 'p. 109 · Before / After',
          title: 'Side-by-side: loading',
          caption: "Comparison of a wait on an empty page with a skeleton that reserves content space.",
          alt: 'Before and after comparison of loading states',
        },
        {
          id: 'lexicon',
          src: '/images/en/component-lexicon.webp',
          category: 'screens',
          badge: 'p. 117 · Glossary',
          title: 'Naming web components',
          caption: 'Section LXXVI, reference L3: sidebar, tabs, dropdown and button, with example instructions.',
          alt: 'Web component glossary, section LXXVI, p. 117 of the English PDF',
        },
        {
          id: 'checklist',
          src: '/images/en/checklist-rules.webp',
          category: 'system',
          badge: 'p. 163 · Checklist',
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
      lede: `The nine parts below group the topics in the ${playbookPages('en')}-page English manual. The other tabs describe the twelve printable worksheets and a selection of technical archive files. Page references locate each part’s opening page in the PDF. The lists summarise topics rather than reproduce all 120 section titles.`,
      tabBook: 'The Book (9 parts · 120 sections)',
      tabKit: 'Bonus Kit (12 A4 sheets)',
      tabArchive: 'Working Archive (21 files)',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
      parts: [
        {
          num: "01",
          title: "Understand before you draw",
          page: "p. 10",
          sections: [
            "User goals and UX, UI and product decision responsibilities",
            "Cognitive principles, journeys and visual hierarchy",
            "Screen states and accessibility references and review scope",
            "Screen anatomy and eight framing questions",
            "Section X (reference 09b): What the numbers actually say",
          ],
        },
        {
          num: "02",
          title: "Ten screens, ten logics",
          page: "p. 27",
          sections: [
            "Landing pages, SaaS dashboards and mobile applications",
            "Checkout and pricing: forms, total and summary",
            "Login, registration, empty states and first use",
            "Settings, long forms, tables and admin views",
            "Booking and appointments",
          ],
        },
        {
          num: "03",
          title: "The craft of the pixel",
          page: "p. 45",
          sections: [
            "Typography: scale and families",
            "Colour, spacing and responsive grids",
            "Tokens and components",
            "Iconography and microcopy",
            "Developer handoff",
          ],
        },
        {
          num: "04",
          title: "From brief to deliverable",
          page: "p. 59",
          sections: [
            "Brief and research: a two-hour timebox example",
            "Wireframes: structure and content order",
            "Moving into visual presentation",
            "Prototypes and observing use",
            "A first twenty-minute audit pass",
          ],
        },
        {
          num: "05",
          title: "Design as revenue",
          page: "p. 67",
          sections: [
            "Presenting a decision to a client",
            "Portfolio and project descriptions",
            "Pricing models and a one-page proposal",
            "Scope, delivery and feedback",
            "Design systems and maintenance",
          ],
        },
        {
          num: "06",
          title: "Tools & workflow",
          page: "p. 75",
          sections: [
            "Tools by phase and budget",
            "File formats and recipients",
            "Pipeline from brief to code review",
            "Three prompts, colours and gradients",
            "Delegating to an agent and defects to look for",
          ],
        },
        {
          num: "07",
          title: "Evidence, law and AI",
          page: "p. 83",
          sections: [
            "Research, questions and attributing figures",
            "Measurements, accessibility and applicable 2026 legislation",
            "Reviewing generated screens and agent interfaces",
            "Instructions in AGENTS.md",
            "Colour themes, motion and RTL",
            "Thirteen before/after pairs: checkout, contrast, tables, states, targets and loading",
          ],
        },
        {
          num: "08",
          title: "Component lexicon",
          page: "p. 113",
          sections: [
            "22 sections, references L1–L22 and Roman numerals LXXIV–XCV",
            "56 entries: name, definition, context and instruction",
            "Web: headers, breadcrumbs, fields, modals and tables",
            "Phone: bottom navigation, sheets, gestures and keyboards",
            "Dashboard: indicators, filters, bulk actions and audit logs",
            "Spreads on journey moments and hierarchy mistakes",
          ],
        },
        {
          num: "09",
          title: "Platforms and toolbox",
          page: "p. 138",
          sections: [
            "Eleven platform comparisons: Android, iOS, Windows, macOS, GNOME, KDE and Web",
            "The 77 rules, verification methods and severity",
            "Evidence and scope by platform",
            "Appendices A1–A6: audit, brief, handoff, references, sources and protocols",
            "Appendices A14–A17: rules A to L in full",
          ],
        },
      ],
      kitIntro:
        'A separate 26-page A4 PDF: each of the 12 working sheets fits on one page, followed by a 26-line ruled notes page for pen-and-paper or tablet reviews.',
      kitSheets: [
        { num: '01', title: '40-point UX/UI audit', meta: 'Review existing UI', page: 'p. 02' },
        { num: '02', title: 'Delivery sign-off sheet', meta: 'Ready to ship?', page: 'p. 04' },
        { num: '03', title: 'Project brief · 12 questions', meta: 'Client scoping', page: 'p. 06' },
        { num: '04', title: 'Developer specification sheet', meta: '1-page handoff', page: 'p. 08' },
        { num: '05', title: 'One-page proposal', meta: "Scope and price", page: 'p. 10' },
        { num: '06', title: 'Final check · 12 points', meta: 'Pre-delivery gate', page: 'p. 12' },
        { num: '07', title: 'Verification grid · AI screen', meta: '8 + 4 critical checks', page: 'p. 14' },
        { num: '08', title: 'Agent checklist · 77 rules', meta: 'Six platforms', page: 'p. 16' },
        { num: '09', title: 'Brief to paste to an agent', meta: 'Structured prompt', page: 'p. 18' },
        { num: '10', title: 'Agent report · three statuses', meta: "Findings and results", page: 'p. 20' },
        { num: '11', title: 'Which target, on which platform', meta: 'Web, iOS, Android, Desktop', page: 'p. 22' },
        { num: '12', title: 'Scoping what the agent checks', meta: 'Limits & human checks', page: 'p. 24' },
      ],
      archiveIntro:
        "Alongside the book and kit PDFs, this edition includes the 21 files in the EN folder of the source archive. This count includes the script and token copies nested in the skill. French files accompany the separately sold French edition. Here are the folders and their uses:",
      archiveGroups: [
        {
          "folder": "checklist-agent/",
          "desc": "Python scanner, rules and review instructions",
          "files": [
            {
              "name": "agent_check.py",
              "info": "Local or CI command, with --fail-on blocking and optional JSON output"
            },
            {
              "name": "rules.py",
              "info": "77 rules structured in a Python module, categories A to L"
            },
            {
              "name": "AGENTS.md & REPORT-TEMPLATE.md",
              "info": "Context instructions and report template"
            },
            {
              "name": "test/bad.html & test/good.html",
              "info": "Two fixtures for comparing exit codes"
            }
          ]
        },
        {
          "folder": "skill/ux-ui-checklist/",
          "desc": "The skill and its script and token copies",
          "files": [
            {
              "name": "SKILL.md & references/rules.md",
              "info": "Instructions to adapt to your agent’s context format"
            },
            {
              "name": "scripts/",
              "info": "Copies of the scanner, rules, test fixtures and tokens, included in the 21-file count"
            }
          ]
        },
        {
          "folder": "tokens/",
          "desc": "Visual values to adapt to the project",
          "files": [
            {
              "name": "tokens.css",
              "info": "CSS variables for colour, spacing, text and motion"
            },
            {
              "name": "tokens.json",
              "info": "Structured tokens to adapt to your tools and pipeline"
            }
          ]
        },
        {
          "folder": "templates/",
          "desc": "Four editable Markdown documents",
          "files": [
            {
              "name": "brief-client.md & audit-40-points.md",
              "info": "Project framing and screen review"
            },
            {
              "name": "handoff-developer.md & journal-of-proof.md",
              "info": "Handoff and a record of sources, dates and observations"
            }
          ]
        }
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
          others: "24 comparison pairs: 13 themes and 11 platform cases",
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
          playbook: 'Markdown instructions to provide to the agent',
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
      role: "Joy N. · Author of the manual, A4 worksheets and working files.",
      p1: "Joy N. is the author of this manual on UX, UI and Product Design. The book follows a project through describing the need, preparing journeys, defining components and handing decisions to the developer. Screen examples provide material for examining content, layout and behaviour within that process.",
      p2: "The accompanying documents cover the same subjects through worksheets and editable files: briefs, audits, handoffs, tokens and coding-agent rules. For questions about the content or download, contact joynagassi@gmail.com.",
      signature: 'Joy N. · 2026 English Edition',
    },
    faq: {
      kicker: 'FREQUENTLY ASKED QUESTIONS',
      heading: "Questions about the files and purchase.",
      items: [
        {
          q: 'Which files are included in the $29 download?',
          a: `Three downloads after purchase: 1) the complete UX/UI Playbook 2026 in English (${playbookPages('en')}-page A4 PDF with clickable contents and bookmarks), 2) the Printable Delivery Bonus Kit (26-page A4 PDF with 12 working sheets + ruled note pages), and 3) the 21-file ZIP archive (CSS/JSON design tokens, 4 markdown templates, 77 rules in rules.py, the runnable Python scanner agent_check.py, and the AI agent skill).`,
        },
        {
          q: 'Which AI coding tools work with the checklist and skill?',
          a: "The scanner runs with Python 3 in a terminal or CI environment able to execute the command. Markdown and Python files provide instructions and data to agents able to read them. Adapt the context format recognised by your tool, including Claude Code, Cursor or Codex, and the project paths; execution also depends on the permissions granted to the agent.",
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
          q: `Why is the English edition ${playbookPages('en')} pages while the French edition is ${playbookPages('fr')} pages?`,
          a: `Both editions cover the same method, 120 sections, 77 rules and 21 translated files. Typesetting and line breaks differ by language: the French PDF has ${playbookPages('fr')} pages and the English PDF has ${playbookPages('en')}.`,
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
        `The purchase includes the ${playbookPages('en')}-page English manual, printable kit and technical files described on this page. Use the book to prepare screen decisions, then keep observations and corrections in the project templates. The ten-page preview remains available before you choose this edition.`,
      includedTitle: 'Files in the English edition:',
      includedList: [
        `UX/UI Playbook 2026 · ${playbookPages('en')}-page A4 PDF (120 sections, 9 parts, 56-component glossary)`,
        'Printable Bonus Kit · 26-page A4 PDF (12 working sheets & note pages)',
        'Runnable Python scanner agent_check.py + 77 rules in rules.py (6 platforms)',
        'AI Agent Skill (SKILL.md + AGENTS.md) for Claude Code, Cursor & Codex',
        "CSS and JSON design tokens to adapt + four project templates",
        'Commercial license for unlimited personal & client projects',
      ],
      priceDisplay: '$29',
      priceSub: 'USD · one-time payment · zero subscription (pay more if you choose)',
      buyBtn: 'Get the English edition · $29',
      licenseNote:
        "PDF documents for reading on a computer or tablet and printing on A4. Gumroad handles payment and file delivery; available payment methods are shown at checkout.",
      guarantees: ['Download after purchase', 'Refund requests within 7 days', 'Payment via Gumroad'],
      crosslinkTag: 'WORKING IN FRENCH?',
      crosslinkText:
        `The French edition is sold separately: a ${playbookPages('fr')}-page manual, A4 kit and 21-file archive in French. The language selector opens that edition’s pages and purchase links.`,
      crosslinkBtn: 'See the French edition (FR)',
    },
    footer: {
      copyright: '© 2026 UX/UI Playbook · 2026 edition by Joy N.',
      gumroadLinkLabel: 'English store (Gumroad)',
      otherEditionLabel: 'Édition française',
    },
  },
};
