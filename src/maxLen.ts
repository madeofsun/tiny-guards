import type {Refinement} from "./types.js";

export default function maxLen(len: number): Refinement<{ length: number }> {
  return function isMaxLen(v) {
    return v.length <= len;
  };
}
