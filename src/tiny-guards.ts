import { TinyGuardsError, TinyGuardsLog, context } from "./internal/context.js";

export { type TinyGuardsError, type TinyGuardsLog };

export const tinyGuards: {
  error: TinyGuardsError;
} = {
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
