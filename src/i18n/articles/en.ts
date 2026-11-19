import type { ArticleData } from './types';

export const ARTICLES_EN: ArticleData[] = [
  /* ============================================================================
   * COURSE 1 (EN) — OPERATIONAL UX DESIGN
   * ========================================================================== */
  {
    slug: 'ux-design-guide',
    category: 'UX Design',
    icon: '🧭',
    readTime: '18 min read',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-ux-en.jpg',
    metaTitle:
      'UX Design: Cognitive Laws, Screen States & Audit | UX/UI Playbook',
    metaDescription:
      'A practical UX design guide to cognitive laws, five screen states, checkout usability and a 20-minute interface audit.',
    keywords: [
      'operational UX design',
      'cognitive load Cowan 4 chunks',
      'Fitts law Hick-Hyman law UI',
      '5 states of every screen',
      'checkout optimization Baymard 2026',
      'WCAG 2.2 AA European Accessibility Act 2026',
      '40 point UX audit checklist',
    ],
    title:
      'Operational UX Design: Cognitive Budgets, Habit Loops, the 5 Screen States & the 20-Minute Audit',
    subtitle:
      'UX is not decorative polish applied the night before launch. It is the engineering discipline that lets a distracted human reach their goal without thinking — and come back unprompted seven days later.',
    aeoSummaryTitle: 'Executive Takeaway — What Actually Governs Usability',
    aeoSummary:
      'A high-performing screen obeys four measurable constraints: an active working-memory budget capped at 4 ± 1 chunks (Cowan, 2001) around one primary action, a visible first win under 60 seconds from the empty state, explicit implementation of all 5 screen states (empty, loading, ideal, overflow/partial, error), and WCAG 2.2 AA compliance (≥ 4.5:1 text contrast, ≥ 44 px hit targets). Five qualitative testers catch ~85% of blockers on average (actual 5-user range: 55%–99%), whereas comparing Variant A vs B within ±10 points requires ~93 participants.',
    keyStats: [
      {
        value: '4 ± 1 chunks',
        label: 'True active working-memory limit while reading and deciding (not the 7 ± 2 myth)',
        source: 'Nelson Cowan, Behavioral & Brain Sciences (2001) · Established evidence',
        urls: ['https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory/44023F1147D4A1D44BDC0AD226838496'],
      },
      {
        value: '70.22%',
        label: 'Average checkout abandonment (23.48 form elements shown vs 12–14 actually needed)',
        source: 'Baymard Institute (28 Oct 2026, 50 studies) · Established evidence',
        urls: ['https://baymard.com/blog/cart-abandonment-rate'],
      },
      {
        value: '95.9%',
        label: 'Top home pages failing WCAG 2.2 Level A/AA checks (56.1 errors per page on average)',
        source: 'WebAIM Million (February 2026) · Established evidence',
        urls: ['https://webaim.org/projects/million/'],
      },
    ],
    sections: [
      {
        id: 'ux-is-not-decoration',
        num: '01',
        tocLabel: 'Kill vague briefs: 4 questions & the 5-second test',
        heading: 'Why UX Is Not Decoration (and How to Disarm Vague Client Briefs)',
        blocks: [
          {
            type: 'p',
            text: 'Three adjectives appear in almost every software brief: "modern", "clean", and "intuitive". None of the three is an engineering requirement. You cannot write an automated test for "clean", and an "intuitive" interface does not exist in a vacuum — a screen is only intuitive for a specific person, in a specific frame of mind, trying to complete a specific verb.',
          },
          {
            type: 'quote',
            tag: 'Golden Rule · Part 00 & Section 01',
            text: 'A screen is neither "pretty" nor "ugly". It is legible, predictable, consistent, and fast. Everything else is styling — and styling can be swapped in twenty minutes.',
          },
          {
            type: 'p',
            text: 'To see the sharp boundary between visual styling (UI) and user experience (UX), picture two pixel-identical screens: clean typography, centred card, bold crimson primary button in the bottom-right corner. On a final payment screen ("Pay $132.90"), that prominence builds confidence and closes the sale. On an account settings page where that exact button reads "Permanently delete workspace", the identical aesthetic becomes a catastrophic trap. The pixels did not change; the user’s intent inverted the outcome.',
          },
          {
            type: 'h3',
            text: 'The four pre-drawing questions that lock down any screen',
          },
          {
            type: 'p',
            text: 'The most expensive mistake a developer or solo founder makes is drawing rectangles before writing down the logic of the flow. Before you open Figma or prompt a coding agent, every screen must answer four questions in plain prose:',
          },
          {
            type: 'steps',
            title: 'Pre-Design Screen Protocol (Section 01)',
            steps: [
              {
                bold: 'Who opens this screen, and in what state of mind?',
                text: 'An accountant reconciling 80 invoices on Friday afternoon (rushed, keyboard-first, expert) needs a completely different layout from a commuter buying a ticket one-handed on shaky cellular data, or a user staring at a declined card.',
              },
              {
                bold: 'What single verb must they accomplish here?',
                text: 'Write the goal in one sentence around one action verb: "compare three plans", "confirm a delivery slot", "export October receipts". If your sentence needs the word "and", you are cramming two screens into one.',
              },
              {
                bold: 'What is the shortest physical and cognitive path to that verb?',
                text: 'Count every field to scan, every dropdown to open, every secondary decision. Anything that does not move the user closer to that verb levies an attention tax.',
              },
              {
                bold: 'What happens when the happy path breaks?',
                text: 'Zero records on day one, a six-second API stall, a 42-character surname, an expired card: how your interface behaves under failure is what separates shipped software from a weekend demo.',
              },
            ],
          },
          {
            type: 'h3',
            text: 'The free, ruthless diagnostic: the 5-second test',
          },
          {
            type: 'p',
            text: 'Want to know right now whether your landing page or SaaS home works? Show the screen to someone outside the project for exactly five seconds, close the laptop, and ask two questions: "What does this product do?" and "Where would you click first?". If they hesitate, repeat a vague tagline, or missed your primary CTA, stop tweaking gradients and shadows — your hierarchy is structurally broken.',
          },
        ],
      },

      {
        id: 'true-cognitive-laws',
        num: '02',
        tocLabel: 'What cognitive laws actually say (Cowan, Hick, Fitts)',
        heading: 'Cognitive Laws as Primary Research Actually Formulates Them (and How to Use Them in Reviews)',
        blocks: [
          {
            type: 'p',
            text: 'Most design blogs repeat watered-down slogans that lead to bad engineering decisions — like burying daily power tools inside three nested menus because of a misread Hick’s Law, or cramming seven pricing tiers onto one row because of Miller’s 1956 essay. Here is what the primary literature actually proves and how to translate each mechanism into code.',
          },
          {
            type: 'h3',
            text: '1. Cowan (2001) vs Miller’s myth: your real budget is 4 ± 1 chunks',
          },
          {
            type: 'p',
            text: 'George Miller’s famous "7 ± 2" (1956) described short-term recall of isolated digits with zero concurrent decision-making. When a real user reads prices, weighs trade-offs, and hunts for a button simultaneously, active working memory caps out at 4 ± 1 chunks (Nelson Cowan, Behavioral and Brain Sciences, 2001). Group navigation items, dashboard KPIs, and feature cards into sets of 3 to 5. An ungrouped 40-item dropdown menu is an admission that nobody designed the information architecture.',
          },
          {
            type: 'h3',
            text: '2. Hick-Hyman (1952–1953): the muscle-memory exception most designers miss',
          },
          {
            type: 'p',
            text: 'Hick-Hyman is routinely misquoted as "fewer buttons = faster clicks". Two crucial nuances appear in the original work. First, decision time scales with information entropy (how hard it is to tell vague labels apart), not raw count alone. Second, the law largely disappears once spatial position becomes automatic muscle memory! On a first-visit landing page, strip choices down to one unmistakable primary CTA. Inside a daily pro workspace used six hours a day, never hide or reshuffle established toolbar shortcuts in the name of minimalism — muscle memory beats fewer icons every time.',
          },
          {
            type: 'h3',
            text: '3. Fitts (1954): the icon glyph is never the hit target',
          },
          {
            type: 'p',
            text: 'Pointing time depends on distance divided by effective target width — measured across actual click/tap scatter, not the visual stroke of an icon. A 16 × 16 px close icon whose clickable box is also 16 × 16 px guarantees rage-taps. Always decouple the visual glyph (16–20 px) from its padded hit container (`min-width: 44px; min-height: 44px` on iOS/Web, `48 × 48 dp` on Android).',
          },
          {
            type: 'table',
            caption: 'Operational translation of foundational UX laws (UX/UI Playbook · Section 03)',
            headers: ['Law / Principle', 'True Cognitive Mechanism', 'Immediate Implementation Rule'],
            rows: [
              [
                'Jakob’s Law',
                'Users spend 99% of their lives on other products and import those expectations.',
                'Keep conventions intact: top-left logo goes home, top-right cart, unmistakable back & search.',
              ],
              [
                'Proximity (Gestalt)',
                'Spatial closeness signals relationship before a single word is read.',
                'Keep 8 px inside a group (label → input) vs 24–32 px between distinct groups.',
              ],
              [
                'Similarity',
                'Elements that look alike promise identical behaviour.',
                'Text links must never look like buttons; static status pills must never look like CTAs.',
              ],
              [
                'Von Restorff Effect',
                'Only the outlier in a calm field captures memory and gaze.',
                'One accent-coloured primary button per screen. Three red buttons equal zero red buttons.',
              ],
              [
                'Doherty Threshold',
                'Past ~400 ms of silent waiting, human flow fractures.',
                'Show instant press state (< 100 ms), true-size skeleton past 300 ms, progress past 2 s.',
              ],
            ],
          },
          {
            type: 'callout',
            icon: '🗣️',
            tone: 'accent',
            title: 'Turning subjective stakeholder pushback into objective engineering',
            text: 'Never say "I don’t like having four buttons here." Say: "Right now four actions share identical visual weight, cancelling the Von Restorff effect and raising Hick-Hyman entropy on the primary conversion verb. Let’s keep the main action solid and demote the other three to outline/ghost." You move the room from personal taste to mechanics.',
          },
        ],
      },

      {
        id: 'cognitive-budget-user-journey',
        num: '03',
        tocLabel: 'Screen budgets & the Day-7 habit loop',
        heading: 'Cognitive Load & Full Journey Architecture: From First Intent to Unprompted Day-7 Return',
        blocks: [
          {
            type: 'p',
            text: 'Every screen burns a resource you cannot manufacture: user attention. In production audits, cognitive overload nearly always leaks from the same three places: interface-explaining copy ("Click the button below to submit your request" simply proves your button label failed), duplicate verbs ("Save", "Apply", and "Confirm" scattered across the same app), and decorative noise (badges, gauges, and counters that trigger zero decisions).',
          },
          {
            type: 'h3',
            text: 'The bank-counter test and density ceilings by screen family',
          },
          {
            type: 'p',
            text: 'Run the bank-counter test (Section 04): read your screen’s labels aloud as if speaking to a customer standing across a counter. If you feel compelled to add a spoken disclaimer ("oh, make sure you pick the currency before typing the amount"), your layout is broken. Fix the sequence or the label on screen so the spoken patch becomes unnecessary.',
          },
          {
            type: 'doDont',
            doTitle: '✓ Protects user attention',
            dontTitle: '✕ Drains cognitive budget',
            doItems: [
              'One unmistakable primary action per view; secondary actions demoted to outline or quiet links.',
              'Outcome-driven action verbs: "Create workspace" or "Download PDF receipt" instead of "Next".',
              'Smart defaults pre-selected for the 80% case (currency, billing cycle, recommended tier).',
              'Progressive disclosure: ask for a datum only at the exact moment it unlocks value.',
            ],
            dontItems: [
              'Three solid buttons side by side ("Cancel", "Save draft", "Publish") competing at equal weight.',
              'A 12-field registration wall before the user has experienced a single second of product value.',
              'Sprinkling `(?)` tooltips everywhere to excuse cryptic internal column names.',
              'Displaying every edge-case toggle upfront "just in case a power user wants it".',
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/en/ux-cognitive.webp',
            alt: 'Cognitive load budget sheet from the UX/UI Playbook English Edition showing visible element caps across landing pages, forms, dashboards, and detail views',
            caption:
              'Density ceilings by screen type: home page (1 promise, 1 action, 3 proofs), form step (5–7 fields max), SaaS dashboard (3 KPIs, 1 chart, 1 actionable list).',
            sourceRef: 'UX/UI Playbook EN · Part 01, Section 04 (p. 13)',
          },
          {
            type: 'h3',
            text: 'Screens do not live in isolation: the A → E loop and the 5 drop-off cliffs',
          },
          {
            type: 'p',
            text: 'Judging a static PNG outside its sequence is a studio illusion. Every durable product guides people through five stages: A. Trigger (a concrete reason to open) → B. Comprehension (grasping what it does in 5 seconds) → C. Action (completing the verb without friction) → D. Proof (immediate confirmation that it worked) → E. Return (coming back effortlessly with prior state intact).',
          },
          {
            type: 'steps',
            title: 'The 5 exact moments where products lose people (Section 05)',
            steps: [
              {
                bold: 'Cliff 1 — The cryptic arrival (> 60% qualified bounce)',
                text: 'The hero headline talks about company philosophy instead of stating the problem solved in five seconds.',
              },
              {
                bold: 'Cliff 2 — The premature sign-up tollbooth',
                text: 'Demanding phone number, company size, role, and credit card before delivering any preview of value.',
              },
              {
                bold: 'Cliff 3 — The silent first win',
                text: 'The user clicks "Save"; nothing visibly changes, so they hit Back to double-check whether their work survived.',
              },
              {
                bold: 'Cliff 4 — Amnesia on return',
                text: 'When they log back in tomorrow, their filters, draft text, or scroll context have been wiped clean.',
              },
              {
                bold: 'Cliff 5 — Blaming, dead-end error messages',
                text: 'A red banner barking "Invalid payload (422)" blames the human without naming the broken field or how to fix it.',
              },
            ],
          },
          {
            type: 'quote',
            tag: 'The Ultimate UX Metric · Section 05',
            text: 'The single most honest UX indicator is unprompted Day-7 retention — users returning without a reminder email or push notification. A product remembered on its own merits has won.',
          },
        ],
      },

      {
        id: 'five-states-empty-checkout',
        num: '04',
        tocLabel: 'The 5 states, Empty States & Checkout',
        heading: 'Dissecting Revenue-Critical Screens: The 5 Mandatory States, Onboarding Empty States & Checkout',
        blocks: [
          {
            type: 'p',
            text: 'Why do so many rapidly shipped apps — hand-coded or AI-generated — feel brittle within sixty seconds of real use? Because only the "postcard state" was designed: six tidy database rows, 12-letter names, and a 40 ms local API. In production interface engineering, that ideal state is barely 20% of the job.',
          },
          {
            type: 'figure',
            src: '/images/articles/en/ux-states.webp',
            alt: 'The 5 mandatory states of every screen from the UX/UI Playbook English Edition: empty, loading, ideal, partial/overflow, and error',
            caption:
              'No screen is ready for production until all five states — empty, CLS-safe skeleton loading, ideal, partial/long-text overflow, and recoverable error — exist.',
            sourceRef: 'UX/UI Playbook EN · Part 01, Section 07 (p. 16)',
          },
          {
            type: 'h3',
            text: 'Worked territory #1: Empty states and the 60-second activation rule',
          },
          {
            type: 'p',
            text: 'The most important screen in your SaaS is the one 100% of new sign-ups see first: the empty state (Section 17). Most apps greet new users with a bleak "No records found" or a giant decorative illustration that shoves the primary CTA below the mobile fold. A high-converting empty state obeys six rules: 1) state the fact plainly without snark ("No boards yet"), 2) explain in one line what value appears once populated, 3) provide a single solid button that creates the first item immediately, 4) offer a low-friction escape hatch ("Or import CSV / start from a template"), 5) never let artwork push the button off mobile viewports, and 6) hide disabled gray toolbars until data exists. If a new user cannot produce a visible result within 60 seconds, voluntary retention collapses.',
          },
          {
            type: 'h3',
            text: 'Worked territory #2: Checkout — where every extra input burns revenue',
          },
          {
            type: 'p',
            text: 'Baymard Institute’s synthesis of 50 e-commerce studies (updated 28 October 2026) puts average cart abandonment at 70.22% (observed spread: 55%–84%), and documents an average of 23.48 checkout form elements where 12 to 14 suffice. Checkout is the one territory where artistic flair matters zero compared to speed and anxiety reduction (Section 14):',
          },
          {
            type: 'list',
            heading: '6 high-leverage Checkout rules (Section 14)',
            items: [
              {
                bold: 'Guest checkout first — never force account creation before payment',
                text: 'Offer one-click password creation on the confirmation screen after the money is captured.',
              },
              {
                bold: 'Zero surprise fees on the final step',
                text: 'Keep an always-visible order summary (sticky right rail on desktop, collapsible top summary on mobile) showing subtotal, shipping, and tax upfront.',
              },
              {
                bold: 'One semantic concept per row',
                text: 'First and last name side by side on desktop, street address full-width, phone number only if delivery requires it (with a 5-word reason underneath).',
              },
              {
                bold: 'Cap payment methods at 3 clear tiles',
                text: 'Pre-select the dominant method for the user’s region (Card / Apple Pay, PayPal, or local instant payment).',
              },
              {
                bold: 'Put the exact total inside the primary button label',
                text: 'Write "Pay $132.90" — never "Continue" or "Submit". Naming the exact charge removes the fear of hidden steps; it is the cheapest anxiety reducer on the web.',
              },
              {
                bold: 'Validate on blur, never on the first keystroke',
                text: 'Never yell "Invalid email address" in red while the customer is still typing the third letter of their name.',
              },
            ],
          },
        ],
      },

      {
        id: 'accessibility-2026-law',
        num: '05',
        tocLabel: 'Sellable Accessibility & real 2026 legal rules',
        heading: 'Sellable Accessibility & What Is Actually Mandatory in 2026: Stop Confusing "Published" with "Law"',
        blocks: [
          {
            type: 'p',
            text: 'In February 2026, the WebAIM Million report found that 95.9% of top home pages still fail automated WCAG 2.2 Level A/AA checks, averaging 56.1 errors per page — overwhelmingly low-contrast gray text, missing image alternatives, unlabelled inputs, and unnamed icon buttons. Fixing those fundamentals is not charity: it makes interfaces legible outdoors on phones, keyboard-navigable for power users, and safe to sell into enterprise procurement.',
          },
          {
            type: 'h3',
            text: 'The 2026 regulatory landscape (and the scoping clause that protects your contracts)',
          },
          {
            type: 'p',
            text: 'Confusing a W3C working draft, a newly published European technical standard, and a directive cited in the EU Official Journal can create serious liability inside a client proposal (Section 52). Keep these five dates straight:',
          },
          {
            type: 'table',
            caption: '2026 Accessibility & AI Transparency Rules Unpacked (Section 52 · p. 89)',
            headers: ['Framework / Regulation', 'Effective Date', 'What It Actually Means for Your Work'],
            rows: [
              [
                'European Accessibility Act — Directive (EU) 2019/882',
                'In force since 28 June 2025',
                'Covers targeted digital products and services sold in the EU (e-commerce, banking, ticketing, telecoms). Exempts micro-enterprises providing services (< 10 staff AND ≤ €2M turnover/balance sheet) — physical/imported products remain covered.',
              ],
              [
                'WCAG 2.2 (W3C Recommendation)',
                'October 2023',
                'The global technical baseline targeted at Level AA (4.5:1 text contrast, 2.4.11 Focus Not Obscured, target size, drag alternatives).',
              ],
              [
                'EN 301 549 v4.1.1',
                'Published 2 September 2026',
                'Updates the European standard to WCAG 2.2, but only grants legal presumption of conformity once cited in the Official Journal of the EU (until then, v3.2.1 remains the harmonised reference).',
              ],
              [
                'WCAG 3.0 (W3C Working Draft)',
                '10 September 2026 draft',
                'Zero mandatory force. The W3C explicitly states it must not be cited as a compliance target.',
              ],
              [
                'EU AI Act — Regulation (EU) 2024/1689 Art. 50',
                'Applicable since 2 August 2026',
                'Transparency duty: disclose clearly when a user is interacting with an AI system and label synthetic outputs.',
              ],
            ],
          },
          {
            type: 'copyable',
            label: 'Protective Accessibility Scoping Clause for Client Proposals (Section 52)',
            langTag: 'text',
            code: `Accessibility Evaluation Scope:
"Delivery includes an engineering evaluation report covering the user flows listed
in Appendix 1, tested against W3C WCAG 2.2 Level AA as of [YYYY-MM-DD] (automated
static/DOM scan plus manual keyboard and screen-reader walkthrough). Exact scope,
test methodology, and sampling limits are documented in the attached report. This
deliverable is a technical verification report and constitutes neither an official
certification nor legal advice."`,
            note: 'Never sign an open-ended "100% compliant forever" warranty without naming the exact flows, standard version, and test date.',
          },
        ],
      },

      {
        id: 'audit-20-min-40-point-checklist',
        num: '06',
        tocLabel: '5-user testing truth & 40-Point Audit Checklist',
        heading: 'Usability Testing Without Statistical Lies, the 20-Minute Audit & the Full 40-Point Checklist',
        blocks: [
          {
            type: 'p',
            text: 'How many testers do you really need? Nielsen & Landauer’s binomial curve (CHI 1993), `1 - (1 - L)^n` with mean discovery rate `L ≈ 31%`, shows that 5 qualitative testers uncover ~85% of usability blockers on average. Yet Laura Faulkner’s empirical replication (2003) adds the caveat every honest practitioner must cite: individual 5-person random samples actually uncover anywhere from 55% to 99% of issues!',
          },
          {
            type: 'p',
            text: 'The Playbook’s rule (Sections 32 & 48) is straightforward: watch 5 real humans for 25 minutes to find what breaks and immediately fix anything 3 out of 5 stumble on. Never use 5 people to claim "Variant B beats Variant A" — estimating a completion rate within ±10 percentage points at 90% confidence takes roughly 93 participants per group. And never swap real humans for synthetic LLM personas: 2026 empirical benchmarks (Kuric et al., 2026; Pew Research Center, 2026) show AI user twins diverge from real human behaviour on 53% of tasks.',
          },
          {
            type: 'h3',
            text: 'How to run and bill a 20-minute interface audit ($150–$400)',
          },
          {
            type: 'p',
            text: 'A tight 20-minute audit is the highest-converting foot-in-the-door offer a freelancer or consultant can sell: prospects experience your clarity before committing to a full build (Section 33). Score the screen `/50` across 10 axes (5-second clarity, hierarchy, single primary CTA, consistency, 5 states, < 400 ms feedback, accessibility, microcopy, trust/pricing clarity, one-handed mobile reach). Present at most the top 3 blockers formatted strictly as: Factual observation → User/revenue impact → Concrete fix on an annotated screenshot. End with a single question: "Which of these three would you like to fix first?"',
          },
          {
            type: 'copyable',
            label: 'Appendix A1 Complete — The 40-Point Pre-Ship UX/UI Audit Checklist',
            langTag: 'markdown',
            code: `# 40-POINT UX/UI AUDIT CHECKLIST (UX/UI Playbook · Appendix A1)

## 1. Structure & Flow (10 points)
- [ ] Screen purpose is understood in under 5 seconds (verified on a fresh pair of eyes)
- [ ] Exactly one visually dominant primary action on the view
- [ ] Every screen has an explicit entry point and exit path
- [ ] Navigation indicates current location by more than colour alone
- [ ] Browser/app Back never wipes user-entered form data
- [ ] Familiar conventions are respected (logo = home, cart, search, back)
- [ ] The highest-frequency daily task takes the fewest clicks
- [ ] No secondary feature visually competes with the core verb
- [ ] Text links and action buttons never share the same visual styling
- [ ] First-time users reach a visible result in under 60 seconds

## 2. Content & Microcopy (10 points)
- [ ] Zero "Lorem ipsum" or unrealistic placeholder strings
- [ ] Every button starts with a specific action verb (never "Submit / OK")
- [ ] Every error message states what happened and the exact step to recover
- [ ] Full price, taxes, and fees appear before commitment
- [ ] Secondary helper copy maintains ≥ 4.5:1 contrast
- [ ] Dates, currencies, and numbers obey the active locale
- [ ] Edge lengths tested (40-character names, 3-line titles, 0 results)
- [ ] Empty states explain value, offer 1-click creation, and provide an import/template path
- [ ] No multi-word sentences set in ALL CAPS
- [ ] Single consistent language and typographic punctuation throughout

## 3. Visual System (10 points)
- [ ] Maximum two font families (plus monospace for code/IDs)
- [ ] Every font size comes strictly from the locked type scale
- [ ] Every spacing value is a multiple of 4 px (8 px for layout structure)
- [ ] Single accent colour reserved for primary actions
- [ ] Identical components look and behave identically everywhere
- [ ] Border radii and elevation steps stay consistent
- [ ] Reading order survives the 3-step squint test
- [ ] Body copy line length stays between 60 and 75 characters
- [ ] Imagery and icon stroke weights share a unified style
- [ ] Tokens and components are cleanly named with zero detached overrides

## 4. States, Accessibility & Engineering (10 points)
- [ ] All 5 screen states exist: empty, loading, populated, error, success
- [ ] All 6 button states exist (idle, hover, pressed, keyboard focus, loading, disabled)
- [ ] Every form input has a visible linked <label> (never placeholder-only)
- [ ] Text contrast ≥ 4.5:1 and essential borders/icons ≥ 3:1 verified on actual surfaces
- [ ] Mobile touch targets ≥ 44 × 44 CSS px (48 × 48 dp on Android)
- [ ] Complete keyboard Tab / Shift+Tab / Escape flow with visible focus ring
- [ ] Zero critical states communicated by colour alone
- [ ] Decorative images use alt="", informative visuals carry concise alt text
- [ ] Slow-network (> 400 ms) and offline failure states are handled gracefully
- [ ] One-page handoff spec written (layout, tokens, states, edge cases)`,
            note: 'Drop this checklist into .github/PULL_REQUEST_TEMPLATE.md — once internalised, a full screen review takes 15 minutes.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does the Playbook enforce 4 ± 1 chunks (Cowan) instead of Miller’s 7 ± 2?',
        a: 'Miller’s 1956 paper measured immediate recall of isolated stimuli without concurrent cognitive work. When users read, evaluate prices, and navigate simultaneously, Nelson Cowan’s 2001 meta-analysis shows active working memory holds 4 ± 1 chunks. Designing in groups of 3 to 5 prevents decision paralysis.',
      },
      {
        q: 'Does the European Accessibility Act (Directive 2019/882) apply to every business in 2026?',
        a: 'In force since 28 June 2025, it covers targeted digital products and consumer services sold in the EU (including e-commerce, banking, ticketing, and telecoms). Micro-enterprises providing services (< 10 employees AND ≤ €2M turnover or balance sheet) have a statutory exemption for services, though B2B enterprise and public-sector contracts routinely require WCAG 2.2 AA regardless of vendor size.',
      },
      {
        q: 'What is the highest-ROI fix on an underperforming checkout page?',
        a: 'Three non-cosmetic changes: 1) enable guest checkout by default instead of forcing account creation upfront, 2) trim form elements from the 23.48 industry average down to the 12–14 essentials (Baymard, Oct 2026), and 3) put the exact charge inside the final button ("Pay $132.90") alongside a persistent fee breakdown.',
      },
      {
        q: 'Can synthetic AI user personas replace human usability tests in 2026?',
        a: 'No. 2026 empirical benchmarks (Kuric et al., 2026; Pew Research Center, 2026) demonstrate that LLM synthetic users diverge from real human behaviour on 53% of tasks. Use Python scripts to verify deterministic UI rules, and 5 real humans to test comprehension.',
      },
    ],
    ctaTitle: 'Go from this field course to 36 annotated screens, 12 A4 working sheets & the Python scanner.',
    ctaText:
      'Download the complete 139-page English edition of the UX/UI Playbook 2026 alongside the 26-page printable Bonus Kit (audit, client brief, handoff) and the 21-file working archive featuring agent_check.py.',
    ctaBullets: [
      '139-page A4 Playbook PDF in English (97 sections, 36 annotated screens, 24 before/after pairs)',
      '12 printable A4 working sheets + copy-ready Markdown templates for client & product work',
      'Runnable 77-rule Python scanner + AI Agent Skill for Claude Code, Cursor & Codex ($29 one-time)',
    ],
  },

  /* ============================================================================
   * COURSE 2 (EN) — UI DESIGN & DESIGN TOKENS
   * ========================================================================== */
  {
    slug: 'ui-design-system-tokens',
    category: 'UI Design',
    icon: '🎨',
    readTime: '19 min read',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-ui-en.jpg',
    metaTitle:
      'UI Design Tokens, Type, Spacing & Dark Mode | UX/UI Playbook',
    metaDescription:
      'Build consistent UI systems with design tokens, accessible contrast, typography, spacing, dark mode and developer handoff.',
    keywords: [
      'UI design system CSS tokens',
      'W3C design tokens 2025.10',
      '1.25 typography scale UI',
      '8 point grid spacing system',
      'dark mode tokens halation',
      'UI microcopy rules',
      'CSS logical properties RTL',
      'developer handoff specification',
    ],
    title:
      'UI Design & Design Tokens: The 4 Hierarchy Levers, Type Scale, True Dark Mode, Microcopy & Dev Handoff',
    subtitle:
      'Amateur-looking software almost never suffers from a lack of custom illustrations. It suffers from five ad-hoc font sizes, arbitrary 13 px and 19 px margins, competing accent colours, and a Dark Mode built by inverting white.',
    aeoSummaryTitle: 'Executive Takeaway — The Numbers Behind Clean UI Systems',
    aeoSummary:
      '80% of perceived interface quality comes from a locked typographic scale (16 px base × 1.25 ratio rounded to 12, 14, 16, 20, 24, 32, 40, 64 px) paired with three strict 4/8-pt spacing tiers (internal 4–12 px, structural 16–32 px, macro 48–96 px). Colour obeys the 60% calm neutrals / 30% legible ink / 10% single accent split (WCAG 2.2 AA ≥ 4.5:1 on body & placeholders, ≥ 3:1 on borders & focus rings). True Dark Mode encodes elevation through progressively lighter surfaces (#121212 base + 4%–8% lifts) and softened ~87% white ink to prevent astigmatic halation.',
    keyStats: [
      {
        value: '60 / 30 / 10',
        label: 'Functional balance between calm neutral surfaces, dark structural ink, and a single action accent',
        source: 'UX/UI Playbook · Section 22 (Semantic Colour System)',
      },
      {
        value: '≥ 4.5 : 1',
        label: 'Minimum WCAG 2.2 AA contrast for all text < 24 px, including input placeholders',
        source: 'W3C WCAG 2.2 (Criteria 1.4.3 & 1.4.11) · Established evidence',
        urls: ['https://www.w3.org/TR/WCAG22/'],
      },
      {
        value: '2025.10',
        label: 'Stable vendor-neutral specification for cross-platform design tokens (JSON → CSS / iOS / Android)',
        source: 'W3C Design Tokens Community Group (28 Oct 2025) · Established evidence',
        urls: ['https://www.designtokens.org/TR/2025.10/format/'],
      },
    ],
    sections: [
      {
        id: 'four-hierarchy-levers',
        num: '01',
        tocLabel: 'The 4 hierarchy levers & squint test',
        heading: 'Visual Hierarchy in 4 Levers: Use Them in the Exact Order the Human Eye Processes Them',
        blocks: [
          {
            type: 'p',
            text: 'When a developer wants an element to stand out, the reflexive move is to paint it bright orange, wrap it in a box, or slap a badge on top. Do that three times and the screen turns into a cockpit alarm panel: when everything shouts, nothing is heard. You do not create hierarchy with paint; you create it with deliberate deltas across four levers, applied strictly in this sequence (Section 06):',
          },
          {
            type: 'steps',
            title: 'Strict Priority Order of the 4 Visual Levers (Section 06)',
            steps: [
              {
                bold: 'Lever 1 — Size (the strongest lever, most timidly used)',
                text: 'An 18 px heading above a 16 px paragraph is not a heading — it is a hesitation. Aim for at least a ×2 ratio between your view’s primary heading (32–40 px) and body copy (15–16 px).',
              },
              {
                bold: 'Lever 2 — Weight (bold against regular)',
                text: 'Ideal where size must stay compact: a `600 SemiBold` field label at 14 px cleanly anchors a `400 Regular` input value at 15 px.',
              },
              {
                bold: 'Lever 3 — Whitespace (free, silent, almost always forgotten)',
                text: 'Surrounding a key metric or primary call-to-action with 48 px of breathing room elevates it more cleanly than any heavy border.',
              },
              {
                bold: 'Lever 4 — Colour (the loudest lever, applied last)',
                text: 'Only introduce your accent colour once the entire layout already reads effortlessly in grayscale. Reserve it for the single primary action and active state.',
              },
            ],
          },
          {
            type: 'quote',
            tag: 'Instant Check · The 3-Step Squint Test (Section 06)',
            text: 'Step three paces back from your monitor and squint until the words blur. You should still spot immediately: 1) what the screen is about, and 2) where to click. If everything flattens into an even gray mush, you have three font sizes — not a hierarchy.',
          },
        ],
      },

      {
        id: 'typography-without-guesswork',
        num: '02',
        tocLabel: 'Typography: 2 families & the 1.25 scale',
        heading: 'Typography Without Guesswork: Two Families Max, One Locked Scale, Zero Text Below 12 px',
        blocks: [
          {
            type: 'p',
            text: 'Software interfaces are 80% written characters. If your type scale drifts, no colour palette can rescue perceived quality. Lock down two constraints once per repo (Section 21 & Appendix A4): at most two typefaces (an expressive display face like Sora + a workhorse UI sans like Inter, plus monospace for code/IDs), and six to seven sizes stored in CSS variables.',
          },
          {
            type: 'h3',
            text: 'Deriving the scale in 30 seconds and tuning optical line-height',
          },
          {
            type: 'p',
            text: 'Start from a `16 px` body size and multiply by `1.25` (Major Third): `16 · 20 · 25 · 31.25 · 39 · 48.8 · 61`. Round to clean 4-pt steps so line boxes snap onto your vertical rhythm: `12 · 14 · 16 · 20 · 24 · 32 · 40 · 48 · 64 px`. Nobody on your team ever writes `font-size: 17px` or `23px` again.',
          },
          {
            type: 'p',
            text: 'Two optical details immediately separate craft from guesswork. First, `line-height` moves inversely with font size: 16 px body text needs generous leading (`1.55–1.65`) capped at `60–75 characters` per line (`max-width: 68ch`), whereas a 48 px Display H1 at `1.5` falls apart — tighten display headings to `1.05–1.15` with `-0.02em` to `-0.03em` tracking. Second, always enable `font-variant-numeric: tabular-nums` on prices, KPI counters, dates, and table columns so `1` and `8` occupy identical horizontal width.',
          },
          {
            type: 'table',
            caption: 'Production Typographic Scale Reference (Section 21 & Appendix A4)',
            headers: ['Semantic Role', 'CSS Size', 'Line-Height & Tracking', 'Strict Usage & Guardrails'],
            rows: [
              ['Hero / H1', '40–64 px', '1.05–1.10 · -0.03em', 'Exactly one H1 per page, never two competing'],
              ['Section / H2', '28–32 px', '1.15–1.22 · -0.02em', 'Major document or dashboard section headings'],
              ['Card / H3', '20–24 px', '1.30 · -0.015em', 'Subsections, card titles, modal headers'],
              ['Body', '15–16 px', '1.55–1.65 · normal', 'Default prose & inputs (60–75 ch max measure)'],
              ['Small / UI', '13–14 px', '1.45 · normal', 'Form labels, helper text, table cells'],
              ['Micro / Tag', '12 px (floor)', '1.40 · +0.04em', 'Short badges, timestamps — never multi-line prose'],
            ],
          },
        ],
      },

      {
        id: 'colour-60-30-10-8pt-grid',
        num: '03',
        tocLabel: '60/30/10 Colour, 8-pt Tiers & Mobile-First',
        heading: 'Semantic Colour (60 / 30 / 10), 3-Tier 8-Point Spacing & Mobile-First Layout',
        blocks: [
          {
            type: 'p',
            text: 'Online palette generators that hand you five pretty pastel swatches set you up to fail. Software needs functional roles, governed by the 60 / 30 / 10 rule (Section 22): 60% quiet neutral surfaces (canvas and cards), 30% dark legible structure (primary ink, secondary ink, hairline borders), and 10% primary accent reserved strictly for action.',
          },
          {
            type: 'h3',
            text: 'Keep semantic channels separate and run the grayscale filter test',
          },
          {
            type: 'p',
            text: 'Never cross-wire semantic channels: if your clickable primary buttons are emerald green, users cannot tell an interactive CTA from a passive "Paid ✓" status badge. Keep action (e.g. vermilion or indigo), success (teal + `✓` icon), error/destructive (deep red + `!` icon), info (blue distinct from underlined text links), and disabled states (solid muted neutral — never `opacity: 0.4`, which wrecks contrast over tinted backgrounds) cleanly separated. Toggle your OS grayscale filter for ten seconds: if two statuses merge into the same gray pill, add an icon or explicit word.',
          },
          {
            type: 'h3',
            text: 'The three 8-point spacing scales you must never mix (Section 23)',
          },
          {
            type: 'p',
            text: 'Spacing is the least taught and most visible craft in UI. Random `7px`, `13px`, `19px`, and `27px` gaps make an app look messy even with great fonts. Yet even teams using `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px` fail when they confuse the three tiers:',
          },
          {
            type: 'list',
            heading: 'The 3 Non-Interchangeable Spacing Tiers (Section 23)',
            items: [
              {
                bold: 'Internal tier (4 · 8 · 12 px)',
                text: 'Inside an atomic component: icon-to-label gap inside a button (8 px), `<label>` to `<input>` gap (6–8 px), badge padding.',
              },
              {
                bold: 'Structural tier (16 · 24 · 32 px)',
                text: 'Uniform card padding (16 px mobile, 24 px desktop) and gutters between sibling cards or form fieldsets.',
              },
              {
                bold: 'Macro tier (48 · 64 · 96 px)',
                text: 'Clean separation between major page sections — eliminating 80% of cluttered `<hr>` divider lines.',
              },
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/en/ui-spacing.webp',
            alt: '8-point spacing scale diagram from the UX/UI Playbook English Edition showing 4, 8, 12, 16, 24, 32, 48, 64 px steps and asymmetric grouping',
            caption:
              'Asymmetric proximity: a heading must sit noticeably closer to the paragraph it introduces (8–12 px) than to the preceding paragraph (32 px).',
            sourceRef: 'UX/UI Playbook EN · Part 03, Section 23 (p. 45)',
          },
          {
            type: 'h3',
            text: 'Responsive architecture: design at 375 px first and stress-test at 320 px',
          },
          {
            type: 'p',
            text: 'Responsive design is not "shrinking a 1440 px desktop layout until it barely fits on a phone" (Section 24). Start at `375 px`, single column, zero hover dependencies: you are forced to rank content by real priority. Sidebars become 4–5 item bottom tab bars, and multi-column admin tables never shrink into 9 px type — each row stacks into a clean summary card (identity on the left, amount/status on the right). Before shipping, narrow your browser to `320 px`: that is where side-by-side buttons and German/French labels break.',
          },
        ],
      },

      {
        id: 'css-tokens-true-dark-mode',
        num: '04',
        tocLabel: 'CSS Tokens & halation-free Dark Mode',
        heading: 'CSS Design Tokens & True Dark Mode: Why Colour Inversion Breaks Human Vision',
        blocks: [
          {
            type: 'p',
            text: 'Individual screens get discarded in the next redesign; tokens compound your margin from your second project onward (Section 25). A token is not `--blue-500` — it is a named semantic decision (`--color-surface`, `--color-text`, `--color-accent`, `--space-6`) aligned with the W3C Design Tokens `2025.10` format. When components reference semantic roles exclusively, Dark Mode is a 20-line variable override; when hex codes are hardcoded across 80 files, Dark Mode is a rewrite.',
          },
          {
            type: 'h3',
            text: 'The 4 optical rules of comfortable, long-session Dark Mode (Section 56)',
          },
          {
            type: 'doDont',
            doTitle: '✓ Token-Engineered Dark Mode',
            dontTitle: '✕ Naive Colour Inversion',
            doItems: [
              'Encode elevation as lightness: dark base (#0B0D12 or #121212), cards lifted +4%, modals/menus lifted +8%. Lightness replaces drop shadows.',
              'Soften primary body ink to ~87% white (#ECEEF4) so 20-minute reading sessions stay effortless.',
              'Desaturate and lift your primary accent by one tone so it does not optically vibrate against dark surfaces.',
              'Re-verify secondary text contrast against your lightest elevated card surface, where ratios drop fastest.',
            ],
            dontItems: [
              'Setting 15 px paragraphs in pure `#FFFFFF` on pure `#000000`: triggers astigmatic halation (glowing letter bleed affecting ~30–40% of readers).',
              'Relying on black `box-shadow` on dark cards with no subtle `1px solid rgba(255,255,255,0.10)` hairline.',
              'Reusing the exact saturated light-mode brand red or blue, which often fails 3:1 contrast on `#121212`.',
              'Applying CSS `filter: invert(1)`, corrupting photos, user avatars, and semantic status colours.',
            ],
          },
          {
            type: 'figure',
            src: '/images/articles/en/ui-sbs-dark.webp',
            alt: 'Side-by-side Dark Mode prototype comparison from the UX/UI Playbook English Edition contrasting naive inversion with semantic token elevation',
            caption:
              'Side-by-side prototype (Section 61): naive colour inversion on the left vs progressive surface elevation and desaturated accent tokens on the right.',
            sourceRef: 'UX/UI Playbook EN · Part 07, Section 61 (p. 102)',
          },
          {
            type: 'copyable',
            label: 'tokens.css — Production Foundation (Light + True Dark Mode + Type + 8-pt + Motion)',
            langTag: 'css',
            code: `/* UX/UI Playbook 2026 — tokens.css (covers 90% of web & SaaS interfaces) */
:root {
  /* 1. Light Mode Surfaces & Ink (WCAG 2.2 AA verified) */
  --color-bg:             #FFFFFF;
  --color-surface-1:      #F4F1EA;
  --color-surface-2:      #EAE5DA;
  --color-text:           #101319; /* > 16:1 on bg */
  --color-text-2:         #343A46; /* > 10:1 on bg */
  --color-muted:          #5B6170; /* ≥ 5.2:1 on surface-1 */
  --color-line:           #DFDBD0;

  /* 2. Single Action Accent & Distinct Semantic Channels */
  --color-accent:         #F0512B;
  --color-accent-hover:   #B93314;
  --color-on-accent:      #101319;
  --color-success:        #0E7C6B;
  --color-danger:         #C62828;
  --color-info:           #2C5CE6;

  /* 3. Three Spacing Tiers (Internal / Structural / Macro) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* 4. Radii & Locked 1.25 Type Scale */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Sora", var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px; --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;  --text-4xl: 64px;

  /* 5. Motion Tokens (Section 57) */
  --dur-fast: 120ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:  cubic-bezier(0.4, 0, 1, 1);
}

/* Dark Mode: elevation = lightness + softened ink + lifted accent */
[data-theme="dark"] {
  --color-bg:             #0B0D12;
  --color-surface-1:      #131720;
  --color-surface-2:      #1B202C;
  --color-text:           #ECEEF4; /* ~87% white: zero halation */
  --color-text-2:         #B4BCCB;
  --color-muted:          #8E96A8; /* ≥ 4.6:1 verified on surface-2 */
  --color-line:           rgba(255, 255, 255, 0.10);

  --color-accent:         #FF6B47;
  --color-accent-hover:   #FF8566;
  --color-on-accent:      #0B0D12;
  --color-success:        #24D18A;
  --color-danger:         #FF6B6B;
  --color-info:           #6EA0FF;
}

/* Mandatory user veto on interface motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
            note: 'Drop this into your root stylesheet and forbid raw hex values inside feature components.',
          },
        ],
      },

      {
        id: 'microcopy-motion-rtl',
        num: '05',
        tocLabel: 'Microcopy, Motion & Logical CSS (RTL)',
        heading: 'Microcopy, Purposeful Motion & Logical RTL CSS: Three Details That Separate Seniors from Juniors',
        blocks: [
          {
            type: 'p',
            text: 'Half of UI craft never happens in a vector tool: it is written in words and felt in transitions. A vague button forces an explanatory paragraph; sluggish easing makes a fast backend feel laggy; hardcoded `margin-left` breaks your layout the day a customer needs Arabic, Hebrew, or German.',
          },
          {
            type: 'h3',
            text: '1. Microcopy: design that gets written (Section 27)',
          },
          {
            type: 'p',
            text: 'Run the deletion test on every helper sentence: hide it, and see if the screen still makes complete sense. If yes, delete the helper permanently; if no, rewrite the fuzzy heading or button it was propping up. Follow four rules: 1) start every button with an explicit verb ("Create workspace", never "Submission" or "Continue"), 2) put the human first ("Your payment didn’t go through", not "Transaction failure 502"), 3) zero jokes in error states when money or user work is at stake, and 4) translate technical jargon into user outcomes.',
          },
          {
            type: 'table',
            caption: 'Rewriting Weak Labels and Engineering Jargon (Section 27 · p. 51)',
            headers: ['UI Context', 'Weak / Server-Centric Copy', 'Clear User-Centric Rewrite'],
            rows: [
              ['Primary CTA', 'Submit / OK / Next', 'Create my account · Save changes'],
              ['Destructive action', 'Delete', 'Permanently delete project and its 42 files'],
              ['Validation error', 'Error 422: entity conflict', 'That email is already registered. Sign in instead →'],
              ['Long loading state', 'Please wait…', 'Fetching your 128 invoices… (~4 s)'],
              ['Feature pitch', 'Bi-directional AES-256 sync', 'Your edits appear everywhere and stay private'],
            ],
          },
          {
            type: 'h3',
            text: '2. Motion: spatial explanation with an unconditional user veto (Section 57)',
          },
          {
            type: 'p',
            text: 'Motion is an explanation, not fireworks: it shows where a drawer came from and where a deleted row went. Stick to three duration bands: `50–200 ms` (`ease-out`) for button presses and hovers, `250–400 ms` for modals and drawers (`ease-out` entering, crisper `ease-in` exiting), and `450–600 ms` max for full route transitions. Animate `transform` and `opacity` exclusively (never `width`, `height`, or `top`), avoid `linear` curves outside progress bars, and always honour `@media (prefers-reduced-motion: reduce)`.',
          },
          {
            type: 'h3',
            text: '3. Internationalisation & RTL: write logical CSS from day one (Section 58)',
          },
          {
            type: 'p',
            text: 'Translating concise English UI ("Save") into French or German expands button width by +30% to +40%; supporting Arabic or Hebrew (`dir="rtl"` on `<html>`) mirrors the horizontal flow. Replace physical directions (`margin-left`, `padding-right`, `left: 0`, `text-align: left`) with CSS logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start: 0`, `text-align: start`) from your very first commit. Know what mirrors (back/forward arrows, breadcrumbs, table column order) and what never mirrors (brand logos, clock faces, media play/pause transport icons, and digits inside numbers).',
          },
        ],
      },

      {
        id: 'one-page-dev-handoff',
        num: '06',
        tocLabel: '12 Core Components & 1-Page Handoff Spec',
        heading: 'Delivering So It Actually Gets Built: The 12 Core Components & the One-Page Handoff Spec',
        blocks: [
          {
            type: 'p',
            text: 'A design that falls apart during implementation is rarely the developer’s fault — it is the predictable result of a silent handoff (Section 28). Before inventing custom widgets, lock down the 12 foundational components that power 95% of software (Button × 6 states, Input × 5 states + label, Checkbox/Radio with full-label hit area, Switch, Select, Card, focus-trapped Modal with Escape, Toast/Banner, Tabs, Data Table + empty state, Status Badge, Skeleton loader). Pair every complex screen with a single-file Markdown handoff spec.',
          },
          {
            type: 'copyable',
            label: 'Copy-Ready Developer Handoff Template (Section 28 & Appendix A3)',
            langTag: 'markdown',
            code: `# HANDOFF — Screen "Checkout / Step 2: Payment"

## 1. Layout & Responsive Behaviour
- Centered container max-width: 1200px, inline padding var(--space-8) desktop / var(--space-4) mobile
- Desktop (≥ 1024px): 2 columns — Form 62% · Summary 38% (position: sticky; top: 24px)
- Mobile (< 1024px): 1 column — Collapsible order summary at top + primary pay button unobstructed by keyboard

## 2. Consumed Tokens (zero raw hex values)
- Primary CTA: var(--color-accent) · hover var(--color-accent-hover) · text var(--color-on-accent)
- Idle border: 1px solid var(--color-line) · Keyboard focus: 2px solid var(--color-accent), offset 2px
- Allowed spacing tokens: var(--space-2), var(--space-4), var(--space-6), var(--space-8) only

## 3. All 6 Required States
1. Idle (dominant regional payment method pre-selected)
2. Visible keyboard focus ring across all inputs and payment tiles
3. Field validation error on blur (var(--color-danger) border + recovery copy linked via aria-describedby)
4. Submitting (button locked against double-charge + label "Authorising payment…")
5. Card declined (inline banner above CTA preserving all user inputs + "Try another card" focus)
6. Success (redirect to /confirmation + optional 1-click account save)

## 4. Accessibility & Localization (blocking gates)
- Strict Tab order: First name → Last name → Street → City → Postal code → Payment tile → "Pay [Amount]"
- Auto-focus first invalid field on submit attempt
- Order summary wrapped in <aside aria-labelledby="summary-heading">
- Labels tolerate +35% i18n text expansion with zero clipping at 320px viewport width`,
            note: 'Paste this into Linear/GitHub issues or handoff.md so engineers and coding agents never have to guess edge states.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does pure white (#FFFFFF) text on pure black (#000000) hurt long-form readability?',
        a: 'Maximum 21:1 contrast on body paragraphs causes optical halation — bright letterforms appear to bleed into the black background, triggering eye strain and blurred edges for readers with astigmatism (~30–40% of adults). Pairing deep dark surfaces (#0B0D12 or #121212) with ~87% white ink (#ECEEF4) preserves crisp AAA contrast without glare.',
      },
      {
        q: 'Do input placeholders really need 4.5:1 WCAG contrast?',
        a: 'Whenever placeholder text communicates useful formatting or context, WCAG 2.2 AA requires 4.5:1 — making pale gray placeholders one of the top failures on the web. Better yet, never rely on placeholders as labels because they vanish on the first keystroke; use a persistent <label> above and helper text below.',
      },
      {
        q: 'When should I use 4 px vs 8 px spacing steps?',
        a: 'Treat 8 px (8, 16, 24, 32, 48, 64 px) as your structural rhythm for card padding, grid gutters, and section margins, and reserve half-steps (4 px, 12 px) strictly for tight internal optical alignment like icon-to-text gaps and compact badges.',
      },
      {
        q: 'Which CSS rules break right-to-left (RTL) localization?',
        a: 'Hardcoded physical properties (margin-left, padding-right, left, right, border-left, text-align: left). Replace them with CSS logical equivalents (margin-inline-start, padding-inline-end, inset-inline-start, border-inline-start, text-align: start) so LTR and RTL layouts flip automatically.',
      },
    ],
    ctaTitle: 'Get the production tokens.css, tokens.json, 24 Before/After prototypes & 12 A4 sheets.',
    ctaText:
      'Stop rebuilding UI rules from scratch on every repo: the 139-page English UX/UI Playbook 2026 ships with WCAG-verified Light & Dark design tokens, handoff specs, and the runnable Python scanner.',
    ctaBullets: [
      'Ready-to-drop tokens.css, W3C tokens.json & 4 Markdown client/handoff templates',
      '24 side-by-side Before/After prototypes (buttons, data tables, forms, dark mode, touch targets)',
      'Unlimited commercial license for your own SaaS and paid client work ($29 one-time)',
    ],
  },

  /* ============================================================================
   * COURSE 3 (EN) — PRODUCT DESIGN, REVENUE & AI AGENTS
   * ========================================================================== */
  {
    slug: 'product-design-ai-agents',
    category: 'Product Design',
    icon: '⚙️',
    readTime: '20 min read',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-18',
    ogImage: '/og-article-product-en.jpg',
    metaTitle:
      'Product Design, AI Agents & SaaS Pricing | UX/UI Playbook',
    metaDescription:
      'A practical product design guide to research, SaaS pricing, AI agent workflows, verification and delivery.',
    keywords: [
      'Product Design for developers',
      'AGENTS.md Claude Code Cursor UI',
      'deterministic AI UI pipeline',
      'agentic interface UX patterns',
      'SaaS dashboard pricing page design',
      'freelance design pricing formula',
      'one page client proposal',
    ],
    title:
      'Product Design, Revenue & AI Agents: Scoping Value, Orchestrating Claude Code / Cursor & Pricing Without Scope Creep',
    subtitle:
      'A coding agent can output a thousand lines of JSX in thirty seconds, yet it cannot make a single product trade-off for you: without versioned context files and grayscale gates, speed simply manufactures generic UI debt.',
    aeoSummaryTitle: 'Executive Takeaway — Governing Scope, Coding Agents & Margin',
    aeoSummary:
      'In AI-assisted software delivery, output quality is capped by written upstream specification. A deterministic workflow splits product design into five versioned files (brief.md → screens.md → grayscale wireframe.html → multi-viewport + axe-core review → handoff.md) governed by a ~40-line AGENTS.md and 3 phase-gated prompts. On the product and commercial side: 2 hours of express research prevents building the wrong thing, honest verification reports use strictly 3 statuses (Automated, To verify on screen, Not applicable), and healthy margins rest on "structure signed off in writing before styling" plus cutting scope rather than discounting your day rate.',
    keyStats: [
      {
        value: '84%',
        label: 'Evaluated AI-generated websites shipping with immediate accessibility violations',
        source: 'Aljedaani et al. (ACM W4A, 2024) · Evidence level: Probable',
        urls: ['https://doi.org/10.1145/3677846.3677854'],
      },
      {
        value: '2 hours',
        label: '45-min structured brief + 75-min field reality check (3 user stories, 3 competitors, 5 support tickets)',
        source: 'UX/UI Playbook · Section 29 (Express Brief & Research)',
      },
      {
        value: '1 in 3',
        label: 'Healthy proposal rejection rate on price signalling your rate is no longer under-priced',
        source: 'UX/UI Playbook · Section 36 (Setting Your Price)',
      },
    ],
    sections: [
      {
        id: 'who-decides-what-sequence',
        num: '01',
        tocLabel: 'UX, UI, Product: the order that prevents rewrites',
        heading: 'UX, UI, Product: Who Decides What (and Why Opening Figma or a Prompt First Ruins Sprints)',
        blocks: [
          {
            type: 'p',
            text: 'Solo builders and technical freelancers wear all three hats at once. The danger is never wearing all three — it is answering a UI question before the Product question has been settled (Section 02). Product decides "Should we build this, for whom, in what order, and at what price?". UX decides "What is the shortest path, and how does failure recover?". UI decides "How do we make this screen legible, coherent, and accessible?".',
          },
          {
            type: 'p',
            text: 'Watch the classic sequence trap unfold: a client or co-founder asks for "a quick mockup by tomorrow so we can visualise it". You fire up Figma or v0 / Claude Code and produce a polished, colourful screen in two hours. They show their partner, who questions the target audience, adds team roles, and changes the billing model. Three weeks later you are on unpaid revision #7 because early visual polish creates emotional attachment and derails structural thinking.',
          },
          {
            type: 'quote',
            tag: 'The One-Line Clause That Eliminates 80% of Unpaid Rewrites · Sections 02 & 37',
            text: '"Structure signed off before style, in writing." Until functional scope (brief.md) and grayscale wireframes are approved, zero brand colours or visual polish enter the room.',
          },
        ],
      },

      {
        id: 'two-hour-brief-saas-pricing',
        num: '02',
        tocLabel: '2-Hour Research, SaaS Dashboards & Pricing Pages',
        heading: 'Scoping Right in 2 Hours & Designing the Two Screens Where SaaS Revenue Lives',
        blocks: [
          {
            type: 'p',
            text: 'User research is not a six-week enterprise luxury. Two focused hours are enough to stop designing for yourself (Section 29). Split those 120 minutes into a 45-minute red-flag brief with the decision-maker and 75 minutes of real-world evidence.',
          },
          {
            type: 'steps',
            title: 'The 120-Minute Express Research Protocol (Section 29)',
            steps: [
              {
                bold: 'Minutes 0–45 — The red-flag brief',
                text: 'Demand a numeric 30-day business metric ("look modern" is a red flag), a concrete user segment with two named examples ("everyone" is a red flag), one primary conversion verb, and a single final decision-maker.',
              },
              {
                bold: 'Minutes 45–90 — Three 15-minute past-behaviour interviews',
                text: 'Never ask "Would you use feature X?" — people politely invent future habits. Ask one past-tense prompt: "Walk me through the last time you had to accomplish [task] — what did you open, and where did it get painful?"',
              },
              {
                bold: 'Minutes 90–120 — Three competitors + the last 5 support tickets',
                text: 'Screenshot three direct competitors to spot market conventions (not to copy their gradients), then read the five latest customer support complaints — they usually hand you your priority roadmap verbatim.',
              },
            ],
          },
          {
            type: 'h3',
            text: 'Applying Product logic to SaaS Dashboards (Section 12) and Pricing Pages (Section 15)',
          },
          {
            type: 'p',
            text: 'Two B2B screens concentrate more product mistakes than all others combined. First, the SaaS Dashboard: its mortal enemy is decorative density — cramming 14 counters, radial gauges, and pie charts onto the canvas just because whitespace felt empty. A dashboard exists to trigger decisions, not to prove your database has rows. Organise it in three strict bands: 1) at most 3 top KPIs, each displaying Value + Delta + Time Period (because "$48.2k" without "▲ +12.4% vs Sept" is a meaningless number), 2) one time-series chart (line or bar — retire pie charts past 3 slices), and 3) one actionable table where clicking a row opens the underlying object.',
          },
          {
            type: 'p',
            text: 'Second, the Pricing Page: visitors on `/pricing` rarely hunt for the cheapest number — they hunt for reassurance that they are picking the right tier. Cap options at three plans (Starter, Pro, Team), state the unit explicitly under the big number ("per seat / month"), highlight the recommended middle tier calmly (border + "Popular" badge + the sole solid CTA button on the row), list 3–5 outcome-oriented bullets in the exact same row order across tiers so eyes can scan horizontally, and use an honest `-20%` annual toggle instead of fake countdown timers.',
          },
        ],
      },

      {
        id: 'five-file-agent-pipeline',
        num: '03',
        tocLabel: '5-File AI Pipeline, AGENTS.md & 3 Prompts',
        heading: 'Delegating UI to Claude Code or Cursor Without Shipping "Slop": The 5-File Pipeline',
        blocks: [
          {
            type: 'p',
            text: 'Why does prompting "Build my SaaS billing dashboard and checkout" reliably produce the exact same generic AI aesthetic (purple gradients on slate cards, decorative icons everywhere, zero error states, and WCAG failures across 84% of generated sites per Aljedaani et al., W4A 2024)? Because coding agents rarely fail at JSX syntax — they fail at all the implicit product and UI decisions you left unwritten. Without constraints, an LLM samples the statistical median of public repositories.',
          },
          {
            type: 'figure',
            src: '/images/articles/en/prod-pipeline.webp',
            alt: 'Deterministic 5-step AI UI pipeline from the UX/UI Playbook English Edition: brief.md, screens.md, wireframe.html, review, and handoff.md',
            caption:
              'Paper is for diverging (5 quick sketches in 10 minutes); the 5-file chain is for converging deterministically across coding-agent sessions.',
            sourceRef: 'UX/UI Playbook EN · Part 06, Section 43 (p. 74)',
          },
          {
            type: 'p',
            text: 'The core law of agentic UI engineering (Sections 43, 46 & 55) is simple: chat threads drift and vanish; repository files persist and govern. Whenever an agent makes a structural mistake, fix `AGENTS.md` or `tokens.css` before fixing the screen — otherwise you will pay for the exact same mistake on the very next prompt.',
          },
          {
            type: 'copyable',
            label: 'AGENTS.md (~40 lines) — Root Context File for Claude Code, Cursor & Codex (Section 55)',
            langTag: 'markdown',
            code: `# AGENTS.md — Non-Negotiable Interface Engineering Rules

## Sources of Truth (never reinvent)
- @tokens.css: semantic colours, 4/8pt spacing tiers, radii, locked type scale, motion tokens.
- @screens.md: single user verb per screen, entry/exit, 5 states, edge cases, real copy.
- Any style value missing from tokens.css must be flagged at the end — never hardcoded.

## Automatic Failure Conditions
- Zero "Lorem ipsum", zero invented testimonials, zero fabricated metrics.
- Zero useful text < 12px; body prose ≥ 15px; line measure ≤ 70ch.
- Zero verb-less button labels; maximum one accent-coloured primary button per view.
- Zero happy-path-only screens: all 5 states (empty, loading, populated, error, success) are required.
- Zero physical left/right CSS properties where logical properties (inline-start/end) apply.

## Accessibility Gates (blocking WCAG 2.2 AA)
- Every <input>/<select>/<textarea> has a visible linked <label> (never placeholder-only).
- Every icon button carries an explicit accessible name; mobile hit targets ≥ 44x44px.
- Text contrast ≥ 4.5:1 and essential borders/controls ≥ 3:1 verified in both Light & Dark modes.
- Full keyboard operability (Tab, Shift+Tab, Escape) + visible focus ring + prefers-reduced-motion.

## Mandatory Output Format
1. Complete implementation consuming @tokens.css exclusively.
2. Three-line verification summary: Verified by script / To verify on screen / Not done.
3. Numbered open product questions (never silently guessed).`,
            note: 'Works directly as AGENTS.md, CLAUDE.md, or .cursor/rules in any frontend repository.',
          },
          {
            type: 'h3',
            text: 'The 3 phase-gated prompts that replace one-shot "build the whole app" prompting',
          },
          {
            type: 'p',
            text: 'Never ask an agent to invent product scope, layout hierarchy, and visual styling in one shot. Gate execution into three separate turns (Section 44) — enforcing `<body class="wire">` (grayscale, system fonts, muted placeholders) in Gate 2 so stakeholders sign off on structure and real copy first:',
          },
          {
            type: 'copyable',
            label: 'The 3 Phase-Gated Prompts Ready to Copy (Section 44 · p. 75)',
            langTag: 'text',
            code: `=== PROMPT 1: brief.md → screens.md ===
ROLE        : Senior Product Designer writing unambiguous screen specs.
INPUTS      : @brief.md
CONSTRAINTS : 1 screen = 1 user verb; specify all 5 states (empty, loading, populated,
              error, success); real copy only, zero lorem ipsum; do not invent features
              outside brief.md.
DELIVERABLE : screens.md with exact fields per screen: verb, entry, exit, trigger + copy
              for all 5 states, edge cases (40-char names, 0 rows), real labels.
FORBIDDEN   : Suggesting colours, typefaces, or visual styling. End with open questions.

=== PROMPT 2: screens.md → grayscale wireframe.html ===
ROLE        : Frontend Accessibility Engineer building structural review wireframes.
INPUTS      : @screens.md, @tokens.css, @AGENTS.md
CONSTRAINTS : <body class="wire"> strict grayscale, semantic HTML5 landmarks, spacing from
              @tokens.css only, every state in screens.md reachable via ?state= query param.
DELIVERABLE : wireframe-<screen>.html ready for 390px / 768px / 1280px screenshots + zero axe errors.
FORBIDDEN   : Adding any element or copy absent from screens.md.

=== PROMPT 3: Screen → WCAG 2.2 AA Audit + Developer Handoff ===
ROLE        : WCAG 2.2 AA Accessibility Auditor & Technical Spec Writer.
INPUTS      : @wireframe-<screen>.html, @tokens.css
CONSTRAINTS : Cite only verifiable source findings with line numbers and exact WCAG criteria
              (e.g. 1.4.3, 1.4.11, 2.4.7, 2.5.8). Zero subjective aesthetic opinions.
DELIVERABLE : audit.md (Blocking / Major / Minor + exact code fix) + complete handoff.md.`,
            note: 'Model benchmark tip (Section 44): run Prompt 2 across two different models and score them on token fidelity, zero axe violations, 390/1280 responsiveness, and fidelity to screens.md.',
          },
        ],
      },

      {
        id: 'agentic-interface-patterns',
        num: '04',
        tocLabel: '6 UX Patterns for AI & Agentic Products',
        heading: 'Designing Trustworthy Agentic Interfaces: An Agent Is Not a Chat Box with a Spinner',
        blocks: [
          {
            type: 'p',
            text: 'If you are building AI features into your own product, synthesising Microsoft’s 18 HAX Guidelines and Google’s People + AI Guide (Section 54) points to one core truth: user trust does not come from raw model IQ — it comes from what the human can predict, inspect, and halt at any second.',
          },
          {
            type: 'table',
            caption: 'The 6 Agentic UI Patterns That Replace Opaque Chat Spinners (Section 54 · p. 93)',
            headers: ['Agentic UI Pattern', 'Trust Failure It Solves', 'Concrete Implementation Rule'],
            rows: [
              [
                '1. Bounded Clarification',
                'A one-line prompt hides ten unstated constraints.',
                'Ask at most 3 concise questions before acting, with a sensible pre-filled default on the third.',
              ],
              [
                '2. Editable Plan',
                'The agent sprints ten minutes in the wrong direction.',
                'Render the proposed step list upfront and let the user uncheck or reorder steps before execution.',
              ],
              [
                '3. Visible Scope Chips',
                'Users cannot tell which folders, tables, or budgets are exposed.',
                'Display active permissions as removable scope chips right above the composer.',
              ],
              [
                '4. Three-Tier Permissions',
                'Asking "Approve?" 18 times breeds blind confirmation fatigue.',
                'Read: automatic · Reversible write: ask once per session · Destructive/external: always require explicit confirmation.',
              ],
              [
                '5. Inspectable Step Log',
                '"AI is thinking…" spinners communicate zero progress.',
                'One line per step with live state (queued, running, done, skipped, failed) + a persistent Stop button.',
              ],
              [
                '6. Honest 3-Line Epilogue',
                'Models state guesses in the same confident tone as verified facts.',
                'End every run with three explicit lines: Verified / Estimated / Not done.',
              ],
            ],
          },
        ],
      },

      {
        id: 'verifying-ai-three-statuses',
        num: '05',
        tocLabel: 'Verifying AI UI: 3 statuses, never a 4th',
        heading: 'Verifying AI-Generated Screens: Why Our Scanner Refuses a Fourth Status',
        blocks: [
          {
            type: 'p',
            text: 'Honest automation never claims to replace human judgment — it clears away mechanical failures so your human review focuses 100% on meaning, flow, and real-device feel (Sections 53, 83 & 84).',
          },
          {
            type: 'figure',
            src: '/images/articles/en/prod-verify-ai.webp',
            alt: 'Verifying an AI-generated screen sheet from the UX/UI Playbook English Edition showing the 8 mandatory exit checks',
            caption:
              'What static/DOM verification catches reliably (missing labels, contrast failures, skipped headings, missing reduced-motion) vs what requires a human eye (wrong offer, broken mental model).',
            sourceRef: 'UX/UI Playbook EN · Part 07, Section 53 (p. 91)',
          },
          {
            type: 'p',
            text: 'Across the Playbook’s 77-rule dataset spanning 6 platforms (Web, iOS, Android, Windows, macOS, Linux GNOME/KDE), `agent_check.py` outputs strictly three statuses — never a fake fourth status claiming "100% Compliant": 1) Automated (settled directly from source files with file/line proof), 2) To verify on screen (requires opening a real viewport or device to check touch ergonomics, notch safe areas, or copy clarity), and 3) Not applicable (filtered out cleanly for non-target platforms). Handing a client or tech lead a report stating "42 rules settled automatically, 3 blockers fixed, 11 items verified manually on Mobile Safari" earns far more credibility than a rubber-stamp green badge.',
          },
        ],
      },

      {
        id: 'design-as-revenue-pricing-scope',
        num: '06',
        tocLabel: 'Selling, Floor-Rate Math & Surviving Feedback',
        heading: 'Design as Revenue: Defending Decisions Without Jargon, Floor-Rate Math & Surviving Client Feedback',
        blocks: [
          {
            type: 'p',
            text: 'Two builders can ship the exact same interface; the one who explains why each element sits where it sits wins the next engagement at twice the rate (Part 05, Sections 34–38). Retire phrases like "it feels cleaner", "it’s modern", or "everybody does it". Anchor every design rationale in the three-part chain: Undisputed observation → Deliberate choice → Business consequence ("On mobile checkout, the Pay button dropped beneath the virtual keyboard → I pinned it above the safe area → we eliminate drop-off at the highest-intent moment").',
          },
          {
            type: 'h3',
            text: 'The floor-price formula and the iron rule on discounts (Section 36)',
          },
          {
            type: 'p',
            text: 'Price is not a referendum on your self-worth; it prices risk and value. To compute your honest starting floor: divide your monthly living + tax target by **12 realistic billable days per month** (never 20 — sales, proposals, admin, and context switching eat the rest). Add a 30% margin, then quote fixed-scope work using `Project Price = (Estimated days × Day rate) + 20% risk buffer + Tooling`. Raise your rate with every new client until roughly **1 in 3 proposals is declined on price** — that pushback proves you have reached market value.',
          },
          {
            type: 'doDont',
            doTitle: '✓ When a client’s budget is tight',
            dontTitle: '✕ Habits that destroy your margin',
            doItems: [
              'Keep your day rate intact and trim scope instead: ship the 4 revenue-critical screens now and defer Dark Mode or secondary admin views to Phase 2.',
              'Bill in three protective milestones: 40% upfront, 30% on written wireframe sign-off, 30% on final handoff.',
              'Name a single client decision-maker and cap fixed-fee work at 2 consolidated written feedback rounds.',
            ],
            dontItems: [
              'Cutting your price by 35% for the exact same deliverable list "to build the relationship" — you lock in a low anchor forever.',
              'Sending a 14-page pitch deck with zero explicit "Out of Scope" section.',
              'Reacting to 40 scattered Slack/WhatsApp pings from three stakeholders who disagree with each other.',
            ],
          },
          {
            type: 'copyable',
            label: 'One-Page Proposal Skeleton + 5 Scope-Survival Client Scripts (Sections 37 & 38)',
            langTag: 'markdown',
            code: `# ONE-PAGE CLIENT PROPOSAL (the 7 lines that get signed)
1. PROBLEM UNDERSTOOD (3 lines using the client's own words):
   "Today, 68% of mobile shoppers abandon your checkout on the Shipping step..."
2. EXACT DELIVERABLES:
   4 screens (Cart, Shipping, Payment, Confirmation) × 5 states + tokens.css + handoff.md + WCAG 2.2 AA report.
3. OUT OF SCOPE (protects your margin):
   Backend payment gateway logic, legal copywriting, custom photography, more than 2 consolidated feedback rounds.
4. TIMELINE & GATES:
   Wk 1 Brief & Grayscale Wireframes (written sign-off gate) · Wk 2 High-Fidelity UI & States · Wk 3 Handoff.
5. INVESTMENT: $[Single firm number — no hesitant range]
6. PAYMENT SCHEDULE: 40% kickoff · 30% wireframe sign-off · 30% final delivery.
7. NEXT STEP: Reply "Approved" before [Date, valid 14 days] to lock the [Date] production slot.

---
# 5 READY-TO-SEND SCRIPTS THAT SAVE PROJECTS MID-FLIGHT
- Scattered feedback: "I'll consolidate everyone's notes into a single document before Wednesday so we resolve any conflicting requests once."
- Scope creep: "Great addition — since structure was signed off on [Date], I'll spin up a 2-day add-on for that new screen. Want it now or in Phase 2?"
- Client silence: "To hit our [Date] launch, I need written sign-off by Friday; past that, delivery shifts by the same number of business days."
- Opinion deadlock: "Rather than debating between our two preferences, let's put both labels in front of 5 target users tomorrow morning for 15 minutes."
- Vague pushback ("I don't like it"): "What worries you most on this screen? If the primary action stands out twice as clearly, does that solve the concern?"`,
            note: 'The printable 26-page Bonus Kit includes full A4 sheets for client briefs, one-page proposals, and dev handoffs.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How long should an AGENTS.md or CLAUDE.md context file be for UI engineering?',
        a: 'Roughly 40 to 60 high-signal, testable lines. Bloated 400-line prompts full of vague advice ("make it sleek and modern") dilute model attention. Point to @tokens.css and @screens.md, list automatic failure conditions (no Lorem ipsum, 5 states, 12 px floor), and mandate the 3-line verification footer.',
      },
      {
        q: 'Why enforce a grayscale HTML wireframe gate when AI can generate full colour immediately?',
        a: 'Because fast generation does not fix human psychology: the second stakeholders see brand colours, 90% of review time goes into debating shades of blue instead of verifying whether the value proposition, form fields, and error states hold up.',
      },
      {
        q: 'Why divide target monthly income by 12 billable days instead of 20 working days?',
        a: 'No solo freelancer or consultant bills 20 uninterrupted days every month all year — discovery calls, proposals, bookkeeping, learning, and gaps between contracts consume the remaining days. Pricing on 12 realistic billable days prevents burnout at a loss.',
      },
      {
        q: 'How do you handle a client insisting on a UI change you know will hurt conversion?',
        a: 'Use documented disagreement (Section 38): first offer a quick 5-user test; if they still insist for internal reasons, log calmly in writing: "Decision [Date]: proceed with Option B per client request; noted risk on mobile CTA visibility." Clients respect calm rigour and return for future work.',
      },
    ],
    ctaTitle: 'Equip your repo with the full AI Agent Skill, 77-rule Python scanner & Pro Delivery Kit.',
    ctaText:
      'Get instant access to all three layers of the UX/UI Playbook 2026 English Edition: the 139-page visual manual, the 26-page printable A4 Bonus Kit, and the 21-file working ZIP archive.',
    ctaBullets: [
      'Drop-in AI Skill (SKILL.md + AGENTS.md) for Claude Code, Cursor, Windsurf & OpenAI Codex',
      'Runnable agent_check.py scanner + 77-rule multi-platform JSON dataset for local & CI checks',
      'All 4 client & handoff templates + 7-day straightforward refund guarantee ($29)',
    ],
  },
];
