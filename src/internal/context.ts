import type {
  ComplexGuard,
  Guard,
  GuardLog,
  GuardError as IGuardError,
} from "../types.js";

import { fnName } from "./utils.js";

class GuardError extends Error implements IGuardError {
  log: GuardLog;

  constructor(log: GuardLog) {
    super(`validation failed\n${log.map(({ message }) => message).join("\n")}`);
    this.name = this.constructor.name;
    this.log = log;
  }
}

export function complexGuard<T>(guard: Guard<T>) {
  Object.defineProperty(guard, "error", {
    get() {
      const error = context.error;
      if (error === null) {
        throw new Error(
          `Invalid usage of "${fnName(guard)}.error" - last guard execution has completed successfully.`
        );
      }
      return error;
    },
  });
  return guard as ComplexGuard<T>;
}

class Context {
  private count = 0;
  private log: GuardLog = [];

  error: null | GuardError = null;

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
      this.error = new GuardError(this.log);
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
