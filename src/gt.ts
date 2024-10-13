import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function gt(bound: number): Refinement<number> {
  return p("gt", (v) => v > bound);
}
