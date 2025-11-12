/* eslint-disable no-console */

import classNames from "classnames";
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
    <>
      <h3>useCallback with Multiple Dependencies</h3>
      <p>Open console to see when useCallback recreates</p>
      <div className="example-stats">
        <strong>Count:</strong> {count} | <strong>Multiplier:</strong> {multiplier}
      </div>
      <div className={classNames("flex", "gap-1.5")}>
        <button className="btn-primary" onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <button className="btn-primary" onClick={() => setMultiplier(multiplier + 1)}>
          Increment Multiplier
        </button>
        <button className="btn-primary" onClick={calculateTotal}>
          Calculate Total
        </button>
      </div>
    </>
  );
};

export default CounterCalculate;
