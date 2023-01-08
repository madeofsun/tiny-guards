import type { Guard, Primitive } from "./types.js";

export function oneOf<T extends Primitive>(values: T[]): Guard<T> {
  const set = new Set<unknown>(values);
  return (v: unknown): v is T => set.has(v);
}
