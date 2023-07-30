export default function isCapitalized(v: string): v is Capitalize<string> {
  if (v.length === 0) return true;
  return v[0] === v[0]!.toUpperCase();
}
