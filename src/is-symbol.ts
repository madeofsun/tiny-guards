export function isSymbol(v: unknown): v is symbol {
  return typeof v === "symbol";
}
