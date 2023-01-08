import type { Refinement } from "./types.js";

export const gt =
  (bound: number): Refinement<number> =>
  (v) =>
    v > bound;

export const gte =
  (bound: number): Refinement<number> =>
  (v) =>
    v >= bound;

export const lt =
  (bound: number): Refinement<number> =>
  (v) =>
    v < bound;

export const lte =
  (bound: number): Refinement<number> =>
  (v) =>
    v <= bound;

export const len =
  (len: number): Refinement<{ length: number }> =>
  (v) =>
    v.length === len;

export const minLen =
  (len: number): Refinement<{ length: number }> =>
  (v) =>
    v.length >= len;

export const maxLen =
  (len: number): Refinement<{ length: number }> =>
  (v) =>
    v.length <= len;
