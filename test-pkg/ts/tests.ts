import {
  and,
  array,
  endsWith,
  gt,
  gte,
  GuardInfer,
  isBigInt,
  isBoolean,
  isCapitalized,
  isFunction,
  isLowercase,
  isNull,
  isNumber,
  isObject,
  isPrimitive,
  isString,
  isSymbol,
  isUncapitalized,
  isUndefined,
  isUppercase,
  len,
  literal,
  lt,
  lte,
  maxLen,
  minLen,
  narrow,
  nullable,
  nullish,
  oneOf,
  optional,
  or,
  record,
  refine,
  shape,
  startsWith,
  tuple,
  asserts,
} from "tiny-guards";
import { Equal, Expect } from "./utils.js";

// simple
{
  type test1 = Expect<Equal<GuardInfer<typeof isBigInt>, bigint>>;
  type test2 = Expect<Equal<GuardInfer<typeof isBoolean>, boolean>>;
  type test3 = Expect<
    Equal<GuardInfer<typeof isFunction>, (...args: any[]) => unknown>
  >;
  type test4 = Expect<Equal<GuardInfer<typeof isNull>, null>>;
  type test5 = Expect<Equal<GuardInfer<typeof isNumber>, number>>;
  type test6 = Expect<Equal<GuardInfer<typeof isObject>, object>>;
  type test7 = Expect<
    Equal<
      GuardInfer<typeof isPrimitive>,
      string | number | bigint | boolean | undefined | symbol | null
    >
  >;
  type test8 = Expect<Equal<GuardInfer<typeof isString>, string>>;
  type test9 = Expect<Equal<GuardInfer<typeof isSymbol>, symbol>>;
  type test10 = Expect<Equal<GuardInfer<typeof isUndefined>, undefined>>;
}

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 */
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null;

// literal
{
  const t1 = literal("q");
  type test1 = Expect<Equal<GuardInfer<typeof t1>, "q">>;

  const t2 = literal(1);
  type test2 = Expect<Equal<GuardInfer<typeof t2>, 1>>;

  // @ts-expect-error
  const t3 = literal(1n);
  type test3 = Expect<Equal<GuardInfer<typeof t3>, 1n>>;

  const t4 = literal(true);
  type test4 = Expect<Equal<GuardInfer<typeof t4>, true>>;

  const t5 = literal(undefined);
  type test5 = Expect<Equal<GuardInfer<typeof t5>, undefined>>;

  const symbol = Symbol();
  const t6 = literal(symbol);
  type test6 = Expect<Equal<GuardInfer<typeof t6>, typeof symbol>>;

  const t7 = literal(null);
  type test7 = Expect<Equal<GuardInfer<typeof t7>, null>>;
}

// oneOf
{
  const t1 = oneOf(["q"]);
  type test1 = Expect<Equal<GuardInfer<typeof t1>, "q">>;

  const t2 = oneOf(["q", 1]);
  type test2 = Expect<Equal<GuardInfer<typeof t2>, "q" | 1>>;

  // @ts-expect-error
  const t3 = oneOf(["q", 1n]);
  type test3 = Expect<Equal<GuardInfer<typeof t3>, "q" | 1n>>;

  const t4 = oneOf(["q", true]);
  type test4 = Expect<Equal<GuardInfer<typeof t4>, "q" | true>>;

  const t5 = oneOf(["q", undefined]);
  type test5 = Expect<Equal<GuardInfer<typeof t5>, "q" | undefined>>;

  const symbol = Symbol();
  const t6 = oneOf(["q", symbol]);
  type test6 = Expect<Equal<GuardInfer<typeof t6>, "q" | typeof symbol>>;

  const t7 = oneOf(["q", null]);
  type test7 = Expect<Equal<GuardInfer<typeof t7>, "q" | null>>;
}

