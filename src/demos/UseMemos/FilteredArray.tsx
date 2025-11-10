import { useState } from "react";

import { reactHookDebugger } from "../../hook";

const FilteredArray = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [filterThreshold, setFilterThreshold] = useState(3);
  const { useMemo: debugUseMemo2 } = reactHookDebugger("FilteredItems", [
    "items",
    "filterThreshold",
  ]);

  const filteredItems = debugUseMemo2(() => {
    return items.filter(item => item >= filterThreshold);
  }, [items, filterThreshold]);

  // Helper function to add random item
  const addRandomItem = () => {
    const newItem = Math.floor(Math.random() * 10) + 1;
    setItems([...items, newItem]);
  };

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>useMemo for Array Filtering</h3>
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
            onChange={e => setFilterThreshold(Number(e.target.value))}
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
        <strong>Filtered Items (≥ {filterThreshold}):</strong> [{filteredItems.join(", ")}]
      </div>
      <button onClick={addRandomItem} style={{ marginRight: "10px" }}>
        Add Random Item
      </button>
      <button onClick={() => setItems([1, 2, 3, 4, 5])}>Reset Items</button>
    </div>
  );
};

export default FilteredArray;
