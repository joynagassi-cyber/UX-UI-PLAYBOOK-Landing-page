# Captures Microlink et PDF cliquables

## État actuel — à ne pas confondre avec des captures terminées

**Aucun appel API Microlink n’a été effectué depuis cet environnement.** L’essai GitHub local s’est arrêté sur `ENOKEY`. Lors de l’ouverture de la PR, le commit distant `ddf2bccc6864d4f23b15e0da043df7189d869c76`, déjà présent sur cette même branche, a apporté **21 PNG marqués approuvés par leur soumission**. Ils sont conservés sans modification, ainsi que leur [manifeste original](manifest.external-ddf2bcc.json), archivé octet pour octet. Ses 75 entrées déclarent 21 approuvées, 3 rejetées, 1 en échec et 50 en attente ; le commit rapporte un arrêt de quota `ERATE`. Ces déclarations ne sont pas une nouvelle revue visuelle réalisée ici.

Le manifeste canonique `manifest.json` signale `pendingExternalImport`. Le format externe, les noms et les dimensions **2560 × 1600** diffèrent du pipeline local ; **14 PNG dépassent 200 000 octets**. Les 21 SHA-256, tailles et dimensions ont été vérifiés hors réseau, mais les images ne sont pas encore intégrées au pipeline PDF. **Les appels de capture sont bloqués sur `EIMPORTPENDING`** pour éviter de repayer des URLs déjà capturées. Le plan reste utilisable sans réseau et indique une estimation d’appels inconnue (`null`), pas 75 nouvelles captures à lancer.

La clé précédemment publiée dans le chat n’a pas été recopiée ni utilisée ici ; elle doit être révoquée et remplacée.

Le code prépare **75 captures uniques**, réutilisées dans les guides français et anglais. L’intégration PDF ajoute une galerie avec, pour chaque destination, une image cliquable, une URL cliquable, le numéro de fiche et la date d’obtention. Aucun emplacement vide, aperçu inventé, résultat Google ou capture locale ne remplace une vraie capture Microlink.

Les PDF et ZIP existants restent les éditions **sans captures**, de 34 pages de guide et 3 pages de fiche. **Ne pas annoncer une édition illustrée avant d’avoir terminé les étapes ci-dessous.**

## Limites rencontrées ici

- Projet principal : Node **22**, Next.js/TypeScript, npm ; scripts de fabrication JavaScript.
- Le SDK `microlink.io` **1.1.7** déclare Node **24 ou supérieur**. Il est isolé dans `tools/microlink/`, avec son propre `package.json` et son verrou npm. Le runtime et les dépendances du site ne sont pas migrés.
- `npx -y microlink.io setup` a échoué avec « could not determine executable to run ». L’invocation du paquet explicitement versionné a trouvé la commande, mais le téléchargement du skill a échoué. La référence officielle a été récupérée depuis le dépôt GitHub de Microlink et lue ; aucune commande `setup` réussie n’est revendiquée.
- L’accès sortant du sandbox est limité à une liste d’hôtes qui n’inclut pas l’API/CDN Microlink. **Aucun appel API ni téléchargement CDN n’a été tenté** : l’essai s’est arrêté sur l’absence de clé. L’échec du téléchargement du skill n’est donc pas une mesure de connectivité de l’API/CDN. Le login CLI utilise en outre un retour `127.0.0.1` sur la machine qui lance la commande : le navigateur du propriétaire n’est pas cette machine. **Aucun login approuvé ni clé récupérée automatiquement ici.**

La suite doit donc être exécutée sur un ordinateur ayant accès à Microlink, ou reprise dans un environnement qui le permet. Ne pas contourner les restrictions réseau ou les blocages d’un site.

## 0. Réconcilier d’abord le lot externe, hors réseau

Les commandes d’acquisition des sections suivantes ne doivent être reprises **qu’après** cette étape. Ne pas supprimer `pendingExternalImport` simplement pour débloquer un appel.

1. Conserver les originaux et leur manifeste externe ; les tests comparent leurs SHA-256, tailles, dimensions et destinations au catalogue.
2. Préparer un import explicite vers le schéma canonique `captures`, les chemins attendus et les bornes d’images du pipeline. Si des dérivés optimisés sont nécessaires, ne pas remplacer les originaux ni réutiliser silencieusement leur approbation : conserver la provenance et relire les dérivés. Cette PR ne transforme ni ne recadre les PNG reçus.
3. Transcrire aussi les rejets, échecs et entrées en attente : ne pas les convertir en réussites. L’arrêt de quota rapporté doit être examiné avant toute autorisation de reprise ; aucune boucle de nouvelle tentative n’est permise.
4. Vérifier l’import hors réseau et l’absence de doublons payants avant de retirer le marqueur de blocage. Recalculer alors le vrai plan restant, plutôt que relancer arbitrairement 75 captures.

L’import complet et la nouvelle revue restent à effectuer. Cette conservation de branche ne constitue pas une édition illustrée achevée.

## 1. Installer l’outil isolé et s’authentifier localement

