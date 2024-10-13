import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, WithError } from "./types.js";

export function tuple(): WithError<Guard<[]>>;

export function tuple<T1>(guard1: Guard<T1>): WithError<Guard<[T1]>>;

export function tuple<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): WithError<Guard<[T1, T2]>>;

export function tuple<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): WithError<Guard<[T1, T2, T3]>>;

export function tuple<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): WithError<Guard<[T1, T2, T3, T4]>>;

export function tuple<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): WithError<Guard<[T1, T2, T3, T4, T5]>>;

export function tuple<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): WithError<Guard<[T1, T2, T3, T4, T5, T6]>>;

export function tuple<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): WithError<Guard<[T1, T2, T3, T4, T5, T6, T7]>>;

export function tuple<T extends unknown[]>(
  ...guards: readonly Guard<unknown>[]
): WithError<Guard<T>> {
  function isTuple(v: unknown): v is T {
    context.track();

    if (!Array.isArray(v)) {
      return context.block(isTuple, `value is not array`);
    }

    if (v.length !== guards.length) {
      return context.block(isTuple, `tuple length must be "${guards.length}"`);
    }

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      const item = v[i];
      if (!guard(item)) {
        return context.block(
          isTuple,
          `item at index "${i}" is blocked by guard "${fnName(guard)}"`
        );
      }
    }

    return context.pass();
  }

  return context.withError(isTuple, "tuple");
}
