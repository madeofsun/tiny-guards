export const types = {};

export type Guard<T> = (v: unknown) => v is T;

export type GuardInfer<T> = T extends Guard<infer P> ? P : never;

export type Refinement<T> = (v: T) => boolean;

export type Narrowing<T1, T2 extends T1> = (v: T1) => v is T2;
