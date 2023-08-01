import { dev_log, dev_log_end, dev_log_start } from "./internal/dev_log";
import { type Guard } from "./types";

export default function literal<T>(literal: T): Guard<T> {
  return function isLiteral(v: unknown): v is T {
    dev_log_start(isLiteral);

    if (v === literal) {
      dev_log_end(isLiteral);
      return true;
    }

    dev_log(isLiteral, `failed`, v);
    return false;
  };
}
