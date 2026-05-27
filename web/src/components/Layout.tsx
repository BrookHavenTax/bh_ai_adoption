import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/themes", label: "By theme" },
  { to: "/roles", label: "By role" },
  { to: "/tools", label: "By tool" },
  { to: "/tutorials", label: "All tutorials" },
  { to: "/about", label: "About" },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-slate-900 flex-shrink-0"
              data-testid="logo-link"
            >
              <span
                className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center text-sm font-bold"
                aria-hidden="true"
              >
                BH
              </span>
              <span className="hidden sm:inline">AI Adoption Hub</span>
            </Link>

            <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
              <SearchBar />
            </div>

            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-brand-100 text-brand-800"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`
                  }
                  data-testid={`nav-${item.to.replace("/", "") || "home"}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-slate-700"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-testid="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="md:hidden pb-3">
            <SearchBar />
          </div>

          {mobileOpen && (
            <nav
              className="lg:hidden border-t border-slate-200 py-2"
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
                        ? "bg-brand-100 text-brand-800"
                        : "text-slate-700 hover:bg-slate-100"
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500">
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
