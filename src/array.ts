import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log.js";
import type {Guard, Refinement} from "./types.js";

export default function array<T>(
  guard?: Guard<T>,
  ...refinements: Refinement<unknown[]>[]
): Guard<T[]> {
  return function isArray(v: unknown): v is T[] {
    dev_log_start(isArray);

    if (!Array.isArray(v)) {
      dev_log(isArray, `failed - value is not array`, v);
      return false;
    }

    for (let i = 0; i < refinements.length; i++) {
      if (!refinements[i]!(v)) {
        dev_log(isArray, `refinements[${i}] failed`, v);
        return false;
      }
    }

    if (guard) {
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (!guard(item)) {
          dev_log(isArray, `guard failed at items[${i}]`, item);
          return false;
        }
      }
    }

    dev_log_end(isArray);
    return true;
  };
}
