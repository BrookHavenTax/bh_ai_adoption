import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="text-center py-16">
      <div className="text-7xl mb-4" aria-hidden="true">
        🤔
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Page not found
      </h1>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        That tutorial / role / theme / tool doesn't exist — at least not yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
      >
        Back home
      </Link>
    </div>
  );
}
