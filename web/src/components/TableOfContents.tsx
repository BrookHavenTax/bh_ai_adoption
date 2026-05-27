import { useEffect, useState } from "react";

export interface TocEntry {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when section top crosses ~25% from the top of the viewport
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    const els: HTMLElement[] = [];
    for (const entry of entries) {
      const el = document.getElementById(entry.id);
      if (el) {
        observer.observe(el);
        els.push(el);
      }
    }
    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav
      className="text-sm"
      aria-label="Table of contents"
      data-testid="table-of-contents"
    >
      <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-3">
        On this page
      </div>
      <ol className="space-y-2 border-l border-slate-200 dark:border-slate-800">
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`block pl-3 -ml-px border-l-2 transition-colors leading-snug ${
                  isActive
                    ? "border-brand-500 text-brand-700 dark:text-brand-400 font-medium"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(entry.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(entry.id);
                    // Update hash without losing scroll position
                    history.replaceState(null, "", `#${entry.id}`);
                  }
                }}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
