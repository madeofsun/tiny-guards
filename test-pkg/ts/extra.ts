import {
  GuardInfer,
  array,
  isString,
  isUppercase,
  narrow,
  shape,
} from "tiny-guards";

type Test<T, Expected> = T extends Expected ? true : false;

const isA = shape({
  a: isString,
  b: array(isString),
});

const a1 = {};
const a2 = {
  a: "string",
  b: ["string"],
};
const a3 = {
  a: "string",
};

type TestA<T> = Test<T, GuardInfer<typeof isA>>;

const testA1: TestA<typeof a1> = false;
const testA2: TestA<typeof a2> = true;
const testA3: TestA<typeof a3> = false;

const isB = narrow(isString, isUppercase);

const b1 = 0;
const b2 = true;
const b3 = "qwe";
const b4 = "QWE";

type TestB<T> = Test<T, GuardInfer<typeof isB>>;

const testB1: TestB<typeof b1> = false;
const testB2: TestB<typeof b2> = false;
const testB3: TestB<typeof b3> = false;
const testB4: TestB<typeof b4> = true;
