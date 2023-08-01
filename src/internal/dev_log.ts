class TinyGuardsError extends Error {}

let DEV_LOG_ENABLED = true;

export function devLogEnable() {
  DEV_LOG_ENABLED = true;
}

export function devLogDisable() {
  DEV_LOG_ENABLED = false;
}

export function dev_log(
  anchor: { name: string },
  message: string,
  value: unknown
) {
  if (!DEV_LOG_ENABLED) return;

  if (messages.length === 0) {
    v = value;
  }
  messages.push(`[${anchor.name}]: ${message}`);
  dev_log_end(anchor);
}

let debugAnchor: unknown = null;
let v: unknown;
let messages: string[] = [];

export function dev_log_start(anchor: { name: string }) {
  if (!DEV_LOG_ENABLED) return;

  if (!debugAnchor) {
    debugAnchor = anchor;
    messages = [];
  }
}

export function dev_log_end(anchor: { name: string }) {
  if (!DEV_LOG_ENABLED) return;

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
