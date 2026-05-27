# Brookhaven AI Adoption — Coworker Pain-Point Analysis & AI Solutions Map

**Source:** anonymized internal survey, 8 responses, May 21–27, 2026
**Tools in our stack:** Outlook · Telegram · Dropbox · Adobe (PDF) · Monday.com · Teams
**Secondary tools mentioned:** QuickBooks Online, UltraTax, Concur, AMEX, ADP, Workforce, Posh, OneDrive

This doc maps every reported pain point to a concrete AI/Claude solution, grouped by theme, with honest "not yet solvable" callouts. It's the source material for the role-specific tutorials we publish on the BH AI Adoption hub.

**Anonymized role IDs used throughout this doc and the web app:**

| Role ID | Department |
|---|---|
| `client-resource-specialist` | Client services / inbound comms |
| `financial-advisor` | Advisory / leadership |
| `paralegal` | Legal |
| `tax-lead` | Tax |
| `accounting-lead` | Accounting / operations |
| `legal-ops-director` | Legal operations leadership |
| `strategy-lead` | Strategy / leadership |
| `admin-manager` | Administrative management / flex |

---

## 🎯 TL;DR — the 5 highest-leverage opportunities

| # | Opportunity | Roles affected | Effort to solve |
|---|---|---|---|
| 1 | **AI-drafted communications** (email, AR follow-ups, status updates) | Tax Lead, Accounting Lead, Client Resource Specialist, Admin Manager | 🟢 Low — works today with Claude.ai or Claude in Chrome |
| 2 | **Cross-system semantic search** ("find that Pinnacle setup convo") | Accounting Lead, Legal Ops Director, Admin Manager, Client Resource Specialist | 🟡 Medium — needs Dropbox/Outlook MCP wiring |
| 3 | **Document review & drafting** (estate docs, contracts, tax return prep) | Legal Ops Director, Tax Lead, Paralegal | 🟢 Low — Claude excels here; just need workflow templates |
| 4 | **QBO + bill pay + invoicing assistance** (per-entity) | Accounting Lead (massive) | 🟡 Medium — QBO MCP exists but one-company-at-a-time |
| 5 | **Dropbox hygiene** (naming, deduping, auto-rename scanned PDFs) | Client Resource Specialist, Legal Ops Director, Admin Manager | 🟠 Mixed — half process discipline, half AI |

The single most important meta-takeaway: **the Legal Ops Director explicitly warned us against over-automating** (and the Accounting Lead echoed it). The ILIT-board failure mode — automation runs, output is wrong, nobody notices — is the risk to design against. Every recommendation below assumes human-in-the-loop by default.

---

## 🧭 The 8 cross-cutting themes

### Theme 1 — Email triage & drafting ✉️

**Roles affected:** Client Resource Specialist (compliance emails), Tax Lead (client emails), Accounting Lead (inbox triage + AR follow-ups), Admin Manager (shared inbox routing)

**What's possible today:**
- **Claude in Chrome extension** — sits on top of Outlook web. Highlight a thread, ask "summarize," "draft a reply that says we still need the W-9," "is this urgent?". Nothing leaves the browser unless you click send.
- **Claude.ai (chat) with saved prompts** — each person builds a small library of templates: "AR follow-up @ 45 days," "trustee statement cover note," "client checklist nudge." Paste situation → get draft.
- **Claude Skills** — define one "Brookhaven email voice" skill that captures our standard tone, signatures, phrasings. Everyone reuses it, voice stays consistent.

**Not solvable today:** Native auto-drafting inside Outlook desktop without copy/paste. (Microsoft Copilot for M365 does this, but it's a separate paid plan; Claude doesn't have a first-party Outlook plugin yet.)

---

### Theme 2 — Dropbox chaos & document management 📁

**Roles affected:** Client Resource Specialist (duplicates), Legal Ops Director (no naming convention, no clear structure), Admin Manager (file routing), Accounting Lead (cross-system search)

