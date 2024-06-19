import fsp from "fs/promises";
import path from "node:path";

import { PKG_NAME, TEST_PKG_INDEX_ESM } from "./constants.js";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateTestPkgIndex(modules) {
  await generateEsm(modules);
}

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
async function generateEsm(modules) {
  const rows = modules.map((module) => {
    if (module === "tracker") {
      return `import { ${module} } from "${PKG_NAME}";
if (typeof ${module} !== "object") {
  throw new Error("${module} is not an object");
}
`;
    }
    return `import { ${module} } from "${PKG_NAME}";
if (typeof ${module} !== "function") {
  throw new Error("${module} is not a function");
}
`;
  });

  await fsp.writeFile(path.resolve(TEST_PKG_INDEX_ESM), rows.join(""));
}
