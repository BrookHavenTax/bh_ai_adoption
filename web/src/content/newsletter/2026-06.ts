import type { NewsletterIssue } from "./types";

/**
 * BrookHaven Monthly — June 2026.
 *
 * Web-researched and assembled in-session (hybrid authorship). All items
 * link to primary or reputable secondary sources — verify against the
 * source before relying on any specific figure. Future issues are produced
 * the same way on a monthly cadence.
 *
 * Research date: 2026-05-28.
 */

export const june2026: NewsletterIssue = {
  month: "2026-06",
  monthLabel: "June 2026",
  publishedDate: "2026-06-01",
  authorship: "hybrid",
  intro: `Welcome to **BrookHaven Monthly**. The headline this month is one big correction to a story we've been bracing for: **the TCJA "cliff" is gone.** The One Big Beautiful Bill Act (signed July 2025) made most of the 2017 tax cuts permanent — so the planning math we'd been running for a 2026 sunset no longer applies. The estate exemption actually went *up*, not down.

Closer to home, **Georgia signed HB 463 on May 11** — a faster rate cut plus new tips/overtime relief. And on the AI side, **Claude for Small Business launched May 13** with a Monthly Close workflow that maps almost exactly to what Will does across our entities. Details below — skim in 90 seconds, dig in where it touches your desk.`,

  taxLegislation: [
    {
      title: "OBBBA made most TCJA provisions permanent — the 2026 cliff is gone",
      summary:
        "The One Big Beautiful Bill Act (P.L. 119-21), signed July 4, 2025, permanently extended most of the individual provisions from the 2017 Tax Cuts and Jobs Act that had been scheduled to sunset after 2025. That includes the seven-bracket rate structure (no rate increase for 2026), the higher standard deduction, the 20% Section 199A passthrough deduction, and the doubled estate/gift exemption. It also added several new provisions.",
      status: "Signed into law",
      scope: "Federal",
      whatItMeans:
        "Any client planning built around a 2026 TCJA sunset needs to be re-run. Lower brackets, the 199A deduction, and the large estate exemption are now the baseline — not a temporary window closing. This is the single biggest planning update of the year; flag it for any client we told to act 'before the 2025 cliff.'",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "high",
      sources: [
        {
          label: "Congress.gov — TCJA expiring provisions reference (CRS)",
          url: "https://www.congress.gov/crs-product/R47846",
        },
        {
          label: "RSM — Congress passes TCJA-extension tax bill",
          url: "https://rsmus.com/insights/services/business-tax/big-beautiful-bill-tax.html",
        },
      ],
    },
    {
      title: "Estate & gift exemption rises to $15M per individual for 2026",
      summary:
        "Rather than dropping toward roughly $7M as a TCJA sunset would have forced, the basic exclusion amount increased to $15 million per individual for decedents dying (and gifts made) in 2026, up from about $13.99 million for 2025. The exemption is now on a permanent, inflation-indexed footing under OBBBA.",
      status: "Effective",
      scope: "Federal",
      whatItMeans:
        "Direct impact on our estate and trust work. Clients we rushed toward gifting strategies ahead of a feared 2025 reduction now have more room and less time pressure. Worth a proactive review of ILIT funding and Crummey-letter cadence against the higher number — and a reassuring note to clients who were anxious about the cliff.",
      affectsBrackets: ["High net worth", "Ultra high net worth"],
      impact: "high",
      sources: [
        {
          label: "IRS — 2026 inflation adjustments (incl. OBBBA amendments)",
          url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
        },
      ],
    },
    {
      title: "Georgia HB 463 cuts the rate to 4.99% and adds tips/overtime relief",
      summary:
        "Governor Kemp signed HB 463 on May 11, 2026. It lowers Georgia's flat income tax rate to 4.99% effective January 1, 2026, sets up annual 0.125-point reductions starting in 2027 on a glide path toward 3.99%, and raises the standard deduction over time (single $12K to $15K in 2027; MFJ $24K to $30K). It also exempts up to $1,750 of tips and overtime pay from state tax from January 2026 through the end of 2028, and bumps the dependent deduction from $4,000 toward $6,000.",
      status: "Signed into law",
      scope: "GA state",
      whatItMeans:
        "Update GA projections for every Georgia-resident client now — the rate is already in effect for 2026. The tips/overtime exclusion is a new line to capture for clients with service-industry or hourly income in the family. The multi-year glide path is worth modeling into long-range plans for our higher-income GA clients.",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "medium",
      sources: [
        {
          label: "Office of the Governor — Kemp signs HB 463",
          url: "https://gov.georgia.gov/press-releases/2026-05-11/gov-kemp-signs-legislation-lowering-taxes-and-supporting-economic-growth",
        },
        {
          label: "Wilson Lewis — Georgia Sine Die 2026 summary",
          url: "https://www.wilsonlewis.com/georgia-sine-die-2026-income-tax-cuts-and-targeted-relief/",
        },
      ],
    },
    {
      title: "2026 IRS inflation adjustments: retirement limits and senior deduction up",
      summary:
        "The IRS released the 2026 inflation adjustments (reflecting OBBBA). 401(k)/403(b)/457 employee deferral limit rises to $24,500 with a $8,000 catch-up for those 50+; IRA limit to $7,500 with a $1,100 catch-up. A new enhanced senior deduction provides up to $6,000 (individual) or $12,000 (joint) for taxpayers 65+. The employer-provided childcare credit cap jumped from $150K to $500K ($600K for eligible small businesses). Standard deduction for 2026 is $32,200 MFJ / $16,100 single.",
      status: "Effective",
      scope: "Federal",
      whatItMeans:
        "Refresh planning worksheets and engagement checklists with the new limits before next season. The enhanced senior deduction is worth surfacing to our older clients in year-end conversations. The expanded employer childcare credit could matter for our business-owner clients.",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "informational",
      sources: [
        {
          label: "IRS — 2026 inflation adjustments",
          url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
        },
        {
          label: "IRS — One, Big, Beautiful Bill provisions",
          url: "https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions",
        },
      ],
    },
    {
      title: "CTA/BOI: domestic entities exempt, but the framework held up in court",
      summary:
        "FinCEN's March 2025 interim final rule exempts U.S.-created entities and U.S. persons from beneficial ownership reporting — only certain foreign reporting companies must file. Then on December 16, 2025, the Eleventh Circuit ruled the Corporate Transparency Act constitutional, so the framework remains valid and FinCEN is expected to issue a final rule in 2026. Separately, states are moving on their own: New York's LLC Transparency Act took effect January 1, 2026, and California is advancing its version.",
      status: "Court / regulatory action",
      scope: "Federal + multi-state",
      whatItMeans:
        "Our clients' domestic LLCs and entities are currently off the hook for federal BOI filing — but don't tell clients it's permanently dead. The court upheld the law and a final rule is expected. The bigger near-term watch item is state-level transparency acts: any client with a New York entity already has a 2026 obligation. Keep an entity-by-entity tracker.",
      affectsBrackets: ["High net worth", "Ultra high net worth"],
      impact: "medium",
      sources: [
        {
          label: "FinCEN — Beneficial Ownership Information",
          url: "https://www.fincen.gov/boi",
        },
        {
          label: "Treasury — suspension of CTA enforcement vs. domestic companies",
          url: "https://home.treasury.gov/news/press-releases/sb0038",
        },
        {
          label: "Greenberg Traurig — 11th Circuit declares CTA constitutional",
          url: "https://www.gtlaw.com/en/insights/2026/1/cta-update-eleventh-circuit-declares-cta-constitutional-beneficial-ownership-reporting-requirements-remain-unchanged",
        },
      ],
    },
  ],

  aiTools: [
    {
      title: "Claude for Small Business launches with a Monthly Close workflow",
      summary:
        "Anthropic launched Claude for Small Business on May 13, 2026 — a packaged set of connectors plus 15 ready-to-run agentic workflows that put Claude inside QuickBooks, PayPal, HubSpot, Canva, DocuSign, Google Workspace, and Microsoft 365. Standout workflows: a Monthly Close that reconciles books against settlements, flags discrepancies, writes a plain-English P&L, and produces a close packet to forward to an accountant; plus payroll planning, invoice chasing, margin analysis, contract review, and tax-season prep. Every workflow is owner-initiated and approval-based — nothing sends, posts, or pays without explicit sign-off.",
      whatItMeans:
        "This is the most BrookHaven-relevant AI release in months. The Monthly Close workflow maps almost exactly to what Will runs across 11+ entities, and 'invoice chasing' overlaps our AR follow-up work. The approval-based model is exactly the human-in-the-loop pattern we already require. Worth a pilot on one entity to compare against our current QBO + Claude tutorials.",
      impact: "high",
      sources: [
        {
          label: "Anthropic — Introducing Claude for Small Business",
          url: "https://www.anthropic.com/news/claude-for-small-business",
        },
        {
          label: "Axios — Anthropic's new Claude Code tools for small businesses",
          url: "https://www.axios.com/2026/05/13/anthropic-claude-small-business-smb",
        },
      ],
    },
    {
      title: "Claude Managed Agents gain memory ('dreaming') and two more features",
      summary:
        "Anthropic updated Claude Managed Agents with three new features, including 'dreaming' — agents review past sessions to find patterns and self-improve over time. This extends what a scheduled or recurring agent can do across runs.",
      whatItMeans:
        "Relevant to the way we'd automate recurring work — e.g. our monthly newsletter routine, or a recurring close-prep agent. Memory across runs means a recurring agent gets better at our specific patterns instead of starting cold each time. Worth watching as we lean further into scheduled automations.",
      impact: "low",
      sources: [
        {
          label: "9to5Mac — Claude Managed Agents get three new features",
          url: "https://9to5mac.com/2026/05/07/anthropic-updates-claude-managed-agents-with-three-new-features/",
        },
      ],
    },
    {
      title: "Claude adds 28 security/compliance integrations; Claude Code limits doubled",
      summary:
        "Anthropic expanded enterprise governance with 28 new security and compliance platform integrations (part of the Project Glasswing push, with Claude Security now in public beta). Separately, the Claude Code five-hour usage limit was doubled for Pro, Max, and Enterprise customers.",
      whatItMeans:
        "The governance integrations matter if we ever formalize firm-wide AI policy — they make Claude more auditable inside a regulated environment, which is the kind of thing a tax/legal firm's compliance posture benefits from. The Code limit increase is minor for us unless someone's doing heavy automation buildout.",
      impact: "low",
      sources: [
        {
          label: "SecurityWeek — Anthropic expands Claude's enterprise security reach",
          url: "https://www.securityweek.com/anthropic-expands-claudes-enterprise-security-reach-with-28-new-integrations/",
        },
      ],
    },
  ],

  closing: `That's June. The OBBBA permanence story is the one to internalize — it changes the framing for a lot of client conversations. Spotted something we should track next month? Drop it in the #ai-adoption Telegram channel.`,
};
