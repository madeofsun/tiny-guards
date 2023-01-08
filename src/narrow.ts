import type { Guard } from "./types.js";

export type Narrow<T1, T2 extends T1> = (v: T1) => v is T2;

export const narrow = <T1, T2 extends T1>(
  guard: Guard<T1>,
  narrow: Narrow<T1, T2>
): Guard<T2> => {
  return (v: unknown): v is T2 => guard(v) && narrow(v);
};
