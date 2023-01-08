import type { Guard, Primitive } from "./types.js";

export function literal<T extends Primitive>(literal: T): Guard<T> {
  return (v: unknown): v is T => v === literal;
}
