// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export function isFunction<T extends AnyFunction>(v: unknown): v is T {
  return typeof v === "function";
}
