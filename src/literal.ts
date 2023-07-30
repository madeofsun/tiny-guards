import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard } from "./types";

export default function literal<T>(literal: T): Guard<T> {
  return function isLiteral(v: unknown): v is T {
    dev_debug_start(isLiteral);

    if (v === literal) {
      dev_debug_end(isLiteral);
      return true;
    }

    dev_debug(isLiteral, `failed`, v);
    return false;
  };
}
