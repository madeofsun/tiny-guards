import { dev_log, dev_log_start, dev_log_end } from "./internal/dev_log";
import { type AnyConstructor, type Guard } from "./types";

export default function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    dev_log_start(isInstanceOf);

    if (v instanceof c) {
      dev_log_end(isInstanceOf);
      return true;
    }

    dev_log(isInstanceOf, `failed`, v);
    return false;
  };
}
