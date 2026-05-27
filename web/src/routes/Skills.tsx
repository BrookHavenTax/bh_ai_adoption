import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Zap,
  Wrench,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { tutorials, tutorialsBySlug } from "@/content";
import { TutorialCard } from "@/components/cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const FOUNDATIONAL_SLUG = "claude-skills-101";

export function SkillsIndex() {
  const foundational = tutorialsBySlug[FOUNDATIONAL_SLUG];
  const allSkills = tutorials.filter(
    (t) => t.format === "Skill" && t.slug !== FOUNDATIONAL_SLUG,
  );
  // Related: Project-format tutorials demonstrate the pattern one tier "under" Skills
  const relatedProjects = tutorials
    .filter((t) => t.format === "Project")
    .slice(0, 6);

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ label: "Home", to: "/" }, { label: "Claude Skills" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-violet-200 dark:border-violet-900 rounded-2xl p-6 lg:p-10 mb-10">
        <div
          className="absolute -top-16 -right-16 w-64 h-64 bg-violet-300/30 dark:bg-violet-600/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 rounded-full text-xs font-semibold mb-4">
            <GraduationCap size={13} aria-hidden="true" />
            CLAUDE SKILLS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight mb-4 max-w-3xl">
            Bundle your playbooks. Reuse them everywhere.
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            A <strong className="text-slate-900 dark:text-slate-50">Claude Skill</strong>{" "}
            is a saved playbook of instructions Claude picks up automatically
            when the task matches. Build it once, and every chat across your
            team can use it. The fastest way to bake institutional knowledge
            into AI-assisted work.
          </p>
          <Link
            to={`/tutorials/${FOUNDATIONAL_SLUG}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Zap size={16} aria-hidden="true" />
            Start with Skills 101
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Featured: Skills 101 */}
      {foundational && (
        <section className="mb-12">
          <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} aria-hidden="true" />
            Start here — read this first
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-stretch">
            <Link
              to={`/tutorials/${foundational.slug}`}
              className="group p-6 lg:p-8 bg-white dark:bg-slate-900 border-2 border-violet-300 dark:border-violet-800 rounded-xl hover:border-violet-500 dark:hover:border-violet-600 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="text-6xl leading-none flex-shrink-0" aria-hidden="true">
                  {foundational.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                    {foundational.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {foundational.subtitle}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 dark:text-violet-300 group-hover:gap-3 transition-all">
                    Read the full tutorial
                    <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex flex-col gap-2 w-64">
              <Highlight label="What you'll learn" icon={CheckCircle2}>
                When a Skill beats a raw prompt or a Project
              </Highlight>
              <Highlight label="The 'description trap'" icon={CheckCircle2}>
                Why most Skills don't auto-trigger and how to fix it
              </Highlight>
              <Highlight label="The 5-test rule" icon={CheckCircle2}>
                The discipline that separates good Skills from broken ones
              </Highlight>
            </div>
          </div>
        </section>
      )}

      {/* All Skills */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Skills you can build today
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl">
              Each one has a full copy-pasteable Skill body — adapt the
              specifics to your role and ship in under 30 minutes.
            </p>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {allSkills.length} Skills
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allSkills.map((t, i) => (
            <div
              key={t.slug}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <TutorialCard tutorial={t} />
            </div>
          ))}
        </div>
      </section>

      {/* When to use Skills vs Projects vs Prompts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          When to use a Skill (vs a Project or a one-shot Prompt)
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-2xl">
          Skills aren't the only Claude.ai pattern — pick the right tool for the
          job.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <ComparisonCard
            icon={Zap}
            kind="Prompt"
            color="emerald"
            useCase="One-off questions"
            best="When you need to ask something once and move on. Zero setup overhead."
            example='"Summarize this PDF in 3 bullets."'
          />
          <ComparisonCard
            icon={Layers}
            kind="Project"
            color="sky"
            useCase="Repeated work in one area"
            best="When you have shared knowledge/files for one workstream (e.g. a specific client)."
            example='A "BrightPoint client work" Project with their template files in Knowledge.'
          />
          <ComparisonCard
            icon={GraduationCap}
            kind="Skill"
            color="violet"
            useCase="Patterns that apply everywhere"
            best="When the same instructions apply across MANY chats and Projects (a style, a process, a domain)."
            example='A "Brookhaven email voice" Skill that activates anytime you draft for the firm.'
          />
        </div>
      </section>

      {/* Related — Projects that demonstrate Skill-adjacent patterns */}
      {relatedProjects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Wrench
              className="text-slate-500 dark:text-slate-400"
              size={18}
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              Related — Projects (the step before Skills)
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-2xl">
            These tutorials use the Claude.ai Project pattern. Once you've
            built a Project that works well, the leap to turning it into a
            shared Skill is small.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProjects.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Highlight({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof CheckCircle2;
  children: string;
}) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
      <Icon
        className="text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5"
        size={16}
        aria-hidden="true"
      />
      <div className="text-xs">
        <div className="font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
          {label}
        </div>
        <div className="text-slate-600 dark:text-slate-400 leading-snug">
          {children}
        </div>
      </div>
    </div>
  );
}

const COMPARISON_COLORS = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: "text-emerald-600 dark:text-emerald-400",
    label: "text-emerald-900 dark:text-emerald-300",
  },
  sky: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    icon: "text-sky-600 dark:text-sky-400",
    label: "text-sky-900 dark:text-sky-300",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    icon: "text-violet-600 dark:text-violet-400",
    label: "text-violet-900 dark:text-violet-300",
  },
} as const;

function ComparisonCard({
  icon: Icon,
  kind,
  color,
  useCase,
  best,
  example,
}: {
  icon: typeof Zap;
  kind: string;
  color: keyof typeof COMPARISON_COLORS;
  useCase: string;
  best: string;
  example: string;
}) {
  const c = COMPARISON_COLORS[color];
  return (
    <div className={`p-5 rounded-xl border ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-lg ${c.bg} ${c.border} border flex items-center justify-center`}
        >
          <Icon className={c.icon} size={16} aria-hidden="true" />
        </div>
        <div className={`text-xs font-bold uppercase tracking-wider ${c.label}`}>
          {kind}
        </div>
      </div>
      <div className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1.5">
        {useCase}
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug mb-3">
        {best}
      </p>
      <div className="text-xs text-slate-600 dark:text-slate-400 italic border-t border-slate-200 dark:border-slate-800 pt-2.5">
        Example: {example}
      </div>
    </div>
  );
}
