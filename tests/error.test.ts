import { array } from "../src/array";

describe("Guards", () => {
  describe("error", () => {
    test("throw on first", () => {
      const isArray = array();
      expect(() => isArray.error).toThrow("Invalid usage");
    });

    test("throw on valid", () => {
      const isArray = array();
      isArray([]);
      expect(() => isArray.error).toThrow("Invalid usage");
    });

    test("do not throw on invalid", () => {
      const isArray = array();
      isArray(1);
      expect(isArray.error.message).toMatch(/^validation failed\n\[isArray\]/);
    });
  });
});
