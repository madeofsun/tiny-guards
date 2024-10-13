import { p } from "./p.js";

export const isUndefined = p(
  "isUndefined",
  (v: unknown): v is undefined => typeof v === "undefined"
);
