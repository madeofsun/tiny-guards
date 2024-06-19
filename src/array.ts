import { tracker } from "./internal/tracker.js";
import type { Guard, Refinement } from "./types.js";

export function array<T>(
  guard?: Guard<T>,
  ...refinements: Refinement<unknown[]>[]
): Guard<T[]> {
  return function isArray(v: unknown): v is T[] {
    tracker.track();

    if (!Array.isArray(v)) {
      return tracker.block(isArray, `failed - value is not array`, v);
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        return tracker.block(isArray, `refinements[${i}] failed`, v);
      }
    }

    if (guard) {
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (!guard(item)) {
          return tracker.block(isArray, `guard failed at items[${i}]`, item);
        }
      }
    }

    return tracker.pass();
  };
}
