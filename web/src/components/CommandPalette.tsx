import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  BookOpen,
  Users,
  Sparkles,
  Wrench,
  Home,
  Clock,
  X,
  GraduationCap,
  Plug,
  FileText,
  MessageSquareText,
} from "lucide-react";
import {
  roles,
  themes,
  tools,
  tutorials,
  rolesById,
  themesById,
  toolsById,
  tutorialsBySlug,
} from "@/content";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: typeof Search;
  to: string;
  group: string;
  keywords: string;
}

function buildIndex(): Command[] {
  const cmds: Command[] = [];
  cmds.push({
    id: "home",
    title: "Home",
    icon: Home,
    to: "/",
    group: "Pages",
    keywords: "home start landing",
  });
  cmds.push({
    id: "skills",
    title: "Claude Skills",
    subtitle: "Learn what Skills are and build your own",
    icon: GraduationCap,
    to: "/skills",
    group: "Pages",
    keywords: "skills claude skill custom instructions trigger",
  });
  cmds.push({
    id: "cowork",
    title: "Claude Cowork",
    subtitle: "Connect Claude to your work tools",
    icon: Plug,
    to: "/cowork",
    group: "Pages",
    keywords: "cowork connector connectors mcp outlook qbo monday dropbox integration",
  });
  cmds.push({
    id: "prompts",
    title: "Claude Prompts",
    subtitle: "Copy-paste prompt templates + which model to use",
    icon: MessageSquareText,
    to: "/prompts",
    group: "Pages",
    keywords: "prompts prompt templates model opus sonnet haiku ask claude examples",
  });
  cmds.push({
    id: "newsletter",
    title: "Newsletter",
    subtitle: "Monthly tax legislation + AI tool updates",
    icon: FileText,
    to: "/newsletter",
    group: "Pages",
    keywords: "newsletter monthly tax legislation news updates ai tools",
  });
  cmds.push({
    id: "themes",
    title: "Browse by pain theme",
    icon: Sparkles,
    to: "/themes",
    group: "Pages",
    keywords: "themes pain points",
  });
  cmds.push({
    id: "roles",
    title: "Find your role",
    icon: Users,
    to: "/roles",
    group: "Pages",
    keywords: "roles position job department",
  });
  cmds.push({
    id: "tools",
    title: "Browse by tool",
    icon: Wrench,
    to: "/tools",
    group: "Pages",
    keywords: "tools outlook telegram dropbox monday qbo teams adobe",
  });
  cmds.push({
    id: "tutorials",
    title: "All tutorials",
    icon: BookOpen,
    to: "/tutorials",
    group: "Pages",
    keywords: "tutorials guides",
  });
  for (const t of tutorials) {
    cmds.push({
      id: `tutorial-${t.slug}`,
      title: t.title,
      subtitle: t.subtitle,
      icon: BookOpen,
      to: `/tutorials/${t.slug}`,
      group: "Tutorials",
      keywords: `${t.title} ${t.subtitle} ${t.aiTools.join(" ")} ${t.audienceRoleIds.join(" ")} ${t.themeIds.join(" ")} ${t.toolIds.join(" ")}`,
    });
  }
  for (const r of roles) {
    cmds.push({
      id: `role-${r.id}`,
      title: r.title,
      subtitle: r.department,
      icon: Users,
      to: `/roles/${r.id}`,
      group: "Roles",
      keywords: `${r.title} ${r.department} ${r.oneLiner}`,
    });
  }
  for (const t of themes) {
    cmds.push({
      id: `theme-${t.id}`,
      title: t.title,
      subtitle: t.oneLiner,
      icon: Sparkles,
      to: `/themes/${t.id}`,
      group: "Themes",
      keywords: `${t.title} ${t.oneLiner}`,
    });
  }
  for (const t of tools) {
    cmds.push({
      id: `tool-${t.id}`,
      title: t.name,
      subtitle: t.whatItDoes,
      icon: Wrench,
      to: `/tools/${t.id}`,
      group: "Tools",
      keywords: `${t.name} ${t.whatItDoes}`,
    });
  }
  return cmds;
}

