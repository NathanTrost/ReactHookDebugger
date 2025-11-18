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
import { unknownDependencyName, utilityNamespace, warnings } from "./constants";

const useHookDebug = <T extends HookType>(
  hookName: HookType,
  dependencyNames: string[],
  dependencies: T extends "useEffect" ? DependencyList | undefined : DependencyList,
  name: string
) => {
  const instanceId = useId();
  const sequentialInstanceId = getSequentialInstanceId(instanceId);
  const mountCount = getInstanceMountCount(instanceId);

  const wasProvidedDeps = dependencies !== undefined;

  const normalizedDependencies: DependencyList = dependencies ?? [];

  const countRef = useRef<number>(0);

  const previousDeps = usePreviousDeps(normalizedDependencies, []);

  const changedDeps: ChangedDependencies = (() =>
    normalizedDependencies.reduce(
      (accChanged: ChangedDependencies, dependency: unknown, index: number) => {
        if (!Object.is(dependency, previousDeps[index])) {
          const isValueChanged = !dequal(dependency, previousDeps[index]);

          const dependencyName = dependencyNames[index] || unknownDependencyName;
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
          `[${utilityNamespace}_${hookName}]:${name} -> ${warnings.useEffectNoDependencies}`
        );
      }
      if (dependencyNames.length !== normalizedDependencies.length) {
        console.warn(
          `[${utilityNamespace}_${hookName}]:${name} -> ${warnings.misalignedDependencyNames}`
        );
      }

      const mountLabel = mountCount > 1 ? ` Remount[${mountCount}]` : "Initial Mount";

      // First iteration of standard logging
      console.groupCollapsed(
        `[${utilityNamespace}_${hookName}]:${name} -> Initial Values on ${mountLabel}`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`SequentialId[${sequentialInstanceId}]`);
      console.log(`Timestamp: ${datetime.toString()}`);
      console.groupEnd();
      countRef.current = 1;
    } else if (Object.keys(changedDeps as object).length) {
      console.groupCollapsed(
        `[${utilityNamespace}_${hookName}]:${name} -> Rerender[${count}] Remount[${mountCount}]`
      );
      console.log(`CallCount[${count}]`, changedDeps);
      console.log(`SequentialId[${sequentialInstanceId}]`);
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
