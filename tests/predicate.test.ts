import { p, p } from "../src/p";

describe(p, () => {
  test(p.name, () => {
    const some = p("qwe", () => true);

    expect(some.name).toBe("qwe");
  });

  test("p", () => {
    expect(p).toBe(p);
  });
});
