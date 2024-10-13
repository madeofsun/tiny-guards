import { p } from "./p.js";
import type { Narrowing } from "./types.js";

export function endsWith<T extends string>(
  suffix: T
): Narrowing<string, `${string}${T}`> {
  return p("endsWith", (v): v is `${string}${T}` => v.endsWith(suffix));
}
