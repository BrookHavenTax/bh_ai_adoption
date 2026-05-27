import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import type { Role, Theme, ToolPlaybook, Tutorial } from "@/content/types";
import { Badge, DifficultyBadge, EffortBadge } from "./Badge";

export function RoleCard({ role }: { role: Role }) {
  return (
    <Link
      to={`/roles/${role.id}`}
      className="group block p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all"
      data-testid={`role-card-${role.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
            {role.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{role.department}</p>
        </div>
        <ArrowRight
          size={18}
          className="text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0 mt-1"
          aria-hidden="true"
        />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-3">
        {role.oneLiner}
      </p>
      <div className="text-xs text-slate-500">
        <span className="font-medium text-slate-700">First win:</span>{" "}
        {role.firstWin}
      </div>
    </Link>
  );
}

export function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <Link
      to={`/themes/${theme.id}`}
      className="group block p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all"
      data-testid={`theme-card-${theme.id}`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div
          className="text-3xl flex-shrink-0 leading-none"
          aria-hidden="true"
        >
          {theme.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
            {theme.title}
          </h3>
          <div className="mt-1">
            <EffortBadge effort={theme.effort} />
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{theme.oneLiner}</p>
    </Link>
  );
}

export function ToolCard({ tool }: { tool: ToolPlaybook }) {
  return (
    <Link
      to={`/tools/${tool.id}`}
      className="group block p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all"
      data-testid={`tool-card-${tool.id}`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div
          className="text-3xl flex-shrink-0 leading-none"
          aria-hidden="true"
        >
          {tool.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
            {tool.name}
          </h3>
          <div className="mt-1">
            <Badge
              variant={tool.category === "company-stack" ? "brand" : "blue"}
            >
              {tool.category === "company-stack"
                ? "Company stack"
                : "Secondary"}
            </Badge>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{tool.whatItDoes}</p>
    </Link>
  );
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link
      to={`/tutorials/${tutorial.slug}`}
      className="group block p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all"
      data-testid={`tutorial-card-${tutorial.slug}`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div
          className="text-3xl flex-shrink-0 leading-none"
          aria-hidden="true"
        >
          {tutorial.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-700 leading-tight">
            {tutorial.title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-3">
        {tutorial.subtitle}
      </p>
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <DifficultyBadge level={tutorial.difficulty} />
        <span className="inline-flex items-center gap-1 text-slate-500">
          <Clock size={12} aria-hidden="true" />
          {tutorial.timeEstimate}
        </span>
      </div>
    </Link>
  );
}
