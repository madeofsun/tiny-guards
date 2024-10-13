import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function maxLen(length: number): Refinement<{ length: number }> {
  return p("maxLen", (v) => v.length <= length);
}
