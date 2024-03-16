import isNull from "./isNull.js";
import isUndefined from "./isUndefined.js";
import or from "./or.js";
import type {Guard} from "./types.js";

export default function nullish<T>(guard: Guard<T>) {
  return or(isUndefined, isNull, guard);
}
