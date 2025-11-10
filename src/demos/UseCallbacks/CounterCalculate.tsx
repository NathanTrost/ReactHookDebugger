/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";

/** useCallback with multiple dependencies */
const CounterCalculate = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const { useCallback: debugUseCallback } = reactHookDebugger("CalculateTotal", [
    "count",
    "multiplier",
  ]);

  const calculateTotal = debugUseCallback(() => {
    const total = count * multiplier;
    // NOTE: Does this need represented here?
    console.log(`Calculated: ${count} × ${multiplier} = ${total}`);
    return total;
  }, [count, multiplier]);

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>useCallback with Multiple Dependencies</h3>
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
  );
};

export default CounterCalculate;
