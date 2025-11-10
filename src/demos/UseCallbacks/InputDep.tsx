import { useState } from "react";

import { reactHookDebugger } from "../../hook";

const InputDep = () => {
  const [text, setText] = useState("Hello");
  const { useCallback: debugTextCallback } = reactHookDebugger("HandleTextSubmit", ["text"]);

  const handleSubmit = debugTextCallback(() => {
    // NOTE: Find more elegant way of representing this
    alert(`Submitting: ${text}`);
  }, [text]);

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>useCallback with Text Input Dependency</h3>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleSubmit}>Submit Text</button>
    </div>
  );
};

export default InputDep;
