# ReactHookDebugger
A Development tool created with the purpose of validating dependency changes in a React hook

The primary purpose of this snippet is to aid in troubleshooting runaway renders, it's currently fitted for useEffect, useMemo, and useCallback; especially for those with multiple complex dependencies. As your code will cycle through these hooks, you will be able to see how frequent it's cycling through and what dependencies are changing and triggering your hook to update.

# Examplereact

```
reactHookDebugger(My useEffect", ["boolDependency1", "boolDependency2", "boolDependency3", "objectDependency"]).useEffect(() => {

   // .....logic reliant on all dependencies

}, [boolDependency1, boolDependency2, boolDependency3, objectDependenco]);

```
![image](https://github.com/NathanTrost/ReactHookDebugger/assets/12831882/97552c7e-eb8e-4982-854a-b15987a31087)


