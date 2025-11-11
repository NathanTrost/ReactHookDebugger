/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

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
    <div className="example-container">
      <h3>useCallback with Multiple Dependencies</h3>
      <p>Open console to see when useCallback recreates</p>
      <div className="example-stats">
        <strong>Count:</strong> {count} | <strong>Multiplier:</strong> {multiplier}
      </div>
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increment Multiplier
      </button>
      <button onClick={calculateTotal}>Calculate Total</button>
    </div>
  );
};

export default CounterCalculate;
