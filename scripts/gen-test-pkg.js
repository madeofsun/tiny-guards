import { URL } from "node:url";

import { generateTestPkgFiles } from "./lib/generate-test-pkg-files.js";
import { collectModules } from "./lib/collect-modules.js";

main();

async function main() {
  process.chdir(new URL("..", import.meta.url).pathname);

  const modules = await collectModules();
  await generateTestPkgFiles(modules);
}
