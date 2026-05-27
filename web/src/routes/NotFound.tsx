import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="text-center py-16">
      <div className="text-7xl mb-4 animate-fade-in" aria-hidden="true">
        🤔
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
        Page not found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
        That tutorial, role, theme, or tool doesn't exist — at least not yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back home
      </Link>
    </div>
  );
}
