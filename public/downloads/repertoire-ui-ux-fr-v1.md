# Répertoire UI/UX

**51 fiches · 6 familles · 75 liens de ressources**

Version 1.0 · Français · Édition du 18 novembre 2026 · Joy N. / Joyccelight

Un répertoire pour comparer, choisir et documenter vos ressources d’interface. Il s’adresse aux non-designers, aux développeurs et aux personnes qui travaillent avec un agent IA. Ce n’est pas une collection de composants ou d’illustrations à réutiliser : les ressources restent sur les sites de leurs auteurs.

> Le guide et la grille sont gratuits. Les services cités peuvent proposer des fonctions payantes ou des licences conditionnelles. Les 75 liens ne correspondent pas à 75 outils distincts et n’ont pas fait l’objet d’un audit exhaustif de disponibilité. Cette édition fournit des points de départ à vérifier ; elle ne promet ni résultat commercial, ni performance, ni conformité d’accessibilité, ni absence d’erreurs d’un agent IA.

Page du guide : https://joyccelight-playbook.uxplay.workers.dev/fr/resources/ui-ux-directory?utm_source=repertoire-ui-ux&utm_medium=markdown&utm_campaign=ressource-gratuite

## Comment l’utiliser

1. **Cadrer** — Choisissez un écran, une plateforme et une contrainte importante. Exemple : un formulaire mobile avec des erreurs lisibles et des polices hébergées localement.
2. **Comparer** — Retenez deux options au maximum par famille, avec les mêmes textes, états et données. Vous pouvez aussi conserver une ressource déjà maîtrisée.
3. **Vérifier** — Notez l’URL officielle, la version, les droits, l’attribution et les coûts. Ne transmettez ni données personnelles ni fichier client à un service sans autorisation.
4. **Essayer** — Testez les états vide, chargement, erreur et succès ; le clavier, le zoom, les contrastes et l’écran le plus étroit. Mesurez le chargement sur le projet.
5. **Consigner** — Remplissez la fiche de décision : choix, raison, limite, personne responsable, test restant et date de relecture. Une piste non vérifiée peut rester écartée.

## Commencer par un besoin

- **Couleurs et thèmes** — Comparer une palette sur des textes, surfaces et états réels. Question : Quelles paires texte/fond restent lisibles dans les deux thèmes ?
- **Typographie** — Examiner les familles, les graisses et les tailles sur vos contenus. Question : Les accents, chiffres, libellés longs et conditions d’hébergement conviennent-ils ?
- **Icônes** — Choisir une famille cohérente et des symboles compréhensibles. Question : Les noms existent-ils et les actions importantes gardent-elles leur libellé ?
- **Composants et kits** — Sélectionner une base compatible avec votre plateforme et votre maintenance. Question : Quels comportements et quelles mises à jour devrez-vous prendre en charge ?
- **Graphiques de données** — Présenter une question et des données sans masquer les unités ni les limites. Question : Le graphique possède-t-il une légende, des unités et une alternative textuelle ?
- **Illustrations et 3D** — Trouver un visuel utile sans oublier droits, poids et alternative. Question : L’illustration apporte-t-elle une information plutôt qu’un obstacle au chargement ?

## Brief à transmettre à un agent IA

Ce modèle doit être rempli et relu. Il ne remplace pas une revue humaine ni un test du code.

```text
Contexte : [produit, écran, public, plateforme].
Ressources autorisées : [noms, URLs officielles, versions et licences approuvées].
Décisions à respecter : [tokens, police, icônes et composants retenus].
Ne pas ajouter de dépendance, de fichier tiers, de couleur ou d’achat sans accord.
Signaler les noms d’API ou d’icônes introuvables au lieu de les inventer.
Préparer les états vide, chargement, erreur et succès ; maintenir le clavier et le focus.
Séparer ce qui est implémenté, testé automatiquement et encore à vérifier par une personne.
Ne pas utiliser les ressources tierces pour entraîner un modèle ni constituer un pack.
Avant livraison : lister les fichiers modifiés, les sources, les tests et les limites.
```

## 1. Couleurs et thèmes

Comparer une palette sur des textes, surfaces et états réels.

**Question de décision :** Quelles paires texte/fond restent lisibles dans les deux thèmes ?

### 1.1. tweakcn

- https://tweakcn.com/

tweakcn sert à explorer un thème dans l’écosystème shadcn/ui. Son intérêt est de regarder une couleur au contact de cartes, champs et graphiques plutôt que d’approuver une palette isolée. Faites varier un seul paramètre à la fois, puis conservez les valeurs retenues avec leur rôle. Une démonstration convaincante ne remplace pas le contrôle des écrans de votre application.

- **Non-designer :** Comparer les états d’un même écran avant de choisir une ambiance.
- **Développeur :** Relever les variables utiles, puis les adapter à la version du projet.
- **Avec un agent IA :** Transmettre les tokens retenus et interdire l’ajout de couleurs sans justification.
- **À vérifier :** Vérifier les contrastes réels et la compatibilité des exports ; ne pas confondre démonstration et validation.

### 1.2. Realtime Colors

- https://www.realtimecolors.com/dashboard

Realtime Colors applique des choix de couleur et de typographie à une mise en page. On peut ainsi discuter du texte, des fonds et des accents en contexte. Utilisez un titre long, des liens et un bouton secondaire pour voir ce qu’une belle combinaison masque parfois. Si un contraste est indiqué dans l’outil, mesurez aussi les paires effectivement utilisées dans votre interface.

- **Non-designer :** Voir ce que devient une palette dans des blocs lisibles plutôt que sur un nuancier.
- **Développeur :** Consigner les couleurs sémantiques et examiner l’export disponible avant intégration.
- **Avec un agent IA :** Fournir les valeurs choisies, leur usage autorisé et les paires à mesurer.
- **À vérifier :** Un ensemble de couleurs n’est pas « validé WCAG » pour toutes les combinaisons possibles.

### 1.3. Shadcn Design Theme Generator

- https://www.shadcndesign.com/theme-generator

Ce générateur de Shadcn Design est une piste pour comparer un thème sur plusieurs types de pages. Il faut distinguer ce service de la documentation du projet shadcn/ui : des noms proches ne signifient pas une même équipe ni les mêmes conditions. Retenez surtout une proposition de hiérarchie, puis confrontez-la à vos contenus, à vos composants et à vos thèmes.

- **Non-designer :** Comparer l’identité d’une page de présentation à celle d’une interface plus dense.
- **Développeur :** Vérifier le format des variables et les dépendances attendues par le générateur.
- **Avec un agent IA :** Donner la configuration réellement exportée, pas seulement une capture d’inspiration.
- **À vérifier :** Service distinct de shadcn/ui ; examiner conditions d’accès et options d’export actuelles.

### 1.4. Huemint

- https://huemint.com/

