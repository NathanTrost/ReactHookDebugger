/* eslint-disable no-console */
import { reactHookDebugger } from "../../hook";

const EmptyDepsArray = () => {
  const { useEffect: debugEffect3 } = reactHookDebugger("MountOnly", []);

  debugEffect3(() => {
    console.log("🎬 Component mounted - setting up initial data");
    console.log("📊 This only runs once on mount!");

    return () => {
      console.log("👋 Component unmounting - cleanup");
    };
  }, []);

  return (
    <div
      style={{
        marginBottom: "30px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Empty Dependency Array (Mount Only)</h3>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#e3f2fd",
        }}
      >
        <strong>Effect behavior:</strong> Runs only once on component mount. Check console for mount
        message.
      </div>
      <p>{`This effect initialized when the component first rendered and won't run again.`}</p>
    </div>
  );
};

export default EmptyDepsArray;
