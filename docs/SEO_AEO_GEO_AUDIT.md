# Audit technique SEO / AEO / GEO

## Portée et preuve

Cette passe porte sur le dépôt et son **export statique servi localement avec Wrangler Pages**, pas sur une publication. Origine canonique délibérée : **https://joyccelight-playbook.pages.dev**. Ce nom est une cible de configuration, pas une preuve de déploiement ou de propriété DNS.

- [Inventaire initial exhaustif](TECHNICAL_INVENTORY.md) : 185 fichiers suivis, Git propre à l’entrée, quatre guides par langue, 14 pages canoniques.
- [Rapport final et résultats des nouvelles exécutions](TECHNICAL_READINESS_REPORT.md).
- [Procédure reproductible et contrôles de compte/production](SEARCH_VISIBILITY_RUNBOOK.md).
- [Checklist de décision avant publication](SEO_RELEASE_CHECKLIST.md).

Les contenus FR/EN, le brouillon interne, les kits et les captures externes sont préservés par empreintes. Aucun nouveau guide, slug commercial ou variante artificielle n’est créé. Les documents d’audit restent hors de `public/`.

## Corrections et garanties vérifiables dans le code

| Sujet | État et correction | Preuve reproductible |
| --- | --- | --- |
| Origine | Défaut dans `src/config/site-policy.json` ; `src/lib/site-config.ts` lit uniquement `NEXT_PUBLIC_SITE_URL` à la construction. HTTPS public, sans identifiants, port personnalisé, chemin, query ou fragment. Les origines locales/preview connues sont refusées. | Tests unitaires d’acceptation/rejet ; build ; `check:export` ; `check:seo`. |
| Providers | Aucune déduction depuis `VERCEL_URL`, `CF_PAGES_URL`, l’hôte de requête ou `PLAYWRIGHT_BASE_URL`. Le serveur local n’est jamais l’origine des métadonnées. | Test explicite de non-découverte du provider ; inspection de tout l’export texte. |
| Canonical | Une URL propre, localisée, auto-référente par page. Les paramètres d’attribution ne créent pas de canonical supplémentaire. | 14 pages et leurs variantes paramétrées en HTTP ; unicité des balises. |
| Hreflang | FR/EN réciproques et `x-default` vers la version anglaise équivalente, dans le HTML **et** le sitemap. | Ensembles exacts par URL ; aucune redirection linguistique sur une URL déjà localisée. |
| Sitemap | Exactement 14 URL canoniques ; aucun endpoint, téléchargement, brouillon, 404 ou chemin de négociation. Suppression des `lastmod` non justifiés, des fréquences spéculatives et des priorités inutiles. | XML analysé avec namespaces, unicité des URL et ensembles comparés au catalogue. |
| Dates | Aucun `new Date()` de build ni recopie automatique de `updatedAt` dans le sitemap. Les dates éditoriales des guides restent inchangées ; leurs heures arbitraires de 08:00 sont retirées des métadonnées et du JSON-LD. | Tests de sitemap et source de génération ; contrôle du HTML exporté. |
| Robots | Règles explicites pour les dix agents demandés, plus conservation des deux contrôles étendus déjà permissifs. Retrait de l’ancien nom `Claude-Web` et de `Host`, qui ne constitue pas une directive canonical Google. | Politique dans `src/config/crawler-policy.json`, tests de génération et analyse du vrai `/robots.txt` local. |
| Métadonnées sociales | Titres/descriptions et images de langue correspondante ; OG et Twitter utilisent la même origine. Alternatives textuelles ajoutées aux images Twitter. Images locales 1200 × 630 vérifiées. | Contrôles de balises, fichiers JPEG et dimensions ; pas de partage réellement observé sur un réseau social. |
| JSON-LD | JSON échappé contre la fermeture de `<script>`, entités attendues par gabarit, bibliographies et FAQ rapprochées du contenu HTML réel. Les guides originaux appartiennent au site, pas à un livre dont ils seraient des extraits. Retrait d’`inLanguage` sur `Product` ; la langue reste sur `Book`/`TechArticle`/pages. | Parsing JSON, assertions structurelles/URL/contenu. **Ce n’est pas une validation exhaustive du vocabulaire Schema.org ni un test Google Rich Results.** |
| Liens | Ancres sur la même page et les autres pages, destinations internes HTTP et accessibilité du graphe depuis les deux landings. | `seo_check.py` ; parcours réels et liens contextualisés testés dans Playwright. |
| Erreurs | Document global 404 bilingue, `noindex`, sans canonical ni hreflang trompeurs, liens FR/EN, utilisable au clavier. Pas de fallback SPA en 200. | Vraies URL inconnues, locales non supportées et chemins imbriqués en HTTP ; axe et clavier sur la 404. |
| Performances | Les cartes liées ne sérialisent plus trois guides complets cachés dans le payload client ; seules les propriétés visibles sont transmises. Suppression de cascades de rendu liées à trois effets React ; snapshots navigateur via `useSyncExternalStore`, requêtes de focus sans effacement en effet. Le mode animations réduites supprime réellement les transitions/animations au lieu de raccourcir leur durée et de créer des milliers d’événements. | Tests de projection des cartes, lint/hooks, parcours navigateur, deux régressions sur les événements de mouvement, profilage et mesures de laboratoire ; limites dans le rapport final. |
| Accessibilité | Skip links vers des `main` focalisables, marges de défilement ciblées sous la navigation sticky, états en couleurs système en mode couleurs forcées. Les modales rendent leurs branches d’arrière-plan `inert` et restaurent leur état à la fermeture. | Régressions réellement observées puis corrigées ; tests clavier/pixels, sommaire actif, isolation/restauration des dialogues, forced-colors, axe WCAG 2.2 AA. |

