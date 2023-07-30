import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard, type Narrowing } from "./types";

export default function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrowing: Narrowing<T1, T2>
): Guard<T2> {
  return function isNarrowing(v: unknown): v is T2 {
    dev_debug_start(isNarrowing);

    if (!guard(v)) {
      dev_debug(isNarrowing, `guard failed`, v);
      return false;
    }

    if (!narrowing(v)) {
      dev_debug(isNarrowing, `narrowing failed`, v);
      return false;
    }

    dev_debug_end(isNarrowing);
    return true;
  };
}
