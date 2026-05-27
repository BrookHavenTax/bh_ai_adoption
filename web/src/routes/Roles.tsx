import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { roles, rolesById, tutorialsBySlug, tutorialsForRole } from "@/content";
import { RoleCard, TutorialCard } from "@/components/cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

export function RolesIndex() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Home", to: "/" }, { label: "By role" }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
        Find your role
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl text-lg">
        Each role has its top pain points and a curated "first win" tutorial —
        the single highest-payoff workflow to try this week.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r, i) => (
          <div
            key={r.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <RoleCard role={r} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoleDetail() {
  const { roleId } = useParams();
  const role = roleId ? rolesById[roleId] : undefined;
  const { record } = useRecentlyViewed();

  useEffect(() => {
    if (role) record("role", role.id, role.title);
  }, [role, record]);

  if (!role) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-50">
          Role not found
        </h1>
        <Link
          to="/roles"
          className="text-brand-700 dark:text-brand-400 hover:underline"
        >
          ← Back to all roles
        </Link>
      </div>
    );
  }

  const recommended = role.recommendedTutorialSlugs
    .map((s) => tutorialsBySlug[s])
    .filter(Boolean);
  const others = tutorialsForRole(role.id).filter(
    (t) => !role.recommendedTutorialSlugs.includes(t.slug),
  );

  return (
    <article>
      <Breadcrumbs
        crumbs={[
          { label: "Home", to: "/" },
          { label: "By role", to: "/roles" },
          { label: role.title },
        ]}
      />
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium mb-2">
          {role.department}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          {role.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {role.oneLiner}
        </p>
      </header>

      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center">
            <Star
              className="text-amber-700 dark:text-amber-300"
              size={20}
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 font-semibold mb-1">
              Your first win
            </div>
            <p className="text-slate-800 dark:text-slate-100 leading-relaxed">
              {role.firstWin}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Top pain points
        </h2>
        <ul className="space-y-2">
          {role.topPainPoints.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <span
                className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-500"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {recommended.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Recommended tutorials (start here)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Also relevant for your role
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
