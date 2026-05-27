import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/lib/toast";

interface PromptBlockProps {
  prompt: string;
  label?: string;
}

export function PromptBlock({ prompt, label = "Copy prompt" }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast("Prompt copied to clipboard", { variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without Clipboard API
      const ta = document.createElement("textarea");
      ta.value = prompt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        const ok = document.execCommand("copy");
        if (ok) {
          setCopied(true);
          toast("Prompt copied to clipboard", { variant: "success" });
          setTimeout(() => setCopied(false), 2000);
        } else {
          toast("Could not copy — please copy manually", { variant: "warning" });
        }
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  return (
    <div className="relative my-4 group">
      <div className="absolute top-2 right-2 z-10">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : label}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all shadow-sm ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="absolute top-2 left-3 z-10 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">
        Prompt
      </div>
      <pre className="bg-slate-900 dark:bg-slate-900 border border-slate-800 text-slate-100 rounded-lg pt-8 pb-4 px-4 pr-20 overflow-x-auto text-sm whitespace-pre-wrap break-words leading-relaxed font-mono">
        <code>{prompt}</code>
      </pre>
    </div>
  );
}
