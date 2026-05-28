export type NewsletterItemImpact = "high" | "medium" | "low" | "informational";

export type LegislativeStatus =
  | "Idea/Discussion"
  | "Proposed bill"
  | "Committee markup"
  | "Passed one chamber"
  | "Passed both chambers"
  | "Signed into law"
  | "Effective"
  | "Stalled"
  | "Court / regulatory action"
  | "Withdrawn";

export interface NewsletterSource {
  label: string;
  url: string;
}

export interface NewsletterItem {
  /** Short headline, 5-12 words */
  title: string;
  /** 2-3 sentence plain-English summary of what's actually happening */
  summary: string;
  /** Tax items only: legislative state */
  status?: LegislativeStatus;
  /** Federal / GA / multi-state / specific state */
  scope?: string;
  /** 1-2 sentences specific to BrookHaven's clients and workflow */
  whatItMeans: string;
  /** Which client groups are affected (purely informational) */
  affectsBrackets?: string[];
  /** How much should we care this month */
  impact: NewsletterItemImpact;
  /** Primary sources — IRS, Treasury, Congress.gov, etc. */
  sources: NewsletterSource[];
}

export interface NewsletterIssue {
  /** "2026-06" */
  month: string;
  /** Human-readable e.g. "June 2026" */
  monthLabel: string;
  /** ISO date this issue was published */
  publishedDate: string;
  /** 1-2 paragraph editor's note. Markdown allowed. */
  intro: string;
  /** Section 1 — primary focus per BrookHaven leadership */
  taxLegislation: NewsletterItem[];
  /** Optional message if section is empty */
  noTaxNews?: string;
  /** Section 2 — secondary, AI tools relevant to BrookHaven workflows */
  aiTools: NewsletterItem[];
  noAiNews?: string;
  /** Optional closing note from the editor */
  closing?: string;
  /** Was this issue auto-generated, hand-curated, or hybrid? */
  authorship: "auto-generated" | "hand-curated" | "hybrid";
}
