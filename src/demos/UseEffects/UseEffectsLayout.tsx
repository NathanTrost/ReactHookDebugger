import { Outlet } from "react-router";

/**
 * Demo showing reactHookDebugger wrapping useEffect
 *
 * This example demonstrates:
 * 1. How useEffect runs when dependencies change
 * 2. How to track which dependencies triggered the effect
 * 3. Different useEffect patterns (multiple deps, single dep, empty array, no array)
 * 4. Common useEffect use cases (data fetching, subscriptions, side effects)
 */
const UseEffectsLayout = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>useEffect Debugger Demo</h2>

      <Outlet />

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <strong>💡 Tips:</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          {/* NOTE: Tweak messaging here */}
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

export default UseEffectsLayout;
