class TinyGuardsError extends Error {}

export function dev_debug(strings: TemplateStringsArray, ...args: unknown[]) {
  const [fn] = args;
  if (typeof fn !== "function") {
    throw new Error("PANIC: first arg must be a function");
  }
  const parts: string[] = [strings[0]!, fn.name];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    parts.push(JSON.stringify(arg, undefined, 2));
    parts.push(strings[i + 1]!);
  }
  messages.push(parts.join(""));
  dev_debug_end(fn);
}

let debugAnchor: unknown = null;
let messages: string[] = [];

export function dev_debug_start(anchor: object) {
  if (!debugAnchor) {
    debugAnchor = anchor;
    messages = [];
  }
}

export function dev_debug_end(anchor: unknown) {
  if (debugAnchor === anchor) {
    debugAnchor = null;
    if (messages.length > 0) {
      // @ts-expect-error suppress
      console.error(new TinyGuardsError(`\n${messages.join("\n")}`));
    }
  }
}
