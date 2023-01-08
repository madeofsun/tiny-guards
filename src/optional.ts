import { isUndefined } from "./guards.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export const optional = <T>(guard: Guard<T>) => or(isUndefined, guard);
