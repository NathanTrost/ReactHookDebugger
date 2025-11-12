import classNames from "classnames";
import { useState } from "react";
import { Outlet, useMatches } from "react-router";

import { RouteWithHandle } from "../../router";
import { exampleRoutes, sectionRoutes } from "../routeConfig";

import ExampleLink from "./ExampleLink";
import HookTypeContent from "./HookTypeContent";
import SectionLink from "./SectionLink";
import TipsBox from "./TipsBox";

const AppLayout = () => {
  const matches = useMatches();

  const hookType = matches
    .filter((match): match is RouteWithHandle => Boolean(match?.handle))
    .find(match => match.handle.hookType)?.handle.hookType;

  const [open, setOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    useEffect: false,
    useCallback: false,
    useMemo: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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
            onClick={() => setOpen(prev => !prev)}
            className={classNames("btn-primary", "text-2xl")}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </header>

      <nav
        className={classNames(
          "fixed",
          "top-0",
          "z-10",
          "h-full",
          "w-80",
          "bg-bg-nav",
          "pt-16",
          "smooth-transition",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className={classNames(
            "absolute",
            "right-4",
            "top-4",
            "cursor-pointer",
            "text-3xl",
            "text-gray-400",
            "hover:text-text-on-dark"
          )}
          aria-label="Close navigation"
        >
          &times;
        </button>

        {/* UseEffect Section */}
        <div className={classNames("border-b", "border-gray-700")}>
          <SectionLink
            label={sectionRoutes.UseEffect.pageName}
            path={sectionRoutes.UseEffect.path}
            isOpen={openSections.useEffect}
            onClick={() => toggleSection("useEffect")}
          />
          {openSections.useEffect && (
            <ul className="bg-gray-900">
              <li>
                <ExampleLink
                  label={exampleRoutes.DebouncedSearch.pageName}
                  path={exampleRoutes.DebouncedSearch.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.EmptyDepsArray.pageName}
                  path={exampleRoutes.EmptyDepsArray.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.MultiDeps.pageName}
                  path={exampleRoutes.MultiDeps.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.NoDeps.pageName}
                  path={exampleRoutes.NoDeps.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.Subscription.pageName}
                  path={exampleRoutes.Subscription.path}
                />
              </li>
            </ul>
          )}
        </div>

        {/* UseCallback Section */}
        <div className={classNames("border-b", "border-gray-700")}>
          <SectionLink
            label={sectionRoutes.UseCallback.pageName}
            path={sectionRoutes.UseCallback.path}
            isOpen={openSections.useCallback}
            onClick={() => toggleSection("useCallback")}
          />

          {openSections.useCallback && (
            <ul className="bg-gray-900">
              <li>
                <ExampleLink
                  label={exampleRoutes.CounterCalculate.pageName}
                  path={exampleRoutes.CounterCalculate.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.InputDep.pageName}
                  path={exampleRoutes.InputDep.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.StableCallback.pageName}
                  path={exampleRoutes.StableCallback.path}
                />
              </li>
            </ul>
          )}
        </div>

        {/* UseMemo Section */}
        <div className={classNames("border-b", "border-gray-700")}>
          <SectionLink
            label={sectionRoutes.UseMemo.pageName}
            path={sectionRoutes.UseMemo.path}
            isOpen={openSections.useMemo}
            onClick={() => toggleSection("useMemo")}
          />

          {openSections.useMemo && (
            <ul className="bg-gray-900">
              <li>
                <ExampleLink
                  label={exampleRoutes.ExpensiveCalculation.pageName}
                  path={exampleRoutes.ExpensiveCalculation.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.FilteredArray.pageName}
                  path={exampleRoutes.FilteredArray.path}
                />
              </li>
              <li>
                <ExampleLink
                  label={exampleRoutes.StatsCalculation.pageName}
                  path={exampleRoutes.StatsCalculation.path}
                />
              </li>
            </ul>
          )}
        </div>
      </nav>

      <main
        className={classNames("p-8", "font-sans", "smooth-transition", open ? "pl-88" : "pl-16")}
      >
        <HookTypeContent hookType={hookType} />
        <Outlet />
        <TipsBox hookType={hookType} />
        <p className={classNames("mb-6", "text-gray-700")}>
          Changes will hot-reload automatically.
        </p>
      </main>
    </div>
  );
};

export default AppLayout;
