import type { Guard } from "./types.js";

export function literal<T>(literal: T): Guard<T> {
  return function isLiteral(v: unknown): v is T {
    return v === literal;
  };
}
