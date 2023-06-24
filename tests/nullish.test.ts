import { isString } from "../src/guards";
import { nullish } from "../src/nullish";

test(nullish.name, () => {
  const isNullOrString = nullish(isString);
  expect(isNullOrString("abc")).toBe(true);
  expect(isNullOrString("")).toBe(true);
  expect(isNullOrString(null)).toBe(true);
  expect(isNullOrString(undefined)).toBe(true);
  expect(isNullOrString(0)).toBe(false);
});
