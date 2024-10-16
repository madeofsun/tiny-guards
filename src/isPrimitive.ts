import { isBigInt } from "./isBigInt.js";
import { isBoolean } from "./isBoolean.js";
import { isNull } from "./isNull.js";
import { isNumber } from "./isNumber.js";
import { isString } from "./isString.js";
import { isSymbol } from "./isSymbol.js";
import { isUndefined } from "./isUndefined.js";
import { p } from "./p.js";
import type { Primitive } from "./types.js";

export const isPrimitive = p("isPrimitive", (v: unknown): v is Primitive => {
  return (
    isString(v) ||
    isNumber(v) ||
    isBigInt(v) ||
    isBoolean(v) ||
    isUndefined(v) ||
    isSymbol(v) ||
    isNull(v)
  );
});
