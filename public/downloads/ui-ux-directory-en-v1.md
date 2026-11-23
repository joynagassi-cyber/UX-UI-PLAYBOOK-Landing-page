# UI/UX Directory

**51 entries · 6 categories · 75 resource links**

Version 1.0 · English edition · November 18, 2026 · Joy N. / Joyccelight

A directory for comparing, choosing and documenting interface resources. It is for non-designers, developers and people working with AI agents. This is not a collection of reusable components or illustrations: the resources remain on their authors’ websites.

> The guide and worksheet are free. Listed services may offer paid features or conditional licenses. The 75 links are not 75 distinct tools and have not undergone an exhaustive availability audit. This edition offers starting points to verify; it does not promise business results, performance, accessibility conformance or error-free AI output.

Guide page: https://joyccelight-playbook.uxplay.workers.dev/en/resources/ui-ux-directory?utm_source=ui-ux-directory&utm_medium=markdown&utm_campaign=free-resource

## How to use it

1. **Frame the need** — Choose one screen, platform and important constraint. For example: a mobile form with readable errors and locally hosted fonts.
2. **Compare** — Keep at most two options per category, using the same text, states and data. Keeping a resource you already know is also a valid choice.
3. **Check** — Record the official URL, version, rights, attribution and costs. Do not send personal data or client files to a service without approval.
4. **Try it** — Test empty, loading, error and success states; keyboard access, zoom, contrast and the narrowest screen. Measure loading in your project.
5. **Record** — Complete the decision worksheet: choice, reason, limitation, responsible person, remaining check and review date. An unverified candidate can stay excluded.

## Start with a need

- **Colors and themes** — Compare a palette on real text, surfaces and states. Decision question: Which text/background pairs remain readable in both themes?
- **Typography** — Examine families, weights and sizes using your own content. Decision question: Do accents, numbers, long labels and hosting conditions fit?
- **Icons** — Choose a coherent family and understandable symbols. Decision question: Do the names exist, and do important actions keep their text labels?
- **Components and kits** — Choose a base compatible with your platform and maintenance needs. Decision question: Which behaviors and updates will become your responsibility?
- **Data charts** — Explain a question and its data without hiding units or limits. Decision question: Does the chart have units, a legend and a text alternative?
- **Illustrations and 3D** — Find a useful visual without forgetting rights, loading or alternatives. Decision question: Does the illustration convey information rather than obstruct loading?

## Brief for an AI agent

Complete and review this template. It does not replace human review or testing of the code.

```text
Context: [product, screen, audience, platform].
Approved resources: [names, official URLs, versions and accepted licenses].
Decisions to follow: [selected tokens, typeface, icons and components].
Do not add dependencies, third-party files, colors or purchases without approval.
Flag missing API or icon names instead of inventing them.
Prepare empty, loading, error and success states; preserve keyboard access and focus.
Separate implemented work, automated checks and remaining human review.
Do not use third-party resources to train a model or assemble an asset pack.
Before delivery: list changed files, sources, tests and limitations.
```

## 1. Colors and themes

Compare a palette on real text, surfaces and states.

**Decision question:** Which text/background pairs remain readable in both themes?

### 1.1. tweakcn

- https://tweakcn.com/

tweakcn helps you explore a theme in the shadcn/ui ecosystem. Its value is seeing a color alongside cards, fields and charts rather than approving a palette in isolation. Change one setting at a time, then keep the selected values together with their intended roles. A convincing demonstration does not replace checking the screens in your own application.

- **Non-designer:** Compare the states of the same screen before choosing a visual direction.
- **Developer:** Identify the useful variables, then adapt them to the project's actual version.
- **With an AI agent:** Supply the approved tokens and require justification before adding any new colors.
- **Check first:** Check actual contrast and export compatibility; do not confuse a demonstration with validation.

### 1.2. Realtime Colors

- https://www.realtimecolors.com/dashboard

Realtime Colors applies color and typography choices to a page layout. This makes it easier to discuss text, backgrounds and accents in context. Try a long heading, links and a secondary button to uncover problems that an attractive combination may hide. If the tool reports contrast, also measure the specific pairs actually used in your interface.

- **Non-designer:** See how a palette behaves in readable content blocks rather than isolated swatches.
- **Developer:** Record semantic colors and inspect the available export before integrating it.
- **With an AI agent:** Supply the chosen values, their permitted uses and the pairs to measure.
- **Check first:** A set of colors is not WCAG-validated for every possible combination.

### 1.3. Shadcn Design Theme Generator

- https://www.shadcndesign.com/theme-generator

This generator from Shadcn Design is a candidate for comparing a theme across different page types. Distinguish the service from the shadcn/ui project's documentation: similar names do not imply the same team or terms. Treat the result as a proposed hierarchy, then compare it with your own content, components and themes before adopting it in the project.

- **Non-designer:** Compare a marketing page's identity with that of a denser working interface.
- **Developer:** Check the variable format and the dependencies expected by the generator.
- **With an AI agent:** Provide the configuration actually exported, not just an inspirational screenshot.
- **Check first:** This service is separate from shadcn/ui; examine its current access terms and export options.

### 1.4. Huemint

- https://huemint.com/

