import { useCallback } from "react";
import { useLocalStorage } from "./storage";

type ProgressMap = Record<string, number[]>; // slug -> array of completed step indexes

const STORAGE_KEY = "bh-tutorial-progress";

export function useTutorialProgress(slug: string) {
  const [allProgress, setAll] = useLocalStorage<ProgressMap>(STORAGE_KEY, {});
  const completed = allProgress[slug] ?? [];

  const toggleStep = useCallback(
    (idx: number) => {
      setAll((prev) => {
        const cur = prev[slug] ?? [];
        const next = cur.includes(idx)
          ? cur.filter((i) => i !== idx)
          : [...cur, idx];
        return { ...prev, [slug]: next };
      });
    },
    [setAll, slug],
  );

  const reset = useCallback(() => {
    setAll((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }, [setAll, slug]);

  return {
    completed,
    isComplete: (idx: number) => completed.includes(idx),
    toggleStep,
    reset,
  };
}
