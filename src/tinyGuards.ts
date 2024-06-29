import { context } from "./internal/context.js";

export const tinyGuards = {
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
