# Checklist de décision — SEO / AEO / GEO

Cette checklist ne vaut **ni autorisation de déployer ni certificat d’accessibilité/indexation**. Les résultats exacts et la révision testée sont dans le [rapport final](TECHNICAL_READINESS_REPORT.md). Une case vide signifie qu’une preuve ou une décision manque, pas qu’un résultat a été obtenu.

## A. Préservation et périmètre

- [x] Inventaire historique des 185 fichiers conservé dans `TECHNICAL_INVENTORY.md` ; entrée de cette mission TBT avec **47 chemins déjà en attente**, inspectés et archivés avant édition.
- [x] Baseline SHA-256 de 108 fichiers éditoriaux/produits/visuels ; quatre guides par langue, brouillon interne, kits et PNG externes préservés.
- [x] Pas de nouveau guide ou slug ; 14 pages canoniques prévues, mêmes quatre endpoints machine. La 404 remplace un document d’erreur existant, pas une nouvelle URL de contenu.
- [x] Les **47 chemins préexistants non committés sont tous conservés**, sans reset ni transfert de branche ; les éléments Microlink/Gumroad hors périmètre restent intacts.
- [x] État Git final : **28 fichiers modifiés +20 nouveaux non suivis**, index vide, aucun fichier supprimé/renommé ; HEAD et branche Arena inchangés. Inventaire et diff cumulé dans le rapport final ; aucun commit/push/merge.

## B. Configuration et export

- [x] Une seule origine intentionnelle : `NEXT_PUBLIC_SITE_URL`, défaut HTTPS Pages ; aucun fallback vers un host de preview ou un provider de requête.
- [x] Validation stricte de l’origine et erreurs sans écho de valeur potentiellement sensible.
- [x] `output: 'export'`, polices/images locales, pas de dépendance au serveur Next en production.
- [x] Les deux kits impriment encore l’origine canonique attendue ; aucun changement de domaine ou régénération silencieuse des binaires.
- [x] `lastmod` non justifiés supprimés ; aucun temps de build, mtime ou commit global substitué à une date de contenu.
- [x] Sitemap restreint aux 14 URL propres et alternates FR/EN/x-default réciproques.
- [x] Canonical, hreflang, métadonnées, OG/Twitter, alternatives sociales et JSON-LD cohérents dans les sources.
- [x] JSON-LD échappé ; suppression des heures inventées et correction du rattachement des guides au site.
- [x] Build final et intégrité de l’export de la même révision exécutés sans échec ; **262/262 contrôles d’export**, résultats dans le rapport.

## C. HTTP local et robots

- [x] Les dix noms d’agents demandés ont une politique explicite ; recherche, entraînement et récupération utilisateur ne sont pas confondus.
- [x] La politique permissive d’entraînement existante est préservée, pas modifiée implicitement au nom du SEO.
- [x] `Host` non standard retiré ; sitemap absolu de la bonne origine ; règles redondantes de sous-chemins simplifiées.
- [x] `_headers` ne gouverne que les réponses statiques ; les Functions émettent leurs en-têtes elles-mêmes.
- [x] Préférence cookie > langue pondérée > pays ; exclusions de langue prises en compte et cas « les deux exclues » documenté.
- [x] Query, doublons et encodage conservés dans les redirections ; canonical propre ; attribution Gumroad limitée à l’allowlist.
- [x] Cookie host-only/SameSite=Lax, Secure conditionnel sur HTTPS ; refus de stockage sans rupture du lien de langue.
- [x] 404 bilingue `noindex`, vraie erreur HTTP, pas de fallback SPA, pas de canonical/hreflang trompeur.
- [x] Exécution finale de `site_check.py` et `seo_check.py` sur Wrangler ; **778 contrôles automatiques** sans échec bloquant et **462/462 contrôles SEO**, contenu HTML, MIME, HEAD, cache, ancres, liens internes et bots simulés vérifiés localement.

## D. Accessibilité et performances locales

