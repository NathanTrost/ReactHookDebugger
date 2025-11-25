import { ReactNode } from "react";

import CounterCalculate from "./UseCallbacks/CounterCalculate";
import InputDep from "./UseCallbacks/InputDep";
import StableCallback from "./UseCallbacks/StableCallback";
import UseCallbacksCollection from "./UseCallbacks/UseCallbacksCollection";
import DebouncedSearch from "./UseEffects/DebouncedSearch";
import EmptyDepsArray from "./UseEffects/EmptyDepsArray";
import MultiDeps from "./UseEffects/MultiDeps";
import NoDeps from "./UseEffects/NoDeps";
import Subscription from "./UseEffects/Subscription";
import UseEffectsCollection from "./UseEffects/UseEffectsCollection";
import ExpensiveCalculation from "./UseMemos/ExpensiveCalculation";
import FilteredArray from "./UseMemos/FilteredArray";
import StatsCalculation from "./UseMemos/StatsCalculation";
import UseMemoCollection from "./UseMemos/UseMemoCollection";

// Section routes configuration
export const sectionRoutes = {
  UseEffect: {
    path: "/use-effect",
    pageName: "UseEffect Examples",
    component: <UseEffectsCollection />,
    componentType: "useEffect",
    children: ["DebouncedSearch", "EmptyDepsArray", "MultiDeps", "NoDeps", "Subscription"] as const,
    messageComp: null as ReactNode,
  },
  UseCallback: {
    path: "/use-callback",
    pageName: "UseCallback Examples",
    component: <UseCallbacksCollection />,
    componentType: "useCallback",
    children: ["CounterCalculate", "InputDep", "StableCallback"] as const,
    messageComp: null as ReactNode,
  },
  UseMemo: {
    path: "/use-memo",
    pageName: "UseMemo Examples",
    component: <UseMemoCollection />,
    componentType: "useMemo",
    children: ["ExpensiveCalculation", "FilteredArray", "StatsCalculation"] as const,
    messageComp: null as ReactNode,
  },
} as const;

// Example routes configuration
export const exampleRoutes = {
  // UseEffect examples
  DebouncedSearch: {
    path: "/use-effect/debounced-search",
    pageName: "Debounced Search",
    component: <DebouncedSearch />,
    componentType: "useEffect",
    messageComp: null as ReactNode,
  },
  EmptyDepsArray: {
    path: "/use-effect/empty-deps-array",
    pageName: "Empty Dependencies Array",
    component: <EmptyDepsArray />,

    componentType: "useEffect",
    messageComp: null as ReactNode,
  },
  MultiDeps: {
    path: "/use-effect/multi-deps",
    pageName: "Multi Dependencies",
    component: <MultiDeps />,

    componentType: "useEffect",
    messageComp: null as ReactNode,
  },
  NoDeps: {
    path: "/use-effect/no-deps",
    pageName: "No Dependencies",
    component: <NoDeps />,
    componentType: "useEffect",
    messageComp: null as ReactNode,
  },
  Subscription: {
    path: "/use-effect/subscription",
    pageName: "Subscription",
    component: <Subscription />,
    componentType: "useEffect",
    messageComp: null as ReactNode,
  },

  // UseCallback examples
  CounterCalculate: {
    path: "/use-callback/counter-calculate",
    pageName: "Counter Calculate",
    component: <CounterCalculate />,
    componentType: "useCallback",
    messageComp: null as ReactNode,
  },
  InputDep: {
    path: "/use-callback/input-dep",
    pageName: "Input Dependencies",
    component: <InputDep />,
    componentType: "useCallback",
    messageComp: null as ReactNode,
  },
  StableCallback: {
    path: "/use-callback/stable",
    pageName: "Static/Stable Callback",
    component: <StableCallback />,
    componentType: "useCallback",
    messageComp: null as ReactNode,
  },

  // UseMemo examples
  ExpensiveCalculation: {
    path: "/use-memo/expensive-calculation",
    pageName: "Expensive Calculation",
    component: <ExpensiveCalculation />,
    componentType: "useMemo",
    messageComp: null as ReactNode,
  },
  FilteredArray: {
    path: "/use-memo/filtered-array",
    pageName: "Filtered Array",
    component: <FilteredArray />,
    componentType: "useMemo",
    messageComp: null as ReactNode,
  },
  StatsCalculation: {
    path: "/use-memo/stats-calculation",
    pageName: "Stats Calculation",
    component: <StatsCalculation />,
    componentType: "useMemo",
    messageComp: null as ReactNode,
  },
} as const;

// Inferred types for type safety
export type SectionKey = keyof typeof sectionRoutes;
export type ExampleKey = keyof typeof exampleRoutes;

// Helper type to get children of a section
export type SectionChildren<T extends SectionKey> = (typeof sectionRoutes)[T]["children"][number];
