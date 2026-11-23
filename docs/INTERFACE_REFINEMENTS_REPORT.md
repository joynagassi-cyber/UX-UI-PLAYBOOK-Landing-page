# Retouches d’interface et vérification de l’accès public

## Périmètre

Retouches préparées pour une pull request depuis `arena/731001db-ux-ui-playbook-landing-page`, comparées au commit initial `b27b56da6d2b41cc4bd11117067201cf60718c69`. La validation ci-dessous a précédé la demande de commit, push et ouverture de PR. Aucun déploiement manuel ni réglage Cloudflare/DNS n’est inclus dans ce travail.

### Corrections

- **Scrollbars** : masquage global de leur apparence avec `scrollbar-width: none` et `::-webkit-scrollbar`. Aucun verrouillage global du défilement n’a été ajouté. Le défilement vertical de la page et des sommaires, le défilement horizontal des tableaux/blocs de code et celui de la liseuse sont conservés.
- **Sommaire desktop** : commande native `details/summary`, ouverte par défaut. Le repli réduit le rail de 248 à 48 px et libère la place pour l’article. La commande reste hors du panneau défilant et permet de rouvrir le sommaire. Son nom accessible distingue « Replier le sommaire » et « Afficher le sommaire ».
- **Sommaire mobile** : même mécanisme natif, fermé par défaut, panneau à hauteur limitée et défilant. Il se superpose à l’article pour ne pas déplacer la lecture. Avec JavaScript, Échap ferme le panneau et rend le focus à sa commande ; choisir un lien le ferme et place le focus sur le titre visé. Sans JavaScript, ouverture/repli au clavier et liens d’ancrage restent disponibles ; la fermeture automatique après un lien nécessite JavaScript.
- **Section active** : quand la fin de la section précédente et le titre demandé partagent la bande observée sur un écran court, priorité à la section visible suivante.
- **Aperçus du livre** : infobulle native `title="Extrait du livre"` / `title="Book excerpt"` sur les deux aperçus du hero et les dix cartes, avec libellés accessibles et annonce de l’ouverture d’un dialogue. Les articles originaux ne sont pas renommés « extraits du livre ».
- **Navigation** : espacements resserrés pour accueillir les libellés FR plus longs, sans masquer davantage de liens, réduire la police ni descendre sous des cibles de 44 × 44 px. Vérification aux largeurs 1181, 1280 et 1440 px dans les deux thèmes.

### Rédaction ciblée FR/EN

Les formulations génériques ont été remplacées par des informations sur les fichiers ou les démarches :

| Avant | Après / intention |
| --- | --- |
| « Pages réelles » | « Extraits du livre » dans la navigation ; « Extrait du livre » au survol |
| « Paiement sécurisé Gumroad » | « Paiement via Gumroad », sans affirmation de sécurité vérifiée |
| Téléchargement « instantané » | Téléchargement après achat, sans promesse de délai technique |
| Auteur « créateur de solutions numériques » | Auteur du manuel, des fiches A4 et des fichiers de travail |
| « Défendre ses choix sans jargon » | Cadrage, estimation, proposition en une page et présentation au client |
| « L’agent vérifie et rend un rapport » | Instructions Markdown à fournir à l’agent, sans garantir son exécution |
| Remboursement présenté comme un résultat sous sept jours | Demande de remboursement dans les sept jours, conformément à la FAQ existante |

L’audit objet par objet recense **29 valeurs rédactionnelles modifiées ou ajoutées**, sans autre différence de données dans `CONTENT`, plus le type `insideSection.previewLabel`. Prix, éditions, contenu livré et liens d’achat sont conservés. Les huit corps de guides, leurs sources, les téléchargements, images, fontes, licences, 14 URL et origine canonique `https://joyccelight-playbook.pages.dev` ne changent pas.

## Inventaire contre le HEAD initial

**211 fichiers suivis au départ : 205 identiques, 6 modifiés ; 3 nouveaux fichiers, aucune suppression.**

- Production, cinq fichiers modifiés : `src/app/globals.css`, `src/components/NotionArticleReader.tsx`, `src/components/BookGalleryLightbox.tsx`, `src/app/[locale]/page.tsx`, `src/i18n/content.ts`.
- Tests : adaptation de `tests/ui.spec.ts` aux états natifs du sommaire ; ajout de `tests/interface.spec.ts` et `tests/interface-copy.test.cjs`.
- Documentation : le présent rapport.
- Hors périmètre : aucun changement. Aucun changement du Worker, de son nom `joyccelight-playbook`, des configurations de déploiement ou des baselines.
- Preuves et installations locales volontairement ignorées par Git : `reports/interface-refinements/`, `test-results/`, `.cache/browser/`, `node_modules/`, `.next/`, `out/`, `.wrangler/`. Aucune de ces installations n’est une dépendance ajoutée au projet.

### Contrôle historique de préservation : exception explicite, non masquée

