import isString from "../src/isString";
import nullable from "../src/nullable";

test(nullable.name, () => {
  const isNullOrString = nullable(isString);
  expect(isNullOrString("abc")).toBe(true);
  expect(isNullOrString("")).toBe(true);
  expect(isNullOrString(null)).toBe(true);
  expect(isNullOrString(0)).toBe(false);
});
