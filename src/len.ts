import type { Refinement } from "./types.js";

export function len(len: number): Refinement<{ length: number }> {
  return function isLen(v) {
    return v.length === len;
  };
}
