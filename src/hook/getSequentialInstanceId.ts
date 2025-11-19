interface InstanceData {
  sequentialId: number;
  mountCount: number;
  isCurrentlyMounted: boolean;
  hasCompletedInitialMount: boolean;
  lastEffectRunTime: number;
}

const hookInstanceRegistry = new Map<string, InstanceData>();
let currentRenderCycle = 0;

export const getSequentialInstanceId = (instanceKey: string): number => {
  //  Check against registry and return if it exists
  if (hookInstanceRegistry.has(instanceKey)) {
    return hookInstanceRegistry.get(instanceKey)!.sequentialId;
  }

  // Otherwise this is a new mount or remount, so add the instance to registry and return incremented value
  currentRenderCycle++;
  const nextSequentialId = hookInstanceRegistry.size + 1;
  hookInstanceRegistry.set(instanceKey, {
    sequentialId: nextSequentialId,
    mountCount: 1,
    isCurrentlyMounted: true,
    hasCompletedInitialMount: false,
    lastEffectRunTime: currentRenderCycle,
  });

  return nextSequentialId;
};

export const markInstanceMounted = (instanceKey: string): void => {
  const instanceData = hookInstanceRegistry.get(instanceKey);
  if (instanceData) {
    // Mark that initial mount has completed (prevents StrictMode double-mount from being counted as remount)
    if (!instanceData.hasCompletedInitialMount) {
      instanceData.hasCompletedInitialMount = true;
      instanceData.lastEffectRunTime = currentRenderCycle;
    } else if (!instanceData.isCurrentlyMounted && instanceData.lastEffectRunTime < currentRenderCycle) {
      // Only count as remount if:
      // 1. We've completed initial mount
      // 2. We were unmounted
      // 3. This is a NEW render cycle (not the StrictMode re-run)
      instanceData.mountCount++;
      instanceData.lastEffectRunTime = currentRenderCycle;
    }
    instanceData.isCurrentlyMounted = true;
  }
};

export const markInstanceUnmounted = (instanceKey: string): void => {
  const instanceData = hookInstanceRegistry.get(instanceKey);
  if (instanceData) {
    instanceData.isCurrentlyMounted = false;
  }
};

export const getInstanceMountCount = (instanceKey: string): number => {
  const instanceData = hookInstanceRegistry.get(instanceKey);
  return instanceData?.mountCount ?? 0;
};
