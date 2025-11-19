import { ReactNode } from "react";
import { COLORS } from "./colors";
import classNames from "classnames";

interface ExpandableConsoleProps {
  id: string;
  message: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
  level: number;
  className?: string;
}

export const ExpandableConsole = ({
  id,
  message,
  isExpanded,
  onToggle,
  children,
  level,
  className = "",
}: ExpandableConsoleProps) => {
  const indent = level * 16;

  return (
    <div className={classNames("mb-2", className)} style={{ marginLeft: `${indent}px` }}>
      <button
        onClick={() => onToggle(id)}
        className={classNames(
          "flex",
          "cursor-pointer",
          "items-center",
          "gap-2",
          "font-semibold",
          "transition-opacity",
          "hover:opacity-70"
        )}
        style={{ color: COLORS.text, background: "none", border: "none", padding: 0 }}
      >
        <span>{isExpanded ? "▼" : "▶"}</span>
        <span>📦 {message}</span>
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
};
