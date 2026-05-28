import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageSquareText,
  Zap,
  Gauge,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { roles } from "@/content";
import {
  modelGuides,
  modelDecisionRule,
  promptTemplates,
  type ClaudeModel,
  type PromptTemplate,
} from "@/content/prompts";
import { Badge } from "@/components/Badge";
import { PromptBlock } from "@/components/PromptBlock";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const MODEL_BADGE_VARIANT: Record<ClaudeModel, "purple" | "blue" | "green"> = {
  Opus: "purple",
  Sonnet: "blue",
  Haiku: "green",
};

function ModelBadge({ model }: { model: ClaudeModel }) {
  return <Badge variant={MODEL_BADGE_VARIANT[model]}>Claude {model}</Badge>;
}

const MODEL_CARD_ACCENT: Record<
  ClaudeModel,
  { icon: typeof Zap; ring: string; chip: string }
> = {
  Opus: {
    icon: Sparkles,
    ring: "border-violet-200 dark:border-violet-800",
    chip: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
  },
  Sonnet: {
    icon: Gauge,
    ring: "border-sky-200 dark:border-sky-800",
    chip: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
  },
  Haiku: {
    icon: Zap,
    ring: "border-emerald-200 dark:border-emerald-800",
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
};

export function PromptsIndex() {
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Roles that actually have at least one template, in roles.ts order
  const rolesWithTemplates = useMemo(
    () =>
      roles.filter((r) =>
        promptTemplates.some((t) => t.forRoleIds.includes(r.id)),
      ),
    [],
  );

  const visibleRoles =
    roleFilter === "all"
      ? rolesWithTemplates
      : rolesWithTemplates.filter((r) => r.id === roleFilter);

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ label: "Home", to: "/" }, { label: "Prompts" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-sky-950/40 dark:via-slate-900 dark:to-cyan-950/40 border border-sky-200 dark:border-sky-900 rounded-2xl p-6 lg:p-10 mb-10">
        <div
          className="absolute -top-16 -right-16 w-64 h-64 bg-sky-300/30 dark:bg-sky-600/15 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 dark:bg-sky-900/40 text-sky-900 dark:text-sky-200 rounded-full text-xs font-bold mb-4">
            <MessageSquareText size={13} aria-hidden="true" />
            CLAUDE PROMPTS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight mb-4 max-w-3xl">
            Ask Claude better. Steal these prompts.
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            A copy-paste prompt library, mapped to what each role at BrookHaven
            actually does day to day. Fill in the{" "}
            <code className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800 text-sm">
              [BRACKETS]
            </code>
            , paste into Claude, edit the result. Each one tells you which model
            to use.
          </p>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ArrowRight size={16} aria-hidden="true" />
            Jump to the prompts
          </a>
        </div>
      </section>

      {/* Model selection guide */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Gauge size={12} aria-hidden="true" />
          First, pick a model
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          Which Claude model should I use?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-2xl">
          Claude comes in three sizes. Bigger isn't always better — match the
          model to the job.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {modelGuides.map((g) => {
            const accent = MODEL_CARD_ACCENT[g.model];
            const Icon = accent.icon;
            return (
              <div
                key={g.model}
                className={`p-5 rounded-xl border bg-white dark:bg-slate-900 ${accent.ring}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${accent.chip}`}
                  >
                    <Icon size={13} aria-hidden="true" />
                    {g.fullName}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {g.tagline}
                </p>
                <ul className="space-y-1.5 mb-3">
                  {g.useWhen.map((u, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <span
                        className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-slate-400"
                        aria-hidden="true"
                      />
                      {u}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic border-t border-slate-200 dark:border-slate-800 pt-2.5">
                  {g.speedCost}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 p-4 rounded-lg bg-sky-50 dark:bg-sky-950/30 border-l-4 border-sky-400">
          <Lightbulb
            className="flex-shrink-0 mt-0.5 text-sky-600 dark:text-sky-400"
            size={18}
            aria-hidden="true"
          />
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-sky-800 dark:text-sky-300 mb-1">
              Rule of thumb
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {modelDecisionRule}
            </p>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="scroll-mt-24">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquareText size={12} aria-hidden="true" />
            Prompt templates
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
            Prompts for your role
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {promptTemplates.length} ready-to-use templates. Filter to your role
            or browse them all.
          </p>
        </div>

        {/* Role filter chips */}
        <div className="flex flex-wrap gap-2 mb-8" data-testid="prompt-role-filter">
          <button
            type="button"
            onClick={() => setRoleFilter("all")}
            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${
              roleFilter === "all"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
            }`}
          >
            All roles
          </button>
          {rolesWithTemplates.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRoleFilter(r.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${
                roleFilter === r.id
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
              }`}
              data-testid={`prompt-role-chip-${r.id}`}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Grouped by role */}
        <div className="space-y-12">
          {visibleRoles.map((role) => {
            const templates = promptTemplates.filter((t) =>
              t.forRoleIds.includes(role.id),
            );
            return (
              <div key={role.id} data-testid={`prompt-group-${role.id}`}>
                <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {role.title}
                  </h3>
                  <Link
                    to={`/roles/${role.id}`}
                    className="text-xs text-sky-700 dark:text-sky-400 hover:underline"
                  >
                    role page →
                  </Link>
                </div>
                <div className="space-y-5">
                  {templates.map((t) => (
                    <PromptCard key={t.id} template={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PromptCard({ template }: { template: PromptTemplate }) {
  return (
    <article
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5"
      data-testid={`prompt-card-${template.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">
          {template.title}
        </h4>
        <ModelBadge model={template.model} />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-1">
        {template.scenario}
      </p>
      <PromptBlock prompt={template.prompt} />
      <p className="text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Why Claude {template.model}:
        </span>{" "}
        {template.modelReason}
      </p>
      {template.tip && (
        <div className="mt-2.5 flex gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-2.5">
          <Lightbulb size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{template.tip}</span>
        </div>
      )}
    </article>
  );
}
