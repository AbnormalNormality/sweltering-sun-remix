import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";

console.info(
  ["%cDooz's ROM Hacks:", "  %cThe Doozcord: %chttps://discord.gg/2wgfHBGAtH"].join("\n"),
  "font-weight: bolder;",
  "font-weight: bolder; color: blue;",
  "",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
