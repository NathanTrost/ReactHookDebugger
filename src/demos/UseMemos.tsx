/* eslint-disable no-console */
import { useState } from "react";
import { reactHookDebugger } from "../reactHookDebugger";

/**
 * Demo showing reactHookDebugger wrapping useMemo
 *
 * This example demonstrates:
 * 1. How useMemo recalculates when dependencies change
 * 2. How to track which dependencies triggered the recalculation
 * 3. Performance benefits of useMemo for expensive computations
 */
const UseMemos = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [filterThreshold, setFilterThreshold] = useState(3);

  // Example 1: Expensive calculation with useMemo
  const { useMemo: debugUseMemo1 } = reactHookDebugger("ExpensiveCalculation", [
    "count",
    "multiplier",
  ]);

  const expensiveResult = debugUseMemo1((): number => {
    console.log("🔄 Running expensive calculation...");
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result = count * multiplier;
    }
    return result;
  }, [count, multiplier]);

  // Example 2: Array filtering/transformation with useMemo
  const { useMemo: debugUseMemo2 } = reactHookDebugger("FilteredItems", [
    "items",
    "filterThreshold",
  ]);

  const filteredItems: number[] = debugUseMemo2(() => {
    console.log("🔍 Filtering items...");
    return items.filter((item) => item >= filterThreshold);
  }, [items, filterThreshold]);

  // Example 3: Derived state calculation
  const { useMemo: debugUseMemo3 } = reactHookDebugger("Statistics", ["items"]);

  const statistics: { sum: number; avg: number; max: number; min: number } =
    debugUseMemo3(() => {
      console.log("📊 Calculating statistics...");
      const sum = items.reduce((acc, val) => acc + val, 0);
      const avg = sum / items.length;
      const max = Math.max(...items);
      const min = Math.min(...items);
      return { sum, avg, max, min };
    }, [items]);

  // Helper function to add random item
  const addRandomItem = () => {
    const newItem = Math.floor(Math.random() * 10) + 1;
    setItems([...items, newItem]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>useMemo Debugger Demo</h2>

      {/* Section 1: Expensive Calculation */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 1: Expensive Calculation</h3>
        <p>Open console to see when useMemo recalculates</p>
        <div style={{ marginBottom: "10px" }}>
          <strong>Count:</strong> {count} | <strong>Multiplier:</strong>{" "}
          {multiplier}
        </div>
        <div
          style={{
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
          }}
        >
          <strong>Result:</strong> {String(expensiveResult)}
        </div>
        <button
          onClick={() => setCount(count + 1)}
          style={{ marginRight: "10px" }}
        >
          Increment Count
        </button>
        <button
          onClick={() => setMultiplier(multiplier + 1)}
          style={{ marginRight: "10px" }}
        >
          Increment Multiplier
        </button>
      </div>

      {/* Section 2: Array Filtering */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Example 2: Array Filtering</h3>
        <div style={{ marginBottom: "10px" }}>
          <strong>Items:</strong> [{items.join(", ")}]
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Filter Threshold: {filterThreshold}
            <input
              type="range"
              min="1"
              max="10"
              value={filterThreshold}
              onChange={(e) => setFilterThreshold(Number(e.target.value))}
              style={{ marginLeft: "10px", width: "200px" }}
            />
          </label>
        </div>
        <div
          style={{
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#fff3e0",
          }}
        >
          <strong>Filtered Items (≥ {filterThreshold}):</strong> [
          {filteredItems.map((e: number) => String(e)).join(", ")}]
        </div>
        <button onClick={addRandomItem} style={{ marginRight: "10px" }}>
          Add Random Item
        </button>
        <button onClick={() => setItems([1, 2, 3, 4, 5])}>Reset Items</button>
      </div>

      {/* Section 3: Statistics */}
      <div style={{ padding: "15px", border: "1px solid #ccc" }}>
        <h3>Example 3: Statistics Calculation</h3>
        <div style={{ padding: "10px", backgroundColor: "#e3f2fd" }}>
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
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <strong>💡 Tip:</strong>
        {`Open your browser console to see when each
        memoized value is recalculated. Notice that changing unrelated state
        doesn't trigger recalculation!`}
      </div>
    </div>
  );
};

export default UseMemos;
