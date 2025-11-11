import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

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
    <div className="example-container">
      <h3>useMemo for Array Filtering</h3>
      <div className="example-stats">
        <strong>Items:</strong> [{items.join(", ")}]
      </div>
      <div>
        <label>
          Filter Threshold: {filterThreshold}
          <input
            type="range"
            min="1"
            max="10"
            value={filterThreshold}
            onChange={e => setFilterThreshold(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="example-info-box-warning">
        <strong>Filtered Items (≥ {filterThreshold}):</strong> [{filteredItems.join(", ")}]
      </div>
      <button onClick={addRandomItem}>
        Add Random Item
      </button>
      <button onClick={() => setItems([1, 2, 3, 4, 5])}>Reset Items</button>
    </div>
  );
};

export default FilteredArray;
