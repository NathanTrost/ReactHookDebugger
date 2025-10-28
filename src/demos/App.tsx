import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UseCallbacks from "./UseCallbacks";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>ReactHookDebugger Local Environment</h1>
      <p>Changes will hot-reload automatically.</p>
      <UseCallbacks />
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
