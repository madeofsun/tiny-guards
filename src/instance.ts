import type { AnyConstructor, Guard } from "./types.js";

export function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    return v instanceof c;
  };
}
