import fs from "node:fs/promises";

import { collectModules } from "./collect-modules.js";
import { generateFiles } from "./generate-files.js";
import { generateIndex } from "./generate-index.js";
import { updatePackageJson } from "./generate-package-json.js";

await build();

async function build() {
  const [modules, tsConfig] = await Promise.all([
    collectModules(),
    fs.readFile("tsconfig.json", { encoding: "utf-8" }),
  ]);
  await Promise.all([
    generateFiles("tsconfig.json", tsConfig),
    generateIndex(modules),
    updatePackageJson(modules),
  ]);
}