Huemint propose une exploration automatisée de palettes appliquées à différents supports visuels. Le résultat aide à formuler une direction, notamment si aucune couleur de marque n’est fixée. Il ne sait pas à votre place quel texte sera prioritaire, quelle erreur devra être remarquée ou quel graphique portera plusieurs séries. Choisissez une proposition, attribuez les rôles puis essayez-la sur ces situations.

- **Non-designer :** Comparer plusieurs directions avec le même contenu de départ.
- **Développeur :** Transformer la palette retenue en rôles de fond, texte, bordure et action.
- **Avec un agent IA :** Demander une utilisation limitée aux rôles définis plutôt qu’une variation arbitraire.
- **À vérifier :** Une palette générée ne garantit ni contraste, ni compréhension, ni harmonie dans tous les états.

### 1.5. Radix Colors

- https://www.radix-ui.com/colors

Radix Colors organise chaque échelle en douze étapes et décrit leurs usages courants : fonds, composants, bordures, surfaces pleines et textes. La documentation précise qu’il existe des exceptions. Cette répartition donne un point de départ pour nommer les décisions et comparer les thèmes ; elle n’autorise pas à associer n’importe quel texte à n’importe quel fond. Gardez les alias sémantiques de votre produit et vérifiez les états rendus.

- **Non-designer :** S’appuyer sur des usages documentés au lieu de choisir chaque nuance séparément.
- **Développeur :** Relier les étapes de l’échelle aux tokens et aux états du composant.
- **Avec un agent IA :** Fournir la correspondance étape/rôle et demander une vérification des paires réellement rendues.
- **À vérifier :** La documentation officielle décrit des usages, pas une garantie générale d’accessibilité.

### 1.6. UI Colors

- https://uicolors.app/

UI Colors permet d’explorer une échelle à partir d’une couleur initiale, notamment dans les conventions de nuances utilisées avec Tailwind. L’échelle sert à répartir les usages ; elle ne décrit pas encore un thème complet. Une couleur de marque peut convenir à un accent décoratif tout en étant inadaptée au texte d’un petit bouton. Conservez cette distinction lorsque vous sélectionnez les nuances.

- **Non-designer :** Décliner une couleur connue et comparer ses usages sur les composants.
- **Développeur :** Vérifier l’échelle générée, les noms de variables et l’export proposé.
- **Avec un agent IA :** Transmettre les seules nuances retenues avec les rôles qu’elles peuvent remplir.
- **À vérifier :** Examiner les fonctions gratuites et payantes ; mesurer les contrastes après choix des rôles.

### 1.7. Material Theme Builder

- https://m3.material.io/theme-builder

Material Theme Builder est un outil de l’écosystème Material Design pour explorer un thème à partir de couleurs sources. Il aide à travailler les rôles d’une interface Material, plutôt qu’à reprendre la même couleur partout. Le choix reste dépendant de la plateforme, de la version des composants et du contenu. Une prévisualisation Android ne suffit pas à valider une interface web ni les usages d’un autre système.

- **Non-designer :** Comprendre la différence entre une couleur de marque et ses rôles d’interface.
- **Développeur :** Confirmer les plateformes et formats exportés par la version utilisée.
- **Avec un agent IA :** Fournir les rôles Material sélectionnés et les conventions de la plateforme cible.
- **À vérifier :** Ne pas présenter un thème généré comme une conformité automatique à une plateforme ou à WCAG.

### 1.8. Coolors et Color Hunt

- https://coolors.co/
- https://colorhunt.co/

Coolors propose une exploration de palettes ; Color Hunt présente des associations à parcourir comme références visuelles. Ces approches servent à comparer des ambiances, pas à choisir un design system complet. Une palette de quelques couleurs ne prévoit ni focus, ni erreur, ni texte secondaire. Après sélection, préparez ces rôles sur une petite interface réelle avant d’étendre le thème à tout le produit.

- **Non-designer :** Constituer une courte sélection et expliquer ce qui plaît dans chaque proposition.
- **Développeur :** Relever les valeurs puis construire les rôles et états manquants.
- **Avec un agent IA :** Associer les couleurs à des usages précis plutôt qu’à une consigne vague de style.
- **À vérifier :** Les fonctions, exports et conditions diffèrent entre les deux services.

### 1.9. Khroma

- https://www.khroma.co/

Khroma explore des combinaisons à partir de préférences colorées indiquées par la personne. Il aide à rendre une préférence discutable, ce qui est utile lorsque « plus chaleureux » ou « plus sobre » ne suffit pas au brief. Ne déduisez pas qu’une combinaison aimée sera comprise de la même manière par tous. Essayez-la ensuite avec les textes, composants et contraintes d’accessibilité du projet.

- **Non-designer :** Mettre des exemples sur une préférence visuelle difficile à exprimer.
- **Développeur :** Conserver quelques paires choisies et les confronter au thème existant.
- **Avec un agent IA :** Donner des références retenues et rejetées avec leur justification.
- **À vérifier :** Préférence esthétique et lisibilité sont deux questions distinctes ; examiner les conditions du service.

### 1.10. AI Brand Kits — Live Brand Preview

- https://www.aibrandkits.com/live-brand-preview-tool

L’outil de prévisualisation cité sous AI Brand Kits est une piste pour observer une identité sur différents éléments d’interface. Utilisez ce type d’aperçu pour chercher les contradictions : texte discret, action perdue, graphique qui se confond avec le fond. Le support le plus flatteur n’est pas forcément celui qui ressemble à votre application. Faites confirmer les fonctions et l’accès avant d’en dépendre.

- **Non-designer :** Examiner une même direction sur plusieurs blocs plutôt qu’un seul écran de couverture.
- **Développeur :** Comparer les composants montrés aux contraintes et à la densité du projet.
- **Avec un agent IA :** Transmettre les décisions extraites de l’aperçu, avec les fichiers qu’il faut réellement modifier.
- **À vérifier :** Disponibilité, exports et offre actuelle non testés dans ce répertoire ; vérifier le service avant de le retenir.

## 2. Typographie

Examiner les familles, les graisses et les tailles sur vos contenus.

**Question de décision :** Les accents, chiffres, libellés longs et conditions d’hébergement conviennent-ils ?

### 2.1. TypeHue

- https://typehue.com/

TypeHue figure dans le document d’origine comme outil d’essai typographique en contexte d’interface. L’usage à rechercher est de comparer la lecture d’un formulaire, d’un tableau ou d’une carte avec vos propres libellés. Une police expressive dans un grand titre peut se comporter autrement à petite taille. Avant de choisir cet outil dans le processus de l’équipe, confirmer ses fonctions et son accès actuels.

- **Non-designer :** Comparer l’effet d’une famille sur des tâches de lecture différentes.
- **Développeur :** Relever tailles, graisses et interlignages réellement retenus, pas des valeurs supposées optimales.
- **Avec un agent IA :** Fournir une spécification typographique écrite en complément de l’image de référence.
- **À vérifier :** Piste issue du document fourni ; fonctions et disponibilité actuelles non testées ici.

