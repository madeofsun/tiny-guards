import { isBigInt } from "../src/is-big-int";
import { isBoolean } from "../src/is-boolean";
import { isFunction } from "../src/is-function";
import { isNull } from "../src/is-null";
import { isNumber } from "../src/is-number";
import { isObject } from "../src/is-object";
import { isString } from "../src/is-string";
import { isSymbol } from "../src/is-symbol";
import { isUndefined } from "../src/is-undefined";

describe("guards", () => {
  const tests = [
    [isNull, [null]],
    [isUndefined, [undefined]],
    [isBoolean, [true, false]],
    [isNumber, [0, 1, -1, 1.2]],
    [isString, ["", "str"]],
    [isObject, [{}, { a: "a" }]],
    [
      isFunction,
      [
        () => null,
        function () {
          return null;
        },
      ],
    ],
    [isSymbol, [Symbol()]],
    [isBigInt, [0n, 100n]],
  ] as const;

  const cases = tests.map(([, cases]) => cases as readonly unknown[]);

  for (const [guard] of tests) {
    test(guard.name, () => {
      const guardIndex = tests.findIndex(([g]) => g === guard);
      for (const v of cases) {
        if (v === cases[guardIndex]) {
          expect(v.every((v) => guard(v))).toBe(true);
        } else {
          expect(v.every((v) => !guard(v))).toBe(true);
        }
      }
    });
  }
});
