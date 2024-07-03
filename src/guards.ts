import { context, GuardsError } from "./internal/context.js";
import type { GuardsLog } from "./internal/context.js";

export { type GuardsError, type GuardsLog };

export const Guards = {
  get error() {
    const error = context.error;
    if (error === null) {
      throw new Error(
        `Invalid usage of "tinyGuards.error" - last guard execution has completed successfully.`
      );
    }
    return error;
  },
};
