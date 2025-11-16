# ReactHookDebugger

A Development tool created with the purpose of validating dependency changes in React hooks.

The primary purpose of this snippet is to aid in troubleshooting runaway renders, it's currently fitted for useEffect, useMemo, and useCallback; especially for those with multiple complex dependencies. As your code will cycle through these hooks, you will be able to see just how frequent it's cycling through and what dependencies are changing and triggering your hook to update.

## Why This Tool?

Debugging React hook dependencies can be challenging, especially when dealing with complex objects or multiple dependencies. This tool provides immediate visibility into what's triggering your hook updates—essential for performance optimization and preventing unnecessary re-renders.



### Setup initial code

[Copy and paste snippet here](https://github.com/NathanTrost/ReactHookDebugger/blob/main/src/reactHookDebugger.ts), either in its own file or at the top of the current file you're working on.  
<b>Note:</b> This utility is in its very early stages, future iterations may set it up as an import.

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

   }, [boolDependency1, boolDependency2, boolDependency3, objectDependency]);

```

## Output Example
   
   ![ReactHookDebugger Console Output](https://github.com/NathanTrost/ReactHookDebugger/assets/12831882/97552c7e-eb8e-4982-854a-b15987a31087)

   
   *Example console output showing dependency changes. Interface may vary in current version.*


## Current Status

This is an active work-in-progress. Currently supports `useEffect`, `useMemo`, and `useCallback`. Future plans include:
- Packaging as an NPM module for easier integration
- Enhanced debugging capabilities
  - Ensure that 'mounting' count is accurate and fully functional. Confidence of accuracy is higher on all other features, but ensure those as well
- Add testing for utilities
- Better integrate output with Chrome Developer
- Integrate utilities with VSCode and publish as an Extension, so utility is programatically added
- Support for additional React hooks

