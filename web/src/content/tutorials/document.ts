import type { Tutorial } from "../types";

export const estateDocReview: Tutorial = {
  slug: "estate-doc-review",
  title: "Estate doc review with Claude",
  subtitle: "60-page trust documents read and summarized in 2 minutes.",
  emoji: "⚖️",
  difficulty: "Intermediate",
  timeEstimate: "15 min to set up, 2 min per doc after",
  audienceRoleIds: ["legal-ops-director", "paralegal", "tax-lead"],
  themeIds: ["document-review"],
  toolIds: ["adobe-pdf"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Claude.ai account",
    "An estate planning document to review (trust, will, POA, etc.)",
  ],
  whenToUse:
    "First-pass review of incoming estate documents. Drafting summaries for client meetings. Comparing two versions of the same instrument.",
  whenNotToUse:
    "Final review of a doc you're signing off on as the responsible attorney. Claude finds the spots that need close reading; YOU do the close reading.",
  steps: [
    {
      title: "Set up a 'Trust review' Claude Project",
      body: `Open Claude.ai → Projects → +New Project. Name: *"Estate doc review."*

In Project knowledge, paste:
- Your firm's standard trust template (or describe the key clauses your standard trust includes)
- A glossary of terms your firm uses ("Settlor" vs "Grantor," "Trustee" vs "Trust Protector," etc.)
- Any state-specific notes (GA trust code references if you work mostly in Georgia, etc.)

This context makes every review dramatically sharper.`,
    },
    {
      title: "Write the custom instructions",
      body: `Paste this as the Project's custom instructions:`,
      prompt: `You're a legal review assistant for the Brookhaven Legal Operations team. You review trust documents, wills, POAs, and other estate planning instruments.

When I share a document, produce this structured output:

## 1. Parties
- **Settlor/Grantor:** [name(s)]
- **Trustees:** [names, including successor trustees in order]
- **Beneficiaries:** [names + nature of interest (income, remainder, etc.)]
- **Trust Protector** (if any): [name + powers]

## 2. Type and structure
- Trust type (revocable, irrevocable, ILIT, charitable, etc.)
- Funded vs unfunded
- Situs / governing law
- Any unusual structural features

## 3. Trustee powers
List every distinct trustee power, with the section reference. Group by:
- Investment powers
- Distribution powers
- Administrative powers
- Discretionary vs mandatory

## 4. Distribution standards
- HEMS? Pure discretion? Mandatory amounts? Ascertainable standard?
- Conditions on distributions
- Triggering events (death, age, marriage, etc.)

## 5. Termination
When and how does the trust end?

## 6. Non-standard clauses to flag
List anything that:
- Differs materially from our standard template
- Is unusual under [state] law
- Could be ambiguous or contradictory
- References external documents I should also review

## 7. Open questions for the attorney
Specific things I should ask the drafter or the client.

Be concise. Cite section numbers. Don't summarize — extract.`,
    },
    {
      title: "Drop a trust doc in and run it",
      body: `New chat in the Project. Drag the PDF in. Just say "Review this." Claude produces the structured output in 30-60 seconds.`,
    },
    {
      title: "Use the output to drive the close-read",
      body: `Read Claude's summary. **Section 6 ('Non-standard clauses') is where you focus your attention.** That's where the actual judgment work lives.

The other sections are the map — they let you confirm "yes, basic structure is what I expected" in 2 minutes instead of 30.`,
      callout: {
        variant: "warning",
        body: "Never sign off on a trust based solely on Claude's summary. Use it to find the sections that need close reading. Do the close reading yourself.",
      },
    },
    {
      title: "Compare two versions of the same trust",
      body: `Common case: client sends a "marked up" version of a trust they've been negotiating. Drop both PDFs into Claude:`,
      prompt: `These are two versions of the same trust. Tell me:

1. Every substantive change between V1 and V2 (ignore typo fixes and formatting)
2. For each change, which party it favors and why
3. Any changes that conflict with each other or with other clauses in the doc
4. Anything that was REMOVED from V1 that we should ask about

Output as a table. Section number, V1 text, V2 text, my analysis.`,
    },
    {
      title: "Draft client-facing summary",
      body: `Once you've done your review, ask Claude to produce a 1-page client-facing version:`,
      prompt: `Draft a 1-page summary of this trust for the client (the settlor). Plain English. Avoid legal jargon. Cover:

- Who's involved
- What the trust does (in their words, not ours)
- When/how they (or their family) benefit
- What they (the settlor) can change vs can't
- What happens when the trust ends

Friendly tone. Address them directly ("you," not "the settlor"). End with "Let me know if you have questions."`,
    },
  ],
  pitfalls: [
    "Treating the AI summary as your final read. It's a map; you walk it.",
    "Forgetting to add your standard template + state-specific notes to Project knowledge. Without them, Claude misses what's 'non-standard.'",
    "Asking Claude to interpret ambiguous clauses instead of FLAGGING them. The right answer is usually 'this is ambiguous, ask the drafter.'",
  ],
  relatedTutorialSlugs: ["contract-redline", "pdf-summary-30sec"],
};

