import { tracker } from "./internal/tracker.js";
import type { Guard } from "./types.js";

export function literal<T>(literal: T): Guard<T> {
  return function isLiteral(v: unknown): v is T {
    tracker.track();

    if (v === literal) {
      return tracker.pass();
    }

    return tracker.block(isLiteral, `failed`, v);
  };
}
