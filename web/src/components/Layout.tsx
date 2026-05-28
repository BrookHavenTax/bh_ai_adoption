import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

type NavAccent = "neutral" | "violet" | "emerald";

const navItems: {
  to: string;
  label: string;
  end: boolean;
  accent: NavAccent;
}[] = [
  { to: "/", label: "Home", end: true, accent: "neutral" },
  { to: "/skills", label: "Skills", end: false, accent: "violet" },
  { to: "/cowork", label: "Cowork", end: false, accent: "violet" },
  { to: "/prompts", label: "Prompts", end: false, accent: "violet" },
  { to: "/newsletter", label: "Newsletter", end: false, accent: "emerald" },
  { to: "/tutorials", label: "Tutorials", end: false, accent: "neutral" },
  { to: "/roles", label: "Roles", end: false, accent: "neutral" },
  { to: "/tools", label: "Tools", end: false, accent: "neutral" },
  { to: "/about", label: "About", end: false, accent: "neutral" },
];

// Full class strings per accent (Tailwind can't build these dynamically).
const NAV_ACCENT: Record<
  NavAccent,
  {
    deskActive: string;
    deskInactive: string;
    underline: string;
    mobileActive: string;
    mobileInactive: string;
  }
> = {
  neutral: {
    deskActive: "text-slate-900 dark:text-slate-50",
    deskInactive:
      "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60",
    underline: "bg-brand-500",
    mobileActive:
      "bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200",
    mobileInactive:
      "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  },
  violet: {
    deskActive: "text-violet-700 dark:text-violet-300",
    deskInactive:
      "text-violet-700 dark:text-violet-400 hover:text-violet-900 dark:hover:text-violet-200 hover:bg-violet-50 dark:hover:bg-violet-950/40",
    underline: "bg-violet-500",
    mobileActive:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200",
    mobileInactive:
      "text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/30",
  },
  emerald: {
    deskActive: "text-emerald-700 dark:text-emerald-300",
    deskInactive:
      "text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
    underline: "bg-emerald-500",
    mobileActive:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200",
    mobileInactive:
      "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
  },
};

interface LayoutProps {
  onOpenPalette: () => void;
}

export function Layout({ onOpenPalette }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setMobileOpen(false);
  }, [location.pathname]);

  // Detect Mac vs others for the shortcut display
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
              data-testid="logo-link"
            >
              <img
                src="/brookhaven-logo.svg"
                alt="BrookHaven"
                width={36}
                height={36}
                className="w-9 h-9 rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"
              />
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  BrookHaven
                </span>
                <span className="text-[11px] -mt-0.5 text-slate-500 dark:text-slate-400">
                  AI Integrations Hub
                </span>
              </span>
            </Link>

            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? NAV_ACCENT[item.accent].deskActive
                        : NAV_ACCENT[item.accent].deskInactive
                    }`
                  }
                  data-testid={`nav-${item.to.replace("/", "") || "home"}`}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-0.5 rounded-full ${NAV_ACCENT[item.accent].underline}`}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={onOpenPalette}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors w-56"
                aria-label="Open search"
                data-testid="search-trigger"
              >
                <Search size={14} aria-hidden="true" />
                <span className="flex-1 text-left">Search…</span>
                <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded border border-slate-200 dark:border-slate-700">
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              </button>
              <button
                type="button"
                onClick={onOpenPalette}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open search"
                data-testid="search-trigger-mobile"
              >
                <Search size={18} aria-hidden="true" />
              </button>
              <ThemeToggle />
              <button
                type="button"
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                data-testid="mobile-menu-toggle"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <nav
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-2 animate-fade-in"
              aria-label="Mobile"
              data-testid="mobile-nav"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? NAV_ACCENT[item.accent].mobileActive
                        : NAV_ACCENT[item.accent].mobileInactive
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-fade-in"
      >
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              BrookHaven AI Integrations Hub · Internal use only · Built with Claude
            </div>
            <div className="text-xs">
              Got a tutorial idea? Drop it in the #ai-adoption Telegram channel.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
