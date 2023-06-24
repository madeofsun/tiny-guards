import { isNumber, isString } from "../src/guards";
import { or } from "../src/or";

test(or.name, () => {
  const isStringOrNumber = or(isString, isNumber);
  expect(isStringOrNumber("abc")).toBe(true);
  expect(isStringOrNumber("")).toBe(true);
  expect(isStringOrNumber(0)).toBe(true);
  expect(isStringOrNumber(-0)).toBe(true);
  expect(isStringOrNumber(null)).toBe(false);
  expect(isStringOrNumber(() => null)).toBe(false);
});
