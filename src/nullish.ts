import { isNull, isUndefined } from "./guards.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export const nullish = <T>(guard: Guard<T>) => or(isUndefined, isNull, guard);
