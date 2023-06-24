import { URL } from "node:url";

import { build } from "./lib/build.js";

main();

async function main() {
  process.chdir(new URL("..", import.meta.url).pathname);

  await build();
}
