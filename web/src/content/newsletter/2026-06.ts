import type { NewsletterIssue } from "./types";

/**
 * SAMPLE FIRST ISSUE.
 *
 * Hand-curated to demonstrate the format and tone. Future issues will be
 * auto-generated each month by the script at /scripts/generate-newsletter.ts
 * and committed by GitHub Actions on the 1st of each month.
 *
 * The content below is illustrative — the items reference real ongoing
 * discussions (TCJA expiration, SALT cap, CTA enforcement, GA flat-tax
 * reductions) but the specific dollar figures and statuses are placeholder
 * — verify against primary sources before relying on any of it.
 */

export const june2026: NewsletterIssue = {
  month: "2026-06",
  monthLabel: "June 2026",
  publishedDate: "2026-06-01",
  authorship: "hand-curated",
  intro: `Welcome to the first **BH Monthly** — a digestible-bites roundup of what's moving in tax legislation and (secondarily) what's new in AI tooling relevant to our work.

The format is simple: each item is one paragraph plain English, what it means for our clients, and a link to the primary source. Skim it in 90 seconds. Read deeper on anything that looks like it'll hit your desk.`,

  taxLegislation: [
    {
      title: "TCJA individual provisions still set to expire end of 2025",
      summary:
        "Most individual tax cuts from the 2017 Tax Cuts and Jobs Act sunset on December 31, 2025 unless Congress acts. That includes the lower marginal rates, the expanded standard deduction, the larger estate/gift exemption, and the 199A passthrough deduction. Both chambers have introduced extension bills with notable differences; reconciliation is the most-likely path but timing is uncertain.",
      status: "Proposed bill",
      scope: "Federal",
      whatItMeans:
        "Plan estate-doc reviews now for clients with estates approaching the current ~$13.6M exemption — that figure could drop to roughly half if nothing passes. For middle-bracket clients, rate brackets revert to pre-TCJA percentages, which raises ordinary-income tax for most BH clients.",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "high",
      sources: [
        {
          label: "Congress.gov bill tracker",
          url: "https://www.congress.gov/",
        },
        {
          label: "Tax Foundation analysis",
          url: "https://taxfoundation.org/",
        },
      ],
    },
    {
      title: "SALT cap renegotiation — multiple proposals on the table",
      summary:
        "The $10,000 cap on state and local tax deductions is one of the most-debated TCJA expiring provisions. Proposals range from full repeal (favored in high-tax-state delegations) to raising the cap to $20K (the House compromise floated this spring) to letting it sunset entirely. No consensus yet.",
      status: "Committee markup",
      scope: "Federal",
      whatItMeans:
        "Most BH clients in GA aren't capped today, but our clients with significant property in high-property-tax counties or multi-state residences are. Worth flagging in current-year planning conversations even though the rule won't change for 2026 filings.",
      affectsBrackets: ["High net worth", "Ultra high net worth"],
      impact: "medium",
      sources: [
        {
          label: "Tax Policy Center",
          url: "https://www.taxpolicycenter.org/",
        },
      ],
    },
    {
      title: "BOI / Corporate Transparency Act reporting — enforcement still in flux",
      summary:
        "The Corporate Transparency Act's beneficial ownership reporting requirement has gone through multiple court injunctions and partial stays. Current state: enforcement is paused for most domestic entities pending further legal resolution, but the reporting framework remains on the books and FinCEN's portal is operational.",
      status: "Court / regulatory action",
      scope: "Federal",
      whatItMeans:
        "Continue tracking which BH-managed entities would have a reporting obligation if enforcement resumes. Don't let clients assume the requirement is permanently dead — the framework still exists and could re-activate on short notice.",
      affectsBrackets: ["High net worth", "Ultra high net worth"],
      impact: "medium",
      sources: [
        {
          label: "FinCEN BOI page",
          url: "https://www.fincen.gov/boi",
        },
      ],
    },
    {
      title: "Georgia flat income tax rate dropped to 5.39% effective January 2026",
      summary:
        "Georgia's scheduled flat-tax reductions continued in January 2026 with the rate dropping from 5.49% to 5.39%. The state is on a glide path to 4.99% by 2029, contingent on revenue triggers.",
      status: "Effective",
      scope: "GA state",
      whatItMeans:
        "Modest reduction for all GA-resident clients. Update tax projections going forward. The bigger story is the 2029 target — worth modeling for long-range planning.",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "low",
      sources: [
        {
          label: "GA Department of Revenue",
          url: "https://dor.georgia.gov/",
        },
      ],
    },
    {
      title: "IRS announces 2026 inflation adjustments for retirement contributions",
      summary:
        "Annual inflation-adjusted contribution limits for 401(k), IRA, and HSA accounts were released by the IRS in late Q4 2025 and apply to the 2026 tax year. 401(k) employee deferral limit rose modestly. Catch-up contribution rules for those 50+ remain at current levels.",
      status: "Effective",
      scope: "Federal",
      whatItMeans:
        "Update client planning documents and engagement worksheets with the new limits. Especially relevant for UHNW clients doing year-end Roth conversions or high earners maxing 401(k) + catch-up.",
      affectsBrackets: ["Middle class", "High net worth", "Ultra high net worth"],
      impact: "informational",
      sources: [
        {
          label: "IRS Newsroom",
          url: "https://www.irs.gov/newsroom",
        },
      ],
    },
  ],

  aiTools: [
    {
      title: "Anthropic releases Claude with extended context window",
      summary:
        "Claude's context window expanded substantially in a recent release, allowing much longer documents (entire trust deeds, full client files) to be processed in a single conversation. The pricing model adjusts for very-long-context queries.",
      whatItMeans:
        "For estate doc reviews, this means dropping a 60+ page trust into Claude in one chat instead of splitting it. Worth a small re-test on the estate-doc-review workflow.",
      impact: "medium",
      sources: [
        {
          label: "Anthropic news",
          url: "https://www.anthropic.com/news",
        },
      ],
    },
    {
      title: "QuickBooks Online MCP connector adds journal entry write access",
      summary:
        "Anthropic's QBO connector previously supported reads + most invoice/payment writes; the recent update adds direct journal entry creation. Still requires explicit per-call authorization in the Claude.ai UI.",
      whatItMeans:
        "For Will's monthly close workflow, this could replace manual JE posting for recurring items (depreciation, intercompany). Still apply the read-only-first discipline before granting JE write access.",
      impact: "medium",
      sources: [
        {
          label: "Claude Cowork connectors",
          url: "https://www.anthropic.com/news",
        },
      ],
    },
  ],

  closing: `That's it for the first issue. Got something we should track or include next month? Drop it in the #ai-adoption Telegram channel.`,
};
