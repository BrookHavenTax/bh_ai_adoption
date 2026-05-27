import { Link, useParams } from "react-router-dom";
import {
  tools,
  toolsById,
  tutorialsBySlug,
  tutorialsForTool,
} from "@/content";
import { ToolCard, TutorialCard } from "@/components/cards";
import { Markdown } from "@/components/Markdown";
import { Callout } from "@/components/Callout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ToolsIndex() {
  const stack = tools.filter((t) => t.category === "company-stack");
  const secondary = tools.filter((t) => t.category === "secondary");

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "By tool" }]} />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Browse by tool
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        How Claude / Claude Cowork / Skills work with each tool in the
        Brookhaven stack — what's possible today, what isn't, and the tutorials
        for each.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Brookhaven stack
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {secondary.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Other tools we use
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondary.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function ToolDetail() {
  const { toolId } = useParams();
  const tool = toolId ? toolsById[toolId] : undefined;

  if (!tool) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Tool not found</h1>
        <Link to="/tools" className="text-brand-700 hover:underline">
          ← Back to all tools
        </Link>
      </div>
    );
  }

  const recommended = tool.recommendedTutorialSlugs
    .map((s) => tutorialsBySlug[s])
    .filter(Boolean);
  const others = tutorialsForTool(tool.id).filter(
    (t) => !tool.recommendedTutorialSlugs.includes(t.slug),
  );

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "By tool", to: "/tools" },
          { label: tool.name },
        ]}
      />
      <header className="mb-8">
        <div className="flex items-start gap-4">
          <div className="text-5xl leading-none" aria-hidden="true">
            {tool.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {tool.name}
            </h1>
            <p className="text-lg text-slate-600">{tool.whatItDoes}</p>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          What you can do with Claude today
        </h2>
        <Markdown>{tool.withClaudeToday}</Markdown>
      </section>

      {tool.limitations && (
        <section className="mb-8">
          <Callout variant="info" body={tool.limitations} title="Honest limitation" />
        </section>
      )}

      {recommended.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Tutorials for this tool
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            More tutorials that touch {tool.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
