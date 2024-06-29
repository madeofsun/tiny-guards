import { isBigInt } from "./is-big-int.js";
import { isBoolean } from "./is-boolean.js";
import { isNull } from "./is-null.js";
import { isNumber } from "./is-number.js";
import { isString } from "./is-string.js";
import { isSymbol } from "./is-symbol.js";
import { isUndefined } from "./is-undefined.js";

// https://developer.mozilla.org/en-US/docs/Glossary/Primitive
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null;

export function isPrimitive(v: unknown): v is Primitive {
  return (
    isString(v) ||
    isNumber(v) ||
    isBigInt(v) ||
    isBoolean(v) ||
    isUndefined(v) ||
    isSymbol(v) ||
    isNull(v)
  );
}
