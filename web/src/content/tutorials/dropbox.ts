import type { Tutorial } from "../types";

export const dropboxNamingConvention: Tutorial = {
  slug: "dropbox-naming-convention",
  title: "The Brookhaven file naming convention",
  subtitle:
    "Process before AI. Lock the rule, then AI helps everyone follow it.",
  emoji: "🗂️",
  difficulty: "Beginner",
  timeEstimate: "20 min to agree on the rule, ongoing discipline",
  audienceRoleIds: [
    "legal-ops-director",
    "client-resource-specialist",
    "admin-manager",
    "accounting-lead",
  ],
  themeIds: ["dropbox-hygiene"],
  toolIds: ["dropbox"],
  aiTools: ["Claude.ai (for drafting the policy doc)"],
  prerequisites: [
    "30 minutes of leadership time to agree on the rule",
    "Access to Dropbox to set up the canonical folder tree",
  ],
  whenToUse:
    "Before adding ANY Dropbox AI automation. Naming convention is the foundation everything else builds on.",
  steps: [
    {
      title: "Why this comes before AI",
      body: `If files are named inconsistently, Claude can't find what you're looking for in semantic search, can't auto-rename properly, and can't reliably dedup. The Legal Ops Director said it best: *"If I go to Dropbox and something is not there, I need to know it's because we actually don't have it."*

You can't get there without a naming rule.`,
    },
    {
      title: "Adopt this baseline convention (or adapt it)",
      body: `Use this as a starting point and adjust in a 30-min meeting:

\`YYYY-MM-DD_ClientCode_DocType_Description.pdf\`

Examples:
- \`2026-03-15_BRIGHTPOINT_Invoice_Q1-consulting.pdf\`
- \`2026-02-28_TKI_TrustStatement_Q4-2025.pdf\`
- \`2026-04-10_HARTWELL_BankRecon_Mar-2026.pdf\`

Why this format:
- **Date first, YYYY-MM-DD:** makes everything sort chronologically by default
- **Client code in CAPS:** scannable, no ambiguity ("BRIGHTPOINT" never mistaken for "Brightpoint Capital")
- **DocType in PascalCase:** short, fast, no spaces
- **Description in kebab-case:** human-readable, no spaces`,
    },
    {
      title: "Build the canonical client code list",
      body: `Make a single source of truth — a Dropbox Paper doc or a Monday board — listing every active client with their canonical code.

Example:
- BRIGHTPOINT — Brightpoint Capital LLC
- TKI — Toughest Kids Pooled Trust
- HARTWELL — Hartwell Rentals
- (...)

Everyone uses these exact codes when naming files. No improvisation.`,
    },
    {
      title: "Define the standard DocType vocabulary",
      body: `Limit DocType to ~20 standard values. If everyone invents their own, the convention dies.

Suggested starter set:
- \`Invoice\`, \`Statement\`, \`Receipt\`
- \`BankRecon\`, \`CreditCardRecon\`, \`JournalEntry\`
- \`Contract\`, \`Engagement\`, \`MSA\`, \`NDA\`
- \`TrustDoc\`, \`TrustStatement\`, \`ILITNotice\`, \`CrummeyLetter\`
- \`TaxReturn\`, \`K1\`, \`W2\`, \`W9\`, \`1099\`
- \`Memo\`, \`Notes\`, \`Correspondence\`
- \`IRSLetter\`, \`StateLetter\``,
    },
    {
      title: "Lock in the folder tree",
      body: `Standardize the top-level structure under each client folder. Suggested:

\`\`\`
Clients/
└── BRIGHTPOINT/
    ├── 01-Engagement/
    ├── 02-Correspondence/
    ├── 03-Tax/
    │   ├── 2024/
    │   └── 2025/
    ├── 04-Accounting/
    │   ├── 2024/
    │   └── 2025/
    ├── 05-Legal/
    └── 99-Archive/
\`\`\`

If someone scans a doc and isn't sure which subfolder it goes in, they put it in \`02-Correspondence/\` by default. We can sort it later — but it's never lost.`,
    },
    {
      title: "Use Claude to draft the 1-page policy doc",
      body: `Open Claude.ai and ask it to draft the staff-facing policy doc. Prompt:`,
      prompt: `Draft a 1-page Brookhaven file naming policy for staff. Friendly tone. Include:

1. The naming format: YYYY-MM-DD_CLIENTCODE_DocType_description.pdf
2. Why we use this (5 short bullets)
3. The standard DocTypes (list)
4. What to do if you're not sure of the client code (look it up in [link to source])
5. What to do with documents that arrive unnamed (rename before saving, OR drop in /99-Inbox/ for someone to rename within 24h)
6. The "when in doubt, put it in 02-Correspondence" rule

Keep it under 400 words. Include 2-3 concrete examples. Make it sound like a memo a person would actually read.`,
    },
    {
      title: "Roll it out — 4-week phased plan",
      body: `Don't try to rename everything in Dropbox at once. Phased rollout:

- **Week 1:** publish the policy. Announce in Telegram. All NEW files follow the convention.
- **Week 2-3:** rename active-client current-year folders only. Use the auto-rename tutorial.
- **Week 4+:** as you touch old files in the course of work, rename them. Don't run a big historical cleanup — too disruptive.`,
    },
  ],
  pitfalls: [
    "Trying to rename the entire historical archive at once. Don't. Just convert as you go.",
    "Letting people invent their own client codes. Lock the source-of-truth list.",
    "Skipping the DocType vocabulary step. Without it, you'll get 30 different names for the same kind of doc.",
    "Adding AI auto-rename before the convention exists. AI without rules just makes the mess faster.",
  ],
  relatedTutorialSlugs: ["dropbox-auto-rename", "dropbox-semantic-search"],
};

