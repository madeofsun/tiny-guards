export function isUncapitalized(v: string): v is Uncapitalize<string> {
  if (v.length === 0) return true;
  const value = v[0]!;
  return value === value.toLowerCase();
}
