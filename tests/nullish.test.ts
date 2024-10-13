import { isString } from "../src/isString";
import { nullish } from "../src/nullish";

test(nullish.name, () => {
  const isNullish = nullish(isString);
  expect(isNullish("abc")).toBe(true);
  expect(isNullish("")).toBe(true);
  expect(isNullish(null)).toBe(true);
  expect(isNullish(undefined)).toBe(true);
  expect(isNullish(0)).toBe(false);

  expect(isNullish.name).toBe("or(isUndefined,isNull,isString)");
});
