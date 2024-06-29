import fs from "node:fs";
import path from "node:path";

import camelCase from "lodash-es/camelCase.js";

import { PKG_NAME, TEST_PKG_JS_PATH, TEST_PKG_TS_PATH } from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateTestPkgFiles(modules) {
  await generateEsm(modules);
  await generateTs(modules);
}

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
async function generateEsm(modules) {
  const rows = modules.map((module) => {
    const identifier = camelCase(module);
    return `import { ${identifier} } from "${PKG_NAME}";
if (typeof ${identifier} === "undefined") {
  throw new Error("${identifier} is not defined");
}
`;
  });

  await fs.promises.writeFile(path.resolve(TEST_PKG_JS_PATH), rows.join(""));
}

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
async function generateTs(modules) {
  const rows = modules.map((module) => {
    const identifier = camelCase(module);
    return `import { ${identifier} } from "${PKG_NAME}";
${identifier} satisfies object;
`;
  });

  await fs.promises.writeFile(path.resolve(TEST_PKG_TS_PATH), rows.join(""));
}
