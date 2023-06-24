import fs from "node:fs/promises";

import {
  COMMON_EXT,
  COMMON_INDEX,
  ESM_EXT,
  ESM_INDEX,
  OUT_DIR,
  TYPES_EXT,
  TYPES_INDEX,
} from "./constants.js";

/**
 * @returns {Promise<void>}
 */
export async function generatePackageJson() {
  /** @type {Record<string, { types:string, import: string, require: string }>} */
  const exports = {};

  exports["."] = {
    types: `./${TYPES_INDEX}`,
    import: `./${ESM_INDEX}`,
    require: `./${COMMON_INDEX}`,
  };

  exports[`./*`] = {
    types: `./*.${TYPES_EXT}`,
    import: `./*.${ESM_EXT}`,
    require: `./*.${COMMON_EXT}`,
  };

  const pkg = await fs
    .readFile("package.json", { encoding: "utf-8" })
    .then(JSON.parse);

  pkg.main = COMMON_INDEX;
  pkg.module = ESM_INDEX;
  pkg.types = TYPES_INDEX;
  pkg.sideEffects = false;
  pkg.exports = exports;
  pkg.files = [
    "package.json",
    "README.md",
    "LICENSE",
    "internal",
    "*.d.ts",
    "*.js",
    "*.cjs",
  ];

  delete pkg.devDependencies;
  delete pkg.scripts;

  await fs.writeFile(
    `${OUT_DIR}/package.json`,
    JSON.stringify(pkg, undefined, 2)
  );
}
