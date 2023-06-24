import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import type { Guard, Refinement } from "./types";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return function isRefinement(v: unknown): v is T {
    dev_debug_start(isRefinement);

    if (!guard(v)) {
      dev_debug`${isRefinement} failed - value: ${v}, guard: ${guard}`;
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_debug`${isRefinement} failed - value: ${v}, refinementIndex: ${i}`;
        return false;
      }
    }

    dev_debug_end(isRefinement);
    return true;
  };
}
