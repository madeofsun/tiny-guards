import { tracker } from "./internal/tracker.js";
import type { Guard, Shape } from "./types.js";

export function shape<T extends object>(
  shape: Shape<T>,
  options?: { name?: string; strict?: boolean }
): Guard<T> {
  return function isShape(v: unknown): v is T {
    tracker.track();

    if (typeof v !== "function" && (typeof v !== "object" || v === null)) {
      return tracker.block(
        isShape,
        v === null
          ? `failed - value is "null"`
          : `failed - typeof value is not "object" or "function"`,
        v
      );
    }

    for (const key in shape) {
      const guard: Guard<unknown> = shape[key];
      // @ts-expect-error suppress
      const value: unknown = v[key];
      if (!guard(value)) {
        return tracker.block(
          isShape,
          `guard at key "${key}" (${guard.name})`,
          v
        );
      }
    }

    if (options?.strict) {
      for (const key in v) {
        // @ts-expect-error suppress
        if (!shape[key]) {
          return tracker.block(isShape, `encountered unknown key "${key}"`, v);
        }
      }
    }

    return tracker.pass();
  };
}
