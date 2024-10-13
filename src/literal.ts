import { p } from "./p.js";
import type { Guard, Primitive } from "./types.js";

export function literal<T extends Primitive>(literal: T): Guard<T> {
  return p("literal", (v: unknown): v is T => v === literal);
}
