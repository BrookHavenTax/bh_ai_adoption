export type ClaudeModel = "Opus" | "Sonnet" | "Haiku";

export interface ModelGuide {
  model: ClaudeModel;
  fullName: string;
  tagline: string;
  useWhen: string[];
  speedCost: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  /** Which roles this prompt is aimed at (role IDs from roles.ts) */
  forRoleIds: string[];
  /** One sentence: when you'd reach for this */
  scenario: string;
  /** The copyable template — use [BRACKETS] for things the user fills in */
  prompt: string;
  /** Recommended model */
  model: ClaudeModel;
  /** One sentence: why that model */
  modelReason: string;
  /** Optional usage tip */
  tip?: string;
}
