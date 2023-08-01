export default function isUppercase(v: string): v is Uppercase<string> {
  if (v.length === 0) return true;
  return v === v.toUpperCase();
}
