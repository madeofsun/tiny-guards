import { p } from "./p.js";

export const isBigInt = p(
  "isBigInt",
  (v: unknown): v is bigint => typeof v === "bigint"
);
