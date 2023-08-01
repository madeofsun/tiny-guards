export default function endsWith<T extends string>(suffix: T) {
  return (v: string): v is `${string}${T}` => v.endsWith(suffix);
}
