import { isString } from "../src/isString";
import { startsWith } from "../src/startsWith";
import { record } from "../src/record";
import { fnName } from "../src/internal/utils/fn-name";

test(record.name, () => {
  const symbol = Symbol();
  const isRecord = record(startsWith("$"), isString);

  expect(isRecord({})).toBe(true);
  expect(isRecord(null)).toBe(false);
  expect(isRecord(() => null)).toBe(false);
  expect(isRecord("")).toBe(false);

  expect(isRecord({ $a: "a" })).toBe(true);
  expect(isRecord({ $a: 1 })).toBe(false);
  expect(isRecord({ $a: "a", b: "b" })).toBe(false);
  expect(isRecord({ [1]: "1" })).toBe(false);

  expect(isRecord({ [symbol]: "" })).toBe(true);
  expect(isRecord({ [symbol]: "", $a: "a" })).toBe(true);
  expect(isRecord({ [symbol]: "", a: "a" })).toBe(false);

  expect(fnName(isRecord)).toBe("record");
});
