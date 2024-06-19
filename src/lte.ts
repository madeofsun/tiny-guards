import type { Refinement } from "./types.js";

export function lte(bound: number): Refinement<number> {
  return function isLte(v) {
    return v <= bound;
  };
}
