import type { Theme } from "./types";

export const themes: Theme[] = [
  {
    id: "email-triage",
    emoji: "✉️",
    title: "Email triage & drafting",
    oneLiner:
      "First-draft replies, thread summaries, urgency triage — without leaving Outlook.",
    affectedRoleIds: [
      "client-resource-specialist",
      "tax-lead",
      "accounting-lead",
      "admin-manager",
    ],
    effort: "Low",
    description: `**The pain:** Multiple people spend a sizeable share of their day reading, triaging, and writing routine email. Most of what gets written is templated — AR follow-ups, status updates, client checklist nudges, compliance responses — but everyone starts from a blank email window every time.

**What works today:**
- **Claude in Chrome** — overlays Outlook web. Highlight a thread → ask "summarize," "draft a reply that says we still need the W-9," "is this urgent?"
- **Claude.ai with saved prompts** — a small library of canned starters per role
- **A shared "Brookhaven email voice" Claude Skill** — captures our tone, standard phrasings, signatures. Used by everyone, voice stays consistent.

**The 30-second workflow:** see a routine email → highlight or paste → "Draft a reply that…" → review, edit, send. Replace "I need to think about how to phrase this" with "I need to check what Claude wrote."`,
    notSolvable:
      "Native auto-drafting inside Outlook desktop. Microsoft Copilot for M365 does this; Claude doesn't have a first-party Outlook plugin yet.",
    tutorialSlugs: [
      "email-first-draft",
      "claude-skill-bh-voice",
      "shared-inbox-triage",
      "claude-skills-101",
      "cowork-outlook-eod-digest",
    ],
  },
  {
    id: "dropbox-hygiene",
    emoji: "📁",
    title: "Dropbox chaos & document management",
    oneLiner:
      "Naming conventions, duplicate detection, auto-renaming scans, and semantic search across the whole drive.",
    affectedRoleIds: [
      "client-resource-specialist",
      "legal-ops-director",
      "admin-manager",
      "accounting-lead",
    ],
    effort: "Mixed",
    description: `**The pain:** Several coworkers independently identified Dropbox as the single biggest organizational drag. Scans arrive un-named, duplicates accumulate, nobody knows the canonical place for a given doc, and finding an old document means guessing which of six systems to check first.

**The Legal Ops Director's framing is the right one:** *"If I go to Dropbox and something is not there, I need to know it's because we actually don't have it."* Process discipline must come first, AI second.

**The 4-step plan:**
1. **Lock in a naming convention** (no AI — humans agree on the rule)
2. **Auto-rename incoming scans** — Claude reads the PDF, identifies client + doc type + date, names it to convention
3. **Dedup pass** — Claude compares near-duplicates and tells you which to keep
4. **Semantic search** — "Find the Pinnacle wire-setup conversation from last spring" — the highest-leverage feature once the naming is solid`,
    notSolvable:
      "Forcing every coworker to name files correctly. That's a discipline problem. AI lowers the cost of doing it right, doesn't eliminate the temptation to skip.",
    tutorialSlugs: [
      "dropbox-naming-convention",
      "dropbox-auto-rename",
      "dropbox-dedup",
      "dropbox-semantic-search",
    ],
  },
  {
    id: "monday-fragility",
    emoji: "📋",
    title: "Monday.com fragility",
    oneLiner:
      "Diagnose broken automations, build safer ones, and add a health-check layer.",
    affectedRoleIds: [
      "legal-ops-director",
      "financial-advisor",
      "accounting-lead",
    ],
    effort: "Medium",
    description: `**The pain:** Monday boards are described as "great proofs of concept" that don't quite work seamlessly. The real-world failure: the ILIT board's automations were running, but documents were going out to clients with autofilled fields that were wrong. The backstop — manually checking whether the automation worked — ended up taking longer than doing the task by hand.

**This is the most dangerous theme in the survey** because the failure mode is silent. More AI layered on top of broken automations doesn't help.

**What works today:**
- **Audit existing automations with Claude** before building anything new. Paste the config + a failure case → Claude diagnoses.
- **Replace high-stakes Monday automations with Python+Claude scripts** that hit the Monday API. More transparent, more debuggable, logs available.
- **Daily health-check digest** posted to Telegram: "did everything that was supposed to run, actually run?"`,
    tutorialSlugs: [
      "monday-audit-automation",
      "monday-safe-automation",
      "automation-diagnostics",
    ],
  },
  {
    id: "qbo-accounting",
    emoji: "💰",
    title: "QBO, bill pay & multi-entity accounting",
    oneLiner:
      "Anomaly-aware bill pay, AR follow-ups, multi-entity close — all of accounting's heaviest workflows.",
    affectedRoleIds: ["accounting-lead"],
    effort: "Medium",
    description: `**The pain:** The Accounting Lead runs accounting for 11+ entities — $4.1M across 460 bills last year, with 3,906 individual time entries logged. Recurring bills get manually clicked through even when nothing changed from prior period. AR/invoicing spans QBO + Monday + UltraTax + email + institutional knowledge. Multi-entity close repeats the same workflow 11 times.

**What works today:** Anthropic ships a QuickBooks Online MCP connector with deep coverage — AP/AR aging, balance sheet, sales reports, invoices (create/update/send), payment links, payroll, customers, products. Connect Claude to one QBO file and start automating immediately.

**Honest limitation:** Claude only supports one QBO company connection at a time. Multi-entity work means sequential per-entity sessions or a Python wrapper that calls the QBO API directly across all 11 files.

**Pilot pattern:** Pick the highest-volume entity. Run bill-pay anomaly review for one month. Measure time saved. Expand entity-by-entity.`,
    notSolvable:
      "Firm-wide multi-entity automation in one Claude session. Needs custom development or a wrapper script.",
    tutorialSlugs: [
      "qbo-bill-anomaly",
      "qbo-ar-followup",
      "qbo-month-close",
    ],
  },
  {
    id: "document-review",
    emoji: "📜",
    title: "Document review & drafting (legal, estate, tax)",
    oneLiner:
      "Estate doc summaries, contract redlines, tax source-doc checklists — Claude's single strongest capability.",
    affectedRoleIds: ["legal-ops-director", "tax-lead", "paralegal"],
    effort: "Low",
    description: `**The pain:** A meaningful share of legal and tax work is reading long documents, drafting from templates, and comparing new docs to known-good versions. Each of these is a clear Claude strength.

**What works today:**
- **Estate document review** — 60-page trust doc → summary of key terms, trustee powers, non-standard clauses, in 2 minutes vs an hour of reading
- **Contract redline** — compare incoming contract to standard template, get a plain-English redline
- **First-draft estate documents** — Claude Skills hold the fill-in templates; provide the facts, get a first draft
- **Tax return source-doc checklist** — Claude reads a stack of source PDFs, produces "what's in, what's missing"
- **Cumulative client note per year** — one rolling summary, updated each time new docs come in

**The senior-review rule:** Claude drafts. A human signs.`,
    tutorialSlugs: [
      "estate-doc-review",
      "contract-redline",
      "tax-source-doc-checklist",
      "cumulative-client-note",
    ],
  },
  {
    id: "compliance-reminders",
    emoji: "⏰",
    title: "Compliance calendar & smart reminders",
    oneLiner:
      "Context-aware reminders that surface what's actually at risk this week.",
    affectedRoleIds: ["paralegal", "accounting-lead", "admin-manager"],
    effort: "Low",
    description: `**The pain:** Monday handles recurring obligations fairly well, but reminders are dumb — they say "X is due" without knowing whether the prerequisites are done or whether anything's actually started. The Paralegal wants "more advanced automated reminders."

**What smart looks like:** instead of *"GA sales tax due on the 15th,"* Claude says *"GA sales tax is due in 5 days and the prior-month JE hasn't been posted yet — close that first."* Reminders with context.

**What works today:** a daily Claude job reads Monday boards + calendar + inbox → 1-paragraph "what's at risk, what's overdue, what hasn't started" digest → posts to Telegram.`,
    tutorialSlugs: [
      "smart-compliance-reminders",
      "skill-daily-briefing",
      "skill-deadline-watcher",
    ],
  },
  {
    id: "cross-entity-comms",
    emoji: "🔄",
    title: "Cross-entity communication & info flow",
    oneLiner:
      "Make handoffs between departments lossless without spamming Telegram.",
    affectedRoleIds: [
      "legal-ops-director",
      "admin-manager",
      "client-resource-specialist",
    ],
    effort: "Medium",
    description: `**The pain:** *"How do we get info from legal to tax seamlessly without just letting someone know via Telegram?"* Context lives in heads, threads, and scattered Monday items. Hand-offs are lossy.

**What works today:**
- **Brookhaven Telegram bot** — DM "what's the status of TKI close?" → bot queries Monday + Dropbox + QBO → answers
- **Auto-routed handoff messages** — when a Monday item flips from "Legal: complete" to "Tax: ready," Claude generates the handoff with all needed context
- **Daily team digest** — 1-paragraph "yesterday + today" per team, posted each morning`,
    tutorialSlugs: [
      "telegram-bot-bh",
      "teams-action-items",
      "shared-inbox-triage",
      "claude-cowork-101",
      "cowork-monday-standup",
      "skill-meeting-prep",
      "skill-client-context",
    ],
  },
  {
    id: "time-tracking",
    emoji: "⏱️",
    title: "Time tracking & passive attribution",
    oneLiner:
      "The hardest pain in the survey — partial wins available, not a clean solve.",
    affectedRoleIds: ["accounting-lead"],
    effort: "High",
    description: `**The pain:** 3,906 individual time entries in one year, switching in 10–20 minute increments. A meaningful share of client work gets lumped into internal codes because re-coding small fragments is impractical.

**Honest assessment:** This is the hardest theme. True passive tracking needs OS-level access to active-window data — not Claude's strong suit out of the box.

**Partial wins:**
- A local script that takes a screenshot every N minutes and asks Claude "what client is this?" — opt-in, privacy-sensitive
- Workforce timesheet API integration: Claude proposes corrections at EOD rather than starting from scratch
- Microsoft Viva Insights (if Brookhaven is on the right M365 plan) gives passive activity tracking based on Outlook/Teams/Files

Worth a discovery conversation before committing to a build path.`,
    notSolvable:
      "Fully passive, accurate time tracking without OS-level instrumentation or a paid Microsoft Viva Insights plan.",
    tutorialSlugs: [],
  },
];

export const themesById = Object.fromEntries(themes.map((t) => [t.id, t]));
