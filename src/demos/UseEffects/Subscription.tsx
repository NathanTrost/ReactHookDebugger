/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";

const Subscription = () => {
  const [userId, _setUserId] = useState(1);

  const [isOnline, setIsOnline] = useState(true);
  const { useEffect: debugEffect5 } = reactHookDebugger("OnlineStatusSubscription", ["isOnline"]);

  debugEffect5(() => {
    // NOTE: Add better alternative to this
    console.log("⏰ Setting up polling for user:", userId);
  }, [userId]);

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Subscription Pattern (Online Status)</h3>
      <div style={{ marginBottom: "10px" }}>
        <strong>Status:</strong> {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#f3e5f5",
        }}
      >
        <strong>Effect behavior:</strong> Sets up/tears down event listeners when dependency changes
      </div>
      <button onClick={() => setIsOnline(!isOnline)}>
        Toggle Status (Simulate Network Change)
      </button>
    </div>
  );
};

export default Subscription;
