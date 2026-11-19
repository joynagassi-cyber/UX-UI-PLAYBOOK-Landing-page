# Polices variables auto-hébergées

Les fichiers WOFF2 proviennent des paquets npm Fontsource Variable **5.3.0**. Seuls les sous-ensembles `latin` et `latin-ext`, droits, axe `wght`, sont conservés pour l’anglais et les diacritiques français/européens.

| Police | Usage | Fichiers locaux | Source et licence intégrale |
| --- | --- | --- | --- |
| Sora | Titrage, métriques (`--font-display`) | `sora-latin.woff2`, `sora-latin-ext.woff2` | `@fontsource-variable/sora@5.3.0` · [Sora Project Authors](https://github.com/sora-xor/sora-font) · [OFL-Sora.txt](./OFL-Sora.txt) |
| Inter | Texte et contrôles (`--font-sans`) | `inter-latin.woff2`, `inter-latin-ext.woff2` | `@fontsource-variable/inter@5.3.0` · [Inter Project Authors](https://github.com/rsms/inter) · [OFL-Inter.txt](./OFL-Inter.txt) |
| JetBrains Mono | Code, identifiants, badges (`--font-mono`) | `jbmono-latin.woff2`, `jbmono-latin-ext.woff2` | `@fontsource-variable/jetbrains-mono@5.3.0` · [JetBrains Mono Project Authors](https://github.com/JetBrains/JetBrainsMono) · [OFL-JetBrainsMono.txt](./OFL-JetBrainsMono.txt) |

Les trois familles sont distribuées sous **SIL Open Font License 1.1 (OFL-1.1)**. Les mentions de copyright et le texte complet de chaque licence sont reproduits sans modification dans les fichiers ci-dessus.

Chargement par `next/font/local` dans `src/app/[locale]/layout.tsx` : `font-display: swap`, variables de famille et fallback Arial ajusté métriquement par Next.js (`size-adjust`, `ascent-override`, `descent-override`). Aucun appel réseau à Google Fonts n’est nécessaire. Le fallback ajusté réduit le risque de déplacement ; il ne prouve pas, à lui seul, un CLS ≤ 0,1. Ce dernier demande une mesure du rendu dans des conditions documentées.

Source de distribution vérifiable : `https://registry.npmjs.org/@fontsource-variable/<family>/-/<family>-5.3.0.tgz`. Les WOFF2 sont copiés tels quels depuis `files/<family>-<subset>-wght-normal.woff2` ; ni renommage interne ni modification des glyphes.
