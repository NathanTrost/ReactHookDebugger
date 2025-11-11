# ReactHookDebugger

A Development tool created with the purpose of validating dependency changes in React hooks.

The primary purpose of this snippet is to aid in troubleshooting runaway renders, it's currently fitted for useEffect, useMemo, and useCallback; especially for those with multiple complex dependencies. As your code will cycle through these hooks, you will be able to see just how frequent it's cycling through and what dependencies are changing and triggering your hook to update.

## Example

### Setup initial code

[Copy and paste snippet here](https://github.com/NathanTrost/ReactHookDebugger/blob/main/src/reactHookDebugger.ts), either in it's own file or at the top of the current file you're working on.  
<b>Note:</b> This utility is in it's very early stages, future iterations may set it up as an import.

### Use on your hook as such

```
reactHookDebugger("My useEffect",
   // Text representations of your dependencies in the order they've been listed below,
   // if not provided they will be displayed as "[N] **Dependency Name Unknown**"
   [
      "boolDependency1",
      "boolDependency2",
      "boolDependency3",
      "objectDependency"
   ]).useEffect(() => {

      // .....logic reliant on all dependencies
<<<<<<< HEAD
   
=======

   }, [boolDependency1, boolDependency2, boolDependency3, objectDependency]);
>>>>>>> fb24f56... Adding tailwind, lint/format scripts

   }, [boolDependency1, boolDependency2, boolDependency3, objectDependency]);
```

### Result

![image](https://github.com/NathanTrost/ReactHookDebugger/assets/12831882/97552c7e-eb8e-4982-854a-b15987a31087)
