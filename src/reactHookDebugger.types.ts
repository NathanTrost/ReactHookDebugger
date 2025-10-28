export type ChangedDependency = {
  before: unknown;
  after: unknown;
};

export type ChangedDependencies = Record<string, ChangedDependency>;

export type HookType = "useCallback" | "useMemo" | "useEffect";
