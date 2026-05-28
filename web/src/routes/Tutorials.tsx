import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Clock,
  Users,
  Sparkles,
  Wrench,
  BookOpen,
  RotateCcw,
  Check,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import {
  tutorials,
  tutorialsBySlug,
  rolesById,
  themesById,
  toolsById,
  roles,
  themes,
  tools,
} from "@/content";
import type { Difficulty, TutorialFormat } from "@/content/types";
import { TutorialCard } from "@/components/cards";
import { Badge, DifficultyBadge, FormatBadge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { StepList, stepAnchorId } from "@/components/StepList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents, type TocEntry } from "@/components/TableOfContents";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";
import { useTutorialProgress } from "@/lib/useTutorialProgress";
import { useToast } from "@/lib/toast";

type DifficultyFilter = "All" | Difficulty;

const difficulties: DifficultyFilter[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const allFormats: TutorialFormat[] = [
  "Skill",
  "Cowork",
  "Project",
  "Prompt",
  "Script",
  "Process",
];

export function TutorialsIndex() {
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [search, setSearch] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<TutorialFormat[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

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
    if (selectedFormats.length > 0) {
      list = list.filter((t) => selectedFormats.includes(t.format));
    }
    if (selectedThemes.length > 0) {
      list = list.filter((t) =>
        t.themeIds.some((id) => selectedThemes.includes(id)),
      );
    }
    if (selectedRoles.length > 0) {
      list = list.filter((t) =>
        t.audienceRoleIds.some((id) => selectedRoles.includes(id)),
      );
    }
    if (selectedTools.length > 0) {
      list = list.filter((t) =>
        t.toolIds.some((id) => selectedTools.includes(id)),
      );
    }
    return list;
  }, [difficulty, search, selectedFormats, selectedThemes, selectedRoles, selectedTools]);

  const filterCount =
    (difficulty !== "All" ? 1 : 0) +
    (search.trim() ? 1 : 0) +
    selectedFormats.length +
    selectedThemes.length +
    selectedRoles.length +
    selectedTools.length;

  function clearAll() {
    setDifficulty("All");
    setSearch("");
    setSelectedFormats([]);
    setSelectedThemes([]);
    setSelectedRoles([]);
    setSelectedTools([]);
  }

  function toggle<T>(list: T[], item: T, setter: (l: T[]) => void) {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "All tutorials" }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
        All tutorials
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl text-lg">
        {tutorials.length} step-by-step walkthroughs. Filter by difficulty,
        theme, role, or tool — or use the search box.
      </p>

      <div className="space-y-4 mb-6">
        {/* Search + difficulty row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 self-start">
            {difficulties.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  difficulty === d
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            aria-label="Filter tutorials by title"
            data-testid="tutorials-filter-input"
          />
        </div>

        {/* Chip filter groups */}
        <FilterChipGroup
          label="Format"
          items={allFormats.map((f) => ({ id: f, label: f }))}
          selected={selectedFormats}
          onToggle={(id) =>
            toggle(selectedFormats, id as TutorialFormat, setSelectedFormats)
          }
          testid="filter-formats"
        />
        <FilterChipGroup
          label="Themes"
          items={themes.map((t) => ({ id: t.id, label: `${t.emoji} ${t.title}` }))}
          selected={selectedThemes}
          onToggle={(id) => toggle(selectedThemes, id, setSelectedThemes)}
          testid="filter-themes"
        />
        <FilterChipGroup
          label="Roles"
          items={roles.map((r) => ({ id: r.id, label: r.title }))}
          selected={selectedRoles}
          onToggle={(id) => toggle(selectedRoles, id, setSelectedRoles)}
          testid="filter-roles"
        />
        <FilterChipGroup
          label="Tools"
          items={tools.map((t) => ({ id: t.id, label: `${t.emoji} ${t.name}` }))}
          selected={selectedTools}
          onToggle={(id) => toggle(selectedTools, id, setSelectedTools)}
          testid="filter-tools"
        />

        <div className="flex items-center gap-3 text-sm pt-1">
          <span className="text-slate-500 dark:text-slate-400">
            Showing{" "}
            <strong className="text-slate-700 dark:text-slate-200">
              {filtered.length}
            </strong>{" "}
            of {tutorials.length} tutorials
          </span>
          {filterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs text-brand-700 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium"
              data-testid="clear-filters"
            >
              <X size={12} aria-hidden="true" /> Clear all filters ({filterCount})
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-5xl mb-3" aria-hidden="true">
            🤷
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            No tutorials match the current filters.
          </p>
          {filterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-brand-700 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t, i) => (
            <div
              key={t.slug}
              className="animate-slide-up"
              style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}
            >
              <TutorialCard tutorial={t} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChipGroup({
  label,
  items,
  selected,
  onToggle,
  testid,
}: {
  label: string;
  items: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  testid: string;
}) {
  return (
    <div className="flex items-start gap-3 flex-wrap" data-testid={testid}>
      <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold pt-1.5 w-14 flex-shrink-0">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5 flex-1">
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              aria-pressed={isSelected}
              className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all ${
                isSelected
                  ? "bg-brand-600 dark:bg-brand-500 text-white border-brand-600 dark:border-brand-500"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-400"
              }`}
              data-testid={`${testid}-chip-${item.id}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TutorialDetail() {
  const { slug } = useParams();
  const tutorial = slug ? tutorialsBySlug[slug] : undefined;
  const { record } = useRecentlyViewed();
  const progress = useTutorialProgress(slug ?? "");
  const { toast } = useToast();

  // Record as recently viewed
  useEffect(() => {
    if (tutorial) {
      record("tutorial", tutorial.slug, tutorial.title);
    }
  }, [tutorial, record]);

  if (!tutorial) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">
          Tutorial not found
        </h1>
        <Link
          to="/tutorials"
          className="text-brand-700 dark:text-brand-400 hover:underline"
        >
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
  const themesList = tutorial.themeIds
    .map((id) => themesById[id])
    .filter(Boolean);
  const toolsList = tutorial.toolIds.map((id) => toolsById[id]).filter(Boolean);

  // Sequential prev/next in the master tutorials list
  const idx = tutorials.findIndex((t) => t.slug === tutorial.slug);
  const prev = idx > 0 ? tutorials[idx - 1] : null;
  const next = idx < tutorials.length - 1 ? tutorials[idx + 1] : null;

  // Build TOC: top-level sections + steps
  const tocEntries: TocEntry[] = [
    { id: "overview", label: "Overview" },
    { id: "before-you-start", label: "Before you start" },
    { id: "steps-section", label: "Steps" },
    ...tutorial.steps.map((s, i) => ({
      id: stepAnchorId(i),
      label: `${i + 1}. ${s.title}`,
    })),
    { id: "pitfalls", label: "Common pitfalls" },
    { id: "tags", label: "Tags" },
    ...(relatedTutorials.length > 0 ? [{ id: "related", label: "Related" }] : []),
  ];

  const completedCount = progress.completed.length;
  const totalSteps = tutorial.steps.length;
  const completionPct =
    totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  function handleReset() {
    progress.reset();
    toast("Progress reset", { variant: "info" });
  }

  return (
    <article className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <Breadcrumbs
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Tutorials", to: "/tutorials" },
            { label: tutorial.title },
          ]}
        />

        <header id="overview" className="mb-8 scroll-mt-24">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl leading-none" aria-hidden="true">
              {tutorial.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2 leading-tight tracking-tight">
                {tutorial.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {tutorial.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <FormatBadge format={tutorial.format} />
            <DifficultyBadge level={tutorial.difficulty} />
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Clock size={14} aria-hidden="true" />
              {tutorial.timeEstimate}
            </span>
            {tutorial.aiTools.map((tool) => (
              <Badge key={tool} variant="brand">
                {tool}
              </Badge>
            ))}
          </div>

          {/* Audio narration (when available) */}
          {tutorial.audioUrl && (
            <div className="mt-6">
              <AudioPlayer src={tutorial.audioUrl} />
            </div>
          )}

          {/* Progress meter */}
          {totalSteps > 0 && (
            <div className="mt-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {completedCount === 0
                    ? "Click step numbers to mark them complete"
                    : completedCount === totalSteps
                      ? "🎉 All steps complete!"
                      : `${completedCount} of ${totalSteps} steps complete`}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className="text-slate-700 dark:text-slate-200 font-semibold tabular-nums"
                    data-testid="progress-pct"
                  >
                    {completionPct}%
                  </span>
                  {completedCount > 0 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      aria-label="Reset progress"
                      className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      data-testid="reset-progress"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* When to use / not */}
        <section className="grid sm:grid-cols-2 gap-4 mb-8" id="when-to-use">
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <h2 className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 mb-2 uppercase tracking-wider">
              ✅ When to use this
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {tutorial.whenToUse}
            </p>
          </div>
          {tutorial.whenNotToUse && (
            <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
              <h2 className="text-xs font-semibold text-rose-900 dark:text-rose-300 mb-2 uppercase tracking-wider">
                ❌ When NOT to use this
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {tutorial.whenNotToUse}
              </p>
            </div>
          )}
        </section>

        {/* Prerequisites */}
        {tutorial.prerequisites.length > 0 && (
          <section
            id="before-you-start"
            className="mb-8 scroll-mt-24"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Before you start
            </h2>
            <ul className="space-y-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5">
              {tutorial.prerequisites.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                >
                  <span
                    className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Steps */}
        <section id="steps-section" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-5">
            Steps
          </h2>
          <StepList steps={tutorial.steps} tutorialSlug={tutorial.slug} />
        </section>

        {/* Pitfalls */}
        {tutorial.pitfalls.length > 0 && (
          <section id="pitfalls" className="mb-10 scroll-mt-24">
            <Callout
              variant="warning"
              title="Common pitfalls"
              body={tutorial.pitfalls.map((p) => `- ${p}`).join("\n")}
            />
          </section>
        )}

        {/* Tags */}
        <section
          id="tags"
          className="mb-10 grid sm:grid-cols-3 gap-4 scroll-mt-24"
        >
          {audience.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                <Users size={12} aria-hidden="true" /> Audience
              </div>
              <div className="flex flex-wrap gap-1.5">
                {audience.map((r) => (
                  <Link
                    key={r.id}
                    to={`/roles/${r.id}`}
                    className="text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {themesList.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                <Sparkles size={12} aria-hidden="true" /> Themes
              </div>
              <div className="flex flex-wrap gap-1.5">
                {themesList.map((t) => (
                  <Link
                    key={t.id}
                    to={`/themes/${t.id}`}
                    className="text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {t.emoji} {t.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {toolsList.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                <Wrench size={12} aria-hidden="true" /> Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {toolsList.map((t) => (
                  <Link
                    key={t.id}
                    to={`/tools/${t.id}`}
                    className="text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {t.emoji} {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Related tutorials */}
        {relatedTutorials.length > 0 && (
          <section id="related" className="mb-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen
                className="text-slate-500 dark:text-slate-400"
                size={18}
                aria-hidden="true"
              />
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Related tutorials
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTutorials.map((t) => (
                <TutorialCard key={t.slug} tutorial={t} />
              ))}
            </div>
          </section>
        )}

        {/* Prev/Next */}
        <nav
          className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800"
          aria-label="Tutorial navigation"
          data-testid="prev-next-nav"
        >
          {prev ? (
            <Link
              to={`/tutorials/${prev.slug}`}
              className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                <ArrowLeft size={12} aria-hidden="true" />
                Previous
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                {prev.emoji} {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/tutorials/${next.slug}`}
              className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all sm:text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Next
                <ArrowRight size={12} aria-hidden="true" />
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                {next.emoji} {next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>

      {/* Right sidebar — TOC on lg+ */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
          <TableOfContents entries={tocEntries} />
          {completedCount > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Progress
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check
                  className="text-emerald-600 dark:text-emerald-400"
                  size={14}
                  aria-hidden="true"
                />
                <span className="text-slate-700 dark:text-slate-300 tabular-nums">
                  {completedCount} / {totalSteps} steps
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </article>
  );
}
