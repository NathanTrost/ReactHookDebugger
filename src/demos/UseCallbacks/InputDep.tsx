import { useState } from "react";

import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

const InputDep = () => {
  const [text, setText] = useState("Hello");
  const { useCallback: debugTextCallback } = reactHookDebugger("HandleTextSubmit", ["text"]);

  const handleSubmit = debugTextCallback(() => {
    // NOTE: Find more elegant way of representing this
    alert(`Submitting: ${text}`);
  }, [text]);

  return (
    <div className="example-container">
      <h3>useCallback with Text Input Dependency</h3>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Text</button>
    </div>
  );
};

export default InputDep;
