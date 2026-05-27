import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Sparkles, Wrench, X } from "lucide-react";
import { useRecentlyViewed, type RecentItem } from "@/lib/useRecentlyViewed";

const ICONS: Record<RecentItem["kind"], typeof BookOpen> = {
  tutorial: BookOpen,
  role: Users,
  theme: Sparkles,
  tool: Wrench,
};

const PATHS: Record<RecentItem["kind"], (id: string) => string> = {
  tutorial: (id) => `/tutorials/${id}`,
  role: (id) => `/roles/${id}`,
  theme: (id) => `/themes/${id}`,
  tool: (id) => `/tools/${id}`,
};

const KIND_LABELS: Record<RecentItem["kind"], string> = {
  tutorial: "Tutorial",
  role: "Role",
  theme: "Theme",
  tool: "Tool",
};

export function RecentlyViewed({ limit = 5 }: { limit?: number }) {
  const { items, clear } = useRecentlyViewed();
  if (items.length === 0) return null;
  const shown = items.slice(0, limit);

  return (
    <section
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5"
      data-testid="recently-viewed"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          <Clock size={14} aria-hidden="true" />
          Recently viewed
        </h2>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear recently viewed"
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-1"
        >
          <X size={12} aria-hidden="true" />
          Clear
        </button>
      </div>
      <ol className="space-y-1.5">
        {shown.map((item) => {
          const Icon = ICONS[item.kind];
          return (
            <li key={`${item.kind}-${item.id}`}>
              <Link
                to={PATHS[item.kind](item.id)}
                className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <Icon
                  className="flex-shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
                  size={15}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-slate-50">
                    {item.title}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium flex-shrink-0">
                  {KIND_LABELS[item.kind]}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
