import isUndefined from "./isUndefined";
import or from "./or";
import { type Guard } from "./types";

export default function optional<T>(guard: Guard<T>) {
  return or(isUndefined, guard);
}
