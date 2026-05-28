import type { NewsletterIssue } from "./types";
import { june2026 } from "./2026-06";

/**
 * All newsletter issues, newest first. New issues are added to this list
 * by the monthly generator (scripts/generate-newsletter.ts) which also
 * appends an import here.
 */
export const issues: NewsletterIssue[] = [june2026];

export const issuesByMonth = Object.fromEntries(
  issues.map((i) => [i.month, i]),
);

export function getLatestIssue(): NewsletterIssue | undefined {
  return issues[0];
}

export type { NewsletterIssue, NewsletterItem, NewsletterSource } from "./types";