Huemint offers automated exploration of palettes applied to different visual settings. The results can help you describe a direction, especially when brand colors have not yet been chosen. It cannot decide which text matters most, which error needs attention or which chart must distinguish several series. Choose a candidate, assign semantic roles and then try it in those situations.

- **Non-designer:** Compare several visual directions using the same starting content.
- **Developer:** Turn the chosen palette into background, text, border and action roles.
- **With an AI agent:** Require colors to stay within their defined roles instead of varying them arbitrarily.
- **Check first:** A generated palette does not guarantee contrast, comprehension or harmony in every state.

### 1.5. Radix Colors

- https://www.radix-ui.com/colors

Radix Colors organizes each scale into twelve steps and documents typical uses: backgrounds, components, borders, solid surfaces and text. The documentation explicitly notes exceptions. This structure is a starting point for naming decisions and comparing themes; it does not make every text/background combination suitable. Keep your product's semantic aliases and check the actual rendered states and color pairs.

- **Non-designer:** Use documented roles instead of choosing every shade in isolation.
- **Developer:** Map scale steps to your tokens and component states.
- **With an AI agent:** Supply the step-to-role mapping and check the pairs actually rendered.
- **Check first:** The official documentation describes uses, not a general accessibility or contrast guarantee.

### 1.6. UI Colors

- https://uicolors.app/

UI Colors lets you explore a scale based on a starting color, including shade conventions commonly used with Tailwind. A scale helps distribute uses, but does not yet describe an entire theme. A brand color may work as a decorative accent while being unsuitable for the text or background of a small button. Keep those roles separate when selecting shades.

- **Non-designer:** Expand a known color into a scale and compare its uses on components.
- **Developer:** Check the generated scale, variable names and the export offered by the tool.
- **With an AI agent:** Supply only the approved shades together with the roles they may serve.
- **Check first:** Examine free versus paid features, then measure contrast after assigning roles.

### 1.7. Material Theme Builder

- https://m3.material.io/theme-builder

Material Theme Builder is part of the Material Design ecosystem and helps explore themes from source colors. It supports thinking in interface roles rather than repeating a single brand color everywhere. Decisions still depend on the platform, component version and content. An Android preview does not validate a web interface, nor does it establish suitability for a different design system.

- **Non-designer:** Understand the difference between a brand color and its interface roles.
- **Developer:** Confirm the platforms and export formats supported by the version you use.
- **With an AI agent:** Provide the selected Material roles and the target platform's conventions.
- **Check first:** Do not present a generated theme as automatic platform or WCAG conformance.

### 1.8. Coolors and Color Hunt

- https://coolors.co/
- https://colorhunt.co/

Coolors provides palette exploration, while Color Hunt offers color combinations to browse as visual references. They help compare moods rather than choose a complete design system. A palette of a few colors does not define focus, errors or secondary text. After choosing a direction, prepare those missing roles on a small real interface before extending the theme throughout the product.

- **Non-designer:** Create a shortlist and explain what appeals to you in each candidate.
- **Developer:** Record the values, then define the missing semantic roles and states.
- **With an AI agent:** Assign specific uses to the colors instead of giving only a vague style instruction.
- **Check first:** Features, exports and terms differ between the two services; check each separately.

### 1.9. Khroma

- https://www.khroma.co/

Khroma explores combinations based on a person's stated color preferences. It helps turn a preference into something concrete to discuss when phrases such as warmer or more restrained are not enough for a brief. Do not assume everyone will interpret a favorite combination in the same way. Try it with the project's actual text, components and accessibility constraints before adopting it.

- **Non-designer:** Use examples to explain a visual preference that is difficult to describe.
- **Developer:** Keep a few selected pairs and compare them with the existing theme.
- **With an AI agent:** Provide accepted and rejected references together with the reasons for each decision.
- **Check first:** Aesthetic preference and readability are separate questions; examine the service's terms.

### 1.10. AI Brand Kits — Live Brand Preview

- https://www.aibrandkits.com/live-brand-preview-tool

The preview tool cited under AI Brand Kits is a candidate for viewing an identity across different interface elements. Use this kind of preview to look for contradictions: faint text, an overlooked action or a chart that blends into the background. The most flattering example may not resemble your application. Confirm current access and functionality before making the service part of your process.

- **Non-designer:** Examine the same direction across several blocks rather than a single cover screen.
- **Developer:** Compare the demonstrated components with your project's constraints and information density.
- **With an AI agent:** Supply decisions extracted from the preview and identify the files that actually need changes.
- **Check first:** Availability, exports and the current offering were not tested for this directory; verify the service first.

## 2. Typography

Examine families, weights and sizes using your own content.

**Decision question:** Do accents, numbers, long labels and hosting conditions fit?

### 2.1. TypeHue

- https://typehue.com/

The supplied source lists TypeHue as a way to try typography in an interface context. The useful comparison is a form, table or card with your own labels. An expressive family in a large heading may behave differently at small sizes. Before making this tool part of the team's workflow, confirm its current features and whether you can access them.

- **Non-designer:** Compare how a family affects different reading tasks and content types.
- **Developer:** Record the chosen sizes, weights and line heights instead of assuming optimal values.
- **With an AI agent:** Provide a written typography specification alongside the visual reference.
- **Check first:** A candidate from the supplied document; its current functionality and availability were not tested here.

### 2.2. Web Font Preview

- https://www.webfontpreview.com/

