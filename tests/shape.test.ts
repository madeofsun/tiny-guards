import { gt } from "../src/gt";
import { isNumber } from "../src/isNumber";
import { isString } from "../src/isString";
import { maxLen } from "../src/maxLen";
import { oneOf } from "../src/oneOf";
import { optional } from "../src/optional";
import { refine } from "../src/refine";
import { shape } from "../src/shape";

describe(shape.name, () => {
  const isNaturalNumber = refine(isNumber, Number.isSafeInteger, gt(0));
  const isShortString = refine(isString, maxLen(16));
  const isAccountType = oneOf(["reader", "publisher", "moderator"]);

  test("name", () => {
    const isShape = shape({});

    expect(isShape.name).toBe("shape");
  });

  test("standard", () => {
    const isEmptyShape = shape({});
    expect(isEmptyShape({})).toBe(true);
    expect(isEmptyShape({ a: "a" })).toBe(true);

    const isUser = shape({
      id: isNaturalNumber,
      username: isShortString,
      accountType: isAccountType,
      firstName: optional(isString),
      lastName: optional(isString),
    });

    expect(isUser({})).toBe(false);
    expect(isUser(() => null)).toBe(false);
    expect(isUser(null)).toBe(false);
    expect(isUser(undefined)).toBe(false);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(true);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
      })
    ).toBe(true);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
        extra: "extra",
      })
    ).toBe(true);

    expect(
      isUser(
        Object.assign(() => null, {
          id: 1,
          username: "madeofsun",
          accountType: "reader",
          firstName: undefined,
          lastName: undefined,
        })
      )
    ).toBe(true);

    expect(
      isUser(
        Object.assign(() => null, {
          id: 1,
          username: "madeofsun",
          accountType: "reader",
        })
      )
    ).toBe(true);

    expect(
      isUser({
        id: "abc",
        username: "madeofsun",
        accountType: "reader",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(false);

    expect(
      isUser(
        Object.assign(() => null, {
          id: "abc",
          username: "madeofsun",
          accountType: "reader",
          firstName: undefined,
          lastName: 1,
        })
      )
    ).toBe(false);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(false);
  });

  test("exact", () => {
    const isEmptyShape = shape({}, { exact: true });
    expect(isEmptyShape({})).toBe(true);
    expect(isEmptyShape({ a: "a" })).toBe(false);

    const isUser = shape(
      {
        id: isNaturalNumber,
        username: isShortString,
        accountType: isAccountType,
        firstName: optional(isString),
        lastName: optional(isString),
      },
      { exact: true }
    );

    expect(isUser({})).toBe(false);
    expect(isUser(() => null)).toBe(false);
    expect(isUser(null)).toBe(false);
    expect(isUser(undefined)).toBe(false);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(true);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
      })
    ).toBe(true);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        accountType: "reader",
        extra: "extra",
      })
    ).toBe(false);

    expect(
      isUser(
        Object.assign(() => null, {
          id: 1,
          username: "madeofsun",
          accountType: "reader",
          firstName: undefined,
          lastName: undefined,
        })
      )
    ).toBe(true);

    expect(
      isUser(
        Object.assign(() => null, {
          id: 1,
          username: "madeofsun",
          accountType: "reader",
        })
      )
    ).toBe(true);

    expect(
      isUser({
        id: "abc",
        username: "madeofsun",
        accountType: "reader",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(false);

    expect(
      isUser(
        Object.assign(() => null, {
          id: "abc",
          username: "madeofsun",
          accountType: "reader",
          firstName: undefined,
          lastName: 1,
        })
      )
    ).toBe(false);

    expect(
      isUser({
        id: 1,
        username: "madeofsun",
        firstName: undefined,
        lastName: undefined,
      })
    ).toBe(false);
  });
});
