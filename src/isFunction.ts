import { p } from "./p.js";
import type { AnyFunction } from "./types.js";

export const isFunction = p(
  "isFunction",
  <T extends AnyFunction>(v: unknown): v is T => typeof v === "function"
);
