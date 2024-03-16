import type {Refinement} from "./types.js";

export default function gte(bound: number): Refinement<number> {
  return function isGte(v) {
    return v >= bound;
  };
}
