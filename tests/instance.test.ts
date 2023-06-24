import { instance } from "../src/instance";

test(instance.name, () => {
  const isDate = instance(Date);
  expect(isDate(new Date())).toBe(true);
  expect(isDate({})).toBe(false);
  expect(isDate(new (class B {})())).toBe(false);
});
