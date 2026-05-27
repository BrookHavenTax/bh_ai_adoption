import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./routes/Home";
import { ThemesIndex, ThemeDetail } from "./routes/Themes";
import { RolesIndex, RoleDetail } from "./routes/Roles";
import { ToolsIndex, ToolDetail } from "./routes/Tools";
import { TutorialsIndex, TutorialDetail } from "./routes/Tutorials";
import { About } from "./routes/About";
import { NotFound } from "./routes/NotFound";
import { CommandPalette } from "./components/CommandPalette";
import { ReadingProgressBar } from "./components/ReadingProgressBar";
import { SkipLink } from "./components/SkipLink";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K to open command palette
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      } else if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SkipLink />
      <ReadingProgressBar />
      <Routes>
        <Route
          element={<Layout onOpenPalette={() => setPaletteOpen(true)} />}
        >
          <Route index element={<Home />} />
          <Route path="/themes" element={<ThemesIndex />} />
          <Route path="/themes/:themeId" element={<ThemeDetail />} />
          <Route path="/roles" element={<RolesIndex />} />
          <Route path="/roles/:roleId" element={<RoleDetail />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          <Route path="/tutorials" element={<TutorialsIndex />} />
          <Route path="/tutorials/:slug" element={<TutorialDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
