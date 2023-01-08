export function isNull(v: unknown): v is null {
  return v === null;
}

export function isUndefined(v: unknown): v is undefined {
  return typeof v === "undefined";
}

export function isBoolean(v: unknown): v is boolean {
  return typeof v === "boolean";
}

export function isNumber(v: unknown): v is number {
  return typeof v === "number";
}

export function isString(v: unknown): v is string {
  return typeof v === "string";
}

export function isObject<T extends {}>(v: unknown): v is T {
  return typeof v === "object" && v !== null;
}

export function isFunction<T extends (...args: any[]) => any>(
  v: unknown
): v is T {
  return typeof v === "function";
}

export function isSymbol(v: unknown): v is symbol {
  return typeof v === "symbol";
}

export function isBigInt(v: unknown): v is bigint {
  return typeof v === "bigint";
}
