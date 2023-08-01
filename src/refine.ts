import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log";
import { type Guard, type Refinement } from "./types";

export default function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return function isRefinement(v: unknown): v is T {
    dev_log_start(isRefinement);

    if (!guard(v)) {
      dev_log(isRefinement, `guard failed`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_log(isRefinement, `refinement[${i}] failed`, v);
        return false;
      }
    }

    dev_log_end(isRefinement);
    return true;
  };
}
