import type { HookType } from "./hook/types";
import type { useMatches } from "react-router";

// Make route handle an optional version HookType
export interface RouteHandle {
  hookType?: HookType;
}

// Support types for handle
export type RouteWithHandle = Awaited<ReturnType<typeof useMatches>>[number] & {
  handle: RouteHandle;
};
