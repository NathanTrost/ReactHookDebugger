import classNames from "classnames";
import { sectionRoutes, exampleRoutes } from "../../routeConfig";
import ExampleLink from "./ExampleLink";
import SectionLink from "./SectionLink";
import { useState } from "react";
import "./navigation.css";

const Navigation = ({ open, onCloseSideNav }: { open: boolean; onCloseSideNav: () => void }) => {
  const [activeSections, setActiveSections] = useState({
    useEffect: false,
    useCallback: false,
    useMemo: false,
  });

  const toggleSection = (section: keyof typeof activeSections) => {
    setActiveSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <nav
      className={classNames(
        "nav",
        "smooth-transition",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <button aria-label="Close navigation" className="nav-closeBtn" onClick={onCloseSideNav}>
        &times;
      </button>

      {/* UseEffect Section */}
      <div className="nav-sectionWrap">
        <SectionLink
          label={sectionRoutes.UseEffect.pageName}
          path={sectionRoutes.UseEffect.path}
          isOpen={activeSections.useEffect}
          onClick={() => toggleSection("useEffect")}
        />
        {activeSections.useEffect && (
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
              <ExampleLink label={exampleRoutes.NoDeps.pageName} path={exampleRoutes.NoDeps.path} />
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
      <div className="nav-sectionWrap">
        <SectionLink
          label={sectionRoutes.UseCallback.pageName}
          path={sectionRoutes.UseCallback.path}
          isOpen={activeSections.useCallback}
          onClick={() => toggleSection("useCallback")}
        />

        {activeSections.useCallback && (
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
      <div className="nav-sectionWrap">
        <SectionLink
          label={sectionRoutes.UseMemo.pageName}
          path={sectionRoutes.UseMemo.path}
          isOpen={activeSections.useMemo}
          onClick={() => toggleSection("useMemo")}
        />

        {activeSections.useMemo && (
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
  );
};

export default Navigation;
