import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Users,
  Wrench,
  BookOpen,
  Zap,
  GraduationCap,
} from "lucide-react";
import { themes, roles, tools, tutorials } from "@/content";
import { ThemeCard, TutorialCard } from "@/components/cards";
import { RecentlyViewed } from "@/components/RecentlyViewed";

// Featured tutorials: the "universal entry-point" trio + one heavy-hitter
const FEATURED_SLUGS = [
  "email-first-draft",
  "pdf-summary-30sec",
  "qbo-bill-anomaly",
  "estate-doc-review",
];

// Skills & Cowork featured set — foundational first, then 2 examples
const SKILLS_COWORK_SLUGS = [
  "claude-skills-101",
  "claude-cowork-101",
  "skill-daily-briefing",
  "cowork-monday-standup",
];

export function Home() {
  const featured = FEATURED_SLUGS.map(
    (s) => tutorials.find((t) => t.slug === s)!,
  ).filter(Boolean);
  const skillsCowork = SKILLS_COWORK_SLUGS.map(
    (s) => tutorials.find((t) => t.slug === s)!,
  ).filter(Boolean);

  return (
    <div>
      {/* Hero with gradient backdrop */}
      <section className="relative mb-16 -mt-4 sm:-mt-8 lg:-mt-12 pt-4 sm:pt-8 lg:pt-12 pb-2">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -left-16 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-brand-200/50 to-amber-100/0 dark:from-brand-700/20 dark:to-amber-900/0 blur-3xl" />
          <div className="absolute -top-16 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-sky-100/40 to-transparent dark:from-sky-900/10 dark:to-transparent blur-3xl" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-900 dark:text-brand-200 rounded-full text-xs font-medium mb-5 animate-fade-in">
          <Sparkles size={13} aria-hidden="true" />
          Internal — Brookhaven coworkers
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-[1.05] mb-5 max-w-4xl tracking-tight">
          AI tools, mapped to{" "}
          <span className="bg-gradient-to-r from-brand-600 to-amber-500 dark:from-brand-400 dark:to-amber-400 bg-clip-text text-transparent">
            your daily work.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
          A practical guide to using{" "}
          <strong className="text-slate-900 dark:text-slate-100">Claude</strong>
          ,{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            Claude Cowork
          </strong>
          , and other AI tools to save time on the work you actually do at
          Brookhaven — built from a survey of what coworkers asked for.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Browse all tutorials
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-500 dark:hover:border-slate-500 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Find your role
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
        <StatCard
          icon={BookOpen}
          number={tutorials.length}
          label="Tutorials"
          to="/tutorials"
        />
        <StatCard
          icon={Sparkles}
          number={themes.length}
          label="Pain themes"
          to="/themes"
        />
        <StatCard icon={Users} number={roles.length} label="Roles" to="/roles" />
        <StatCard
          icon={Wrench}
          number={tools.length}
          label="Tools mapped"
          to="/tools"
        />
      </section>

      {/* Featured tutorials + Recently viewed */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-16">
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Zap size={12} aria-hidden="true" />
                Start here
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Universal wins
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                Three tutorials any coworker can pick up today, plus one
                heavy-hitter for accounting.
              </p>
            </div>
            <Link
              to="/tutorials"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-700 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 transition-colors"
            >
              All tutorials
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((t, i) => (
              <div
                key={t.slug}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <TutorialCard tutorial={t} />
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <RecentlyViewed limit={5} />
        </aside>
      </div>

      {/* Skills & Cowork featured */}
      <section className="mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-violet-950/30 dark:via-slate-900 dark:to-brand-950/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <GraduationCap size={12} aria-hidden="true" />
                Learn the platform
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Claude Skills & Cowork
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl">
                Start with the two foundational tutorials below, then build
                small high-value Skills and connector workflows for your
                day-to-day work.
              </p>
            </div>
            <Link
              to="/tutorials?filter=skills-cowork"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200 transition-colors"
            >
              All Skills & Cowork tutorials
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsCowork.map((t, i) => (
              <div
                key={t.slug}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <TutorialCard tutorial={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes section */}
      <section className="mb-16">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles size={12} aria-hidden="true" />
            Survey themes
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            The 8 pain themes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
            Every coworker pain point maps to one of these themes. Browse the
            theme that matches what's slowing you down.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {themes.map((t, i) => (
            <div
              key={t.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <ThemeCard theme={t} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl p-8 lg:p-10">
        <div
          className="absolute -right-10 -top-10 w-64 h-64 bg-brand-500/20 dark:bg-brand-400/30 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3 max-w-xl">
            Not sure where to start?
          </h2>
          <p className="text-slate-300 dark:text-slate-700 mb-6 max-w-2xl text-base lg:text-lg">
            Find your role and we'll point you to the 3–5 tutorials with the
            highest payoff for your specific day-to-day work.
          </p>
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-900 font-medium rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Find your role
            <ArrowRight size={16} aria-hidden="true" />
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
}: {
  icon: typeof Sparkles;
  number: number;
  label: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md dark:hover:shadow-2xl hover:-translate-y-0.5 transition-all"
    >
      <Icon
        className="text-brand-600 dark:text-brand-400 mb-2"
        size={18}
        aria-hidden="true"
      />
      <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors tabular-nums">
        {number}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
        {label}
      </div>
    </Link>
  );
}
