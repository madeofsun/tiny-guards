import { p } from "./p.js";
import type { AnyConstructor, Guard } from "./types.js";

export function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return p("instance", (v: unknown): v is T => v instanceof c);
}
