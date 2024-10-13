import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, WithError } from "./types.js";

export function or(): never;

export function or<T1>(guard1: Guard<T1>): WithError<Guard<T1>>;

export function or<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): WithError<Guard<T1 | T2>>;

export function or<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): WithError<Guard<T1 | T2 | T3>>;

export function or<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): WithError<Guard<T1 | T2 | T3 | T4>>;

export function or<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): WithError<Guard<T1 | T2 | T3 | T4 | T5>>;

export function or<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): WithError<Guard<T1 | T2 | T3 | T4 | T5 | T6>>;

export function or<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): WithError<Guard<T1 | T2 | T3 | T4 | T5 | T6 | T7>>;

export function or(
  ...guards: readonly Guard<unknown>[]
): WithError<Guard<unknown>> {
  function isOr(v: unknown): v is unknown {
    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      if (guard(v)) {
        return true;
      }
    }

    return context.block(isOr, `value is blocked by all guards`);
  }

  return context.withError(isOr, `or(${guards.map(fnName).join(",")})`);
}
