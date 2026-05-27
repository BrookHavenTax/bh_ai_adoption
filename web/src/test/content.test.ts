import { describe, it, expect } from "vitest";
import {
  roles,
  rolesById,
  themes,
  themesById,
  tools,
  toolsById,
  tutorials,
  tutorialsBySlug,
} from "@/content";

describe("Content integrity", () => {
  it("loads roles, themes, tools, tutorials", () => {
    expect(roles.length).toBeGreaterThan(0);
    expect(themes.length).toBeGreaterThan(0);
    expect(tools.length).toBeGreaterThan(0);
    expect(tutorials.length).toBeGreaterThan(0);
  });

  it("has unique role IDs", () => {
    const ids = roles.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique theme IDs", () => {
    const ids = themes.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique tool IDs", () => {
    const ids = tools.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique tutorial slugs", () => {
    const slugs = tutorials.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  describe("Cross-link integrity", () => {
    it("every role.recommendedTutorialSlugs points to an existing tutorial", () => {
      for (const role of roles) {
        for (const slug of role.recommendedTutorialSlugs) {
          expect(
            tutorialsBySlug[slug],
            `Role "${role.id}" references missing tutorial "${slug}"`,
          ).toBeDefined();
        }
      }
    });

    it("every theme.tutorialSlugs points to an existing tutorial", () => {
      for (const theme of themes) {
        for (const slug of theme.tutorialSlugs) {
          expect(
            tutorialsBySlug[slug],
            `Theme "${theme.id}" references missing tutorial "${slug}"`,
          ).toBeDefined();
        }
      }
    });

    it("every theme.affectedRoleIds points to an existing role", () => {
      for (const theme of themes) {
        for (const id of theme.affectedRoleIds) {
          expect(
            rolesById[id],
            `Theme "${theme.id}" references missing role "${id}"`,
          ).toBeDefined();
        }
      }
    });

    it("every tool.recommendedTutorialSlugs points to an existing tutorial", () => {
      for (const tool of tools) {
        for (const slug of tool.recommendedTutorialSlugs) {
          expect(
            tutorialsBySlug[slug],
            `Tool "${tool.id}" references missing tutorial "${slug}"`,
          ).toBeDefined();
        }
      }
    });

    it("every tutorial.audienceRoleIds points to an existing role", () => {
      for (const tutorial of tutorials) {
        for (const id of tutorial.audienceRoleIds) {
          expect(
            rolesById[id],
            `Tutorial "${tutorial.slug}" references missing role "${id}"`,
          ).toBeDefined();
        }
      }
    });

    it("every tutorial.themeIds points to an existing theme", () => {
      for (const tutorial of tutorials) {
        for (const id of tutorial.themeIds) {
          expect(
            themesById[id],
            `Tutorial "${tutorial.slug}" references missing theme "${id}"`,
          ).toBeDefined();
        }
      }
    });

    it("every tutorial.toolIds points to an existing tool", () => {
      for (const tutorial of tutorials) {
        for (const id of tutorial.toolIds) {
          expect(
            toolsById[id],
            `Tutorial "${tutorial.slug}" references missing tool "${id}"`,
          ).toBeDefined();
        }
      }
    });

    it("every tutorial.relatedTutorialSlugs points to an existing tutorial", () => {
      for (const tutorial of tutorials) {
        for (const slug of tutorial.relatedTutorialSlugs) {
          expect(
            tutorialsBySlug[slug],
            `Tutorial "${tutorial.slug}" references missing related "${slug}"`,
          ).toBeDefined();
        }
      }
    });
  });

  describe("Per-tutorial shape", () => {
    it.each(tutorials)("$slug has non-empty required fields", (tutorial) => {
      expect(tutorial.title).toBeTruthy();
      expect(tutorial.subtitle).toBeTruthy();
      expect(tutorial.emoji).toBeTruthy();
      expect(tutorial.timeEstimate).toBeTruthy();
      expect(tutorial.whenToUse).toBeTruthy();
      expect(tutorial.steps.length).toBeGreaterThan(0);
      expect(tutorial.audienceRoleIds.length).toBeGreaterThan(0);
    });

    it.each(tutorials)("$slug steps each have a title and body", (tutorial) => {
      for (const step of tutorial.steps) {
        expect(step.title).toBeTruthy();
        expect(step.body).toBeTruthy();
      }
    });
  });
});
