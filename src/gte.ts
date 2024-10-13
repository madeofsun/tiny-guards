import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function gte(bound: number): Refinement<number> {
  return p("gte", (v) => v >= bound);
}
