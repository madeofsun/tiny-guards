import type { Guard, Refinement } from "./types.js";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return (v: unknown): v is T => guard(v) && refinements.every((r) => r(v));
}