### 2.2. Web Font Preview

- https://www.webfontpreview.com/

Web Font Preview est cité pour comparer des familles et leurs variantes sur une interface d’exemple. Ce type de prévisualisation raccourcit la sélection si vous gardez le même texte pendant la comparaison. Il faut ensuite essayer les caractères de votre langue, les chiffres et les longueurs inhabituelles. La présence d’une variante dans un testeur ne prouve pas que vous possédez le fichier ou sa licence.

- **Non-designer :** Comparer quelques familles sur une mise en page identique.
- **Développeur :** Confirmer les fichiers, graisses et langues disponibles avant de préparer les styles.
- **Avec un agent IA :** Transmettre le nom exact, les fichiers autorisés et les alternatives de repli.
- **À vérifier :** Vérifier accès actuel, provenance des polices et droits d’utilisation séparément.

### 2.3. UI Fonts

- https://www.uifonts.app/

UI Fonts est une piste de comparaison de typographies sur des éléments d’interface. Observer des boutons, badges et cartes permet de poser des questions plus précises qu’une simple préférence de style : les lettres se distinguent-elles, le libellé tient-il, les graisses forment-elles une hiérarchie ? Les références à d’autres produits servent d’inspiration ; elles ne donnent pas accès à leur identité ni à leurs résultats d’usage.

- **Non-designer :** Évaluer les lettres et les libellés sur des composants proches de ceux du projet.
- **Développeur :** Comparer plusieurs graisses sans supposer que le testeur optimise les fichiers livrés.
- **Avec un agent IA :** Fixer une famille et quelques rôles explicites au lieu d’imiter une marque.
- **À vérifier :** Aucun testeur ne garantit le poids des fichiers, la lisibilité ou la licence des familles montrées.

### 2.4. Fontpair

- https://fontpair.co/

Fontpair rassemble des pistes d’associations typographiques. Une proposition titre/corps peut aider à démarrer, mais deux polices ne sont pas obligatoires : une famille et plusieurs graisses peuvent suffire. Examinez l’association avec une page longue, pas uniquement une accroche. Les différences de hauteur, de largeur et de rythme apparaissent davantage dans un formulaire ou un paragraphe réel.

- **Non-designer :** Comparer des associations sans devoir en inventer une dès le départ.
- **Développeur :** Contrôler les fichiers de chaque famille et le coût de leur chargement.
- **Avec un agent IA :** Donner les rôles de chaque famille et interdire leur multiplication par composant.
- **À vérifier :** Les licences et variantes se vérifient à la source de chaque police.

### 2.5. Fontjoy

- https://fontjoy.com/

Fontjoy propose des associations de polices à explorer en faisant varier leur proximité visuelle. Le résultat constitue une hypothèse pour une page, pas une règle typographique générale. Gardez une famille de départ, comparez quelques alternatives, puis relisez la page sans regarder seulement les titres. Cela permet de distinguer un contraste utile d’une différence qui attire l’œil au mauvais endroit.

- **Non-designer :** Explorer des combinaisons et préciser pourquoi l’une convient au projet.
- **Développeur :** Vérifier que les graisses et caractères nécessaires existent dans les fichiers retenus.
- **Avec un agent IA :** Fournir une association précise et ses rôles au lieu de demander de la « rendre élégante ».
- **À vérifier :** Une association générée ne démontre pas la lisibilité ni la compatibilité de licence.

### 2.6. Google Fonts

- https://fonts.google.com/

Google Fonts donne accès à des familles open source et à leurs informations de langue et de style. La FAQ autorise l’usage commercial sous les conditions de chaque licence, qui doivent être conservées et lues. Choisissez la famille sur vos textes : accents, devises, chiffres et graisses réellement nécessaires. Le mode de chargement, les sous-ensembles et les polices de repli restent des décisions d’intégration ; une police gratuite n’est pas automatiquement légère ou lisible.

- **Non-designer :** Comparer une famille sur les caractères réellement présents dans les écrans.
- **Développeur :** Choisir les fichiers et le mode d’hébergement, puis conserver la notice de licence.
- **Avec un agent IA :** Fournir les fichiers approuvés et les rôles typographiques, sans charger d’autres familles.
- **À vérifier :** La FAQ officielle distingue gratuité et conditions de redistribution ; vérifier chaque licence.

### 2.7. Fontshare

- https://www.fontshare.com/

Fontshare, proposé par Indian Type Foundry, présente notamment Satoshi, General Sans et Clash Display. Le catalogue distingue des familles closed source : gratuit ne signifie donc pas automatiquement open source ni sans conditions de redistribution. Ce choix peut convenir à un projet, mais il faut lire la licence de la famille et vérifier les fichiers disponibles avant de les inclure dans un site, une application ou un kit livré à un client.

- **Non-designer :** Comparer des familles moins familières sans confondre originalité et lisibilité.
- **Développeur :** Vérifier licence, formats, langues et droit de transmettre les fichiers au client.
- **Avec un agent IA :** Nommer la famille approuvée et joindre sa licence plutôt qu’un simple nom de marque.
- **À vérifier :** Ne pas qualifier tout le catalogue de libre de droits ; les conditions dépendent de la famille.

### 2.8. Uncut.wtf et Fontesk

- https://uncut.wtf/
- https://fontesk.com/

Uncut.wtf et Fontesk sont des points d’entrée pour explorer des typographies au caractère marqué. Les exemples d’affiches et d’identités aident à percevoir une intention, mais ne montrent pas toujours le comportement dans une interface dense. Retenez une courte sélection puis recherchez la source et la licence de chaque fichier. Pour un texte courant, vérifiez particulièrement les accents, les chiffres et la distinction entre lettres proches.

- **Non-designer :** Découvrir des directions expressives et décider si elles conviennent à un titre ou au texte courant.
- **Développeur :** Remonter à l’auteur et aux fichiers originaux avant de les distribuer ou de les héberger.
- **Avec un agent IA :** Fournir la famille choisie avec son usage limité plutôt qu’une référence de galerie entière.
- **À vérifier :** Un annuaire peut regrouper des licences différentes ; ne pas généraliser les droits d’une fiche.

### 2.9. Typescale

- https://typescale.com/

Typescale aide à explorer une progression de tailles à partir d’une base et d’un rapport. Le calcul donne des candidats pour la hiérarchie ; il ne connaît ni la longueur de vos titres ni la largeur du téléphone. Essayez ensuite les tailles arrondies, les interlignages et le retour à la ligne. Une échelle sert de contrainte partagée, pas de preuve que chaque niveau est nécessaire sur chaque écran.

- **Non-designer :** Comparer des niveaux typographiques sans sélectionner chaque taille isolément.
- **Développeur :** Transformer les tailles choisies en tokens et tester le zoom et les petits écrans.
- **Avec un agent IA :** Fournir les rôles retenus, leurs valeurs et les exceptions documentées.
- **À vérifier :** Un rapport mathématique ne garantit pas une hiérarchie compréhensible ; vérifier les limites de l’offre.

