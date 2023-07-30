import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard, type Refinement } from "./types";

export default function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return function isRefinement(v: unknown): v is T {
    dev_debug_start(isRefinement);

    if (!guard(v)) {
      dev_debug(isRefinement, `guard failed`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_debug(isRefinement, `refinement[${i}] failed`, v);
        return false;
      }
    }

    dev_debug_end(isRefinement);
    return true;
  };
}
