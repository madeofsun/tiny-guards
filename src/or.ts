import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import type { Guard } from "./types";

export function or<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<T1 | T2>;

export function or<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<T1 | T2 | T3>;

export function or<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<T1 | T2 | T3 | T4>;

export function or<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<T1 | T2 | T3 | T4 | T5>;

export function or<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): Guard<T1 | T2 | T3 | T4 | T5 | T6>;

export function or<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): Guard<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

export function or(...guards: Guard<unknown>[]): Guard<unknown> {
  return function isOr(v: unknown): v is unknown {
    dev_debug_start(isOr);

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      if (guard(v)) {
        dev_debug_end(isOr);
        return true;
      }
    }

    dev_debug`${isOr} failed - value: ${v}`;
    return false;
  };
}
