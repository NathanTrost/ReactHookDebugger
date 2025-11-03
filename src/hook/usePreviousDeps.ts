import { useEffect, useRef } from "react";

import type { DependencyList } from "react";

const usePreviousDeps = (value: DependencyList, initialValue: DependencyList): DependencyList => {
  const ref = useRef<DependencyList>(initialValue);

  useEffect(() => {
    ref.current = value;
  });
  // eslint-disable-next-line react-hooks/refs
  const previousRefValue = ref.current;
  return previousRefValue;
};

export default usePreviousDeps;
