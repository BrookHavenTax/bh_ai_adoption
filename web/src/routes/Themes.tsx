import { Link, useParams } from "react-router-dom";
import { themes, themesById, rolesById, tutorialsForTheme } from "@/content";
import { ThemeCard, TutorialCard } from "@/components/cards";
import { Markdown } from "@/components/Markdown";
import { Callout } from "@/components/Callout";
import { EffortBadge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ThemesIndex() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "By theme" }]} />
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Browse by pain theme
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        The 8 themes that surfaced across the coworker survey. Each one covers
        the pain point, the AI solution that works today, and the tutorials
        that walk you through it.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((t) => (
          <ThemeCard key={t.id} theme={t} />
        ))}
      </div>
    </div>
  );
}

export function ThemeDetail() {
  const { themeId } = useParams();
  const theme = themeId ? themesById[themeId] : undefined;

  if (!theme) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">Theme not found</h1>
        <Link to="/themes" className="text-brand-700 hover:underline">
          ← Back to all themes
        </Link>
      </div>
    );
  }

  const tutorialsForThis = tutorialsForTheme(theme.id);
  const affectedRoles = theme.affectedRoleIds
    .map((id) => rolesById[id])
    .filter(Boolean);

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "By theme", to: "/themes" },
          { label: theme.title },
        ]}
      />
      <header className="mb-8">
        <div className="flex items-start gap-4 mb-3">
          <div className="text-5xl leading-none" aria-hidden="true">
            {theme.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {theme.title}
            </h1>
            <p className="text-lg text-slate-600 mb-3">{theme.oneLiner}</p>
            <EffortBadge effort={theme.effort} />
          </div>
        </div>
      </header>

      <section className="mb-8">
        <Markdown>{theme.description}</Markdown>
      </section>

      {theme.notSolvable && (
        <section className="mb-8">
          <Callout variant="warning" body={theme.notSolvable} title="Not solvable today" />
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Who feels this
        </h2>
        <div className="flex flex-wrap gap-2">
          {affectedRoles.map((role) => (
            <Link
              key={role.id}
              to={`/roles/${role.id}`}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm hover:border-brand-400 transition-colors"
            >
              {role.title}
            </Link>
          ))}
        </div>
      </section>

      {tutorialsForThis.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Tutorials for this theme
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorialsForThis.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
