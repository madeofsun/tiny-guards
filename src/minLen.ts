import { type Refinement } from "./types";

export default function minLen(len: number): Refinement<{ length: number }> {
  return function isMinLen(v) {
    return v.length >= len;
  };
}
