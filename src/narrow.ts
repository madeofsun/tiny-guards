import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, Narrowing, WithError } from "./types.js";

export function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrowing: Narrowing<T1, T2>
): WithError<Guard<T2>> {
  function isNarrowing(v: unknown): v is T2 {
    if (!guard(v)) {
      return context.block(
        isNarrowing,
        `value is blocked by narrowing "${fnName(narrowing)}"`
      );
    }

    if (!narrowing(v)) {
      return context.block(
        isNarrowing,
        `value is blocked by narrowing "${fnName(narrowing)}"`
      );
    }

    return true;
  }

  return context.withError(isNarrowing, "narrow");
}
