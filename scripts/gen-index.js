import { URL } from "node:url";

import { collectModules } from "./lib/collect-modules.js";
import { emptyIndex, generateIndex } from "./lib/generate-index.js";

build();

export async function build() {
  process.chdir(new URL("..", import.meta.url).pathname);
  const modules = await collectModules();
  try {
    await generateIndex(modules);
  } catch {
    await emptyIndex();
  }
}
