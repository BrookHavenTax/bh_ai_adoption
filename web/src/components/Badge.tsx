import type { ReactNode } from "react";
import type { TutorialFormat } from "@/content/types";

type BadgeVariant =
  | "neutral"
  | "brand"
  | "green"
  | "yellow"
  | "red"
  | "blue"
  | "purple";

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  brand:
    "bg-brand-100 text-brand-800 border-brand-200 dark:bg-brand-900/40 dark:text-brand-300 dark:border-brand-800",
  green:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  yellow:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  red:
    "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  blue:
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
  purple:
    "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
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

const formatToVariant: Record<TutorialFormat, BadgeVariant> = {
  Skill: "purple",
  Cowork: "brand",
  Project: "blue",
  Prompt: "green",
  Script: "red",
  Process: "neutral",
};

const formatLabels: Record<TutorialFormat, string> = {
  Skill: "Claude Skill",
  Cowork: "Claude Cowork",
  Project: "Project",
  Prompt: "Prompt",
  Script: "Script",
  Process: "Process",
};

export function FormatBadge({ format }: { format: TutorialFormat }) {
  return (
    <Badge variant={formatToVariant[format]} className="font-semibold">
      {formatLabels[format]}
    </Badge>
  );
}
