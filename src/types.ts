import { TinyGuardsError, TinyGuardsLog } from "./internal/context.js";

export { type TinyGuardsError, type TinyGuardsLog };

export type Guard<T> = (v: unknown) => v is T;

export type GuardInfer<T> = T extends Guard<infer P> ? P : never;

export type Refinement<T> = (v: T) => boolean;

export type Narrowing<T1, T2 extends T1> = (v: T1) => v is T2;

// https://developer.mozilla.org/en-US/docs/Glossary/Primitive
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<T> = abstract new (...args: any[]) => T;
