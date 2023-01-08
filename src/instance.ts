import type { Guard } from "./types.js";

export function instance<T>(c: abstract new (...args: any[]) => T): Guard<T> {
  return (v: unknown): v is T => v instanceof c;
}
