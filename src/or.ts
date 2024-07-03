import { complexGuard, context } from "./internal/context.js";
import type { ComplexGuard, Guard } from "./types.js";

export function or(): never;

export function or<T1>(guard1: Guard<T1>): ComplexGuard<T1>;

export function or<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): ComplexGuard<T1 | T2>;

export function or<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): ComplexGuard<T1 | T2 | T3>;

export function or<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): ComplexGuard<T1 | T2 | T3 | T4>;

export function or<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): ComplexGuard<T1 | T2 | T3 | T4 | T5>;

export function or<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): ComplexGuard<T1 | T2 | T3 | T4 | T5 | T6>;

export function or<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): ComplexGuard<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

export function or(
  ...guards: readonly Guard<unknown>[]
): ComplexGuard<unknown> {
  return complexGuard(function isOr(v: unknown): v is unknown {
    context.track();

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      if (guard(v)) {
        return context.pass();
      }
    }

    return context.block(isOr, `value is blocked by all guards`, v);
  });
}
