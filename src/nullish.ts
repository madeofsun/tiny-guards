import isNull from "./isNull";
import isUndefined from "./isUndefined";
import or from "./or";
import { type Guard } from "./types";

export default function nullish<T>(guard: Guard<T>) {
  return or(isUndefined, isNull, guard);
}
