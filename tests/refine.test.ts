import { isString } from "../src/is-string";
import { refine } from "../src/refine";

test(refine.name, () => {
  const isSpecialString = refine(
    isString,
    (v) => v.length === 2 || v.length === 4,
    (v) => v.startsWith("a")
  );
  expect(isSpecialString("")).toBe(false);
  expect(isSpecialString("b")).toBe(false);
  expect(isSpecialString("ba")).toBe(false);
  expect(isSpecialString("a")).toBe(false);
  expect(isSpecialString("aa")).toBe(true);
  expect(isSpecialString("aaa")).toBe(false);
  expect(isSpecialString("aaaa")).toBe(true);
  expect(isSpecialString("aaaaa")).toBe(false);
});
