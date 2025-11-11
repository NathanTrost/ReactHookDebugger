import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./Layout";
import CounterCalculate from "./UseCallbacks/CounterCalculate";
import InputDep from "./UseCallbacks/InputDep";
import StableCallback from "./UseCallbacks/StableCallback";
import UseCallbacksLayout from "./UseCallbacks/UseCallbacksLayout";
import DebouncedSearch from "./UseEffects/DebouncedSearch";
import EmptyDepsArray from "./UseEffects/EmptyDepsArray";
import MultiDeps from "./UseEffects/MultiDeps";
import NoDeps from "./UseEffects/NoDeps";
import Subscription from "./UseEffects/Subscription";
import UseEffectsLayout from "./UseEffects/UseEffectsLayout";
import ExpensiveCalculation from "./UseMemos/ExpensiveCalculation";
import FilteredArray from "./UseMemos/FilteredArray";
import StatsCalculation from "./UseMemos/StatsCalculation";
import UseMemosLayout from "./UseMemos/UseMemosLayout";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // children: [
    //   { path: "/", element: <div>Placeholder</div> }, // Util overview here
    // ],
  },
  {
    path: "/use-effect",
    element: <UseEffectsLayout />,
    children: [
      { path: "/use-effect/debounced-search", element: <DebouncedSearch /> },
      { path: "/use-effect/multiple-dependencies", element: <MultiDeps /> },
      { path: "/use-effect/empty-dependencies-array", element: <EmptyDepsArray /> },
      { path: "/use-effect/no-dependencies-array", element: <NoDeps /> },
      { path: "/use-effect/subscription", element: <Subscription /> },
    ],
  },
  {
    path: "/use-callback",
    element: <UseCallbacksLayout />,
    children: [
      { path: "/use-callback/counter-calculate", element: <CounterCalculate /> },
      { path: "/use-callback/input-dependency", element: <InputDep /> },
      { path: "/use-callback/stable", element: <StableCallback /> },
    ],
  },
  {
    path: "/use-memo",
    element: <UseMemosLayout />,
    children: [
      { path: "/use-memo/expensive-calculation", element: <ExpensiveCalculation /> },
      { path: "/use-memo/filtered-array", element: <FilteredArray /> },
      { path: "/use-memo/stats-calculation", element: <StatsCalculation /> },
    ],
  },
]);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
