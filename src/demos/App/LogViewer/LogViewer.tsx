import { useEffect, useState } from "react";
import { ExpandableConsole } from "./ExpandableConsole";
import { COLORS } from "./colors";
import classNames from "classnames";
import { LogEntry, LogMessage, LogGroup, captureLogs } from "./captureConsoleLogs";

const isLogMessage = (entry: LogEntry): entry is LogMessage => {
  return "type" in entry && !("children" in entry);
};

const isLogGroup = (entry: LogEntry): entry is LogGroup => {
  return "children" in entry;
};

// Initialize log capturing globally so it starts from page load
const { capturedLogs } = captureLogs();

const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showManualLogs, setShowManualLogs] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Set up an interval to periodically sync captured logs
    const interval = setInterval(() => {
      setLogs([...capturedLogs]);
    }, 100);

    return () => {
      clearInterval(interval);
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const renderEntry = (entry: LogEntry, level: number = 0) => {
    if (isLogMessage(entry)) {
      const shouldShow = showManualLogs; // All messages from captureLogs are manual for now
      const displayClass = shouldShow ? "" : "hidden";
      const indent = level * 16;

      return (
        <div
          key={entry.id}
          className={`mb-1 ${displayClass}`}
          style={{
            marginLeft: `${indent}px`,
            paddingLeft: "8px",
            borderLeft: `2px solid ${getMethodColor(entry.type)}`,
          }}
        >
          <div className="text-xs" style={{ color: COLORS.textMuted }}>
            {entry.type.toUpperCase()}
          </div>
          <div className="mt-1">
            <span style={{ color: COLORS.textDimmed }}>{entry.message}</span>
          </div>
        </div>
      );
    }

    if (isLogGroup(entry)) {
      const isExpanded = expandedGroups.has(entry.id);
      const displayClass = showManualLogs ? "" : "hidden";

      return (
        <ExpandableConsole
          key={entry.id}
          id={entry.id}
          message={entry.label}
          isExpanded={isExpanded}
          onToggle={toggleGroup}
          level={level}
          className={displayClass}
        >
          {entry.children.map((child: LogEntry) => renderEntry(child, level + 1))}
        </ExpandableConsole>
      );
    }

    return null;
  };

  const renderLogs = () => {
    return logs.map(entry => renderEntry(entry, 0)).filter(el => el !== null);
  };

  const renderedLogs = renderLogs();

  return (
    <div
      className={classNames("flex", "h-full", "flex-col", "font-mono", "text-xs")}
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      <div
        className={classNames("flex", "items-center", "justify-between", "px-2", "py-2")}
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <span>Console ({logs.length})</span>
        <div className="flex gap-2">
          <button
            className={classNames(
              "rounded",
              "px-2",
              "py-1",
              "text-xs",
              "transition-opacity",
              "hover:opacity-80"
            )}
            style={{
              backgroundColor: showManualLogs ? COLORS.buttonBg : "#444",
              color: COLORS.text,
              border: `1px solid ${COLORS.borderDark}`,
            }}
            onClick={() => setShowManualLogs(!showManualLogs)}
          >
            {showManualLogs ? "Hide" : "Show"} Manual
          </button>
          <button
            onClick={() => setLogs([])}
            className={classNames(
              "rounded",
              "px-2",
              "py-1",
              "text-xs",
              "transition-opacity",
              "hover:opacity-80"
            )}
            style={{
              backgroundColor: COLORS.buttonBg,
              color: COLORS.text,
              border: `1px solid ${COLORS.borderDark}`,
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className={classNames("flex-1", "overflow-y-auto", "p-2")}>
        {renderedLogs.length > 0 ? (
          (renderedLogs as any)
        ) : (
          <div style={{ color: COLORS.textDimmed }}>No logs yet</div>
        )}
      </div>

      {/* Commenting out for now, the below code logs correctly, but it nests and does not display as togglable object */}
      {/* <div className="flex-1 overflow-y-auto p-2">
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
      </div> */}
    </div>
  );
};

export default LogViewer;
