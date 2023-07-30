import { URL } from "node:url";
import fsp from "node:fs/promises";
import path from "node:path";

import { collectModules } from "./lib/collect-modules.js";
import { OUT_DIR } from "./lib/constants.js";
import { generateFiles } from "./lib/generate-files.js";
import { emptyIndex, generateIndex } from "./lib/generate-index.js";
import { generatePackageJson } from "./lib/generate-package-json.js";

build();

export async function build() {
  process.chdir(new URL("..", import.meta.url).pathname);
  const tsConfigPath = "tsconfig.json";
  const [modules, tsConfig] = await Promise.all([
    collectModules(),
    fsp.readFile(tsConfigPath, { encoding: "utf-8" }),
    prepareOutDir(),
  ]);
  try {
    await generateIndex(modules);
    await generateFiles(tsConfigPath, tsConfig);
  } finally {
    await emptyIndex();
  }
  await Promise.all([
    generatePackageJson(),
    fsp.copyFile("README.md", `${OUT_DIR}/README.md`),
    fsp.copyFile("LICENSE", `${OUT_DIR}/LICENSE`),
  ]);
}

async function prepareOutDir() {
  await fsp.mkdir(OUT_DIR).catch(() => null);
  await fsp.readdir(OUT_DIR).then((fileNames) =>
    Promise.all(
      fileNames.map((file) =>
        fsp.rm(path.resolve(OUT_DIR, file), {
          recursive: true,
          force: true,
        })
      )
    )
  );
}
