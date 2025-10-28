import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>React Test Environment</h1>
      <p>Edit this file to test your React code!</p>
      <p>Changes will hot-reload automatically.</p>
    </div>
  );
}

// Mount the app
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
