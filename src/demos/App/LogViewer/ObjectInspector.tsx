import { useState } from "react";
import { COLORS } from "./colors";

const ObjectInspector = ({ obj, id }: { obj: unknown; id: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (obj === null) return <span style={{ color: COLORS.typeNull }}>null</span>;
  if (obj === undefined) return <span style={{ color: COLORS.typeNull }}>undefined</span>;

  const type = typeof obj;
  if (type === "string")
    return <span style={{ color: COLORS.typeString }}>"{JSON.stringify(obj)}"</span>;
  if (type === "number")
    return <span style={{ color: COLORS.typeNumber }}>{JSON.stringify(obj)}</span>;
  if (type === "boolean")
    return <span style={{ color: COLORS.typeBoolean }}>{JSON.stringify(obj)}</span>;

  if (type === "object") {
    const isArray = Array.isArray(obj);
    const length = isArray ? obj.length : Object.keys(obj).length;
    return (
      <span>
        <button
          className="cursor-pointer border-none bg-transparent p-0 font-mono hover:opacity-70"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "▼" : "▶"} {isArray ? `Array(${length})` : `Object`}
        </button>
        {expanded && (
          <div className="ml-5">
            {isArray
              ? (obj as unknown[]).map((item, idx) => (
                  <div key={idx}>
                    <span style={{ color: COLORS.typeIndex }}>[{idx}]:</span>{" "}
                    <ObjectInspector obj={item} id={`${id}-${idx}`} />
                  </div>
                ))
              : Object.entries(obj as Record<string, unknown>).map(([key, value]) => (
                  <div key={key}>
                    <span style={{ color: COLORS.typeKey }}>{key}:</span>{" "}
                    <ObjectInspector obj={value} id={`${id}-${key}`} />
                  </div>
                ))}
          </div>
        )}
      </span>
    );
  }

  return <span>{String(obj)}</span>;
};

export default ObjectInspector;
