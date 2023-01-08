import { isNull } from "./guards.js";
import { or } from "./or.js";
import type { Guard } from "./types.js";

export const nullable = <T>(guard: Guard<T>) => or(isNull, guard);
