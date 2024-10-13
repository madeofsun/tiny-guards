import { setFnName } from "./internal/utils/fn-name.js";
import type { Predicate } from "./types.js";

export function p<T extends Predicate>(name: string, fn: T): T {
  setFnName(fn, name);

  return fn;
}
