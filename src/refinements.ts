import type { Refinement } from "./types";

export function gt(bound: number): Refinement<number> {
  return function isGt(v) {
    return v > bound;
  };
}

export function gte(bound: number): Refinement<number> {
  return function isGte(v) {
    return v >= bound;
  };
}

export function lt(bound: number): Refinement<number> {
  return function isLt(v) {
    return v < bound;
  };
}

export function lte(bound: number): Refinement<number> {
  return function isLte(v) {
    return v <= bound;
  };
}

export function len(len: number): Refinement<{ length: number }> {
  return function isLen(v) {
    return v.length === len;
  };
}

export function minLen(len: number): Refinement<{ length: number }> {
  return function isMinLen(v) {
    return v.length >= len;
  };
}

export function maxLen(len: number): Refinement<{ length: number }> {
  return function isMaxLen(v) {
    return v.length <= len;
  };
}
