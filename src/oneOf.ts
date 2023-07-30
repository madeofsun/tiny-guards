import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { type Guard } from "./types";

export default function oneOf<T>(values: T[]): Guard<T> {
  const set = new Set<unknown>(values);
  return function isOneOf(v: unknown): v is T {
    dev_debug_start(isOneOf);

    if (!set.has(v)) {
      dev_debug(isOneOf, `failed`, v);
      return false;
    }

    dev_debug_end(isOneOf);
    return true;
  };
}
