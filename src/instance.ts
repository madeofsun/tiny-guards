import { tracker } from "./internal/tracker.js";
import type { AnyConstructor, Guard } from "./types.js";

export function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    tracker.track();

    if (v instanceof c) {
      tracker.pass();
      return true;
    }

    tracker.block(isInstanceOf, `failed`, v);
    return false;
  };
}
