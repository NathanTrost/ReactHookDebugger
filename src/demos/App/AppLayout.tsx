import classNames from "classnames";
import { useState } from "react";
import { Outlet, useMatches } from "react-router";

import { RouteWithHandle } from "../../router";

import HookTypeContent from "./HookTypeContent";
import TipsBox from "./TipsBox";
import LogViewer from "./LogViewer";
import Navigation from "./Navigation";
import { DemonstrationList } from "./DemonstrationList";

const AppLayout = () => {
  const matches = useMatches();

  const [open, setOpen] = useState(false);
  const [remountKey, setRemountKey] = useState(0);

  const hookType = matches
    .filter((match): match is RouteWithHandle => Boolean(match?.handle))
    .find(match => match.handle.hookType)?.handle.hookType;

  return (
    <div className={classNames("min-h-screen", "bg-bg-body")}>
      <header
        className={classNames(
          "bg-bg-header",
          "px-8",
          "py-4",
          "smooth-transition",
          open ? "pl-88" : "pl-8"
        )}
      >
        <div className={classNames("flex", "items-center", "justify-between")}>
          <h1 className={classNames("text-2xl", "font-bold")}>ReactHookDebugger (Local App)</h1>
          <button
            aria-label="Toggle navigation"
            className={classNames("btn-primary", "text-2xl")}
            onClick={() => setOpen(prev => !prev)}
          >
            ☰
          </button>
        </div>
      </header>

      <Navigation open={open} onCloseSideNav={() => setOpen(false)} />

      <main
        className={classNames(
          "p-8",
          "font-sans",
          "smooth-transition",
          "h-screen",
          open ? "pl-88" : "pl-16"
        )}
      >
        <div className={classNames("flex", "flex-auto", "gap-4")}>
          <div className="flex-1">
            <HookTypeContent hookType={hookType} />
            <div className={classNames("info-box", "bg-gray-100")}>
              <Outlet key={remountKey} />
              <button
                onClick={() => setRemountKey(prev => prev++)}
                style={{
                  padding: "8px 16px",
                  marginTop: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Force Component Remount
              </button>
            </div>
            <DemonstrationList hookType={hookType} />
            <TipsBox hookType={hookType} />
            <p className={classNames("mb-6", "text-gray-700", "text-xs", "font-bold")}>
              **Changes will hot-reload automatically.
            </p>
          </div>
          <div className={classNames("console-box", "flex-1")}>
            <LogViewer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