The supplied source cites Web Font Preview for comparing families and variants on an example interface. This kind of preview can shorten selection if you keep the same text throughout the comparison. You should then test the characters in your language, numbers and unusually long strings. Seeing a variant in a tester does not establish that you possess its file or license.

- **Non-designer:** Compare a few families in an otherwise identical layout.
- **Developer:** Confirm the available files, weights and languages before preparing styles.
- **With an AI agent:** Supply the exact family name, authorized files and fallback choices.
- **Check first:** Verify current access, font provenance and usage rights separately from the visual preview.

### 2.3. UI Fonts

- https://www.uifonts.app/

UI Fonts is a candidate for comparing typefaces on interface elements. Looking at buttons, badges and cards supports more precise questions than style alone: can letters be distinguished, does the label fit and do the weights establish a hierarchy? References to other products can provide inspiration, but do not grant access to their identity or demonstrate their usability results.

- **Non-designer:** Evaluate letters and labels on components similar to those in your project.
- **Developer:** Compare weights without assuming the tester optimizes the files you will ship.
- **With an AI agent:** Specify one family and a few explicit roles instead of imitating a brand.
- **Check first:** No tester guarantees file weight, readability or the license of the families it displays.

### 2.4. Fontpair

- https://fontpair.co/

Fontpair collects ideas for pairing typefaces. A heading/body combination can help you begin, but two families are not compulsory: one family with several weights may be enough. Examine the combination on a long page rather than only a headline. Differences in height, width and rhythm become easier to notice in a real form or paragraph with the project's actual content.

- **Non-designer:** Compare suggested pairings without having to invent a combination immediately.
- **Developer:** Check each family's files and the cost of loading them.
- **With an AI agent:** Specify each family's role and prevent unnecessary additions for individual components.
- **Check first:** Verify licenses and available variants at the original source of each typeface.

### 2.5. Fontjoy

- https://fontjoy.com/

Fontjoy suggests typeface pairings that you can explore by varying their visual similarity. Treat a result as a hypothesis for a page, not a universal typography rule. Keep one starting family, compare a few alternatives and then reread the whole page rather than inspecting only headings. This helps distinguish useful contrast from a difference that draws attention in the wrong place.

- **Non-designer:** Explore combinations and explain why one fits the project's intended use.
- **Developer:** Verify that the required weights and characters exist in the selected files.
- **With an AI agent:** Provide a specific pairing and its roles rather than simply asking for elegance.
- **Check first:** A generated pairing does not establish readability or license compatibility.

### 2.6. Google Fonts

- https://fonts.google.com/

Google Fonts provides open-source families and information about their supported languages and styles. Its FAQ permits commercial use subject to each license, which should be read and retained. Choose a family using your real text: accents, currencies, numbers and necessary weights. Loading methods, subsets and fallbacks still require integration decisions; a free font is not automatically lightweight or readable in every setting.

- **Non-designer:** Compare a family using the characters that actually appear on your screens.
- **Developer:** Select files and a hosting method, and retain the license notice.
- **With an AI agent:** Supply the approved files and typography roles without loading additional families.
- **Check first:** The official FAQ distinguishes free access from redistribution conditions; check each license.

### 2.7. Fontshare

- https://www.fontshare.com/

Fontshare, offered by Indian Type Foundry, includes families such as Satoshi, General Sans and Clash Display. Its catalog distinguishes closed-source families, so free access does not automatically mean open source or unrestricted redistribution. A family may suit your project, but read its license and check the available files before including it in a website, application or kit delivered to a client.

- **Non-designer:** Compare less familiar families without confusing originality with readability.
- **Developer:** Check the license, formats, languages and permission to transfer files to a client.
- **With an AI agent:** Name the approved family and include its license instead of supplying only a brand reference.
- **Check first:** Do not describe the entire catalog as unrestricted; conditions depend on the family.

### 2.8. Uncut.wtf and Fontesk

- https://uncut.wtf/
- https://fontesk.com/

Uncut.wtf and Fontesk are starting points for exploring typefaces with a distinctive character. Poster and identity examples can communicate an intention, but do not always show how a family behaves in a dense interface. Make a short selection, then locate each file's original source and license. For body text, pay particular attention to accents, numbers and the distinction between similar letters.

- **Non-designer:** Explore expressive directions and decide whether they fit a heading or body text.
- **Developer:** Trace files back to their authors before distributing or hosting them.
- **With an AI agent:** Supply the chosen family and its limited role rather than an entire gallery reference.
- **Check first:** Directories may list different licenses; do not generalize the rights of one entry to another.

### 2.9. Typescale

- https://typescale.com/

Typescale helps you explore a progression of sizes from a base and ratio. The calculation proposes a hierarchy, but does not know the length of your headings or the width of a phone. Try rounded sizes, line heights and line breaks afterward. A scale is a shared constraint, not proof that every level is needed on every screen in the product.

- **Non-designer:** Compare typographic levels without selecting every size in isolation.
- **Developer:** Convert the chosen values into tokens and test zoom and narrow screens.
- **With an AI agent:** Supply the selected roles, values and documented exceptions.
- **Check first:** A mathematical ratio does not guarantee a clear hierarchy; check the offering's limits too.

### 2.10. Sitepeel Font Changer

- https://sitepeel.dev/font-preview/