### Inventaire des utilisations de `NEXT_PUBLIC_SITE_URL`

La recherche de toutes les occurrences a inclus les fichiers cachés de configuration et les scripts, en excluant dépendances/exports/rapports. Les dépendances indirectes via `SITE_URL` ont aussi été examinées.

| Consommateur | Usage examiné / décision |
| --- | --- |
| `src/lib/site-config.ts` | Seul point applicatif qui lit la variable ; valide l’origine publique HTTPS et échoue sur une valeur vide explicitement fournie. L’absence utilise la politique du dépôt. |
| `src/i18n/content.ts`, quatre gabarits de pages, layout, `robots.ts`, `sitemap.ts`, routes LLM | Import direct ou indirect de `SITE_URL` ; aucune lecture concurrente d’une origine provider ou du host HTTP. Les textes éditoriaux n’ont pas été modifiés. |
| `.env.example`, deux workflows | Même origine déclarée ; pas de secret et pas de variable Vercel injectée. Les previews locales testent cette origine attendue, distincte de leur adresse HTTP. |
| `scripts/site_check.py`, `seo_check.py`, `check_public_access.py` | L’origine attendue/de sonde peut venir de la variable ; les options CLI sont explicites. Ces outils n’écrivent pas les canonical. `site_check.py` conserve son fallback historique pour une chaîne vide ; le vrai build la rejette. |
| `scripts/check_static_export.cjs` et tests SEO | Chargent la même configuration validée ; vérifient l’origine dans l’export. Tests négatifs : valeur vide, identifiants, chemin/query/hash, point final, hôtes locaux/preview et variables provider seules. |
| `scripts/generate_free_resource{,_en}.cjs` | Chargent indirectement la même origine et l’impriment dans les kits et `generatedForOrigin`. **Non exécutés dans cette passe.** Les six fichiers existants et leurs manifestes correspondent au défaut Pages. |
| Documentation, guides produits et `CLOUDFLARE_MIGRATION.md` | Les guides produits avertissent déjà de régénérer les deux éditions si le domaine change ; ils restent gelés. Les anciens rapports décrivent leurs anciennes révisions ; le présent audit/runbook précise la validation HTTPS et le nouvel outillage. |

Une simple recherche/remplacement de nom de domaine serait insuffisante : les PDF/ZIP contiennent des liens imprimés et les redirections entre hosts se vérifient en HTTP public, pas dans un canonical.

### Politique de `lastmod`

L’absence de cet élément optionnel est préférable à une date inventée. Ni la date de build, ni le mtime d’un checkout, ni la date d’un merge monolithique, ni un `updatedAt` éditorial sans registre de provenance ne justifient automatiquement la modification significative d’une page.

Une réintroduction devra maintenir, **par URL et langue**, la date réelle du changement substantiel, son motif et son commit/revue. Les changements de copyright ou de styles communs ne doivent pas rafraîchir artificiellement les 14 entrées. Le build ne fabrique actuellement aucun `lastmod`.

