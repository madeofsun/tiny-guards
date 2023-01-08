export type Guard<T> = (v: unknown) => v is T;

export type TypeOfGuard<T> = T extends Guard<infer P> ? P : never;

export type Refinement<T> = (v: T) => boolean;

export type Primitive =
  | string
  | number
  | symbol
  | bigint
  | boolean
  | null
  | undefined;

export type ShapeDescription<Shape extends {}> = {
  [P in keyof Shape]: Guard<Shape[P]>;
};
