import type { ToolPlaybook } from "./types";

export const tools: ToolPlaybook[] = [
  {
    id: "outlook",
    name: "Outlook",
    emoji: "📧",
    category: "company-stack",
    whatItDoes: "Email for the whole firm.",
    withClaudeToday: `**Claude in Chrome** is the best fit today. The extension overlays Outlook web — highlight a thread, ask:
- "Summarize this in 3 bullets"
- "Draft a reply confirming receipt and asking for the missing W-9"
- "Is this urgent? Why or why not?"
- "Extract any commitments or deadlines from this thread"

Nothing leaves your browser unless you click send. The reply lives in your Outlook draft folder.

**Also useful:**
- Paste any email into Claude.ai for a deeper rewrite
- Save common prompts in your Claude.ai "Projects" so you can run them in one click
- Build a "Brookhaven email voice" Claude Skill — see the tutorial`,
    limitations:
      "No first-party Anthropic plugin for Outlook desktop. Microsoft Copilot for M365 fills this niche if Brookhaven adds the Copilot plan; until then, work on Outlook web with Claude in Chrome.",
    recommendedTutorialSlugs: [
      "email-first-draft",
      "claude-skill-bh-voice",
      "shared-inbox-triage",
      "cowork-outlook-eod-digest",
    ],
  },
  {
    id: "telegram",
    name: "Telegram",
    emoji: "💬",
    category: "company-stack",
    whatItDoes: "Internal team chat and the channel where the weekly AI newsletter will land.",
    withClaudeToday: `**Telegram's Bot API is one of the friendliest in the industry.** A few practical builds:

- **BH Bot** — a bot you DM with "what's the status of TKI close?" — bot queries Monday + Dropbox + QBO via Claude and answers
- **Daily team digest** — Claude reads yesterday's Monday activity + today's calendar, posts a 1-paragraph summary each morning
- **Compliance alert bot** — when something falls behind, the bot pings the right person
- **Newsletter delivery** — the weekly AI newsletter posts to a dedicated channel

All of these are 50-200 lines of Python with Claude as the reasoning layer.`,
    limitations:
      "DMs are private — the bot can only read messages addressed to it or sent in channels it's invited to. By design.",
    recommendedTutorialSlugs: [
      "telegram-bot-bh",
      "smart-compliance-reminders",
      "skill-daily-briefing",
      "cowork-monday-standup",
    ],
  },
  {
    id: "dropbox",
    name: "Dropbox",
    emoji: "📁",
    category: "company-stack",
    whatItDoes: "Firm-wide file storage.",
    withClaudeToday: `**Process before AI.** Several coworkers flagged Dropbox as the biggest organizational drag — but the root cause is human discipline (naming, foldering) more than tech.

**The 4-stage plan:**
1. **Agree on a naming convention** — no AI, just a 1-pager everyone signs onto
2. **Auto-rename incoming scans** — Claude reads each unnamed PDF, identifies client + doc type + date, renames it
3. **Periodic dedup pass** — Claude compares near-duplicates and flags which to delete
4. **Semantic search** — *"Find the Pinnacle wire-setup conversation from last spring"* — needs indexing but it's the #1 ROI feature

Connect Claude to Dropbox via the official Dropbox MCP. Start read-only, prove value, then add write actions one at a time.`,
    limitations:
      "Real-time auto-organization on every upload would need a watcher daemon and explicit user trust. Worth piloting on one folder first.",
    recommendedTutorialSlugs: [
      "dropbox-naming-convention",
      "dropbox-auto-rename",
      "dropbox-dedup",
      "dropbox-semantic-search",
    ],
  },
  {
    id: "adobe-pdf",
    name: "Adobe (PDF)",
    emoji: "📄",
    category: "company-stack",
    whatItDoes: "PDF viewing and light annotation.",
    withClaudeToday: `**Adobe is the viewer; Claude is the reader.** Claude can read multi-page PDFs natively — drop one into Claude.ai or use the PDF skill in Cowork.

**High-value workflows:**
- **Summarize a 60-page trust doc** in 2 minutes → "list trustee powers, identify any non-standard clauses"
- **Extract structured data** from invoices, K-1s, brokerage statements
- **Compare two PDFs** — "what changed between this draft and the last one?"
- **OCR a scanned doc** — Claude handles low-quality scans well; for batch OCR use the PDF skill's OCR mode
- **Fill PDF forms** — the PDF skill supports form filling for 1099s, W-9s, etc.

For legal and tax work, Claude's reading is stronger than Adobe's built-in AI for nuanced summaries and template comparisons.`,
    limitations:
      "Claude can't sign documents or make changes that require Adobe's PDF/A certification — those still need Adobe (or a dedicated e-sign tool).",
    recommendedTutorialSlugs: [
      "pdf-summary-30sec",
      "estate-doc-review",
      "contract-redline",
      "tax-source-doc-checklist",
    ],
  },
  {
    id: "monday",
    name: "Monday.com",
    emoji: "📋",
    category: "company-stack",
    whatItDoes: "Task boards, project management, recurring obligations.",
    withClaudeToday: `**Two patterns to use Claude with Monday:**

1. **Diagnostic mode (use heavily).** Paste a broken automation + a failure example into Claude → "what went wrong, how would you fix it." Use Claude as a debugger before adding more native automations.

2. **Script mode (selective).** For high-stakes flows (ILIT, trustee fees, billing), replace Monday's brittle native automations with a Python+Claude script that calls the Monday API. More transparent, more debuggable, logs available.

**Health-check pattern:** a daily Claude job pings the Monday API, checks "did the things that were supposed to run actually run?", and posts a Telegram alert if anything's off.

**Important:** the Legal Ops Director explicitly warned against over-automating Monday. The ILIT board ran but sent the wrong fields to clients. Diagnose before adding. Every client-touching automation needs a human gate.`,
    limitations:
      "Monday's native automations are limited and can fail silently. Claude doesn't fix Monday — we route around the brittleness with scripts.",
    recommendedTutorialSlugs: [
      "monday-audit-automation",
      "monday-safe-automation",
      "automation-diagnostics",
      "cowork-monday-standup",
      "skill-deadline-watcher",
    ],
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    emoji: "🎥",
    category: "company-stack",
    whatItDoes: "Meeting platform and team voice/video.",
    withClaudeToday: `**The win is post-meeting.** Teams has native transcription — feed the transcript to Claude for:
- **Action items per attendee** with owners and due dates
- **Decisions made** (vs. things still under discussion)
- **Follow-up email drafts** for the people who weren't there
- **Open questions list** for the next meeting

Save a Claude prompt template that takes a Teams transcript and outputs in the same structure every time. Run it after every internal meeting and post the digest to the relevant Telegram thread.

**Teams' own AI Recap** is good for general summaries — Claude wins when you need structured output (e.g., "list every commitment Crystal made, with deadlines").`,
    limitations:
      "Real-time live AI in Teams requires Microsoft Copilot (separate paid plan). Post-meeting Claude workflow covers most of the value without that.",
    recommendedTutorialSlugs: ["teams-action-items", "skill-meeting-prep"],
  },
  {
    id: "qbo",
    name: "QuickBooks Online",
    emoji: "📊",
    category: "secondary",
    whatItDoes:
      "Accounting GL, A/P, A/R, invoicing, and payroll across multiple entities.",
    withClaudeToday: `**Anthropic ships a deep QBO MCP connector.** Surface area includes:
- A/P aging (detail + summary), A/R aging (detail + summary)
- Balance sheet, sales by customer, sales by product
- Invoices: create, update, send, get, delete, duplicate
- Estimates: create, update, send, delete, duplicate
- Payment links: create, send, get
- Payroll: employees, payslips, deductions, time-off, pay types, last payroll run
- Customers: create, search
- Products: create, search
- Reports: cash-flow generator, P&L generator, industry benchmarking

**Today you can:**
- Detect bill-pay anomalies before approval
- Draft AR follow-up emails calibrated to each customer's payment history
- Generate a month-close dashboard for one entity
- Auto-categorize transactions with confidence scores

**Limitation:** One QBO company per Claude connection. For 11-entity work, sequential per-entity sessions, or a Python wrapper that calls the QBO API directly across all files.`,
    limitations:
      "Single QBO company per Claude connection at a time. Multi-entity scripting needed for firm-wide automation.",
    recommendedTutorialSlugs: [
      "qbo-bill-anomaly",
      "qbo-ar-followup",
      "qbo-month-close",
      "claude-cowork-101",
    ],
  },
];

export const toolsById = Object.fromEntries(tools.map((t) => [t.id, t]));
