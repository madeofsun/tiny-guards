import { isNull } from "./is-null.js";
import { isUndefined } from "./is-undefined.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export function nullish<T>(guard: Guard<T>) {
  return or(isUndefined, isNull, guard);
}
