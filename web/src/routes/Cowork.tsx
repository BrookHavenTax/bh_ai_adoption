import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plug,
  Zap,
  ShieldAlert,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import { tutorials, tutorialsBySlug, tools as allTools } from "@/content";
import { TutorialCard } from "@/components/cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const FOUNDATIONAL_SLUG = "claude-cowork-101";

export function CoworkIndex() {
  const foundational = tutorialsBySlug[FOUNDATIONAL_SLUG];
  const allCowork = tutorials.filter(
    (t) => t.format === "Cowork" && t.slug !== FOUNDATIONAL_SLUG,
  );

  // Connector tiles — pull from tools registry
  const connectorTools = allTools.filter((t) =>
    ["qbo", "outlook", "dropbox", "monday", "teams"].includes(t.id),
  );

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ label: "Home", to: "/" }, { label: "Claude Cowork" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50 dark:from-brand-950/40 dark:via-slate-900 dark:to-amber-950/40 border border-brand-200 dark:border-brand-900 rounded-2xl p-6 lg:p-10 mb-10">
        <div
          className="absolute -top-16 -right-16 w-64 h-64 bg-brand-300/30 dark:bg-brand-600/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-900/40 text-brand-900 dark:text-brand-200 rounded-full text-xs font-semibold mb-4">
            <Plug size={13} aria-hidden="true" />
            CLAUDE COWORK
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight mb-4 max-w-3xl">
            Connect Claude to the systems you actually work in.
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            <strong className="text-slate-900 dark:text-slate-50">
              Claude Cowork
            </strong>{" "}
            is the umbrella for Claude's connectors — the integrations that let
            Claude read from (and write to) QuickBooks, Outlook, Dropbox,
            Monday, Telegram, Teams, and more. Stop copy-pasting between tools.
            Let Claude pull what it needs.
          </p>
          <Link
            to={`/tutorials/${FOUNDATIONAL_SLUG}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Zap size={16} aria-hidden="true" />
            Start with Cowork 101
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Featured: Cowork 101 */}
      {foundational && (
        <section className="mb-12">
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap size={12} aria-hidden="true" />
            Start here — read this first
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-stretch">
            <Link
              to={`/tutorials/${foundational.slug}`}
              className="group p-6 lg:p-8 bg-white dark:bg-slate-900 border-2 border-brand-300 dark:border-brand-800 rounded-xl hover:border-brand-500 dark:hover:border-brand-600 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="text-6xl leading-none flex-shrink-0" aria-hidden="true">
                  {foundational.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                    {foundational.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {foundational.subtitle}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 dark:text-brand-400 group-hover:gap-3 transition-all">
                    Read the full tutorial
                    <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex flex-col gap-2 w-64">
              <Highlight label="What 'Cowork' means" icon={CheckCircle2}>
                The umbrella for every Claude connector / MCP integration
              </Highlight>
              <Highlight label="Read-only first" icon={ShieldAlert}>
                Why you should NEVER authorize write access on day one
              </Highlight>
              <Highlight label="Skills + Cowork" icon={CheckCircle2}>
                How combining them unlocks end-to-end automation safely
              </Highlight>
            </div>
          </div>
        </section>
      )}

      {/* Supported connectors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          Connectors we use at Brookhaven
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 max-w-2xl">
          Each connector links Claude to one of our work tools. Click any to
          see what's possible today and the tutorials for it.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {connectorTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all group"
            >
              <div className="text-3xl leading-none flex-shrink-0" aria-hidden="true">
                {tool.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {tool.whatItDoes}
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Cowork workflows */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Cowork workflows you can build today
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl">
              Each tutorial walks you through authorizing a connector and
              wiring it into a real Brookhaven workflow.
            </p>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {allCowork.length} workflows
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCowork.map((t, i) => (
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

      {/* The over-automation rule */}
      <section>
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl p-6 lg:p-8">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center flex-shrink-0">
              <ShieldAlert
                className="text-rose-700 dark:text-rose-300"
                size={20}
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300 mb-1">
                The over-automation rule
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Every client-facing automation needs a human gate
              </h2>
            </div>
          </div>
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 ml-13">
            <p>
              The single most-cited warning in the Brookhaven coworker survey:
              automation can run silently with wrong output. The ILIT board did
              this — Monday automations were "working" but client documents
              had the wrong fields filled in. The backstop (manually checking
              every output) took longer than just doing the work by hand.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-100">
                Two non-negotiable practices for every Cowork workflow:
              </strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Read-only first.</strong> Authorize read access only.
                Prove the value for 2-4 weeks before granting write
                permissions.
              </li>
              <li>
                <strong>Propose, don't act.</strong> Anything client-facing
                generates a draft for a human to review and approve — Claude
                does not send/post/submit on its own.
              </li>
            </ul>
            <p className="text-sm">
              Pattern is covered in every Cowork tutorial. If you find one that
              doesn't follow it, that's a bug — flag it in #ai-adoption.
            </p>
          </div>
        </div>
      </section>
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
        className="text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5"
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

// Used in connector tiles via import
export const _COWORK_ICON = Wrench;