export const dropboxAutoRename: Tutorial = {
  slug: "dropbox-auto-rename",
  title: "Auto-rename scanned PDFs with Claude",
  subtitle: "Drop an unnamed scan in, get a properly named, properly filed PDF out.",
  emoji: "🏷️",
  difficulty: "Intermediate",
  timeEstimate: "30 min to set up, seconds per file after",
  audienceRoleIds: [
    "client-resource-specialist",
    "admin-manager",
    "legal-ops-director",
  ],
  themeIds: ["dropbox-hygiene"],
  toolIds: ["dropbox", "adobe-pdf"],
  aiTools: ["Claude.ai", "Claude Cowork (PDF skill)"],
  prerequisites: [
    "The Brookhaven naming convention is published and agreed",
    "Dropbox installed locally on at least one workstation (we'll run the watcher there)",
    "The Brookhaven client code source-of-truth list, in a CSV or Notion table",
  ],
  whenToUse:
    "Whenever scanned documents arrive without names — physical mail scans, emailed PDFs with cryptic filenames like 'scan_001.pdf', screenshots saved as PDF.",
  whenNotToUse:
    "For documents where the original filename has meaning (e.g., a vendor sent you an invoice named 'InvoiceA-2024-1142.pdf' — preserve that or augment it, don't replace it).",
  steps: [
    {
      title: "Approach: human-in-the-loop, not fully unattended",
      body: `Don't build a fully unattended renamer. It will misclassify ~5% of files and you won't notice. Build a **propose-and-approve** workflow:

1. Drop an unnamed PDF in \`/Inbox-To-Rename/\`
2. Claude reads it, proposes a new name and target folder
3. You approve with one click (or edit and approve)
4. File moves to the proper place

This is the right balance between speed and trust.`,
    },
    {
      title: "Create the inbox folder",
      body: `In Dropbox, create \`/00-Inbox-To-Rename/\` at the top level. This is where every unnamed scan goes — from scanner outputs, from emails, from anywhere.

Everyone at BH agrees: if you can't name a file properly when you save it, put it here. The watcher catches it within minutes.`,
    },
    {
      title: "Set up the rename prompt in a Claude Project",
      body: `Open Claude.ai → Projects → +New Project. Name: *"Dropbox auto-rename."*

In Project knowledge, paste:
1. Your firm's naming convention (from the previous tutorial)
2. The DocType vocabulary
3. The client code source-of-truth list (as CSV text or attached file)

In custom instructions, paste:`,
      prompt: `You rename Brookhaven PDFs to match our naming convention.

When I paste or attach a PDF, you respond ONLY in this JSON shape (no extra prose):

{
  "proposed_name": "YYYY-MM-DD_CLIENTCODE_DocType_short-description.pdf",
  "target_folder": "/Clients/CLIENTCODE/0X-Subfolder/YYYY/",
  "confidence": "high" | "medium" | "low",
  "reasoning": "1-sentence why",
  "needs_human_review": true | false
}

Rules:
- If you can't identify the client with high confidence, set confidence to "low" and needs_human_review to true.
- Use the client codes from project knowledge ONLY — never invent.
- If the doc type isn't in our vocabulary, use the closest match and flag needs_human_review.
- Date = the date ON the document (invoice date, statement date, letter date). If no date, use today's date and flag needs_human_review.

Output ONLY the JSON. No explanation, no markdown fence.`,
    },
    {
      title: "Test on 10 sample PDFs",
      body: `Before going live, run 10 real scans through the Project manually. Check:
- Are the client codes correct?
- Are the dates right?
- Are the doc types from your vocabulary?
- Does \`needs_human_review\` flip appropriately on ambiguous docs?

If you're seeing more than 1-2 mistakes per 10, refine the prompt and Project knowledge. **Don't go live until accuracy feels solid.**`,
      callout: {
        variant: "warning",
        body: "This is the over-automation trap. If accuracy is 80%, you'll save time per file but introduce subtle errors at scale. Hit 95%+ on your test set before automating.",
      },
    },
    {
      title: "Build the local watcher (Python, ~50 lines)",
      body: `On a workstation with Dropbox synced locally:

\`\`\`python
# watcher.py
import time, os, json
from pathlib import Path
from anthropic import Anthropic

INBOX = Path.home() / "Dropbox" / "00-Inbox-To-Rename"
PROPOSALS = Path.home() / "Dropbox" / "00-Inbox-Proposals"
PROPOSALS.mkdir(exist_ok=True)
client = Anthropic()

def propose_rename(pdf_path: Path) -> dict:
    with open(pdf_path, "rb") as f:
        msg = client.messages.create(
            model="claude-opus-4-7",
            max_tokens=400,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "document", "source": {"type": "base64", "media_type": "application/pdf",
                     "data": __import__("base64").b64encode(f.read()).decode()}},
                    {"type": "text", "text": "Rename this per the Brookhaven convention."},
                ],
            }],
            system="(paste your custom instructions from the Project here)",
        )
    return json.loads(msg.content[0].text)

while True:
    for pdf in INBOX.glob("*.pdf"):
        try:
            proposal = propose_rename(pdf)
            (PROPOSALS / (pdf.stem + ".json")).write_text(json.dumps(proposal, indent=2))
            print(f"Proposed for {pdf.name}: {proposal['proposed_name']}")
        except Exception as e:
            print(f"Error on {pdf.name}: {e}")
    time.sleep(60)
\`\`\`

Run it in the background. It checks the inbox every minute, generates a proposal, drops it in \`/00-Inbox-Proposals/\` as JSON.`,
      callout: {
        variant: "info",
        body: "This is a simple watcher. For production, add error handling, deduping, a queue, and a kill switch. But the 50-line version works for a pilot.",
      },
    },
    {
      title: "Approve proposals manually for the first month",
      body: `Each morning, the person responsible (let's say the Admin Manager) opens \`/00-Inbox-Proposals/\`, reviews each JSON file, and either:
- Approves → runs a small script (or just does it by hand) to rename and move the file to \`target_folder\`
- Edits the JSON to fix anything wrong, then approves
- Rejects → file stays in inbox for human handling

Track your edit rate. If you're editing >20% of proposals, the prompt needs work.`,
    },
    {
      title: "Graduate to one-click approval after a month of high accuracy",
      body: `When you trust the proposals (95%+ correct), add a small UI:
- A Monday board with one row per proposal: file, proposed name, target folder, [Approve] button
- Or a Telegram bot that DMs you each proposal with [✅] [✏️] [❌] buttons

Only graduate to "auto-approve high-confidence proposals" if you have a month of accuracy data and a daily sanity check that someone still actually does.`,
    },
  ],
  pitfalls: [
    "Going to fully unattended renaming without an accuracy track record. The Legal Ops Director's warning applies — silent automation failures are the worst kind.",
    "Letting the client-code list go stale. New clients added monthly need to land in the source-of-truth list.",
    "Watching too many folders. Start with one inbox, one direction. Expand later.",
    "Forgetting to deduplicate. If the watcher proposes a name that already exists in the target folder, escalate to human review.",
  ],
  relatedTutorialSlugs: [
    "dropbox-naming-convention",
    "dropbox-dedup",
    "dropbox-semantic-search",
  ],
};

