import { oneOf } from "../src/oneOf";

test(oneOf.name, () => {
  const isAllowed = oneOf(["a", "b", "c", 1, false]);
  expect(isAllowed("a")).toBe(true);
  expect(isAllowed(1)).toBe(true);
  expect(isAllowed(false)).toBe(true);
  expect(isAllowed("d")).toBe(false);
  expect(isAllowed(true)).toBe(false);
  expect(isAllowed(null)).toBe(false);
});
