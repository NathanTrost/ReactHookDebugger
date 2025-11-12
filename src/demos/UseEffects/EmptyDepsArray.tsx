/* eslint-disable no-console */
import { reactHookDebugger } from "../../hook";
import "../../styles/examples.css";

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
    <>
      <h3>Empty Dependency Array (Mount Only)</h3>
      <div className="example-info-box-info">
        <strong>Effect behavior:</strong> Runs only once on component mount. Check console for mount
        message.
      </div>
      <p>{`This effect initialized when the component first rendered and won't run again.`}</p>
    </>
  );
};

export default EmptyDepsArray;