Sur votre ordinateur, dans une copie de ce dépôt avec ses modifications, utilisez un terminal **Node 24+ uniquement pour cet outil**. Conservez Node 22 pour construire le site.

```bash
node --version
npm ci --prefix tools/microlink
npm run --prefix tools/microlink setup
npm run --prefix tools/microlink login
```

Validez le login dans votre navigateur. Si Microlink demande quelle clé choisir, faites ce choix vous-même dans ce terminal ; ne transmettez ni clé ni mot de passe à l’agent. N’utilisez pas la clé exposée dans le chat.

Le login sauvegarde la clé dans `~/.config/microlink/config.json`. Pour la copier dans le projet **sans l’afficher** :

```bash
npm run --prefix tools/microlink import-key
```

Le script conserve les autres variables de `.env.local`, refuse un fichier suivi par Git ou un lien symbolique et applique les permissions `0600`. `.env.local` est déjà ignoré par Git. La clé s’appelle **`MICROLINK_API_KEY`**, jamais `NEXT_PUBLIC_MICROLINK_API_KEY`.

Alternative : renseigner vous-même la clé renouvelée dans `.env.local` via un éditeur local sécurisé. Ne pas la passer comme argument de commande, la placer dans une URL, la mettre dans le code navigateur, l’ajouter au ZIP client ou la renvoyer dans le chat.

## 2. Faire un seul essai GitHub

```bash
npm run microlink:github
```

Le code utilise l’export par défaut du SDK :

```js
import createClient from 'microlink.io'

const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })
const image = await microlink.screenshot('https://github.com/', {
  type: 'png',
  meta: false,
  fullPage: false,
  retry: 0,
  viewport: { width: 1280, height: 720, deviceScaleFactor: 1, isMobile: false }
})
```

La clé est envoyée par le SDK dans l’en-tête `x-api-key` vers l’API Pro, pas dans la query string. Le script télécharge ensuite le PNG depuis le CDN **sans envoyer la clé**. Un garde réseau empêche aussi les reprises HTTP automatiques du SDK de produire un deuxième appel réel ; les redirections de la requête authentifiée sont refusées.

En cas de succès, le chemin du PNG est affiché. Ouvrez ce fichier pour vérifier le vrai résultat avant toute série. Le PNG original 1280 × 720 reste dans `.cache/microlink/raw/`, ignoré ; une version PNG optimisée, de 960 à 640 px de large, est enregistrée sous `images/` pour le PDF. Les images optimisées sont plafonnées à 200 Ko chacune pour maîtriser la taille des deux kits. Cette optimisation est locale et ne consomme pas de nouvelle capture API.

**Ne pas relancer en boucle.** En cas d’échec, lire le `code` affiché et celui sauvegardé dans le manifeste. Exemples :

- `EIMPORTPENDING` : lot externe à réconcilier hors réseau avant tout nouvel appel ; ne pas supprimer le marqueur ni recapturer les URLs déjà présentes.
- `ENOKEY` : clé renouvelée absente de `.env.local`, aucune requête API tentée.
- `ENODEVERSION` : utiliser Node 24+ pour l’outil isolé, sans migrer le site.
- `EAUTH` : clé invalide, à vérifier dans le compte.
- `ERATE` : quota atteint ; arrêter et vérifier le plan/la date de réinitialisation.
- `EBRWSRTIMEOUT` / `ETIMEOUT` : examiner la page et les options avant d’autoriser une nouvelle tentative.
- `EPROXYNEEDED` : site bloquant la capture ; aucun proxy ou contournement n’est déclenché automatiquement.
- `EPREVIOUS` : une tentative précédente a échoué ou a été interrompue ; elle n’est pas répétée silencieusement.

Une tentative interrompue sans reçu peut avoir été comptée par Microlink. Après lecture du code, une reprise **individuelle explicitement autorisée** est possible avec `--url ... --retry-failed`. Un reçu CDN déjà sauvegardé est réutilisé sans demander une nouvelle capture. Le code ne se rabat jamais sur l’API gratuite.

## 3. Examiner le plan avant les 75 captures

```bash
npm run microlink:plan
```

Cette commande est hors réseau, ne nécessite aucune clé et ne consomme aucun appel. Elle affiche les images reconnues dans le schéma canonique, les validations, les reçus et les échecs. Tant que `pendingExternalImport` est présent, elle affiche aussi le lot externe et `captureBlocked: true` ; `apiCallsNeeded: null` signifie que le budget restant n’est pas encore déterminé. Ne pas confondre zéro image canonique avec l’absence des 21 PNG externes conservés.

Les 75 liens du répertoire ont 75 destinations distinctes. Le test `https://github.com/` n’en fait pas partie : le premier essai puis une série complète peuvent donc nécessiter **jusqu’à 76 requêtes API**, hors tentatives expressément renouvelées. Vérifiez votre quota réel dans le compte ; aucun abonnement ou achat n’est engagé par le code.

Ne lancer la série qu’après avoir vérifié le résultat GitHub et accepté le budget :

