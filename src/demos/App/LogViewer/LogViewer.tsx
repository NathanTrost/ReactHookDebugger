import { useEffect, useState, useRef } from "react";
import ObjectInspector from "./ObjectInspector";
import { COLORS } from "./colors";

interface LogEntry {
  id: string;
  message: string;
  method: string;
  timestamp: number;
  raw: unknown[];
  groupLevel?: number;
  isGroupStart?: boolean;
  isGroupEnd?: boolean;
}

const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logCounterRef = useRef(0);

  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalGroupCollapsed = console.groupCollapsed;
    const originalGroup = console.group;
    const originalGroupEnd = console.groupEnd;

    let groupLevel = 0;

    const captureLog = (method: string, ...args: unknown[]) => {
      const message = args
        .map(arg => {
          if (typeof arg === "object") {
            return JSON.stringify(arg, null, 2);
          }
          return String(arg);
        })
        .join(" ");

      setLogs(prevLogs => [
        ...prevLogs,
        {
          id: `${Date.now()}-${++logCounterRef.current}`,
          message,
          method,
          timestamp: Date.now(),
          raw: args,
          groupLevel,
        },
      ]);

      if (method === "log") originalLog(...args);
      else if (method === "warn") originalWarn(...args);
      else if (method === "error") originalError(...args);
    };

    console.log = (...args) => captureLog("log", ...args);
    console.warn = (...args) => captureLog("warn", ...args);
    console.error = (...args) => captureLog("error", ...args);
    console.groupCollapsed = (...args) => {
      setLogs(prevLogs => [
        ...prevLogs,
        {
          id: `${Date.now()}-${++logCounterRef.current}`,
          message: String(args[0]),
          method: "group",
          timestamp: Date.now(),
          raw: args,
          groupLevel,
          isGroupStart: true,
        },
      ]);
      groupLevel++;
      originalGroupCollapsed(...args);
    };
    console.group = (...args) => {
      setLogs(prevLogs => [
        ...prevLogs,
        {
          id: `${Date.now()}-${++logCounterRef.current}`,
          message: String(args[0]),
          method: "group",
          timestamp: Date.now(),
          raw: args,
          groupLevel,
          isGroupStart: true,
        },
      ]);
      groupLevel++;
      originalGroup(...args);
    };
    console.groupEnd = () => {
      groupLevel = Math.max(0, groupLevel - 1);
      setLogs(prevLogs => [
        ...prevLogs,
        {
          id: `${Date.now()}-${++logCounterRef.current}`,
          message: "",
          method: "group",
          timestamp: Date.now(),
          raw: [],
          groupLevel,
          isGroupEnd: true,
        },
      ]);
      originalGroupEnd();
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.groupCollapsed = originalGroupCollapsed;
      console.group = originalGroup;
      console.groupEnd = originalGroupEnd;
    };
  }, []);

  const getMethodColor = (method: string): string => {
    switch (method) {
      case "error":
        return COLORS.methodError;
      case "warn":
        return COLORS.methodWarn;
      default:
        return COLORS.methodLog;
    }
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div
      className="flex h-full flex-col font-mono text-xs"
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      <div
        className="flex items-center justify-between px-2 py-2"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <span>Console ({logs.length})</span>
        <button
          onClick={() => setLogs([])}
          className="rounded px-2 py-1 text-xs transition-opacity hover:opacity-80"
          style={{
            backgroundColor: COLORS.buttonBg,
            color: COLORS.text,
            border: `1px solid ${COLORS.borderDark}`,
          }}
        >
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {logs.map(log => {
          const indent = (log.groupLevel ?? 0) * 16;
          const isGroup = log.method === "group";

          if (log.isGroupEnd) {
            return null;
          }

          if (isGroup && log.isGroupStart) {
            return (
              <div key={log.id} className="mb-2">
                <div className="font-semibold" style={{ color: COLORS.text }}>
                  📦 {log.message}
                </div>
              </div>
            );
          }

          return (
            <div
              key={log.id}
              className="mb-1"
              style={{
                marginLeft: `${indent}px`,
                paddingLeft: "8px",
                borderLeft: `2px solid ${getMethodColor(log.method)}`,
              }}
            >
              <div className="text-xs" style={{ color: COLORS.textMuted }}>
                {formatTime(log.timestamp)} {log.method.toUpperCase()}
              </div>
              <div className="mt-1">
                {log.raw.length > 0 ? (
                  log.raw.map((item, idx) => (
                    <div key={idx}>
                      <ObjectInspector obj={item} id={`${log.id}-${idx}`} />
                    </div>
                  ))
                ) : (
                  <span style={{ color: COLORS.textDimmed }}>{log.message}</span>
                )}
              </div>
            </div>
          );
        })}
        {logs.length === 0 && <div style={{ color: COLORS.textDimmed }}>No logs yet</div>}
      </div>
    </div>
  );
};

export default LogViewer;
