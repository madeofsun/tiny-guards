import { context } from "./internal/context.js";
import type { Guard } from "./types.js";

export type Shape<S extends object> = {
  [P in keyof S]: Guard<S[P]>;
};

export function shape<T extends object>(
  shape: Shape<T>,
  options?: { exact?: boolean }
): Guard<T> {
  return function isShape(v: unknown): v is T {
    context.track();

    if (v === null) {
      return context.block(isShape, `value is "null"`, v);
    }

    if (typeof v !== "object" && typeof v !== "function") {
      return context.block(
        isShape,
        `type of value is not "object" or "function" - ${typeof v}`,
        v
      );
    }

    for (const key in shape) {
      const guard: Guard<unknown> = shape[key];
      // @ts-expect-error suppress
      const value: unknown = v[key];
      if (!guard(value)) {
        return context.block(
          isShape,
          `block at key "${key}" - guard "${guard.name}"`,
          v
        );
      }
    }

    if (options?.exact) {
      for (const key in v) {
        if (key in shape === false) {
          return context.block(isShape, `unknown key "${key}"`, v);
        }
      }
    }

    return context.pass();
  };
}