### 2.10. Sitepeel Font Changer

- https://sitepeel.dev/font-preview/

Le testeur de polices de Sitepeel est cité pour prévisualiser une autre typographie sur une page existante. Cette démarche peut aider à comparer rapidement sans confondre la modification locale et le travail réellement livré. Si une extension intervient, examiner ses permissions et ne pas l’essayer sur des données sensibles sans accord. Il faut ensuite reporter les choix dans les fichiers et vérifier le rendu sans l’extension.

- **Non-designer :** Comparer une piste directement sur un contenu connu et repérer les retours à la ligne.
- **Développeur :** Distinguer l’aperçu temporaire des fichiers et styles effectivement déployés.
- **Avec un agent IA :** Transmettre les décisions retenues, pas une dépendance à une extension de navigateur.
- **À vérifier :** Confirmer les fonctions actuelles, les permissions et les conditions de confidentialité avant installation.

## 3. Icônes

Choisir une famille cohérente et des symboles compréhensibles.

**Question de décision :** Les noms existent-ils et les actions importantes gardent-elles leur libellé ?

### 3.1. Phosphor Icons

- https://phosphoricons.com/

Phosphor décline des concepts dans plusieurs styles de trait et de remplissage. Cette cohérence de famille permet de comparer un état normal et un état sélectionné sans mélanger des dessins sans rapport. Choisissez quelques symboles sur les vrais fonds et aux tailles prévues. Une différence de style ne doit pas être le seul moyen de communiquer une sélection : le texte et l’état programmatique comptent également.

- **Non-designer :** Comparer les styles d’une même famille avant d’en retenir un pour l’interface.
- **Développeur :** Vérifier les paquets et noms disponibles pour la plateforme utilisée.
- **Avec un agent IA :** Donner les noms existants et les variantes autorisées, puis contrôler les imports.
- **À vérifier :** Conserver les mentions de licence et ne pas utiliser une icône seule pour une action ambiguë.

### 3.2. Solar Icons

- https://www.figma.com/community/file/1166831539721848736

Solar est une collection d’icônes distribuée notamment via Figma et des agrégateurs. Ses variantes peuvent servir à explorer une direction plus arrondie ou bicolore. La fiche de collection ne suffit toutefois pas à définir les droits de chaque mode de distribution. Après sélection, gardez le même style, examinez le contraste de chaque couleur et prévoyez un libellé lorsque le sens n’est pas évident.

- **Non-designer :** Comparer une navigation avec une seule famille plutôt qu’un mélange de styles.
- **Développeur :** Identifier la source, le format et la licence réellement utilisés par le projet.
- **Avec un agent IA :** Fournir les identifiants exacts et empêcher l’invention de symboles manquants.
- **À vérifier :** Un accès par Iconify ou Figma ne remplace pas la lecture de la licence de la collection.

### 3.3. Lucide

- https://lucide.dev/

Lucide propose des icônes SVG au trait personnalisable. Son intérêt dans une interface vient d’une famille de formes cohérente et de noms consultables, non d’une prétendue absence d’erreurs des agents IA. Définissez une taille et une épaisseur adaptées à votre rendu, puis vérifiez les commandes dans leur contexte. Sur le site du Playbook, le tracé est volontairement épaissi et les actions importantes gardent un texte : c’est un choix du projet, pas une obligation de la bibliothèque.

- **Non-designer :** Conserver une famille cohérente et tester si le symbole est réellement compris.
- **Développeur :** Importer uniquement les icônes employées et conserver la notice de licence du paquet.
- **Avec un agent IA :** Utiliser les noms de la version installée et faire vérifier les imports générés.
- **À vérifier :** Le paquet consulté est sous ISC avec mentions héritées de Feather ; garder la notice complète.

### 3.4. Tabler Icons

- https://tabler.io/icons

Tabler propose des icônes organisées autour d’une grille et de variantes de dessin. Le catalogue est une piste lorsque l’application comporte plusieurs fonctions métier, mais la taille du catalogue ne garantit pas qu’un symbole sera reconnu. Choisissez les icônes comme un petit vocabulaire et examinez les différences de sens entre des actions proches, par exemple archiver et supprimer.

- **Non-designer :** Comparer des symboles proches et conserver les libellés nécessaires.
- **Développeur :** Vérifier les variantes et les noms avant de choisir le paquet adapté.
- **Avec un agent IA :** Donner une liste d’identifiants autorisés et une règle pour les concepts absents.
- **À vérifier :** Ne pas mélanger arbitrairement les variantes ; conserver la licence de la version employée.

### 3.5. Heroicons

- https://heroicons.com/

Heroicons est une collection liée à l’écosystème Tailwind. Ses variantes sont conçues pour différents formats et styles, ce qui invite à choisir la version adaptée plutôt qu’à redimensionner indéfiniment un même dessin. Elle peut aussi être examinée hors d’un projet Tailwind. Prenez quelques actions représentatives et vérifiez que leur sens reste clair à la taille réellement utilisée.

- **Non-designer :** Partir d’un vocabulaire d’actions courant et examiner les états au repos et au focus.
- **Développeur :** Choisir le format SVG ou les composants compatibles avec le projet.
- **Avec un agent IA :** Fournir les variantes et noms exacts plutôt qu’une consigne de ressemblance.
- **À vérifier :** Une icône petite mais nette ne justifie pas une cible tactile trop petite.

### 3.6. Hugeicons

- https://hugeicons.com/

Hugeicons propose plusieurs styles et offres ; la partie gratuite ne doit pas être confondue avec l’ensemble du catalogue. Une direction arrondie peut convenir à l’identité du produit, à condition de rester cohérente sur toutes les commandes. Constituez d’abord une petite sélection de symboles indispensables, puis vérifiez qu’ils sont tous accessibles dans le même style et sous des conditions compatibles.

- **Non-designer :** Comparer une famille arrondie sur les actions importantes du parcours.
- **Développeur :** Confirmer que tous les symboles nécessaires appartiennent à l’offre retenue.
- **Avec un agent IA :** Transmettre les références effectivement disponibles dans le paquet autorisé.
- **À vérifier :** Examiner précisément les droits et limites de l’offre gratuite, sans généraliser à tous les styles.

### 3.7. Remix Icon et Iconoir

- https://remixicon.com/
- https://iconoir.com/

Remix Icon et Iconoir proposent deux vocabulaires graphiques distincts. Comparez-les sur les mêmes actions avant de choisir, plutôt que d’additionner leurs catalogues. Les proportions, les détails et les variantes de remplissage changent la lecture d’une barre de navigation. Une fois la famille retenue, gardez une règle de remplacement pour les concepts absents et vérifiez l’intégration avec le texte et le focus.

