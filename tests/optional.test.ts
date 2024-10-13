import { optional } from "../src/optional";
import { isString } from "../src/isString";

test(optional.name, () => {
  const isOptional = optional(isString);
  expect(isOptional("abc")).toBe(true);
  expect(isOptional("")).toBe(true);
  expect(isOptional(undefined)).toBe(true);
  expect(isOptional(null)).toBe(false);
  expect(isOptional(0)).toBe(false);

  expect(isOptional.name).toBe("or(isUndefined,isString)");
});
