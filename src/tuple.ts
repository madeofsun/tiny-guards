import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard } from "./types";

export default function tuple<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<[T1, T2]>;

export default function tuple<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<[T1, T2, T3]>;

export default function tuple<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<[T1, T2, T3, T4]>;

export default function tuple<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<[T1, T2, T3, T4, T5]>;

export default function tuple(): never;

export default function tuple<T extends unknown[]>(
  ...guards: readonly Guard<unknown>[]
): Guard<T> {
  return function isTuple(v: unknown): v is T {
    dev_debug_start(isTuple);

    if (!Array.isArray(v)) {
      dev_debug(isTuple, `failed - value is not array`, v);
      return false;
    }

    if (v.length !== guards.length) {
      dev_debug(isTuple, `failed - tuple length must be ${guards.length}`, v);
      return false;
    }

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      const item = v[i];
      if (!guard(item)) {
        dev_debug(isTuple, `guard failed at index ${i}`, item);
        return false;
      }
    }

    dev_debug_end(isTuple);
    return true;
  };
}
