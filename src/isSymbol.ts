import { p } from "./p.js";

export const isSymbol = p(
  "isSymbol",
  (v: unknown): v is symbol => typeof v === "symbol"
);
