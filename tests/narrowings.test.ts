import { endsWith } from "../src/endsWith";
import { isCapitalized } from "../src/isCapitalized";
import { isLowercase } from "../src/isLowercase";
import { isUncapitalized } from "../src/isUncapitalized";
import { isUppercase } from "../src/isUppercase";
import { startsWith } from "../src/startsWith";

describe("narrowings", () => {
  test(isUppercase.name, () => {
    expect(isUppercase("")).toBe(true);
    expect(isUppercase("ABC")).toBe(true);
    expect(isUppercase("ABc")).toBe(false);
    expect(isUppercase("abc")).toBe(false);
    expect(isUppercase.name).toBe("isUppercase");
  });

  test(isLowercase.name, () => {
    expect(isLowercase("")).toBe(true);
    expect(isLowercase("ABC")).toBe(false);
    expect(isLowercase("ABc")).toBe(false);
    expect(isLowercase("abc")).toBe(true);
    expect(isLowercase.name).toBe("isLowercase");
  });

  test(isCapitalized.name, () => {
    expect(isCapitalized("")).toBe(true);
    expect(isCapitalized("A")).toBe(true);
    expect(isCapitalized("a")).toBe(false);
    expect(isCapitalized.name).toBe("isCapitalized");
  });

  test(isUncapitalized.name, () => {
    expect(isUncapitalized("")).toBe(true);
    expect(isUncapitalized("A")).toBe(false);
    expect(isUncapitalized("a")).toBe(true);
    expect(isUncapitalized.name).toBe("isUncapitalized");
  });

  test(startsWith.name, () => {
    const isStartsWith = startsWith("$");
    expect(isStartsWith("")).toBe(false);
    expect(isStartsWith("$")).toBe(true);
    expect(isStartsWith("$a")).toBe(true);
    expect(isStartsWith("a$")).toBe(false);
    expect(isStartsWith.name).toBe("startsWith");
  });

  test(endsWith.name, () => {
    const isEndsWith = endsWith("$");
    expect(isEndsWith("")).toBe(false);
    expect(isEndsWith("$")).toBe(true);
    expect(isEndsWith("$a")).toBe(false);
    expect(isEndsWith("a$")).toBe(true);
    expect(isEndsWith.name).toBe("endsWith");
  });
});
