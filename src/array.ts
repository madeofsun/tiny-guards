import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import type { Guard, Refinement } from "./types";

export function array<T>(
  guard?: Guard<T>,
  ...refinements: Refinement<unknown[]>[]
): Guard<T[]> {
  return function isArray(v: unknown): v is T[] {
    dev_debug_start(isArray);

    if (!Array.isArray(v)) {
      dev_debug`${isArray} failed - value: ${v}`;
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_debug`${isArray} refinement failed - value: ${v}, refinementIndex: ${i}`;
        return false;
      }
    }

    if (guard) {
      for (let i = 0; i < v.length; i++) {
        const value = v[i];
        if (!guard(value)) {
          dev_debug`${isArray} guard failed - index: ${i}, value: ${value}`;
          return false;
        }
      }
    }

    dev_debug_end(isArray);
    return true;
  };
}