- **Non-designer :** Choisir une seule famille à partir d’actions représentatives.
- **Développeur :** Examiner les formats, paquets et licences de chaque projet séparément.
- **Avec un agent IA :** Limiter les noms autorisés à la famille retenue et signaler les symboles absents.
- **À vérifier :** Les obligations de notice se lisent dans chaque licence ; gratuit ne signifie pas sans conditions.

### 3.8. MingCute

- https://www.mingcute.com/

MingCute est une piste pour des icônes compactes en ligne ou en remplissage. Les deux variantes peuvent aider à discuter des états, sans imposer que l’état actif soit communiqué uniquement par leur différence. Essayez notamment les formes proches sur un fond sombre et dans un menu dense. La cohérence tient aussi aux espacements, au texte voisin et à la taille de la commande.

- **Non-designer :** Comparer des symboles sur une liste ou un menu plutôt qu’un catalogue isolé.
- **Développeur :** Vérifier les noms, formats et mentions de licence avant intégration.
- **Avec un agent IA :** Fournir les variantes retenues et les règles d’état, pas un mélange improvisé.
- **À vérifier :** Mesurer la commande complète et le contraste, pas seulement la taille du fichier SVG.

### 3.9. Material Symbols et Ionicons

- https://fonts.google.com/icons
- https://ionic.io/ionicons

Material Symbols et Ionicons appartiennent à des écosystèmes différents. Material Symbols propose notamment des axes de variation ; Ionicons accompagne l’écosystème Ionic. Leur présence ne suffit pas à rendre une application native ou conforme aux habitudes d’une plateforme. Choisissez d’abord la plateforme et la famille, puis examinez les actions, les tailles et les états dans le contexte de navigation prévu.

- **Non-designer :** Comparer les conventions des plateformes sans assimiler une icône à une expérience native.
- **Développeur :** Choisir le mode d’intégration et éviter l’affichage des noms de ligatures à la place des symboles.
- **Avec un agent IA :** Nommer la famille, les variantes et la plateforme cible, puis vérifier chaque rendu.
- **À vérifier :** Les règles de geste, de navigation et de focus restent à implémenter et à tester.

### 3.10. Iconify et SVG Repo

- https://icon-sets.iconify.design/
- https://www.svgrepo.com/

Iconify réunit de nombreuses collections derrière un système d’identifiants ; SVG Repo permet de rechercher des vecteurs de provenances variées. Ces points d’entrée sont utiles pour comparer des familles, mais ils ne rendent pas leurs licences identiques. Un résultat de recherche n’est pas encore une ressource approuvée. Revenez à la collection et à son auteur, conservez la notice et ne mélangez pas les styles simplement parce qu’ils sont faciles à importer.

- **Non-designer :** Comparer plusieurs représentations d’un concept puis retenir une famille.
- **Développeur :** Vérifier licence, provenance, dépendance réseau et méthode de livraison du SVG.
- **Avec un agent IA :** Fournir la liste des identifiants approuvés avec leur source et leur licence.
- **À vérifier :** Ne pas présenter tous les vecteurs d’un agrégateur comme libres de droits ou interchangeables.

## 4. Composants et kits

Sélectionner une base compatible avec votre plateforme et votre maintenance.

**Question de décision :** Quels comportements et quelles mises à jour devrez-vous prendre en charge ?

### 4.1. shadcn/ui

- https://ui.shadcn.com/

shadcn/ui distribue du code de composants que l’on intègre et adapte dans son propre projet. Sa documentation insiste sur le code ouvert, la composition et la distribution, plutôt que sur une bibliothèque opaque à importer telle quelle. Cela facilite l’examen du comportement, mais signifie aussi que les adaptations et mises à jour doivent être suivies. Un composant modifié doit être retesté avec ses libellés, ses erreurs et son focus.

- **Non-designer :** Examiner les variantes d’un même composant avant de figer une direction.
- **Développeur :** Lire les fichiers ajoutés, leurs dépendances et la stratégie de mise à jour.
- **Avec un agent IA :** Fournir le composant réellement présent et sa documentation plutôt que demander une réécriture approximative.
- **À vérifier :** L’accessibilité des briques ne certifie pas celle du parcours assemblé ou modifié.

### 4.2. Origin UI et 21st.dev

- https://originui.com/
- https://21st.dev/

Origin UI et 21st.dev donnent des points d’entrée vers des variantes de composants et des blocs d’interface. Cherchez une réponse à un besoin précis, par exemple un champ de recherche avec un état vide, au lieu d’accumuler des blocs visuellement séduisants. Avant d’importer du code, examinez sa provenance, ses dépendances, sa licence et la cohérence avec les composants déjà utilisés.

- **Non-designer :** Comparer quelques variantes sur un besoin connu, pas sur leur seul effet visuel.
- **Développeur :** Lire le code distribué et évaluer le coût de son adaptation et de sa maintenance.
- **Avec un agent IA :** Donner le bloc choisi, son origine et les limites des modifications attendues.
- **À vérifier :** Une place de marché ou un registre peut mélanger des auteurs, licences et offres différentes.

### 4.3. Magic UI et Aceternity UI

- https://magicui.design/
- https://ui.aceternity.com/

Ces ressources sont connues pour des composants et effets visuels animés. Une animation peut préciser une transition, mais peut aussi retarder l’accès à une information ou gêner la lecture. Commencez par nommer son rôle dans le parcours, puis essayez le rendu sans mouvement, au clavier et sur téléphone. Un effet de présentation ne doit pas devenir nécessaire pour comprendre une action ou accéder à un contenu.

- **Non-designer :** Choisir un mouvement qui explique une transition plutôt qu’un effet permanent.
- **Développeur :** Mesurer les dépendances, le rendu et le comportement en mouvement réduit.
- **Avec un agent IA :** Préciser la fonction de l’animation et les états statiques de remplacement.
- **À vérifier :** Séparer composants gratuits et offres payantes ; tester reduced motion et chargement.

### 4.4. Ant Design et Mantine

- https://ant.design/
- https://mantine.dev/

Ant Design et Mantine proposent des ensembles de composants pour des applications riches en formulaires et données. Le choix dépend de la plateforme technique, des composants indispensables et de la personnalisation attendue. Essayez un écran difficile, avec un tableau, une validation et une fenêtre modale, avant de retenir une base. Un vaste catalogue ne supprime pas les décisions sur les états, le contenu ou les responsabilités de maintenance.

- **Non-designer :** Évaluer une cohérence d’ensemble sur un écran métier représentatif.
- **Développeur :** Comparer API, versions, poids, personnalisation et politique de mises à jour.
- **Avec un agent IA :** Fournir la version installée et limiter les exemples à son API documentée.
- **À vérifier :** Ne pas choisir sur le seul nombre de composants ; vérifier les conditions de chaque projet.

### 4.5. HeroUI, DaisyUI et Flowbite

