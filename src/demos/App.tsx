import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "./App/AppLayout";
import { exampleRoutes, sectionRoutes } from "./routeConfig";
import "../styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: sectionRoutes.UseEffect.path,
        handle: { hookType: "useEffect" as const },
        children: [
          {
            index: true,
            element: sectionRoutes.UseEffect.component,
          },
          {
            path: exampleRoutes.DebouncedSearch.path,
            element: exampleRoutes.DebouncedSearch.component,
          },
          {
            path: exampleRoutes.EmptyDepsArray.path,
            element: exampleRoutes.EmptyDepsArray.component,
          },
          { path: exampleRoutes.MultiDeps.path, element: exampleRoutes.MultiDeps.component },
          { path: exampleRoutes.NoDeps.path, element: exampleRoutes.NoDeps.component },
          { path: exampleRoutes.Subscription.path, element: exampleRoutes.Subscription.component },

          {
            path: exampleRoutes.Remount.path,
            element: exampleRoutes.Remount.component,
          },
        ],
      },
      {
        path: sectionRoutes.UseCallback.path,
        handle: { hookType: "useCallback" as const },
        children: [
          {
            index: true,
            element: sectionRoutes.UseCallback.component,
          },
          {
            path: exampleRoutes.CounterCalculate.path,
            element: exampleRoutes.CounterCalculate.component,
          },
          { path: exampleRoutes.InputDep.path, element: exampleRoutes.InputDep.component },
          {
            path: exampleRoutes.StableCallback.path,
            element: exampleRoutes.StableCallback.component,
          },
        ],
      },
      {
        path: sectionRoutes.UseMemo.path,
        handle: { hookType: "useMemo" as const },
        children: [
          {
            index: true,
            element: sectionRoutes.UseMemo.component,
          },
          {
            path: exampleRoutes.ExpensiveCalculation.path,
            element: exampleRoutes.ExpensiveCalculation.component,
          },
          {
            path: exampleRoutes.FilteredArray.path,
            element: exampleRoutes.FilteredArray.component,
          },
          {
            path: exampleRoutes.StatsCalculation.path,
            element: exampleRoutes.StatsCalculation.component,
          },
        ],
      },
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