export const contractRedline: Tutorial = {
  slug: "contract-redline",
  title: "Contract redline against our standard",
  subtitle: "Get a plain-English diff between an incoming contract and our template — in 2 minutes.",
  emoji: "📑",
  difficulty: "Intermediate",
  timeEstimate: "20 min setup, 2-5 min per contract after",
  audienceRoleIds: ["legal-ops-director", "paralegal"],
  themeIds: ["document-review"],
  toolIds: ["adobe-pdf"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Claude.ai account",
    "Your firm's standard MSA / contract template (the version you DEFEND from)",
    "An incoming contract from a counterparty",
  ],
  whenToUse:
    "Whenever a counterparty sends a contract that's based on their template, not ours. Especially common with vendor MSAs, NDAs, and service agreements.",
  steps: [
    {
      title: "Set up a 'Contract redline' Project",
      body: `Open Claude.ai → Projects → +New Project. Name: *"Contract redline."*

Upload your firm's standard MSA, NDA, and service agreement templates to Project knowledge. Tag each with a comment like "BH standard MSA - approved Jan 2026."`,
    },
    {
      title: "Custom instructions for the Project",
      body: `Paste this:`,
      prompt: `You compare incoming contracts to Brookhaven's standard templates and produce a redline analysis.

When I share an incoming contract, identify which standard template it should be compared against (MSA, NDA, service agreement, engagement letter), then produce:

## Side-by-side comparison

Output a table:
| Section / Topic | Incoming contract says | Our standard says | Why this matters | Risk level |

Risk levels:
- 🔴 **HIGH** — material risk to BH (uncapped liability, broad indemnification against us, perpetual confidentiality on counterparty's data but not ours, IP assignment of our work to them)
- 🟡 **MEDIUM** — meaningful change but not catastrophic (different payment terms, different termination notice, narrower limitations of liability)
- 🟢 **LOW** — minor (different governing law clause when both are commercially reasonable, defined-term variations, formatting)

After the table, give me:
1. **Top 3 things to negotiate** (the highest-leverage changes to push back on)
2. **Things we can accept as-is** (so I don't waste time arguing)
3. **Open questions** for the counterparty (their version was unclear about X)`,
    },
    {
      title: "Run the redline",
      body: `Drop the incoming contract into the Project chat. Say:`,
      prompt: `Run a redline against our standard. This is an [MSA / NDA / engagement letter / etc.] from [counterparty].`,
    },
    {
      title: "Use the output to drive negotiation",
      body: `Claude returns the table. The 🔴 HIGH rows are your negotiation priorities.

For each HIGH item, ask Claude to draft alternative language:`,
      prompt: `For the 'limitation of liability' clause they have, draft a counter-proposal that:

- Caps their liability at 12 months of fees paid (their version is uncapped)
- Excludes fraud / gross negligence (their version excludes only fraud)
- Mutual cap (their version is one-sided in their favor)

Write it as a proposed redline I can send back to their counsel. Use clean legal language but don't make it look like it came from a different firm.`,
    },
    {
      title: "Generate the response email to opposing counsel",
      body: `Once you have your counter-proposals, ask Claude:`,
      prompt: `Draft a short email to opposing counsel attaching our proposed revisions. Cover the top 3 changes at a high level, signal we're flexible on the medium-priority items, and ask them to confirm a turnaround time.

Friendly but firm tone. We work with this counterparty a lot, don't burn the relationship. Sign with "Best, [name]"`,
    },
  ],
  pitfalls: [
    "Treating Claude's risk classification as final. A 🔴 from Claude might be acceptable in YOUR specific context (e.g., you trust this counterparty deeply). Apply judgment.",
    "Skipping the 'things we can accept as-is' section. You'll burn negotiation capital arguing about minor stuff.",
    "Not keeping the Project's standard templates current. When the template changes, update the Project knowledge.",
  ],
  relatedTutorialSlugs: ["estate-doc-review", "pdf-summary-30sec"],
};

