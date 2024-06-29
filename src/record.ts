import { context } from "./internal/context.js";
import type { Guard, Narrowing } from "./types.js";

export function record<K extends string, V>(
  key: Narrowing<string, K>,
  value: Guard<V>
): Guard<Record<K, V>> {
  return function isRecord(v): v is Record<K, V> {
    context.track();

    if (typeof v !== "object" || v === null) {
      context.block(
        isRecord,
        v === null
          ? `failed - value is "null"`
          : `failed - typeof value is not "object"`,
        v
      );
      return false;
    }

    for (const _key in v) {
      if (!key(_key)) {
        context.block(isRecord, `key guard failed at key "${_key}"`, _key);
        return false;
      }
      // @ts-expect-error suppress
      const _value = v[_key];
      if (!value(_value)) {
        context.block(isRecord, `value guard failed at key "${_key}"`, _value);
        return false;
      }
    }

    context.pass();
    return true;
  };
}
