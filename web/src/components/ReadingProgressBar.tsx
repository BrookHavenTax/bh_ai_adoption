import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        (document.documentElement.scrollHeight ||
          document.body.scrollHeight ||
          0) - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  // Only show progress bar on long content pages (tutorial details, themes, tools, roles)
  const shouldShow =
    location.pathname.startsWith("/tutorials/") ||
    location.pathname.startsWith("/themes/") ||
    location.pathname.startsWith("/tools/") ||
    location.pathname.startsWith("/roles/");

  if (!shouldShow) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
