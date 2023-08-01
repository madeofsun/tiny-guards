import { URL } from "node:url";

import { generateTestPkgIndex } from "./lib/generate-test-pkg-index.js";
import { collectModules } from "./lib/collect-modules.js";

main();

async function main() {
  process.chdir(new URL("..", import.meta.url).pathname);

  const modules = await collectModules();
  await generateTestPkgIndex(modules);
}
