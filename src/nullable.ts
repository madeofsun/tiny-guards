import isNull from "./isNull";
import or from "./or";
import { type Guard } from "./types";

export default function nullable<T>(guard: Guard<T>) {
  return or(isNull, guard);
}
