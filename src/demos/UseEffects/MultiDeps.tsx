/* eslint-disable no-console */
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { reactHookDebugger } from "../../hook";

const MultiDeps = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [_userData, setUserData] = useLocalStorage("userData", { count: 0, userId: 1 });

  const { useEffect: debugEffect1 } = reactHookDebugger("SyncToLocalStorage", ["count", "userId"]);

  debugEffect1(() => {
    // NOTE: Probably don't need the console, perhaps a loading state?
    console.log("💾 Syncing to localStorage...");
    setUserData({ count, userId });
    console.log("✅ Saved to localStorage:", { count, userId });
  }, [count, userId]);
  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Multiple Dependencies (LocalStorage Sync)</h3>
      <p>Open console to see when useEffect runs</p>
      <div style={{ marginBottom: "10px" }}>
        <strong>Count:</strong> {count} | <strong>User ID:</strong> {userId}
      </div>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#e8f5e9",
        }}
      >
        <strong>Effect runs when:</strong> count OR userId changes
      </div>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>
        Increment Count
      </button>
      <button onClick={() => setUserId(userId + 1)}>Change User ID</button>
    </div>
  );
};

export default MultiDeps;
