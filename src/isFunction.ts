import { AnyFunction } from "./types";

export default function isFunction<T extends AnyFunction>(v: unknown): v is T {
  return typeof v === "function";
}
