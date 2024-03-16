import fsp from "node:fs/promises";
import path from "node:path";

import { IN_DIR, IN_INDEX, IN_TYPES } from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateIndex(modules) {
  const content = modules.map(
    (module) => `export { default as ${module} } from "./${module}.js";\n`
  );

  content.push(`export * from "./${IN_TYPES.replace(".ts", ".js")}"`);

  await fsp.writeFile(path.resolve(IN_DIR, IN_INDEX), content.join());
}

export async function emptyIndex() {
  await fsp.writeFile(path.resolve(IN_DIR, IN_INDEX), "");
}
