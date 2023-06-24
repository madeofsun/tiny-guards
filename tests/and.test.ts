import { and } from "../src/and";
import { isNumber, isString } from "../src/guards";
import { shape } from "../src/shape";

test(and.name, () => {
  const isAB = and(
    shape({
      a: isNumber,
    }),
    shape({
      b: isString,
    })
  );
  expect(isAB({ a: 1, b: "b" })).toBe(true);
  expect(isAB({ a: 1 })).toBe(false);
  expect(isAB({ b: "b" })).toBe(false);
  expect(isAB({})).toBe(false);
});
