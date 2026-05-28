import type { ModelGuide, PromptTemplate } from "./types";

export const modelGuides: ModelGuide[] = [
  {
    model: "Opus",
    fullName: "Claude Opus",
    tagline: "The deep thinker — for hard, high-stakes work",
    useWhen: [
      "Reviewing long or dense documents (trust deeds, contracts, multi-page financials)",
      "Complex, multi-step reasoning or analysis",
      "Anything where a mistake is expensive — legal, tax, or financial judgment calls",
      "Hard troubleshooting (broken automations, multi-system problems)",
      "Research that needs synthesis across many sources",
    ],
    speedCost: "Slowest + priciest — worth it when quality matters most",
  },
  {
    model: "Sonnet",
    fullName: "Claude Sonnet",
    tagline: "The daily driver — your default for ~80% of work",
    useWhen: [
      "Drafting emails, memos, and status updates",
      "Summarizing documents and meetings",
      "Categorizing or organizing information",
      "Most everyday office tasks",
      "Content drafting (social posts, client notes)",
    ],
    speedCost: "Fast + balanced — the right default",
  },
  {
    model: "Haiku",
    fullName: "Claude Haiku",
    tagline: "The quick one — fast, cheap, high-volume",
    useWhen: [
      "Quick classifications (urgent vs. not; which department)",
      "Short rewrites or tone tweaks",
      "Simple Q&A and lookups",
      "High-volume, repetitive tasks where speed matters",
      "Quick acknowledgment drafts",
    ],
    speedCost: "Fastest + cheapest — great for bulk simple tasks",
  },
];

export const modelDecisionRule =
  "Default to Sonnet. Reach for Opus when the task is complex or the cost of being wrong is high. Drop to Haiku for simple, repetitive, high-volume work. When in doubt, start with Sonnet — you can always re-run a tough one on Opus.";