The supplied source cites Sitepeel's font changer as a way to preview different typography on an existing page. This can support a quick comparison, provided you distinguish a local preview from work actually delivered. If an extension is involved, review its permissions and do not test it on sensitive data without approval. Then implement the chosen files and verify the page without the extension.

- **Non-designer:** Compare a direction on familiar content and inspect changes in line breaks.
- **Developer:** Distinguish a temporary preview from the files and styles actually deployed.
- **With an AI agent:** Supply the decisions you kept, not a dependency on a browser extension.
- **Check first:** Confirm current features, permissions and privacy terms before installing anything.

## 3. Icons

Choose a coherent family and understandable symbols.

**Decision question:** Do the names exist, and do important actions keep their text labels?

### 3.1. Phosphor Icons

- https://phosphoricons.com/

Phosphor presents concepts in several stroke and fill styles. A consistent family lets you compare normal and selected states without mixing unrelated drawings. Try a few symbols on the real backgrounds and at their intended sizes. A style difference must not be the only way to communicate selection: accompanying text and the programmatically exposed state also matter to people using the interface.

- **Non-designer:** Compare styles within one family before choosing a direction for the interface.
- **Developer:** Check the packages and names available for your chosen platform.
- **With an AI agent:** Provide existing names and permitted variants, then verify the generated imports.
- **Check first:** Retain license notices and do not use a lone icon for an ambiguous action.

### 3.2. Solar Icons

- https://www.figma.com/community/file/1166831539721848736

Solar is an icon collection distributed through channels including Figma and aggregators. Its variants can help explore rounded or two-color directions. A collection listing does not, however, define the rights of every distribution method. After selecting it, keep a consistent style, examine each color's contrast and provide text labels where the meaning of a symbol is not obvious.

- **Non-designer:** Compare navigation built with one family rather than a mixture of styles.
- **Developer:** Identify the actual source, format and license used in the project.
- **With an AI agent:** Supply exact identifiers and prevent the invention of missing symbols.
- **Check first:** Access through Iconify or Figma does not replace reading the collection's license.

### 3.3. Lucide

- https://lucide.dev/

Lucide provides SVG icons with a customizable stroke. A coherent family and discoverable names help maintain a consistent vocabulary; they do not prevent an AI agent from making mistakes. Choose a size and stroke suited to the interface, then inspect commands in context. The Playbook website uses a deliberately heavier stroke and keeps text for important actions: these are project choices, not library requirements.

- **Non-designer:** Keep one family and test whether people understand the symbols.
- **Developer:** Import the icons you use and retain the package's license notice.
- **With an AI agent:** Use names from the installed version and verify generated imports.
- **Check first:** The reviewed package has an ISC license with inherited Feather notices. Keep the full notice.

### 3.4. Tabler Icons

- https://tabler.io/icons

Tabler offers icons organized around a grid and drawing variants. The catalog is a candidate for applications with many business functions, but its size does not guarantee that people will recognize a symbol. Choose icons as a small shared vocabulary and inspect distinctions between related actions, such as archiving and deleting, in the context where those commands will actually be used.

- **Non-designer:** Compare related symbols and keep the text labels that remain necessary.
- **Developer:** Check variants and names before choosing the appropriate package.
- **With an AI agent:** Supply approved identifiers and a rule for concepts that have no matching icon.
- **Check first:** Do not mix variants arbitrarily; retain the license of the version you use.

### 3.5. Heroicons

- https://heroicons.com/

Heroicons is associated with the Tailwind ecosystem. Its variants target different formats and styles, encouraging you to choose a suitable drawing rather than resize the same one indefinitely. You can also consider the collection outside a Tailwind project. Select a few representative actions and check whether their meaning remains clear at the actual size used in the interface.

- **Non-designer:** Start with familiar actions and inspect both resting and focused states.
- **Developer:** Choose SVG files or components that are compatible with the project.
- **With an AI agent:** Provide exact variant and icon names rather than a vague resemblance instruction.
- **Check first:** A small, sharp icon does not justify a touch target that is too small.

### 3.6. Hugeicons

- https://hugeicons.com/

Hugeicons offers several styles and plans; its free subset should not be confused with the entire catalog. A rounded direction may fit a product's identity, as long as it remains consistent across commands. Start with a shortlist of essential symbols and check that they are all available in the same style under terms compatible with the project's requirements and distribution.

- **Non-designer:** Compare a rounded family on the important actions in your journey.
- **Developer:** Confirm that every required symbol belongs to the selected offering.
- **With an AI agent:** Supply references that actually exist in the authorized package.
- **Check first:** Examine the precise rights and limits of the free offering instead of generalizing to every style.

### 3.7. Remix Icon and Iconoir

- https://remixicon.com/
- https://iconoir.com/

Remix Icon and Iconoir offer distinct visual vocabularies. Compare them on the same actions before choosing rather than combining their catalogs. Proportions, details and fill variants can change how a navigation bar is read. Once you choose a family, establish a replacement rule for missing concepts and check its integration with neighboring text and visible focus states throughout the interface.

- **Non-designer:** Choose one family using a set of representative actions.
- **Developer:** Review each project's formats, packages and licenses separately.
- **With an AI agent:** Limit approved names to the chosen family and flag missing symbols.
- **Check first:** Read notice requirements in each license; free access does not mean there are no conditions.

