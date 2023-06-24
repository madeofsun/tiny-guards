import fs from "node:fs/promises";
import path from "node:path";

import {
  OUT_DIR,
  COMMON_INDEX,
  COMMON_PATH,
  ESM_INDEX,
  ESM_PATH,
  TYPES_INDEX,
  TYPES_PATH,
} from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateIndex(modules) {
  await Promise.all([
    fs.writeFile(
      path.resolve(OUT_DIR, TYPES_INDEX),
      generateTypesIndex(modules)
    ),
    fs.writeFile(path.resolve(OUT_DIR, ESM_INDEX), generateEsmIndex(modules)),
    fs.writeFile(
      path.resolve(OUT_DIR, COMMON_INDEX),
      generateCommonIndex(modules)
    ),
  ]);
}

/**
 * @param {string[]} modules
 */
function generateCommonIndex(modules) {
  const imports = modules
    .map(
      (module) => `const ${module} = require("./${COMMON_PATH}${module}.cjs")`
    )
    .join(";\n");

  const exports = `module.exports = { \n\t${modules
    .map((module) => `...${module}`)
    .join(",\n\t")}\n};`;

  return `${imports};\n\n${exports}\n`;
}

/**
 * @param {string[]} modules
 */
function generateEsmIndex(modules) {
  return modules
    .map((module) => `export * from "./${ESM_PATH}${module}.js"`)
    .join(";\n");
}

/**
 * @param {string[]} modules
 */
function generateTypesIndex(modules) {
  return modules
    .map((module) => `export * from "./${TYPES_PATH}${module}.js"`)
    .join(";\n");
}
