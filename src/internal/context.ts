import type { Predicate, WithError } from "../types.js";

import { fnName, setFnName } from "./utils/fn-name.js";

class GuardError extends Error {
  constructor(log: string[]) {
    super(`validation failed\n${log.join("\n")}`);
    this.name = "GuardError";
  }
}

class Context {
  private count = 0;
  private log: string[] = [];
  private error: null | GuardError = null;

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

  block(anchor: Predicate, message: string) {
    this.log.push(`[${fnName(anchor)}]: ${message}`);

    this.trackEnd();

    return false;
  }

  withError<T extends Predicate>(anchor: T, name: string): WithError<T> {
    setFnName(anchor, name);

    if ("error" in anchor === false) {
      Object.defineProperty(anchor, "error", {
        get() {
          return context.error;
        },
        configurable: true,
      });
    }

    return anchor as WithError<T>;
  }
}

export const context = new Context();
