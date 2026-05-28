import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Users,
  Wrench,
  BookOpen,
  Zap,
  GraduationCap,
  Plug,
  Star,
  Clock,
  MessageSquareText,
} from "lucide-react";
import { themes, roles, tools, tutorials, tutorialsBySlug } from "@/content";
import { promptTemplates, modelGuides } from "@/content/prompts";
import { rolesById } from "@/content/roles";
import { ThemeCard, TutorialCard } from "@/components/cards";
import { FormatBadge, DifficultyBadge, Badge } from "@/components/Badge";
import { RecentlyViewed } from "@/components/RecentlyViewed";

// THE ONE tutorial worth surfacing first
const FEATURED_SLUG = "email-first-draft";

const SKILLS_LIST_SLUGS = [
  "claude-skill-bh-voice",
  "skill-daily-briefing",
  "skill-meeting-prep",
  "skill-deadline-watcher",
  "skill-client-context",
];

const COWORK_LIST_SLUGS = [
  "qbo-bill-anomaly",
  "cowork-outlook-eod-digest",
  "cowork-monday-standup",
  "qbo-ar-followup",
  "qbo-month-close",
];

// Featured prompt templates for the home teaser
const FEATURED_PROMPT_IDS = [
  "tax-first-draft-email",
  "acct-bill-anomaly",
  "legal-estate-keyterms",
];

