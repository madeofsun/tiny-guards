import type { Predicate } from "../../types.js";

export const ANON_NAME = "anonymous";

export function fnName(fn: Predicate) {
  return fn.name || "anonymous";
}

export function setFnName(fn: Predicate, name: string) {
  Object.defineProperty(fn, "name", {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true,
  });
  return name;
}