## Cinq niveaux de contrôle des robots — à ne pas confondre

| Niveau | Ce qui est établi ici | Ce qui n’en découle pas |
| --- | --- | --- |
| **1. Autorisation déclarée** | `/` autorisé dans le robots exporté pour chacun des agents listés ci-dessous. Politique antérieure permissive, y compris entraînement, conservée explicitement. | Le client peut ignorer robots ; cette règle n’est ni une authentification ni un droit contractuel accordé sur les ressources tierces. |
| **2. HTTP local** | Matrice de GET avec les dix chaînes User-Agent sur les 14 pages et quatre endpoints : réponses, corps comparés au client par défaut, absence de blocage indirect `noindex`/`nofollow`/`nosnippet` sur les pages. | Une chaîne UA simulée localement ne prouve pas l’identité d’un robot, l’accès depuis son réseau ou un passage du WAF public. |
| **3. Paramètres Cloudflare** | **Non vérifiés** dans le compte. Liste de contrôle séparée dans le runbook. | Aucune assertion sur WAF, Access, règles anti-bots, robots géré, challenges, cache ou configuration de domaine effectivement en place. |
| **4. Accès public** | Une tentative HTTP de lecture seule est consignée dans `reports/public-access-check.json`. Sans réponse depuis ce sandbox restreint, l’état public reste **inconnu**. | L’échec réseau local n’est pas un constat de panne du site ni de blocage des robots. Même un GET public réussi ne prouverait pas l’accès d’un robot authentique. |
| **5. Explorations/citations observées** | **Aucune preuve collectée** : pas de logs de robots authentifiés, de données Search Console ni de réponses de moteurs IA examinées pour cette passe. | Ni indexation, ni classement, ni recommandation, ni citation générative ne sont revendiqués. |

### Agents explicitement nommés

| Agent | Rôle distingué | Déclaration locale |
| --- | --- | --- |
| Googlebot | Recherche Google | Allow `/` |
| Bingbot | Recherche Bing | Allow `/` |
| OAI-SearchBot | Recherche OpenAI | Allow `/` |
| GPTBot | Collecte pour entraînement OpenAI | Allow `/` — politique existante, pas une condition de recherche |
| ChatGPT-User | Récupération demandée par un utilisateur | Allow `/` |
| ClaudeBot | Collecte pour entraînement Anthropic | Allow `/` |
| Claude-SearchBot | Recherche Anthropic | Allow `/` |
| Claude-User | Récupération demandée par un utilisateur | Allow `/` |
| PerplexityBot | Recherche Perplexity | Allow `/` |
| Perplexity-User | Récupération demandée par un utilisateur | Allow `/` |

`Google-Extended` et `Applebot-Extended` restent des contrôles de fournisseur distincts des identités de recherche. Le choix de permettre ou refuser l’entraînement appartient au propriétaire ; cette passe ne change pas silencieusement ce choix. Les récupérations initiées par un utilisateur peuvent suivre des politiques différentes de l’exploration automatique : ne jamais présenter robots comme un mécanisme de contrôle d’accès.

### Blocages indirects inspectés localement

- Pas de login, challenge, `Set-Cookie` requis ou dépendance à JavaScript pour le texte des 14 pages.
- Pas de `X-Robots-Tag` bloquant ou de meta robots restrictive sur les pages canoniques. Les six fichiers bruts de téléchargement portent volontairement `noindex` pour privilégier leur page de présentation ; ils ne sont pas interdits dans robots.
- Les 404 portent volontairement `noindex`, jamais un canonical vers une page de contenu sans rapport.
- Polices/images locales ; aucun appel navigateur vers un autre backend ou une API de capture ; pas de serveur Next requis en production.
- Les Functions ne prennent en charge que les points de négociation non localisés ; sitemap, robots, LLM, images et pages FR/EN restent statiques.
- **Non inspectés en production** : `Content-Signal` ajouté par le provider, en-têtes réécrits, Cloudflare Access, WAF, anti-bots ou challenge réseau. Une transformation de robots par le provider pourrait contredire le fichier du dépôt.

## Cloudflare Pages, paramètres et cache