### 3.8. MingCute

- https://www.mingcute.com/

MingCute is a candidate for compact line or filled icons. The variants can support discussion of states, but an active state should not be communicated only by the difference between drawings. Try similar shapes on a dark background and in a dense menu. Consistency also depends on spacing, nearby text and the size of the complete interactive command around each symbol.

- **Non-designer:** Compare symbols in a list or menu rather than only in the catalog.
- **Developer:** Check names, formats and license notices before integrating files.
- **With an AI agent:** Supply selected variants and state rules instead of an improvised mixture.
- **Check first:** Measure the full control and its contrast, not only the SVG's dimensions.

### 3.9. Material Symbols and Ionicons

- https://fonts.google.com/icons
- https://ionic.io/ionicons

Material Symbols and Ionicons belong to different ecosystems. Material Symbols includes variation axes, while Ionicons accompanies the Ionic ecosystem. Merely using these icons does not make an application native or establish platform conformance. Choose the platform and family first, then examine actions, sizes and states within the intended navigation context, including the gestures and focus behavior you actually implement.

- **Non-designer:** Compare platform conventions without equating an icon with a native experience.
- **Developer:** Choose an integration method and prevent ligature names appearing instead of symbols.
- **With an AI agent:** Specify the family, variants and target platform, then verify every rendered result.
- **Check first:** Gestures, navigation and focus rules still need to be implemented and tested.

### 3.10. Iconify and SVG Repo

- https://icon-sets.iconify.design/
- https://www.svgrepo.com/

Iconify brings many collections together through an identifier system, while SVG Repo supports searches across vectors from varied sources. They help compare families, but do not make their licenses identical. A search result is not yet an approved resource. Trace the selection back to its collection and author, retain the notice and do not mix styles simply because importing them is convenient.

- **Non-designer:** Compare representations of a concept, then choose a coherent family.
- **Developer:** Check license, provenance, network dependency and the SVG delivery method.
- **With an AI agent:** Supply approved identifiers together with their source and license.
- **Check first:** Do not present every vector in an aggregator as unrestricted or interchangeable.

## 4. Components and kits

Choose a base compatible with your platform and maintenance needs.

**Decision question:** Which behaviors and updates will become your responsibility?

### 4.1. shadcn/ui

- https://ui.shadcn.com/

shadcn/ui distributes component code that you integrate and adapt within your own project. Its documentation emphasizes open code, composition and distribution rather than an opaque library imported unchanged. This makes behavior easier to inspect, but also means tracking your adaptations and updates. Retest a modified component with its actual labels, error conditions and focus behavior rather than assuming the original example still represents it.

- **Non-designer:** Examine variants of a component before fixing the visual direction.
- **Developer:** Read added files, their dependencies and the update strategy.
- **With an AI agent:** Provide the component actually in the project and its documentation instead of requesting an approximate rewrite.
- **Check first:** Accessible building blocks do not certify the accessibility of the assembled or modified journey.

### 4.2. Origin UI and 21st.dev

- https://originui.com/
- https://21st.dev/

Origin UI and 21st.dev provide entry points to component variants and interface blocks. Look for an answer to a specific need, such as a search field with an empty state, instead of collecting visually appealing blocks. Before importing code, examine its provenance, dependencies, license and consistency with the components the project already uses and the team will need to maintain.

- **Non-designer:** Compare a few variants against a known need, not visual impact alone.
- **Developer:** Read the distributed code and assess adaptation and maintenance costs.
- **With an AI agent:** Supply the selected block, its origin and the permitted scope of changes.
- **Check first:** A marketplace or registry may mix different authors, licenses and commercial offerings.

### 4.3. Magic UI and Aceternity UI

- https://magicui.design/
- https://ui.aceternity.com/

These resources are associated with animated components and visual effects. An animation may clarify a transition, but it may also delay information or disrupt reading. Start by naming its role in the journey, then try the result without motion, by keyboard and on a phone. A presentation effect must not become necessary for understanding an action or reaching essential content.

- **Non-designer:** Choose motion that explains a transition rather than a permanent visual effect.
- **Developer:** Measure dependencies and rendering, and check reduced-motion behavior.
- **With an AI agent:** Specify the animation's purpose and the static states that replace it.
- **Check first:** Separate free components from paid offerings; test reduced motion and loading.

### 4.4. Ant Design and Mantine

- https://ant.design/
- https://mantine.dev/

Ant Design and Mantine provide component sets for applications with substantial forms and data. The choice depends on the technical platform, essential components and expected customization. Try a difficult screen with a table, validation and a modal before choosing a base. A large catalog does not remove decisions about states, content or responsibility for maintaining the interface over time.

- **Non-designer:** Evaluate overall consistency on a representative business screen.
- **Developer:** Compare APIs, versions, loading cost, customization and update policies.
- **With an AI agent:** Specify the installed version and limit examples to its documented API.
- **Check first:** Do not choose solely by component count; examine each project's terms.

### 4.5. HeroUI, DaisyUI and Flowbite

- https://www.heroui.com/
- https://daisyui.com/
- https://flowbite.com/

These three resources take different approaches to interfaces. DaisyUI notably uses semantic classes, while HeroUI and Flowbite provide their own components and conventions. Compare the project you must maintain, not just the speed of a first screen. Changing a theme does not solve validation, information hierarchy or content constraints. Prepare a real form to judge the compromises each approach introduces.

