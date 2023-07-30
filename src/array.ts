import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard, type Refinement } from "./types";

export default function array<T>(
  guard?: Guard<T>,
  ...refinements: Refinement<unknown[]>[]
): Guard<T[]> {
  return function isArray(v: unknown): v is T[] {
    dev_debug_start(isArray);

    if (!Array.isArray(v)) {
      dev_debug(isArray, `failed - value is not array`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_debug(isArray, `refinements[${i}] failed`, v);
        return false;
      }
    }

    if (guard) {
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (!guard(item)) {
          dev_debug(isArray, `guard failed at items[${i}]`, item);
          return false;
        }
      }
    }

    dev_debug_end(isArray);
    return true;
  };
}
