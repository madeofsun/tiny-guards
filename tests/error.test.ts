import { array } from "../src/array";

test("error", () => {
  const isArray = array();
  isArray(1);

  expect(isArray.error?.message).toMatch(/^validation failed\n\[array\]/);

  isArray([]);
  expect(isArray.error).toBe(null);
});
