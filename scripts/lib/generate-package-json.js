import fsp from "node:fs/promises";

import {
  COMMON_EXT,
  COMMON_INDEX,
  COMMON_DIR,
  ESM_EXT,
  ESM_INDEX,
  ESM_DIR,
  OUT_DIR,
  TYPES_DIR,
  TYPES_INDEX,
  TYPES_EXT,
} from "./constants.js";

/**
 * @returns {Promise<void>}
 */
export async function generatePackageJson() {
  /** @type {Record<string, { types: string, import: string, require: string }>} */
  const exports = {};

  exports["."] = {
    types: `./${TYPES_DIR}/${TYPES_INDEX}`,
    import: `./${ESM_DIR}/${ESM_INDEX}`,
    require: `./${COMMON_DIR}/${COMMON_INDEX}`,
  };

  exports[`./*`] = {
    types: `./${TYPES_DIR}/*.${TYPES_EXT}`,
    import: `./${ESM_DIR}/*.${ESM_EXT}`,
    require: `./${COMMON_DIR}/*.${COMMON_EXT}`,
  };

  const pkg = await fsp
    .readFile("package.json", { encoding: "utf-8" })
    .then(JSON.parse);

  pkg.main = exports["."].require;
  pkg.module = exports["."].import;
  pkg.types = exports["."].types;
  pkg.sideEffects = false;
  pkg.exports = exports;
  pkg.files = ["package.json", "README.md", "LICENSE", ESM_DIR, COMMON_DIR];

  delete pkg.devDependencies;
  delete pkg.scripts;

  await fsp.writeFile(
    `${OUT_DIR}/package.json`,
    JSON.stringify(pkg, undefined, 2)
  );
}
