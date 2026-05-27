import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PromptBlock } from "@/components/PromptBlock";
import { Callout } from "@/components/Callout";
import { Badge, DifficultyBadge, EffortBadge } from "@/components/Badge";
import { Markdown } from "@/components/Markdown";

describe("PromptBlock", () => {
  it("renders the prompt text", () => {
    render(<PromptBlock prompt="Hello, Claude" />);
    expect(screen.getByText("Hello, Claude")).toBeInTheDocument();
  });

  it("calls navigator.clipboard.writeText with the prompt on click", async () => {
    // Install a spy directly on the existing clipboard object.
    // (Use fireEvent rather than userEvent — userEvent.setup() installs its own
    // clipboard intercept which would replace our spy.)
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: writeTextSpy,
      configurable: true,
      writable: true,
    });

    render(<PromptBlock prompt="Test prompt here" />);
    const button = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith("Test prompt here");
    });
  });

  it("shows 'Copied' state after click", async () => {
    render(<PromptBlock prompt="Test" />);
    const button = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Copied")).toBeInTheDocument();
    });
  });
});

describe("Callout", () => {
  it("renders all four variants with their default titles", () => {
    const { rerender } = render(<Callout variant="tip" body="A tip body" />);
    expect(screen.getByText("Tip")).toBeInTheDocument();
    expect(screen.getByText("A tip body")).toBeInTheDocument();

    rerender(<Callout variant="warning" body="Warning body" />);
    expect(screen.getByText("Watch out")).toBeInTheDocument();

    rerender(<Callout variant="info" body="Info body" />);
    expect(screen.getByText("Note")).toBeInTheDocument();

    rerender(<Callout variant="success" body="Success body" />);
    expect(screen.getByText("Good move")).toBeInTheDocument();
  });

  it("uses a custom title when provided", () => {
    render(
      <Callout variant="warning" title="Heads up" body="Read this carefully" />,
    );
    expect(screen.getByText("Heads up")).toBeInTheDocument();
  });

  it("renders markdown in the body", () => {
    render(<Callout variant="info" body="**bold text** here" />);
    // remarkGfm renders bold via <strong>
    const strong = screen.getByText("bold text");
    expect(strong.tagName.toLowerCase()).toBe("strong");
  });
});

describe("Badge variants", () => {
  it("renders neutral by default", () => {
    render(<Badge>Hello</Badge>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("DifficultyBadge maps levels to colors", () => {
    render(
      <>
        <DifficultyBadge level="Beginner" />
        <DifficultyBadge level="Intermediate" />
        <DifficultyBadge level="Advanced" />
      </>,
    );
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it("EffortBadge renders all variants", () => {
    const { rerender } = render(<EffortBadge effort="Low" />);
    expect(screen.getByText(/Low/)).toBeInTheDocument();
    rerender(<EffortBadge effort="High" />);
    expect(screen.getByText(/High/)).toBeInTheDocument();
  });
});

describe("Markdown", () => {
  it("renders headers, lists, bold, and code", () => {
    const md = `## Heading\n\n- Item 1\n- Item 2\n\n**bold** and \`code\``;
    render(<Markdown>{md}</Markdown>);
    expect(screen.getByText("Heading")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("bold")).toBeInTheDocument();
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("renders GFM tables (remark-gfm)", () => {
    const md = `| A | B |\n|---|---|\n| 1 | 2 |`;
    render(<Markdown>{md}</Markdown>);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});

