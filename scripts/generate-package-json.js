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
  OUT_DIR,
} from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generatePackageJson(modules) {
  /** @type {Record<string, { types:string, import: string, require: string }>} */
  const exports = {};

  exports["."] = {
    types: `./${TYPES_INDEX}`,
    import: `./${ESM_INDEX}`,
    require: `./${COMMON_INDEX}`,
  };

  for (const module of modules) {
    exports[`./${module}`] = {
      types: `./${TYPES_PATH}${module}.${TYPES_EXT}`,
      import: `./${ESM_PATH}${module}.${ESM_EXT}`,
      require: `./${COMMON_PATH}${module}.${COMMON_EXT}`,
    };
  }

  const pkg = await fs
    .readFile("package.json", { encoding: "utf-8" })
    .then(JSON.parse);

  pkg.main = COMMON_INDEX;
  pkg.module = ESM_INDEX;
  pkg.types = TYPES_INDEX;
  pkg.sideEffects = false;
  pkg.exports = exports;
  pkg.files = Object.values(exports)
    .flatMap((v) => [v.types, v.import, v.require])
    .map((file) => (file.startsWith("./") ? file.slice(2) : file));

  delete pkg.devDependencies;
  delete pkg.scripts;

  await fs.writeFile(
    `${OUT_DIR}/package.json`,
    JSON.stringify(pkg, undefined, 2)
  );
}
