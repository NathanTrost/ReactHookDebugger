/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const NoDeps = () => {
  // NOTE: Count is fine here for now, but find better examples for this
  const [count, setCount] = useState(0);
  const [userId, _setUserId] = useState(1);
  const [searchTerm, _setSearchTerm] = useState("");

  // This demonstrates the warning case
  const { useEffect: debugEffect4 } = reactHookDebugger("EveryRender", []);

  debugEffect4(() => {
    // NOTE: Find better approach than consoles
    console.log("🔄 This effect runs on EVERY render! (No dependency array)");
    console.log("⚠️ Current state snapshot:", { count, userId, searchTerm });
  });
  return (
    <>
      <h3>No Dependency Array (Every Render) ⚠️</h3>
      <div className="example-info-box-error">
        <strong>⚠️ Warning:</strong> This effect has NO dependency array, so it runs on EVERY
        render! Check console to see it fire repeatedly.
      </div>
      <p>Any state change in this component will trigger this effect. This is usually a mistake!</p>
      <button onClick={() => setCount(count + 1)}>Trigger Render (Increment Count)</button>
    </>
  );
};

export default NoDeps;
