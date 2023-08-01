export default function isLowercase(v: string): v is Lowercase<string> {
  if (v.length === 0) return true;
  return v === v.toLowerCase();
}