export const promptTemplates: PromptTemplate[] = [
  // ─────────────── Client Resource Specialist ───────────────
  {
    id: "crs-ar-call-prep",
    title: "Prep for an A/R collection call",
    forRoleIds: ["client-resource-specialist"],
    scenario:
      "Before calling a client about a 90-day-old balance, get talking points calibrated to their history.",
    prompt: `I'm about to call a client about an overdue balance. Here's the context:

- Client: [NAME]
- Amount overdue: [AMOUNT], [DAYS] days past due
- Payment history: [e.g., "usually pays 30-45 days late but always pays" OR "first time late"]
- Any relationship notes: [e.g., "sensitive about fees", "going through a hard quarter"]

Give me:
1. A 3-bullet summary of where things stand
2. A warm but clear opening line for the call
3. Two likely objections and how to respond to each
4. A specific next step to land before hanging up

Keep it friendly and professional — we want to keep the relationship.`,
    model: "Sonnet",
    modelReason: "Drafting + light judgment — Sonnet handles this fast.",
  },
  {
    id: "crs-doc-ack",
    title: "Quick 'we received your documents' acknowledgment",
    forRoleIds: ["client-resource-specialist", "tax-lead"],
    scenario: "A client just sent docs and you want to confirm receipt in 10 seconds.",
    prompt: `Write a short, warm acknowledgment email confirming we received a client's documents.

- Client: [NAME]
- What they sent: [e.g., "2025 W-2s and brokerage 1099s"]
- What's still outstanding (if any): [LIST or "nothing — we have everything"]
- Next step + rough timeline: [e.g., "we'll start the return this week"]

Under 80 words. Sign "Thanks, [MY NAME]". No corporate filler.`,
    model: "Haiku",
    modelReason: "Tiny, formulaic task — Haiku is instant and cheap.",
  },
  {
    id: "crs-checklist-status",
    title: "Turn messy notes into a clean client checklist status",
    forRoleIds: ["client-resource-specialist"],
    scenario:
      "You've got scattered notes on what's in/out for a client and need a clean status view.",
    prompt: `Here are my rough notes on a client's document status. Organize them into a clean checklist.

Notes:
[PASTE YOUR MESSY NOTES]

Output a table with columns: Item | Status (Received / Reviewed / Missing / N/A) | Date | Note.
Then below the table, list exactly what's still missing as a short bulleted "to chase" list I can paste into an email.`,
    model: "Sonnet",
    modelReason: "Light structuring of unstructured text — Sonnet's sweet spot.",
  },

  // ─────────────── Financial Advisor ───────────────
  {
    id: "fa-diagnose-automation",
    title: "Diagnose a broken automation or integration",
    forRoleIds: ["financial-advisor", "admin-manager"],
    scenario: "An automation is producing the wrong output and you need the root cause.",
    prompt: `Help me diagnose a broken automation. Be specific and don't guess.

CONFIGURATION (the rule/flow):
[PASTE THE STEPS OR SCREENSHOT DESCRIPTION]

EXPECTED OUTPUT:
[WHAT SHOULD HAPPEN]

ACTUAL OUTPUT (a real failing example):
[WHAT ACTUALLY HAPPENED]

Tell me:
1. Most likely root cause (reference the actual field names/values above)
2. The single cheapest test to confirm it
3. 2-3 fixes ranked by effort
4. What ELSE this same bug might be silently affecting
5. How I'd detect this class of failure within an hour next time, not whenever I happen to notice`,
    model: "Opus",
    modelReason: "Multi-step debugging across a system — Opus reasons deepest.",
  },
  {
    id: "fa-pressure-test",
    title: "Pressure-test a decision (steelman the opposite)",
    forRoleIds: ["financial-advisor", "strategy-lead", "legal-ops-director"],
    scenario: "You're leaning toward a decision and want it stress-tested before committing.",
    prompt: `I'm leaning toward [YOUR PLAN]. Steelman the strongest possible case AGAINST it — actually try to change my mind, don't be polite.

Cover:
- What evidence would tell me this is wrong?
- The most likely failure mode 12 months out
- Who would oppose this internally and what's their best argument
- The cheapest experiment I could run BEFORE committing to find out if I'm wrong

End with: "Here's the one question to answer before you go forward."`,
    model: "Opus",
    modelReason: "Adversarial reasoning + judgment — give it the strongest model.",
  },

  // ─────────────── Paralegal ───────────────
  {
    id: "para-social-3-angles",
    title: "Social media post — 3 angles",
    forRoleIds: ["paralegal", "strategy-lead"],
    scenario: "You need to post about a topic and want options to pick from.",
    prompt: `Draft social posts for BrookHaven about: [TOPIC].

Give me 3 different angles:
1. Educational (teach one useful thing)
2. Action (one specific thing the reader can do this month)
3. Story (a realistic, anonymized scenario — no real client details)

For each angle, give a LinkedIn version (200-400 chars + 3 hashtags) and a short version (under 200 chars).

Tone: friendly, professional, plain English. No fearmongering hooks, no buzzwords, one emoji max. We talk to people, not "individuals."`,
    model: "Sonnet",
    modelReason: "Creative drafting at volume — Sonnet is ideal.",
  },
  {
    id: "para-legal-summary",
    title: "Plain-English summary of a legal document",
    forRoleIds: ["paralegal", "legal-ops-director", "tax-lead"],
    scenario: "You were handed a dense document and need the gist fast.",
    prompt: `Read the attached document and give me a plain-English summary.

Produce:
1. **What is this?** (document type + purpose, one line)
2. **Parties involved** (names + roles)
3. **Key terms** (5 bullets max)
4. **Anything unusual or non-standard** I should flag for an attorney
5. **Deadlines or dates** that matter

Keep it under 250 words. Cite section numbers where relevant. Don't interpret ambiguous clauses — flag them as "ask the drafter."`,
    model: "Opus",
    modelReason:
      "Dense legal text + flagging non-standard clauses needs Opus's care. (Use Sonnet for short, simple docs.)",
    tip: "Drop the PDF straight into the chat — Claude reads multi-page PDFs natively.",
  },
  {
    id: "para-smart-reminders",
    title: "Build a smart, prerequisite-aware reminder list",
    forRoleIds: ["paralegal", "admin-manager"],
    scenario: "You want reminders that flag what's actually at risk, not just dates.",
    prompt: `Here are my upcoming deadlines and their current status:

[PASTE: item | due date | status | what it depends on]

Sort them by ACTUAL risk, not just date. For each, tell me:
- 🔴 At risk (deadline near AND a prerequisite isn't done) — say what specifically unblocks it
- 🟡 Watch (near but prerequisites done, not started)
- 🟢 On track

End with the single most important thing to do today.`,
    model: "Sonnet",
    modelReason: "Light reasoning over a list — Sonnet is plenty.",
  },

  // ─────────────── Tax Lead ───────────────
  {
    id: "tax-first-draft-email",
    title: "First-draft client email",
    forRoleIds: ["tax-lead", "client-resource-specialist"],
    scenario: "Replace the blank email window with a ready-to-edit draft.",
    prompt: `Draft a client email for me. Situation:

[DESCRIBE IN PLAIN LANGUAGE: who, what you need to say, any deadline, tone notes]

Rules:
- State the ask or update in the first sentence
- Short paragraphs, no "I hope this finds you well"
- Friendly but professional — BrookHaven voice
- Offer a specific next step
- Under 120 words
- Sign "Thanks, [MY NAME]" and end with "[edit anything in brackets before sending]"`,
    model: "Sonnet",
    modelReason: "Everyday drafting — Sonnet, fast.",
    tip: "Save this in a Claude Project with 3 of your real past emails so it nails your voice.",
  },
  {
    id: "tax-extract-source-doc",
    title: "Extract numbers from a tax source document",
    forRoleIds: ["tax-lead", "accounting-lead"],
    scenario: "Pull the figures off a K-1, 1099, or brokerage statement into a clean table.",
    prompt: `Read the attached tax document and extract every value that feeds a return.

For each: what it is (e.g. "Box 1 — Ordinary dividends"), the dollar amount, and which form/schedule it goes on. Output as a table.

Flag anything ambiguous or that looks off with "REVIEW:" at the start of the row. Do not guess — if a number is unclear, say so.`,
    model: "Opus",
    modelReason: "Accuracy-critical extraction — use Opus, and still verify the figures yourself.",
    tip: "This is a draft aid, not a substitute for review. Always cross-check the extracted numbers.",
  },
  {
    id: "tax-cumulative-note",
    title: "Summarize a week of client emails into a running note",
    forRoleIds: ["tax-lead", "accounting-lead"],
    scenario: "Keep a per-client running note without writing it from scratch.",
    prompt: `Below are this week's emails (sent + received) for client [CODE]. Write a 1-paragraph entry for their running file.

Cover: what got discussed, any decisions (and who made them), open questions, and a one-line "where we left off." Plain prose, 3-5 sentences, synthesize — don't quote.

Emails:
[PASTE]`,
    model: "Sonnet",
    modelReason: "Summarization — Sonnet, fast and clean.",
  },

  // ─────────────── Accounting Lead ───────────────
  {
    id: "acct-bill-anomaly",
    title: "Bill-pay anomaly scan",
    forRoleIds: ["accounting-lead"],
    scenario: "Before approving the bill queue, surface only the ones worth a second look.",
    prompt: `Here's this period's open bills and each vendor's last 6 months of payments:

[PASTE THE DATA]

Split them into two tables:
A. ROUTINE — recurring vendor, amount within ~25% of the trailing average. I'll batch-approve these.
B. NEEDS REVIEW — new vendor, off-pattern amount (>25% over average), changed category, or no memo. For each, show the prior payment history alongside so I have context.

Be specific about WHY each table-B item is flagged.`,
    model: "Opus",
    modelReason: "Pattern analysis + anomaly judgment across data — Opus.",
  },
  {
    id: "acct-tiered-ar",
    title: "Tiered A/R follow-up drafts",
    forRoleIds: ["accounting-lead", "client-resource-specialist"],
    scenario: "Turn an aging report into ready-to-send follow-ups, toned by client.",
    prompt: `Here's my A/R aging plus each client's payment pattern:

[PASTE]

Draft ONE follow-up email template per tier:
- Tier 1: pays late but reliable → friendly nudge
- Tier 2: out of their normal pattern → warmer but more direct, reference their usual timing
- Tier 3: brand-new late → gentle, assume oversight
- Tier 4: 60+ days, multiple invoices → professional but escalating, offer a call

Each under 100 words, BrookHaven voice. Then tell me which client fits which tier.`,
    model: "Sonnet",
    modelReason: "Templated drafting with light segmentation — Sonnet.",
  },
  {
    id: "acct-month-close",
    title: "Month-end close prep checklist (one entity)",
    forRoleIds: ["accounting-lead"],
    scenario: "Get a prioritized list of what needs attention before closing the books.",
    prompt: `Prepare a month-end close checklist for [ENTITY] for the period ending [DATE]. Based on the data I'll give you, surface:

1. Uncategorized transactions (count + dollar total)
2. Unreconciled accounts and what's waiting
3. Recurring journal entries that should be posted but aren't (depreciation, intercompany, amortization)
4. Negative or unusual balances
5. Anything that looks like a data-entry error

Output as a checklist with quantities and dollar amounts. Don't fix anything — just tell me what needs attention, highest-impact first.

Data:
[PASTE]`,
    model: "Opus",
    modelReason: "Cross-checking financials for issues — Opus catches more.",
  },
  {
    id: "acct-categorize-batch",
    title: "Suggest categories for a batch of transactions",
    forRoleIds: ["accounting-lead"],
    scenario: "Speed up coding by getting suggestions you review, not auto-posts.",
    prompt: `Here are uncategorized transactions and this entity's prior coding history:

[PASTE TRANSACTIONS + A FEW EXAMPLES OF HOW SIMILAR ONES WERE CODED]

For each transaction, suggest the most likely category, a confidence level (high/med/low), and a one-line reason. Output as a table. I'll review and post — flag low-confidence ones clearly so I look at those first.`,
    model: "Sonnet",
    modelReason: "Pattern-matching against examples — Sonnet does this well and fast.",
  },

  // ─────────────── Legal Operations Director ───────────────
  {
    id: "legal-estate-keyterms",
    title: "Estate document key-terms summary",
    forRoleIds: ["legal-ops-director", "paralegal"],
    scenario: "Get the map of a trust/will before doing your close read.",
    prompt: `Review the attached estate document and produce:

1. **Parties** — settlor/grantor, trustees (incl. successors in order), beneficiaries + nature of interest
2. **Type & structure** — revocable/irrevocable/ILIT/etc., funded?, governing law
3. **Trustee powers** — list each with its section number
4. **Distribution standard** — HEMS? discretionary? triggering events?
5. **Termination** — when/how it ends
6. **Non-standard clauses to flag** — anything that differs from our standard template or is unusual under [STATE] law

Cite section numbers. Don't sign off — surface the spots that need my close read.`,
    model: "Opus",
    modelReason: "Long, dense legal instrument — Opus is the right call.",
    tip: "The 'non-standard clauses' section is where your judgment goes — Claude finds them, you decide.",
  },
  {
    id: "legal-contract-redline",
    title: "Redline a contract against our standard",
    forRoleIds: ["legal-ops-director", "paralegal"],
    scenario: "A counterparty sent their paper and you need the deltas + risk.",
    prompt: `Compare the attached contract against our standard [MSA / NDA / engagement letter]. Output a table:

| Section | Their version | Our standard | Why it matters | Risk (🔴 high / 🟡 medium / 🟢 low) |

Then give me:
1. Top 3 things to negotiate (highest leverage)
2. What we can accept as-is (so I don't waste time arguing)
3. Open questions where their language is unclear

Our standard:
[PASTE OR DESCRIBE KEY CLAUSES]`,
    model: "Opus",
    modelReason: "Careful clause-by-clause comparison + risk calls — Opus.",
  },
  {
    id: "legal-hr-policy",
    title: "Draft an HR policy",
    forRoleIds: ["legal-ops-director"],
    scenario: "You need a first draft of a policy to then tailor.",
    prompt: `Draft a clear, employee-friendly [POLICY TYPE, e.g. "remote work" / "PTO" / "expense reimbursement"] policy for a [SIZE]-person professional services firm in [STATE].

Include: purpose, who it applies to, the actual rules, the process/how-to, and who to contact with questions. Plain language, not legalese. Flag anything that has state-specific legal requirements I should verify with counsel.`,
    model: "Sonnet",
    modelReason: "Structured drafting from a known pattern — Sonnet.",
  },

  // ─────────────── Strategy Lead ───────────────
  {
    id: "strat-premortem",
    title: "Run a pre-mortem on a plan",
    forRoleIds: ["strategy-lead", "financial-advisor"],
    scenario: "Before launching something significant, surface how it fails.",
    prompt: `Assume it's 12 months from now and [THE PLAN] failed. Write the post-mortem — what most likely went wrong, in order of probability.

Cover the market reason, the internal/team reason, the operational reason, and the "obvious in hindsight" reason. For each, what could I do TODAY to materially cut that risk?`,
    model: "Opus",
    modelReason: "Open-ended strategic reasoning — Opus generates the sharpest failure modes.",
  },
  {
    id: "strat-research-landscape",
    title: "Research a landscape",
    forRoleIds: ["strategy-lead"],
    scenario: "Get oriented fast in unfamiliar territory.",
    prompt: `I'm researching [TOPIC]. Give me:

1. The 3-5 most important concepts or models in this area
2. How approaches have changed over the past ~20 years
3. The current consensus vs. where there's genuine disagreement
4. What the smartest practitioners are experimenting with that isn't mainstream yet
5. Specific people, firms, or books to look at next

Be specific. No platitudes. Cite sources where you can.`,
    model: "Opus",
    modelReason: "Synthesis across many sources — Opus, ideally with web search on.",
    tip: "Turn on web search for this so it pulls current sources, not just training data.",
  },

  // ─────────────── Administrative Manager ───────────────
  {
    id: "admin-inbox-triage",
    title: "Triage a shared-inbox email",
    forRoleIds: ["admin-manager", "client-resource-specialist"],
    scenario: "Decide who an incoming email goes to, fast.",
    prompt: `Read this email and tell me, using the routing rules below:
1. Who at BrookHaven should handle it
2. Why (one sentence)
3. Urgency: Critical (today) / Normal (this week) / FYI
4. Next action: forward / reply / flag / archive — and if Critical, draft a one-line "we're on it" reply

Routing rules:
[PASTE YOUR RULES, e.g. "tax questions → Tax Lead; trust/estate → Legal; A/R → Accounting; ..."]

Email:
[PASTE]`,
    model: "Haiku",
    modelReason: "Fast classification — Haiku is instant and cheap for inbox volume.",
  },
  {
    id: "admin-status-digest",
    title: "Daily team status digest",
    forRoleIds: ["admin-manager", "financial-advisor", "legal-ops-director"],
    scenario: "Turn raw board/calendar data into a 30-second morning digest.",
    prompt: `Turn this into a short daily standup digest:

[PASTE: board items in progress / done yesterday / due soon, by person]

Format:
### Shipped yesterday
### In progress today (by person)
### 🚧 Blocked (and on what)
### ⏰ Due in next 3 days

Under 300 words. Skip "not started" items. Be specific about blockers.`,
    model: "Sonnet",
    modelReason: "Summarizing + organizing — Sonnet.",
  },
  {
    id: "admin-sop",
    title: "Document a process as an SOP",
    forRoleIds: ["admin-manager"],
    scenario: "Capture how something is done so anyone can follow it.",
    prompt: `Turn my description of a process into a clean SOP (standard operating procedure).

My description (rough, possibly out of order):
[DESCRIBE THE PROCESS]

Output:
- Title + purpose (one line)
- When this runs / who's responsible
- Numbered steps (clear enough that a new hire could follow)
- Common mistakes to avoid
- What "done correctly" looks like

If a step is ambiguous from my description, flag it with a question rather than guessing.`,
    model: "Sonnet",
    modelReason: "Structuring a process into clear steps — Sonnet.",
  },
];

export function templatesForRole(roleId: string): PromptTemplate[] {
  return promptTemplates.filter((t) => t.forRoleIds.includes(roleId));
}

export type { ClaudeModel, ModelGuide, PromptTemplate } from "./types";
