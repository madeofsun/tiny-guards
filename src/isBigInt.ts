export function isBigInt(v: unknown): v is bigint {
  return typeof v === "bigint";
}