- https://www.heroui.com/
- https://daisyui.com/
- https://flowbite.com/

Ces trois ressources n’ont pas la même approche de l’interface. DaisyUI utilise notamment des classes sémantiques ; HeroUI et Flowbite proposent leurs propres composants et conventions. Comparez le projet à maintenir, pas seulement la vitesse d’un premier écran. Changer un thème ne résout pas les erreurs, la hiérarchie d’information ou les contraintes de contenu. Préparez un formulaire réel pour juger les compromis.

- **Non-designer :** Comparer les thèmes avec les mêmes libellés et les mêmes états.
- **Développeur :** Choisir une approche compatible avec le framework et les styles déjà présents.
- **Avec un agent IA :** Transmettre l’API ou les classes réellement retenues, sans mélanger les systèmes.
- **À vérifier :** Offres et composants avancés peuvent différer ; vérifier licence et disponibilité avant engagement.

### 4.6. Ionic, Konsta UI et React Native Reusables

- https://ionicframework.com/docs/components
- https://konstaui.com/
- https://reactnativereusables.com/

Ionic, Konsta UI et React Native Reusables proposent des approches différentes pour des interfaces mobiles. Une interface web à apparence mobile, une application hybride et une application React Native n’ont pas les mêmes contraintes. Le site actuel de React Native Reusables est relié ici plutôt que l’ancienne adresse de documentation. Testez navigation, clavier virtuel, zones sûres et lecteurs d’écran sur les appareils visés : un catalogue ne remplace pas ces essais.

- **Non-designer :** Comparer les conventions mobiles sans confondre apparence et comportement natif.
- **Développeur :** Distinguer stack web, hybride et React Native avant de choisir les composants.
- **Avec un agent IA :** Fournir la plateforme, la navigation et les contraintes d’appareil avant les références visuelles.
- **À vérifier :** Les plateformes et dépendances diffèrent ; aucune conformité native automatique n’est promise.

### 4.7. shadcn-admin, Tremor et Untitled UI

- https://github.com/satnaing/shadcn-admin
- https://www.tremor.so/
- https://www.untitledui.com/free-figma-ui-kit

shadcn-admin, Tremor et Untitled UI offrent des points de départ de nature différente : modèle d’administration, composants orientés données ou kit de conception. Une maquette Figma n’est pas une application fonctionnelle, et un template exécutable n’est pas une spécification adaptée à votre service. Examinez ce qui est réellement livré, ce qui manque et ce que vous devrez modifier avant de reprendre son architecture.

- **Non-designer :** Observer l’organisation d’un écran et repérer les blocs réellement utiles au projet.
- **Développeur :** Distinguer code exécutable, kit de design et dépendances à maintenir.
- **Avec un agent IA :** Donner le support choisi et les éléments qu’il est permis de reprendre.
- **À vérifier :** Ne pas présenter tout un catalogue commercial comme gratuit ; examiner le périmètre exact du kit.

## 5. Graphiques de données

Présenter une question et des données sans masquer les unités ni les limites.

**Question de décision :** Le graphique possède-t-il une légende, des unités et une alternative textuelle ?

### 5.1. Tremor Charts et shadcn Charts

- https://www.tremor.so/docs/visualizations/area-chart
- https://ui.shadcn.com/charts

Ces ressources proposent des présentations de graphiques intégrées à leur environnement de composants. Elles peuvent aider à organiser carte, légende, axes et infobulle de manière cohérente avec le reste d’un tableau de bord. Elles ne choisissent pas à votre place la bonne mesure ni la bonne représentation. Commencez avec une question de lecture, un jeu de données réaliste et une alternative textuelle avant de personnaliser les couleurs.

- **Non-designer :** Comparer la lecture d’une même mesure dans plusieurs représentations.
- **Développeur :** Vérifier les versions des composants et de la bibliothèque de graphiques sous-jacente.
- **Avec un agent IA :** Fournir le schéma des données, les unités et les états vide/erreur attendus.
- **À vérifier :** Vérifier les URLs et l’offre courantes ; aucune apparence par défaut ne prouve la compréhension des données.

### 5.2. Recharts

- https://recharts.github.io/

Recharts compose des graphiques avec des composants React et un rendu SVG. Cette structure aide à discuter séparément des axes, séries, légendes et contenus d’infobulle. Elle ne dispense pas de choisir les unités, les échelles ou la place des libellés. Essayez des données manquantes, des valeurs extrêmes et un écran étroit ; complétez le graphique par un résumé ou un tableau quand il porte une information nécessaire.

- **Non-designer :** Comparer les représentations à partir d’une question, pas d’un effet de style.
- **Développeur :** Vérifier le conteneur responsive et les composants de la version installée.
- **Avec un agent IA :** Fournir un schéma de données explicite et faire contrôler les valeurs et échelles.
- **À vérifier :** La page officielle présente une composition React/SVG ; l’accessibilité et la performance du projet restent à tester.

### 5.3. ApexCharts

- https://apexcharts.com/

ApexCharts propose des graphiques interactifs avec une configuration structurée. Il faut distinguer cette capacité de sa licence : la page officielle actuelle décrit plusieurs régimes, dont une Community License sous conditions, une licence commerciale et un régime OEM/redistribution. Le document fourni le présentait trop largement comme open source. Avant toute intégration, faire examiner la licence actuelle, le type de diffusion et la situation de l’organisation ; ne pas déduire la gratuité d’un exemple fonctionnel.

- **Non-designer :** Comparer les interactions nécessaires sans supposer que toutes les offres sont gratuites.
- **Développeur :** Faire valider le régime de licence avant d’ajouter une dépendance au projet.
- **Avec un agent IA :** Demander de lire la version et la licence retenues, sans installer automatiquement la bibliothèque.
- **À vérifier :** La licence actuelle peut imposer un paiement selon l’organisation ou l’usage ; la page de licence fait référence.

### 5.4. Apache ECharts

- https://echarts.apache.org/

Apache ECharts propose des visualisations variées et plusieurs possibilités de rendu. Son catalogue est pertinent pour examiner des besoins que des graphiques élémentaires ne couvrent pas, mais cette richesse augmente aussi le nombre de décisions de configuration. Choisissez d’abord la question à expliquer. Préparez ensuite un jeu de données représentatif, des unités, une légende et un mode de lecture alternatif avant de rechercher des effets ou un volume maximal de points.

- **Non-designer :** Chercher un exemple proche du besoin, puis expliquer ce qu’il permet de lire.
- **Développeur :** Mesurer le rendu sur l’appareil cible et limiter les fonctionnalités chargées.
- **Avec un agent IA :** Fournir le type de graphique, les données et les interactions autorisées.
- **À vérifier :** Aucun volume de données ni résultat de performance n’a été mesuré pour ce guide.

### 5.5. Chart.js

- https://www.chartjs.org/

