/**
 * Typed localStorage hook with cross-tab AND same-tab sync.
 * Same-tab sync is implemented via a custom event since the native `storage`
 * event only fires in OTHER tabs/windows.
 */
import { useCallback, useEffect, useState } from "react";

const SAME_TAB_EVENT = "bh-storage-update";

interface SameTabEventDetail {
  key: string;
  value: string | null;
}

function dispatchSameTab(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SameTabEventDetail>(SAME_TAB_EVENT, {
      detail: { key, value },
    }),
  );
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        let serialized: string | null = null;
        try {
          serialized = JSON.stringify(next);
          window.localStorage.setItem(key, serialized);
        } catch {
          // ignored
        }
        dispatchSameTab(key, serialized);
        return next;
      });
    },
    [key],
  );

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key) return;
      try {
        const next =
          e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue;
        setStoredValue(next);
      } catch {
        // ignored
      }
    }
    function onSameTab(e: Event) {
      const detail = (e as CustomEvent<SameTabEventDetail>).detail;
      if (!detail || detail.key !== key) return;
      try {
        const next =
          detail.value !== null
            ? (JSON.parse(detail.value) as T)
            : initialValue;
        setStoredValue(next);
      } catch {
        // ignored
      }
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(SAME_TAB_EVENT, onSameTab);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SAME_TAB_EVENT, onSameTab);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
