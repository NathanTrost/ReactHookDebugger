export const utilityNamespace = "reactHookDebugger";
export const unknownDependencyName = "**Dependency Name Unknown**";

export const warnings = {
  useEffectNoDependencies: `This useEffect has NO dependencies, meaning it will run on EVERY render.
      This could cause performance issues and infinite loops.
      Consider providing a dependency array to your useEffect. 
      Even an empty one triggering once on initial load would be preferable to none.
      .`,
  misalignedDependencyNames: `Without a 1:1 list of dependencyNames to dependencies the information provided by this tool
      may not be reliable.  It's recommended you provide the full list of dependency to aid in clarity
      and visibility of which dependencies are triggering updates.`,
};
