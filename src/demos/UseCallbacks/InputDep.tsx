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
    <>
      <h3>useCallback with Text Input Dependency</h3>
      <div className="input-text">
        <label htmlFor="inputDep_input">Text Input</label>
        <input
          id="inputDep_input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={handleSubmit}>
        Submit Text
      </button>
    </>
  );
};

export default InputDep;
