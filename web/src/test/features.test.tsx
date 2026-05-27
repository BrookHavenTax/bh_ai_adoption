import { beforeEach, describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { renderWithRouter, renderWithProviders } from "./utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Callout } from "@/components/Callout";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("ThemeToggle", () => {
  it("toggles the .dark class on <html>", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    await user.click(screen.getByTestId("theme-toggle"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    await user.click(screen.getByTestId("theme-toggle"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists choice in localStorage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    await user.click(screen.getByTestId("theme-toggle"));
    expect(localStorage.getItem("bh-theme")).toBe("dark");
  });
});

describe("Tutorial progress checkboxes", () => {
  it("marking a step toggles its visual state", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, {
      initialEntries: ["/tutorials/email-first-draft"],
    });

    const stepBtn = screen.getByTestId("step-checkbox-1");
    expect(stepBtn).toHaveAttribute("aria-pressed", "false");
    await user.click(stepBtn);
    expect(stepBtn).toHaveAttribute("aria-pressed", "true");

    // Progress percent updates
    const pct = screen.getByTestId("progress-pct");
    expect(pct.textContent).not.toBe("0%");
  });

  it("persists across navigation via localStorage", async () => {
    const user = userEvent.setup();
    renderWithRouter(<App />, {
      initialEntries: ["/tutorials/email-first-draft"],
    });

    await user.click(screen.getByTestId("step-checkbox-1"));
    const stored = localStorage.getItem("bh-tutorial-progress");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)["email-first-draft"]).toContain(0);
  });
});

describe("Multi-axis filters", () => {
  it("filtering by a theme chip narrows tutorials", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<App />, {
      initialEntries: ["/tutorials"],
    });

    const baseline = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;

    // Click the "Email triage" theme chip
    await user.click(screen.getByTestId("filter-themes-chip-email-triage"));

    const after = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;
    expect(after).toBeLessThan(baseline);
    expect(after).toBeGreaterThan(0);

    // Clear all filters resets it
    await user.click(screen.getByTestId("clear-filters"));
    const reset = container.querySelectorAll(
      '[data-testid^="tutorial-card-"]',
    ).length;
    expect(reset).toBe(baseline);
  });
});

describe("Callout in dark context still renders content", () => {
  it("renders body and title across variants", () => {
    renderWithProviders(<Callout variant="warning" body="Body" title="Watch" />);
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Watch")).toBeInTheDocument();
  });
});

describe("Toast appears on copy", () => {
  it("clicking copy in a prompt block shows the success toast", async () => {
    // Spy on writeText
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.resolve(),
      configurable: true,
      writable: true,
    });

    renderWithRouter(<App />, {
      initialEntries: ["/tutorials/email-first-draft"],
    });

    // Find the first Copy button on the page
    const copyButtons = screen.getAllByRole("button", { name: /copy/i });
    expect(copyButtons.length).toBeGreaterThan(0);
    fireEvent.click(copyButtons[0]);

    // Toast appears with success variant
    expect(await screen.findByTestId("toast-success")).toBeInTheDocument();
  });
});
