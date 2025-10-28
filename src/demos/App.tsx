import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UseCallbacks from "./UseCallbacks";
import UseMemos from "./UseMemos";

function App() {
  const hasWindow = typeof window !== "undefined" ? window : null;
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>ReactHookDebugger Local Environment</h1>
      <p>Changes will hot-reload automatically.</p>
      <UseCallbacks />
      <UseMemos />
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