Chart.js est une bibliothèque de graphiques rendus sur Canvas. Elle constitue une piste lorsqu’un projet a besoin de représentations courantes et d’une configuration documentée, sans imposer React. Le Canvas demande une attention particulière au contenu de remplacement : une image de graphique n’expose pas automatiquement les valeurs à tous les lecteurs. Préparez un résumé et, si nécessaire, un tableau consultable, puis examinez les états incomplets et les écrans étroits.

- **Non-designer :** Choisir une représentation à partir de la comparaison que le lecteur doit faire.
- **Développeur :** Configurer le conteneur, les plugins nécessaires et le contenu accessible de remplacement.
- **Avec un agent IA :** Fournir données, unités et règles d’échelle plutôt qu’un simple exemple visuel.
- **À vérifier :** Ni classement de popularité ni performance garantie ; tester le rendu et les alternatives textuelles.

### 5.6. Lightweight Charts

- https://www.tradingview.com/lightweight-charts/

Lightweight Charts, proposé par TradingView, vise notamment les séries temporelles et graphiques financiers. Le choix est plus pertinent lorsqu’une interaction sur le temps ou une représentation financière est réellement nécessaire que pour un simple indicateur isolé. Évaluez le niveau de détail, le zoom et les informations visibles au toucher. Ne reprenez pas un poids de bundle trouvé dans une ancienne fiche : mesurez la version et les options du projet.

- **Non-designer :** Examiner la lecture d’une série dans le temps et la compréhension des valeurs.
- **Développeur :** Vérifier les notices, l’attribution et les performances de la version retenue.
- **Avec un agent IA :** Fournir la structure temporelle, les unités et les règles de mise à jour.
- **À vérifier :** Une bibliothèque financière ne garantit pas la pertinence des données ni une taille de fichier fixe.

### 5.7. Chartist, uPlot et Visx

- https://chartist.dev/
- https://github.com/leeoniya/uPlot
- https://airbnb.io/visx/

Chartist, uPlot et Visx répondent à des choix d’architecture différents : graphiques SVG stylisés, séries temporelles ou primitives de visualisation pour React. La documentation Chartist actuelle remplace ici l’ancienne URL du document fourni. Comparer ces options exige un cas réel, pas un classement général de vitesse. Le degré de contrôle recherché change le travail de développement et de maintenance ; un outil plus bas niveau ne fournit pas automatiquement une interface plus compréhensible.

- **Non-designer :** Comparer la même question et les mêmes données, avec une légende équivalente.
- **Développeur :** Évaluer contrôle, intégration, mesure de performance et charge de maintenance.
- **Avec un agent IA :** Donner les contraintes et la bibliothèque choisie, sans demander d’assembler les trois.
- **À vérifier :** Les API et licences sont distinctes ; mesurer plutôt que répéter des chiffres de poids non vérifiés.

## 6. Illustrations et 3D

Trouver un visuel utile sans oublier droits, poids et alternative.

**Question de décision :** L’illustration apporte-t-elle une information plutôt qu’un obstacle au chargement ?

### 6.1. unDraw

- https://undraw.co/illustrations

unDraw propose des illustrations que l’on peut examiner pour un écran vide ou une page de présentation. Sa licence autorise des usages gratuits, y compris commerciaux, mais comporte des restrictions explicites : elle ne permet pas d’en faire un pack d’assets ni d’en utiliser les fichiers pour l’entraînement ou le développement d’IA sans permission séparée. Ce répertoire ne redistribue aucune illustration unDraw. Choisissez un visuel pour son sens et non pour remplir un espace.

- **Non-designer :** Choisir une illustration qui explique un état sans remplacer le message utile.
- **Développeur :** Conserver la source et examiner licence, poids et alternative textuelle avant usage.
- **Avec un agent IA :** Fournir une référence approuvée ; ne pas faire aspirer ou réutiliser les fichiers pour entraîner un modèle.
- **À vérifier :** Licence spécifique, pas une promesse générale d’open source ; lire la page de licence actuelle.

### 6.2. Storyset

- https://storyset.com/

Storyset propose des collections et des outils de personnalisation d’illustrations. Choisir une même famille peut aider à garder une cohérence, mais la licence doit accompagner la décision. Les conditions consultées prévoient une attribution pour l’usage gratuit et des restrictions de redistribution. Une animation ne doit pas être nécessaire à la compréhension d’un état et doit avoir une alternative appropriée. Aucun fichier Storyset n’est inclus dans ce kit.

- **Non-designer :** Choisir une famille et examiner le sens du visuel sur l’écran concerné.
- **Développeur :** Prévoir l’attribution requise et vérifier poids, mouvement réduit et droits de livraison.
- **Avec un agent IA :** Fournir les références autorisées et les conditions, sans téléchargement massif ni pack dérivé.
- **À vérifier :** L’usage gratuit est soumis à attribution selon les conditions consultées ; vérifier les éventuelles autres restrictions.

### 6.3. DrawKit et ManyPixels

- https://www.drawkit.com/
- https://www.manypixels.co/gallery

DrawKit et ManyPixels permettent d’explorer des illustrations regroupées par styles ou thèmes. Une catégorie comme santé ou finance n’est pas une validation du sens, de la représentation des personnes ou du contexte de votre service. Sélectionnez quelques images cohérentes puis vérifiez les fichiers et leurs droits précis. Les collections gratuites et payantes peuvent coexister ; ne déduisez pas les droits d’un pack de ceux d’une autre ressource du même site.

- **Non-designer :** Comparer quelques visuels avec le message qu’ils doivent accompagner.
- **Développeur :** Vérifier les conditions du pack, le format et le poids avant livraison.
- **Avec un agent IA :** Donner une liste de fichiers approuvés plutôt qu’une galerie à télécharger automatiquement.
- **À vérifier :** Examiner la licence de chaque collection ; aucun pack tiers n’est redistribué dans ce guide.

### 6.4. Humaaans et Open Peeps

- https://www.humaaans.com/
- https://www.openpeeps.com/

Humaaans et Open Peeps, créés par Pablo Stanley, proposent des éléments de personnages que l’on peut combiner. Cette modularité aide à discuter d’une scène, de ses personnes et de leur posture sans créer chaque forme. Elle ne garantit ni une représentation inclusive ni l’adéquation au public visé. Examinez les associations réellement choisies, le contexte d’usage et la licence de la ressource téléchargée.

- **Non-designer :** Composer une scène et discuter de ce qu’elle représente avant de la retenir.
- **Développeur :** Conserver les références et vérifier les droits du fichier ou pack utilisé.
- **Avec un agent IA :** Fournir une composition approuvée plutôt que demander des variations sans contrôle.
- **À vérifier :** L’auteur, les droits et les conditions se vérifient pour la collection effectivement téléchargée.

### 6.5. Blush et Ouch!

- https://blush.design/
- https://icons8.com/illustrations

