import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Wrench, ListChecks } from "lucide-react";
import { themes, roles, tools, tutorials } from "@/content";
import { ThemeCard, TutorialCard } from "@/components/cards";

// Featured tutorials: the "universal entry-point" trio + one heavy-hitter
const FEATURED_SLUGS = [
  "email-first-draft",
  "pdf-summary-30sec",
  "qbo-bill-anomaly",
  "estate-doc-review",
];

export function Home() {
  const featured = FEATURED_SLUGS.map(
    (s) => tutorials.find((t) => t.slug === s)!,
  ).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-medium mb-4">
          <Sparkles size={14} aria-hidden="true" />
          Internal — Brookhaven coworkers
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">
          AI tools, mapped to your daily work.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
          A practical guide to using <strong>Claude</strong>, <strong>Claude
          Cowork</strong>, and other AI tools to save time on the work you
          actually do at Brookhaven — built from a survey of what coworkers
          asked for.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Browse all tutorials
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-medium rounded-lg border border-slate-300 hover:border-slate-500 transition-colors"
          >
            Find your role
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard
          icon={ListChecks}
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
        <StatCard
          icon={Users}
          number={roles.length}
          label="Roles covered"
          to="/roles"
        />
        <StatCard
          icon={Wrench}
          number={tools.length}
          label="Tools mapped"
          to="/tools"
        />
      </section>

      {/* Featured tutorials */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Start here — universal wins
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Three tutorials that anyone at Brookhaven can pick up today, plus
              one heavy-hitter for accounting.
            </p>
          </div>
          <Link
            to="/tutorials"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            All tutorials
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((t) => (
            <TutorialCard key={t.slug} tutorial={t} />
          ))}
        </div>
      </section>

      {/* Themes preview */}
      <section className="mb-12">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            The 8 pain themes from the survey
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Every coworker pain point maps to one of these themes. Browse the
            theme that matches what's slowing you down.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {themes.map((t) => (
            <ThemeCard key={t.id} theme={t} />
          ))}
        </div>
      </section>

      {/* CTA / "where to next" */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 lg:p-10">
        <h2 className="text-2xl font-bold mb-3">
          Not sure where to start?
        </h2>
        <p className="text-slate-300 mb-6 max-w-2xl">
          Find your role and we'll point you to the 3-5 tutorials with the
          highest payoff for your specific day-to-day work.
        </p>
        <Link
          to="/roles"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-900 font-medium rounded-lg hover:bg-amber-300 transition-colors"
        >
          Find your role
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
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
      className="bg-white rounded-xl border border-slate-200 p-4 hover:border-brand-400 hover:shadow-sm transition-all group"
    >
      <Icon
        className="text-brand-600 mb-2"
        size={20}
        aria-hidden="true"
      />
      <div className="text-3xl font-bold text-slate-900">{number}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </Link>
  );
}
