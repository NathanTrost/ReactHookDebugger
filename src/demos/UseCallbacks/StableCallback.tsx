/* eslint-disable no-console */
import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const StableCallback = () => {
  const { useCallback: debugStaticCallback } = reactHookDebugger("StaticCallback", []);

  const staticCallback = debugStaticCallback(() => {
    // NOTE: Find better approach than console, prefer to keep util the lone console output
    console.log("This callback never recreates!");
  }, []);

  return (
    <>
      <h3>Static & Stable useCallback (No Dependencies)</h3>
      <p>This callback is created once and never recreated</p>
      <button onClick={staticCallback}>Call Static Callback</button>
    </>
  );
};

export default StableCallback;
