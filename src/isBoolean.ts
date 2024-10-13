import { p } from "./p.js";

export const isBoolean = p(
  "isBoolean",
  (v: unknown): v is boolean => typeof v === "boolean"
);
