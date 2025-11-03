import { useCallback, useEffect, useMemo } from "react";

import useHookDebug from "./useDebugger";

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
      useHookDebug("useEffect", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      useEffect(doFunc, dependencies);
    }) as typeof useEffect,

    useMemo: ((doFunc, dependencies) => {
      useHookDebug("useMemo", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      return useMemo(doFunc, dependencies);
    }) as typeof useMemo,

    useCallback: ((doFunc, dependencies) => {
      useHookDebug("useCallback", dependencyNames, dependencies, name);
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      return useCallback(doFunc, dependencies);
    }) as typeof useCallback,
  };
};
