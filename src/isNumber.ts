import { p } from "./p.js";

export const isNumber = p(
  "isNumber",
  (v: unknown): v is number => typeof v === "number"
);
