import { isUndefined } from "./guards";
import { or } from "./or";
import type { Guard } from "./types";

export function optional<T>(guard: Guard<T>) {
  return or(isUndefined, guard);
}
