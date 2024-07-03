import type { Guard } from "./types.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<T> = abstract new (...args: any[]) => T;

export function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    return v instanceof c;
  };
}
