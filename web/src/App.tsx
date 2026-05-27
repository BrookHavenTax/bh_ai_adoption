import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./routes/Home";
import { ThemesIndex, ThemeDetail } from "./routes/Themes";
import { RolesIndex, RoleDetail } from "./routes/Roles";
import { ToolsIndex, ToolDetail } from "./routes/Tools";
import { TutorialsIndex, TutorialDetail } from "./routes/Tutorials";
import { About } from "./routes/About";
import { NotFound } from "./routes/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
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
  );
}
