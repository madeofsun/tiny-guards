export function fnName(fn: { name: string | undefined }) {
  return fn.name || "$Anonymous";
}
