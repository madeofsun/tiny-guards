import { isNull } from "./isNull.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export function nullable<T>(guard: Guard<T>) {
  return or(isNull, guard);
}
