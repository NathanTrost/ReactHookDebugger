import { Outlet } from "react-router";
import "../../styles/hooks.css";

/**
 * Demo showing reactHookDebugger wrapping useMemo
 *
 * This example demonstrates:
 * 1. How useMemo recalculates when dependencies change
 * 2. How to track which dependencies triggered the recalculation
 * 3. Performance benefits of useMemo for expensive computations
 */
const UseMemosLayout = () => {
  return (
    <div className="hook-layout">
      <h2>useMemo Debugger Demo</h2>

      <Outlet />

      <div className="hook-tips">
        {/* NOTE: Separating these examples out, makes this message a bit moot. I think that's the right call,
        but will definitely want to check for and display this use-case in examples */}
        <strong>💡 Tip:</strong>
        {`Open your browser console to see when each
        memoized value is recalculated. Notice that changing unrelated state
        doesn't trigger recalculation!`}
      </div>
    </div>
  );
};

export default UseMemosLayout;
