import { AnyFunction } from "./types.js";

export function isFunction<T extends AnyFunction>(v: unknown): v is T {
  return typeof v === "function";
}
