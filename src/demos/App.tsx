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
  },
  {
    path: sectionRoutes.UseEffect.path,
    element: sectionRoutes.UseEffect.component,
    children: [
      {
        path: exampleRoutes.DebouncedSearch.path,
        element: exampleRoutes.DebouncedSearch.component,
      },
      { path: exampleRoutes.EmptyDepsArray.path, element: exampleRoutes.EmptyDepsArray.component },
      { path: exampleRoutes.MultiDeps.path, element: exampleRoutes.MultiDeps.component },
      { path: exampleRoutes.NoDeps.path, element: exampleRoutes.NoDeps.component },
      { path: exampleRoutes.Subscription.path, element: exampleRoutes.Subscription.component },
    ],
  },
  {
    path: sectionRoutes.UseCallback.path,
    element: sectionRoutes.UseCallback.component,
    children: [
      {
        path: exampleRoutes.CounterCalculate.path,
        element: exampleRoutes.CounterCalculate.component,
      },
      { path: exampleRoutes.InputDep.path, element: exampleRoutes.InputDep.component },
      { path: exampleRoutes.StableCallback.path, element: exampleRoutes.StableCallback.component },
    ],
  },
  {
    path: sectionRoutes.UseMemo.path,
    element: sectionRoutes.UseMemo.component,
    children: [
      {
        path: exampleRoutes.ExpensiveCalculation.path,
        element: exampleRoutes.ExpensiveCalculation.component,
      },
      { path: exampleRoutes.FilteredArray.path, element: exampleRoutes.FilteredArray.component },
      {
        path: exampleRoutes.StatsCalculation.path,
        element: exampleRoutes.StatsCalculation.component,
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
