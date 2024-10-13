import { gt } from "../src/gt";
import { gte } from "../src/gte";
import { len } from "../src/len";
import { lt } from "../src/lt";
import { lte } from "../src/lte";
import { maxLen } from "../src/maxLen";
import { minLen } from "../src/minLen";

describe("refinements", () => {
  test(gt.name, () => {
    const isGt = gt(0);
    expect(isGt(1)).toBe(true);
    expect(isGt(-1)).toBe(false);
    expect(isGt(0)).toBe(false);
    expect(isGt.name).toBe("gt");
  });

  test(gte.name, () => {
    const isGte = gte(0);
    expect(isGte(1)).toBe(true);
    expect(isGte(-1)).toBe(false);
    expect(isGte(0)).toBe(true);
    expect(isGte.name).toBe("gte");
  });

  test(lt.name, () => {
    const isLt = lt(0);
    expect(isLt(-1)).toBe(true);
    expect(isLt(1)).toBe(false);
    expect(isLt(0)).toBe(false);
    expect(isLt.name).toBe("lt");
  });

  test(lte.name, () => {
    const isLte = lte(0);
    expect(isLte(-1)).toBe(true);
    expect(isLte(1)).toBe(false);
    expect(isLte(0)).toBe(true);
    expect(isLte.name).toBe("lte");
  });

  test(len.name, () => {
    const isLen = len(1);

    expect(isLen([])).toBe(false);
    expect(isLen(["a"])).toBe(true);
    expect(isLen(["a", "a"])).toBe(false);

    expect(isLen("")).toBe(false);
    expect(isLen("a")).toBe(true);
    expect(isLen("aa")).toBe(false);

    expect(isLen.name).toBe("len");
  });

  test(minLen.name, () => {
    const isMinLen = minLen(1);

    expect(isMinLen([])).toBe(false);
    expect(isMinLen(["a"])).toBe(true);
    expect(isMinLen(["a", "a"])).toBe(true);

    expect(isMinLen("")).toBe(false);
    expect(isMinLen("a")).toBe(true);
    expect(isMinLen("aa")).toBe(true);

    expect(isMinLen.name).toBe("minLen");
  });

  test(maxLen.name, () => {
    const isMaxLen = maxLen(1);

    expect(isMaxLen([])).toBe(true);
    expect(isMaxLen(["a"])).toBe(true);
    expect(isMaxLen(["a", "a"])).toBe(false);

    expect(isMaxLen("")).toBe(true);
    expect(isMaxLen("a")).toBe(true);
    expect(isMaxLen("aa")).toBe(false);

    expect(isMaxLen.name).toBe("maxLen");
  });
});
