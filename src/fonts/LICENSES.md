# Domine variable auto-hébergée

**Domine** est la famille utilisée pour tous les textes HTML du site FR/EN : titres, articles, navigation, boutons, tableaux, métadonnées et blocs copiables. Les pages du livre et les schémas sont des images des documents d’origine ; leur typographie intégrée n’est pas retouchée.

| Police | Graisses réelles | Fichiers locaux | Source et licence intégrale |
| --- | --- | --- | --- |
| Domine | Axe variable `wght` de 400 à 700, style droit | `domine-latin.woff2`, `domine-latin-ext.woff2` | `@fontsource-variable/domine@5.3.0` · [Domine Project Authors](https://github.com/googlefonts/domine) · [OFL-Domine.txt](./OFL-Domine.txt) |

Les deux fichiers WOFF2 sont copiés **sans modification** depuis `files/domine-<subset>-wght-normal.woff2` du paquet Fontsource Variable **5.3.0**. Les sous-ensembles `latin` et `latin-ext` couvrent l’anglais et les diacritiques français/européens. Les titres utilisent la vraie graisse 700, sans demander de faux 800/900.

Domine est distribuée sous **SIL Open Font License 1.1 (OFL-1.1)**. Le copyright et le texte complet de la licence sont reproduits sans modification dans `OFL-Domine.txt`.

## Chargement et rôles

Chargement par `next/font/local` dans `src/app/[locale]/layout.tsx` : `font-display: swap`, variable `--font-domine`, fallback **Times New Roman** ajusté métriquement par Next.js, puis Georgia / Times New Roman / serif. Aucun appel réseau vers un service de polices n’est nécessaire, ni pendant la compilation ni pendant la lecture.

Les alias CSS `--font-display`, `--font-sans` et `--font-mono` pointent tous vers `--font-domine`. Le nom historique `.mono` conserve seulement un rôle de métadonnée ; il ne sélectionne plus une famille monospace. Les éléments `code`, `pre`, `kbd`, `samp` et les contrôles de formulaire héritent eux aussi de Domine.

**Chiffres :** le fichier Domine ne propose pas de fonctionnalité OpenType `tnum`. `TabularText` donne donc aux chiffres des données (prix, métriques, dates, tableaux) des cellules de même largeur de `0.7em`, sans changer les glyphes ni le texte copiable. Les tests navigateur mesurent cette largeur ; déclarer uniquement `font-variant-numeric: tabular-nums` ne suffirait pas avec cette police.

Le fallback ajusté réduit le risque de déplacement ; il ne prouve pas, à lui seul, un CLS ≤ 0,1. Ce dernier demande une mesure dans des conditions documentées.

## Distribution vérifiable

Paquet : `https://registry.npmjs.org/@fontsource-variable/domine/-/domine-5.3.0.tgz`

Intégrité SHA-512 du paquet, vérifiée au téléchargement :

```text
sha512-ErHVJM/DY502704mg+wPLMfEWXIQMNoHCC3c3nGo+rAczbt5XBwnKCImy/Efuaiay1S4WBWAmd+RTqm6XaVfhg==
```

Empreintes SHA-256 des fichiers locaux :

```text
d0531fda200ea312e58435464c89a12f50ce52fff1961d8967df2db515f460cf  domine-latin.woff2
c80dc59dff430663fb7fb1d4a3a3667032938cc4aec009667b51b2fe8c300acd  domine-latin-ext.woff2
```
