import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { tutorials } from "@/content";

interface SearchResult {
  type: "tutorial";
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
}

function buildIndex(): SearchResult[] {
  return tutorials.map((t) => ({
    type: "tutorial",
    slug: t.slug,
    title: t.title,
    subtitle: t.subtitle,
    emoji: t.emoji,
  }));
}

function scoreMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) {
    // Higher score for prefix matches; even higher for whole-word
    if (t.startsWith(q)) return 100;
    if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(t))
      return 80;
    return 50;
  }
  // Fuzzy: every character of q appears in order in t
  let ti = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    ti = found + 1;
  }
  return 20;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return index
      .map((item) => ({
        item,
        score: Math.max(
          scoreMatch(query, item.title),
          scoreMatch(query, item.subtitle) * 0.6,
        ),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }, [query, index]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Global keyboard shortcut: /
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      e.preventDefault();
      navigate(`/tutorials/${results[activeIdx].slug}`);
      setQuery("");
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search tutorials… (press / to focus)"
          aria-label="Search tutorials"
          className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          data-testid="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      {open && query.trim() && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50"
          role="listbox"
          data-testid="search-results"
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              No tutorials match "<strong>{query}</strong>"
            </div>
          ) : (
            results.map((r, idx) => (
              <Link
                key={r.slug}
                to={`/tutorials/${r.slug}`}
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                role="option"
                aria-selected={idx === activeIdx}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm border-b border-slate-100 last:border-b-0 ${
                  idx === activeIdx
                    ? "bg-brand-50 text-slate-900"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
                data-testid={`search-result-${r.slug}`}
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">
                  {r.emoji}
                </span>
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-slate-500 truncate">
                    {r.subtitle}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
