import { gt, gte, len, lt, lte, maxLen, minLen } from "../src/refinements";

describe("refinements", () => {
  test(gt.name, () => {
    expect(gt(0)(1)).toBe(true);
    expect(gt(0)(-1)).toBe(false);
    expect(gt(0)(0)).toBe(false);
  });

  test(gte.name, () => {
    expect(gte(0)(1)).toBe(true);
    expect(gte(0)(-1)).toBe(false);
    expect(gte(0)(0)).toBe(true);
  });

  test(lt.name, () => {
    expect(lt(0)(-1)).toBe(true);
    expect(lt(0)(1)).toBe(false);
    expect(lt(0)(0)).toBe(false);
  });

  test(lte.name, () => {
    expect(lte(0)(-1)).toBe(true);
    expect(lte(0)(1)).toBe(false);
    expect(lte(0)(0)).toBe(true);
  });

  test(len.name, () => {
    expect(len(1)([])).toBe(false);
    expect(len(1)(["a"])).toBe(true);
    expect(len(1)(["a", "a"])).toBe(false);

    expect(len(1)("")).toBe(false);
    expect(len(1)("a")).toBe(true);
    expect(len(1)("aa")).toBe(false);
  });

  test(minLen.name, () => {
    expect(minLen(1)([])).toBe(false);
    expect(minLen(1)(["a"])).toBe(true);
    expect(minLen(1)(["a", "a"])).toBe(true);

    expect(minLen(1)("")).toBe(false);
    expect(minLen(1)("a")).toBe(true);
    expect(minLen(1)("aa")).toBe(true);
  });

  test(maxLen.name, () => {
    expect(maxLen(1)([])).toBe(true);
    expect(maxLen(1)(["a"])).toBe(true);
    expect(maxLen(1)(["a", "a"])).toBe(false);

    expect(maxLen(1)("")).toBe(true);
    expect(maxLen(1)("a")).toBe(true);
    expect(maxLen(1)("aa")).toBe(false);
  });
});
