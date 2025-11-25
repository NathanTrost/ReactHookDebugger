/* eslint-disable no-console */
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const MultiDeps = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [_userData, setUserData] = useLocalStorage("userData", { count: 0, userId: 1 });

  const { useEffect: debugEffect1 } = reactHookDebugger("SyncToLocalStorage", ["count", "userId"]);

  debugEffect1(() => {
    // NOTE: Probably don't need the console, perhaps a loading state?
    // console.log("💾 Syncing to localStorage...");
    setUserData({ count, userId });
    // console.log("✅ Saved to localStorage:", { count, userId });
  }, [count, userId]);
  return (
    <>
      <h3>Multiple Dependencies (LocalStorage Sync)</h3>
      <p>Open console to see when useEffect runs</p>
      <div className="example-stats">
        <strong>Count:</strong> {count} | <strong>User ID:</strong> {userId}
      </div>
      <div className="info-box-details">
        <strong>Effect runs when:</strong> count OR userId changes
      </div>
      <div className="btn-group">
        <button className="btn-primary" onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <button className="btn-primary" onClick={() => setUserId(userId + 1)}>
          Change User ID
        </button>
      </div>
    </>
  );
};

export default MultiDeps;
