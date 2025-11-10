/* eslint-disable no-console */
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { reactHookDebugger } from "../../hook";

const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { useEffect: debugEffect2 } = reactHookDebugger("SearchDebounce", ["searchTerm"]);

  const debouncedSearch = useDebounceCallback((searchTerm: string) => {
    // NOTE: Determine better replacement for console logs
    console.log(`🔎 Searching for: "${searchTerm}"`);
    if (searchTerm) {
      console.log(`📡 API call would happen here for: "${searchTerm}"`);
    }
  }, 500);

  debugEffect2(() => {
    console.log("🔍 Triggering debounced search...");
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Single Dependency (Debounced Search)</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Search Term:
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#fff3e0",
        }}
      >
        <strong>Effect behavior:</strong> Debounces search with 500ms delay. Cleanup cancels
        previous timeout.
      </div>
    </div>
  );
};

export default DebouncedSearch;
