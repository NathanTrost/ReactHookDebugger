interface InstanceData {
  sequentialId: number;
  mountCount: number;
  isCurrentlyMounted: boolean;
}

const hookInstanceRegistry = new Map<string, InstanceData>();

export const getSequentialInstanceId = (instanceKey: string): number => {
  //  Check against registry and return if it exists
  if (hookInstanceRegistry.has(instanceKey)) {
    return hookInstanceRegistry.get(instanceKey)!.sequentialId;
  }

  // Otherwise this is a new mount or remount, so add the instance to registry and return incremented value
  const nextSequentialId = hookInstanceRegistry.size + 1;
  hookInstanceRegistry.set(instanceKey, {
    sequentialId: nextSequentialId,
    mountCount: 1,
    isCurrentlyMounted: true,
  });

  return nextSequentialId;
};

export const markInstanceMounted = (instanceKey: string): void => {
  const instanceData = hookInstanceRegistry.get(instanceKey);
  if (instanceData && !instanceData.isCurrentlyMounted) {
    // This is a remount
    instanceData.mountCount++;
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
