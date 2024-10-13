import { p } from "./p.js";

export const isObject = p(
  "isObject",
  (v: unknown): v is object => typeof v === "object" && v !== null
);