Blush et Ouch! regroupent des illustrations de plusieurs styles et offres. Le format téléchargeable, la résolution, l’attribution et les droits peuvent dépendre du choix et du forfait. Retenez d’abord une direction qui convient au contenu, puis examinez ce qui peut être utilisé et livré. Un aperçu visible dans une galerie n’autorise pas à le télécharger par un autre moyen pour contourner une restriction.

- **Non-designer :** Choisir une direction illustrée avec quelques exemples plutôt qu’un mélange de styles.
- **Développeur :** Comparer formats et conditions d’accès avant de prévoir l’intégration.
- **Avec un agent IA :** Donner les fichiers autorisés et les limites de modification ou d’attribution.
- **À vérifier :** Ne pas promettre un SVG gratuit pour toutes les illustrations ; vérifier offre et licence du choix précis.

### 6.6. IRA Design

- https://iradesign.io/

IRA Design est une piste d’illustrations à personnages et objets, avec une identité fondée notamment sur les dégradés. Avant d’adopter cette direction, essayez-la sur le fond et à la taille de votre interface : une scène détaillée peut perdre son sens en miniature. Vérifiez la lisibilité du message voisin et le poids du fichier. Une illustration peut rester décorative et recevoir une alternative vide, si aucune information n’y est portée.

- **Non-designer :** Examiner si la scène aide la lecture de l’état ou détourne l’attention.
- **Développeur :** Vérifier le format, la licence et l’adaptation au thème clair/sombre.
- **Avec un agent IA :** Fournir le fichier autorisé et préciser s’il est informatif ou décoratif.
- **À vérifier :** Ne pas laisser un agent recolorer ou redistribuer des fichiers sans examiner les droits et le résultat.

### 6.7. 3Dicons, Shapefest, Toy Faces, Khagwal 3D et Spline

- https://3dicons.co/
- https://www.shapefest.com/
- https://www.toyfaces.com/
- https://3d.khagwal.com/
- https://app.spline.design/community

Ces ressources ne livrent pas toutes la même chose : image rendue, avatar, objet ou scène interactive. Une image PNG peut suffire à un écran d’accueil alors qu’une scène Spline ajoute des interactions et des coûts de chargement à examiner. Les offres gratuites et payantes ainsi que les droits diffèrent selon le pack. Ne présentez pas tout ce groupe comme open source. Choisissez le support le plus simple qui porte l’information voulue et prévoyez un remplacement statique si nécessaire.

- **Non-designer :** Comparer l’apport réel du volume à celui d’une image plus simple.
- **Développeur :** Distinguer rendu statique, modèle source et scène embarquée ; mesurer le chargement.
- **Avec un agent IA :** Fournir la ressource approuvée et imposer un repli accessible, sans achat ni import automatique.
- **À vérifier :** Examiner les droits et limites de chaque pack ; aucun rendu ou modèle tiers n’est fourni avec le guide.

## Trois licences à examiner avant tout téléchargement

- **ApexCharts :** la licence actuelle distingue Community sous conditions, Commercial et OEM/redistribution. Vérifiez le régime applicable à l’organisation et à l’usage : https://apexcharts.com/license/
- **unDraw :** licence spécifique, restrictions de redistribution en packs et d’usage pour l’entraînement/développement IA : https://undraw.co/license
- **Storyset :** attribution requise dans l’offre gratuite selon les conditions consultées ; vérifier les autres restrictions : https://storyset.com/terms

## Sources et limites éditoriales

Adaptation du document fourni par le créateur : repertoire-complet-ui-ux-profils.md. Les références ci-dessous ont servi aux corrections ciblées, pas à un audit juridique des 75 liens. Les conditions peuvent évoluer. Les fonctions actuelles de certaines pistes sont expressément signalées comme non testées dans leurs fiches.

- **Radix Colors — Understanding the scale** — https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
  Douze étapes et usages, avec exceptions explicites ; aucune garantie générale de contraste.
- **Google Fonts — FAQ** — https://fonts.google.com/faq
  Gratuité et usage commercial sous conditions de chaque licence ; fichiers, langues et hébergement à choisir.
- **Lucide — notice du paquet 0.511.0** — https://github.com/lucide-icons/lucide/blob/main/LICENSE
  Notice ISC lue dans le paquet local lucide-react ; mentions héritées de Feather. Copie incluse dans LICENCES.txt.
- **shadcn/ui — Introduction** — https://ui.shadcn.com/docs
  Distribution de code ouvert, composition et prise en charge des adaptations et mises à jour.
- **Recharts** — https://recharts.github.io/
  Composition de composants React, SVG et sous-modules D3. Redirection du domaine fourni constatée.
- **ApexCharts — License Options** — https://apexcharts.com/license/
  Modèle actuel Community sous conditions, Commercial et OEM/redistribution ; ne pas reprendre une qualification générale de gratuité.
- **unDraw — License** — https://undraw.co/license
  Licence spécifique ; restrictions de redistribution en packs et d’usage pour entraînement/développement IA.
- **Storyset — Terms of Use, section 6** — https://storyset.com/terms
  Usage gratuit conditionné à l’attribution ; restrictions de redistribution et autres conditions à lire.
- **Fontshare** — https://www.fontshare.com/
  Le catalogue présente notamment des familles closed source ; la gratuité ne vaut pas licence universelle.
- **React Native Reusables** — https://reactnativereusables.com/
  Adresse actuelle consultée, remplaçant l’ancienne documentation hébergée ailleurs.
- **Chartist** — https://chartist.dev/
  Documentation actuelle consultée, remplaçant l’ancienne adresse du document fourni.

## Et après le répertoire ?

Ce guide aide à choisir des ressources. Le UX/UI Playbook payant traite la préparation et la revue d’une interface : manuel, kit de fiches A4 et archive avec tokens, gabarits et scanner. Il n’est pas inclus dans ce téléchargement gratuit.

Découvrir l’édition française (29 USD) : https://joyccelight-playbook.uxplay.workers.dev/fr?utm_source=repertoire-ui-ux&utm_medium=markdown&utm_campaign=ressource-gratuite#buy

Lire les articles gratuits : https://joyccelight-playbook.uxplay.workers.dev/fr/articles?utm_source=repertoire-ui-ux&utm_medium=markdown&utm_campaign=ressource-gratuite

## Conditions d’usage

Texte et mise en page : Joy N. / Joyccelight, 2026. Vous pouvez consulter ce guide, l’utiliser dans vos projets personnels ou professionnels et adapter les fiches de décision pour votre équipe ou vos clients. Ne revendez pas ce guide et ne le republiez pas à l’identique sous votre nom ; partagez plutôt sa page de téléchargement. Ces conditions concernent uniquement ce guide : elles ne concèdent aucun droit sur les sites, marques, polices, icônes, composants ou visuels cités. Les auteurs et leurs licences restent les références. Aucun partenariat ni affiliation rémunérée avec les services cités n’est revendiqué. Ce guide n’est pas un conseil juridique.
