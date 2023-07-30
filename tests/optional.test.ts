import optional from "../src/optional";
import isString from "../src/isString";

test(optional.name, () => {
  const isUndefinedOrString = optional(isString);
  expect(isUndefinedOrString("abc")).toBe(true);
  expect(isUndefinedOrString("")).toBe(true);
  expect(isUndefinedOrString(undefined)).toBe(true);
  expect(isUndefinedOrString(null)).toBe(false);
  expect(isUndefinedOrString(0)).toBe(false);
});
