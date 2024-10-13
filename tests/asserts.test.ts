import { array } from "../src/array";
import { asserts } from "../src/asserts";

test(asserts.name, () => {
  const isArray = array();

  expect(() => {
    asserts(1, isArray);
  }).toThrow("validation failed\n[array]");

  expect(() => {
    asserts([], isArray);
  }).not.toThrow();

  expect(() => {
    asserts(1, (v) => typeof v === "string");
  }).toThrow("validation failed");

  expect(() => {
    asserts(1, (v) => typeof v === "string", "qwe");
  }).toThrow("qwe");
});
