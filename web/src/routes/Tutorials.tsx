import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, Users, Sparkles, Wrench, BookOpen } from "lucide-react";
import {
  tutorials,
  tutorialsBySlug,
  rolesById,
  themesById,
  toolsById,
} from "@/content";
import type { Difficulty } from "@/content/types";
import { TutorialCard } from "@/components/cards";
import { Badge, DifficultyBadge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { StepList } from "@/components/StepList";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type DifficultyFilter = "All" | Difficulty;

const difficulties: DifficultyFilter[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function TutorialsIndex() {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = tutorials;
    if (difficulty !== "All") {
      list = list.filter((t) => t.difficulty === difficulty);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q),
      );
    }
    return list;
  }, [difficulty, search]);

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "All tutorials" }]} />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        All tutorials
      </h1>
      <p className="text-slate-600 mb-6 max-w-2xl">
        {tutorials.length} step-by-step walkthroughs. Filter by difficulty or
        search by title.
      </p>

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                difficulty === d
                  ? "bg-brand-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              data-testid={`difficulty-filter-${d.toLowerCase()}`}
            >
              {d}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title or topic..."
          className="flex-1 px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          aria-label="Filter tutorials by title"
          data-testid="tutorials-filter-input"
        />
      </div>

      <div className="mb-4 text-sm text-slate-500">
        Showing <strong className="text-slate-700">{filtered.length}</strong>{" "}
        of {tutorials.length} tutorials
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">
            No tutorials match the current filters.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <TutorialCard key={t.slug} tutorial={t} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TutorialDetail() {
  const { slug } = useParams();
  const tutorial = slug ? tutorialsBySlug[slug] : undefined;

  if (!tutorial) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Tutorial not found</h1>
        <Link to="/tutorials" className="text-brand-700 hover:underline">
          ← Back to all tutorials
        </Link>
      </div>
    );
  }

  const relatedTutorials = tutorial.relatedTutorialSlugs
    .map((s) => tutorialsBySlug[s])
    .filter(Boolean);

  const audience = tutorial.audienceRoleIds
    .map((id) => rolesById[id])
    .filter(Boolean);
  const themes = tutorial.themeIds
    .map((id) => themesById[id])
    .filter(Boolean);
  const tools = tutorial.toolIds.map((id) => toolsById[id]).filter(Boolean);

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Tutorials", to: "/tutorials" },
          { label: tutorial.title },
        ]}
      />

      <header className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl leading-none" aria-hidden="true">
            {tutorial.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
              {tutorial.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {tutorial.subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <DifficultyBadge level={tutorial.difficulty} />
          <span className="inline-flex items-center gap-1 text-slate-600">
            <Clock size={14} aria-hidden="true" />
            {tutorial.timeEstimate}
          </span>
          {tutorial.aiTools.map((tool) => (
            <Badge key={tool} variant="brand">
              {tool}
            </Badge>
          ))}
        </div>
      </header>

      {/* When to use / not */}
      <section className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h2 className="text-sm font-semibold text-emerald-900 mb-2 uppercase tracking-wide">
            ✅ When to use this
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            {tutorial.whenToUse}
          </p>
        </div>
        {tutorial.whenNotToUse && (
          <div className="p-5 bg-rose-50 border border-rose-200 rounded-lg">
            <h2 className="text-sm font-semibold text-rose-900 mb-2 uppercase tracking-wide">
              ❌ When NOT to use this
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              {tutorial.whenNotToUse}
            </p>
          </div>
        )}
      </section>

      {/* Prerequisites */}
      {tutorial.prerequisites.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Before you start
          </h2>
          <ul className="space-y-2 bg-white border border-slate-200 rounded-lg p-5">
            {tutorial.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span
                  className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-slate-400"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Steps */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Steps</h2>
        <StepList steps={tutorial.steps} />
      </section>

      {/* Pitfalls */}
      {tutorial.pitfalls.length > 0 && (
        <section className="mb-10">
          <Callout
            variant="warning"
            title="Common pitfalls"
            body={tutorial.pitfalls.map((p) => `- ${p}`).join("\n")}
          />
        </section>
      )}

      {/* Tags / metadata */}
      <section className="mb-10 grid sm:grid-cols-3 gap-4">
        {audience.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              <Users size={12} aria-hidden="true" /> Audience
            </div>
            <div className="flex flex-wrap gap-1.5">
              {audience.map((r) => (
                <Link
                  key={r.id}
                  to={`/roles/${r.id}`}
                  className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md hover:border-brand-400"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        {themes.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              <Sparkles size={12} aria-hidden="true" /> Themes
            </div>
            <div className="flex flex-wrap gap-1.5">
              {themes.map((t) => (
                <Link
                  key={t.id}
                  to={`/themes/${t.id}`}
                  className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md hover:border-brand-400"
                >
                  {t.emoji} {t.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        {tools.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              <Wrench size={12} aria-hidden="true" /> Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((t) => (
                <Link
                  key={t.id}
                  to={`/tools/${t.id}`}
                  className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-md hover:border-brand-400"
                >
                  {t.emoji} {t.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Related */}
      {relatedTutorials.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-slate-500" size={18} aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-900">Related tutorials</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTutorials.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