function scoreMatch(query: string, cmd: Command): number {
  const q = query.toLowerCase().trim();
  if (!q) return 1;
  const title = cmd.title.toLowerCase();
  const sub = (cmd.subtitle ?? "").toLowerCase();
  const kw = cmd.keywords.toLowerCase();

  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 80;
  if (kw.includes(q)) return 60;
  if (sub.includes(q)) return 40;

  // Fuzzy: every char of q appears in order in title or keywords
  function fuzzy(text: string): boolean {
    let ti = 0;
    for (const ch of q) {
      const found = text.indexOf(ch, ti);
      if (found === -1) return false;
      ti = found + 1;
    }
    return true;
  }
  if (fuzzy(title)) return 25;
  if (fuzzy(kw)) return 15;
  return 0;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { items: recents } = useRecentlyViewed();

  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!query.trim()) return [] as Command[];
    return index
      .map((cmd) => ({ cmd, score: scoreMatch(query, cmd) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => r.cmd);
  }, [index, query]);

  // Items shown in the list: results if querying, recents otherwise
  const recentCmds: Command[] = useMemo(() => {
    if (query.trim() || recents.length === 0) return [];
    return recents
      .map((item): Command | null => {
        if (item.kind === "tutorial") {
          const t = tutorialsBySlug[item.id];
          if (!t) return null;
          return {
            id: `tutorial-${t.slug}`,
            title: t.title,
            subtitle: t.subtitle,
            icon: BookOpen,
            to: `/tutorials/${t.slug}`,
            group: "Recently viewed",
            keywords: "",
          };
        }
        if (item.kind === "role") {
          const r = rolesById[item.id];
          if (!r) return null;
          return {
            id: `role-${r.id}`,
            title: r.title,
            subtitle: r.department,
            icon: Users,
            to: `/roles/${r.id}`,
            group: "Recently viewed",
            keywords: "",
          };
        }
        if (item.kind === "theme") {
          const t = themesById[item.id];
          if (!t) return null;
          return {
            id: `theme-${t.id}`,
            title: t.title,
            subtitle: t.oneLiner,
            icon: Sparkles,
            to: `/themes/${t.id}`,
            group: "Recently viewed",
            keywords: "",
          };
        }
        if (item.kind === "tool") {
          const t = toolsById[item.id];
          if (!t) return null;
          return {
            id: `tool-${t.id}`,
            title: t.name,
            subtitle: t.whatItDoes,
            icon: Wrench,
            to: `/tools/${t.id}`,
            group: "Recently viewed",
            keywords: "",
          };
        }
        return null;
      })
      .filter((c): c is Command => c !== null);
  }, [query, recents]);

  const shownItems: Command[] = query.trim() ? results : recentCmds;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-cmd-idx="${activeIdx}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const goTo = useCallback(
    (cmd: Command) => {
      navigate(cmd.to);
      onClose();
    },
    [navigate, onClose],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, shownItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && shownItems[activeIdx]) {
      e.preventDefault();
      goTo(shownItems[activeIdx]);
    }
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Group items by group label
  const grouped: { group: string; items: Command[] }[] = [];
  for (const item of shownItems) {
    const g = grouped.find((g) => g.group === item.group);
    if (g) g.items.push(item);
    else grouped.push({ group: item.group, items: [item] });
  }

  // Flat index lookup for navigation/highlight
  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-[15vh] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-label"
      data-testid="command-palette"
    >
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-in">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search
            className="text-slate-400 dark:text-slate-500"
            size={18}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tutorials, roles, themes, tools…"
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base"
            aria-label="Search"
            id="command-palette-label"
            data-testid="command-palette-input"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="sm:hidden p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2"
          role="listbox"
        >
          {shownItems.length === 0 ? (
            <Empty query={query} />
          ) : (
            grouped.map(({ group, items }) => (
              <div key={group} className="mb-1.5">
                <div className="px-4 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  {group === "Recently viewed" && (
                    <Clock size={11} aria-hidden="true" />
                  )}
                  {group}
                </div>
                <div>
                  {items.map((item) => {
                    flatIdx++;
                    const isActive = flatIdx === activeIdx;
                    const myIdx = flatIdx;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-cmd-idx={myIdx}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => goTo(item)}
                        onMouseEnter={() => setActiveIdx(myIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left ${
                          isActive
                            ? "bg-brand-50 dark:bg-brand-900/20"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                        data-testid={`command-item-${item.id}`}
                      >
                        <Icon
                          className={`flex-shrink-0 ${
                            isActive
                              ? "text-brand-700 dark:text-brand-400"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                          size={16}
                          aria-hidden="true"
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium truncate ${
                              isActive
                                ? "text-slate-900 dark:text-slate-50"
                                : "text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                        {isActive && (
                          <ArrowRight
                            className="text-brand-600 dark:text-brand-400 flex-shrink-0"
                            size={14}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <Hint kbd="↑↓">navigate</Hint>
          <Hint kbd="↵">open</Hint>
          <Hint kbd="esc">close</Hint>
        </div>
      </div>
    </div>
  );
}

function Hint({ kbd, children }: { kbd: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-1">
      <kbd className="font-mono px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {kbd}
      </kbd>
      {children}
    </span>
  );
}

function Empty({ query }: { query: string }) {
  if (!query.trim()) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p className="mb-1 text-slate-700 dark:text-slate-200 font-medium">
          Search the whole hub
        </p>
        <p>Tutorials · Roles · Themes · Tools</p>
        <p className="mt-3 text-xs">
          Press{" "}
          <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
            ⌘K
          </kbd>{" "}
          anytime to open this.
        </p>
      </div>
    );
  }
  return (
    <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      No matches for "<strong>{query}</strong>"
    </div>
  );
}
