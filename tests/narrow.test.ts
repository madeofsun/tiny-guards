import { narrow } from "../src/narrow";
import { isString } from "../src/is-string";
import { startsWith } from "../src/starts-with";

test(narrow.name, () => {
  const isNarrow = narrow(isString, startsWith("$"));

  expect(isNarrow("abc")).toBe(false);
  expect(isNarrow("$abc")).toBe(true);
  expect(isNarrow("")).toBe(false);
  expect(isNarrow(1)).toBe(false);
});
