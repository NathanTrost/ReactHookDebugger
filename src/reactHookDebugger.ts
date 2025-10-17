/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Tooling function specific for local development that fires with any useEffect, useMemo, or useCallback hook and provides performance information on that hook to the console.
 * Insights include:
 * - Initial values of dependencies on mount
 * - Number of times the hook has been triggered
 * - Before and After values of dependencies
 *
 * @param {string} name - Provide unique name to more easily distinguish your hook's console from any other hook you may be using this tool with.
 * @param {string[]} dependencyNames - Provide an array of dependency/variable names which will be aligned with the dependencies provided to your hook.  If not provided,
 *                          you will still be able to distinguish the changed dependencies that are triggering your hook by thier placement in the original
 *                          dependency array.
 *                          Ex:  If dependencies are listed as [left, right, top, bottom], you would set this values as ["left", "right", "top", "bottom"]
 * @returns {useEffect | useMemo | useCallback} Chained React hook
 */
export const reactHookDebugger = (
  name = "General",
  dependencyNames: string[] = []
) => {
  return {
    useEffect: (doFunc: any, dependencies: DependencyList) => {
      useDebugHook("useEffect", dependencyNames, dependencies, name);
      useEffect(doFunc, dependencies);
    },
    useMemo: (doFunc: any, dependencies: DependencyList) => {
      useDebugHook("useMemo", dependencyNames, dependencies, name);
      return useMemo(doFunc, dependencies);
    },
    useCallback: (doFunc: any, dependencies: DependencyList) => {
      useDebugHook("useCallback", dependencyNames, dependencies, name);
      return useCallback(doFunc, dependencies);
    },
  };
};

const usePrevious = (value: any, initialValue: any[]) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useDebugHook = (
  hookName: "useEffect" | "useMemo" | "useCallback",
  dependencyNames: string[],
  dependencies: DependencyList,
  name: string
) => {
  const [count, setCount] = useState(0);
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce(
    (accum: any, dependency: any, index: number) => {
      if (dependency !== previousDeps[index]) {
        const dependencyName =
          dependencyNames[index] || "**Dependency Name Unknown**";

        const keyName = `[${index}] ${dependencyName}`;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {}
  );

  if (count === 0 && dependencyNames.length !== dependencies.length) {
    console.warn(
      `[debugHook_${hookName}]:${name} ->
      Without a 1:1 list of dependencyNames to dependencies the information provided by this tool
      may not be reliable.  It's recommended you provide the full list of dependency to aid in clarity
      and visibility of which dependencies are triggering updates in this ${hookName}.`
    );
  }

  useEffect(() => {
    const datetime = new Date();
    if (count === 0) {
      console.groupCollapsed(
        `[debugHook_${hookName}]:${name} -> Initial values on mount`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      setCount(1);
    } else if (Object.keys(changedDeps as object).length) {
      console.groupCollapsed(
        `[debugHook_${hookName}]:${name} -> Rerender[${count}]`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      setCount(count + 1);
    }
  });
};
