import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, Refinement, WithError } from "./types.js";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: readonly Refinement<T>[]
): WithError<Guard<T>> {
  function isRefinement(v: unknown): v is T {
    context.track();

    if (!guard(v)) {
      return context.block(
        isRefinement,
        `value is blocked by guard "${fnName(guard)}"`
      );
    }

    for (let i = 0; i < refinements.length; i++) {
      const refinement = refinements[i]!;
      if (!refinement(v)) {
        return context.block(
          isRefinement,
          `value is blocked by refinement "${fnName(refinement)}" (index "${i}")`
        );
      }
    }

    return context.pass();
  }

  return context.withError(isRefinement, "refine");
}
