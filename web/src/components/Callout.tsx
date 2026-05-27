import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import { Markdown } from "./Markdown";
import type { CalloutVariant } from "@/content/types";

interface CalloutProps {
  variant: CalloutVariant;
  body: string;
  title?: string;
}

const variantConfig: Record<
  CalloutVariant,
  {
    icon: typeof Info;
    container: string;
    icon_color: string;
    title: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    container: "bg-amber-50 border-amber-300",
    icon_color: "text-amber-600",
    title: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    container: "bg-rose-50 border-rose-300",
    icon_color: "text-rose-600",
    title: "Watch out",
  },
  info: {
    icon: Info,
    container: "bg-sky-50 border-sky-300",
    icon_color: "text-sky-600",
    title: "Note",
  },
  success: {
    icon: CheckCircle2,
    container: "bg-emerald-50 border-emerald-300",
    icon_color: "text-emerald-600",
    title: "Good move",
  },
};

export function Callout({ variant, body, title }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  return (
    <div
      className={`flex gap-3 rounded-lg border-l-4 p-4 my-4 ${config.container}`}
      role="note"
      aria-label={title || config.title}
    >
      <Icon
        className={`flex-shrink-0 mt-0.5 ${config.icon_color}`}
        size={20}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-900 mb-1">
          {title || config.title}
        </div>
        <div className="text-slate-700 text-sm">
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </div>
  );
}