export const taxSourceDocChecklist: Tutorial = {
  slug: "tax-source-doc-checklist",
  title: "Tax return source-doc checklist",
  subtitle:
    "Read a stack of client source docs, produce a 'what's in, what's missing' checklist.",
  emoji: "✅",
  difficulty: "Intermediate",
  timeEstimate: "30 min setup, 5-10 min per client return after",
  audienceRoleIds: ["tax-lead", "client-resource-specialist"],
  themeIds: ["document-review", "email-triage"],
  toolIds: ["adobe-pdf", "outlook"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Claude.ai account",
    "Your firm's standard tax return checklist (per return type — 1040, 1041, 1065, 1120)",
    "Client's submitted source documents (PDFs)",
  ],
  whenToUse:
    "When you've received a client's tax docs and need to identify what you still need before starting prep. Cuts the back-and-forth.",
  steps: [
    {
      title: "Set up a Project per return type",
      body: `Open Claude.ai → Projects. Create one Project per return type you handle:
- "Tax — 1040 source review"
- "Tax — 1041 source review"
- "Tax — 1065 / 1120 source review"

In each, upload to Project knowledge:
- Your firm's source doc checklist for that return type
- The standard "missing docs" follow-up email template you use`,
    },
    {
      title: "Custom instructions per Project",
      body: `For the 1040 Project, paste:`,
      prompt: `You're reviewing tax source documents for a 1040 return. When the user shares a stack of PDFs, do this:

## Step 1: identify what's been submitted
List every document type you see. Match against the standard 1040 checklist:

- W-2s (employer income)
- 1099-NEC / 1099-MISC (self-employment, other income)
- 1099-INT / 1099-DIV / 1099-B (investment income)
- 1099-R (retirement distributions)
- 1099-SA / 5498-SA (HSA)
- K-1s (passthrough income — note which entity)
- 1098 (mortgage interest)
- 1098-T (tuition)
- 1095-A/B/C (health coverage)
- Property tax statements
- Charitable contribution receipts/letters
- Medical expense summaries
- Childcare expense receipts (Form 2441 support)
- Prior year return (for comparison)

## Step 2: cross-check against return type signals

If client has self-employment income (Sch C), I need:
- Income summary
- Expense categorization
- 1099-NECs they received
- Vehicle mileage log (if claiming)
- Home office calculation support

If client has rentals (Sch E), I need:
- Income/expense per property
- 1099-MISCs (or 1099-NECs) issued to contractors

If client has K-1s, I need each one.

## Step 3: output

**A. Documents received** (list)
**B. Required documents still missing** (list, by category)
**C. Optional but recommended** (e.g., "I see investment income — confirm if any cost-basis adjustments are needed")
**D. Inconsistencies** — flag anything that doesn't add up (e.g., "you submitted a W-2 for $80k but your prior year showed self-employment income — clarify employment status this year")

After the output, draft a follow-up email to the client requesting only the missing items in part B. Friendly tone. Bullet list of asks. Brookhaven voice.`,
    },
    {
      title: "Drop the source docs in and run",
      body: `New chat in the Project. Drag in all the PDFs the client sent. Just say *"Review."*

Claude reads them all, produces the checklist, and drafts the follow-up email.`,
    },
    {
      title: "Verify the inventory before sending",
      body: `Claude's classification is usually right but occasionally a doc gets misidentified (a brokerage 1099-Composite might get partially missed).

Spot-check: count the PDFs you submitted, count what Claude identified, make sure they match. Open any ambiguous ones.`,
    },
    {
      title: "Send the follow-up email",
      body: `Copy the drafted follow-up. Paste into Outlook. Personalize one line ("Hope the move went well last weekend"). Send.

Total time from receiving the doc stack to sending the follow-up: 5-10 minutes instead of 30-45.`,
    },
    {
      title: "Track patterns across clients",
      body: `After a few weeks, keep a tally: what's the most-commonly-missing doc across clients?

Use this to update your engagement letter or the initial "please submit these docs" intake list. Reduce future back-and-forth at the source.`,
    },
  ],
  pitfalls: [
    "Sending Claude's draft follow-up email without personalizing it. The whole 'BH voice' point is to NOT sound generic.",
    "Trusting Claude's inventory without a spot-check. A misclassified 1099 can cost a return amendment.",
    "Letting the Project knowledge go stale. When tax law changes (new forms, new requirements), update the checklist.",
  ],
  relatedTutorialSlugs: ["email-first-draft", "pdf-summary-30sec", "cumulative-client-note"],
};