```bash
npm run microlink:capture -- --all --max-calls 75 --confirm-billable
```

Cette commande est **une autorisation explicite de série**, pas le comportement par défaut. Elle effectue les captures une par une, déduplique les URLs, conserve chaque résultat et s’arrête au premier échec. Les deux langues partagent les mêmes images, donc pas de deuxième série de 75 appels. Ne lancez pas plusieurs processus en parallèle : un verrou local le refuse. Après un arrêt brutal, inspectez le processus et `.cache/microlink/capture.lock` avant de retirer un verrou devenu orphelin.

Pour traiter une seule destination du catalogue :

```bash
npm run microlink:capture -- --url https://tweakcn.com/
```

## 4. Relire les images avant publication

Une réponse API réussie peut représenter une bannière, une page de connexion, un CAPTCHA ou une erreur. Ouvrez chaque PNG ; ne validez pas une telle image comme aperçu du service. Ne contournez pas un écran d’authentification, un accès payant ou les restrictions d’un auteur. Respectez aussi les termes applicables aux captures automatisées et leur diffusion.

Les images commencent avec `review: "pending"`. Après vérification visuelle d’une URL :

```bash
npm run microlink:capture -- --approve https://tweakcn.com/
```

L’approbation ne fait aucun appel réseau. Les fichiers sont contrôlés par nom attendu, signature PNG, dimensions, taille et SHA-256. Ni une image absente, ni un fichier remplacé, ni un lien symbolique, ni une capture non relue n’est accepté pour générer une édition complète.

Les aperçus portent une date **d’obtention**, pas une garantie de date de prise de vue : Microlink peut retourner une image mise en cache. Ils ne constituent pas une validation des prix, droits, performances ou fonctionnalités actuels du service. Les marques et contenus restent ceux de leurs auteurs ; le guide ne transforme pas un aperçu de site en pack d’illustrations réutilisables.

## 5. Intégrer les vraies images dans les deux PDF et ZIP

Si les captures ont été réalisées sur votre ordinateur, vous pouvez transmettre à l’agent **uniquement** `manifest.json` et `images/`, réunis dans une archive. **Ne pas joindre `.env.local`, `config.json`, les clés ou les fichiers de connexion.** Les originaux PNG locaux ne sont pas nécessaires à l’intégration.

Une fois les 75 images présentes et approuvées, revenir à **Node 22** dans le projet principal :

```bash
npm ci
npm run generate:resource -- --with-screenshots
npm run generate:resource:en -- --with-screenshots
npm run check:resource
npm run typecheck
npm run build
npm run check:export
```

Le mode `--with-screenshots` n’appelle aucune API. Il ajoute **19 pages de galerie**, à quatre sites maximum par page, avant la dernière page du guide. Avec la mise en page actuelle : **53 pages par guide**, et toujours 3 pages pour la fiche de décision. L’image et l’URL pointent toutes deux vers la destination exacte. La galerie est numérotée avec le reste du guide ; les poids, SHA-256 et nombres de pages du manifeste sont recalculés. Les ZIP conservent sept fichiers : les images sont intégrées au PDF, pas livrées comme un pack tiers.

Si une image manque ou attend une revue, le mode illustré s’arrête **avant d’écraser les livrables actuels**. Sans ce drapeau, le générateur garde le format éditorial sans galerie : ne pas régénérer une édition illustrée sans le drapeau.

Après cette génération seulement, relire les PDF, vérifier les liens d’images, puis **actualiser les mentions de pages et tailles dans les fiches Gumroad et documents de publication FR/EN** d’après les manifestes. Ils décrivent encore les kits actuels de 34 pages. Ne pas publier un texte annonçant 34 pages avec un PDF de 53 pages. Tester ensuite les téléchargements et le parcours gratuit avant publication.

## Fichiers techniques

- `tools/microlink/capture.mjs` : SDK côté serveur, budget, reçus, cache, arrêt sur erreur, PNG optimisés et revue.
- `tools/microlink/import-key.mjs` : copie locale de la clé autorisée, sans l’afficher.
- `scripts/free_resource_screenshots.cjs` : plan hors ligne, contrôles d’intégrité, galerie PDF et liens image/texte.
- `manifest.json` : schéma canonique, provenance/revue et marqueur d’import en attente, sans clé ni en-têtes authentifiés.
- `manifest.external-ddf2bcc.json` : soumission distante originale conservée octet pour octet, non interprétée comme un import terminé.
- `images/` : les 21 PNG externes originaux sont conservés inchangés ; leurs noms et poids ne sont pas encore ceux du pipeline optimisé.

Documentation de la méthode : https://microlink.io/docs/sdk/methods/screenshot.md

**Aucun appel distant, crédit Microlink ou login approuvé n’est revendiqué depuis cet environnement.** Le lot externe est attribué à son commit et à son manifeste, sans prétendre l’avoir capturé ou approuvé ici. Aucune publication Gumroad ni aucun déploiement n’est effectué.
