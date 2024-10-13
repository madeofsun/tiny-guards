import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, Shape, WithError } from "./types.js";

export function shape<T extends object>(
  shape: Shape<T>,
  options?: { strict?: boolean }
): WithError<Guard<T>> {
  function isShape(v: unknown): v is T {
    context.track();

    if (v === null) {
      return context.block(isShape, `value is "null"`);
    }

    if (typeof v !== "object" && typeof v !== "function") {
      return context.block(
        isShape,
        `value is not of type "object" or "function"`
      );
    }

    for (const key in shape) {
      const guard: Guard<unknown> = shape[key];
      // @ts-expect-error suppress
      const value: unknown = v[key];
      if (!guard(value)) {
        return context.block(
          isShape,
          `value at key "${key}" is blocked by guard "${fnName(guard)}"`
        );
      }
    }

    if (options?.strict) {
      for (const key in v) {
        if (key in shape === false) {
          return context.block(isShape, `unknown key "${key}"`);
        }
      }
    }

    return context.pass();
  }

  return context.withError(isShape, "shape");
}
