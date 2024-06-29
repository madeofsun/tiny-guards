import { context } from "./internal/context.js";
import type { Guard, Narrowing } from "./types.js";

export function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrowing: Narrowing<T1, T2>
): Guard<T2> {
  return function isNarrowing(v: unknown): v is T2 {
    context.track();

    if (!guard(v)) {
      return context.block(
        isNarrowing,
        `value blocked by guard "${guard.name}"`,
        v
      );
    }

    if (!narrowing(v)) {
      return context.block(
        isNarrowing,
        `value is blocked by narrowing "${narrowing.name}"`,
        v
      );
    }

    return context.pass();
  };
}
