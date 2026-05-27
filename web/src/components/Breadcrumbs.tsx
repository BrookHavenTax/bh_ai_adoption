import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap"
    >
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1.5">
            {idx > 0 && (
              <ChevronRight
                size={14}
                className="text-slate-400"
                aria-hidden="true"
              />
            )}
            {crumb.to && !isLast ? (
              <Link to={crumb.to} className="hover:text-brand-700">
                {crumb.label}
              </Link>
            ) : (
              <span
                className={isLast ? "text-slate-900 font-medium" : ""}
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
