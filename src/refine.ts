import { context } from "./internal/context.js";
import type { Guard, Refinement } from "./types.js";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: Refinement<T>[]
): Guard<T> {
  return function isRefinement(v: unknown): v is T {
    context.track();

    if (!guard(v)) {
      context.block(isRefinement, `guard failed`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        context.block(isRefinement, `refinement[${i}] failed`, v);
        return false;
      }
    }

    context.pass();
    return true;
  };
}