- **Non-designer:** Compare themes using the same labels and component states.
- **Developer:** Choose an approach compatible with the framework and existing styles.
- **With an AI agent:** Provide the selected API or classes without mixing different systems.
- **Check first:** Offerings and advanced components can differ; check licenses and availability before committing.

### 4.6. Ionic, Konsta UI and React Native Reusables

- https://ionicframework.com/docs/components
- https://konstaui.com/
- https://reactnativereusables.com/

Ionic, Konsta UI and React Native Reusables take different approaches to mobile interfaces. A mobile-looking web interface, a hybrid application and a React Native application have different constraints. This guide links to the current React Native Reusables site instead of the former documentation address. Test navigation, virtual keyboards, safe areas and screen readers on the target devices; a component catalog cannot replace those checks.

- **Non-designer:** Compare mobile conventions without confusing visual appearance with native behavior.
- **Developer:** Distinguish web, hybrid and React Native stacks before choosing components.
- **With an AI agent:** Provide the platform, navigation and device constraints before the visual references.
- **Check first:** Platforms and dependencies differ; the directory does not promise automatic native conformance.

### 4.7. shadcn-admin, Tremor and Untitled UI

- https://github.com/satnaing/shadcn-admin
- https://www.tremor.so/
- https://www.untitledui.com/free-figma-ui-kit

shadcn-admin, Tremor and Untitled UI offer different kinds of starting points: an administration template, data-oriented components or a design kit. A Figma mockup is not a working application, and an executable template is not a specification tailored to your service. Inspect exactly what is delivered, what is missing and what you would need to change before adopting its structure.

- **Non-designer:** Observe screen organization and identify the blocks your project actually needs.
- **Developer:** Distinguish executable code, design kits and dependencies that require maintenance.
- **With an AI agent:** Specify the selected medium and the elements that may be reused.
- **Check first:** Do not present an entire commercial catalog as free; inspect the exact scope of the kit.

## 5. Data charts

Explain a question and its data without hiding units or limits.

**Decision question:** Does the chart have units, a legend and a text alternative?

### 5.1. Tremor Charts and shadcn Charts

- https://www.tremor.so/docs/visualizations/area-chart
- https://ui.shadcn.com/charts

These resources offer chart presentations integrated with their component environments. They can help organize cards, legends, axes and tooltips consistently with the rest of a dashboard. They do not choose the right measure or representation for you. Start with a reading question, realistic data and a text alternative before customizing colors or interactions to suit the surrounding interface.

- **Non-designer:** Compare several representations of the same measure.
- **Developer:** Check component versions and the versions of underlying chart libraries.
- **With an AI agent:** Provide the data schema, units and expected empty/error states.
- **Check first:** Verify current URLs and offerings; a default appearance is not evidence that readers understand the data.

### 5.2. Recharts

- https://recharts.github.io/

Recharts composes charts with React components and SVG rendering. This structure helps you discuss axes, series, legends and tooltip contents separately. It does not remove decisions about units, scales or label placement. Try missing data, extreme values and a narrow screen; supplement the chart with a summary or table when it carries information that people must be able to access.

- **Non-designer:** Compare representations against a reading question rather than a style effect.
- **Developer:** Check the responsive container and components in the installed version.
- **With an AI agent:** Supply an explicit data schema and review values and scales.
- **Check first:** The official site describes React/SVG composition; project accessibility and performance still need testing.

### 5.3. ApexCharts

- https://apexcharts.com/

ApexCharts offers interactive charts with structured configuration. Distinguish this capability from permission to use it: the current official license page describes conditional Community, Commercial and OEM/redistribution regimes. The supplied document called it open source too broadly. Before integration, examine the current license, distribution model and organization's circumstances; a working example does not establish free use for every organization or purpose.

- **Non-designer:** Compare the interactions you need without assuming every offering is free.
- **Developer:** Confirm the applicable license before adding the dependency.
- **With an AI agent:** Read the selected version and license instead of installing the library automatically.
- **Check first:** Payment may be required depending on the organization and usage; the current license page is the reference.

### 5.4. Apache ECharts

- https://echarts.apache.org/

Apache ECharts provides varied visualizations and multiple rendering options. Its catalog can help examine needs that basic charts do not cover, but this flexibility increases configuration decisions. First identify the question to explain. Then prepare representative data, units, a legend and an alternative reading format before pursuing effects or trying to maximize the number of data points on screen.

- **Non-designer:** Find an example close to the need and explain what it lets readers understand.
- **Developer:** Measure rendering on the target device and limit loaded functionality.
- **With an AI agent:** Specify the chart type, data and permitted interactions.
- **Check first:** No data-volume limit or performance result has been measured for this guide.

### 5.5. Chart.js

- https://www.chartjs.org/

Chart.js is a charting library that renders on Canvas. It is a candidate for common representations with documented configuration, without requiring React. Canvas needs particular attention to replacement content: a chart image does not automatically expose values to every reader. Prepare a summary and, when needed, an accessible table, then inspect incomplete data and the behavior on narrow screens.

- **Non-designer:** Choose the representation based on the comparison the reader needs to make.
- **Developer:** Configure the container, necessary plugins and accessible replacement content.
- **With an AI agent:** Provide data, units and scale rules rather than only a visual example.
- **Check first:** No popularity ranking or performance guarantee is claimed; test rendering and text alternatives.