- [x] Défauts observés du focus sous navigation sticky et des états de couleurs forcées corrigés.
- [x] Pas d’augmentation volontaire du contenu pour obtenir des métriques ; payload caché des cartes liées réduit sans retirer le texte des guides.
- [x] Lint moderne ajouté ; effets React produisant des cascades de rendu corrigés plutôt que règles désactivées globalement.
- [x] Dernière suite navigateur complète **82/82**, après un premier passage **81/82** (timeout polices/défilement archivé), diagnostic isolé puis une relance complète manuelle ; retries automatiques à zéro, délais inchangés. FR/EN, thèmes, responsive, axe, dialogues, clavier, sans JS et téléchargements couverts. Les 62 analyses axe incomplètes restent à examiner humainement.
- [x] Campagne finale isolée : **12 mesures, trois runs ×4 routes ciblées ; 2 PASS /2 REVIEW, code 1**, tous les runs/écarts documentés. Pas de nouvelle campagne 14 routes puisque les quatre ne sont pas conformes ; les 42 mesures antérieures sont explicitement historiques.
- [x] Acquis antérieur de mouvement réduit préservé : zéro événement de transition/animation dans les deux tests de bascule, candidats scriptés finaux ≤168 ms sur les quatre routes. Ceci ne valide ni le mouvement standard ni l’INP de terrain.
- [ ] Quatre réserves TBT initiales **non déclarées corrigées** : aucune optimisation runtime retenue après rejet des variantes. Dernières médianes : `/fr` 102,47 ms, UX FR **259 ms**, Product FR 198 ms (un run 207), Product EN **214 ms** ; un LCP UX FR atteint **2 693,76 ms**. Pas de validation globale ni d’acceptation propriétaire.
- [ ] Stabilité du scénario de préparation axe : timeout initial non reproduit en diagnostic isolé, à surveiller ; aucun défaut applicatif précis démontré.
- [ ] Revue humaine WCAG des critères applicables, lecteurs d’écran réels, zoom/texte, agrandisseur, ordre de lecture et annonces. L’absence de violation axe n’est pas une conformité complète.
- [ ] Revue sur navigateurs/appareils réels à jour ; le Chromium portable local n’en tient pas lieu.

## E. Compte Cloudflare et production — non vérifié ici

- [ ] Projet/branche/output/commande/Node/env réellement configurés dans le compte.
- [ ] Domaine canonique final, HTTPS, redirections entre hosts et comportement des paramètres contrôlés publiquement.
- [ ] Access, WAF, règles anti-bots/IA, challenges, robots géré/Content-Signal et éventuelles transformations examinés avec preuve.
- [ ] Cache edge public vérifié ; aucune redirection linguistique privée partagée, aucune règle historique contradictoire.
- [ ] Vérification HTTPS réelle du cookie Secure, des MIME, 404, canonical/hreflang, assets et téléchargements après une publication séparément autorisée.
- [ ] Sonde HTTP publique complète réussie depuis un environnement autorisé. Un échec réseau du sandbox ne renseigne pas la disponibilité du site.
- [ ] Accès d’au moins un vrai robot authentifié observé dans des logs appropriés, sans déduire l’identité du seul User-Agent.

## F. Search Console, terrain et citations — non vérifié ici

- [ ] Accès à une propriété Search Console autorisée ; canonical choisi par Google et statuts réellement examinés.
- [ ] Sitemap soumis et statut observé après publication ; aucune assimilation automatique à l’indexation de toutes les URL.
- [ ] Données de couverture/performance comparables conservées ; aucun classement, trafic ou volume inventé.
- [ ] Données terrain suffisantes pour LCP/INP/CLS, avec période/segmentation ; ni TBT ni Lighthouse utilisés à leur place.
- [ ] Mentions/citations/recommandations génératives observées avec requête, langue, date, réponse et URL exactes. Aucune n’est revendiquée actuellement.

## G. Interdictions de cette mission — à préserver

- [x] Aucun déploiement ni opération d’hébergement/DNS/Vercel.
- [x] Aucun appel API Microlink, capture, transformation ou approbation des PNG externes.
- [x] Aucune publication Gumroad, instrumentation visiteurs ou connexion à un compte de recherche.
- [x] Pas de merge, suppression de branche, commit ou push requis par cette livraison : changements laissés dans le répertoire de travail.

**Décision :** préparation locale documentée, mais pas d’autorisation de mise en production. Les cases de compte/production/terrain/humain ne doivent pas être cochées au seul motif que les contrôles locaux passent.
