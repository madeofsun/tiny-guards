import { tracker } from "./internal/tracker.js";
import type { Guard } from "./types.js";

export function oneOf<T>(values: T[]): Guard<T> {
  const set = new Set<unknown>(values);
  return function isOneOf(v: unknown): v is T {
    tracker.track();

    if (!set.has(v)) {
      tracker.block(isOneOf, `failed`, v);
      return false;
    }

    tracker.pass();
    return true;
  };
}
