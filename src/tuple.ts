import type { Guard } from "./types.js";

export function tuple<T1, T2>(
  guard1: Guard<T1>,
  guard2: Guard<T2>
): Guard<[T1, T2]>;

export function tuple<T1, T2, T3>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>
): Guard<[T1, T2, T3]>;

export function tuple<T1, T2, T3, T4>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>
): Guard<[T1, T2, T3, T4]>;

export function tuple<T1, T2, T3, T4, T5>(
  guard1: Guard<T1>,
  guard2: Guard<T2>,
  guard3: Guard<T3>,
  guard4: Guard<T4>,
  guard5: Guard<T5>
): Guard<[T1, T2, T3, T4, T5]>;

export function tuple<T extends unknown[]>(
  ...guards: readonly Guard<unknown>[]
): Guard<T> {
  return (v: unknown): v is T => {
    return Array.isArray(v) && guards.every((g, index) => g(v[index]));
  };
}
