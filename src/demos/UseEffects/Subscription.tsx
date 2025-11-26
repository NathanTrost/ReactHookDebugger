/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const Subscription = () => {
  const [userId, _setUserId] = useState(1);

  const [isOnline, setIsOnline] = useState(true);
  const { useEffect: debugEffect5 } = reactHookDebugger("OnlineStatusSubscription", ["isOnline"]);

  debugEffect5(() => {
    // NOTE: Add better alternative to this
    console.log("⏰ Setting up polling for user:", userId);
  }, [userId]);

  return (
    <>
      <h3>Subscription Pattern (Online Status)</h3>
      <div className="example-stats">
        <strong>Status:</strong> {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>
      <div className="info-box-details">
        <strong>Effect behavior:</strong> Sets up/tears down event listeners when dependency changes
      </div>
      <button className="btn-primary" onClick={() => setIsOnline(!isOnline)}>
        Toggle Status (Simulate Network Change)
      </button>
    </>
  );
};

export default Subscription;
