import type { ReactNode } from "react";

type BadgeVariant =
  | "neutral"
  | "brand"
  | "green"
  | "yellow"
  | "red"
  | "blue"
  | "purple";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  brand: "bg-brand-100 text-brand-800 border-brand-200",
  green: "bg-green-100 text-green-800 border-green-200",
  yellow: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-rose-100 text-rose-800 border-rose-200",
  blue: "bg-sky-100 text-sky-800 border-sky-200",
  purple: "bg-violet-100 text-violet-800 border-violet-200",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({
  level,
}: {
  level: "Beginner" | "Intermediate" | "Advanced";
}) {
  const variant: BadgeVariant =
    level === "Beginner" ? "green" : level === "Intermediate" ? "yellow" : "red";
  return <Badge variant={variant}>{level}</Badge>;
}

export function EffortBadge({
  effort,
}: {
  effort: "Low" | "Medium" | "High" | "Mixed";
}) {
  const variant: BadgeVariant =
    effort === "Low"
      ? "green"
      : effort === "Medium"
        ? "yellow"
        : effort === "High"
          ? "red"
          : "purple";
  return <Badge variant={variant}>Effort: {effort}</Badge>;
}
