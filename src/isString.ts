import { p } from "./p.js";

export const isString = p(
  "isString",
  (v: unknown): v is string => typeof v === "string"
);
