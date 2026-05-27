import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/themes", label: "Themes" },
  { to: "/roles", label: "Roles" },
  { to: "/tools", label: "Tools" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/about", label: "About" },
];

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
              className="flex items-center gap-2 font-bold flex-shrink-0 group"
              data-testid="logo-link"
            >
              <span
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-100 dark:to-slate-300 text-amber-400 dark:text-amber-600 flex items-center justify-center text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow"
                aria-hidden="true"
              >
                BH
              </span>
              <span className="hidden sm:inline text-slate-900 dark:text-slate-100">
                AI Adoption Hub
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
                    `relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-slate-900 dark:text-slate-50"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`
                  }
                  data-testid={`nav-${item.to.replace("/", "") || "home"}`}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-0.5 bg-brand-500 rounded-full"
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
                        ? "bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
              Brookhaven AI Adoption Hub · Internal use only · Built with Claude
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