// or
{
  const t1 = or();
  type test1 = Expect<Equal<GuardInfer<typeof t1>, never>>;

  const t2 = or(literal(1));
  type test2 = Expect<Equal<GuardInfer<typeof t2>, 1>>;

  const t3 = or(literal(1), literal(2));
  type test3 = Expect<Equal<GuardInfer<typeof t3>, 1 | 2>>;

  const t4 = or(literal(1), literal(2), literal(3));
  type test4 = Expect<Equal<GuardInfer<typeof t4>, 1 | 2 | 3>>;

  const t5 = or(literal(1), literal(2), literal(3), literal(4));
  type test5 = Expect<Equal<GuardInfer<typeof t5>, 1 | 2 | 3 | 4>>;

  const t6 = or(literal(1), literal(2), literal(3), literal(4), literal(5));
  type test6 = Expect<Equal<GuardInfer<typeof t6>, 1 | 2 | 3 | 4 | 5>>;

  const t7 = or(
    literal(1),
    literal(2),
    literal(3),
    literal(4),
    literal(5),
    literal(6)
  );
  type test7 = Expect<Equal<GuardInfer<typeof t7>, 1 | 2 | 3 | 4 | 5 | 6>>;

  const t8 = or(
    literal(1),
    literal(2),
    literal(3),
    literal(4),
    literal(5),
    literal(6),
    literal(7)
  );
  type test8 = Expect<Equal<GuardInfer<typeof t8>, 1 | 2 | 3 | 4 | 5 | 6 | 7>>;
}

// optional
// nullable
// nullish
{
  const t1 = optional(isString);
  type test1 = Expect<Equal<GuardInfer<typeof t1>, undefined | string>>;

  const t2 = nullable(isString);
  type test2 = Expect<Equal<GuardInfer<typeof t2>, null | string>>;

  const t3 = nullish(isString);
  type test3 = Expect<Equal<GuardInfer<typeof t3>, undefined | null | string>>;
}

// and
{
  const t1 = and();
  type test1 = Expect<Equal<GuardInfer<typeof t1>, never>>;

  const t2 = and(shape({ a: isNumber }));
  type test2 = Expect<Equal<GuardInfer<typeof t2>, { a: number }>>;

  const t3 = and(shape({ a: isNumber }), shape({ b: isNumber }));
  type test3 = Expect<
    Equal<GuardInfer<typeof t3>, { a: number } & { b: number }>
  >;

  const t4 = and(
    shape({ a: isNumber }),
    shape({ b: isNumber }),
    shape({ c: isNumber })
  );
  type test4 = Expect<
    Equal<GuardInfer<typeof t4>, { a: number } & { b: number } & { c: number }>
  >;

  const t5 = and(
    shape({ a: isNumber }),
    shape({ b: isNumber }),
    shape({ c: isNumber }),
    shape({ d: isNumber })
  );
  type test5 = Expect<
    Equal<
      GuardInfer<typeof t5>,
      { a: number } & { b: number } & { c: number } & { d: number }
    >
  >;

  const t6 = and(
    shape({ a: isNumber }),
    shape({ b: isNumber }),
    shape({ c: isNumber }),
    shape({ d: isNumber }),
    shape({ e: isNumber })
  );
  type test6 = Expect<
    Equal<
      GuardInfer<typeof t6>,
      { a: number } & { b: number } & { c: number } & { d: number } & {
        e: number;
      }
    >
  >;

  const t7 = and(
    shape({ a: isNumber }),
    shape({ b: isNumber }),
    shape({ c: isNumber }),
    shape({ d: isNumber }),
    shape({ e: isNumber }),
    shape({ f: isNumber })
  );
  type test7 = Expect<
    Equal<
      GuardInfer<typeof t7>,
      { a: number } & { b: number } & { c: number } & { d: number } & {
        e: number;
      } & {
        f: number;
      }
    >
  >;

  const t8 = and(
    shape({ a: isNumber }),
    shape({ b: isNumber }),
    shape({ c: isNumber }),
    shape({ d: isNumber }),
    shape({ e: isNumber }),
    shape({ f: isNumber }),
    shape({ g: isNumber })
  );
  type test8 = Expect<
    Equal<
      GuardInfer<typeof t8>,
      { a: number } & { b: number } & { c: number } & { d: number } & {
        e: number;
      } & {
        f: number;
      } & {
        g: number;
      }
    >
  >;
}

// array
{
  const t1 = array();
  type test1 = Expect<Equal<GuardInfer<typeof t1>, unknown[]>>;

  const t2 = array(isString);
  type test2 = Expect<Equal<GuardInfer<typeof t2>, string[]>>;

  const t3 = array(isString, minLen(1));
  type test3 = Expect<Equal<GuardInfer<typeof t3>, string[]>>;

  const t4 = array(undefined, minLen(1));
  type test4 = Expect<Equal<GuardInfer<typeof t4>, unknown[]>>;
}

