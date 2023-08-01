import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log";
import { type Guard, type Shape } from "./types";

export default function shape<T extends object>(
  shape: Shape<T>,
  options?: { strict?: boolean }
): Guard<T> {
  return function isShape(v: unknown): v is T {
    dev_log_start(isShape);

    if (typeof v !== "function" && (typeof v !== "object" || v === null)) {
      dev_log(
        isShape,
        v === null
          ? `failed - value is "null"`
          : `failed - typeof value is not "object" or "function"`,
        v
      );
      return false;
    }

    for (const key in shape) {
      const guard: Guard<unknown> = shape[key];
      // @ts-expect-error suppress
      const value: unknown = v[key];
      if (!guard(value)) {
        dev_log(isShape, `guard failed at key "${key}"`, value);
        return false;
      }
    }

    if (options?.strict) {
      for (const key in v) {
        // @ts-expect-error suppress
        if (!shape[key]) {
          dev_log(isShape, `encountered unknown key "${key}"`, v);
          return false;
        }
      }
    }

    dev_log_end(isShape);
    return true;
  };
}
