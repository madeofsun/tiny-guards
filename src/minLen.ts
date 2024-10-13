import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function minLen(length: number): Refinement<{ length: number }> {
  return p("minLen", (v) => v.length >= length);
}
