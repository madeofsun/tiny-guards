import { isBigInt } from "./isBigInt.js";
import { isBoolean } from "./isBoolean.js";
import { isNull } from "./isNull.js";
import { isNumber } from "./isNumber.js";
import { isString } from "./isString.js";
import { isSymbol } from "./isSymbol.js";
import { isUndefined } from "./isUndefined.js";
import { Primitive } from "./types.js";

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
