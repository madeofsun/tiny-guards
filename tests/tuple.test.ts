import { isNumber, isString } from "../src/guards";
import { tuple } from "../src/tuple";
import { instance } from "../src/instance";

test(tuple.name, () => {
  const isTuple = tuple(isString, isNumber, instance(Date));

  expect(isTuple([])).toBe(false);
  expect(isTuple({})).toBe(false);
  expect(isTuple(1)).toBe(false);

  expect(isTuple(["a", 1, new Date()])).toBe(true);
  expect(isTuple(["a", 1, new Date(), 1])).toBe(false);
  expect(isTuple(["a", 1])).toBe(false);
  expect(isTuple(["a", 1, 2])).toBe(false);
});
