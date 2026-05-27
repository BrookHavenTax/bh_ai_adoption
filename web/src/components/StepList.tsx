import type { TutorialStep } from "@/content/types";
import { Markdown } from "./Markdown";
import { Callout } from "./Callout";
import { PromptBlock } from "./PromptBlock";

interface StepListProps {
  steps: TutorialStep[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <ol className="space-y-8 list-none pl-0">
      {steps.map((step, idx) => (
        <li key={idx} className="relative pl-14">
          <div
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-lg shadow-sm"
            aria-hidden="true"
          >
            {idx + 1}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2 mt-1">
            {step.title}
          </h3>
          <Markdown>{step.body}</Markdown>
          {step.prompt && <PromptBlock prompt={step.prompt} />}
          {step.callout && (
            <Callout variant={step.callout.variant} body={step.callout.body} />
          )}
        </li>
      ))}
    </ol>
  );
}
