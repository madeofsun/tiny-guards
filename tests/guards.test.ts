import * as guards from "../src/guards";

describe("guards", () => {
  const tests = [
    [guards.isNull, [null]],
    [guards.isUndefined, [undefined]],
    [guards.isBoolean, [true, false]],
    [guards.isNumber, [0, 1, -1, 1.2]],
    [guards.isString, ["", "str"]],
    [guards.isObject, [{}, { a: "a" }]],
    [
      guards.isFunction,
      [
        () => null,
        function () {
          return null;
        },
      ],
    ],
    [guards.isSymbol, [Symbol()]],
    [guards.isBigInt, [0n, 100n]],
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
