import fs from "node:fs/promises";
import path from "node:path";

import { collectModules } from "./collect-modules.js";
import { OUT_DIR } from "./constants.js";
import { generateFiles } from "./generate-files.js";
import { generateIndex } from "./generate-index.js";
import { generatePackageJson } from "./generate-package-json.js";

export async function build() {
  const tsConfigPath = "tsconfig.json";
  const [modules, tsConfig] = await Promise.all([
    collectModules(),
    fs.readFile(tsConfigPath, { encoding: "utf-8" }),
    prepareOutDir(),
  ]);
  await Promise.all([
    generateFiles(tsConfigPath, tsConfig),
    generateIndex(modules),
    generatePackageJson(),
    fs.copyFile("README.md", `${OUT_DIR}/README.md`),
    fs.copyFile("LICENSE", `${OUT_DIR}/LICENSE`),
  ]);
}

async function prepareOutDir() {
  await fs.mkdir(OUT_DIR).catch(() => null);
  await fs.mkdir(`${OUT_DIR}/internal`).catch(() => null);
  await fs.readdir(OUT_DIR).then((fileNames) => {
    return Promise.all(
      fileNames
        .filter((name) => name !== "internal")
        .map((file) => fs.rm(path.resolve(OUT_DIR, file)))
    );
  });
}
