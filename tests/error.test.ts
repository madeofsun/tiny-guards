import { array } from "../src/array";
import { Guards } from "../src/guards";

describe("Guards", () => {
  describe("error", () => {
    test("throw on first", () => {
      expect(() => Guards.error).toThrow("Invalid usage");
    });

    test("throw on valid", () => {
      const isArray = array();
      isArray([]);
      expect(() => Guards.error).toThrow("Invalid usage");
    });

    test("do not throw on invalid", () => {
      const isArray = array();
      isArray(1);
      expect(Guards.error.message).toMatch(/^validation failed\n\[isArray\]/);
    });
  });
});
