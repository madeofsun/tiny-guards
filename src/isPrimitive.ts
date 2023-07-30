import isBigInt from "./isBigInt";
import isBoolean from "./isBoolean";
import isNull from "./isNull";
import isNumber from "./isNumber";
import isString from "./isString";
import isSymbol from "./isSymbol";
import isUndefined from "./isUndefined";
import { Primitive } from "./types";

export default function isPrimitive(v: unknown): v is Primitive {
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
