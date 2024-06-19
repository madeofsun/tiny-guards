import { isBigInt } from "../src/isBigInt";
import { isBoolean } from "../src/isBoolean";
import { isFunction } from "../src/isFunction";
import { isNull } from "../src/isNull";
import { isNumber } from "../src/isNumber";
import { isObject } from "../src/isObject";
import { isString } from "../src/isString";
import { isSymbol } from "../src/isSymbol";
import { isUndefined } from "../src/isUndefined";

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
