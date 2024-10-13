import { p } from "./p.js";

export const isLowercase = p(
  "isLowercase",
  (v: string): v is Lowercase<string> => {
    if (v.length === 0) return true;
    return v === v.toLowerCase();
  }
);
