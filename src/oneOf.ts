import type { Guard } from "./types.js";

export function oneOf<T>(values: T[]): Guard<T> {
  const set = new Set<unknown>(values);
  return function isOneOf(v: unknown): v is T {
    return set.has(v);
  };
}
