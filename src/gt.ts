import type {Refinement} from "./types.js";

export default function gt(bound: number): Refinement<number> {
  return function isGt(v) {
    return v > bound;
  };
}
