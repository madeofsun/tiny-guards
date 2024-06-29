export type TinyGuardsLog = { message: string; value: unknown }[];

export class TinyGuardsError extends Error {
  log: TinyGuardsLog;

  constructor(log: TinyGuardsLog) {
    super(
      `validation failed\n${log
        .map(({ message }) => message)
        .reverse()
        .join("\n")}`
    );
    this.name = this.constructor.name;
    this.log = log;
  }
}

class Context {
  private count = 0;
  private log: TinyGuardsLog = [];

  error: null | TinyGuardsError = null;

  track() {
    if (this.count === 0) {
      this.log = [];
      this.error = null;
    }
    this.count += 1;
  }

  private trackEnd() {
    this.count -= 1;
    if (this.count === 0 && this.log.length > 0) {
      this.error = new TinyGuardsError(this.log);
      this.log = [];
    }
  }

  pass() {
    this.trackEnd();
    return true;
  }

  block(anchor: { name: string }, message: string, value: unknown) {
    this.log.push({
      message: `[${anchor.name}]: ${message}`,
      value: value,
    });

    this.trackEnd();

    return false;
  }
}

export const context = new Context();
