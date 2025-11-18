import classNames from "classnames";
import { HookType } from "../../hook/types";

type HookContent = {
  title: string;
  description: string;
  demonstrates: string[];
};

const HookTypeContent = ({ hookType }: { hookType?: HookType }) => {
  if (!hookType) {
    return null;
  }

  const hookContent: Record<HookType, HookContent> = {
    useEffect: {
      title: "useEffect Debugger Demo",
      description: "Demo showing reactHookDebugger wrapping useEffect",
      demonstrates: [
        "How useEffect runs when dependencies change",
        "How to track which dependencies triggered the effect",
        "Different useEffect patterns (multiple deps, single dep, empty array, no array)",
        "Common useEffect use cases (data fetching, subscriptions, side effects)",
      ],
    },
    useMemo: {
      title: "useMemo Debugger Demo",
      description: "Demo showing reactHookDebugger wrapping useMemo",
      demonstrates: [
        "How useMemo recalculates when dependencies change",
        "How to track which dependencies triggered the recalculation",
        "Performance benefits of useMemo for expensive computations",
      ],
    },
    useCallback: {
      title: "useCallback Debugger Demo",
      description: "Demo showing reactHookDebugger wrapping useCallback",
      demonstrates: [
        "How useCallback recreates when dependencies change",
        "How to track which dependencies triggered the recreation",
        "Proper naming of dependencies for clear debugging",
      ],
    },
  };

  const content = hookContent[hookType];

  return (
    <div>
      <h2 className={classNames("underline", "underline-offset-6")}>{content.title}</h2>
      <p>{content.description}</p>
      <div className="description-box">
        <p>
          <strong>This example demonstrates:</strong>
        </p>
        <ol>
          {content.demonstrates.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HookTypeContent;
