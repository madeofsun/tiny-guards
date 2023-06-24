import { literal } from "../src/literal";

test(literal.name, () => {
  const isAbc = literal("abc");
  expect(isAbc("abc")).toBe(true);
  expect(isAbc("qwe")).toBe(false);
  expect(isAbc("")).toBe(false);
});
