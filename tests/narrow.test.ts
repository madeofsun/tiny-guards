import { narrow } from "../src/narrow";
import { isString } from "../src/guards";
import { startsWith } from "../src/narrowings";

test(narrow.name, () => {
  const isNarrow = narrow(isString, startsWith("$"));

  expect(isNarrow("abc")).toBe(false);
  expect(isNarrow("$abc")).toBe(true);
  expect(isNarrow("")).toBe(false);
  expect(isNarrow(1)).toBe(false);
});
