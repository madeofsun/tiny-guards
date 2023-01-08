import type { Guard, Refinement } from "./types.js";

export function array<T>(
  guard?: Guard<T>,
  ...refinements: Refinement<unknown[]>[]
): Guard<T[]> {
  return (v: unknown): v is T[] =>
    Array.isArray(v) &&
    refinements.every((r) => r(v)) &&
    (guard ? v.every(guard) : true);
}
