/* eslint-disable no-console */
import { useState } from "react";
import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

/**
 * Inner component that uses the debugger hook.
 * This component will mount and unmount based on parent state.
 */
const DebuggedComponent = () => {
  const { useEffect: debugEffect } = reactHookDebugger("ConditionalEffect", []);

  debugEffect(() => {
    console.log("🎬 DebuggedComponent mounted - executing effect");

    return () => {
      console.log("👋 DebuggedComponent unmounting - cleanup");
    };
  }, []);

  return (
    <div className="example-info-box-info">
      <p>✅ DebuggedComponent is currently mounted</p>
    </div>
  );
};

/**
 * Outer component that controls mounting/unmounting of the debugged component.
 * This allows you to manually trigger remount scenarios.
 */
const Remount = () => {
  const [isMounted, setIsMounted] = useState(true);

  return (
    <>
      <h3>Conditional Mount (Remount Example)</h3>
      <div className="example-info-box-info">
        <strong>Effect behavior:</strong> Click the toggle button to unmount and remount the
        component. The console will show cleanup on unmount and mount effects when remounting. Use
        this to verify remount counting works correctly.
      </div>
      <button
        onClick={() => setIsMounted(!isMounted)}
        style={{
          padding: "8px 16px",
          marginTop: "12px",
          marginBottom: "12px",
          backgroundColor: isMounted ? "#e74c3c" : "#27ae60",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {isMounted ? "Unmount Component" : "Mount Component"}
      </button>
      <p>{`Component is currently: ${isMounted ? "MOUNTED" : "UNMOUNTED"}`}</p>
      {isMounted && <DebuggedComponent />}
      <div className="example-info-box-info" style={{ marginTop: "12px", fontSize: "12px" }}>
        <strong>Verification Steps:</strong>
        <ol style={{ marginTop: "8px", paddingLeft: "20px" }}>
          <li>Click "Unmount Component" - you should see the cleanup log</li>
          <li>Click "Mount Component" - you should see the mount log again</li>
          <li>Check the console and log viewer for Remount[2], Remount[3], etc.</li>
          <li>
            This verifies that actual unmount/remount cycles are tracked separately from StrictMode
          </li>
        </ol>
      </div>
    </>
  );
};

export default Remount;
