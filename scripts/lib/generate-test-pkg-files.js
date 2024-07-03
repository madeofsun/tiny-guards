import fs from "node:fs";
import path from "node:path";

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
  const rows = modules
    .filter((module) => module !== "types")
    .map((module) => {
      return `import { ${module} } from "${PKG_NAME}";
if (typeof ${module} === "undefined") {
  throw new Error("${module} is not defined");
}
import { ${module} as ${module + "$2"} } from "${PKG_NAME}/${module}";
if (typeof ${module + "$2"} === "undefined") {
  throw new Error("${module + "$2"} is not defined");
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
  const rows = modules
    .filter((module) => module !== "types")
    .map((module) => {
      return `import { ${module} } from "${PKG_NAME}";
${module} satisfies object;
import { ${module} as ${module + "$2"} } from "${PKG_NAME}/${module}";
${module + "$2"} satisfies object;
`;
    });

  await fs.promises.writeFile(path.resolve(TEST_PKG_TS_PATH), rows.join(""));
}
