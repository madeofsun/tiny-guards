import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log.js";
import type {Guard} from "./types.js";

export default function and<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<T1 & T2>;

export default function and<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<T1 & T2 & T3>;

export default function and<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<T1 & T2 & T3 & T4>;

export default function and<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<T1 & T2 & T3 & T4 & T5>;

export default function and<T1, T2, T3, T4, T5, T6>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>
): Guard<T1 & T2 & T3 & T4 & T5 & T6>;

export default function and<T1, T2, T3, T4, T5, T6, T7>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>,
  guard6: Guard<T6>,
  guard7: Guard<T7>
): Guard<T1 & T2 & T3 & T4 & T5 & T6 & T7>;

export default function and(...guards: Guard<unknown>[]): Guard<unknown> {
  return function isAnd(v: unknown): v is unknown {
    dev_log_start(isAnd);

    for (let i = 0; i < guards.length; i++) {
      if (!guards[i]!(v)) {
        dev_log(isAnd, `guard[${i}] failed`, v);

        return false;
      }
    }

    dev_log_end(isAnd);
    return true;
  };
}