export const cumulativeClientNote: Tutorial = {
  slug: "cumulative-client-note",
  title: "One cumulative client note per year",
  subtitle:
    "A rolling summary of every interaction, doc, and decision per client per year — auto-updated.",
  emoji: "📔",
  difficulty: "Intermediate",
  timeEstimate: "1 hour setup, ongoing maintenance is automatic",
  audienceRoleIds: ["tax-lead", "client-resource-specialist", "accounting-lead"],
  themeIds: ["document-review", "cross-entity-comms"],
  toolIds: ["dropbox", "outlook"],
  aiTools: ["Claude.ai", "Claude API"],
  prerequisites: [
    "A canonical place to store client notes (Dropbox folder, Notion, or a Monday board)",
    "Access to relevant inputs: email threads, scanned docs, Telegram messages, Monday items",
    "Claude.ai account; API access if you want it fully automated",
  ],
  whenToUse:
    "When you have clients with multi-year relationships and 'where did we leave off?' is a recurring question. This was a direct ask from the Tax Lead.",
  steps: [
    {
      title: "Decide where the cumulative note lives",
      body: `Pick ONE location per client per year. Options:

- Dropbox: \`/Clients/CLIENTCODE/02-Correspondence/YYYY-cumulative-note.md\` (markdown file)
- Notion: a single page per client per year
- Monday: a long-text column on the client's "Contact" item

Pick whichever your team already opens daily. Don't add a new tool just for this.`,
    },
    {
      title: "Define the note's structure",
      body: `Every cumulative note follows the same template — that's what makes it useful at-a-glance:

\`\`\`
# CLIENTCODE — 2026 Cumulative Note

## At a glance
- Engagement: [scope]
- Primary contact: [name + email + phone]
- Last touch: [date + 1-line context]
- Open items: [bulleted]

## Decisions made this year
- [Date] [decision] — [why] [who]

## Documents received / sent
- [Date] [doc type] [direction]

## Conversations summary (newest first)
- [Date] [channel — email / Telegram / call] — [1-paragraph what was discussed]
- ...

## Background carried from prior years
- [Anything still relevant from 2025 and earlier]
\`\`\``,
    },
    {
      title: "Bootstrap the first note manually",
      body: `For each client, do a one-time setup: open the note file, paste the structure, spend 15 minutes filling in what you know from memory + recent emails. Don't try to make it complete — just get the bones in.`,
    },
    {
      title: "Update workflow — weekly Friday ritual",
      body: `Every Friday, set 30 minutes. For each active client:

1. Open the cumulative note for the current year
2. Review your sent/received emails to that client this week
3. Add a 1-paragraph entry under "Conversations summary"
4. Add anything new under "Decisions made" or "Documents received"
5. Update "Open items" — what's still outstanding?

Sounds like a lot. After a few weeks of practice, 30 min covers all your active clients.`,
    },
    {
      title: "Use Claude to summarize a week of emails per client",
      body: `Instead of writing summaries from scratch, paste your week's emails for one client into Claude:`,
      prompt: `Below are this week's emails (sent + received) for client [CLIENTCODE]. Produce a 1-paragraph summary suitable for a cumulative client note. Cover:

- What got discussed
- Any decisions made (who decided what)
- Any open questions or pending items
- One-line "where we left off"

Plain prose, 3-5 sentences total. Don't quote the emails — synthesize.`,
    },
    {
      title: "Auto-pull from Outlook (advanced, optional)",
      body: `If you want this automated, write a small Python script that:

1. Each Friday morning, queries Outlook for the past week's emails per client (filter by sender/recipient)
2. Passes the emails to Claude with the prompt above
3. Appends the result to the cumulative note file in Dropbox

\`\`\`python
# weekly_notes.py
from datetime import datetime, timedelta
from msgraph_helpers import emails_for_client
import anthropic

clients = ["BRIGHTPOINT", "TKI", "HARTWELL"]
client = anthropic.Anthropic()

for code in clients:
    week_emails = emails_for_client(code, days=7)
    if not week_emails:
        continue
    msg = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=400,
        messages=[{"role": "user", "content": f"Summarize:\\n\\n{week_emails}"}],
        system="(paste the summary prompt above)",
    )
    append_to_note(code, msg.content[0].text)
\`\`\`

Now you start your Friday with all the summaries already drafted; you just review and add the human context.`,
    },
    {
      title: "Make the note searchable",
      body: `Once you have a year of notes, you'll want cross-client search. Drop the notes folder into Dropbox; once the semantic-search system (separate tutorial) is up, you can query *"which clients did we raise fees with last summer?"* and get answers across all notes.`,
    },
  ],
  pitfalls: [
    "Trying to update the note every day. Weekly is the right cadence; daily becomes overhead.",
    "Letting the note structure drift across clients. Use the same template every time — that's what makes it scannable.",
    "Skipping the human-judgment update. Claude can summarize emails; only you can write 'this client is sensitive about pricing, handle carefully' under Open items.",
  ],
  relatedTutorialSlugs: ["email-first-draft", "tax-source-doc-checklist"],
};

export const documentTutorials = [
  estateDocReview,
  contractRedline,
  taxSourceDocChecklist,
  cumulativeClientNote,
];
