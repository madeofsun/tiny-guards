import { endsWith } from "../src/endsWith";
import { isCapitalized } from "../src/is-capitalized";
import { isLowercase } from "../src/is-lowercase";
import { isUncapitalized } from "../src/is-uncapitalized";
import { isUppercase } from "../src/is-uppercase";
import { startsWith } from "../src/starts-with";

describe("narrowings", () => {
  test(isUppercase.name, () => {
    expect(isUppercase("")).toBe(true);
    expect(isUppercase("ABC")).toBe(true);
    expect(isUppercase("ABc")).toBe(false);
    expect(isUppercase("abc")).toBe(false);
  });

  test(isLowercase.name, () => {
    expect(isLowercase("")).toBe(true);
    expect(isLowercase("ABC")).toBe(false);
    expect(isLowercase("ABc")).toBe(false);
    expect(isLowercase("abc")).toBe(true);
  });

  test(isCapitalized.name, () => {
    expect(isCapitalized("")).toBe(true);
    expect(isCapitalized("A")).toBe(true);
    expect(isCapitalized("a")).toBe(false);
  });

  test(isUncapitalized.name, () => {
    expect(isUncapitalized("")).toBe(true);
    expect(isUncapitalized("A")).toBe(false);
    expect(isUncapitalized("a")).toBe(true);
  });

  test(startsWith.name, () => {
    const hasPrefix = startsWith("$");
    expect(hasPrefix("")).toBe(false);
    expect(hasPrefix("$")).toBe(true);
    expect(hasPrefix("$a")).toBe(true);
    expect(hasPrefix("a$")).toBe(false);
  });

  test(endsWith.name, () => {
    const hasSuffix = endsWith("$");
    expect(hasSuffix("")).toBe(false);
    expect(hasSuffix("$")).toBe(true);
    expect(hasSuffix("$a")).toBe(false);
    expect(hasSuffix("a$")).toBe(true);
  });
});
