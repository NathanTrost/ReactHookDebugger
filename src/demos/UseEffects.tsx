/* eslint-disable no-console */
import { useState } from "react";
import { useLocalStorage, useDebounceCallback } from "usehooks-ts";

import { reactHookDebugger } from "../reactHookDebugger";

/**
 * Demo showing reactHookDebugger wrapping useEffect
 *
 * This example demonstrates:
 * 1. How useEffect runs when dependencies change
 * 2. How to track which dependencies triggered the effect
 * 3. Different useEffect patterns (multiple deps, single dep, empty array, no array)
 * 4. Common useEffect use cases (data fetching, subscriptions, side effects)
 */
const UseEffects = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const [_userData, setUserData] = useLocalStorage("userData", { count: 0, userId: 1 });

  // Example 1: Effect with multiple dependencies
  const { useEffect: debugEffect1 } = reactHookDebugger("SyncToLocalStorage", ["count", "userId"]);

  debugEffect1(() => {
    console.log("💾 Syncing to localStorage...");
    setUserData({ count, userId });
    console.log("✅ Saved to localStorage:", { count, userId });
  }, [count, userId]);

  // Example 2: Effect with single dependency (debounced search)
  const { useEffect: debugEffect2 } = reactHookDebugger("SearchDebounce", ["searchTerm"]);

  const debouncedSearch = useDebounceCallback((searchTerm: string) => {
    console.log(`🔎 Searching for: "${searchTerm}"`);
    if (searchTerm) {
      console.log(`📡 API call would happen here for: "${searchTerm}"`);
    }
  }, 500);

  debugEffect2(() => {
    console.log("🔍 Triggering debounced search...");
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  // Example 3: Effect with empty dependency array (runs once on mount)
  const { useEffect: debugEffect3 } = reactHookDebugger("MountOnly", []);

  debugEffect3(() => {
    console.log("🎬 Component mounted - setting up initial data");
    console.log("📊 This only runs once on mount!");

    return () => {
      console.log("👋 Component unmounting - cleanup");
    };
  }, []);

  // Example 4: Effect with NO dependency array (runs on EVERY render)
  // This demonstrates the warning case
  const { useEffect: debugEffect4 } = reactHookDebugger("EveryRender", []);

  debugEffect4(() => {
    console.log("🔄 This effect runs on EVERY render! (No dependency array)");
    console.log("⚠️ Current state snapshot:", { count, userId, searchTerm });
  }); // Note: No dependency array at all!

  // Example 5: Effect simulating a subscription
  const { useEffect: debugEffect5 } = reactHookDebugger("OnlineStatusSubscription", ["isOnline"]);

  debugEffect5(() => {
    console.log("⏰ Setting up polling for user:", userId);
  }, [userId]);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>useEffect Debugger Demo</h2>

      {/* Section 1: Multiple Dependencies */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 1: Multiple Dependencies (LocalStorage Sync)</h3>
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

      {/* Section 2: Single Dependency (Debounced Search) */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 2: Single Dependency (Debounced Search)</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Search Term:
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
            />
          </label>
        </div>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3e0",
          }}
        >
          <strong>Effect behavior:</strong> Debounces search with 500ms delay. Cleanup cancels
          previous timeout.
        </div>
      </div>

      {/* Section 3: Empty Dependency Array */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 3: Empty Dependency Array (Mount Only)</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e3f2fd",
          }}
        >
          <strong>Effect behavior:</strong> Runs only once on component mount. Check console for
          mount message.
        </div>
        <p>{`This effect initialized when the component first rendered and won't run again.`}</p>
      </div>

      {/* Section 4: No Dependency Array (Every Render) */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ffebee",
        }}
      >
        <h3>Example 4: No Dependency Array (Every Render) ⚠️</h3>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffcdd2",
          }}
        >
          <strong>⚠️ Warning:</strong> This effect has NO dependency array, so it runs on EVERY
          render! Check console to see it fire repeatedly.
        </div>
        <p>
          Any state change in this component will trigger this effect. This is usually a mistake!
        </p>
        <button onClick={() => setCount(count + 1)}>Trigger Render (Increment Count)</button>
      </div>

      {/* Section 5: Subscription Pattern */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 5: Subscription Pattern (Online Status)</h3>
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
          <strong>Effect behavior:</strong> Sets up/tears down event listeners when dependency
          changes
        </div>
        <button onClick={() => setIsOnline(!isOnline)}>
          Toggle Status (Simulate Network Change)
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <strong>💡 Tips:</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>Open console to see detailed logs about when each effect runs</li>
          <li>Notice how cleanup functions run before the next effect</li>
          <li>
            Example 4 shows why missing dependency arrays can cause performance issues (runs on
            every render!)
          </li>
          <li>Pay attention to which dependency changes trigger which effects</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffects;
