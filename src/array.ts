import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, Refinement, WithError } from "./types.js";

export function array<T>(
  guard?: Guard<T>,
  ...refinements: readonly Refinement<unknown[]>[]
): WithError<Guard<T[]>> {
  function isArray(v: unknown): v is T[] {
    context.track();

    if (!Array.isArray(v)) {
      return context.block(isArray, `value is not array`);
    }

    for (let i = 0; i < refinements.length; i++) {
      const refinement = refinements[i]!;
      if (!refinement(v)) {
        return context.block(
          isArray,
          `array is blocked by refinement "${fnName(refinement)}" (index "${i}")`
        );
      }
    }

    if (guard) {
      for (let i = 0; i < v.length; i++) {
        const item = v[i];
        if (!guard(item)) {
          return context.block(
            isArray,
            `item at index "${i}" is blocked by guard "${fnName(guard)}"`
          );
        }
      }
    }

    return context.pass();
  }

  return context.withError(isArray, "array");
}
