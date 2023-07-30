import { type Refinement } from "./types";

export default function gte(bound: number): Refinement<number> {
  return function isGte(v) {
    return v >= bound;
  };
}
