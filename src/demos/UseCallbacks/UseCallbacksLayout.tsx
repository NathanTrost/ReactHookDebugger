import { Outlet } from "react-router";
import "../../styles/hooks.css";

/**
 * Demo showing reactHookDebugger wrapping useCallback
 *
 * This example demonstrates:
 * 1. How useCallback recreates when dependencies change
 * 2. How to track which dependencies triggered the recreation
 * 3. Proper naming of dependencies for clear debugging
 */
const UseCallbacksLayout = () => {
  return (
    <div className="hook-layout">
      <h2>useCallback Debugger Demo</h2>

      <Outlet />

      <div className="hook-tips">
        <strong>💡 Tip:</strong> Open your browser console to see detailed logs about when each
        callback is recreated and which dependencies changed!
      </div>
    </div>
  );
};

export default UseCallbacksLayout;
