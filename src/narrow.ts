import { tracker } from "./internal/tracker.js";
import type { Guard, Narrowing } from "./types.js";

export function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrowing: Narrowing<T1, T2>
): Guard<T2> {
  return function isNarrowing(v: unknown): v is T2 {
    tracker.track();

    if (!guard(v)) {
      return tracker.block(isNarrowing, `guard failed`, v);
    }

    if (!narrowing(v)) {
      return tracker.block(isNarrowing, `narrowing failed`, v);
    }

    return tracker.pass();
  };
}
