import { useCallback } from "react";
import { useLocalStorage } from "./storage";

export type RecentItemKind = "tutorial" | "role" | "theme" | "tool";

export interface RecentItem {
  kind: RecentItemKind;
  id: string;
  title: string;
  viewedAt: number;
}

const STORAGE_KEY = "bh-recently-viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [items, setItems] = useLocalStorage<RecentItem[]>(STORAGE_KEY, []);

  const record = useCallback(
    (kind: RecentItemKind, id: string, title: string) => {
      setItems((prev) => {
        const filtered = prev.filter((i) => !(i.kind === kind && i.id === id));
        const next: RecentItem[] = [
          { kind, id, title, viewedAt: Date.now() },
          ...filtered,
        ];
        return next.slice(0, MAX_ITEMS);
      });
    },
    [setItems],
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  return { items, record, clear };
}