**Legal Ops Director's framing is the right one:** *"A pause needs to happen where we clean up what we have… If I go to Dropbox and something is not there, I need to know it's because we actually don't have it."* This is **process before AI**.

**What's possible today:**
- **Step 1 (no AI): Lock in a naming convention and folder tree.** Publish a 1-pager: `YYYY-MM-DD_ClientCode_DocType_Description.pdf`. AI can help enforce it, but only after humans agree on the rule.
- **Auto-rename incoming PDFs with Claude** — drop an un-named scan in a watched folder; Claude reads it, identifies client + doc type + date, renames it to convention, moves it to the right subfolder.
- **Duplicate detection** — Claude reads 2 PDFs, tells you whether they're the same doc.
- **Semantic search over Dropbox** — "show me the Pinnacle wire-setup conversation from last spring." **#1 ROI feature** if we build it.

**Not solvable today:** Forcing every coworker to name files correctly. That's a discipline problem.

---

### Theme 3 — Monday.com fragility 📋

**Roles affected:** Legal Ops Director (ILIT board sending wrong docs), Financial Advisor (broken automations across systems), Accounting Lead (handoffs)

**The most dangerous theme** because the failure mode is silent. Adding more AI on top of broken automations makes this worse, not better.

**What's possible today:**
- **Audit existing automations with Claude** — diagnose-first pattern.
- **Replace brittle Monday automations with scripted ones** — Monday API + Claude scripts are more debuggable than built-in automations.
- **Health-check digest** — daily job that pings Monday API, posts a Telegram alert if anything didn't run.

---

### Theme 4 — QBO, bill pay & multi-entity accounting 💰

The Accounting Lead single-handedly runs accounting for 11+ entities — $4.1M across 460 bills last year, 3,906 individual time entries. Highest-volume opportunity in the entire survey.

**Headline opportunities:**

1. **AI-assisted recurring bill processing** with anomaly detection.
2. **Auto-categorization with per-entity learning** + confidence scores.
3. **AR/invoicing module** with relationship-aware follow-up drafts.
4. **Multi-entity close dashboard** — one view across all entities.

**What's possible *today* with Claude:**
- Anthropic ships a **QuickBooks Online MCP connector** with deep coverage:
  - AP/AR aging (detail + summary), balance sheet, sales reports
  - Invoices: create, update, send, get, delete, duplicate
  - Payment links: create, send
  - Estimates: create, update, send, delete, duplicate
  - Payroll: employees, payslips, deductions, time-off, pay types, last payroll run
  - Contacts: customers (create + search)
  - Catalog: products (create + search)
  - Reports: cash-flow generator, P&L generator, benchmarking
- Limitation: one QBO company per Claude connection. Workaround: sequential per-entity workflows, or a wrapper script calling QBO API directly.

---

### Theme 5 — Document review & drafting (legal, estate, tax) 📜

**Roles affected:** Legal Ops Director (estate docs, contracts, HR — 30% of day), Tax Lead (tax return prep), Paralegal (legal tasks)

**Claude's strongest single capability.**

- Estate document review — drop a 60-page trust doc into Claude, ask "summarize key terms, list all the trustee powers, flag anything non-standard."
- Contract redline — Claude compares incoming contract against your standard template, produces plain-English redline.
- First-draft estate documents — Claude Skills hold the fill-in templates.
- Tax return source-doc review — checklist of what's in and what's missing.
- Cumulative client note (Tax Lead asked for this directly) — one rolling summary per client per year.

---

### Theme 6 — Compliance calendar & reminders ⏰

**Roles affected:** Paralegal ("more advanced automated reminders"), Accounting Lead (compliance calendar), Admin Manager (compliance reports)

- Claude as a daily compliance summarizer — morning Telegram digest.
- Anomaly reminders — "GA sales tax is due in 5 days and the prior-month JE hasn't been posted yet."
- 2-weeks-out scanning for recurring obligations.

