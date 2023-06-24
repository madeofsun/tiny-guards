import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import type { Guard, Narrowing } from "./types";

export function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrow: Narrowing<T1, T2>
): Guard<T2> {
  return function isNarrowing(v: unknown): v is T2 {
    dev_debug_start(isNarrowing);

    if (!guard(v)) {
      dev_debug`${isNarrowing} guard failed - value: ${v}`;
      return false;
    }

    if (!narrow(v)) {
      dev_debug`${isNarrowing} narrow failed - value: ${v}`;
      return false;
    }

    dev_debug_end(isNarrowing);
    return true;
  };
}
