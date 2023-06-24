import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import type { Guard, Shape } from "./types";

export function shape<T extends object>(
  shape: Shape<T>,
  options?: { strict?: boolean }
): Guard<T> {
  return function isShape(v: unknown): v is T {
    dev_debug_start(isShape);

    if (typeof v !== "function" && (typeof v !== "object" || v === null)) {
      dev_debug`${isShape} failed - value: ${v}`;
      return false;
    }

    for (const key in shape) {
      // countShapeKeys += 1;
      // @ts-expect-error suppress
      const guard: Guard<unknown> = shape[key];
      // @ts-expect-error suppress
      const value: unknown = v[key];
      if (!guard(value)) {
        dev_debug`${isShape} failed - key: ${key}, value: ${value}`;
        return false;
      }
    }

    if (options?.strict) {
      for (const key in v) {
        // @ts-expect-error suppress
        if (!shape[key]) {
          dev_debug`${isShape} encountered unknown key - key: ${key}`;
          return false;
        }
      }
    }

    dev_debug_end(isShape);
    return true;
  };
}
