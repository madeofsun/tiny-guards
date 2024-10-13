import { p } from "./p.js";
import type { Refinement } from "./types.js";

export function lte(bound: number): Refinement<number> {
  return p("lte", (v) => v <= bound);
}
