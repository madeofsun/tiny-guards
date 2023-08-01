import { type Refinement } from "./types";

export default function lt(bound: number): Refinement<number> {
  return function isLt(v) {
    return v < bound;
  };
}
