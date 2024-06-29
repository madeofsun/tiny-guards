import { context } from "./internal/context.js";

export const tinyGuards = {
  get error() {
    const error = context.error;
    if (error === null) {
      throw new Error(
        `Invalid "tinyGuards.error" usage - last guard execution chain has completed successfully.`
      );
    }
    return error;
  },
};
