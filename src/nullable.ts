import { isNull } from "./guards";
import { or } from "./or";
import type { Guard } from "./types";

export function nullable<T>(guard: Guard<T>) {
  return or(isNull, guard);
}
