// Content type definitions for the BH AI Adoption hub.
// All content is typed and cross-linked by stable string IDs.

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type CalloutVariant = "tip" | "warning" | "info" | "success";
export type EffortBadge = "Low" | "Medium" | "High" | "Mixed";

/**
 * What kind of artifact this tutorial produces / teaches:
 * - Skill   — a reusable Claude Skill (claude.ai → Settings → Skills)
 * - Cowork  — uses a Claude connector to a 3rd-party system (QBO, Outlook, etc.)
 * - Project — a Claude.ai Project with knowledge + custom instructions
 * - Prompt  — a one-shot Claude.ai prompt pattern (no setup)
 * - Script  — Python/JS code that calls Claude (or other APIs)
 * - Process — discipline / convention with light AI assist
 */
export type TutorialFormat =
  | "Skill"
  | "Cowork"
  | "Project"
  | "Prompt"
  | "Script"
  | "Process";

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
  format: TutorialFormat;
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
  /**
   * Path to an MP3 narration of this tutorial, served from /public/audio/.
   * Optional — when present, an audio player appears at the top of the
   * tutorial. Produced by scripts/scripts-to-audio.py (see /scripts/README).
   */
  audioUrl?: string;
}
