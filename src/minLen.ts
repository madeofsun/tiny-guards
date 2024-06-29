import type { Refinement } from "./types.js";

export function minLen(len: number): Refinement<{ length: number }> {
  return function isMinLen(v) {
    return v.length >= len;
  };
}
