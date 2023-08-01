import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log";
import { type Guard, type Narrowing } from "./types";

export default function narrow<T1, T2 extends T1>(
  guard: Guard<T1>,
  narrowing: Narrowing<T1, T2>
): Guard<T2> {
  return function isNarrowing(v: unknown): v is T2 {
    dev_log_start(isNarrowing);

    if (!guard(v)) {
      dev_log(isNarrowing, `guard failed`, v);
      return false;
    }

    if (!narrowing(v)) {
      dev_log(isNarrowing, `narrowing failed`, v);
      return false;
    }

    dev_log_end(isNarrowing);
    return true;
  };
}
