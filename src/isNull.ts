import { p } from "./p.js";

export const isNull = p("isNull", (v: unknown): v is null => v === null);
