import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function len(length: number): Refinement<{ length: number }> {
  return p("len", (v) => v.length === length);
}
