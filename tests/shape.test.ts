import {
  gt,
  isNumber,
  isString,
  maxLen,
  oneOf,
  optional,
  refine,
  shape,
} from "../dist/index";

describe("shape", () => {
  test("match", () => {
    const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
    const isShortString = refine(isString, maxLen(16));
    const isAccountType = oneOf(["reader", "publisher", "moderator"]);

    const isUser = shape({
      id: isNaturalNumber,
      username: isShortString,
      accountType: isAccountType,
      firstName: optional(isString),
      lastName: optional(isString),
    });
    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(true);
  });

  test("null", () => {
    const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
    const isShortString = refine(isString, maxLen(16));
    const isAccountType = oneOf(["reader", "publisher", "moderator"]);

    const isUser = shape({
      id: isNaturalNumber,
      username: isShortString,
      accountType: isAccountType,
      firstName: optional(isString),
      lastName: optional(isString),
    });

    expect(isUser(null)).toBe(false);
  });

  test("undefined", () => {
    const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
    const isShortString = refine(isString, maxLen(16));
    const isAccountType = oneOf(["reader", "publisher", "moderator"]);

    const isUser = shape({
      id: isNaturalNumber,
      username: isShortString,
      accountType: isAccountType,
      firstName: optional(isString),
      lastName: optional(isString),
    });

    expect(isUser(undefined)).toBe(false);
  });

  test("empty", () => {
    const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
    const isShortString = refine(isString, maxLen(16));
    const isAccountType = oneOf(["reader", "publisher", "moderator"]);

    const isUser = shape({
      id: isNaturalNumber,
      username: isShortString,
      accountType: isAccountType,
      firstName: optional(isString),
      lastName: optional(isString),
    });

    expect(isUser({})).toBe(false);
  });
});