export function Home() {
  const featured = tutorialsBySlug[FEATURED_SLUG];
  const skills101 = tutorialsBySlug["claude-skills-101"];
  const cowork101 = tutorialsBySlug["claude-cowork-101"];
  const skillsList = SKILLS_LIST_SLUGS.map((s) => tutorialsBySlug[s]).filter(
    Boolean,
  );
  const coworkList = COWORK_LIST_SLUGS.map((s) => tutorialsBySlug[s]).filter(
    Boolean,
  );
  const featuredPrompts = FEATURED_PROMPT_IDS.map((id) =>
    promptTemplates.find((p) => p.id === id),
  ).filter(Boolean) as typeof promptTemplates;

  return (
    <div>
      {/* Hero */}
      <section className="relative mb-12 -mt-4 sm:-mt-8 lg:-mt-12 pt-4 sm:pt-8 lg:pt-12 pb-2">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -left-16 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-brand-200/50 to-amber-100/0 dark:from-brand-700/20 dark:to-amber-900/0 blur-3xl" />
          <div className="absolute -top-16 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-200/40 to-transparent dark:from-violet-800/15 dark:to-transparent blur-3xl" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-900 dark:text-brand-200 rounded-full text-xs font-medium mb-5 animate-fade-in">
          <Sparkles size={13} aria-hidden="true" />
          Internal — BrookHaven coworkers
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-[1.05] mb-5 max-w-4xl tracking-tight">
          AI tools, mapped to{" "}
          <span className="bg-gradient-to-r from-brand-600 to-amber-500 dark:from-brand-400 dark:to-amber-400 bg-clip-text text-transparent">
            your daily work.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          A practical guide to using{" "}
          <strong className="text-slate-900 dark:text-slate-100">Claude</strong>
          ,{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            Claude Cowork
          </strong>
          , and other AI tools to save time on the work you actually do at
          BrookHaven.
        </p>
      </section>

      {/* FEATURED — the one tutorial worth highlighting */}
      {featured && (
        <section className="mb-16 animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <Star
              className="text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400"
              size={16}
              aria-hidden="true"
            />
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Editor's pick — Start here if you only do one thing
            </div>
          </div>
          <Link
            to={`/tutorials/${featured.slug}`}
            className="group relative block overflow-hidden rounded-2xl"
            data-testid="featured-tutorial"
          >
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-black p-6 lg:p-10 border border-slate-700 dark:border-slate-800 group-hover:border-amber-400/50 transition-all">
              <div
                className="absolute -top-20 -right-10 w-96 h-96 rounded-full bg-gradient-to-bl from-amber-400/20 to-brand-500/0 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 -left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500/15 to-transparent blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-4">
                    <FormatBadge format={featured.format} />
                    <DifficultyBadge level={featured.difficulty} />
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-6xl leading-none flex-shrink-0" aria-hidden="true">
                      {featured.emoji}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-3">
                        {featured.title}
                      </h2>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {featured.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-5 max-w-2xl">
                    <strong className="text-amber-300">
                      Why we picked this:
                    </strong>{" "}
                    Universal applicability — every coworker writes email.
                    Lowest effort-to-value ratio in the catalog: 10 minutes of
                    setup saves about 30 minutes a day, forever. Most importantly,
                    Lisa specifically asked for this — and when our senior
                    bellwether adopter adopts, the rest of the firm follows.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 font-semibold rounded-lg group-hover:bg-amber-300 transition-all group-hover:gap-3">
                      Start this tutorial
                      <ArrowRight size={16} aria-hidden="true" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <Clock size={14} aria-hidden="true" />
                      {featured.timeEstimate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Stats strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
        <StatCard icon={BookOpen} number={tutorials.length} label="Tutorials" to="/tutorials" />
        <StatCard
          icon={GraduationCap}
          number={tutorials.filter((t) => t.format === "Skill").length}
          label="Skills"
          to="/skills"
          accent="violet"
        />
        <StatCard
          icon={Plug}
          number={tutorials.filter((t) => t.format === "Cowork").length}
          label="Cowork workflows"
          to="/cowork"
          accent="brand"
        />
        <StatCard icon={Users} number={roles.length} label="Roles covered" to="/roles" />
      </section>

      {/* CLAUDE SKILLS SECTION */}
      <section className="mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/30 dark:via-slate-900 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-900 rounded-2xl p-6 lg:p-8">
          <div
            className="absolute -top-16 -right-16 w-64 h-64 bg-violet-300/30 dark:bg-violet-600/15 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <GraduationCap size={14} aria-hidden="true" />
                  Claude Skills
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Bundle your playbooks
                </h2>
                <p className="text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                  A Skill is a saved playbook Claude applies automatically when
                  the task matches. Build it once, your whole team uses it.
                </p>
              </div>
              <Link
                to="/skills"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-100 bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 rounded-lg hover:border-violet-400 dark:hover:border-violet-600 transition-all"
              >
                Open Skills hub
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* 101 — featured big */}
            {skills101 && (
              <Link
                to={`/tutorials/${skills101.slug}`}
                className="group block p-5 lg:p-6 bg-white dark:bg-slate-900 border-2 border-violet-300 dark:border-violet-700 rounded-xl hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-lg transition-all mb-4"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl leading-none flex-shrink-0" aria-hidden="true">
                    {skills101.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 text-[10px] font-bold uppercase tracking-wider rounded">
                        <Zap size={10} aria-hidden="true" />
                        Start here
                      </span>
                      <FormatBadge format={skills101.format} />
                      <DifficultyBadge level={skills101.difficulty} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors mb-1">
                      {skills101.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {skills101.subtitle}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            )}

            {/* Other Skills */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillsList.map((t, i) => (
                <div
                  key={t.slug}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <TutorialCard tutorial={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLAUDE COWORK SECTION */}
      <section className="mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50 dark:from-brand-950/30 dark:via-slate-900 dark:to-amber-950/30 border border-brand-200 dark:border-brand-900 rounded-2xl p-6 lg:p-8">
          <div
            className="absolute -top-16 -left-16 w-64 h-64 bg-brand-300/30 dark:bg-brand-600/15 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Plug size={14} aria-hidden="true" />
                  Claude Cowork
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Connect Claude to your tools
                </h2>
                <p className="text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Cowork connectors let Claude read from (and write to) QBO,
                  Outlook, Dropbox, Monday, Teams, and more — no more
                  copy-pasting between systems.
                </p>
              </div>
              <Link
                to="/cowork"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-700 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-200 bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-800 rounded-lg hover:border-brand-400 dark:hover:border-brand-600 transition-all"
              >
                Open Cowork hub
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* 101 — featured big */}
            {cowork101 && (
              <Link
                to={`/tutorials/${cowork101.slug}`}
                className="group block p-5 lg:p-6 bg-white dark:bg-slate-900 border-2 border-brand-300 dark:border-brand-700 rounded-xl hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all mb-4"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl leading-none flex-shrink-0" aria-hidden="true">
                    {cowork101.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-100 dark:bg-brand-900/50 text-brand-900 dark:text-brand-200 text-[10px] font-bold uppercase tracking-wider rounded">
                        <Zap size={10} aria-hidden="true" />
                        Start here
                      </span>
                      <FormatBadge format={cowork101.format} />
                      <DifficultyBadge level={cowork101.difficulty} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors mb-1">
                      {cowork101.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cowork101.subtitle}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            )}

            {/* Other Cowork workflows */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {coworkList.map((t, i) => (
                <div
                  key={t.slug}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <TutorialCard tutorial={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLAUDE PROMPTS SECTION */}
      <section className="mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-sky-950/30 dark:via-slate-900 dark:to-cyan-950/30 border border-sky-200 dark:border-sky-900 rounded-2xl p-6 lg:p-8">
          <div
            className="absolute -top-16 -right-16 w-64 h-64 bg-sky-300/30 dark:bg-sky-600/15 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <MessageSquareText size={14} aria-hidden="true" />
                  Claude Prompts
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  Ask Claude better
                </h2>
                <p className="text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {promptTemplates.length} copy-paste prompt templates mapped to
                  your role — plus a guide to which model (Opus, Sonnet, Haiku)
                  to use for what.
                </p>
              </div>
              <Link
                to="/prompts"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 rounded-lg hover:border-sky-400 dark:hover:border-sky-600 transition-all"
              >
                Open the prompt library
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Model chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {modelGuides.map((g) => (
                <span
                  key={g.model}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Claude {g.model}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {g.model === "Opus"
                      ? "hard, high-stakes work"
                      : g.model === "Sonnet"
                        ? "the daily driver"
                        : "fast & simple"}
                  </span>
                </span>
              ))}
            </div>

            {/* Featured prompt teasers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredPrompts.map((p) => {
                const role = rolesById[p.forRoleIds[0]];
                return (
                  <Link
                    key={p.id}
                    to="/prompts"
                    className="group block p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge
                        variant={
                          p.model === "Opus"
                            ? "purple"
                            : p.model === "Sonnet"
                              ? "blue"
                              : "green"
                        }
                      >
                        Claude {p.model}
                      </Badge>
                    </div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-50 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors leading-tight">
                      {p.title}
                    </div>
                    {role && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        for {role.title}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recently viewed + themes side-by-side */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-16">
        <section>
          <div className="mb-5">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles size={12} aria-hidden="true" />
              Survey themes
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              The 8 pain themes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
              Browse by the kind of work that's slowing you down.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {themes.map((t, i) => (
              <div
                key={t.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <ThemeCard theme={t} />
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <RecentlyViewed limit={5} />
        </aside>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl p-8 lg:p-10">
        <div
          className="absolute -right-10 -top-10 w-64 h-64 bg-brand-500/20 dark:bg-brand-400/30 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 max-w-xl">
              Not sure where to start?
            </h2>
            <p className="text-slate-300 dark:text-slate-700 max-w-2xl text-base lg:text-lg">
              Find your role and we'll point you to the 3–5 tutorials with the
              highest payoff for your specific day-to-day work.
            </p>
          </div>
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-900 font-medium rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0"
          >
            Find your role
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Tools and remaining browsing — small links */}
      <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">
          Also browse by
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <Wrench size={14} aria-hidden="true" />
            Tools ({tools.length})
          </Link>
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <BookOpen size={14} aria-hidden="true" />
            All tutorials ({tutorials.length})
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  number,
  label,
  to,
  accent,
}: {
  icon: typeof Sparkles;
  number: number;
  label: string;
  to: string;
  accent?: "brand" | "violet";
}) {
  const iconColor =
    accent === "violet"
      ? "text-violet-600 dark:text-violet-400"
      : accent === "brand"
        ? "text-brand-600 dark:text-brand-400"
        : "text-slate-600 dark:text-slate-400";
  const borderHover =
    accent === "violet"
      ? "hover:border-violet-400 dark:hover:border-violet-600"
      : "hover:border-brand-400 dark:hover:border-brand-600";
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all ${borderHover}`}
    >
      <Icon className={`${iconColor} mb-2`} size={18} aria-hidden="true" />
      <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 transition-colors tabular-nums">
        {number}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {label}
      </div>
    </Link>
  );
}
