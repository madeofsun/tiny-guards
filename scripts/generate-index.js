import fs from "node:fs/promises";
import path from "node:path";

import {
  COMMON_INDEX,
  COMMON_PATH,
  ESM_INDEX,
  ESM_PATH,
  TYPES_INDEX,
  TYPES_PATH,
} from "./constants.js";

/**
 *
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateIndex(modules) {
  await Promise.all([
    fs.writeFile(path.resolve(TYPES_INDEX), generateTypesIndex(modules)),
    fs.writeFile(path.resolve(ESM_INDEX), generateEsmIndex(modules)),
    fs.writeFile(path.resolve(COMMON_INDEX), generateCommonIndex(modules)),
  ]);
}

/**
 * @param {string[]} modules
 */
function generateCommonIndex(modules) {
  const imports = modules
    .map((module) => {
      return `const ${module} = require("./${COMMON_PATH}/${module}.cjs")`;
    })
    .join(";\n");

  const exports = `module.exports = { \n\t${modules.join(",\n\t")}\n};`;

  return `${imports};\n\n${exports}\n`;
}

/**
 * @param {string[]} modules
 */
function generateEsmIndex(modules) {
  return modules
    .map((module) => {
      return `export * from "./${ESM_PATH}/${module}.js"`;
    })
    .join(";\n");
}

/**
 * @param {string[]} modules
 */
function generateTypesIndex(modules) {
  return modules
    .map((module) => {
      return `export * from "./${TYPES_PATH}/${module}"`;
    })
    .join(";\n");
}
