// Content type definitions for the BH AI Adoption hub.
// All content is typed and cross-linked by stable string IDs.

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type CalloutVariant = "tip" | "warning" | "info" | "success";
export type EffortBadge = "Low" | "Medium" | "High" | "Mixed";

export interface Role {
  id: string;
  title: string;
  department: string;
  oneLiner: string;
  topPainPoints: string[];
  firstWin: string;
  recommendedTutorialSlugs: string[];
}

export interface Theme {
  id: string;
  emoji: string;
  title: string;
  oneLiner: string;
  affectedRoleIds: string[];
  effort: EffortBadge;
  description: string; // markdown
  notSolvable?: string;
  tutorialSlugs: string[];
}

export interface ToolPlaybook {
  id: string;
  name: string;
  emoji: string;
  category: "company-stack" | "secondary";
  whatItDoes: string;
  withClaudeToday: string; // markdown
  limitations: string;
  recommendedTutorialSlugs: string[];
}

export interface TutorialStep {
  title: string;
  body: string; // markdown
  prompt?: string; // shown in a copyable PromptBlock
  callout?: { variant: CalloutVariant; body: string };
}

export interface Tutorial {
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  difficulty: Difficulty;
  timeEstimate: string;
  audienceRoleIds: string[];
  themeIds: string[];
  toolIds: string[];
  aiTools: string[]; // e.g. ["Claude.ai", "Claude in Chrome"]
  prerequisites: string[];
  whenToUse: string;
  whenNotToUse?: string;
  steps: TutorialStep[];
  pitfalls: string[];
  relatedTutorialSlugs: string[];
}
