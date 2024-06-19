import { tracker } from "./internal/tracker.js";
import type { Guard, Refinement } from "./types.js";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return function isRefinement(v: unknown): v is T {
    tracker.track();

    if (!guard(v)) {
      tracker.block(isRefinement, `guard failed`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        tracker.block(isRefinement, `refinement[${i}] failed`, v);
        return false;
      }
    }

    tracker.pass();
    return true;
  };
}
