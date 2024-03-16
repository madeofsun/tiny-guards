import type {Refinement} from "./types.js";

export default function lt(bound: number): Refinement<number> {
  return function isLt(v) {
    return v < bound;
  };
}
