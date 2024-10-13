import { p } from "./p.js";
import type { Narrowing } from "./types.js";

export function startsWith<T extends string>(
  prefix: T
): Narrowing<string, `${T}${string}`> {
  return p("startsWith", (v): v is `${T}${string}` => v.startsWith(prefix));
}
