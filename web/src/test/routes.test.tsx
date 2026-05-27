import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { renderWithRouter } from "./utils";
import { roles, themes, tools, tutorials } from "@/content";

describe("Routing — top-level pages render", () => {
  it("home page renders the hero", () => {
    renderWithRouter(<App />, { initialEntries: ["/"] });
    expect(
      screen.getByRole("heading", {
        name: /AI tools, mapped to your daily work/i,
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("themes index renders all themes", () => {
    renderWithRouter(<App />, { initialEntries: ["/themes"] });
    expect(
      screen.getByRole("heading", { name: /Browse by pain theme/i, level: 1 }),
    ).toBeInTheDocument();
    // Spot-check: every theme card exists
    for (const theme of themes) {
      expect(
        screen.getByTestId(`theme-card-${theme.id}`),
      ).toBeInTheDocument();
    }
  });

  it("roles index renders all roles", () => {
    renderWithRouter(<App />, { initialEntries: ["/roles"] });
    expect(
      screen.getByRole("heading", { name: /Find your role/i, level: 1 }),
    ).toBeInTheDocument();
    for (const role of roles) {
      expect(
        screen.getByTestId(`role-card-${role.id}`),
      ).toBeInTheDocument();
    }
  });

  it("tools index renders all tools", () => {
    renderWithRouter(<App />, { initialEntries: ["/tools"] });
    expect(
      screen.getByRole("heading", { name: /Browse by tool/i, level: 1 }),
    ).toBeInTheDocument();
    for (const tool of tools) {
      expect(screen.getByTestId(`tool-card-${tool.id}`)).toBeInTheDocument();
    }
  });

  it("tutorials index renders the count + filter controls", () => {
    renderWithRouter(<App />, { initialEntries: ["/tutorials"] });
    expect(
      screen.getByRole("heading", { name: /All tutorials/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("difficulty-filter-all")).toBeInTheDocument();
    expect(screen.getByTestId("difficulty-filter-beginner")).toBeInTheDocument();
    expect(screen.getByTestId("difficulty-filter-intermediate")).toBeInTheDocument();
    expect(screen.getByTestId("difficulty-filter-advanced")).toBeInTheDocument();
  });

  it("about page renders", () => {
    renderWithRouter(<App />, { initialEntries: ["/about"] });
    expect(
      screen.getByRole("heading", { name: /About this hub/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it("404 page renders for unknown route", () => {
    renderWithRouter(<App />, { initialEntries: ["/totally-not-a-page"] });
    expect(
      screen.getByRole("heading", { name: /Page not found/i, level: 1 }),
    ).toBeInTheDocument();
  });
});

describe("Detail pages", () => {
  it("each theme detail page renders without crashing", () => {
    for (const theme of themes) {
      const { unmount } = renderWithRouter(<App />, {
        initialEntries: [`/themes/${theme.id}`],
      });
      // The heading should be the theme's title (level 1)
      expect(
        screen.getByRole("heading", { name: theme.title, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it("each role detail page renders without crashing", () => {
    for (const role of roles) {
      const { unmount } = renderWithRouter(<App />, {
        initialEntries: [`/roles/${role.id}`],
      });
      expect(
        screen.getByRole("heading", { name: role.title, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it("each tool detail page renders without crashing", () => {
    for (const tool of tools) {
      const { unmount } = renderWithRouter(<App />, {
        initialEntries: [`/tools/${tool.id}`],
      });
      expect(
        screen.getByRole("heading", { name: tool.name, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });

  it("each tutorial detail page renders without crashing", () => {
    for (const tutorial of tutorials) {
      const { unmount } = renderWithRouter(<App />, {
        initialEntries: [`/tutorials/${tutorial.slug}`],
      });
      expect(
        screen.getByRole("heading", { name: tutorial.title, level: 1 }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});

describe("Tutorials index filtering", () => {
  it("difficulty filter narrows results", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<App />, {
      initialEntries: ["/tutorials"],
    });

    // Baseline: all tutorials rendered
    const beforeCount = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;
    expect(beforeCount).toBe(tutorials.length);

    // Click Beginner — should remove non-Beginner tutorials
    await user.click(screen.getByTestId("difficulty-filter-beginner"));

    const beginnerCount = tutorials.filter(
      (t) => t.difficulty === "Beginner",
    ).length;
    const afterCount = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;
    expect(afterCount).toBe(beginnerCount);
  });

  it("title filter narrows results", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<App />, {
      initialEntries: ["/tutorials"],
    });

    await user.type(screen.getByTestId("tutorials-filter-input"), "email");
    // Should match at least the email tutorial
    expect(
      screen.getByTestId("tutorial-card-email-first-draft"),
    ).toBeInTheDocument();
    // And total filtered count should be smaller than the full list
    const filteredCount = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;
    expect(filteredCount).toBeLessThan(tutorials.length);
  });
});

describe("Command palette", () => {
  it("opens via the header search trigger and shows results when querying", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, { initialEntries: ["/"] });

    // Click the desktop search trigger (the input-styled button in the header)
    const trigger = screen.getByTestId("search-trigger");
    await user.click(trigger);

    const palette = await screen.findByTestId("command-palette");
    expect(palette).toBeInTheDocument();

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "email");

    // At least one result item should appear referencing the email tutorial
    expect(
      screen.getByTestId("command-item-tutorial-email-first-draft"),
    ).toBeInTheDocument();
  });

  it("opens via Ctrl+K keyboard shortcut", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, { initialEntries: ["/"] });

    expect(screen.queryByTestId("command-palette")).not.toBeInTheDocument();
    await user.keyboard("{Control>}k{/Control}");
    expect(await screen.findByTestId("command-palette")).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, { initialEntries: ["/"] });

    await user.click(screen.getByTestId("search-trigger"));
    expect(screen.getByTestId("command-palette")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("command-palette")).not.toBeInTheDocument();
  });
});
