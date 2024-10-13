import { isUndefined } from "./isUndefined.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export function optional<T>(guard: Guard<T>) {
  return or(isUndefined, guard);
}
