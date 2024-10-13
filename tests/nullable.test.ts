import { isString } from "../src/isString";
import { nullable } from "../src/nullable";

test(nullable.name, () => {
  const isNullable = nullable(isString);
  expect(isNullable("abc")).toBe(true);
  expect(isNullable("")).toBe(true);
  expect(isNullable(null)).toBe(true);
  expect(isNullable(0)).toBe(false);

  expect(isNullable.name).toBe("or(isNull,isString)");
});
