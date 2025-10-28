/* eslint-disable no-console  */

import { useState } from "react";

import { reactHookDebugger } from "../reactHookDebugger";

/**
 * Demo showing reactHookDebugger wrapping useCallback
 *
 * This example demonstrates:
 * 1. How useCallback recreates when dependencies change
 * 2. How to track which dependencies triggered the recreation
 * 3. Proper naming of dependencies for clear debugging
 */
const UseCallbacks = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [text, setText] = useState("Hello");

  // Example 1: useCallback with multiple dependencies
  const { useCallback: debugUseCallback } = reactHookDebugger("CalculateTotal", [
    "count",
    "multiplier",
  ]);

  const calculateTotal = debugUseCallback(() => {
    const total = count * multiplier;
    console.log(`Calculated: ${count} × ${multiplier} = ${total}`);
    return total;
  }, [count, multiplier]);

  // Example 2: useCallback with text dependency
  const { useCallback: debugTextCallback } = reactHookDebugger("HandleTextSubmit", ["text"]);

  const handleSubmit = debugTextCallback(() => {
    alert(`Submitting: ${text}`);
  }, [text]);

  // Example 3: useCallback with no dependencies (created once)
  const { useCallback: debugStaticCallback } = reactHookDebugger("StaticCallback", []);

  const staticCallback = debugStaticCallback(() => {
    console.log("This callback never recreates!");
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>useCallback Debugger Demo</h2>

      {/* Section 1: Multiple Dependencies */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 1: Multiple Dependencies</h3>
        <p>Open console to see when useCallback recreates</p>
        <div style={{ marginBottom: "10px" }}>
          <strong>Count:</strong> {count} | <strong>Multiplier:</strong> {multiplier}
        </div>
        <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>
          Increment Count
        </button>
        <button onClick={() => setMultiplier(multiplier + 1)} style={{ marginRight: "10px" }}>
          Increment Multiplier
        </button>
        <button onClick={calculateTotal}>Calculate Total</button>
      </div>

      {/* Section 2: Text Input Dependency */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 2: Text Input Dependency</h3>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleSubmit}>Submit Text</button>
      </div>

      {/* Section 3: Static Callback */}
      <div style={{ padding: "15px", border: "1px solid #ccc" }}>
        <h3>Example 3: Static Callback (No Dependencies)</h3>
        <p>This callback is created once and never recreated</p>
        <button onClick={staticCallback}>Call Static Callback</button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <strong>💡 Tip:</strong> Open your browser console to see detailed logs about when each
        callback is recreated and which dependencies changed!
      </div>
    </div>
  );
};

export default UseCallbacks;
