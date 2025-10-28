/* eslint-disable no-console */

import { DependencyList, useCallback, useEffect, useMemo, useRef } from "react";

import { ChangedDependencies, HookType } from "./reactHookDebugger.types";

/**
 * Tooling function specific for local development that fires with any useEffect, useMemo, or useCallback hook and provides performance information on that hook to the console.
 * Insights include:
 * - Initial values of dependencies on mount
 * - Number of times the hook has been triggered
 * - Before and After values of dependencies
 *
 * @param {string} name - Provide unique name to more easily distinguish your hook's console from any other hook you may be using this tool with.
 * @param {string[]} dependencyNames - Provide an array of dependency/variable names which will be aligned with the dependencies provided to your hook.  If not provided,
 *                          you will still be able to distinguish the changed dependencies that are triggering your hook by their placement in the original
 *                          dependency array.
 *                          Ex:  If dependencies are listed as [left, right, top, bottom], you would set this values as ["left", "right", "top", "bottom"]
 * @returns {useEffect | useMemo | useCallback} Chained React hook
 */
export const reactHookDebugger = (name = "General", dependencyNames: string[] = []) => {
  return {
    useEffect: ((doFunc, dependencies) => {
      useDebugHook("useEffect", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      useEffect(doFunc, dependencies);
    }) as typeof useEffect,

    useMemo: ((doFunc, dependencies) => {
      useDebugHook("useMemo", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      return useMemo(doFunc, dependencies);
    }) as typeof useMemo,

    useCallback: ((doFunc, dependencies) => {
      useDebugHook("useCallback", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      return useCallback(doFunc, dependencies);
    }) as typeof useCallback,
  };
};

const usePrevious = (value: DependencyList, initialValue: DependencyList): DependencyList => {
  const ref = useRef<DependencyList>(initialValue);

  useEffect(() => {
    ref.current = value;
  });
  // eslint-disable-next-line react-hooks/refs
  const previousRefValue = ref.current;
  return previousRefValue;
};

const useDebugHook = <T extends HookType>(
  hookName: HookType,
  dependencyNames: string[],
  dependencies: T extends "useEffect" ? DependencyList | undefined : DependencyList,
  name: string
) => {
  const wasProvidedDeps = dependencies !== undefined;

  const normalizedDependencies: DependencyList = dependencies ?? [];

  const countRef = useRef<number>(0);

  const previousDeps = usePrevious(normalizedDependencies, []);

  const changedDeps: ChangedDependencies = normalizedDependencies.reduce(
    (accChanged: ChangedDependencies, dependency: unknown, index: number) => {
      if (dependency !== previousDeps[index]) {
        const dependencyName = dependencyNames[index] || "**Dependency Name Unknown**";

        const keyName = `[${index}] ${dependencyName}`;
        return {
          ...accChanged,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accChanged;
    },
    {} as ChangedDependencies
  );

  useEffect(() => {
    const count = countRef.current;
    if (count === 0) {
      if (hookName === "useEffect" && !wasProvidedDeps) {
        console.warn(
          `[debugHook_${hookName}]:${name} ->
      This useEffect has NO dependencies, meaning it will run on EVERY render.
      This could cause performance issues and infinite loops.
      Consider provide a dependency array to your useEffect. 
      Even an empty one which triggers once on initial load would be preferable to no dependencies.
      .`
        );
      } else if (dependencyNames.length !== normalizedDependencies.length) {
        console.warn(
          `[debugHook_${hookName}]:${name} ->
      Without a 1:1 list of dependencyNames to dependencies the information provided by this tool
      may not be reliable.  It's recommended you provide the full list of dependency to aid in clarity
      and visibility of which dependencies are triggering updates in this ${hookName}.`
        );
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    const datetime = new Date();
    const count = countRef.current;
    if (count === 0) {
      console.groupCollapsed(`[debugHook_${hookName}]:${name} -> Initial values on mount`);
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      countRef.current = 1;
    } else if (Object.keys(changedDeps as object).length) {
      console.groupCollapsed(`[debugHook_${hookName}]:${name} -> Rerender[${count}]`);
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      countRef.current = count + 1;
    }
  });
};
