import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log.js";
import type {Guard} from "./types.js";

export default function oneOf<T>(values: T[]): Guard<T> {
  const set = new Set<unknown>(values);
  return function isOneOf(v: unknown): v is T {
    dev_log_start(isOneOf);

    if (!set.has(v)) {
      dev_log(isOneOf, `failed`, v);
      return false;
    }

    dev_log_end(isOneOf);
    return true;
  };
}
