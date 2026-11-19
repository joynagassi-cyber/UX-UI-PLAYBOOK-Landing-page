import type { ArticleData } from './types';

export const ARTICLES_EN: ArticleData[] = [
  {
    slug: "ux-design-guide",
    category: "UX Design",
    icon: "compass",
    readTime: "About 30 min read",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-ux-en.jpg",
    metaTitle: "UX Design: User Journeys and Audits | UX/UI Playbook",
    metaDescription: "Design clearer user journeys with 10 UX laws and principles, 5 screen states, accessible checkout patterns and a copy-ready 40-point audit checklist.",
    keywords: [
      "operational UX design",
      "cognitive load Cowan 4 chunks",
      "Fitts law Hick-Hyman law UI",
      "5 states of every screen",
      "checkout optimization Baymard 2026",
      "WCAG 2.2 AA European Accessibility Act 2026",
      "40 point UX audit checklist",
    ],
    title: "UX Design: Build Clear User Journeys and Audit Your Screens",
    subtitle: "How to describe a task, preserve context between steps and prepare for errors. Cognitive principles, checkout, accessibility and a 40-point audit checklist.",
    aeoSummaryTitle: "At a glance",
    aeoSummary: "Start with a user goal and one primary action. Design the article’s 5 screen states: empty, loading, ideal, partial/overflow and error, with confirmation after a successful action. Cowan’s 4 ± 1 chunks inform working-memory design; grouping interface elements is a heuristic to test. Measure WCAG 2.2 AA contrast (4.5:1 for body text) and aim for 44 × 44 px targets under the Playbook; the web AA minimum is 24 × 24 px with exceptions. A few observed usability tests uncover problems, but prove neither completeness nor conversion uplift.",
    keyStats: [
      {
        value: "4 ± 1 chunks",
        label: "Working-memory estimate in the studied conditions, not a universal button limit",
        source: "Nelson Cowan · Behavioral and Brain Sciences (2001)",
        url: "https://doi.org/10.1017/S0140525X01003922",
      },
      {
        value: "70.22%",
        label: "Mean cart abandonment: an unweighted average of 50 studies, not your checkout’s rate",
        source: "Baymard Institute · 28 October 2026",
        url: "https://baymard.com/blog/cart-abandonment-rate",
      },
      {
        value: "95.9%",
        label: "Sampled home pages with automatically detectable WCAG failures",
        source: "WebAIM Million · February 2026",
        url: "https://webaim.org/projects/million/",
      },
    ],
    sections: [
      {
        id: "ux-is-not-decoration",
        num: "01",
        tocLabel: "Task and context",
        heading: "Describe the task and its conditions of use",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A brief asking for a modern interface leaves several decisions unresolved: who will use the screen, what information they have and what they need to accomplish. For an invoice export, the difficulty might be selecting the right period, identifying the downloaded file or resuming an interrupted operation. Changing the typeface will not settle those questions. Describe the task and the conditions in which it happens before choosing a layout. An accountant preparing a month-end report on a computer needs persistent filters and keyboard access; someone finding a receipt on a phone needs to identify the right transaction from limited details. These situations provide design criteria and test scenarios. The word intuitive, used alone in a brief, gives the team no way to choose between the behaviours. A written scenario also lets a reviewer question an assumption before it appears throughout the implementation. The downloaded file provides a checkable output too: its period, columns and name should match the request. Reviewing only the export button can miss a problem in that result. Prepare a known set of invoices and compare the downloaded document with the selected records.",
            ],
            visual: {
              kind: "hierarchy",
              title: "One task, one action",
              caption: "The heading and action describe the same outcome.",
              labels: ["My invoices", "Export October", "Download PDF"],
            },
          },
          {
            type: "quote",
            tag: "A starting point",
            text: "Before judging the style, check whether someone understands the screen, finds their action and can recover from an error.",
          },
          {
            type: "explanation",
            paragraphs: [
              "The prominence given to an action needs to account for its consequences. A conspicuous payment button can be appropriate once the amount, recipient and timing of the charge have been explained. Giving the same prominence to account deletion requires other safeguards: name what will be removed, separate the command from ordinary settings and request confirmation appropriate to the possible loss. Consider a shared workspace containing documents owned by several colleagues. A button labelled Delete does not explain whether it removes one document, a project or the entire workspace. Review the wording alongside permissions and any available recovery mechanism. Two screens built from the same cards and buttons can therefore require different interactions. The visual design provides landmarks; the specification records what clicking does and how someone can recover from a mistake. Those details must also remain understandable when an operation fails partway through.",
            ],
            visual: {
              kind: "compare",
              title: "Context changes the risk",
              caption: "An irreversible action needs an appropriate safeguard.",
              labels: ["Delete immediately", "Confirm the project to delete"],
            },
          },
          {
            type: "h3",
            text: "Four questions before drawing",
          },
          {
            type: "explanation",
            paragraphs: [
              "Before drawing a screen, write its scenario in terms that a developer and reviewer can interpret consistently. Record who arrives on the page, which step they came from and what information is already known. Then describe the intended result, such as downloading October invoices, changing a delivery address or confirming an appointment. Examine requests containing several operations separately, because they may involve different data or access rights. Include the exit conditions and foreseeable interruptions, particularly an expired session or a rejected save. This can live in an issue rather than a separate specification; what matters is whether the decisions can be found and reviewed. The four questions below help identify omissions before layout discussions begin. They should also expose where the team needs an answer from the product owner instead of leaving that answer to whoever implements the screen.",
            ],
            visual: {
              kind: "research",
              title: "Before drawing",
              caption: "Write a short answer for each point.",
              labels: ["Person and context", "Intended action", "Path and recovery"],
            },
          },
          {
            type: "steps",
            title: "Screen-framing questions",
            steps: [
              {
                bold: "Who uses the screen, and under which conditions?",
                text: "Describe the task, knowledge required and device constraints. Keyboard-based invoice reconciliation and finding a receipt on a phone require different test scenarios.",
              },
              {
                bold: "What result must be obtained?",
                text: "Write the observable result: export October invoices or confirm an appointment. If a request contains several operations, examine their dependencies before grouping them on one screen.",
              },
              {
                bold: "Which information and steps are necessary?",
                text: "List data to read or enter, intermediate decisions and details that need to remain visible for verification. Explain why any additional information is requested.",
              },
              {
                bold: "How can someone resume after interruption?",
                text: "Prepare an account without data, a slow request, a long name and a declined payment. For each case, record what is preserved and which action is offered.",
              },
            ],
          },
          {
            type: "h3",
            text: "An initial five-second check",
          },
          {
            type: "explanation",
            paragraphs: [
              "A five-second test examines what someone retains from an initial glimpse. Prepare a screen with realistic wording, show it briefly to a person unfamiliar with the project and hide it before asking questions. Ask what the product lets them do and which action they noticed. Record the actual answer: I can send an invoice is more informative than a general claim that the page is clear. If they describe a secondary feature, review the heading, content grouping and placement of controls. Avoid explaining the intention during the test, since that assistance changes what you are trying to observe. A second exposure can help review revised wording, although memory of the first screen will influence the answer. Follow this check with a complete task. Noticing the account-creation button does not show whether someone can complete registration, submit a document or make a payment.",
            ],
            visual: {
              kind: "hierarchy",
              title: "A comprehension check",
              caption: "After five seconds, ask what the person understood.",
              labels: ["Preview · 5 seconds", "What is this product for?", "Where would you start?"],
            },
          },
        ],
      },
      {
        id: "true-cognitive-laws",
        num: "02",
        tocLabel: "Cognitive principles",
        heading: "Connect cognitive principles to an interface decision",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Research on memory and pointing describes particular tasks carried out by defined participants. A design team needs to explain how a finding relates to the screen being reviewed. Removing menu entries, for example, reduces the options on display while potentially adding a step for people who use those commands every day. Keeping every feature at the same level may make a first visit harder. Compare observable journeys: finding a known command, understanding a category or resuming an abandoned operation. The principles below help frame those questions. For each proposed change, record the observed problem, your interpretation and the test that could examine the result. This makes a decision open to revision without relying on a researcher's name as authority. It also gives the next reviewer enough context to distinguish an experimental finding from the team's proposed application of it.",
            ],
            visual: {
              kind: "compare",
              title: "Observe before concluding",
              caption: "A design guideline is not a measurement of use.",
              labels: ["“There are too many buttons”", "“The intended action was not found”"],
            },
          },
          {
            type: "h3",
            text: "1. Cowan (2001): about 4 chunks in working memory",
          },
          {
            type: "explanation",
            paragraphs: [
              "Cowan (2001) reviews findings suggesting a working-memory capacity of about 4 ± 1 chunks when rehearsal and grouping strategies are controlled. A chunk is a unit retained under the experimental conditions; it does not automatically correspond to a button or card. A page containing ten fields can remain usable if the necessary information stays visible and people can process it in sequence. The burden increases when someone must remember an amount on one page, find a recipient on another and compare both without a summary. Keeping the recipient and amount visible during transfer confirmation reduces that demand. Review which information disappears at each step, which values must be re-entered and what the mobile keyboard covers. Counting elements on the page will not capture those constraints. The scenario should include returning to an earlier step, since that is often when missing context becomes apparent. Distinguish recognition from recall in the notes. With the recipient still displayed, someone can recognise the name and account just selected. If a code is requested after closing the summary, it must be remembered or found elsewhere. The burden can therefore change without adding a single field. Record which values remain available and which can be edited, then try an edit followed by a return to confirmation.",
            ],
            visual: {
              kind: "memory",
              title: "Reduce forced recall",
              caption: "Keep useful information visible throughout the task.",
              labels: ["Amount", "Currency", "Recipient", "Date", "Keep a visible summary"],
            },
          },
          {
            type: "h3",
            text: "2. Hick-Hyman: choice, grouping and learning",
          },
          {
            type: "explanation",
            paragraphs: [
              "Hick-Hyman relates choice time to the amount of information in an experimental task. In an interface, visible option count operates alongside the likelihood of each choice, the labels used and familiarity with their positions. An export menu containing PDF, CSV and several industry-specific formats needs to help people recognise the right output; replacing the labels with three icons does not guarantee an improvement. Regular users may also rely on a shortcut or stable location. To review this menu, describe frequent tasks, distinguish formats with different uses and examine their labels using actual files. During testing, record submenu openings, backtracking and corrected choices. Those observations help explain the cost of a grouping decision. Define the intended improvement for a particular task rather than judging the journey only by the number of options left on screen. Check that a gain for new users has not removed a necessary route for experienced users. For an accounting export, try a description such as CSV — open in a spreadsheet beside the format name, provided it matches the generated file. If several formats have unfamiliar names, ask what document the person needs before showing the menu. Their wording can inform grouping. Retain technical names needed for exchanges with other software, since removing them would discard information used by people who already know the destination.",
            ],
            visual: {
              kind: "choices",
              title: "Name the choices",
              caption: "A primary action, then recognisable alternatives.",
              labels: ["Publish", "Save draft", "Cancel"],
            },
          },
          {
            type: "h3",
            text: "3. Fitts (1954): distance and pointing area",
          },
          {
            type: "explanation",
            paragraphs: [
              "Fitts's law describes pointing time in relation to factors including distance and the usable width of a target. Review the area receiving the click or touch separately from the icon drawing. In this web project, a `20 px` close icon sits within a target of at least `44 × 44 px`. That project choice exceeds the WCAG 2.2 AA minimum of `24 × 24 CSS px`, which includes exceptions. Other platforms use different units: points on iOS and dp on Android. Inspect the button's actual box in the browser and check that pressing near its edge activates the intended command. Review spacing from neighbouring controls, the focus outline and any fixed element covering the area. Increasing a target in a stylesheet is insufficient if another layer intercepts the interaction. Include both pointer and keyboard use in the scenario, since a larger hit area does not establish a visible focus state.",
            ],
            visual: {
              kind: "target",
              title: "Glyph and target",
              caption: "Schematic illustration, not drawn to scale.",
              labels: ["Target · 44 × 44 px", "Icon · 20 × 20 px"],
            },
          },
          {
            type: "table",
            caption: "Ten laws and principles: connect each idea to a design decision and a test.",
            headers: ["Law or principle", "Finding or mechanism described", "Question to examine on screen"],
            rows: [
              [
                "Jakob",
                "Habits learned in other products influence expectations.",
                "Keep familiar conventions, then validate them with your audience.",
              ],
              [
                "Fitts (1954)",
                "Pointing time depends in part on distance and target width.",
                "Separate the glyph from its hit area; aim for 44 × 44 px on this web project.",
              ],
              [
                "Hick-Hyman (1952–1953)",
                "Choice time varies with information; context and learning also matter.",
                "Name and group choices. Preserve learned shortcuts.",
              ],
              [
                "Cowan (2001)",
                "About 4 ± 1 working-memory chunks in the studied conditions.",
                "Keep comparison data visible; test groupings and transitions between steps.",
              ],
              [
                "Proximity (Gestalt)",
                "Nearby elements are perceived as related.",
                "Example rhythm: 8 px within a group, 24–32 px between groups.",
              ],
              [
                "Similarity",
                "Visually similar elements suggest a shared function.",
                "Keep equivalent actions consistent; distinguish passive status from controls.",
              ],
              [
                "Von Restorff effect",
                "A distinctive item can be better remembered in context.",
                "Reserve the strongest visual emphasis for the primary action.",
              ],
              [
                "Pareto — heuristic",
                "Some features may concentrate usage; no fixed ratio is guaranteed.",
                "Measure frequent tasks and optimise them before secondary features.",
              ],
              [
                "Doherty threshold — guideline",
                "Waiting without feedback can interrupt task continuity.",
                "Acknowledge input promptly; use 400 ms as a design guideline, not a universal limit.",
              ],
              [
                "Aesthetic-usability effect",
                "Appearance can influence perceived usability without proving actual effectiveness.",
                "Polish the first screen and measure task success, errors and time separately.",
              ],
            ],
          },
          {
            type: "callout",
            icon: "message-circle",
            tone: "accent",
            title: "State an observation you can test",
            text: "These four actions have the same visual weight; let us emphasise Publish and observe whether people find it more easily. This proposal names a change and an expected observation. The report then needs to state what happened during testing, including cases where the change did not help.",
          },
        ],
      },
      {
        id: "cognitive-budget-user-journey",
        num: "03",
        tocLabel: "Attention and journey",
        heading: "Reduce cognitive load across the journey",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Each displayed item should relate to a decision or operation in the journey. On an invoice page, an overdue balance helps someone choose which accounts to handle; a count of visits to the account serves a different purpose. Begin with the information that must be read before acting. Buttons labelled Save, Apply and Confirm may represent different behaviours, but the distinction needs to be explained by context and remain consistent across pages. Less frequent options can move to a secondary level if people can still recognise where to find them. Keep verification details such as the selected period and total available. A visually quieter interface can require more memory when it hides them. Compare the steps people actually perform, including menu openings and returns to a previous page. This is especially important for repeated work, where a small detour may occur many times in the same session.",
            ],
            visual: {
              kind: "choices",
              title: "Set a reading order",
              caption: "Secondary options do not compete with the intended action.",
              labels: ["Create a project", "Import data", "View templates"],
            },
          },
          {
            type: "h3",
            text: "Read the labels aloud",
          },
          {
            type: "explanation",
            paragraphs: [
              "Reading labels aloud can expose instructions missing from the screen. Try describing a transfer using only the displayed wording, without adding that the currency must be chosen before entering an amount. If that explanation is necessary, review the field order or the dependency between the controls. Help text remains useful when it explains a rule that will not fit in a label, such as an international transfer delay or the format of an identifier. Put it where that rule becomes relevant and keep it available after typing begins. Examine completion messages as well: Request received does not establish whether an invoice was sent to the customer or merely saved as a draft. Reviewing terminology with someone familiar with the work helps identify inaccurate labels, but should be followed by observing the task in the interface. A vocabulary review cannot establish whether the placement and timing of the message are effective.",
            ],
            visual: {
              kind: "compare",
              title: "Say what will happen",
              caption: "The button names the operation; help explains its conditions.",
              labels: ["Confirm", "Send the invoice to the client"],
            },
          },
          {
            type: "doDont",
            doTitle: "Decisions to try",
            dontTitle: "Situations to examine",
            doItems: [
              "Give the expected action visual priority in the context of the page.",
              "Name the result of clicking: Download PDF receipt or Send invoice.",
              "Prefill a known, editable value when it avoids repeated entry.",
              "Request information when it becomes necessary and explain its use.",
            ],
            dontItems: [
              "Cancel, Save draft and Publish presented as commands of equal importance.",
              "Registration that requests data without explaining why it is needed.",
              "Column headings understandable only after opening a tooltip.",
              "Rare options placed before those needed for the current task.",
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "journey",
              title: "Read the journey end to end",
              caption: "At each stage, look for the information needed, the available action and a way to recover.",
              labels: ["Trigger", "Understanding", "Action", "Confirmation", "Return"],
            },
          },
          {
            type: "h3",
            text: "Connect arrival, action and return",
          },
          {
            type: "explanation",
            paragraphs: [
              "The journey includes what happens before and after the screen under review. Someone opens the product for a reason, identifies an available operation, acts, checks the result and may return with context to recover. For an invoice, confirmation needs to distinguish a saved document from a completed send. If delivery is deferred, its status should remain available after the tab is closed. Interruptions provide useful review scenarios: a connection lost during entry, a return after session expiry or a move from phone to computer. Record which data is preserved and what someone must do to resume. The team can then decide whether to save a draft, retain filters or explain the need to authenticate again. Return frequency depends on the service. A weekly task and an annual declaration should not be judged by the same retention measure, and neither can be assessed from a screenshot alone. Preserving context also requires an explicit scope. A period filter and payment details have different storage and privacy requirements. Identify what remains only during the session, what is saved to the account and what must not be retained. Recovery wording needs to match those decisions; it cannot announce a saved draft if only some values were preserved.",
            ],
            visual: {
              kind: "journey",
              title: "After the click",
              caption: "Confirmation and returning are part of the journey.",
              labels: ["Open", "Understand", "Act", "Check the result", "Return later"],
            },
          },
          {
            type: "steps",
            title: "Five points to examine in the journey",
            steps: [
              {
                bold: "Arrival",
                text: "Check whether the heading and content identify the service and a starting point. Record terms the person does not understand.",
              },
              {
                bold: "Registration",
                text: "Examine why each item of data is requested and whether someone can preview the service before creating an account. Explain security constraints.",
              },
              {
                bold: "First completed action",
                text: "After Save or Send, show what changed and where the result can be found. Confirmation also needs to reach assistive technologies.",
              },
              {
                bold: "Return after interruption",
                text: "Restore filters and drafts where preservation is intended. If the session expired, explain authentication and which data can be recovered.",
              },
              {
                bold: "Error and correction",
                text: "Replace a bare 422 code with an explanation tied to the field or operation. Keep useful values and offer recovery that does not duplicate the action.",
              },
            ],
          },
          {
            type: "quote",
            tag: "Observe return visits",
            text: "Day-7 return can be useful for a product used weekly. Choose a measure that fits the frequency and value of the actual task.",
          },
        ],
      },
      {
        id: "five-states-empty-checkout",
        num: "04",
        tocLabel: "States and checkout",
        heading: "Prepare empty states, errors and checkout",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A screen specification needs to describe situations where expected data is absent or arrives differently. An empty state might represent an account without projects; loading means that the requested result is not yet known. The ideal state presents the expected data, while a partial result may come from a filter or an unavailable service. An error needs to explain the recovery available. For each of these five states, record its trigger, displayed content and available commands, then review the transitions between them. Retrying should not erase an entry or submit an operation twice after it has already been received. If the browser cannot tell whether a payment completed, offer a way to check its status before sending another payment request. Successful actions also need explicit confirmation, even when a data list updates automatically. That confirmation should identify what changed and remain available long enough to be found during review. A transition table helps expose omissions: for each event, record the starting state, the known service response and the next displayed state. A browser timeout and an explicit server rejection do not provide the same information. Duplicate-operation protection needs server support; disabling a button covers only part of the scenario. Ask how an already received operation is identified when a request is repeated, then incorporate that answer into recovery.",
            ],
            visual: {
              kind: "states",
              title: "States to prepare",
              caption: "Every state keeps the next step understandable.",
              labels: ["Empty · create", "Loading · wait", "Ideal · review", "Partial · complete", "Error · retry"],
            },
          },
          {
            type: "diagram",
            visual: {
              kind: "states",
              title: "One screen, five situations",
              caption: "Preserve context during waits or failures, and confirm successful actions separately.",
              labels: [
                "Empty · offer creation",
                "Loading · explain the wait",
                "Ideal · enable the task",
                "Partial · explain what is missing",
                "Error · offer recovery",
              ],
            },
          },
          {
            type: "h3",
            text: "An empty state with a starting point",
          },
          {
            type: "explanation",
            paragraphs: [
              "An empty state provides the first instructions for an unfamiliar workspace. No projects yet describes the situation; an additional sentence can explain that a project groups tasks and documents. The creation action must lead to a step where someone can actually prepare the first object. Importing a file or using a template can be an alternative when those routes fit the product's work. A large illustration and a disabled toolbar may push the explanation away from its action, particularly on a phone. Distinguish a lack of data from an empty search result, which usually calls for changing a filter rather than creating another object. You can set a first-result target and measure the time required for a defined journey. The sixty seconds sometimes suggested is a working target to adapt, without a universal relationship to retention. A complex setup may legitimately require more time and a clear account of its progress.",
            ],
            visual: {
              kind: "empty",
              title: "A useful first screen",
              caption: "Keep creation and import visible without an oversized illustration.",
              labels: ["No projects yet", "Keep your tasks together here.", "Create a project", "Or import a file"],
            },
          },
          {
            type: "h3",
            text: "Checkout without hidden totals or steps",
          },
          {
            type: "explanation",
            paragraphs: [
              "Baymard's compilation of fifty e-commerce studies, updated on 28 October 2026, reports an unweighted mean cart-abandonment rate of 70.22%, ranging from 55 to 84%. Its form research counts an average of 23.48 elements, compared with twelve to fourteen in the simplified journeys studied. An element includes more than an input field, so these figures do not prescribe an ideal form for every shop. They prompt a review of which data is requested and when. During a test, ask someone to explain the total and the timing of the charge before the final action. Ambiguity about fees, account creation or the address being used can be addressed through wording and sequence. Following a card decline, preserve the cart and useful entry data. Recovery should explain what failed and which payment methods remain available. Any comparison after a change needs the shop's own measurements and a clear description of the journey being compared.",
            ],
            visual: {
              kind: "checkout",
              title: "Before committing",
              caption: "Example summary; actual amounts depend on the order.",
              labels: ["Your order", "Items · $29", "Fees · shown here", "Pay the displayed total"],
            },
          },
          {
            type: "list",
            heading: "Six checkout decisions to review",
            items: [
              {
                bold: "Access without an account",
                text: "Offer guest checkout where compatible with the service. If an account is required, explain why before asking someone to create it.",
              },
              {
                bold: "Total before commitment",
                text: "Show the available subtotal, shipping and taxes. If an amount depends on the address, explain this before entry and update the total.",
              },
              {
                bold: "Field grouping",
                text: "Keep labels visible and group related details. Request a phone number only when its purpose is justified and explained.",
              },
              {
                bold: "Available payment methods",
                text: "Present methods actually supported for the order and country. Do not infer a person’s preference from their region alone.",
              },
              {
                bold: "Effect of the final button",
                text: "Pay $132.90 identifies the operation and amount. If the click opens bank verification, explain that step nearby.",
              },
              {
                bold: "Validation timing",
                text: "Avoid premature errors while entry is incomplete. Try validation after leaving a field and on submission; retain values and associate each message with its field.",
              },
            ],
          },
          {
            type: "inlineCta",
            title: "The book and audit worksheets",
            text: "The English Playbook includes 36 annotated screens, a 40-point audit checklist and 12 A4 sheets for your next review.",
            buttonLabel: "Get the EN Playbook · $29",
          },
        ],
      },
      {
        id: "accessibility-2026-law",
        num: "05",
        tocLabel: "Accessibility and scope",
        heading: "Define accessibility checks and their scope",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "The February 2026 WebAIM Million detects WCAG 2 A or AA errors on 95.9% of the million home pages analysed, averaging 56.1 detected errors per page. The report concerns defects the tool can identify within that sample. For your project, automated reports can help locate insufficient contrast or fields without accessible names, but the journey also needs keyboard and screen-reader testing. Prepare a scenario that includes valid entry, a deliberately triggered error and its correction. Record the focus order, the error announcement and controls potentially obscured by fixed elements. Continue to the operation's confirmation, because a single page does not establish continuity between steps. An error-free scan cannot establish conformance for the whole service. Keep the tested pages, tool versions and remaining manual checks with the results so that another reviewer can understand what was covered and reproduce a reported failure. When a message appears without a page change, check that it is announced without moving focus unpredictably. For an input error, someone needs to identify the affected field and keep the instruction available while correcting it. After closing a modal, check that focus returns to a control still present. If the action removes that control, define another sensible destination in the updated list. Retain these scenarios with the component review so other pages using it receive the same checks.",
            ],
            visual: {
              kind: "checklist",
              title: "Beyond the scan",
              caption: "Real tasks complement automated checks.",
              labels: ["Contrast and labels", "Keyboard journey", "Reading and announcements", "Task completion"],
            },
          },
          {
            type: "h3",
            text: "Separate technical guidance from legal obligations",
          },
          {
            type: "explanation",
            paragraphs: [
              "Choosing a technical reference and determining legal duties require different information. A team may agree to assess a set of journeys against WCAG 2.2 AA, while a directive's applicability depends on the service, the organisation and national implementation. A W3C Recommendation, a published ETSI standard and a reference cited in the Official Journal of the European Union have scopes that need separate examination. The table below distinguishes their status as of 18 November 2026 and links to the relevant texts. In a proposal, name the pages and tasks being assessed, the reference version and the planned methods. The delivery report should repeat that scope, date the checks and record outstanding defects. The supplied clause is a drafting aid whose suitability for a contract and sector needs competent advice. It should be revised if the assessment changes, rather than being copied unchanged into a broader claim about the product.",
            ],
            visual: {
              kind: "research",
              title: "From a text to a project",
              caption: "Check the applicable scope and version before concluding.",
              labels: ["Identify the text", "Check the sector", "Define the scope", "Document the checks"],
            },
          },
          {
            type: "table",
            caption: "European legislation and references: status and scope on 18 November 2026",
            headers: ["Text or reference", "Date or status", "Scope and considerations"],
            rows: [
              [
                "European Accessibility Act — Directive (EU) 2019/882",
                "National measures apply from 28 June 2025",
                "Covers the products and services listed in Article 2, not every website. Article 4(5) exempts service micro-enterprises: fewer than 10 people and annual turnover or balance sheet ≤ €2M. That exemption does not cover product obligations. Check national transposition and transitions (Arts. 31–32).",
              ],
              [
                "WCAG 2.2 (W3C Recommendation)",
                "October 2023",
                "The global technical baseline targeted at Level AA (4.5:1 text contrast, 2.4.11 Focus Not Obscured, target size, drag alternatives).",
              ],
              [
                "EN 301 549 v4.1.1",
                "Version published September 2026",
                "ETSI has published EN 301 549 v4.1.1, incorporating WCAG 2.2 for the web. Publication alone is not enough: check the Official Journal citation for the directive and requirements concerned before claiming presumption of conformity.",
              ],
              [
                "WCAG 3.0 (W3C Working Draft)",
                "10 September 2026 draft",
                "A changeable working draft, not a W3C Recommendation. W3C says it should only be cited as work in progress; do not present it as replacing WCAG 2.2.",
              ],
              [
                "EU AI Act — Regulation (EU) 2024/1689 Art. 50",
                "Check timeline: Arts. 50, 111(4) and 113",
                "Article 50 sets interaction notices and marking/disclosure duties by role, content and exceptions. General application: 2 August 2026; the 27 July 2026 consolidated text gives systems already on the market before 2 August until 2 December 2026 for Article 50(2). Not all AI outputs carry the same duty.",
              ],
            ],
          },
          {
            type: "copyable",
            label: "Example scope clause for an accessibility evaluation",
            langTag: "text",
            code: `Accessibility Evaluation Scope:
"Delivery includes an engineering evaluation report covering the user flows listed
in Appendix 1, tested against W3C WCAG 2.2 Level AA as of [YYYY-MM-DD] (automated
static/DOM scan plus manual keyboard and screen-reader walkthrough). Exact scope,
test methodology, and sampling limits are documented in the attached report. This
deliverable is a technical verification report and constitutes neither an official
certification nor legal advice."`,
            note: "Adapt this clause to the journeys and methods actually included. Have contractual commitments and sector obligations examined by qualified counsel.",
          },
        ],
      },
      {
        id: "audit-20-min-40-point-checklist",
        num: "06",
        tocLabel: "Testing and auditing",
        heading: "Observe use and organise an audit",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "The Nielsen and Landauer model (CHI 1993) expresses cumulative problem discovery as `1 − (1 − L)^n`. With a discovery rate `L` of about 31%, five participants give a result near 84%, often rounded to 85%. This depends on the model's assumptions and the rate associated with the problems; it cannot guarantee that five people will find a fixed share of your product's defects. In Faulkner's 2003 study with sixty users, five-person subsets revealed between 55 and 99% of the problems in that study. These variations matter when planning sessions. An initial group can expose obstacles to correct, and a later group can examine the revised journey. Account for the variety of tasks, relevant populations and consequences of errors as well. A medical operation or consequential payment needs an evaluation strategy appropriate to the risk, including expertise and participants that a convenient small sample may not provide.",
            ],
            visual: {
              kind: "research",
              title: "Test, then improve",
              caption: "A small sample reveals issues, not a guarantee.",
              labels: ["Observe a task", "Record obstacles", "Make changes", "Test again"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "An observation session starts with a task that does not reveal the expected route. For an export, ask someone to prepare a period's invoices for accounting instead of telling them to click Export. Let them choose their steps and record where they hesitate, backtrack or ask for help. Separate what was observed from the explanation you propose. If several people miss the period filter, try a different location and examine it in another session. Comparing success or conversion rates requires a sample-size calculation based on the initial rate, the difference being sought and the accepted risk of error. A short qualitative series does not replace that calculation. AI-generated personas can help prepare research questions, but supply no observations of actual product use. They should not appear in a research report as participants or as evidence that a customer segment understands the revised flow.",
            ],
            visual: {
              kind: "compare",
              title: "Concrete observations",
              caption: "Record the action, hesitation and what helps the person recover.",
              labels: ["“People prefer A”", "“3 participants missed the Back link”"],
            },
          },
          {
            type: "h3",
            text: "Organise an initial twenty-minute audit pass",
          },
          {
            type: "explanation",
            paragraphs: [
              "An initial audit pass prepares corrections and further investigation. It can examine page comprehension, hierarchy, the primary action, component consistency, screen states, system responses, accessibility, wording, price and mobile use. For each selected problem, keep a screenshot or reproduction scenario, describe the effect on the task and propose a change that can be reviewed. The total disappears when the keyboard opens provides a more specific starting point than a readability score. A twenty-minute timebox suits a limited pass reported as such; it cannot cover user research or a full accessibility assessment. If the work is charged, the proposal should include preparation, the journeys examined and the report. The checklist below helps organise the topics, but every answer must remain attached to a check actually performed. Leave unexamined items open, with a reason and a next step, rather than marking them complete to finish the sheet.",
            ],
            visual: {
              kind: "report",
              title: "An actionable finding",
              caption: "Connect each issue to a fix and a follow-up check.",
              labels: ["Finding", "Risk", "Fix", "Price hidden", "Unclear total", "Visible summary"],
            },
          },
          {
            type: "copyable",
            label: "40-point UX/UI review checklist",
            langTag: "markdown",
            code: `# UX/UI REVIEW — 40 POINTS
Journey: [name] · Date: [date] · Reviewer: [name]
For each item: outcome, observation and a link to the test or screenshot.

## 1. Structure and journey (10 points)
- [ ] Initial screen comprehension observed with someone outside the project
- [ ] Intended action identifiable within the page hierarchy
- [ ] Entry, exit and return defined for each step
- [ ] Current location indicated by more than colour alone
- [ ] Back navigation tried without unexpected loss of entered data
- [ ] Navigation conventions examined with the relevant audience
- [ ] Detours in frequent tasks recorded and justified
- [ ] Secondary features reachable without obscuring the current action
- [ ] Navigation links and commands distinguishable in context
- [ ] First-result time measured for a defined task, without a universal threshold

## 2. Content and messages (10 points)
- [ ] Production text or identified examples used, without fabricated testimonials
- [ ] Command labels describe the operation in its context
- [ ] Errors explain the known situation and an available recovery
- [ ] Total price and conditions understood before commitment
- [ ] Help-text contrast measured on its actual background
- [ ] Dates, currencies and numbers adapted to language and region
- [ ] Long text, multiline headings and empty results tried
- [ ] Empty state explains the situation and available actions
- [ ] Capitals reserved for short text where they remain readable
- [ ] Translations and terminology consistent between steps

## 3. Visual system (10 points)
- [ ] Loaded family and weights match the project system
- [ ] Text sizes use tokens, with exceptions documented
- [ ] Internal and structural spacing follow the selected scale
- [ ] Action colour distinguishable from status and alerts
- [ ] Recurring components consistent across pages
- [ ] Radii, borders and surface levels defined
- [ ] Hierarchy reviewed with real text and amounts
- [ ] Reading width and line height tried on complete paragraphs
- [ ] Visuals and icons readable in both themes
- [ ] Tokens and components named; local styles justified

## 4. States, accessibility and engineering (10 points)
- [ ] Five states prepared: empty, loading, ideal, partial/overflow, error
- [ ] Idle, hover, press, focus, loading and disabled controls examined
- [ ] Fields have linked visible labels and help available after entry
- [ ] WCAG contrast measured: body text 4.5:1; meaningful non-text elements 3:1
- [ ] Web targets aim for project choice of 44 × 44 CSS px; native units distinguished
- [ ] Full keyboard journey, visible focus, closing and focus return tried
- [ ] Important information understandable without relying only on colour
- [ ] Informative images have appropriate alternatives; decoration is ignored
- [ ] Slow network, interruption and recovery tried without duplicate operations
- [ ] Delivery specification updated with edge cases and remaining checks`,
            note: "Place this file in docs/audit-40.md or the pull-request template. Record the journey, date and results; leave unexamined items open. Time required depends on scope.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What does Cowan’s estimate of 4 ± 1 chunks describe?",
        a: "It concerns working memory under the studied conditions, with rehearsal and grouping controlled. A chunk is not a predefined interface element. For a form, examine what must be remembered between steps and keep comparison data visible. Proposed groupings then need testing on the actual task.",
      },
      {
        q: "Does the European Accessibility Act cover every website?",
        a: "Directive 2019/882 covers products and services within its defined scope from 28 June 2025. Articles 3(23) and 4(5) exempt micro-enterprises providing services: fewer than ten people and annual turnover or balance sheet of at most €2M. This exemption does not cover product obligations. Examine the sector, national implementation, transitions and other duties with qualified counsel.",
      },
      {
        q: "Where should a checkout review begin?",
        a: "Ask someone to complete a defined purchase and examine whether they understand the total before commitment. Record data requests, account requirements and recovery after a decline. Baymard findings supply questions to investigate without prescribing an ideal field count. After a change, repeat the journey and keep the observations; conversion effects require the shop’s own measurements.",
      },
      {
        q: "Can an AI agent replace testing with users?",
        a: "An agent can analyse code, run available checks and help prepare scenarios. Its answers do not show how a person understands product terminology or recovers after an error. Simulated personas should remain preparation hypotheses. To observe those behaviours, recruit relevant people and give them a task without revealing the intended route.",
      },
    ],
    ctaTitle: "Prepare your next audit",
    ctaText: "The English edition of UX/UI Playbook includes the 139-page book, a 26-page printable kit and an archive of 21 working files.",
    ctaBullets: [
      "English book with annotated screen examples",
      "12 A4 worksheets for briefing, auditing and handoff",
      "Tokens, templates, rules and a Python scanner in the archive",
    ],
    entityDefinition: "User experience design organises journeys, content and interactions so a person can reach a goal. It differs from UI design, which defines visual presentation, and Product Design, which also addresses value and scope.",
    references: [
      {
        title: "The magical number 4 in short-term memory",
        url: "https://doi.org/10.1017/S0140525X01003922",
        publisher: "Nelson Cowan · Behavioral and Brain Sciences",
        date: "2001",
        note: "About 4 chunks under specific experimental conditions. Groups of 3 to 5 in a UI are a design interpretation.",
      },
      {
        title: "Cart Abandonment Rate: 50 Statistics",
        url: "https://baymard.com/blog/cart-abandonment-rate",
        publisher: "Baymard Institute",
        date: "2026-10-28",
        note: "70.22%: unweighted mean of 50 studies (2006–2025). Form elements: 23.48 observed versus 12–14 in a simplified flow.",
      },
      {
        title: "The WebAIM Million — 2026 report",
        url: "https://webaim.org/projects/million/",
        publisher: "WebAIM",
        date: "2026-02",
        note: "1 million home pages, 95.9% with detected errors, 56.1 errors per page. An error-free scan does not prove conformance.",
      },
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "Normative text: distinguish body text, large text and non-text components.",
      },
      {
        title: "Understanding SC 2.5.8: Target Size (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        publisher: "W3C WAI",
        date: "WCAG 2.2",
        note: "AA: 24 × 24 CSS px with exceptions. 44 × 44 px is this article’s recommendation, not the AA minimum.",
      },
      {
        title: "A mathematical model of the finding of usability problems",
        url: "https://doi.org/10.1145/169059.169166",
        publisher: "Jakob Nielsen & Thomas K. Landauer · CHI",
        date: "1993",
        note: "The model depends on problem-discovery probability; 5 people do not guarantee a fixed percentage.",
      },
      {
        title: "Beyond the five-user assumption",
        url: "https://doi.org/10.3758/BF03195514",
        publisher: "Laura Faulkner · Behavior Research Methods",
        date: "2003",
        note: "Original study with 60 people; 5-person subsamples found 55–99% of that study’s issues. Generalisation to your product requires testing.",
      },
      {
        title: "Directive (EU) 2019/882 — European Accessibility Act",
        url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj",
        publisher: "EUR-Lex · European Union",
        date: "2019",
        note: "Articles 2, 3(23), 4(5) and 31: scope, micro-enterprises and application. Check national transposition and your sector.",
      },
      {
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
        publisher: "EUR-Lex · European Union",
        date: "2026-07-27",
        note: "Consolidated text: Art. 50 (duties and exceptions), 111(4) (2 December 2026 transition for certain existing systems) and 113 (application). Check the role and use concerned.",
      },
      {
        title: "W3C Accessibility Guidelines (WCAG) 3.0 — Working Draft",
        url: "https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/",
        publisher: "W3C",
        date: "2026-09-10",
        note: "Working-draft status only: does not replace WCAG 2.2 and may change.",
      },
      {
        title: "EN 301 549 V4.1.1 — Accessibility requirements for ICT products and services",
        url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf",
        publisher: "ETSI · CEN · CENELEC",
        date: "2026-09",
        note: "Published standard. EU Official Journal citation and its scope must be checked separately.",
      },
    ],
  },
  {
    slug: "ui-design-system-tokens",
    category: "UI Design",
    icon: "palette",
    readTime: "About 21 min read",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-ui-en.jpg",
    metaTitle: "UI Design: CSS Tokens and Dark Mode | UX/UI Playbook",
    metaDescription: "Build a consistent UI system with 6 type roles, 8 size tokens, 4/8-point spacing, accessible colour, copy-ready light/dark CSS and a developer handoff.",
    keywords: [
      "UI design system CSS tokens",
      "W3C design tokens 2025.10",
      "1.25 typography scale UI",
      "8 point grid spacing system",
      "dark mode tokens halation",
      "UI microcopy rules",
      "CSS logical properties RTL",
      "developer handoff specification",
    ],
    title: "UI Design: Build CSS Tokens and a Readable Dark Mode",
    subtitle: "From typography to component states: organise colour, spacing and themes. CSS examples, Domine number alignment and a developer handoff template.",
    aeoSummaryTitle: "At a glance",
    aeoSummary: "A coherent UI system maps 6 semantic roles to 8 size tokens: 12, 14, 16, 20, 24, 32, 40 and 64 px. A 1.25 ratio informs the progression, rather than defining an exact rounding formula. Separate internal, structural and macro spacing on a 4/8-point base. The 60/30/10 guideline organises colour roles; it is not a scientific finding. For OLED dark mode, keep a #000000 base, lift surfaces and soften text. Measure contrast on each actual background and offer light mode too: reading comfort requires reader feedback.",
    keyStats: [
      {
        value: "6 roles · 8 tokens",
        label: "CSS sizes 12, 14, 16, 20, 24, 32, 40 and 64 px: the scale used in this article",
        source: "Example type system",
      },
      {
        value: "≥ 4.5 : 1",
        label: "AA body-text contrast; large text and meaningful controls: 3:1 under their respective criteria",
        source: "W3C WCAG 2.2 · 1.4.3 & 1.4.11",
        url: "https://www.w3.org/TR/WCAG22/",
      },
      {
        value: "2025.10",
        label: "Stable final report from the Design Tokens Community Group; not a W3C Recommendation",
        source: "Design Tokens Community Group · 2025-10-28",
        url: "https://www.designtokens.org/tr/2025.10/format/",
      },
    ],
    sections: [
      {
        id: "four-hierarchy-levers",
        num: "01",
        tocLabel: "Visual hierarchy",
        heading: "Build a visual hierarchy",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Visual hierarchy organises the order in which information can be noticed. On an invoice page, the amount needing attention, selected period and available action do not require identical treatment. Begin by comparing sizes, weights and distances between groups, then use colour where it adds a useful cue. A highly saturated button still needs wording and placement that connect it to the right object. Review the screen with actual text and amounts, including a heading that wraps over several lines. A layout that works with Project A may become difficult to scan with a long customer name. The four levers below describe adjustments available to the team. Their combination depends on content density, available space and the tasks performed on the page. Check the result at normal reading size as well as in an overview, since a prominent heading does not establish that the details below it remain readable. For a comparison, keep content unchanged between versions and adjust the setting under discussion. You can then ask where reading begins and which command was noticed without mixing a rewrite, new grid and palette change. Notes should describe noticed information and expressed choices rather than infer task success from a tidier appearance.",
            ],
            visual: {
              kind: "hierarchy",
              title: "Build a visual priority",
              caption: "Size, weight and space work before colour.",
              labels: ["Invoices to review", "3 pending payments", "Review invoices"],
            },
          },
          {
            type: "steps",
            title: "Four hierarchy adjustments to compare",
            steps: [
              {
                bold: "Size",
                text: "On a page with 16 px body text, try a 32 or 40 px main heading according to the content. Compare wrapping and the space left for useful data.",
              },
              {
                bold: "Weight",
                text: "A 14 px label in 600 can be distinguished from a value in 400 without changing field structure. Check that the loaded files contain those weights.",
              },
              {
                bold: "Distances",
                text: "Separate independent groups and keep a heading close to the content it introduces. Repeat the review with a long heading to examine the relationship.",
              },
              {
                bold: "Colour",
                text: "Assign roles to accent and status colours. Measure contrast, then check that commands remain understandable without relying on those colours alone.",
              },
            ],
          },
          {
            type: "quote",
            tag: "A quick hierarchy check",
            text: "Look at the screen from a distance or squint to locate the heading and primary action. Then return to real text to check readability and comprehension.",
          },
        ],
      },
      {
        id: "typography-without-guesswork",
        num: "02",
        tocLabel: "Typography",
        heading: "Typography: one family, six roles and eight sizes",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A type system can use one family while retaining distinct roles. This site uses Domine for headings, paragraphs, controls and code examples. Semantic roles describe the function of the text: Display/H1 for the page heading, H2 and H3 for sections, Body for sustained reading, Small for help and Micro for short annotations. Size tokens supply the values those roles consume. Keeping these concepts separate lets an H1 adapt to a phone without creating a new heading category, while retaining the same role in HTML. Weights should come from the files actually loaded; a missing weight may be simulated by the browser with a different result. Review the system on a populated page containing paragraphs, a form and a table. A specimen of isolated headings will not expose reading strain or density conflicts, and it rarely includes the long labels that appear after translation. The style-role name should not determine HTML heading level by itself. A card may reuse an H3 appearance while needing another level according to its position on the page. Document style and structure separately, then inspect the heading outline in the browser. This allows component reuse in an article or dashboard without skipping a navigation level for screen-reader users.",
            ],
            visual: {
              kind: "type",
              title: "One family, several roles",
              caption: "Domine stays the same; size, weight and rhythm change.",
              labels: ["Heading · 24 px", "Body · 16 px", "Caption · 12 px", "1,024.00 · 999.00"],
            },
          },
          {
            type: "h3",
            text: "Choose a scale and tune reading rhythm",
          },
          {
            type: "explanation",
            paragraphs: [
              "The scale used here contains eight sizes: `12`, `14`, `16`, `20`, `24`, `32`, `40` and `64 px`. A 16 px base and an indicative ratio of 1.25 can guide an initial choice, but these values do not come from repeatedly rounding one formula. Their value lies in being named and reused. A heading component can range from 40 to 64 px as space permits; a caption keeps its role even when its content changes length. Set line height and reading width with the chosen family. A 16 px paragraph may need more line spacing when it contains technical terms and links. Try the values on a filled page, then examine wrapping and the gaps between sections. Any exception added to the system should address an identified need and be documented in the relevant component, so it can be reconsidered when the surrounding layout changes.",
            ],
            visual: {
              kind: "spacing",
              title: "A deliberate scale",
              caption: "Roles use named sizes, not eight different fonts.",
              labels: ["Body · 16 px", "Subheading · 24 px", "Heading · 40–64 px"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Number alignment requires checking the font as well as the stylesheet. `font-variant-numeric: tabular-nums` selects equal-width digits when the family provides that OpenType feature. Domine lacks it in the files used here, so the property alone leaves amounts shifting according to the digits displayed. The site's `TabularText` component places each digit in a `0.7em` cell while retaining Domine glyphs and the copied string. Compare `1,111.00` and `8,888.00` in the same column to inspect the result. Decimal separators, negative signs and currency symbols also need a consistent convention. Right-aligning a numeric column helps compare amounts, but the currency and period still need to be explained. Finally, review zoomed text and copy the values into a spreadsheet to check that the visual adaptation has preserved the data. An alignment solution that changes what is copied would introduce a more consequential problem than the one it was intended to solve.",
            ],
            visual: {
              kind: "type",
              title: "Check the digits",
              caption: "Equal-width cells align Domine’s proportional digits.",
              labels: ["Amounts", "1,111.00", "8,888.00", "Equal width per digit"],
            },
          },
          {
            type: "table",
            caption: "6 semantic roles mapped to 8 tokens: the sizes below are this article’s documented choices.",
            headers: ["Semantic role", "CSS size", "Line height and tracking", "Selected use"],
            rows: [
              [
                "Display / H1",
                "40 or 64 px",
                "1.05–1.10 · -0.03em",
                "One H1 per page; fluid sizing possible between these bounds",
              ],
              ["H2", "32 px", "1.15–1.22 · -0.02em", "Major sections"],
              ["H3", "20 or 24 px", "1.30 · -0.015em", "Subsections and card headings"],
              ["Body", "16 px", "1.55–1.65 · normal", "Running prose; test reading measure"],
              ["Small", "14 px", "1.45 · normal", "Labels, help and table cells"],
              ["Micro", "12 px (floor)", "1.40 · +0.04em", "Short badges and timestamps"],
            ],
          },
        ],
      },
      {
        id: "colour-60-30-10-8pt-grid",
        num: "03",
        tocLabel: "Colour and spacing",
        heading: "Give colours and spacing a purpose",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A palette should name the use of colours before assigning values. The page background, card surface, secondary text and primary button have different functions even when two share a hue. The 60/30/10 reference can help discuss the space occupied by large surfaces and an accent; it does not define a pixel-by-pixel quota or establish usability. To review the system, list the pairs actually displayed: text on a card, help below a field, button text and an error on its surface. Measure contrast after transparency and overlays are applied, since a colour readable on the page background can fail on a lighter card. The roles also need values in both themes and in hover or focus states. Keeping this list makes a palette change reviewable component by component, including components that would otherwise be easy to miss because they appear only after an error.",
            ],
            visual: {
              kind: "colour",
              title: "Assign colour roles",
              caption: "A palette starts with the purpose of each colour.",
              labels: ["Surface", "Text", "Action", "Confirmation"],
            },
          },
          {
            type: "h3",
            text: "Distinguish status from commands without colour alone",
          },
          {
            type: "explanation",
            paragraphs: [
              "A status treatment needs to communicate its meaning and remain distinguishable from a command. A green Paid badge and a green button of the same shape can make it unclear which is interactive. Wording, shape and icons provide other cues: a failed payment can show an alert symbol and explanation while the recovery action remains an identified button. Status must not depend solely on red and green. A grayscale review can expose some ambiguities, but also examine accessible names and messages sent to assistive technologies. Measure contrast on the surface used by the component, including a tinted background. Disabled states require a separate decision about whether a control should remain present and how its unavailability is explained. Applying opacity without reviewing the result can make information needed for the next action difficult to read, especially in help text placed alongside the unavailable control.",
            ],
            visual: {
              kind: "feedback",
              title: "Meaning beyond colour",
              caption: "Icon and text make each status recognisable.",
              labels: ["Payment declined", "Use another card", "Payment confirmed"],
            },
          },
          {
            type: "h3",
            text: "Three levels of spacing",
          },
          {
            type: "explanation",
            paragraphs: [
              "Spacing describes relationships between elements. A card heading should remain close to the content it introduces, while a larger gap may separate the card from page-level actions. A scale such as `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px` provides shared values, but does not choose those relationships for you. Distinguish internal component gaps, gutters between groups and margins between major sections. On a customer record, keep the address near the customer's name and allow more space before the button group. Then try removing a border: grouping should remain understandable through distance and headings. Optical adjustments may require a half-step; explain them within the component rather than creating isolated values that nobody knows how to reuse. Repeat the review with wrapped headings and missing optional data, since both can change the apparent relationship between neighbouring groups.",
            ],
            visual: {
              kind: "spacing",
              title: "Three distances, three relationships",
              caption: "Related elements stay closer together.",
              labels: ["8 px · icon and text", "24 px · card padding", "64 px · sections"],
            },
          },
          {
            type: "list",
            heading: "Spacing examples by relationship",
            items: [
              {
                bold: "Internal: 4, 8 or 12 px",
                text: "The gap between a button icon and text, or a label and its field. Select a shared value for components serving the same function.",
              },
              {
                bold: "Structure: 16, 24 or 32 px",
                text: "Card padding or gutters between field groups. A card might use 16 px on mobile and 24 px as available width increases.",
              },
              {
                bold: "Sections: 48, 64 or 96 px",
                text: "Distance between independent groups on a page. Review actual headings and paragraphs before removing a divider.",
              },
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "spacing",
              title: "Spacing that shows relationships",
              caption: "Keep a heading close to the content it introduces; separate independent groups more clearly. Illustrated distances are not drawn to scale.",
              labels: ["Internal · 4 / 8 / 12 px", "Structure · 16 / 24 / 32 px", "Sections · 48 / 64 / 96 px"],
            },
          },
          {
            type: "h3",
            text: "Check the layout at 375 and 320 px",
          },
          {
            type: "explanation",
            paragraphs: [
              "Responsive design reorganises content around the available space and the tasks that must remain possible. Starting with one column at `375 px` forces decisions about reading order and access without hover. Reviewing at `320 px` then exposes wrapping problems in buttons, dates and field groups. A sidebar can become a menu if the destinations remain understandable. A table can scroll within a named, keyboard-accessible region; converting it to cards is appropriate only when the comparisons between rows remain possible. Also test zoom, translated labels and the mobile keyboard. The active field, its error and the next action need to remain reachable without forced lateral movement. Choose breakpoints when the content needs them, then inspect intermediate widths. A layout can work at both ends and fail between them, particularly where a long label leaves a narrow column beside a fixed-width control.",
            ],
            visual: {
              kind: "responsive",
              title: "Adapt columns to the available space",
              caption: "Reading priority stays the same as columns change.",
              labels: ["Wide", "Narrow"],
            },
          },
        ],
      },
      {
        id: "css-tokens-true-dark-mode",
        num: "04",
        tocLabel: "Tokens and themes",
        heading: "Create tokens for light and dark themes",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Tokens give a reusable name to a presentation decision. A primitive such as `--orange-600` describes a hue; a role such as `--color-accent` identifies its use in the interface. Components should consume the role so a theme can change its value without rewriting every button. Design Tokens 2025.10 is a final report of the Design Tokens Community Group, distinct from a W3C Recommendation; the CSS example below illustrates the organisation and is not a DTCG JSON file. Begin with a reference card containing a heading, help, a field and a button. Review its states in light and dark themes before extending the method to other components. Examine surfaces, illustrations and focus indicators alongside text. Inverting colours does not automatically preserve their meaning or contrast. Reading comfort also needs observation with people and the option to choose another theme, particularly for pages intended for sustained reading. A token change also needs a review of its consumers. Adjusting --color-muted to fix form help can affect timestamps, tables and chart captions. Find the consuming components and keep a reference page bringing those uses together. Naming should also support retiring a value that is no longer needed: if every screen retains its own alias after a correction, a palette can remain technically centralised while becoming hard to understand. Code review should examine added names and their references alongside the final screenshot.",
            ],
            visual: {
              kind: "tokens",
              title: "A value, a role, a use",
              caption: "The component uses the role; the theme changes its value.",
              labels: ["#c2320a", "--color-accent", "Primary button"],
            },
          },
          {
            type: "h3",
            text: "Four dark-mode settings to test with your readers",
          },
          {
            type: "doDont",
            doTitle: "Choices to try in the tokens",
            dontTitle: "Cases to inspect in the rendering",
            doItems: [
              "Keep #000000 as the OLED base and assign separate surface values to cards and modals.",
              "Try softened text, for example #ECEEF4, and gather feedback on a complete passage.",
              "Choose each theme’s accent with its background and button-text colour in view.",
              "Measure secondary text on every surface level, including layered cards.",
            ],
            dontItems: [
              "Text that passes contrast but is uncomfortable for some readers: provide a theme choice.",
              "A black shadow invisible on a dark card: examine the need for a border or another surface.",
              "An accent copied from the light theme without measuring its new contrast pairs.",
              "Global CSS inversion that also changes photos, logos and status colours.",
            ],
          },
          {
            type: "diagram",
            visual: {
              kind: "themes",
              title: "Two themes, the same roles",
              caption: "Background, card, text and action change values, not functions. Measure contrast and try reading in both themes.",
              labels: ["Light", "OLED"],
            },
          },
          {
            type: "copyable",
            label: "tokens.css — colour, typography, spacing and themes",
            langTag: "css",
            code: `/* UX/UI Playbook 2026 — tokens.css (starting foundation for a web or SaaS product) */
:root {
  /* 1. Light Mode Surfaces & Ink (measure pairs on the surfaces you use) */
  --color-bg:             #FFFFFF;
  --color-surface-1:      #F4F1EA;
  --color-surface-2:      #EAE5DA;
  --color-text:           #101319; /* > 16:1 on bg */
  --color-text-2:         #343A46; /* > 10:1 on bg */
  --color-muted:          #5B6170; /* ≥ 5.2:1 on surface-1 */
  --color-line:           #DFDBD0; /* decorative */
  --color-control-line:   #737987; /* meaningful controls */

  /* 2. Action accent and status colours */
  --color-accent:         #C2320A;
  --color-accent-hover:   #A62806;
  --color-on-accent:      #FFFFFF;
  --color-success:        #137347;
  --color-warning:        #9A5B00;
  --color-danger:         #C62828;
  --color-info:           #2C5CE6;

  /* 3. Three Spacing Tiers (Internal / Structural / Macro) */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-6: 24px;  --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* 4. Radii, 6 Semantic Roles, 8 Size Tokens */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --font-body: "Domine", Georgia, serif;
  --font-display: var(--font-body);
  --font-mono: var(--font-body);
  --text-xs: 12px;  --text-sm: 14px;  --text-base: 16px; --text-lg: 20px;
  --text-xl: 24px;  --text-2xl: 32px; --text-3xl: 40px;  --text-4xl: 64px;

  /* 5. Motion Tokens */
  --dur-fast: 120ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:  cubic-bezier(0.4, 0, 1, 1);
}

/* Dark Mode: elevation = lightness + softened ink + lifted accent */
[data-theme="dark"] {
  --color-bg:             #000000;
  --color-surface-1:      #131720;
  --color-surface-2:      #1B202C;
  --color-text:           #ECEEF4; /* softened ink; test comfort */
  --color-text-2:         #B4BCCB;
  --color-muted:          #8E96A8; /* ≥ 4.6:1 verified on surface-2 */
  --color-line:           rgba(255, 255, 255, 0.10);
  --color-control-line:   #8E96A8;

  --color-accent:         #FF6B47;
  --color-accent-hover:   #FF8566;
  --color-on-accent:      #0B0D12;
  --color-success:        #24D18A;
  --color-warning:        #F5B544;
  --color-danger:         #FF6B6B;
  --color-info:           #6EA0FF;
}

/* System preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
            note: "Load Domine from your local font files, then adapt these tokens. Measure each colour pair on the surfaces actually used.",
          },
          {
            type: "inlineCta",
            title: "Token files and templates in the archive",
            text: "The Playbook archive includes tokens.css, tokens.json and editable templates, with 13 before/after prototypes and 11 platform spreads in the manual.",
            buttonLabel: "Get the EN files · $29",
          },
        ],
      },
      {
        id: "microcopy-motion-rtl",
        num: "05",
        tocLabel: "Words, motion and RTL",
        heading: "Write messages and prepare motion and translation",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Components contain language and behaviour decisions that a static mockup only partly reveals. A send button needs to identify the expected result, an error needs to explain whether input was preserved and a modal needs a focus destination when it opens. Translation and motion affect these decisions too. A short English label may wrap onto two lines in French; an animated close can unnecessarily delay returning to a form if the implementation waits for a transition to finish. Prepare these variants within components reused across screens. A reviewer can then try long wording, reduced animation and another reading direction before these constraints become late changes to the project. The three topics below need distinct checks, because correcting layout does not establish that a message is useful or keyboard interaction works. Keep the behaviour described with the component so the same issue does not have to be rediscovered on every page.",
            ],
            visual: {
              kind: "feedback",
              title: "Words are part of the UI",
              caption: "Explain the situation and offer a way forward.",
              labels: ["Sending interrupted", "Your text is saved", "Try sending again"],
            },
          },
          {
            type: "h3",
            text: "1. Microcopy: name the outcome",
          },
          {
            type: "explanation",
            paragraphs: [
              "Microcopy needs to provide enough information to choose an action and understand its consequences. Save changes explains the button's operation; Confirm may work only when the object being confirmed is obvious from the context. Help text is useful when it supplies a format, delay or consequence that will not fit in the label. It adds little when it merely repeats an instruction to click. In a form, keep the label visible during entry and put an error explanation near the affected field. This email is already in use needs an appropriate route forward, such as signing in or choosing another address. The wording must also explain what happened to the data: knowing that an unsent message has been preserved changes the next decision. The table's examples support discussion of these behaviours; each proposed label must correspond to actions and information actually available in the product.",
            ],
            visual: {
              kind: "compare",
              title: "Name the outcome",
              caption: "The label explains what changes after the click.",
              labels: ["Submit", "Save changes"],
            },
          },
          {
            type: "table",
            caption: "Example labels to adapt to the available operations",
            headers: ["Context", "Text needing clarification", "Example wording"],
            rows: [
              ["Save button", "Confirm", "Save changes"],
              ["Destructive confirmation", "Delete", "Delete this project and its 42 files — if that count is accurate"],
              ["Existing address", "Error 422", "This email is already in use. Sign in or choose another address."],
              ["Data loading", "Please wait…", "Loading invoices… Add a time estimate only if it is known."],
              ["Synchronisation", "Bidirectional sync", "Edits sync across your devices. Explain actual delays and limits."],
            ],
          },
          {
            type: "h3",
            text: "2. Motion: explain a change",
          },
          {
            type: "explanation",
            paragraphs: [
              "Motion can indicate where a panel came from or help someone follow a moved object, but its duration and usefulness need testing in the component concerned. Values such as `120 ms` for press feedback and `250 ms` for a panel are starting examples, without the status of universal thresholds. Prefer `transform` and `opacity` where they meet the need, to avoid unnecessary layout work. Opening and closing must continue to function when animation is reduced. A modal should receive focus, announce its title and return focus to the opener independently of an animation-end event. With `prefers-reduced-motion: reduce`, remove non-essential travel while retaining state changes and their messages. Review repeated actions too: an effect that seems acceptable once may slow work involving dozens of openings of the same panel. Include interruption during the transition so a rapid second action cannot leave a hidden control focused or an overlay stuck on screen.",
            ],
            visual: {
              kind: "motion",
              title: "Prepare for reduced movement",
              caption: "Example timings; this diagram is deliberately static.",
              labels: ["Press · 120 ms", "Panel · 250 ms", "Reduced · no movement"],
            },
          },
          {
            type: "h3",
            text: "3. Internationalisation: prepare reading direction",
          },
          {
            type: "explanation",
            paragraphs: [
              "Internationalisation requires preparing for content length and reading direction. Logical properties such as `margin-inline-start`, `padding-inline-end` and `text-align: start` adapt spacing to direction without duplicating every style rule. They do not settle directional icons, mixed-script content or number formatting. A logo and a video-play symbol should not be mirrored simply because the page becomes RTL; examine a navigation arrow according to its meaning. Prepare examples with a long name, an email address, a date and an amount. Check wrapping, selection and copying for each item. Buttons need room to grow or wrap without concealing a neighbouring command. These tests provide more reliable information than a width allowance assumed to cover every language. A translated label may also change the apparent grouping, so include whole forms and navigation areas rather than inspecting words in isolation. Sometimes the constraint comes from data rather than translation. An order reference without spaces may need different wrapping from the paragraph beside it. Character order in an address or identifier matters for copying and verification. Keep the full content available and choose behaviour within the relevant component. Global truncation applied to hide overflow can conceal the very part distinguishing two records.",
            ],
            visual: {
              kind: "direction",
              title: "Think in start and end",
              caption: "Logical properties follow the reading direction.",
              labels: ["LTR · start on the left", "RTL · start on the right", "padding-inline-start"],
            },
          },
        ],
      },
      {
        id: "one-page-dev-handoff",
        num: "06",
        tocLabel: "Components and handoff",
        heading: "Prepare components and their handoff",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A handoff records the decisions implementation needs. For recurring components, document visible states, keyboard order and responses to missing or long content. A starting set can include a button, labelled field, checkbox, radio, switch, select, card, modal, alert, tabs, table and loading skeleton. Phrase important behaviour so it can be observed. Escape closes the modal and returns focus to its opener gives someone a scenario to test; accessible modal does not supply that scenario. The template below links a screen's structure to the tokens it uses and the incidents it must handle. Add links to components and review decisions, then identify questions that remain unresolved. The developer can request a decision rather than silently choosing behaviour missing from the mockup. Keep the handoff updated when an implementation constraint changes the agreed interaction, so the document and the delivered screen continue to describe the same operation.",
            ],
            visual: {
              kind: "handoff",
              title: "Hand over decisions",
              caption: "Connect the component to the cases that need implementing.",
              labels: ["Structure and order", "Tokens in use", "States and interactions", "Tests and edge cases"],
            },
          },
          {
            type: "copyable",
            label: "Example handoff for a payment screen",
            langTag: "markdown",
            code: `# HANDOFF — Payment screen example

## 1. Structure and responsive behaviour
- Container: max-width 1200px; padding var(--space-8) desktop, var(--space-4) mobile.
- From 1024px: minmax(0, 1.6fr) minmax(0, 1fr) columns, with a token-based gutter.
- Below 1024px: one column; collapsible summary before the form.
- Try the final button and active field with the mobile keyboard open.

## 2. Tokens used
- Action: --color-accent; hover: --color-accent-hover; text: --color-on-accent.
- Fields: --color-control-line; focus visible and unobscured in both themes.
- Spacing: project scale; document any necessary exceptions.

## 3. Payment states
1. Idle: supported methods displayed; initial selection justified.
2. Focus: logical order and access to every field and payment method.
3. Input error: message linked to its field with aria-describedby; correction available.
4. Sending: announced state; duplicate operations prevented in the UI and server.
5. Decline: preserve permitted data; identify available recovery options.
6. Success: persistent confirmation with an accessible amount and reference.

## 4. Review scenarios
- Use the keyboard: contact details → method → final action, according to required fields.
- On invalid submission, announce errors and guide correction.
- Name the summary with <aside aria-labelledby="summary-heading">.
- Try translations and long labels at 320px, without an assumed expansion allowance.
- Recover after network loss without resending a payment whose status is unknown.
- Record executed commands, results and checks still needed.`,
            note: "Add links to components, mockups and test results. Values in this template are example choices to adapt to the product.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How should OLED dark-mode reading comfort be examined?",
        a: "Keep #000000 if it is the product’s chosen base, distinguish surfaces and measure contrast pairs. Then have someone read a complete passage with links and form help under the expected conditions. Softened text can be tried without promising halo-free reading for everyone. Keep a light-mode choice available.",
      },
      {
        q: "Can a placeholder replace a field label?",
        a: "A placeholder disappears during entry and cannot replace a linked visible label. Necessary instructions should remain available, for example below the control and associated through aria-describedby. Useful text remains subject to the applicable contrast requirements; 4.5:1 is the body-text threshold. Check the actual background and field states.",
      },
      {
        q: "How can a 4 and 8 px spacing scale be used?",
        a: "In this article’s example, 4, 8 and 12 px support internal gaps, while 16, 24 and 32 px organise cards and groups. This supplies shared vocabulary and can be adapted. Relationships matter as much as values: a heading needs to remain associated with its content when that content changes length.",
      },
      {
        q: "Are logical properties enough for an RTL interface?",
        a: "They adapt text-related directions through properties such as margin-inline-start and text-align: start. Directional icons, numbers and mixed-script data still need review. Try an email address, date and long names within complete components. A fixed allowance for extra width cannot guarantee readable translations.",
      },
    ],
    ctaTitle: "Reusable tokens and templates",
    ctaText: "The English edition of UX/UI Playbook includes the 139-page book, a 26-page printable kit and an archive of 21 working files.",
    ctaBullets: [
      "English book with annotated screen examples",
      "12 A4 worksheets for briefing, auditing and handoff",
      "Tokens, templates, rules and a Python scanner in the archive",
    ],
    entityDefinition: "User interface design defines a product’s visual hierarchy and interactive components: typography, colour, spacing and states. A design system stores these decisions in reusable tokens and components.",
    references: [
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "1.4.3: body text 4.5:1, large text 3:1. 1.4.11: meaningful controls and graphical information 3:1.",
      },
      {
        title: "Understanding SC 2.5.8: Target Size (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
        publisher: "W3C WAI",
        date: "WCAG 2.2",
        note: "The web AA minimum is 24 × 24 CSS px with exceptions; the Playbook recommends 44 × 44 px here.",
      },
      {
        title: "Design Tokens Format Module 2025.10",
        url: "https://www.designtokens.org/tr/2025.10/format/",
        publisher: "Design Tokens Community Group",
        date: "2025-10-28",
        note: "Stable final community report for exchanging tokens; do not describe it as a W3C Standard.",
      },
      {
        title: "The WebAIM Million — 2026 report",
        url: "https://webaim.org/projects/million/",
        publisher: "WebAIM",
        date: "2026-02",
        note: "Low contrast is among the most common automatically detected errors in this sample.",
      },
    ],
  },
  {
    slug: "product-design-ai-agents",
    category: "Product Design",
    icon: "settings",
    readTime: "About 20 min read",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    ogImage: "/og-article-product-en.jpg",
    metaTitle: "Product Design and AI Agents | UX/UI Playbook",
    metaDescription: "Scope your product before coding: a 5-file AI pipeline, AGENTS.md, 3 prompts, agent permissions and reports separating check method, severity and outcome.",
    keywords: [
      "Product Design for developers",
      "AGENTS.md Claude Code Cursor UI",
      "deterministic AI UI pipeline",
      "agentic interface UX patterns",
      "SaaS dashboard pricing page design",
      "freelance design pricing formula",
      "one page client proposal",
    ],
    title: "Product Design: Scope Your Product and Guide AI Agents",
    subtitle: "Define scope, record decisions and prepare reviews of generated code. A five-file pipeline, three prompts, and examples of permissions and project proposals.",
    aeoSummaryTitle: "At a glance",
    aeoSummary: "This workflow records decisions in five files: brief.md, screens.md, wireframe.html, review.md and handoff.md. AGENTS.md and tokens.css provide shared constraints. Three prompts separate specification, construction and review; the team remains responsible for unresolved scope questions. Reports distinguish check method, severity and outcome, using Automated / To verify / Not applicable statuses. Research, permission and proposal examples need adapting to risk, the people concerned and available data.",
    keyStats: [
      {
        value: "3 statuses",
        label: "Automated / To verify / Not applicable; severity and outcome stay separate",
        source: "Example check report",
      },
      {
        value: "2 hours",
        label: "Example research timebox: 45-minute brief then 75-minute field check, adapted to risk",
        source: "Example short research plan",
      },
      {
        value: "6 patterns",
        label: "Clarification, plan, scope, permissions, log and summary",
        source: "Microsoft HAX · Google PAIR",
        url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
      },
    ],
    sections: [
      {
        id: "who-decides-what-sequence",
        num: "01",
        tocLabel: "Product, UX and UI",
        heading: "Separate product, UX and UI decisions",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A feature request contains several kinds of decisions, even when one person handles the whole project. For an invoice export, product work identifies the people concerned, the exported data and the reason for building the feature now. UX work describes period selection, information to verify and recovery after failure. UI work makes those operations readable and defines the states of the controls. These decisions can inform one another: trying a journey may reveal an access right missing from the initial scope. Distinguishing them helps establish which question is being discussed and who can resolve it. A request for another button should not be treated only as a graphic adjustment if it introduces an operation, permission or support responsibility. The brief needs to retain those changes and their approval so that later reviews can distinguish the agreed feature from an implementation assumption.",
            ],
            visual: {
              kind: "roles",
              title: "Three different questions",
              caption: "Scope, journey and presentation decisions inform one another during review.",
              labels: ["Product · what and why?", "UX · which journey?", "UI · which presentation?"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "An initial mockup provides material for discussion, but its detail should match the decisions already made. If the audience, roles and billing model are uncertain, a highly polished page can redirect attention to details that will later be reworked. Start with a diagram or wireframe showing the proposed content and commands. Ask the team to identify accepted decisions and open questions: who can invite a colleague, when a card is charged or how an archived project is found. Record agreement on those behaviours in a document the team can access. When a request follows that agreement, its effect on screens and the schedule can be examined. The structure can still change; the change becomes an explicit decision with an estimate and date instead of being absorbed as an unexplained graphic correction. This also makes it easier to identify which earlier approvals need to be revisited.",
            ],
            visual: {
              kind: "scope",
              title: "Agree before polishing",
              caption: "Agree on a specific decision, not an overall impression.",
              labels: ["Brief agreed", "Structure reviewed", "Style applied"],
            },
          },
          {
            type: "quote",
            tag: "Example approval milestone",
            text: "Scope and journeys are reviewed before visual presentation. The written agreement records accepted decisions and open questions; a later request receives an estimate of its effect on deliverables and schedule.",
          },
        ],
      },
      {
        id: "two-hour-brief-saas-pricing",
        num: "02",
        tocLabel: "Research and SaaS screens",
        heading: "Frame the need, dashboard and pricing",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "A short research session is useful when it addresses a limited question and the necessary people or records are available. The two-hour example here allocates forty-five minutes to framing and seventy-five to interviews or document review. Recruitment and access arrangements may take additional time outside that session. In the brief, identify the task, the relevant population and the decision the team wants to make. Interviews should concern an actual episode: how an invoice was last corrected, which documents were used and when another person became involved. Support tickets and comparable products add context, but cannot replace those accounts. Finish with a note separating observations, decisions and unanswered questions. Higher risk, incomplete access to users or conflicting findings justify extending the investigation. Keep that limitation visible in the recommendation so a short preparatory exercise is not later presented as market validation. The report can be organised by question rather than participant to support a decision, provided the original note remains traceable. If a ticket mentions data loss while an interview describes difficulty finding a document, do not merge them into one certain cause. The next step might be technical reproduction or a more focused session. This avoids commissioning a redesign for a defect whose mechanism has not yet been identified.",
            ],
            visual: {
              kind: "research",
              title: "A short research example",
              caption: "Adapt the timebox to the risk and access to participants.",
              labels: ["45 min · briefing", "45 min · interviews", "30 min · tickets and context"],
            },
          },
          {
            type: "steps",
            title: "Example allocation for a research session",
            steps: [
              {
                bold: "0–45 minutes: framing",
                text: "Name the task, relevant population, available records and intended decision. Identify the decision owner and assumptions not yet supported by observations.",
              },
              {
                bold: "45–90 minutes: prepared interviews",
                text: "With participants already recruited, three fifteen-minute conversations can document recent episodes. Ask about steps and difficulties, retaining notes without generalising to all users.",
              },
              {
                bold: "90–120 minutes: context and synthesis",
                text: "Consult comparable products and available support tickets. Record agreements and contradictions, then decide which questions need further research.",
              },
            ],
          },
          {
            type: "h3",
            text: "Dashboards and pricing pages",
          },
          {
            type: "explanation",
            paragraphs: [
              "Dashboard content should follow the decisions its users make. A manager reviewing outstanding invoices needs the relevant amount, period and records they can open to act. In the illustrative example €48.2k · +12.4% versus September, the comparison gives context to the value; it needs a defined period and a consistent calculation base. A chart is useful when a trend answers a question, while an actionable list helps find the invoices explaining the value. Three indicators can be a starting point for an initial mockup, but the number depends on the work. Check units, active filters and the last update time. If a data source is missing, the dashboard must identify what is incomplete without presenting zero as a real measurement. Access to the underlying records lets someone examine and handle the displayed results. Review this route as part of the dashboard rather than leaving it out of the initial specification.",
            ],
            visual: {
              kind: "dashboard",
              title: "A number that supports a decision",
              caption: "Illustrative data: value, change, period and a route to detail.",
              labels: ["€48.2k", "+12.4% · vs September", "View invoices"],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "A pricing page should let someone calculate the charge and choose a plan for a particular use. Put the unit beside the amount: per user, month, volume or operation. If a displayed price depends on annual payment, explain the total and charging frequency before commitment. When comparing Starter, Pro and Team, retain the same order of features and explain limits that change actual use, such as collaborator count or export access. Three columns are an example to adapt to the offers available. A highlighted plan needs a reason to choose it; a Popular badge requires supporting data. Test the page with a concrete scenario and ask what the relevant team would pay. Hesitation can expose missing units, conditions or distinctions. Include plan changes and cancellation in the specification as well, since an understandable purchase price leaves those later consequences unresolved.",
            ],
            visual: {
              kind: "pricing",
              title: "Make plans comparable",
              caption: "Keep benefits in the same order and use a consistent billing unit.",
              labels: ["Starter", "Pro", "Team", "Price per seat, per month"],
            },
          },
        ],
      },
      {
        id: "five-file-agent-pipeline",
        num: "03",
        tocLabel: "Files and prompts",
        heading: "Guide an agent with files and review gates",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "To delegate interface implementation, an agent needs to find the team's decisions and the questions still open. This pipeline distributes that information across five files: `brief.md` describes the need and scope, `screens.md` details journeys and states, `wireframe.html` makes the structure testable, `review.md` records defects and `handoff.md` prepares delivery. Shared rules in `AGENTS.md` and values in `tokens.css` apply across the stages without introducing new product decisions. For a payment screen, the inputs need to specify the amount, accepted methods, permissions and recovery after a decline. When information is missing, the expected output is a question to the team. Identify features added by assumption before visual review, because they may change scope and data handling. The reviewer should be able to trace an implemented control to its requirement and ask for an explanation when that link is absent.",
            ],
            visual: {
              kind: "pipeline",
              title: "Turn decisions into files",
              caption: "The next pass starts from written decisions, not a memory of the chat.",
              labels: ["brief.md", "screens.md", "wireframe.html"],
            },
          },
          {
            type: "diagram",
            visual: {
              kind: "pipeline",
              title: "The five-file pipeline",
              caption: "Each file records a reviewed decision. AGENTS.md and tokens.css provide constraints shared across the five stages.",
              labels: [
                "brief.md · goal",
                "screens.md · journey",
                "wireframe.html · structure",
                "review.md · changes",
                "handoff.md · delivery",
              ],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "Corrections affecting several screens should reach the file or component that governs them. If an agent uses several colours for the same action, correct the role in the tokens, explain its use in the instructions and search existing output for other occurrences. A change made only in the latest screenshot leaves other screens and future runs without a shared rule. The context file should point to project documents, define permitted actions and specify expected checks. Its length depends on the useful decisions it contains; a line limit cannot guarantee that a model follows instructions. After the correction, add a test or an example of the expected result, then request that check's outcome in the next review. Versioned files make the change reviewable and show when a rule was introduced, provided the review also examines the code actually delivered. An instruction file alone cannot enforce the behaviour it describes. When a changed rule affects behaviour, record affected screens and tests to rerun in the review file. A new deletion-confirmation requirement, for example, needs to reach the component, keyboard order and recovery scenario. Existing branch changes should be preserved and examined before generation. This reduces corrections that unintentionally replace another decision already approved by the team.",
            ],
            visual: {
              kind: "tokens",
              title: "Fix the shared rule",
              caption: "Put a recurring correction in the file that governs it.",
              labels: ["Recurring issue", "AGENTS.md / tokens.css", "Run the check again"],
            },
          },
          {
            type: "copyable",
            label: "Example AGENTS.md for an interface project",
            langTag: "markdown",
            code: `# AGENTS.md — Project interface instructions

## Documents to read
- tokens.css: selected colours, spacing, radii, sizes and durations.
- screens.md: task, entry, exit, states, edge cases and copy for each screen.
- Flag a missing decision before adding a feature or shared value.

## Rules for this project
- Use supplied content; identify examples and fabricate no testimonials.
- Useful text ≥ 12px, body ≥ 15px; review complete passages for readability.
- Labels describe actions; visual priority fits the task.
- Prepare empty, loading, ideal, partial/overflow and error states; confirm success.
- Use logical properties where spacing follows reading direction.

## Accessibility and checks
- Visible labels linked to fields; accessible names for icon buttons.
- Web target aim: 44 × 44 CSS px, a project choice above the AA minimum with exceptions.
- Contrast: body text ≥ 4.5:1; meaningful non-text elements ≥ 3:1 on actual backgrounds.
- Test keyboard access, focus, modal closing and reduced motion.
- Record commands actually available here: [typecheck], [build], [tests].

## Run report
- List changed files, executed commands, results and open questions.
- Distinguish observations, assumptions and remaining work, with evidence links.
- For the checklist: Automated / To verify / Not applicable; severity and outcome separate.
- Do not report a check as passed if it was unavailable or not executed.`,
            note: "Adapt paths, rules and commands to the repository. Check the instruction format your tool recognises: AGENTS.md, CLAUDE.md and Cursor rules are not interchangeable without review.",
          },
          {
            type: "h3",
            text: "Three prompts for three stages",
          },
          {
            type: "explanation",
            paragraphs: [
              "Separating specification, construction and review makes it possible to examine decisions while they remain relatively inexpensive to change. The first prompt produces a screen list from the brief and flags functional questions. The second turns that list into testable HTML with the intended content and states. A grayscale presentation focuses this review on order and interaction, even when spacing tokens are already used. The third prompt prepares a report linking each defect to a rule, reproduction scenario and proposed correction. None of these stages should automatically approve the next: the team can reject an incomplete screen or reopen a brief question. Test commands and results need to accompany the review so an executed check is distinguishable from a suggestion. The three templates below describe expected inputs and outputs; adapt them to the repository and its verification facilities rather than assuming the named tools are already configured.",
            ],
            visual: {
              kind: "research",
              title: "Three review gates",
              caption: "Review each stage before moving to the next.",
              labels: ["Specify the screens", "Build in grayscale", "Review and hand over"],
            },
          },
          {
            type: "copyable",
            label: "Three prompt templates for specification, construction and review",
            langTag: "text",
            code: `=== PROMPT 1: brief.md → screens.md ===
INPUT: brief.md.
Describe screens and tasks, entry/exit, data and supplied copy.
For each: empty, loading, ideal, partial/overflow, error and confirmation of actions.
Flag unspecified roles, permissions or features; do not invent them.
OUTPUT: screens.md and questions requiring decisions before construction.

=== PROMPT 2: screens.md → wireframe.html ===
INPUTS: screens.md, tokens.css, AGENTS.md.
Build semantic HTML with the agreed content and states.
Use project spacing; the wire class applies grayscale presentation.
Make states testable, for example through ?state=, without presenting sample data as real.
Try keyboard access and 390, 768 and 1280px widths; run available checks.
OUTPUT: wireframe-<screen>.html, commands and results, limits and remaining questions.

=== PROMPT 3: review and handoff ===
INPUTS: wireframe-<screen>.html, screens.md, tokens.css and available results.
Link each defect to code or a browser scenario that was reproduced.
Cite relevant WCAG criteria without inferring actual contrast or size from a token name alone.
Separate method, severity and outcome; leave unavailable checks marked To verify.
OUTPUTS: review.md with finding, evidence and fix; handoff.md with states and remaining tests.`,
            note: "Replace paths and commands for the project. Compare output with screens.md and retain test results; a prompt cannot establish that its requested checks ran.",
          },
          {
            type: "inlineCta",
            title: "Instructions and scanner in the archive",
            text: "The archive includes the AI Skill, agent_check.py scanner and 77 rules, alongside brief, review and handoff templates.",
            buttonLabel: "View the English edition · $29",
          },
        ],
      },
      {
        id: "agentic-interface-patterns",
        num: "04",
        tocLabel: "Agent controls",
        heading: "Keep control of agent actions",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Microsoft HAX and Google PAIR discuss understanding capabilities, recovering from errors and maintaining user control. The six patterns below are a design synthesis to adapt to the product's permissions and consequences. Before execution, show the resources the agent can access and the planned actions. Reading a draft, editing a document and sending an email may require different approvals. During execution, an understandable log identifies completed, pending and failed operations; it needs to describe actual activity rather than invented progress. A stop control should remain accessible and explain its limits. If an email has already been sent, stopping the next task does not recall it. The final report therefore needs to show what executed, which changes can be reversed and which operations still require a decision, with access to the affected results. Review those recovery paths when designing the permission model, since a confirmation screen cannot undo an operation the underlying system treats as final. A useful test interrupts a sequence after its first write. The log should identify the changed document and show whether later steps began. If undo is offered, describe its scope: restoring an earlier version may overwrite edits made meanwhile by a colleague. Present those consequences before restoration and retain a checkable result afterward. This scenario requires technical input to distinguish what the system can reverse from what the interface can only explain.",
            ],
            visual: {
              kind: "permissions",
              title: "Match consent to risk",
              caption: "Keep scope visible and stopping available.",
              labels: ["Read · defined scope", "Write · explicit consent", "Delete · specific confirmation"],
            },
          },
          {
            type: "table",
            caption: "Six design patterns adapted from HAX and PAIR guidance",
            headers: ["Pattern", "Situation to address", "Behaviour to specify"],
            rows: [
              [
                "Clarification",
                "The request leaves a functional decision unresolved.",
                "Ask questions needed for safe execution and explain proposed assumptions.",
              ],
              [
                "Reviewable plan",
                "Someone needs to inspect actions before starting.",
                "Show steps and dependencies; allow changes where supported.",
              ],
              [
                "Visible access",
                "Authorised resources are unclear.",
                "Name files, services and access limits; allow permission removal and explain its effect.",
              ],
              [
                "Risk-based permissions",
                "Actions differ in consequence and reversibility.",
                "Define consent for reading, writing and external or destructive actions; confirm consequential operations as the product requires.",
              ],
              [
                "Log and stop",
                "A long operation needs to remain observable and controllable.",
                "Show actual actions with state and outcome; keep stopping accessible and explain what can no longer be undone.",
              ],
              [
                "Consultable result",
                "Output combines completed operations, assumptions and failures.",
                "Link the report to changed items; identify performed checks, uncertainty and remaining work.",
              ],
            ],
          },
        ],
      },
      {
        id: "verifying-ai-three-statuses",
        num: "05",
        tocLabel: "Checking the output",
        heading: "Separate check method, severity and outcome",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Verification of a generated interface needs to identify the data examined and the defects each method can detect. Code analysis can find a missing label, while browser checks measure composited colours and an element's actual position. Keyboard testing exposes other problems, such as focus trapped behind a modal or a button covered by a fixed bar. Prepare these checks for the screen's states, both themes and varying content lengths. For each failure, keep the command or scenario used and the location where the defect appeared. After correcting it, rerun the case and examine components sharing the changed rule. Understanding an offer and recovering from an error also need observation with people. The final report should identify those remaining checks without borrowing the result of a technical scan. A build that compiles establishes a narrower fact than a journey someone can complete, so retain both results under their own methods.",
            ],
            visual: {
              kind: "checklist",
              title: "Check the actual rendering",
              caption: "A successful build does not replace a test journey.",
              labels: ["Read the code", "Open both themes", "Use the keyboard", "Try an error state"],
            },
          },
          {
            type: "diagram",
            visual: {
              kind: "checklist",
              title: "From code to a complete task",
              caption: "A report records scope, method, failures and remaining checks; it does not claim the outcome of tests that have not been run.",
              labels: [
                "Structure and accessible names",
                "Contrast on actual backgrounds",
                "Keyboard, focus and closing",
                "Empty, long and error states",
                "Comprehension with real people",
              ],
            },
          },
          {
            type: "explanation",
            paragraphs: [
              "The report separates verification method, defect severity and observed outcome. The checklist used here has the statuses Automated, To verify and Not applicable. The first describes a rule decided by an executed check; the second flags a rendered measurement or judgement still required; the last needs a reason related to scope or platform. An automated contrast check can therefore have Blocking severity and a Failed outcome. It should stop delivery if that is the policy selected for the project. A non-applicable check is not a success, and an item awaiting review must not disappear because the build compiles. An agent's run summary can also distinguish verified work, assumptions and unfinished tasks, but should refer to the relevant commands and scenarios. These fields let another person resume the work without confusing the state of a check with the quality of the interface it examines.",
            ],
            visual: {
              kind: "report",
              title: "Three separate columns",
              caption: "An automated check can fail and block a release.",
              labels: ["Method", "Severity", "Outcome", "Automated", "Blocking", "Failed"],
            },
          },
        ],
      },
      {
        id: "design-as-revenue-pricing-scope",
        num: "06",
        tocLabel: "Decisions and budget",
        heading: "Explain decisions and price the scope",
        blocks: [
          {
            type: "explanation",
            paragraphs: [
              "Present a design decision with the observed problem, proposed change and a way to examine its effect. On a phone, a screenshot may show the keyboard covering the payment button. The proposal can describe a placement that keeps the active field and action reachable, followed by a review scenario with the keyboard open. The commercial effect remains to be measured after delivery for a defined period and population. If prices, acquisition or the form changed at the same time, the entire conversion-rate movement cannot be attributed to the button's placement. In a meeting, state the decision needed and the constraints still requiring agreement, particularly timing and technical dependencies. The written record should explain why the option was selected. A disagreement can retain the risks discussed and the decision owner without turning the note into a judgement about their competence or predicting how they will behave in future work.",
            ],
            visual: {
              kind: "journey",
              title: "Explain a decision",
              caption: "Keep an expected effect separate from a measured result.",
              labels: ["Screen observation", "Proposed change", "Expected effect", "Post-release measure"],
            },
          },
          {
            type: "h3",
            text: "Calculate a price with your own assumptions",
          },
          {
            type: "explanation",
            paragraphs: [
              "A project's price depends on available time, costs and the work actually included. Begin with billed days over several months, separating production from prospecting, administration and periods without a contract. The twelve billable days per month, 30% margin and 20% contingency sometimes used in a simulation are assumptions to replace with your records. For a project, `Price = Estimated days × Day rate + Risk reserve + Tools` makes the included work explicit. Add dependencies such as client-supplied content, environment access and approval dates. A request for another screen can move the schedule even when the drawing looks simple. If the budget falls, discuss which deliverables can be deferred and the effect on the journey before changing the price. The proposal should then record the agreed scope, exclusions and process for additional requests. Update the estimate when those assumptions change rather than treating the first calculation as a permanent commitment. The risk reserve should relate to named uncertainties, such as an undocumented integration or external approval. If those risks occur, project tracking lets you compare planned and actual time and improve the next estimate. Separate the internal calculation from the proposed price: the offer primarily needs to explain deliverables, conditions and the agreed payment stages.",
            ],
            visual: {
              kind: "scope",
              title: "Price a defined scope",
              caption: "Make time, risk and tools explicit before agreeing.",
              labels: ["Estimated days × rate", "Risk allowance", "Tools and deliverables", "Total and exclusions"],
            },
          },
          {
            type: "doDont",
            doTitle: "Points to negotiate if the budget falls",
            dontTitle: "Commitments needing further review",
            doItems: [
              "Identify journeys that must remain complete and features that can be deferred.",
              "Define approval milestones and a payment schedule suited to the contract.",
              "Agree on a decision contact and a process for consolidated feedback.",
            ],
            dontItems: [
              "Reduce the price without recalculating time, costs and included deliverables.",
              "Accept a fixed fee without exclusions or a process for additional requests.",
              "Implement conflicting instructions received through several channels without a decision.",
            ],
          },
          {
            type: "copyable",
            label: "Example proposal and responses to change requests",
            langTag: "markdown",
            code: `# PROPOSAL — Example one-page structure
1. NEED: task, audience, observed problem and source of the observation.
2. DELIVERABLES: named screens and states, files, methods and assessment scope.
3. EXCLUSIONS: features, content and work not included; change-request process.
4. SCHEDULE: stages, dependencies and approvals expected from each party.
5. PRICE: amount, currency, assumptions and offer validity.
6. PAYMENT: agreed schedule; 40/30/30 is an example to negotiate.
7. AGREEMENT: required decision, contact and next date.

# EXAMPLE RESPONSES TO ADAPT
- Scattered feedback: I am consolidating requests in one document; can you resolve the conflicting points by [date]?
- New screen: This adds [work] to the agreed scope. I will estimate its cost and timing before including it.
- Missing approval: The next stage depends on your decision on [item]. Without a response by [date], we will need to revise the schedule.
- Uncertain choice: We can observe comprehension of both labels on [task]. Comparing rates would require another protocol.
- Unclear feedback: Which information is missing, or which action is difficult to find on this screen?`,
            note: "Adapt deliverables, amounts, dates and conditions to the contract. The A4 kit includes brief, proposal and handoff worksheets to fill in.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long should an AGENTS.md file be?",
        a: "Useful length depends on project decisions and how the tool loads its instructions. A line limit cannot guarantee that rules are followed. Identify reference files, observable rules, permitted actions and check commands. Remove duplication and contradictions, then examine behaviour on an actual task.",
      },
      {
        q: "When is a grayscale HTML wireframe useful?",
        a: "It helps when the team still needs to examine content order, fields and states. A browser already supports trying keyboard access, long text and breakpoints. The milestone cannot establish structural quality by itself: record decisions reviewed and questions left open. If the visual system is already settled, adapt the presentation to the project.",
      },
      {
        q: "How should billable days be chosen for a rate calculation?",
        a: "Use actual billed days over several months. Distinguish production from prospecting, administration and gaps between contracts, then include costs and tools. Twelve days per month is an example assumption to replace. Recalculate when scope, dependencies or schedule change.",
      },
      {
        q: "How should a disagreement about a client’s screen be handled?",
        a: "Describe the observed problem separately from the commercial effect you anticipate. Suggest an appropriate check: task observation for comprehension, a quantitative protocol to compare rates. If another option is selected, record the decision, risks discussed and decision owner. This helps track the project without guaranteeing either the outcome or the business relationship.",
      },
    ],
    ctaTitle: "A kit for your next project",
    ctaText: "The English edition of UX/UI Playbook includes the 139-page book, a 26-page printable kit and an archive of 21 working files.",
    ctaBullets: [
      "English book with annotated screen examples",
      "12 A4 worksheets for briefing, auditing and handoff",
      "Tokens, templates, rules and a Python scanner in the archive",
    ],
    entityDefinition: "Product design connects user needs, business goals and technical constraints to decide what to build and in which order. UX organises the journey; UI makes the interactions tangible. An AI agent works within that scope without replacing product judgment.",
    references: [
      {
        title: "Guidelines for Human-AI Interaction",
        url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/",
        publisher: "Microsoft Research · Amershi et al.",
        date: "2019",
        note: "18 guidelines validated through the CHI 2019 paper’s process; they do not prescribe the Playbook’s 6 patterns verbatim.",
      },
      {
        title: "People + AI Guidebook",
        url: "https://pair.withgoogle.com/guidebook/",
        publisher: "Google PAIR",
        date: "2024",
        note: "Living guide on needs, mental models, control and failure recovery; the patterns above are a practical synthesis.",
      },
      {
        title: "Web Content Accessibility Guidelines 2.2",
        url: "https://www.w3.org/TR/WCAG22/",
        publisher: "W3C",
        date: "2024-12-12",
        note: "Normative criteria to test; an axe-core pass is not enough to establish conformance.",
      },
      {
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng",
        publisher: "EUR-Lex · European Union",
        date: "2026-07-27",
        note: "Consolidated text: Art. 50 (duties and exceptions), 111(4) (2 December 2026 transition for certain existing systems) and 113 (application). Check the role and use concerned.",
      },
    ],
  },
];
