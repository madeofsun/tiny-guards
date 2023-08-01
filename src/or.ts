import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log";
import { type Guard } from "./types";

export default function or<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<T1 | T2>;

export default function or<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<T1 | T2 | T3>;

export default function or<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<T1 | T2 | T3 | T4>;

export default function or<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<T1 | T2 | T3 | T4 | T5>;

export default function or<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): Guard<T1 | T2 | T3 | T4 | T5 | T6>;

export default function or<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): Guard<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

export default function or(...guards: Guard<unknown>[]): Guard<unknown> {
  return function isOr(v: unknown): v is unknown {
    dev_log_start(isOr);

    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i]!;
      if (guard(v)) {
        dev_log_end(isOr);
        return true;
      }
    }

    dev_log(isOr, `all guards failed`, v);
    return false;
  };
}