// tuple
{
  const t1 = tuple();
  type test1 = Expect<Equal<GuardInfer<typeof t1>, []>>;

  const t2 = tuple(isString);
  type test2 = Expect<Equal<GuardInfer<typeof t2>, [string]>>;

  const t3 = tuple(isString, isNumber);
  type test3 = Expect<Equal<GuardInfer<typeof t3>, [string, number]>>;

  const t4 = tuple(isString, isNumber, isString);
  type test4 = Expect<Equal<GuardInfer<typeof t4>, [string, number, string]>>;

  const t5 = tuple(isString, isNumber, isString, isNumber);
  type test5 = Expect<
    Equal<GuardInfer<typeof t5>, [string, number, string, number]>
  >;

  const t6 = tuple(isString, isNumber, isString, isNumber, isString);
  type test6 = Expect<
    Equal<GuardInfer<typeof t6>, [string, number, string, number, string]>
  >;

  const t7 = tuple(isString, isNumber, isString, isNumber, isString, isNumber);
  type test7 = Expect<
    Equal<
      GuardInfer<typeof t7>,
      [string, number, string, number, string, number]
    >
  >;

  const t8 = tuple(
    isString,
    isNumber,
    isString,
    isNumber,
    isString,
    isNumber,
    isString
  );
  type test8 = Expect<
    Equal<
      GuardInfer<typeof t8>,
      [string, number, string, number, string, number, string]
    >
  >;
}

// shape
{
  const t1 = shape({ a: isString });
  type test1 = Expect<Equal<GuardInfer<typeof t1>, { a: string }>>;

  const t2 = shape({ a: shape({ b: isString }) });
  type test2 = Expect<Equal<GuardInfer<typeof t2>, { a: { b: string } }>>;

  const t3 = shape({ a: isString }, { strict: true });
  type test3 = Expect<Equal<GuardInfer<typeof t3>, { a: string }>>;

  const t4 = shape({ a: isString }, { strict: false });
  type test4 = Expect<Equal<GuardInfer<typeof t4>, { a: string }>>;
}

// record
{
  const t1 = record(isString, isNumber);
  type test1 = Expect<Equal<GuardInfer<typeof t1>, Record<string, number>>>;

  const t2 = record(oneOf(["a", "b", "c"]), isNumber);
  type test2 = Expect<
    Equal<GuardInfer<typeof t2>, Record<"a" | "b" | "c", number>>
  >;
}

// refinements
{
  const t1 = refine(isNumber, gt(0));
  type test1 = Expect<Equal<GuardInfer<typeof t1>, number>>;

  const t2 = refine(isNumber, gte(0));
  type test2 = Expect<Equal<GuardInfer<typeof t2>, number>>;

  const t3 = refine(isString, len(1));
  type test3 = Expect<Equal<GuardInfer<typeof t3>, string>>;

  const t4 = refine(isNumber, lt(0));
  type test4 = Expect<Equal<GuardInfer<typeof t4>, number>>;

  const t5 = refine(isNumber, lte(0));
  type test5 = Expect<Equal<GuardInfer<typeof t5>, number>>;

  const t6 = refine(array(), minLen(2), maxLen(10));
  type test6 = Expect<Equal<GuardInfer<typeof t6>, Array<unknown>>>;

  const t7 = refine(isString, minLen(2), maxLen(10));
  type test7 = Expect<Equal<GuardInfer<typeof t7>, string>>;
}

// narrowings
{
  const t1 = narrow(isPrimitive, or(isString, isNumber));
  type test = Expect<Equal<GuardInfer<typeof t1>, string | number>>;

  function some1(a: "ABC" | "abc" | "Abc" | "aBc") {
    if (isLowercase(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "abc">>;
    }

    if (isUppercase(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "ABC">>;
    }

    if (isCapitalized(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "ABC" | "Abc">>;
    }

    if (isUncapitalized(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "abc" | "aBc">>;
    }

    if (startsWith("a")(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "abc" | "aBc">>;
    }

    if (endsWith("c")(a)) {
      const b = a;
      type test = Expect<Equal<typeof b, "abc" | "Abc" | "aBc">>;
    }
  }
}

// asserts
{
  function some(v: string | number) {
    asserts(v, isString);
    const b = v;
    type test = Expect<Equal<typeof b, string>>;
  }
}
