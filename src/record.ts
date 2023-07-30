import {
  dev_debug,
  dev_debug_end,
  dev_debug_start,
} from "./internal/dev_debug";
import { Guard, Narrowing } from "./types";

export default function record<K extends string, V>(
  key: Narrowing<string, K>,
  value: Guard<V>
): Guard<Record<K, V>> {
  return function isRecord(v): v is Record<K, V> {
    dev_debug_start(isRecord);

    if (typeof v !== "object" || v === null) {
      dev_debug(
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
        dev_debug(isRecord, `key guard failed at key "${_key}"`, _key);
        return false;
      }
      // @ts-expect-error suppress
      const _value = v[_key];
      if (!value(_value)) {
        dev_debug(isRecord, `value guard failed at key "${_key}"`, _value);
        return false;
      }
    }

    dev_debug_end(isRecord);
    return true;
  };
}
