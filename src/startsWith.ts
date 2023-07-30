export default function startsWith<T extends string>(prefix: T) {
  return (v: string): v is `${T}${string}` => v.startsWith(prefix);
}
