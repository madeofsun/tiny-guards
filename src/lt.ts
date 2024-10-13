import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function lt(bound: number): Refinement<number> {
  return p("lt", (v) => v < bound);
}
