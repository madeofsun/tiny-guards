export type GuardsLog = { message: string; value: unknown }[];

export class GuardsError extends Error {
  log: GuardsLog;

  constructor(log: GuardsLog) {
    super(`validation failed\n${log.map(({ message }) => message).join("\n")}`);
    this.name = this.constructor.name;
    this.log = log;
  }
}

class Context {
  private count = 0;
  private log: GuardsLog = [];

  error: null | GuardsError = null;

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
      this.log.reverse();
      this.error = new GuardsError(this.log);
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
