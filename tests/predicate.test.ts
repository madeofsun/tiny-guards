import { p } from "../src/p";

describe(p, () => {
  test(p.name, () => {
    const some = p("qwe", () => true);

    expect(some.name).toBe("qwe");
  });
});
