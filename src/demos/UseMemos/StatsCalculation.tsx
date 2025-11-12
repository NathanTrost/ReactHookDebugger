/* eslint-disable no-console */
import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const StatsCalculation = () => {
  // NOTE: Probably won't want to keep this in state for this example
  const [items, _setItems] = useState([1, 2, 3, 4, 5]);
  const { useMemo: debugUseMemo3 } = reactHookDebugger("Statistics", ["items"]);

  const statistics = debugUseMemo3(() => {
    // NOTE: Probably don't need this
    console.log("📊 Calculating statistics...");
    const sum = items.reduce((acc, val) => acc + val, 0);
    const avg = sum / items.length;
    const max = Math.max(...items);
    const min = Math.min(...items);
    return { sum, avg, max, min };
  }, [items]);

  return (
    <>
      <h3>useMemo for Stats Calculation</h3>
      <div className="example-info-box-info">
        <div>
          <strong>Sum:</strong> {statistics.sum}
        </div>
        <div>
          <strong>Average:</strong> {statistics.avg.toFixed(2)}
        </div>
        <div>
          <strong>Max:</strong> {statistics.max}
        </div>
        <div>
          <strong>Min:</strong> {statistics.min}
        </div>
      </div>
    </>
  );
};

export default StatsCalculation;