export const dropboxDedup: Tutorial = {
  slug: "dropbox-dedup",
  title: "Find duplicate documents in Dropbox",
  subtitle: "Stop reviewing the same scan twice. Let Claude tell you which copies to keep.",
  emoji: "👯",
  difficulty: "Beginner",
  timeEstimate: "15 min per client folder",
  audienceRoleIds: ["client-resource-specialist", "admin-manager"],
  themeIds: ["dropbox-hygiene"],
  toolIds: ["dropbox"],
  aiTools: ["Claude.ai"],
  prerequisites: [
    "Dropbox locally synced (or web access)",
    "A client folder you suspect has duplicates",
  ],
  whenToUse:
    "Periodic cleanup pass. Run monthly on the 3-5 highest-volume client folders. The Client Resource Specialist flagged this directly — reviewing the same document multiple times because of duplicates is a real cost.",
  steps: [
    {
      title: "Identify suspected duplicates first",
      body: `Don't try to dedup the whole Dropbox at once. Pick one client folder. Sort by file size — duplicates often have identical or near-identical sizes.

You can also use Dropbox's own "Find duplicates" if it's enabled in your plan (Settings → Advanced).`,
    },
    {
      title: "Open the two candidates side-by-side in Claude.ai",
      body: `Drag both PDFs into a new Claude chat. Ask:`,
      prompt: `I think these two PDFs might be duplicates. Compare them and tell me:

1. Are they the same document? (yes / near-duplicate / different)
2. If near-duplicate, what's different? (different scan quality, different signatures, different page count, etc.)
3. Which copy should I keep based on quality and completeness?
4. Anything I should look at carefully before deleting either one?

Be concise — one paragraph per question.`,
    },
    {
      title: "Read Claude's analysis",
      body: `Claude will tell you things like:
- "Same content, but PDF A has a clearer scan and PDF B is missing page 3. Keep A."
- "Different — A is the engagement letter dated Jan 2024, B is dated Jan 2025. Both are needed."
- "Near-identical, but B has the signature page and A doesn't. Keep B."

This is the kind of judgment call that's tedious for a human and fast for Claude.`,
      callout: {
        variant: "tip",
        body: "Don't trust Claude's call for documents that have legal significance (signed engagement letters, executed contracts). Use it as a first pass; verify the signature/execution status yourself before deleting.",
      },
    },
    {
      title: "Move the loser to /99-ToDelete/ — don't delete immediately",
      body: `Create a \`/99-ToDelete/\` subfolder in each client folder. Move duplicate-loser files there with a date stamp on the folder.

Wait 30 days. If nobody complained or asked for the file, delete the folder. This catches the "wait, that one was actually different" edge case.`,
    },
    {
      title: "Make it a monthly habit on the top 5 client folders",
      body: `Calendar reminder: first Monday of the month, 30 minutes, dedup pass on the 5 highest-activity client folders.

After 3 months, the backlog is gone and you're just keeping things clean.`,
    },
  ],
  pitfalls: [
    "Deleting both copies of an apparent duplicate before checking. Always move-then-wait.",
    "Trying to dedup the entire Dropbox in one session. You'll burn out. One folder at a time.",
    "Trusting Claude's call on signature/execution status without verifying. Always check signed legal docs yourself.",
  ],
  relatedTutorialSlugs: ["dropbox-naming-convention", "dropbox-auto-rename"],
};

