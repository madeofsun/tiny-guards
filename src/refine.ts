import { complexGuard, context } from "./internal/context.js";
import { fnName } from "./internal/utils.js";
import type { ComplexGuard, Guard, Refinement } from "./types.js";

export function refine<T>(
  guard: Guard<T>,
  ...refinements: readonly Refinement<T>[]
): ComplexGuard<T> {
  return complexGuard(function isRefinement(v: unknown): v is T {
    context.track();

    if (!guard(v)) {
      return context.block(
        isRefinement,
        `value is blocked by guard "${fnName(guard)}"`,
        v
      );
    }

    for (let i = 0; i < refinements.length; i++) {
      const refinement = refinements[i]!;
      if (!refinement(v)) {
        return context.block(
          isRefinement,
          `value is blocked by refinement "${fnName(refinement)}" (index "${i}")`,
          v
        );
      }
    }

    return context.pass();
  });
}
