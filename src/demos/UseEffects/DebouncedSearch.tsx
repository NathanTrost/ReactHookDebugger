/* eslint-disable no-console */
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

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
    <>
      <h3>Single Dependency (Debounced Search)</h3>
      <div>
        <div className="inputText">
          <label htmlFor="debouncedSearch_input">Search Term:</label>
          <input
            id="debouncedSearch_input"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
      </div>
      <div className="info-box-warning">
        <strong>Effect behavior:</strong> Debounces search with 500ms delay. Cleanup cancels
        previous timeout.
      </div>
    </>
  );
};

export default DebouncedSearch;
