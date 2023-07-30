import { type Refinement } from "./types";

export default function lte(bound: number): Refinement<number> {
  return function isLte(v) {
    return v <= bound;
  };
}
