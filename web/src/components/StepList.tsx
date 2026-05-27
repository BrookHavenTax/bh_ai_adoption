import { Check } from "lucide-react";
import type { TutorialStep } from "@/content/types";
import { Markdown } from "./Markdown";
import { Callout } from "./Callout";
import { PromptBlock } from "./PromptBlock";
import { useTutorialProgress } from "@/lib/useTutorialProgress";

interface StepListProps {
  steps: TutorialStep[];
  tutorialSlug: string;
}

export function stepAnchorId(idx: number) {
  return `step-${idx + 1}`;
}

export function StepList({ steps, tutorialSlug }: StepListProps) {
  const { isComplete, toggleStep } = useTutorialProgress(tutorialSlug);

  return (
    <ol className="space-y-8 list-none pl-0" data-testid="step-list">
      {steps.map((step, idx) => {
        const done = isComplete(idx);
        const anchorId = stepAnchorId(idx);
        return (
          <li
            key={idx}
            id={anchorId}
            className="relative pl-14 scroll-mt-24"
            data-testid={`step-${idx + 1}`}
          >
            <button
              type="button"
              onClick={() => toggleStep(idx)}
              aria-label={
                done ? `Mark step ${idx + 1} incomplete` : `Mark step ${idx + 1} complete`
              }
              aria-pressed={done}
              className={`absolute left-0 top-0 w-10 h-10 rounded-full font-bold flex items-center justify-center text-lg shadow-sm transition-all hover:scale-105 active:scale-95 ${
                done
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-400"
              }`}
              data-testid={`step-checkbox-${idx + 1}`}
            >
              {done ? <Check size={20} aria-hidden="true" /> : idx + 1}
            </button>
            <h3
              className={`text-xl font-semibold mb-2 mt-1 leading-tight transition-colors ${
                done
                  ? "text-slate-500 dark:text-slate-500 line-through decoration-2"
                  : "text-slate-900 dark:text-slate-50"
              }`}
            >
              {step.title}
            </h3>
            <Markdown>{step.body}</Markdown>
            {step.prompt && <PromptBlock prompt={step.prompt} />}
            {step.callout && (
              <Callout variant={step.callout.variant} body={step.callout.body} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
