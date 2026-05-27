import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// Ensure navigator.clipboard exists (jsdom may not provide it). We always
// also ensure writeText is a configurable property so tests can replace it.
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    value: {},
    configurable: true,
    writable: true,
  });
}
Object.defineProperty(navigator.clipboard, "writeText", {
  value: () => Promise.resolve(),
  configurable: true,
  writable: true,
});

// Polyfill scrollTo (Layout calls it on every route change)
if (typeof window !== "undefined") {
  window.scrollTo = (() => {}) as typeof window.scrollTo;
}

// Polyfill IntersectionObserver (TableOfContents uses it)
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = () => [];
    root = null;
    rootMargin = "";
    thresholds: ReadonlyArray<number> = [];
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

// Polyfill for matchMedia
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
