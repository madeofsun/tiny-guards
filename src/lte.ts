import type {Refinement} from "./types.js";

export default function lte(bound: number): Refinement<number> {
  return function isLte(v) {
    return v <= bound;
  };
}