### 5.6. Lightweight Charts

- https://www.tradingview.com/lightweight-charts/

Lightweight Charts, offered by TradingView, focuses notably on time series and financial charts. It is a more relevant candidate when time-based interaction or financial representation is genuinely needed than for a single isolated indicator. Evaluate detail, zoom and information available by touch. Do not repeat a bundle size from an old listing: measure the project's selected version and options instead.

- **Non-designer:** Examine how a time series and its values can be read.
- **Developer:** Check notices, attribution and the selected version's performance.
- **With an AI agent:** Provide the time structure, units and update rules.
- **Check first:** A financial chart library does not guarantee meaningful data or a fixed file size.

### 5.7. Chartist, uPlot and Visx

- https://chartist.dev/
- https://github.com/leeoniya/uPlot
- https://airbnb.io/visx/

Chartist, uPlot and Visx address different architectural choices: styled SVG charts, time series or React visualization primitives. This guide replaces the supplied document's old Chartist URL with the current documentation address. Compare candidates on a real case rather than a general speed ranking. More control changes development and maintenance work; a lower-level tool does not automatically produce a more understandable interface.

- **Non-designer:** Compare the same question and data using equivalent legends.
- **Developer:** Assess control, integration, measured performance and maintenance effort.
- **With an AI agent:** Provide the constraints and selected library instead of requesting a mixture of all three.
- **Check first:** APIs and licenses differ; measure rather than repeating unverified bundle-size figures.

## 6. Illustrations and 3D

Find a useful visual without forgetting rights, loading or alternatives.

**Decision question:** Does the illustration convey information rather than obstruct loading?

### 6.1. unDraw

- https://undraw.co/illustrations

unDraw offers illustrations to consider for empty states or presentation pages. Its specific license permits some free uses, including commercial ones, but explicitly restricts asset-pack redistribution and use of its files for AI training or development without separate permission. This directory does not redistribute any unDraw illustration. Choose a visual for the meaning it adds rather than simply to fill unused space.

- **Non-designer:** Choose an illustration that explains a state without replacing the useful message.
- **Developer:** Retain the source and review the license, weight and text alternative before use.
- **With an AI agent:** Provide an approved reference; do not scrape or reuse files to train a model.
- **Check first:** This is a specific license, not a blanket open-source permission; read the current license page.

### 6.2. Storyset

- https://storyset.com/

Storyset provides illustration collections and customization tools. Using one family can support consistency, but licensing must remain part of the decision. The reviewed terms require attribution for free use and restrict redistribution. An animation must not be necessary to understand a state and needs a suitable alternative. This kit includes no Storyset files; examine the exact intended use before downloading or delivering an illustration.

- **Non-designer:** Choose a family and examine what its visual communicates on the intended screen.
- **Developer:** Plan the required attribution and check weight, reduced motion and delivery rights.
- **With an AI agent:** Provide authorized references and terms, without bulk downloads or a derived asset pack.
- **Check first:** The reviewed free-use terms require attribution; check other applicable restrictions too.

### 6.3. DrawKit and ManyPixels

- https://www.drawkit.com/
- https://www.manypixels.co/gallery

DrawKit and ManyPixels let you explore illustrations grouped by style or subject. A category such as health or finance does not validate meaning, representation of people or suitability for your service. Choose a few consistent images, then inspect the specific files and their rights. Free and paid collections can coexist; one pack's permissions do not establish those of another resource from the same site.

- **Non-designer:** Compare a few visuals alongside the message they should support.
- **Developer:** Check the pack's terms, format and weight before delivery.
- **With an AI agent:** Supply approved files rather than a gallery to download automatically.
- **Check first:** Read each collection's license; this guide does not redistribute any third-party pack.

### 6.4. Humaaans and Open Peeps

- https://www.humaaans.com/
- https://www.openpeeps.com/

Humaaans and Open Peeps, created by Pablo Stanley, provide character elements that can be combined. This modular approach helps you discuss a scene, the people in it and their poses without drawing every shape. It does not guarantee inclusive representation or suitability for the audience. Review the actual combinations, intended context and license of the resource you download before using the scene.

- **Non-designer:** Compose a scene and discuss what it represents before adopting it.
- **Developer:** Keep references and check the rights of the file or pack actually used.
- **With an AI agent:** Supply an approved composition rather than requesting unchecked variations.
- **Check first:** Verify the author, rights and conditions for the collection you actually downloaded.

### 6.5. Blush and Ouch!

- https://blush.design/
- https://icons8.com/illustrations

Blush and Ouch! bring together illustrations in different styles and offerings. Download format, resolution, attribution and rights may depend on the selected work and plan. First choose a direction that fits the content, then check what can be used and delivered. A visible gallery preview does not authorize downloading it by another method to bypass an access or format restriction.

- **Non-designer:** Choose a consistent illustrated direction with a few examples rather than mixed styles.
- **Developer:** Compare formats and access conditions before planning integration.
- **With an AI agent:** Supply authorized files and the limits on modification or attribution.
- **Check first:** Do not promise a free SVG for every illustration; inspect the specific offering and license.

### 6.6. IRA Design

- https://iradesign.io/

