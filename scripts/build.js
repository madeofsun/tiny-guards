import fs from "node:fs/promises";
import path from "node:path";

import { collectModules } from "./collect-modules.js";
import { OUT_DIR } from "./constants.js";
import { generateFiles } from "./generate-files.js";
import { generateIndex } from "./generate-index.js";
import { generatePackageJson } from "./generate-package-json.js";

await build();

async function build() {
  const [modules, tsConfig] = await Promise.all([
    collectModules(),
    fs.readFile("tsconfig.json", { encoding: "utf-8" }),
    prepareOutDir(),
  ]);
  await Promise.all([
    generateFiles("tsconfig.json", tsConfig),
    generateIndex(modules),
    generatePackageJson(modules),
    fs.copyFile("README.md", `${OUT_DIR}/README.md`),
    fs.copyFile("LICENSE", `${OUT_DIR}/LICENSE`),
  ]);
  await cleanOutDir();
}

async function prepareOutDir() {
  await fs.mkdir(OUT_DIR).catch(() => {});
}

async function cleanOutDir() {
  const { files } = await fs
    .readFile(path.resolve(OUT_DIR, "package.json"), {
      encoding: "utf-8",
    })
    .then(JSON.parse);

  const fileSet = new Set(["package.json", "README.md", "LICENSE", ...files]);

  await fs.readdir(OUT_DIR).then((fileNames) => {
    return Promise.all(
      fileNames
        .filter((file) => !fileSet.has(file))
        .map((file) => fs.rm(path.resolve(OUT_DIR, file)))
    );
  });
}
