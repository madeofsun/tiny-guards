import type { Guard, WithError } from "./types.js";

export function asserts<T>(
  v: unknown,
  guard: WithError<Guard<T>>
): asserts v is T;
export function asserts<T>(
  v: unknown,
  guard: Guard<T>,
  message?: string
): asserts v is T;
export function asserts<T>(
  v: unknown,
  guard: Guard<T> | WithError<Guard<T>>,
  message?: string
): asserts v is T {
  const res = guard(v);
  if (!res) {
    if ("error" in guard) {
      throw guard.error;
    } else {
      throw new Error(message || `validation failed "${guard.name}"`);
    }
  }
}
