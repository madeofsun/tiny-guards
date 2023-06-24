import { isNull, isUndefined } from "./guards";
import { or } from "./or";
import type { Guard } from "./types";

export function nullish<T>(guard: Guard<T>) {
  return or(isUndefined, isNull, guard);
}
