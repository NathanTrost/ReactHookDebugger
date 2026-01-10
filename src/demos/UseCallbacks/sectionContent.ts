import { utilityNamespace } from "../../hook/constants";
import { HookType } from "../../hook/types";
import { HookContent } from "../App/types";

export const sectionContent: Record<HookType, HookContent> = {
  useEffect: {
    title: `${utilityNamespace} useEffect Demos`,
    description: "Demo showing reactHookDebugger wrapping useEffect",
    demonstrates: [
      "How useEffect runs when dependencies change",
      "How to track which dependencies triggered the effect",
      "Different useEffect patterns (multiple deps, single dep, empty array, no array)",
      "Common useEffect use cases (data fetching, subscriptions, side effects)",
    ],
    tips: `Open you browser console to see detailed logs about when each useEffect runs. 
    This includes render count, mount count, changed dependencies which triggered the useEffect, 
    and processing time associated with useEffect logic.`,
  },
  useMemo: {
    title: `${utilityNamespace} useMemo Demos`,
    description: "Demo showing reactHookDebugger wrapping useMemo",
    demonstrates: [
      "How useMemo recalculates when dependencies change",
      "How to track which dependencies triggered the recalculation",
      "Performance benefits of useMemo for expensive computations",
    ],
    tips: `Open your browser console to see when each memoized value is recalculated. 
    Notice that changing unrelated state doesn't trigger recalculation!`,
  },
  useCallback: {
    title: `${utilityNamespace} useCallback Demos`,
    description: "Demo showing reactHookDebugger wrapping useCallback",
    demonstrates: [
      "How useCallback recreates when dependencies change",
      "How to track which dependencies triggered the recreation",
      "Proper naming of dependencies for clear debugging",
    ],
    tips: `Open your browser console to see detailed logs about when each callback is recreated and which dependencies changed!`,
  },
};
