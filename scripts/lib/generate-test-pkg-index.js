import fsp from "fs/promises";
import path from "node:path";

import {
  PKG_NAME,
  TEST_PKG_INDEX_COMMON,
  TEST_PKG_INDEX_ESM,
} from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateTestPkgIndex(modules) {
  await Promise.all([generateEsm(modules), generateCommon(modules)]);
}

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
async function generateEsm(modules) {
  const rows = modules.map(
    (module) => `import { ${module} } from "${PKG_NAME}";
if (typeof ${module} !== "function") {
  throw new Error("${module} is not a function");
}
`
  );

  await fsp.writeFile(path.resolve(TEST_PKG_INDEX_ESM), rows.join(""));
}

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
async function generateCommon(modules) {
  const rows = modules.map(
    (module) => `const { ${module} } = require("tiny-guards");
if (typeof ${module} !== "function") {
  throw new Error("${module} is not a function");
}
`
  );

  await fsp.writeFile(path.resolve(TEST_PKG_INDEX_COMMON), rows.join(""));
}
