export type Guard<T> = (v: unknown) => v is T;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Guard {
  export type Infer<T> = T extends Guard<infer P> ? P : never;
}

export type Refinement<T> = (v: T) => boolean;

export type Narrowing<T1, T2 extends T1> = (v: T1) => v is T2;

export type Shape<S extends object> = {
  [P in Exclude<keyof S, symbol>]: Guard<S[P]>;
};