---

### Theme 7 — Cross-entity communication 🔄

**Roles affected:** Legal Ops Director (legal→tax handoff), Admin Manager (cross-dept flex), Client Resource Specialist (multi-system tracking)

- Telegram bot powered by Claude for "what's the status of X?" queries.
- Auto-routed handoff messages with full context.
- Daily digest per team.

---

### Theme 8 — Time tracking & passive attribution ⏱️

**Role:** Accounting Lead (3,906 time entries in 2025).

- Hardest theme. Needs OS-level access for true passive tracking.
- Partial: screenshot-based classification (privacy-sensitive, opt-in only).
- Workforce API integration if available — Claude proposes corrections.

---

## 👥 Per-role quick wins — what each coworker should try first

| Role | First win to ship |
|---|---|
| Client Resource Specialist | Dropbox duplicate detector + checklist auto-update from email mentions |
| Financial Advisor | Claude-assisted automation diagnostics (paste broken flow, get fix) |
| Paralegal | Claude-powered smart reminders + social media post drafting |
| Tax Lead | First-draft email + PDF summary + cumulative client note |
| Accounting Lead | Claude+QBO bill-pay anomaly review (one entity to start) |
| Legal Ops Director | Estate doc summary + contract redline |
| Strategy Lead | Claude as a strategy thinking partner + research workflows |
| Admin Manager | Shared inbox triage + cross-system status digest |

---

## 🛠️ Per-tool playbook

| Tool | What Claude/Cowork can do **today** | Notes |
|---|---|---|
| **Outlook** | Draft replies, summarize threads, triage urgency — via Claude in Chrome on Outlook web | No native Outlook plugin from Anthropic |
| **Telegram** | Build a BH bot for queries + daily digests + newsletter delivery via Bot API | Posting-only by default for privacy |
| **Dropbox** | Semantic search, auto-rename scans, dedup, summarization via Dropbox MCP | Process must come first |
| **Adobe PDF** | Adobe = viewer; Claude = reader. Native multi-page PDF support | Stronger than Adobe AI for legal/tax docs |
| **Monday.com** | Read/write via Monday API. Replace fragile native automations with debuggable Claude scripts | Heed the over-automation warning |
| **Teams** | Pipe transcripts → Claude → action items, decisions, follow-ups | Teams' own Recap is fine; Claude wins for structured output |
| **QBO** | Anthropic QBO MCP with broad coverage (AP/AR, invoices, payroll, payments) | One company per connection |
| **UltraTax/Concur/ADP** | No first-party connectors. Treat as data sources (CSV, screenshots, PDFs) | Custom integration possible |

---

## 🚫 What we **can't** solve well (yet)

| Limitation | Why | What to tell coworkers |
|---|---|---|
| Multi-entity QBO automation in one go | One company per Claude connection | "One entity at a time today; firmwide needs custom work" |
| Native Outlook desktop auto-drafting | No Anthropic Outlook plugin | "Use Claude in Chrome on Outlook web" |
| Fully unattended client-facing automation | ILIT failure mode is real | "Every client-touching automation needs a human gate" |
| Forcing perfect file naming | Discipline problem | "AI reduces the cost of doing it right, doesn't eliminate laziness" |
| Replacing senior review on legal/tax output | Liability | "Claude drafts. A human signs." |
| Truly passive time tracking | OS-level access needed | "Partial wins via screenshots + opt-in" |

---

## 🗺️ Recommended rollout order

1. **Week 1–2:** universal entry points — email + PDF
2. **Week 3–4:** Dropbox hygiene push
3. **Week 5–6:** Accounting Lead pilot — Claude+QBO on one entity
4. **Week 7–8:** cross-system search
5. **Week 9+:** department-specific deep dives
6. **Continuous:** weekly newsletter + Monday meeting
