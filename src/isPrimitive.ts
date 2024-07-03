import { isBigInt } from "./isBigInt.js";
import { isBoolean } from "./isBoolean.js";
import { isNull } from "./isNull.js";
import { isNumber } from "./isNumber.js";
import { isString } from "./isString.js";
import { isSymbol } from "./isSymbol.js";
import { isUndefined } from "./isUndefined.js";

export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null;

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 */
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
