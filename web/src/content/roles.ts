import type { Role } from "./types";

export const roles: Role[] = [
  {
    id: "client-resource-specialist",
    title: "Client Resource Specialist",
    department: "Client services",
    oneLiner: "First line of contact for client comms, A/R calls, and document tracking.",
    topPainPoints: [
      "Opening multiple apps and programs to track documents and update checklists",
      "Dropbox duplicates — reviewing the same document multiple times",
      "Manual checklist updates across many client engagements",
    ],
    firstWin:
      "Dropbox duplicate detector + auto-updating the client checklist from email mentions.",
    recommendedTutorialSlugs: [
      "email-first-draft",
      "dropbox-dedup",
      "checklist-auto-update",
      "pdf-summary-30sec",
    ],
  },
  {
    id: "financial-advisor",
    title: "Financial Advisor",
    department: "Advisory / leadership",
    oneLiner:
      "Process improvement, executive decisions, business development, and the firm's automation backbone.",
    topPainPoints: [
      "Broken integrations and automations between systems",
      "Legacy automations that need intelligent guidance to modernize",
      "Diagnosing where a multi-system workflow breaks",
    ],
    firstWin:
      "Paste a broken automation flow into Claude and get a diagnosis + fix proposal.",
    recommendedTutorialSlugs: [
      "automation-diagnostics",
      "monday-audit-automation",
      "monday-safe-automation",
    ],
  },
  {
    id: "paralegal",
    title: "Paralegal",
    department: "Legal",
    oneLiner: "Legal tasks, task-board work, social media, and office support.",
    topPainPoints: [
      "Wants more advanced automated reminders",
      "Repetitive social media post drafting (40% of the day)",
    ],
    firstWin:
      "Build a smart reminder system that surfaces what's actually at risk this week, plus a Claude-powered social media drafting workflow.",
    recommendedTutorialSlugs: [
      "smart-compliance-reminders",
      "social-media-drafting",
      "pdf-summary-30sec",
    ],
  },
  {
    id: "tax-lead",
    title: "Tax Lead",
    department: "Tax",
    oneLiner:
      "Tax return prep, direct client email contact, billing, accounting tasks. Senior and willing-but-cautious adopter.",
    topPainPoints: [
      "Email responses — wants automated first drafts",
      "Client data submission — wants document data summaries",
      "Wants one cumulative note per client per year",
    ],
    firstWin:
      "First-draft email assistant + PDF source-doc summary + a rolling cumulative client note.",
    recommendedTutorialSlugs: [
      "email-first-draft",
      "pdf-summary-30sec",
      "cumulative-client-note",
      "tax-source-doc-checklist",
      "claude-skill-bh-voice",
    ],
  },
  {
    id: "accounting-lead",
    title: "Accounting Lead",
    department: "Accounting / operations",
    oneLiner:
      "Full bookkeeping + AP/AR + payroll across 11+ entities. Highest-volume role in the firm. $4.1M / 460 bills / 3,906 time entries last year.",
    topPainPoints: [
      "Bill Pay is high-volume, low-margin clicking (460 bills last year)",
      "Time allocation is imprecise because work happens in 10–20 min increments",
      "Quarterly fee billing is a stop-and-start surge in March–May",
      "AMEX → Concur → QB reconciliation is a three-system loop",
      "Multi-entity monthly financials is repetitive across 11+ entities",
      "AR/invoicing spans 5 disconnected systems",
      "Cross-system search is non-existent",
    ],
    firstWin:
      "Claude + QBO connector for bill-pay anomaly review on ONE entity. Prove the pattern, then expand.",
    recommendedTutorialSlugs: [
      "qbo-bill-anomaly",
      "qbo-ar-followup",
      "qbo-month-close",
      "dropbox-semantic-search",
      "email-first-draft",
    ],
  },
  {
    id: "legal-ops-director",
    title: "Legal Operations Director",
    department: "Legal operations leadership",
    oneLiner:
      "Estate drafting, contract review, trust operations, HR, in-house counsel work. 30% of the day is drafting/review.",
    topPainPoints: [
      "Dropbox needs organizational cleanup before more automation is added",
      "Scanned documents arrive with no naming context",
      "Monday boards are 'great proofs of concept' but don't work seamlessly",
      "HR needs serious cleanup",
      "Cross-entity info handoff (legal → tax) is informal and lossy",
    ],
    firstWin:
      "Estate doc summary + contract redline workflow with Claude. Direct match to 30% of the workday.",
    recommendedTutorialSlugs: [
      "estate-doc-review",
      "contract-redline",
      "dropbox-naming-convention",
      "monday-safe-automation",
    ],
  },
  {
    id: "strategy-lead",
    title: "Strategy Lead",
    department: "Strategy / leadership",
    oneLiner:
      "30% thinking through new strategies, 15% research, 15% client/internal comms. Heavy CO-WORK proponent.",
    topPainPoints: [
      "No specific friction surfaced — wants to see capabilities to know what's possible",
    ],
    firstWin:
      "Claude as a strategy thinking partner — structured brainstorming and research workflows.",
    recommendedTutorialSlugs: [
      "strategy-thinking-partner",
      "pdf-summary-30sec",
      "email-first-draft",
    ],
  },
  {
    id: "admin-manager",
    title: "Administrative Manager",
    department: "Administrative / flex",
    oneLiner:
      "Daily compliance reports, shared inbox monitoring, file management, cross-departmental flex role.",
    topPainPoints: [
      "Shared inbox triage and assignment",
      "File management — staff should be able to save/recover docs themselves",
      "Highly variable role makes it hard to identify automation points",
    ],
    firstWin:
      "Shared inbox triage with Claude in Chrome + cross-system daily digest in Telegram.",
    recommendedTutorialSlugs: [
      "shared-inbox-triage",
      "smart-compliance-reminders",
      "dropbox-semantic-search",
    ],
  },
];

export const rolesById = Object.fromEntries(roles.map((r) => [r.id, r]));
