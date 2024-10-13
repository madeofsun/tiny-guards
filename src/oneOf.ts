import { p } from "./p.js";
import type { Guard, Primitive } from "./types.js";

export function oneOf<T extends Primitive>(values: readonly T[]): Guard<T> {
  const set = new Set<unknown>(values);

  return p("oneOf", (v: unknown): v is T => set.has(v));
}
