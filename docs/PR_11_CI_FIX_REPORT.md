# PR 11 : diagnostic avant fusion

Le propriétaire a demandé de corriger les échecs avant la fusion de la [PR 11](https://github.com/joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page/pull/11). La branche reste `arena/52b57736-ux-ui-playbook-landing-page` ; aucune protection ni vérification n’est contournée.

## Échecs navigateur reproduits

Au commit `98c81d9`, les deux jobs d’export statique réussissent. Les jobs UI passent préservation, lint, types, unitaires, build et vérifications HTTP, puis échouent dans Playwright.

Les téléchargements des logs et artefacts redirigent vers des hôtes inaccessibles depuis cet environnement. Le commit de diagnostic `403cee8` ajoute donc le reporter GitHub de Playwright **uniquement dans GitHub Actions**, en conservant les reporters liste/JSON/HTML, les traces et les captures. Les assertions sont désormais lisibles dans les annotations de la Checks API.

Le [run de diagnostic de la PR](https://github.com/joynagassi-cyber/UX-UI-PLAYBOOK-Landing-page/actions/runs/45284528966) confirme deux échecs dans `tests/interface.spec.ts` : rouvrir le sommaire mobile après avoir suivi le lien des sources décale le texte en cours de lecture de **23 px**, en FR et en EN. La reproduction locale avec Chromium 153 donne les mêmes positions :

| Langue | Avant réouverture | Après réouverture, avant correctif |
| --- | ---: | ---: |
| FR | 139,171875 px | 162,171875 px |
| EN | 138,984375 px | 161,984375 px |

Le précédent passage local avec Chromium 138 n’avait pas révélé ce comportement. Il ne remplace pas une exécution dans le navigateur utilisé en CI.

## Cause et correction ciblée

La règle globale `main summary { scroll-margin-block-start: 96px; }` protège normalement les contrôles des en-têtes fixes. Or le sommaire mobile est lui-même déjà positionné par un parent sticky à 72 px. Dans le navigateur récent, la prise de focus de son bouton natif tente de respecter cette marge et déplace le document de 23 px. La position du titre dans le document et les dimensions du contenu restent identiques ; c’est la position de défilement de la page qui change.

La correction définit `scroll-margin-block-start: 0` **sur le seul résumé du sommaire mobile**, dans son media query existant. Elle ne retire pas les marges des autres contrôles ni des ancres. Aucun gestionnaire JavaScript supplémentaire, défilement artificiel, remplacement de `details/summary` ou barre visible n’est ajouté.

Les deux assertions exactes de position sont conservées. Les tests contrôlent aussi la stabilité de `scrollY`, la réouverture au clavier et la conservation de la position sans JavaScript. Aucun test désactivé, aucune tolérance élargie ni relance automatique.

## Première validation du correctif

- Build Next statique : réussi.
- Vérifications d’export : **282/282**.
- Tests ciblés Chromium 153 : **4/4**, FR/EN, interactions mobiles et navigation native sans JavaScript.
- Les exécutions complètes locales et GitHub sont consignées séparément après leur terminaison ; ces quatre tests ne sont pas présentés comme une suite complète.

## Workers Builds : échec distinct, cause non disponible

Les checks externes du Worker `joyccelight-playbook` échouent pour `98c81d9` (build `4ae08429-e827-4fa6-ada0-7f9302420274`) et pour `403cee8` (build `72d2013d-8ae4-44de-b89e-54a3b67eaf6f`). L’API GitHub expose le résultat et le lien, mais ni message d’erreur, ni annotation, ni journal de build. L’ouverture du [journal Cloudflare du diagnostic](https://dash.cloudflare.com/edf66401beda4e82b026d9be5fb4cbe8/workers/services/view/joyccelight-playbook/production/builds/72d2013d-8ae4-44de-b89e-54a3b67eaf6f) aboutit à une page de connexion.

Cela ne permet pas d’attribuer l’échec à Node, au domaine, à un token, au nom ou à une commande de déploiement. Le succès du build/dry-run GitHub n’est pas une preuve de publication Cloudflare. Les garde-fous de nom et de compte/tag du Worker sont conservés, sans appel direct de publication pour contourner l’intégration.

Si ce check reste rouge après le correctif, il faut le passage d’erreur du journal Workers Builds, ou un accès autorisé à ces journaux, pour le diagnostiquer précisément. La PR ne sera pas fusionnée en présentant cet échec externe comme résolu.
