export function isUncapitalized(v: string): v is Uncapitalize<string> {
  if (v.length === 0) return true;
  return v[0] === v[0]!.toLowerCase();
}
