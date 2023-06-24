import {
  dev_debug,
  dev_debug_start,
  dev_debug_end,
} from "./internal/dev_debug";
import type { Guard } from "./types";

export function instance<T>(c: abstract new (...args: any[]) => T): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    dev_debug_start(isInstanceOf);

    if (v instanceof c) {
      dev_debug_end(isInstanceOf);
      return true;
    }

    dev_debug`${isInstanceOf} failed - value: ${v}`;
    return false;
  };
}
