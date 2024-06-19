import { tracker } from "./internal/tracker.js";
import type { Guard } from "./types.js";

export function tuple(): Guard<[]>;

export function tuple<T1>(guard1: Guard<T1>): Guard<[T1]>;

export function tuple<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<[T1, T2]>;

export function tuple<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<[T1, T2, T3]>;

export function tuple<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<[T1, T2, T3, T4]>;

export function tuple<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<[T1, T2, T3, T4, T5]>;

export function tuple<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): Guard<[T1, T2, T3, T4, T5, T6]>;

export function tuple<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): Guard<[T1, T2, T3, T4, T5, T6, T7]>;

export function tuple<T extends unknown[]>(
  ...guards: readonly Guard<unknown>[]
): Guard<T> {
  return function isTuple(v: unknown): v is T {
    tracker.track();

    if (!Array.isArray(v)) {
      return tracker.block(isTuple, `failed - value is not array`, v);
    }

    if (v.length !== guards.length) {
      return tracker.block(
        isTuple,
        `failed - tuple length must be ${guards.length}`,
        v
      );
    }

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      const item = v[i];
      if (!guard(item)) {
        return tracker.block(isTuple, `guard failed at index ${i}`, item);
      }
    }

    return tracker.pass();
  };
}
