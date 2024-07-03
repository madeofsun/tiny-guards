export function isCapitalized(v: string): v is Capitalize<string> {
  if (v.length === 0) return true;
  const value = v[0]!;
  return value === value.toUpperCase();
}
