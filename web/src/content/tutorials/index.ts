import type { Tutorial } from "../types";
import { universalTutorials } from "./universal";
import { dropboxTutorials } from "./dropbox";
import { mondayTutorials } from "./monday";
import { qboTutorials } from "./qbo";
import { documentTutorials } from "./document";
import { commsTutorials } from "./comms";
import { roleSpecificTutorials } from "./role-specific";

export const tutorials: Tutorial[] = [
  ...universalTutorials,
  ...dropboxTutorials,
  ...mondayTutorials,
  ...qboTutorials,
  ...documentTutorials,
  ...commsTutorials,
  ...roleSpecificTutorials,
];

export const tutorialsBySlug = Object.fromEntries(
  tutorials.map((t) => [t.slug, t]),
);

export function tutorialsForRole(roleId: string): Tutorial[] {
  return tutorials.filter((t) => t.audienceRoleIds.includes(roleId));
}

export function tutorialsForTheme(themeId: string): Tutorial[] {
  return tutorials.filter((t) => t.themeIds.includes(themeId));
}

export function tutorialsForTool(toolId: string): Tutorial[] {
  return tutorials.filter((t) => t.toolIds.includes(toolId));
}
