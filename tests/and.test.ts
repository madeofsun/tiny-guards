import { and } from "../src/and";
import { isString } from "../src/isString";
import { isNumber } from "../src/isNumber";
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

  expect(isAB.name).toBe("and");

  expect(() => {
    isAB(1);
    throw isAB.error;
  }).toThrow("validation failed\n[and]");
});
