import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

/** Expensive calculation with useMemo */
const ExpensiveCalculation = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);

  const { useMemo: debugUseMemo1 } = reactHookDebugger("ExpensiveCalculation", [
    "count",
    "multiplier",
  ]);

  const expensiveResult = debugUseMemo1(() => {
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result = count * multiplier;
    }
    return result;
  }, [count, multiplier]);

  return (
    <>
      <h3>useMemo with Expensive Calculation</h3>
      <p>Open console to see when useMemo recalculates</p>
      <div className="example-stats">
        <strong>Count:</strong> {count} | <strong>Multiplier:</strong> {multiplier}
      </div>
      <div className="example-info-box">
        <strong>Result:</strong> {expensiveResult}
      </div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
    </>
  );
};

export default ExpensiveCalculation;
