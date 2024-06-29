import { URL } from "node:url";

import { collectModules } from "./lib/collect-modules.js";
import { generateIndexFile } from "./lib/gen-index-file.js";

main();

async function main() {
  process.chdir(new URL("..", import.meta.url).pathname);

  const modules = await collectModules();
  await generateIndexFile(modules);
}
