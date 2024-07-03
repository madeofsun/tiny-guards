import { complexGuard, context } from "./internal/context.js";
import { fnName } from "./internal/utils.js";
import type { ComplexGuard, Guard, Narrowing } from "./types.js";

export function record<K extends string, V>(
  keyGuard: Narrowing<string, K>,
  valueGuard: Guard<V>
): ComplexGuard<Record<K, V>> {
  return complexGuard(function isRecord(v): v is Record<K, V> {
    context.track();

    if (v === null) {
      return context.block(isRecord, `value is "null"`, v);
    }

    if (typeof v !== "object" || v === null) {
      return context.block(isRecord, `value is not of type "object"`, v);
    }

    for (const key in v) {
      if (!keyGuard(key)) {
        return context.block(
          isRecord,
          `key "${key}" is blocked by guard "${fnName(keyGuard)}"`,
          key
        );
      }
      // @ts-expect-error suppress
      const value = v[key];
      if (!valueGuard(value)) {
        return context.block(
          isRecord,
          `value at key "${key}" is blocked by guard "${fnName(valueGuard)}"`,
          value
        );
      }
    }

    return context.pass();
  });
}