export const dropboxSemanticSearch: Tutorial = {
  slug: "dropbox-semantic-search",
  title: "Semantic search across all of Dropbox",
  subtitle:
    "'Find the Pinnacle wire-setup conversation from last spring' — and actually get it.",
  emoji: "🔎",
  difficulty: "Advanced",
  timeEstimate: "2-3 hours initial setup, instant queries after",
  audienceRoleIds: [
    "accounting-lead",
    "legal-ops-director",
    "admin-manager",
    "client-resource-specialist",
  ],
  themeIds: ["dropbox-hygiene", "cross-entity-comms"],
  toolIds: ["dropbox"],
  aiTools: ["Claude API", "Anthropic Files API", "Claude Cowork (Dropbox MCP)"],
  prerequisites: [
    "Anthropic API access (claude.ai console → API keys)",
    "Dropbox API access (developers.dropbox.com → create an app)",
    "Someone comfortable with Python (~200 lines for the indexer)",
  ],
  whenToUse:
    "When you need cross-system search across documents, emails (exported), and Telegram archives — the #1 universal pain in the survey.",
  steps: [
    {
      title: "Why semantic > keyword search",
      body: `Dropbox's built-in search is keyword-only. *"Pinnacle wire setup"* only finds files with those exact words. Semantic search understands the meaning:
- Searching *"the bank account we opened for the rental property last year"* finds files mentioning Pinnacle, wire transfer instructions, and Hartwell Rentals — even if none of those words match your query exactly.
- It works across PDFs, Word docs, scanned images (with OCR), and plain text.`,
    },
    {
      title: "Architecture — what we're building",
      body: `Three layers:

1. **Indexer** (Python script, runs nightly) — walks Dropbox, extracts text from every doc, embeds it, stores in a vector database
2. **Vector store** — Pinecone, Qdrant, or local Chroma. Stores the embeddings + metadata (file path, client code, date).
3. **Query interface** — a small web page or Telegram bot. Type a question → Claude rewrites the query → vector store returns top-N matches → Claude summarizes and links to the files.

This is the bigger build, but it's the highest-ROI feature in the whole adoption project.`,
    },
    {
      title: "Step 1: extract text from Dropbox",
      body: `Use Dropbox's API to list files. For each PDF / DOCX / TXT, download and extract text. Sketch:

\`\`\`python
import dropbox, anthropic
from pypdf import PdfReader
dbx = dropbox.Dropbox(ACCESS_TOKEN)
client = anthropic.Anthropic()

def walk(path=""):
    res = dbx.files_list_folder(path, recursive=True)
    for entry in res.entries:
        if isinstance(entry, dropbox.files.FileMetadata) and entry.name.endswith(".pdf"):
            yield entry
\`\`\`

For scans where pypdf returns empty text, fall back to Claude's PDF reading via the Files API to extract content.`,
    },
    {
      title: "Step 2: chunk and embed",
      body: `Split each doc's text into ~500-token chunks with 50-token overlap. Embed each chunk using a model like \`voyage-3\` or OpenAI's \`text-embedding-3-small\` (both are commonly used with Claude).

Store each embedding with metadata: file path, client code (parsed from name), date, doc type, chunk text.`,
      callout: {
        variant: "info",
        body: "Claude doesn't have a first-party embedding model yet — pair Claude (for reasoning) with Voyage AI (for embeddings) or another provider. The pattern works the same.",
      },
    },
    {
      title: "Step 3: build the query layer",
      body: `When a user types *"find the Pinnacle wire setup from last spring"*:

1. Embed the query → get a query vector
2. Search vector store for top-20 most-similar chunks
3. Pass those chunks + the original query to Claude with a prompt like:`,
      prompt: `You're searching internal Brookhaven documents. The user asked:

"{user query}"

Here are the top 20 candidate chunks from our document index, each with its file path:

{chunks}

Return:
1. The 3-5 most relevant documents (with file paths and dates)
2. A 2-sentence summary of what each one contains
3. If the answer is in one specific doc, quote the relevant passage

If nothing matches well, say so honestly.`,
    },
    {
      title: "Step 4: ship a simple interface",
      body: `Start dirt-simple: a Telegram bot. DM the bot a question, it runs the query, replies with the answer + Dropbox links.

\`\`\`python
@bot.message_handler(func=lambda m: True)
def search(msg):
    results = semantic_search(msg.text)
    bot.reply_to(msg, format_results(results))
\`\`\`

Later, you can build a small web UI. But Telegram works for v1.`,
    },
    {
      title: "Step 5: keep the index fresh",
      body: `Run the indexer nightly via cron. Only re-process files modified since the last run (Dropbox's API has a cursor for this).

Add a daily Telegram digest: *"Indexed 47 new docs last night."* So you know it's working.`,
    },
    {
      title: "Step 6: extend to Telegram + Outlook archives",
      body: `Once Dropbox works, point the same pipeline at:
- Telegram message history (export via Telegram's official tool → import into the indexer)
- Outlook PST exports (per-user, opt-in)

Now *"find that conversation about TKI fees from last summer"* hits Telegram + email + Dropbox in one query.`,
    },
  ],
  pitfalls: [
    "Trying to index everything on day 1. Start with one client folder, prove the pattern, expand.",
    "Embedding huge documents as single chunks. Chunk to ~500 tokens for best retrieval.",
    "Letting the index go stale. Nightly cron + daily 'indexed N new docs' alert.",
    "Skipping access control. If someone uses the bot, they only see results they had Dropbox access to — implement this on day 1, not later.",
  ],
  relatedTutorialSlugs: ["dropbox-naming-convention", "telegram-bot-bh"],
};

export const dropboxTutorials = [
  dropboxNamingConvention,
  dropboxAutoRename,
  dropboxDedup,
  dropboxSemanticSearch,
];
