import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  FileText,
  GraduationCap,
  Landmark,
  Plug,
  AlertTriangle,
  Info,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { issues, issuesByMonth } from "@/content/newsletter";
import type {
  NewsletterIssue,
  NewsletterItem,
} from "@/content/newsletter/types";
import { Badge } from "@/components/Badge";
import { Markdown } from "@/components/Markdown";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function NewsletterIndex() {
  const latest = issues[0];
  const archive = issues.slice(1);

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ label: "Home", to: "/" }, { label: "Newsletter" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-sky-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-6 lg:p-10 mb-10">
        <div
          className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-300/30 dark:bg-emerald-600/15 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 rounded-full text-xs font-bold mb-4">
            <FileText size={13} aria-hidden="true" />
            BrookHaven MONTHLY
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight mb-4 max-w-3xl">
            Tax + AI updates, in digestible bites.
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
            Each month we round up tax legislation moves that could affect our
            clients' filings, plus AI tools relevant to our workflows. Skim it
            in 90 seconds; dig deeper on anything that'll hit your desk.
          </p>
          {latest && (
            <Link
              to={`/newsletter/${latest.month}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              data-testid="newsletter-latest-cta"
            >
              <ArrowRight size={16} aria-hidden="true" />
              Read the {latest.monthLabel} issue
            </Link>
          )}
        </div>
      </section>

      {/* Latest issue preview */}
      {latest && (
        <section className="mb-10">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={12} aria-hidden="true" />
            Latest issue
          </div>
          <IssueCard issue={latest} featured />
        </section>
      )}

      {/* Archive */}
      {archive.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-5">
            Archive
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {archive.map((i) => (
              <IssueCard key={i.month} issue={i} />
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            How this newsletter works
          </h2>
          <div className="prose-bh max-w-3xl">
            <p>
              On the 1st of each month, an automated job draws from primary
              sources (IRS, Treasury, Congress.gov, GA Dept of Revenue, Tax
              Foundation, Anthropic releases, etc.), drafts a digestible
              roundup using Claude, and publishes it here.
            </p>
            <p>Every item follows the same shape:</p>
            <ul>
              <li>
                <strong>Title</strong> — what the change is, in 12 words
              </li>
              <li>
                <strong>Summary</strong> — 2-3 sentences plain English
              </li>
              <li>
                <strong>What it means for BrookHaven</strong> — 1-2 sentences tied to
                our clients and workflow
              </li>
              <li>
                <strong>Sources</strong> — direct links to primary sources for
                verification
              </li>
            </ul>
            <p>
              Spotted something we should track? Drop it in the{" "}
              <code>#ai-adoption</code> Telegram channel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function IssueCard({
  issue,
  featured = false,
}: {
  issue: NewsletterIssue;
  featured?: boolean;
}) {
  const taxCount = issue.taxLegislation.length;
  const aiCount = issue.aiTools.length;
  return (
    <Link
      to={`/newsletter/${issue.month}`}
      className={`group block p-5 bg-white dark:bg-slate-900 border ${featured ? "border-2 border-emerald-300 dark:border-emerald-800" : "border-slate-200 dark:border-slate-800"} rounded-xl hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all`}
      data-testid={`newsletter-issue-${issue.month}`}
    >
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <Calendar size={12} aria-hidden="true" />
        {issue.monthLabel}
        <span aria-hidden="true">·</span>
        <span>
          {taxCount} tax item{taxCount === 1 ? "" : "s"}, {aiCount} AI item
          {aiCount === 1 ? "" : "s"}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors mb-2">
        BrookHaven Monthly — {issue.monthLabel}
      </h3>
      <div className="flex gap-2 mt-3">
        <Badge variant="green">
          <Landmark size={11} className="mr-1" aria-hidden="true" />
          Tax legislation
        </Badge>
        <Badge variant="brand">
          <Plug size={11} className="mr-1" aria-hidden="true" />
          AI tools
        </Badge>
      </div>
    </Link>
  );
}

export function NewsletterDetail() {
  const { month } = useParams();
  const issue = month ? issuesByMonth[month] : undefined;

  if (!issue) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">
          Newsletter issue not found
        </h1>
        <Link
          to="/newsletter"
          className="text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          ← Back to the newsletter
        </Link>
      </div>
    );
  }

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Newsletter", to: "/newsletter" },
          { label: issue.monthLabel },
        ]}
      />

      <header className="mb-10">
        <Link
          to="/newsletter"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 mb-4 transition-colors"
        >
          <ChevronLeft size={14} aria-hidden="true" />
          All issues
        </Link>
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText size={12} aria-hidden="true" />
          BrookHaven Monthly · {issue.monthLabel}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight tracking-tight mb-4">
          Tax + AI updates for {issue.monthLabel}
        </h1>
        <div className="prose-bh max-w-3xl">
          <Markdown>{issue.intro}</Markdown>
        </div>
      </header>

      {/* Section 1: Tax legislation */}
      <SectionHeader
        id="tax-legislation"
        icon={Landmark}
        label="Section 1 · Primary"
        title="Tax legislation"
        subtitle="Federal and state moves that could change how we plan or file. Updates relevant to clients across all brackets."
        color="emerald"
      />
      {issue.taxLegislation.length > 0 ? (
        <div className="space-y-4 mb-12">
          {issue.taxLegislation.map((item, i) => (
            <ItemCard key={i} item={item} kind="tax" />
          ))}
        </div>
      ) : (
        <EmptySection text={issue.noTaxNews ?? "Quiet month — no significant tax legislation moves this period."} />
      )}

      {/* Section 2: AI tools */}
      <SectionHeader
        id="ai-tools"
        icon={Plug}
        label="Section 2 · Secondary"
        title="AI tools & Claude updates"
        subtitle="Releases and changes in Claude / Claude Cowork / Skills and other AI tooling relevant to our workflow."
        color="brand"
      />
      {issue.aiTools.length > 0 ? (
        <div className="space-y-4 mb-12">
          {issue.aiTools.map((item, i) => (
            <ItemCard key={i} item={item} kind="ai" />
          ))}
        </div>
      ) : (
        <EmptySection text={issue.noAiNews ?? "Nothing material this month. Existing tools still doing their job."} />
      )}

      {issue.closing && (
        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="prose-bh max-w-3xl">
            <Markdown>{issue.closing}</Markdown>
          </div>
        </section>
      )}
    </article>
  );
}

function SectionHeader({
  id,
  icon: Icon,
  label,
  title,
  subtitle,
  color,
}: {
  id: string;
  icon: typeof Landmark;
  label: string;
  title: string;
  subtitle: string;
  color: "emerald" | "brand";
}) {
  const colorClasses =
    color === "emerald"
      ? "text-emerald-700 dark:text-emerald-300"
      : "text-brand-700 dark:text-brand-400";
  return (
    <header id={id} className="mb-6 mt-4 scroll-mt-24">
      <div
        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 ${colorClasses}`}
      >
        <Icon size={14} aria-hidden="true" />
        {label}
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        {subtitle}
      </p>
    </header>
  );
}

const IMPACT_COLORS = {
  high: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  medium:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  low: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  informational:
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
};

const IMPACT_LABELS = {
  high: "High impact",
  medium: "Medium impact",
  low: "Low impact",
  informational: "FYI",
};

function ItemCard({
  item,
  kind,
}: {
  item: NewsletterItem;
  kind: "tax" | "ai";
}) {
  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 lg:p-6">
      <div className="flex items-start gap-3 mb-3 flex-wrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${IMPACT_COLORS[item.impact]}`}
        >
          {IMPACT_LABELS[item.impact]}
        </span>
        {item.status && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            {item.status}
          </span>
        )}
        {item.scope && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800">
            {item.scope}
          </span>
        )}
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight">
        {item.title}
      </h3>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        {item.summary}
      </p>
      <div
        className={`flex gap-3 p-4 rounded-lg ${kind === "tax" ? "bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-400" : "bg-brand-50 dark:bg-brand-950/30 border-l-4 border-brand-400"}`}
      >
        <GraduationCap
          className={`flex-shrink-0 mt-0.5 ${kind === "tax" ? "text-emerald-700 dark:text-emerald-300" : "text-brand-700 dark:text-brand-400"}`}
          size={18}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div
            className={`text-xs uppercase tracking-wider font-bold mb-1 ${kind === "tax" ? "text-emerald-800 dark:text-emerald-300" : "text-brand-800 dark:text-brand-300"}`}
          >
            What this means for BrookHaven
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {item.whatItMeans}
          </p>
        </div>
      </div>
      {item.affectsBrackets && item.affectsBrackets.length > 0 && (
        <div className="flex items-center gap-2 mt-3 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Affects:
          </span>
          {item.affectsBrackets.map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] font-medium"
            >
              {b}
            </span>
          ))}
        </div>
      )}
      {item.sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Sources:
          </span>
          {item.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline"
            >
              {s.label}
              <ExternalLink size={10} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function EmptySection({ text }: { text: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 mb-12 flex items-start gap-3">
      <Info
        className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5"
        size={18}
        aria-hidden="true"
      />
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

// Used by Info banner for empty sections — re-export to satisfy linter
export const _IconAlert = AlertTriangle;
