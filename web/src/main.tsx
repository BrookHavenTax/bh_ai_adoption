import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./lib/toast";
import "./index.css";

// Initialize theme before React mounts to avoid a flash of incorrect theme.
(() => {
  try {
    const stored = window.localStorage.getItem("bh-theme");
    let theme: "dark" | "light";
    if (stored === "dark" || stored === "light") {
      theme = stored;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch {
    // ignored
  }
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