- `output: 'export'`, images non optimisées par un serveur Next, polices auto-hébergées ; contrôle des fichiers réellement écrits dans `out/`.
- `/`, `/articles`, `/articles/*` : 307 même origine, paramètres répétés/encodés conservés, `private, no-store`, `Vary: Cookie, Accept-Language, CF-IPCountry`. Les en-têtes de sécurité des Functions sont émis par leur propre code : `_headers` ne s’y applique pas.
- Priorité : cookie `NEXT_LOCALE` valide > `Accept-Language` pondéré > pays Cloudflare > repli. Une exclusion explicite de l’anglais laisse le français disponible ; si les deux langues sont exclues, le repli navigable anglais demeure documenté plutôt qu’une nouvelle 406.
- Le pays est un indice de repli, pas la langue réelle d’une personne. `request.cf.country` précède le header de fixture local.
- Les URL `/fr/...` et `/en/...` ne sont pas renégociées. `.html` et slash final sont normalisés vers le chemin propre sans perdre les paramètres.
- Canonical/hreflang/OG restent propres, même avec UTM et paramètres répétés. Seule l’allowlist d’attribution existante est transmise à Gumroad ; aucun paramètre arbitraire n’y est copié. Les liens de langue restent volontairement des URL propres.
- Cookie de préférence : host-only, Path `/`, SameSite=Lax, un an, `Secure` sur HTTPS. Ce cookie n’est pas HttpOnly puisqu’il est écrit par le sélecteur client ; ce n’est pas une donnée d’authentification. Son refus ne doit pas casser le lien localisé explicite.
- `_headers` précise langues, MIME, `nosniff`, politique de référent et permissions. Cache long/immutable **uniquement** pour les assets Next hashés ; ne pas l’étendre aux HTML, robots, sitemap ou images aux noms non hashés. Le comportement du cache public/edge devra être revérifié en production.
- Les mentions de l’ancien hébergeur qui subsistent dans les scripts sont des **tests négatifs anti-régression**, pas une origine active, un en-tête de géolocalisation utilisé ou un appel au service. Ne pas supprimer ces garde-fous au motif qu’ils nomment l’ancien provider.

## Accessibilité et Web Vitals : limites de la conclusion

Les tests automatisés utilisent axe avec les tags WCAG 2 A/AA, 2.1 AA et 2.2 AA, dans les deux thèmes et à plusieurs largeurs ; ils couvrent aussi des états ouverts de dialogues et de démonstrations. Ils sont complétés par des parcours clavier, focus, noms accessibles, récupération d’erreur simulée, fonctionnement sans JS et contrôles de débordement. Il n’y a pas de formulaire de saisie/soumission réel sur le site : ne pas inventer un test d’un formulaire d’achat tiers. Les démonstrations restent fictives.

**Zéro violation axe n’est pas un certificat WCAG 2.2 AA.** Restent notamment une revue humaine de l’ensemble des critères applicables, lecteurs d’écran réels, zoom du navigateur/texte, agrandisseurs et lisibilité avec de vraies personnes. Les résultats `incomplete` d’axe restent dans les artefacts au lieu d’être requalifiés en succès.

Lighthouse mesure ici une navigation **de laboratoire mobile simulée**, avec LCP, CLS et TBT ; TBT n’est pas INP. Un second scénario Chromium collecte réellement Event Timing sur quelques interactions locales à CPU ralenti : il fournit un **candidat INP de laboratoire**, pas une statistique de terrain ni un percentile représentatif. Les dépassements éventuels sont conservés dans le rapport final, sans transformer un score Lighthouse en preuve de Core Web Vitals réels.

Aucune instrumentation de visiteurs, aucun traceur ni SDK RUM n’a été ajouté. Les vrais LCP/INP/CLS nécessitent CrUX ou une collecte RUM décidée, documentée et respectueuse des choix des visiteurs. Leur absence est un état inconnu, pas un succès.


## Addendum du 18 novembre 2026 : origine et édition augmentée

Les résultats et l’ancienne origine cités ci-dessus décrivent la passe historique ; ils ne sont pas réécrits. Pour la mise à jour issue du Drive du 9 novembre, le propriétaire a choisi **`https://joyccelight-playbook.uxplay.workers.dev`** comme origine officielle et **21 fichiers par langue et par achat**. Les valeurs courantes sont dans le README et le runbook ; les liens des kits gratuits sont régénérés. Voir le [rapport de mise à jour](EDITION_2026_UPDATE_REPORT.md) pour le diagnostic CI, les compteurs vérifiés et les validations de cette nouvelle révision. Aucune modification DNS ni publication distante n’est impliquée.
