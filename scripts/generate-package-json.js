import fs from "node:fs/promises";
import {
  COMMON_INDEX,
  COMMON_PATH,
  ESM_INDEX,
  ESM_PATH,
  TYPES_INDEX,
  TYPES_PATH,
  TYPES_EXT,
  ESM_EXT,
  COMMON_EXT,
} from "./constants.js";

/**
 *
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function updatePackageJson(modules) {
  /** @type {Record<string, { import: string, require: string }>} */
  const exports = {};

  exports["."] = {
    types: `./${TYPES_INDEX}`,
    import: `./${ESM_INDEX}`,
    require: `./${COMMON_INDEX}`,
  };

  for (const module of modules) {
    exports[`./${module}`] = {
      types: `./${TYPES_PATH}/${module}.${TYPES_EXT}`,
      import: `./${ESM_PATH}/${module}.${ESM_EXT}`,
      require: `./${COMMON_PATH}/${module}.${COMMON_EXT}`,
    };
  }

  const pkg = await fs
    .readFile("package.json", { encoding: "utf-8" })
    .then(JSON.parse);

  pkg.exports = exports;

  pkg.main = "index.cjs";
  pkg.module = "index.js";
  pkg.types = "index.d.ts";

  pkg.files = Object.values().flatMap((values) => values);

  await fs.writeFile("package.json", JSON.stringify(pkg, undefined, 2));
}