IRA Design is a candidate for character and object illustrations with an identity built notably around gradients. Before adopting this direction, try it on the actual background and at the interface's intended size: a detailed scene may lose meaning as a thumbnail. Check nearby text and file weight. If an illustration is purely decorative and carries no information, an empty text alternative may be appropriate.

- **Non-designer:** Examine whether the scene supports the state message or distracts from it.
- **Developer:** Check the format, license and light/dark theme adaptation.
- **With an AI agent:** Supply the authorized file and state whether it is informative or decorative.
- **Check first:** Do not let an agent recolor or redistribute files without reviewing both rights and results.

### 6.7. 3Dicons, Shapefest, Toy Faces, Khagwal 3D and Spline

- https://3dicons.co/
- https://www.shapefest.com/
- https://www.toyfaces.com/
- https://3d.khagwal.com/
- https://app.spline.design/community

These resources do not all deliver the same kind of material: a rendered image, avatar, object or interactive scene. A PNG may be enough for a welcome screen, whereas a Spline scene introduces interactions and loading costs to examine. Free and paid offerings and rights vary by pack. Do not describe the entire group as open source. Choose the simplest medium that conveys the intended information and provide a static replacement where needed.

- **Non-designer:** Compare what depth adds against a simpler image carrying the same message.
- **Developer:** Distinguish static rendering, source model and embedded scene; measure loading.
- **With an AI agent:** Provide the approved resource and require an accessible fallback, without automatic purchases or imports.
- **Check first:** Inspect each pack's rights and limits; this guide includes no third-party render or model.

## Three licenses to examine before downloading

- **ApexCharts: conditional free use** — The current license distinguishes conditional Community, Commercial and OEM/redistribution regimes. Confirm the organization’s circumstances and the intended use before integrating it. Do not rely on an older blanket description of the library as open source. https://apexcharts.com/license/
- **unDraw: no asset packs or AI training** — Its specific license permits certain free uses, but restricts asset-pack redistribution and uses related to AI training or development. This guide includes no unDraw files. Read the full current terms before downloading or using a visual. https://undraw.co/license
- **Storyset: attribution in the free offering** — The reviewed terms require credit for free use and limit redistribution. Check the exact intended use, delivery to a client and any additional restrictions. This kit does not include any Storyset illustrations. https://storyset.com/terms

## Sources and editorial limitations

English translation of the edited directory adapted from repertoire-complet-ui-ux-profils.md, supplied by the creator. References informed targeted corrections in the French source edition dated November 18, 2026, not a legal or availability audit of all 75 destinations. The translation does not imply a fresh exhaustive review. Terms may change; candidates whose features were not tested are identified in their entries.

- **Radix Colors — Understanding the scale** — https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
  Twelve steps and their typical uses, with explicit exceptions; no general contrast guarantee.
- **Google Fonts — FAQ** — https://fonts.google.com/faq
  Free access and commercial use under each license; files, languages and hosting still require a choice.
- **Lucide — package notice 0.511.0** — https://github.com/lucide-icons/lucide/blob/main/LICENSE
  ISC notice reviewed in the local lucide-react package, including inherited Feather notices. Copy included in LICENSES.txt.
- **shadcn/ui — Introduction** — https://ui.shadcn.com/docs
  Open-code distribution, composition and responsibility for adaptations and updates.
- **Recharts** — https://recharts.github.io/
  React component composition, SVG and D3 submodules. The supplied domain redirected to this site during the French editorial review.
- **ApexCharts — License Options** — https://apexcharts.com/license/
  Current model distinguishes conditional Community, Commercial and OEM/redistribution regimes; avoid blanket claims of free use.
- **unDraw — License** — https://undraw.co/license
  Specific license with restrictions on asset-pack redistribution and AI training/development uses.
- **Storyset — Terms of Use, section 6** — https://storyset.com/terms
  Free use is conditional on attribution; read redistribution restrictions and other applicable terms.
- **Fontshare** — https://www.fontshare.com/
  The catalog includes closed-source families; free access does not establish a universal license.
- **React Native Reusables** — https://reactnativereusables.com/
  Address consulted for the French editorial corrections, replacing the former documentation host.
- **Chartist** — https://chartist.dev/
  Documentation address consulted for the French editorial corrections, replacing the supplied older URL.

## What comes after the directory?

This guide helps you choose resources. The separate paid UX/UI Playbook covers preparing and reviewing interfaces with a manual, A4 worksheets and an archive of tokens, templates and a scanner. The paid product is not included in this free download.

Explore the English edition ($29 USD): https://joyccelight-playbook.uxplay.workers.dev/en?utm_source=ui-ux-directory&utm_medium=markdown&utm_campaign=free-resource#buy

Read the free articles: https://joyccelight-playbook.uxplay.workers.dev/en/articles?utm_source=ui-ux-directory&utm_medium=markdown&utm_campaign=free-resource

## Terms of use

Text and layout: Joy N. / Joyccelight, 2026. You may read this guide, use it in personal or professional projects and adapt the decision worksheets for your team or clients. Do not resell the guide or republish it unchanged under your own name; share its download page instead. These terms apply only to this guide and grant no rights to the referenced websites, brands, fonts, icons, components or visuals. Their authors and licenses remain the authorities. No partnership or paid affiliation with the listed services is claimed. This guide is not legal advice.
