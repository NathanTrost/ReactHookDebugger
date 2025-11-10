import { useState } from "react";

import { reactHookDebugger } from "../../hook";

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
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>useMemo with Expensive Calculation</h3>
      <p>Open console to see when useMemo recalculates</p>
      <div style={{ marginBottom: "10px" }}>
        <strong>Count:</strong> {count} | <strong>Multiplier:</strong> {multiplier}
      </div>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#e8f5e9",
        }}
      >
        <strong>Result:</strong> {expensiveResult}
      </div>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>
        Increment Count
      </button>
      <button onClick={() => setMultiplier(multiplier + 1)} style={{ marginRight: "10px" }}>
        Increment Multiplier
      </button>
    </div>
  );
};

export default ExpensiveCalculation;