`npm run check:preservation` **reste en échec** : **107 des 108 fichiers protégés sont strictement identiques** ; seul `src/i18n/content.ts` diffère pour les corrections demandées ci-dessus. Ni `docs/technical-baseline.json` ni le contrôleur n’ont été modifiés ou réinitialisés pour obtenir du vert. L’audit local vérifie les 29 champs attendus et l’absence d’autres différences dans ces données.

Les workflows existants appellent ce contrôle avant les autres tests : cet échec est donc signalé explicitement dans la PR et devra être traité avant une éventuelle fusion. Il ne doit pas être présenté comme un résultat « 108 fichiers inchangés » ni confondu avec un échec fonctionnel des tests ci-dessous. Aucun contrôle n’a été neutralisé pour ouvrir la PR.

## Validations finales réellement exécutées

Environnement : Node 22, Next.js 16.4.6, Playwright avec Chromium 138.0.7204.0 ; export statique servi par le Worker local et son binding ASSETS sur le port 3100.

| Contrôle | Résultat final |
| --- | --- |
| `npm run build` | 21 générations statiques, 14 URL éditoriales conservées |
| `npm run lint`, `npm run typecheck`, `git diff --check` | Réussite |
| `npm test` | **187/187**, aucun échec ou test ignoré |
| Playwright, suite complète | **110/110**, zéro retry, flaky ou test ignoré |
| `npm run check:export` | **268/268** |
| `scripts/site_check.py` sur le Worker local | **778 contrôles automatisés**, zéro échec bloquant ; 4 points à vérifier et 1 non applicable conservés |
| `scripts/seo_check.py` sur le Worker local | **484/484**, 270 requêtes |
| `npm run check:worker` | Dry-run réussi, **aucune publication** |
| Ancien contrôle SHA | Alerte attendue sur le seul fichier de copie, détaillée ci-dessus |

La suite navigateur couvre les deux langues/thèmes, les 14 pages, le repli/réouverture sans JavaScript, les noms et états natifs exposés par l’arbre d’accessibilité Chromium, Échap/focus, le clavier, la molette, les tableaux/code et des gestes tactiles injectés dans un contexte mobile Chromium. Ces derniers ne remplacent pas un essai sur téléphone physique ni une validation Safari/Firefox.

**Pièces axe archivées : 70 analyses, aucune violation signalée ; 66 résultats incomplets `color-contrast` restent à examiner humainement.** Ce résultat n’est pas une certification WCAG. Aucun nouveau profilage de performance ou résultat de terrain n’est revendiqué.

Les premières passes ont identifié une mauvaise hypothèse de test sur le rôle ARIA de `summary`, un panneau tactile non débordant dans la taille de test choisie, la priorité entre sections visibles et le débordement du menu FR. Les assertions ont été adaptées aux propriétés natives réelles ; les deux problèmes d’interface ont été corrigés. Les tentatives en échec sont conservées séparément ; le résultat final ci-dessus provient d’une nouvelle exécution complète.

Preuves locales : `reports/interface-refinements/browser-final.json`, `browser-summary.json`, `site-check.json`, `seo-check.json`, `copy-changes.json`, `change-inventory.json`, journaux des commandes et captures desktop/mobile. Les checks historiques de migration ne servent pas de preuve pour cette passe.

## Essai d’accès et d’extraction du site public

URL fournie : <https://joyccelight-playbook.uxplay.workers.dev/en/articles>.

**L’outil de lecture a pu extraire le hub sans connexion ni challenge visible** : quatre cartes avec titres/descriptions et leurs liens, ainsi que l’offre. Le début de `/en/articles/ux-design-guide` fournit aussi des paragraphes et citations lisibles : l’extraction ne se limite pas aux cartes. `robots.txt` et le premier des deux blocs de `llms.txt` ont également été lus. Les déclarations `Allow: /` sont visibles ; elles ne prouvent pas qu’un robot particulier a effectivement visité le site.

Les quatre liens extraits :

- `/en/articles/ux-design-guide`
- `/en/articles/ui-design-system-tokens`
- `/en/articles/product-design-ai-agents`
- `/en/articles/ux-ui-product-design`

**Limite distincte** : la sonde HTTP brute du sandbox, avec un User-Agent descriptif et sans authentification, a rencontré une fermeture TLS avant toute réponse HTTP. Elle s’est arrêtée au premier échec, sans tentative de contournement. L’outil de lecture ne fournit pas les en-têtes ou le statut HTTP bruts et sa conversion peut omettre des éléments du HTML ; aucun statut chiffré ni extraction exhaustive du HTML public n’est donc attesté ici.

Conclusion : accès et extraction simples **avec cet outil de lecture**, mais pas de preuve d’accès pour tous les clients/crawlers, d’indexation, de citation IA, de SHA déployé ou de validation du checkout. Ce constat public précède la préparation de la PR et ne prouve pas que son code soit déployé sur l’URL distante. Aucun déploiement manuel, réglage Access ou changement de domaine canonique n’a été effectué. Détails locaux : `reports/interface-refinements/public-access/check.json`.
