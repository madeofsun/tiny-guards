export function isUppercase(v: string): v is Uppercase<string> {
  if (v.length === 0) return true;
  return v === v.toUpperCase();
}

export function isLowercase(v: string): v is Lowercase<string> {
  if (v.length === 0) return true;
  return v === v.toLowerCase();
}

export function isCapitalized(v: string): v is Capitalize<string> {
  if (v.length === 0) return true;
  return v[0] === v[0]!.toUpperCase();
}

export function isUncapitalized(v: string): v is Uncapitalize<string> {
  if (v.length === 0) return true;
  return v[0] === v[0]!.toLowerCase();
}

export function startsWith<T extends string>(prefix: T) {
  return (v: string): v is `${T}${string}` => v.startsWith(prefix);
}

export function endsWith<T extends string>(suffix: T) {
  return (v: string): v is `${string}${T}` => v.endsWith(suffix);
}
