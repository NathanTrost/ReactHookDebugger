// --- TYPE DEFINITIONS ---

/**
 * Defines a simple message structure (log, info, warn, error).
 */
export interface LogMessage {
  id: string;
  type: "log" | "warn" | "error" | "info";
  message: string;
}

/**
 * Defines the type for a console group, which is recursive.
 */
export interface LogGroup {
  id: string;
  type: "group" | "groupCollapsed";
  label: string;
  children: LogEntry[]; // Recursive array
  collapsed: boolean;
  isUiCollapsed: boolean; // Field for UI state management
}

/**
 * LogEntry is the union of a simple message and a recursive group.
 */
export type LogEntry = LogMessage | LogGroup;

/**
 * The state of captured logs is an array of top-level entries.
 */
export type CapturedLogsState = LogEntry[];

// Store original console methods outside the function to avoid recreation on every call
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  group: console.group,
  groupCollapsed: console.groupCollapsed,
  groupEnd: console.groupEnd,
};

// Map of console types to LogMessage types
const logTypes: (keyof typeof originalConsole)[] = ["log", "warn", "error", "info"];
const groupTypes: (keyof typeof originalConsole)[] = ["group", "groupCollapsed"];

/**
 * Captures console logs into a hierarchical data structure without modifying the global console.
 * Creates a copy of logs as they are called, allowing the original console to function normally.
 *
 * @returns {{ capturedLogs: CapturedLogsState; restoreConsole: () => void; }}
 * An object containing the captured logs array and a no-op restore function (for API compatibility).
 */
export const captureLogs = (): { capturedLogs: CapturedLogsState; restoreConsole: () => void } => {
  const capturedLogs: CapturedLogsState = [];
  // groupStack starts with the root array and holds the 'children' array of the current group
  let groupStack: LogEntry[][] = [capturedLogs];

  // Helper to get the currently active group array
  const getCurrentGroup = () => groupStack[groupStack.length - 1];

  // Function to stringify complex objects for display
  const formatMessage = (args: unknown[]): string => {
    return args
      .map(arg => {
        if (typeof arg === "object" && arg !== null) {
          try {
            // Pretty-print objects
            return JSON.stringify(arg, null, 2);
          } catch {
            // Fallback for circular references or other complex objects
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(" ");
  };

  // --- Capturing Log Methods (log, warn, error, info) ---
  logTypes.forEach(type => {
    const originalMethod = originalConsole[type as keyof typeof originalConsole];
    (console as any)[type] = function (...args: unknown[]) {
      const currentGroup = getCurrentGroup();
      const message = formatMessage(args);

      const logEntry: LogMessage = {
        id: crypto.randomUUID(),
        type: type as LogMessage["type"],
        message: message,
      };

      currentGroup.push(logEntry);
      // Call original console method to maintain normal console functionality
      originalMethod.apply(originalConsole, args);
    };
  });

  // --- Capturing Group Methods (group, groupCollapsed) ---
  groupTypes.forEach(type => {
    const originalMethod = originalConsole[type as keyof typeof originalConsole];
    (console as any)[type] = function (...args: unknown[]) {
      // Extract label from arguments
      // Handle both direct strings and format string patterns like console.groupCollapsed('%s', value)
      let label: string;

      if (args.length > 0) {
        const firstArg = args[0];

        // Check if first arg is a format string (contains %s, %d, etc.)
        if (typeof firstArg === "string" && firstArg.includes("%")) {
          // This is a format string, use the next argument
          if (args.length > 1) {
            const replacementArg = args[1];
            if (typeof replacementArg === "string") {
              label = replacementArg.replace(/\x1b\[[0-9;]*m/g, "");
            } else if (typeof replacementArg === "object" && replacementArg !== null) {
              try {
                label = JSON.stringify(replacementArg, null, 2);
              } catch {
                label = String(replacementArg);
              }
            } else {
              label = String(replacementArg);
            }
          } else {
            label = type === "group" ? "Group" : "Collapsed Group";
          }
        } else if (typeof firstArg === "string") {
          // Regular string argument
          label = firstArg.replace(/\x1b\[[0-9;]*m/g, "");
        } else if (typeof firstArg === "object" && firstArg !== null) {
          try {
            label = JSON.stringify(firstArg, null, 2);
          } catch {
            label = String(firstArg);
          }
        } else {
          label = String(firstArg);
        }
      } else {
        label = type === "group" ? "Group" : "Collapsed Group";
      }

      const currentGroup = getCurrentGroup();

      const isCollapsed = type === "groupCollapsed";

      const newGroup: LogGroup = {
        id: crypto.randomUUID(),
        type: type as LogGroup["type"],
        label,
        children: [],
        collapsed: isCollapsed,
        isUiCollapsed: isCollapsed,
      };

      currentGroup.push(newGroup);

      // Push the new group's children array onto the stack
      groupStack.push(newGroup.children);

      // Call original console method to maintain normal console functionality
      originalMethod.apply(originalConsole, args);
    };
  });

  // --- Capturing groupEnd ---
  const originalGroupEnd = originalConsole.groupEnd;
  console.groupEnd = function () {
    if (groupStack.length > 1) {
      groupStack.pop(); // Go up one level
    }
    // Call original console method to maintain normal console functionality
    originalGroupEnd.apply(originalConsole);
  };

  /**
   * No-op restore function kept for API compatibility.
   * Since we're not modifying the console permanently, restoration isn't needed.
   */
  const restoreConsole = () => {
    // Console methods are still wrapped to capture logs, but this is acceptable
    // as they still call through to the original implementations
  };

  return { capturedLogs, restoreConsole };
};

// Example Usage (commented out for utility file, but shows how to use types)
/*
// 1. Start Capture
const { capturedLogs, restoreConsole } = captureLogs();

// 2. Run code that logs
console.log("This is a log");
console.group("My Group");
console.error("An error occurred");
console.groupEnd();

// 3. Stop Capture
restoreConsole(); 

// 4. Inspect the structured data
console.log("Captured Data:", capturedLogs);
*/
