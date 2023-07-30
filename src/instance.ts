import {
  dev_debug,
  dev_debug_start,
  dev_debug_end,
} from "./internal/dev_debug";
import { type AnyConstructor, type Guard } from "./types";

export default function instance<T>(c: AnyConstructor<T>): Guard<T> {
  return function isInstanceOf(v: unknown): v is T {
    dev_debug_start(isInstanceOf);

    if (v instanceof c) {
      dev_debug_end(isInstanceOf);
      return true;
    }

    dev_debug(isInstanceOf, `failed`, v);
    return false;
  };
}
