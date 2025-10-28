export type ChangedDependency = {
  before: unknown;
  after: unknown;
};

export type ChangedDependencies = Record<string, ChangedDependency>;
