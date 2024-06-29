import { array } from "../src/array";
import { tinyGuards } from "../src/tinyGuards";

describe("tinyGuards", () => {
  describe("error", () => {
    test("throw on first", () => {
      expect(() => tinyGuards.error).toThrow("Invalid usage");
    });

    test("throw on valid", () => {
      const isArray = array();
      isArray([]);
      expect(() => tinyGuards.error).toThrow("Invalid usage");
    });

    test("do not throw on invalid", () => {
      const isArray = array();
      isArray(1);
      expect(tinyGuards.error.message).toMatch(
        /^validation failed\n\[isArray\]/
      );
    });
  });
});
