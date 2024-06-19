type Log = { message: string; value: unknown }[];

class TinyGuardsError extends Error {
  log: Log;

  constructor(log: Log) {
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

export { type TinyGuardsError, type Log };

class Tracker {
  #error: null | TinyGuardsError = null;
  #count = 0;
  #log: Log = [];

  get error() {
    const error = this.#error;
    this.#error = null;
    return error;
  }

  track() {
    if (this.#count === 0) {
      this.#log = [];
      this.#error = null;
    }
    this.#count += 1;
  }

  private trackEnd() {
    this.#count -= 1;
    if (this.#count === 0 && this.#log.length > 0) {
      this.#error = new TinyGuardsError(this.#log);
      this.#log = [];
    }
  }

  pass() {
    this.trackEnd();
    return true;
  }

  block(anchor: { name: string }, message: string, value: unknown) {
    this.#log.push({
      message: `[${anchor.name}]: ${message}`,
      value: value,
    });

    this.trackEnd();

    return false;
  }
}

export const tracker = new Tracker();
