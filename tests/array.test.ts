import { array } from "../src/array";
import { isString } from "../src/guards";

describe(array.name, () => {
  test("guard", () => {
    const isStringArray = array(isString);
    expect(isStringArray(["", "qwe"])).toBe(true);
    expect(isStringArray([1])).toBe(false);
    expect(isStringArray([])).toBe(true);
    expect(isStringArray({})).toBe(false);
    expect(isStringArray(null)).toBe(false);
    expect(isStringArray(undefined)).toBe(false);
    expect(isStringArray("")).toBe(false);
  });

  test("refinement", () => {
    const isArrayOf2Or3 = array(
      undefined,
      (v) => 2 <= v.length && v.length <= 3
    );
    expect(isArrayOf2Or3([1, 2, 3])).toBe(true);
    expect(isArrayOf2Or3([null, null])).toBe(true);
    expect(isArrayOf2Or3([null])).toBe(false);
    expect(isArrayOf2Or3([])).toBe(false);
    expect(isArrayOf2Or3([null, null, null, null])).toBe(false);
  });

  test("guard + refinement", () => {
    const isStringArrayOf2Or3 = array(
      isString,
      (v) => 2 <= v.length && v.length <= 3
    );
    expect(isStringArrayOf2Or3(["a", "b", "c"])).toBe(true);
    expect(isStringArrayOf2Or3(["a"])).toBe(false);
    expect(isStringArrayOf2Or3([1, 2, 3])).toBe(false);
  });
});
