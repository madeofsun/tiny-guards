import { context } from "./internal/context.js";
import { fnName } from "./internal/utils/fn-name.js";
import type { Guard, Narrowing, WithError } from "./types.js";

export function record<K extends string, V>(
  keyGuard: Narrowing<string, K>,
  valueGuard: Guard<V>
): WithError<Guard<Record<K, V>>> {
  function isRecord(v: unknown): v is Record<K, V> {
    context.track();

    if (v === null) {
      return context.block(isRecord, `value is "null"`);
    }

    if (typeof v !== "object" || v === null) {
      return context.block(isRecord, `value is not of type "object"`);
    }

    for (const key in v) {
      if (!keyGuard(key)) {
        return context.block(
          isRecord,
          `key "${key}" is blocked by guard "${fnName(keyGuard)}"`
        );
      }
      // @ts-expect-error suppress
      const value = v[key];
      if (!valueGuard(value)) {
        return context.block(
          isRecord,
          `value at key "${key}" is blocked by guard "${fnName(valueGuard)}"`
        );
      }
    }

    return context.pass();
  }

  return context.withError(isRecord, "record");
}
