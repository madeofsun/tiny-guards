class TinyGuardsError extends Error {}

export function dev_debug(
  anchor: { name: string },
  message: string,
  value: unknown
) {
  if (messages.length === 0) {
    v = value;
  }
  messages.push(`[${anchor.name}]: ${message}`);
  dev_debug_end(anchor);
}

let debugAnchor: unknown = null;
let v: unknown;
let messages: string[] = [];

export function dev_debug_start(anchor: { name: string }) {
  if (!debugAnchor) {
    debugAnchor = anchor;
    messages = [];
  }
}

export function dev_debug_end(anchor: { name: string }) {
  if (debugAnchor === anchor) {
    debugAnchor = null;
    if (messages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error(
        new TinyGuardsError(`\n${messages.reverse().join("\n")}`),
        "\nValue:",
        v
      );
    }
  }
}
