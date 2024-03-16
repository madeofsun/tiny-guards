import type {AnyFunction} from "./types.js";

export default function isFunction<T extends AnyFunction>(v: unknown): v is T {
  return typeof v === "function";
}
