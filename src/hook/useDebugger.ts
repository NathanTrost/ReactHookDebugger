import { dequal } from "dequal";
import { DependencyList, useEffect, useId, useRef } from "react";

import {
  getInstanceMountCount,
  getSequentialInstanceId,
  markInstanceMounted,
  markInstanceUnmounted,
} from "./getSequentialInstanceId";
import { ChangedDependencies, HookType } from "./types";
import usePreviousDeps from "./usePreviousDeps";

const useHookDebug = <T extends HookType>(
  hookName: HookType,
  dependencyNames: string[],
  dependencies: T extends "useEffect" ? DependencyList | undefined : DependencyList,
  name: string
) => {
  const consoleNS = "reactHookDebugger";
  const instanceId = useId();
  const sequentialInstanceId = getSequentialInstanceId(instanceId);
  const mountCount = getInstanceMountCount(instanceId);

  const consolePrefix = `${sequentialInstanceId}|${consoleNS}`;

  const wasProvidedDeps = dependencies !== undefined;

  const normalizedDependencies: DependencyList = dependencies ?? [];

  const countRef = useRef<number>(0);

  const previousDeps = usePreviousDeps(normalizedDependencies, []);

  const changedDeps: ChangedDependencies = (() =>
    normalizedDependencies.reduce(
      (accChanged: ChangedDependencies, dependency: unknown, index: number) => {
        if (!Object.is(dependency, previousDeps[index])) {
          const isValueChanged = !dequal(dependency, previousDeps[index]);

          const dependencyName = dependencyNames[index] || "**Dependency Name Unknown**";
          const keyName = `[${index}] ${dependencyName}`;

          return {
            ...accChanged,
            [keyName]: {
              before: previousDeps[index],
              after: dependency,
              changeType: isValueChanged ? "VALUE_CHANGED" : "REFERENCE_ONLY_CHANGED",
            },
          };
        }
        return accChanged;
      },
      {} as ChangedDependencies
    ))();

  /* eslint-disable no-console */
  useEffect(() => {
    // Mark this instance as mounted (handles remount detection)
    markInstanceMounted(instanceId);
    const datetime = new Date();
    const count = countRef.current;
    if (count === 0) {
      // Log warnings only on initial load
      if (hookName === "useEffect" && !wasProvidedDeps) {
        console.warn(
          `[${consolePrefix}_${hookName}]:${name} ->
      This useEffect has NO dependencies, meaning it will run on EVERY render.
      This could cause performance issues and infinite loops.
      Consider providing a dependency array to your useEffect. 
      Even an empty one triggering once on initial load would be preferable to none.
      .`
        );
      }
      if (dependencyNames.length !== normalizedDependencies.length) {
        console.warn(
          `[${consolePrefix}_${hookName}]:${name} ->
      Without a 1:1 list of dependencyNames to dependencies the information provided by this tool
      may not be reliable.  It's recommended you provide the full list of dependency to aid in clarity
      and visibility of which dependencies are triggering updates in this ${hookName}.`
        );
      }

      const mountLabel = mountCount > 1 ? ` Remount[${mountCount}]` : "Initial Mount";

      // First iteration of standard logging
      console.groupCollapsed(
        `[${consolePrefix}_${hookName}]:${name} -> Initial Values on ${mountLabel}`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      countRef.current = 1;
    } else if (Object.keys(changedDeps as object).length) {
      console.groupCollapsed(
        `[${consolePrefix}_${hookName}]:${name} -> Rerender[${count}] Remount[${mountCount}]`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      countRef.current = count + 1;
    }

    return () => {
      markInstanceUnmounted(instanceId);
    };
  });
  /* eslint-enable no-console */
};

export default useHookDebug;
