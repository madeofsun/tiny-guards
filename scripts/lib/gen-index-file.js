import fs from "node:fs";
import path from "node:path";

/**
 * @param {string[]} modules
 * @returns {Promise<void>}
 */
export async function generateIndexFile(modules) {
  const rows = modules.map((module) => {
    return `export * from "./${module}.js";\n`;
  });

  await fs.promises.writeFile(path.resolve("src/index.ts"), rows.join(""));
}
